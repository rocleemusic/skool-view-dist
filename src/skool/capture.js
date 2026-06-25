// Dev-only capture mode. Wraps window.fetch + XMLHttpRequest to log each Skool API call's URL
// and response SHAPE (top-level keys, not full payloads) to the console — for harvesting
// endpoints we don't map yet (real comments, api2 reads, etc.; see the reverse-engineering notes "next steps").
// Guarded so it no-ops outside a browser. Not imported by production paths; never tested.

const SKOOL_HOST_PATTERN = /(^|\.)skool\.com$/;

/** @returns {boolean} True only in a real browser window with fetch + XHR. */
function inBrowser() {
  return (
    typeof window !== 'undefined' &&
    typeof window.fetch === 'function' &&
    typeof window.XMLHttpRequest === 'function'
  );
}

/** @param {string} url @returns {boolean} */
function isSkoolUrl(url) {
  try {
    return SKOOL_HOST_PATTERN.test(new URL(url, window.location.href).hostname);
  } catch {
    return false;
  }
}

/**
 * Describe a value's shape compactly: top-level keys for objects, length for arrays.
 * @param {unknown} value
 * @returns {string}
 */
function describeShape(value) {
  if (Array.isArray(value)) return `array(${value.length})`;
  if (value && typeof value === 'object') return `{ ${Object.keys(value).join(', ')} }`;
  return typeof value;
}

/**
 * Install fetch + XHR wrappers that log Skool API calls. Idempotent. Returns an uninstall fn.
 * @param {{ label?: string }} [options]
 * @returns {() => void} Restores the original fetch/XHR.
 */
export function installCapture(options = {}) {
  const label = options.label ?? 'skool-view:capture';
  if (!inBrowser()) {
    return () => {};
  }
  // @ts-ignore — custom flag on window to stay idempotent across re-injections.
  if (window.__skoolViewCaptureInstalled) {
    return () => {};
  }

  const originalFetch = window.fetch.bind(window);
  const originalXhrOpen = window.XMLHttpRequest.prototype.open;
  const originalXhrSend = window.XMLHttpRequest.prototype.send;

  window.fetch = async (input, init) => {
    const url =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.href
          : input instanceof Request
            ? input.url
            : String(input);
    const response = await originalFetch(input, init);
    if (isSkoolUrl(url)) {
      response
        .clone()
        .json()
        .then((/** @type {unknown} */ body) => console.info(`[${label}] fetch`, url, describeShape(body)))
        .catch(() => console.info(`[${label}] fetch`, url, '(non-JSON)'));
    }
    return response;
  };

  window.XMLHttpRequest.prototype.open = function open(
    /** @type {string} */ method,
    /** @type {string} */ url,
    /** @type {unknown[]} */ ...rest
  ) {
    // @ts-ignore — stash the URL for the load handler.
    this.__skoolCaptureUrl = url;
    // @ts-ignore — forward all original args.
    return originalXhrOpen.call(this, method, url, ...rest);
  };

  window.XMLHttpRequest.prototype.send = function send(/** @type {unknown[]} */ ...args) {
    // @ts-ignore
    const url = this.__skoolCaptureUrl;
    if (url && isSkoolUrl(String(url))) {
      this.addEventListener('load', () => {
        let shape = '(unparsed)';
        try {
          shape = describeShape(JSON.parse(this.responseText));
        } catch {
          /* non-JSON response */
        }
        console.info(`[${label}] xhr`, url, shape);
      });
    }
    // @ts-ignore
    return originalXhrSend.apply(this, args);
  };

  // @ts-ignore
  window.__skoolViewCaptureInstalled = true;
  console.info(`[${label}] installed — logging Skool API calls`);

  return () => {
    window.fetch = originalFetch;
    window.XMLHttpRequest.prototype.open = originalXhrOpen;
    window.XMLHttpRequest.prototype.send = originalXhrSend;
    // @ts-ignore
    window.__skoolViewCaptureInstalled = false;
  };
}
