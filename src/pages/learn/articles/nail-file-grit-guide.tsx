import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-file-grit-guide',
  title: 'Nail File Grit Guide for Nail Techs',
  seoTitle: 'Nail File Grit Guide: Which Grit to Use When (Nail Tech)',
  excerpt: 'Understanding nail file grit numbers is one of the first things to get right as a nail tech. The wrong grit damages nails or won\'t do the job. Here\'s the complete guide.',
  seoDescription: 'Nail file grit guide for nail techs. What grit numbers mean, which grit to use for natural nails vs. gel vs. acrylic, and when to replace your files.',
  category: 'nail-education',
  tags: ['nail file grit', 'nail files', 'nail tech tools', 'nail file guide'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'Nail file grit guide for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'what-grit-means', label: 'What grit numbers mean' },
    { id: 'grit-chart', label: 'Nail file grit chart' },
    { id: 'file-types', label: 'File types explained' },
    { id: 'which-grit-when', label: 'Which grit to use for each task' },
    { id: 'hygiene', label: 'File hygiene and replacement' },
  ],
  relatedSlugs: ['nail-drill-bits-explained', 'nail-prep-guide', 'how-to-prevent-nail-lifting'],
  faq: [
    { q: 'Can you use the same nail file on natural nails and gel/acrylic?', a: 'You can physically use the same file, but you shouldn\'t. Files used on extensions accumulate product particles and lose abrasiveness. More importantly, a file appropriate for acrylic (100-grit) would badly damage natural nails. Keep separate files for natural nail prep and product work — and replace or disinfect between clients.' },
    { q: 'What grit nail file should a beginner nail tech use on natural nails?', a: '180-grit is the most versatile starting point for natural nails — firm enough to file and shape, gentle enough not to damage. Many experienced nail techs use 180-grit as their primary natural nail file and only go coarser for specific extension prep tasks.' },
    { q: 'How often should nail files be replaced?', a: 'A file loses abrasiveness with use and cannot be fully restored. Replace files regularly — most professionals use disposable files and replace them between clients for sanitation reasons. Reusable files (crystal, glass, metal) can be disinfected between clients. A file that feels smooth or requires more passes than usual is past its effective life.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-grit-means">
        <h2 className="font-serif text-2xl font-bold mb-4">What grit numbers mean</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Grit number refers to the size of the abrasive particles on the file surface. The number is based on mesh size — how many holes per square inch a mesh would need to pass those particles through. A higher number = smaller particles = finer file. A lower number = larger particles = coarser file.</p>
        <p className="text-gray-700 leading-relaxed">The practical implication: a 100-grit file removes material quickly and aggressively; a 240-grit file smooths and polishes. Choosing the wrong grit means either failing to remove what needs removing, or removing too much.</p>
        <ArticleCallout variant="info" title="Quick rule">
          Low number = more abrasive = for tough jobs (product removal, shaping extensions). High number = less abrasive = for delicate jobs (natural nails, finishing, buffing).
        </ArticleCallout>
      </section>

      <section id="grit-chart">
        <h2 className="font-serif text-2xl font-bold mb-4">Nail file grit chart</h2>
        <ArticleTable
          headers={['Grit', 'Abrasiveness', 'Typical use']}
          rows={[
            ['60–80', 'Very coarse', 'Heavy duty product removal; rarely used in salon settings'],
            ['100', 'Coarse', 'Shaping hard gel extensions, acrylic; NOT for natural nails'],
            ['120–150', 'Medium-coarse', 'Shaping enhancements, removing gel polish from extensions'],
            ['180', 'Medium', 'Natural nail shaping; refining gel/acrylic surface; most-used grit'],
            ['240', 'Fine', 'Final smoothing of product surface; natural nail prep; sealing edges'],
            ['280–320', 'Extra fine', 'Finishing buffer for product; removes minor scratches'],
            ['400–600', 'Ultra fine', 'Polishing natural nail; high-gloss finishing'],
            ['1000–4000', 'Buffing pads', 'Multi-step shine buff for natural or product surface'],
          ]}
        />
      </section>

      <section id="file-types">
        <h2 className="font-serif text-2xl font-bold mb-4">File types explained</h2>
        <ArticleTable
          headers={['File type', 'Construction', 'Best for', 'Hygiene']}
          rows={[
            ['Emery board', 'Paper / cardboard core with abrasive coating', 'Natural nails; disposable per client', 'Single-use (cannot be sterilised)'],
            ['Cushion / foam file', 'Foam core, more flexibility', 'Natural nail shaping; gentle use', 'Single-use preferred; some can be sanitised'],
            ['Glass / crystal file', 'Tempered glass surface', 'Natural nails; seals nail edge cleanly', 'Can be washed with soap + disinfected; reusable'],
            ['Metal file', 'Solid metal', 'Durable; long-lasting', 'Can be autoclave-sterilised; reusable'],
            ['Buffer block', 'Multi-sided foam/sponge', 'Shine buffing; finishing', 'Single-use in professional settings'],
          ]}
        />
        <ArticleTip>Glass files seal the nail edge as they file, reducing delamination (nail layers separating). They are gentler on natural nails than emery boards and can be thoroughly cleaned. A good investment for professionals who do regular natural nail manicures.</ArticleTip>
      </section>

      <section id="which-grit-when">
        <h2 className="font-serif text-2xl font-bold mb-4">Which grit to use for each task</h2>
        <ArticleTable
          headers={['Task', 'Grit to use']}
          rows={[
            ['Shape natural nail', '180–240 grit'],
            ['Seal and smooth natural nail edge', '240–280 grit or glass file'],
            ['Buff natural nail before gel application', '180–220 grit (remove shine only)'],
            ['Shape hard gel extension', '100–150 grit'],
            ['Shape acrylic extension', '100–150 grit'],
            ['Refine gel/acrylic surface', '180–240 grit'],
            ['Final surface smoothing before top coat', '240–320 grit'],
            ['Buff to high shine (product or natural)', '400–600 grit buffer; then 1000+ if going shine-only'],
            ['Remove shine from gel for infill', '180 grit lightly over existing product'],
          ]}
        />
      </section>

      <section id="hygiene">
        <h2 className="font-serif text-2xl font-bold mb-4">File hygiene and replacement</h2>
        <ArticleChecklist title="File hygiene checklist" items={[
          'Use disposable emery boards and buffers — replace between clients without exception',
          'Reusable files (glass, metal): wash with soap and water after each client, then disinfect',
          'Metal files: autoclave-safe — sterilise regularly if your setup allows',
          'Never use a natural nail file on extension/product (or vice versa)',
          'Label file sets for natural nails vs. product to avoid cross-use',
          'Replace files when they feel smooth or take more passes than usual to achieve the same result',
          'A file that sheds abrasive particles has degraded — replace immediately',
        ]} />
        <ArticleCallout variant="tip" title="Hygiene regulation note">
          In the UK, disposable tools (emery boards, buffers) used on clients must be disposed of after each client. Reusable metal tools must be cleaned, disinfected, and sterilised to local hygiene standards. Check your council/insurance requirements for specifics if you work in a registered salon space.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For e-file/drill bit equivalents: <Link to="/learn/nail-drill-bits-explained" className="underline text-[#F52B8C]">nail drill bits explained</Link>. For how file choice affects prep quality: <Link to="/learn/nail-prep-guide" className="underline text-[#F52B8C]">nail prep guide for better retention</Link>.</p>
      </section>
    </div>
  ),
});
export {};
