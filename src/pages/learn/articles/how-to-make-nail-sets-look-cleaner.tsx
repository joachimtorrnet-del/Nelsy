import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-make-nail-sets-look-cleaner',
  title: 'How to Make Nail Sets Look Cleaner',
  seoTitle: 'How to Make Nail Sets Look Cleaner',
  excerpt: 'Clean nail sets are what separate professional results from amateur ones. Here are the technique details that make the biggest difference to cleanliness and finish.',
  seoDescription: 'How to make nail sets look cleaner. Cuticle work, product control, sidewall cleanliness, finishing technique, and the details that make nail sets look professional.',
  category: 'nail-education',
  tags: ['clean nail sets', 'nail tech technique', 'nail set finishing', 'nail application tips'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to make nail sets look cleaner',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'cuticle-work', label: 'Cuticle work' },
    { id: 'product-control', label: 'Product control at cuticle and sidewalls' },
    { id: 'consistent-shape', label: 'Consistent shape across all nails' },
    { id: 'surface-finish', label: 'Surface finish' },
    { id: 'finishing-steps', label: 'Final finishing steps' },
    { id: 'common-issues', label: 'Common cleanliness issues' },
  ],
  relatedSlugs: ['how-to-get-rid-of-air-bubbles-gel-polish', 'how-to-improve-nail-application-speed', 'how-to-do-nail-infill-without-bulk', 'nail-dehydrator-vs-primer'],
  faq: [
    { q: 'How long does it take to get truly clean sets consistently?', a: 'Consistency comes with practice — most nail techs notice significant improvement in cleanliness over their first 6–12 months of regular application. Deliberate practice (working slowly, checking your work, identifying exactly what\'s not clean and why) accelerates improvement more than volume alone. Being precise about what specifically needs to improve is more useful than just doing more sets.' },
    { q: 'Is it okay to clean up product with a small brush after application?', a: 'Yes — a small clean-up brush with an appropriate cleanser can tidy minor flooding at the cuticle or sidewalls before curing. This is standard practice. It\'s more efficient to apply cleanly in the first place (less time), but clean-up is a valid part of the workflow for minor adjustments.' },
    { q: 'My sets look clean when finished but messy after a week. What\'s happening?', a: 'Post-application lifting, flooding, or product-on-skin issues often become visible as the nail grows out. Product touching the skin at application looks fine initially but lifts within days, creating a visible mess at the cuticle. Clean application — no product touching skin at all — prevents this. Sets that look clean at application AND after growth are the goal.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="cuticle-work">
        <h2 className="font-serif text-2xl font-bold mb-4">Cuticle work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Clean cuticle work is the foundation of a clean set. Any cuticle tissue remaining on the nail plate becomes a gap between product and nail — visible immediately and a primary cause of early lifting.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Thorough cuticle removal from the nail plate (the pterygium — the thin skin that grows onto the nail plate) is essential for clean application</li>
          <li>Work methodically across every nail, not just the ones that look obvious</li>
          <li>After cuticle work, dust the nail plate and ensure no debris remains before applying product</li>
          <li>The margin between where product starts and the cuticle fold should be consistent and even — inconsistent margins look untidy</li>
        </ul>
      </section>

      <section id="product-control">
        <h2 className="font-serif text-2xl font-bold mb-4">Product control at cuticle and sidewalls</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Product touching the skin — even slightly — creates an immediate weak point and looks messy:</p>
        <ArticleTable
          headers={['Product placement issue', 'Effect']}
          rows={[
            ['Flooding the cuticle', 'Immediate lifting; product catches on skin and peels up'],
            ['Product on sidewalls', 'Skin contact creates lifting edges; looks unclean at sides'],
            ['Uneven margin at cuticle', 'One side closer than the other looks asymmetric and messy'],
            ['Product inside the nail arch', 'Product in the fold area cures poorly and creates pockets'],
          ]}
        />
        <ArticleTip>Apply product with a deliberate margin — closer is cleaner than flooding. 0.5–1mm from the cuticle and sidewall skin. Practice the margin, not just the coverage.</ArticleTip>
      </section>

      <section id="consistent-shape">
        <h2 className="font-serif text-2xl font-bold mb-4">Consistent shape across all nails</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Ten nails with inconsistent shapes — one slightly longer, one with a different arch, two sidewalls not quite symmetric — undermine an otherwise clean set. Shape consistency matters:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Shape all nails using the same reference — use the client's natural nail outline as a guide, and check nails against each other as you shape</li>
          <li>Check from the client's perspective (facing you) and from the side — inconsistencies are often more visible from one angle</li>
          <li>Finish one hand before moving to the other so you can compare</li>
          <li>Use consistent filing technique — same pressure, same angle, same number of strokes per nail</li>
        </ul>
      </section>

      <section id="surface-finish">
        <h2 className="font-serif text-2xl font-bold mb-4">Surface finish</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Even application thickness creates a smooth surface. Common surface issues:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Thick centre, thin edges:</strong> Product needs to cover the nail evenly — pay attention to coverage all the way to the sidewalls and tip</li>
          <li><strong>Streaks:</strong> Usually from brush technique — see the air bubbles guide for stroke technique</li>
          <li><strong>Uneven gloss:</strong> Inconsistent top coat application; check each nail in the same light before curing</li>
        </ul>
      </section>

      <section id="finishing-steps">
        <h2 className="font-serif text-2xl font-bold mb-4">Final finishing steps</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Wipe the inhibition layer:</strong> Gel polish typically has an inhibition layer (tacky residue) after the top coat cure — wipe according to your product's instructions for a clean finish</li>
          <li><strong>Cuticle oil:</strong> Applied at the end, it hydrates the skin and adds polish to the overall look; don't skip it</li>
          <li><strong>Final check in natural light:</strong> Check the set in natural light before the client leaves — artificial salon light hides things that daylight reveals</li>
          <li><strong>Clean any smudges or skin staining:</strong> Pigment or dust on the skin around the nail — wipe clean</li>
        </ul>
      </section>

      <section id="common-issues">
        <h2 className="font-serif text-2xl font-bold mb-4">Common cleanliness issues</h2>
        <ArticleTable
          headers={['Issue', 'Cause']}
          rows={[
            ['Flooding at cuticle', 'Too much product applied too close to the fold; brush too loaded'],
            ['Jagged sidewall edges', 'Product not applied evenly to sidewall edges; filing left rough edges'],
            ['Uneven shine', 'Top coat not applied evenly; lamp position affecting cure on edges'],
            ['Skin staining', 'Pigmented product contacting skin during application'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For improving your overall speed without sacrificing cleanliness: <Link to="/learn/how-to-improve-nail-application-speed" className="underline text-[#F52B8C]">how to improve your nail application speed</Link>.</p>
      </section>
    </div>
  ),
});
export {};
