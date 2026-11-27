import { FileDown } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function DigitalProductsPage() {
  return (
    <FeaturePage
      upcomingPlan="Creator"
      title='Sell Digital Products as a Beauty Creator: Creator Plan'
      metaDescription='Selling guides, templates and presets from your Nelsy page is part of the upcoming Creator plan. Join the waitlist, and start with bookings and deposits today.'
      canonical='/features/digital-products'
      h1='Sell digital products from your link in bio'
      heroDescription='Digital products are part of the upcoming Nelsy Creator plan: guides, aftercare cards, price list templates and photo presets, created once and sold from your link in bio. Join the waitlist to hear when it opens.'
      icon={FileDown}
      benefits={[
        { title: 'Earn while you are not working', desc: 'A digital product sells at night, on weekends and while you are with a client.' },
        { title: 'Start small', desc: 'A low-price guide is often a creator\'s first online sale, and it shows you what your audience will pay for.' },
        { title: 'Next to your bookings', desc: 'With the Creator plan, your products will sit on the same page as your services.' },
        { title: 'Bookings today', desc: 'Services, deposits and payments from your link in bio are available now on the Independent plan, with 0% Nelsy commission.' },
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
        { q: 'Can I sell digital products on Nelsy today?', a: 'Not yet. Digital products are part of the upcoming Creator plan. Today, on the Independent plan, you can take bookings, deposits and payments from your link in bio. Join the waitlist at hello@getnelsy.com to hear when the Creator plan opens.' },
        { q: 'What can I sell as a digital product?', a: 'Any file you have the rights to: PDF guides, templates, checklists, presets, design packs or content calendars. See our list of 35 digital product ideas for beauty creators.' },
        { q: 'Does Nelsy take a commission?', a: 'Nelsy takes 0% commission on bookings on the Independent plan. Standard payment processing fees apply.' },
      ]}
      relatedFeatures={[
        { slug: 'courses', title: 'Courses', route: '/features/courses' },
        { slug: 'link-in-bio', title: 'Link in Bio', route: '/features/link-in-bio' },
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
      ]}
    />
  );
}
