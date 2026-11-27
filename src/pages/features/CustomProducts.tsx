import { Sparkles } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function CustomProductsPage() {
  return (
    <FeaturePage
      upcomingFeature="Custom Products"
      title="Sell Custom and Made-to-Order Beauty Products: Planned"
      metaDescription="Selling made-to-order offers like custom press-on nails from your Nelsy page is planned for a future update. Join the waitlist; take bookings today."
      canonical="/features/custom-products"
      h1="Sell custom and made-to-order offers"
      heroDescription="Custom products, such as press-on nails made to a client's sizes or a personalized design, are not available in Nelsy yet. They are planned for a future update. Join the waitlist to hear when they launch."
      icon={Sparkles}
      benefits={[
        { title: 'Earn beyond the chair', desc: 'Made-to-order work, like custom press-ons, sells to clients who cannot come to you in person.' },
        { title: 'Collect the details upfront', desc: 'The plan is for clients to send the information you need, such as sizes, shape or inspiration, when they order.' },
        { title: 'Paid before you start', desc: 'Clients pay when they order, so you never start a custom piece without payment.' },
        { title: 'Consultations today', desc: 'You can already sell a design consultation as a bookable service with a deposit or full payment, on the Independent plan.' },
      ]}
      steps={[
        { step: '1', title: 'Create a custom offer', desc: 'Describe what you make, the price and what you need from the client.' },
        { step: '2', title: 'Clients order and pay', desc: 'The client orders from your page and sends their details.' },
        { step: '3', title: 'You make and deliver it', desc: 'You make the piece and deliver it the way you choose.' },
      ]}
      useCases={[
        'Nail techs selling custom press-on sets',
        'Artists taking paid custom design requests',
        'Makeup artists selling personalized face charts',
        'Beauty pros who take custom orders by DM today',
      ]}
      faq={[
        { q: 'Can I sell custom products on Nelsy today?', a: 'Not yet. Custom products are planned for a future Nelsy update; join the waitlist at hello@getnelsy.com. Today you can add a design consultation as a service and take a deposit or full payment when the client books.' },
        { q: 'Which plan will include custom products?', a: 'That is not decided yet. Downloadable digital products are part of the upcoming Creator plan; made-to-order offers are a separate feature, and we will say which plan includes them before they launch.' },
        { q: 'Will Nelsy handle shipping?', a: 'Shipping is not available in Nelsy. We will share how delivery works when the feature is closer to launch.' },
        { q: 'Will the details change?', a: 'Possibly. The steps on this page describe the plan today, and the final feature may differ. The waitlist is the best way to hear what launches and when.' },
      ]}
      relatedFeatures={[
        { slug: 'digital-products', title: 'Digital Products', route: '/features/digital-products' },
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'deposits', title: 'Deposits', route: '/features/deposits' },
      ]}
    />
  );
}
