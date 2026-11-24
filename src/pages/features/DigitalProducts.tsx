import { FileDown } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function DigitalProductsPage() {
  return (
    <FeaturePage
      title='Sell Digital Products as a Beauty Creator'
      metaDescription='Sell guides, templates, price lists and presets from your Nelsy page. Clients pay in a few taps and you keep your revenue with 0% Nelsy commission.'
      canonical='/features/digital-products'
      h1='Sell digital products from your link in bio'
      heroDescription='Guides, aftercare cards, price list templates, content calendars, photo presets: create a file once and sell it as many times as you want.'
      icon={FileDown}
      benefits={[
        { title: 'Earn while you are not working', desc: 'A digital product sells at night, on weekends and while you are with a client.' },
        { title: 'Start small', desc: 'A low-price guide is often a creator\'s first online sale, and it shows you what your audience will pay for.' },
        { title: 'Next to your bookings', desc: 'Your products sit on the same page as your services, so clients discover them when they book.' },
        { title: '0% Nelsy commission', desc: 'You keep your revenue. Standard payment processing fees apply.' },
      ]}
      steps={[
        { step: '1', title: 'Upload your file', desc: 'Add your guide, template or preset with a title, a cover and a price.' },
        { step: '2', title: 'Publish it on your page', desc: 'It appears on your link in bio with a buy button.' },
        { step: '3', title: 'Clients buy and get their file', desc: 'Payment is taken online and the client receives their download.' },
      ]}
      useCases={[
        'Nail techs selling price list or consultation templates',
        'Lash and brow artists selling aftercare guides',
        'Creators selling Lightroom presets for nail and beauty photos',
        'Educators selling a step-by-step guide before launching a full course',
      ]}
      faq={[
        { q: 'What can I sell as a digital product?', a: 'Any file you have the rights to: PDF guides, templates, checklists, presets, design packs or content calendars.' },
        { q: 'Does Nelsy take a commission?', a: 'No. Nelsy charges 0% commission on your sales. Standard payment processing fees apply.' },
        { q: 'Do I need a separate shop or website?', a: 'No. Your products live on your Nelsy page, the same link you already share in your bio.' },
      ]}
      relatedFeatures={[
        { slug: 'courses', title: 'Courses', route: '/features/courses' },
        { slug: 'link-in-bio', title: 'Link in Bio', route: '/features/link-in-bio' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
      ]}
    />
  );
}
