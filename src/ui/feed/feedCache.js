// Feed corpus cache (per community). A full crawl is expensive, so we persist the deduped post
// corpus to extension storage and hydrate it on open for an instant first paint, then crawl in
// the background for new posts (see feedStore). Thin IO adapter over `browser.storage.local`:
// every call is best-effort and swallows storage errors so a cache miss never blocks the feed.
//
// This is the one storage seam (no pure logic), so it is intentionally not unit-tested — the
// crawl/sort logic it feeds is covered headlessly by unit tests in the source repo.

import browser from 'webextension-polyfill';

/** @typedef {import('../../skool/map.js').PostView} PostView */

/** @param {string} slug @returns {string} */
const cacheKey = (slug) => `skfeed:${slug}`;
/** @param {string} slug @returns {string} */
const pinsKey = (slug) => `skpins:${slug}`;

/**
 * Load the cached post corpus for a community. Returns [] on a miss or any storage error.
 * @param {string} slug
 * @returns {Promise<PostView[]>}
 */
export async function loadCachedFeed(slug) {
  try {
    const key = cacheKey(slug);
    const got = await browser.storage.local.get(key);
    const entry = /** @type {{ posts?: unknown }} */ (got?.[key] ?? {});
    return Array.isArray(entry.posts) ? /** @type {PostView[]} */ (entry.posts) : [];
  } catch {
    return [];
  }
}

/**
 * Persist the post corpus for a community (with a fetch timestamp). Best-effort; errors are
 * swallowed.
 * @param {string} slug
 * @param {PostView[]} posts
 * @returns {Promise<void>}
 */
export async function saveCachedFeed(slug, posts) {
  try {
    await browser.storage.local.set({ [cacheKey(slug)]: { posts, fetchedAt: Date.now() } });
  } catch {
    // best-effort cache — a failed write just means the next open re-crawls from scratch.
  }
}

/**
 * Load the user's locally-pinned post ids for a community (their pins persist across sessions).
 * Returns [] on a miss or any storage error.
 * @param {string} slug
 * @returns {Promise<string[]>}
 */
export async function loadPinnedIds(slug) {
  try {
    const key = pinsKey(slug);
    const got = await browser.storage.local.get(key);
    const ids = /** @type {unknown} */ (got?.[key]);
    return Array.isArray(ids) ? ids.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

/**
 * Persist the user's locally-pinned post ids for a community. Best-effort; errors are swallowed.
 * @param {string} slug
 * @param {string[]} ids
 * @returns {Promise<void>}
 */
export async function savePinnedIds(slug, ids) {
  try {
    await browser.storage.local.set({ [pinsKey(slug)]: ids });
  } catch {
    // best-effort — a failed write just means a pin won't survive a reload.
  }
}
