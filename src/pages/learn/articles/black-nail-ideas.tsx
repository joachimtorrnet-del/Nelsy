import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';

registerArticle({
  slug: 'black-nail-ideas',
  title: '50 Black Nail Ideas for a Bold Look',
  seoTitle: '50 Black Nail Ideas for a Bold Look',
  excerpt: 'Black nails are one of the most versatile and enduring nail colours — minimal, dramatic, and works with everything. Here are 50 black nail ideas from classic to editorial.',
  seoDescription: '50 black nail ideas. Classic black, black nail art, black chrome, black ombré, and black accent nails — inspiration for bold black nail designs.',
  category: 'nail-inspo',
  tags: ['black nail ideas', 'black nails', 'black nail designs'],
  heroImage: 'linear-gradient(135deg, #F4F4F5 0%, #E4E4E7 100%)',
  heroImageAlt: '50 black nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'classic-black', label: 'Classic and minimal black' },
    { id: 'black-nail-art', label: 'Black nail art designs' },
    { id: 'black-effects', label: 'Black with effects' },
    { id: 'black-mixed', label: 'Black mixed with colour' },
    { id: 'black-seasonal', label: 'Seasonal black ideas' },
  ],
  relatedSlugs: ['red-nail-ideas', 'white-nail-ideas', 'nail-trends-2027', 'nail-shapes-explained'],
  faq: [
    { q: 'Are black nails still trendy?', a: 'Black nails have never really gone out of style — they\'ve been a consistent favourite for decades. They move in and out of peak trend moments but are always a strong choice for clients who want nails that look polished without being fussy. Black is one of the easiest colours to photograph and looks equally good on short or long nails.' },
    { q: 'What nail shape looks best with black?', a: 'Almost any shape works with black. Short square black nails have a graphic, minimalist feel. Long almond or coffin black nails are dramatic and editorial. The contrast of very long, very black nails with an intricate shape is a popular aesthetic, particularly in chrome or matte.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic-black">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic and minimal black</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>High-gloss black — the definitive classic; sharp and clean</li>
          <li>Matte black — ultra-modern, velvet-like; looks expensive</li>
          <li>Short square black — graphic and minimal</li>
          <li>Long almond black — dramatic and elongating</li>
          <li>Coffin black — bold shape, bold colour</li>
          <li>Black with a nude accent nail — one nail different for interest</li>
          <li>Near-black (very dark navy or green) — black with a subtle undertone shift</li>
          <li>Black gel extension — clean, structural, wearable drama</li>
          <li>Squoval black — the understated, practical version</li>
          <li>Natural length black — subverts the expectation that dark nails need length</li>
        </ul>
      </section>

      <section id="black-nail-art">
        <h2 className="font-serif text-2xl font-bold mb-4">Black nail art designs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Black and gold geometric nail art — the most popular black nail art combination</li>
          <li>Black and white swirls — graphic and editorial</li>
          <li>Black lace pattern nail art</li>
          <li>Black abstract lines on a nude base</li>
          <li>Black French tip on a clear or nude base</li>
          <li>Black and silver chrome combination</li>
          <li>Black spider web nail art — perennially popular for Halloween</li>
          <li>Black floral design on nude — minimalist and delicate</li>
          <li>Black marble effect — black veining on a white base</li>
          <li>Black negative space cut-outs over a nude base</li>
        </ul>
      </section>

      <section id="black-effects">
        <h2 className="font-serif text-2xl font-bold mb-4">Black with effects</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Black chrome — mirror black; incredibly striking</li>
          <li>Black cat eye gel — shifting shimmer in a dark, magnetic gel</li>
          <li>Black glitter — fine glitter in black creates a sparkle that disappears in shadow</li>
          <li>Black aurora powder — shifting purple or teal iridescence over black</li>
          <li>Black holographic — rainbow shimmer embedded in black gel</li>
          <li>Black velvet texture — soft, light-absorbing matte finish</li>
          <li>Black foil — gold or silver foil on a black base</li>
          <li>Black sugar texture — textured finish for a subtle tactile effect</li>
          <li>Black duochrome — shifts between black and another colour at different angles</li>
          <li>Black with embedded nail art (flowers or gems under a sheer layer)</li>
        </ul>
      </section>

      <section id="black-mixed">
        <h2 className="font-serif text-2xl font-bold mb-4">Black mixed with colour</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Black and red — the most striking high-contrast nail combination</li>
          <li>Black and gold — luxe and editorial; works for every occasion</li>
          <li>Black and white — graphic, mod, timeless</li>
          <li>Black and deep purple — moody and sophisticated</li>
          <li>Black and silver — cool and metallic</li>
          <li>Black and emerald green — rich, jewel-toned combination</li>
          <li>Black and pink — striking contrast; great for maximalist looks</li>
          <li>Black and nude ombré — black fading into skin tone</li>
          <li>Black and blue — navy or electric blue with black</li>
          <li>Black base with a colourful abstract accent nail</li>
        </ul>
      </section>

      <section id="black-seasonal">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal black ideas</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Autumn/Halloween:</strong> Black with spider web art, black and orange combination, black cat eye</li>
          <li><strong>Winter:</strong> Black with silver chrome, black and red festive, black velvet matte</li>
          <li><strong>Spring:</strong> Black with white florals, black and pastels colour block</li>
          <li><strong>Summer:</strong> Black with neon accent, matte black with chrome accent</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">More inspo: <Link to="/learn/red-nail-ideas" className="underline text-[#F52B8C]">red nail ideas</Link> · <Link to="/learn/white-nail-ideas" className="underline text-[#F52B8C]">white nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
