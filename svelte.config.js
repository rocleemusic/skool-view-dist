import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Standalone Svelte config so svelte-check loads it directly instead of trying to derive
// it from vite.config.js (which trips a vite.resolveConfig CJS-interop bug under Vite 5).
export default {
  preprocess: vitePreprocess(),
};
