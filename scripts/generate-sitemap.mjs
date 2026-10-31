/**
 * Generates public/sitemap.xml from dist/learn-routes.json.
 * Run after generate-routes.mjs in the postbuild sequence.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MANIFEST = resolve(__dirname, '../dist/learn-routes.json');
const OUT = resolve(__dirname, '../public/sitemap.xml');

const { sitemap } = JSON.parse(readFileSync(MANIFEST, 'utf8'));

const ORIGIN = 'https://getnelsy.com';

const urls = sitemap
  .map(
    ({ path, priority, changefreq, lastmod }) => `  <url>
    <loc>${ORIGIN}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`✅  Generated sitemap.xml (${sitemap.length} URLs)`);
