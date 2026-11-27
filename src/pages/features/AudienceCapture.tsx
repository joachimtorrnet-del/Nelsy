import { UserPlus } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function AudienceCapturePage() {
  return (
    <FeaturePage
      upcomingPlan="Creator"
      title="Audience Capture for Beauty Pros: Nelsy Creator Plan"
      metaDescription="Audience Capture, which turns followers and page visitors into a contact list you own, is part of the upcoming Nelsy Creator plan. Join the waitlist."
      canonical="/features/audience-capture"
      h1="Own your audience beyond social media"
      heroDescription="Social media followers are rented. An email list is yours. Audience Capture, part of the upcoming Nelsy Creator plan, will turn page visits and bookings into contacts you can reach again."
      icon={UserPlus}
      benefits={[
        {
          title: 'Build a list you own',
          desc: 'Instagram could restrict your account tomorrow. Your email list cannot be taken away. Every subscriber is an asset that belongs to you.',
        },
        {
          title: 'Capture leads before they leave',
          desc: 'Someone who visits your page but does not book yet is still valuable. Capture their email and stay in touch until the timing is right.',
        },
        {
          title: 'Turn casual interest into real clients',
          desc: 'Plenty of people who discover your work are not ready to book that day. Audience Capture will keep you in the conversation.',
        },
        {
          title: 'Feed your email and SMS channels',
          desc: 'Every email or number you capture will go into your Nelsy contact list, ready for your next newsletter or promotion.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Add a capture form to your page',
          desc: 'Place a simple signup on your Nelsy link in bio page or your booking flow. Offer something useful in exchange: an availability alert, a first booking offer.',
        },
        {
          step: '2',
          title: 'Contacts land in your list',
          desc: "Every submission goes directly into Nelsy. You can see who signed up, when they found you, and whether they have booked.",
        },
        {
          step: '3',
          title: 'Reach them when you are ready',
          desc: 'Send your next promotion, availability update, or seasonal offer directly to the people who have already shown interest.',
        },
      ]}
      useCases={[
        'Nail techs who get lots of profile visits but not enough bookings',
        'Beauty pros who want to reduce reliance on Instagram for all their client acquisition',
        'Anyone running a waitlist and wanting to notify people when slots open',
        'Beauty professionals building toward a launch: new studio, new service line, new prices',
        'Lash and brow artists who want to retarget warm leads from past campaigns',
      ]}
      faq={[
        {
          q: 'Is Audience Capture available on Nelsy today?',
          a: 'Not yet. It is part of the upcoming Creator plan. Today, on the Independent plan, Nelsy handles bookings, deposits and payments from your link in bio. Join the waitlist at hello@getnelsy.com.',
        },
        {
          q: 'What information do I collect?',
          a: 'Typically a name and email address. You can also capture phone numbers if you plan to use SMS. Keep it short to maximise signups.',
        },
        {
          q: 'Does this work with my Instagram AutoDM?',
          a: 'That is the plan: AutoDM sends people to your link in bio, where a capture form collects their email. Both are part of the upcoming Creator plan.',
        },
        {
          q: 'How do I encourage people to sign up?',
          a: "Offer something relevant: early access to your booking calendar, a note when cancellations open up, or a first-appointment offer. Something that has real value for your audience.",
        },
        {
          q: 'Where do captured contacts go?',
          a: 'They will go into your Nelsy contact list, ready for email campaigns and rebooking messages.',
        },
      ]}
      relatedFeatures={[
        { slug: 'email', title: 'Email & Newsletters', route: '/features/email-newsletters' },
        { slug: 'instagram-autodm', title: 'Instagram AutoDM', route: '/features/instagram-autodm' },
        { slug: 'link-in-bio', title: 'Link in Bio', route: '/features/link-in-bio' },
      ]}
    />
  );
}
