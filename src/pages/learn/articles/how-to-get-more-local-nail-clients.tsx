import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-more-local-nail-clients',
  title: 'How to Get More Local Nail Clients',
  seoTitle: 'How to Get More Local Nail Clients (Proven Strategies)',
  excerpt: 'Local clients are the lifeblood of every nail business. A practical guide to building a steady stream of clients in your area — beyond just Instagram.',
  seoDescription: 'How to get more local nail clients. Strategies covering local SEO, Google Business, community groups, referrals, collaborations, and Instagram location targeting.',
  category: 'get-clients',
  tags: ['local clients', 'local marketing', 'nail business', 'Google Business'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #93C5FD 100%)',
  heroImageAlt: 'How to get more local nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'google-business', label: 'Google Business Profile' },
    { id: 'local-instagram', label: 'Local Instagram strategy' },
    { id: 'community-groups', label: 'Facebook and community groups' },
    { id: 'collaborations', label: 'Local business collaborations' },
    { id: 'referral-programme', label: 'A simple referral programme' },
    { id: 'word-of-mouth', label: 'Maximising word of mouth' },
  ],
  relatedSlugs: ['how-to-get-more-nail-clients', 'how-to-get-nail-clients-from-instagram', 'how-to-get-booked-out-as-nail-tech'],
  faq: [
    { q: 'Does Google Business Profile help nail techs get clients?', a: 'Yes — significantly. When someone searches "nail tech near me" or "nail tech [your area]", Google Business Profiles are one of the first results. A complete profile with reviews, photos, and accurate information can drive consistent new client enquiries without any ongoing work.' },
    { q: 'Are Facebook groups still useful for getting nail clients?', a: 'Yes, especially local community groups. "Recommendations" posts in local Facebook groups are high-intent: the person asking is actively looking for a recommendation, not passively browsing. Having previous clients mention you in these threads is very effective.' },
    { q: 'How do I ask for referrals without feeling awkward?', a: 'Make it specific: "I\'m looking to take on a few new clients — if you know anyone who\'s looking for a nail tech in [area], I\'d really appreciate a recommendation." Most clients are genuinely happy to help if you like their work. The awkwardness is in your head — they don\'t find it pushy.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="google-business">
        <h2 className="font-serif text-2xl font-bold mb-4">Google Business Profile</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail techs focus entirely on Instagram and miss one of the highest-intent local marketing channels: Google. When someone searches "nail tech near me" or "nail tech [your area]", a Google Business Profile appears in the results. This is someone actively searching for a nail tech — far higher intent than an Instagram scroll.</p>
        <ArticleSteps steps={[
          { title: 'Create a free Google Business Profile', body: 'Go to Google Business and create a profile. Choose "Beauty & spas" as your category, with "Nail salon" as a more specific type.' },
          { title: 'Complete every section', body: 'Add your area (you don\'t need to show your home address — use a general area), phone number or booking link, business hours, services, and photos of your work.' },
          { title: 'Get your first Google reviews', body: 'Ask 5–10 satisfied clients to leave a Google review. Reviews are the biggest factor in local search ranking. A message like: "If you\'ve loved your nails, would you mind leaving me a Google review? It really helps me grow!" works well.' },
          { title: 'Post updates regularly', body: 'Google Business lets you post updates. Post new nail photos and availability updates to keep your profile active.' },
        ]} />
        <ArticleTip>You can list a "service area" instead of a specific address on Google Business. This means you show up in local searches without publishing your home address. Set your service area to your neighbourhood or postcode area.</ArticleTip>
      </section>

      <section id="local-instagram">
        <h2 className="font-serif text-2xl font-bold mb-4">Local Instagram strategy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Instagram is a global platform by default. Making it work for local client acquisition requires deliberate effort:</p>
        <ArticleTable
          headers={['Tactic', 'How it attracts local clients']}
          rows={[
            ['Location tags on posts', 'Posts appear in location searches for your city/area'],
            ['Local hashtags (#[City]Nails)', 'Locals searching nail content in their city find you'],
            ['Location in name field', 'Shows up when people search nail techs near them on Instagram'],
            ['Mention area in captions', 'Tells the algorithm your content is local; also appears in search'],
            ['Tag local businesses', 'Your content reaches their local follower base'],
          ]}
        />
      </section>

      <section id="community-groups">
        <h2 className="font-serif text-2xl font-bold mb-4">Facebook and community groups</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Local Facebook groups (neighbourhood groups, women's groups, local buy/sell groups) regularly have recommendation requests like "Does anyone know a good nail tech in [area]?" These are high-intent enquiries from people actively looking.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Two strategies:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Monitor and respond:</strong> Join your local groups and search for nail-related posts. When someone asks for a recommendation, respond with a brief intro and your booking link.</li>
          <li><strong>Ask clients to mention you:</strong> Ask loyal clients: "If you see anyone in [local group] asking for a nail tech recommendation, I'd love it if you mentioned me!" This is more credible than you recommending yourself.</li>
        </ol>
      </section>

      <section id="collaborations">
        <h2 className="font-serif text-2xl font-bold mb-4">Local business collaborations</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Other local businesses that serve similar clients can be a source of mutual referrals. Good targets:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Local hair salons (different service, same client)</li>
          <li>Lash and brow technicians (beauty clients who'd also want nails)</li>
          <li>Local boutiques and clothing shops (their customers care about appearance)</li>
          <li>Bridal shops (brides getting married often want nails for the wedding)</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">A simple approach: introduce yourself, leave some cards or a small collaboration offer ("I'll mention you to my clients if you mention me to yours"), and tag each other occasionally on Instagram.</p>
      </section>

      <section id="referral-programme">
        <h2 className="font-serif text-2xl font-bold mb-4">A simple referral programme</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Formalising referrals doesn't need to be complicated. A simple offer:</p>
        <ArticleCallout variant="tip" title="Simple referral programme">
          "Refer a friend and you both get £5 off your next appointment." Give clients a unique code to share, or simply ask them to mention their name when their referral books.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">The financial incentive isn't the main driver — most clients who refer do it because they like you. But an explicit programme gives clients a reason to actively mention you rather than passively thinking "oh, they might like my nail tech."</p>
      </section>

      <section id="word-of-mouth">
        <h2 className="font-serif text-2xl font-bold mb-4">Maximising word of mouth</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Word of mouth is powerful but passive by default. You can make it more active:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>At the end of every appointment: "I'm taking on new clients — if anyone you know needs a nail tech, I'd love a referral."</li>
          <li>Make the nails photo-worthy: clean finish, good shape, something worth photographing. A client who's excited about their nails naturally shows people.</li>
          <li>Make it easy for clients to share: "Would you mind posting these on Instagram and tagging me?"</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">See also: <Link to="/learn/how-to-get-more-nail-clients" className="underline text-[#F52B8C]">How to get more nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
