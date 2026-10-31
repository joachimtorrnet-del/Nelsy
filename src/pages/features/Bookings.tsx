import { Calendar } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function BookingsPage() {
  return (
    <FeaturePage
      title="Online Booking for Beauty Professionals | Nelsy"
      metaDescription="Let clients book your nail and beauty services 24/7 with Nelsy's online booking. No phone tag, no DM chaos — just a clean booking page that works while you sleep."
      canonical="/features/bookings"
      h1="Online booking for beauty professionals"
      heroDescription="Stop managing bookings over Instagram DMs. Give clients a professional booking page they can use any time, and spend your energy on your craft instead of your inbox."
      icon={Calendar}
      benefits={[
        {
          title: 'Book while you sleep',
          desc: 'Your booking page is open 24/7. Clients can pick a service, choose a time, and confirm — all without you lifting a finger.',
        },
        {
          title: 'No more back-and-forth',
          desc: 'Your availability is always up to date. Clients only see times you actually have open, so you stop fielding "are you free Saturday?" messages.',
        },
        {
          title: 'Professional first impression',
          desc: 'A clean, branded booking page signals that you run a real business — not a side hustle managed from DMs.',
        },
        {
          title: 'Fewer no-shows',
          desc: 'Automated booking confirmations remind clients about their appointments, so fewer people forget or ghost on the day.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Set up your services and availability',
          desc: 'Add the services you offer, set your working hours, and configure any buffer time between appointments. Takes about five minutes.',
        },
        {
          step: '2',
          title: 'Share your booking link',
          desc: 'Put your Nelsy link in your Instagram bio, your stories, and anywhere else clients find you. One link handles everything.',
        },
        {
          step: '3',
          title: 'Clients book directly',
          desc: 'Clients choose a service, pick a time that suits them, and confirm. You get a notification and they get a confirmation. Done.',
        },
      ]}
      useCases={[
        'Nail techs tired of coordinating bookings over text',
        'Lash artists who want to stop losing clients to slow DM replies',
        'Beauty professionals working from home or a salon suite',
        'Mobile nail techs who need a simple booking flow clients can use on the go',
        'Anyone who wants to look more professional without hiring a receptionist',
      ]}
      faq={[
        {
          q: 'Do my clients need to create an account to book?',
          a: 'No. Clients can book without signing up for anything. They just pick a service, choose a time, and confirm.',
        },
        {
          q: 'Can I control when clients can book?',
          a: 'Yes. You set your working hours, block off days off, and add buffer time between appointments. Clients only see your real availability.',
        },
        {
          q: 'What happens if I need to cancel or reschedule?',
          a: "You can manage appointments from your Nelsy dashboard. If you cancel, the client is notified automatically so they're not left waiting.",
        },
        {
          q: 'Can I take deposits at the time of booking?',
          a: 'Yes. Nelsy lets you require a deposit to confirm a booking, which protects your time and reduces no-shows.',
        },
      ]}
      relatedFeatures={[
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
        { slug: 'crm', title: 'CRM & Clients', route: '/features/crm' },
      ]}
    />
  );
}
