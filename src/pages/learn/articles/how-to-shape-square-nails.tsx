import { registerArticle } from '@/lib/articles';
import { ArticleSteps, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-shape-square-nails',
  title: 'How to Shape Square Nails Step by Step',
  seoTitle: 'How to Shape Square Nails Step by Step',
  excerpt: 'Square is one of the most popular nail shapes — clean, modern, and strong. Here\'s how to file a perfectly flat top edge with sharp, even corners every time.',
  seoDescription: 'How to shape square nails step by step. How to file perfectly flat edges, sharp corners, and symmetrical square nails on extensions and natural nails.',
  category: 'nail-education',
  tags: ['how to shape square nails', 'square nail shape', 'square nail filing technique'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'How to shape square nails step by step',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-square', label: 'What makes a true square shape' },
    { id: 'step-by-step', label: 'Step-by-step filing' },
    { id: 'corners', label: 'Getting sharp, even corners' },
    { id: 'symmetry', label: 'Checking symmetry' },
    { id: 'common-mistakes', label: 'Common mistakes' },
  ],
  relatedSlugs: ['nail-shapes-explained', 'how-to-shape-almond-nails', 'how-to-file-nail-extensions-into-shape', 'nail-file-grit-guide'],
  faq: [
    { q: 'What\'s the difference between square and squoval?', a: 'Square nails have sharp, defined right-angle corners. Squoval nails have the same straight top edge but with the corners slightly rounded — a hybrid of square and oval. Squoval is often described as more flattering and lower maintenance because the rounded corners are less prone to chipping.' },
    { q: 'How do I stop square corners from chipping?', a: 'Square corners are the weakest point of the shape. Advise clients to be careful with their fingertips on hard surfaces. Sealing the free edge with top coat (capping) and maintaining the shape regularly helps. Very sharp corners on hard gel or acrylic can be very slightly bevelled at the corners without losing the overall square aesthetic.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-square">
        <h2 className="font-serif text-2xl font-bold mb-4">What makes a true square shape</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A square nail has three defining features:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Straight sidewalls:</strong> The sides of the nail run parallel from cuticle to tip — no taper</li>
          <li><strong>A flat top edge:</strong> The top of the free edge is completely straight and perpendicular to the sidewalls</li>
          <li><strong>Sharp corners:</strong> Where the top edge meets the sidewalls creates right angles</li>
        </ul>
      </section>

      <section id="step-by-step">
        <h2 className="font-serif text-2xl font-bold mb-4">Step-by-step filing</h2>
        <ArticleSteps
          steps={[
            { title: 'File the top edge flat', body: 'Hold the file perpendicular to the nail — at 90 degrees to the nail length — and file the top edge in flat, even strokes. The file should be parallel to the top edge as you work across it. Keep the file flat; angling it at all will bevel the edge rather than keep it flat.' },
            { title: 'Check flatness frequently', body: 'Stop and look at the free edge straight on from the front of the nail. The edge should look like a straight horizontal line. Any curve or uneven spots will be visible from this angle.' },
            { title: 'File the sidewalls straight', body: 'Hold the file against each sidewall and file in a straight, parallel motion — maintaining the straight sidewall profile. Don\'t angle toward the tip; this would create a coffin shape rather than square.' },
            { title: 'Define the corners', body: 'Once the top and sides are straight, the corners should naturally be sharp. Run the file very lightly across each corner at 45 degrees, just once, to remove any rough or jagged edges without rounding the corner itself.' },
            { title: 'Check from above and straight on', body: 'From above: both sides should look perfectly parallel. From straight on at the free edge: the top edge should be flat and the corners sharp and level with each other.' },
          ]}
        />
        <ArticleTip>The most common mistake is angling the file slightly when filing the top edge — this creates a diagonal bevel rather than a flat edge. Keep your wrist locked and the file exactly perpendicular to the nail to maintain flatness.</ArticleTip>
      </section>

      <section id="corners">
        <h2 className="font-serif text-2xl font-bold mb-4">Getting sharp, even corners</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Both corners must be at the same height — if one corner is lower than the other, the nail looks diagonal rather than square</li>
          <li>Check corner height by looking straight at the free edge from the front; both corners should sit at exactly the same level</li>
          <li>If one corner is lower, file the flat top edge from that corner's side to bring it level with the other</li>
          <li>Never file deeply into a corner trying to sharpen it — if the corner is rough, a single light pass is enough</li>
        </ul>
      </section>

      <section id="symmetry">
        <h2 className="font-serif text-2xl font-bold mb-4">Checking symmetry</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Look at both hands flat, palms down, from above — square nails should look clean and identical across all fingers</li>
          <li>Width consistency matters for square: all nails should appear the same width from above (they follow the natural nail bed width)</li>
          <li>Length consistency: all nails should end at the same point from fingertip — use a visual reference across the fingers</li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Angled top edge:</strong> Holding the file at a slight diagonal creates a bevel instead of a flat top; keep the file strictly perpendicular</li>
          <li><strong>Tapered sidewalls:</strong> Filing the sides toward the tip narrows the shape into coffin or stiletto territory; keep sidewalls parallel</li>
          <li><strong>Uneven corner height:</strong> One corner lower than the other makes the nail look skewed; correct by filing the high side down to match</li>
          <li><strong>Over-rounding corners:</strong> Softening corners too much creates squoval, not square; one light pass on each corner only</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
