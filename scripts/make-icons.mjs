// Generate the skool-view extension icon: the approved "cn" mark (white rounded square, black `c`
// + orange `n`, Poppins Bold). Converts the two glyphs to vector PATHS so the icon never depends on
// Poppins being installed, writes a master src/icons/icon.svg, then rasterizes the PNG set.
//
//   node scripts/make-icons.mjs
//
// Deps: opentype.js (glyph -> path), @resvg/resvg-js (svg -> png). Poppins-Bold.ttf is fetched from
// Google Fonts (OFL) into scripts/.cache on first run.

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import opentype from 'opentype.js';
import { Resvg } from '@resvg/resvg-js';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const cacheDir = join(here, '.cache');
// Vite copies everything under public/ into dist/ as-is, so the manifest's "icons/…" paths resolve.
const outDir = join(root, 'public', 'icons');
mkdirSync(cacheDir, { recursive: true });
mkdirSync(outDir, { recursive: true });

// ---- design knobs (match the approved OD concept) ----
const FONT_SIZE = 296;
const LETTER_SPACING = -6;
const INK = '#1b1b1b'; // c
const ORANGE = '#fb5a3c'; // n
const SQUARE = '#ffffff';
const RX = 116;
const SIZES = [16, 32, 48, 96, 128];
const FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Bold.ttf';

async function loadFont() {
  const ttf = join(cacheDir, 'Poppins-Bold.ttf');
  if (!existsSync(ttf)) {
    process.stdout.write('fetching Poppins-Bold.ttf … ');
    const res = await fetch(FONT_URL);
    if (!res.ok) throw new Error(`font fetch failed: ${res.status}`);
    writeFileSync(ttf, Buffer.from(await res.arrayBuffer()));
    console.log('ok');
  }
  const buf = readFileSync(ttf);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

function union(a, b) {
  return { x1: Math.min(a.x1, b.x1), y1: Math.min(a.y1, b.y1), x2: Math.max(a.x2, b.x2), y2: Math.max(a.y2, b.y2) };
}

function buildSvg(font) {
  // Lay the two glyphs on a baseline at y=0, then center the combined bbox in the 512 box.
  const cPath = font.getPath('c', 0, 0, FONT_SIZE);
  const cAdv = font.getAdvanceWidth('c', FONT_SIZE);
  const nPath = font.getPath('n', cAdv + LETTER_SPACING, 0, FONT_SIZE);
  const bbox = union(cPath.getBoundingBox(), nPath.getBoundingBox());
  const tx = 256 - (bbox.x1 + bbox.x2) / 2;
  const ty = 256 - (bbox.y1 + bbox.y2) / 2;
  const cD = cPath.toPathData(2);
  const nD = nPath.toPathData(2);
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">',
    `  <rect width="512" height="512" rx="${RX}" fill="${SQUARE}"/>`,
    `  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)})">`,
    `    <path d="${cD}" fill="${INK}"/>`,
    `    <path d="${nD}" fill="${ORANGE}"/>`,
    '  </g>',
    '</svg>',
    '',
  ].join('\n');
}

const font = await loadFont();
const svg = buildSvg(font);
writeFileSync(join(outDir, 'icon.svg'), svg);
console.log('wrote public/icons/icon.svg');

for (const size of SIZES) {
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  writeFileSync(join(outDir, `icon-${size}.png`), png);
  console.log(`wrote public/icons/icon-${size}.png`);
}
console.log('done.');
