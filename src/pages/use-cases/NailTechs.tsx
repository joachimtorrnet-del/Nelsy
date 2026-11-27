import { BarChart3, Bell, Calendar, CalendarCheck, CalendarX, CreditCard, Link2, MessageCircle, UsersRound, Wallet } from 'lucide-react';
import UseCaseLanding from './UseCaseLanding';
import { PLANS, TRIAL_DAYS } from '@/lib/plans';

const START = { label: 'Start free trial', to: '/onboarding?plan=independent_monthly' };
const EXAMPLE = { label: 'See an example page', to: '/demo' };
const ind = PLANS.independent;

export default function NailTechs() {
  return (
    <UseCaseLanding
      path="/use-cases/nail-techs"
      crumb="Nail techs"
      seo={{
        title: 'Nail Tech Booking App: Deposits, Reminders, Link in Bio',
        description: `Booking app for independent nail techs: clients book from your link in bio, pay a deposit and get automatic reminders. 0% commission, ${TRIAL_DAYS}-day free trial.`,
      }}
      hero={{
        eyebrow: 'For independent nail techs',
        title: <>Get booked, get paid, and stop chasing <span className="whitespace-nowrap">no-shows.</span></>,
        sub: 'One booking page for your link in bio, with deposits, online payments and automatic reminders. Made for nail techs working from home, a suite, a salon chair or on the road.',
        checks: [
          'Clients book 24/7 from your Instagram or TikTok bio',
          'Pay on arrival, a deposit or full payment, per service',
          '0% Nelsy commission on your bookings',
        ],
        primary: START,
        secondary: EXAMPLE,
        note: `${TRIAL_DAYS}-day free trial · $0 today · Cancel anytime`,
        photo: { id: '1737214475292-949c0bf920b0', alt: 'Nail tech in black gloves painting fine nail art on a client\'s nail' },
        photoLabel: 'Example',
        chips: [
          { icon: CalendarCheck, title: 'New booking', text: 'Signature set · Sat 10:30', tint: '#FDE8F3', color: '#F52B8C' },
          { icon: CreditCard, title: 'Deposit received', text: '$15 for Signature set', tint: '#DDF5E8', color: '#16A34A' },
          { icon: Bell, title: 'Reminder sent', text: 'Appointment tomorrow', tint: '#EDE7FE', color: '#7C3AED' },
        ],
      }}
      audienceLinks={{
        title: 'Wherever you do nails:',
        links: [
          { label: 'Home studio', to: '/blog/best-booking-apps-home-based-nail-techs' },
          { label: 'Mobile nail tech', to: '/blog/best-booking-apps-mobile-nail-techs' },
          { label: 'Salon suite', to: '/blog/home-based-nail-tech-vs-salon-suite' },
          { label: 'Just starting out', to: '/blog/best-booking-apps-beginner-nail-techs' },
          { label: 'Other beauty pros', to: '/use-cases/independent-beauty-pros' },
        ],
      }}
      pains={{
        title: 'The three things that drain a nail business',
        sub: 'You are the nail artist, the receptionist and the accountant. Nelsy takes the admin off your plate so your chair stays full.',
        photo: { id: '1632345031435-8727f6897d53', alt: 'Nail tech painting a client\'s nails next to a UV lamp' },
        items: [
          {
            icon: MessageCircle,
            pain: 'Bookings stuck in your DMs',
            painText: '"How much for a Gel-X full set?" "Are you free Saturday?" You answer between clients, and people who wait too long for a reply book someone else.',
            fix: 'A booking page that answers for you',
            fixText: 'Clients see your sets, add-ons, prices and real open times, pick a slot and confirm without messaging you. You get the booking, they get a confirmation.',
            link: { label: 'How online booking works', to: '/features/bookings' },
          },
          {
            icon: CalendarX,
            pain: 'No-shows on two-hour sets',
            painText: 'An empty slot for a full set or nail art is income you cannot sell twice, and asking for a deposit by bank transfer feels awkward every time.',
            fix: 'Deposits taken at booking',
            fixText: 'Set a deposit per service, a fixed amount or a percentage, or ask for full payment upfront. The slot is confirmed once it is paid, and an automatic reminder goes out before the appointment.',
            link: { label: 'Deposits on Nelsy', to: '/features/deposits' },
          },
          {
            icon: Wallet,
            pain: 'Payments and clients all over the place',
            painText: 'Cash, card readers, payment apps and notes on your phone: at the end of the month it is hard to know who paid what, or who is due for a fill.',
            fix: 'Payments and clients in one dashboard',
            fixText: 'Card payments go through Stripe to your own bank account, and you can mark cash payments by hand. Every client and visit sits in one list.',
            link: { label: 'Payments on Nelsy', to: '/features/payments' },
          },
        ],
      }}
      steps={{
        title: 'Set up in an afternoon',
        sub: 'No website, no code. If you can post your sets on Instagram, you can set up Nelsy.',
        items: [
          { title: 'Add your services', text: 'Pick a template, add your sets, fills and add-ons with prices, durations and photos, and choose pay on arrival, a deposit or full payment for each one.' },
          { title: 'Set your hours', text: 'Add your working hours, days off and buffer time between appointments. Clients only see the times you can actually take.' },
          { title: 'Share your link', text: 'Put your Nelsy link in your Instagram and TikTok bio, stories and DMs. Bookings, deposits and reminders run on their own.' },
        ],
        cta: START,
      }}
      features={{
        title: 'Everything you need to run your books',
        sub: 'All of this is included in the Independent plan today.',
        items: [
          { icon: Calendar, title: 'Online booking', text: 'Clients pick a service and a time 24/7, with no app or account to create. Automatic reminders before each visit.', to: '/features/bookings', availability: 'today' },
          { icon: Wallet, title: 'Deposits', text: 'A fixed or percentage deposit per service, collected at booking, so every slot is a real commitment.', to: '/features/deposits', availability: 'today' },
          { icon: CreditCard, title: 'Payments', text: 'Pay on arrival, a deposit or full payment upfront by card, paid out to your own account.', to: '/features/payments', availability: 'today' },
          { icon: Link2, title: 'Link in bio', text: 'One branded page with your sets, photos and socials, ready for your Instagram and TikTok bio.', to: '/features/link-in-bio', availability: 'today' },
          { icon: UsersRound, title: 'Client list', text: 'Every client who books lands in your list, with their visits, so rebooking regulars for fills is easy.', to: '/features/crm', availability: 'today' },
          { icon: BarChart3, title: 'Analytics', text: 'See your bookings and revenue over time, and where your clients come from.', to: '/features/analytics', availability: 'today' },
        ],
      }}
      tools={{
        title: 'Free tools for nail techs',
        items: [
          { title: 'Nail tech pricing calculator', text: 'Price each set and add-on for profit, not guesswork.', to: '/tools/nail-tech-pricing-calculator' },
          { title: 'Deposit calculator', text: 'Find the right deposit for each service.', to: '/tools/deposit-calculator' },
          { title: 'No-show cost calculator', text: 'See what missed appointments cost you each year.', to: '/tools/no-show-cost-calculator' },
          { title: 'Cancellation policy generator', text: 'Write a clear policy in a couple of minutes.', to: '/tools/nail-tech-cancellation-policy-generator' },
          { title: 'Appointment reminder templates', text: 'Copy-paste reminders for every booking.', to: '/tools/nail-tech-appointment-reminder-templates' },
          { title: 'Booking app fee calculator', text: 'Compare what booking apps really cost per month.', to: '/tools/booking-app-fee-calculator' },
        ],
      }}
      showcase={{
        title: 'See what your clients will see',
        sub: 'A real Nelsy page, shown with example nail personas. Pick one to switch.',
        templates: ['classic', 'noir', 'split'],
        points: [
          'Your sets with photos, prices and duration',
          'The deposit shown before clients confirm',
          'Your Instagram and TikTok one tap away',
        ],
      }}
      pricing={{
        title: 'One plan with everything to get booked',
        sub: `Independent: $${ind.monthly}/month, or $${ind.yearly}/month billed yearly, with a ${TRIAL_DAYS}-day free trial. 0% Nelsy commission; standard payment processing fees apply to online payments.`,
        pickerTitle: 'Start your free trial',
      }}
      articles={{
        title: 'Guides for nail techs',
        audience: 'pros',
        slugs: ['how-to-move-from-instagram-dms-to-online-booking', 'nail-tech-deposit-policy', 'how-to-get-booked-out-as-nail-tech'],
      }}
      faq={[
        { q: 'Is Nelsy made for nail techs?', a: 'Yes. Nelsy is built nail-first: independent nail techs working from home, a suite, a rented chair or on the road. Lash, brow, makeup, hair and skin pros use it too.' },
        { q: 'Do my clients need an app or an account to book?', a: 'No. Clients open your link, pick a service and a time, and confirm. There is nothing to download and no account to create.' },
        { q: 'How do deposits work?', a: 'For each service you choose pay on arrival, a deposit (a fixed amount or a percentage) or full payment upfront. Clients pay by card when they book, and the appointment is confirmed once the deposit is paid. The rest is collected at the appointment.' },
        { q: 'Does Nelsy take a commission on my bookings?', a: 'No. Nelsy charges 0% commission on bookings. You pay your plan, and standard payment processing fees apply to online payments.' },
        { q: 'Can I use Nelsy as my Instagram link in bio?', a: 'Yes. Your Nelsy page has its own link (getnelsy.com/yourname) for your Instagram or TikTok bio, stories and DMs. It shows your services, photos and socials on one page.' },
        { q: 'How does the free trial work?', a: `You get ${TRIAL_DAYS} days free. A card is saved at signup and you pay $0 today. Your plan starts after the trial, and you can cancel anytime before it ends.` },
      ]}
      final={{
        title: 'Your nail chair, fully booked',
        sub: 'Bookings, deposits, payments and reminders from one link in your bio.',
        primary: START,
        secondary: EXAMPLE,
        note: `${TRIAL_DAYS}-day free trial · $0 today · Cancel anytime`,
      }}
    />
  );
}
