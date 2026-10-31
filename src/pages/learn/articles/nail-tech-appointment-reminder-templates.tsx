import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-appointment-reminder-templates',
  title: 'Nail Tech Appointment Reminder Templates',
  seoTitle: 'Nail Tech Appointment Reminder Message Templates (Copy & Paste)',
  excerpt: 'Send reminders that reduce no-shows and don\'t annoy your clients. Copy-paste templates for appointment reminders — SMS, WhatsApp, DM, and automated messages.',
  seoDescription: 'Nail tech appointment reminder message templates. Copy-paste SMS, WhatsApp, and DM reminder templates for nail appointments — friendly, professional, and firm versions.',
  category: 'policies-clients',
  tags: ['nail tech appointment reminder templates', 'nail appointment reminder message', 'appointment reminder nail tech'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'Nail tech appointment reminder message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'when-to-send', label: 'When to send reminders' },
    { id: 'friendly', label: 'Friendly reminder templates' },
    { id: 'professional', label: 'Professional reminder templates' },
    { id: 'firm', label: 'Firm reminder templates (policy included)' },
    { id: 'automated', label: 'What to set as your automated reminder' },
    { id: 'tips', label: 'Reminder tips' },
  ],
  relatedSlugs: ['nail-tech-no-show-message-templates', 'nail-tech-cancellation-message-templates', 'nail-tech-booking-confirmation-templates', 'how-to-deal-with-nail-client-no-shows'],
  faq: [
    { q: 'Should reminders be automated or manual?', a: 'Use automated reminders through your booking app for every appointment — this is reliable and saves time. Send a manual follow-up only if you have a specific reason (new client, complex service, first appointment after a long gap).' },
    { q: 'How many reminders should I send?', a: 'One or two is usually enough. A 48-hour reminder gives clients time to reschedule if needed; a 24-hour reminder is the last chance. Sending more than two starts to feel like harassment and can cause clients to disengage.' },
    { q: 'What should a reminder include?', a: 'At minimum: client name, appointment date and time, service, your name/business, and a note about your cancellation policy (or a link to it). Keep it short — a reminder is not a newsletter.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'email-newsletters'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="when-to-send">
        <h2 className="font-serif text-2xl font-bold mb-4">When to send reminders</h2>
        <ArticleTable
          headers={['Timing', 'Purpose', 'Method']}
          rows={[
            ['48 hours before', 'Gives clients time to reschedule without losing deposit', 'Automated through booking app'],
            ['24 hours before', 'Last-chance reminder; triggers cancellation policy window', 'Automated through booking app'],
            ['Morning of (optional)', 'For new clients or complex services only', 'Manual WhatsApp or SMS'],
          ]}
        />
      </section>

      <section id="friendly">
        <h2 className="font-serif text-2xl font-bold mb-4">Friendly reminder templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>48-hour friendly reminder:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! Just a reminder that you have a [service] with me on [day] at [time]. Can't wait to see you! If anything comes up, please give me 48 hours' notice. [Your name] ✨
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>24-hour friendly reminder:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hey [Name]! See you tomorrow at [time] for your [service] 💅 If you need to cancel or reschedule, please message me asap. Looking forward to it!
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Same-day friendly reminder (new client):</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], just a quick note — so excited to have you in today at [time]! My address is [address]. See you soon! [Your name]
        </blockquote>
      </section>

      <section id="professional">
        <h2 className="font-serif text-2xl font-bold mb-4">Professional reminder templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>48-hour professional reminder:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], this is a reminder that your [service] appointment with [business name] is on [day, date] at [time]. If you need to reschedule, please contact me at least 48 hours before your appointment. Thank you!
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>24-hour professional reminder:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], your [service] appointment with [business name] is tomorrow at [time]. If you need to make changes, please contact me as soon as possible. I look forward to seeing you.
        </blockquote>
      </section>

      <section id="firm">
        <h2 className="font-serif text-2xl font-bold mb-4">Firm reminder templates (policy included)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Use these if you've had no-show issues or with new clients:</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>48-hour firm reminder:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], reminder: your [service] is booked with me for [day] at [time]. Please note: cancellations or reschedules must be made at least 48 hours in advance. Late cancellations and no-shows will result in your deposit being retained. Thank you, [Your name]
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>24-hour firm reminder:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], this is your 24-hour reminder for your [service] appointment tomorrow at [time]. Please note that cancellations after this point will result in your deposit being non-refundable. If you need to cancel, please message immediately. Thank you.
        </blockquote>
      </section>

      <section id="automated">
        <h2 className="font-serif text-2xl font-bold mb-4">What to set as your automated reminder</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most booking apps let you customise the automated reminder text. Set it once and it sends for every appointment. A good automated reminder:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Confirms name, service, date, time, and address</li>
          <li>Mentions your cancellation policy timeframe</li>
          <li>Gives them a way to contact you if needed</li>
          <li>Is professional but warm — not cold or robotic</li>
        </ul>
        <ArticleTip>Check your booking app's reminder email/SMS template after setting it up. Send yourself a test appointment to see exactly what clients receive. The defaults are often too generic.</ArticleTip>
      </section>

      <section id="tips">
        <h2 className="font-serif text-2xl font-bold mb-4">Reminder tips</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Always include the cancellation policy timeframe in at least the 24-hour reminder — so there's no "I didn't know" if they no-show</li>
          <li>Use first name — reminders that start with "Dear Valued Client" feel automated and impersonal</li>
          <li>Keep it short — 3–5 sentences is enough</li>
          <li>Don't send more than 2 reminders — after that it feels like harassment</li>
          <li>For SMS and WhatsApp reminders, skip the emoji if you're going for a professional tone</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
