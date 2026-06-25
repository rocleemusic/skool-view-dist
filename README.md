# skool-view

A custom, **local-first** browser-extension client for Skool communities (Firefox first). It renders
a faster, two-pane view over the same data Skool already serves to your logged-in browser — no central
server, no shared credentials. Each user runs it in their own authenticated session.

The overlay is **off by default**; toggle it on the active Skool tab with the toolbar button or **Alt+S**.

## Install (Firefox)

Download the latest Mozilla-signed `.xpi` from the
[Releases](https://github.com/rocleemusic/skool-view-dist/releases) page and open it in Firefox.
Installed copies auto-update via this repo's `updates.json`. Step-by-step instructions:
[`docs/INSTALL.md`](docs/INSTALL.md).

## Build from source

```bash
npm install
npm run dev      # vite watch build; web-ext opens Firefox on skool.com
npm run build    # production build into dist/
npm run check    # svelte-check / type check
```

To load a `dist/` build manually instead: Firefox → `about:debugging` → **This Firefox** →
**Load Temporary Add-on…** → select `dist/manifest.json`, then visit a Skool community and press
**Alt+S**.

## How it works

- **Manifest V3** extension — Svelte + Vite, Firefox-first.
- Reads come from Skool's own data routes; the overlay mounts into a Shadow DOM root on the active tab.
- A small, data-driven mapping layer (`src/skool/mapping.json`) isolates Skool's response shapes, so a
  field rename is a one-file fix.

## License

[GPL-3.0](LICENSE) © 2026 rocleemusic
