// Theme persistence for the overlay. The three themes (default / discord / minimax) are
// defined as CSS token blocks in overlay.css under `[data-theme="…"]` selectors on the
// overlay root. This module owns ONLY the selected-theme value + its persistence, so a
// theme change is a single `data-theme` attribute write on the overlay root element.
//
// Persistence note: in a content-script Shadow DOM there is no <html> to stamp before paint,
// and the overlay only mounts on toggle (never blocking first page paint). So "restore before
// paint" means: read the saved value synchronously when the overlay store is constructed and
// apply it to the root the moment it renders — no flash, because the overlay isn't visible
// until it's mounted with the attribute already set.

/** @typedef {'default' | 'discord' | 'minimax'} ThemeId */

const STORAGE_KEY = 'skoolTheme';

/** @type {ReadonlyArray<{ id: ThemeId, label: string }>} */
export const THEMES = [
  { id: 'default', label: 'Default theme' },
  { id: 'discord', label: 'Discord theme' },
  { id: 'minimax', label: 'MiniMax (light)' },
];

const VALID = new Set(THEMES.map((t) => t.id));

/**
 * Read the persisted theme synchronously. Falls back to 'default' when storage is empty,
 * holds an unknown value, or is unavailable (private mode / blocked).
 * @returns {ThemeId}
 */
export function loadTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && VALID.has(/** @type {ThemeId} */ (saved))) {
      return /** @type {ThemeId} */ (saved);
    }
  } catch {
    // localStorage may throw in restricted contexts; default quietly.
  }
  return 'default';
}

/**
 * Persist the selected theme. 'default' is stored as an absence so a future default-token
 * change is picked up automatically.
 * @param {ThemeId} theme
 */
export function saveTheme(theme) {
  try {
    if (theme === 'default') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Persistence is best-effort; the in-session selection still applies.
  }
}
