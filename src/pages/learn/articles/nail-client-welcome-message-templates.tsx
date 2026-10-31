import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-client-welcome-message-templates',
  title: 'Nail Client Welcome Message Templates',
  seoTitle: 'Nail Client Welcome Message Templates (Copy-Ready for New Clients)',
  excerpt: 'A warm, professional welcome message sets the tone for the whole client relationship. Here are templates for every new client scenario — copy and personalise.',
  seoDescription: 'Nail client welcome message templates. Copy-ready welcome messages for new nail clients — booking confirmation, first appointment, post-appointment, and follow-up messages.',
  category: 'policies-clients',
  tags: ['nail client welcome message', 'nail tech client message', 'new nail client message', 'nail tech templates'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'Nail client welcome message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'booking-confirmation', label: 'New booking confirmation' },
    { id: 'pre-appointment', label: 'Pre-appointment reminder (new client)' },
    { id: 'first-appointment-follow-up', label: 'Post-first-appointment follow-up' },
    { id: 'enquiry-response', label: 'Responding to an enquiry' },
    { id: 'waitlist-confirmation', label: 'Waitlist confirmation' },
  ],
  relatedSlugs: ['nail-client-rebooking-message-templates', 'how-to-create-nail-client-experience', 'nail-tech-booking-policy-template', 'how-to-handle-nail-repair-request'],
  faq: [
    { q: 'Should welcome messages be automated or manual?', a: 'Both work. An automated booking confirmation (sent by your booking software) handles the practical details — appointment time, location, deposit info. A manual personal message from you, separate from the automation, adds warmth and sets you apart from nail techs whose only communication is a system email. The best approach: automate the practical, personalise the warm.' },
    { q: 'How long should a welcome message be?', a: 'Short. A welcome message is not the place to share all your policies, your full price list, or your life story. 2–4 sentences for most messages. The booking confirmation handles the practical details — your welcome message adds warmth. If it would take the client more than 20 seconds to read, it\'s too long.' },
    { q: 'When should I send a welcome message — immediately after booking?', a: 'For a booking confirmation: immediately (usually automated). For a personal welcome from you: within a few hours or the following morning is fine. Sending a personal follow-up the next day after the client booked ("So glad to have you coming in — looking forward to meeting you!") feels natural rather than automated.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="booking-confirmation">
        <h2 className="font-serif text-2xl font-bold mb-4">New booking confirmation</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The booking confirmation is usually automated via your booking platform. If you write a manual version or a personal follow-up to the automated one:</p>
        <ArticleCallout variant="tip" title="Automated confirmation (platform-sent)">
          "Hi [name]! Your appointment is confirmed:{'\n\n'}📅 [Date] at [Time]{'\n'}💅 [Service]{'\n'}📍 [Location / address]{'\n\n'}Your deposit of [£X] has been received. The remaining balance will be due at your appointment.{'\n\n'}If you need to cancel or reschedule, please give at least [X] hours' notice. Cancellations within [X] hours of your appointment will lose the deposit.{'\n\n'}Looking forward to seeing you! — [Your name]"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Personal follow-up (manual, next day)">
          "Hi [name]! Just wanted to say — so excited to have you booked in 🤍 If you have any inspiration photos or ideas for what you're thinking, feel free to send them over before your appointment. See you [day]!"
        </ArticleCallout>
      </section>

      <section id="pre-appointment">
        <h2 className="font-serif text-2xl font-bold mb-4">Pre-appointment reminder (new client)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A reminder for a new client should include practical information they might need as a first-timer, beyond just the time:</p>
        <ArticleCallout variant="tip" title="New client reminder (24–48 hours before)">
          "Hi [name]! Just a reminder that your appointment is tomorrow at [time] 💅{'\n\n'}A couple of things for your first appointment:{'\n'}- Please arrive with bare nails / remove any existing product beforehand{'\n'}- My address is [address] — parking is [parking info]{'\n'}- The appointment is [X minutes]{'\n\n'}Can't wait to meet you! Let me know if you have any questions. — [Your name]"
        </ArticleCallout>
        <ArticleTip>Include parking or access instructions for first-timers — arriving at an unfamiliar location creates stress that affects the appointment experience before it starts.</ArticleTip>
      </section>

      <section id="first-appointment-follow-up">
        <h2 className="font-serif text-2xl font-bold mb-4">Post-first-appointment follow-up</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A follow-up after the first appointment is one of the highest-impact things you can do for new client retention. It costs 30 seconds:</p>
        <ArticleCallout variant="tip" title="Post-first-appointment (2–3 days later)">
          "Hi [name]! Hope you're still loving your nails 🤍 Just checking in to see how they're settling in. If you have any concerns at all, please don't hesitate to reach out — I'm always happy to help.{'\n\n'}It was so lovely to meet you — I hope to see you again soon! 💅"
        </ArticleCallout>
        <ArticleCallout variant="tip" title="Post-first-appointment with review ask">
          "Hey [name]! How are you getting on with your nails? Hope they're looking gorgeous 💅 If you're happy with them, I'd really appreciate a quick Google review — it means the world for helping new clients find me. Here's the link: [link]{'\n\n'}Thank you so much — and I'd love to see you again! 🤍"
        </ArticleCallout>
      </section>

      <section id="enquiry-response">
        <h2 className="font-serif text-2xl font-bold mb-4">Responding to an enquiry</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a new potential client DMs to ask about your services:</p>
        <ArticleCallout variant="tip" title="Enquiry response">
          "Hi [name]! So glad you reached out 🤍 I'd love to have you in.{'\n\n'}I do [services], my prices start from [£X]. I'm currently booking [time frame / next availability].{'\n\n'}The easiest way to secure a slot is via my booking link: [link] — you can see all my availability and choose what works for you. Let me know if you have any questions!"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Always include the booking link directly in your enquiry response — every extra step a client has to take reduces the chance they book.</p>
      </section>

      <section id="waitlist-confirmation">
        <h2 className="font-serif text-2xl font-bold mb-4">Waitlist confirmation</h2>
        <ArticleCallout variant="tip" title="Adding someone to your waitlist">
          "Hi [name]! I've added you to my waitlist 🤍 When a slot opens up that matches your usual appointment time, I'll message you first — usually with a few days' notice. Keep an eye on your messages!{'\n\n'}In the meantime, if you see availability open up on my booking page, feel free to grab it: [link]"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For rebooking message templates (returning clients): <Link to="/learn/nail-client-rebooking-message-templates" className="underline text-[#F52B8C]">nail client rebooking message templates</Link>.</p>
      </section>
    </div>
  ),
});
export {};
