<script>
  // A single comment row (§6 step 5). Renders avatar, author, timestamp, body (already-sanitized
  // markup.toHtml), and a LIVE like + reply composer (on top-level comments AND replies).
  //
  // A comment IS a post, so liking it uses the same `vote` write as a post. Like toggles
  // OPTIMISTICALLY (flip + count immediately, roll back on failure). Sending a reply calls
  // `createComment({ rootId: postId, parentId: threadId, ... })`, where `threadId` is the thread's
  // TOP-LEVEL comment id — Skool is flat 2-level, so a reply-to-a-reply attaches to the same
  // thread (seeded with an `@name` marking who it answers), never a 3rd nesting level. On success
  // we hand the mapped reply up via `onReply` (CommentsSection owns the comment tree); on failure
  // we restore the draft and show an inline error. All writes run from this content-script origin
  // (cookies + x-aws-waf-token). 403 ⇒ stale token ⇒ clear the cache.
  import Avatar from '../Avatar.svelte';
  import Thumb from './Thumb.svelte';
  import MentionBox from './MentionBox.svelte';
  import AttachmentList from './AttachmentList.svelte';
  import { commentTime, compactCount } from '../lib/format.js';
  import { toHtml } from '../../skool/markup.js';
  import { vote, createComment } from '../../skool/write.js';
  import { getWafToken, clearWafToken } from '../waf.js';

  /**
   * @typedef {import('../../skool/map.js').CommentView} CommentView
   * @typedef {{ name: string, avatar: string }} CurrentUser
   */

  /**
   * @typedef {object} Props
   * @property {CommentView} comment The mapped comment view-model.
   * @property {boolean} [isReply] True when rendered as a nested reply (tighter styling).
   * @property {boolean} [canReply] Whether to show the Reply affordance.
   * @property {string} [postId] The top post's uuid — the `root_id` for any reply.
   * @property {string} [threadId] The thread's top-level comment id any reply attaches to (flat
   *   2-level model). Empty ⇒ this comment IS the thread root (it replies to itself).
   * @property {(id: string) => (string | null)} [mentionHref] Resolve a user id to a profile URL.
   * @property {(id: string, handle: string) => void} [registerMention] Record a user id->handle.
   * @property {string} [groupId] The community group's uuid.
   * @property {CurrentUser} [currentUser] Optimistic author for a new reply.
   * @property {(reply: CommentView) => void} [onReply] Called with the created reply on success.
   * @property {typeof vote} [voteFn] Injectable like write.
   * @property {typeof createComment} [createCommentFn] Injectable reply write.
   * @property {typeof getWafToken} [tokenFn] Injectable WAF-token getter.
   */
  /** @type {Props} */
  let {
    comment,
    isReply = false,
    canReply = false,
    postId = '',
    groupId = '',
    threadId = '',
    currentUser,
    onReply,
    voteFn = vote,
    createCommentFn = createComment,
    tokenFn = getWafToken,
    mentionHref,
    registerMention,
  } = $props();

  /** @type {{ serialize: () => string, reset: () => void } | undefined} */
  let replyBox = $state();

  // Seed the reply composer with an @mention of THIS comment's author (flat 2-level: replies land
  // in the same thread, so the @name marks who they answer). A real linked mention when we have the
  // author's id + handle.
  const seed = $derived({
    display: comment.author.name,
    id: comment.author.id,
    handle: comment.author.handle,
  });
  // Body with mention links resolved (mentionHref), re-derived from the raw content so a freshly
  // registered handle can upgrade a mention to a link.
  const bodyHtml = $derived(toHtml(comment.content, { mentionHref }));

  // ---- like (optimistic) ----
  let liked = $state(false);
  // Seeded from `comment.upvotes` by the $effect below (keeps the optimistic count effect-driven
  // so it isn't a one-time capture of the prop, and resyncs if the row is reused for a new id).
  let count = $state(0);
  let liking = $state(false);
  let likeErr = $state(false);

  $effect(() => {
    void comment.id; // resync on a different comment (rows are keyed by id, so this is belt+braces)
    liked = false;
    count = comment.upvotes;
    likeErr = false;
  });

  async function toggleLike() {
    if (liking) return;
    const prevLiked = liked;
    const prevCount = count;
    const next = !liked;
    liked = next;
    count = Math.max(0, count + (next ? 1 : -1));
    liking = true;
    likeErr = false;
    try {
      const wafToken = await tokenFn();
      await voteFn({ postId: comment.id, like: next, wafToken });
    } catch (err) {
      liked = prevLiked;
      count = prevCount;
      likeErr = true;
      if (/** @type {any} */ (err)?.status === 403) clearWafToken();
    } finally {
      liking = false;
    }
  }

  // ---- reply composer (live) ----
  let replying = $state(false);
  let draft = $state('');
  let sending = $state(false);
  let replyErr = $state('');

  // Open/close the reply composer. The MentionBox seeds the @author mention itself (see `seed`).
  function toggleReply() {
    replying = !replying;
  }

  async function sendReply() {
    const visible = draft.trim();
    if (!visible || sending) return;
    sending = true;
    replyErr = '';
    try {
      const wafToken = await tokenFn();
      // serialize() converts tracked @mentions to obj:// wire format; falls back to the raw draft.
      const content = replyBox?.serialize() ?? draft;
      const created = await createCommentFn({
        groupId,
        rootId: postId,
        // Flat 2-level: a reply always attaches to the thread's top-level comment. threadId is set
        // for replies; for a top-level comment it's empty, so it replies to itself.
        parentId: threadId || comment.id,
        content,
        wafToken,
      });
      // Fill in the optimistic author when the response didn't carry one.
      /** @type {CommentView} */
      const reply = {
        ...created,
        // This is OUR write — author is the signed-in user (scraped at boot), not the blank/'Member'
        // author from the minimal POST response.
        author: {
          id: '',
          name: currentUser?.name || 'You',
          handle: '',
          firstName: '',
          lastName: '',
          avatar: currentUser?.avatar || '',
        },
        // The minimal/echoed reply may lack rendered HTML — show the raw text as a fallback.
        contentHtml: created.contentHtml || escapeHtml(content),
      };
      onReply?.(reply);
      replyBox?.reset();
      draft = '';
      replying = false;
    } catch (err) {
      replyErr = /** @type {any} */ (err)?.status === 403
        ? 'Reload Skool and try again.'
        : "Couldn't post your reply.";
      if (/** @type {any} */ (err)?.status === 403) clearWafToken();
    } finally {
      sending = false;
    }
  }

  /**
   * Minimal HTML-escape for the optimistic reply body (the write layer may return no rendered
   * HTML). Mirrors markup.escapeHtml; kept local so the fallback never injects raw markup.
   * @param {string} value
   */
  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (c) =>
      c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
    );
  }
