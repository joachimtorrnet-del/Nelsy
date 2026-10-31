import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-stop-undercharging-nail-tech',
  title: 'How to Stop Undercharging as a Nail Tech',
  seoTitle: 'How to Stop Undercharging as a Nail Tech (Mindset + Practical Steps)',
  excerpt: 'Most nail techs know they\'re undercharging. The challenge is doing something about it — the fear of losing clients, the imposter syndrome, the uncomfortable conversations. Here\'s how to address all of it.',
  seoDescription: 'How to stop undercharging as a nail tech. Why nail techs undercharge, mindset shifts, how to raise prices without losing clients, and scripts for communicating price changes.',
  category: 'pricing-money',
  tags: ['nail tech undercharging', 'nail tech prices', 'raise nail prices', 'nail tech confidence'],
  heroImage: 'linear-gradient(135deg, #FFF5F5 0%, #FECACA 100%)',
  heroImageAlt: 'How to stop undercharging as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-undercharge', label: 'Why nail techs undercharge' },
    { id: 'the-cost', label: 'What undercharging actually costs you' },
    { id: 'signs', label: 'Signs you\'re undercharging' },
    { id: 'mindset', label: 'The mindset shift' },
    { id: 'practical-steps', label: 'Practical steps' },
    { id: 'communicating', label: 'Communicating a price increase' },
  ],
  relatedSlugs: ['when-should-nail-tech-raise-prices', 'how-to-calculate-nail-tech-hourly-rate', 'nail-tech-profit-margin-explained', 'how-much-should-nail-tech-charge'],
  faq: [
    { q: 'Will I lose clients if I raise my prices?', a: 'Some clients may not continue when you raise prices — and that\'s often okay. Clients who leave purely for price were never your most loyal or most profitable. The clients who stay are those who genuinely value your work. Many nail techs find that after a price increase, they retain 90%+ of their regular clients while earning more per appointment — and the emotional relief of charging what they\'re worth reduces burnout significantly.' },
    { q: 'How much should I raise my prices by?', a: 'Enough to make a meaningful difference to your hourly rate, but not so much that you raise in one jump before clients have time to adjust. A 10–20% increase is common for a first raise, particularly if prices haven\'t changed in 12+ months. Calculate your required hourly rate first (see the linked article) to understand what your prices actually need to be.' },
    { q: 'Should I give different prices to existing and new clients?', a: 'Most nail techs apply the same prices to all clients rather than creating a two-tier system. Existing clients receiving a lower price creates admin complexity and can feel awkward when it eventually equalises. Give existing clients advance notice of the change and a clear effective date — this is more respectful than surprising them at their next appointment.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-undercharge">
        <h2 className="font-serif text-2xl font-bold mb-4">Why nail techs undercharge</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Undercharging isn't usually ignorance — it's fear. The specific fears vary, but they're consistent across the industry:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Fear of losing clients:</strong> "If I raise my prices, my regulars will leave"</li>
          <li><strong>Imposter syndrome:</strong> "I'm not experienced/qualified/skilled enough to charge more"</li>
          <li><strong>Comparison paralysis:</strong> "The nail tech down the road charges [X] — I can't charge more than that"</li>
          <li><strong>Discomfort with money conversations:</strong> "Talking about money feels awkward and I'd rather avoid it"</li>
          <li><strong>Starting low and never raising:</strong> "I set my prices when I was a beginner and it just... stayed there"</li>
        </ul>
      </section>

      <section id="the-cost">
        <h2 className="font-serif text-2xl font-bold mb-4">What undercharging actually costs you</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Undercharging isn't "playing it safe" — it has direct costs:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You work more hours than necessary to hit your income needs</li>
          <li>You attract price-sensitive clients who are less loyal and more likely to leave for cheaper</li>
          <li>You're unable to invest in better products, training, and equipment that would improve your work</li>
          <li>You experience burnout from overwork at insufficient reward</li>
          <li>You feel resentment toward clients who are getting more value than they're paying for</li>
        </ul>
        <ArticleCallout variant="info" title="The maths of undercharging">
          If you do 20 clients per week and you're £8 below the market rate for your skill level, that's £160/week — £8,320/year — left on the table. A price correction doesn't just change your income this month; it changes your entire financial trajectory.
        </ArticleCallout>
      </section>

      <section id="signs">
        <h2 className="font-serif text-2xl font-bold mb-4">Signs you're undercharging</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You're fully booked but not taking home what you need</li>
          <li>You feel resentful about the time some services take relative to what you charge</li>
          <li>Your prices haven't changed in 12+ months</li>
          <li>New clients book without flinching — no one ever says "that's expensive"</li>
          <li>You feel embarrassed to say your prices out loud</li>
          <li>Calculating your hourly rate reveals you're below minimum wage after expenses</li>
        </ul>
        <ArticleTip>If every single enquiry converts to a booking with zero price hesitation, you\'re probably undercharging. Some price resistance is healthy — it signals you\'re positioned appropriately for the value you deliver.</ArticleTip>
      </section>

      <section id="mindset">
        <h2 className="font-serif text-2xl font-bold mb-4">The mindset shift</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most useful reframe: you're not charging for time. You're charging for skill, expertise, a professional result, and the experience of being in your care for an hour. That package has a value independent of how long it takes — and that value increases as your skill grows.</p>
        <p className="text-gray-700 leading-relaxed">Your prices also signal your positioning. A nail tech charging £28 for a gel manicure and one charging £55 are positioned differently in their market. Neither is wrong — but if you're delivering a £55 experience and charging £28, the mismatch is costing you in revenue and in how clients perceive your value.</p>
      </section>

      <section id="practical-steps">
        <h2 className="font-serif text-2xl font-bold mb-4">Practical steps</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Calculate your required hourly rate — this tells you what you need to charge (see: <Link to="/learn/how-to-calculate-nail-tech-hourly-rate" className="underline text-[#F52B8C]">how to calculate your nail tech hourly rate</Link>)</li>
          <li>Compare your current effective rates to your required rates — find the gaps</li>
          <li>Set a new price list and an effective date (give 4–6 weeks notice to existing clients)</li>
          <li>Communicate the change directly and confidently — see the script below</li>
          <li>Raise prices for new clients immediately; apply to existing clients from the effective date</li>
        </ol>
      </section>

      <section id="communicating">
        <h2 className="font-serif text-2xl font-bold mb-4">Communicating a price increase</h2>
        <ArticleCallout variant="tip" title="Price increase message to existing clients">
          "Hi [name]! Just a heads up — from [date], my prices will be updating to better reflect my current costs and experience. Your [service] will be [new price] from that date. I wanted to give you plenty of notice. I appreciate your support so much — and I look forward to continuing to take care of your nails 🤍"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">You don't need to justify the increase at length — a brief, warm notice is all that's needed. Clients who respect your work will stay. Those who don't were not the right fit for your business long-term.</p>
        <p className="text-gray-700 leading-relaxed">Full guide to raising prices: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">when should a nail tech raise prices</Link>.</p>
      </section>
    </div>
  ),
});
export {};
