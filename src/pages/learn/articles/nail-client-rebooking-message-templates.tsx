import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-client-rebooking-message-templates',
  title: 'Nail Client Rebooking Message Templates',
  seoTitle: 'Nail Client Rebooking Message Templates (Copy-Ready Scripts)',
  excerpt: 'The right rebooking message at the right time converts clients who\'ve gone quiet into booked appointments. Here are templates for every rebooking scenario.',
  seoDescription: 'Nail client rebooking message templates. Copy-ready scripts for rebooking reminders, win-back messages, seasonal re-engagement, and waitlist follow-ups for nail techs.',
  category: 'policies-clients',
  tags: ['nail rebooking message', 'nail tech message templates', 'nail client re-engagement', 'nail booking reminder'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'Nail client rebooking message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'end-of-appointment', label: 'End-of-appointment rebooking prompt' },
    { id: 'follow-up-reminder', label: 'Post-appointment reminder (2–3 weeks)' },
    { id: 'availability-update', label: 'Monthly availability message' },
    { id: 'win-back', label: 'Win-back messages (6+ weeks gone)' },
    { id: 'seasonal', label: 'Seasonal re-engagement' },
    { id: 'waitlist', label: 'Slot opened — waitlist message' },
  ],
  relatedSlugs: ['nail-client-welcome-message-templates', 'how-to-get-more-nail-client-rebookings', 'how-to-bring-back-old-nail-clients', 'how-to-fill-last-minute-nail-appointments'],
  faq: [
    { q: 'How many rebooking messages is too many?', a: 'One per trigger (appointment reminder, availability update, seasonal message) is appropriate. Sending multiple messages chasing the same rebooking in a short period feels pushy. The right frequency: one follow-up 2–3 weeks after an appointment, an occasional availability update on Instagram or by message, and a seasonal re-engagement message once per season. More than this tips into spam.' },
    { q: 'Should rebooking messages be personalised?', a: 'Yes — even a small personalisation (using their name, referencing their last service) significantly outperforms generic broadcast messages. "Hey [name], your gel usually lasts about 3 weeks" converts much better than "Bookings open for next month." Personalisation signals that you remember them specifically.' },
    { q: 'Is it okay to send rebooking messages via Instagram DM?', a: 'Yes — many nail techs manage client communication primarily through Instagram DMs. The key is consistency: if you use Instagram DMs, clients should be able to DM you there too. Some nail techs use their booking platform\'s messaging for rebooking reminders (automated) and Instagram DMs for personal outreach.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings', 'email-newsletters'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="end-of-appointment">
        <h2 className="font-serif text-2xl font-bold mb-4">End-of-appointment rebooking prompt</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The highest-converting moment for rebooking is the end of the appointment — nails fresh, client happy:</p>
        <ArticleCallout variant="tip" title="Gel polish (verbal)">
          "Your gel usually lasts about 3 weeks — shall I put you in for then? I can check availability now while we're here."
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Extensions (verbal)">
          "You'll want to come back for your infill in about 2–3 weeks. Shall I book you in now? It's easier than finding a slot from scratch later."
        </ArticleCallout>
        <ArticleCallout variant="tip" title="If they say they'll let you know">
          "No problem — I'll send you my booking link so you have it when you're ready. The link goes straight to my calendar."
        </ArticleCallout>
        <ArticleTip>Follow up the verbal mention with a message immediately after the appointment if they didn\'t rebook: "So good to see you today! Here\'s my booking link for when you\'re ready for your next appointment: [link] 💅"</ArticleTip>
      </section>

      <section id="follow-up-reminder">
        <h2 className="font-serif text-2xl font-bold mb-4">Post-appointment reminder (2–3 weeks)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For clients who didn't rebook on the day, send a timed reminder when their nails are likely due for a refresh:</p>
        <ArticleCallout variant="tip" title="2-week follow-up">
          "Hey [name]! Your nails are about due for a refresh — I'm currently booking [month/period] and slots are going quickly. Here's my link: [link] 💅"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="3-week follow-up with seasonal hook">
          "Hey [name]! It's been about 3 weeks since your last appointment — hope your nails held up beautifully ✨ I'm starting [autumn / winter / spring] bookings now if you want to get in before I fill up: [link]"
        </ArticleCallout>
      </section>

      <section id="availability-update">
        <h2 className="font-serif text-2xl font-bold mb-4">Monthly availability message</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A monthly availability update message to all clients who haven't booked yet for the upcoming month:</p>
        <ArticleCallout variant="tip" title="Monthly availability (broadcast)">
          "Hey! [Month] bookings are now open 💅 I have a few slots available — if you'd like to get in, here's my link: [link]. These tend to fill up fast especially [day/week], so grab yours if you need one!"
        </ArticleCallout>
      </section>

      <section id="win-back">
        <h2 className="font-serif text-2xl font-bold mb-4">Win-back messages (6+ weeks gone)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For clients who haven't booked in 6–8 weeks or longer:</p>
        <ArticleCallout variant="tip" title="Warm win-back">
          "Hey [name]! It's been a little while — hope everything is good with you 🤍 I'd love to have you back in if you're due for a refresh. Here's my link: [link]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Win-back with new service hook">
          "Hi [name]! Just wanted to reach out — I've recently started offering [new service] and I immediately thought of you 💅 If you've been thinking about trying it, I'd love to be your first — here's my booking link: [link]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Win-back with limited-time offer">
          "Hey [name], it's been a while! I'm running a [returning client special] this [month] — [£10 off / free add-on / etc.] for clients who haven't booked recently. Here's my link if you'd like to take advantage: [link]. Offer ends [date] 💅"
        </ArticleCallout>
      </section>

      <section id="seasonal">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal re-engagement</h2>
        <ArticleCallout variant="tip" title="Christmas booking (October/November)">
          "Hey [name]! Christmas nail season is coming — I wanted to reach out to my favourite clients before I open Christmas slots publicly 🎄 I have a few spots in November/December. Here's my link if you'd like to get in early: [link]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Summer nails (April/May)">
          "Hi [name]! Summer is almost here and I'm already booking up 🌸 I've been doing the most gorgeous bright/pastel sets lately — here's my booking link if you want to secure a slot: [link]"
        </ArticleCallout>
      </section>

      <section id="waitlist">
        <h2 className="font-serif text-2xl font-bold mb-4">Slot opened — waitlist message</h2>
        <ArticleCallout variant="tip" title="Waitlist slot opening">
          "Hey [name]! A slot has just opened up — [day] at [time] for [service]. I thought of you first 💅 If you'd like it, reply or click here to book: [link]. First come first served — going to post it more widely in [X hours] if unclaimed!"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For welcome messages to new clients: <Link to="/learn/nail-client-welcome-message-templates" className="underline text-[#F52B8C]">nail client welcome message templates</Link>.</p>
      </section>
    </div>
  ),
});
export {};
