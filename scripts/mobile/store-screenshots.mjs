// App Store screenshots from the example studio (demo data, nothing real).
//
//   npm run dev:mobile            (in another terminal, port 5198)
//   node scripts/mobile/store-screenshots.mjs [outDir]
//
// Sizes: 6.7" iPhone = 1290 x 2796 (430 x 932 @3x), 6.5" iPhone = 1242 x 2688 (414 x 896 @3x).
// Uses the store build behaviour (store=1: no plan links) and hides the demo label (clean=1).
import puppeteer from 'puppeteer';
import { mkdirSync } from 'fs';

const out = process.argv[2] ?? 'store-screenshots';
const BASE = process.env.APP_URL ?? 'http://localhost:5198/';
const SIZES = { '6.7in': { width: 430, height: 932 }, '6.5in': { width: 414, height: 896 } };
const SCREENS = [
  ['1-home', '/home'],
  ['2-bookings', '/bookings'],
  ['3-studio', '/studio'],
  ['4-products', '/studio?tab=products'],
  ['5-preview', '/preview'],
  ['6-settings', '/settings'],
];

const browser = await puppeteer.launch({ headless: true });
for (const [size, vp] of Object.entries(SIZES)) {
  mkdirSync(`${out}/${size}`, { recursive: true });
  for (const [name, route] of SCREENS) {
    const ctx = await browser.createBrowserContext();
    const page = await ctx.newPage();
    await page.setViewport({ ...vp, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    const sep = route.includes('?') ? '&' : '?';
    await page.goto(`${BASE}#${route}${sep}demo=1&plan=creator&store=1&clean=1`, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: `${out}/${size}/${name}.png` });
    await ctx.close();
  }
}
await browser.close();
console.log(`Screenshots written to ${out}/`);
