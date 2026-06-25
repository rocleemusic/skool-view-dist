<script>
  // Comments section (§6 steps 4b + 5). On post selection we lazily fetch the post's comments from
  // the WAF-gated api2 endpoint (skool/read.getComments, run from this content-script/page origin
  // so cookies + the x-aws-waf-token header work), map them, and render them. Two views: Threaded
  // (replies nested under parents) and Time (flat, newest first).
  //
  // Step 5 makes the writes LIVE: the top composer posts a top-level comment
  // (`createComment({ rootId: postId, parentId: postId })`) and PREPENDS it optimistically;
  // each comment's like + reply composer is live too (handled inside Comment). On a write failure
  // we roll back and show an inline error. A 403 (stale WAF token) clears the cache.
  //
  // States: loading / empty / error (read). A 403 on the read shows a reload hint.
  import { tick } from 'svelte';
  import { getComments } from '../../skool/read.js';
  import { createComment } from '../../skool/write.js';
  import { getWafToken, clearWafToken } from '../waf.js';
  import Comment from './Comment.svelte';
  import MentionBox from './MentionBox.svelte';

  /**
   * @typedef {import('../../skool/map.js').CommentView} CommentView
   * @typedef {{ name: string, avatar: string }} CurrentUser
   */

  /**
   * @typedef {object} Props
   * @property {string} postId The selected post's uuid (the api2 comments key + root_id).
   * @property {string} [groupId] The community group's uuid (`group-id` param). '' disables fetch.
   * @property {number} count Real comment count from the post view-model (header fallback).
   * @property {CurrentUser} [currentUser] Optimistic author for newly written comments/replies.
   * @property {typeof getComments} [fetchComments] Injectable for tests/preview.
   * @property {typeof createComment} [createCommentFn] Injectable write for tests/preview.
   * @property {typeof getWafToken} [tokenFn] Injectable WAF-token getter.
   * @property {(id: string) => (string | null)} [mentionHref] Resolve a user id to a profile URL.
   * @property {(id: string, handle: string) => void} [registerMention] Record a user id->handle.
   * @property {number} [refreshNonce] Bumped by a manual refresh to force a comments re-fetch.
   * @property {string} [highlightCommentId] A comment to scroll to + highlight (from a notification).
   */
  /** @type {Props} */
  let {
    postId,
    groupId = '',
    count,
    currentUser,
    fetchComments = getComments,
    createCommentFn = createComment,
    tokenFn = getWafToken,
    mentionHref,
    registerMention,
    refreshNonce = 0,
    highlightCommentId = '',
  } = $props();

  /** @type {HTMLDivElement | undefined} */
  let listEl = $state();

  /** @type {{ serialize: () => string, reset: () => void } | undefined} */
  let composer = $state();

  /** @typedef {'idle' | 'loading' | 'ready' | 'error'} LoadState */
  let loadState = $state(/** @type {LoadState} */ ('idle'));
  let errorMessage = $state('');
  /** @type {CommentView[]} */
  let comments = $state([]);
  /** @type {number | string | null} Next-page cursor (the prior response's `last`). */
  let commentsCursor = $state(null);
  let commentsHasMore = $state(false);
  let loadingMore = $state(false);

  /** @type {'thread' | 'time'} */
  let sort = $state('thread');

  // ---- top composer (live) ----
  let draft = $state('');
  let sending = $state(false);
  let composeErr = $state('');

  // A request token guards against out-of-order responses when the user switches posts mid-fetch.
  let requestToken = 0;

  /**
   * Load the selected post's comments. Re-runs whenever postId/groupId change (see $effect below).
   * @param {string} id
   * @param {string} gid
   */
  async function load(id, gid) {
    const token = ++requestToken;
    comments = [];
    commentsCursor = null;
    commentsHasMore = false;
    if (!id || !gid) {
      // Without a group uuid we can't call api2 — show empty rather than a hard error.
      loadState = 'ready';
      return;
    }
    loadState = 'loading';
    errorMessage = '';
    try {
      const wafToken = await tokenFn();
      const result = await fetchComments({ postId: id, groupId: gid, wafToken });
      if (token !== requestToken) return; // a newer post was selected — discard
      comments = result.items;
      commentsCursor = result.cursor;
      commentsHasMore = result.hasMore;
      registerAuthors(result.items);
      loadState = 'ready';
    } catch (err) {
      if (token !== requestToken) return;
      // A stale WAF token (or an unsolved challenge) returns 403. Drop the cached token so a
      // retry re-reads it, and tell the user to reload Skool (which refreshes the token).
      const is403 = err instanceof Error && /\b403\b/.test(err.message);
      if (is403) clearWafToken();
      errorMessage = is403
        ? "Couldn't load comments — reload Skool and try again."
        : "Couldn't load comments. Try again.";
      loadState = 'error';
    }
  }

  function retry() {
    void load(postId, groupId);
  }

  /** Load the next page of top-level comments (Skool's "show more"), appending + de-duping. */
  async function loadMoreComments() {
    if (loadingMore || !commentsHasMore || commentsCursor == null) return;
    loadingMore = true;
    try {
      const wafToken = await tokenFn();
      const result = await fetchComments({ postId, groupId, wafToken, createdGt: commentsCursor });
      const have = new Set(comments.map((c) => c.id));
      const fresh = result.items.filter((c) => !have.has(c.id));
      comments = [...comments, ...fresh];
      registerAuthors(fresh);
      commentsCursor = result.cursor;
      commentsHasMore = result.hasMore && fresh.length > 0;
    } catch (err) {
      // Keep what's loaded; a 403 means a stale WAF token — clear it so a retry re-reads.
      if (err instanceof Error && /\b403\b/.test(err.message)) clearWafToken();
    } finally {
      loadingMore = false;
    }
  }

  // Re-fetch on selection change. Reading postId/groupId here registers the dependency; reading
  // refreshNonce makes a manual refresh re-fetch the open post's comments too.
  $effect(() => {
    void refreshNonce;
    void load(postId, groupId);
  });

  // Scroll to + briefly highlight a comment targeted by a notification, once it's loaded. Best
  // effort: if the comment isn't in the loaded set (e.g. beyond the first page), the post still
  // opens — we just don't scroll. Guarded so a refresh doesn't re-scroll the same target.
  let lastFlashed = '';
  $effect(() => {
    void comments; // re-run when the list (re)loads
    const id = highlightCommentId;
    if (!id || id === lastFlashed || loadState !== 'ready' || !listEl) return;
    const container = listEl;
    tick().then(() => {
      const node = container.querySelector(`[data-cid="${id}"]`);
      if (!node) return;
      lastFlashed = id;
      node.scrollIntoView({ behavior: 'smooth', block: 'center' });
      node.classList.add('cflash');
      setTimeout(() => node.classList.remove('cflash'), 2000);
    });
  });

  /**
   * Post a top-level comment. parent_id == root_id == the post. Prepends the new comment
   * optimistically once the write resolves (we get the real id back to reconcile against).
   */
  async function sendComment() {
    const visible = draft.trim();
    if (!visible || sending) return;
    sending = true;
    composeErr = '';
    try {
      const wafToken = await tokenFn();
      // serialize() converts tracked @mentions to obj:// wire format; falls back to the raw draft.
      const content = composer?.serialize() ?? draft;
      const created = await createCommentFn({
        groupId,
        rootId: postId,
        parentId: postId,
        content,
        wafToken,
      });
      /** @type {CommentView} */
      const newComment = {
        ...created,
        // This is OUR write — the author is the signed-in user (scraped at boot). The minimal POST
        // response carries no real author (mapAuthor would default to 'Member'), so don't use it.
        author: {
          id: '',
          name: currentUser?.name || 'You',
          handle: '',
          firstName: '',
          lastName: '',
          avatar: currentUser?.avatar || '',
        },
        contentHtml: created.contentHtml || escapeHtml(content),
        replies: created.replies ?? [],
      };
      comments = [newComment, ...comments];
      composer?.reset();
      draft = '';
    } catch (err) {
      composeErr = /** @type {any} */ (err)?.status === 403
        ? 'Reload Skool and try again.'
        : "Couldn't post your comment.";
      if (/** @type {any} */ (err)?.status === 403) clearWafToken();
    } finally {
      sending = false;
    }
  }

  /**
   * Append a reply (created by a child Comment) to its thread. `parentId` is ALWAYS the top-level
   * comment id (flat 2-level: a reply to a top-level comment AND a reply-to-a-reply both land in
   * the same thread), so every new reply joins that comment's `replies`. Replaces the comments
   * array so Svelte re-renders the affected thread. Keeps CommentsSection the single owner of the
   * comment tree.
   * @param {string} parentId The thread's top-level comment id.
   * @param {CommentView} reply
   */
  function appendReply(parentId, reply) {
    comments = comments.map((c) =>
      c.id === parentId ? { ...c, replies: [...(c.replies ?? []), reply] } : c,
    );
  }

  /**
   * Record every loaded comment/reply author's id->handle so their @mentions (here or in other
   * threads) can render as profile links. Best-effort — see App.mentionHref.
   * @param {CommentView[]} list
   */
  function registerAuthors(list) {
    for (const c of list) {
      if (c.author?.id && c.author?.handle) registerMention?.(c.author.id, c.author.handle);
      if (c.replies?.length) registerAuthors(c.replies);
    }
  }

  /**
   * Minimal HTML-escape for an optimistic comment body when the write returned no rendered HTML.
   * @param {string} value
   */
  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (c) =>
      c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;',
    );
  }

  // Threaded: parents in order, each followed by its nested replies (rendered by the child).
  // Time: every comment + reply flattened, newest first.
  const flatByTime = $derived.by(() => {
    /** @type {CommentView[]} */
    const flat = [];
    for (const c of comments) {
      flat.push(c);
      for (const r of c.replies ?? []) flat.push(r);
    }
    return flat.slice().sort((a, b) => String(b.ts).localeCompare(String(a.ts)));
  });

  // Count every node in the comment tree (top-level comments + replies at any nesting depth) so
  // the header roughly matches the feed row's comment count, not just the top-level total.
  /** @param {CommentView[]} nodes */
  function countTree(nodes) {
    let total = 0;
    for (const c of nodes) total += 1 + countTree(c.replies ?? []);
    return total;
  }

  // Header label: while loading show the post's stored count; once ready show the loaded total — as
  // "X of Y" while more pages remain (the "Show more comments" button loads them via `created-gt`),
  // then the plain loaded count once the whole thread is in.
  const loadedCount = $derived(countTree(comments));
  const headerLabel = $derived.by(() => {
    if (loadState !== 'ready') return `${count} ${count === 1 ? 'comment' : 'comments'}`;
    if (commentsHasMore && loadedCount < count) return `${loadedCount} of ${count} comments`;
    return `${loadedCount} ${loadedCount === 1 ? 'comment' : 'comments'}`;
  });
