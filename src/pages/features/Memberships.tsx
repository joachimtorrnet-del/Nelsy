import { Gem } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function MembershipsPage() {
  return (
    <FeaturePage
      title='Sell Memberships with Monthly Payments'
      metaDescription='Create a paid membership for your beauty clients or students, with automatic monthly payments from your Nelsy page. 0% Nelsy commission.'
      canonical='/features/memberships'
      h1='Sell memberships with automatic monthly payments'
      heroDescription='A monthly club for your regular clients, or a paid space for students who want ongoing tips and feedback. Recurring revenue, collected automatically.'
      icon={Gem}
      benefits={[
        { title: 'Predictable income', desc: 'Monthly payments smooth out the quiet weeks in a beauty business.' },
        { title: 'Reward your regulars', desc: 'Offer members perks such as priority booking or exclusive content.' },
        { title: 'Payments on autopilot', desc: 'Members are charged automatically each month, with no invoices to chase.' },
        { title: '0% Nelsy commission', desc: 'You keep your revenue. Standard payment processing fees apply.' },
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
        { q: 'How do members pay?', a: 'Members pay by card when they join, then are charged automatically each month.' },
        { q: 'Can members cancel?', a: 'Yes. Members can cancel their membership; set clear terms on what is included.' },
        { q: 'Does Nelsy take a commission?', a: 'No. Nelsy charges 0% commission. Standard payment processing fees apply.' },
      ]}
      relatedFeatures={[
        { slug: 'courses', title: 'Courses', route: '/features/courses' },
        { slug: 'crm', title: 'CRM & Clients', route: '/features/crm' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
      ]}
    />
  );
}
