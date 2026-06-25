<script>
  // Right detail pane (§6 step 4a). Renders the SELECTED post from the already-mapped post
  // view-model the feed already holds — no new network call. Scope is POST rendering only:
  //   - header (avatar + name + date), category chip, title
  //   - body via {@html post.contentHtml} (already sanitized/escaped by markup.toHtml — safe)
  //   - action row: like + pin reflecting REAL state but inert (writes are step 5)
  //   - comments: the real comment list + its lazy api2 fetch live in CommentsSection (step 4b);
  //     this pane just hands it the post id, the group id, and the stored comment count.
  // When nothing is selected (or the post can't be found in the loaded stream) we keep the
  // "Select a post…" placeholder.
  import Avatar from './Avatar.svelte';
  import PostActions from './detail/PostActions.svelte';
  import CommentsSection from './detail/CommentsSection.svelte';
  import AttachmentList from './detail/AttachmentList.svelte';
  import { shortDate } from './lib/format.js';
  import { toHtml } from '../skool/markup.js';

  /**
   * @typedef {object} Props
   * @property {import('../skool/map.js').PostView | null} [post] The selected post view-model,
   *   or null when nothing is selected / the selection isn't in the loaded stream.
   * @property {string} [categoryName] Resolved category label for the chip, '' if none/unknown.
   *   (The view-model carries only `labelId`; names live in the scraped category list, resolved
   *   by App — same pattern the feed row uses.)
   * @property {string} [groupId] The community group's uuid, for the api2 comments read + writes.
   * @property {{ name: string, avatar: string }} [currentUser] The signed-in user (scraped from
   *   the page), shown as the optimistic author of comments/replies you write. May be undefined.
   * @property {(id: string) => (string | null)} [mentionHref] Resolve a user id to a profile URL.
   * @property {(id: string, handle: string) => void} [registerMention] Record a user id->handle.
   * @property {number} [refreshNonce] Bumped by a manual refresh to force a comments re-fetch.
   * @property {string} [highlightCommentId] A comment to scroll to + highlight (from a notification).
   * @property {boolean} [pinned] Shows as pinned (native OR local).
   * @property {boolean} [nativePinned] Pinned by Skool (read-only — toggle disabled).
   * @property {(id: string) => void} [onTogglePin] Toggle this post's local pin.
   */
  /** @type {Props} */
  let {
    post = null,
    categoryName = '',
    groupId = '',
    currentUser,
    mentionHref,
    registerMention,
    refreshNonce = 0,
    highlightCommentId = '',
    pinned = false,
    nativePinned = false,
    onTogglePin,
  } = $props();
</script>

<main class="detail">
  {#if !post}
    <div class="placeholder">Select a post to open it here →</div>
  {:else}
    <article class="dwrap">
      <div class="pmeta">
        <Avatar src={post.author.avatar} size="md" />
        <div>
          <div class="who">{post.author.name}</div>
          <div class="when">{shortDate(post.created)}</div>
        </div>
      </div>

      <h1>{post.title}</h1>

      {#if categoryName}
        <div class="dcat"><span class="catchip">{categoryName}</span></div>
      {/if}

      <!-- toHtml(content) with mention links resolved — already HTML-escaped/sanitized. -->
      <div class="dbody">{@html toHtml(post.content, { mentionHref })}</div>

      <AttachmentList items={post.attachments ?? []} />

      <PostActions
        postId={post.id}
        upvotes={post.upvotes}
        {pinned}
        {nativePinned}
        {onTogglePin}
      />

      <CommentsSection
        postId={post.id}
        {groupId}
        count={post.comments}
        {currentUser}
        {mentionHref}
        {registerMention}
        {refreshNonce}
        {highlightCommentId}
      />
    </article>
  {/if}
</main>
