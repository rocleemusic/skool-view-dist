<script>
  // Theme selector. The selected value is owned by App (which applies it as `data-theme` on the
  // overlay root and persists it); this is a thin controlled dropdown over THEMES.
  import { THEMES } from './theme.js';

  /**
   * @typedef {object} Props
   * @property {import('./theme.js').ThemeId} value
   * @property {(theme: import('./theme.js').ThemeId) => void} onChange
   */
  /** @type {Props} */
  let { value, onChange } = $props();
</script>

<select
  class="sortsel themesel"
  aria-label="Color theme"
  {value}
  onchange={(e) => onChange(/** @type {import('./theme.js').ThemeId} */ (e.currentTarget.value))}
>
  {#each THEMES as theme (theme.id)}
    <option value={theme.id}>{theme.label}</option>
  {/each}
</select>
