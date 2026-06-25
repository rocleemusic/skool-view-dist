// Skool post/comment bodies are NOT HTML or markdown — they use Skool's own bracket markup,
// e.g. `[ol:1][li]Watch the intro[ here ](https://...)\n\n2. ...` with backslash-escaped
// parens (`\(` `\)`) inside prose. This module renders that to safe HTML or to plain text.
//
// Ported from the prototype's `renderBody` and extended per spec:
//   - `[li]`               -> bullet line
//   - `[text](url)` links  -> <a> (toHtml) / "text (url)" (toText)
//   - remaining `[tag]` / `[/tag]` are stripped
//   - escaped parens `\(` `\)` -> literal `(` `)`
//   - runs of 3+ newlines collapsed to 2
// Pure: no DOM, no network.

const BULLET = '•'; // •

/**
 * HTML-escape the five characters that matter for safe injection.
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return '&#39;';
    }
  });
}

// `[label](url)` — label may contain anything but a closing bracket; url anything but `)`.
const LINK_PATTERN = /\[([^\]]*?)\]\(([^)]+)\)/g;
// Any leftover Skool tag like `[ol:1]`, `[li]`, `[/p]`. (Links and `[li]` are handled first.)
const TAG_PATTERN = /\[\/?[a-z][^\]]*\]/gi;
// Escaped parens that appear in prose, e.g. `\(free course\)`.
const ESCAPED_PARENS = /\\([()])/g;
// Three or more newlines in a row.
const EXCESS_NEWLINES = /\n{3,}/g;

/**
 * Skool encodes mentions as `[@Name](obj://user/ID)`. `obj://` is an internal scheme, not a
 * navigable URL, so such links must render as plain text (the label) rather than an anchor.
 * Tolerant of leading whitespace the label-normalizer may have left on the url.
 * @param {string} url
 * @returns {boolean}
 */
function isObjUrl(url) {
  return /^obj:\/\//i.test(url.trim());
}

/**
 * Extract the user uuid from a mention's `obj://user/{id}` url ('' if it isn't a user mention).
 * @param {string} url
 * @returns {string}
 */
function objUserId(url) {
  const match = /^obj:\/\/user\/([^/?#\s]+)/i.exec(url.trim());
  return match ? match[1] : '';
}

/**
 * Skool link labels often carry intentional boundary spaces, e.g. `post[ here ](url)`, where the
 * spaces visually separate the link from adjacent words. Collapse the label's internal whitespace
 * to single spaces but PRESERVE one leading/trailing space if the original had any.
 * @param {string} label
 * @returns {string}
 */
function normalizeLabel(label) {
  const core = label.replace(/\s+/g, ' ').trim();
  if (!core) return '';
  const lead = /^\s/.test(label) ? ' ' : '';
  const trail = /\s$/.test(label) ? ' ' : '';
  return `${lead}${core}${trail}`;
}

/**
 * Render Skool markup to a safe HTML fragment. Newlines are preserved as `\n` for the caller to
 * wrap (e.g. with `white-space: pre-wrap`).
 *
 * Strategy: HTML-escape the WHOLE string first, then build anchors and bullets on the escaped
 * text. Because escaping happens up front, link labels/urls are already safe, so anchors inserted
 * afterward are never double-escaped — and there are no placeholders to collide with prose.
 *
 * @param {string | undefined | null} raw The raw `metadata.content` value.
 * @param {{ mentionHref?: (userId: string) => (string | null) }} [opts] Optional hooks.
 *   `mentionHref(userId)` turns a mention's user id into a profile URL (or null) — when it returns
 *   a URL the mention renders as a link, otherwise as a distinct non-navigable span. Omit it and
 *   every mention is a span (still visually distinct). See ui resolver in App.svelte.
 * @returns {string} HTML-safe string. Empty input yields ''.
 */
export function toHtml(raw, opts = {}) {
  if (!raw) return '';
  let out = escapeHtml(String(raw));

  // Unescape Skool's `\(` `\)` (the backslash survives HTML-escaping).
  out = out.replace(ESCAPED_PARENS, '$1');

  // Links: the captured label/url are ALREADY escaped, so do not escape them again.
  out = out.replace(LINK_PATTERN, (_match, label, url) => {
    const normalized = normalizeLabel(label);
    const href = url.trim();
    // Skool mentions are `[@Name](obj://user/ID)`. `obj://` isn't a navigable target, so render
    // the label as a distinct `.sv-mention` — a real profile link when `mentionHref` resolves the
    // id to a URL, otherwise a styled span. Never an anchor with a broken obj:// href.
    if (isObjUrl(href)) {
      const id = objUserId(href);
      const label = normalized.trim() || href;
      const lead = /^\s/.test(normalized) ? ' ' : '';
      const trail = /\s$/.test(normalized) && normalized.trim() ? ' ' : '';
      const profile = id && typeof opts.mentionHref === 'function' ? opts.mentionHref(id) : null;
      const inner = profile
        ? `<a class="sv-mention" href="${escapeHtml(profile)}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : `<span class="sv-mention">${label}</span>`;
      return `${lead}${inner}${trail}`;
    }
    const text = normalized.trim() || href;
    const lead = /^\s/.test(normalized) ? ' ' : '';
    const trail = /\s$/.test(normalized) && normalized.trim() ? ' ' : '';
    return `${lead}<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>${trail}`;
  });

  // `[li]` -> bullet line, then strip any remaining Skool tags (`[ol:1]`, `[/p]`, ...).
  out = out.replace(/\[li\]/gi, `\n${BULLET} `).replace(TAG_PATTERN, '');

  return out.replace(EXCESS_NEWLINES, '\n\n').trim();
}

/**
 * Render Skool markup to plain text (no HTML). Links collapse to `label (url)`.
 *
 * @param {string | undefined | null} raw The raw `metadata.content` value.
 * @returns {string} Plain text. Empty input yields ''.
 */
export function toText(raw) {
  if (!raw) return '';
  let out = String(raw).replace(/\[li\]/gi, `\n${BULLET} `);

  out = out.replace(LINK_PATTERN, (_match, label, url) => {
    const normalized = normalizeLabel(label);
    const text = normalized.trim();
    const link = url.trim();
    // Mentions (`obj://...`): collapse to just the label text — no parenthesized URL.
    if (isObjUrl(link)) return normalized || link;
    if (!text) return link;
    const lead = /^\s/.test(normalized) ? ' ' : '';
    const trail = /\s$/.test(normalized) ? ' ' : '';
    return `${lead}${text} (${link})${trail}`;
  });

  out = out.replace(TAG_PATTERN, '').replace(ESCAPED_PARENS, '$1');
  return out.replace(EXCESS_NEWLINES, '\n\n').trim();
}
