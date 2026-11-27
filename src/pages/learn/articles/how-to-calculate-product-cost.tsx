import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-to-calculate-product-cost',
  title: 'How to Calculate Product Cost Per Nail Appointment',
  coverTitle: 'Product Cost Per Set',
  seoTitle: 'How to Calculate Product Cost Per Nail Appointment',
  excerpt: 'Knowing your product cost per service is fundamental to profitable pricing. Here\'s how to calculate it, and how to use the number to set prices that actually make money.',
  seoDescription: 'How to calculate product cost per nail appointment. Step-by-step guide for nail techs: track product usage, calculate cost per service, and set profitable prices.',
  category: 'pricing-money',
  audience: ['pros'],
  craft: 'nails',
  tags: ['nail tech pricing', 'product cost calculation', 'nail business costs', 'nail tech profit'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #A7F3D0 100%)',
  heroImageAlt: 'How to calculate product cost per nail appointment',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'Product cost per appointment = for each product, (pack price ÷ uses per pack) × uses per service, added up, plus about 15% for waste.',
    detail: 'In the worked example below, a gel manicure costs about £2.25 in products. That number is only one part of your price: add your time and a share of your monthly overheads to find your minimum price.',
    points: [
      { label: 'Step 1', text: 'Cost per use = pack price ÷ number of uses (a £12 base coat for 80 uses = £0.15).' },
      { label: 'Step 2', text: 'Add every product and disposable used in the service, then add 10 to 15% waste.' },
      { label: 'Step 3', text: 'Minimum price = product cost + time cost + overhead per client, then add profit.' },
    ],
  },
  toc: [
    { id: 'why-it-matters', label: 'Why product cost matters for pricing' },
    { id: 'what-to-include', label: 'What to include in your product cost' },
    { id: 'calculation-method', label: 'How to calculate cost per service' },
    { id: 'worked-example', label: 'Worked example' },
    { id: 'using-the-number', label: 'Using the number to price correctly' },
  ],
  relatedSlugs: ['how-to-price-nail-services-for-profit', 'how-much-should-nail-tech-charge', 'nail-tech-price-list-examples', 'how-to-increase-appointment-value'],
  faq: [
    { q: 'What percentage of my nail appointment price should be product cost?', a: 'There is no official figure, and the share varies a lot by service: a gel manicure uses little product, while extensions use much more. In the example in this article, product is about 6% of a £38 gel manicure. The more useful test is whether your price covers product, your time and your overheads with profit left over. If product is a large share of the price, check your usage and supplier prices first, then your price.' },
    { q: 'Do I need to track every drop of product?', a: 'No, a reasonable estimate is enough. For bottles, note the date you open one and the date it runs out, count the clients in between, and divide: a £12 bottle that lasts 80 clients costs £0.15 per client. Do this once for your main products and update it when you change brands or prices.' },
    { q: 'How do I account for product waste?', a: 'Add a 10 to 15% waste factor to your total. It covers product left on the brush, gel that thickens, spills and expired bottles. If you compare your monthly product spend with your estimate and the real spend is higher, increase the factor.' },
    { q: 'Should I include my lamp, drill and furniture in product cost?', a: 'No. Equipment that lasts months or years belongs in overheads. Spread it over its life: example, a £180 drill expected to last 2 years is £7.50 a month, which you add to your monthly overheads before dividing by your client count.' },
  ],
  relatedFeatureSlugs: ['payments', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-it-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why product cost matters for pricing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many nail techs set prices based on what competitors charge or what feels &quot;reasonable&quot;, without ever calculating what the service costs to deliver. The result can be prices that look competitive but leave little profit after materials, time and overheads.</p>
        <p className="text-gray-700 leading-relaxed">Knowing your product cost per service lets you calculate your real margin, see which services earn the most per hour, and justify your prices to yourself (and to the occasional client who pushes back).</p>
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
        <ArticleTip>Don&apos;t forget consumables like files and buffers. If you use them hygienically (single-use files and buffers per client), they are often the biggest line in a gel manicure, as the example below shows.</ArticleTip>
      </section>

      <section id="calculation-method">
        <h2 className="font-serif text-2xl font-bold mb-4">How to calculate cost per service</h2>
        <ArticleSteps
          steps={[
            { title: 'List every product used for that service', body: 'Walk through one appointment from prep to cuticle oil and write down everything you touch, including wipes and gloves.' },
            { title: 'Calculate cost per use', body: 'Divide the pack price by the number of uses you get from it. Example: a £12 bottle of base coat that lasts 80 clients = £12 ÷ 80 = £0.15 per use.' },
            { title: 'Count uses per service', body: 'One coat of base = 1 use; two coats of colour = 2 uses. For bulk products like acetone, estimate how many clients one bottle covers.' },
            { title: 'Add up the per-service costs', body: 'Cost per use × uses per service, for every line. The total is your raw product cost for that service.' },
            { title: 'Add a 10 to 15% waste factor', body: 'Multiply the total by 1.10 to 1.15 for product that never makes it onto the nail.' },
          ]}
        />
      </section>

      <section id="worked-example">
        <h2 className="font-serif text-2xl font-bold mb-4">Worked example: gel manicure</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Example prices only. Replace them with what you actually pay.</p>
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
        <p className="text-gray-700 mt-4 mb-2 leading-relaxed"><strong>Subtotal:</strong> 0.05 + 0.10 + 0.15 + 0.40 + 0.15 + 0.50 + 0.40 + 0.15 + 0.06 = <strong>£1.96</strong></p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>With 15% waste factor:</strong> £1.96 × 1.15 = <strong>about £2.25</strong></p>
        <ArticleCallout variant="info" title="Interpretation">
          A gel manicure at £38 with about £2.25 of product means product is 2.25 ÷ 38 = about 6% of the price. At £20, the same product would be about 11%, leaving much less room for your time and overheads.
        </ArticleCallout>
      </section>

      <section id="using-the-number">
        <h2 className="font-serif text-2xl font-bold mb-4">Using the number to price correctly</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Product cost is one part of your total cost per service. The full formula:</p>
        <ArticleCallout variant="info" title="Full service cost formula">
          Total cost = product cost + time cost + overhead per client<br />
          Time cost = (service minutes ÷ 60) × your target hourly rate<br />
          Overhead per client = monthly overheads (space, insurance, software, equipment, marketing) ÷ clients per month<br />
          Minimum price = total cost + your profit margin
        </ArticleCallout>
        <ArticleCallout variant="success" title="Example: pricing the gel manicure">
          Example: product £2.25. Time: 60 minutes at a £25 target hourly rate = £25. Overheads: £300 a month ÷ 80 clients = £3.75.<br />
          Total cost = 2.25 + 25 + 3.75 = <strong>£31</strong>.<br />
          With a 20% profit margin on top: £31 × 1.20 = £37.20, rounded to <strong>£38</strong>.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Run this for each service with the <Link to="/tools/nail-tech-pricing-calculator" className={link}>nail tech pricing calculator</Link>. See also: <Link to="/blog/how-to-price-nail-services-for-profit" className={link}>how to price nail services for profit</Link>.</p>
      </section>
    </div>
  ),
});
export {};
