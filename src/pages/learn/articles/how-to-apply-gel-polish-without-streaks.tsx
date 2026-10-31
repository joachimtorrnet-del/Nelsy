import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-apply-gel-polish-without-streaks',
  title: 'How to Apply Gel Polish Without Streaks',
  seoTitle: 'How to Apply Gel Polish Without Streaks',
  excerpt: 'Streaky gel polish is usually a product loading or technique problem — not a product quality issue. Here\'s exactly how to get smooth, even gel colour every time.',
  seoDescription: 'How to apply gel polish without streaks. Technique, brush loading, layer thickness, and application order that give you smooth, even gel polish colour every time.',
  category: 'nail-education',
  tags: ['how to apply gel polish without streaks', 'streaky gel polish fix', 'smooth gel polish application'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'How to apply gel polish without streaks',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-streaks-happen', label: 'Why gel polish streaks' },
    { id: 'brush-loading', label: 'Correct brush loading' },
    { id: 'application-technique', label: 'Application technique' },
    { id: 'layering', label: 'Layering for even colour' },
    { id: 'problem-colours', label: 'Problem colours and formulas' },
  ],
  relatedSlugs: ['why-does-gel-polish-peel-off', 'how-to-prevent-flooded-cuticles', 'how-to-make-nail-sets-look-cleaner', 'nail-prep-guide'],
  faq: [
    { q: 'How many coats of gel polish should I apply?', a: 'Two thin coats of colour between a base and top coat is standard. Highly pigmented gel polishes may cover in one coat; sheer or pastel shades may need three. Building coverage with thin layers gives a better result than attempting to cover in one thick coat.' },
    { q: 'Why does gel polish look streaky after curing but not before?', a: 'Curing can reveal streaks that weren\'t obvious in the uncured gel because the product hardens exactly as it sits. Brush marks, uneven thickness, and self-levelling that didn\'t happen get locked in. The fix is technique, not touching the cured layer — you need to adjust application on the next coat.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-streaks-happen">
        <h2 className="font-serif text-2xl font-bold mb-4">Why gel polish streaks</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Overloaded brush:</strong> Too much product drags on the nail rather than gliding, leaving thick and thin areas</li>
          <li><strong>Too little product:</strong> An under-loaded brush drags and skips, leaving gaps</li>
          <li><strong>Multiple strokes over the same area:</strong> Going back over an area you've already stroked disrupts the product that was starting to self-level</li>
          <li><strong>Uneven pressure:</strong> Pressing harder in the centre and lighter at the edges creates uneven coverage</li>
          <li><strong>Formulation:</strong> Some gel polishes — especially sheers, pastels, and highly pigmented colours — are inherently harder to apply streak-free; they require specific techniques</li>
        </ul>
      </section>

      <section id="brush-loading">
        <h2 className="font-serif text-2xl font-bold mb-4">Correct brush loading</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Remove the brush from the bottle and wipe one side gently on the inside of the bottle neck — you want just enough product to coat the nail, not a heavy load</li>
          <li>The brush should fan out slightly when pressed on the nail — not drip, not struggle to release product</li>
          <li>For broad nails: slightly more product and wider fan-out gives one-stroke coverage</li>
          <li>For narrow nails: wipe the brush more and work with a narrower fan</li>
        </ul>
        <ArticleTip>If you see the product pooling at the free edge after a stroke, the brush was too loaded. Wipe off more on the next attempt.</ArticleTip>
      </section>

      <section id="application-technique">
        <h2 className="font-serif text-2xl font-bold mb-4">Application technique</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Three-stroke method:</strong> One stroke down the centre, one down each side. This gives even coverage without multiple passes over the same area</li>
          <li><strong>Consistent pressure:</strong> Light, even pressure throughout the stroke — don't press harder in the middle to get coverage; use a second coat instead</li>
          <li><strong>One pass per stroke:</strong> Stroke once, lift, reload if needed. Going back over the same area disturbs product that's started to settle</li>
          <li><strong>Work quickly:</strong> Gel starts to thicken at room temperature over time; work efficiently to get consistent viscosity throughout</li>
        </ul>
      </section>

      <section id="layering">
        <h2 className="font-serif text-2xl font-bold mb-4">Layering for even colour</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>First coat: thin — concentrate on even coverage, not full opacity; streaks in the first coat are fine if the layer is thin and even</li>
          <li>Second coat: slightly more product, same technique — covers any first-coat streaks and builds pigment evenly</li>
          <li>Never apply a thick coat hoping to cover streaks in one go — you'll get worse streaks and potentially lifting from overapplication</li>
          <li>If colour is still patchy after two coats, apply a third thin coat rather than trying to fix it with top coat</li>
        </ul>
        <ArticleCallout variant="info" title="Let the first coat do less work">
          A first coat that's thin and even (even if it looks patchy) gives a better end result than a thick first coat trying to cover in one go. The second coat smooths everything out when the first layer is flat.
        </ArticleCallout>
      </section>

      <section id="problem-colours">
        <h2 className="font-serif text-2xl font-bold mb-4">Problem colours and formulas</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Reds and oranges:</strong> Often streak-prone due to pigment density — thin layers and a clean colour-builder coat before top coat helps</li>
          <li><strong>Whites and pale yellows:</strong> Very hard to apply streak-free; typically need 3 thin coats; use a white gel designed for opacity, not a sheer formula</li>
          <li><strong>Sheers and jellies:</strong> These are designed to be translucent — perceived as "streaky" when they're actually just sheer; manage client expectations and apply over a base that already provides opacity if needed</li>
          <li><strong>Thick, dense formulas:</strong> Some gel polishes are too thick for their intended application; they can be warmed slightly between palms before use to improve flow</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
