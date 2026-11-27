import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleImage, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'coffin-nail-ideas',
  title: '50 Coffin Nail Ideas to Save for Your Next Set',
  seoTitle: '50 Coffin Nail Ideas: Short, Long, Ombré & Chrome Designs',
  excerpt: 'Coffin nails (long, tapered sides with a squared-off tip) are one of the most popular nail shapes. Here are 50 coffin nail ideas across every style.',
  seoDescription: '50 coffin nail ideas to save for your next set: short and long coffin nails, ombré, chrome, French tips and minimalist designs for gel or acrylic.',
  category: 'nail-inspo',
  tags: ['coffin nail ideas', 'coffin nail designs', 'coffin nail art', 'ballerina nail ideas'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: '50 coffin nail ideas to save for your next set',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: "The best coffin nail ideas right now are milky white, nude French, chrome tips and soft ombre on a medium to long tapered shape.",
    detail: "Coffin nails need some length to show the taper, so most designs below are built on gel extensions, Gel-X or acrylic. Pick the design by length first, then by finish.",
    points: [
      { label: "Best for short coffin", text: "Nude pink gel, milky white jelly or a thin micro French." },
      { label: "Best for long coffin", text: "Pink-to-white ombre, mirror chrome or detailed nail art on the flat tip." },
      { label: "Best for a first set", text: "Nude coffin with a glossy finish: clean, easy to wear and easy to change next time." },
    ],
  },
  toc: [
    { id: 'classic', label: 'Classic coffin styles' },
    { id: 'ombre', label: 'Ombre and gradient coffin nails' },
    { id: 'chrome-metallic', label: 'Chrome and metallic styles' },
    { id: 'nail-art', label: 'Nail art on coffin nails' },
    { id: 'seasonal-bold', label: 'Seasonal and bold ideas' },
    { id: 'length-guide', label: 'Coffin length and product guide' },
    { id: 'mistakes', label: 'Common coffin nail mistakes' },
    { id: 'why-coffin', label: 'Why the coffin shape is so popular' },
  ],
  relatedSlugs: ['square-nail-ideas', 'french-tip-nail-ideas', 'summer-nail-ideas', 'trendy-nail-designs'],
  faq: [
    { q: 'What\'s the difference between coffin and ballerina nails?', a: 'They are the same shape: tapered sides with a flat, squared-off tip. "Coffin" is the more common name, while "ballerina" refers to the resemblance to a ballet pointe shoe. Some techs use "ballerina" for a slightly softer, more rounded corner, but there is no strict industry distinction.' },
    { q: 'How long do coffin nails need to be?', a: 'Coffin nails look best from medium length upwards, because the taper needs space to show. On very short nails the shape tends to read as square. If a client wants short nails, a short coffin is possible with a gentle taper, but set expectations at consultation by showing photos at different lengths.' },
    { q: 'Are coffin nails more likely to break than other shapes?', a: 'They can be more fragile than square or oval because the taper removes material at the sides. A well-placed apex, a tip that is not filed too narrow, and a sensible length for the client\'s lifestyle all reduce breakage. Compared with stiletto, the flat tip is less vulnerable than a sharp point.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic coffin styles (10)</h2>
        <ArticleImage src="photo-1754799670410-b282791342c3" alt="Long coffin-shaped nails in white and soft pink" />
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>All-white coffin: long, bright white, iconic</li>
          <li>Nude coffin with a glossy finish: clean and elegant</li>
          <li>Nude pink: BIAB or gel, soft and wearable</li>
          <li>Soft lilac coffin with a sheer finish</li>
          <li>Black coffin: bold, simple, always in style</li>
          <li>Classic red coffin: maximalist in size, classic in colour</li>
          <li>Milky white translucent: jelly finish, modern minimal</li>
          <li>Neutral taupe: business-appropriate, still stylish</li>
          <li>French coffin: white tip on nude; the length makes it look luxe</li>
          <li>Soft baby blue coffin: pastel, wearable, fresh</li>
        </ol>
      </section>

      <section id="ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Ombre and gradient coffin nails (10)</h2>
        <ArticleImage src="photo-1772322586702-73125782bd99" alt="Long nails with a blue to white ombré gradient" />
        <ol start={11} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Pink-to-white ombre: classic, Kylie Jenner-era iconic</li>
          <li>Nude-to-nude ombre: subtle gradient within the same colour family</li>
          <li>Purple-to-blue ombre: cool-toned gradient</li>
          <li>Black-to-dark grey ombre: moody and dramatic</li>
          <li>Peach-to-coral gradient: warm summer ombre</li>
          <li>Champagne-to-rose gold: warm metallic gradient</li>
          <li>Sage green-to-mint ombre</li>
          <li>White-to-silver ombre with glitter at the tip</li>
          <li>Sunset ombre: orange, coral, pink across the set</li>
          <li>Nude-to-glitter ombre: subtle at the cuticle, sparkle at the tip</li>
        </ol>
      </section>

      <section id="chrome-metallic">
        <h2 className="font-serif text-2xl font-bold mb-4">Chrome and metallic styles (10)</h2>
        <ArticleImage src="photo-1770210257340-dc2b0f44642a" alt="Hand with metallic gold manicure" />
        <ol start={21} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Full silver mirror chrome coffin: reflective, dramatic</li>
          <li>Rose gold chrome on nude base</li>
          <li>Gold chrome coffin: warm, luxury feel</li>
          <li>Holographic chrome: rainbow shift, eye-catching</li>
          <li>Cat eye magnetic gel: coffin shape shows the effect beautifully across the flat tip</li>
          <li>Chrome ombre: chrome powder on tips fading to nude at the base</li>
          <li>Black with gold foil flakes: dark base, warm gold detail</li>
          <li>Purple velvet cat eye: colour-shifting magnetic gel in deep purple</li>
          <li>Duochrome: shifts between two colours in the light</li>
          <li>Nude base with scattered chrome flakes (not full chrome: more subtle)</li>
        </ol>
      </section>

      <section id="nail-art">
        <h2 className="font-serif text-2xl font-bold mb-4">Nail art on coffin nails (10)</h2>
        <ArticleImage src="photo-1777287216954-2b4b22bb6bf2" alt="Long nails with metallic accents and hand-painted nail art" />
        <ol start={31} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Marble on nude coffin: white and grey veining on a beige base</li>
          <li>3D gel flowers on the ring finger</li>
          <li>Abstract expressionist painting style: loose colour strokes</li>
          <li>Swirl art: fluid organic curves in contrasting colour</li>
          <li>Glazed donut finish: sheer pink with chrome on top</li>
          <li>Leopard print accent nails on a nude base</li>
          <li>Botanical press: dried flowers under gel on clear base</li>
          <li>Disney or character nail art: themed sets for personality</li>
          <li>Written text / name on a single nail: personalised detail</li>
          <li>Geometric colour blocking: clean shapes on a contrasting base</li>
        </ol>
        <ArticleCallout variant="info" title="For nail techs">
          Coffin nails' tapered shape and flat tip makes them particularly suited to nail art that extends to the edge: the flat squared tip creates a mini canvas. French tips, detailed art at the tip, and 3D elements all sit naturally on coffin nails.
        </ArticleCallout>
      </section>

      <section id="seasonal-bold">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal and bold ideas (10)</h2>
        <ArticleImage src="photo-1519014816548-bf5fe059798b" alt="Pink manicure with red heart and love-letter nail art" />
        <ol start={41} className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Spring:</strong> Pastel rainbow coffin set. One colour per nail</li>
          <li><strong>Spring:</strong> White coffin with floral art. Cherry blossom or daisy</li>
          <li><strong>Summer:</strong> Hot orange or electric coral coffin</li>
          <li><strong>Summer:</strong> Tropical print art on neon base</li>
          <li><strong>Autumn:</strong> Deep plum with gold foil. Rich autumn palette</li>
          <li><strong>Autumn:</strong> Warm burnt orange ombre from tip</li>
          <li><strong>Winter:</strong> Dark forest green with pine art detail</li>
          <li><strong>Winter:</strong> White with silver glitter ombre. Snowy feel</li>
          <li><strong>Year-round bold:</strong> Red with black zebra print accent nail</li>
          <li><strong>Year-round bold:</strong> Electric blue coffin. Unexpected and striking</li>
        </ol>
      </section>

      <section id="length-guide">
        <h2 className="font-serif text-2xl font-bold mb-4">Coffin length and product guide</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The same design reads very differently at different lengths. Use this as a quick way to match an idea from the list above to the length and product a client can actually wear.</p>
        <ArticleTable
          headers={['Length', 'Designs that work best', 'Usual product']}
          rows={[
            ['Short (just past the fingertip)', 'Solid nudes, milky white, micro French, single accent nail', 'Builder gel overlay or short Gel-X tips'],
            ['Medium', 'Classic French, soft ombre, chrome tips, cat eye', 'Gel-X, hard gel or acrylic'],
            ['Long', 'Full ombre, mirror chrome, 3D art, detailed hand-painted designs', 'Acrylic, hard gel or long Gel-X tips'],
          ]}
        />
        <p className="text-gray-700 leading-relaxed">If a client is new to extensions, start one step shorter than their inspo photo. It is easier to go longer at the next appointment than to deal with breaks in the first week.</p>
      </section>

      <section id="mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common coffin nail mistakes</h2>
        <ArticleChecklist title="Check these before you finish the set" items={[
          'Taper starts too high: the sides should narrow gradually from the stress area, not right at the cuticle.',
          'Tip too narrow: a very thin flat tip snaps easily and starts to look like a stiletto with the point cut off.',
          'Uneven tip width across the hand: compare all ten nails from above before you seal.',
          'No apex: long coffin nails need structure at the stress area to resist breaking.',
          'Sidewalls filed unevenly: one side straighter than the other makes the whole set look crooked.',
        ]} />
        <p className="text-gray-700 leading-relaxed">For a full filing walkthrough, see <Link to="/blog/how-to-shape-coffin-nails" className="underline text-[#F52B8C]">how to shape coffin nails</Link>.</p>
      </section>

      <section id="why-coffin">
        <h2 className="font-serif text-2xl font-bold mb-4">Why the coffin shape is so popular</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Coffin nails became mainstream in the early 2010s and have remained one of the most requested shapes. The combination of length (which looks luxurious), tapered sides (which elongate the finger), and flat tip (which is more practical than a sharp stiletto point) hits a sweet spot of dramatic but wearable.</p>
        <p className="text-gray-700 leading-relaxed">The shape works particularly well for ombre, chrome, and nail art, three of the most shareable styles on social media, which has kept it consistently popular in nail content.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">For more shape inspo: <Link to="/blog/square-nail-ideas" className="underline text-[#F52B8C]">50 square nail ideas for every style</Link>. For seasonal colour ideas: <Link to="/blog/summer-nail-ideas" className="underline text-[#F52B8C]">summer nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
