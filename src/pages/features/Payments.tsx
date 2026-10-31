import { CreditCard } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function PaymentsPage() {
  return (
    <FeaturePage
      title="Get Paid for Every Appointment | Nelsy"
      metaDescription="Accept payments directly through Nelsy. Collect deposits, balances, and tips without dealing with cash or separate payment apps. Built for nail techs and beauty pros."
      canonical="/features/payments"
      h1="Get paid for every appointment"
      heroDescription="Chase less, earn more. Nelsy handles payments for your beauty business — from the initial deposit to the final balance — so money lands where it should."
      icon={CreditCard}
      benefits={[
        {
          title: 'One place for all your income',
          desc: 'Deposits, service payments, and tips all flow through Nelsy. No more juggling Venmo, cash, and card terminals.',
        },
        {
          title: 'Get paid before you start',
          desc: 'Collect deposits at booking and the balance before or after the appointment. You decide the flow.',
        },
        {
          title: 'Secure card payments',
          desc: 'Clients pay by card using a checkout they recognise and trust. No apps to download, no friction.',
        },
        {
          title: 'Track what you have earned',
          desc: 'Your payment history is in your dashboard. See what has come in, what is outstanding, and how your income is trending.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Connect your payout account',
          desc: 'Link your bank account once. Payments from bookings go directly to you, on a schedule that works for your business.',
        },
        {
          step: '2',
          title: 'Clients pay when they book',
          desc: 'If you require a deposit, clients pay it to confirm. The remainder can be collected however you prefer.',
        },
        {
          step: '3',
          title: 'Money lands in your account',
          desc: 'Payouts are processed automatically. Check your dashboard to see income, upcoming payouts, and payment history.',
        },
      ]}
      useCases={[
        'Nail techs who want to stop handling cash or using personal payment apps',
        'Beauty pros running their business from home or a salon suite',
        'Anyone who wants a clear view of their income without spreadsheets',
        'Professionals who take deposits and want a clean end-to-end payment flow',
        'Lash, brow, and beauty artists ready to look more professional to clients',
      ]}
      faq={[
        {
          q: 'How quickly do I get my money?',
          a: 'Payout timing depends on your setup, but payments processed through Nelsy are designed to reach your account quickly. You can see the status of every payout in your dashboard.',
        },
        {
          q: 'What card types do clients need?',
          a: 'Clients can pay with most major debit and credit cards. The checkout is handled securely and requires no app or account.',
        },
        {
          q: 'Can I still accept cash?',
          a: 'Yes. Nelsy handles card payments but you can still take cash for any appointment if you prefer. You can mark those manually in your dashboard.',
        },
        {
          q: 'Is there a transaction fee?',
          a: "Nelsy uses Stripe for payments, which charges a small per-transaction fee. Check the pricing page for current rates.",
        },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
      ]}
    />
  );
}
