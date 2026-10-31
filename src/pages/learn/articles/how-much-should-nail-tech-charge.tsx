import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-much-should-nail-tech-charge',
  title: 'How Much Should a Nail Tech Charge?',
  seoTitle: 'How Much Should a Nail Tech Charge? (2026 UK Pricing Guide)',
  excerpt: 'Setting your prices is one of the most important decisions in your nail business. Here\'s a practical guide to UK nail tech pricing in 2026.',
  seoDescription: 'How much should a nail tech charge in 2026? UK nail tech pricing guide covering gel sets, extensions, infills, nail art, and how to set rates for your location.',
  category: 'pricing-money',
  tags: ['nail tech pricing', 'how much to charge', 'nail prices', 'UK nail pricing'],
  heroImage: 'linear-gradient(135deg, #ECFDF5 0%, #86EFAC 100%)',
  heroImageAlt: 'How much should a nail tech charge',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'uk-pricing-overview', label: 'UK nail tech pricing in 2026' },
    { id: 'factors', label: 'What affects your pricing' },
    { id: 'cost-based-pricing', label: 'Pricing based on your costs' },
    { id: 'market-research', label: 'Researching your local market' },
    { id: 'undercharging', label: 'Signs you\'re undercharging' },
    { id: 'raising-prices', label: 'How to raise your prices' },
  ],
  relatedSlugs: ['how-to-price-nail-services-for-profit', 'when-should-nail-tech-raise-prices', 'nail-tech-pricing-guide'],
  faq: [
    { q: 'What is the average price for a gel nail set in the UK in 2026?', a: 'In the UK, gel full sets typically range from £35–£80 depending on location and experience. London prices are generally higher (£50–£80+). Outside London, £35–£55 is common for a quality gel set. New nail techs often start lower (£25–£35) while building their portfolio and confidence.' },
    { q: 'Should I charge more for nail art?', a: 'Yes — nail art takes more time and skill. Most nail techs charge nail art as an add-on: either a flat fee per nail (£2–5 per nail) or a set additional charge for the whole hand (£10–25 depending on complexity). Be clear about this before the appointment.' },
    { q: 'How do I know if my nail prices are too low?', a: 'If you\'re consistently fully booked weeks in advance with no gaps and rarely turn anyone away, your prices are too low. Other signs: clients rarely push back on price, you feel resentful at the end of a long day, and your hourly rate works out below £25/hour.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="uk-pricing-overview">
        <h2 className="font-serif text-2xl font-bold mb-4">UK nail tech pricing in 2026</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">UK nail tech prices vary significantly by location, experience, speciality, and whether you're in a salon or home studio. The ranges below reflect what clients pay across different tiers:</p>
        <ArticleTable
          headers={['Service', 'Budget', 'Mid-range', 'Premium']}
          rows={[
            ['Gel full set', '£25–35', '£40–55', '£60–80+'],
            ['Gel infill', '£20–28', '£30–40', '£45–60'],
            ['Acrylic full set', '£30–40', '£45–60', '£65–90+'],
            ['Gel pedicure', '£25–35', '£35–50', '£55–75'],
            ['Nail art (per nail)', '£2–3', '£3–5', '£5–10+'],
            ['Gel removal + new set', '£35–45', '£50–65', '£70–90+'],
          ]}
          caption="UK nail tech price ranges, 2026. London prices typically sit at mid to premium ranges."
        />
        <ArticleTip>These are client-facing prices — what you charge. They need to cover your costs, your time, and generate profit. If your prices sit at the budget end but you're in London, you're likely undercharging.</ArticleTip>
      </section>

      <section id="factors">
        <h2 className="font-serif text-2xl font-bold mb-4">What affects your pricing</h2>
        <ArticleTable
          headers={['Factor', 'How it affects price']}
          rows={[
            ['Location', 'London/SE England can charge significantly more than other regions'],
            ['Experience and qualifications', 'More experience = higher prices; qualifications add credibility'],
            ['Speciality', 'Nail art specialists can charge premium add-ons'],
            ['Clientele', 'Premium clientele pay premium prices; you attract what you charge'],
            ['Studio vs home', 'Home studios typically charge slightly less but have lower overheads'],
            ['Demand', 'If you\'re consistently booked out, you\'re underpriced'],
          ]}
        />
      </section>

      <section id="cost-based-pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing based on your costs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before setting prices, know what you need to earn. Calculate your hourly cost:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Your monthly costs (products, training, equipment, rent if applicable)</li>
          <li>Your target monthly income (after costs, before tax)</li>
          <li>Your available working hours per month</li>
          <li>Divide total needed income + costs by working hours = your minimum hourly rate</li>
        </ol>
        <ArticleCallout variant="info" title="Simple example">
          Monthly costs: £300. Target income: £2,500. Total needed: £2,800. Available hours: 80. Minimum rate: £35/hour. A 90-minute gel set at £35/hour = £52.50 — that's your break-even price. Add profit margin above that.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For a full calculation tool: <Link to="/tools/nail-tech-pricing-calculator" className="underline text-[#F52B8C]">free nail tech pricing calculator</Link>.</p>
      </section>

      <section id="market-research">
        <h2 className="font-serif text-2xl font-bold mb-4">Researching your local market</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your prices need to make sense in your local market. A gel set at £75 in a small town may be unworkable; the same price in London is standard. Research:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Look at local nail techs on Instagram and check if they list prices</li>
          <li>Check what local salons charge for comparable services</li>
          <li>Look at booking platforms showing local nail tech prices</li>
          <li>Ask peers in local nail tech communities what they charge</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Price at or above mid-range if your quality supports it. Starting low and raising later is possible but harder than starting at the right price from the start.</p>
      </section>

      <section id="undercharging">
        <h2 className="font-serif text-2xl font-bold mb-4">Signs you're undercharging</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You're consistently booked 3+ weeks in advance with no gaps</li>
          <li>Clients never, ever mention the price</li>
          <li>You feel exhausted and underpaid at the end of a full day</li>
          <li>Your hourly rate (time in chair + set-up/clean-down) works out below £30/hour</li>
          <li>You've never raised prices in 12+ months</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">See: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">When should a nail tech raise prices?</Link></p>
      </section>

      <section id="raising-prices">
        <h2 className="font-serif text-2xl font-bold mb-4">How to raise your prices</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Raising prices is something most nail techs worry about more than they need to. The steps that make it smooth:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Give clients 4–6 weeks' notice</li>
          <li>Announce it positively: "From [date], my prices will be updating to reflect..." — no apology needed</li>
          <li>Update your booking page and pricing highlights at the same time</li>
          <li>Stick to the new prices — inconsistency creates confusion and resentment</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">Most loyal clients stay. Some budget clients leave — and that's usually fine, because they're replaced by clients who value your work at the new price. Full guide: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">When should a nail tech raise prices?</Link></p>
      </section>
    </div>
  ),
});
export {};
