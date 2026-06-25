// Category (label) NAMES live in no Skool JSON payload — only in the rendered feed-page HTML,
// as filter-chip buttons. `currentGroup.metadata.labels` gives the id order, but the names are
// scrape-only. Ported from the reference crawler's `fetch_categories`. This is the most fragile
// dependency in the read path (the reverse-engineering notes): the chip selector breaks on any Skool front-end change.
// Pure: takes HTML in, returns parsed categories out. No DOM, no network.

// Chip shape: <button ... id="chip-filter-chip-{32hex}">📢 Announcements</button>
// The id is exactly 32 lowercase hex (a Skool label uuid without dashes). The label text may
// contain nested tags (emoji spans etc.), which we strip, plus HTML entities, which we unescape.
const CHIP_PATTERN = /id="chip-filter-chip-([0-9a-f]{32})"[^>]*>(.*?)<\/button>/g;
const INNER_TAG_PATTERN = /<[^>]+>/g;

/** @type {Record<string, string>} */
const ENTITY_MAP = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&apos;': "'",
  '&nbsp;': ' ',
};

/**
 * Decode the small set of HTML entities Skool emits in chip labels, plus numeric entities.
 * @param {string} value
 * @returns {string}
 */
function unescapeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&[a-z]+;/gi, (entity) => ENTITY_MAP[entity.toLowerCase()] ?? entity);
}

/**
 * Parse category filter chips from feed-page HTML.
 * @param {string | undefined | null} html Raw HTML of a community feed page.
 * @returns {Array<{ id: string, name: string }>} In document order; empty if none found.
 */
export function parseCategories(html) {
  if (!html) return [];
  /** @type {Array<{ id: string, name: string }>} */
  const categories = [];
  for (const match of html.matchAll(CHIP_PATTERN)) {
    const id = match[1];
    const name = unescapeHtml(match[2].replace(INNER_TAG_PATTERN, '')).trim();
    categories.push({ id, name });
  }
  return categories;
}
