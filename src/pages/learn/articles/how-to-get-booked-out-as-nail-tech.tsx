import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-booked-out-as-nail-tech',
  title: 'How to Get Booked Out as a Nail Tech',
  seoTitle: 'How to Get Booked Out as a Nail Tech: The Complete Playbook',
  excerpt: 'Being booked out isn\'t luck — it\'s a system. Here\'s what consistently fully-booked nail techs do differently.',
  seoDescription: 'How to get booked out as a nail tech. The strategies, systems, and mindset shifts that turn a part-time nail business into a fully booked calendar.',
  category: 'get-clients',
  tags: ['booked out', 'fully booked', 'nail business growth', 'nail clients'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to get booked out as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'what-booked-out-looks-like', label: 'What "booked out" actually means' },
    { id: 'the-foundation', label: 'The foundation: systems before marketing' },
    { id: 'client-retention', label: 'Client retention is more powerful than acquisition' },
    { id: 'pricing-and-demand', label: 'Pricing to manage demand' },
    { id: 'marketing-that-scales', label: 'Marketing that scales with you' },
    { id: 'when-youre-there', label: 'When you\'re booked out — what next' },
  ],
  relatedSlugs: ['how-to-fill-nail-appointment-book', 'how-to-get-more-nail-clients', 'how-much-should-nail-tech-charge'],
  faq: [
    { q: 'How long does it take to get fully booked as a nail tech?', a: 'It varies widely depending on your location, pricing, marketing effort, and how many slots you\'re trying to fill. Most nail techs who focus consistently on Instagram, word of mouth, and client retention get to consistently full books within 6–12 months. Some much faster, some longer.' },
    { q: 'Should I raise my prices once I\'m booked out?', a: 'Yes — being booked out is the clearest signal that demand exceeds supply, which means you\'re underpriced relative to your market. Raising prices reduces demand to sustainable levels while increasing revenue per appointment. See the guide on when to raise nail tech prices.' },
    { q: 'Can I be booked out and still take new clients?', a: 'Yes — if you lose clients to life changes (moving, having a baby, switching to a different nail tech), you need to replace them. A waitlist handles this: new clients join the waitlist and get offered slots as they open. You maintain a full book without ever having empty slots.' },
  ],
  relatedFeatureSlugs: ['bookings', 'link-in-bio', 'instagram-autodm', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-booked-out-looks-like">
        <h2 className="font-serif text-2xl font-bold mb-4">What "booked out" actually means</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Being booked out doesn't mean having zero available slots ever — it means having demand consistently exceed your availability. In practice: your calendar fills 2–4 weeks ahead, you rarely have last-minute gaps that go unfilled, and you regularly turn away clients or direct them to a waitlist.</p>
        <p className="text-gray-700 leading-relaxed">The goal isn't a completely static, zero-flexibility schedule. It's having enough consistent demand that your income is predictable and you're choosing who you work with rather than taking any available client.</p>
      </section>

      <section id="the-foundation">
        <h2 className="font-serif text-2xl font-bold mb-4">The foundation: systems before marketing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many nail techs try to get booked out by doing more marketing before they have the right systems in place. The result: you attract clients but lose them to a poor booking experience, no-shows without deposits, or inconsistent communication.</p>
        <ArticleChecklist title="Systems you need before scaling marketing" items={[
          'Online booking with automatic deposit collection',
          '24-hour reminder configured and running automatically',
          'Rebooking prompt at the end of every appointment',
          'Consistent response time to DM enquiries (under 4 hours ideally)',
          'Cancellation policy stated clearly before clients book',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">Get these right first. Then marketing compounds instead of leaking through the cracks.</p>
      </section>

      <section id="client-retention">
        <h2 className="font-serif text-2xl font-bold mb-4">Client retention is more powerful than acquisition</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A fully booked calendar is mostly filled by regulars, not new clients. A client who comes every 3 weeks fills 17 slots per year. Getting 17 new clients to fill those same slots requires 17 times the marketing effort.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">What retains clients:</p>
        <ArticleTable
          headers={['Factor', 'What it means in practice']}
          rows={[
            ['Quality consistency', 'Clients book again because the last set was good — every time'],
            ['Rebooking before they leave', 'Rebook at the end of every appointment before they can forget'],
            ['Reminders', 'Automatic 24h reminders reduce no-shows and keep you front of mind'],
            ['Personal touch', 'Remember their preferences, ask about their life — small things that build loyalty'],
            ['Price predictability', 'Avoid surprise price changes or inconsistent charges for the same service'],
          ]}
        />
      </section>

      <section id="pricing-and-demand">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing to manage demand</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you're fully booked, you're likely underpriced. Higher prices reduce demand to a sustainable level while increasing revenue. A nail tech charging £60 per set who's booked 5 days a week earns more than one charging £35 who's booked 6 days a week — and has a day off.</p>
        <ArticleCallout variant="info" title="The pricing signal">
          Consistently full = raise prices. Empty slots despite marketing = pricing or visibility problem. Both signals are useful — act on them.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For pricing guidance: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">When should a nail tech raise prices?</Link></p>
      </section>

      <section id="marketing-that-scales">
        <h2 className="font-serif text-2xl font-bold mb-4">Marketing that scales with you</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The marketing activities that have the most leverage for getting and staying booked out:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Instagram posting cadence:</strong> 3–5x per week, with location tags and booking CTAs, is enough to consistently attract new local followers who convert to clients.</li>
          <li><strong>Google Business Profile:</strong> Set up once, maintained occasionally, brings in high-intent local searches passively.</li>
          <li><strong>Referral requests:</strong> Ask every happy client. One referral from a loyal client is worth 10 cold Instagram followers.</li>
          <li><strong>Availability posts:</strong> Regular "I have slots this week" stories convert your existing followers directly to bookings.</li>
        </ol>
        <ArticleTip>You don't need to do everything. Pick two or three marketing activities, do them consistently for 3 months, and measure the results. Consistency beats variety.</ArticleTip>
      </section>

      <section id="when-youre-there">
        <h2 className="font-serif text-2xl font-bold mb-4">When you're booked out — what next</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Being booked out creates a new set of decisions:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Raise prices:</strong> This is usually the first move — it increases revenue without increasing hours</li>
          <li><strong>Add a waitlist:</strong> Capture demand that exceeds your capacity; fill cancellations without marketing</li>
          <li><strong>Get selective:</strong> Prioritise clients who are reliable, appreciative, and fit your niche</li>
          <li><strong>Consider expansion:</strong> A second day, a second location, or training another nail tech</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Being booked out is the goal — and it's also the starting point for the next phase of your business. See: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">When should a nail tech raise prices?</Link></p>
      </section>
    </div>
  ),
});
export {};
