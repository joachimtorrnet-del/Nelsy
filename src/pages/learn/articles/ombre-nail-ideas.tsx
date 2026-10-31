import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';

registerArticle({
  slug: 'ombre-nail-ideas',
  title: '50 Ombré Nail Ideas to Save',
  seoTitle: '50 Ombré Nail Ideas to Save',
  excerpt: 'Ombré nails are one of the most requested nail effects — a gradient that blends two or more colours across each nail. Here are 50 ombré ideas to inspire your next set.',
  seoDescription: '50 ombré nail ideas. Colour combinations, techniques, and inspiration for classic ombré, sunset ombré, dark-to-light, and multi-colour gradient nails.',
  category: 'nail-inspo',
  tags: ['ombre nail ideas', 'gradient nails', 'ombre nail designs'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #E0E7FF 100%)',
  heroImageAlt: '50 ombré nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'classic-ombre', label: 'Classic two-colour ombré' },
    { id: 'sunset-ombre', label: 'Sunset and multi-colour ombré' },
    { id: 'dark-ombre', label: 'Dark and moody ombré' },
    { id: 'pastel-ombre', label: 'Pastel and soft ombré' },
    { id: 'ombre-effects', label: 'Ombré with effects' },
  ],
  relatedSlugs: ['pink-nail-ideas', 'chrome-nail-ideas', 'summer-nail-ideas', 'abstract-nail-ideas'],
  faq: [
    { q: 'What technique is used for ombré nails?', a: 'The most common technique uses a makeup sponge — gel colour is applied to the sponge and dabbed onto the nail in the blend zone, blending the two colours together. For gel systems, this is done in thin layers and cured between each layer. A dry brush blending technique is also used with some products.' },
    { q: 'Which colour combinations look best for ombré?', a: 'The easiest ombré to blend are adjacent colours on the colour wheel — pink to purple, blue to teal, peach to pink. High-contrast combinations (black to white, dark navy to gold) require more layers to blend smoothly. Start with colours that share an undertone for the most seamless result.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic two-colour ombré</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Baby pink to white — the softest, most classic ombré</li>
          <li>Pink to purple — romantic and versatile</li>
          <li>Nude to pink — subtle and skin-flattering</li>
          <li>Blue to teal — fresh and cool</li>
          <li>Peach to coral — warm and summery</li>
          <li>Lavender to pink — soft and dreamy</li>
          <li>Nude to gold — warm glam ombré</li>
          <li>White to silver chrome — clean metallic gradient</li>
          <li>Rose to burgundy — dark to light in the same red family</li>
          <li>Mint to white — fresh and minimal</li>
        </ul>
      </section>

      <section id="sunset-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Sunset and multi-colour ombré</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Sunset ombré: yellow-orange-pink-purple across the nail</li>
          <li>Rainbow ombré: all colours of the spectrum across a full set</li>
          <li>Fire ombré: yellow to orange to red</li>
          <li>Tropical ombré: yellow to turquoise</li>
          <li>Ocean ombré: white to aqua to deep blue</li>
          <li>Peacock ombré: teal to royal blue to purple</li>
          <li>Autumn ombré: gold to orange to burgundy</li>
          <li>Galaxy ombré: black to deep purple to blue with glitter</li>
          <li>Cotton candy ombré: blue and pink blend</li>
          <li>Watermelon ombré: red to pink to white tip</li>
        </ul>
      </section>

      <section id="dark-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Dark and moody ombré</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Black to deep red — dramatic and intense</li>
          <li>Black to burgundy — dark and sophisticated</li>
          <li>Black to deep purple — gothic and editorial</li>
          <li>Dark navy to black — subtle tonal ombré</li>
          <li>Black to chrome — ultra-modern metallic fade</li>
          <li>Charcoal to smoke — neutral dark ombré</li>
          <li>Deep teal to black — moody and cool</li>
          <li>Oxblood to nude — dark base fading to skin tone</li>
          <li>Forest green to black — earthy and autumnal</li>
          <li>Dark plum to nude — sophisticated fade</li>
        </ul>
      </section>

      <section id="pastel-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Pastel and soft ombré</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Pastel rainbow across a full set — each nail a different pastel step</li>
          <li>Lilac to pale pink — soft and feminine</li>
          <li>Sky blue to white — cloud-like and airy</li>
          <li>Mint to yellow — fresh and cheerful</li>
          <li>Peach to vanilla — warm and skin-flattering</li>
          <li>Powder pink to nude — barely-there soft ombré</li>
          <li>Pastel blue to pastel pink — popular for gender-neutral or celebration sets</li>
          <li>Lavender to mint — cool and refreshing</li>
          <li>All pastels on alternating nails — coordinated set with each nail slightly different</li>
          <li>White to pastel — barely visible at one end, soft colour at the other</li>
        </ul>
      </section>

      <section id="ombre-effects">
        <h2 className="font-serif text-2xl font-bold mb-4">Ombré with effects</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ombré with chrome powder at the tip — gradient fading into a mirror finish</li>
          <li>Glitter ombré — fade from colour to glitter at the tip</li>
          <li>Aurora ombré — iridescent powder over a colour gradient</li>
          <li>Velvet matte ombré — soft gradient in a matte finish</li>
          <li>Chrome to colour ombré — mirror chrome fading into a deep colour</li>
          <li>Foil fleck ombré — scattered foil intensifying toward one end</li>
          <li>Glassy ombré — sheer jelly effect in a gradient</li>
          <li>Rhinestone-tipped ombré — gems concentrated at the tip of a gradient</li>
          <li>Holographic ombré — shifting shimmer embedded in the gradient</li>
          <li>Pigment powder ombré — pressed pigment dusted into the wet gel gradient</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">More inspo: <Link to="/learn/chrome-nail-ideas" className="underline text-[#F52B8C]">chrome nail ideas</Link> · <Link to="/learn/abstract-nail-ideas" className="underline text-[#F52B8C]">abstract nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
