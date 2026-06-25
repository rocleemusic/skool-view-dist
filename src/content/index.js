import browser from 'webextension-polyfill';
import { mount, unmount } from 'svelte';
import App from '../ui/App.svelte';
// Overlay CSS imported as a raw string so we can inject it into the shadow root.
// A head-injected <style> tag would NOT cross the shadow boundary.
import overlayCss from '../ui/overlay.css?inline';

// Content script. Responsibility: mount/unmount the overlay into an open Shadow DOM,
// keep the host node alive against Skool's SPA, and obey toggle messages + initial state.

const HOST_ID = 'skool-view-host';

/** @type {HTMLElement | null} */
let hostElement = null;
/** @type {ShadowRoot | null} */
let shadowRoot = null;
/** @type {ReturnType<typeof mount> | null} */
let appInstance = null;
/** @type {MutationObserver | null} */
let bodyObserver = null;

let overlayOn = false;

// Build the host + open shadow root, inject CSS, and mount the empty Svelte app.
function mountOverlay() {
  if (hostElement) return;

  hostElement = document.createElement('div');
  hostElement.id = HOST_ID;
  // Keep the host above Skool's UI without leaking styles to the page.
  hostElement.style.position = 'fixed';
  hostElement.style.inset = '0';
  hostElement.style.zIndex = '2147483647';

  shadowRoot = hostElement.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = overlayCss;
  shadowRoot.appendChild(style);

  const appRoot = document.createElement('div');
  shadowRoot.appendChild(appRoot);

  document.body.appendChild(hostElement);

  appInstance = mount(App, {
    target: appRoot,
    props: {
      // The "Back to Skool" button calls this to dismiss the overlay (routes through
      // the background so per-tab state stays correct).
      onClose: requestToggleOff,
    },
  });

  observeBody();
}

// Tear down the app, the shadow host, and the observer.
function unmountOverlay() {
  stopObservingBody();
  if (appInstance) {
    unmount(appInstance);
    appInstance = null;
  }
  if (hostElement?.parentNode) {
    hostElement.parentNode.removeChild(hostElement);
  }
  hostElement = null;
  shadowRoot = null;
}

// Re-assert the host if Skool's SPA strips it from <body> while the overlay is active.
function observeBody() {
  if (bodyObserver) return;
  bodyObserver = new MutationObserver(() => {
    if (overlayOn && hostElement && !document.body.contains(hostElement)) {
      document.body.appendChild(hostElement);
    }
  });
  bodyObserver.observe(document.body, { childList: true });
}

function stopObservingBody() {
  if (bodyObserver) {
    bodyObserver.disconnect();
    bodyObserver = null;
  }
}

// Apply a desired on/off state idempotently.
/** @param {boolean} on */
function setOverlay(on) {
  overlayOn = on;
  if (on) mountOverlay();
  else unmountOverlay();
}

// Ask the background to flip this tab off (keeps storage.session authoritative).
function requestToggleOff() {
  void browser.runtime.sendMessage({ type: 'skool-view:request-toggle' });
}

// Toggle messages pushed from the background (toolbar click / Alt+S).
browser.runtime.onMessage.addListener((/** @type {unknown} */ message) => {
  const msg = /** @type {{ type?: string, on?: boolean }} */ (message);
  if (msg?.type === 'skool-view:set-overlay') {
    setOverlay(msg.on === true);
  }
  return undefined;
});

// On (re)load, restore this tab's state from the background's storage.session.
async function restoreInitialState() {
  try {
    const reply = /** @type {{ on?: boolean }} */ (
      await browser.runtime.sendMessage({ type: 'skool-view:get-overlay' })
    );
    setOverlay(reply?.on === true);
  } catch {
    // Background not ready; default to off.
    setOverlay(false);
  }
}

void restoreInitialState();
