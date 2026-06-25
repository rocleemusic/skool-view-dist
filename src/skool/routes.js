// Pure URL builders for Skool's read surface (the Next.js `/_next/data/...` data routes
// plus the members JSON route). Centralizing URL shape here means a route change is a
// one-file patch and every builder is trivially unit-testable without a network.
//
// Shapes are taken from the reverse-engineering notes (validated live against your-community 2026-06):
//   feed:    /_next/data/{buildId}/{slug}.json?group={slug}&p={page}&s={sort}&c={labelId?}
//   post:    /_next/data/{buildId}/{slug}/{postSlug}.json?group={slug}
//   members: /{slug}/-/members.json?group={slug}&p={page}

export const BASE = 'https://www.skool.com';

// api2 is Skool's write/realtime API host. Unlike the /_next/data read routes it is WAF-gated:
// requests need `content-type: application/json` + an `x-aws-waf-token` header and the session
// cookies (which ride along same-origin). See the reverse-engineering notes "Write surface".
export const API2_BASE = 'https://api2.skool.com';

/**
 * Allowed feed sort values, per the reverse-engineering notes. Skool ignores unknown values, but we keep the
 * set explicit so callers/tests can reason about it.
 * @typedef {'newest-cm' | 'newest' | 'top'} FeedSort
 */

/**
 * Build the query string from an ordered list of [key, value] pairs, dropping empty values.
 * Encodes both sides. Kept tiny and dependency-free so it runs in the browser and Node.
 * @param {Array<[string, string | number | undefined | null]>} pairs
 * @returns {string} A query string starting with '?', or '' if nothing to encode.
 */
function buildQuery(pairs) {
  const parts = [];
  for (const [key, value] of pairs) {
    if (value === undefined || value === null || value === '') continue;
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  }
  return parts.length ? `?${parts.join('&')}` : '';
}

/**
 * Feed route for a community.
 * @param {object} args
 * @param {string} args.buildId
 * @param {string} args.slug Community slug (e.g. "your-community").
 * @param {number} [args.page=1]
 * @param {FeedSort} [args.sort='newest-cm']
 * @param {string} [args.labelId] Category label id to filter by (the `c` param).
 * @returns {string} Absolute URL.
 */
export function feedUrl({ buildId, slug, page = 1, sort = 'newest-cm', labelId }) {
  const query = buildQuery([
    ['group', slug],
    ['p', page],
    ['s', sort],
    ['c', labelId],
  ]);
  return `${BASE}/_next/data/${buildId}/${slug}.json${query}`;
}

/**
 * Single-post (with comments) route.
 * @param {object} args
 * @param {string} args.buildId
 * @param {string} args.slug Community slug.
 * @param {string} args.postSlug Post slug (the post's `name` field).
 * @returns {string} Absolute URL.
 */
export function postUrl({ buildId, slug, postSlug }) {
  const query = buildQuery([['group', slug]]);
  return `${BASE}/_next/data/${buildId}/${slug}/${postSlug}.json${query}`;
}

/**
 * Members route. Note: this one is NOT a /_next/data route — it lives at /{slug}/-/members.json.
 * @param {object} args
 * @param {string} args.slug Community slug.
 * @param {number} [args.page=1]
 * @returns {string} Absolute URL.
 */
export function membersUrl({ slug, page = 1 }) {
  const query = buildQuery([
    ['group', slug],
    ['p', page],
  ]);
  return `${BASE}/${slug}/-/members.json${query}`;
}

/**
 * Community homepage HTML route — used to fetch the page that carries `buildId` and the
 * category filter chips.
 * @param {string} [slug] Optional community slug; omit for the site homepage.
 * @returns {string} Absolute URL.
 */
export function pageUrl(slug) {
  return slug ? `${BASE}/${slug}` : BASE;
}

