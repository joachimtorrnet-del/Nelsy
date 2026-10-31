import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'acrylic-bead-ratio-explained',
  title: 'Acrylic Bead Ratio Explained',
  seoTitle: 'Acrylic Bead Ratio Explained for Nail Techs',
  excerpt: 'The bead ratio — the amount of liquid monomer relative to acrylic powder in your bead — affects everything from workability to finished strength. Here\'s how to get it right.',
  seoDescription: 'Acrylic bead ratio explained for nail techs. What wet, medium, and dry beads look like, when to use each, how to pick up consistent beads, and how ratio affects the finished nail.',
  category: 'nail-education',
  tags: ['acrylic bead ratio', 'acrylic consistency', 'acrylic technique', 'nail tech education'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'Acrylic bead ratio explained for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-bead-ratio', label: 'What bead ratio means' },
    { id: 'bead-types', label: 'Wet, medium, and dry beads' },
    { id: 'picking-up-beads', label: 'How to pick up consistent beads' },
    { id: 'which-ratio-when', label: 'Which ratio to use when' },
    { id: 'effects-on-nail', label: 'How ratio affects the finished nail' },
    { id: 'product-variation', label: 'Product variation' },
  ],
  relatedSlugs: ['acrylic-application-step-by-step', 'how-to-build-nail-apex', 'common-acrylic-mistakes'],
  faq: [
    { q: 'What does a correct acrylic bead look like?', a: 'A medium-consistency bead holds its dome shape when sitting on your brush but moves slightly when you press it — it\'s workable without running. A too-wet bead pools and spreads; a too-dry bead is lumpy and hard to press flat. With experience, the correct consistency becomes instinctive, but early on, pressing the bead gently against your wrist (without applying) to feel the resistance is a useful consistency check.' },
    { q: 'Why does my acrylic go lumpy?', a: 'Lumpy acrylic is usually a too-dry bead. The dry bead has insufficient monomer to bind the powder smoothly, creating a grainy or lumpy surface rather than a glossy, smooth bead. Add slightly more monomer to your ratio. It can also indicate your monomer is evaporating from the dappen dish — keep the dish covered between beads.' },
    { q: 'Does the bead ratio change between brands?', a: 'Yes — different acrylic systems have different ideal working consistencies based on their formulation. Some systems are designed to work wet, others drier. A ratio that works perfectly with one brand may be too wet or dry for another. When switching products, invest time in practicing with the new product before using it on clients.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-bead-ratio">
        <h2 className="font-serif text-2xl font-bold mb-4">What bead ratio means</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When you dip an acrylic brush into liquid monomer and then into powder, the amount of monomer carried by the brush relative to the powder it picks up determines the "ratio" of your bead. A wetter bead has more monomer relative to powder; a drier bead has less.</p>
        <p className="text-gray-700 leading-relaxed">This ratio affects: how easy the bead is to work with, how long it remains workable, the finished surface quality, the clarity of the cured product, and ultimately the strength and longevity of the nail.</p>
      </section>

      <section id="bead-types">
        <h2 className="font-serif text-2xl font-bold mb-4">Wet, medium, and dry beads</h2>
        <ArticleTable
          headers={['Bead type', 'Appearance', 'Behaviour', 'Result when cured']}
          rows={[
            ['Very wet', 'Shiny, almost liquid, spreads quickly when placed', 'Runs off the nail, hard to control, floods the cuticle', 'Can cure with pits; may be cloudy; can cause MMA-related issues if consistent over-saturation'],
            ['Wet', 'Glossy dome, settles and flows when placed', 'Self-levels well; flows easily; good for self-levelling techniques', 'Can be slightly porous; more working time'],
            ['Medium', 'Dome shape, slight gloss, holds shape but still moves when pressed', 'Workable; controllable; enough flow to self-level', 'Best strength and clarity when cured; recommended for most work'],
            ['Dry', 'Matte dome, holds shape firmly, little movement', 'Hard to press flat; creates drag marks; rough surface', 'Porous, grainy surface; weaker due to insufficient monomer bonds'],
          ]}
        />
        <ArticleTip>The ideal bead for most nail tech work is a medium consistency — glossy but self-contained, moves when pressed but doesn\'t run. This consistency is what educational programs typically teach as the standard.</ArticleTip>
      </section>

      <section id="picking-up-beads">
        <h2 className="font-serif text-2xl font-bold mb-4">How to pick up consistent beads</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4">
          <li><strong>Saturate the brush:</strong> Dip the brush tip into the monomer. The brush should be wet but not dripping — press the brush flat on the dappen dish edge to remove excess.</li>
          <li><strong>Angle and press into powder:</strong> Hold the brush at roughly 45°, press into the surface of the powder, and turn slightly while pressing to pick up a bead. Don't scoop — press and roll.</li>
          <li><strong>Let the bead form naturally:</strong> A correct bead forms as you lift the brush out of the powder — a dome shape sitting on the brush tip. Don't try to "make" a bead; the monomer picks up the powder and creates it.</li>
          <li><strong>Check before placing:</strong> The bead should hold its shape for a few seconds on the brush. If it flows off the brush, it's too wet. If it looks matte and gritty, it's too dry.</li>
        </ol>
        <ArticleCallout variant="info" title="Consistent bead placement">
          Practice picking up and placing beads on a non-client surface (paper, practice hand) until you can consistently pick up beads of a similar size and consistency. Inconsistent beads usually indicate inconsistent brush saturation — the most common variable to address.
        </ArticleCallout>
      </section>

      <section id="which-ratio-when">
        <h2 className="font-serif text-2xl font-bold mb-4">Which ratio to use when</h2>
        <ArticleTable
          headers={['Bead zone', 'Recommended consistency', 'Reason']}
          rows={[
            ['Free edge / tip bead', 'Medium', 'Needs to hold shape at the tip rather than run off'],
            ['Apex bead', 'Medium to slightly wet', 'Needs to flow enough to create a smooth surface while building height'],
            ['Cuticle zone bead', 'Medium to slightly dry', 'Must not flow toward the cuticle; drier gives more control near the skin'],
          ]}
        />
      </section>

      <section id="effects-on-nail">
        <h2 className="font-serif text-2xl font-bold mb-4">How ratio affects the finished nail</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Too wet:</strong> Monomer-heavy product can remain soft and porous after cure; the excess monomer may cause inhibited cure; increased risk of skin sensitisation over time due to uncured monomer</li>
          <li><strong>Correct (medium):</strong> Full chemical reaction between monomer and polymer produces the strongest, clearest, most durable cured product</li>
          <li><strong>Too dry:</strong> Powder-heavy product creates porosity (small air pockets) in the finished product; porous acrylic is weaker and absorbs staining products more easily</li>
        </ul>
      </section>

      <section id="product-variation">
        <h2 className="font-serif text-2xl font-bold mb-4">Product variation</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Different acrylic systems have different designed working consistencies and different bead behaviour:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Slow-set systems give more working time at a medium consistency — better for beginners</li>
          <li>Fast-set systems require confident placement as the working window is shorter</li>
          <li>Self-levelling systems are formulated to be slightly wetter and require less brush work</li>
          <li>Temperature affects working time — cold environments extend it; warm rooms speed it up</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">When learning a new product: practice bead pick-up and placement extensively before using it on clients. Bead ratio is intuitive once you know your specific product's behaviour — but it requires time with that specific system to develop. See: <Link to="/learn/acrylic-application-step-by-step" className="underline text-[#F52B8C]">acrylic application step-by-step</Link>.</p>
      </section>
    </div>
  ),
});
export {};
