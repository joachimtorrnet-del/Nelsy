import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-reduce-gaps-nail-appointments',
  title: 'How to Reduce Gaps Between Nail Appointments',
  seoTitle: 'How to Reduce Gaps Between Nail Appointments',
  excerpt: 'Empty appointment slots cost you income. Here\'s how to fill gaps before they appear — through client retention, rebooking, and a few practical scheduling habits.',
  seoDescription: 'How to reduce gaps between nail appointments. Client rebooking habits, waitlist systems, last-minute slots, and scheduling practices to keep your nail calendar consistently full.',
  category: 'get-clients',
  tags: ['reduce gaps nail appointments', 'fill nail appointment slots', 'keep nail calendar full'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FDDDE6 100%)',
  heroImageAlt: 'How to reduce gaps between nail appointments',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'rebook-every-client', label: 'Rebook at the end of every appointment' },
    { id: 'cancellation-policy', label: 'Use a cancellation policy that protects your time' },
    { id: 'waitlist', label: 'Run a waitlist for cancellations' },
    { id: 'last-minute-slots', label: 'Last-minute slot strategy' },
    { id: 'schedule-review', label: 'Weekly schedule review habit' },
  ],
  relatedSlugs: ['how-to-create-nail-tech-waitlist', 'how-to-build-weekly-nail-tech-schedule', 'how-to-manage-fully-booked-nail-schedule', 'nail-tech-cancellation-message-templates'],
  faq: [
    { q: 'What\'s the biggest cause of gaps in a nail appointment book?', a: 'The biggest cause is clients who don\'t rebook and then don\'t return until they need a nail emergency. Regular clients who rebook at the end of every appointment are the most consistent income source. The goal is to move as many clients as possible onto a regular rebooking rhythm — 3, 4, or 6 weeks depending on the service.' },
    { q: 'Should I offer last-minute discounts to fill gaps?', a: 'Occasionally, for a proven clientele — but be cautious. Regular discounting for last-minute slots trains clients to wait for a cheaper option rather than booking in advance. A more sustainable approach is a waitlist for cancellations offered at the standard price, communicated as a benefit of being on the list rather than a discount.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="rebook-every-client">
        <h2 className="font-serif text-2xl font-bold mb-4">Rebook at the end of every appointment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The single most effective thing you can do to reduce gaps is to rebook every client before they leave.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Make rebooking a standard part of your appointment closing — not optional, not awkward: "Let's get your next appointment locked in now"</li>
          <li>Have your calendar open and ready when the client is paying — make it easy and immediate</li>
          <li>Suggest the interval based on service: infills typically every 3–4 weeks; gel polish every 2–3 weeks</li>
          <li>A client who leaves without rebooking has a 30–40% chance of not returning for 6+ weeks — a client who rebooks is almost guaranteed to return on schedule</li>
        </ul>
        <ArticleTip>If you use booking software, turn on automated rebooking reminders — a message sent to clients who haven't rebooked within a week of their last appointment is a gentle prompt that fills gaps without you having to think about it.</ArticleTip>
      </section>

      <section id="cancellation-policy">
        <h2 className="font-serif text-2xl font-bold mb-4">Use a cancellation policy that protects your time</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>A clear cancellation policy (typically 24–48 hours notice required) reduces last-minute cancellations significantly — clients who know there's a fee are more careful about their bookings</li>
          <li>Enforcing the policy consistently is what makes it work — a policy that's sometimes enforced doesn't change behaviour</li>
          <li>Deposits or card-on-file requirements at booking are the most effective deterrent against no-shows and late cancellations</li>
        </ul>
        <ArticleCallout variant="info" title="A cancellation policy isn't harsh — it's professional">
          Clients who work in offices or manage their own schedules understand a 24-hour policy entirely. Framing it clearly in your booking confirmation means there's no surprise and no confrontation.
        </ArticleCallout>
      </section>

      <section id="waitlist">
        <h2 className="font-serif text-2xl font-bold mb-4">Run a waitlist for cancellations</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>A waitlist is a list of clients who want to be contacted if a slot opens — it converts cancellations into filled appointments automatically</li>
          <li>Ask clients who can't find an available slot to join the waitlist; when a cancellation occurs, work through the list</li>
          <li>Some booking software has a built-in waitlist feature; otherwise a simple message thread or a notes list works fine</li>
          <li>Clients on a waitlist feel cared for rather than turned away — it's a better client experience than just saying "nothing available"</li>
        </ul>
      </section>

      <section id="last-minute-slots">
        <h2 className="font-serif text-2xl font-bold mb-4">Last-minute slot strategy</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>When a gap appears within 48–72 hours, post it to your story or send a message to your waitlist — "cancellation slot available tomorrow at 2pm"</li>
          <li>Don't discount last-minute slots as a default — offer them at full price to waitlist clients first; only consider a small incentive if slots regularly go unfilled</li>
          <li>Keep a list of clients who consistently respond to last-minute availability — these clients are valuable and worth maintaining a direct communication line with</li>
          <li>An Instagram Story of a gap slot consistently performs better than any paid promotion for same-day availability</li>
        </ul>
      </section>

      <section id="schedule-review">
        <h2 className="font-serif text-2xl font-bold mb-4">Weekly schedule review habit</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>At the start of each week, look at the week ahead and identify any gaps longer than your standard buffer time</li>
          <li>Any gap larger than 2 hours is an opportunity — contact a client due for their next appointment, reach out to the waitlist, or post availability</li>
          <li>This weekly review takes 5 minutes but prevents gaps from sitting unfilled until the day before</li>
          <li>The further ahead you spot a gap, the more time you have to fill it</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
