import { Link2 } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function LinkInBioPage() {
  return (
    <FeaturePage
      title="Link in Bio for Beauty Professionals | Nelsy"
      metaDescription="One link in your Instagram bio that shows your services, takes bookings, and represents your whole beauty business. Built for nail techs, lash artists, and beauty pros."
      canonical="/features/link-in-bio"
      h1="One link. Your entire beauty business."
      heroDescription="Your Instagram bio has one link. Make it count. Your Nelsy page puts your booking, services, and brand all in one place — ready for every new follower who lands on your profile."
      icon={Link2}
      benefits={[
        {
          title: 'Everything a client needs in one place',
          desc: "Services, pricing, availability, and a booking button — all on one page clients reach with a single tap from your Instagram bio.",
        },
        {
          title: 'Converts followers into clients',
          desc: 'Someone who discovers your nail work on Instagram can become a booked client in under two minutes. No DMs, no friction.',
        },
        {
          title: 'Looks professional from day one',
          desc: 'Your Nelsy page is clean, branded, and mobile-friendly. It works as hard as your actual work does.',
        },
        {
          title: 'Always up to date',
          desc: 'When you update your services, prices, or availability, your page updates instantly. No rebuilding a website every time.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Build your page',
          desc: 'Add your services, photos, and a bit about you. Your Nelsy page becomes the online home for your beauty business.',
        },
        {
          step: '2',
          title: 'Put your link in your bio',
          desc: "Copy your Nelsy link and paste it into your Instagram bio. That one link does everything — it's all clients need.",
        },
        {
          step: '3',
          title: 'Turn views into bookings',
          desc: 'Every time someone taps your link, they land on a page designed to convert. Services are clear, booking is easy.',
        },
      ]}
      useCases={[
        'Nail techs who get enquiries through Instagram and want a cleaner conversion path',
        'Lash and brow artists whose Instagram is their main marketing channel',
        'Beauty pros who have been using third-party link tools that are not built for bookings',
        'Anyone who wants a branded page without paying for a full website',
        'Beauty professionals who want one place to send clients, not a patchwork of links',
      ]}
      faq={[
        {
          q: "Do I need a website if I have a Nelsy link in bio page?",
          a: "For many beauty professionals, a Nelsy page covers everything a website would do — and it is built for bookings. You may not need anything else.",
        },
        {
          q: 'Can I customise the look of my page?',
          a: 'Yes. You can add your photos, set your brand colours, and write your own descriptions so the page feels like yours.',
        },
        {
          q: 'Does the page work on mobile?',
          a: "Yes. It's built for mobile first, which is where most of your Instagram audience will land.",
        },
        {
          q: 'Can I add more than one type of service?',
          a: 'Yes. Add as many services as you offer, each with its own price, duration, and description.',
        },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'instagram-autodm', title: 'Instagram AutoDM', route: '/features/instagram-autodm' },
        { slug: 'audience-capture', title: 'Audience Capture', route: '/features/audience-capture' },
      ]}
    />
  );
}
