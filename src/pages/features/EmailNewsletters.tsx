import { Mail } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function EmailNewslettersPage() {
  return (
    <FeaturePage
      upcomingPlan="Creator"
      title="Email Marketing for Beauty Pros: Nelsy Creator Plan"
      metaDescription="Email marketing is part of the upcoming Nelsy Creator plan: message your clients without relying on Instagram. Join the waitlist; start with bookings today."
      canonical="/features/email-newsletters"
      h1="Build and message your beauty audience"
      heroDescription="Email marketing is part of the upcoming Nelsy Creator plan. Instagram can limit your reach on any given day; email lands directly in your clients' inbox. Join the waitlist to hear when it opens."
      icon={Mail}
      benefits={[
        {
          title: 'Reach clients directly',
          desc: 'Email bypasses social media algorithms. When you send a message, it goes to every subscriber, not just whoever the algorithm decides to show it to.',
        },
        {
          title: 'Fill your appointment book',
          desc: 'Send seasonal promotions, last-minute availability alerts or rebooking nudges to people who already know your work.',
        },
        {
          title: 'Build something you own',
          desc: 'Your email list is yours. If Instagram shuts down or your account gets restricted, your client relationships survive.',
        },
        {
          title: 'Stay top of mind',
          desc: 'Clients who hear from you regularly are more likely to rebook. A short message every few weeks keeps your name in their head.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Collect email addresses',
          desc: 'Use your Nelsy booking flow and link in bio to build your list, with clear consent from each contact.',
        },
        {
          step: '2',
          title: 'Write your message',
          desc: "Create an email using simple formatting: no design skills needed. Add your offer, your personality, and a clear call to action.",
        },
        {
          step: '3',
          title: 'Send and track results',
          desc: 'Send to your full list or a specific segment. See who opened, who clicked, and how many booked.',
        },
      ]}
      useCases={[
        'Nail techs who want to fill quiet weeks with a single message to past clients',
        'Beauty pros running seasonal promotions like Valentine\'s sets or Christmas bookings',
        'Lash and brow artists who want to stay in touch with clients between appointments',
        'Anyone who has been relying entirely on Instagram and wants a more stable channel',
        'Beauty professionals building a loyal, returning client base',
      ]}
      faq={[
        {
          q: 'Can I send email campaigns from Nelsy today?',
          a: 'Not yet. Email marketing is part of the upcoming Creator plan. Today, on the Independent plan, Nelsy handles bookings, deposits, payments and automatic appointment reminders. Join the waitlist at hello@getnelsy.com.',
        },
        {
          q: 'How do I grow my email list in the meantime?',
          a: 'Offer something useful in exchange for an email, such as a checklist or an availability alert, and link it from your bio. See our guide on building an email list as a beauty creator.',
        },
        {
          q: 'What kind of emails work well for beauty businesses?',
          a: 'Rebooking reminders, seasonal offers, new service announcements, and availability alerts tend to perform well. Short and personal beats long and polished.',
        },
      ]}
      relatedFeatures={[
        { slug: 'audience-capture', title: 'Audience Capture', route: '/features/audience-capture' },
        { slug: 'crm', title: 'CRM & Clients', route: '/features/crm' },
      ]}
    />
  );
}
