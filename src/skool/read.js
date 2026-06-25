// Thin async read client for Skool. Builds URLs via routes.js, fetches with an INJECTED fetch
// (default globalThis.fetch), and returns mapped view-models so the UI never touches raw shapes.
// Keeping `fetch` injectable makes every method testable with a mock returning a fixture — no
// network in tests. These are the headless-safe read routes (no AWS-WAF token; see the reverse-engineering notes).

import { parseBuildId } from './buildId.js';
import {
  feedUrl,
  postUrl,
  membersUrl,
  pageUrl,
  commentsUrl,
  searchUsersUrl,
  notificationsUrl,
} from './routes.js';
import { parseCategories } from './categories.js';
import { mapPost, mapComment, mapMember, mapMentionUser, mapNotification, getPath } from './map.js';

// CloudFront 403s requests without a real User-Agent (the reverse-engineering notes). In a browser extension the
// browser sets this itself and the header is forbidden to override; in Node we must supply it.
export const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const JSON_HEADERS = { Accept: 'application/json', 'User-Agent': USER_AGENT };
const HTML_HEADERS = { Accept: 'text/html', 'User-Agent': USER_AGENT };

/**
 * @typedef {(input: string, init?: object) => Promise<{
 *   ok: boolean, status: number, statusText?: string,
 *   text: () => Promise<string>, json: () => Promise<unknown>,
 * }>} FetchLike
 */

/** @param {FetchLike} [fetchFn] @returns {FetchLike} */
function resolveFetch(fetchFn) {
  const fn = fetchFn ?? /** @type {FetchLike | undefined} */ (globalThis.fetch);
  if (typeof fn !== 'function') {
    throw new Error('read: no fetch available — pass one in or run where globalThis.fetch exists');
  }
  return fn;
}

/**
 * Coerce an unknown JSON value to a string-keyed record for safe property reads. Non-objects
 * (null, arrays, primitives) become an empty record so callers never hit a runtime throw.
 * @param {unknown} value
 * @returns {Record<string, unknown>}
 */
function asRecord(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value)
    ? /** @type {Record<string, unknown>} */ (value)
    : {};
}

/**
 * Fetch a URL and return its parsed JSON as a record, throwing a descriptive error on non-2xx.
 * @param {FetchLike} fetchFn
 * @param {string} url
 * @returns {Promise<Record<string, unknown>>}
 */
async function fetchJson(fetchFn, url) {
  const res = await fetchFn(url, { headers: JSON_HEADERS });
  if (!res.ok) {
    throw new Error(`read: ${res.status} ${res.statusText ?? ''} for ${url}`.trim());
  }
  return asRecord(await res.json());
}

/**
 * Fetch a community page's HTML.
 * @param {FetchLike} fetchFn
 * @param {string} url
 * @returns {Promise<string>}
 */
async function fetchHtml(fetchFn, url) {
  const res = await fetchFn(url, { headers: HTML_HEADERS });
  if (!res.ok) {
    throw new Error(`read: ${res.status} ${res.statusText ?? ''} for ${url}`.trim());
  }
  return res.text();
}

/**
 * Read the current Next.js buildId from a page. Defaults to the site homepage.
 * @param {FetchLike} [fetchFn]
 * @param {string} [slug] Optional community slug; omit for the homepage.
 * @returns {Promise<string>}
 */
export async function getBuildId(fetchFn, slug) {
  const fn = resolveFetch(fetchFn);
  const html = await fetchHtml(fn, pageUrl(slug));
  return parseBuildId(html);
}

/**
 * Map a feed page's `pageProps.postTrees[].post` to mapped post view-models. Shared by
 * {@link getFeed} and {@link getFeedPage} so the raw-shape parse lives in exactly one place.
 * @param {Record<string, unknown>} pageProps
 * @returns {import('./map.js').PostView[]}
 */
