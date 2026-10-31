import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-create-clean-nail-art-lines',
  title: 'How to Create Clean Nail Art Lines',
  seoTitle: 'How to Create Clean Nail Art Lines',
  excerpt: 'Clean lines are the mark of professional nail art. Here\'s exactly how to control a liner brush, manage your product load, and fix mistakes before they cure.',
  seoDescription: 'How to create clean nail art lines. Liner brush technique, product loading, stabilising your hand, and correcting mistakes for sharp, precise nail art lines.',
  category: 'nail-education',
  tags: ['how to create clean nail art lines', 'nail art lines technique', 'nail liner brush technique'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  heroImageAlt: 'How to create clean nail art lines',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'tools', label: 'The right tools' },
    { id: 'product-loading', label: 'Product loading' },
    { id: 'hand-position', label: 'Hand position and stability' },
    { id: 'stroke-technique', label: 'Stroke technique' },
    { id: 'correcting', label: 'Correcting mistakes' },
  ],
  relatedSlugs: ['how-to-do-french-tips-evenly', 'how-to-apply-gel-polish-without-streaks', 'how-to-improve-nail-art-skills'],
  faq: [
    { q: 'Should I use gel or acrylic paint for nail art lines?', a: 'Both work. Gel paint in a liner bottle gives the most control and cures without any drying wait time. Acrylic nail art paint (like those from Moyra or similar brands) is very fluid and excellent for fine lines but requires a steady hand because it starts drying quickly. Avoid using regular gel polish for fine lines — it\'s too fluid and doesn\'t hold a fine edge.' },
    { q: 'How do I keep liner brush bristles from splaying?', a: 'After every use, clean the brush in brush cleaner or monomer and reshape the bristles to a point before putting it down. Never leave gel product on a brush to cure — this permanently damages the bristles. A well-maintained liner brush should stay pointy for months with regular cleaning.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="tools">
        <h2 className="font-serif text-2xl font-bold mb-4">The right tools</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Liner / striper brush:</strong> The essential tool for nail art lines — long, thin bristles that can carry product in a single stroke</li>
          <li><strong>Detail brush:</strong> Short, fine-pointed brush for small details and corrections</li>
          <li><strong>Nail art gel paint or gel liner:</strong> Pigmented gel specifically formulated for nail art — better viscosity for lines than regular gel polish</li>
          <li><strong>Nail art palette or tile:</strong> A white ceramic tile or palette for working and loading product — gives you a surface to adjust product amount before touching the nail</li>
        </ul>
      </section>

      <section id="product-loading">
        <h2 className="font-serif text-2xl font-bold mb-4">Product loading</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Load the brush on your palette first — don't go directly from the product jar to the nail</li>
          <li>The correct load: the brush should hold enough product to complete the stroke in one go, without running out halfway</li>
          <li>Too much product: the stroke bleeds and widens; the line feathers at the edges</li>
          <li>Too little product: the stroke breaks, creates gaps, or goes scratchy</li>
          <li>Test the line on the palette first: if it looks clean there, it will look clean on the nail</li>
        </ul>
        <ArticleTip>For very thin lines, wipe the brush to almost dry and work with tiny product amounts. For thicker decorative lines, a more loaded brush is appropriate — match your product load to the line thickness you're creating.</ArticleTip>
      </section>

      <section id="hand-position">
        <h2 className="font-serif text-2xl font-bold mb-4">Hand position and stability</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Always brace your hand:</strong> Rest your pinky or ring finger against the client's hand or a stable surface — working unsupported creates wobble even for experienced techs</li>
          <li><strong>Control the stroke with your whole arm, not just your wrist:</strong> Wrist-only movements are less stable; move your entire arm from the shoulder for long straight lines</li>
          <li><strong>Position the client's hand comfortably:</strong> If you're straining to reach the nail at an awkward angle, the line will show it — reposition before starting</li>
          <li><strong>Slow down at the start and end of each stroke:</strong> Lines tend to wobble when the brush first touches the nail and when it lifts off; consciously slow at these transition points</li>
        </ul>
        <ArticleCallout variant="info" title="Practice on a tile first">
          Every line technique should be tested on a flat tile or practice hand at a new product load before touching a client's nail — especially when you're learning a new product viscosity.
        </ArticleCallout>
      </section>

      <section id="stroke-technique">
        <h2 className="font-serif text-2xl font-bold mb-4">Stroke technique</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Commit to each stroke:</strong> A hesitant, stop-start stroke creates waviness; a confident single motion creates a clean line</li>
          <li><strong>For long lines:</strong> Keep consistent speed and pressure from start to finish; slowing down mid-stroke creates a thicker section</li>
          <li><strong>For curves:</strong> Rotate the hand (client's or yours) rather than trying to bend your wrist — this creates a consistent radius</li>
          <li><strong>Work with — not against — the natural motion of your hand:</strong> If you naturally draw toward your body more comfortably, position the nail so the direction of the line is toward you</li>
        </ul>
      </section>

      <section id="correcting">
        <h2 className="font-serif text-2xl font-bold mb-4">Correcting mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Before curing:</strong> Use a fine detail brush dipped in cleanser or acetone to carefully remove or reshape the mistake — work quickly and deliberately</li>
          <li><strong>Scraping gel:</strong> A sharpened orange stick tip can remove a very small amount of uncured gel — useful for cleaning up a jagged edge</li>
          <li><strong>After curing:</strong> Apply a thin layer of base colour over the error, re-cure, and redo the line — or use a fine brush with the background colour to paint over the mistake</li>
          <li><strong>Know when to start over:</strong> If the nail has multiple corrections layered over corrections, the finish will look thick and uneven — sometimes the cleanest result means removing and restarting</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
