import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'should-nail-techs-offer-discounts',
  title: 'Should Nail Techs Offer Discounts?',
  seoTitle: 'Should Nail Techs Offer Discounts? When It Works and When It Doesn\'t',
  excerpt: 'Discounts can fill your calendar or devalue your brand — depending entirely on how you use them. Here\'s a clear framework for when discounts make sense and when they cost you more than they earn.',
  seoDescription: 'Should nail techs offer discounts? When discounts help, when they hurt, which types work best, and alternatives to discounting that add value without cutting prices.',
  category: 'pricing-money',
  tags: ['nail tech discounts', 'nail pricing', 'nail tech promotions', 'nail business pricing'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'Should nail techs offer discounts',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'the-case-for', label: 'When discounts make sense' },
    { id: 'the-case-against', label: 'When discounts hurt your business' },
    { id: 'which-types-work', label: 'Discount types that work well' },
    { id: 'alternatives', label: 'Alternatives to discounting' },
    { id: 'framework', label: 'A framework for deciding' },
  ],
  relatedSlugs: ['how-to-stop-undercharging-nail-tech', 'nail-tech-revenue-goals', 'when-should-nail-tech-raise-prices', 'how-to-get-nail-clients-slow-season'],
  faq: [
    { q: 'Should I offer a new client discount?', a: 'A small new client offer (10% off, or a free add-on) can be a useful acquisition tool, particularly for techs building their client base. The risk: it attracts clients who are primarily motivated by price, who may leave when the discount expires. A better approach is a "first appointment" special that focuses on the experience (free cuticle treatment, aftercare guide) rather than a price cut — this communicates value rather than discount positioning.' },
    { q: 'Is it okay to discount for friends and family?', a: 'Most nail techs discount or comp services for close friends and family — this is a personal decision. However, extending heavy discounts to everyone who mentions a connection ("my friend [name] comes to you") creates a complex social dynamic and can undervalue your work. A clear policy ("close friends get X off; I\'m always happy to help") is cleaner than deciding case by case.' },
    { q: 'What do I do if a client asks for a discount?', a: 'Handle it warmly and directly: "My prices are [X] — I keep them consistent for everyone. What I can do is [add-on / priority booking / package offer]." You don\'t need to apologise for your prices. A client who pushes for a discount is a client who has decided your value should be lower — that\'s information about fit, not a negotiation to win.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="the-case-for">
        <h2 className="font-serif text-2xl font-bold mb-4">When discounts make sense</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Discounts are a marketing tool. Like any tool, they're useful in the right situation and counterproductive in the wrong one:</p>
        <ArticleTable
          headers={['Scenario', 'Why a discount can work']}
          rows={[
            ['Filling unused capacity (last-minute slots)', 'An unused slot generates £0; a discounted slot generates partial revenue. Makes sense for genuinely unfillable time.'],
            ['Win-back campaign for dormant clients', 'A time-limited offer motivates a client who\'s drifted to rebook specifically now'],
            ['New client introductory offer', 'Lowers the barrier for first-time clients who haven\'t tried your work before; only justified if client lifetime value makes it worthwhile'],
            ['Student / practice pricing during training', 'While building skill; practice models accept lower rates for the service'],
          ]}
        />
      </section>

      <section id="the-case-against">
        <h2 className="font-serif text-2xl font-bold mb-4">When discounts hurt your business</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Routine discounting:</strong> "I always give regulars 10% off" trains clients to expect it and makes full price feel like an increase</li>
          <li><strong>Discounting to compete on price:</strong> There will always be someone cheaper — you can't win a price war without a lower cost base</li>
          <li><strong>Discounting under pressure:</strong> Agreeing to lower prices when a client hints they might leave rewards the behaviour and sets a precedent</li>
          <li><strong>Discounting as the only response to a slow period:</strong> Devalues your work; attracts price-sensitive clients; doesn't address the underlying reason for the quiet period</li>
        </ul>
        <ArticleTip>Once you set a precedent with a client — "she always gives me £5 off" — it\'s very difficult to walk back. Be intentional about any discount you offer.</ArticleTip>
      </section>

      <section id="which-types-work">
        <h2 className="font-serif text-2xl font-bold mb-4">Discount types that work well</h2>
        <ArticleTable
          headers={['Discount type', 'Why it works']}
          rows={[
            ['Time-limited offer ("book by [date]")', 'Creates urgency; clients act now rather than "eventually"'],
            ['New service introductory price', 'Lets clients try a new service at lower risk; builds a client base for it'],
            ['Pre-pay bundle', 'Not technically a discount — it\'s bulk buying. Client commits to multiple appointments; you get upfront payment.'],
            ['Free add-on rather than money off', 'Adds value without lowering your base service price; feels like a gift rather than a markdown'],
          ]}
        />
      </section>

      <section id="alternatives">
        <h2 className="font-serif text-2xl font-bold mb-4">Alternatives to discounting</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most of the goals a discount achieves can be reached with value-adds that don't cut your price:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Free add-on:</strong> "Book this month and I'll add chrome at no charge" — same appeal, doesn't reduce base price</li>
          <li><strong>Priority booking access:</strong> "As a regular, you get first access to new availability before it opens publicly"</li>
          <li><strong>Small gift:</strong> A mini cuticle oil or nail care item — tangible value, low cost to you</li>
          <li><strong>Loyalty program:</strong> A reward that compounds over time rather than a one-off discount</li>
        </ul>
      </section>

      <section id="framework">
        <h2 className="font-serif text-2xl font-bold mb-4">A framework for deciding</h2>
        <ArticleCallout variant="info" title="Before offering a discount, ask:">
          1. Does this discount attract the clients I want long-term, or just price-sensitive clients?{'\n'}
          2. Will this discount set an expectation I can't undo?{'\n'}
          3. Is there a non-price alternative that achieves the same goal?{'\n'}
          4. Can I actually afford this discount at my current margins?
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">If a discount passes this filter — it's strategic, time-limited, affordable, and attracts the right kind of client — it can be a useful tool. If it doesn't pass the filter, you're probably better off with a different approach.</p>
        <p className="text-gray-700 leading-relaxed">For the related question of when to raise prices instead: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">when should a nail tech raise prices</Link>.</p>
      </section>
    </div>
  ),
});
export {};
