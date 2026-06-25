// Full-feed crawler. The custom client sorts the WHOLE community client-side (feedSort.js), so
// it first needs the whole corpus: this walks the feed data route page by page until exhaustion,
// accumulating deduped posts. Mirrors the behavior proven by the validated console toy
// (spec/feed-sort-rework.md): paced requests, a hard page cap, and a 30s back-off when Skool
// rate-limits (HTTP 403) instead of treating that as the end of the feed.
//
// Pure + injectable (fetch AND sleep) so `node --test` covers paging/dedup/back-off without a
// network or real timers. Page parsing is delegated to read.getFeedPage (one parse path).

import { getFeedPage } from './read.js';

/** @typedef {import('./map.js').PostView} PostView */

export const DEFAULT_MAX_PAGES = 200;
export const RATE_LIMIT_BACKOFF_MS = 30_000;
export const ERROR_RETRY_MS = 2_000;
export const PAGE_PAUSE_MS = 100;
// Give up after this many CONSECUTIVE failed page fetches so a persistent error can't spin forever.
export const MAX_CONSECUTIVE_ERRORS = 5;

/** @param {number} ms @returns {Promise<void>} */
const realSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Crawl every page of a community feed and return the deduped post corpus (by post id). Stops on
 * the first empty page (exhausted), at `maxPages`, when `signal` aborts, or after
 * {@link MAX_CONSECUTIVE_ERRORS} consecutive failures. A 403 is a rate-limit: it sleeps
 * {@link RATE_LIMIT_BACKOFF_MS} and RETRIES THE SAME PAGE rather than advancing.
 *
 * `seedPosts` pre-fills the dedup map (pass the cached corpus so a re-crawl merges new posts into
 * what's already known). `onProgress` is called after each successful page with a fresh snapshot
 * of the accumulated posts, so the UI can render incrementally as the crawl proceeds.
 *
 * @param {object} args
 * @param {string} args.buildId
 * @param {string} args.slug
 * @param {import('./routes.js').FeedSort} [args.sort] Server sort param (irrelevant to ordering —
 *   we re-sort client-side — but kept for parity / future use).
 * @param {string} [args.labelId] Optional category filter (the `c` param).
 * @param {import('./read.js').FetchLike} [args.fetchFn]
 * @param {(ms: number) => Promise<void>} [args.sleep] Injectable delay (default real timers).
 * @param {number} [args.maxPages]
 * @param {{ aborted: boolean }} [args.signal] Cooperative cancel (checked between pages).
 * @param {PostView[]} [args.seedPosts] Cached posts to merge into (deduped by id).
 * @param {(progress: { page: number, total: number, added: number, posts: PostView[] }) => void} [args.onProgress]
 * @returns {Promise<PostView[]>}
 */
export async function crawlFeed({
  buildId,
  slug,
  sort,
  labelId,
  fetchFn,
  sleep = realSleep,
  maxPages = DEFAULT_MAX_PAGES,
  signal,
  seedPosts = [],
  onProgress,
}) {
  /** @type {Map<string, PostView>} */
  const byId = new Map();
  for (const post of seedPosts) {
    if (post && post.id) byId.set(post.id, post);
  }

  let page = 1;
  let consecutiveErrors = 0;

  while (page <= maxPages) {
    if (signal?.aborted) break;

    /** @type {{ ok: boolean, status: number, posts: PostView[] }} */
    let result;
    try {
      result = await getFeedPage({ buildId, slug, page, sort, labelId, fetchFn });
    } catch {
      // A thrown fetch (network error) is transient — treat like a non-2xx and retry.
      result = { ok: false, status: 0, posts: [] };
    }

    if (!result.ok) {
      consecutiveErrors += 1;
      if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) break;
      await sleep(result.status === 403 ? RATE_LIMIT_BACKOFF_MS : ERROR_RETRY_MS);
      continue; // retry the SAME page
    }
    consecutiveErrors = 0;

    if (result.posts.length === 0) break; // exhausted

    let added = 0;
    for (const post of result.posts) {
      if (post && post.id && !byId.has(post.id)) {
        byId.set(post.id, post);
        added += 1;
      }
    }
    if (onProgress) {
      onProgress({ page, total: byId.size, added, posts: [...byId.values()] });
    }

    page += 1;
    await sleep(PAGE_PAUSE_MS);
  }

  return [...byId.values()];
}
