<script>
  // Renders a post's / comment's attachments: images as fixed-size thumbnails that open the shared
  // <Lightbox> on click; everything else as a labelled open/download link. Shared by DetailPane and
  // Comment so the markup + behaviour stay in one place.
  import { openLightbox } from '../lightbox.svelte.js';

  /**
   * @typedef {import('../../skool/map.js').Attachment} Attachment
   * @typedef {object} Props
   * @property {Attachment[]} [items]
   * @property {boolean} [compact] Smaller thumbnails (used in comments).
   */
  /** @type {Props} */
  let { items = [], compact = false } = $props();
</script>

{#if items.length}
  <div class="attach" class:compact>
    {#each items as att (att.id)}
      {#if att.isImage}
        <button
          type="button"
          class="attach-thumb"
          aria-label={`Open ${att.name || 'image'}`}
          onclick={() => openLightbox(att.fullUrl, att.name)}
        >
          <img src={att.thumbUrl} alt={att.name || 'attachment'} loading="lazy" />
        </button>
      {:else}
        <a class="dfile" href={att.fullUrl} target="_blank" rel="noopener noreferrer">
          {att.name || 'Attachment'}
        </a>
      {/if}
    {/each}
  </div>
{/if}
