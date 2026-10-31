import { UsersRound } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function CRMPage() {
  return (
    <FeaturePage
      title="Know Your Clients. Grow Your Business. | Nelsy"
      metaDescription="Keep track of every client, their booking history, preferences, and notes. Nelsy's CRM helps beauty professionals build stronger relationships and get more repeat business."
      canonical="/features/crm"
      h1="Know your clients. Grow your business."
      heroDescription="The best beauty professionals remember details. Nelsy helps you track client preferences, booking history, and notes so every appointment feels personal — even when your schedule is full."
      icon={UsersRound}
      benefits={[
        {
          title: 'Every client in one place',
          desc: 'See who has booked, how often they come back, what services they get, and anything else you want to remember — all in one profile.',
        },
        {
          title: 'Personal service at scale',
          desc: "A client who feels remembered comes back. Knowing their preferences, allergies, or favourite shapes means you can deliver without asking every time.",
        },
        {
          title: 'Identify your best clients',
          desc: 'See which clients book most often, spend the most, and refer others. Focus your energy where it has the most impact.',
        },
        {
          title: 'Win back lapsed clients',
          desc: "Spot clients you have not seen in a while and reach out before they find someone else. A simple message can reactivate someone who simply got busy.",
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Build your client list automatically',
          desc: 'Every client who books through Nelsy is added to your contact list. No manual data entry required.',
        },
        {
          step: '2',
          title: 'Add notes and preferences',
          desc: 'Record anything useful — skin sensitivities, nail preferences, important dates, or notes from past appointments.',
        },
        {
          step: '3',
          title: 'Use your data to take action',
          desc: 'Filter by last booking date, service type, or spending to find the right clients to message or target with a promotion.',
        },
      ]}
      useCases={[
        'Nail techs with a growing client base who want to stay organised',
        'Beauty pros who want to send targeted rebooking messages to lapsed clients',
        'Lash artists who track clients with sensitivities or specific product preferences',
        'Salon owners who want visibility across all their clients in one system',
        'Anyone who wants to move beyond trying to remember everything in their head',
      ]}
      faq={[
        {
          q: 'Is client data stored securely?',
          a: 'Yes. Client data is stored securely and you control who has access to it.',
        },
        {
          q: 'Can I export my client list?',
          a: 'Yes. You can export your contacts if you need to use them in another tool or keep your own backup.',
        },
        {
          q: 'How does the CRM connect to my bookings?',
          a: 'Every booking is tied to a client profile automatically. Over time you build a full history without doing anything extra.',
        },
        {
          q: 'Can I send messages to clients from the CRM?',
          a: 'Yes. You can reach out to specific clients or segments — for a promotion, a rebooking nudge, or a personal follow-up.',
        },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'analytics', title: 'Analytics', route: '/features/analytics' },
      ]}
    />
  );
}
