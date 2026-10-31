import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-price-nail-services-for-profit',
  title: 'How to Price Nail Services for Profit',
  seoTitle: 'How to Price Nail Services for Profit (Step-by-Step Guide)',
  excerpt: 'Most nail techs price based on what others charge, not what they need to earn. Here\'s how to build a pricing strategy that actually pays you properly.',
  seoDescription: 'How to price nail services for profit. Calculate your costs, set minimum hourly rates, price each service correctly, and avoid the undercharging trap.',
  category: 'pricing-money',
  tags: ['nail pricing', 'profit', 'pricing strategy', 'nail business finances'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FCD34D 100%)',
  heroImageAlt: 'How to price nail services for profit',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'the-problem', label: 'The undercharging problem' },
    { id: 'cost-calculation', label: 'Step 1: Calculate your costs' },
    { id: 'target-income', label: 'Step 2: Set your target income' },
    { id: 'hourly-rate', label: 'Step 3: Calculate your minimum hourly rate' },
    { id: 'service-pricing', label: 'Step 4: Price each service' },
    { id: 'review-regularly', label: 'Step 5: Review regularly' },
  ],
  relatedSlugs: ['how-much-should-nail-tech-charge', 'when-should-nail-tech-raise-prices', 'nail-tech-pricing-guide'],
  faq: [
    { q: 'How do I calculate my hourly rate as a nail tech?', a: 'Take your monthly target income (what you need to take home after costs), add your monthly business costs, and divide by the number of hours per month you\'re in the chair. That gives you your minimum hourly rate. Don\'t forget to include set-up and clean-down time per client in your calculation — these are working hours too.' },
    { q: 'Should I include VAT in my nail prices?', a: 'UK nail techs only need to register for VAT when their turnover exceeds the VAT threshold (currently £90,000). Most solo nail techs will be well below this. Until you hit the threshold, you don\'t need to charge VAT. Once you approach it, speak to an accountant.' },
    { q: 'How much should I charge for nail art?', a: 'Nail art takes more time and skill than a plain colour finish. Common approaches: flat per-nail rate (£2–8 per nail depending on complexity), a flat add-on charge (£10–25 for a full design), or a custom quote for very complex designs. Be consistent and state your nail art pricing upfront.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="the-problem">
        <h2 className="font-serif text-2xl font-bold mb-4">The undercharging problem</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail techs set their prices by looking at what other nail techs in their area charge and pricing slightly below to be competitive. This approach leads to systematic undercharging because everyone is pricing based on everyone else — and collectively, the market undervalues the skill and time involved.</p>
        <p className="text-gray-700 leading-relaxed">The correct approach is to start with what you need to earn, then check whether the market supports it. Not the other way around.</p>
      </section>

      <section id="cost-calculation">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 1: Calculate your costs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">List every monthly business cost. Common ones for nail techs:</p>
        <ArticleTable
          headers={['Cost category', 'Examples']}
          rows={[
            ['Products and supplies', 'Gel, base/top coat, primer, brushes, files, foils, art products'],
            ['Disposables', 'Gloves, forms, wipes, lint-free pads'],
            ['Equipment', 'Lamp, drill, table, chair — amortised monthly'],
            ['Training and CPD', 'Courses, workshops, certifications — spread over months'],
            ['Insurance', 'Public liability, treatment liability'],
            ['Marketing', 'Ring light, photography props, social media tools'],
            ['Admin', 'Booking software, accounting software'],
            ['Rent', 'If you rent a chair or room (home studio = lower cost)'],
          ]}
        />
        <ArticleTip>Many nail techs underestimate product costs. Track your product spend for one month — the actual figure is usually higher than guessed, especially if you offer lots of nail art.</ArticleTip>
      </section>

      <section id="target-income">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 2: Set your target income</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">What do you need to take home per month? Include:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Personal living costs (rent/mortgage, food, bills, transport)</li>
          <li>Savings and emergency fund contributions</li>
          <li>Tax set-aside (roughly 20–25% of profit as a guide)</li>
          <li>Pension contributions</li>
          <li>Buffer for quiet months</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">This is your target income before tax but after business costs. Be honest — don't set it artificially low to justify existing prices.</p>
      </section>

      <section id="hourly-rate">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 3: Calculate your minimum hourly rate</h2>
        <ArticleCallout variant="info" title="The calculation">
          (Monthly costs + Target monthly income) ÷ Available working hours per month = Minimum hourly rate
        </ArticleCallout>
        <p className="text-gray-700 mt-4 mb-4 leading-relaxed">Available working hours = hours per week in the chair × 4. Don't include set-up/clean-down in your "in chair" hours — but do factor in that those hours are unpaid when calculating how many billable hours you actually have.</p>
        <p className="text-gray-700 leading-relaxed">Example: costs £400/month + target income £2,500 = £2,900 needed. 80 billable hours/month. Minimum hourly rate = £36.25. A 90-minute gel set must be priced at at least £54 to be profitable.</p>
      </section>

      <section id="service-pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 4: Price each service</h2>
        <ArticleSteps steps={[
          { title: 'Calculate minimum price per service', body: 'Multiply the service duration (including set-up/clean-down) by your minimum hourly rate. This is your floor — the minimum you can charge without losing money.' },
          { title: 'Add product cost', body: 'Estimate the product cost for that service. For a gel full set: gel, base coat, top coat, forms/tips, primer, files (disposable). This gets added to the hourly rate calculation.' },
          { title: 'Check against market', body: 'Compare your calculated price to what other nail techs in your area charge. If your price is competitive, great. If it\'s significantly above market, either your costs are high, your target income is above local market rates, or you need to position as premium.' },
          { title: 'Set your final price', body: 'At or above your minimum, ideally with some profit margin built in. Round to clean numbers (£45 not £44.50). Your prices should feel confident, not apologetic.' },
        ]} />
      </section>

      <section id="review-regularly">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 5: Review regularly</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Prices should be reviewed at least once a year. Costs go up (products, insurance, training). Your skill increases. Demand changes. If your costs have risen but your prices haven't, your effective hourly rate is falling.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Signals that it's time for a price review:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You haven't raised prices in 12+ months</li>
          <li>Your product/supply costs have gone up</li>
          <li>You're consistently fully booked</li>
          <li>You completed significant training that improved your skill level</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Full guide: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">When should a nail tech raise prices?</Link> | Pricing calculator: <Link to="/tools/nail-tech-pricing-calculator" className="underline text-[#F52B8C]">free nail tech pricing calculator</Link>.</p>
      </section>
    </div>
  ),
});
export {};
