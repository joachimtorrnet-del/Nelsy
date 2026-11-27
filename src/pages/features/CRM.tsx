import { UsersRound } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function CRMPage() {
  return (
    <FeaturePage
      title="Client List and Booking History for Beauty Pros | Nelsy"
      metaDescription="Every client who books is added to your Nelsy client list with visits, total booked, no-shows and booking history. Search, sort and export to CSV."
      canonical="/features/crm"
      h1="Know your clients. Grow your business."
      heroDescription="Every client who books through Nelsy lands in your client list automatically, with their visits, what they have booked and how to reach them. See who your regulars are and who you have not seen in a while."
      icon={UsersRound}
      benefits={[
        {
          title: 'Built from your bookings',
          desc: 'Clients are added automatically when they book, and matched by email or phone, so repeat bookings land on the same client.',
        },
        {
          title: 'The history that matters',
          desc: 'For each client: visits, total booked, first and last visit, next appointment, no-shows, cancellations and every past booking.',
        },
        {
          title: 'Find your best clients',
          desc: 'Sort by most visits or highest total booked to see who your regulars are, or by most recent to see who came in lately.',
        },
        {
          title: 'Spot lapsed clients',
          desc: 'The last visit date shows who you have not seen in a while. Email or call them in one tap from their profile.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Clients book',
          desc: 'Every online booking, and every booking you add yourself, adds to the client list. No manual data entry.',
        },
        {
          step: '2',
          title: 'Open a client',
          desc: 'Search by name, email or phone and see their visits, totals and full booking history.',
        },
        {
          step: '3',
          title: 'Reach out or export',
          desc: 'Email or call a client from their profile, or export the list to CSV for your own records or another tool.',
        },
      ]}
      useCases={[
        'Nail techs with a growing client base who want to stay organised',
        'Beauty pros who want to see who is due for a rebooking',
        'Lash artists who want to know their regulars at a glance',
        'Pros moving away from a notebook or a phone contact list',
        'Anyone who wants to move beyond trying to remember everything',
      ]}
      faq={[
        {
          q: 'Is client data stored securely?',
          a: 'Yes. Client details are stored with your bookings and only your account can see them.',
        },
        {
          q: 'Can I export my client list?',
          a: "Yes. Export it to CSV with each client's contact details, visits, no-shows, cancellations, total booked and first and last visit.",
        },
        {
          q: 'How does the client list connect to my bookings?',
          a: 'It is built from your bookings. Bookings with the same email address, or the same phone number when there is no email, are grouped under one client.',
        },
        {
          q: 'Can I send messages to clients from Nelsy?',
          a: 'You can email or call one client at a time from their profile, using your own email or phone app. Email campaigns to groups of clients are part of the upcoming Creator plan.',
        },
        {
          q: 'Can I add notes or preferences to a client?',
          a: 'Not on the client profile yet. Today the profile shows contact details and booking history.',
        },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'analytics', title: 'Analytics', route: '/features/analytics' },
        { slug: 'email', title: 'Email & Newsletters', route: '/features/email-newsletters' },
      ]}
    />
  );
}
