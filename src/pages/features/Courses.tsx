import { GraduationCap } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function CoursesPage() {
  return (
    <FeaturePage
      upcomingPlan="Creator"
      title='Sell Beauty Courses from Your Link in Bio: Creator Plan'
      metaDescription='Selling beauty courses and workshops from your Nelsy page is part of the upcoming Creator plan. Join the waitlist, and start with bookings and deposits today.'
      canonical='/features/courses'
      h1='Sell your beauty courses from your link in bio'
      heroDescription='Course selling is part of the upcoming Nelsy Creator plan: a gel-x class, a lash mapping masterclass or a bridal makeup workshop, sold from the same page your clients use to book you. Join the waitlist to hear when it opens.'
      icon={GraduationCap}
      benefits={[
        { title: 'Turn your skills into income', desc: 'Other techs already ask how you do your work. A course lets you answer once and get paid every time someone enrolls.' },
        { title: 'One page for clients and students', desc: 'With the Creator plan, your services and your courses will sit side by side on your Nelsy page.' },
        { title: 'In-person training today', desc: 'You can already list in-person training days as bookable services with a deposit or full payment, on the Independent plan.' },
        { title: '0% Nelsy commission', desc: 'Nelsy takes no commission on your bookings today. Standard payment processing fees apply.' },
      ]}
      steps={[
        { step: '1', title: 'Create your course', desc: 'Add a title, a description, a cover and your price.' },
        { step: '2', title: 'Add it to your page', desc: 'Your course appears next to your services on your link in bio.' },
        { step: '3', title: 'Share and sell', desc: 'Post about it on Instagram and TikTok and send people to your Nelsy link.' },
      ]}
      useCases={[
        'Nail techs teaching a single technique (gel-x, builder gel, chrome)',
        'Lash artists selling a mapping or retention masterclass',
        'Makeup artists running bridal or self-makeup workshops',
        'Educators who want their courses and bookings in one place',
      ]}
      faq={[
        { q: 'Can I sell a course on Nelsy today?', a: 'Not yet. Course selling is part of the upcoming Creator plan. Today, on the Independent plan, you can take bookings, deposits and payments, including for in-person training days. Join the waitlist at hello@getnelsy.com to hear when the Creator plan opens.' },
        { q: 'Can I sell a course without a big following?', a: 'Yes. A small audience of techs who trust your work is often enough for a first course on a specific technique.' },
        { q: 'How should I price my course?', a: 'Price on the result and the support you include, not on the number of minutes. See our guide on how to price a digital product or course.' },
      ]}
      relatedFeatures={[
        { slug: 'bookings', title: 'Bookings', route: '/features/bookings' },
        { slug: 'digital-products', title: 'Digital Products', route: '/features/digital-products' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
      ]}
    />
  );
}
