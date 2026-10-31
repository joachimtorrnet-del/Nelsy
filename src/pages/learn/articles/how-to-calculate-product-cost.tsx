import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-calculate-product-cost',
  title: 'How to Calculate Product Cost Per Nail Appointment',
  seoTitle: 'How to Calculate Product Cost Per Nail Appointment',
  excerpt: 'Knowing your product cost per service is fundamental to profitable pricing. Here\'s how to calculate it — and how to use the number to set prices that actually make money.',
  seoDescription: 'How to calculate product cost per nail appointment. Step-by-step guide for nail techs — track product usage, calculate cost per service, and use it to set profitable prices.',
  category: 'pricing-money',
  tags: ['nail tech pricing', 'product cost calculation', 'nail business costs', 'nail tech profit'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #A7F3D0 100%)',
  heroImageAlt: 'How to calculate product cost per nail appointment',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-it-matters', label: 'Why product cost matters for pricing' },
    { id: 'what-to-include', label: 'What to include in your product cost' },
    { id: 'calculation-method', label: 'How to calculate cost per service' },
    { id: 'worked-example', label: 'Worked example' },
    { id: 'using-the-number', label: 'Using the number to price correctly' },
  ],
  relatedSlugs: ['how-to-price-nail-services-for-profit', 'how-much-should-nail-tech-charge', 'nail-tech-price-list-examples', 'how-to-increase-appointment-value'],
  faq: [
    { q: 'What percentage of my nail appointment price should be product cost?', a: 'A common benchmark in beauty services is 10–15% of the service price as product cost. If your gel manicure is £40, product cost of £4–6 is in a healthy range. If your product cost is 25–30% of the service price, your pricing may need review. These are guidelines rather than rules — the more important metric is whether your total costs (product + time + overheads) are covered by your prices with a meaningful profit margin remaining.' },
    { q: 'Do I need to track every drop of product?', a: 'No — but you do need a reasonable estimate. Weighing product before and after a service a few times to establish an average is more accurate than guessing. For products you use in larger quantities (base coat, top coat, dehydrator), tracking per-bottle usage over a week and dividing by client count gives a reliable average without obsessive tracking.' },
    { q: 'How do I account for product waste?', a: 'Build a 10–15% waste factor into your product cost estimates. Some product is lost in the process — product brushed onto the cuticle and removed, colours that dry before use, products that expire. If you notice your actual costs are higher than estimated, increase the waste factor.' },
  ],
  relatedFeatureSlugs: ['payments', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-it-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why product cost matters for pricing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many nail techs set prices based on what competitors charge, what clients expect, or what feels "reasonable" — without ever calculating what their service actually costs to deliver. The result is prices that may look competitive but leave very little profit after materials, time, and overheads are accounted for.</p>
        <p className="text-gray-700 leading-relaxed">Knowing your product cost per service is the foundation of profitable pricing. It lets you calculate your actual profit margin, identify which services are more profitable, and confidently justify your prices to yourself (and occasionally to clients who push back).</p>
      </section>

      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What to include in your product cost</h2>
        <ArticleTable
          headers={['Product category', 'Examples', 'Notes']}
          rows={[
            ['Prep products', 'Dehydrator, primer, nail dust removal', 'Low cost per use but used every service'],
            ['Base products', 'Base coat, BIAB, builder gel', 'Higher cost; heavier usage'],
            ['Colour', 'Gel polish, chrome powder, pigments', 'Variable; depends on colour frequency'],
            ['Topcoat', 'Top coat, matte topcoat, no-wipe topcoat', 'Used every service'],
            ['Extension materials', 'Acrylic powder/liquid, Gel-X tips, forms', 'High cost; only for extension services'],
            ['Consumables', 'Files, buffers, lint-free wipes, foil, gloves', 'Per-client cost; replace regularly'],
            ['Solvents/removers', 'Acetone, isopropyl alcohol, cleanser', 'Low per-use cost; used every service'],
          ]}
        />
        <ArticleTip>Don\'t forget consumables like files and buffers — they\'re per-client costs if you use them hygienically (single-use emery boards, buffer blocks per client). These add up across a week of clients.</ArticleTip>
      </section>

      <section id="calculation-method">
        <h2 className="font-serif text-2xl font-bold mb-4">How to calculate cost per service</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The method:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4">
          <li><strong>List every product used for that service</strong> — be thorough. Every brush-full counts.</li>
          <li><strong>Calculate cost per unit of each product</strong> — divide the product price by the number of uses you get from it. Example: a £12 bottle of base coat lasts 80 uses = £0.15 per use.</li>
          <li><strong>Estimate quantity used per service</strong> — one coat of base coat = 1 use; two coats of colour = 2 uses. For bulk products (like acetone), weigh before and after or estimate volume.</li>
          <li><strong>Add up all per-service costs</strong> — this is your product cost for that specific service.</li>
          <li><strong>Add a 10–15% waste factor</strong> — to account for product that doesn\'t make it onto the nail.</li>
        </ol>
      </section>

      <section id="worked-example">
        <h2 className="font-serif text-2xl font-bold mb-4">Worked example: gel manicure</h2>
        <ArticleTable
          headers={['Product', 'Pack price', 'Uses per pack', 'Cost per use', 'Uses per service', 'Service cost']}
          rows={[
            ['Nail dehydrator', '£8', '150', '£0.05', '1', '£0.05'],
            ['Primer', '£10', '100', '£0.10', '1', '£0.10'],
            ['Base coat', '£12', '80', '£0.15', '1', '£0.15'],
            ['Gel colour (2 coats)', '£8', '40', '£0.20', '2', '£0.40'],
            ['Top coat', '£12', '80', '£0.15', '1', '£0.15'],
            ['Disposable file', '£0.50 each', '1', '£0.50', '1', '£0.50'],
            ['Disposable buffer', '£0.40 each', '1', '£0.40', '1', '£0.40'],
            ['Lint-free wipes', '£5 per 100', '1', '£0.05', '3', '£0.15'],
            ['Gloves', '£6 per 100', '1', '£0.06', '1', '£0.06'],
          ]}
        />
        <p className="text-gray-700 mt-4 mb-2 leading-relaxed"><strong>Subtotal: ~£1.96</strong></p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>With 15% waste factor: ~£2.25</strong></p>
        <ArticleCallout variant="info" title="Interpretation">
          A gel manicure at £38 with a ~£2.25 product cost means product represents about 6% of the service price. This is healthy. If the price were £20, product cost would be 11% — still manageable but leaving less room for profit after time and overheads.
        </ArticleCallout>
      </section>

      <section id="using-the-number">
        <h2 className="font-serif text-2xl font-bold mb-4">Using the number to price correctly</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Product cost is one component of your total cost per service. The full calculation:</p>
        <ArticleCallout variant="info" title="Full service cost formula">
          Total cost = Product cost + Time cost + Overhead allocation{'\n\n'}
          Product cost: as calculated above{'\n'}
          Time cost: (service duration ÷ 60) × your target hourly rate{'\n'}
          Overhead allocation: your monthly costs (rent/space, insurance, equipment, marketing) ÷ monthly client count{'\n\n'}
          Your minimum price = Total cost + desired profit margin
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Use the <Link to="/tools/nail-tech-pricing-calculator" className="underline text-[#F52B8C]">nail tech pricing calculator</Link> to run this calculation for each service. See also: <Link to="/learn/how-to-price-nail-services-for-profit" className="underline text-[#F52B8C]">how to price nail services for profit</Link>.</p>
      </section>
    </div>
  ),
});
export {};
