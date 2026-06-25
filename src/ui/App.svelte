<script>
  // Overlay root for §6 step 3 — the feed list. Responsibilities:
  //   - Detect the community slug from the URL; bail to a friendly empty state off-community.
  //   - Boot: fetch the page (buildId + category chips) same-origin, then create the feed store.
  //   - Own the theme selection (applied as `data-theme` on this root, restored before paint) and
  //     the selected-post id; resolve the selected post + its category name for the detail pane.
  // Both panes are wired to real data. The detail pane renders the selected post (§6 step 4a);
  // comments and writes (like/pin/comment) are still deferred (steps 4b / 5).
  import Topbar from './Topbar.svelte';
  import FeedList from './feed/FeedList.svelte';
  import DetailPane from './DetailPane.svelte';
  import Lightbox from './Lightbox.svelte';
  import { createFeedStore } from './feed/feedStore.svelte.js';
  import { getBuildId, getNotifications, getPost } from '../skool/read.js';
  import { parseCategories } from '../skool/categories.js';
  import { profileUrl } from '../skool/routes.js';
  import { getWafToken } from './waf.js';
  import { loadTheme, saveTheme } from './theme.js';

  /**
   * @typedef {object} Props
   * @property {() => void} [onClose] Dismisses the overlay (content-script toggle).
   */
  /** @type {Props} */
  let { onClose } = $props();

  // Theme is read synchronously so the root mounts already wearing the saved theme (no flash).
  let theme = $state(loadTheme());
  /** @param {import('./theme.js').ThemeId} next */
  function changeTheme(next) {
    theme = next;
    saveTheme(next);
  }

  function handleExit() {
    if (typeof onClose === 'function') onClose();
  }

  /** @type {string | null} */
  let selectedId = $state(null);
  // A post opened directly (e.g. from a notification) that may NOT be in the loaded feed stream.
  /** @type {import('../skool/map.js').PostView | null} */
  let openedPost = $state(null);
  // The comment a notification points at — CommentsSection scrolls to + highlights it ('' = none).
  let highlightCommentId = $state('');
  // Next.js buildId (set at boot) — needed to fetch a post that isn't in the feed.
  let buildId = $state('');

  /** @typedef {'loading' | 'off-community' | 'ready' | 'error'} BootState */
  /** @type {BootState} */
  let bootState = $state('loading');
  let bootError = $state('');
  let groupName = $state('Community');
  // The group's uuid (`currentGroup.id`) — NOT the slug. Needed for the api2 comments read
  // (`group-id` param). Scraped from the page's __NEXT_DATA__ at boot.
  let groupId = $state('');
  // The signed-in user, scraped from the page (best-effort) for optimistic comment/reply authoring.
  /** @type {{ name: string, avatar: string } | undefined} */
  let currentUser = $state(undefined);
  // Community slug — set at boot; used to build member profile-link URLs.
  let slug = $state('');
  // Mention id->handle registry, filled from loaded comment authors + composer picks. Turns
  // `[@Name](obj://user/ID)` mentions into profile links. A plain Map (no reactivity needed — it's
  // populated before the content that reads it renders).
  /** @type {Map<string, string>} */
  const mentionHandles = new Map();
  /** @param {string} id @param {string} handle */
  function registerMention(id, handle) {
    if (id && handle) mentionHandles.set(id, handle);
  }
  /** @param {string} id @returns {string | null} */
  function mentionHref(id) {
    const handle = mentionHandles.get(id);
    return handle && slug ? profileUrl(handle, slug) : null;
  }
  /** @type {Array<{ id: string, name: string }>} */
  let categories = $state([]);
  /** @type {ReturnType<typeof createFeedStore> | null} */
  let feedStore = $state(null);

  // Manual refresh: reload the feed AND bump a nonce the open post's comments watch, so a refresh
  // pulls new posts and new comments.
  let refreshNonce = $state(0);
  function refreshView() {
    feedStore?.refresh();
    refreshNonce += 1;
    void loadNotifications();
  }

  // Notifications (§6): WAF-gated `/self/notifications`, paged by an opaque cursor. Loaded at boot
  // (so the unread badge shows), refreshed on the refresh button + when the bell opens.
  /** @type {import('../skool/map.js').NotificationView[]} */
  let notifItems = $state([]);
  /** @type {'idle' | 'loading' | 'ready' | 'error'} */
  let notifStatus = $state('idle');
  let notifCursor = $state('');
  let notifHasMore = $state(false);
  const unreadCount = $derived(notifItems.filter((n) => n.unread).length);

  /** Load the first page (replaces the list). */
  async function loadNotifications() {
    if (notifStatus === 'loading') return;
    notifStatus = 'loading';
    try {
      const wafToken = await getWafToken();
      const { items, hasMore, cursor } = await getNotifications({ wafToken });
      notifItems = items;
      notifHasMore = hasMore;
      notifCursor = cursor;
      notifStatus = 'ready';
    } catch {
      notifStatus = 'error';
    }
  }

  /** "Load more" — append the next page via the cursor. */
  async function loadMoreNotifications() {
    if (notifStatus === 'loading' || !notifHasMore || !notifCursor) return;
    notifStatus = 'loading';
    try {
      const wafToken = await getWafToken();
      const { items, hasMore, cursor } = await getNotifications({ wafToken, cursor: notifCursor });
      notifItems = [...notifItems, ...items];
      notifHasMore = hasMore;
      notifCursor = cursor;
      notifStatus = 'ready';
    } catch {
      notifStatus = 'error';
    }
  }

  /**
   * Extract the community slug from a Skool pathname. A community page is `/{slug}` or
   * `/{slug}/...`; reserved top-level paths (login, signup, etc.) and the bare root are not
   * communities.
   * @param {string} pathname
   * @returns {string | null}
   */
  function communitySlug(pathname) {
    const first = pathname.split('/').filter(Boolean)[0];
    if (!first) return null;
    const reserved = new Set([
      '_next',
      'login',
      'signup',
      'discovery',
      'settings',
      'pricing',
      'about',
      'terms',
      'privacy',
    ]);
    return reserved.has(first.toLowerCase()) ? null : first;
  }

  async function boot() {
    const detectedSlug = communitySlug(window.location.pathname);
    if (!detectedSlug) {
      bootState = 'off-community';
      return;
    }
    slug = detectedSlug;
    try {
      // One same-origin fetch of the community page yields BOTH the buildId and the category
      // chips. Cookies ride along automatically; no WAF token needed on reads.
      const res = await fetch(`/${slug}`, { headers: { Accept: 'text/html' } });
      if (!res.ok) throw new Error(`Page load failed (${res.status})`);
      const html = await res.text();

      const buildIdMatch = /"buildId"\s*:\s*"([^"]+)"/.exec(html);
      if (!buildIdMatch) throw new Error('Could not read the community build id.');
      buildId = buildIdMatch[1];

      categories = parseCategories(html);

      // Group display name lives in __NEXT_DATA__; fall back to the slug if absent.
      const nameMatch = /"displayName"\s*:\s*"([^"]+)"/.exec(html);
      groupName = nameMatch ? decodeJsonString(nameMatch[1]) : slug;

      // Group uuid for the api2 comments read. It sits inside `currentGroup`:
      // `"currentGroup":{"id":"<uuid>",...`. Match the id that immediately follows currentGroup.
      const groupIdMatch = /"currentGroup"\s*:\s*\{\s*"id"\s*:\s*"([^"]+)"/.exec(html);
      groupId = groupIdMatch ? groupIdMatch[1] : '';

      // Signed-in user (for the optimistic author of comments/replies you write). Best-effort:
      // the page may not carry it (logged out / shape changed), in which case the write composers
      // fall back to a "You" label — so this NEVER blocks boot.
      currentUser = parseSelf(html);

      feedStore = createFeedStore({ buildId, slug });
      bootState = 'ready';
      void loadNotifications();
    } catch (err) {
      bootError = err instanceof Error ? err.message : 'Something went wrong loading this community.';
      bootState = 'error';
    }
  }

  /**
   * Best-effort scrape of the signed-in user from the page HTML, for the optimistic author of
   * comments/replies you write. Skool exposes the current user as a `"self":{...}` block in
   * `__NEXT_DATA__`; we pull first/last name and the avatar (`pictureBubble`/`picture_bubble`)
   * from the JSON object that follows. Returns undefined when nothing usable is found — the write
   * composers then fall back to a "You" label, so this is purely additive and never blocks boot.
   * @param {string} html
   * @returns {{ name: string, avatar: string } | undefined}
   */
  function parseSelf(html) {
    // Grab a bounded slice after `"self":{` so the name/avatar regexes don't wander into other
    // objects. We don't full-parse __NEXT_DATA__ (huge); a windowed scrape is enough for display.
    const start = /"self"\s*:\s*\{/.exec(html);
    if (!start) return undefined;
    const slice = html.slice(start.index, start.index + 2000);
    const first =
      /"first_?[Nn]ame"\s*:\s*"([^"]*)"/.exec(slice)?.[1] ?? '';
    const last = /"last_?[Nn]ame"\s*:\s*"([^"]*)"/.exec(slice)?.[1] ?? '';
    const avatar =
      /"picture_?[Bb]ubble"\s*:\s*"([^"]*)"/.exec(slice)?.[1] ?? '';
    const name = decodeJsonString(`${first} ${last}`.trim());
    if (!name && !avatar) return undefined;
    return { name: name || 'You', avatar: avatar ? decodeJsonString(avatar) : '' };
  }

  /**
   * Decode the handful of JSON string escapes that show up in a scraped displayName (e.g. `&`,
   * `\"`). Avoids a full JSON.parse on a fragment.
   * @param {string} value
   * @returns {string}
   */
  function decodeJsonString(value) {
    return value
      .replace(/\\u([0-9a-fA-F]{4})/g, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }

  /** @param {string} id */
  function selectPost(id) {
    const feedPost = feedStore?.posts.find((p) => p.id === id);
    selectedId = id;
    openedPost = null; // show the feed preview instantly; the full body swaps in when it loads
    highlightCommentId = '';
    void loadFullPost(id, feedPost?.slug);
  }

  /**
   * The feed payload caps long post bodies (~2.3k chars), so on open we fetch the full post from
   * the single-post route and let it override the feed preview. No-op without a slug/buildId; on
   * failure we keep the preview.
   * @param {string} id
   * @param {string | undefined} postSlug
   */
  async function loadFullPost(id, postSlug) {
    if (!postSlug || !buildId) return;
    try {
      const { post } = await getPost({ buildId, slug, postSlug });
      if (post && selectedId === id) openedPost = post; // ignore if the user moved on
    } catch {
      /* keep the feed preview */
    }
  }

  /**
   * Open a notification's target post in the detail pane (instead of navigating to native Skool).
   * Selects it from the loaded feed when present; otherwise fetches it via the headless Next.js
   * route into `openedPost`, and records the comment to highlight. Falls back to native Skool only
   * if the post can't be resolved.
   * @param {import('../skool/map.js').NotificationView} n
   */
  async function openNotificationTarget(n) {
    highlightCommentId = n.commentId || '';
    selectedId = n.rootPostId;
    openedPost = null; // the feed preview (if any) shows until the full post loads
    const inFeed = feedStore?.posts.find((p) => p.id === n.rootPostId);
    if (n.postSlug && buildId) {
      try {
        const { post } = await getPost({ buildId, slug, postSlug: n.postSlug });
        if (post && selectedId === n.rootPostId) {
          openedPost = post;
          return;
        }
      } catch {
        /* fall through to the native fallback */
      }
    }
    // Couldn't fetch the full post — if it isn't even in the feed, send the user to native Skool.
    if (!inFeed && n.href) window.location.href = n.href;
  }

  // Resolve the selected post + its category name for the detail pane. The post already lives in
  // the feed stream (no extra fetch); the chip name is resolved from the scraped category list,
  // the same way the feed row does it. Either is null/'' when nothing is selected.
  /** @type {import('../skool/map.js').PostView | null} */
  const selectedPost = $derived.by(() => {
    if (!selectedId) return null;
    // Prefer the fetched full post; fall back to the feed preview while it loads (or if it failed).
    if (openedPost && openedPost.id === selectedId) return openedPost;
    return feedStore?.posts.find((p) => p.id === selectedId) ?? null;
  });
  const categoryNameById = $derived(new Map(categories.map((c) => [c.id, c.name])));
  const selectedCategoryName = $derived(
    selectedPost?.labelId ? (categoryNameById.get(selectedPost.labelId) ?? '') : '',
  );

  // getBuildId is part of the data layer's public read surface; referenced here so a future
  // refactor that prefers it over the inline buildId regex stays type-checked. (Boot uses one
  // combined fetch to avoid a second round-trip.)
  void getBuildId;

  boot();
</script>

<div class="sv-root" data-theme={theme === 'default' ? null : theme}>
  <Topbar
    {groupName}
    {theme}
    onThemeChange={changeTheme}
    onExit={handleExit}
    onRefresh={refreshView}
    {notifItems}
    {notifStatus}
    {notifHasMore}
    {unreadCount}
    onOpenNotifications={loadNotifications}
    onLoadMoreNotifications={loadMoreNotifications}
    onOpenNotification={openNotificationTarget}
  />

  {#if bootState === 'off-community'}
    <main class="sv-boot">
      <div class="empty">
        Open a Skool community to use this view.<br />
        Navigate to a community (e.g. <code>skool.com/your-group</code>) and toggle again.
      </div>
    </main>
  {:else if bootState === 'loading'}
    <main class="sv-boot"><div class="empty">Loading community…</div></main>
  {:else if bootState === 'error'}
    <main class="sv-boot">
      <div class="empty">
        {bootError}<br />
        <button class="btn sm" type="button" onclick={boot}>Retry</button>
      </div>
    </main>
  {:else if feedStore}
    <div class="layout">
      <FeedList store={feedStore} {categories} {selectedId} onSelect={selectPost} />
      <DetailPane
        post={selectedPost}
        categoryName={selectedCategoryName}
        {groupId}
        {currentUser}
        {mentionHref}
        {registerMention}
        {refreshNonce}
        {highlightCommentId}
        pinned={feedStore?.isPinned(selectedPost) ?? false}
        nativePinned={selectedPost?.pinned ?? false}
        onTogglePin={(id) => feedStore?.togglePin(id, selectedPost?.pinned ?? false)}
      />
    </div>
  {/if}

  <Lightbox />
</div>
