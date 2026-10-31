import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';

registerArticle({
  slug: 'white-nail-ideas',
  title: '50 White Nail Ideas for a Clean Look',
  seoTitle: '50 White Nail Ideas for a Clean Look',
  excerpt: 'White nails are crisp, modern, and endlessly versatile. From clean minimalist to detailed nail art, here are 50 white nail ideas to save for your next set.',
  seoDescription: '50 white nail ideas for a clean look. Bright white, milk white, off-white, white nail art, and white chrome — every take on white nails.',
  category: 'nail-inspo',
  tags: ['white nail ideas', 'white nails', 'white nail designs'],
  heroImage: 'linear-gradient(135deg, #FAFAFA 0%, #F4F4F5 100%)',
  heroImageAlt: '50 white nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'classic-white', label: 'Classic and minimal white' },
    { id: 'soft-white', label: 'Soft and off-white shades' },
    { id: 'white-nail-art', label: 'White nail art designs' },
    { id: 'white-effects', label: 'White with effects' },
    { id: 'white-mixed', label: 'White mixed with colour' },
  ],
  relatedSlugs: ['black-nail-ideas', 'pink-nail-ideas', 'minimalist-nail-ideas', 'nail-colors-for-skin-undertone'],
  faq: [
    { q: 'Why do white nails look so popular on social media?', a: 'White nails photograph extremely well — they reflect light clearly, show shape definition strongly, and look crisp on camera. They also pair well with every skin tone in photographs and pop against almost any background. This makes them a perennial favourite for nail content creators.' },
    { q: 'How do I get white gel polish fully opaque without streaks?', a: 'White gel is notoriously difficult to apply streak-free. Use a white gel specifically formulated for opacity (not a sheer white). Apply in three thin coats rather than two thick ones. The first coat will look patchy — that\'s normal. Build coverage gradually. See the full guide on applying gel polish without streaks.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic-white">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic and minimal white</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Bright opaque white — clean, crisp, graphic</li>
          <li>White on short square nails — the most modern minimalist white look</li>
          <li>White on long almond — elongating and editorial</li>
          <li>White coffin nails — bold shape, clean colour</li>
          <li>White with a single chrome accent nail</li>
          <li>White with one negative space nail</li>
          <li>White French tip (traditional) — white tip on a natural base</li>
          <li>All-white set with a glossy finish</li>
          <li>White matte — gives a sculptural, modern quality</li>
          <li>White with a single gold foil stripe</li>
        </ul>
      </section>

      <section id="soft-white">
        <h2 className="font-serif text-2xl font-bold mb-4">Soft and off-white shades</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Milk white — slightly warm, creamy, softer than pure white</li>
          <li>Ivory — warm off-white; flattering on warm undertones</li>
          <li>Vanilla — cream-white with a yellow warmth; soft and wearable</li>
          <li>Chalk white — cool off-white; clean and modern</li>
          <li>Cloud white — slightly grey-tinged; airy and minimal</li>
          <li>Sheer white / glass white — translucent milk effect; the "clean girl" nail</li>
          <li>Pearlescent white — white with a subtle shifting shimmer</li>
          <li>Coconut white — warm, creamy, tropical feel</li>
          <li>White with silver undertone — cool and metallic-adjacent</li>
          <li>Nude-white — barely any colour; extremely skin-close</li>
        </ul>
      </section>

      <section id="white-nail-art">
        <h2 className="font-serif text-2xl font-bold mb-4">White nail art designs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>White with black abstract lines</li>
          <li>White with gold geometric detailing</li>
          <li>White floral designs — daisy, rose, or cherry blossom</li>
          <li>White marble effect with grey veining</li>
          <li>White and nude colour block</li>
          <li>White with soft pastel swirls</li>
          <li>White negative space with a window into a bare nail</li>
          <li>White snowflake designs (winter)</li>
          <li>White cloud nail art on a sky blue base</li>
          <li>White 3D bow or flower accent nail</li>
        </ul>
      </section>

      <section id="white-effects">
        <h2 className="font-serif text-2xl font-bold mb-4">White with effects</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>White chrome — mirror-white; highly reflective and clean</li>
          <li>White aurora powder — shifting white-to-blue-to-purple iridescence</li>
          <li>White glitter — fine silver glitter embedded in a white base</li>
          <li>White pearl shimmer — subtle lustre in a white gel</li>
          <li>White holographic — white with rainbow shimmer</li>
          <li>White velvet matte — soft, light-diffusing matte texture</li>
          <li>White cat eye gel — shifting shimmer in a white magnetic gel</li>
          <li>White with silver foil — asymmetric foil flecks</li>
          <li>Glazed donut nails — the viral sheer white with chrome shimmer look</li>
          <li>White jelly with rhinestones — sheer and sparkly</li>
        </ul>
      </section>

      <section id="white-mixed">
        <h2 className="font-serif text-2xl font-bold mb-4">White mixed with colour</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>White and black — graphic, high-contrast, editorial</li>
          <li>White and pastel ombré — soft gradient from white to any pastel</li>
          <li>White and gold — luxe and minimal</li>
          <li>White and green — crisp, fresh, summery</li>
          <li>White and blue — nautical or clean and coastal</li>
          <li>White and pink — soft, feminine, classic</li>
          <li>White and red — striking; clean base with a red accent nail</li>
          <li>White with multicolour swirls — maximalist and playful</li>
          <li>White and nude mix — understated and polished</li>
          <li>White with a neon accent nail — graphic contrast</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">More inspo: <Link to="/learn/minimalist-nail-ideas" className="underline text-[#F52B8C]">minimalist nail ideas</Link> · <Link to="/learn/black-nail-ideas" className="underline text-[#F52B8C]">black nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
