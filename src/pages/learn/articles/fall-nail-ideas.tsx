import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';

registerArticle({
  slug: 'fall-nail-ideas',
  title: '50 Fall Nail Ideas',
  seoTitle: '50 Fall Nail Ideas',
  excerpt: 'Autumn brings the best nail colours of the year — rich, warm, and moody. Here are 50 fall nail ideas from earthy neutrals to deep dramatic hues.',
  seoDescription: '50 fall nail ideas. Burgundy, rust, chocolate, forest green, and autumn nail art — inspiration for the richest nail season of the year.',
  category: 'nail-inspo',
  tags: ['fall nail ideas', 'autumn nails', 'fall nail designs'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
  heroImageAlt: '50 fall nail ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Inspo Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'warm-autumnal', label: 'Warm and earthy autumnal colours' },
    { id: 'deep-dark', label: 'Deep and dark fall colours' },
    { id: 'neutrals-fall', label: 'Fall neutrals' },
    { id: 'fall-nail-art', label: 'Fall nail art designs' },
    { id: 'fall-effects', label: 'Fall effects and finishes' },
  ],
  relatedSlugs: ['winter-nail-ideas', 'black-nail-ideas', 'red-nail-ideas', 'best-nail-colors-every-season'],
  faq: [
    { q: 'What are the most popular fall nail colours?', a: 'Burgundy, oxblood, burnt orange, rust, chocolate brown, deep olive green, mustard yellow, and terracotta consistently dominate autumn. Deep neutrals (mushroom, warm taupe, chai) are also strong performers — they give an autumnal feel without being overtly seasonal and suit clients who prefer understated colour.' },
    { q: 'When should I start promoting fall nail content?', a: 'Start releasing autumn nail content from late August — clients are already planning their seasonal looks and searching for autumn inspiration before September. Having autumn content and availability visible ahead of the season change means you can start booking these sets from late summer.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="warm-autumnal">
        <h2 className="font-serif text-2xl font-bold mb-4">Warm and earthy autumnal colours</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Burnt orange — the quintessential autumn nail colour</li>
          <li>Rust — deeper, more muted orange-brown; earthy and wearable</li>
          <li>Terracotta — warm clay tone; flattering on all skin tones</li>
          <li>Copper — warm metallic with an autumnal feel</li>
          <li>Mustard yellow — bold, seasonal, very photogenic</li>
          <li>Caramel — warm mid-brown with orange warmth</li>
          <li>Pumpkin orange — slightly brighter, seasonal statement</li>
          <li>Amber — golden-brown; warm and jewel-like</li>
          <li>Golden yellow — harvest-inspired, warm and rich</li>
          <li>Warm brick red — between red and terracotta; versatile and seasonal</li>
        </ul>
      </section>

      <section id="deep-dark">
        <h2 className="font-serif text-2xl font-bold mb-4">Deep and dark fall colours</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Burgundy — the autumn nail. Deep, wine-red, always right</li>
          <li>Oxblood — darker than burgundy, almost black-red</li>
          <li>Chocolate brown — rich, warm, grounding</li>
          <li>Dark plum — deep purple-brown; sophisticated</li>
          <li>Deep forest green — dark, earthy, feels very autumn/winter</li>
          <li>Garnet — deep red with a jewel-like quality</li>
          <li>Dark fig — deep purple-brown; unusual and beautiful</li>
          <li>Black with warm undertone — near-black in brown or red</li>
          <li>Dark olive — muted, earthy green</li>
          <li>Deep navy — cool, structured, transitions well into winter</li>
        </ul>
      </section>

      <section id="neutrals-fall">
        <h2 className="font-serif text-2xl font-bold mb-4">Fall neutrals</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Warm taupe — grey-beige with warmth</li>
          <li>Mushroom — muted, earthy brown-nude</li>
          <li>Chai — warm spiced brown-nude</li>
          <li>Walnut — mid-brown nude</li>
          <li>Cashmere — soft warm cream-beige</li>
          <li>Stone — cool greige; works all seasons but feels very autumnal</li>
          <li>Dark nude — deeper than usual skin-tone nudes</li>
          <li>Mink — grey-taupe neutral</li>
          <li>Warm sand — golden-beige</li>
          <li>Biscuit — light warm brown; soft and elegant</li>
        </ul>
      </section>

      <section id="fall-nail-art">
        <h2 className="font-serif text-2xl font-bold mb-4">Fall nail art designs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Autumn leaf nail art — maple and oak leaf designs</li>
          <li>Pumpkin nail art</li>
          <li>Abstract autumnal ombré — orange to burgundy</li>
          <li>Mushroom nail art — illustrated fungi designs</li>
          <li>Spiderweb nail art (October / Halloween)</li>
          <li>Ghost and pumpkin Halloween set</li>
          <li>Berry and floral botanical design</li>
          <li>Acorn and pinecone illustrations</li>
          <li>Dark florals — moody, jewel-toned flower designs</li>
          <li>Autumnal plaid or tartan pattern</li>
        </ul>
      </section>

      <section id="fall-effects">
        <h2 className="font-serif text-2xl font-bold mb-4">Fall effects and finishes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Velvet matte on burgundy or oxblood</li>
          <li>Copper chrome — warm metallic with autumnal feel</li>
          <li>Gold foil over a dark base</li>
          <li>Dark cat eye gel — shifting shimmer on deep colours</li>
          <li>Aurora powder over deep red or plum</li>
          <li>Fine gold glitter in a warm-toned gel</li>
          <li>Shimmer in terracotta or rust</li>
          <li>Chrome on dark forest green</li>
          <li>Dark duochrome — shifts between two dark colours</li>
          <li>Textured pumpkin nail (3D textured design for seasonal clients)</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Related: <Link to="/learn/winter-nail-ideas" className="underline text-[#F52B8C]">winter nail ideas</Link> · <Link to="/learn/best-nail-colors-every-season" className="underline text-[#F52B8C]">best nail colours for every season</Link>.</p>
      </section>
    </div>
  ),
});
export {};
