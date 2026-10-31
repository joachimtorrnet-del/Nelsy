import { MessageCircle } from 'lucide-react';
import FeaturePage from './FeaturePage';

export default function InstagramAutoDMPage() {
  return (
    <FeaturePage
      title="Turn Instagram Comments into Bookings | Nelsy"
      metaDescription="Automatically reply to Instagram comments and DMs with your booking link. Convert engagement into confirmed appointments without spending all day in your inbox."
      canonical="/features/instagram-autodm"
      h1="Turn Instagram comments into bookings"
      heroDescription="You post a nail set, the comments come in, and then you spend the next hour answering the same question in DMs. Instagram AutoDM handles the replies so you can stay behind the desk, not behind the phone."
      icon={MessageCircle}
      benefits={[
        {
          title: 'Respond instantly, every time',
          desc: 'When someone comments on your posts, they get your booking link immediately — not hours later when you find the time to reply.',
        },
        {
          title: 'Stop losing warm leads',
          desc: "Every comment asking about your work is a potential client. Without a fast reply, they move on. AutoDM catches them before they do.",
        },
        {
          title: 'Consistent, professional replies',
          desc: 'Your automated response is always polished and on-brand. No typos, no missed messages, no tone inconsistencies.',
        },
        {
          title: 'Free up your time',
          desc: 'Managing DMs is a job in itself. AutoDM handles the repetitive parts so you can focus on doing the actual work.',
        },
      ]}
      steps={[
        {
          step: '1',
          title: 'Set your trigger words',
          desc: 'Choose keywords — like "book", "price", or "info" — that trigger the automated reply when someone uses them in a comment.',
        },
        {
          step: '2',
          title: 'Write your auto-reply',
          desc: 'Craft a short, friendly message with your booking link. It sends automatically every time someone triggers it.',
        },
        {
          step: '3',
          title: 'Watch bookings come in',
          desc: 'Followers who engage with your posts get your booking link instantly. Many will go straight to booking.',
        },
      ]}
      useCases={[
        'Nail techs whose posts regularly get comments asking about bookings or pricing',
        'Beauty creators with growing followings who cannot keep up with DMs manually',
        'Lash artists who run promotions and get flooded with enquiries',
        'Anyone who wants to convert Instagram engagement into real appointments',
        'Beauty professionals who want to look responsive without being glued to their phone',
      ]}
      faq={[
        {
          q: 'Does this work with Instagram Reels and Stories too?',
          a: 'AutoDM is designed to respond to comments on your posts. Story interactions work differently given Instagram restrictions.',
        },
        {
          q: 'Will my followers know the reply is automated?',
          a: 'You write the message, so it can sound exactly like you. Most automated replies feel natural if they are written in your voice.',
        },
        {
          q: 'Can I reply with more than just a booking link?',
          a: 'Yes. You can include pricing info, a brief description of your services, or anything else that helps move the conversation forward.',
        },
        {
          q: "What if someone comments on an old post?",
          a: 'AutoDM responds based on the trigger word, regardless of when the post was published. Your older content can still generate new bookings.',
        },
      ]}
      relatedFeatures={[
        { slug: 'link-in-bio', title: 'Link in Bio', route: '/features/link-in-bio' },
        { slug: 'audience-capture', title: 'Audience Capture', route: '/features/audience-capture' },
        { slug: 'email', title: 'Email & Newsletters', route: '/features/email-newsletters' },
      ]}
    />
  );
}
