<script>
  // Overlay top bar: "← Back to Skool" exit, brand + community name, the single "Feed" tab, then a
  // right cluster — manual REFRESH, the notifications bell (+ unread badge + dropdown panel), a
  // disabled chat placeholder (v2), and the theme selector. Clicking a notification deep-links to
  // native Skool (see NotificationPanel). No yellow new-post banner (spec §4/§5).
  import ThemeSelect from './ThemeSelect.svelte';
  import NotificationPanel from './NotificationPanel.svelte';

  /** @typedef {import('../skool/map.js').NotificationView} NotificationView */

  /**
   * @typedef {object} Props
   * @property {string} groupName Community display name for the brand area.
   * @property {import('./theme.js').ThemeId} theme
   * @property {(theme: import('./theme.js').ThemeId) => void} onThemeChange
   * @property {() => void} onExit Toggles the overlay off (content-script toggle).
   * @property {() => void} [onRefresh] Reload the feed (and the open post's comments).
   * @property {NotificationView[]} [notifItems]
   * @property {'idle' | 'loading' | 'ready' | 'error'} [notifStatus]
   * @property {boolean} [notifHasMore]
   * @property {number} [unreadCount]
   * @property {() => void} [onOpenNotifications] Called when the bell opens (trigger a fetch).
   * @property {() => void} [onLoadMoreNotifications] Append the next page of notifications.
   * @property {(n: NotificationView) => void} [onOpenNotification] Open a notification's target post.
   */
  /** @type {Props} */
  let {
    groupName,
    theme,
    onThemeChange,
    onExit,
    onRefresh,
    notifItems = [],
    notifStatus = 'idle',
    notifHasMore = false,
    unreadCount = 0,
    onOpenNotifications,
    onLoadMoreNotifications,
    onOpenNotification,
  } = $props();

  let notifOpen = $state(false);
  function toggleNotif() {
    notifOpen = !notifOpen;
    if (notifOpen) onOpenNotifications?.();
  }
</script>

<header class="topbar">
  <div class="topbar-left">
    <button
      class="iconbtn exitbtn"
      type="button"
      aria-label="Back to Skool — return to the native view"
      title="Return to native Skool — the toolbar icon (Alt+S) reopens this view"
      onclick={onExit}
    >
      <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
    </button>
    <div class="brand"><span class="brand-mark">▣</span> <span>{groupName}</span></div>
  </div>

  <nav class="tabs" aria-label="Views">
    <button type="button" class="active" aria-current="page">Feed</button>
  </nav>

  <div class="topbar-right">
    <button
      class="iconbtn"
      type="button"
      aria-label="Refresh feed"
      title="Refresh — reload posts and comments"
      onclick={onRefresh}
    >
      <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.65 6.35A7.96 7.96 0 0 0 12 4a8 8 0 1 0 7.75 10h-2.08A6 6 0 1 1 12 6c1.66 0 3.15.69 4.24 1.78L13 11h7V4z"
        />
      </svg>
    </button>

    <div class="notif-wrap">
      <button
        class="iconbtn"
        type="button"
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={notifOpen}
        title="Notifications"
        onclick={toggleNotif}
      >
        <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6v-5a6 6 0 0 0-5-5.91V4a1 1 0 0 0-2 0v1.09A6 6 0 0 0 6 11v5l-2 2v1h16v-1z"
          />
        </svg>
        {#if unreadCount > 0}
          <span class="notif-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        {/if}
      </button>
      {#if notifOpen}
        <NotificationPanel
          items={notifItems}
          status={notifStatus}
          hasMore={notifHasMore}
          onLoadMore={onLoadMoreNotifications}
          onOpen={(n) => {
            notifOpen = false;
            onOpenNotification?.(n);
          }}
          onClose={() => (notifOpen = false)}
        />
      {/if}
    </div>

    <button
      class="iconbtn"
      type="button"
      disabled
      aria-label="Chat — coming in a later version"
      title="Chat — coming soon"
    >
      <svg class="ic" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"
        />
      </svg>
    </button>

    <ThemeSelect value={theme} onChange={onThemeChange} />
  </div>
</header>
