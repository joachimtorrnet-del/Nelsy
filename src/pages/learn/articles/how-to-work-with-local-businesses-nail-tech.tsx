import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-work-with-local-businesses-nail-tech',
  title: 'How to Work With Local Businesses as a Nail Tech',
  seoTitle: 'How to Work With Local Businesses as a Nail Tech to Get More Clients',
  excerpt: 'Cross-referrals with complementary local businesses can be one of the most efficient client acquisition channels for nail techs. Here\'s how to build partnerships that actually work.',
  seoDescription: 'How to work with local businesses as a nail tech. Cross-referral partnerships with hair salons, wedding vendors, and beauty businesses to grow your nail client base.',
  category: 'get-clients',
  tags: ['nail tech local partnerships', 'nail business collaboration', 'nail tech marketing', 'local business nail tech'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
  heroImageAlt: 'How to work with local businesses as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-partnerships', label: 'Why local partnerships work' },
    { id: 'who-to-partner-with', label: 'Who to partner with' },
    { id: 'cross-referral', label: 'Setting up a cross-referral arrangement' },
    { id: 'bridal-market', label: 'The bridal market' },
    { id: 'approaching-businesses', label: 'How to approach a potential partner' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-without-instagram', 'how-to-get-more-local-nail-clients', 'how-to-build-nail-client-referral-program', 'how-to-run-nail-tech-popup-events'],
  faq: [
    { q: 'Do I need to pay the referring business a commission?', a: 'A formal commission structure (pay per referral) exists, but informal cross-referral arrangements are more common and often more effective. Both businesses refer clients to each other mutually — no money changes hands. This works best when the client audiences genuinely overlap and both businesses are actively referring.' },
    { q: 'What if a partner business starts offering nail services themselves?', a: 'This is a risk in any partnership arrangement, particularly with hair salons that might expand into nails. Build relationships with business owners who genuinely don\'t want to offer nail services and see you as complementary. Make the relationship worth maintaining — consistent referrals from you mean they have an incentive to keep sending clients your way rather than doing nails themselves.' },
    { q: 'How do I track whether partnership referrals are working?', a: 'Ask every new client "how did you hear about me?" at their first appointment. Track the answers — you\'ll quickly see whether a specific partner relationship is generating actual bookings or just goodwill conversations. Invest more in partnerships that produce real referrals.' },
  ],
  relatedFeatureSlugs: ['bookings', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-partnerships">
        <h2 className="font-serif text-2xl font-bold mb-4">Why local business partnerships work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a hair stylist who knows your work recommends you to a client sitting in their chair, that recommendation carries far more weight than any Instagram post. The client trusts the stylist — and that trust transfers to you before the client even looks at your work.</p>
        <p className="text-gray-700 leading-relaxed">Local partnerships work because they access warm audiences who already trust the recommending business. The conversion rate from a genuine personal recommendation is significantly higher than from cold discovery through social media or search. And unlike building an Instagram following, a good partnership relationship generates recurring referrals over months or years.</p>
      </section>

      <section id="who-to-partner-with">
        <h2 className="font-serif text-2xl font-bold mb-4">Who to partner with</h2>
        <ArticleTable
          headers={['Business type', 'Why it works', 'What to offer']}
          rows={[
            ['Hair salons', 'Their clients get nails done too; same beauty-focused customer; no competition with nails', 'Cross-refer — you send them hair clients, they send you nail clients'],
            ['Brow and lash studios', 'Same client demographic; beauty appointments often cluster together', 'Cross-referral arrangement; shared marketing (Instagram tags, Stories)'],
            ['Tanning salons', 'Tanning clients want to look good all over; nails fit the same visit to a beauty area', 'Leave business cards; offer a referral discount for their clients'],
            ['Bridal boutiques', 'Brides need nails; wedding planners recommend multiple vendors', 'Be the go-to nail tech for their brides; offer bridal nail packages'],
            ['Wedding photographers / planners', 'Hands appear in wedding photos; nail tech recommendations are common', 'Build a relationship; ask to be added to their preferred vendor list'],
            ['Gyms and spas', 'Wellness clients invest in their appearance; fitness-conscious clients often care about their nails', 'Leave flyers; negotiate a cork board or referral card placement'],
          ]}
        />
      </section>

      <section id="cross-referral">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up a cross-referral arrangement</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The simplest cross-referral arrangement requires nothing formal:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You refer clients who mention they need hair/lashes/brows to your partner</li>
          <li>They refer clients who mention they want their nails done to you</li>
          <li>Both parties actively mention the other: "Have you got your nails sorted? I work with a great nail tech — here's her card"</li>
        </ul>
        <ArticleCallout variant="tip" title="Make it easy to refer">
          Give your partner business a small stack of your business cards and a sentence they can use: "I always recommend [your name] for nails — she's brilliant and her bookings fill up fast, so I'd book soon." Make it easy for them to refer confidently.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Formalise with a referral discount if you want to track it: "Tell your stylist at [hair salon] I sent you and get £5 off" — this incentivises active referral from the partner and lets you track where clients came from.</p>
      </section>

      <section id="bridal-market">
        <h2 className="font-serif text-2xl font-bold mb-4">The bridal market</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Bridal nail bookings are high-value and often generate further bookings (bridesmaids, mother of the bride, future regular clients). Getting into the bridal referral network is worth deliberate effort:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Create a specific bridal nail package with a clear name and price</li>
          <li>Build a small bridal portfolio on your Instagram and website — brides search for bridal nail inspo specifically</li>
          <li>Contact local bridal boutiques and wedding planners directly: "I'm a nail tech specialising in bridal work — I'd love to be on your recommended vendor list"</li>
          <li>Attend local wedding fairs where relevant vendors gather</li>
          <li>Ask happy bridal clients to recommend you to other brides in their network</li>
        </ul>
      </section>

      <section id="approaching-businesses">
        <h2 className="font-serif text-2xl font-bold mb-4">How to approach a potential partner</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Be direct and make the value clear for them — not just for you:</p>
        <ArticleCallout variant="tip" title="Opening message / approach">
          "Hi — I'm [name], a nail tech based in [area]. I noticed we serve similar clients and I think we could help each other — I regularly have clients asking for hair/lash recommendations and I'd love to refer them to you. In return, if any of your clients mention wanting their nails done, I'd really appreciate the recommendation. I'd happily come in to meet you and show you my work — would that be worth 10 minutes?"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For pop-up events with local partner businesses: <Link to="/learn/how-to-run-nail-tech-popup-events" className="underline text-[#F52B8C]">how to run nail tech pop-up events</Link>.</p>
      </section>
    </div>
  ),
});
export {};
