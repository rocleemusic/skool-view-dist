// WAF-token accessor for the content-script side. The api2 comments read (and step-5 writes) need
// the AWS-WAF token in the `x-aws-waf-token` header. Its value is the `aws-waf-token` cookie,
// which may be httpOnly — so it is NOT readable from document.cookie. The background script has
// the `cookies` permission and reads it via browser.cookies.get; here we just message for it.
//
// The token is short-lived (hours) but stable across a burst of reads, so we cache it briefly to
// avoid a background round-trip on every comment fetch. A stale cached token surfaces as a 403,
// which the caller renders as "reload Skool and try again".

import browser from 'webextension-polyfill';

const CACHE_MS = 3 * 60 * 1000; // ~3 minutes

/** @type {{ token: string, at: number } | null} */
let cached = null;

/**
 * Get the current AWS-WAF token, cached for a few minutes. Returns '' if it can't be read
 * (no cookie yet / messaging failed) — the api2 fetch will then 403 and the UI shows a reload hint.
 * @param {() => number} [now] Injectable clock for tests.
 * @returns {Promise<string>}
 */
export async function getWafToken(now = Date.now) {
  const t = now();
  if (cached && t - cached.at < CACHE_MS && cached.token) return cached.token;
  try {
    const reply = /** @type {{ token?: string }} */ (
      await browser.runtime.sendMessage({ type: 'skool-view:get-waf-token' })
    );
    const token = reply?.token ?? '';
    cached = { token, at: t };
    return token;
  } catch {
    return '';
  }
}

/** Clear the cached token (e.g. after a 403, to force a fresh read on retry). */
export function clearWafToken() {
  cached = null;
}
