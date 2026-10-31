/**
 * Scans src/pages/learn/articles/ and writes dist/learn-routes.json.
 *
 * This file is the Node.js equivalent of the Vite-side import.meta.glob:
 * it discovers article slugs by filename so prerender.mjs and
 * generate-sitemap.mjs can consume the list without running the full app.
 *
 * Called automatically as part of the postbuild sequence.
 * No manual updates needed when a new article file is added.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = resolve(__dirname, '../src/pages/learn/articles');
const OUT_FILE = resolve(__dirname, '../dist/learn-routes.json');
const TODAY = new Date().toISOString().slice(0, 10);

// SEO pages and tool pages that are always prerendered / in the sitemap.
// These don't need to be article files — they're standalone pages.
// lastmod for static pages: use a known stable date so rebuilds don't
// falsely signal to Google that these pages were updated.
const STATIC_SEO_ROUTES = [
  { path: '/blog',                                           priority: '0.9', changefreq: 'weekly',  lastmod: TODAY },
  { path: '/nail-tech-deposits',                             priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-20' },
  { path: '/instagram-booking-for-nail-techs',               priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-20' },
  { path: '/fresha-alternative-nail-techs',                  priority: '0.8', changefreq: 'monthly', lastmod: '2026-10-20' },
  { path: '/booksy-alternative-nail-techs',                  priority: '0.8', changefreq: 'monthly', lastmod: '2026-10-20' },
  { path: '/best-booking-app-for-nail-techs',                priority: '0.9', changefreq: 'monthly', lastmod: '2026-10-20' },
  { path: '/tools',                                           priority: '0.8', changefreq: 'monthly', lastmod: '2026-10-21' },
  { path: '/tools/nail-tech-pricing-calculator',             priority: '0.8', changefreq: 'monthly', lastmod: '2026-10-20' },
  { path: '/tools/nail-tech-cancellation-policy-generator',  priority: '0.8', changefreq: 'monthly', lastmod: '2026-10-20' },
  { path: '/tools/nail-tech-appointment-reminder-templates', priority: '0.8', changefreq: 'monthly', lastmod: '2026-10-20' },
];

// Discover article slugs from filenames and extract real dates from source
const articleFiles = readdirSync(ARTICLES_DIR).filter(
  (f) => f.endsWith('.tsx') || f.endsWith('.ts'),
);

function extractDate(source, field) {
  const m = source.match(new RegExp(`${field}:\\s*['"]([\\d]{4}-[\\d]{2}-[\\d]{2})['"]`));
  return m ? m[1] : null;
}

const articleRoutes = articleFiles.map((f) => {
  const source = readFileSync(resolve(ARTICLES_DIR, f), 'utf8');
  const updatedAt = extractDate(source, 'updatedAt');
  const publishedAt = extractDate(source, 'publishedAt');
  const lastmod = updatedAt ?? publishedAt ?? TODAY;
  return {
    path: `/blog/${basename(f, extname(f))}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod,
  };
});

const manifest = {
  // '/' is included here for prerender ordering but not sitemap (listed separately)
  prerender: [
    ...STATIC_SEO_ROUTES.map((r) => r.path),
    ...articleRoutes.map((r) => r.path),
    '/', // must be last — overwrites dist/index.html used as SPA fallback
  ],
  sitemap: [
    { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: TODAY },
    ...STATIC_SEO_ROUTES,
    ...articleRoutes,
  ],
};

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));

console.log(`✅  Generated learn-routes.json`);
console.log(`   ${articleRoutes.length} article routes discovered`);
console.log(`   ${manifest.prerender.length} total prerender routes`);
console.log(`   ${manifest.sitemap.length} total sitemap URLs`);
