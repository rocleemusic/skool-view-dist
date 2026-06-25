<script>
  // Full-screen image zoom for attachments. Mounted once at the overlay root; reads the shared
  // lightbox store. The backdrop is a real <button> (click / keyboard / Esc all close) so there are
  // no static-element a11y gaps; the image sits above it and ignores clicks.
  import { lightbox, closeLightbox } from './lightbox.svelte.js';

  /** @param {KeyboardEvent} e */
  function onkeydown(e) {
    if (e.key === 'Escape') closeLightbox();
  }
</script>

<svelte:window onkeydown={onkeydown} />

{#if lightbox.url}
  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Image preview">
    <button class="lightbox-backdrop" type="button" aria-label="Close preview" onclick={closeLightbox}
    ></button>
    <img class="lightbox-img" src={lightbox.url} alt={lightbox.name || 'attachment'} />
    <button class="lightbox-close" type="button" aria-label="Close preview" onclick={closeLightbox}>×</button>
  </div>
{/if}
