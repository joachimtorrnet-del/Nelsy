import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-nail-clients-slow-season',
  title: 'How to Get Nail Clients During Slow Season',
  seoTitle: 'How to Get Nail Clients During Slow Season (Practical Strategies)',
  excerpt: 'January and early autumn are notoriously quiet for nail techs. Here\'s how to fill your calendar during slow periods without slashing your prices or panicking.',
  seoDescription: 'How to get nail clients during slow season. Practical strategies for filling your nail calendar in January, autumn, and other quiet periods — without cutting your prices.',
  category: 'get-clients',
  tags: ['slow season nail tech', 'nail clients January', 'quiet period nail business', 'nail tech slow month'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'How to get nail clients during slow season',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'when-is-slow', label: 'When nail businesses go quiet' },
    { id: 'win-back', label: 'Re-engage dormant clients' },
    { id: 'content-strategy', label: 'Content strategy for slow season' },
    { id: 'packages', label: 'Slow-season packages' },
    { id: 'plan-ahead', label: 'Planning for next season' },
    { id: 'use-the-time', label: 'What to do with the quieter time' },
  ],
  relatedSlugs: ['how-to-fill-nail-appointment-book', 'how-to-bring-back-old-nail-clients', 'how-to-fill-last-minute-nail-appointments', 'how-to-get-more-nail-clients'],
  faq: [
    { q: 'Should I discount my services in January to get more bookings?', a: 'Discounting to fill quiet periods can work short-term but has costs: it devalues your services, attracts price-sensitive clients who won\'t convert to loyal full-price clients, and sets an expectation that January = cheap. A more sustainable approach is to offer added value (a free add-on, a "nail health check" consultation) rather than price reductions. Fill quiet periods by reaching out to dormant clients, promoting new services, and running content that creates demand.' },
    { q: 'How long does January typically last as a slow period?', a: 'For most nail techs in the UK, January is the quietest month, with a gradual return to normal by mid-to-late February. The period right after the back-to-school rush in September can also be slow. Planning for these patterns rather than being surprised by them makes a significant difference.' },
    { q: 'Is it worth running paid ads in slow season?', a: 'Paid advertising (Google Ads, Instagram boosted posts) can be effective during slow periods when you have specific capacity to fill. The key is targeting: a boosted post promoting a specific service to people in your area who haven\'t engaged with you is more efficient than a broad awareness ad. Calculate whether the expected bookings justify the ad spend before committing.' },
  ],
  relatedFeatureSlugs: ['email-newsletters', 'instagram-autodm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="when-is-slow">
        <h2 className="font-serif text-2xl font-bold mb-4">When nail businesses go quiet</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For most nail techs in the UK, slow periods follow predictable patterns:</p>
        <ArticleTable
          headers={['Period', 'Why it\'s slow']}
          rows={[
            ['January', 'Post-Christmas spending fatigue; clients have just paid for festive nails; New Year\'s budgeting'],
            ['Early September', 'Post-summer; back to school; routine disruption; pre-autumn budget reset'],
            ['Mid-February after Valentine\'s', 'Brief dip after the Valentine\'s rush before spring picks up'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Knowing these patterns in advance lets you prepare rather than react in a panic. The nail techs who survive slow season well are the ones who built a waitlist and client communication strategy before it arrived.</p>
      </section>

      <section id="win-back">
        <h2 className="font-serif text-2xl font-bold mb-4">Re-engage dormant clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your most efficient slow-season strategy is reaching existing past clients who've drifted. They know your work — they don't need to be convinced from scratch:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Run a "January refresh" campaign to clients who haven't booked since before Christmas</li>
          <li>Frame it as a treat, not a discount: "You deserve a January glow-up — here's my link"</li>
          <li>A personal message to your top 10 most regular clients converts better than any broadcast</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Full win-back guide: <Link to="/learn/how-to-bring-back-old-nail-clients" className="underline text-[#F52B8C]">how to bring back old nail clients</Link>.</p>
      </section>

      <section id="content-strategy">
        <h2 className="font-serif text-2xl font-bold mb-4">Content strategy for slow season</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Quiet calendar = more time to create content. Use it:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>New season nail inspo:</strong> "Winter nail trends I'm loving right now" — creates demand before clients even thought about booking</li>
          <li><strong>Behind the scenes:</strong> Show your setup, your products, your process — content that builds connection rather than just showcasing nails</li>
          <li><strong>"New year, new nails" content:</strong> January clients respond to fresh-start framing — "treat yourself to a clean slate for the new year"</li>
          <li><strong>Educational content:</strong> Nail care tips for winter (dryness, cuticle care) positions you as the expert and naturally leads to booking CTAs</li>
        </ul>
        <ArticleTip>Post consistently during slow season even if engagement feels low. Staying visible means you\'re the first nail tech clients think of when they\'re ready to book — which may be two weeks after they saw your post.</ArticleTip>
      </section>

      <section id="packages">
        <h2 className="font-serif text-2xl font-bold mb-4">Slow-season packages</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Adding value rather than cutting price creates bookings without devaluing your work:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>"New year nail health" package:</strong> Gel manicure + cuticle treatment + aftercare pack — bundled slightly below individual prices, framed as a fresh-start treatment</li>
          <li><strong>Prepay package:</strong> Buy 4 appointments upfront at a small discount — good for January when clients are committed to better self-care and prefer predictable spending</li>
          <li><strong>Refer-a-friend January deal:</strong> Bring a friend this month and you both get a free add-on — fills two slots at once</li>
        </ul>
        <ArticleCallout variant="info" title="Added value vs discount">
          "Free cuticle treatment with every booking in January" feels more premium than "10% off in January." Both cost you something, but the first maintains your price integrity and feels like a gift rather than a markdown.
        </ArticleCallout>
      </section>

      <section id="plan-ahead">
        <h2 className="font-serif text-2xl font-bold mb-4">Planning for next season</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Use slow periods to prepare for busy ones:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Build your waitlist aggressively — ask every client to go on the waitlist so you can offer them first access to popular booking periods</li>
          <li>Prepare seasonal content in advance — batch-create 4 weeks of February/spring content in January</li>
          <li>Review your pricing — slow season is a less disruptive time to update your price list than peak season</li>
          <li>Invest in training or a new skill — a new service (e.g. nail art, BIAB) to announce as the season picks up</li>
        </ul>
      </section>

      <section id="use-the-time">
        <h2 className="font-serif text-2xl font-bold mb-4">What to do with the quieter time</h2>
        <p className="text-gray-700 leading-relaxed">Slow season is genuinely useful time. Organise your client database, audit your Google Business Profile, update your pricing page, photograph your portfolio properly, do a product review and restock, and plan your content calendar for the next 3 months. A nail tech who uses January productively enters spring better prepared than one who just waits for it to get busy again.</p>
      </section>
    </div>
  ),
});
export {};
