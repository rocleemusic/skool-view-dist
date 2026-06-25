// Feed state for the left list pane. Owns the full crawled post corpus, the active category +
// sort, and the crawl lifecycle. Wraps the tested data layer — it never parses raw Skool shapes
// (crawl/read) and never re-implements ordering (feedSort).
//
// Model (spec/feed-sort-rework.md): Skool's server `s=` sort is ignored on the data route, so we
// CRAWL the whole feed once (crawl.crawlFeed), cache it (feedCache), and order it CLIENT-SIDE
// (feedSort). Consequences:
//   - Category + sort are now pure derivations over `allPosts` → switching either is INSTANT,
//     no refetch. They are local state, not request params.
//   - On open we hydrate the cache for an instant paint, then crawl in the background, streaming
//     each page into `allPosts` as it arrives.
//
// Pinned posts come from the real `metadata.pinned` flag (read-only here). We keep them in the
// presented list under every sort — including `gems`, whose engagement filter would otherwise
// drop a low-vote pinned welcome post — so the FeedList "Pinned" section is sort-independent.

import { crawlFeed } from '../../skool/crawl.js';
import { sortPosts, filterByCategory } from '../../skool/feedSort.js';
import { togglePinId, isPinned as isPinnedBy } from '../../skool/pins.js';
import { loadCachedFeed, saveCachedFeed, loadPinnedIds, savePinnedIds } from './feedCache.js';

/** @typedef {import('../../skool/map.js').PostView} PostView */
/** @typedef {import('../../skool/feedSort.js').SortMode} SortMode */
/** @typedef {'idle' | 'loading' | 'ready' | 'error'} LoadStatus */

/**
 * Create a reactive feed store. `buildId` and `slug` identify the community; `fetchFn` is
 * injectable for tests (defaults to the page's same-origin fetch in the live extension).
 *
 * @param {object} args
 * @param {string} args.buildId
 * @param {string} args.slug
 * @param {((input: string, init?: object) => Promise<Response>)} [args.fetchFn]
 */
export function createFeedStore({ buildId, slug, fetchFn }) {
  /** The full, deduped post corpus across all crawled pages. @type {PostView[]} */
  let allPosts = $state([]);
  /** @type {LoadStatus} */
  let status = $state('idle');
  /** @type {string} */
  let error = $state('');
  /** A labelId, or '' for all categories. @type {string} */
  let category = $state('');
  /** @type {SortMode} */
  let sort = $state('newest');
  /** Posts indexed so far (for the crawl progress meter). */
  let indexed = $state(0);
  /** The user's locally-pinned post ids (additive to native Skool pins). @type {string[]} */
  let localPinIds = $state([]);
  // Fast membership lookup for isPinned, recomputed when the pin list changes.
  const pinnedSet = $derived(new Set(localPinIds));

  // Guards a single crawl lifecycle. A new crawl (refresh/retry) bumps the token so a still-in-
  // flight crawl's streamed pages and final result are discarded.
  let crawlToken = 0;
  let started = false;

  /**
   * The presented list: the corpus filtered to the active category and ordered by the active
   * sort. For `gems` (which filters out non-gem posts) we union pinned posts back in so they
   * never vanish from the list — the pinned section must show regardless of sort.
   * @returns {PostView[]}
   */
  function present() {
    const inCategory = filterByCategory(allPosts, category);
    const sorted = sortPosts(inCategory, sort);
    if (sort !== 'gems') return sorted;
    // `gems` filters out non-gem posts; union pinned posts (native OR local) back in so the
    // Pinned section never empties under this sort.
    const shown = new Set(sorted.map((p) => p.id));
    const droppedPins = inCategory.filter((p) => isPinnedBy(p, pinnedSet) && !shown.has(p.id));
    return [...droppedPins, ...sorted];
  }

  /**
   * Crawl the feed, streaming each page into `allPosts`, then persist the corpus. Seeds the crawl
   * with whatever is already loaded so a refresh merges new posts into the existing set.
   * @returns {Promise<void>}
   */
  async function runCrawl() {
    const token = ++crawlToken;
    status = 'loading';
    error = '';
    try {
      const posts = await crawlFeed({
        buildId,
        slug,
        fetchFn: /** @type {any} */ (fetchFn),
        seedPosts: allPosts,
        onProgress: ({ total, posts: snapshot }) => {
          if (token !== crawlToken) return; // superseded
          allPosts = snapshot;
          indexed = total;
        },
      });
      if (token !== crawlToken) return;
      allPosts = posts;
      indexed = posts.length;
      status = 'ready';
      void saveCachedFeed(slug, posts);
    } catch (err) {
      if (token !== crawlToken) return;
      error = err instanceof Error ? err.message : 'Failed to load posts.';
      status = 'error';
    }
  }

  /**
   * First load: hydrate the cache for an instant paint, then crawl in the background for new
   * posts. Idempotent — only the first call does anything.
   * @returns {Promise<void>}
   */
  async function start() {
    if (started) return;
    started = true;
    status = 'loading';
    // Restore the user's local pins, then hydrate the cached corpus before crawling.
    localPinIds = await loadPinnedIds(slug);
    const cached = await loadCachedFeed(slug);
    if (cached.length) {
      allPosts = cached;
      indexed = cached.length;
    }
    await runCrawl();
  }

  return {
    /** The presented (category-filtered, sorted) post list. */
    get posts() {
      return present();
    },
    get status() {
      return status;
    },
    get error() {
      return error;
    },
    get category() {
      return category;
    },
    get sort() {
      return sort;
    },
    /** Total posts in the crawled corpus (before category filtering). */
    get total() {
      return allPosts.length;
    },
    /** Posts indexed so far during the crawl (for a progress meter). */
    get indexed() {
      return indexed;
    },
    /** A crawl is in flight. */
    get isCrawling() {
      return status === 'loading';
    },
    /** First load with nothing to show yet (drives the full-pane spinner). */
    get isInitialLoading() {
      return status === 'loading' && allPosts.length === 0;
    },
    start,
    /** Whether a post shows as pinned in our view: native Skool pin OR a local pin. */
    isPinned(/** @type {PostView | null | undefined} */ post) {
      return isPinnedBy(post, pinnedSet);
    },
    /**
     * Toggle a LOCAL pin for a post (client-side only; never touches Skool). No-op for natively
     * pinned posts — those are read-only and can't be unpinned from our side.
     * @param {string} id
     * @param {boolean} [nativePinned] True if the post is pinned by Skool.
     */
    togglePin(id, nativePinned = false) {
      if (!id || nativePinned) return;
      localPinIds = togglePinId(localPinIds, id);
      void savePinnedIds(slug, localPinIds);
    },
    /** Change the category filter — instant, no refetch (pure derivation). */
    setCategory(/** @type {string} */ labelId) {
      category = labelId ?? '';
    },
    /** Change the sort mode — instant, no refetch (pure derivation). */
    setSort(/** @type {SortMode} */ value) {
      sort = value;
    },
    /** Retry a failed crawl (keeps any posts already loaded). */
    retry() {
      if (status === 'error') void runCrawl();
    },
    /** Manual refresh — re-crawl from page 1, merging new posts into the corpus. */
    refresh() {
      void runCrawl();
    },
  };
}
