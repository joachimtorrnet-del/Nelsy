import { UserRound } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function CoachingPage() {
  return (
    <FeaturePage
      title='Sell 1:1 Coaching and Consultations'
      metaDescription='Sell 1:1 coaching calls, portfolio reviews and consultations from your Nelsy page, with online booking and payment upfront. 0% Nelsy commission.'
      canonical='/features/coaching'
      h1='Sell 1:1 coaching from your link in bio'
      heroDescription='New techs pay for shortcuts: how you priced your services, how you found your first clients, how you set up your studio. Offer a call and get paid before it starts.'
      icon={UserRound}
      benefits={[
        { title: 'No product to create', desc: 'A coaching call sells your experience directly. You can launch it today.' },
        { title: 'Booked and paid upfront', desc: 'Clients pick a slot on your calendar and pay when they book, so no unpaid calls.' },
        { title: 'Same calendar as your services', desc: 'Coaching sessions use your Nelsy booking calendar, so you never double-book.' },
        { title: '0% Nelsy commission', desc: 'You keep your revenue. Standard payment processing fees apply.' },
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
        { q: 'Can I do coaching sessions by video?', a: 'Yes. You decide whether a session happens by video or in person and add the details to your offer.' },
        { q: 'Do clients pay before the session?', a: 'Yes, clients pay when they book, so your time is protected.' },
        { q: 'Does Nelsy take a commission?', a: 'No. Nelsy charges 0% commission. Standard payment processing fees apply.' },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'courses', title: 'Courses', route: '/features/courses' },
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
      ]}
    />
  );
}
