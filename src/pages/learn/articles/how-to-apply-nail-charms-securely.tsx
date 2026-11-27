import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleCallout, ArticleSteps, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-apply-nail-charms-securely',
  title: 'How to Apply Nail Charms Securely',
  seoTitle: "How to Apply Nail Charms So They Stay On (Step by Step)",
  excerpt: 'Nail charms that pop off within days are a client service issue. Here\'s how to set 3D charms, rhinestones, and nail art embellishments so they stay on for the full wear time.',
  seoDescription: "How to put on nail charms, rhinestones and 3D embellishments so they stay on: products, placement, curing and the mistakes that make charms fall off.",
  category: 'nail-education',
  audience: ['pros'],
  craft: 'nails',
  tags: ['how to apply nail charms', 'nail charms technique', 'rhinestone nail art'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to apply nail charms securely',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: "To make nail charms stay on, set them in a thick builder or charm gel, flash cure, then build a small collar of gel around the base before top coat.",
    detail: "Most charms fall off because there is too little gel under them or nothing sealing the edge. Small flat stones can go under top coat; large 3D charms need a gel collar.",
    points: [
      { label: "Best adhesive", text: "Builder gel or a dedicated charm gel." },
      { label: "Best placement", text: "Centre of the nail, away from the cuticle and free edge." },
      { label: "Avoid", text: "Superglue, which is brittle and not made for nails." },
    ],
  },
  toc: [
    { id: 'step-by-step', label: 'Step by step: a charm that stays on' },
    { id: 'why-charms-fall', label: 'Why charms fall off' },
    { id: 'rhinestones', label: 'Applying rhinestones' },
    { id: '3d-charms', label: 'Applying 3D charms' },
    { id: 'sealing', label: 'Sealing embellishments' },
    { id: 'placement', label: 'Placement for longevity' },
    { id: 'which-adhesive', label: 'Which adhesive for which charm' },
    { id: 'aftercare', label: 'Charm aftercare for clients' },
  ],
  relatedSlugs: ['how-to-create-clean-nail-art-lines', 'how-to-improve-nail-art-skills', 'nail-tech-aftercare-guide'],
  faq: [
    { q: "Can you seal rhinestones completely under top coat?", a: "Small flat-back rhinestones can be sealed under top coat. Larger or raised stones and 3D charms cannot be fully covered, because the top coat is not thick enough. For those, use a firm gel adhesive under the charm and build a small collar of gel around the base edge." },
    { q: "What adhesive is best for nail charms?", a: "A thick builder gel or a dedicated charm gel gives the strongest hold, because it cures solid around the base of the charm. Nail glue is faster but tends to be less durable. Avoid superglue: it is brittle and not formulated for use on nails." },
    { q: "Why do my nail charms fall off after a few days?", a: "The usual causes are too little gel under the charm, a charm placed on a cured and non-tacky surface without buffing, or no gel collar around the base. Heavy charms placed near the free edge are also knocked off much more often." },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="step-by-step">
        <h2 className="font-serif text-2xl font-bold mb-4">Step by step: a charm that stays on</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">This is the general sequence for a gel set. Cure times depend on your lamp and product, so follow the brand's instructions.</p>
        <ArticleSteps steps={[
          { title: 'Finish the colour first', body: 'Apply and cure base and colour as normal. Plan charm placement now, ideally in the centre of the nail.' },
          { title: 'Lightly buff the spot (optional)', body: 'If the charm goes onto a fully cured, non-tacky layer, a quick buff of that small area gives the adhesive something to grip.' },
          { title: 'Place a small bead of adhesive gel', body: 'Use a thick builder gel or a charm gel, sized to the base of the charm. Thick gels hold the charm in position without sliding.' },
          { title: 'Seat the charm with a picker or dotting tool', body: 'Press it down so it sits level and fully in contact with the gel. Avoid touching the base with your fingers.' },
          { title: 'Flash cure, then fully cure', body: 'A short flash cure locks the position. Check it is straight, then do a full cure.' },
          { title: 'Build a small collar of gel around the base', body: 'With a fine brush, run gel around the edge where the charm meets the nail so there is no gap to catch. Cure again.' },
          { title: 'Top coat around the charm', body: 'Apply top coat to the rest of the nail and around the collar. Cap the free edge, then cure.' },
        ]} />
      </section>

      <section id="why-charms-fall">
        <h2 className="font-serif text-2xl font-bold mb-4">Why charms fall off</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Applied to a fully cured, non-tacky surface:</strong> Charms need a tacky gel surface or fresh adhesive gel to grip. They won't bond to a finished, non-sticky surface</li>
          <li><strong>Insufficient adhesive beneath the charm:</strong> Too little gel under the base means there's nothing structural to hold it</li>
          <li><strong>Heavy charm on a weak attachment:</strong> Large, heavy 3D charms pull off under their own weight if not properly built up at the base</li>
          <li><strong>No structural sealing at the base:</strong> The charm-to-nail edge must be sealed with gel around the base to prevent catching and lifting</li>
        </ul>
      </section>

      <section id="rhinestones">
        <h2 className="font-serif text-2xl font-bold mb-4">Applying rhinestones</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Apply rhinestones into a wet (uncured) gel layer, either a layer of clear gel or the tacky top coat layer</li>
          <li>Place the rhinestone with a dotting tool, an orange stick, or a rhinestone picker, not with fingers, which leave oils on the setting</li>
          <li>Press gently to seat the rhinestone flat into the gel: it should sit flush, not perch on top</li>
          <li>After setting all rhinestones, cure the gel layer with the stones in place</li>
          <li>Apply a layer of clear gel around (not over, unless flat-back) the rhinestones to build up the base and seal the edge: cure again</li>
        </ul>
        <ArticleTip>Applying rhinestones to a gel that's been flash-cured (partially cured) rather than fully cured gives a better bond: the gel is firm enough to hold position but still tacky enough to grip the rhinestone base.</ArticleTip>
      </section>

      <section id="3d-charms">
        <h2 className="font-serif text-2xl font-bold mb-4">Applying 3D charms</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Use a dedicated nail charm adhesive gel or a small bead of builder gel as the base for the charm</li>
          <li>Apply the adhesive gel to the nail in the exact spot where the charm will sit: size the bead to the charm base, not larger</li>
          <li>Press the charm firmly into the wet gel; it should be stable and level before curing</li>
          <li>Cure the adhesive through the charm if possible, or flash-cure first then check positioning</li>
          <li>After initial cure, use a fine brush and clear gel to build up the base of the charm on all sides: creating a small structural ramp that holds the charm in place</li>
          <li>Cure the structural layer fully</li>
        </ul>
        <ArticleCallout variant="warning" title="Build up the base for heavy charms">
          A heavy 3D charm with only a thin adhesive layer beneath it will eventually twist and pull off: the weight creates leverage. Build gel up around the base on all sides so the charm is literally encased at its base, not just glued on top.
        </ArticleCallout>
      </section>

      <section id="sealing">
        <h2 className="font-serif text-2xl font-bold mb-4">Sealing embellishments</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Flat rhinestones: seal under top coat. Apply top coat over the entire nail including over the stones; the thin layer over the top is protective</li>
          <li>Raised rhinestones and 3D charms: cannot be fully covered; use gel to seal the base edges and leave the top exposed</li>
          <li>Apply top coat to the nail around the embellishments, taking care not to flood the charm base with top coat (which can pop off on curing)</li>
          <li>Cap the free edge with top coat to protect the nail structure regardless of embellishment placement</li>
        </ul>
      </section>

      <section id="placement">
        <h2 className="font-serif text-2xl font-bold mb-4">Placement for longevity</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Place charms away from the cuticle area: charms near the cuticle catch on clothing and are knocked off more easily</li>
          <li>Avoid placement on the very tip of the free edge: this is the highest-impact area and embellishments here will be knocked off quickly</li>
          <li>Centre-nail or mid-nail placement tends to last longest: the charm is somewhat protected on all sides</li>
          <li>For clients with active lifestyles, advise that 3D charms may not last the full wear period and discuss expectations before applying</li>
        </ul>
      </section>

      <section id="which-adhesive">
        <h2 className="font-serif text-2xl font-bold mb-4">Which adhesive for which charm</h2>
        <ArticleTable
          headers={['Embellishment', 'Recommended adhesive', 'Seal']}
          rows={[
            ['Tiny flat-back rhinestones', 'Uncured top coat or a thin clear gel layer', 'Can be fully covered with top coat'],
            ['Medium rhinestones and pearls', 'Thick charm gel or builder gel', 'Gel collar around the base, top of the stone left uncovered'],
            ['Large 3D charms and metal studs', 'Builder gel bead sized to the base', 'Full gel collar, built up on every side'],
            ['3D gel art (flowers, bows)', 'Built directly from 3D or sculpting gel', 'Top coat over the whole design'],
          ]}
        />
      </section>

      <section id="aftercare">
        <h2 className="font-serif text-2xl font-bold mb-4">Charm aftercare for clients</h2>
        <ArticleChecklist title="Tell clients before they leave" items={[
          'Take care with knitwear, hair and tights for the first few days: these snag raised charms most often.',
          'Do not twist or press on charms to test them.',
          'Wear gloves for cleaning so charms are not knocked against hard surfaces.',
          'If a charm feels loose, book a repair rather than pulling it off.',
        ]} />
        <p className="text-gray-700 leading-relaxed">It also helps to explain your charm policy before the appointment, for example whether a charm that comes off in the first few days is replaced free of charge.</p>
      </section>
    </div>
  ),
});
export {};