</script>

<div class="comment" class:reply={isReply} data-cid={comment.id}>
  <Avatar src={comment.author.avatar} size="sm" />
  <div class="cbody">
    <div class="crow">
      <span class="who">{comment.author.name}</span>
      <span class="ctime">{commentTime(comment.ts)}</span>
    </div>
    <!-- bodyHtml is skool/markup.toHtml(content) with mention links resolved — escaped/sanitized. -->
    <p class="ctext">{@html bodyHtml}</p>
    <AttachmentList items={comment.attachments ?? []} compact />
    <div class="cactions">
      <button
        class="clike"
        class:on={liked}
        type="button"
        disabled={liking}
        aria-pressed={liked}
        aria-busy={liking}
        aria-label={`${liked ? 'Unlike' : 'Like'} comment, ${count} likes`}
        onclick={toggleLike}
      >
        <Thumb />
        {compactCount(count)}
      </button>
      {#if likeErr}
        <span class="acterr" role="status">Couldn't save</span>
      {/if}
      {#if canReply}
        <button
          class="replybtn"
          type="button"
          aria-expanded={replying}
          onclick={toggleReply}
        >
          Reply
        </button>
      {/if}
    </div>

    {#if replying}
      <div class="replybox">
        <MentionBox
          bind:this={replyBox}
          bind:value={draft}
          ariaLabel="Write a reply"
          placeholder="Reply…"
          rows={2}
          disabled={sending}
          {groupId}
          {tokenFn}
          {seed}
          onRegister={registerMention}
        />
        <button
          class="btn sm"
          type="button"
          disabled={sending || !draft.trim()}
          aria-busy={sending}
          onclick={sendReply}
        >
          {sending ? 'Posting…' : 'Reply'}
        </button>
      </div>
      {#if replyErr}
        <div class="acterr" role="status">{replyErr}</div>
      {/if}
    {/if}
  </div>
</div>
