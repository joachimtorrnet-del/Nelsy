import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';

registerArticle({
  slug: 'abstract-nail-ideas',
  title: '50 Abstract Nail Ideas to Save',
  seoTitle: '50 Abstract Nail Ideas to Save',
  excerpt: 'Abstract nail art is one of the most creative and wearable styles — no two sets need to look the same. Here are 50 abstract nail ideas from minimal to maximalist.',
  seoDescription: '50 abstract nail ideas. Swirls, geometric, paint-stroke, and negative space abstract nails — inspiration for creative nail art that isn\'t tied to a specific motif.',
  category: 'nail-inspo',
  tags: ['abstract nail ideas', 'abstract nail art', 'abstract nail designs'],
  heroImage: 'linear-gradient(135deg, #FFF9FB 0%, #EDE9FE 100%)',
  heroImageAlt: '50 abstract nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'line-work', label: 'Abstract line work' },
    { id: 'swirls', label: 'Swirls and curves' },
    { id: 'geometric', label: 'Geometric abstract' },
    { id: 'paint-stroke', label: 'Paint stroke and blob art' },
    { id: 'negative-space', label: 'Negative space abstract' },
  ],
  relatedSlugs: ['minimalist-nail-ideas', 'how-to-create-clean-nail-art-lines', 'ombre-nail-ideas', 'nail-trends-2027'],
  faq: [
    { q: 'Is abstract nail art hard to do?', a: 'It depends on the style. Intentionally organic abstract art (blobs, paint strokes, loose swirls) is actually forgiving because there\'s no "correct" shape to hit. Precision abstract art (clean geometric lines, symmetrical patterns) requires the same technical skill as any detailed nail art. Start with loose, organic abstract styles and work toward geometric as your brush control improves.' },
    { q: 'What tools do you need for abstract nail art?', a: 'A good liner brush or striping brush is the most versatile tool for abstract nail art. A dotting tool is useful for dots, circles, and blob effects. A fan brush or sponge can create diffused colour effects. Most abstract styles can be achieved with just a liner brush, a base colour, and a contrasting nail art gel.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="line-work">
        <h2 className="font-serif text-2xl font-bold mb-4">Abstract line work</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Single asymmetric line across a nude base — minimal and modern</li>
          <li>Multiple parallel lines in a single colour</li>
          <li>Intersecting lines creating loose geometric shapes</li>
          <li>Diagonal lines at varying thicknesses</li>
          <li>Fine gold lines on a neutral base</li>
          <li>Black lines on a white base — graphic, editorial</li>
          <li>Coloured lines on a coloured base — tone-on-tone with contrast</li>
          <li>Wave lines — gentle, organic curves in a single stroke</li>
          <li>Lines that stop and start — broken line design</li>
          <li>Scallop line work — repeated arc strokes building a pattern</li>
        </ul>
      </section>

      <section id="swirls">
        <h2 className="font-serif text-2xl font-bold mb-4">Swirls and curves</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Single swirl over a neutral base — elegant and simple</li>
          <li>Two-colour swirl intertwining on a white base</li>
          <li>Retro swirl pattern — 70s-inspired loose curves</li>
          <li>Tight spiral detail — concentrated decorative swirl</li>
          <li>Organic blob and curve combination</li>
          <li>Wavy ribbons of colour across the nail</li>
          <li>Paisley-inspired swirl shapes</li>
          <li>Swirl ombré — gradient colour blended in a swirl pattern</li>
          <li>Cream and nude tonal swirls — quiet and understated</li>
          <li>Bold contrasting swirls — black on white, or colour on black</li>
        </ul>
      </section>

      <section id="geometric">
        <h2 className="font-serif text-2xl font-bold mb-4">Geometric abstract</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Colour block divided by a diagonal line</li>
          <li>Triangle shapes in two colours</li>
          <li>Hexagon or polygon pattern</li>
          <li>Irregular patches of colour — painted-glass effect</li>
          <li>Checkerboard pattern (classic or modern colourway)</li>
          <li>Asymmetric half-moon shape</li>
          <li>Thick and thin band combination across the nail</li>
          <li>Grid pattern — squares or rectangles in two colours</li>
          <li>Diamond shapes on a contrasting base</li>
          <li>Scattered dot pattern in varying sizes</li>
        </ul>
      </section>

      <section id="paint-stroke">
        <h2 className="font-serif text-2xl font-bold mb-4">Paint stroke and blob art</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Broad paint-stroke marks over a light base — fine art feel</li>
          <li>Single brushstroke in contrasting colour</li>
          <li>Abstract floral blobs — loose, suggestive flower shapes</li>
          <li>Splatter effect — controlled dots in random placement</li>
          <li>Impasto-style thick gel strokes for texture</li>
          <li>Drip effect — colour running from cuticle toward tip</li>
          <li>Paint chip effect — broken colour patches</li>
          <li>Ink blot pattern — symmetrical mirrored shapes</li>
          <li>Blob animal print — loose, impressionistic animal markings</li>
          <li>Cloud-like forms on a gradient sky base</li>
        </ul>
      </section>

      <section id="negative-space">
        <h2 className="font-serif text-2xl font-bold mb-4">Negative space abstract</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Bare nail visible through a cut-out shape in the gel</li>
          <li>Window nail — rectangular opening in a solid colour</li>
          <li>Half-covered nail — colour on one half, bare on the other</li>
          <li>Colour outline only — shape drawn in outline, not filled</li>
          <li>Line art creating shapes without filling them</li>
          <li>Abstract symbol — a single drawn shape in negative space</li>
          <li>Geometric negative space — triangle or diamond cutout</li>
          <li>Frame nail — border of colour, bare centre</li>
          <li>Moon and tip in negative space</li>
          <li>Scattered negative space spots — gaps in colour creating a pattern</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">More inspo: <Link to="/learn/minimalist-nail-ideas" className="underline text-[#F52B8C]">minimalist nail ideas</Link> · <Link to="/learn/how-to-create-clean-nail-art-lines" className="underline text-[#F52B8C]">how to create clean nail art lines</Link>.</p>
      </section>
    </div>
  ),
});
export {};
