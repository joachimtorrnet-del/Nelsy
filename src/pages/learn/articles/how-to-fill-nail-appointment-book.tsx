import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-fill-nail-appointment-book',
  title: 'How to Fill Your Nail Appointment Book',
  seoTitle: 'How to Fill Your Nail Appointment Book: A Complete Guide',
  excerpt: 'Empty slots cost money. A practical guide to keeping your nail appointment book consistently full — through regulars, rebooking, and smart promotion.',
  seoDescription: 'How to fill your nail appointment book: strategies for nail techs covering regulars, rebooking systems, last-minute slots, and Instagram promotion.',
  category: 'get-clients',
  tags: ['appointment book', 'fully booked', 'nail clients', 'fill slots'],
  heroImage: 'linear-gradient(135deg, #ECFDF5 0%, #6EE7B7 100%)',
  heroImageAlt: 'How to fill your nail appointment book',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'understand-your-gaps', label: 'Understanding your gaps' },
    { id: 'rebook-system', label: 'The rebooking system' },
    { id: 'last-minute-slots', label: 'Filling last-minute slots' },
    { id: 'slow-periods', label: 'Managing slow periods' },
    { id: 'waitlist', label: 'Using a waitlist' },
    { id: 'instagram-availability', label: 'Posting availability on Instagram' },
  ],
  relatedSlugs: ['how-to-get-more-nail-clients', 'how-to-get-booked-out-as-nail-tech', 'how-to-get-nail-clients-from-instagram'],
  faq: [
    { q: 'How far in advance should nail clients book?', a: 'Most nail techs find the sweet spot is 2–4 weeks ahead for regular clients. Very far-advance booking (6+ weeks) works well for new sets but can lead to more reschedules. Infill clients typically book 3 weeks out. Having online booking lets clients self-serve rather than waiting for you to respond.' },
    { q: 'What is the best way to fill last-minute cancellations?', a: 'An Instagram story with "slot available today/this week" is the fastest way. If you have a waitlist through your booking system, the system can automatically notify the next person. Some nail techs use a WhatsApp group for last-minute slots.' },
    { q: 'Should I offer discounts to fill empty slots?', a: 'Avoid blanket discounts — they attract price-sensitive clients and devalue your work. Last-minute slot promotions are different: they\'re tactical, time-limited, and serve clients who specifically want a quick appointment. "Slot available tomorrow — first to book gets 10% off" is fine. "Always 20% off" is not.' },
  ],
  relatedFeatureSlugs: ['bookings', 'instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="understand-your-gaps">
        <h2 className="font-serif text-2xl font-bold mb-4">Understanding your gaps</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before you can fill your appointment book, you need to understand why it has gaps. The most common reasons:</p>
        <ArticleTable
          headers={['Gap type', 'Common cause', 'Solution']}
          rows={[
            ['Regular empty slots', 'Low client volume or specific days that don\'t attract bookings', 'Targeted promotion for those days'],
            ['Last-minute cancellations', 'No deposit policy, or insufficient notice period requirement', 'Introduce deposits; extend notice requirement'],
            ['No-shows', 'No financial commitment from clients', 'Deposits + reminders'],
            ['Seasonal dip', 'Normal business cycle (January, school holidays)', 'Waitlist + pre-booking campaigns'],
            ['New client drought', 'Not enough new client acquisition', 'Instagram strategy, referral asks'],
          ]}
        />
        <ArticleTip>Track your empty slots for one month. Note the day, time, and reason (cancellation, no-show, or just unbooked). The pattern tells you which problem to solve first.</ArticleTip>
      </section>

      <section id="rebook-system">
        <h2 className="font-serif text-2xl font-bold mb-4">The rebooking system</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most reliable way to keep your appointment book full is to have clients rebook before they leave. A client who rebooks at the end of their appointment is far more likely to return than one who says "I'll message you when I need my next infill."</p>
        <ArticleChecklist title="Rebooking system steps" items={[
          'Near the end of every appointment, suggest when they should return ("Your infill should be around 3 weeks — want to book now while you\'re here?")',
          'Have your booking page or calendar open and ready to show them',
          'If they can\'t commit to a date, say "I can text you when I have new slots open — what\'s your number?" — they just became a waitlist client',
          'For clients who don\'t rebook, send a message at the 2-week mark: "Your infill should be coming up soon — here\'s my booking link"',
        ]} />
        <ArticleCallout variant="info" title="Rebooking vs retention">
          Rebooking isn't just about filling slots. It's about retention. A client who books 3 consecutive appointments is a regular. A client who waits until their nails are damaged and then books is an occasional client. Regulars generate 3–5x more revenue per year than occasional clients.
        </ArticleCallout>
      </section>

      <section id="last-minute-slots">
        <h2 className="font-serif text-2xl font-bold mb-4">Filling last-minute slots</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Cancellations happen even with deposits. The goal is to replace them quickly:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Instagram story:</strong> "I have a slot available tomorrow at [time] — first to book gets it!" This converts quickly because stories create urgency and reach people already engaged with your content.</li>
          <li><strong>Waitlist notification:</strong> If your booking platform has waitlist functionality, anyone who tried to book that slot gets automatically notified.</li>
          <li><strong>WhatsApp broadcast:</strong> If you have a WhatsApp list of interested clients, a quick message gets fast responses.</li>
        </ol>
        <ArticleTip>When you post a last-minute slot on Instagram, include the specific service type and duration so interested clients can decide quickly. "Gel full set, 90 mins, tomorrow 2pm" converts better than "I have a slot tomorrow."</ArticleTip>
      </section>

      <section id="slow-periods">
        <h2 className="font-serif text-2xl font-bold mb-4">Managing slow periods</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail businesses have predictable slow periods: January after the Christmas rush, school holiday weeks, and sometimes mid-week lulls. Strategies that work:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Pre-book campaigns in November/December:</strong> "January is filling up — book your January appointment now." This shifts demand forward.</li>
          <li><strong>Seasonal promotions:</strong> Not discounts, but specific campaigns. "January reset" sets for clients wanting a fresh start, promoted as a specific service rather than a discount.</li>
          <li><strong>Use slow time for training:</strong> Deliberately quieter weeks are good for learning new techniques without the pressure of a full diary.</li>
        </ul>
      </section>

      <section id="waitlist">
        <h2 className="font-serif text-2xl font-bold mb-4">Using a waitlist</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A waitlist is a list of clients who want an appointment but couldn't get one. It serves two purposes: filling cancellations and gauging true demand for your services.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">How to build one:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>When your calendar is full, add a "join waitlist" option to your booking page (some platforms support this natively)</li>
          <li>When a cancellation opens, notify waitlist clients first before posting publicly</li>
          <li>Keep the waitlist short and active — a waitlist with stale names doesn't serve you</li>
        </ul>
      </section>

      <section id="instagram-availability">
        <h2 className="font-serif text-2xl font-bold mb-4">Posting availability on Instagram</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Regular availability posts on Instagram are one of the most direct ways to fill your book. They convert well because they combine social proof (your followers know your work) with a specific call to action.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Effective availability posts:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>"I have a few slots open this week — link in bio to book"</li>
          <li>"New slots just opened for [month] — grab yours before they go"</li>
          <li>"Cancellation: slot available [day] at [time] — first to book gets it"</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">See also: <Link to="/learn/how-to-get-booked-out-as-nail-tech" className="underline text-[#F52B8C]">How to get booked out as a nail tech</Link>.</p>
      </section>
    </div>
  ),
});
export {};
