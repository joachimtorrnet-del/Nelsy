import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-online-booking-works-nail-techs',
  title: 'How Online Booking Works for Nail Techs',
  seoTitle: 'How Online Booking Works for Nail Techs (Explained Simply)',
  excerpt: 'Online booking sounds complicated but it\'s not. Here\'s how it actually works for nail techs — from setting up your booking page to how clients pay and confirm.',
  seoDescription: 'How online booking works for nail techs. A plain-English explanation of the booking flow, what nail techs and clients see, deposits, confirmations, and reminders.',
  category: 'booking-software',
  tags: ['how online booking works nail tech', 'nail tech online booking explained', 'booking system nail tech'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'How online booking works for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'the-basics', label: 'The basics of online booking' },
    { id: 'client-flow', label: 'What the client experience looks like' },
    { id: 'nail-tech-view', label: 'What you see as the nail tech' },
    { id: 'deposits', label: 'How deposits work' },
    { id: 'reminders', label: 'How reminders work' },
    { id: 'getting-started', label: 'Getting started' },
  ],
  relatedSlugs: ['how-to-set-up-online-booking-nail-business', 'how-to-move-from-instagram-dms-to-online-booking', 'best-booking-apps-for-nail-techs-2026', 'why-booking-through-dms-costs-nail-techs-clients'],
  faq: [
    { q: 'Do clients have to create an account to book online?', a: 'It depends on the platform. Some booking platforms require clients to create an account before booking; others allow guest checkout with just a name and phone number. Platforms requiring account creation add friction — clients who don\'t want to sign up may abandon the booking. When evaluating a booking platform, test the client experience yourself to see how many steps it takes.' },
    { q: 'What happens if a client books a time I\'m not available?', a: 'Your booking system only shows available times based on your working hours and existing appointments. Clients can only select from available slots — they can\'t book times marked as unavailable. Make sure your working hours and any blocked-off time are set correctly to prevent unwanted bookings.' },
    { q: 'Can I manually add appointments to my online booking system?', a: 'Yes — most booking platforms allow you to add appointments manually (for clients who prefer to book by phone or message, or for walk-ins). Manual appointments block the time in your calendar just like online bookings.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="the-basics">
        <h2 className="font-serif text-2xl font-bold mb-4">The basics of online booking</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Online booking means clients schedule their own appointments without needing to message you first. You set up a booking page (through a booking platform) that shows your services, prices, availability, and how to pay a deposit. Clients pick what they want, choose a time, pay the deposit, and receive a confirmation.</p>
        <p className="text-gray-700 leading-relaxed">You don't need to do anything until the appointment — the booking, confirmation, and reminder all happen automatically.</p>
      </section>

      <section id="client-flow">
        <h2 className="font-serif text-2xl font-bold mb-4">What the client experience looks like</h2>
        <ArticleTable
          headers={['Step', 'What happens']}
          rows={[
            ['1. Visit your booking link', 'Client clicks the link in your Instagram bio or website'],
            ['2. Choose a service', 'They see your service menu with names, descriptions, duration, and price'],
            ['3. Choose a date and time', 'A calendar shows your available slots — only times you\'re free are visible'],
            ['4. Enter contact details', 'Name, phone number, email (varies by platform)'],
            ['5. Pay deposit', 'If you require a deposit, they pay it here by card — booking only confirms once payment is made'],
            ['6. Receive confirmation', 'Automatic confirmation email or SMS with their appointment details'],
            ['7. Receive reminder', 'Automatic reminder (24–48 hours before) — reduces no-shows'],
          ]}
        />
      </section>

      <section id="nail-tech-view">
        <h2 className="font-serif text-2xl font-bold mb-4">What you see as the nail tech</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">From your side:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>A notification (push notification or email) when a new booking is made</li>
          <li>Your calendar updates automatically with the new appointment</li>
          <li>Client details visible in the booking (name, service, contact info)</li>
          <li>Deposit shown as received (if collected)</li>
          <li>Ability to reschedule, cancel, or message the client through the platform</li>
        </ul>
        <ArticleCallout variant="info" title="No more back-and-forth">
          The biggest change nail techs notice when switching to online booking is the end of the "are you free on Tuesday?" DM loop. Clients self-serve their appointment and you get notified when it's confirmed.
        </ArticleCallout>
      </section>

      <section id="deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">How deposits work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">With online booking, you can require clients to pay a deposit at the point of booking — before the appointment is confirmed. Here's how it typically works:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You set a deposit amount (e.g. 30% of the service price, or a flat fee)</li>
          <li>Clients pay by card during the booking flow — the booking doesn't confirm until payment is received</li>
          <li>The deposit is held by the platform or paid to you, depending on the platform</li>
          <li>If a client cancels within your cancellation window, the deposit policy dictates whether they're refunded</li>
          <li>The remaining balance is paid at the appointment (cash, card, or link)</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Deposit policy guide: <Link to="/learn/nail-tech-deposit-policy" className="underline text-[#F52B8C]">nail tech deposit policy</Link>.</p>
      </section>

      <section id="reminders">
        <h2 className="font-serif text-2xl font-bold mb-4">How reminders work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most booking platforms send automatic reminders to clients before their appointment — typically 24 or 48 hours in advance. You configure this once; it runs automatically for every booking.</p>
        <p className="text-gray-700 leading-relaxed">Reminders significantly reduce no-shows. Clients who would have forgotten are reminded; clients who can no longer attend have advance notice to cancel (within your policy window).</p>
      </section>

      <section id="getting-started">
        <h2 className="font-serif text-2xl font-bold mb-4">Getting started</h2>
        <p className="text-gray-700 leading-relaxed">Setting up online booking typically takes a few hours: choose a platform, create your service menu, set your working hours and availability, configure your deposit requirements, and share your booking link in your Instagram bio. Full setup guide: <Link to="/learn/how-to-set-up-online-booking-nail-business" className="underline text-[#F52B8C]">how to set up online booking for your nail business</Link>.</p>
      </section>
    </div>
  ),
});
export {};
