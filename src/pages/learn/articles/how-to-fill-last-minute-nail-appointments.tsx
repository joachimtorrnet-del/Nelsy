import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-fill-last-minute-nail-appointments',
  title: 'How to Fill Last-Minute Nail Appointments',
  seoTitle: 'How to Fill Last-Minute Nail Appointments (7 Tactics That Work Fast)',
  excerpt: 'A cancellation with 24 hours\' notice doesn\'t have to be lost revenue. Here are the fastest ways to fill a last-minute nail appointment slot.',
  seoDescription: 'How to fill last-minute nail appointments. Fast tactics for filling cancelled slots — Instagram Stories, waitlists, flash offers, and direct client messaging.',
  category: 'get-clients',
  tags: ['last minute nail appointments', 'fill nail appointments', 'nail cancellation slot', 'nail tech appointment gaps'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
  heroImageAlt: 'How to fill last-minute nail appointments',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'instagram-stories', label: 'Instagram Stories (fastest)' },
    { id: 'waitlist', label: 'Waitlist' },
    { id: 'direct-message', label: 'Direct client message' },
    { id: 'flash-offer', label: 'Flash offer (use carefully)' },
    { id: 'booking-link', label: 'Live availability on your booking page' },
    { id: 'preventing', label: 'Reducing cancellations in the first place' },
  ],
  relatedSlugs: ['how-to-fill-nail-appointment-book', 'how-to-get-nail-clients-slow-season', 'nail-tech-cancellation-policy', 'nail-tech-deposit-policy'],
  faq: [
    { q: 'How early in advance should I post about a cancellation slot?', a: 'Post as soon as you know about the slot. The earlier you post, the more likely someone can rearrange their day to take it. A cancellation posted 48 hours out is much easier to fill than one posted 3 hours before. For same-day slots, post on Instagram Stories immediately and follow up with direct messages to your waitlist.' },
    { q: 'Should I offer a discount for last-minute slots?', a: 'Most nail techs find they can fill last-minute slots at full price through Instagram Stories, especially if they post regularly and have an engaged following. Offering a discount trains clients to hold off booking in hope of a last-minute deal. Try posting at full price first — if slots consistently go unfilled, consider a modest discount or incentive.' },
    { q: 'What\'s the most effective way to build a waitlist?', a: 'Ask clients at the end of every appointment: "Do you want to go on my waitlist? If a slot comes up, I\'ll message you first." A waitlist built from existing satisfied clients is more reliable than social media for filling last-minute slots. Even 5–10 people on a waitlist dramatically reduces the time a cancellation slot stays empty.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="instagram-stories">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram Stories: the fastest channel</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For nail techs with an active Instagram following, a Story is the fastest way to fill a cancellation. Your followers are already warm — they know your work and some are always "waiting for a slot to come up."</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Post as soon as the cancellation happens — don't wait</li>
          <li>State the slot clearly: day, time, service</li>
          <li>Include your booking link or a DM prompt</li>
          <li>Add a countdown if you want urgency</li>
        </ul>
        <ArticleCallout variant="tip" title="Story template">
          "💅 LAST MINUTE SLOT AVAILABLE{'\n\n'}[Day] at [time]{'\n'}[Service]{'\n\n'}DM me or book via link in bio — going fast!"
        </ArticleCallout>
        <ArticleTip>Post cancellation slots regularly — even when you fill them quickly. Followers learn that you share availability on Stories, and they check more often.</ArticleTip>
      </section>

      <section id="waitlist">
        <h2 className="font-serif text-2xl font-bold mb-4">Waitlist</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A waitlist — even an informal one — dramatically reduces the time to fill a cancellation. Ask every client at the end of their appointment: "Would you like to go on my waitlist? If a slot opens up, I'll message you first."</p>
        <ArticleTable
          headers={['Waitlist approach', 'How it works']}
          rows={[
            ['Informal DM list', 'Keep a notes list of clients who said yes; message them when a slot opens. Simple and works for most nail techs.'],
            ['Booking platform waitlist', 'Some platforms offer a built-in waitlist feature — clients join and get notified automatically when a slot matches their availability'],
            ['Instagram Close Friends list', 'Put waitlist clients on your Close Friends story — when a slot opens, post to Close Friends first before posting publicly'],
          ]}
        />
      </section>

      <section id="direct-message">
        <h2 className="font-serif text-2xl font-bold mb-4">Direct client message</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you know a specific client who usually books around this time or has recently asked about availability, a direct personalised message converts better than a broadcast Story:</p>
        <ArticleCallout variant="tip" title="Direct message">
          "Hey [name]! I've just had a cancellation this [day] at [time] — I thought of you first! Would that work for you? No pressure — just wanted to give you first dibs 🤍"
        </ArticleCallout>
      </section>

      <section id="flash-offer">
        <h2 className="font-serif text-2xl font-bold mb-4">Flash offer (use carefully)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A time-limited offer can accelerate the fill: "First to book gets a free chrome add-on." Use this selectively — for a slow day or a slot that's been open for more than a few hours. Don't routinely discount cancellation slots or you train clients to expect it.</p>
        <p className="text-gray-700 leading-relaxed">A non-price incentive (free add-on rather than money off) is preferable — it doesn't devalue your base service price.</p>
      </section>

      <section id="booking-link">
        <h2 className="font-serif text-2xl font-bold mb-4">Live availability on your booking page</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If your booking system updates availability in real time, a cancellation slot is immediately bookable without any action from you. Clients who are checking your page regularly — especially those following your Stories — will self-book. Make sure your booking link is in your Instagram bio and easily accessible.</p>
      </section>

      <section id="preventing">
        <h2 className="font-serif text-2xl font-bold mb-4">Reducing cancellations in the first place</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The best approach to last-minute slots is having fewer of them. Two key preventive measures:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Deposits:</strong> Clients with a paid deposit cancel far less frequently than those without. Even a small deposit of £10–£20 creates enough skin in the game to prevent casual cancellations</li>
          <li><strong>Reminders:</strong> An automated reminder 48 hours before the appointment significantly reduces no-shows and late cancellations — clients who need to cancel do so earlier when reminded</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For deposit policy setup: <Link to="/learn/nail-tech-deposit-policy" className="underline text-[#F52B8C]">nail tech deposit policy guide</Link>.</p>
      </section>
    </div>
  ),
});
export {};
