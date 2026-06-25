<script>
  // Category filter dropdown. Options come from `categories.parseCategories(document HTML)`,
  // resolved by App and passed in. Selecting an option drives a server-side `c` (labelId) refetch.
  /**
   * @typedef {object} Props
   * @property {Array<{ id: string, name: string }>} categories
   * @property {string} value Current labelId, or '' for all.
   * @property {(labelId: string) => void} onChange
   */
  /** @type {Props} */
  let { categories, value, onChange } = $props();
</script>

<select
  class="sortsel"
  aria-label="Filter by category"
  {value}
  onchange={(e) => onChange(e.currentTarget.value)}
>
  <option value="">All categories</option>
  {#each categories as category (category.id)}
    <option value={category.id}>{category.name}</option>
  {/each}
</select>
