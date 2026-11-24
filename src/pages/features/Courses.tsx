import { GraduationCap } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function CoursesPage() {
  return (
    <FeaturePage
      title='Sell Online Courses from Your Link in Bio'
      metaDescription='Sell your beauty courses and workshops from your Nelsy page. Clients pay by card, Apple Pay or Google Pay, and you keep your revenue with 0% Nelsy commission.'
      canonical='/features/courses'
      h1='Sell your beauty courses from your link in bio'
      heroDescription='Teach what you know: a gel-x class, a lash mapping masterclass, a bridal makeup workshop. Sell it from the same page your clients use to book you.'
      icon={GraduationCap}
      benefits={[
        { title: 'Turn your skills into income', desc: 'Other techs already ask how you do your work. A course lets you answer once and get paid every time someone enrolls.' },
        { title: 'One page for clients and students', desc: 'Your services and your courses live side by side on your Nelsy page, so every follower sees your full offer.' },
        { title: 'Simple checkout', desc: 'Students pay by card, Apple Pay or Google Pay in a few taps, without creating an account elsewhere.' },
        { title: 'Keep what you earn', desc: 'Nelsy takes 0% commission on your sales. Standard payment processing fees apply.' },
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
        { q: 'Can I sell a course without a big following?', a: 'Yes. A small audience of techs who trust your work is often enough for a first course on a specific technique.' },
        { q: 'Does Nelsy take a cut of my course sales?', a: 'No. Nelsy charges 0% commission. Standard payment processing fees apply to online payments.' },
        { q: 'How should I price my course?', a: 'Price on the result and the support you include, not on the number of minutes. See our guide on how to sell a nail course online.' },
      ]}
      relatedFeatures={[
        { slug: 'digital-products', title: 'Digital Products', route: '/features/digital-products' },
        { slug: 'coaching', title: 'Coaching', route: '/features/coaching' },
        { slug: 'payments', title: 'Payments', route: '/features/payments' },
      ]}
    />
  );
}
