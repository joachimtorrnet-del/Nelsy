import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-bring-back-old-nail-clients',
  title: 'How to Bring Back Old Nail Clients',
  seoTitle: 'How to Bring Back Old Nail Clients (Win-Back Strategies That Work)',
  excerpt: 'Past clients who stopped booking are one of the easiest wins in a nail business. They already know your work — they just need the right reason to come back.',
  seoDescription: 'How to bring back old nail clients. Win-back message templates, when to reach out, what to say, and how to re-engage past nail clients who stopped booking.',
  category: 'get-clients',
  tags: ['win back nail clients', 'old nail clients', 'nail client re-engagement', 'nail tech client retention'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'How to bring back old nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-clients-stop', label: 'Why clients stop booking' },
    { id: 'when-to-reach-out', label: 'When to reach out' },
    { id: 'win-back-messages', label: 'Win-back message templates' },
    { id: 'what-not-to-do', label: 'What not to do' },
    { id: 'prevention', label: 'Preventing the drift' },
  ],
  relatedSlugs: ['how-to-increase-nail-client-retention', 'nail-client-rebooking-message-templates', 'how-to-build-email-list-nail-tech', 'how-to-get-more-nail-client-rebookings'],
  faq: [
    { q: 'After how long should I try to win back a client?', a: 'The sweet spot for a win-back message is 6–10 weeks after a client\'s last appointment — long enough that they\'ve likely noticed they need their nails done, but not so long that the relationship has fully gone cold. After 6 months+, the client may have found a new nail tech and the win-back becomes harder (though still worth trying).' },
    { q: 'Should I offer a discount to win back clients?', a: 'A discount can help, but it\'s not always necessary. Many clients drift because of life getting busy — not because they went elsewhere for price reasons. A warm, personal message without a discount converts well on its own. If you do offer a discount, make it specific and time-limited: "I\'d love to see you again — £10 off if you book this month." A vague discount offer is less compelling than a personalised one.' },
    { q: 'How many times should I try before giving up?', a: 'One to two genuine attempts is typically appropriate. A warm message after 6–8 weeks, and if no response, one more 4–6 weeks later. After that, accept that this client has moved on and focus your energy on retaining active clients and acquiring new ones.' },
  ],
  relatedFeatureSlugs: ['crm', 'email-newsletters', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-clients-stop">
        <h2 className="font-serif text-2xl font-bold mb-4">Why clients stop booking</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most clients don't stop booking because they found someone better. They drift because life got busy, finances changed temporarily, or the friction of rebooking was just slightly higher than their motivation on any given week. Understanding this reframes the win-back: you're not apologising for something that went wrong, you're removing the friction for someone who wants to come back.</p>
        <ArticleTable
          headers={['Why they stopped', 'Win-back approach']}
          rows={[
            ['Life got busy / forgot to rebook', 'A simple warm message is usually enough — they\'re just waiting for the prompt'],
            ['Temporary financial pressure', 'Acknowledge it gently if appropriate; offer a payment plan or package if you have one'],
            ['Moved to a new area', 'Won\'t return regardless — nothing to do here'],
            ['Found a cheaper nail tech', 'Win-back with quality messaging, not price matching — if they came to you for your work, the right message reminds them of that value'],
            ['Had a bad experience', 'Acknowledge it if they mentioned it; don\'t if they didn\'t — a clean warm message works better than reopening a grievance'],
          ]}
        />
      </section>

      <section id="when-to-reach-out">
        <h2 className="font-serif text-2xl font-bold mb-4">When to reach out</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Timing a win-back message requires knowing when a client last booked. This is where client history in your booking system becomes useful — a weekly check of "clients who haven't booked in 6+ weeks" surfaces the win-back list naturally.</p>
        <p className="text-gray-700 leading-relaxed">Good moments to send a win-back message: before a seasonal high period (pre-Christmas, pre-summer), when you have specific availability to fill, or when you've added a new service or seasonal design they'd likely be interested in.</p>
      </section>

      <section id="win-back-messages">
        <h2 className="font-serif text-2xl font-bold mb-4">Win-back message templates</h2>
        <ArticleCallout variant="tip" title="Warm personal re-engagement (6–8 weeks)">
          "Hey [name]! It's been a little while — hope you're doing well. I'd love to have you back in if you're due a refresh 💅 I've been doing some gorgeous [seasonal] sets lately — link below to book. No pressure at all, just wanted to check in 🤍"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="New service announcement (reason to return)">
          "Hey [name]! Just wanted to let you know I'm now offering BIAB — it's perfect for anyone wanting stronger natural nails with a more flexible feel. I thought of you! If you're interested in trying something new, here's my booking link: [link]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Seasonal re-engagement">
          "Hi [name]! Christmas nail season is almost here 🎄 I wanted to reach out to my favourite clients first before I open Christmas slots publicly — I have a few spots in November/December if you'd like to get booked in early. Reply here or book directly: [link]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="With a time-limited offer">
          "Hey [name], it's been a while! I've missed seeing you 🤍 I'm opening up some new availability this month and wanted to reach out — I'm offering £10 off for returning clients who book before [date]. Here's the link: [link]"
        </ArticleCallout>
      </section>

      <section id="what-not-to-do">
        <h2 className="font-serif text-2xl font-bold mb-4">What not to do</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Don't send a generic broadcast message — personalise with their name at minimum</li>
          <li>Don't guilt-trip: "I haven't seen you in SO long, where have you been?!" — this creates awkwardness</li>
          <li>Don't message multiple times in a week — once, then wait 4–6 weeks before a second attempt</li>
          <li>Don't make it about filling your calendar — make it about them and their nails</li>
          <li>Don't offer a discount in the first message unless there's a specific reason — start with warmth, not incentives</li>
        </ul>
      </section>

      <section id="prevention">
        <h2 className="font-serif text-2xl font-bold mb-4">Preventing the drift in the first place</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The easiest win-back is a rebook at the end of the appointment — before the client leaves. A client who books their next appointment before leaving almost never becomes a win-back target. Win-back is the recovery; rebooking is the prevention.</p>
        <p className="text-gray-700 leading-relaxed">Full rebooking strategy: <Link to="/learn/how-to-get-more-nail-client-rebookings" className="underline text-[#F52B8C]">how to get more nail client rebookings</Link>.</p>
      </section>
    </div>
  ),
});
export {};
