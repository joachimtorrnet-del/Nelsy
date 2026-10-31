import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'why-do-acrylic-nails-lift',
  title: 'Why Do Acrylic Nails Lift? 12 Common Causes',
  seoTitle: 'Why Do Acrylic Nails Lift? 12 Common Causes Explained',
  excerpt: 'Lifting is one of the most common acrylic problems — but it\'s almost always preventable. Here are 12 causes of acrylic lifting and how to fix each one.',
  seoDescription: 'Why do acrylic nails lift? 12 common causes including prep mistakes, product errors, application issues, and aftercare problems — with practical fixes for each.',
  category: 'nail-education',
  tags: ['why do acrylic nails lift', 'acrylic nail lifting causes', 'acrylic lifting fix'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
  heroImageAlt: 'Why do acrylic nails lift',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'prep-causes', label: 'Prep-related causes' },
    { id: 'product-causes', label: 'Product-related causes' },
    { id: 'application-causes', label: 'Application-related causes' },
    { id: 'aftercare-causes', label: 'Aftercare causes' },
    { id: 'troubleshooting', label: 'Diagnosing where your lifting is coming from' },
  ],
  relatedSlugs: ['how-to-prevent-nail-lifting', 'how-to-improve-nail-retention', 'common-acrylic-mistakes', 'nail-prep-guide'],
  faq: [
    { q: 'Is lifting normal with acrylic nails?', a: 'Some minor edge movement can happen as the product and nail plate move differently, but significant lifting — especially within the first 1–2 weeks — is not normal and indicates a preventable issue, usually in prep or application.' },
    { q: 'Why do acrylic nails lift on just one or two fingers?', a: 'Isolated lifting on specific fingers often points to a preparation issue on those nails (missed oil, inadequate dehydration) rather than a technique problem. It can also relate to how those particular fingers are used — index and middle fingers experience the most mechanical stress.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="prep-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Prep-related causes (causes 1–4)</h2>
        <ArticleTable
          headers={['Cause', 'Why it causes lifting', 'Fix']}
          rows={[
            ['Residual oil on the nail plate', 'Acrylic requires a dry, oil-free surface — oil breaks the adhesion bond immediately', 'Thorough cleanse with nail cleanser or IPA after all prep steps; always work in the order: shape, push cuticles, remove shine, dehydrate'],
            ['Insufficient dehydration', 'Natural nail moisture prevents proper adhesion', 'Use a dedicated nail dehydrator; allow it to dry fully before applying primer'],
            ['Cuticle or pterygium left on the plate', 'Product sitting on live skin rather than nail plate will always lift as skin cells shed', 'Thorough cuticle prep — remove all pterygium from the nail plate; don\'t rush this step'],
            ['Over-buffing or under-buffing', 'Too much buffing thins the plate (weak bond); too little leaves shine (oils on surface)', 'Remove only the surface shine — one or two gentle passes with the appropriate grit file'],
          ]}
        />
      </section>

      <section id="product-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Product-related causes (causes 5–7)</h2>
        <ArticleTable
          headers={['Cause', 'Why it causes lifting', 'Fix']}
          rows={[
            ['Wrong or expired primer', 'Primer bonds acrylic to the nail plate — expired or incorrect primer dramatically reduces adhesion', 'Use primer matched to your acrylic system; check expiry dates; do not skip primer'],
            ['Contaminated monomer or powder', 'Moisture, oil, or dust in the product weakens the cure and the bond', 'Store products sealed, away from heat and direct light; never dip your brush in the bottle'],
            ['Incorrect liquid-to-powder ratio', 'Too wet: product stays soft longer, shrinks as it cures, and pulls away from the nail; too dry: product is brittle and cracks', 'Work with a medium-wet bead — follow your manufacturer\'s recommended ratio'],
          ]}
        />
      </section>

      <section id="application-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Application-related causes (causes 8–10)</h2>
        <ArticleTable
          headers={['Cause', 'Why it causes lifting', 'Fix']}
          rows={[
            ['Flooding the cuticle area', 'Product touching the skin always lifts as the skin and nail move independently', 'Apply product 0.5–1mm from the cuticle; flood-fix by pressing product back before it cures'],
            ['Thin product at the cuticle', 'The cuticle zone is where most lifting starts — product that tapers to nothing at the base lifts first', 'Ensure even coverage from cuticle zone through to the apex; product should thin slightly at the free edge, not at the base'],
            ['Air pockets during application', 'Bubbles between product and nail plate break the adhesion', 'Press product down firmly during placement; don\'t work too dry; ensure the bead is placed and pressed, not patted'],
          ]}
        />
      </section>

      <section id="aftercare-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Aftercare causes (causes 11–12)</h2>
        <ArticleTable
          headers={['Cause', 'Why it causes lifting', 'Fix']}
          rows={[
            ['Prolonged water exposure', 'Nails absorb water and expand; acrylic doesn\'t — repeated wet/dry cycles cause separation', 'Advise clients to wear gloves for washing up and cleaning; avoid soaking nails'],
            ['Using nails as tools', 'Mechanical stress at the cuticle zone levers the product away from the nail plate', 'Remind clients not to open tabs, packaging, or scratch things with their nails — use a tool instead'],
          ]}
        />
        <ArticleCallout variant="warning" title="Never work over lifting product">
          If a client presents with lifting, remove the lifted section before infilling or applying new product over it. Trapping moisture under a lifted section creates a perfect environment for bacterial or fungal issues.
        </ArticleCallout>
      </section>

      <section id="troubleshooting">
        <h2 className="font-serif text-2xl font-bold mb-4">Diagnosing where your lifting is coming from</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Lifting at the cuticle:</strong> Nearly always prep or application — either residual oil, pterygium on the plate, flooded cuticle, or thin product at the base</li>
          <li><strong>Lifting at the sidewalls:</strong> Usually application — product thinned out at the edges, or flooding the sidewall skin</li>
          <li><strong>Lifting at the free edge:</strong> Often product or ratio issue — too wet a mix, or shrinkage during cure</li>
          <li><strong>Lifting on only one hand:</strong> Often the dominant hand — more mechanical stress; check product thickness and structure</li>
          <li><strong>Lifting on every client:</strong> Product or prep issue — check primer, dehydrator, and your prep process systematically</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Full retention guide: <Link to="/learn/how-to-improve-nail-retention" className="underline text-[#F52B8C]">how to improve nail retention</Link>.</p>
      </section>
    </div>
  ),
});
export {};
