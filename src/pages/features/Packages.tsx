import { Package } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function PackagesPage() {
  return (
    <FeaturePage
      upcomingFeature="Packages"
      title="Service Packages for Beauty Pros: Planned for Nelsy"
      metaDescription="Selling bundles of sessions, like 5 lash fills or a bridal package, is planned for a future Nelsy update. Join the waitlist; take bookings and deposits today."
      canonical="/features/packages"
      h1="Sell service packages and bundles"
      heroDescription="Packages, where a client pays once for several sessions, are not available in Nelsy yet. They are planned for a future update. Today you can already group related services on your page and sell a combined appointment as one service."
      icon={Package}
      benefits={[
        { title: 'Clients commit to coming back', desc: 'A client who has paid for several sessions books them, which keeps your calendar fuller from month to month.' },
        { title: 'Paid upfront', desc: 'A package brings in the money for several appointments at once.' },
        { title: 'Group services today', desc: 'Collections already let you group related services on your page, such as "Bridal" or "Lash fills", so clients find them together.' },
        { title: 'Combined appointments today', desc: 'An appointment with several steps, like a manicure and pedicure together, can be one service with its own price and duration.' },
      ]}
      steps={[
        { step: '1', title: 'Create a package', desc: 'Choose the service, the number of sessions and the package price.' },
        { step: '2', title: 'Clients buy it from your page', desc: 'The client pays once for the whole package.' },
        { step: '3', title: 'Sessions are booked over time', desc: 'The client books each session as usual, and the package keeps count of what is left.' },
      ]}
      useCases={[
        'Lash artists who want to sell a set plus fills together',
        'Estheticians selling a course of facials',
        'Makeup artists and hairstylists with bridal trial and wedding-day bundles',
        'Nail techs offering a block of maintenance appointments',
      ]}
      faq={[
        { q: 'Can I sell packages on Nelsy today?', a: 'Not as prepaid bundles of sessions yet. That is planned for a future Nelsy update; join the waitlist at hello@getnelsy.com. Today you can group related services in a collection on your page, or create one service for an appointment that combines several treatments.' },
        { q: 'Which plan will include packages?', a: 'That is not decided yet. We will say which plan includes them before they launch.' },
        { q: 'How do I price a package?', a: 'Start from the price of the sessions bought one by one and decide what, if anything, you give back for the commitment. Our blog guide on how to create nail service packages walks through examples.' },
        { q: 'Will the details change?', a: 'Possibly. The steps on this page describe the plan today, and the final feature may differ. The waitlist is the best way to hear what launches and when.' },
      ]}
      relatedFeatures={[
        { slug: 'gift-cards', title: 'Gift Cards', route: '/features/gift-cards' },
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
      ]}
    />
  );
}
