import { Calendar } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function BookingsPage() {
  return (
    <FeaturePage
      title="Online Booking for Beauty Professionals | Nelsy"
      metaDescription="Let clients book your nail and beauty services 24/7 from your link in bio. They pick a service and a free time, and both of you get an email confirmation."
      canonical="/features/bookings"
      h1="Online booking for beauty professionals"
      heroDescription="Stop managing bookings over Instagram DMs. Give clients a booking page they can use any time: they pick a service, choose a free time and confirm, while you get on with your work."
      icon={Calendar}
      benefits={[
        {
          title: 'Open 24/7',
          desc: 'Your booking page works around the clock. Clients pick a service, choose a time and enter their details, without waiting for you to reply.',
        },
        {
          title: 'Only your real free times',
          desc: 'You set your hours for each day of the week. Clients only see times inside those hours that are not already booked, so the same slot cannot be booked twice.',
        },
        {
          title: 'Paid the way you choose',
          desc: 'For each service, choose full payment online, a deposit online with the balance at the studio, or payment at the appointment.',
        },
        {
          title: 'Email confirmations',
          desc: 'The client gets an email confirming the service and time as soon as they book, and you get an email for every new booking.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Add your services and hours',
          desc: 'Add each service with its price, duration and how it is paid, then set your opening hours for each day of the week.',
        },
        {
          step: '2',
          title: 'Share your booking link',
          desc: 'Put your Nelsy link in your Instagram bio, your stories and anywhere else clients find you.',
        },
        {
          step: '3',
          title: 'Clients book directly',
          desc: 'Clients choose a service and a time and confirm. The booking appears in your dashboard and both of you get an email.',
        },
      ]}
      useCases={[
        'Nail techs tired of coordinating bookings over DMs and texts',
        'Lash artists who lose clients to slow DM replies',
        'Beauty pros working from home or a salon suite',
        'Mobile beauty pros who want a booking flow clients can use on their phone',
        'Anyone who wants to look more professional without hiring a receptionist',
      ]}
      faq={[
        {
          q: 'Do my clients need to create an account to book?',
          a: 'No. Clients book without signing up. They pick a service and a time and enter their name and contact details.',
        },
        {
          q: 'Can I control when clients can book?',
          a: 'Yes. You set your opening hours for each day of the week and switch off the days you do not work. Clients only see free times inside those hours. Blocking a single date is not available yet: you can hold the time by adding a booking yourself from your dashboard.',
        },
        {
          q: 'What happens if I need to cancel or reschedule?',
          a: 'You can cancel or move an appointment from the Bookings tab of your dashboard. Nelsy does not email the client about the change yet, so let them know yourself: their email and phone number are on the booking.',
        },
        {
          q: 'Can I take deposits at the time of booking?',
          a: 'Yes. Set a deposit on any service and clients pay it online to confirm the booking. The balance is paid at the appointment.',
        },
        {
          q: 'Can I add bookings that came in by phone or DM?',
          a: 'Yes. Add them yourself from your dashboard so your calendar and client list stay complete.',
        },
        {
          q: 'Does Nelsy send appointment reminders?',
          a: 'Not yet. Today Nelsy sends an email confirmation when the client books. For reminders, our free appointment reminder templates give you ready-to-send messages.',
        },
      ]}
      relatedFeatures={[
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
        { slug: 'crm', title: 'CRM & Clients', route: '/features/crm' },
        { slug: 'link-in-bio', title: 'Link in Bio', route: '/features/link-in-bio' },
      ]}
    />
  );
}
