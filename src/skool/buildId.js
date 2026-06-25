// Skool's pages are served by Next.js, which stamps a per-deploy `buildId` into the
// page HTML (`__NEXT_DATA__`). Every `/_next/data/{buildId}/...` route needs it, and it
// rotates on each Skool deploy — so it must be re-read from a fresh page, not hard-coded.
// Responsibility: pull that one string out of raw HTML. Nothing else.

/**
 * Extract the Next.js `buildId` from page HTML.
 *
 * @param {string | undefined | null} html Raw HTML of any Skool page (e.g. the homepage).
 * @returns {string} The buildId.
 * @throws {Error} If no buildId is present (stale/blocked page, or markup changed).
 */
export function parseBuildId(html) {
  const match = /"buildId"\s*:\s*"([^"]+)"/.exec(html ?? '');
  if (!match) {
    throw new Error('parseBuildId: no "buildId" found in HTML (page blocked or markup changed)');
  }
  return match[1];
}
