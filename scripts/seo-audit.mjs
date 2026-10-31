/**
 * npm run seo:audit
 *
 * Reads prerendered HTML files from dist/ and reports SEO health.
 * Detects: missing title, duplicate title, missing description,
 * duplicate description, missing canonical, duplicate canonical,
 * missing H1, multiple H1, missing article dates, missing JSON-LD,
 * noindex inconsistencies.
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, '../dist');

// ── Collect all HTML files ────────────────────────────────────────────────────

function collectHtml(dir, base = '') {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      results.push(...collectHtml(resolve(dir, entry.name), `${base}/${entry.name}`));
    } else if (entry.name === 'index.html') {
      results.push({ file: resolve(dir, entry.name), route: base || '/' });
    }
  }
  return results;
}

const pages = collectHtml(DIST);

// ── Parse helpers ─────────────────────────────────────────────────────────────

function extract(html, re, group = 1) {
  const m = html.match(re);
  return m ? m[group].trim() : null;
}

function extractAll(html, re, group = 1) {
  const results = [];
  let m;
  const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
  while ((m = g.exec(html)) !== null) results.push(m[group].trim());
  return results;
}

// ── Audit ────────────────────────────────────────────────────────────────────

const ISSUES = [];
const seenTitles = new Map();
const seenDescs = new Map();
const seenCanonicals = new Map();

let checked = 0;

for (const { file, route } of pages) {
  const html = readFileSync(file, 'utf8');
  checked++;

  const title = extract(html, /<title>([^<]+)<\/title>/);
  const desc = extract(html, /<meta name="description" content="([^"]+)"/);
  const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/);
  // Match h1 tags including those with nested elements (strip inner tags for text)
  const h1RawMatches = extractAll(html, /<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1s = h1RawMatches.map(s => s.replace(/<[^>]+>/g, '').trim()).filter(Boolean);
  const hasJsonLd = html.includes('application/ld+json');
  const robots = extract(html, /<meta name="robots" content="([^"]+)"/);
  const isNoindex = robots?.includes('noindex');
  const hasDate = html.includes('datePublished') || html.includes('publishedAt');

  function warn(sev, msg) {
    ISSUES.push({ route, severity: sev, message: msg });
  }

  // Title
  if (!title) warn('CRITICAL', 'Missing <title>');
  else {
    if (seenTitles.has(title)) warn('HIGH', `Duplicate title: "${title}" (also on ${seenTitles.get(title)})`);
    else seenTitles.set(title, route);
  }

  // Description
  if (!desc) warn('HIGH', 'Missing meta description');
  else {
    if (seenDescs.has(desc)) warn('MEDIUM', `Duplicate description (also on ${seenDescs.get(desc)})`);
    else seenDescs.set(desc, route);
  }

  // Canonical
  if (!canonical) warn('HIGH', 'Missing canonical link');
  else {
    if (seenCanonicals.has(canonical)) warn('MEDIUM', `Duplicate canonical: "${canonical}" (also on ${seenCanonicals.get(canonical)})`);
    else seenCanonicals.set(canonical, route);
  }

  // H1
  if (h1s.length === 0) warn('HIGH', 'Missing H1');
  else if (h1s.length > 1) warn('MEDIUM', `Multiple H1 tags (${h1s.length}): ${h1s.slice(0, 2).join(' | ')}`);

  // JSON-LD
  if (!hasJsonLd) warn('MEDIUM', 'Missing JSON-LD structured data');

  // Blog articles should have dates in JSON-LD
  if (route.startsWith('/blog/') && !hasDate) warn('MEDIUM', 'Blog article missing datePublished in structured data');

  // Noindex on public routes that should be indexed
  const SHOULD_INDEX_PREFIXES = ['/', '/blog', '/tools', '/nail-tech', '/instagram', '/fresha', '/booksy', '/best-booking'];
  if (isNoindex && SHOULD_INDEX_PREFIXES.some(p => route === p || route.startsWith(p + '/'))) {
    warn('CRITICAL', 'Public page is noindex — verify this is intentional');
  }
}

// ── Report ────────────────────────────────────────────────────────────────────

const bySeverity = { CRITICAL: [], HIGH: [], MEDIUM: [], LOW: [] };
for (const issue of ISSUES) {
  (bySeverity[issue.severity] || bySeverity.LOW).push(issue);
}

console.log(`\n📋 SEO Audit — ${checked} pages checked\n`);

let total = 0;
for (const sev of ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']) {
  const items = bySeverity[sev];
  if (!items.length) continue;
  total += items.length;
  const emoji = sev === 'CRITICAL' ? '🔴' : sev === 'HIGH' ? '🟠' : sev === 'MEDIUM' ? '🟡' : '🔵';
  console.log(`${emoji} ${sev} (${items.length})`);
  for (const { route, message } of items.slice(0, 20)) {
    console.log(`   ${route.padEnd(55)} ${message}`);
  }
  if (items.length > 20) console.log(`   … and ${items.length - 20} more`);
  console.log();
}

if (total === 0) {
  console.log('✅ No issues found.\n');
} else {
  console.log(`Total issues: ${total}\n`);
}
