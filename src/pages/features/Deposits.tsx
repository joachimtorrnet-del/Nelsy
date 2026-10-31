import { Wallet } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function DepositsPage() {
  return (
    <FeaturePage
      title="Collect Booking Deposits Automatically | Nelsy"
      metaDescription="Require a deposit before confirming appointments. Protect your schedule from no-shows and last-minute cancellations with automatic deposit collection for beauty pros."
      canonical="/features/deposits"
      h1="Collect booking deposits automatically"
      heroDescription="No-shows cost beauty professionals real money. Requiring a deposit before confirming appointments protects your time and ensures clients show up committed."
      icon={Wallet}
      benefits={[
        {
          title: 'Stop losing income to no-shows',
          desc: 'A client who has paid a deposit has made a real commitment. No-show rates drop when money is already on the line.',
        },
        {
          title: 'No awkward conversations',
          desc: "Deposits are collected automatically when a client books. There's nothing to chase and no policy to explain in person.",
        },
        {
          title: 'Protect your highest-value slots',
          desc: 'Nail art, special occasion sets, and premium services take more time to prepare. Deposits make sure that time is respected.',
        },
        {
          title: 'Clients know you mean business',
          desc: "Requiring a deposit signals professionalism. It tells clients your time has value — and that's a message worth sending.",
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Set your deposit amount',
          desc: 'Choose a fixed amount or a percentage of the service price. You decide what feels right for your business.',
        },
        {
          step: '2',
          title: 'Client pays at booking',
          desc: 'When a client books, they pay the deposit to confirm. No deposit means no confirmed appointment.',
        },
        {
          step: '3',
          title: 'Collect the balance at the appointment',
          desc: 'The remaining balance is collected when the client arrives, either through Nelsy or however you prefer.',
        },
      ]}
      useCases={[
        'Nail techs doing nail art or long sets worth protecting',
        'Beauty pros who have experienced repeated no-shows or last-minute cancellations',
        'Lash artists and brow techs whose appointments require significant prep time',
        'Anyone tired of holding slots for clients who never show up',
        'Beauty professionals who want a consistent, professional booking policy',
      ]}
      faq={[
        {
          q: 'How much should I charge as a deposit?',
          a: 'Most beauty professionals charge between 20% and 50% of the service price, or a flat amount like £20. The goal is enough to make cancellation feel costly without creating friction for genuine clients.',
        },
        {
          q: 'What happens to the deposit if a client cancels?',
          a: 'Your cancellation policy determines what happens. You can keep the deposit if a client cancels within a certain timeframe, or refund it if they give enough notice. You set the rules.',
        },
        {
          q: 'Is it difficult for clients to pay a deposit?',
          a: "Clients pay securely at the time of booking using a card. It's a familiar checkout experience and takes less than a minute.",
        },
        {
          q: "Can I waive the deposit for regular clients?",
          a: "Yes. You have flexibility in how you apply your deposit policy. For trusted regulars you can manage this through your dashboard.",
        },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
      ]}
    />
  );
}
