import { registerArticle } from '@/lib/articles';
import { ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-booking-confirmation-templates',
  title: 'Nail Tech Booking Confirmation Message Templates',
  seoTitle: 'Nail Tech Booking Confirmation Message Templates (Copy & Paste)',
  excerpt: 'First impressions start at confirmation. Copy-paste booking confirmation templates for nail techs — for automated systems and manual messages.',
  seoDescription: 'Nail tech booking confirmation message templates. Copy-paste confirmation messages for nail appointments — automated and manual, friendly and professional versions.',
  category: 'policies-clients',
  tags: ['nail tech booking confirmation template', 'nail appointment confirmation message', 'booking confirmed message nail tech'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'Nail tech booking confirmation message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-to-include', label: 'What to include in a confirmation' },
    { id: 'automated', label: 'Automated confirmation templates' },
    { id: 'manual', label: 'Manual confirmation templates' },
    { id: 'new-client', label: 'New client confirmation templates' },
    { id: 'deposit-paid', label: 'Deposit confirmation templates' },
  ],
  relatedSlugs: ['nail-tech-appointment-reminder-templates', 'nail-tech-cancellation-message-templates', 'how-to-set-up-online-booking-nail-business', 'nail-client-welcome-message-templates'],
  faq: [
    { q: 'Should confirmation messages be sent automatically or manually?', a: 'Automated confirmations through your booking app are ideal — they send immediately and reliably for every booking. For new clients or bookings with special details (parking instructions, aftercare reminders), a short manual follow-up adds a personal touch on top of the automated one.' },
    { q: 'What\'s the most important thing to include in a booking confirmation?', a: 'The date, time, service, and what happens if they need to cancel. Clients who receive a clear cancellation policy at confirmation have no grounds to claim they didn\'t know about it if they no-show.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What to include in a confirmation</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Client name</li>
          <li>Service booked</li>
          <li>Date and time</li>
          <li>Location or address (or note that it'll be sent closer to the date)</li>
          <li>Cancellation/rescheduling policy and timeframe</li>
          <li>Deposit paid confirmation (if applicable)</li>
          <li>How to contact you if they need to make changes</li>
        </ul>
        <ArticleTip>Keep confirmations short. Clients skim them — long paragraphs of T&Cs often don't get read. Put the most important info (date, time, cancellation policy) right at the top.</ArticleTip>
      </section>

      <section id="automated">
        <h2 className="font-serif text-2xl font-bold mb-4">Automated confirmation templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Short automated confirmation:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], your [service] appointment is confirmed for [day, date] at [time] with [your name / business name]. Location: [address].<br /><br />
          Please note: cancellations must be made at least 48 hours before your appointment. Late cancellations will forfeit your deposit.<br /><br />
          To reschedule or cancel: [contact method / link]. See you soon!
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Warm automated confirmation:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          You're booked! 🎉<br /><br />
          Hi [Name], your [service] appointment is confirmed:<br />
          📅 [Day, date]<br />
          🕐 [Time]<br />
          📍 [Address]<br /><br />
          If you need to cancel or reschedule, please give me at least 48 hours' notice. Your deposit is non-refundable for late cancellations or no-shows.<br /><br />
          Any questions? Message me at [contact]. Can't wait! ✨
        </blockquote>
      </section>

      <section id="manual">
        <h2 className="font-serif text-2xl font-bold mb-4">Manual confirmation templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Short manual confirmation (returning client):</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! Just confirming your [service] for [day] at [time]. Same address as always — [address]. See you then! 💅
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Manual confirmation with deposit note:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! I've received your deposit — your [service] appointment is confirmed for [day, date] at [time]. Address: [address]. If anything changes, please let me know at least 48 hours before. Looking forward to it!
        </blockquote>
      </section>

      <section id="new-client">
        <h2 className="font-serif text-2xl font-bold mb-4">New client confirmation templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">New clients benefit from a slightly more detailed confirmation — they don't know your setup, parking, or what to expect:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! Lovely to hear from you — your [service] with me is confirmed for [day, date] at [time].<br /><br />
          Address: [full address + any parking/entry instructions]<br /><br />
          A few things to know as a new client:<br />
          – Please arrive on time; late arrivals may affect your appointment time<br />
          – Cancellations need 48 hours' notice — your deposit will be retained for late cancellations<br />
          – If you have any nail concerns or questions before your appointment, just ask!<br /><br />
          See you soon, [Your name] ✨
        </blockquote>
      </section>

      <section id="deposit-paid">
        <h2 className="font-serif text-2xl font-bold mb-4">Deposit confirmation templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you collect deposits manually (not through a booking app) and need to confirm receipt:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! I've received your deposit of £[amount] — your [service] appointment is now confirmed for [day, date] at [time]. The remaining balance of £[amount] is due on the day. See you then! [Your name]
        </blockquote>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Deposit received, thank you! ✅ Your [service] on [day] at [time] is locked in. Looking forward to it!
        </blockquote>
      </section>
    </div>
  ),
});
export {};
