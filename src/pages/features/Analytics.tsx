import { BarChart3 } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function AnalyticsPage() {
  return (
    <FeaturePage
      title="Analytics for Beauty Professionals | Nelsy"
      metaDescription="See page visits, bookings and revenue for the last 7, 30 or 90 days, where your visitors come from, and how this period compares with the last one."
      canonical="/features/analytics"
      h1="Understand what's working in your beauty business"
      heroDescription="Running a beauty business without numbers is guesswork. Nelsy shows how many people visit your page, where they come from, how many book and what you earn, so you can see what is working."
      icon={BarChart3}
      benefits={[
        {
          title: 'Visits, bookings and revenue',
          desc: 'See how many people visited your page and how many booked over the last 7, 30 or 90 days, next to your revenue for the month.',
        },
        {
          title: 'Where clients come from',
          desc: 'See how many visits came from Instagram, TikTok or a direct link, so you know which channel sends people to your page.',
        },
        {
          title: 'Revenue day by day',
          desc: 'A daily chart shows your booked revenue over the period, so busy and quiet days stand out.',
        },
        {
          title: 'Compared with the last period',
          desc: 'Your dashboard home compares visits, bookings and revenue with the previous period of the same length.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Share your page and take bookings',
          desc: 'Every visit to your page and every booking adds to your numbers. There is nothing to set up.',
        },
        {
          step: '2',
          title: 'Open Analytics',
          desc: 'Pick 7, 30 or 90 days to see visits, bookings, revenue and traffic sources.',
        },
        {
          step: '3',
          title: 'Act on what you see',
          desc: 'If Instagram sends most of your visits, post there more. If visits are high but bookings are low, look at your services and prices.',
        },
      ]}
      useCases={[
        'Nail techs who want to know if Instagram or TikTok brings more visitors',
        'Beauty pros checking whether this month was better than the last',
        'Pros planning a price increase who want to watch bookings before and after',
        'Lash artists who want to see busy and quiet periods',
        'Anyone who wants to run their beauty business with real numbers',
      ]}
      faq={[
        {
          q: 'How far back does the data go?',
          a: 'Your numbers start from the day you start using Nelsy. The Analytics tab shows the last 7, 30 or 90 days.',
        },
        {
          q: 'Do I need to set anything up?',
          a: 'No. Visits to your Nelsy page and bookings made through it are counted automatically.',
        },
        {
          q: 'Can I see numbers for each service?',
          a: 'Not yet. Analytics shows totals for your page: visits, bookings, revenue and traffic sources.',
        },
        {
          q: 'Can I export my data?',
          a: 'You can export your transactions from the Income tab and your client list from the Customers tab, both as CSV files.',
        },
      ]}
      relatedFeatures={[
        { slug: 'crm', title: 'CRM & Clients', route: '/features/crm' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
        { slug: 'link-in-bio', title: 'Link in Bio', route: '/features/link-in-bio' },
      ]}
    />
  );
}
