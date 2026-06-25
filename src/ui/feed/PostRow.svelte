<script>
  // A single feed list row: pin TOGGLE, title, category chip, author avatar + name + date +
  // ▲likes + 💬comments. Clicking the row opens the post; clicking the pin toggles a LOCAL pin
  // (client-side only — see skool/pins.js) without opening the post. Natively-pinned posts show
  // the pin lit + disabled: Skool pins are read-only, we never unpin them.
  import Avatar from '../Avatar.svelte';
  import { shortDate, compactCount } from '../lib/format.js';

  /**
   * @typedef {object} Props
   * @property {import('../../skool/map.js').PostView} post
   * @property {string} categoryName Resolved category label, or '' if none/unknown.
   * @property {boolean} selected
   * @property {boolean} pinned Shows as pinned (native OR local).
   * @property {boolean} nativePinned Pinned by Skool (read-only — toggle disabled).
   * @property {(id: string) => void} onSelect
   * @property {(id: string) => void} onTogglePin
   */
  /** @type {Props} */
  let { post, categoryName, selected, pinned, nativePinned, onSelect, onTogglePin } = $props();

  /** True when an event originated on the pin button (so the row ignores it). */
  const fromPin = (/** @type {Event} */ e) =>
    e.target instanceof Element && e.target.closest('.pinbtn') != null;
</script>

<div
  class="row"
  class:selected
  role="button"
  tabindex="0"
  aria-label={`Open post: ${post.title}`}
  aria-current={selected ? 'true' : undefined}
  onclick={(e) => {
    if (fromPin(e)) return;
    onSelect(post.id);
  }}
  onkeydown={(e) => {
    if (fromPin(e)) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(post.id);
    }
  }}
>
  <button
    class="pinbtn"
    class:on={pinned}
    type="button"
    disabled={nativePinned}
    aria-pressed={pinned}
    title={nativePinned ? 'Pinned by Skool' : pinned ? 'Unpin (local)' : 'Pin (local)'}
    aria-label={nativePinned
      ? 'Pinned by Skool'
      : `${pinned ? 'Unpin' : 'Pin'} post (local)`}
    onclick={(e) => {
      e.stopPropagation();
      onTogglePin(post.id);
    }}
  >
    📌
  </button>
  <div class="rmain">
    <div class="rtitle">{post.title}</div>
    {#if categoryName}
      <div class="rcat"><span class="catchip">{categoryName}</span></div>
    {/if}
    <div class="rmeta">
      <Avatar src={post.author.avatar} size="xs" />
      <span class="rname">{post.author.name}</span>
      <span class="rstat"
        >· {shortDate(post.created)} · ▲{compactCount(post.upvotes)} · 💬{compactCount(
          post.comments,
        )}</span
      >
    </div>
  </div>
</div>
