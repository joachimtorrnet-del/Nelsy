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

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, basename, extname, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = resolve(__dirname, '../src/pages/learn/articles');
const OUT_FILE = resolve(__dirname, '../dist/learn-routes.json');

// ── Studio pages ──────────────────────────────────────────────────────────────
// Read Supabase settings from the environment (Vercel) or the local .env files.
function loadEnv() {
  const env = { ...process.env };
  for (const file of ['../.env', '../.env.local', '../.env.production']) {
    const path = resolve(__dirname, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !env[m[1]]) env[m[1]] = m[2];
    }
  }
  return env;
}

// Top-level app routes a studio slug must never shadow
const RESERVED = new Set(['blog', 'learn', 'tools', 'dashboard', 'login', 'onboarding', 'onboarding-stripe', 'pricing',
  'privacy', 'terms', 'features', 'use-cases', 'studio', 'stripe', 'booking-confirmed', 'forgot-password', 'reset-password']);

// Keep in sync with isStudioIndexable() in src/lib/studioSeo.ts
const STUDIO_MIN_BIO = 40;

async function fetchIndexableStudios() {
  const env = loadEnv();
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn('⚠️  Supabase env missing: studio pages skipped');
    return [];
  }
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  try {
    const [profilesRes, servicesRes] = await Promise.all([
      fetch(`${url}/rest/v1/public_profiles?select=id,slug,bio,location,logo_url,subscription_status&subscription_status=in.(active,trialing,trial)`, { headers }),
      fetch(`${url}/rest/v1/services?select=profile_id&active=eq.true`, { headers }),
    ]);
    if (!profilesRes.ok || !servicesRes.ok) throw new Error(`HTTP ${profilesRes.status}/${servicesRes.status}`);
    const profiles = await profilesRes.json();
    const withServices = new Set((await servicesRes.json()).map((s) => s.profile_id));
    return profiles
      .filter((p) => p.slug && /^[a-z0-9-]+$/.test(p.slug) && !RESERVED.has(p.slug))
      .filter((p) => withServices.has(p.id)
        && (p.bio ?? '').trim().length >= STUDIO_MIN_BIO
        && (p.location ?? '').trim()
        && p.logo_url)
      .map((p) => ({ path: `/${p.slug}`, priority: '0.7', changefreq: 'weekly', lastmod: TODAY }));
  } catch (err) {
    console.warn(`⚠️  Could not load studios, skipped: ${err instanceof Error ? err.message : err}`);
    return [];
  }
}

const studioRoutes = await fetchIndexableStudios();
const TODAY = new Date().toISOString().slice(0, 10);

// SEO pages and tool pages that are always prerendered / in the sitemap.
// These don't need to be article files — they're standalone pages.
// lastmod for static pages: use a known stable date so rebuilds don't
// falsely signal to Google that these pages were updated.
const STATIC_SEO_ROUTES = [
  { path: '/blog',                                           priority: '0.9', changefreq: 'weekly',  lastmod: TODAY },
  { path: '/tools/instagram-engagement-calculator', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-24' },
  { path: '/tools/creator-rate-calculator', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-24' },
  { path: '/pricing',                                        priority: '0.9', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/features/bookings', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/features/deposits', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/features/payments', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/features/link-in-bio', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/features/crm', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/features/analytics', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/use-cases/nail-techs', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/use-cases/lash-techs', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/use-cases/get-more-clients', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/use-cases/reduce-no-shows', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/use-cases/turn-followers-into-bookings', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/use-cases/grow-your-beauty-business', priority: '0.8', changefreq: 'monthly', lastmod: '2026-11-23' },
  { path: '/privacy', priority: '0.2', changefreq: 'yearly', lastmod: '2026-11-23' },
  { path: '/terms', priority: '0.2', changefreq: 'yearly', lastmod: '2026-11-23' },
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
    ...studioRoutes.map((r) => r.path),
    '/', // must be last — overwrites dist/index.html used as SPA fallback
  ],
  sitemap: [
    { path: '/', priority: '1.0', changefreq: 'weekly', lastmod: TODAY },
    ...STATIC_SEO_ROUTES,
    ...articleRoutes,
    ...studioRoutes,
  ],
};

mkdirSync(dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2));

console.log(`✅  Generated learn-routes.json`);
console.log(`   ${articleRoutes.length} article routes discovered`);
console.log(`   ${studioRoutes.length} indexable studio routes`);
console.log(`   ${manifest.prerender.length} total prerender routes`);
console.log(`   ${manifest.sitemap.length} total sitemap URLs`);
