/**
 * Blog cover generator for Nelsy.
 *
 * Design: editorial minimal — inspired by Trendtrack.
 * Category-colored soft background, centered category label + title,
 * generous whitespace, moderate type size. No poster effect.
 *
 * Usage:
 *   node scripts/generate-blog-covers.mjs [--force] [--slug=<slug>]
 *   --force   : regenerate even if output already exists
 *   --slug=x  : only regenerate one article
 */

import { readFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ARTICLES_DIR = join(ROOT, 'src/pages/learn/articles');
const OUTPUT_DIR = join(ROOT, 'public/blog-covers');

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const SLUG_FILTER = args.find((a) => a.startsWith('--slug='))?.split('=')[1] ?? null;

// ── Category styles ───────────────────────────────────────────────────────────
// bg: soft tinted background. accent: slightly darker tone for labels.
const CATEGORY_STYLES = {
  'get-clients':         { bg: '#FCEEF5', accent: '#B83070' },
  'instagram-content':   { bg: '#FAE8F3', accent: '#943068' },
  'pricing-money':       { bg: '#FDF5E4', accent: '#8A5200' },
  'booking-software':    { bg: '#EDF3FD', accent: '#2550C8' },
  'policies-clients':    { bg: '#EBF8F2', accent: '#126638' },
  'start-your-business': { bg: '#F4EDFD', accent: '#6B28B0' },
  'nail-education':      { bg: '#FDEDED', accent: '#B02020' },
  'nail-inspo':          { bg: '#FDF5E8', accent: '#905400' },
  comparisons:           { bg: '#EAF8F6', accent: '#0A6E68' },
  'branding-growth':     { bg: '#FDEEE8', accent: '#B03808' },
};
const FALLBACK_STYLE = { bg: '#FCEEF5', accent: '#B83070' };

// ── Category display labels ───────────────────────────────────────────────────
const CATEGORY_LABELS = {
  'get-clients':         'Get Clients',
  'instagram-content':   'Instagram Content',
  'pricing-money':       'Pricing & Money',
  'booking-software':    'Booking Software',
  'policies-clients':    'Policies',
  'start-your-business': 'Start Your Business',
  'nail-education':      'Nail Education',
  'nail-inspo':          'Nail Inspiration',
  comparisons:           'Comparisons',
  'branding-growth':     'Branding & Growth',
};

// ── Fonts ─────────────────────────────────────────────────────────────────────
const TITLE_FONT  = 'Georgia, "Times New Roman", serif';
const UI_FONT     = '"Helvetica Neue", Arial, -apple-system, sans-serif';

// ── Auto-fit constants ────────────────────────────────────────────────────────
// Editorial: title starts at 52px, shrinks only if it overflows.
// Available height for the h1 block: 630 - 2×100px padding - label - branding.
const FONT_MAX  = 52;
const FONT_MIN  = 18;
const FONT_STEP = 2;
const AVAIL_H   = 280; // ~630 - 200 padding - 70 label - 80 branding

// ── HTML template ─────────────────────────────────────────────────────────────
function buildHTML(title, category) {
  const { bg, accent } = CATEGORY_STYLES[category] ?? FALLBACK_STYLE;
  const label = CATEGORY_LABELS[category] ?? category;

  const safe = title
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; }
</style>
</head>
<body>
<div id="cover" style="
  width: 1200px;
  height: 630px;
  background: ${bg};
  display: table;
">
  <div style="
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    padding: 100px 200px;
  ">

    <!-- Category label -->
    <p style="
      font-family: ${UI_FONT};
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.20em;
      text-transform: uppercase;
      color: ${accent};
      opacity: 0.85;
      margin-bottom: 22px;
    ">${label}</p>

    <!-- Thin rule between label and title -->
    <div style="
      width: 32px;
      height: 1px;
      background: ${accent};
      opacity: 0.25;
      margin: 0 auto 24px;
    "></div>

    <!-- Title -->
    <h1 id="title" style="
      font-family: ${TITLE_FONT};
      font-size: ${FONT_MAX}px;
      font-weight: 400;
      color: #1A1A1A;
      line-height: 1.40;
      letter-spacing: -0.01em;
      text-align: center;
      word-break: break-word;
      hyphens: auto;
    ">${safe}</h1>

    <!-- Nelsy micro-branding -->
    <p style="
      font-family: ${UI_FONT};
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: lowercase;
      color: ${accent};
      opacity: 0.35;
      margin-top: 30px;
    ">nelsy</p>

  </div>
</div>
</body>
</html>`;
}

// Auto-fit: shrink font until h1 height fits within AVAIL_H.
async function fitFontSize(page) {
  return page.evaluate(
    ({ availH, fontMax, fontMin, fontStep }) => {
      const title = document.getElementById('title');
      let fs = fontMax;
      title.style.fontSize = fs + 'px';
      while (fs > fontMin && title.getBoundingClientRect().height > availH) {
        fs -= fontStep;
        title.style.fontSize = fs + 'px';
      }
      return fs;
    },
    { availH: AVAIL_H, fontMax: FONT_MAX, fontMin: FONT_MIN, fontStep: FONT_STEP },
  );
}

// ── Read articles ─────────────────────────────────────────────────────────────
function readArticles() {
  const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.tsx'));
  const articles = [];
  const failed = [];
  for (const f of files) {
    try {
      const src = readFileSync(join(ARTICLES_DIR, f), 'utf8');
      const slugM  = src.match(/slug:\s*"([^"]+)"|slug:\s*'([^']+)'/);
      const catM   = src.match(/category:\s*"([^"]+)"|category:\s*'([^']+)'/);
      // Title may contain apostrophes — match double-quoted and single-quoted separately
      const titleDQ = src.match(/title:\s*"([^"]+)"/);
      const titleSQ = src.match(/title:\s*'((?:[^'\\]|\\.)+)'/);
      const slug    = slugM  ? (slugM[1]  ?? slugM[2])  : null;
      const cat     = catM   ? (catM[1]   ?? catM[2])   : null;
      const title   = titleDQ
        ? titleDQ[1]
        : titleSQ
          ? titleSQ[1].replace(/\\'/g, "'")
          : null;
      if (slug && cat && title) {
        articles.push({ slug, category: cat, title });
      } else {
        failed.push(f);
      }
    } catch {
      failed.push(f);
    }
  }
  return { articles, failed };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const { articles, failed: parseFailures } = readArticles();

  let toGenerate = articles;
  if (SLUG_FILTER) {
    toGenerate = articles.filter((a) => a.slug === SLUG_FILTER);
    if (!toGenerate.length) {
      console.error(`No article found with slug: ${SLUG_FILTER}`);
      process.exit(1);
    }
  }
  if (!FORCE) {
    toGenerate = toGenerate.filter(
      (a) => !existsSync(join(OUTPUT_DIR, `${a.slug}.png`)),
    );
  }

  console.log(`\n📸 Nelsy Blog Cover Generator`);
  console.log(`   Total articles  : ${articles.length}`);
  console.log(`   To generate     : ${toGenerate.length}`);
  console.log(`   Output dir      : public/blog-covers/\n`);

  if (!toGenerate.length) {
    console.log('All covers already exist. Pass --force to regenerate.\n');
    return;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  const genFailed = [];
  const genOk = [];
  const t0 = Date.now();

  for (let i = 0; i < toGenerate.length; i++) {
    const { slug, category, title } = toGenerate[i];
    const outPath = join(OUTPUT_DIR, `${slug}.png`);
    try {
      const html = buildHTML(title, category);
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      const fs = await fitFontSize(page);
      const el = await page.$('#cover');
      await el.screenshot({ path: outPath, type: 'png' });
      genOk.push(slug);
      if ((i + 1) % 20 === 0 || i === toGenerate.length - 1) {
        const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
        console.log(`  [${i + 1}/${toGenerate.length}] ${slug} — ${title.length}ch → ${fs}px (${elapsed}s)`);
      }
    } catch (err) {
      genFailed.push({ slug, error: err.message });
      console.error(`  ✗ FAILED: ${slug} — ${err.message}`);
    }
  }

  await browser.close();

  const total = Date.now() - t0;
  console.log(`\n✅  Generated ${genOk.length} covers in ${(total / 1000).toFixed(1)}s`);
  if (parseFailures.length) {
    console.log(`⚠️   Parse failures (${parseFailures.length}): ${parseFailures.join(', ')}`);
  }
  if (genFailed.length) {
    console.log(`✗   Render failures (${genFailed.length}):`);
    genFailed.forEach(({ slug, error }) => console.log(`    - ${slug}: ${error}`));
  }
  console.log();
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
