// Generates the Nelsy app icon set and splash screens for iOS and Android.
// Pink tile (#F52B8C) with a white bold "N", same mark as public/favicon.svg and
// src/mobile/components/Logo.tsx. The "N" is a vector path (no font needed).
//
//   node scripts/mobile/generate-app-assets.mjs
//
// Writes: ios/App/App/Assets.xcassets/AppIcon.appiconset, Splash.imageset,
//         android/app/src/main/res/mipmap-*, drawable*/splash.png, values/ic_launcher_background.xml
import sharp from 'sharp';
import { mkdirSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PINK = '#F52B8C';

// Heavy "N" on a 1000 x 1000 grid, centered on (500, 500).
const N_PATH = 'M300 250 H415 L590 560 V250 H700 V750 H590 L410 440 V750 H300 Z';

/** Full-bleed square (iOS masks the corners itself). `scale` = size of the N relative to the tile. */
function iconSvg({ size, rounded = 0, scale = 1, background = PINK }) {
  const s = scale;
  const t = 500 - 500 * s;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 1000 1000">
  ${background ? `<rect width="1000" height="1000" rx="${rounded}" fill="${background}"/>` : ''}
  <path d="${N_PATH}" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="18" stroke-linejoin="round" transform="translate(${t} ${t}) scale(${s})"/>
</svg>`;
}

/** Pink canvas with the white tile-less "N" centered (splash). */
function splashSvg(w, h) {
  const n = Math.round(Math.min(w, h) * 0.22);
  const x = Math.round((w - n) / 2);
  const y = Math.round((h - n) / 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <rect width="${w}" height="${h}" fill="${PINK}"/>
  <svg x="${x}" y="${y}" width="${n}" height="${n}" viewBox="0 0 1000 1000">
    <path d="${N_PATH}" fill="#FFFFFF" stroke="#FFFFFF" stroke-width="18" stroke-linejoin="round"/>
  </svg>
</svg>`;
}

async function png(svg, out, opts = {}) {
  mkdirSync(dirname(out), { recursive: true });
  let img = sharp(Buffer.from(svg));
  if (opts.flatten) img = img.flatten({ background: PINK }).removeAlpha();
  await img.png().toFile(out);
}

// ── iOS ──────────────────────────────────────────────────────────────────────
const iosIcon = join(ROOT, 'ios/App/App/Assets.xcassets/AppIcon.appiconset');
// App Store icon: 1024 x 1024, opaque, no rounded corners.
await png(iconSvg({ size: 1024 }), join(iosIcon, 'AppIcon-512@2x.png'), { flatten: true });

const iosSplash = join(ROOT, 'ios/App/App/Assets.xcassets/Splash.imageset');
for (const f of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
  await png(splashSvg(2732, 2732), join(iosSplash, f), { flatten: true });
}

// ── Android ──────────────────────────────────────────────────────────────────
const res = join(ROOT, 'android/app/src/main/res');
const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
for (const [d, k] of Object.entries(DENSITIES)) {
  const legacy = Math.round(48 * k);
  const fg = Math.round(108 * k);
  // Legacy launcher icons (pre Android 8): rounded square and circle.
  await png(iconSvg({ size: legacy, rounded: 180, scale: 0.9 }), join(res, `mipmap-${d}`, 'ic_launcher.png'));
  await png(iconSvg({ size: legacy, rounded: 500, scale: 0.85 }), join(res, `mipmap-${d}`, 'ic_launcher_round.png'));
  // Adaptive foreground: transparent, N inside the 66/108 safe zone.
  await png(iconSvg({ size: fg, background: null, scale: 0.75 }), join(res, `mipmap-${d}`, 'ic_launcher_foreground.png'));
}
writeFileSync(
  join(res, 'values/ic_launcher_background.xml'),
  `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">${PINK}</color>\n</resources>\n`,
);

// Splash: replace every existing drawable*/splash.png at its current size.
for (const dir of readdirSync(res)) {
  const f = join(res, dir, 'splash.png');
  if (!dir.startsWith('drawable') || !existsSync(f)) continue;
  const { width, height } = await sharp(f).metadata();
  await png(splashSvg(width, height), f, { flatten: true });
}

console.log('App icons and splash screens written.');
