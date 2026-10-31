import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'why-does-gel-polish-peel-off',
  title: 'Why Does Gel Polish Peel Off? Common Causes and Fixes',
  seoTitle: 'Why Does Gel Polish Peel Off? Causes and Fixes',
  excerpt: 'Gel polish that peels within days is frustrating — but nearly always fixable. Here are the most common reasons gel polish fails and exactly how to address each one.',
  seoDescription: 'Why does gel polish peel off? Common causes of gel polish peeling — prep issues, curing problems, application errors, and aftercare mistakes — with practical fixes.',
  category: 'nail-education',
  tags: ['why does gel polish peel off', 'gel polish peeling causes', 'gel polish lifting fix'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #F3E8FF 100%)',
  heroImageAlt: 'Why does gel polish peel off',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'prep-causes', label: 'Prep causes' },
    { id: 'application-causes', label: 'Application causes' },
    { id: 'curing-causes', label: 'Curing causes' },
    { id: 'aftercare-causes', label: 'Aftercare causes' },
    { id: 'peeling-vs-lifting', label: 'Peeling vs lifting — what\'s the difference?' },
  ],
  relatedSlugs: ['how-to-improve-nail-retention', 'nail-prep-guide', 'how-to-apply-gel-polish-without-streaks', 'nail-dehydrator-vs-primer'],
  faq: [
    { q: 'How long should gel polish last without peeling?', a: 'Properly applied gel polish on well-prepped nails should last 2–3 weeks without peeling. Shorter retention — especially peeling within the first week — indicates a preventable issue, almost always in preparation or application.' },
    { q: 'Why does my gel polish peel off in one sheet?', a: 'Peeling in one sheet (rather than lifting at the edge) is usually caused by insufficient prep — oil on the nail plate or skipping dehydrator prevents the gel from bonding at all, so it sits on top of the nail rather than adhering to it.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="prep-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Prep causes</h2>
        <ArticleTable
          headers={['Cause', 'Fix']}
          rows={[
            ['Oil on the nail plate', 'Cleanse nails with nail cleanser or 99% IPA as the final step before base coat — after all prep, including buffing and dehydration'],
            ['Skipping dehydrator', 'Dehydrator removes surface moisture; without it, the base coat is sitting on a hydrated surface that doesn\'t bond well'],
            ['Skipping base coat', 'Some nail techs skip base coat to save time — this dramatically reduces retention; always use a base coat designed for gel systems'],
            ['Cuticle or dead skin on the plate', 'Any skin on the nail plate means the product lifts when the skin cells shed; thorough pterygium removal is essential'],
            ['Not buffing off shine', 'Shiny nails indicate an oily or smooth surface; a light buff creates micro-texture for better adhesion'],
          ]}
        />
      </section>

      <section id="application-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Application causes</h2>
        <ArticleTable
          headers={['Cause', 'Fix']}
          rows={[
            ['Flooding the cuticle', 'Gel on skin peels as skin sheds; apply 0.5–1mm from the cuticle and sidewalls on every layer'],
            ['Applying too thick', 'Thick gel doesn\'t cure all the way through — the underside stays tacky and soft, causing peeling; apply in thin layers'],
            ['Not capping the free edge', 'The free edge is where peeling starts — seal every layer (base, colour, top) across the tip of the nail'],
            ['Contaminating layers', 'Touching the nail between layers introduces oil from fingers; avoid contact after cleansing'],
          ]}
        />
      </section>

      <section id="curing-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Curing causes</h2>
        <ArticleTable
          headers={['Cause', 'Fix']}
          rows={[
            ['Under-curing', 'Gel that isn\'t fully cured stays soft and flexible — it peels rather than sitting firm on the nail; check your lamp wattage and curing time recommendations against the product system you\'re using'],
            ['Lamp not compatible with the product', 'LED and UV lamps have different wavelengths; some gels are designed for specific lamp types — check product manufacturer guidance'],
            ['Lamp bulbs degraded', 'Bulbs lose power over time; if retention suddenly worsens without a change in technique, check your lamp'],
            ['Shadows during curing', 'Fingers shielding each other in the lamp can cause uneven curing; check that all nails receive full light exposure'],
          ]}
        />
        <ArticleCallout variant="info" title="Always follow manufacturer curing guidance">
          Lamp wattage and curing times are product-specific. Always check the manufacturer's recommended curing times for your specific gel system — do not apply general curing times to all products.
        </ArticleCallout>
      </section>

      <section id="aftercare-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Aftercare causes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Prolonged water exposure:</strong> Repeated wet/dry cycles cause the nail to expand and contract; gel doesn't move with it</li>
          <li><strong>Harsh chemicals:</strong> Cleaning products and acetone-based removers break down the gel seal; recommend gloves for cleaning</li>
          <li><strong>Peeling or picking:</strong> Peeling gel off removes layers of the nail plate with it — remind clients of the damage this causes</li>
          <li><strong>No cuticle oil:</strong> Dry nail plates are more prone to edge lifting; recommend daily cuticle oil use</li>
        </ul>
      </section>

      <section id="peeling-vs-lifting">
        <h2 className="font-serif text-2xl font-bold mb-4">Peeling vs lifting — what's the difference?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Peeling</strong> — gel coming off in a sheet or chunk, often from the free edge or suddenly — usually caused by prep failure (oil, no dehydrator) or curing issues. The product never bonded properly.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Lifting</strong> — product separating from the nail plate gradually, usually at the cuticle or sidewalls — usually caused by flooded cuticle, incomplete prep, or product touching skin. For more: <Link to="/learn/how-to-improve-nail-retention" className="underline text-[#F52B8C]">how to improve nail retention</Link>.</p>
      </section>
    </div>
  ),
});
export {};
