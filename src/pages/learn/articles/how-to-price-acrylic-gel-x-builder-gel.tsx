import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-price-acrylic-gel-x-builder-gel',
  title: 'How to Price Acrylic, Gel-X and Builder Gel Differently',
  seoTitle: 'How to Price Acrylic, Gel-X and Builder Gel — Service Pricing Guide',
  excerpt: 'Acrylic, Gel-X, and builder gel (BIAB) are different products with different costs, application times, and client outcomes. Here\'s how to price them to reflect that.',
  seoDescription: 'How to price acrylic, Gel-X and builder gel nail services. Factors that affect pricing each enhancement type, worked examples, and how to structure an enhancement price list.',
  category: 'pricing-money',
  tags: ['nail enhancement pricing', 'acrylic nail pricing', 'gel-x pricing', 'builder gel pricing'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'How to price acrylic, gel-x and builder gel',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'factors', label: 'What drives pricing for each type' },
    { id: 'acrylic', label: 'Pricing acrylics' },
    { id: 'gel-x', label: 'Pricing Gel-X' },
    { id: 'builder-gel', label: 'Pricing builder gel / BIAB' },
    { id: 'infills', label: 'Infill and maintenance pricing' },
    { id: 'structuring', label: 'Structuring your enhancement menu' },
  ],
  relatedSlugs: ['nail-tech-price-list-examples', 'how-to-create-nail-service-menu', 'how-to-price-nail-art-add-ons', 'how-to-calculate-product-cost'],
  faq: [
    { q: 'Should Gel-X be more or less expensive than acrylics?', a: 'It depends on your time, skill level, and product costs — not a general rule. Gel-X typically requires less filing and shaping time, which might make it faster and therefore equal or lower in time cost. But the product cost of Gel-X (the pre-formed extensions + gel adhesive system) may be different from your acrylic costs. Calculate from your own time and materials, not from what you\'ve seen others charge.' },
    { q: 'Should I charge more for longer nails?', a: 'Yes — longer nails typically require more product, more time, and more shaping work. A common approach is a base price for a standard length and an upsell for extra length ("long length + £5–£10"). Some nail techs price by nail length band (short/medium/long/extra long). Either approach works — just make sure your long nail price covers your actual extra time and materials.' },
    { q: 'Why does BIAB sometimes cost more than gel polish at salons?', a: 'BIAB (builder gel) uses more product than a standard gel polish coat, takes more application time and skill to shape correctly, and produces a result that lasts significantly longer with better strength. The premium reflects product cost, skill requirement, and the enhanced result — not just the product name.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="factors">
        <h2 className="font-serif text-2xl font-bold mb-4">What drives pricing for each type</h2>
        <ArticleTable
          headers={['Factor', 'Acrylic', 'Gel-X', 'Builder Gel / BIAB']}
          rows={[
            ['Product cost per set', 'Monomer + polymer + tips/forms; varies by brand', 'Pre-formed extensions + adhesive gel; can be higher per set', 'Builder gel product; typically moderate cost'],
            ['Application time', 'Longer for full set; experienced tech may be 90–120 min', 'Can be faster for experienced tech; 60–90 min typical', '45–75 min for natural nail overlay / short enhancements'],
            ['Skill requirement', 'High; ratio, apex, shaping all require significant skill', 'Moderate; less shaping but sizing and cure are key', 'Moderate to high; self-levelling helps but apex building matters'],
            ['Infill complexity', 'Significant — infills require technical skill', 'Gel-X typically removed and replaced rather than infilled', 'Infills straightforward once familiar; rebalancing required'],
          ]}
        />
      </section>

      <section id="acrylic">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing acrylics</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Acrylics are typically the most labour-intensive and skill-dependent enhancement service. Pricing should reflect:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Full set application time (typically the longest of the three for most techs)</li>
          <li>Monomer and polymer product cost</li>
          <li>Tips or forms (tips are typically cheaper; forms add time but better customisation)</li>
          <li>Finishing: shaping, filing, buffing time</li>
        </ul>
        <ArticleTip>Calculate your acrylic product cost per set using the method in the product cost guide — monomer and polymer are relatively inexpensive per set for experienced techs, but consumables (files, buffers, forms/tips, disposables) add up. Include them in your calculation.</ArticleTip>
      </section>

      <section id="gel-x">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing Gel-X</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Gel-X is a softer extension system that uses pre-formed gel tips with a gel adhesive. Key pricing considerations:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Pre-formed tip product cost (Apres or equivalent brands tend to be more expensive per set than basic acrylic supplies)</li>
          <li>Application time — faster for an experienced tech once sizing becomes intuitive</li>
          <li>Removal: Gel-X is typically removed (soaked off or filed off) and replaced rather than infilled — this affects your pricing structure (full price per appointment rather than an infill tier)</li>
        </ul>
        <ArticleCallout variant="info" title="Gel-X removal and replacement">
          Because Gel-X is typically replaced rather than infilled, your price list usually shows one Gel-X set price (not a separate infill price). Some techs offer a maintenance appointment at a lower price — check your product training for guidance on the intended maintenance approach.
        </ArticleCallout>
      </section>

      <section id="builder-gel">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing builder gel / BIAB</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Builder gel (BIAB) is typically applied as an overlay or short enhancement on the natural nail. It's often priced higher than standard gel polish to reflect the extra product, time, and skill involved:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Builder gel product cost (typically more product per nail than standard gel polish)</li>
          <li>Application time: similar to gel manicure but with additional build and shape time</li>
          <li>Infill appointments at 3–4 week intervals: typically simpler than acrylic infills but still require rebalancing</li>
        </ul>
      </section>

      <section id="infills">
        <h2 className="font-serif text-2xl font-bold mb-4">Infill and maintenance pricing</h2>
        <ArticleTable
          headers={['Service', 'Typical pricing relationship']}
          rows={[
            ['Acrylic infill', '60–75% of full set price is common; reflects less product and time than a full set'],
            ['BIAB infill', 'Similar logic — lower than a fresh set; accounts for rebalancing and colour change'],
            ['Gel-X', 'Typically full set pricing each time; no separate infill tier for most techs'],
          ]}
        />
      </section>

      <section id="structuring">
        <h2 className="font-serif text-2xl font-bold mb-4">Structuring your enhancement menu</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Keep it clear — clients shouldn't need to calculate or guess:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>List each enhancement type separately with full set price</li>
          <li>List infill prices for services that have them (acrylic, BIAB)</li>
          <li>Note what's included (e.g. "gel colour included" or "add a gel colour from £X")</li>
          <li>List length upgrades if you price by length</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For full price list examples: <Link to="/learn/nail-tech-price-list-examples" className="underline text-[#F52B8C]">nail tech price list examples</Link>. For calculating exact product costs: <Link to="/learn/how-to-calculate-product-cost" className="underline text-[#F52B8C]">how to calculate your nail product cost</Link>.</p>
      </section>
    </div>
  ),
});
export {};
