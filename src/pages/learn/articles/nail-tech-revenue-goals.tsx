import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-revenue-goals',
  title: 'Nail Tech Revenue Goals: How to Set Them',
  seoTitle: 'Nail Tech Revenue Goals: How to Set and Hit Them',
  excerpt: 'A revenue goal without a plan is a wish. Here\'s how to set meaningful revenue goals as a nail tech and break them down into the daily and weekly numbers that actually drive action.',
  seoDescription: 'How to set nail tech revenue goals. Working backwards from annual income targets to weekly client counts — a practical goal-setting framework for nail techs.',
  category: 'pricing-money',
  tags: ['nail tech revenue goals', 'nail business goals', 'nail tech income targets', 'nail business planning'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'Nail tech revenue goals: how to set them',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'start-with-income', label: 'Start with your income need' },
    { id: 'work-backwards', label: 'Work backwards to weekly numbers' },
    { id: 'gap-analysis', label: 'Gap analysis' },
    { id: 'tracking', label: 'Tracking progress' },
    { id: 'review', label: 'Monthly and quarterly review' },
  ],
  relatedSlugs: ['nail-tech-monthly-income-calculator', 'nail-tech-profit-margin-explained', 'nail-tech-break-even-point', 'how-to-stop-undercharging-nail-tech'],
  faq: [
    { q: 'Should I set weekly or monthly revenue goals?', a: 'Both — at different levels of abstraction. An annual goal gives you direction. A monthly goal gives you a meaningful check-in period. A weekly target ("I need to take in at least £X this week") gives you the day-to-day number to act on. All three are connected: your weekly target flows directly from your monthly goal, which flows from your annual one.' },
    { q: 'What if I consistently miss my revenue goals?', a: 'A missed goal is information. Are you missing because of too few clients, or clients paying less than your target average? Too many cancellations? A quiet month that knocked your average? Understand the cause before changing the goal. The goal isn\'t wrong just because you missed it — the goal tells you what to address.' },
    { q: 'Is it worth setting non-revenue goals too?', a: 'Yes — revenue is the outcome; client metrics are the leading indicators. Goals like "20 clients per week by March" or "average appointment value of £50 by Q2" tell you what to do. Revenue goals tell you whether it worked. A mix of input goals (what you do) and output goals (revenue) gives you more to act on.' },
  ],
  relatedFeatureSlugs: ['analytics', 'payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="start-with-income">
        <h2 className="font-serif text-2xl font-bold mb-4">Start with your income need</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Revenue goals start with a personal income need, not an arbitrary number. The question to answer first: "How much do I need to take home each month to cover my life?" Be specific — rent/mortgage, bills, food, savings, fun money, buffer.</p>
        <ArticleCallout variant="info" title="Starting from income need">
          Monthly take-home needed: £2,400{'\n'}
          Monthly business expenses: £600{'\n'}
          Tax provision: £700{'\n'}
          Required monthly revenue: £3,700
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">This is your revenue floor — the minimum your business needs to generate for you to meet your personal obligations. Your goal should be at or above this number.</p>
      </section>

      <section id="work-backwards">
        <h2 className="font-serif text-2xl font-bold mb-4">Work backwards to weekly numbers</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Break your monthly revenue goal into weekly and daily numbers:</p>
        <ArticleTable
          headers={['Period', 'Calculation', 'Example']}
          rows={[
            ['Monthly goal', 'Set based on income need (see above)', '£3,700'],
            ['Weekly revenue target', 'Monthly ÷ 4.3 weeks', '£860'],
            ['Daily revenue target', 'Weekly ÷ working days', '£215 (4-day week)'],
            ['Clients needed per day', 'Daily target ÷ average appointment value', '5 clients at £43 avg'],
          ]}
        />
        <ArticleTip>Knowing your daily revenue target makes daily decisions concrete. "I need to generate £215 today — I have 5 appointments at £43 average. If I can add one chrome (£12) to any of them, I\'m at £255." Numbers make goal-directed behaviour possible.</ArticleTip>
      </section>

      <section id="gap-analysis">
        <h2 className="font-serif text-2xl font-bold mb-4">Gap analysis</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Compare your current numbers to your goal:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Clients per week:</strong> Are you seeing enough clients to hit the goal? If not, you have a capacity or demand problem.</li>
          <li><strong>Average appointment value:</strong> Are your prices and add-on sales generating the revenue per client you need?</li>
          <li><strong>Cancellation and no-show rate:</strong> Revenue you lose to no-shows and late cancellations reduces your actual revenue from your bookings</li>
        </ul>
        <ArticleTable
          headers={['Lever', 'Example impact']}
          rows={[
            ['Add 2 more clients per week', '+2 × £43 × 4.3 weeks = +£370/month'],
            ['Raise prices by £5 across all services', '+£5 × 20 clients × 4.3 weeks = +£430/month'],
            ['Add-on sold to 30% of clients (£12 avg)', '+0.3 × 20 × £12 × 4.3 = +£310/month'],
            ['Reduce no-shows by 2 per week (deposit)', '+2 × £43 × 4.3 = +£370/month'],
          ]}
        />
      </section>

      <section id="tracking">
        <h2 className="font-serif text-2xl font-bold mb-4">Tracking progress</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Track weekly, not just monthly. A simple weekly entry in a spreadsheet:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Total revenue taken this week</li>
          <li>Number of clients</li>
          <li>Average appointment value (revenue ÷ clients)</li>
          <li>Cancellations/no-shows this week</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Tracking this data gives you real visibility into your business performance — and early warning when a pattern is emerging (cancellations increasing, average value dropping) before it becomes a problem.</p>
      </section>

      <section id="review">
        <h2 className="font-serif text-2xl font-bold mb-4">Monthly and quarterly review</h2>
        <p className="text-gray-700 leading-relaxed">At the end of each month: compare actual to target, identify what drove the difference (above or below), and decide what to adjust. Once per quarter: review your annual goal — are you on track? Does the goal still reflect what you need? Adjust up or down with the context of your updated business situation. A goal you set in January may need recalibrating in April.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">For the income calculation that feeds into goals: <Link to="/learn/nail-tech-monthly-income-calculator" className="underline text-[#F52B8C]">nail tech monthly income: how to calculate what you actually make</Link>.</p>
      </section>
    </div>
  ),
});
export {};
