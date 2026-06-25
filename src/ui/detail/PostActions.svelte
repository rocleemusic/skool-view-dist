<script>
  // Post action row (§6 step 5): a LIVE like button (thumb + upvote count) and an inert pin.
  //
  // Like is a real write (`vote`) run from this content-script/page origin so the session cookies
  // ride along and the x-aws-waf-token header works. We toggle OPTIMISTICALLY — flip liked +
  // count immediately, fire the PUT, and ROLL BACK (restoring the prior liked/count) on failure,
  // surfacing a brief inline error. A 403 means a stale WAF token: we clear the cache so the next
  // attempt re-reads it. The button shows a loading state (disabled) while a vote is in flight.
  //
  // Pin is a LOCAL pin (client-side only, never a Skool write — see skool/pins.js): clicking
  // toggles whether this post sits in our Pinned section. A natively-pinned post renders lit +
  // disabled — Skool pins are read-only, we never unpin them.
  //
  // We have no per-user "did I like this" flag from the read layer (the mapped post view-model
  // carries only the aggregate count), so `liked` starts false; the optimistic toggle is relative
  // to that. See the reverse-engineering notes — initial liked state is a known gap.
  import Thumb from './Thumb.svelte';
  import { compactCount } from '../lib/format.js';
  import { vote } from '../../skool/write.js';
  import { getWafToken, clearWafToken } from '../waf.js';

  /**
   * @typedef {object} Props
   * @property {string} postId The post's uuid (the vote key).
   * @property {number} upvotes Real like count from the post view-model.
   * @property {boolean} pinned Shows as pinned (native OR local).
   * @property {boolean} [nativePinned] Pinned by Skool (read-only — toggle disabled).
   * @property {(id: string) => void} [onTogglePin] Toggle this post's local pin.
   * @property {typeof vote} [voteFn] Injectable write for tests/preview.
   * @property {typeof getWafToken} [tokenFn] Injectable WAF-token getter.
   */
  /** @type {Props} */
  let {
    postId,
    upvotes,
    pinned,
    nativePinned = false,
    onTogglePin,
    voteFn = vote,
    tokenFn = getWafToken,
  } = $props();

  let liked = $state(false);
  // Seeded from `upvotes` by the $effect below (also re-seeds when a different post is shown —
  // the parent reuses this component across selections). Initializing here from the prop would
  // only capture the first value, so we keep the optimistic count purely effect-driven.
  let count = $state(0);
  let sending = $state(false);
  let errored = $state(false);

  $effect(() => {
    // Reading postId/upvotes registers the dependency so this resets on selection change.
    void postId;
    liked = false;
    count = upvotes;
    errored = false;
  });

  async function toggleLike() {
    if (sending) return;
    // Snapshot for rollback, then apply the optimistic flip.
    const prevLiked = liked;
    const prevCount = count;
    const next = !liked;
    liked = next;
    count = Math.max(0, count + (next ? 1 : -1));
    sending = true;
    errored = false;
    try {
      const wafToken = await tokenFn();
      await voteFn({ postId, like: next, wafToken });
    } catch (err) {
      // Roll back to the pre-click state and flag the error briefly.
      liked = prevLiked;
      count = prevCount;
      errored = true;
      // A 403 (stale WAF token) — drop the cached token so a retry re-reads it.
      if (/** @type {any} */ (err)?.status === 403) clearWafToken();
    } finally {
      sending = false;
    }
  }
</script>

<div class="dactions">
  <button
    class="act like"
    class:on={liked}
    type="button"
    disabled={sending}
    aria-pressed={liked}
    aria-busy={sending}
    aria-label={`${liked ? 'Unlike' : 'Like'} post, ${count} likes`}
    onclick={toggleLike}
  >
    <Thumb />
    {compactCount(count)}
  </button>
  <button
    class="act pin"
    class:on={pinned}
    type="button"
    disabled={nativePinned}
    title={nativePinned ? 'Pinned by Skool' : pinned ? 'Unpin (local)' : 'Pin (local)'}
    aria-pressed={pinned}
    aria-label={nativePinned ? 'Pinned by Skool' : `${pinned ? 'Unpin' : 'Pin'} post (local)`}
    onclick={() => onTogglePin?.(postId)}
  >
    📌 {pinned ? 'Pinned' : 'Pin'}
  </button>
  {#if errored}
    <span class="acterr" role="status">Couldn't save — try again</span>
  {/if}
</div>
