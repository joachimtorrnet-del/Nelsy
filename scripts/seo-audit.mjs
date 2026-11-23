#!/usr/bin/env node
/**
 * SEO audit of the prerendered build (dist/). Runs after prerender in postbuild.
 *
 * Critical errors fail the build (exit 1) so a broken page never ships:
 *   - page without <title>, or with several <title> tags
 *   - two pages with the same title
 *   - prerendered page without exactly one <h1>
 *   - internal link to a route that doesn't exist
 *   - sitemap and prerendered pages out of sync
 * Everything else is reported as a warning, with a score out of 100.
 *
 * SEO_AUDIT_STRICT=0 turns critical errors into warnings (emergency deploys).
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const STRICT = process.env.SEO_AUDIT_STRICT !== '0';

if (!existsSync(join(DIST, 'sitemap.xml'))) {
  console.warn('⚠️  seo-audit: dist/sitemap.xml missing, skipped');
  process.exit(0);
}

// ── Pages ────────────────────────────────────────────────────────────────────
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (f !== 'assets') walk(p); } else if (f === 'index.html') files.push(p);
  }
})(DIST);
const routeOf = (p) => '/' + p.slice(DIST.length + 1).replace(/\/?index\.html$/, '');
const dec = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');

const pages = {};
for (const f of files) {
  const h = readFileSync(f, 'utf8');
  const body = h.split('<body')[1] ?? '';
  pages[routeOf(f)] = {
    titles: [...h.matchAll(/<title[^>]*>([^<]*)<\/title>/g)].map((m) => dec(m[1])),
    desc: dec(h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? ''),
    canonical: h.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? '',
    noindex: /<meta name="robots" content="[^"]*noindex/.test(h),
    h1: (body.match(/<h1[\s>]/g) ?? []).length,
    links: [...new Set([...body.matchAll(/href="(\/[^"#?]*)/g)].map((m) => m[1].replace(/\/$/, '') || '/'))],
    imgsNoAlt: [...body.matchAll(/<img\b[^>]*>/g)].filter((m) => !/alt="[^"]+"/.test(m[0])).length,
    jsonLd: h.includes('application/ld+json'),
    dated: h.includes('datePublished'),
  };
}
const routes = Object.keys(pages);

// ── Valid link targets: prerendered pages + app routes ──────────────────────
// The root catch-all (/:slug, studios) and /blog/:slug are excluded on purpose:
// links to them must point at a page that was actually prerendered.
const app = readFileSync(join(ROOT, 'src/App.tsx'), 'utf8');
const appRoutes = [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1])
  .filter((p) => p !== '*' && p !== '/:slug' && !/^\/(blog|learn)\/:/.test(p));
const routeRe = appRoutes.map((p) => new RegExp('^' + p.replace(/:[^/]+/g, '[^/]+').replace(/\*$/, '.*') + '$'));
const IGNORED = /^\/(assets|blog-covers|favicon|site\.webmanifest|og-|apple-touch|sitemap|robots|llms)|\.\w{2,5}$/;
const isValid = (l) => pages[l] || IGNORED.test(l) || routeRe.some((r) => r.test(l));

// ── Checks ───────────────────────────────────────────────────────────────────
const critical = [];
const warnings = [];
const byTitle = {};
const byDesc = {};
const byCanonical = {};
const inbound = Object.fromEntries(routes.map((r) => [r, 0]));

for (const [r, p] of Object.entries(pages)) {
  const t = p.titles[0];
  if (!t) critical.push(`no <title>: ${r}`);
  if (p.noindex) critical.push(`public page is noindex: ${r}`);
  if (!p.canonical) warnings.push(`no canonical: ${r}`);
  else (byCanonical[p.canonical] ??= []).push(r);
  if (p.desc) (byDesc[p.desc] ??= []).push(r);
  if (!p.jsonLd) warnings.push(`no JSON-LD: ${r}`);
  if (r.startsWith('/blog/') && !p.dated) warnings.push(`article without datePublished: ${r}`);
  if (p.titles.length > 1) critical.push(`${p.titles.length} <title> tags: ${r}`);
  if (p.h1 !== 1) critical.push(`${p.h1} <h1> on ${r}`);
  if (t) (byTitle[t] ??= []).push(r);
  if (t && t.length > 65) warnings.push(`title ${t.length} chars (>65): ${r}`);
  if (!p.desc) warnings.push(`no meta description: ${r}`);
  else if (p.desc.length > 165) warnings.push(`description ${p.desc.length} chars (>165): ${r}`);
  if (p.imgsNoAlt) warnings.push(`${p.imgsNoAlt} image(s) without alt: ${r}`);
  for (const l of p.links) {
    if (l === r) continue;
    if (inbound[l] !== undefined) inbound[l]++;
    if (!isValid(l)) critical.push(`broken link ${l} on ${r}`);
  }
}
for (const [t, rs] of Object.entries(byTitle)) if (rs.length > 1) critical.push(`duplicate title "${t}": ${rs.join(', ')}`);
for (const [c, rs] of Object.entries(byCanonical)) if (rs.length > 1) critical.push(`duplicate canonical ${c}: ${rs.join(', ')}`);
for (const rs of Object.values(byDesc)) if (rs.length > 1) warnings.push(`duplicate description: ${rs.join(', ')}`);

const sitemap = [...readFileSync(join(DIST, 'sitemap.xml'), 'utf8').matchAll(/<loc>https:\/\/getnelsy\.com([^<]*)<\/loc>/g)]
  .map((m) => m[1].replace(/\/$/, '') || '/');
for (const s of sitemap) if (!pages[s]) critical.push(`in sitemap but not prerendered: ${s}`);
for (const r of routes) if (!sitemap.includes(r)) warnings.push(`prerendered but not in sitemap: ${r}`);
for (const [r, n] of Object.entries(inbound)) if (n === 0 && r !== '/') warnings.push(`orphan page (no internal link): ${r}`);

// Collapse repeated broken links into one line each
const collapse = (list) => {
  const counts = {};
  for (const c of list) { const k = c.replace(/ on \/.*$/, ''); counts[k] = (counts[k] ?? 0) + 1; }
  return Object.entries(counts).map(([k, n]) => (n > 1 ? `${k} (${n} pages)` : k));
};
const crit = collapse(critical);
const warn = collapse(warnings);

const score = Math.max(0, Math.round(100 - crit.length * 5 - Math.min(warn.length, 100) * 0.2));
console.log(`\n🔎 SEO audit: ${routes.length} pages · score ${score}/100 · ${crit.length} critical · ${warn.length} warnings`);
for (const c of crit) console.log(`  ❌ ${c}`);
for (const w of warn.slice(0, 15)) console.log(`  ⚠️  ${w}`);
if (warn.length > 15) console.log(`  … and ${warn.length - 15} more warnings`);

if (crit.length && STRICT) {
  console.error('\nSEO audit failed: fix the critical errors above (or set SEO_AUDIT_STRICT=0 for an emergency deploy).');
  process.exit(1);
}
