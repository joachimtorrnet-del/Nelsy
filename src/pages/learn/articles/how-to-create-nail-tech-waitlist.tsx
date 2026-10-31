import { registerArticle } from '@/lib/articles';
import { ArticleSteps, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-create-nail-tech-waitlist',
  title: 'How to Create a Nail Tech Waitlist That Actually Works',
  seoTitle: 'How to Create a Nail Tech Waitlist That Actually Works',
  excerpt: 'A waitlist isn\'t just a list — it\'s a system. Here\'s how to set up a waitlist that converts cancellations into full appointments and makes clients feel looked after, not rejected.',
  seoDescription: 'How to create a nail tech waitlist that works. Setting up a waitlist system, managing waitlist clients, and converting cancellations into filled appointments.',
  category: 'booking-software',
  tags: ['nail tech waitlist', 'how to create nail waitlist', 'nail booking waitlist'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  heroImageAlt: 'How to create a nail tech waitlist',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-waitlist', label: 'What a waitlist actually does' },
    { id: 'setting-up', label: 'Setting up a simple waitlist' },
    { id: 'managing', label: 'Managing waitlist clients' },
    { id: 'converting', label: 'Converting waitlist to appointments' },
    { id: 'communication', label: 'Waitlist communication' },
  ],
  relatedSlugs: ['how-to-reduce-gaps-nail-appointments', 'how-to-manage-fully-booked-nail-schedule', 'nail-tech-waitlist-message-templates', 'how-to-build-weekly-nail-tech-schedule'],
  faq: [
    { q: 'How long should a nail tech waitlist be?', a: 'A waitlist of 10–20 active clients is generally enough to fill most cancellations reliably. Much longer than this and the wait becomes so long that many clients have moved on by the time a slot opens. If your waitlist regularly exceeds 20 people, it\'s a strong signal that your prices are too low and demand is outpacing supply.' },
    { q: 'Do I need special software for a waitlist?', a: 'No. A simple notes list, spreadsheet, or even a dedicated message thread works fine for most nail techs. Some booking software (Fresha, Vagaro, etc.) includes a waitlist or cancellation notification feature. The most important thing is having a system you will consistently use — a complex tool you don\'t use is worse than a simple one you do.' },
  ],
  relatedFeatureSlugs: ['bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-waitlist">
        <h2 className="font-serif text-2xl font-bold mb-4">What a waitlist actually does</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A waitlist has three jobs:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Fills cancellations before they become gaps:</strong> Instead of a slot sitting empty, you work through the list and offer it to someone who wants it</li>
          <li><strong>Manages demand professionally:</strong> Rather than just saying "I'm fully booked" and losing the client, you give them a path to getting an appointment</li>
          <li><strong>Gives you data:</strong> A consistently large waitlist tells you your prices are below market rate for your demand level</li>
        </ul>
      </section>

      <section id="setting-up">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up a simple waitlist</h2>
        <ArticleSteps
          steps={[
            { title: 'Decide what information you need', body: 'At minimum: client name, contact (phone or Instagram), the service they want, and any days or times they can\'t do. You don\'t need more than this.' },
            { title: 'Pick a tracking method', body: 'A note in your phone, a simple spreadsheet, a dedicated note in your booking app, or a purpose-built waitlist feature in your booking software. Choose whatever you\'ll actually use consistently.' },
            { title: 'Create a standard response for fully-booked requests', body: 'When clients ask for an appointment you can\'t fill, reply with your standard waitlist invitation: "I\'m currently fully booked but I\'d love to add you to my waitlist — can I get your name, the service you\'re after, and any days or times you can\'t do?" Something simple and easy to copy-paste.' },
            { title: 'Set a maximum list size', body: 'Decide the maximum number of clients you\'ll keep on the waitlist at once (10–20 is realistic). Beyond this, the wait is too long to be useful. If you\'re regularly hitting this limit, review your pricing.' },
          ]}
        />
      </section>

      <section id="managing">
        <h2 className="font-serif text-2xl font-bold mb-4">Managing waitlist clients</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Keep the list current — remove clients who have since found appointments elsewhere, or reach out every 4–6 weeks to confirm they're still waiting</li>
          <li>Note each client's flexibility — a client who can come "any day" is easier to fill than one who is only free on Saturday mornings; know which clients are which</li>
          <li>Move clients to a "converted" list once they've booked — this keeps your active list clean and shows you the waitlist conversion rate over time</li>
          <li>Don't keep clients on a list indefinitely; if a slot never opens that suits them, be honest — better they find another nail tech than wait months for nothing</li>
        </ul>
        <ArticleTip>Add a date to each waitlist entry when you add it. If a client has been waiting more than 6–8 weeks with no suitable slot, check in with them — they may have found someone else, or you may be able to find a creative solution.</ArticleTip>
      </section>

      <section id="converting">
        <h2 className="font-serif text-2xl font-bold mb-4">Converting waitlist to appointments</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>When a slot opens, work through the list in order — most nail techs use first-added, first-contacted</li>
          <li>Contact the first client on the list immediately when a slot opens; don't wait or it may fill another way</li>
          <li>Give each client 2–4 hours to respond before moving to the next person — slots that come up 24–48 hours in advance fill fastest; last-minute slots may need a broader message to the whole list</li>
          <li>For cancellations that come with very short notice (under 24 hours), send to multiple waitlist clients simultaneously and take the first response — speed matters more than strict order in last-minute situations</li>
        </ul>
      </section>

      <section id="communication">
        <h2 className="font-serif text-2xl font-bold mb-4">Waitlist communication</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Be warm and clear when contacting a waitlist client: "Hi [name], a slot has just opened on [day] at [time] for [service] — would this work for you? Let me know within a few hours and I'll get you booked in."</li>
          <li>Confirm clearly when a slot is taken — don't leave multiple clients thinking they might have it</li>
          <li>Follow up with clients who didn't get the slot: "That one went quickly — I'll keep you on the list and be in touch when the next one opens."</li>
          <li>Template these messages so you're not writing from scratch each time — saved message templates make the process fast and consistent</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
