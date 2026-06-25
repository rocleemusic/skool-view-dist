<script>
  // Sort dropdown. Options come from the data layer's SORT_MODES (Newest / Oldest / Most Liked /
  // Most Commented / Hidden Gems). Sorting is client-side over the crawled corpus (feedSort) — the
  // store treats this as a pure derivation, so changing it re-orders instantly with no refetch.
  import { SORT_MODES } from '../../skool/feedSort.js';

  /**
   * @typedef {object} Props
   * @property {import('../../skool/feedSort.js').SortMode} value
   * @property {(sort: import('../../skool/feedSort.js').SortMode) => void} onChange
   */
  /** @type {Props} */
  let { value, onChange } = $props();
</script>

<select
  class="sortsel"
  aria-label="Sort posts"
  {value}
  onchange={(e) =>
    onChange(/** @type {import('../../skool/feedSort.js').SortMode} */ (e.currentTarget.value))}
>
  {#each SORT_MODES as mode (mode.value)}
    <option value={mode.value}>{mode.label}</option>
  {/each}
</select>
