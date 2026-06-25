<script>
  // Author avatar with a graceful fallback to an empty tinted circle when there's no image
  // (or the image fails to load). `size` maps to the prototype's avatar size classes.
  /**
   * @typedef {object} Props
   * @property {string} [src] Image URL; empty/missing renders the fallback circle.
   * @property {'xs' | 'sm' | 'md'} [size]
   */
  /** @type {Props} */
  let { src = '', size = 'md' } = $props();

  let failed = $state(false);
  const sizeClass = { xs: 'avatar xs', sm: 'avatar sm', md: 'avatar' };
</script>

{#if src && !failed}
  <img
    class={sizeClass[size]}
    {src}
    alt=""
    loading="lazy"
    onerror={() => (failed = true)}
  />
{:else}
  <div class={sizeClass[size]} aria-hidden="true"></div>
{/if}
