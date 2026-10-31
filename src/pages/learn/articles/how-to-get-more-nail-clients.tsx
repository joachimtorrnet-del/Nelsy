import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import {
  ArticleCallout,
  ArticleTip,
  ArticleSteps,
  ArticleChecklist,
  ArticleTable,
  ArticleCTAInline,
} from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-more-nail-clients',
  title: 'How to Get More Nail Clients: A Practical Guide',
  seoTitle: 'How to Get More Nail Clients: A Practical Guide for Nail Techs',
  excerpt:
    'Practical strategies to grow your nail tech client base — Instagram, photography, booking friction, deposits, referrals, retention and more.',
  seoDescription:
    'Practical strategies to grow your nail tech client base — from Instagram and photography to booking friction, deposits, referrals and retention. Written specifically for nail techs.',
  category: 'get-clients',
  tags: ['get clients', 'instagram', 'referrals', 'retention', 'deposits', 'photography'],
  heroImage: 'linear-gradient(135deg, #FDF0F7 0%, #FBCFE8 70%, #F9A8D4 100%)',
  heroImageAlt: 'How to get more nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-09-15',
  updatedAt: '2026-10-20',
  featured: true,
  toc: [
    { id: 'instagram-profile', label: '1. Optimise your Instagram profile' },
    { id: 'nail-photography', label: '2. Nail photography that converts' },
    { id: 'content', label: '3. Content strategy' },
    { id: 'booking-friction', label: '4. Reduce booking friction' },
    { id: 'deposits', label: '5. Use deposits to protect your calendar' },
    { id: 'referrals', label: '6. Build a referral system' },
    { id: 'rebooking', label: '7. Rebook at every appointment' },
    { id: 'retention', label: '8. Client retention and experience' },
    { id: 'useful-resources', label: 'Useful resources' },
  ],
  relatedSlugs: ['nail-tech-pricing-guide', 'nail-tech-deposit-policy'],
  faq: [
    {
      q: 'How long does it take to build a full client base as a nail tech?',
      a: 'Most nail techs see meaningful growth within 3–6 months of consistently posting work and making it easy to book. A full, reliably booked calendar typically takes 12–18 months if you start from scratch.',
    },
    {
      q: 'Do I need a large Instagram following to get nail clients?',
      a: "No. Most nail techs get their clients from local searches and word of mouth, not from follower count. 500 engaged local followers who can book is worth more than 10,000 followers who aren't in your area.",
    },
    {
      q: 'What is the single most effective way to get more nail clients?',
      a: 'Making it easy to book you — a direct booking link, clear pricing, and a fast response to enquiries — converts more of the people who already want to book you. Most nail techs lose potential clients through friction, not lack of visibility.',
    },
    {
      q: 'Should I offer discounts to attract new nail clients?',
      a: "Discounts attract price-sensitive clients who are less likely to become regulars and harder to move to full price later. Introductory pricing is fine for a short period when you're building your portfolio, but for most nail techs the better lever is reducing friction (easier booking, clearer pricing, faster response).",
    },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm', 'bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">

      <section id="instagram-profile">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Optimise your Instagram profile</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Your Instagram profile is effectively your shop front. Before someone books you, they land on your profile and make a decision in seconds. Most nail tech profiles fail at three things: the bio doesn't say where you're based, there's no way to book, and the grid doesn't make the work look its best.
        </p>
        <ArticleChecklist
          title="Profile checklist"
          items={[
            'Name field includes a searchable keyword — "Nail Tech London" or similar',
            'Bio mentions your location and the types of nails you specialise in',
            'Bio link goes directly to a booking page, not a personal website homepage',
            'Highlights include Prices, Services and Before & After',
            'All recent posts are nail photos — not behind-the-scenes, not selfies',
          ]}
        />
        <ArticleTip>
          Use the Name field (not the bio) for your location keyword. Instagram searches the Name field — so "Maya | Nail Tech East London" will surface in searches for "nail tech east london" and "Maya" will not.
        </ArticleTip>
      </section>

      <section id="nail-photography">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Nail photography that converts</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nail photography is your marketing. If your photos don't make the work look good, no other strategy will compensate. You do not need a professional camera. Consistent natural light, a neutral backdrop, and a clean lens get 90% of the way there.
        </p>
        <ArticleTable
          headers={['What to fix', 'Why it matters', 'How to fix it']}
          rows={[
            ['Blurry photos', 'Makes work look unprofessional regardless of quality', 'Tap to focus on the nail edge before shooting'],
            ['Yellow / warm light', 'Distorts nail colours, especially whites and nudes', 'Shoot near a window in natural daylight, not under ceiling lights'],
            ['Dark backgrounds', 'Loses nail detail and looks unpolished', 'White paper, marble-effect paper, or a neutral fabric'],
            ['Multiple hands in frame', 'Splits attention and reduces perceived quality', 'Focus on one hand per post for hero shots'],
            ['Low resolution', 'Looks poor on explore pages and in reposts', 'Shoot square or 4:5 vertical at full phone resolution'],
          ]}
        />
        <ArticleTip>
          Take 10–15 shots per set and only post the best 2–3. Clients judge your average — show them your best.
        </ArticleTip>
      </section>

      <section id="content">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Content strategy that grows a local audience</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Consistency matters more than creativity for local service accounts. You are not trying to go viral — you are trying to stay visible to the people in your area who are already looking for a nail tech. Three to four posts per week of quality nail work, with accurate location tags, is more effective than ten posts of mixed content.
        </p>
        <ArticleCallout variant="info" title="What content actually works for nail techs">
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Finished nail sets</strong> — the core of your content. Post every set you're proud of.</li>
            <li><strong>Before and after</strong> — strong for engagement and shows client transformation.</li>
            <li><strong>Process clips</strong> — Reels of application, nail art, or filing. These get algorithmic push.</li>
            <li><strong>Client testimonials</strong> — screenshot and share (with permission).</li>
            <li><strong>Pricing and availability posts</strong> — "I have 2 slots this Friday" — direct booking intent.</li>
          </ul>
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Location tags are critical. Tag your city and neighbourhood on every post. Instagram uses location data to surface local content. A nail tech in Manchester who tags their location consistently will appear in local explore feeds far more than one who doesn't.
        </p>
      </section>

      <section id="booking-friction">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Reduce booking friction</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Booking friction is the gap between a potential client wanting to book you and actually doing it. Every extra step — a DM that doesn't get answered, a WhatsApp you reply to the next day, a price question that requires a back-and-forth — loses you clients to nail techs who are easier to book.
        </p>
        <ArticleSteps
          steps={[
            {
              title: 'Have a single booking link in your bio',
              body: 'Your bio link should go directly to a page where someone can see your services, pricing, and available times without contacting you first.',
            },
            {
              title: 'Show your prices publicly',
              body: "Nail techs who hide pricing get fewer enquiries because clients don't like asking. Prices on your booking page reduce that barrier.",
            },
            {
              title: 'Remove unnecessary steps from the booking flow',
              body: 'The fewer clicks between "I want to book" and "booking confirmed", the higher your conversion rate. A form that asks for 10 pieces of information before confirming availability will lose people.',
            },
            {
              title: 'Set up instant confirmation',
              body: 'Clients who book and get an immediate confirmation message are far more likely to show up. A confirmation that arrives 24 hours later creates doubt.',
            },
          ]}
        />
        <p className="text-gray-700 leading-relaxed">
          <ArticleCTAInline to="/">Nelsy</ArticleCTAInline> gives every nail tech a direct booking page with real-time availability, public pricing, and instant confirmation messages — so you convert more of the people who are already looking for you.
        </p>
      </section>

      <section id="deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Use deposits to protect your calendar</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          A fully booked calendar with frequent no-shows is worse than a quieter calendar with reliable clients. Requiring a deposit to hold an appointment is the single most effective way to filter for clients who take their booking seriously.
        </p>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Most nail techs who add a deposit requirement see an immediate drop in no-shows and last-minute cancellations. Clients who have paid £15–25 to hold a slot almost always show up or give enough notice to fill the slot.
        </p>
        <ArticleCallout variant="success" title="How much to charge as a deposit">
          £15–25 is the most common range for nail appointments in the UK. This is enough to feel meaningful to the client (reducing no-shows) without being a barrier to booking. For long appointments (full sets, nail art sessions over 2 hours), a higher deposit — £30–50 — is reasonable.
        </ArticleCallout>
        <p className="text-gray-700 mt-4">
          See the full guide: <Link to="/nail-tech-deposits" className="underline text-[#F52B8C]">How to take deposits as a nail tech</Link> — covering amounts, how to introduce deposits to existing clients, and handling objections.
        </p>
      </section>

      <section id="referrals">
        <h2 className="font-serif text-2xl font-bold mb-4">6. Build a referral system</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Referrals are the highest-converting source of new clients for most nail techs. A client referred by a friend already trusts you before they book. The problem is most nail techs leave referrals to chance rather than making them systematic.
        </p>
        <ArticleSteps
          steps={[
            {
              title: 'Ask for referrals directly',
              body: "Clients who love your work will refer friends if you ask. Most won't do it without a prompt. A simple message — \"If you have friends who need a nail tech, I'd love for you to pass on my booking link\" — works.",
            },
            {
              title: 'Create a referral offer',
              body: "A small incentive formalises the system. \"Refer a friend and get £5 off your next booking\" or a complimentary nail art add-on is low cost and high impact.",
            },
            {
              title: 'Make it easy to share',
              body: 'The easier your booking link is to share, the more referrals you\'ll get. A short link — like a Nelsy booking page URL — is shareable in a DM or text in seconds.',
            },
          ]}
        />
      </section>

      <section id="rebooking">
        <h2 className="font-serif text-2xl font-bold mb-4">7. Rebook at every appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The easiest client to book is a client who is already with you. Most nail techs miss the opportunity to rebook at the appointment itself — and then compete for the client's attention in their inbox weeks later.
        </p>
        <ArticleTip>
          At the end of every appointment, say: "Want to book your next infill now while you're here? I'm usually booked 3–4 weeks out." Clients who rebook on the spot have significantly higher retention rates than those who say they'll message later.
        </ArticleTip>
        <p className="text-gray-700 mt-4">
          Use the follow-up message to drive rebooking from clients who didn't rebook in person. See the{' '}
          <Link to="/tools/nail-tech-appointment-reminder-templates" className="underline text-[#F52B8C]">
            appointment reminder templates
          </Link>{' '}
          for a post-appointment follow-up message you can copy and personalise.
        </p>
      </section>

      <section id="retention">
        <h2 className="font-serif text-2xl font-bold mb-4">8. Client retention and experience</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Retention is more valuable than acquisition. A client who books every 4 weeks is worth 12–13 appointments per year. Getting that client to stay costs far less than finding 13 new ones.
        </p>
        <ArticleTable
          headers={['Retention factor', 'What to do']}
          rows={[
            ['First appointment experience', "Ask about their nail history and lifestyle. Clients who feel listened to are more likely to return."],
            ['Aftercare advice', "Tell clients how to care for their nails between appointments. Clients whose nails last longer credit their nail tech."],
            ['Consistent communication', "Send confirmations. Reschedule with notice. Small acts of reliability build long-term relationships."],
            ['Remembering details', "A note about their job, lifestyle or what they want to try next makes return appointments feel personal."],
            ['Pricing stability', "Sudden price increases without notice lose clients. Give advance notice and explain the reason."],
          ]}
        />
      </section>

      <section id="useful-resources">
        <h2 className="font-serif text-2xl font-bold mb-4">Useful resources</h2>
        <ul className="space-y-2 text-sm">
          {[
            ['/nail-tech-deposits', 'How to take deposits as a nail tech — amounts, scripts, objections'],
            ['/learn/nail-tech-pricing-guide', 'Nail tech pricing guide — how to set your rates and charge what you\'re worth'],
            ['/tools/nail-tech-appointment-reminder-templates', 'Free appointment reminder templates — confirmation, 24-hour reminder, follow-up'],
            ['/tools/nail-tech-cancellation-policy-generator', 'Free cancellation policy generator for nail techs'],
            ['/instagram-booking-for-nail-techs', 'How to get bookings from Instagram — set up, link in bio, converting followers'],
          ].map(([href, label]) => (
            <li key={href}>
              <Link to={href} className="underline text-[#F52B8C] leading-relaxed">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  ),
});

export {};
