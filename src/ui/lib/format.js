// Small, pure formatting helpers for the feed UI. The data layer returns `created` as a full
// ISO-8601 timestamp (e.g. "2026-03-15T05:38:37.239178Z") — the prototype's `shortDate` assumed
// a bare "YYYY-MM-DD" string, so we parse the real ISO value here. No DOM, no network.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Format an ISO timestamp (or bare "YYYY-MM-DD") as a compact "Mon D" date for list rows.
 * Returns '' for empty/unparseable input so a row never renders "Invalid Date".
 * @param {string | null | undefined} iso
 * @returns {string}
 */
export function shortDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    // Fall back to a bare "YYYY-MM-DD" split (no timezone shift) when Date can't parse it.
    const parts = String(iso).split('-');
    const month = Number(parts[1]);
    return month >= 1 && month <= 12 ? `${MONTHS[month - 1]} ${Number(parts[2]) || ''}`.trim() : '';
  }
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

/**
 * Format a comment timestamp as "Mon D, h:mm AM/PM". Comments carry a full ISO timestamp; the
 * detail pane shows the time of day (unlike feed rows, which show only the date). Returns '' for
 * empty/unparseable input so a comment never renders "Invalid Date".
 * @param {string | null | undefined} iso
 * @returns {string}
 */
export function commentTime(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return String(iso);
  let hours = date.getHours();
  const meridiem = hours < 12 ? 'AM' : 'PM';
  hours = hours % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${hours}:${minutes} ${meridiem}`;
}

/**
 * Format an integer count compactly (1200 -> "1.2k", 3_400_000 -> "3.4m"). Likes/comments on
 * popular communities run into the thousands, which would blow out the fixed-width row meta line.
 * @param {number | null | undefined} value
 * @returns {string}
 */
export function compactCount(value) {
  const n = Number(value) || 0;
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${trim(n / 1000)}k`;
  return `${trim(n / 1_000_000)}m`;
}

/**
 * One-decimal-place format that drops a trailing ".0" (1.0 -> "1", 1.2 -> "1.2").
 * @param {number} n
 * @returns {string}
 */
function trim(n) {
  return n.toFixed(1).replace(/\.0$/, '');
}