function mapPostTrees(pageProps) {
  /** @type {unknown[]} */
  const trees = Array.isArray(pageProps.postTrees) ? pageProps.postTrees : [];
  return trees
    .map((tree) => asRecord(tree).post)
    .filter((post) => post != null)
    .map((post) => mapPost(post));
}

/**
 * Fetch a community feed page and return mapped posts plus paging metadata. Throws on non-2xx
 * (the historical contract — feedStore's old paged stream relied on it). For the full-corpus
 * crawl that needs to DISTINGUISH a 403 rate-limit from exhaustion, use {@link getFeedPage}.
 * @param {object} args
 * @param {string} args.buildId
 * @param {string} args.slug
 * @param {number} [args.page=1]
 * @param {import('./routes.js').FeedSort} [args.sort]
 * @param {string} [args.labelId]
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<{ posts: import('./map.js').PostView[], group: unknown, page: number, total: number | null }>}
 */
export async function getFeed({ buildId, slug, page = 1, sort, labelId, fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const data = await fetchJson(fn, feedUrl({ buildId, slug, page, sort, labelId }));
  const pageProps = asRecord(data.pageProps);
  return {
    posts: mapPostTrees(pageProps),
    group: (pageProps.currentGroup ?? null),
    page: typeof pageProps.page === 'number' ? pageProps.page : page,
    total: typeof pageProps.total === 'number' ? pageProps.total : null,
  };
}

/**
 * Fetch ONE feed page WITHOUT throwing on non-2xx — returns `{ ok, status, posts, total }` so the
 * crawler ({@link import('./crawl.js').crawlFeed}) can tell a 403 (rate-limit → back off + retry)
 * apart from a genuine empty page (exhausted → stop). On a non-2xx it returns `ok:false` with the
 * status and an empty post list; the body is not read.
 * @param {object} args
 * @param {string} args.buildId
 * @param {string} args.slug
 * @param {number} [args.page=1]
 * @param {import('./routes.js').FeedSort} [args.sort]
 * @param {string} [args.labelId]
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<{ ok: boolean, status: number, posts: import('./map.js').PostView[], total: number | null }>}
 */
export async function getFeedPage({ buildId, slug, page = 1, sort, labelId, fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const res = await fn(feedUrl({ buildId, slug, page, sort, labelId }), { headers: JSON_HEADERS });
  if (!res.ok) {
    return { ok: false, status: res.status, posts: [], total: null };
  }
  const pageProps = asRecord(asRecord(await res.json()).pageProps);
  return {
    ok: true,
    status: res.status,
    posts: mapPostTrees(pageProps),
    total: typeof pageProps.total === 'number' ? pageProps.total : null,
  };
}

/**
 * Fetch a single post with its comment thread.
 * @param {object} args
 * @param {string} args.buildId
 * @param {string} args.slug
 * @param {string} args.postSlug
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<{ post: import('./map.js').PostView | null, comments: import('./map.js').CommentView[] }>}
 */
export async function getPost({ buildId, slug, postSlug, fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const data = await fetchJson(fn, postUrl({ buildId, slug, postSlug }));
  const pageProps = asRecord(data.pageProps);
  // The post itself may arrive as `postTree.post` or a bare `post`; comments hang off
  // `postTree.children` (lazy-loaded in the live UI — may be empty, per the reverse-engineering notes).
  const tree = asRecord(pageProps.postTree);
  const rawPost = tree.post ?? pageProps.post ?? null;
  /** @type {unknown[]} */
  const children = Array.isArray(tree.children) ? tree.children : [];
  return {
    post: rawPost != null ? mapPost(rawPost) : null,
    // Pass each tree node straight to mapComment — it normalizes `{ post, children }` nodes,
    // reading the comment from `.post` and nested replies from the node's `children`.
    comments: children
      .filter((child) => asRecord(child).post != null)
      .map((child) => mapComment(child)),
  };
}

/**
 * Fetch a page of community members (mapped) plus counts.
 * @param {object} args
 * @param {string} args.slug
 * @param {number} [args.page=1]
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<{ members: import('./map.js').MemberView[], total: unknown, online: unknown }>}
 */
export async function getMembers({ slug, page = 1, fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const data = await fetchJson(fn, membersUrl({ slug, page }));
  const pageProps = asRecord(data.pageProps ?? data);
  /** @type {unknown[]} */
  const users = Array.isArray(pageProps.users) ? pageProps.users : [];
  return {
    members: users.map((user) => mapMember(user)),
    total: pageProps.totalMembers ?? pageProps.total ?? null,
    online: pageProps.totalOnlineMembers ?? null,
  };
}

/**
 * Fetch + parse category filter chips from a community feed page.
 * @param {object} args
 * @param {string} args.slug
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<Array<{ id: string, name: string }>>}
 */
export async function getCategories({ slug, fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const html = await fetchHtml(fn, pageUrl(slug));
  return parseCategories(html);
}

// Self-logging guard: we have not seen the api2 comments response body, so on the FIRST
// successful comments fetch we dump the raw JSON (and its first element, pretty-printed) to the
// console under a stable label. That makes the real shape visible so the mapping.json paths can
// be confirmed/fixed without re-investigating. Logs once per page session.
let loggedCommentsShape = false;

/**
 * Pull the candidate comment-node array out of an api2 comments response.
 *
 * The REAL (live-captured) shape is `{ post_tree: { children: [ TreeNode, ... ] }, last }`, where
 * each `TreeNode` is `{ post: CommentPost, children?: [TreeNode, ...] }` — exactly the `{ post,
 * children }` node `mapComment` already normalizes. `post_tree.children` is checked FIRST; the
 * other envelopes (bare array, `{ comments | posts | data | children | items }`) are kept as
 * robustness fallbacks for older/legacy bodies.
 * @param {unknown} json
 * @returns {unknown[]}
 */
function commentsFromResponse(json) {
  if (Array.isArray(json)) return json;
  const record = asRecord(json);
  const treeChildren = getPath(record, 'post_tree.children');
  if (Array.isArray(treeChildren)) return /** @type {unknown[]} */ (treeChildren);
  for (const key of ['comments', 'posts', 'data', 'children', 'items']) {
    if (Array.isArray(record[key])) return /** @type {unknown[]} */ (record[key]);
  }
  return [];
}

/**
 * Fetch a post's comments from the WAF-gated api2 endpoint and return mapped comment view-models.
 *
 * Must run from the page origin (content script): `credentials: "include"` rides the session
 * cookies, and `x-aws-waf-token` carries the WAF token (the `aws-waf-token` cookie value, which
 * may be httpOnly — the content script gets it from the background; see content/index.js
 * `getWafToken`). A background-origin fetch would be cross-origin and fail CORS.
 *
 * Fetch ONE page of comments. Page 0 (no `createdGt`) is the `pinned=true` head; pass the returned
 * `cursor` back as `createdGt` for the next page — Skool's "show more comments" (see commentsUrl /
 * the reverse-engineering notes). Returns mapped items + the next `cursor` + whether more remain, so the UI loads a big
 * thread incrementally instead of all at once.
 *
 * @param {object} args
 * @param {string} args.postId The post's uuid (the post view-model's `id`).
 * @param {string} args.groupId The community group's uuid (`currentGroup.id`).
 * @param {string} args.wafToken The AWS-WAF token for the `x-aws-waf-token` header.
 * @param {number|string} [args.createdGt] Cursor for the next page (omit for the first/pinned page).
 * @param {number} [args.limit=25] Top-level nodes per page (Skool's max — 50 and 100 both 400).
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<{ items: import('./map.js').CommentView[], cursor: number | string | null, hasMore: boolean }>}
 */
export async function getComments({ postId, groupId, wafToken, createdGt, limit = 25, fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const url = commentsUrl({
    postId,
    groupId,
    limit,
    ...(createdGt != null ? { createdGt } : { pinned: true }),
  });
  const res = await fn(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      'x-aws-waf-token': wafToken ?? '',
    },
  });
  if (!res.ok) {
    throw new Error(`read: ${res.status} ${res.statusText ?? ''} for ${url}`.trim());
  }
  const json = await res.json();

  // First successful response: surface the real (unseen) shape so the mapping can be confirmed.
  if (!loggedCommentsShape) {
    loggedCommentsShape = true;
    try {
      console.info('[skool-view] raw comments response:', json);
      const first = commentsFromResponse(json)[0];
      if (first !== undefined) {
        console.info('[skool-view] raw comments[0]:', JSON.stringify(first, null, 2));
      }
    } catch {
      // Logging is diagnostic only — never let it break the read.
    }
  }

  const nodes = commentsFromResponse(json);
  const cursor = /** @type {number | string | null} */ (asRecord(json).last ?? null);
  return {
    items: nodes.map((node) => mapComment(node)),
    cursor,
    // A full page suggests more remain; an advancing cursor is required to fetch them.
    hasMore: nodes.length >= limit && cursor != null && cursor !== createdGt,
  };
}

/**
 * Search community members for the composer autocomplete. WAF-gated api2 POST (browser-only,
 * same constraints as {@link getComments}): runs from the content-script origin so the session
 * cookies ride along and we send the `x-aws-waf-token` header. Confirmed live (2026-06-21):
 * `POST /search/users` body `{ query, group_id, limit }` → `{ users: [...], has_more }`.
 *
 * @param {object} args
 * @param {string} args.query The text typed after `@`.
 * @param {string} args.groupId The community group's uuid.
 * @param {string} args.wafToken The AWS-WAF token for the `x-aws-waf-token` header.
 * @param {number} [args.limit=7] Max candidates (mirrors Skool's own UI).
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<import('./map.js').MentionUser[]>}
 */
export async function searchUsers({ query, groupId, wafToken, limit = 7, fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const url = searchUsersUrl();
  const res = await fn(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      'x-aws-waf-token': wafToken ?? '',
    },
    body: JSON.stringify({ query, group_id: groupId, limit }),
  });
  if (!res.ok) {
    throw new Error(`read: ${res.status} ${res.statusText ?? ''} for ${url}`.trim());
  }
  const json = asRecord(await res.json());
  const users = Array.isArray(json.users) ? json.users : [];
  return users.map((user) => mapMentionUser(user));
}

/**
 * Fetch the signed-in user's notifications (the bell). WAF-gated api2 GET (browser-only, same
 * constraints as {@link getComments}): runs from the content-script origin. Returns mapped items
 * plus the paging cursor. Confirmed live (2026-06-22): `GET /self/notifications?limit=30&type=all`
 * → `{ messages: [...], has_more, cursor }`; pass the returned `cursor` to load the next page.
 *
 * @param {object} args
 * @param {string} args.wafToken The AWS-WAF token for the `x-aws-waf-token` header.
 * @param {string} [args.cursor] Paging cursor (omit for the first page).
 * @param {number} [args.limit=30]
 * @param {string} [args.type='all']
 * @param {FetchLike} [args.fetchFn]
 * @returns {Promise<{ items: import('./map.js').NotificationView[], hasMore: boolean, cursor: string }>}
 */
export async function getNotifications({ wafToken, cursor, limit = 30, type = 'all', fetchFn }) {
  const fn = resolveFetch(fetchFn);
  const url = notificationsUrl({ cursor, limit, type });
  const res = await fn(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      'x-aws-waf-token': wafToken ?? '',
    },
  });
  if (!res.ok) {
    throw new Error(`read: ${res.status} ${res.statusText ?? ''} for ${url}`.trim());
  }
  const json = asRecord(await res.json());
  const messages = Array.isArray(json.messages) ? json.messages : [];
  return {
    items: messages.map((message) => mapNotification(message)),
    hasMore: Boolean(json.has_more),
    cursor: typeof json.cursor === 'string' ? json.cursor : '',
  };
}
