<script>
  // Composer textarea with an @-mention autocomplete (§6 step 5c). Shared by the top comment
  // composer (CommentsSection) and the reply composer (Comment). It owns the visible text and the
  // list of picked mentions: typing `@query` searches members (read.searchUsers — WAF-gated, runs
  // from this content-script origin), and picking a result inserts a visible `@First Last` while
  // tracking the user's id. On send the parent calls serialize() to get the wire content with
  // mentions converted to `[@First Last](obj://user/{id})` (skool/mentions.serializeMentions).
  // Picked users are reported via onRegister(id, handle) so the app can render the mention as a
  // profile link. Plain <textarea> + token tracking (not contenteditable chips) — see spec/brief.
  import { tick } from 'svelte';
  import Avatar from '../Avatar.svelte';
  import { searchUsers } from '../../skool/read.js';
  import { serializeMentions } from '../../skool/mentions.js';

  /**
   * @typedef {import('../../skool/map.js').MentionUser} MentionUser
   * @typedef {{ display: string, id: string, handle: string }} Tracked
   */

  /**
   * @typedef {object} Props
   * @property {string} [value] Visible composer text (bindable).
   * @property {string} [placeholder]
   * @property {string} [ariaLabel] Accessible label for the textarea.
   * @property {boolean} [disabled]
   * @property {number} [rows] Textarea rows.
   * @property {string} [groupId] Community group uuid (search scope).
   * @property {() => Promise<string>} [tokenFn] WAF-token getter.
   * @property {typeof searchUsers} [searchFn] Injectable member search (tests/preview).
   * @property {(id: string, handle: string) => void} [onRegister] Report a picked user id->handle.
   * @property {{ display: string, id: string, handle?: string } | null} [seed] Optional initial mention.
   */
  /** @type {Props} */
  let {
    value = $bindable(''),
    placeholder = '',
    ariaLabel = '',
    disabled = false,
    rows = 3,
    groupId = '',
    tokenFn,
    searchFn = searchUsers,
    onRegister,
    seed = null,
  } = $props();

  /** @type {Tracked[]} */
  let mentions = $state([]);
  /** @type {HTMLTextAreaElement | undefined} */
  let textarea = $state();

  // ---- autocomplete dropdown ----
  let open = $state(false);
  /** @type {MentionUser[]} */
  let items = $state([]);
  let active = $state(0);
  let searching = $state(false);
  let tokenStart = -1; // index of the active token's '@' within `value`
  let seq = 0; // guards out-of-order search responses
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;

  // Seed an initial mention (reply composers pre-fill @author). Runs once, and never clobbers text
  // the user has already (e.g. a reopened composer).
  let seeded = $state(false);
  $effect(() => {
    if (seeded || !seed) return;
    seeded = true;
    if (value) return;
    const display = seed.display ?? '';
    if (!display) return;
    value = `@${display} `;
    if (seed.id) {
      mentions = [{ display, id: seed.id, handle: seed.handle ?? '' }];
      if (seed.handle) onRegister?.(seed.id, seed.handle);
    }
  });

  /** Serialize the visible text to wire content (mentions -> obj:// markup). */
  export function serialize() {
    return serializeMentions(value, mentions);
  }
  /** Clear text + tracked mentions after a successful send. */
  export function reset() {
    value = '';
    mentions = [];
    close();
  }

  function close() {
    open = false;
    items = [];
    active = 0;
    tokenStart = -1;
    seq++; // invalidate any in-flight search
    clearTimeout(timer);
  }

  // Detect an `@query` token ending at the caret; debounce a member search when present.
  function detect() {
    if (!textarea) return;
    const pos = textarea.selectionStart ?? value.length;
    const match = /(^|\s)@([^\s@]{0,30})$/.exec(value.slice(0, pos));
    if (!match) {
      close();
      return;
    }
    const query = match[2];
    tokenStart = pos - query.length - 1;
    if (query.length < 1) {
      close();
      return;
    }
    open = true;
    searching = true;
    clearTimeout(timer);
    timer = setTimeout(() => run(query), 180);
  }

  /** @param {string} query */
  async function run(query) {
    const my = ++seq;
    try {
      const wafToken = tokenFn ? await tokenFn() : '';
      const users = await searchFn({ query, groupId, wafToken, limit: 7 });
      if (my !== seq) return;
      items = users;
      active = 0;
      open = users.length > 0;
    } catch {
      if (my !== seq) return;
      items = [];
      open = false;
    } finally {
      if (my === seq) searching = false;
    }
  }

  /** @param {MentionUser} user */
  async function pick(user) {
    if (tokenStart < 0 || !textarea) {
      close();
      return;
    }
    const pos = textarea.selectionStart ?? value.length;
    const before = value.slice(0, tokenStart);
    const after = value.slice(pos);
    const insert = `@${user.name} `;
    value = `${before}${insert}${after}`;
    mentions = [...mentions, { display: user.name, id: user.id, handle: user.handle }];
    if (user.id && user.handle) onRegister?.(user.id, user.handle);
    const caret = before.length + insert.length;
    close();
    await tick();
    if (textarea) {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = caret;
    }
  }

  /** @param {KeyboardEvent} e */
  function onkeydown(e) {
    if (!open || items.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      active = (active + 1) % items.length;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      active = (active - 1 + items.length) % items.length;
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick(items[active]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  /** @param {KeyboardEvent} e */
  function onkeyup(e) {
    if (!['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) detect();
  }
</script>

<div class="mb">
  <textarea
    bind:this={textarea}
    bind:value
    {placeholder}
    {disabled}
    {rows}
    aria-label={ariaLabel || undefined}
    oninput={detect}
    {onkeyup}
    {onkeydown}
    onblur={() => setTimeout(close, 120)}
  ></textarea>

  {#if open}
    <div class="mb-list">
      {#if searching && items.length === 0}
        <div class="mb-empty">Searching…</div>
      {/if}
      {#each items as user, i (user.id)}
        <button
          type="button"
          class="mb-item"
          class:active={i === active}
          onmousedown={(e) => {
            e.preventDefault();
            pick(user);
          }}
        >
          <Avatar src={user.avatar} size="sm" />
          <span class="mb-name">{user.name}</span>
          <span class="mb-handle">@{user.handle}</span>
        </button>
      {/each}
    </div>
  {/if}
</div>
