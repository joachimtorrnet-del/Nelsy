import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-business-plan',
  title: 'Nail Tech Business Plan: Step-by-Step Guide',
  seoTitle: 'Nail Tech Business Plan: Step-by-Step Guide for 2026',
  excerpt: 'A practical business plan for nail techs — not a corporate document, but a clear picture of what you\'re building, what it costs, and how to grow it.',
  seoDescription: 'How to write a nail tech business plan. A practical, jargon-free guide covering your offer, target clients, pricing, costs, revenue projections, and growth strategy.',
  category: 'start-your-business',
  tags: ['nail business plan', 'business plan', 'nail tech strategy', 'nail business finances'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
  heroImageAlt: 'Nail tech business plan guide',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'why-bother', label: 'Why a business plan?' },
    { id: 'your-offer', label: '1. Define your offer' },
    { id: 'target-clients', label: '2. Your target clients' },
    { id: 'pricing-revenue', label: '3. Pricing and revenue' },
    { id: 'costs', label: '4. Costs and break-even' },
    { id: 'marketing-plan', label: '5. Your marketing plan' },
    { id: 'goals', label: '6. 90-day goals' },
  ],
  relatedSlugs: ['how-to-start-a-nail-business-2026', 'how-to-price-nail-services-for-profit', 'how-to-get-more-nail-clients', 'best-booking-apps-for-nail-techs-2026'],
  faq: [
    { q: 'Do nail techs need a formal business plan?', a: 'Not a formal one — you\'re not applying for a bank loan. But a clear, written picture of your business, costs, revenue, and marketing strategy is genuinely useful. It forces you to think through assumptions you might otherwise gloss over, and gives you a reference point to measure against.' },
    { q: 'How much should a nail tech expect to earn in year one?', a: 'Highly variable. A part-time nail tech (2–3 days per week) might earn £15,000–£25,000. A full-time nail tech with a full book earns £25,000–£50,000+. These figures depend heavily on pricing, location, efficiency, and how quickly you build your clientele. The business plan calculator below helps you model your specific scenario.' },
    { q: 'Should I start as a sole trader or limited company as a nail tech?', a: 'Almost all new nail techs start as sole traders — simpler administration, less cost, easier to understand. A limited company may make sense once you\'re earning significantly above the higher rate tax threshold. Speak to an accountant before making this decision.' },
  ],
  relatedFeatureSlugs: ['bookings', 'analytics', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-bother">
        <h2 className="font-serif text-2xl font-bold mb-4">Why a business plan?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail tech business plan isn't a 30-page document for a bank — it's a clear, written answer to: what are you building, who for, at what price, and how will you find enough clients to make it work?</p>
        <p className="text-gray-700 leading-relaxed">The process of writing it is as valuable as the document itself. It forces decisions you might otherwise avoid: What will I actually charge? How many clients do I need per week to hit my income goal? What will I do if I can't fill my diary?</p>
      </section>

      <section id="your-offer">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Define your offer</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">What services will you offer? Write them out with prices and durations. This is your service menu — it defines what you sell and how much time each item takes.</p>
        <ArticleTable
          headers={['Service', 'Price', 'Duration', 'Notes']}
          rows={[
            ['Gel full set', '£50', '90 min', 'Core service'],
            ['Gel infill', '£35', '60 min', 'Core service'],
            ['Gel pedicure', '£40', '60 min', 'Seasonal peak'],
            ['Nail art add-on', '£5/nail', '+30–45 min', 'Premium add-on'],
            ['Gel removal + new set', '£60', '2h', 'New client common'],
          ]}
          caption="Example service menu — replace with your actual services and prices"
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Your niche matters. A nail tech specialising in soft gel extensions for professionals is targeting a different client than one specialising in nail art for students. Neither is better — but clarity helps you market more effectively.</p>
      </section>

      <section id="target-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Your target clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Who are you trying to reach? Describe your ideal client:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Where do they live? (Your city/area)</li>
          <li>How do they find nail techs? (Instagram, Google, word of mouth)</li>
          <li>What do they value? (Quality, reliability, nail art, quick appointments)</li>
          <li>What are they willing to pay?</li>
        </ul>
        <ArticleTip>The clearer you are about who you're talking to, the easier Instagram, bio writing, and pricing decisions become. "Local professional women who want reliable gel nails every 3 weeks" is more useful than "anyone who wants nails."</ArticleTip>
      </section>

      <section id="pricing-revenue">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Pricing and revenue</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Run your revenue projection. How many clients per week, at what average spend, equals what monthly revenue?</p>
        <ArticleTable
          headers={['Clients/week', 'Average spend', 'Weekly revenue', 'Monthly revenue']}
          rows={[
            ['10', '£45', '£450', '£1,800'],
            ['15', '£50', '£750', '£3,000'],
            ['20', '£55', '£1,100', '£4,400'],
          ]}
          caption="Example projections — use your actual prices and working hours"
        />
        <p className="text-gray-700 mt-4 leading-relaxed">From monthly revenue, subtract costs to get profit. Model multiple scenarios: what happens if you have a quiet month? What's your minimum viable client count? See: <Link to="/learn/how-to-price-nail-services-for-profit" className="underline text-[#F52B8C]">how to price nail services for profit</Link>.</p>
      </section>

      <section id="costs">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Costs and break-even</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">List every monthly cost. Common categories for a home nail tech:</p>
        <ArticleTable
          headers={['Category', 'Monthly estimate']}
          rows={[
            ['Products and supplies', '£150–400'],
            ['Insurance', '£12–15'],
            ['Training and CPD (annualised)', '£30–80'],
            ['Equipment maintenance/replacement', '£20–50'],
            ['Booking software', '£0–25'],
            ['Marketing tools / photography', '£0–20'],
            ['Accountancy software', '£10–20'],
            ['Total', '~£220–600'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Break-even = when monthly revenue covers all costs plus your target personal income. Know this number before you start, so you know exactly what "success" looks like in month one.</p>
      </section>

      <section id="marketing-plan">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Your marketing plan</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">How will you find clients? A simple marketing plan for a new nail tech:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Instagram:</strong> 3–5 posts per week with location tags and booking CTAs</li>
          <li><strong>Word of mouth:</strong> Ask every client for a referral</li>
          <li><strong>Google Business Profile:</strong> Set up and maintain to capture local searches</li>
          <li><strong>Model posts:</strong> Ask models to post and tag you after each practice set</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">See: <Link to="/learn/how-to-get-more-nail-clients" className="underline text-[#F52B8C]">how to get more nail clients</Link>.</p>
      </section>

      <section id="goals">
        <h2 className="font-serif text-2xl font-bold mb-4">6. 90-day goals</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A 90-day plan is more actionable than a 5-year plan. Set specific, measurable targets for your first 90 days:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Month 1: Complete [X] paying clients. Set up booking page. Post 3x/week on Instagram.</li>
          <li>Month 2: Reach [X] clients/week. Get first rebooks. Ask for [X] referrals.</li>
          <li>Month 3: Hit target weekly client count. Review prices. Get first Google reviews.</li>
        </ul>
        <ArticleCallout variant="info" title="Review monthly">
          Set a date each month to review: income vs target, costs vs budget, Instagram growth, and booking conversion. A 30-minute monthly review prevents small problems becoming big ones.
        </ArticleCallout>
      </section>
    </div>
  ),
});
export {};
