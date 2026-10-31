import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';

registerArticle({
  slug: 'red-nail-ideas',
  title: '50 Red Nail Ideas From Classic to Trendy',
  seoTitle: '50 Red Nail Ideas From Classic to Trendy',
  excerpt: 'Red nails never go out of style — but there are more ways to wear red than a classic creme. Here are 50 red nail ideas from timeless to trend-forward.',
  seoDescription: '50 red nail ideas. Classic red, deep crimson, brick red, cherry, red chrome, red ombré, and red nail art — inspiration for every shade of red.',
  category: 'nail-inspo',
  tags: ['red nail ideas', 'red nails', 'red nail designs'],
  heroImage: 'linear-gradient(135deg, #FFF1F1 0%, #FEE2E2 100%)',
  heroImageAlt: '50 red nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'classic-red', label: 'Classic and timeless reds' },
    { id: 'deep-red', label: 'Deep and dark reds' },
    { id: 'bright-red', label: 'Bright and bold reds' },
    { id: 'red-nail-art', label: 'Red nail art' },
    { id: 'red-effects', label: 'Red with effects' },
  ],
  relatedSlugs: ['pink-nail-ideas', 'black-nail-ideas', 'nail-colors-for-skin-undertone', 'nail-trends-2027'],
  faq: [
    { q: 'Which red suits cool undertones?', a: 'Cool-undertone skin looks best with blue-based reds — think true red, cherry red, and raspberry-red. These lean slightly toward blue-pink in the red family. Avoid very orange-reds (tomato, brick) which can make cool undertones look tired.' },
    { q: 'Which red suits warm undertones?', a: 'Warm-undertone skin looks best with warm reds — tomato red, brick red, terracotta-red, and orange-adjacent reds. These share the yellow or orange undertone of the skin and create a cohesive, warm look.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic-red">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic and timeless reds</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Red nails have a longer fashion history than almost any other nail colour. These classic shades are always in style.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Classic red creme — opaque, high-shine, timeless</li>
          <li>Cherry red — bright with a slightly blue undertone; the definitive classic</li>
          <li>Ruby red — slightly deeper and more jewel-toned than cherry</li>
          <li>Crimson — deep, rich, saturated red; elegant and grown-up</li>
          <li>Red with a square or squoval shape — the most iconic classic red combination</li>
          <li>Short red nails — clean, polished, practical</li>
          <li>Red French tip — a modern twist on the classic French</li>
          <li>Glossy red on long almond — glamorous and editorial</li>
          <li>Red with a single accent nail in black</li>
          <li>Red with gold foil detailing for special occasions</li>
        </ul>
      </section>

      <section id="deep-red">
        <h2 className="font-serif text-2xl font-bold mb-4">Deep and dark reds</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Oxblood — very deep, almost black-red; autumn and winter staple</li>
          <li>Burgundy — wine-red with a purple undertone; sophisticated</li>
          <li>Dark cherry — deep red with warmth; glowy in certain lights</li>
          <li>Bordeaux — a French wine red; deep and rich</li>
          <li>Garnet — deep, slightly brown-red; warm and jewel-like</li>
          <li>Deep brick red — terracotta-toned dark red; earthy and modern</li>
          <li>Deep red with a shimmer finish — adds depth and dimension</li>
          <li>Near-black red — so deep it reads black-red; maximum drama</li>
          <li>Dark red velvet matte — deep red in an ultra-matte finish</li>
          <li>Deep red with chrome powder — shifts between red and copper</li>
        </ul>
      </section>

      <section id="bright-red">
        <h2 className="font-serif text-2xl font-bold mb-4">Bright and bold reds</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Fire red — blue-based true red; electric and sharp</li>
          <li>Tomato red — warm, orange-adjacent; fresh and summery</li>
          <li>Coral red — orange-leaning red; tropical and warm</li>
          <li>Red-orange — a deliberate push into orange territory; summery and bold</li>
          <li>Neon red — electric, UV-reactive; summer statement</li>
          <li>Candy apple red — glossy, saturated, high-shine</li>
          <li>Rose-red — slightly pink-leaning red; softer than pure red</li>
          <li>Strawberry red — bright mid-red with warmth</li>
          <li>Signal red — pure, clean, graphic; modern minimalist</li>
          <li>Red metallic — red with a full-on metallic sheen</li>
        </ul>
      </section>

      <section id="red-nail-art">
        <h2 className="font-serif text-2xl font-bold mb-4">Red nail art</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Red and gold geometric designs — classic luxe pairing</li>
          <li>Red roses on a nude or white base</li>
          <li>Red and black colour block — graphic and high-contrast</li>
          <li>Red swirls on a cream base</li>
          <li>Red Christmas nails — festive red with gold or green accents</li>
          <li>Red plaid / tartan pattern nail art</li>
          <li>Red heart accent nail</li>
          <li>Red with white polka dots — vintage pin-up</li>
          <li>Red and silver star detailing for festive looks</li>
          <li>Red cherry nail art (cherry graphics on tips)</li>
        </ul>
      </section>

      <section id="red-effects">
        <h2 className="font-serif text-2xl font-bold mb-4">Red with effects</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Red chrome — mirror red or red-to-copper shift</li>
          <li>Red cat eye gel — magnetic shifting shimmer in red</li>
          <li>Red ombré — cherry fading into deep crimson</li>
          <li>Red glitter — classic festive red with gold or red glitter</li>
          <li>Red aurora powder — iridescent shift over a red base</li>
          <li>Red velvet matte — luxe flat finish on a deep red</li>
          <li>Red with gold foil flecks — editorial and special occasion</li>
          <li>Red holographic — rainbow shimmer shifting over a red base</li>
          <li>Jelly red — translucent, glass-nail effect in red</li>
          <li>Red with crystal rhinestone accent — elevated classic</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">More inspo: <Link to="/learn/pink-nail-ideas" className="underline text-[#F52B8C]">pink nail ideas</Link> · <Link to="/learn/black-nail-ideas" className="underline text-[#F52B8C]">black nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
