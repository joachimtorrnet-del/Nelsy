import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

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
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: "To apply builder gel, prep and dehydrate the nail, apply a thin base layer, float a bead of builder gel into the apex zone, let it self-level, cure, then refine and finish.",
    detail: "The two skills that make the biggest difference are keeping a small gap at the cuticle and placing the apex correctly. Thin layers and full cures prevent most other problems.",
    points: [
      { label: "Best for", text: "Weak, bendy or bitten nails that need strength at natural length." },
      { label: "Key technique", text: "Floating the bead instead of brushing product around." },
      { label: "Infill cycle", text: "Most clients rebook every two to three weeks." },
    ],
  },
  toc: [
    { id: 'what-is-biab', label: 'What builder gel / BIAB is' },
    { id: 'when-to-use', label: 'When to use builder gel' },
    { id: 'application-steps', label: 'Application steps' },
    { id: 'self-levelling', label: 'Self-levelling technique' },
    { id: 'floating', label: 'The floating technique' },
    { id: 'filing-finishing', label: 'Filing and finishing' },
    { id: 'infills', label: 'Infills and maintenance' },
    { id: 'common-issues', label: 'Common issues' },
    { id: 'checklist', label: 'Builder gel checklist' },
  ],
  relatedSlugs: ['gel-x-application-step-by-step', 'how-to-build-nail-apex', 'nail-prep-guide', 'how-to-improve-nail-retention'],
  faq: [
    { q: "What's the difference between builder gel and regular gel polish?", a: "Gel polish is a thin, pigmented gel that adds colour but little strength. Builder gel is thicker and designed to add structure, overlay the natural nail or create length. BIAB, short for Builder in a Bottle, is builder gel packaged in a polish-style bottle so it is easier to apply than pot builder gel." },
    { q: "How many layers of builder gel should I apply?", a: "Most natural nail overlays use a thin base layer plus one structure layer. Weaker nails or extensions may need an extra thin layer. The goal is enough product for strength without a thick, rigid layer. Always follow your product's guidance." },
    { q: "Does BIAB work for nail extensions?", a: "Yes. Builder gel can be applied over forms or tips to create length, but it takes more skill than an overlay because you need to build and hold an apex without the product running off the form. Many techs learn overlays first, then move on to extensions." },
    { q: "Do you need primer with builder gel?", a: "It depends on the brand. Some builder gels are designed to go straight onto a dehydrated nail, while others ask for an acid-free primer or bonder first. Check your product's instructions." },
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

      <section id="floating">
        <h2 className="font-serif text-2xl font-bold mb-4">The floating technique</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Floating is a common way to build structure with BIAB without dragging product into the cuticle:</p>
        <ArticleSteps steps={[
          { title: 'Apply a thin base layer and cure', body: 'Some brands want this layer cured, others leave it uncured as a slip layer. Follow your product.' },
          { title: 'Pick up a bead of builder gel', body: 'Let a bead form at the tip of the bottle brush, or pick one up from the pot.' },
          { title: 'Drop the bead into the apex zone', body: 'Place it in the centre of the nail, slightly toward the cuticle, without pressing the brush onto the nail.' },
          { title: 'Float it into place', body: 'Hover the brush just above the gel and guide it toward the cuticle and sidewalls, keeping the small gap. The brush should barely touch the nail plate.' },
          { title: 'Turn the finger upside down for a few seconds', body: 'Many techs flip the hand briefly so gravity pulls the gel into a smooth arch, then turn it back and check before curing.' },
        ]} />
        <ArticleTip>Do one nail at a time when you are learning. Builder gel keeps moving until it is cured, so leaving several nails uncured makes it hard to keep the apex in place.</ArticleTip>
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
        <p className="text-gray-700 mt-4 leading-relaxed">For more on retention: <Link to="/blog/how-to-improve-nail-retention" className="underline text-[#F52B8C]">how to improve nail retention</Link> | <Link to="/blog/nail-prep-guide" className="underline text-[#F52B8C]">nail prep guide</Link>.</p>
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

      <section id="checklist">
        <h2 className="font-serif text-2xl font-bold mb-4">Builder gel checklist</h2>
        <ArticleChecklist title="Check each nail before the final top coat" items={[
          'Side view: one smooth curve with the highest point in the apex zone, not at the cuticle or tip.',
          'Front view: an even C-curve, with no flat spots or dips.',
          'Cuticle and sidewalls: thin, smooth edges with no ledge you can feel.',
          'Free edge: capped and not thicker than the rest of the nail.',
          'Surface: no brush marks or dents left that the top coat will magnify.',
        ]} />
        <p className="text-gray-700 leading-relaxed">For apex placement in more detail, see <Link to="/blog/how-to-build-nail-apex" className="underline text-[#F52B8C]">how to build a nail apex</Link>, and for the mistakes that cause lifting, <Link to="/blog/common-builder-gel-mistakes" className="underline text-[#F52B8C]">common builder gel mistakes</Link>.</p>
      </section>
    </div>
  ),
});
export {};
