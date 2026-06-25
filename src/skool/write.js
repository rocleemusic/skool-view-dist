// Thin async write client for Skool (§6 step 5). Mirrors read.js: builds URLs via routes.js,
// fetches with an INJECTED fetch (default globalThis.fetch), and returns mapped view-models so
// the UI never touches raw shapes. Keeping `fetch` + `wafToken` injectable makes every method
// unit-testable with a mock — NO network in tests.
//
// Every call here is api2.skool.com and WAF-gated (the reverse-engineering notes "Extension API contracts"):
// it MUST run from the content script (page origin) so the session cookies ride along
// (`credentials:"include"`) and CORS passes; we send the `x-aws-waf-token` header ourselves.
// A 403 means a stale/missing WAF token — the caller should clear the cached token (see
// ui/waf.clearWafToken) and prompt the user to reload Skool.

import { voteUrl, createPostUrl } from './routes.js';
import { mapComment } from './map.js';

/**
 * @typedef {(input: string, init?: object) => Promise<{
 *   ok: boolean, status: number, statusText?: string,
 *   text: () => Promise<string>, json: () => Promise<unknown>,
 * }>} FetchLike
 */

/**
 * Error thrown on a non-2xx api2 write. Carries the HTTP `status` so callers can branch — most
 * importantly on 403 (stale WAF token → clear the cache and prompt a reload).
 */
export class WriteError extends Error {
  /** @param {string} message @param {number} status */
  constructor(message, status) {
    super(message);
    this.name = 'WriteError';
    /** @type {number} */
    this.status = status;
    /** True for a 403, which on Skool means a stale/missing WAF token. */
    this.isWaf = status === 403;
  }
}

/** @param {FetchLike} [fetchFn] @returns {FetchLike} */
function resolveFetch(fetchFn) {
  const fn = fetchFn ?? /** @type {FetchLike | undefined} */ (globalThis.fetch);
  if (typeof fn !== 'function') {
    throw new Error('write: no fetch available — pass one in or run where globalThis.fetch exists');
  }
  return fn;
}

/**
 * Coerce an unknown JSON value to a string-keyed record for safe property reads.
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
function asRecord(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value)
    ? /** @type {Record<string, unknown>} */ (value)
    : {};
}

let createLogged = false;
/**
 * One-time console log of the raw create-comment 2xx response. The exact response shape was not
 * captured during reverse-engineering, so this surfaces it on the first live write to confirm/finalize the
 * mapping in {@link pickCreated} (mirrors the comments-GET self-log in read.js).
 * @param {unknown} json
 */
function logCreateOnce(json) {
  if (createLogged) return;
  createLogged = true;
  try {
    console.info('[skool-view] raw create response:', json);
  } catch {
    /* ignore */
  }
}

/**
 * POST/PUT JSON to api2 with the WAF header + session cookies, throwing {@link WriteError} on
 * non-2xx. Returns the parsed JSON body as a record ({} when the body is empty/non-JSON — some
 * write endpoints return no body).
 * @param {FetchLike} fetchFn
 * @param {string} url
 * @param {'PUT' | 'POST'} method
 * @param {unknown} body
 * @param {string} wafToken
 * @returns {Promise<Record<string, unknown>>}
 */
async function sendJson(fetchFn, url, method, body, wafToken) {
  const res = await fetchFn(url, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      'x-aws-waf-token': wafToken ?? '',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new WriteError(`write: ${res.status} ${res.statusText ?? ''} for ${url}`.trim(), res.status);
  }
  try {
    return asRecord(await res.json());
  } catch {
    // A 2xx with an empty/non-JSON body is success for vote (and sometimes create) — not an error.
    return {};
  }
}

/**
 * Like or unlike a post OR a comment (a comment IS a post, so the same vote endpoint applies).
 * `PUT /posts/{postId}/vote` body `{old,new}`: like sends `{old:"",new:"up"}`, unlike sends
 * `{old:"up",new:""}`.
 * @param {object} args
 * @param {string} args.postId The post/comment uuid to vote on.
 * @param {boolean} args.like True to like, false to unlike.
 * @param {string} args.wafToken AWS-WAF token for the `x-aws-waf-token` header.
 * @param {FetchLike} [args.fetch] Injected fetch (default globalThis.fetch).
 * @returns {Promise<void>}
 */
