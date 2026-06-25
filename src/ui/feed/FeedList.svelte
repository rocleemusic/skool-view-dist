<script>
  // Left list pane. Renders the presented posts from the feed store (already category-filtered and
  // client-sorted), splits real pinned posts into a "Pinned" section, and grows a render WINDOW as
  // the user scrolls. The whole corpus lives in the store (crawled up front) — so "infinite
  // scroll" is now pure client-side windowing, not server paging:
  //   1. IntersectionObserver on a sentinel below the list grows the window on scroll.
  //   2. Fill-until-scrollable guard: after each window settles, if the list still does not
  //      overflow its pane and more rows remain, grow the window — repeat until it overflows or
  //      every row is shown. Fixes short/filtered lists that never scroll.
  // Switching sort/category re-derives instantly (no fetch) and resets the window to the top.
  import PostRow from './PostRow.svelte';
  import CategorySelect from './CategorySelect.svelte';
  import SortSelect from './SortSelect.svelte';

  /**
   * @typedef {object} Props
   * @property {ReturnType<typeof import('./feedStore.svelte.js').createFeedStore>} store
   * @property {Array<{ id: string, name: string }>} categories
   * @property {string | null} selectedId
   * @property {(id: string) => void} onSelect
   */
  /** @type {Props} */
  let { store, categories, selectedId, onSelect } = $props();

  const INITIAL_WINDOW = 30;
  const WINDOW_STEP = 30;
  let windowSize = $state(INITIAL_WINDOW);

  /** @type {HTMLElement | undefined} */
  let paneEl = $state();
  /** @type {HTMLElement | undefined} */
  let listEl = $state();
  /** @type {HTMLElement | undefined} */
  let sentinelEl = $state();

  // Resolve a labelId to its display name for the row chip. The mapped post carries only
  // `labelId`; names live in the scraped category list.
  const categoryNameById = $derived(new Map(categories.map((c) => [c.id, c.name])));
  /** @param {import('../../skool/map.js').PostView} post */
  const nameFor = (post) => (post.labelId ? (categoryNameById.get(post.labelId) ?? '') : '');

  // Pinned = native Skool pin OR a local pin (store.isPinned unions both).
  const pinned = $derived(store.posts.filter((p) => store.isPinned(p)));
  const unpinned = $derived(store.posts.filter((p) => !store.isPinned(p)));
  const visibleUnpinned = $derived(unpinned.slice(0, windowSize));
  const hasMoreWindow = $derived(windowSize < unpinned.length);
  const total = $derived(store.posts.length);

  // ---- reset the window when the presented set changes shape (sort/category switch) ----
  // Read both so this re-runs on either change; jump back to the top so the new ordering starts
  // from row 1 rather than wherever the previous scroll left off.
  $effect(() => {
    void store.sort;
    void store.category;
    windowSize = INITIAL_WINDOW;
    if (paneEl) paneEl.scrollTop = 0;
  });

  // ---- fill-until-scrollable guard ----
  function growIfNeeded() {
    if (!listEl || !paneEl || !hasMoreWindow) return;
    requestAnimationFrame(() => {
      if (!listEl || !paneEl || !hasMoreWindow) return;
      if (listEl.scrollHeight <= paneEl.clientHeight) {
        windowSize += WINDOW_STEP;
      }
    });
  }

  // Re-run the guard whenever the visible count or load status changes (a window/page just settled).
  $effect(() => {
    void visibleUnpinned.length;
    void store.status;
    growIfNeeded();
  });

  // ---- scroll-triggered window growth ----
  $effect(() => {
    if (!sentinelEl || !paneEl) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMoreWindow) windowSize += WINDOW_STEP;
      },
      { root: paneEl, rootMargin: '200px' },
    );
    observer.observe(sentinelEl);
    return () => observer.disconnect();
  });

  // Kick off the crawl once on mount.
  $effect(() => {
    if (store.status === 'idle') void store.start();
  });
</script>

<aside class="listpane" bind:this={paneEl}>
  <div class="listhead">
    <span class="sub">
      {#if store.isCrawling && total > 0}
        indexing {store.indexed}…
      {:else if total}
        {total} {total === 1 ? 'post' : 'posts'}
      {/if}
    </span>
    <div class="lh-controls">
      <CategorySelect
        {categories}
        value={store.category}
        onChange={(id) => store.setCategory(id)}
      />
      <SortSelect value={store.sort} onChange={(s) => store.setSort(s)} />
    </div>
  </div>

  <div class="list" bind:this={listEl}>
    {#if store.status === 'error' && total === 0}
      <div class="empty">
        {store.error || "Couldn't load posts."}<br />
        <button class="btn sm" type="button" onclick={() => store.retry()}>Retry</button>
      </div>
    {:else if store.isInitialLoading}
      <div class="empty">Loading…</div>
    {:else if total === 0}
      <div class="empty">No posts in this category yet.</div>
    {:else}
      {#if pinned.length}
        <div class="listdiv">📌 Pinned</div>
        {#each pinned as post (post.id)}
          <PostRow
            {post}
            categoryName={nameFor(post)}
            selected={selectedId === post.id}
            pinned={store.isPinned(post)}
            nativePinned={post.pinned}
            {onSelect}
            onTogglePin={(id) => store.togglePin(id, post.pinned)}
          />
        {/each}
        {#if visibleUnpinned.length}
          <div class="listdiv">All posts</div>
        {/if}
      {/if}
      {#each visibleUnpinned as post (post.id)}
        <PostRow
          {post}
          categoryName={nameFor(post)}
          selected={selectedId === post.id}
          pinned={store.isPinned(post)}
          nativePinned={post.pinned}
          {onSelect}
          onTogglePin={(id) => store.togglePin(id, post.pinned)}
        />
      {/each}
    {/if}
  </div>

  <div
    class="sentinel"
    class:show={(hasMoreWindow || store.isCrawling) && total > 0}
    bind:this={sentinelEl}
  >
    <span>{store.isCrawling ? 'Indexing more…' : 'Loading more…'}</span>
  </div>
</aside>
