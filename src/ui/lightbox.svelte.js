// Shared lightbox state for zooming attachment images. A module-level rune store so any component
// (post body, comments) can open it without prop-drilling; <Lightbox>, mounted once at the overlay
// root, renders whatever's set here.

export const lightbox = $state({ url: '', name: '' });

/**
 * @param {string} url Full-size image URL.
 * @param {string} [name] Alt/label.
 */
export function openLightbox(url, name = '') {
  if (!url) return;
  lightbox.url = url;
  lightbox.name = name;
}

export function closeLightbox() {
  lightbox.url = '';
  lightbox.name = '';
}
