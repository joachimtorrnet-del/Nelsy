import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-prevent-flooded-cuticles',
  title: 'How to Prevent Flooded Cuticles',
  seoTitle: 'How to Prevent Flooded Cuticles When Applying Nail Products',
  excerpt: 'Flooded cuticles are one of the most common technique issues for nail techs — and one of the most fixable. Here\'s why it happens and exactly how to stop it.',
  seoDescription: 'How to prevent flooded cuticles when applying gel polish, builder gel, and nail extensions. Technique fixes, product loading advice, and how to correct flooding before it cures.',
  category: 'nail-education',
  tags: ['how to prevent flooded cuticles', 'flooded cuticles fix', 'nail product flooding cuticle'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'How to prevent flooded cuticles',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-it-happens', label: 'Why cuticles get flooded' },
    { id: 'brush-loading', label: 'Brush loading technique' },
    { id: 'application-technique', label: 'Application technique' },
    { id: 'fixing-before-cure', label: 'Fixing flooding before it cures' },
    { id: 'product-types', label: 'Product-specific notes' },
  ],
  relatedSlugs: ['why-does-gel-polish-peel-off', 'why-do-acrylic-nails-lift', 'how-to-apply-gel-polish-without-streaks', 'nail-prep-guide'],
  faq: [
    { q: 'How close to the cuticle should I apply nail product?', a: 'The standard guidance is approximately 0.5–1mm from the cuticle and sidewall skin. This gap is small enough to look neat and professional but far enough to avoid flooding. With experience, you\'ll naturally stay within this zone.' },
    { q: 'Will flooded cuticles always cause lifting?', a: 'Yes — product on skin always eventually lifts because skin cells shed constantly. Even if flooding isn\'t immediately visible as a problem, the lifted edge will become apparent within days and can spread.' },
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
          <li><strong>Positioning:</strong> Gravity pulls product toward whichever direction the finger is tilted — working with the nail flat or slightly tilted away helps</li>
        </ul>
      </section>

      <section id="brush-loading">
        <h2 className="font-serif text-2xl font-bold mb-4">Brush loading technique</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Remove the brush from the bottle and wipe one side on the neck of the bottle — you want a controlled amount of product, not a fully loaded brush</li>
          <li>For gel polish: use the wiped side facing down; this puts less product on the initial stroke</li>
          <li>For builder gel: pick up a bead that you can place precisely rather than spreading from an overloaded brush</li>
          <li>Test your load on the back of your hand before touching the nail if you're learning a new product</li>
        </ul>
        <ArticleTip>A brush that drips product means far too much is loaded. You want a brush that holds product without dripping — wipe more aggressively if you're seeing product flow on its own.</ArticleTip>
      </section>

      <section id="application-technique">
        <h2 className="font-serif text-2xl font-bold mb-4">Application technique</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Place, don't drag:</strong> Place the brush approximately 1mm from the cuticle and press gently, then stroke toward the free edge. Don't start at the cuticle and drag — the initial contact zone is where flooding is most likely</li>
          <li><strong>Use a stop-and-place motion at the cuticle area:</strong> Place the brush near the cuticle, pause, and let the product settle before stroking. This gives you a fraction of a second to check your placement before committing</li>
          <li><strong>Fill in the cuticle zone last:</strong> Apply the bulk of the nail first, then carefully go back to fill in close to the cuticle with a lighter touch and less product</li>
          <li><strong>Work with the finger tilted slightly away from you:</strong> Gravity will pull the product toward the free edge rather than toward the cuticle</li>
        </ul>
      </section>

      <section id="fixing-before-cure">
        <h2 className="font-serif text-2xl font-bold mb-4">Fixing flooding before it cures</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you notice flooding before you cure, you can fix it:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Clean brush or orange stick:</strong> Use a clean, dry brush tip or an orange stick to gently push the flooded product back onto the nail plate — do this immediately before the product moves further</li>
          <li><strong>Cleanser on a brush:</strong> A brush dipped in nail cleanser can remove excess product from the skin before curing — dab gently, don't smear</li>
          <li><strong>Work quickly:</strong> Some products flow more at room temperature; working quickly reduces the time product has to migrate toward the cuticle</li>
        </ul>
        <ArticleCallout variant="warning" title="Cure and remove is not a fix">
          Curing and then trying to file product off the skin is not a reliable fix — filing near the cuticle risks damaging the skin and still leaves a flooded edge underneath. Fix flooding before curing whenever possible.
        </ArticleCallout>
      </section>

      <section id="product-types">
        <h2 className="font-serif text-2xl font-bold mb-4">Product-specific notes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Gel polish:</strong> Most fluid; highest flooding risk. Wipe the brush thoroughly and work with light strokes</li>
          <li><strong>Builder gel / BIAB:</strong> Thicker and self-levelling — less likely to flood on its own, but overapplication can still cause flooding in the cuticle zone</li>
          <li><strong>Acrylic:</strong> Flooding risk is highest with a wet bead; keep your ratio appropriately dry and place the bead away from the cuticle, then press toward it</li>
          <li><strong>Top coat:</strong> Top coat is often where techs flood after being careful through the other layers — keep top coat application as disciplined as base coat</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
