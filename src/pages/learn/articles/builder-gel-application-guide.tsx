import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'builder-gel-application-guide',
  title: 'Builder Gel Application Guide for Beginners',
  seoTitle: 'Builder Gel (BIAB) Application Guide for Beginner Nail Techs',
  excerpt: 'Builder gel (BIAB) is one of the most in-demand nail services. This guide covers the application process, layering technique, self-levelling, and how to get a consistent result.',
  seoDescription: 'Builder gel application guide for nail techs. Step-by-step BIAB technique — application, self-levelling, filing, apex, and troubleshooting common issues.',
  category: 'nail-education',
  tags: ['builder gel', 'BIAB', 'builder gel application', 'nail technique'],
  heroImage: 'linear-gradient(135deg, #ECFDF5 0%, #6EE7B7 100%)',
  heroImageAlt: 'Builder gel BIAB application guide',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-biab', label: 'What builder gel / BIAB is' },
    { id: 'when-to-use', label: 'When to use builder gel' },
    { id: 'application-steps', label: 'Application steps' },
    { id: 'self-levelling', label: 'Self-levelling technique' },
    { id: 'filing-finishing', label: 'Filing and finishing' },
    { id: 'infills', label: 'Infills and maintenance' },
    { id: 'common-issues', label: 'Common issues' },
  ],
  relatedSlugs: ['gel-x-application-step-by-step', 'how-to-build-nail-apex', 'nail-prep-guide', 'how-to-improve-nail-retention'],
  faq: [
    { q: 'What\'s the difference between builder gel and regular gel polish?', a: 'Regular gel polish is a thin, pigmented gel applied in multiple coats like regular nail polish. It adds no significant structural strength to the nail. Builder gel is a thicker, structured gel designed to add strength, overlay the nail, or extend it. BIAB (Builder in a Bottle) is a builder gel in a gel-polish-style bottle, making it easier to apply than traditional builder gel in a pot.' },
    { q: 'How many layers of builder gel should I apply?', a: 'Typically 1–2 layers for a natural nail overlay, or 2–3 layers for extensions or significant nail strengthening. The goal is enough product to create strength without creating a rigid structure so thick it can\'t flex with the natural nail. Always follow your product manufacturer\'s guidance.' },
    { q: 'Does BIAB work for nail extensions?', a: 'Yes — builder gel can be applied over nail forms or tips to create extensions, though the technique is different from gel-X tips or acrylic. Building length with BIAB requires more skill than a flat overlay application, as you need to create and maintain a structural apex without it running off the form.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-biab">
        <h2 className="font-serif text-2xl font-bold mb-4">What builder gel / BIAB is</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Builder gel is a thick, UV/LED-cured gel used to add structure, strength, and sometimes length to natural nails. BIAB (Builder in a Bottle) is a formulation of builder gel in a brush-on bottle, making application easier and more accessible than traditional pot-style builder gels.</p>
        <p className="text-gray-700 leading-relaxed">The product self-levels to some extent once applied, cures hard under a UV/LED lamp, and can be filed and shaped after cure. It produces a structured nail overlay that is stronger than gel polish alone. Many clients use BIAB specifically to strengthen nails that break or peel easily.</p>
        <ArticleCallout variant="info" title="Brand variation note">
          BIAB products vary considerably between brands in terms of viscosity, self-levelling behaviour, cure time, and filing requirements. This guide covers general technique — always follow your specific product's instructions.
        </ArticleCallout>
      </section>

      <section id="when-to-use">
        <h2 className="font-serif text-2xl font-bold mb-4">When to use builder gel</h2>
        <ArticleTable
          headers={['Client type', 'Why builder gel works']}
          rows={[
            ['Nail biters', 'Creates structure over short natural nails; helps nails grow without breaking'],
            ['Weak, bendy nails', 'Adds rigidity and prevents breakage'],
            ['Clients wanting natural-looking length', 'Can extend slightly past the free edge for a minimal extension look'],
            ['Clients who keep lifting with standard gel polish', 'The structured overlay provides better adhesion surface for colour'],
            ['Anyone who does wet work', 'A stronger product layer provides more resistance to lifting'],
          ]}
        />
      </section>

      <section id="application-steps">
        <h2 className="font-serif text-2xl font-bold mb-4">Application steps</h2>
        <ArticleSteps steps={[
          {
            title: 'Prep the nail',
            body: 'Push back and remove cuticle, lightly buff the nail plate to remove shine (180–220 grit), remove dust, apply dehydrator, allow to dry, apply primer if required by your product.',
          },
          {
            title: 'Apply the first layer of builder gel',
            body: 'Apply a thin layer of builder gel to the nail plate. With a BIAB bottle, apply from the centre of the nail outward — don\'t drag product back toward the cuticle. Leave a 0.5–1mm gap at the cuticle and sidewalls. Cap the free edge. Cure according to manufacturer instructions.',
          },
          {
            title: 'Build the apex zone (second layer)',
            body: 'Apply a slightly thicker second layer, focusing product in the apex zone (roughly the centre-upper third of the nail plate). This creates the arch and structural strength. Use a brush or orange stick (with a clean end) to guide the product if needed. Cap the free edge again. Cure.',
          },
          {
            title: 'Check for self-levelling',
            body: 'Allow the product to self-level before curing — many builder gels will settle into a smooth finish if given 30–60 seconds. If you cure too quickly, you may lock in brush marks. Move to the next nail while this one self-levels. Work in a sequence — don\'t leave product uncured for too long.',
          },
          {
            title: 'Apply additional layers if needed',
            body: 'For extensions or for clients needing significant strengthening: a third thin layer may be appropriate. Keep each layer thin — thick layers don\'t cure uniformly and can cause the product to pop off in sheets.',
          },
        ]} />
      </section>

      <section id="self-levelling">
        <h2 className="font-serif text-2xl font-bold mb-4">Self-levelling technique</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most builder gels self-level — the viscosity causes them to flow slightly toward a smooth surface before curing. You can encourage this:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Apply product, shape roughly with your brush, then stop touching it and allow it to settle</li>
          <li>Holding the hand/finger horizontal helps product settle evenly; tilting causes it to flow toward the lower side</li>
          <li>A slight warming (from a lamp on low or a warming plate) speeds up self-levelling — but check product compatibility before doing this</li>
          <li>If the product has levelled and cured without brush marks, no filing is needed on the surface — a light buff is enough for finishing</li>
        </ul>
        <ArticleTip>The key with self-levelling: apply and guide, then leave it. Overworking builder gel creates streaks and brush marks. Trust the product.</ArticleTip>
      </section>

      <section id="filing-finishing">
        <h2 className="font-serif text-2xl font-bold mb-4">Filing and finishing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">After cure:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Check the surface — well-applied builder gel needs minimal filing if self-levelling worked</li>
          <li>Shape the free edge with a 180-grit file</li>
          <li>Lightly refine the surface with 240-grit if needed — don't over-file, the product is a functional structure, not just cosmetic</li>
          <li>Buff to a smooth finish</li>
          <li>Apply gel polish colour over the top, or a gel top coat for a natural look</li>
        </ul>
      </section>

      <section id="infills">
        <h2 className="font-serif text-2xl font-bold mb-4">Infills and maintenance</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Builder gel grows out with the nail, leaving a gap at the cuticle. Infills involve:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Remove old colour/top coat (either by removal or e-file)</li>
          <li>Gently file the existing product surface to create adhesion for the new layer</li>
          <li>Fill the gap at the cuticle with a thin layer of builder gel</li>
          <li>Blend the new product into the existing product</li>
          <li>Rebuild the apex if it has been reduced by filing</li>
          <li>Apply colour and finish as usual</li>
        </ol>
        <p className="text-gray-700 leading-relaxed">Infill frequency: most clients rebook every 2–3 weeks, similar to standard gel appointments.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">For more on retention: <Link to="/learn/how-to-improve-nail-retention" className="underline text-[#F52B8C]">how to improve nail retention</Link> | <Link to="/learn/nail-prep-guide" className="underline text-[#F52B8C]">nail prep guide</Link>.</p>
      </section>

      <section id="common-issues">
        <h2 className="font-serif text-2xl font-bold mb-4">Common issues</h2>
        <ArticleTable
          headers={['Issue', 'Cause', 'Fix']}
          rows={[
            ['Brush marks visible after cure', 'Over-worked product; not allowing self-levelling', 'Apply and guide gently, then leave to self-level before curing'],
            ['Product pops off in sheets', 'Prep failure; applied too thick', 'Review prep sequence; apply in thinner layers, cure between each'],
            ['Cuticle area lifts quickly', 'Product touching cuticle skin', 'Leave consistent gap; don\'t let product flood the cuticle'],
            ['Uneven surface requiring extensive filing', 'Too much product in some areas', 'Apply thinner layers; the first layer is a base, not the structure'],
          ]}
        />
      </section>
    </div>
  ),
});
export {};
