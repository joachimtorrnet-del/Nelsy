import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-rid-of-air-bubbles-gel-polish',
  title: 'How to Get Rid of Air Bubbles in Gel Polish',
  seoTitle: 'How to Get Rid of Air Bubbles in Gel Polish',
  excerpt: 'Air bubbles in gel polish ruin an otherwise great set. Here\'s why they happen and how to prevent and fix them before the colour cures.',
  seoDescription: 'How to prevent and fix air bubbles in gel polish: what causes them, a bubble-free application method, and how to fix bubbles before curing.',
  category: 'nail-education',
  audience: ['pros'],
  craft: 'nails',
  tags: ['air bubbles gel polish', 'gel polish air bubbles', 'gel nail application tips', 'gel polish mistakes'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'How to get rid of air bubbles in gel polish',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: "To get rid of air bubbles in gel polish, roll the bottle instead of shaking it, apply thin coats with as few brush strokes as possible, and pop any bubble with the brush tip before curing.",
    detail: "Bubbles come from air in the product, from overworking the brush, or from coats that are too thick. Once cured, a bubble is locked in and has to be removed and redone.",
    points: [
      { label: "Main cause", text: "Shaking the bottle or overworking wet gel." },
      { label: "Before curing", text: "Pop the bubble with the brush tip, let it settle, then cure." },
      { label: "After curing", text: "File off or remove that coat, then reapply." },
    ],
  },
  toc: [
    { id: 'why-bubbles', label: 'Why air bubbles form' },
    { id: 'application-causes', label: 'Application technique causes' },
    { id: 'product-causes', label: 'Product and storage causes' },
    { id: 'prevention', label: 'Preventing bubbles' },
    { id: 'bubble-free-method', label: 'A bubble-free application method' },
    { id: 'is-it-bubbles', label: 'Bubbles, pits or wrinkles?' },
    { id: 'fixing-bubbles', label: 'Fixing bubbles before curing' },
  ],
  relatedSlugs: ['common-gel-x-mistakes', 'common-builder-gel-mistakes', 'how-to-make-nail-sets-look-cleaner', 'nail-dehydrator-vs-primer'],
  faq: [
    { q: 'Can I fix gel polish bubbles after curing?', a: 'Once gel polish has cured, bubbles are locked in: you cannot fix them without removing and reapplying. This is why catching bubbles before curing matters. If you notice bubbles after curing, the only fix is to remove and redo that coat. For a client who notices bubbles after they leave, your repair policy should address whether you offer a complimentary redo within a certain timeframe.' },
    { q: 'Why do air bubbles appear in gel polish but not regular polish?', a: 'Gel polish is typically thicker than regular polish, which traps air more easily. Gel polish also cures (sets) very quickly under the lamp, so any trapped air has less time to escape before the product locks in. Regular polish dries slowly, giving bubbles more time to surface before setting.' },
    { q: 'Does shaking the gel bottle cause bubbles?', a: 'Yes. Shaking gel polish introduces air into the product, which then gets applied to the nail. Never shake gel polish: roll the bottle between your palms to mix it gently, which mixes pigment without introducing air. This is one of the most common and easily preventable causes of air bubbles.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-bubbles">
        <h2 className="font-serif text-2xl font-bold mb-4">Why air bubbles form</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Air bubbles in gel polish form when air gets trapped in the product layer before curing locks it in place. They can come from the product itself (air introduced into the formula), application technique (how the brush moves), or surface prep (air trapped between nail and product).</p>
        <p className="text-gray-700 leading-relaxed">Understanding which category the cause falls into helps you address the right thing: technique, product handling, or prep.</p>
      </section>

      <section id="application-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Application technique causes</h2>
        <ArticleTable
          headers={['Application mistake', 'Why it causes bubbles']}
          rows={[
            ['Dragging or scrubbing the brush', 'Friction motion introduces air into the product layer'],
            ['Going over wet product repeatedly', 'The brush pulls and disturbs product that\'s already placed, introducing air'],
            ['Applying too thick a coat', 'A thick coat traps air underneath; the surface cures before air can escape'],
            ['Applying too quickly / frantically', 'Fast application increases brush air introduction; slow, smooth strokes minimise it'],
            ['Pressing the brush too flat', 'A flat brush angle distributes bristles and can introduce air into the stroke'],
          ]}
        />
        <ArticleTip>Apply gel polish in smooth, single-direction strokes. If you need to make an adjustment to a placed stroke, do it immediately and minimally: don't keep working over the same area.</ArticleTip>
      </section>

      <section id="product-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Product and storage causes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Shaking the bottle:</strong> Shaking introduces air directly into the formula, always roll between palms to mix</li>
          <li><strong>Old or thickened product:</strong> Gel polish that has thickened with age or improper storage becomes more prone to trapping air</li>
          <li><strong>Incorrect storage (heat or UV exposure):</strong> Heat and UV light degrade gel polish; it becomes thicker, changes consistency, and bubbles more easily</li>
          <li><strong>Overly thin product:</strong> Very thin gel polish can also bubble. Consistency issues go both ways</li>
          <li><strong>Mixing brands or adding thinner incorrectly:</strong> Adding wrong thinners can change the chemistry and affect application</li>
        </ul>
        <ArticleCallout variant="info" title="Product storage">
          Store gel polish away from light (in opaque containers or a drawer), at room temperature, and away from heat. Keep lids tight. These basics extend product life and maintain consistent application quality.
        </ArticleCallout>
      </section>

      <section id="prevention">
        <h2 className="font-serif text-2xl font-bold mb-4">Preventing bubbles</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Roll, don't shake, the gel bottle before use</li>
          <li>Apply thin, smooth coats rather than thick ones</li>
          <li>Use smooth, single-direction brush strokes: don't scrub</li>
          <li>Don't overwork placed product</li>
          <li>Keep product in good condition (stored correctly, not past its useful life)</li>
          <li>Allow each coat to self-level briefly before curing (a few seconds of stillness)</li>
          <li>Ensure nail surface is clean, dry, and prepped correctly: debris or moisture on the nail surface contributes to air trapping</li>
        </ul>
      </section>

      <section id="bubble-free-method">
        <h2 className="font-serif text-2xl font-bold mb-4">A bubble-free application method</h2>
        <ArticleSteps steps={[
          { title: 'Roll the bottle', body: 'Roll it between your palms for 10 to 20 seconds to mix the pigment without adding air.' },
          { title: 'Wipe the brush on both sides', body: 'Leave a small bead of product on the tip only. A heavily loaded brush pushes air into the layer.' },
          { title: 'Place, then pull', body: 'Place the brush near the cuticle, let the product settle, then pull toward the free edge in one smooth stroke. Do the centre, then each side.' },
          { title: 'Stop after three strokes', body: 'If the coat looks even, leave it. Extra passes over wet gel are a common cause of bubbles.' },
          { title: 'Look, then cure', body: 'Check the nail at an angle under good light. If you see a bubble, pop it with the brush tip or a clean liner brush, let the gel settle for a few seconds, then cure.' },
        ]} />
      </section>

      <section id="is-it-bubbles">
        <h2 className="font-serif text-2xl font-bold mb-4">Bubbles, pits or wrinkles?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Not every texture problem is an air bubble. Identifying which one you have points to a different fix.</p>
        <ArticleTable
          headers={['What you see', 'What it usually is', 'Fix']}
          rows={[
            ['Small round dots or tiny craters in the colour', 'Air bubbles', 'Roll the bottle, thinner coats, fewer brush strokes'],
            ['Larger pits or a rough, uneven surface', 'Product too thick, or dust and debris on the nail', 'Remove all dust, apply thinner coats'],
            ['Wrinkled or rippled surface after curing', 'Coat too thick to cure fully', 'Apply thinner coats and follow the full cure time'],
            ['Dull, matte patches in the top coat', 'Under-cured top coat or residue', 'Check cure time and lamp, cleanse if your top coat needs it'],
          ]}
        />
      </section>

      <section id="fixing-bubbles">
        <h2 className="font-serif text-2xl font-bold mb-4">Fixing bubbles before curing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you spot bubbles after application but before curing, you have options:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>For a small number of bubbles:</strong> Lightly smooth over the bubble with the brush tip in a single smooth stroke. Don't press hard or scrub</li>
          <li><strong>For widespread bubbles:</strong> Wipe off the coat completely (with appropriate cleaner), allow the base to dry, and reapply more carefully</li>
          <li><strong>Check before curing:</strong> Develop the habit of checking each nail briefly in good light before putting hands under the lamp. It's much faster than removing a cured coat</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For general nail set quality: <Link to="/blog/how-to-make-nail-sets-look-cleaner" className="underline text-[#F52B8C]">how to make nail sets look cleaner</Link>.</p>
      </section>
    </div>
  ),
});
export {};
