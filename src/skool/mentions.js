// Composer-side mention serialization. The MentionBox shows a mention as plain visible text
// (`@First Last`) while tracking the picked user's id; on send we convert each tracked mention to
// Skool's wire format `[@First Last](obj://user/{id})` (the same format markup.toHtml renders and
// the reverse-engineering notes describe). Pure: no DOM, no network — unit-tested in the source repo.

/**
 * @typedef {object} TrackedMention
 * @property {string} display The visible label inserted into the text (e.g. "Jane Doe").
 * @property {string} id The Skool user uuid to encode in the obj:// url.
 * @property {string} [handle] The user slug (kept for the profile-link registry; unused here).
 */

/**
 * Replace each tracked mention's plain `@`-prefixed token in `text` with the Skool mention markup
 * `[@display](obj://user/{id})`. Replaces the FIRST unconverted occurrence of each token and
 * advances past it, so distinct mentions serialize independently and an already-converted token
 * (now inside `[...]( ...)`) is never re-matched. A mention whose token the user deleted is simply
 * skipped. Mentions without an id are ignored (nothing to link).
 *
 * Limitation (acceptable for v1): two different users sharing the exact same display name can map
 * to the wrong id if their tokens are reordered by hand.
 *
 * @param {string} text The visible composer text.
 * @param {TrackedMention[]} [mentions]
 * @returns {string} Text with mentions converted to wire format.
 */
export function serializeMentions(text, mentions) {
  if (!text || !mentions || mentions.length === 0) return text ?? '';
  let out = text;
  let from = 0;
  for (const m of mentions) {
    if (!m || !m.id || !m.display) continue;
    const token = `@${m.display}`;
    const idx = out.indexOf(token, from);
    if (idx === -1) continue;
    const markup = `[@${m.display}](obj://user/${m.id})`;
    out = out.slice(0, idx) + markup + out.slice(idx + token.length);
    from = idx + markup.length;
  }
  return out;
}
