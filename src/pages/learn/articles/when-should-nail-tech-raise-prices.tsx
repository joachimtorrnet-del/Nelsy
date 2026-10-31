import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'when-should-nail-tech-raise-prices',
  title: 'When Should a Nail Tech Raise Prices?',
  seoTitle: 'When Should a Nail Tech Raise Their Prices?',
  excerpt: 'Most nail techs wait far too long to raise prices. Here are the clear signals that tell you it\'s time — and how to do it without losing your best clients.',
  seoDescription: 'When to raise nail tech prices: the clear signals, how much to raise by, how to tell clients, and what to expect when you do.',
  category: 'pricing-money',
  tags: ['raise prices', 'nail tech pricing', 'price increase', 'nail business'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
  heroImageAlt: 'When should a nail tech raise prices',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'signals', label: 'Clear signals it\'s time' },
    { id: 'how-much', label: 'How much to raise by' },
    { id: 'how-to-tell-clients', label: 'How to tell clients' },
    { id: 'what-to-expect', label: 'What to expect when you do' },
    { id: 'fears', label: 'Addressing common fears' },
  ],
  relatedSlugs: ['how-much-should-nail-tech-charge', 'how-to-price-nail-services-for-profit', 'nail-tech-pricing-guide'],
  faq: [
    { q: 'How often should nail techs raise their prices?', a: 'Once a year is a reasonable baseline — this keeps pace with inflation and costs. Some nail techs raise prices twice a year as they grow their skill or client base. The signal to raise is demand exceeding supply (consistently full books), rising costs, or significant skill development — not just the calendar.' },
    { q: 'How much notice should I give clients before a price increase?', a: 'Four to six weeks is standard. This gives loyal clients time to book one more appointment at the old price if they want to, and to adjust their expectations. Less than 2 weeks feels abrupt; more than 8 weeks and clients forget.' },
    { q: 'Will I lose clients when I raise my prices?', a: 'Some, probably. Typically the most price-sensitive clients — often the ones who are most difficult or last-minute — leave. The majority of loyal clients stay. The net effect is usually higher income from fewer, higher-value clients. The fear of losing clients is almost always larger than the reality.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="signals">
        <h2 className="font-serif text-2xl font-bold mb-4">Clear signals it's time to raise prices</h2>
        <ArticleChecklist title="It's time to raise your prices if:" items={[
          'You\'re consistently booked 3+ weeks ahead with no gaps',
          'Clients never hesitate or mention the price',
          'You haven\'t raised prices in 12+ months',
          'Your product and supply costs have increased',
          'You completed significant training or gained new qualifications',
          'Your skill level is noticeably higher than when you set your current prices',
          'You feel resentful about the amount you earn per appointment',
          'Your effective hourly rate (including set-up time) feels too low',
        ]} />
        <ArticleCallout variant="info" title="The most reliable signal">
          Consistently fully booked with no gaps is the clearest possible signal you're underpriced. Demand exceeds supply — which means clients value your work at more than you're charging. Raise prices until demand returns to sustainable levels.
        </ArticleCallout>
      </section>

      <section id="how-much">
        <h2 className="font-serif text-2xl font-bold mb-4">How much to raise by</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The right increase depends on why you're raising:</p>
        <ArticleTable
          headers={['Reason for increase', 'Typical range']}
          rows={[
            ['Annual cost-of-living adjustment', '5–10%'],
            ['Significant skill development / new qualifications', '10–20%'],
            ['Moving to a premium positioning', '15–25%'],
            ['Consistently booked out (demand management)', '10–20%, review again in 3 months'],
            ['Catching up after years of not raising', 'May need 20–30% in one go or a phased approach'],
          ]}
        />
        <ArticleTip>Round to clean numbers. £47 → £50. £53 → £55. Clean numbers feel like a considered pricing decision rather than an arbitrary change.</ArticleTip>
      </section>

      <section id="how-to-tell-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">How to tell clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The announcement doesn't need to be an apology. It's a factual business update. A good way to frame it:</p>
        <ArticleCallout variant="info" title="Price increase announcement script">
          "Just a heads up — from [date], I'll be updating my pricing to £X for [service]. Existing clients can book at current prices until then via the link in my bio. Thank you so much for your continued support — I'm so grateful for every one of you! 🙏"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 mb-4 leading-relaxed">For regular clients you want to treat personally, a direct message works well too — the announcement above as a DM to your top 10–15 clients feels more personal than just a story post.</p>
        <p className="text-gray-700 leading-relaxed">Where to announce: Instagram story, updated booking page, Highlights, and direct message to regulars. You don't need to send a long explanation — short and clear is better.</p>
      </section>

      <section id="what-to-expect">
        <h2 className="font-serif text-2xl font-bold mb-4">What to expect when you raise prices</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The pattern after a price increase:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>A rush of bookings before the new price takes effect</li>
          <li>A few clients who don't return (typically the most price-sensitive ones)</li>
          <li>The majority of loyal clients staying</li>
          <li>Some slots that were previously full now opening up — this is normal and expected</li>
          <li>New clients who find you through Instagram booking at your new price without question</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">The net result is almost always higher income from the same or slightly fewer working hours. The fear is almost always worse than the reality.</p>
      </section>

      <section id="fears">
        <h2 className="font-serif text-2xl font-bold mb-4">Addressing common fears</h2>
        <ArticleTable
          headers={['Fear', 'Reality']}
          rows={[
            ['"All my clients will leave"', 'Most loyal clients stay. Price-sensitive ones may leave — these are often your most difficult clients anyway.'],
            ['"I\'m not good enough to charge more"', 'If you\'re fully booked, clients are already telling you your work is worth more. That\'s your evidence.'],
            ['"I\'ll price myself out of the market"', 'There\'s a market at every price point. Premium clients actively look for premium nail techs.'],
            ['"I feel guilty charging more"', 'Your skills are worth money. Undercharging doesn\'t help clients — it prevents you from running a sustainable business.'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">More on pricing: <Link to="/learn/how-much-should-nail-tech-charge" className="underline text-[#F52B8C]">How much should a nail tech charge?</Link> | <Link to="/learn/how-to-price-nail-services-for-profit" className="underline text-[#F52B8C]">How to price nail services for profit</Link>.</p>
      </section>
    </div>
  ),
});
export {};
