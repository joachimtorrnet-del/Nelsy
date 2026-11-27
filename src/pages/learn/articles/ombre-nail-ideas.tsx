import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleImage, ArticleTable, ArticleSteps, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'ombre-nail-ideas',
  title: '50 Ombré Nail Ideas to Save',
  seoTitle: '50 Ombre Nail Ideas: Pink, French, Sunset & Dark Designs',
  excerpt: 'Ombré nails are one of the most requested nail effects: a gradient that blends two or more colours across each nail. Here are 50 ombré ideas to inspire your next set.',
  seoDescription: '50 ombre nail ideas: soft pink and French ombré, sunset gradients, dark-to-light and multi-colour designs, with the colour combinations that work best.',
  category: 'nail-inspo',
  tags: ['ombre nail ideas', 'gradient nails', 'ombre nail designs'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #E0E7FF 100%)',
  heroImageAlt: '50 ombré nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: "The most popular ombré nails are baby pink to white, nude to pink and sunset gradients, with dark-to-light ombré for autumn and winter.",
    detail: "An ombré blends two or more colours across the nail, usually with a sponge or a brush. Colours from the same family blend most smoothly.",
    points: [
      { label: "Best for everyday", text: "Baby pink to white or nude to pink." },
      { label: "Best for summer", text: "Sunset ombré: yellow to orange to pink." },
      { label: "Best for winter", text: "Black to burgundy or dark plum to nude." },
    ],
  },
  toc: [
    { id: 'classic-ombre', label: 'Classic two-colour ombré' },
    { id: 'sunset-ombre', label: 'Sunset and multi-colour ombré' },
    { id: 'dark-ombre', label: 'Dark and moody ombré' },
    { id: 'pastel-ombre', label: 'Pastel and soft ombré' },
    { id: 'ombre-effects', label: 'Ombré with effects' },
    { id: 'how-to-ombre', label: 'How to do ombré nails' },
    { id: 'ombre-mistakes', label: 'Common ombré mistakes' },
  ],
  relatedSlugs: ['pink-nail-ideas', 'chrome-nail-ideas', 'summer-nail-ideas', 'abstract-nail-ideas'],
  faq: [
    { q: "What technique is used for ombré nails?", a: "The most common technique uses a makeup sponge: gel colour is dabbed onto the nail in the blend zone in thin layers, curing between each layer. Some techs blend two uncured gels with a brush instead, and acrylic or dip ombrés are done by overlapping two powder colours." },
    { q: "Which colour combinations look best for ombré?", a: "Colours that sit next to each other on the colour wheel blend most easily: pink to purple, blue to teal, peach to pink. High-contrast pairs such as black to white need more layers to blend smoothly, and opposite colours can turn muddy where they meet. Test a new pair on a nail tip first." },
    { q: "What is baby boomer ombré?", a: "Baby boomer is the name for a soft pink-to-white ombré: a sheer pink at the cuticle fading into white at the tip. It is a softer, blended alternative to the classic French manicure." },
    { q: "Can you do ombré on short nails?", a: "Yes. On short nails, keep to two colours and a wide, soft blend zone so the gradient has room to show. Nude to pink and pink to white work especially well at short lengths." },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic two-colour ombré</h2>
        <ArticleImage src="photo-1772322586702-73125782bd99" alt="Blue and white ombré nails" />
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Baby pink to white: the softest, most classic ombré</li>
          <li>Pink to purple: romantic and versatile</li>
          <li>Nude to pink: subtle and skin-flattering</li>
          <li>Blue to teal: fresh and cool</li>
          <li>Peach to coral: warm and summery</li>
          <li>Lavender to pink: soft and dreamy</li>
          <li>Nude to gold: warm glam ombré</li>
          <li>White to silver chrome: clean metallic gradient</li>
          <li>Rose to burgundy: dark to light in the same red family</li>
          <li>Mint to white: fresh and minimal</li>
        </ul>
      </section>

      <section id="sunset-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Sunset and multi-colour ombré</h2>
        <ArticleImage src="photo-1754951661104-2a13d50d4741" alt="Nails with abstract blue and orange colour blocks" />
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
        <ArticleImage src="photo-1587393794661-ef05657e10b9" alt="Dark manicure on short nails" />
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Black to deep red: dramatic and intense</li>
          <li>Black to burgundy: dark and sophisticated</li>
          <li>Black to deep purple: gothic and editorial</li>
          <li>Dark navy to black: subtle tonal ombré</li>
          <li>Black to chrome: ultra-modern metallic fade</li>
          <li>Charcoal to smoke: neutral dark ombré</li>
          <li>Deep teal to black: moody and cool</li>
          <li>Oxblood to nude: dark base fading to skin tone</li>
          <li>Forest green to black: earthy and autumnal</li>
          <li>Dark plum to nude: sophisticated fade</li>
        </ul>
      </section>

      <section id="pastel-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Pastel and soft ombré</h2>
        <ArticleImage src="photo-1607779097040-26e80aa78e66" alt="Pastel lilac, white and glitter nails" />
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Pastel rainbow across a full set: each nail a different pastel step</li>
          <li>Lilac to pale pink: soft and feminine</li>
          <li>Sky blue to white: cloud-like and airy</li>
          <li>Mint to yellow: fresh and cheerful</li>
          <li>Peach to vanilla: warm and skin-flattering</li>
          <li>Powder pink to nude: barely-there soft ombré</li>
          <li>Pastel blue to pastel pink: popular for gender-neutral or celebration sets</li>
          <li>Lavender to mint: cool and refreshing</li>
          <li>All pastels on alternating nails: coordinated set with each nail slightly different</li>
          <li>White to pastel: barely visible at one end, soft colour at the other</li>
        </ul>
      </section>

      <section id="ombre-effects">
        <h2 className="font-serif text-2xl font-bold mb-4">Ombré with effects</h2>
        <ArticleImage src="photo-1772322586785-3a34772cbc61" alt="White nails with marbled purple and black tips" />
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Ombré with chrome powder at the tip: gradient fading into a mirror finish</li>
          <li>Glitter ombré: fade from colour to glitter at the tip</li>
          <li>Aurora ombré: iridescent powder over a colour gradient</li>
          <li>Velvet matte ombré: soft gradient in a matte finish</li>
          <li>Chrome to colour ombré: mirror chrome fading into a deep colour</li>
          <li>Foil fleck ombré: scattered foil intensifying toward one end</li>
          <li>Glassy ombré: sheer jelly effect in a gradient</li>
          <li>Rhinestone-tipped ombré: gems concentrated at the tip of a gradient</li>
          <li>Holographic ombré: shifting shimmer embedded in the gradient</li>
          <li>Pigment powder ombré: pressed pigment dusted into the wet gel gradient</li>
        </ul>
      </section>

      <section id="how-to-ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">How to do ombré nails</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">There are three common ways to blend an ombré. Which one you use depends on the product and the look you want.</p>
        <ArticleTable
          headers={['Method', 'How it works', 'Best for']}
          rows={[
            ['Sponge', 'Gel colours dabbed onto the nail with a makeup sponge, in thin layers, curing between layers', 'Pink-to-white "baby boomer" ombré, high-contrast gradients'],
            ['Brush blend', 'Two uncured gel colours placed side by side and blended in the middle with a lightly loaded brush', 'Soft gradients in colours from the same family'],
            ['Powder (acrylic or dip)', 'Two powder colours layered so they overlap in the middle of the nail', 'Acrylic and dip sets, especially pink-and-white'],
          ]}
        />
        <ArticleSteps steps={[
          { title: 'Apply the base colour', body: 'Paint the lighter or main colour over the whole nail and cure it. This is the colour that will show at the cuticle end.' },
          { title: 'Load the sponge or brush lightly', body: 'Too much product on the sponge gives a heavy, blotchy edge. Dab off the excess on a palette first.' },
          { title: 'Build the gradient in thin passes', body: 'Start at the free edge and dab or blend upwards, stopping a little further from the tip each time. Cure between passes.' },
          { title: 'Clean the skin before curing', body: 'Sponging puts colour on the skin around the nail. Remove it with a brush dipped in cleanser, or use a liquid latex barrier before you start.' },
          { title: 'Seal with top coat', body: 'A glossy top coat smooths out the sponge texture and makes the blend look seamless.' },
        ]} />
      </section>

      <section id="ombre-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common ombré mistakes</h2>
        <ArticleChecklist title="What makes an ombré look patchy" items={[
          'A visible line between colours: the blend zone is too narrow, so add another light pass higher up the nail.',
          'Thick, uneven texture: too much gel on the sponge or too many layers without thinning.',
          'Colour on the cuticles after curing: clean or protect the skin before every cure, not at the end.',
          'Colours that turn muddy in the middle: opposite colours on the colour wheel can mix into brown or grey, so test the blend first.',
          'Gradient at different heights on each nail: pick a stopping point, such as one third of the nail, and keep it the same on all ten.',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">More inspo: <Link to="/blog/chrome-nail-ideas" className="underline text-[#F52B8C]">chrome nail ideas</Link> · <Link to="/blog/abstract-nail-ideas" className="underline text-[#F52B8C]">abstract nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
