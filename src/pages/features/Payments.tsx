import { CreditCard } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function PaymentsPage() {
  return (
    <FeaturePage
      title="Get Paid for Every Appointment | Nelsy"
      metaDescription="Take full payments or deposits online when clients book, record cash and card payments at the studio, and withdraw to your bank. 0% Nelsy commission."
      canonical="/features/payments"
      h1="Get paid for every appointment"
      heroDescription="Chase less, earn more. Clients pay online when they book, in full or as a deposit, through your own Stripe account. Payments taken at the studio are recorded next to the booking, so you always know what is paid and what is left."
      icon={CreditCard}
      benefits={[
        {
          title: 'Choose how each service is paid',
          desc: 'Full payment online at booking, a deposit online with the balance at the studio, or everything at the appointment.',
        },
        {
          title: 'Your own Stripe account',
          desc: 'Online payments go to your connected Stripe account. Nelsy takes 0% commission; only Stripe processing fees apply.',
        },
        {
          title: 'Cash and card at the studio',
          desc: 'Record balances paid in cash or on your own card terminal against the booking, so each appointment shows what is paid and what is left.',
        },
        {
          title: 'See what you have earned',
          desc: 'The Income tab shows your balance, your transactions and your payouts, and exports transactions to CSV.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Connect Stripe',
          desc: 'Create or connect your Stripe account from your Nelsy dashboard. Stripe verifies your identity and your bank account.',
        },
        {
          step: '2',
          title: 'Clients pay when they book',
          desc: 'Depending on the service, clients pay in full or a deposit online at booking, or nothing until the appointment.',
        },
        {
          step: '3',
          title: 'Withdraw to your bank',
          desc: 'Online payments add to your balance. Withdraw it to your bank account from the Income tab.',
        },
      ]}
      useCases={[
        'Nail techs who want clients to pay before the appointment',
        'Beauty pros running their business from home or a salon suite',
        'Anyone who wants a clear view of income without spreadsheets',
        'Pros who take a deposit online and the balance at the studio',
        'Lash, brow and beauty artists ready to look more professional to clients',
      ]}
      faq={[
        {
          q: 'How quickly do I get my money?',
          a: 'Online payments land in your Stripe balance. Stripe makes funds available on its own schedule, which depends on your country and account. Once available, you withdraw them to your bank from the Income tab.',
        },
        {
          q: 'How can clients pay?',
          a: 'Online through Stripe\'s secure checkout, by card or any other payment method Stripe offers for your account. Clients do not need an app or an account.',
        },
        {
          q: 'Can I still accept cash?',
          a: 'Yes. Set a service to be paid at the appointment, or take the balance after a deposit in cash or by card on your own terminal, and record it in Nelsy. These payments show in your income but are not added to your Nelsy balance, since you already hold the money.',
        },
        {
          q: 'Is there a transaction fee?',
          a: 'Nelsy charges 0% commission. The Independent plan is $29 a month, or $25 a month billed yearly. Stripe charges its standard processing fee on online payments.',
        },
        {
          q: 'Can clients leave a tip?',
          a: 'Not through Nelsy yet. Clients can tip you in person at the appointment.',
        },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
        { slug: 'analytics', title: 'Analytics', route: '/features/analytics' },
      ]}
    />
  );
}
