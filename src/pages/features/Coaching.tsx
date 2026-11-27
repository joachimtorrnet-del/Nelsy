import { UserRound } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function CoachingPage() {
  return (
    <FeaturePage
      upcomingPlan="Creator"
      title='1:1 Coaching and Consultations for Beauty Pros: Creator Plan'
      metaDescription='Coaching tools for beauty pros are part of the upcoming Nelsy Creator plan. Join the waitlist; today you can book paid sessions as services with payment upfront.'
      canonical='/features/coaching'
      h1='Sell 1:1 coaching from your link in bio'
      heroDescription='Dedicated coaching tools are part of the upcoming Nelsy Creator plan. Today, on the Independent plan, you can already add a paid session as a service on your booking page, with payment at booking. Join the waitlist to hear when the Creator plan opens.'
      icon={UserRound}
      benefits={[
        { title: 'No product to create', desc: 'A coaching call sells your experience directly: how you priced your services, found your first clients or set up your studio.' },
        { title: 'Booked and paid upfront, today', desc: 'Add a session as a service with full payment at booking, so there are no unpaid calls.' },
        { title: 'Same calendar as your services', desc: 'Sessions booked as services use your Nelsy booking calendar, so you never double-book.' },
        { title: '0% Nelsy commission', desc: 'Nelsy takes no commission on bookings. Standard payment processing fees apply.' },
      ]}
      steps={[
        { step: '1', title: 'Create a coaching offer', desc: 'Set the length, the price and what the session covers.' },
        { step: '2', title: 'Choose your availability', desc: 'Clients only see the slots you open.' },
        { step: '3', title: 'Get booked and paid', desc: 'The client books, pays and receives a confirmation.' },
      ]}
      useCases={[
        'Experienced nail techs mentoring beginners',
        'Portfolio and pricing reviews for new beauty pros',
        'Business coaching for salon or studio setup',
        'Video or in-person skill sessions',
      ]}
      faq={[
        { q: 'Can I sell coaching on Nelsy today?', a: 'Yes, as a regular service: add the session to your booking page with a length, a price and full payment at booking, on the Independent plan. Dedicated coaching tools are part of the upcoming Creator plan; join the waitlist at hello@getnelsy.com.' },
        { q: 'Can I do coaching sessions by video?', a: 'Yes. Say in the service description that the session happens by video. Nelsy does not add a meeting link to the booking yet, so send the link to the email or phone number the client gives when booking.' },
        { q: 'Does Nelsy take a commission?', a: 'No. Nelsy charges 0% commission. Standard payment processing fees apply.' },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
      ]}
    />
  );
}
