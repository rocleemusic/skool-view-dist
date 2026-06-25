import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import webExtension from 'vite-plugin-web-extension';

// Firefox-first Manifest V3 build.
// - `svelte` compiles src/ui/App.svelte (mounted by the content script into a Shadow DOM root).
// - `webExtension` reads src/manifest.json, bundles the background + content scripts,
//   targets Firefox, and integrates `web-ext` so `npm run dev` opens Firefox on Skool.
export default defineConfig({
  plugins: [
    // App.svelte has no scoped <style>; overlay.css is imported `?inline` and injected
    // into the shadow root by the content script (head-injected styles can't reach it).
    svelte(),
    webExtension({
      manifest: 'src/manifest.json',
      browser: 'firefox',
      webExtConfig: {
        target: 'firefox-desktop',
        startUrl: ['https://www.skool.com/'],
      },
    }),
  ],
  build: {
    // web-ext loads from dist/; keep readable output for debugging the skeleton.
    minify: false,
    emptyOutDir: true,
  },
});
