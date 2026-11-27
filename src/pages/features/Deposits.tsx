import { Wallet } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function DepositsPage() {
  return (
    <FeaturePage
      title="Collect Booking Deposits Automatically | Nelsy"
      metaDescription="Require a deposit when clients book. Protect your schedule from no-shows and late cancellations with deposits paid online at booking, for beauty pros."
      canonical="/features/deposits"
      h1="Collect booking deposits automatically"
      heroDescription="No-shows cost beauty professionals real money. With Nelsy, clients pay a deposit online when they book, so the appointment is confirmed by a real commitment."
      icon={Wallet}
      benefits={[
        {
          title: 'Less income lost to no-shows',
          desc: 'If a client does not show up, the deposit you already collected covers part of the empty slot, according to your policy.',
        },
        {
          title: 'Nothing to chase',
          desc: 'The deposit is paid online at booking, before the appointment exists in your calendar. There is no payment request to send.',
        },
        {
          title: 'Per service',
          desc: 'Set a deposit on the services that need one, such as long sets or bridal appointments, and keep others pay-at-the-studio.',
        },
        {
          title: 'Paid to your own Stripe account',
          desc: 'Deposits go to your connected Stripe account with 0% Nelsy commission. Only Stripe processing fees apply.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Set a deposit on a service',
          desc: 'Choose "Require a deposit" and enter a fixed amount below the service price. Use our deposit calculator if you think in percentages.',
        },
        {
          step: '2',
          title: 'Client pays at booking',
          desc: 'The client pays the deposit online to confirm the booking. The balance due at the studio is shown before they pay.',
        },
        {
          step: '3',
          title: 'Collect the balance at the appointment',
          desc: 'Take the rest in cash or by card on your own terminal, and record it in Nelsy so the booking shows as fully paid.',
        },
      ]}
      useCases={[
        'Nail techs doing nail art or long sets worth protecting',
        'Beauty pros who have had repeated no-shows or last-minute cancellations',
        'Lash artists and brow techs whose appointments take real prep time',
        'Anyone tired of holding slots for clients who never show up',
        'Beauty professionals who want a consistent booking policy',
      ]}
      faq={[
        {
          q: 'How much should I charge as a deposit?',
          a: 'Many beauty professionals charge between 20% and 50% of the service price, or a flat amount such as $20. The goal is enough to make a no-show costly without putting off genuine clients. In Nelsy you enter the deposit as a fixed amount per service.',
        },
        {
          q: 'What happens to the deposit if a client cancels?',
          a: 'Your cancellation policy decides. Write it in your page bio or service descriptions so clients read it before they book. If your policy gives a refund, you make it from your Stripe dashboard.',
        },
        {
          q: 'How do clients pay the deposit?',
          a: 'Online, at booking, through Stripe\'s secure checkout. It takes about a minute and no account is needed.',
        },
        {
          q: 'Can I skip the deposit for regular clients?',
          a: 'A deposit applies to everyone who books that service online. For a trusted regular, you can add the booking yourself from your dashboard, with no deposit.',
        },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
      ]}
    />
  );
}
