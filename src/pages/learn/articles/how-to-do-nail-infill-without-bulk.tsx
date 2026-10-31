import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-do-nail-infill-without-bulk',
  title: 'How to Do a Nail Infill Without Making It Look Thick',
  seoTitle: 'How to Do a Nail Infill Without Making It Look Thick',
  excerpt: 'Bulky infills are one of the most common client complaints. Here\'s how to do nail infills that stay balanced and slim — not thicker with every appointment.',
  seoDescription: 'How to do nail infills without making them look thick. Infill technique for acrylic and builder gel, how to remove old product correctly, and rebalancing the apex.',
  category: 'nail-education',
  tags: ['nail infill technique', 'nail infill without bulk', 'acrylic infill tips', 'builder gel infill'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to do a nail infill without making it look thick',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-infills-bulk', label: 'Why infills become thick' },
    { id: 'filing-back', label: 'Filing back the old product' },
    { id: 'rebalancing', label: 'Rebalancing the apex' },
    { id: 'product-application', label: 'Product application at the infill zone' },
    { id: 'blending', label: 'Blending new and old product' },
    { id: 'different-services', label: 'Acrylic vs builder gel infill differences' },
  ],
  relatedSlugs: ['common-builder-gel-mistakes', 'how-to-make-nail-sets-look-cleaner', 'how-to-improve-nail-application-speed', 'how-to-price-acrylic-gel-x-builder-gel'],
  faq: [
    { q: 'How much old product should I remove at an infill?', a: 'Enough to bring the nail back to a balanced, appropriately thin profile before you add new product. The goal is to end the appointment with nails that look like a fresh set — not thicker than last time. If in doubt, err on the side of removing more product (creating the right canvas) rather than less (compounding bulk).' },
    { q: 'At what point should an infill become a full new set?', a: 'Generally: when the nail has grown out significantly (more than 4–5 weeks), when there\'s extensive lifting that makes the existing product unworkable, when the nail has broken significantly, or when the client wants a shape change. Some systems (like Gel-X) typically don\'t infill at all — the product is removed and a new set applied at each appointment.' },
    { q: 'Why do nails get thicker and thicker over successive infills?', a: 'Because not enough old product was removed before new product was added. Each infill session should bring the nail back to the right profile before applying new product. If you add product on top of existing product without filing back, you\'re adding a layer every 2–3 weeks — naturally creating cumulative bulk over time.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-infills-bulk">
        <h2 className="font-serif text-2xl font-bold mb-4">Why infills become thick</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Bulk accumulates because each infill session adds new product without removing enough of the old. After three or four infills without proper product removal, the nail becomes noticeably thick — not because of any single decision, but from small additions compounding over time.</p>
        <p className="text-gray-700 leading-relaxed">The fix is straightforward in principle: before adding new product, file back the existing product to restore the correct nail profile. The infill zone (the regrowth area) needs product; the rest of the nail should be filed to the right thickness before you begin.</p>
      </section>

      <section id="filing-back">
        <h2 className="font-serif text-2xl font-bold mb-4">Filing back the old product</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">This is the most important step in a bulk-free infill:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>File the existing product body (not just the regrowth area) to reduce the overall thickness before adding new product</li>
          <li>Pay particular attention to the area where new product will blend — the transition zone between regrowth and existing product</li>
          <li>Check thickness periodically while filing — it's easy to under-file and harder to know you've gone too far</li>
          <li>The nail should feel thin and look relatively flat (for the existing product body) before you start applying new product</li>
        </ul>
        <ArticleTip>Filing back can feel counterintuitive — you're removing work before adding it. Think of it as creating the right canvas. A nail that's been properly filed back will look significantly better after new product than one that wasn't.</ArticleTip>
      </section>

      <section id="rebalancing">
        <h2 className="font-serif text-2xl font-bold mb-4">Rebalancing the apex</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">As the nail grows, the apex (the strongest point, at the stress area of the nail) moves with the natural nail — away from where it was placed at the last appointment. Rebalancing means repositioning the apex to the correct location on the current length:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Identify where the stress point now falls — typically the area of most flex on the nail, usually around the smile line or slightly towards the free edge for most nail shapes</li>
          <li>New product should be applied with the apex at the correct position — not in the same location as last time if the nail has grown significantly</li>
          <li>A nail with the apex too close to the cuticle (where it was placed weeks ago) is mechanically weaker as the nail grows</li>
        </ul>
      </section>

      <section id="product-application">
        <h2 className="font-serif text-2xl font-bold mb-4">Product application at the infill zone</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Apply new product specifically to the regrowth zone — not across the entire nail (the existing product body is already there)</li>
          <li>Apply the correct amount to build the new growth zone to the right profile, then feather out toward the existing product</li>
          <li>Less product is needed at an infill than at a full set — the existing nail body just needs a blend, not a rebuild</li>
        </ul>
        <ArticleCallout variant="info" title="Visual check">
          After filing and before applying product, hold the nail sideways (profile view) and check the thickness along the whole nail. Does it taper appropriately from apex to free edge? Does it show an even, slim profile? This is the shape you're aiming to maintain after the infill.
        </ArticleCallout>
      </section>

      <section id="blending">
        <h2 className="font-serif text-2xl font-bold mb-4">Blending new and old product</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The transition between new and existing product should be invisible. A visible ridge or step is a blending failure:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Feather new product into the existing body — thin applications that taper at the edges blend better than thick applications that stop abruptly</li>
          <li>After product application, check for ridges before curing or before the product sets (for acrylic)</li>
          <li>Filing after the product sets: use finishing files to smooth any ridge between new and old product</li>
          <li>If a ridge is visible after buffing, you'll see it under top coat — address it at the filing stage, not after</li>
        </ul>
      </section>

      <section id="different-services">
        <h2 className="font-serif text-2xl font-bold mb-4">Acrylic vs builder gel infill differences</h2>
        <ArticleTable
          headers={['', 'Acrylic infill', 'Builder gel infill']}
          rows={[
            ['Product removal approach', 'File back; same product type over existing', 'File back; gel applied over prepared surface'],
            ['Blending challenge', 'Ratio must be correct in infill zone for right consistency', 'Self-levelling helps; product tends to flow into transitions'],
            ['Apex rebalancing', 'Apply new product with apex in correct position', 'Apply new product with apex in correct position'],
            ['Time typical', 'Longer than BIAB due to setting time and more extensive shaping', 'Generally quicker if the existing product base is in good condition'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For builder gel application technique and specific errors: <Link to="/learn/common-builder-gel-mistakes" className="underline text-[#F52B8C]">common builder gel mistakes and how to fix them</Link>.</p>
      </section>
    </div>
  ),
});
export {};
