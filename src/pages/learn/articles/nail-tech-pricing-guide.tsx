import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import {
  ArticleCallout,
  ArticleTip,
  ArticleTable,
  ArticleChecklist,
  ArticleSteps,
  ArticleCTAInline,
} from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-pricing-guide',
  title: 'Nail Tech Pricing Guide: How to Set Your Rates and Charge What You\'re Worth',
  seoTitle: 'Nail Tech Pricing Guide: How to Set Your Rates and Charge What You\'re Worth',
  excerpt:
    'A complete guide to pricing your nail services — cost-based pricing, market positioning, structuring your service menu, pricing nail art, and how to raise your prices.',
  seoDescription:
    'How to price your nail tech services correctly — from cost-based pricing and market positioning to structuring your menu, pricing nail art, and raising your rates without losing clients.',
  category: 'pricing-money',
  tags: ['pricing', 'rates', 'service menu', 'nail art', 'raise prices', 'income'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 70%, #FDBA74 100%)',
  heroImageAlt: 'Nail tech pricing guide',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-09-20',
  updatedAt: '2026-10-20',
  spotlight: true,
  toc: [
    { id: 'why-pricing-matters', label: '1. Why pricing matters beyond income' },
    { id: 'cost-based-pricing', label: '2. Start with cost-based pricing' },
    { id: 'what-to-include', label: '3. What costs to include' },
    { id: 'market-positioning', label: '4. Market positioning' },
    { id: 'service-menu', label: '5. Structuring your service menu' },
    { id: 'nail-art-pricing', label: '6. Pricing nail art and add-ons' },
    { id: 'raising-prices', label: '7. How to raise your prices' },
    { id: 'showing-prices', label: '8. Displaying prices on your booking page' },
    { id: 'useful-resources', label: 'Useful resources' },
  ],
  relatedSlugs: ['how-to-get-more-nail-clients', 'nail-tech-deposit-policy'],
  faq: [
    {
      q: 'How do I know if my nail prices are too low?',
      a: "If you're fully booked but feel underpaid, if you're turning away bookings more than a week out, or if your prices haven't changed in over a year while your costs have, your prices are likely too low. Being fully booked at low prices means you've underpriced yourself — demand is high enough to support an increase.",
    },
    {
      q: 'Should I list my prices on Instagram?',
      a: 'Yes. Clients who know your prices before enquiring are higher intent and less likely to be deterred by a quote later. Hiding prices reduces enquiries overall. Put your starting prices in your bio or a Highlights story.',
    },
    {
      q: 'How much should I charge for nail art?',
      a: 'Simple nail art (1–2 fingers, basic design) is usually £5–10 extra. Complex nail art (full hand, hand-painted characters, 3D) warrants £15–40 or more. Charge per finger for custom designs, and be clear in your booking form what\'s included in the base price.',
    },
    {
      q: 'How do I raise my prices without losing clients?',
      a: "Give 4–8 weeks notice via your booking page, Instagram and confirmation messages. Explain that your costs have increased. Most loyal clients will stay — and the ones who leave at a modest increase were the price-sensitive clients least likely to become long-term regulars anyway.",
    },
  ],
  relatedFeatureSlugs: ['payments', 'bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">

      <section id="why-pricing-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Why pricing matters beyond income</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Pricing signals positioning. A nail tech charging £20 for a full gel set is not competing with one charging £55 — they attract different clients, have different expectations, and deliver different experiences. Underpricing doesn't just hurt your income; it attracts clients who are harder to retain, more likely to complain, and least likely to respect your time.
        </p>
        <ArticleCallout variant="info" title="The underpricing trap">
          Most nail techs underprice when they start to attract clients and never raise prices because they fear losing them. The result: a fully booked calendar at rates that don't support a sustainable business. Getting off this treadmill is harder than starting at the right price.
        </ArticleCallout>
      </section>

      <section id="cost-based-pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Start with cost-based pricing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Cost-based pricing means setting a minimum floor — the price below which you lose money. Your actual price will be above this floor based on positioning, but you need to know the floor first.
        </p>
        <ArticleSteps
          steps={[
            {
              title: 'Calculate your hourly cost',
              body: 'Total your monthly fixed costs (products, tools, insurance, platform fees, rent if applicable). Divide by working hours per month. This is your cost per hour.',
            },
            {
              title: 'Add product cost per service',
              body: 'Estimate the product cost for each service type (gel polish, tips, nail art supplies). Many nail techs undercount this — include everything: files, forms, nail prep, top coat.',
            },
            {
              title: 'Factor in your time target',
              body: 'Decide what hourly rate you want to earn for your labour. Add this to your cost. The total divided by the typical service duration is your minimum price.',
            },
            {
              title: 'Add a margin for the unexpected',
              body: 'Price at least 15–20% above cost floor. Equipment breaks. Slow periods happen. You need a buffer.',
            },
          ]}
        />
      </section>

      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">3. What costs to include</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Many nail techs under-count costs and then wonder why they feel underpaid despite being booked. These are the costs most commonly forgotten:
        </p>
        <ArticleTable
          headers={['Cost category', 'Examples', 'Often forgotten?']}
          rows={[
            ['Products per service', 'Gel, tips, base/top coat, nail prep, foils', 'Rarely'],
            ['Consumables', 'Files, lint-free wipes, forms, nail tape', 'Often'],
            ['Equipment depreciation', 'UV/LED lamp, drill, e-file bits', 'Very often'],
            ['Platform/booking fees', 'Booking app subscription, payment processing fees', 'Often'],
            ['Insurance', 'Professional liability insurance (required for mobile/salon)', 'Sometimes'],
            ['Marketing', 'Instagram tools, professional photography, print materials', 'Very often'],
            ['Continuing education', 'Courses, new technique training', 'Almost always'],
            ['Unpaid time', 'Admin, messages, social media, cleaning up', 'Almost always'],
          ]}
        />
        <ArticleTip>
          Track your product spend for one month by keeping receipts. Most nail techs are surprised how much more they spend than they estimated.
        </ArticleTip>
      </section>

      <section id="market-positioning">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Market positioning and local rates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          After establishing your cost floor, research local rates to understand where you sit in the market. Use Google, Instagram, and local Facebook groups to get a picture of what nail techs in your area charge.
        </p>
        <ArticleTable
          caption="Approximate UK market ranges (2025)"
          headers={['Positioning', 'Typical range', 'Client expectation']}
          rows={[
            ['Entry / budget', '£20–35 full set', 'Basic service, fast turnaround, no frills'],
            ['Mid-market', '£35–55 full set', 'Consistent quality, good communication, decent portfolio'],
            ['Premium', '£55–90+ full set', 'High-quality products, elevated experience, detailed nail art, strong reputation'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Positioning in the premium tier doesn't require a salon. Many of the highest-earning nail techs in the UK are home or mobile based. Premium positioning is about quality, presentation, and consistency — not location.
        </p>
      </section>

      <section id="service-menu">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Structuring your service menu</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          A clear service menu removes ambiguity, reduces back-and-forth messages, and makes it easier for clients to book the right service. The most common service menu mistakes:
        </p>
        <ArticleChecklist
          title="Service menu mistakes to avoid"
          items={[
            'Too many overlapping services with confusing names (infill vs. refill vs. infills vs. maintenance)',
            'No clear distinction between new set and maintenance pricing',
            'Missing price for nail art — clients assume it\'s included in the base price',
            'No indication of service duration — clients don\'t know how to plan their day',
            'Outdated prices still showing on booking page after a price increase',
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Keep your menu to 6–10 clearly named services. Display prices and duration for every service.{' '}
          <ArticleCTAInline to="/tools/nail-tech-pricing-calculator">
            Use the free pricing calculator
          </ArticleCTAInline>{' '}
          to work out your target prices before updating your menu.
        </p>
      </section>

      <section id="nail-art-pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">6. Pricing nail art and add-ons</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nail art is where most nail techs leave significant money on the table. The mistake is bundling it into the base price or charging a flat "nail art fee" regardless of complexity.
        </p>
        <ArticleTable
          caption="Approximate nail art pricing tiers"
          headers={['Complexity', 'Description', 'Typical extra charge']}
          rows={[
            ['Simple', '1–2 accent nails, solid colour with minimal design', '£5–10'],
            ['Mid', 'Gradient/ombré, simple patterns, stamping on 3–5 nails', '£10–20'],
            ['Complex', 'Full-hand designs, characters, 3D elements, full floral', '£20–50+'],
            ['Custom/premium', 'Hand-painted, bespoke art, competition-level work', 'Quoted individually'],
          ]}
        />
        <ArticleTip>
          Charge per finger for complex nail art, not as a flat fee per set. Charging £5/finger for a 10-finger detailed design gives you £50 extra — appropriate for 1–2 hours of additional work. A flat "£20 nail art fee" for the same job undervalues your time significantly.
        </ArticleTip>
      </section>

      <section id="raising-prices">
        <h2 className="font-serif text-2xl font-bold mb-4">7. How to raise your prices</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Price increases are feared more than they need to be. Most loyal clients accept reasonable price increases when they're communicated clearly and with enough notice.
        </p>
        <ArticleSteps
          steps={[
            {
              title: 'Decide on the new price and effective date',
              body: "Give yourself 4–8 weeks lead time. Don't announce it the week before. Clients who pre-book regularly need time to plan.",
            },
            {
              title: 'Update your booking page first',
              body: "Change prices on your booking page before announcing publicly. This avoids a rush of bookings at old prices that you then have to honour.",
            },
            {
              title: 'Announce on Instagram and in booking confirmations',
              body: 'Keep the message simple: "From [date], prices for [services] will increase to [amount]. This reflects increased product costs and continued investment in quality." No over-explanation needed.',
            },
            {
              title: 'Message existing regulars directly',
              body: 'Regular clients who haven\'t heard about the increase may feel blindsided if their next booking confirmation shows a higher price. A brief personal message goes a long way.',
            },
          ]}
        />
        <ArticleCallout variant="tip" title="How often should you raise prices?">
          Review your prices annually. If your costs have increased, your prices should too. The goal isn't to maximise price — it's to maintain a viable margin. A small annual increase (£2–5 per service) is far less disruptive than a large catch-up increase every 3 years.
        </ArticleCallout>
      </section>

      <section id="showing-prices">
        <h2 className="font-serif text-2xl font-bold mb-4">8. Displaying prices on your booking page</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Public pricing reduces pre-booking friction and filters out price-sensitive clients before they contact you. Clients who book knowing your prices are higher intent and less likely to push back at payment.
        </p>
        <ArticleChecklist
          title="Booking page pricing checklist"
          items={[
            'Every service has a price visible before the client enters their details',
            'Nail art pricing is explained clearly (e.g. "from £10 depending on complexity")',
            'Deposit amount is shown before confirmation',
            'Prices match what you charge — no surprises at checkout',
            'Updated within 24 hours of any price change',
          ]}
        />
        <p className="text-gray-700 mt-4">
          <ArticleCTAInline to="/">Nelsy booking pages</ArticleCTAInline> show service prices, duration, and deposit requirements before the client confirms. Transparent pricing at every step.
        </p>
      </section>

      <section id="useful-resources">
        <h2 className="font-serif text-2xl font-bold mb-4">Useful resources</h2>
        <ul className="space-y-2 text-sm">
          {[
            ['/tools/nail-tech-pricing-calculator', 'Free nail tech pricing calculator — work out your minimum viable price'],
            ['/nail-tech-deposits', 'How to take deposits as a nail tech'],
            ['/tools/nail-tech-cancellation-policy-generator', 'Free cancellation policy generator'],
            ['/learn/how-to-get-more-nail-clients', 'How to get more nail clients'],
          ].map(([href, label]) => (
            <li key={href}>
              <Link to={href} className="underline text-[#F52B8C] leading-relaxed">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  ),
});

export {};
