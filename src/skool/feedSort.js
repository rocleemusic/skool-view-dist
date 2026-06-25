// Pure, DOM-free feed presentation logic: client-side sort + category filter over the crawled
// post corpus. The feed no longer asks Skool to sort (the `s=` param is effectively ignored on
// the data route — see spec/feed-sort-rework.md); we crawl every page (crawl.js) and order the
// whole corpus here. Keeping this a pure module means `node --test` covers the ordering rules
// directly, with no Svelte runtime or DOM.

/** @typedef {import('./map.js').PostView} PostView */

/**
 * The sort modes the dropdown offers, in display order. Parity with the validated console toy:
 * value drives {@link sortPosts}; label is what the UI shows.
 * @type {ReadonlyArray<{ value: SortMode, label: string }>}
 */
export const SORT_MODES = /** @type {const} */ ([
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'likes', label: 'Most Liked' },
  { value: 'comments', label: 'Most Commented' },
  { value: 'gems', label: 'Hidden Gems' },
]);

/** @typedef {'newest' | 'oldest' | 'likes' | 'comments' | 'gems'} SortMode */

// "Hidden Gems" = posts that earned real engagement but have aged out of the active feed.
const GEM_MIN_AGE_DAYS = 45;
const GEM_MIN_UPVOTES = 20;
const DAY_MS = 86_400_000;

/**
 * Parse a post's `created` timestamp to epoch ms. Unparseable/empty → 0 (sorts oldest).
 * @param {PostView} post
 * @returns {number}
 */
function createdMs(post) {
  const t = Date.parse(post.created);
  return Number.isNaN(t) ? 0 : t;
}

/**
 * Age of a post in days relative to `now` (epoch ms). Used by the Hidden Gems filter.
 * @param {PostView} post
 * @param {number} now
 * @returns {number}
 */
export function ageDays(post, now) {
  return (now - createdMs(post)) / DAY_MS;
}

/**
 * Filter a post list to a single category. An empty/falsy `labelId` means "all categories" and
 * returns a shallow copy (callers may sort the result in place). Mirrors the server `c=` param,
 * but client-side so category switches are instant after the crawl.
 * @param {PostView[]} posts
 * @param {string} [labelId]
 * @returns {PostView[]}
 */
export function filterByCategory(posts, labelId) {
  if (!labelId) return posts.slice();
  return posts.filter((p) => p.labelId === labelId);
}

/**
 * Order a post list by a sort mode. Pure: returns a new array, never mutates the input. `now`
 * (epoch ms, default `Date.now()`) is injectable so the time-relative Hidden Gems filter is
 * deterministic in tests. `gems` both FILTERS (age + upvote floor) and sorts.
 *
 * JS `Array.sort` is stable, so ties keep crawl order (≈ newest-first) — fine for likes/comments.
 * @param {PostView[]} posts
 * @param {SortMode} mode
 * @param {number} [now]
 * @returns {PostView[]}
 */
export function sortPosts(posts, mode, now = Date.now()) {
  const arr = posts.slice();
  switch (mode) {
    case 'oldest':
      return arr.sort((a, b) => createdMs(a) - createdMs(b));
    case 'likes':
      return arr.sort((a, b) => b.upvotes - a.upvotes);
    case 'comments':
      return arr.sort((a, b) => b.comments - a.comments);
    case 'gems':
      return arr
        .filter((p) => ageDays(p, now) > GEM_MIN_AGE_DAYS && p.upvotes >= GEM_MIN_UPVOTES)
        .sort((a, b) => b.upvotes - a.upvotes);
    case 'newest':
    default:
      return arr.sort((a, b) => createdMs(b) - createdMs(a));
  }
}