/**
 * api2 comments route for a single post. WAF-gated — see API2_BASE. Confirmed live: `GET
 * /posts/{postId}/comments?group-id={groupId}&limit={limit}` (max `limit` 25 — 50/100 both 400).
 * Page 0 is `pinned=true` (head + pinned); each subsequent page sets **`created-gt`** to the prior
 * response's `last` timestamp to walk forward through the thread (this is the ONLY working pager —
 * `last`/`offset`/`page`/`cursor` are all ignored). `tail=true` jumps to the newest page. Confirmed
 * 2026-06-24 from native "show more comments".
 * @param {object} args
 * @param {string} args.postId The post's uuid.
 * @param {string} args.groupId The community group's uuid (`currentGroup.id`, NOT the slug).
 * @param {number} [args.limit=25]
 * @param {boolean} [args.pinned] Request the head (pinned + first) page.
 * @param {boolean} [args.tail] Request the tail (newest) page.
 * @param {number|string} [args.createdGt] Forward cursor — the prior response's `last` timestamp.
 * @param {number|string} [args.last] Response cursor field (not a request param on its own).
 * @returns {string} Absolute URL.
 */
export function commentsUrl({ postId, groupId, limit = 25, pinned, tail, createdGt, last }) {
  const query = buildQuery([
    ['group-id', groupId],
    ['pinned', pinned ? 'true' : undefined],
    ['tail', tail ? 'true' : undefined],
    ['created-gt', createdGt],
    ['limit', limit],
    ['last', last],
  ]);
  return `${API2_BASE}/posts/${postId}/comments${query}`;
}

/**
 * api2 vote route — likes/unlikes a post OR a comment (a comment IS a post). WAF-gated.
 * Confirmed live (2026-06): `PUT /posts/{postId}/vote` with body `{old,new}` (see write.js).
 * @param {string} postId The post (or comment) uuid to vote on.
 * @returns {string} Absolute URL.
 */
export function voteUrl(postId) {
  return `${API2_BASE}/posts/${postId}/vote`;
}

/**
 * api2 create-post route — used to create a comment or reply (both are posts of
 * `post_type:"comment"`). WAF-gated. Confirmed live (2026-06): `POST /posts?follow=false`.
 * @returns {string} Absolute URL.
 */
export function createPostUrl() {
  return `${API2_BASE}/posts?follow=false`;
}

/**
 * api2 member/mention search route. WAF-gated. Confirmed live (2026-06-21): `POST /search/users`
 * with body `{ query, group_id, limit }`. Powers the composer autocomplete.
 * @returns {string} Absolute URL.
 */
export function searchUsersUrl() {
  return `${API2_BASE}/search/users`;
}

/**
 * A member's public profile URL, e.g. `https://www.skool.com/@jane-doe-1234?g=your-community`.
 * The `@handle` is the user's `name` field (a slug); `?g={slug}` scopes it to the community.
 * Used to render mentions as links (see skool/markup.toHtml `mentionHref`).
 * @param {string} handle The user's handle (their `name` field).
 * @param {string} [slug] Community slug for the `?g=` context param.
 * @returns {string} Absolute URL.
 */
export function profileUrl(handle, slug) {
  const q = slug ? `?g=${encodeURIComponent(slug)}` : '';
  return `${BASE}/@${encodeURIComponent(handle)}${q}`;
}

/**
 * api2 notifications route — the signed-in user's notifications across all their communities (the
 * bell). WAF-gated. Confirmed live (2026-06-22): `GET /self/notifications?limit={n}&type=all`,
 * paged by an opaque `cursor` (the response's `cursor` while `has_more` is true).
 * @param {object} [args]
 * @param {string} [args.cursor] Opaque paging cursor from a previous response.
 * @param {number} [args.limit=30]
 * @param {string} [args.type='all']
 * @returns {string} Absolute URL.
 */
export function notificationsUrl({ cursor, limit = 30, type = 'all' } = {}) {
  const query = buildQuery([
    ['cursor', cursor],
    ['limit', limit],
    ['type', type],
  ]);
  return `${API2_BASE}/self/notifications${query}`;
}
