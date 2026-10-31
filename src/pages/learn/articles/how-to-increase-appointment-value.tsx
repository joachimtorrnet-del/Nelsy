import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-increase-appointment-value',
  title: 'How to Increase Your Average Nail Appointment Value',
  seoTitle: 'How to Increase Your Average Nail Appointment Value',
  excerpt: 'Increasing average appointment value means earning more from the same number of clients. Here are the most effective ways nail techs can do this without cutting corners or adding hours.',
  seoDescription: 'How to increase your average nail appointment value. Add-ons, upselling, pricing strategy, and rebooking techniques that increase revenue per client without new marketing.',
  category: 'pricing-money',
  tags: ['average appointment value', 'nail tech income', 'upsell nail services', 'nail business revenue'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to increase nail appointment value',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-aov-matters', label: 'Why average appointment value matters' },
    { id: 'add-ons', label: 'Add-ons that work' },
    { id: 'upsell-techniques', label: 'Natural upsell techniques' },
    { id: 'pricing-architecture', label: 'Pricing architecture' },
    { id: 'rebooking', label: 'Rebooking: the invisible revenue lever' },
  ],
  relatedSlugs: ['how-to-price-nail-art-add-ons', 'how-to-create-nail-service-menu', 'how-to-get-more-nail-client-rebookings', 'how-much-should-nail-tech-charge'],
  faq: [
    { q: 'Is it pushy to mention add-ons to every client?', a: 'No — offering add-ons as options is professional, not pushy. Clients come to you because you\'re the expert. Part of being the expert is making sure they know what\'s available. Mention add-ons naturally at consultation ("are you thinking about any extras today?") and leave the decision to the client. A client who doesn\'t want an add-on will say no; a client who does will appreciate that you asked.' },
    { q: 'What\'s the fastest way to increase my average appointment value?', a: 'Raise your base prices if they haven\'t been updated in 12+ months. This affects every single appointment rather than a percentage. After that, consistently offering and pricing add-ons is the next most impactful lever.' },
    { q: 'Should I try to upsell at every appointment?', a: 'Mention add-ons at the consultation of every appointment. Don\'t repeat the mention mid-service or at payment — once is professional, twice is pressure. The client will remember for next time even if they say no today.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-aov-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why average appointment value matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Average appointment value (AOV) is the average amount you earn per client per visit. Increasing it is one of the highest-leverage ways to grow your income because it applies to every single appointment — existing clients, new clients, all services.</p>
        <ArticleTable
          headers={['Scenario', 'Clients/week', 'AOV', 'Weekly revenue']}
          rows={[
            ['Current', '20', '£40', '£800'],
            ['Price rise of £5', '20', '£45', '£900 (+£100)'],
            ['AOV increase via add-ons (£7 avg)', '20', '£47', '£940 (+£140)'],
            ['Both changes', '20', '£52', '£1,040 (+£240)'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">£240/week extra with the same client count = over £12,000/year additional revenue. That\'s the case for investing in AOV.</p>
      </section>

      <section id="add-ons">
        <h2 className="font-serif text-2xl font-bold mb-4">Add-ons that work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The best add-ons are quick to apply, have low material cost, and feel like a natural upgrade rather than an upsell:</p>
        <ArticleTable
          headers={['Add-on', 'Extra time', 'Price', 'Revenue/20 clients if 50% take it']}
          rows={[
            ['Chrome / mirror effect', '10–15 min', '£12', '£120/week'],
            ['Cuticle oil treatment', '5 min', '£6', '£60/week'],
            ['2-nail art accent', '15 min', '£15', '£150/week'],
            ['Nail strengthening treatment', '5 min', '£8', '£80/week'],
            ['Glitter overlay', '5 min', '£8', '£80/week'],
          ]}
        />
        <ArticleTip>The best add-ons are ones you\'re genuinely enthusiastic about. If you love chrome, you\'ll mention it naturally and your enthusiasm sells it better than any script.</ArticleTip>
      </section>

      <section id="upsell-techniques">
        <h2 className="font-serif text-2xl font-bold mb-4">Natural upsell techniques</h2>
        <ArticleCallout variant="tip" title="Consultation question">
          "Are you thinking about any extras today — chrome, nail art, any special finishes? I've got some new chrome shades that would look amazing with what you're going for."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 mb-4 leading-relaxed">Other natural moments:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>On your Instagram:</strong> Post add-on results with a price mention — clients see what\'s available before they arrive</li>
          <li><strong>During booking confirmation:</strong> "You can add chrome or nail art at your appointment — options and prices are on my booking page"</li>
          <li><strong>When a client admires another client\'s nails:</strong> "That\'s the chrome effect — it\'s £12 to add — shall we do yours today?"</li>
          <li><strong>On a dry consultation:</strong> "Any occasion coming up? Birthday, event? We could do something a bit special."</li>
        </ul>
      </section>

      <section id="pricing-architecture">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing architecture</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">How you structure your prices affects what clients choose. Some principles:</p>
        <ArticleTable
          headers={['Principle', 'Example']}
          rows={[
            ['Anchor with a premium option', 'Show a "Luxury Manicure (with extras)" at £55 above your standard £38 — makes the standard look like good value, and some clients will choose the premium'],
            ['Bundle vs itemise', 'A "celebration bundle" (gel + chrome + nail art) at a slight discount sells more add-ons than listing them all separately'],
            ['Price endings', '£38 reads differently from £40 — the same applies to add-ons. £12 chrome feels different from £10.'],
            ['Describe before pricing', 'Name and describe the add-on before showing the price — "Luxe Chrome Effect — a mirror-finish chrome overlay" at £12 rather than just "Chrome £12"'],
          ]}
        />
      </section>

      <section id="rebooking">
        <h2 className="font-serif text-2xl font-bold mb-4">Rebooking: the invisible revenue lever</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A client who books every 3 weeks instead of every 4 weeks represents a 33% increase in annual revenue from that client — without any price change or add-on. Rebooking frequency is one of the most powerful (and underused) AOV levers.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Mention rebooking at the end of every appointment: "Shall we book your next appointment now? I\'m filling up quickly for [next month]."</li>
          <li>For extension clients: "Your infill will be ready in about 2–3 weeks — want to lock in a slot now?"</li>
          <li>For gel polish clients: "This colour usually lasts about 3 weeks — shall I book you in for then?"</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For the full rebooking strategy: <Link to="/learn/how-to-get-more-nail-client-rebookings" className="underline text-[#F52B8C]">how to get more nail client rebookings</Link>.</p>
      </section>
    </div>
  ),
});
export {};
