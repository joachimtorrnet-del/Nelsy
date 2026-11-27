import { Gem } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function MembershipsPage() {
  return (
    <FeaturePage
      upcomingPlan="Creator"
      title='Beauty Memberships with Monthly Payments: Creator Plan'
      metaDescription='Paid memberships with automatic monthly payments are part of the upcoming Nelsy Creator plan. Join the waitlist, and start with bookings and deposits today.'
      canonical='/features/memberships'
      h1='Sell memberships with automatic monthly payments'
      heroDescription='Memberships are part of the upcoming Nelsy Creator plan: a monthly club for your regular clients, or a paid space for students who want ongoing tips and feedback. Join the waitlist to hear when it opens.'
      icon={Gem}
      benefits={[
        { title: 'Predictable income', desc: 'Monthly payments smooth out the quiet weeks in a beauty business.' },
        { title: 'Reward your regulars', desc: 'Offer members perks such as priority booking or exclusive content.' },
        { title: 'Payments on autopilot', desc: 'Members will be charged automatically each month, with no invoices to chase.' },
        { title: 'Bookings today', desc: 'Services, deposits and payments are available now on the Independent plan, with 0% Nelsy commission.' },
      ]}
      steps={[
        { step: '1', title: 'Create your membership', desc: 'Name it, set the monthly price and list what members get.' },
        { step: '2', title: 'Add it to your page', desc: 'It appears on your link in bio next to your services and products.' },
        { step: '3', title: 'Members join and pay monthly', desc: 'Payments renew automatically until the member cancels.' },
      ]}
      useCases={[
        'Infill or maintenance clubs for regular nail clients',
        'Paid communities for students after a course',
        'Monthly tutorial and Q&A clubs for beauty creators',
        'VIP perks for your most loyal clients',
      ]}
      faq={[
        { q: 'Can I sell memberships on Nelsy today?', a: 'Not yet. Memberships are part of the upcoming Creator plan. Today, on the Independent plan, you can take bookings, deposits and payments from your link in bio. Join the waitlist at hello@getnelsy.com to hear when the Creator plan opens.' },
        { q: 'How will members pay?', a: 'Members will pay by card when they join, then be charged automatically each month until they cancel.' },
        { q: 'What should a beauty membership include?', a: 'Something members value every month: priority booking, a maintenance service, monthly tutorials or a Q&A. Write clear terms on what is included and how to cancel.' },
      ]}
      relatedFeatures={[
        { slug: 'courses', title: 'Courses', route: '/features/courses' },
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
      ]}
    />
  );
}
