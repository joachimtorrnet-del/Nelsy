/**
 * Loads every article's metadata (not its body) by bundling the article files
 * with esbuild, so scripts see exactly what the app sees: title, category,
 * coverTitle, craft and the cover photo picked by coverPhotoFor().
 */
import { readdirSync, mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { pathToFileURL } from 'url';
import { build } from 'esbuild';

export async function loadArticles(root) {
  const dir = join(root, 'src/pages/learn/articles');
  const files = readdirSync(dir).filter((f) => f.endsWith('.tsx')).sort();
  const entry = [
    ...files.map((f, i) => `import * as a${i} from ${JSON.stringify(join(dir, f))};`),
    `import { getAllArticles, getAudiences, getCraft } from ${JSON.stringify(join(root, 'src/lib/articles.ts'))};`,
    `import { coverPhotoFor } from ${JSON.stringify(join(root, 'src/lib/blogLinks.ts'))};`,
    `void [${files.map((_, i) => `a${i}`).join(',')}];`,
    `export default getAllArticles().map((a) => ({ slug: a.slug, title: a.title, category: a.category, excerpt: a.excerpt,`,
    `  tags: a.tags, coverTitle: a.coverTitle, craft: getCraft(a), audience: getAudiences(a),`,
    `  photo: coverPhotoFor(a.slug, a.category), heroImage: a.heroImage }));`,
  ].join('\n');
  const tmp = mkdtempSync(join(tmpdir(), 'nelsy-articles-'));
  const outfile = join(tmp, 'articles.mjs');
  try {
    await build({
      stdin: { contents: entry, resolveDir: root, loader: 'ts' },
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile,
      jsx: 'automatic',
      logLevel: 'error',
      alias: { '@': join(root, 'src') },
      // Only metadata is read: stub every package and asset import
      plugins: [{
        name: 'stub-packages',
        setup(b) {
          b.onResolve({ filter: /^[^./]/ }, (args) =>
            args.path.startsWith('@/') ? undefined : { path: args.path, namespace: 'stub' });
          b.onResolve({ filter: /\.(css|png|jpe?g|svg|webp)$/ }, (args) => ({ path: args.path, namespace: 'stub' }));
          b.onLoad({ filter: /.*/, namespace: 'stub' }, () => ({
            contents: 'const p = new Proxy(function () { return p; }, { get: (t, k) => (k === "__esModule" ? true : k === Symbol.toPrimitive ? () => "" : p), apply: () => p, construct: () => p }); module.exports = p;',
            loader: 'js',
          }));
        },
      }],
      define: { 'import.meta.env': '{}' },
    });
    const mod = await import(pathToFileURL(outfile).href);
    return mod.default;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}
