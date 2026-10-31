import { Mail } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function EmailNewslettersPage() {
  return (
    <FeaturePage
      title="Build and Message Your Beauty Audience | Nelsy"
      metaDescription="Collect email addresses and message your clients directly. Send promotions, seasonal offers, and rebooking nudges without relying on Instagram's algorithm."
      canonical="/features/email-newsletters"
      h1="Build and message your beauty audience"
      heroDescription="Instagram can limit your reach on any given day. Email does not. Build your client list and send messages that land directly in their inbox — no algorithm in the way."
      icon={Mail}
      benefits={[
        {
          title: 'Reach clients directly',
          desc: 'Email bypasses social media algorithms. When you send a message, it goes to every subscriber — not just whoever the algorithm decides to show it to.',
        },
        {
          title: 'Fill your appointment book',
          desc: 'Send seasonal promotions, last-minute availability alerts, or rebooking reminders and watch clients respond.',
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
          desc: 'Use your Nelsy booking flow, link in bio, or audience capture tools to build your list. Every new client can be added automatically.',
        },
        {
          step: '2',
          title: 'Write your message',
          desc: "Create an email using simple formatting — no design skills needed. Add your offer, your personality, and a clear call to action.",
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
          q: 'How do I grow my email list?',
          a: 'Your Nelsy booking flow captures client emails automatically. You can also add a signup prompt to your link in bio page.',
        },
        {
          q: 'Can I segment my list?',
          a: 'Yes. You can send to all subscribers or target specific groups, like clients who have not booked in three months.',
        },
        {
          q: 'What kind of emails work well for beauty businesses?',
          a: 'Rebooking reminders, seasonal offers, new service announcements, and availability alerts tend to perform well. Short and personal beats long and polished.',
        },
        {
          q: 'Does Nelsy handle unsubscribes?',
          a: 'Yes. Every email includes an unsubscribe link and Nelsy handles opt-outs automatically.',
        },
      ]}
      relatedFeatures={[
        { slug: 'audience-capture', title: 'Audience Capture', route: '/features/audience-capture' },
        { slug: 'crm', title: 'CRM & Clients', route: '/features/crm' },
      ]}
    />
  );
}
