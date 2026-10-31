import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-nail-clients-without-instagram',
  title: 'How to Get Nail Clients Without Instagram',
  seoTitle: 'How to Get Nail Clients Without Instagram (7 Channels That Work)',
  excerpt: 'Instagram isn\'t the only way to fill your nail calendar. Here are seven client acquisition channels that work without social media — and how to use each one.',
  seoDescription: 'How to get nail clients without Instagram. Google, referrals, local partnerships, email, marketplaces, and more — client acquisition channels for nail techs beyond social media.',
  category: 'get-clients',
  tags: ['nail clients without Instagram', 'nail business marketing', 'nail tech without social media', 'get nail clients'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'How to get nail clients without Instagram',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'google', label: 'Google Business Profile' },
    { id: 'referrals', label: 'Word of mouth and referrals' },
    { id: 'email', label: 'Email list' },
    { id: 'marketplaces', label: 'Booking marketplaces' },
    { id: 'local-partnerships', label: 'Local business partnerships' },
    { id: 'google-ads', label: 'Google Ads (when to consider it)' },
    { id: 'community', label: 'Local community groups' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-from-google-business-profile', 'local-seo-for-nail-techs', 'how-to-build-nail-client-referral-program', 'how-to-build-email-list-nail-tech', 'how-to-get-more-local-nail-clients'],
  faq: [
    { q: 'Can you build a full nail client list without any social media?', a: 'Yes — and many nail techs do. Google local search, word of mouth referrals, and booking marketplaces (Fresha, Treatwell) can fill a calendar without any Instagram presence. Social media accelerates growth but isn\'t a prerequisite. The channels that take more time are Google reviews (these build up slowly) and word of mouth (this requires a base of satisfied clients to activate).' },
    { q: 'Which non-Instagram channel fills a calendar fastest?', a: 'For most nail techs starting out: referrals from existing clients and booking marketplaces where clients are already searching. These have the fastest conversion path because they reach people who are already looking for a nail tech. Google starts working after you\'ve built some reviews and profile completeness — slower initially but compounds over time.' },
    { q: 'Should I be on every channel?', a: 'No. Focus on two or three channels and do them well rather than spreading thinly across everything. For most nail techs, a combination of Google Business Profile + referral program + booking marketplace provides a strong base without overwhelming marketing effort.' },
  ],
  relatedFeatureSlugs: ['bookings', 'email-newsletters', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="google">
        <h2 className="font-serif text-2xl font-bold mb-4">Google Business Profile</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When someone searches "nail tech near me", they're actively looking to book — this is higher purchase intent than most Instagram discovery. A well-optimised Google Business Profile with genuine reviews positions you at the top of these searches for free.</p>
        <p className="text-gray-700 leading-relaxed">This is typically the highest-ROI marketing channel available to a nail tech who isn't on Instagram. Full guide: <Link to="/learn/how-to-get-nail-clients-from-google-business-profile" className="underline text-[#F52B8C]">how to get more nail clients through Google Business Profile</Link>.</p>
      </section>

      <section id="referrals">
        <h2 className="font-serif text-2xl font-bold mb-4">Word of mouth and referrals</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Referred clients are among the best clients a nail tech can get — they arrive pre-sold on your work and tend to have similar expectations to your existing clients. A structured referral program formalises what already happens naturally:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Tell every satisfied client: "If any of your friends are looking for a nail tech, I'd love to have them — and I'll give you both £8 off"</li>
          <li>Ask at the end of appointments when clients are most satisfied</li>
          <li>Send a follow-up message 1–2 days later when clients are showing off their nails</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Full guide: <Link to="/learn/how-to-build-nail-client-referral-program" className="underline text-[#F52B8C]">how to build a nail client referral program</Link>.</p>
      </section>

      <section id="email">
        <h2 className="font-serif text-2xl font-bold mb-4">Email list</h2>
        <p className="text-gray-700 leading-relaxed">A small email list of existing clients who have consented to hear from you is more powerful than a large Instagram following for filling last-minute slots. When you need to fill gaps in your calendar, a direct email to past clients converts immediately. Guide: <Link to="/learn/how-to-build-email-list-nail-tech" className="underline text-[#F52B8C]">how to build an email list as a nail tech</Link>.</p>
      </section>

      <section id="marketplaces">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking marketplaces</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Platforms like Fresha, Treatwell, and Booksy have large consumer audiences actively searching for nail services. Listing on one or more of these puts you in front of people searching for a nail tech in your area, without you needing to generate your own audience.</p>
        <ArticleTable
          headers={['Platform', 'Notes']}
          rows={[
            ['Fresha', 'Strong presence in UK and internationally; consumer marketplace + booking software'],
            ['Treatwell', 'UK/Europe; large consumer audience for hair and beauty discovery'],
            ['Booksy', 'Strong in UK and US markets; popular among solo operators'],
          ]}
        />
        <ArticleTip>Marketplaces can drive new clients — but check their fee structures carefully. Some platforms charge a percentage of bookings from new marketplace clients. Calculate whether marketplace fees are worthwhile at your pricing and volume before committing.</ArticleTip>
      </section>

      <section id="local-partnerships">
        <h2 className="font-serif text-2xl font-bold mb-4">Local business partnerships</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Partner with complementary local businesses whose clients overlap with yours:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Hair salons:</strong> Clients getting their hair done also get their nails done — a cross-referral arrangement benefits both businesses</li>
          <li><strong>Brow and lash studios:</strong> Same logic — beauty clients use multiple services</li>
          <li><strong>Wedding vendors:</strong> Wedding planners, bridal boutiques, florists — bridal nail packages are high value and often referred by wedding vendors</li>
          <li><strong>Gyms and wellness studios:</strong> Leave business cards or flyers; cross-promote with the business owner</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">More on local partnership: <Link to="/learn/how-to-work-with-local-businesses-nail-tech" className="underline text-[#F52B8C]">how to work with local businesses as a nail tech</Link>.</p>
      </section>

      <section id="google-ads">
        <h2 className="font-serif text-2xl font-bold mb-4">Google Ads (when to consider it)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Google Ads (specifically Local Services Ads or search ads for "nail tech [your city]") can drive bookings immediately — but at a cost per click. Worth considering when:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You have a brand new business and can't wait 6 months for organic Google ranking</li>
          <li>You need to fill your calendar quickly for a specific period</li>
          <li>Your pricing supports the cost per client acquisition from paid ads</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For most established nail techs, organic Google Business Profile optimisation delivers better ROI than paid ads — invest in reviews and profile completeness first.</p>
      </section>

      <section id="community">
        <h2 className="font-serif text-2xl font-bold mb-4">Local community groups</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Facebook local groups, Nextdoor, and community platforms can be effective for a new nail tech building a local client base:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Introduce yourself genuinely: "Hi — I'm a nail tech based in [area], just opened bookings. Here's some of my work..."</li>
          <li>Respond when people ask for nail tech recommendations in the group</li>
          <li>Don't spam — focus on being genuinely helpful and visible, not posting promotions repeatedly</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
