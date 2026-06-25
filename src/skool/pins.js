// Local pin logic (pure). A "local pin" is the user pinning a loaded post inside OUR client — it
// is NOT a write to Skool (see spec/feed-sort-rework.md §3). Native Skool pins (`metadata.pinned`)
// are read-only and always count as pinned; local pins are an ADDITIVE, user-owned set on top.
// Kept pure + DOM-free so `node --test` covers the toggle + "is it pinned?" rules directly; the
// feed store just holds the id list and persists it.

/** @typedef {import('./map.js').PostView} PostView */

/**
 * Toggle a post id within a local-pin id list, returning a NEW array (never mutates the input).
 * @param {string[]} ids Current local-pin ids.
 * @param {string} id Post id to toggle.
 * @returns {string[]}
 */
export function togglePinId(ids, id) {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}

/**
 * Whether a post shows as pinned in our view: native Skool pin OR a local pin. A null/undefined
 * post is never pinned.
 * @param {PostView | null | undefined} post
 * @param {Set<string>} localPinnedIds Set of locally-pinned post ids.
 * @returns {boolean}
 */
export function isPinned(post, localPinnedIds) {
  if (!post) return false;
  return Boolean(post.pinned) || localPinnedIds.has(post.id);
}
