import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import {
  ArticleCallout,
  ArticleTip,
  ArticleSteps,
  ArticleChecklist,
  ArticleTable,
} from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-to-get-more-nail-clients',
  title: 'How to Get More Nail Clients: A Practical Guide',
  coverTitle: 'Get More Nail Clients',
  seoTitle: 'How to Get More Nail Clients: A Practical Guide for Nail Techs',
  excerpt:
    'Practical strategies to grow your nail tech client base: Instagram, photography, booking friction, deposits, referrals, retention and more.',
  seoDescription:
    'Practical ways to grow your nail tech client base: Instagram, photography, easier booking, deposits, referrals and retention, with templates you can copy.',
  category: 'get-clients',
  audience: ['pros'],
  craft: 'nails',
  tags: ['get clients', 'instagram', 'referrals', 'retention', 'deposits', 'photography'],
  heroImage: 'linear-gradient(135deg, #FDF0F7 0%, #FBCFE8 70%, #F9A8D4 100%)',
  heroImageAlt: 'How to get more nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-09-15',
  updatedAt: '2026-11-26',
  featured: true,
  tldr: {
    answer: 'To get more nail clients, make your Instagram show your location and best work, put a direct booking link in your bio, and turn every happy client into a rebooking and a referral.',
    detail: 'Most growth comes from converting people who already found you (less friction) and keeping the clients you have (rebooking, referrals). New reach from content matters, but it leaks if booking is hard.',
    points: [
      { label: 'This week', text: 'Fix your name field, bio and booking link; post prices in a Highlight.' },
      { label: 'Every appointment', text: 'Rebook before the client leaves and hand over a referral offer.' },
      { label: 'Every week', text: '3 to 4 posts of finished work with a location tag and one clear CTA.' },
    ],
  },
  toc: [
    { id: 'instagram-profile', label: '1. Optimise your Instagram profile' },
    { id: 'nail-photography', label: '2. Nail photography that converts' },
    { id: 'content', label: '3. Content strategy' },
    { id: 'booking-friction', label: '4. Reduce booking friction' },
    { id: 'deposits', label: '5. Use deposits to protect your calendar' },
    { id: 'referrals', label: '6. Build a referral system' },
    { id: 'rebooking', label: '7. Rebook at every appointment' },
    { id: 'retention', label: '8. Client retention and experience' },
    { id: 'plan', label: 'Your 30-day plan' },
    { id: 'useful-resources', label: 'Useful resources' },
  ],
  relatedSlugs: ['nail-tech-pricing-guide', 'nail-tech-deposit-policy'],
  faq: [
    {
      q: 'How long does it take to build a full client base as a nail tech?',
      a: 'It varies with your area, prices, skill and how often you post, so plan in months rather than weeks. Track one number weekly: how many of your available slots were booked. If that rises month on month, you are on track. Rebooking every client and asking for referrals speeds it up more than anything else.',
    },
    {
      q: 'Do I need a large Instagram following to get nail clients?',
      a: "No. You need local followers who can book. A small account with location tags, clear prices and an easy booking link can fill a solo diary, because you only need enough regulars to fill your week. Example: 4 clients a day × 4 days = 16 appointments a week; with clients returning every 3 to 4 weeks, around 50 to 60 regulars would fill that.",
    },
    {
      q: 'What is the single most effective way to get more nail clients?',
      a: 'Make it easy to book: a direct booking link, visible prices and live availability, so people who already want you can book in a couple of minutes without waiting for a DM reply. Then rebook every client before they leave.',
    },
    {
      q: 'Should I offer discounts to attract new nail clients?',
      a: "Use them carefully. Deep discounts attract clients who may not return at full price. A better first-visit offer is a free add-on (chrome, a nail art accent) or a referral reward that only pays out when a new client books. If you do run a discount, limit it to new clients and quiet weekdays.",
    },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm', 'bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">

      <section id="instagram-profile">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Optimise your Instagram profile</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Your Instagram profile is your shop front. Before someone books, they land on your profile and decide in seconds. Three common gaps: the bio doesn&apos;t say where you are, there&apos;s no obvious way to book, and the grid doesn&apos;t show the work at its best.
        </p>
        <ArticleChecklist
          title="Profile checklist"
          items={[
            'Name field includes a searchable keyword, such as "Nail Tech London"',
            'Bio mentions your location and the nails you specialise in',
            'Bio link goes directly to a booking page, not a website homepage',
            'Highlights include Prices, Services and Before & After',
            'The first 9 posts of your grid are your best nail photos',
          ]}
        />
        <ArticleTip>
          Put your location keyword in the Name field, not only the bio. The Name field is searchable, so &quot;Maya | Nail Tech East London&quot; can show up when someone searches &quot;nail tech east london&quot;. Bio templates: <Link to="/blog/best-instagram-bio-ideas-for-nail-techs" className={link}>Instagram bio ideas for nail techs</Link>.
        </ArticleTip>
      </section>

      <section id="nail-photography">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Nail photography that converts</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Your photos are your marketing. You don&apos;t need a professional camera: consistent natural light, a neutral backdrop and a clean lens solve most problems.
        </p>
        <ArticleTable
          headers={['What to fix', 'Why it matters', 'How to fix it']}
          rows={[
            ['Blurry photos', 'Makes work look unprofessional regardless of quality', 'Tap to focus on the nail edge before shooting'],
            ['Yellow / warm light', 'Distorts nail colours, especially whites and nudes', 'Shoot near a window in daylight, not under ceiling lights'],
            ['Dark backgrounds', 'Hides nail detail', 'White paper, marble-effect paper, or a neutral fabric'],
            ['Multiple hands in frame', 'Splits attention', 'One hand per post for hero shots'],
            ['Low resolution', 'Looks poor in the feed and in reposts', 'Shoot 4:5 vertical at full phone resolution'],
          ]}
        />
        <ArticleTip>
          Take 10 to 15 shots per set and post only the best 2 or 3. People judge your average photo, so show them your best.
        </ArticleTip>
      </section>

      <section id="content">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Content strategy that grows a local audience</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          For a local service, consistency beats virality. You are trying to stay visible to people nearby who are looking for a nail tech. Three to four posts a week of good work, each with a location tag, is a realistic and effective rhythm.
        </p>
        <ArticleCallout variant="info" title="What content works for nail techs">
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Finished nail sets:</strong> the core of your content.</li>
            <li><strong>Before and after:</strong> shows the transformation.</li>
            <li><strong>Process clips:</strong> Reels of application, nail art or filing, the main format for reaching non-followers.</li>
            <li><strong>Client reviews:</strong> screenshot and share, with permission.</li>
            <li><strong>Availability posts:</strong> &quot;2 slots this Friday&quot;, for people ready to book.</li>
          </ul>
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Tag your city and neighbourhood on every post and use one or two local hashtags. More ideas: <Link to="/blog/100-nail-tech-content-ideas" className={link}>100 nail tech content ideas</Link>.
        </p>
      </section>

      <section id="booking-friction">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Reduce booking friction</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Booking friction is the gap between someone wanting to book you and actually doing it. Every extra step (a DM that waits a day for a reply, a price question, a back-and-forth about times) gives them a chance to book someone else.
        </p>
        <ArticleCallout variant="info" title="Example: what friction costs">
          Example: 40 people a month tap your bio wanting to book. If half drop off while waiting for DM replies, you get 20 bookings. If a direct booking page keeps 3 in 4 of them, you get 30. At £45 a set, that is 10 × £45 = £450 a month from the same audience.
        </ArticleCallout>
        <ArticleSteps
          steps={[
            {
              title: 'Have a single booking link in your bio',
              body: 'It should open a page with your services, prices and available times, without contacting you first.',
            },
            {
              title: 'Show your prices publicly',
              body: "Many clients won't message to ask a price. Prices on your booking page remove that barrier.",
            },
            {
              title: 'Remove unnecessary steps',
              body: 'Ask only for what you need to book: name, phone or email, service, time. Save the rest for a short form after booking.',
            },
            {
              title: 'Send instant confirmation',
              body: 'An immediate confirmation with date, time, address and price reassures the client that the booking is real.',
            },
          ]}
        />
        <p className="text-gray-700 leading-relaxed">
          Nelsy gives you a link-in-bio booking page with live availability, public prices and instant confirmations, and you choose per service whether clients pay on arrival, a deposit or in full. See it on the <Link to="/demo" className={link}>demo page</Link>.
        </p>
      </section>

      <section id="deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Use deposits to protect your calendar</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          A full calendar with frequent no-shows is worse than a slightly quieter calendar with reliable clients. A deposit to hold the appointment gives clients a reason to show up or cancel properly, and filters out people who were never going to come.
        </p>
        <ArticleCallout variant="success" title="How much to charge as a deposit">
          A simple rule: about 25 to 30% of the service price, rounded. Example: a £60 set × 30% = £18, rounded to £20. For long appointments (full sets or nail art over 2 hours), 50% or full payment upfront is reasonable.
        </ArticleCallout>
        <p className="text-gray-700 mt-4">
          Full guide: <Link to="/nail-tech-deposits" className={link}>how to take deposits as a nail tech</Link>, covering amounts, how to introduce deposits to existing clients, and handling objections.
        </p>
      </section>

      <section id="referrals">
        <h2 className="font-serif text-2xl font-bold mb-4">6. Build a referral system</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          A client referred by a friend already trusts you before they book. Leave referrals to chance and you get a few; make them a system and you get them every month.
        </p>
        <ArticleSteps
          steps={[
            {
              title: 'Ask directly',
              body: "Many happy clients would refer a friend but won't think to. Ask at the end of the appointment, when they are admiring their nails.",
            },
            {
              title: 'Create a referral offer',
              body: '"Refer a friend: you both get £5 off" or a free nail art accent. Pay it out only when the friend actually completes an appointment.',
            },
            {
              title: 'Make it easy to share',
              body: 'Send your booking link by text after the appointment so they can forward it in one tap.',
            },
          ]}
        />
        <ArticleCallout variant="info" title="Copy this referral message">
          &quot;Thanks for coming in today, [name]! 💅 If a friend asks about your nails, send them this link: [booking link]. When they book their first appointment, you both get [£5 off / a free chrome upgrade] on your next visit.&quot;
        </ArticleCallout>
        <ArticleCallout variant="info" title="Example: is a £5 reward worth it?">
          Example: a new client who books a £45 set every 4 weeks for 6 months brings about 6 × £45 = £270. A £5 reward each for referrer and friend costs £10, which is under 4% of that.
        </ArticleCallout>
      </section>

      <section id="rebooking">
        <h2 className="font-serif text-2xl font-bold mb-4">7. Rebook at every appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The easiest client to book is the one already in your chair. If you wait for them to message later, you are competing with everything else in their inbox.
        </p>
        <ArticleTip>
          At the end of every appointment, say: &quot;Shall we book your next infill now? Three weeks would be [date]. I tend to fill up, so it&apos;s easier to hold it now.&quot; Then book it there and then, while they are still with you.
        </ArticleTip>
        <p className="text-gray-700 mt-4">
          For clients who didn&apos;t rebook in person, send a follow-up. Copy one from the{' '}
          <Link to="/tools/nail-tech-appointment-reminder-templates" className={link}>
            appointment reminder templates
          </Link>.
        </p>
      </section>

      <section id="retention">
        <h2 className="font-serif text-2xl font-bold mb-4">8. Client retention and experience</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Keeping a client is usually cheaper than finding a new one. A client who books every 4 weeks comes about 52 ÷ 4 = 13 times a year. At £45 a visit, that is 13 × £45 = £585 a year from one person.
        </p>
        <ArticleTable
          headers={['Retention factor', 'What to do']}
          rows={[
            ['First appointment experience', 'Ask about their nail history and lifestyle. Clients who feel listened to are more likely to return.'],
            ['Aftercare advice', 'Tell clients how to care for their nails between appointments, and send it in writing.'],
            ['Consistent communication', 'Send confirmations. Reschedule with notice. Reliability builds long-term relationships.'],
            ['Remembering details', 'Note their job, lifestyle or what they want to try next, and mention it next time.'],
            ['Pricing stability', 'Give advance notice of price rises and explain the reason.'],
          ]}
        />
      </section>

      <section id="plan">
        <h2 className="font-serif text-2xl font-bold mb-4">Your 30-day plan</h2>
        <ArticleTable
          headers={['Week', 'Do this']}
          rows={[
            ['Week 1', 'Fix name field, bio and booking link. Add Prices and Before & After Highlights. Set your deposit rule.'],
            ['Week 2', 'Post 3 to 4 times with location tags. Start rebooking every client at checkout.'],
            ['Week 3', 'Launch your referral offer. Send the referral message after every appointment.'],
            ['Week 4', 'Count: bio taps, bookings, rebookings, referrals. Keep what worked, change one thing that didn\'t.'],
          ]}
        />
      </section>

      <section id="useful-resources">
        <h2 className="font-serif text-2xl font-bold mb-4">Useful resources</h2>
        <ul className="space-y-2 text-sm">
          {[
            ['/nail-tech-deposits', 'How to take deposits as a nail tech: amounts, scripts, objections'],
            ['/blog/nail-tech-pricing-guide', 'Nail tech pricing guide: how to set your rates'],
            ['/tools/nail-tech-appointment-reminder-templates', 'Free appointment reminder templates: confirmation, 24-hour reminder, follow-up'],
            ['/tools/nail-tech-cancellation-policy-generator', 'Free cancellation policy generator for nail techs'],
            ['/instagram-booking-for-nail-techs', 'How to get bookings from Instagram: set up, link in bio, converting followers'],
          ].map(([href, label]) => (
            <li key={href}>
              <Link to={href} className={`${link} leading-relaxed`}>
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
