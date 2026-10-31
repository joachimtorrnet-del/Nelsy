import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-more-nail-client-rebookings',
  title: 'How to Get More Nail Client Rebookings',
  seoTitle: 'How to Get More Nail Client Rebookings (Strategies That Work)',
  excerpt: 'Rebooking is the simplest way to grow a stable nail business. Here\'s how to ask for the next appointment naturally — and build systems that keep your calendar full.',
  seoDescription: 'How to get more nail client rebookings. Rebooking strategies for nail techs — when to ask, what to say, reminder systems, and how to fill your calendar with returning clients.',
  category: 'get-clients',
  tags: ['nail client rebooking', 'nail client retention', 'rebooking strategy', 'nail business growth'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'How to get more nail client rebookings',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-rebooking-matters', label: 'Why rebooking is your best growth lever' },
    { id: 'ask-at-appointment', label: 'How to ask at the appointment' },
    { id: 'reminder-strategy', label: 'The reminder strategy' },
    { id: 'booking-platform', label: 'Using your booking platform' },
    { id: 'handling-not-sure', label: 'When clients say "I\'ll let you know"' },
  ],
  relatedSlugs: ['how-to-increase-nail-client-retention', 'how-to-increase-appointment-value', 'how-to-get-booked-out-as-nail-tech', 'how-to-fill-nail-appointment-book'],
  faq: [
    { q: 'When should I ask a nail client to rebook?', a: 'At the end of the appointment, before the client leaves. This is the moment when they\'re most satisfied — their nails are fresh, they\'re happy with the result. A natural rebooking question in this moment converts at a much higher rate than a follow-up message the next day. Get into the habit of asking every client, every time.' },
    { q: 'What if a client doesn\'t want to book ahead?', a: 'Some clients genuinely can\'t plan ahead. Accept this gracefully and have a system for reaching them — a reminder message 2 weeks after their appointment ("Your nails will be ready for a refresh soon — link in bio to book") keeps you visible without being pushy.' },
    { q: 'How do I get clients who disappeared to come back?', a: 'A win-back message 6–8 weeks after their last appointment: "We miss you! It\'s been a while since your last appointment — [new seasonal design / colour] is perfect right now and I\'d love to see you. Link to book: [link]." Keep it warm and personal, not promotional. Some clients respond; some don\'t — move on either way.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings', 'email-newsletters'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-rebooking-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why rebooking is your best growth lever</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Rebooking existing clients is more efficient than acquiring new ones. A client who comes every 3 weeks instead of every 5 weeks represents a 67% increase in annual bookings from that client — without any marketing spend. At scale, a 20-client-per-week business where the average rebooking frequency improves from 4 weeks to 3 weeks generates an additional 260 appointments per year.</p>
        <ArticleTable
          headers={['Rebooking frequency', 'Appointments/client/year', 'Revenue/client at £40']}
          rows={[
            ['Every 6 weeks', '8-9', '~£340'],
            ['Every 4 weeks', '13', '~£520'],
            ['Every 3 weeks', '17', '~£680'],
            ['Every 2 weeks', '26', '~£1,040'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Moving a client from 4-weekly to 3-weekly rebooking is worth an extra £160/year from that single client, with no additional marketing cost.</p>
      </section>

      <section id="ask-at-appointment">
        <h2 className="font-serif text-2xl font-bold mb-4">How to ask at the appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The highest-conversion moment for rebooking is the end of the appointment — the client is happy, their nails look fresh, and they're already in the mindset of making appointments. Ask simply and directly:</p>
        <ArticleCallout variant="tip" title="Rebooking scripts">
          For gel polish: "Your gel usually lasts about 3 weeks — shall I put you in for then? I can check my availability now."
          {'\n\n'}
          For extensions: "You'll want to come in for your infill in about 2–3 weeks. Shall I book you in now while I've got good availability?"
          {'\n\n'}
          For irregular clients: "When do you think you'll want a refresh? I can pencil you in — easier to move it later than find a slot from scratch."
        </ArticleCallout>
        <ArticleTip>Frame rebooking as a convenience for them ("easier to book now than find a slot later") rather than as something you need from them ("I need to fill my calendar"). It\'s both true and more compelling.</ArticleTip>
      </section>

      <section id="reminder-strategy">
        <h2 className="font-serif text-2xl font-bold mb-4">The reminder strategy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For clients who don\'t rebook on the day, a timed reminder message recaptures many of them:</p>
        <ArticleTable
          headers={['Timing', 'Message focus', 'Example']}
          rows={[
            ['2 weeks after appointment', 'Gentle check-in, booking link', '"Your nails are about due a refresh — link in bio to book your next appointment 💅"'],
            ['3 weeks after appointment', 'Slight urgency, upcoming seasonal content', '"Still loving your set? I\'m booking up for [month] — link in bio to grab a slot before they\'re gone"'],
            ['End of calendar month', 'Monthly availability post on Stories', '"[Month] bookings are now open — link in bio. These fill fast!"'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Automating this via your booking platform's follow-up messages removes the manual effort. Most booking platforms that offer client messaging support timed post-appointment messages.</p>
      </section>

      <section id="booking-platform">
        <h2 className="font-serif text-2xl font-bold mb-4">Using your booking platform</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking system should support rebooking, not just first-time bookings. Look for:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Client history:</strong> See when a client last booked, which service they had, and when their next booking is</li>
          <li><strong>Post-appointment follow-up messages:</strong> Automated messages sent after appointments prompting rebooking</li>
          <li><strong>Easy rebooking link:</strong> A direct link to book again (ideally the same service) that you can send in 1 tap</li>
          <li><strong>Calendar visibility:</strong> A clear view of upcoming availability so you can confidently offer specific slots at the end of an appointment</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Nelsy includes client history, appointment tracking, and a direct rebooking link — <Link to="/" className="underline text-[#F52B8C]">start free →</Link></p>
      </section>

      <section id="handling-not-sure">
        <h2 className="font-serif text-2xl font-bold mb-4">When clients say "I'll let you know"</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some clients will decline to book ahead with "I'll message when I'm ready." This is fine — don't push. Instead:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Send them your booking link immediately after the appointment: "No worries — here's my link for when you're ready."</li>
          <li>Post regular availability updates on Instagram Stories — these clients see your calendar and book when they're ready</li>
          <li>Send the timed reminder message (2–3 weeks after) as described above</li>
          <li>Accept that some clients are irregular by nature — they book when they want nails, not on a schedule. That's okay; just make booking easy for when they do.</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">For broader retention strategies: <Link to="/learn/how-to-increase-nail-client-retention" className="underline text-[#F52B8C]">how to increase nail client retention</Link>.</p>
      </section>
    </div>
  ),
});
export {};
