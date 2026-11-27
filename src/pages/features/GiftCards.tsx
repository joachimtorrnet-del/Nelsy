import { Gift } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function GiftCardsPage() {
  return (
    <FeaturePage
      upcomingFeature="Gift Cards"
      title="Gift Cards for Beauty Pros: Planned for Nelsy"
      metaDescription="Selling gift cards from your Nelsy page is planned for a future update. Join the waitlist, and take bookings and deposits from your link in bio today."
      canonical="/features/gift-cards"
      h1="Sell gift cards from your link in bio"
      heroDescription="Gift cards are not available in Nelsy yet. They are planned for a future update, so clients can buy a card online for a friend, who then uses it on a booking. Join the waitlist to hear when they launch."
      icon={Gift}
      benefits={[
        { title: 'Revenue before the appointment', desc: 'A gift card is paid upfront, often in the weeks before holidays, Mother\'s Day or Valentine\'s Day.' },
        { title: 'New clients through your regulars', desc: 'The person who receives the card may never have booked you before. A gift card is a personal recommendation.' },
        { title: 'Planned next to your bookings', desc: 'The plan is for gift cards to sit on the same page as your services, so the receiver can book right away.' },
        { title: 'Bookings today', desc: 'Online booking, deposits and payments from your link in bio are available now on the Independent plan, with 0% Nelsy commission.' },
      ]}
      steps={[
        { step: '1', title: 'Choose the amounts', desc: 'Offer set amounts, or a card for a specific service.' },
        { step: '2', title: 'Clients buy online', desc: 'A client pays for the card from your page and sends it to the person they are gifting.' },
        { step: '3', title: 'The receiver books', desc: 'The receiver uses the card when booking with you.' },
      ]}
      useCases={[
        'Nail techs who get asked for vouchers before the holidays',
        'Lash and brow artists who want gift sales from their regulars',
        'Estheticians selling facials as a gift',
        'Any beauty pro who sells paper vouchers today and tracks them by hand',
      ]}
      faq={[
        { q: 'Can I sell gift cards on Nelsy today?', a: 'Not yet. Gift cards are planned for a future Nelsy update. Join the waitlist at hello@getnelsy.com and we will email you when they launch. Today, on the Independent plan, you can take bookings, deposits and payments from your link in bio.' },
        { q: 'Which plan will include gift cards?', a: 'That is not decided yet. We will say which plan includes them before they launch.' },
        { q: 'How can I offer gift cards in the meantime?', a: 'Many pros sell paper or digital vouchers and keep a simple list of codes, amounts and expiry dates. Our blog guide on how to offer nail gift cards covers pricing, wording and how to track them.' },
        { q: 'Will the details change?', a: 'Possibly. The steps on this page describe the plan today, and the final feature may differ. The waitlist is the best way to hear what launches and when.' },
      ]}
      relatedFeatures={[
        { slug: 'packages', title: 'Packages', route: '/features/packages' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
      ]}
    />
  );
}
