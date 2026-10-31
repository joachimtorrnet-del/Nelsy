import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-prep-guide',
  title: 'Nail Prep Guide for Better Retention',
  seoTitle: 'Nail Prep Guide for Better Retention (Step-by-Step)',
  excerpt: 'Gel lifting, peeling, and chipping almost always come back to prep. This guide covers every step of nail preparation — in order, with reasons — for both gel and acrylic.',
  seoDescription: 'Nail prep guide for better retention. Step-by-step nail preparation for gel and acrylic — why each step matters and the most common prep mistakes that cause lifting.',
  category: 'nail-education',
  tags: ['nail prep', 'nail retention', 'gel lifting', 'nail preparation steps'],
  heroImage: 'linear-gradient(135deg, #F0FFF4 0%, #A7F3D0 100%)',
  heroImageAlt: 'Nail prep guide for better retention',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'why-prep-matters', label: 'Why prep is the most important step' },
    { id: 'prep-steps', label: 'Full nail prep sequence' },
    { id: 'gel-vs-acrylic', label: 'Prep differences: gel vs. acrylic' },
    { id: 'common-mistakes', label: 'Prep mistakes that cause lifting' },
    { id: 'client-prep', label: 'Client prep instructions' },
  ],
  relatedSlugs: ['how-to-prevent-nail-lifting', 'nail-drill-bits-explained', 'nail-file-grit-guide'],
  faq: [
    { q: 'Why is my gel polish lifting even when I prep properly?', a: 'Check these: (1) Is the nail surface completely dehydrated before application? Any moisture or oil causes lifting. (2) Are you capping the free edge? Forgetting to cap is a common cause of tip lifting. (3) Is your primer on the natural nail only, not the cuticle area? (4) Is your base coat applied in thin layers? Thick layers can lift at the cuticle. (5) Is your lamp calibrated and curing at the right wattage for your specific product?' },
    { q: 'Does nail prep need to be different for different natural nail types?', a: 'Yes. Thin or damaged nails need gentler prep — less buffing, more gentle dehydration. Oily nail beds need thorough dehydration and a good primer/bonder. Ridged nails benefit from a ridge-filling base coat applied after standard prep. Always assess the natural nail before choosing your prep approach.' },
    { q: 'Is it necessary to use a dehydrator AND a primer?', a: 'They do different jobs. A dehydrator removes moisture from the nail surface. A primer (acid or acid-free) creates a bonding layer between the natural nail and the product. Both improve adhesion. Using both is standard practice for professional gel and acrylic application, especially on clients with oily nail beds or a history of lifting.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-prep-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why prep is the most important step</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Gel and acrylic products bond to the nail plate through a combination of mechanical adhesion (texture/roughness creating grip), chemical adhesion (primers and bonding agents), and absence of barriers (oils and moisture breaking the bond). Prep addresses all three.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">When a client reports lifting at the cuticle, lifting at the tip, or peeling after a few days — the answer is almost always prep. Not the product. Not the lamp. Not the client's "bad nails." Prep.</p>
        <ArticleCallout variant="info" title="The prep rule">
          If you're getting consistent lifting, the first thing to examine is your prep sequence, not your product choice. Most lifting problems are solved by more thorough preparation, not switching brands.
        </ArticleCallout>
      </section>

      <section id="prep-steps">
        <h2 className="font-serif text-2xl font-bold mb-4">Full nail prep sequence</h2>
        <ArticleSteps steps={[
          {
            title: 'Remove old product',
            body: 'Remove any existing polish, gel, or extensions properly. Don\'t rush removal — torn or damaged nail plates are much harder to work with. Use appropriate removal method for the product type (soak, file, or e-file).',
          },
          {
            title: 'Push back and remove cuticle',
            body: 'Use a cuticle pusher to push back the cuticle from the nail plate. Remove any dead skin cells (pterygium) from the nail surface with a cuticle nippers or cuticle remover product. Product applied over cuticle lifts — always.',
          },
          {
            title: 'Shape the free edge',
            body: 'File the free edge to the desired shape using a 180-grit file for natural nails. File in one direction only to prevent delamination. Set the final shape now — you\'ll refine after product application.',
          },
          {
            title: 'Buff the nail surface',
            body: 'Lightly buff the nail plate with a 180–220 grit buffer to remove shine and create texture for adhesion. You\'re removing shine, not removing layers of nail. Light-handed buffing over the whole nail plate, paying attention to the cuticle area.',
          },
          {
            title: 'Remove dust',
            body: 'Use a nail brush or lint-free wipe to thoroughly remove buffing dust. Dust left on the nail plate can create a barrier between the nail and product. Brush from cuticle to free edge.',
          },
          {
            title: 'Apply dehydrator',
            body: 'Apply a dehydrator (nail prep fluid) to the entire nail plate using a lint-free wipe or brush. This removes any remaining moisture and surface oils. Allow to dry completely — 30–60 seconds. Don\'t touch the nail plate after this step.',
          },
          {
            title: 'Apply primer',
            body: 'Apply a thin layer of acid-free primer (or acid primer if using with acrylic — check product instructions) to the natural nail only. Avoid the cuticle and skin. Allow to dry to a tacky/chalky finish before applying product. Primer on skin can cause irritation.',
          },
          {
            title: 'Apply base coat or structure gel',
            body: 'Apply base coat in a thin, even layer. Avoid flooding the cuticle. Cap the free edge. Cure for the manufacturer\'s recommended time. Thin layers cure properly and are less likely to lift than thick applications.',
          },
        ]} />
      </section>

      <section id="gel-vs-acrylic">
        <h2 className="font-serif text-2xl font-bold mb-4">Prep differences: gel vs. acrylic</h2>
        <ArticleTable
          headers={['Step', 'Gel', 'Acrylic']}
          rows={[
            ['Buffing', 'Light buff to remove shine only', 'Slightly more thorough — acrylic benefits from more texture'],
            ['Dehydrator', 'Essential', 'Essential'],
            ['Primer', 'Acid-free primer recommended', 'Acid primer standard — follow brand guidelines'],
            ['Free edge prep', 'File shape, cap edge with base coat', 'File and bevel the free edge for product adhesion'],
            ['Cuticle area', 'Leave 0.5–1mm gap from cuticle', 'Leave 0.5–1mm gap from cuticle'],
          ]}
        />
        <ArticleTip>Acid primers create stronger chemical adhesion but must only be used on the natural nail plate — never on skin. Acid-free primers are safer for sensitive clients and are the standard for gel systems. Always follow your product manufacturer's recommended primer for their specific product range.</ArticleTip>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Prep mistakes that cause lifting</h2>
        <ArticleTable
          headers={['Mistake', 'What happens', 'Fix']}
          rows={[
            ['Skipping dehydrator', 'Surface oils break the product bond at the nail plate', 'Always dehydrate — even on clients with dry nail beds'],
            ['Leaving pterygium on nail plate', 'Product lifts with the skin it\'s bonded to', 'Remove all dead skin from the nail surface before buffing'],
            ['Touching the nail plate after dehydration', 'Skin oils re-contaminate the surface', 'Don\'t touch the nail — use a lint-free wipe for any adjustments'],
            ['Flooding the cuticle area', 'Product attached to skin lifts', 'Work close to cuticle but leave a visible gap'],
            ['Not capping the free edge', 'Tip lifting; water gets under the product', 'Always cap the free edge with each layer'],
            ['Over-buffing thin nails', 'Nail plate becomes thinner and more flexible — product cracks', 'Light buff only; skip buffing on very thin nails'],
            ['Applying thick layers', 'Thick base or colour coats can lift at the cuticle', 'Thin layers, fully cured between coats'],
          ]}
        />
      </section>

      <section id="client-prep">
        <h2 className="font-serif text-2xl font-bold mb-4">Client prep instructions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Client prep before the appointment affects retention too. Provide these instructions with your booking confirmation:</p>
        <ArticleChecklist title="What to tell clients before their appointment" items={[
          'Remove old polish or gel at home if possible — saves appointment time',
          'Don\'t cut or file nails to a specific shape — leave that to the nail tech',
          'Avoid applying hand creams, oils, or lotions on the day of the appointment',
          'Arrive with clean, dry hands',
          'Push back cuticles gently the night before if they have a pusher',
          'Don\'t soak nails (bath, swimming) immediately before appointment — hydrated nails can affect adhesion',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">For more on preventing lifting from a client care perspective: <Link to="/learn/how-to-prevent-nail-lifting" className="underline text-[#F52B8C]">how to prevent nail lifting</Link>.</p>
      </section>
    </div>
  ),
});
export {};
