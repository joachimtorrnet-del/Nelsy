import { Calendar, CalendarCheck, CreditCard, FileDown, Gem, GraduationCap, Layers, Link2, Mail, MessageCircle, MessagesSquare, TrendingDown, Video, Wallet } from 'lucide-react';
import UseCaseLanding from './UseCaseLanding';
import { PLANS, TRIAL_DAYS } from '@/lib/plans';

const START = { label: 'Start with bookings', to: '/onboarding?plan=independent_monthly' };
const WAITLIST = { label: 'Join the Creator waitlist', to: 'mailto:hello@getnelsy.com?subject=Creator%20waitlist' };
const ind = PLANS.independent;
const cre = PLANS.creator;

export default function BeautyCreators() {
  return (
    <UseCaseLanding
      path="/use-cases/beauty-creators"
      crumb="Nail creators"
      seo={{
        title: 'Nail Tech Creators: Get Booked From Your Content | Nelsy',
        description: 'For nail techs who create content: turn followers into bookings with deposits from your link in bio today. Gel-X guides, nail courses: Creator plan waitlist.',
      }}
      hero={{
        eyebrow: 'For nail techs who create content',
        title: 'Your nail content gets saves. Turn them into bookings.',
        sub: 'You post the sets, people ask how to book. Nelsy turns your link in bio into a booking page with deposits, available today. Selling a Gel-X guide, a nail course or 1:1 coaching comes next with the Creator plan.',
        checks: [
          'Bookings and deposits from your bio, available today',
          'Made for nail techs who also teach and post',
          'Creator plan for guides, courses and coaching: waitlist open',
        ],
        primary: START,
        secondary: WAITLIST,
        note: `Independent plan: ${TRIAL_DAYS}-day free trial · $0 today · Cancel anytime`,
        photo: { id: '1769687209448-025548dfca8b', alt: 'Soft pink almond nails with gold studs holding a sprig of eucalyptus' },
        photoLabel: 'Example',
        chips: [
          { icon: CalendarCheck, title: 'New booking', text: 'Chrome extensions · Thu 6 pm', tint: '#FDE8F3', color: '#F52B8C' },
          { icon: CreditCard, title: 'Deposit received', text: '$25 for Chrome extensions', tint: '#DDF5E8', color: '#16A34A' },
          { icon: Link2, title: 'Link in bio', text: 'getnelsy.com/noirnailclub', tint: '#EDE7FE', color: '#7C3AED' },
        ],
      }}
      pains={{
        title: 'Your nail content works. Your booking flow does not.',
        sub: 'Your sets get saved, shared and copied. The attention is there, but the bookings leak out of the DMs and the know-how you could teach stays in your head.',
        photo: { id: '1522337660859-02fbefca4702', alt: 'Hands applying pink glitter polish over a white marble table' },
        items: [
          {
            icon: MessageCircle,
            pain: 'Followers ask how to book, then disappear',
            painText: '"Price?" "Do you do this design?" Comments and DMs pile up under every post. By the time you reply, the moment has passed.',
            fix: 'One link from post to booked',
            fixText: 'Your bio link opens your services, prices and open times. A follower books and pays a deposit while they are still excited about your post.',
            link: { label: 'Link in bio on Nelsy', to: '/features/link-in-bio' },
          },
          {
            icon: TrendingDown,
            pain: 'Views do not pay the rent',
            painText: 'Likes are not income and brand deals come and go. Your most reliable money is still clients at your nail desk.',
            fix: 'Turn attention into appointments',
            fixText: 'Put your services front and center with photos and prices, take a deposit at booking, and keep every client in one list so they rebook.',
            link: { label: 'Deposits on Nelsy', to: '/features/deposits' },
          },
          {
            icon: Layers,
            pain: 'Too many tools for one small business',
            painText: 'A link page here, a booking app there, a store somewhere else, each with its own login and its own fee.',
            fix: 'Start with one page that grows with you',
            fixText: 'Today your Nelsy page handles bookings, deposits and payments. The Creator plan is built to add your Gel-X guide, nail courses, coaching and memberships to the same page: join the waitlist to hear when it opens.',
            link: { label: 'What the Creator plan adds', to: '/features/digital-products' },
          },
        ],
      }}
      steps={{
        title: 'From follower to client in three steps',
        sub: 'Start with what already sells, your time at the nail desk, and add guides and courses when the Creator plan opens.',
        items: [
          { title: 'Add what sells today', text: 'Add the services followers already ask about: the sets from your posts, nail art, in-person training days for new techs. Choose a deposit or full payment for each.' },
          { title: 'Put it in your bio', text: 'Swap your link page for your Nelsy link and end every post, story and caption with one call to action: link in bio to book.' },
          { title: 'Join the Creator waitlist', text: 'Tell us what you want to sell next, a Gel-X guide, a nail course or coaching, and we will email you when the Creator plan opens.' },
        ],
        cta: START,
      }}
      features={{
        title: 'What you get today, and what comes next',
        sub: 'Each card says when it is available. Bookings, deposits and your link in bio work today on the Independent plan.',
        items: [
          { icon: Link2, title: 'Link in bio', text: 'One branded page with your services, photos and socials for your Instagram and TikTok bio.', to: '/features/link-in-bio', availability: 'today' },
          { icon: Calendar, title: 'Online booking', text: 'Followers book a service and a time 24/7, with an email reminder 24 hours before the appointment.', to: '/features/bookings', availability: 'today' },
          { icon: Wallet, title: 'Deposits', text: 'Collect a deposit at booking so the people who book from a post actually show up.', to: '/features/deposits', availability: 'today' },
          { icon: FileDown, title: 'Digital products', text: 'A Gel-X application guide, a price list template, aftercare cards, sold from the same page.', to: '/features/digital-products', availability: 'creator' },
          { icon: GraduationCap, title: 'Courses', text: 'Teach your technique online: a builder gel class, a nail art course, a beginner nail tech program.', to: '/features/courses', availability: 'creator' },
          { icon: Video, title: 'Coaching', text: 'Paid 1:1 nail coaching can be booked as a service today. Dedicated coaching tools come with the Creator plan.', to: '/features/coaching', availability: 'creator' },
          { icon: Gem, title: 'Memberships', text: 'A monthly club with nail art tutorials, tips and perks for your most loyal followers.', to: '/features/memberships', availability: 'creator' },
          { icon: MessagesSquare, title: 'Instagram AutoDM', text: 'Auto-reply to comments with your booking or product link.', to: '/features/instagram-autodm', availability: 'creator' },
          { icon: Mail, title: 'Email and newsletters', text: 'Email your audience about new drops, classes and open slots.', to: '/features/email-newsletters', availability: 'creator' },
        ],
      }}
      tools={{
        title: 'Free tools for nail creators',
        items: [
          { title: 'Creator rate calculator', text: 'Estimate what to charge for brand content and UGC.', to: '/tools/creator-rate-calculator' },
          { title: 'Instagram engagement calculator', text: 'Check the engagement rate of any account.', to: '/tools/instagram-engagement-calculator' },
          { title: 'Deposit calculator', text: 'Find the right deposit for each service.', to: '/tools/deposit-calculator' },
        ],
      }}
      showcase={{
        title: 'A page your followers can book from',
        sub: 'A real Nelsy page, shown with example nail personas. Pick one to switch.',
        templates: ['noir', 'classic', 'split'],
        points: [
          'Your services and prices one tap from your bio',
          'The deposit shown before followers confirm',
          'Instagram and TikTok linked from your page',
        ],
      }}
      compare={{
        title: 'What works today, and what the Creator plan adds',
        sub: 'No guesswork: the left column is on sale now, the right column is the upcoming Creator plan.',
        todayLabel: 'Today (Independent)',
        nextLabel: 'Creator plan (waitlist)',
        rows: [
          { label: 'Booking page in your link in bio', today: true, next: true },
          { label: 'Deposits and online payments', today: true, next: true },
          { label: 'Email reminder 24 hours before each appointment', today: true, next: true },
          { label: 'Paid 1:1 sessions as a bookable service', today: true, next: true },
          { label: 'Digital products (guides, templates)', today: false, next: true },
          { label: 'Online courses', today: false, next: true },
          { label: 'Memberships', today: false, next: true },
          { label: 'Email marketing and Instagram AutoDM', today: false, next: true },
          { label: 'Affiliate program for your products', today: false, next: true },
          { label: 'Price', today: `$${ind.monthly}/mo or $${ind.yearly}/mo yearly`, next: `$${cre.monthly}/mo or $${cre.yearly}/mo yearly` },
        ],
      }}
      pricing={{
        title: 'Start with bookings today',
        sub: 'The Independent plan is open now. The Creator plan has a waitlist: we will email you when it opens.',
        upcoming: {
          name: 'Creator plan',
          price: `$${cre.monthly}/month, or $${cre.yearly}/month billed yearly`,
          priceNote: 'Not on sale yet. Join the waitlist and we will email you when it opens.',
          points: cre.highlights,
          cta: WAITLIST,
        },
        pickerTitle: 'Independent plan, available today',
      }}
      articles={{
        title: 'Guides for nail creators',
        audience: 'creators',
        slugs: ['how-to-sell-a-nail-course-online', 'digital-product-ideas-for-beauty-creators', 'how-to-add-in-person-bookings-creator-business'],
      }}
      faq={[
        { q: 'Can I sell a Gel-X guide or a nail course on Nelsy today?', a: 'Not yet. Today, on the Independent plan, you can take bookings, deposits and payments for your services and paid sessions. Digital products such as guides, online courses, memberships and dedicated coaching tools are part of the upcoming Creator plan.' },
        { q: 'What can a nail creator get booked for on Nelsy today?', a: 'Client services such as full sets, fills and nail art, in-person training days for new techs and paid 1:1 coaching sessions. Each one gets a price, a duration and, if you want, a deposit or full payment at booking.' },
        { q: 'How do I join the Creator waitlist?', a: 'Email hello@getnelsy.com with the subject "Creator waitlist", or use the waitlist button on this page. We will email you when the Creator plan opens.' },
        { q: 'Do I need a big following to start?', a: 'No. Bookings sell on trust and on the quality of your work. A small local audience that loves your sets is enough to fill a calendar.' },
        { q: 'Can I keep my current link-in-bio tool?', a: 'Yes. Your Nelsy page has its own link (getnelsy.com/yourname), so you can add it to the link page you already use, or make it your only link in bio.' },
        { q: 'Does Nelsy take a commission?', a: 'No. Nelsy charges 0% commission on bookings. You pay your plan, and standard payment processing fees apply to online payments.' },
      ]}
      final={{
        title: 'Start with bookings. Grow into the Creator plan.',
        sub: 'Get booked from your bio today, and be first to know when selling nail guides, courses and coaching opens.',
        primary: START,
        secondary: WAITLIST,
        note: `Independent plan: ${TRIAL_DAYS}-day free trial · $0 today · Cancel anytime`,
      }}
    />
  );
}
