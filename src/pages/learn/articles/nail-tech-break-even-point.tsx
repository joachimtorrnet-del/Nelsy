import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-break-even-point',
  title: 'How to Calculate Your Break-Even Point as a Nail Tech',
  seoTitle: 'How to Calculate Your Break-Even Point as a Nail Tech',
  excerpt: 'Your break-even point is the minimum you need to earn to cover your costs. Once you know it, you can price with confidence and plan with clarity.',
  seoDescription: 'How to calculate your break-even point as a nail tech. Formula, worked example, and how to use your break-even to make better pricing and capacity decisions.',
  category: 'pricing-money',
  tags: ['nail tech break-even', 'nail business costs', 'nail tech pricing', 'nail business finances'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'How to calculate break-even point as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-break-even', label: 'What break-even means' },
    { id: 'formula', label: 'The formula' },
    { id: 'worked-example', label: 'Worked example' },
    { id: 'using-it', label: 'How to use your break-even number' },
    { id: 'improving', label: 'Lowering your break-even' },
  ],
  relatedSlugs: ['nail-tech-profit-margin-explained', 'nail-tech-expense-list', 'nail-tech-monthly-income-calculator', 'how-to-calculate-nail-tech-hourly-rate'],
  faq: [
    { q: 'What\'s the difference between break-even and profit?', a: 'At break-even, your revenue exactly covers your costs — you neither profit nor lose money. Any revenue above your break-even point is profit. Below it, you\'re making a loss (spending more on the business than it generates). Break-even is the floor; your profit goal is the target above it.' },
    { q: 'Should I include my own income in break-even?', a: 'It depends on what you\'re trying to measure. A pure break-even (covering business costs only) tells you the minimum revenue to keep the business operational. A "personal break-even" (covering business costs + your desired income + tax) tells you how much you need to earn to actually live on this income. For practical nail business planning, calculate both — the business break-even first, then the personal break-even that includes your income target.' },
    { q: 'How often should I recalculate my break-even?', a: 'Whenever your costs change significantly: you move spaces, your insurance renews at a different rate, you add a new subscription, or your product costs shift. Otherwise, an annual review is sufficient. Costs tend to creep up over time — an annual break-even review catches this before it erodes your margin without you noticing.' },
  ],
  relatedFeatureSlugs: ['analytics', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-break-even">
        <h2 className="font-serif text-2xl font-bold mb-4">What break-even means</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your break-even point is the revenue your business needs to generate to cover all its costs — products, rent, insurance, software, everything. Below this level, you're running at a loss. Above it, you're profitable.</p>
        <p className="text-gray-700 leading-relaxed">Knowing your break-even answers practical questions: How many clients do I need per week to cover my costs? If I take a week off, what do I lose? Is this pricing sustainable? It gives you a solid floor to stand on when making business decisions.</p>
      </section>

      <section id="formula">
        <h2 className="font-serif text-2xl font-bold mb-4">The formula</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail tech break-even is straightforward:</p>
        <ArticleCallout variant="info" title="Break-even formula">
          Monthly break-even revenue = Fixed monthly costs ÷ (1 − Variable cost as % of revenue)
        </ArticleCallout>
        <p className="text-gray-700 mt-4 mb-4 leading-relaxed">Or more simply for nail techs:</p>
        <ArticleCallout variant="info" title="Simplified version">
          Monthly break-even = Fixed costs + (Product cost per client × Number of clients needed)
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">In practice, most nail techs benefit from a simpler approach: total up all your monthly costs, then work out how many clients at your average price it takes to cover them.</p>
      </section>

      <section id="worked-example">
        <h2 className="font-serif text-2xl font-bold mb-4">Worked example</h2>
        <ArticleTable
          headers={['Fixed monthly cost', 'Amount']}
          rows={[
            ['Chair rent', '£400'],
            ['Insurance', '£28'],
            ['Booking software', '£20'],
            ['Training (averaged)', '£50'],
            ['Other fixed costs', '£30'],
            ['Total fixed monthly costs', '£528'],
          ]}
        />
        <ArticleTable
          headers={['Variable cost', 'Per appointment']}
          rows={[
            ['Product cost estimate', '£5'],
            ['Card processing fee (estimated)', '£1.50'],
            ['Other per-appointment cost', '£0.50'],
            ['Total variable cost per appointment', '£7'],
          ]}
        />
        <p className="text-gray-700 my-4 leading-relaxed">At an average appointment price of £45:</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Contribution per appointment = £45 − £7 = £38 (per client, towards fixed costs and profit)</p>
        <p className="text-gray-700 leading-relaxed">Break-even clients per month = £528 ÷ £38 = <strong>14 clients per month</strong> (approximately)</p>
        <p className="text-gray-700 mt-4 leading-relaxed">At 14 clients per month (roughly 3.5 per week), this example business breaks even. Every client above 14 generates profit. These figures are illustrative — your numbers will differ.</p>
      </section>

      <section id="using-it">
        <h2 className="font-serif text-2xl font-bold mb-4">How to use your break-even number</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Pricing floor:</strong> Your price must be above variable costs — a service priced below its own material cost creates a loss before fixed costs are even considered</li>
          <li><strong>Capacity planning:</strong> "I break even at 14 clients/month, and I want to take a week off in August — I need to cover that across the other 3 weeks"</li>
          <li><strong>Risk assessment:</strong> "If I only see 10 clients next month (quiet season), I'll be £152 below break-even — I need to plan for this"</li>
          <li><strong>Pricing changes:</strong> If you raise your average appointment value, your break-even client count drops — you need fewer clients to cover the same costs</li>
        </ul>
      </section>

      <section id="improving">
        <h2 className="font-serif text-2xl font-bold mb-4">Lowering your break-even</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Lowering your break-even gives you more financial cushion — fewer clients needed to cover costs, more profit from every client above that floor:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Raise average appointment value:</strong> Higher prices reduce the number of clients needed to break even</li>
          <li><strong>Reduce fixed costs:</strong> Negotiate rent, switch to a lower-cost insurance provider, audit subscriptions</li>
          <li><strong>Reduce product waste:</strong> Every pound of unnecessary waste adds to your per-appointment variable cost</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For the revenue goal side of the equation: <Link to="/learn/nail-tech-revenue-goals" className="underline text-[#F52B8C]">nail tech revenue goals: how to set them</Link>.</p>
      </section>
    </div>
  ),
});
export {};