</script>

<section class="comments">
  <div class="chead-row">
    <h3>{headerLabel}</h3>
    <div class="seg" role="group" aria-label="Sort comments">
      <button
        type="button"
        class:on={sort === 'thread'}
        aria-pressed={sort === 'thread'}
        onclick={() => (sort = 'thread')}
      >
        Threaded
      </button>
      <button
        type="button"
        class:on={sort === 'time'}
        aria-pressed={sort === 'time'}
        onclick={() => (sort = 'time')}
      >
        Time
      </button>
    </div>
  </div>

  <div class="composer">
    <MentionBox
      bind:this={composer}
      bind:value={draft}
      ariaLabel="Write a comment"
      placeholder="Write a comment…"
      disabled={sending}
      {groupId}
      {tokenFn}
      onRegister={registerMention}
    />
    <button
      class="btn"
      type="button"
      disabled={sending || !draft.trim()}
      aria-busy={sending}
      onclick={sendComment}
    >
      {sending ? 'Posting…' : 'Comment'}
    </button>
  </div>
  {#if composeErr}
    <div class="acterr" role="status">{composeErr}</div>
  {/if}

  <div class="clist" bind:this={listEl}>
    {#if loadState === 'loading'}
      <div class="cempty">Loading comments…</div>
    {:else if loadState === 'error'}
      <div class="cempty">
        {errorMessage}<br />
        <button class="btn sm" type="button" onclick={retry}>Retry</button>
      </div>
    {:else if comments.length === 0}
      <div class="cempty">No comments yet — be the first to comment.</div>
    {:else if sort === 'time'}
      {#each flatByTime as comment (comment.id)}
        <Comment {comment} {postId} {groupId} {currentUser} {tokenFn} {mentionHref} {registerMention} createCommentFn={createCommentFn} />
      {/each}
    {:else}
      {#each comments as comment (comment.id)}
        <Comment
          {comment}
          canReply
          {postId}
          {groupId}
          {currentUser}
          {tokenFn}
          {mentionHref}
          {registerMention}
          createCommentFn={createCommentFn}
          onReply={(reply) => appendReply(comment.id, reply)}
        />
        {#if comment.replies?.length}
          <div class="replies">
            {#each comment.replies as reply (reply.id)}
              <Comment
                comment={reply}
                isReply
                canReply
                {postId}
                {groupId}
                threadId={comment.id}
                {currentUser}
                {tokenFn}
                {mentionHref}
                {registerMention}
                createCommentFn={createCommentFn}
                onReply={(r) => appendReply(comment.id, r)}
              />
            {/each}
          </div>
        {/if}
      {/each}
    {/if}
    {#if loadState === 'ready' && commentsHasMore}
      <button class="btn sm cmore" type="button" disabled={loadingMore} onclick={loadMoreComments}>
        {loadingMore ? 'Loading…' : 'Show more comments'}
      </button>
    {/if}
  </div>
</section>
