import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-prevent-flooded-cuticles',
  title: 'How to Prevent Flooded Cuticles',
  seoTitle: "Flooded Cuticles: Causes, How to Prevent and Fix Them",
  excerpt: 'Flooded cuticles are one of the most common technique issues for nail techs, and one of the most fixable. Here\'s why it happens and exactly how to stop it.',
  seoDescription: "What causes flooded cuticles with gel polish, builder gel and extensions, how to avoid flooding the cuticle, and how to fix it before curing.",
  category: 'nail-education',
  audience: ['pros'],
  craft: 'nails',
  tags: ['how to prevent flooded cuticles', 'flooded cuticles fix', 'nail product flooding cuticle'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'How to prevent flooded cuticles',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: "To prevent flooded cuticles, use less product on the brush, start about 1 mm away from the cuticle and sidewalls, and check every nail before it goes under the lamp.",
    detail: "Flooding happens when product touches the skin around the nail. Once it is cured on skin it will lift, so fixing it before curing is the only reliable fix.",
    points: [
      { label: "Main cause", text: "An overloaded brush in the cuticle area." },
      { label: "Quick fix", text: "Remove product from the skin with a clean brush or orange wood stick before curing." },
      { label: "Highest risk", text: "Gel polish and top coat, because they are the most fluid." },
    ],
  },
  toc: [
    { id: 'why-it-happens', label: 'Why cuticles get flooded' },
    { id: 'brush-loading', label: 'Brush loading technique' },
    { id: 'application-technique', label: 'Application technique' },
    { id: 'fixing-before-cure', label: 'Fixing flooding before it cures' },
    { id: 'product-types', label: 'Product-specific notes' },
    { id: 'checklist', label: 'Flood-free checklist' },
  ],
  relatedSlugs: ['why-does-gel-polish-peel-off', 'why-do-acrylic-nails-lift', 'how-to-apply-gel-polish-without-streaks', 'nail-prep-guide'],
  faq: [
    { q: "How close to the cuticle should I apply nail product?", a: "A common guideline is roughly 0.5 to 1 mm away from the cuticle and sidewall skin. The gap is small enough to look neat and far enough to avoid flooding. Most products will settle slightly toward the skin after placement, which is why starting a little away from it works." },
    { q: "Will flooded cuticles always cause lifting?", a: "In most cases, yes. Product does not bond to skin, and skin keeps growing and shedding, so a flooded edge usually lifts within days and can let water and debris in underneath. That is why it is worth fixing flooding before curing rather than hoping it holds." },
    { q: "Can I fix a flooded cuticle after curing?", a: "Only by carefully filing the cured product back off the skin and the edge, which risks damaging the skin and leaves a weak edge. If the flood is large, it is usually better to remove that nail and redo it." },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-it-happens">
        <h2 className="font-serif text-2xl font-bold mb-4">Why cuticles get flooded</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Flooding happens when nail product makes contact with the skin at the cuticle or sidewalls. The main causes:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Too much product on the brush:</strong> An overloaded brush releases product that flows toward the cuticle on its own</li>
          <li><strong>Starting application too close to the cuticle:</strong> Beginning the stroke too near the skin means even a small amount of product reaches it</li>
          <li><strong>Product too thin in consistency:</strong> Very fluid products flood more easily than thicker ones; some formulations require more precision</li>
          <li><strong>Positioning:</strong> Gravity pulls product toward whichever direction the finger is tilted. Working with the nail flat or slightly tilted away helps</li>
        </ul>
      </section>

      <section id="brush-loading">
        <h2 className="font-serif text-2xl font-bold mb-4">Brush loading technique</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Remove the brush from the bottle and wipe one side on the neck of the bottle: you want a controlled amount of product, not a fully loaded brush</li>
          <li>For gel polish: use the wiped side facing down; this puts less product on the initial stroke</li>
          <li>For builder gel: pick up a bead that you can place precisely rather than spreading from an overloaded brush</li>
          <li>Test your load on the back of your hand before touching the nail if you're learning a new product</li>
        </ul>
        <ArticleTip>A brush that drips product means far too much is loaded. You want a brush that holds product without dripping: wipe more aggressively if you're seeing product flow on its own.</ArticleTip>
      </section>

      <section id="application-technique">
        <h2 className="font-serif text-2xl font-bold mb-4">Application technique</h2>
        <ArticleSteps steps={[
          { title: 'Wipe the brush on one side', body: 'Take a small amount of product. A brush that holds a bead at the tip is overloaded for the cuticle area.' },
          { title: 'Place the brush about 1 mm from the cuticle', body: 'Touch down in the centre of the nail just below the cuticle line, pause, and let the product settle toward the skin on its own.' },
          { title: 'Pull toward the free edge', body: 'Stroke down the centre, then do each sidewall, keeping the same small gap along the sides.' },
          { title: 'Check the margins under good light', body: 'Look at the nail from the side and from above before curing. This takes seconds and saves a redo.' },
          { title: 'Flash cure if the product moves', body: 'If a product keeps creeping, a short flash cure after each nail stops it from travelling while you work on the next one.' },
        ]} />
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Place, don't drag:</strong> Place the brush approximately 1mm from the cuticle and press gently, then stroke toward the free edge. Don't start at the cuticle and drag: the initial contact zone is where flooding is most likely</li>
          <li><strong>Use a stop-and-place motion at the cuticle area:</strong> Place the brush near the cuticle, pause, and let the product settle before stroking. This gives you a fraction of a second to check your placement before committing</li>
          <li><strong>Fill in the cuticle zone last:</strong> Apply the bulk of the nail first, then carefully go back to fill in close to the cuticle with a lighter touch and less product</li>
          <li><strong>Work with the finger tilted slightly away from you:</strong> Gravity will pull the product toward the free edge rather than toward the cuticle</li>
        </ul>
      </section>

      <section id="fixing-before-cure">
        <h2 className="font-serif text-2xl font-bold mb-4">Fixing flooding before it cures</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you notice flooding before you cure, you can fix it:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Clean brush or orange stick:</strong> Use a clean, dry brush tip or an orange stick to gently push the flooded product back onto the nail plate. Do this immediately before the product moves further</li>
          <li><strong>Cleanser on a brush:</strong> A brush dipped in nail cleanser can remove excess product from the skin before curing. Dab gently, don't smear</li>
          <li><strong>Work quickly:</strong> Some products flow more at room temperature; working quickly reduces the time product has to migrate toward the cuticle</li>
        </ul>
        <ArticleCallout variant="warning" title="Cure and remove is not a fix">
          Curing and then trying to file product off the skin is not a reliable fix: filing near the cuticle risks damaging the skin and still leaves a flooded edge underneath. Fix flooding before curing whenever possible.
        </ArticleCallout>
      </section>

      <section id="product-types">
        <h2 className="font-serif text-2xl font-bold mb-4">Product-specific notes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Gel polish:</strong> Most fluid; highest flooding risk. Wipe the brush thoroughly and work with light strokes</li>
          <li><strong>Builder gel / BIAB:</strong> Thicker and self-levelling. Less likely to flood on its own, but overapplication can still cause flooding in the cuticle zone</li>
          <li><strong>Acrylic:</strong> Flooding risk is highest with a wet bead; keep your ratio appropriately dry and place the bead away from the cuticle, then press toward it</li>
          <li><strong>Top coat:</strong> Top coat is often where techs flood after being careful through the other layers. Keep top coat application as disciplined as base coat</li>
        </ul>
        <ArticleTable
          headers={['Product', 'Flood risk', 'Main habit to fix']}
          rows={[
            ['Gel polish base and colour', 'High', 'Wipe the brush more and keep coats thin'],
            ['Top coat', 'High', 'Use the same gap as the base coat'],
            ['Builder gel / BIAB', 'Medium', 'Place the bead in the centre and let it float toward the cuticle'],
            ['Acrylic', 'Medium', 'Use a slightly drier bead in the cuticle zone'],
            ['Gel-X adhesive gel', 'Medium', 'Use less adhesive so it does not squeeze out when the tip is pressed on'],
          ]}
        />
      </section>

      <section id="checklist">
        <h2 className="font-serif text-2xl font-bold mb-4">Flood-free checklist</h2>
        <ArticleChecklist title="Before every cure" items={[
          'There is a visible thin gap between product and skin all around the nail.',
          'No product is sitting in the sidewall grooves.',
          'The free edge is capped.',
          'The finger is held level, not tilted toward the cuticle.',
          'Any product on the skin has been removed with a clean brush or orange wood stick.',
        ]} />
        <p className="text-gray-700 leading-relaxed">If flooding is a recurring problem, slow down only on the cuticle area. Most techs do not need to work slower overall, just more carefully in the first 2 mm of the nail.</p>
      </section>
    </div>
  ),
});
export {};
