import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';

registerArticle({
  slug: 'chrome-nail-ideas',
  title: '50 Chrome Nail Ideas to Save',
  seoTitle: '50 Chrome Nail Ideas to Save',
  excerpt: 'Chrome nails are one of the most eye-catching effects you can offer — a mirror-like finish that turns heads. Here are 50 chrome nail ideas across every colour and style.',
  seoDescription: '50 chrome nail ideas. Silver, gold, rose gold, holographic, and colour-shifting chrome nails — inspiration for mirror-finish nail designs in every style.',
  category: 'nail-inspo',
  tags: ['chrome nail ideas', 'chrome nails', 'mirror nail designs'],
  heroImage: 'linear-gradient(135deg, #F8F9FF 0%, #E0E7FF 100%)',
  heroImageAlt: '50 chrome nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'silver-chrome', label: 'Silver and white chrome' },
    { id: 'gold-chrome', label: 'Gold and rose gold chrome' },
    { id: 'colour-chrome', label: 'Colour chrome' },
    { id: 'chrome-nail-art', label: 'Chrome with nail art' },
    { id: 'chrome-effects', label: 'Chrome with other effects' },
  ],
  relatedSlugs: ['how-to-make-chrome-nails-last-longer', 'ombre-nail-ideas', 'nail-trends-2027', 'luxury-nail-ideas'],
  faq: [
    { q: 'How long does chrome last on nails?', a: 'Chrome applied correctly over a compatible base and sealed with the right top coat typically lasts the full wear period of a gel set — 2 to 4 weeks depending on wear and aftercare. The most common reason for early degradation is an incompatible top coat or insufficient sealing. See the full guide on making chrome nails last longer.' },
    { q: 'What\'s the difference between chrome and aurora powder?', a: 'Chrome powder creates a solid mirror finish in a single colour (silver, gold, etc.). Aurora powder creates a shifting, iridescent effect that moves between multiple colours depending on the viewing angle — typically white-to-pink-to-purple or similar. Aurora is softer and more ethereal; chrome is harder and more graphic.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="silver-chrome">
        <h2 className="font-serif text-2xl font-bold mb-4">Silver and white chrome</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Mirror silver chrome — classic, high-impact, universally flattering</li>
          <li>White chrome — clean, modern, futuristic feel</li>
          <li>Silver chrome on black — the highest-contrast chrome combination</li>
          <li>Silver chrome on nude — subtle base, dramatic effect</li>
          <li>Silver chrome on short square — minimalist and graphic</li>
          <li>Silver chrome on long coffin — dramatic and editorial</li>
          <li>Silver chrome French tip — chrome only on the tip for a modern French</li>
          <li>Pewter / gunmetal chrome — darker, moody silver</li>
          <li>Silver chrome full set — all nails matching, clean shape</li>
          <li>Silver chrome with rhinestone accent — elevated metallic</li>
        </ul>
      </section>

      <section id="gold-chrome">
        <h2 className="font-serif text-2xl font-bold mb-4">Gold and rose gold chrome</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Gold mirror chrome — warm, luxurious, summer to winter</li>
          <li>Rose gold chrome — warm-pink metallic; perennially popular</li>
          <li>Copper chrome — warm, earthy metallic; great for autumn</li>
          <li>Champagne chrome — pale, warm, almost nude metallic</li>
          <li>Gold chrome on black — ultra-luxe combination</li>
          <li>Rose gold chrome on nude — soft and elegant</li>
          <li>Gold chrome French tip — tip only in mirror gold</li>
          <li>Bronze chrome — warm, deep, rich metallic</li>
          <li>Gold chrome ombré — chrome powder intensifying toward the tip</li>
          <li>Two-tone gold and silver chrome — warm and cool metallics on alternating nails</li>
        </ul>
      </section>

      <section id="colour-chrome">
        <h2 className="font-serif text-2xl font-bold mb-4">Colour chrome</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Pink chrome — hot pink mirror finish; vivid and bold</li>
          <li>Red chrome — mirror red; striking and dramatic</li>
          <li>Blue chrome — mirror blue on a matching or black base</li>
          <li>Green chrome — emerald or forest green mirror effect</li>
          <li>Purple chrome — deep or bright purple mirror finish</li>
          <li>Teal chrome — blue-green shifting mirror</li>
          <li>Orange chrome — warm, fiery metallic</li>
          <li>Black chrome — mirror black; intense and modern</li>
          <li>Colour-shifting chrome (duochrome) — shifts between two colours at different angles</li>
          <li>Iridescent aurora powder — not strictly chrome but in the same family; shifting multi-colour</li>
        </ul>
      </section>

      <section id="chrome-nail-art">
        <h2 className="font-serif text-2xl font-bold mb-4">Chrome with nail art</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Chrome base with black abstract line art over the top</li>
          <li>Chrome accent nail on a coordinated colour set</li>
          <li>Chrome ombré (chrome powder only on half the nail)</li>
          <li>Chrome through a negative space design</li>
          <li>Chrome with rhinestones — gems on a mirror base</li>
          <li>Chrome French tip on a clear extension</li>
          <li>Chrome moon shape only — reverse French in chrome</li>
          <li>Chrome with foil overlay — layers of chrome and foil for texture</li>
          <li>Chrome with stamping — stamped design over a chrome base</li>
          <li>Multi-chrome set — different chrome colour on each nail</li>
        </ul>
      </section>

      <section id="chrome-effects">
        <h2 className="font-serif text-2xl font-bold mb-4">Chrome with other effects</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Chrome with gel colour base (the base colour affects the chrome finish)</li>
          <li>Matte chrome — chrome powder sealed with a matte top coat for a satin finish</li>
          <li>Chrome over gel extension — the extension shape reads through the mirror</li>
          <li>Chrome with 3D nail art on the accent nail</li>
          <li>Chrome half-and-half — chrome on half the nail, colour on the other half</li>
          <li>Chrome over clear gel for a glass-like finish</li>
          <li>Chrome cat eye combination — two types of metallic shimmer together</li>
          <li>Chrome over a glitter base — layering effects for maximum impact</li>
          <li>Chrome with a velvet matte accent nail — contrast of finishes</li>
          <li>Chrome with botanical nail art on a contrasting nail</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Technique guide: <Link to="/learn/how-to-make-chrome-nails-last-longer" className="underline text-[#F52B8C]">how to make chrome nails last longer</Link>.</p>
      </section>
    </div>
  ),
});
export {};
