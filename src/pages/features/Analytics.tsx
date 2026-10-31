import { BarChart3 } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function AnalyticsPage() {
  return (
    <FeaturePage
      title="Understand What's Working in Your Beauty Business | Nelsy"
      metaDescription="See your booking trends, top services, and revenue patterns in one dashboard. Nelsy Analytics helps beauty professionals make smarter decisions without spreadsheets."
      canonical="/features/analytics"
      h1="Understand what's working in your beauty business"
      heroDescription="Running a beauty business without data is guesswork. Nelsy shows you which services are most popular, when your busiest periods are, and how your income is trending — so you can make decisions based on facts."
      icon={BarChart3}
      benefits={[
        {
          title: 'See your business clearly',
          desc: 'Revenue, bookings, and client activity are displayed in a simple dashboard. No spreadsheets, no manual counting.',
        },
        {
          title: 'Know your best services',
          desc: 'Find out which services you book most, which take the most time, and which generate the most income. Prioritise what works.',
        },
        {
          title: 'Plan ahead',
          desc: 'Spot your slow weeks before they arrive. Use that insight to run a promotion, adjust your availability, or plan your own schedule.',
        },
        {
          title: 'Track growth over time',
          desc: "Compare this month to last month. See whether your business is growing, and understand what is driving the change.",
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Book and take payments through Nelsy',
          desc: 'Every booking and payment automatically adds to your analytics. There is nothing to set up separately.',
        },
        {
          step: '2',
          title: 'Check your dashboard',
          desc: 'Open your Nelsy dashboard and see your stats at a glance — bookings, revenue, new clients, and more.',
        },
        {
          step: '3',
          title: 'Use the insight to make decisions',
          desc: "If Tuesday afternoons are always empty, fill them. If gel overlays outsell everything else, lean in. The data tells you what to do next.",
        },
      ]}
      useCases={[
        'Nail techs who want to understand which services are most profitable per hour',
        'Beauty pros planning a price increase and wanting data to support the decision',
        'Salon owners tracking performance across services and time periods',
        'Lash artists who want to see seasonal trends and plan their marketing accordingly',
        'Anyone who wants to run their beauty business like a business, not a hustle',
      ]}
      faq={[
        {
          q: 'How far back does the analytics data go?',
          a: 'Your data accumulates from the day you start using Nelsy. The longer you use it, the more valuable the trends become.',
        },
        {
          q: 'Do I need to do anything to set up analytics?',
          a: 'No. Analytics are built in. Every booking and payment you process through Nelsy is tracked automatically.',
        },
        {
          q: 'Can I see data for specific services?',
          a: 'Yes. You can filter your analytics by service type to see how individual offerings are performing.',
        },
        {
          q: 'Can I export my data?',
          a: 'You can view and export key reports from your dashboard if you want to use the data elsewhere.',
        },
      ]}
      relatedFeatures={[
        { slug: 'crm', title: 'CRM & Clients', route: '/features/crm' },
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
      ]}
    />
  );
}