export async function vote({ postId, like, wafToken, fetch }) {
  const fn = resolveFetch(fetch);
  const body = like ? { old: '', new: 'up' } : { old: 'up', new: '' };
  await sendJson(fn, voteUrl(postId), 'PUT', body, wafToken);
}

/**
 * Create a comment (top-level) or a reply. Both are posts of `post_type:"comment"`:
 * `POST /posts?follow=false`. `root_id` is ALWAYS the top post id; `parent_id` is the post id for
 * a top-level comment, or the parent comment id for a reply.
 *
 * Returns the created comment mapped through {@link mapComment} when the response carries it; the
 * exact 2xx response shape was not captured during reverse-engineering, so several likely envelopes are
 * probed (the post on `post`/`post_tree.post`, or the body itself). When none match we still
 * return a minimal CommentView carrying the new id (from `id`/`post_id`) so the UI can reconcile
 * its optimistic node. Either way `content` is filled from the input if the response omits it.
 * @param {object} args
 * @param {string} args.groupId The community group's uuid.
 * @param {string} args.rootId The top post's uuid (the post being commented on).
 * @param {string} args.parentId The post id (top-level comment) or comment id (reply).
 * @param {string} args.content The comment text.
 * @param {string} args.wafToken AWS-WAF token for the `x-aws-waf-token` header.
 * @param {FetchLike} [args.fetch] Injected fetch (default globalThis.fetch).
 * @returns {Promise<import('./map.js').CommentView>}
 */
export async function createComment({ groupId, rootId, parentId, content, wafToken, fetch }) {
  const fn = resolveFetch(fetch);
  const body = {
    post_type: 'comment',
    group_id: groupId,
    root_id: rootId,
    parent_id: parentId,
    metadata: {
      title: '',
      content,
      attachments: '',
      action: 0,
      video_ids: '',
    },
  };
  const json = await sendJson(fn, createPostUrl(), 'POST', body, wafToken);
  logCreateOnce(json);

  // Find the created comment node in whatever envelope api2 returned. mapComment normalizes the
  // tree-node `{post,children}`, a bare comment post, and a flat object — so we hand it the first
  // candidate that looks like a comment and let it sort out the shape.
  const created = pickCreated(json);
  const mapped = created != null ? mapComment(created) : null;
  if (mapped && mapped.id) {
    // Backfill content if the response echoed an empty/absent body (keeps the optimistic text).
    return { ...mapped, content: mapped.content || content };
  }
  // No usable node — return a minimal CommentView so the caller can still reconcile the new id.
  const id = String(asRecord(json).id ?? asRecord(json).post_id ?? '');
  return minimalComment(id, content);
}

/**
 * Pull the created-comment node out of a create response, trying the envelopes api2 is likely to
 * use. Returns the raw node (for mapComment) or null if nothing comment-shaped is found.
 * @param {Record<string, unknown>} json
 * @returns {unknown}
 */
function pickCreated(json) {
  const postTree = asRecord(json.post_tree);
  if (postTree.post != null) return json.post_tree; // {post, children} tree node
  if (json.post != null) return json.post; // bare comment post under `post`
  // The body may itself be the created comment post (has metadata.content or a comment id).
  const meta = asRecord(json.metadata);
  if (meta.content != null || json.post_type === 'comment') return json;
  return null;
}

/**
 * Build a minimal CommentView for the optimistic node when the response gave us only an id (or
 * nothing). Mirrors the map.js CommentView shape so the UI renders it identically to a fetched one.
 * @param {string} id
 * @param {string} content
 * @returns {import('./map.js').CommentView}
 */
function minimalComment(id, content) {
  return {
    id,
    content,
    contentHtml: '',
    contentText: content,
    upvotes: 0,
    ts: new Date().toISOString(),
    author: { id: '', name: '', handle: '', firstName: '', lastName: '', avatar: '' },
    replies: [],
  };
}
