import { BarChart3, Calendar, CalendarCheck, CalendarX, CreditCard, Globe, PhoneCall, Shuffle, Users, UsersRound, Wallet } from 'lucide-react';
import UseCaseLanding from './UseCaseLanding';
import { PLANS, TRIAL_DAYS } from '@/lib/plans';

const WAITLIST = { label: 'Join the Salon waitlist', to: 'mailto:hello@getnelsy.com?subject=Salon%20waitlist' };
const SOLO = { label: 'Start as a solo pro', to: '/onboarding?plan=independent_monthly' };
const ind = PLANS.independent;
const sal = PLANS.salon;
const STAFF = sal.includedStaff ?? 5;
const EXTRA = sal.extraStaffMonthly ?? 15;

export default function NailSalons() {
  return (
    <UseCaseLanding
      path="/use-cases/nail-salons"
      crumb="Nail salons"
      seo={{
        title: 'Nail Salon Booking Software for Teams | Nelsy',
        description: `Nail salon software for online booking, deposits and payments. Salon plan: $${sal.monthly}/month with ${STAFF} nail techs included, $${EXTRA} per extra. Join the waitlist.`,
      }}
      hero={{
        eyebrow: 'For nail salon owners',
        title: 'Nail salon booking for your whole team of nail techs.',
        sub: `The Nelsy Salon plan puts your nail techs, services and clients on one booking page, with ${STAFF} team members included. It is not open yet: join the waitlist and we will email you when it opens. Working solo for now? Start today on the Independent plan.`,
        checks: [
          `Salon plan: $${sal.monthly}/month with ${STAFF} team members included`,
          `$${EXTRA}/month for each extra team member`,
          'Today: bookings, deposits and payments for each nail tech',
        ],
        primary: WAITLIST,
        secondary: SOLO,
        note: `Salon plan not on sale yet. Independent plan: ${TRIAL_DAYS}-day free trial, $0 today.`,
        photo: { id: '1693776529070-2cdea397595b', alt: 'Gloved nail tech working on a client\'s nude manicure next to a UV lamp' },
        photoLabel: 'Example',
        chips: [
          { icon: Users, title: 'Choose your nail tech', text: 'Salon plan preview', tint: '#E0EEFB', color: '#1E5A8C' },
          { icon: CalendarCheck, title: 'New booking', text: 'Russian manicure · Fri 2 pm', tint: '#FDE8F3', color: '#F52B8C' },
          { icon: CreditCard, title: 'Deposit received', text: '$15 for Russian manicure', tint: '#DDF5E8', color: '#16A34A' },
        ],
      }}
      pains={{
        title: 'Running a nail salon should not mean running a call center',
        sub: 'Three common problems in a salon, and what Nelsy does for each one today and with the Salon plan.',
        photo: { id: '1599206676335-193c82b13c9e', alt: 'Nail tech applying nude polish to a client\'s nails on a marble table' },
        items: [
          {
            icon: PhoneCall,
            pain: 'The front desk is the phone and the DMs',
            painText: 'Someone has to answer calls and messages all day to book each client with the right nail tech, for the right service length, at the right time.',
            fix: 'Clients book online, around the clock',
            fixText: 'Clients pick a service and a time on a booking page. Today each nail tech runs their own Nelsy page; with the Salon plan, clients book the whole team from one salon page.',
            link: { label: 'How online booking works', to: '/features/bookings' },
          },
          {
            icon: CalendarX,
            pain: 'No-shows cost the whole station',
            painText: 'When a client does not show up for a full set, a nail tech sits idle and the salon still pays for the station, the product and the hour.',
            fix: 'Deposits at booking, reminders before',
            fixText: 'Ask for a deposit or full payment per service, so a slot is confirmed once it is paid. Clients get an automatic reminder before the appointment.',
            link: { label: 'Deposits on Nelsy', to: '/features/deposits' },
          },
          {
            icon: Shuffle,
            pain: 'Every nail tech uses a different system',
            painText: 'One books by DM, another by text, another in a paper diary. Nobody has the full picture of the salon.',
            fix: 'One account for the team',
            fixText: `The Salon plan brings your nail techs, their services and your clients under one account, with ${STAFF} members included and a custom domain. Join the waitlist to hear when it opens.`,
            link: { label: 'Client list on Nelsy', to: '/features/crm' },
          },
        ],
      }}
      steps={{
        title: 'How salons get started',
        sub: 'Join the waitlist for the team plan, and get your bookings online now.',
        items: [
          { title: 'Join the Salon waitlist', text: 'Email us your salon name and team size. We will email you as soon as the Salon plan opens.' },
          { title: 'Get bookings online today', text: 'Start on the Independent plan with your own services, or let each nail tech run their own page, with deposits and reminders from day one.' },
          { title: 'Bring your team together', text: `With the Salon plan, add your nail techs: ${STAFF} members are included, and each extra member is $${EXTRA}/month.` },
        ],
        cta: WAITLIST,
      }}
      features={{
        title: 'Nail salon software, today and next',
        sub: 'Each card says when it is available: today on the Independent plan, or with the upcoming Salon plan.',
        items: [
          { icon: Calendar, title: 'Online booking', text: 'Clients book services 24/7 from your link, with no app or account to create.', to: '/features/bookings', availability: 'today' },
          { icon: Wallet, title: 'Deposits', text: 'A fixed or percentage deposit per service, collected when the client books.', to: '/features/deposits', availability: 'today' },
          { icon: CreditCard, title: 'Payments', text: 'Card payments at booking, or pay on arrival. Mark cash payments by hand.', to: '/features/payments', availability: 'today' },
          { icon: UsersRound, title: 'Client list', text: 'Every client who books lands in one list with their visits.', to: '/features/crm', availability: 'today' },
          { icon: BarChart3, title: 'Analytics', text: 'Bookings and revenue over time, and where clients come from.', to: '/features/analytics', availability: 'today' },
          { icon: Globe, title: 'Team members and custom domain', text: `${STAFF} team members included, $${EXTRA} per extra member, and your salon on your own domain.`, to: '#pricing', availability: 'salon', linkLabel: 'See the Salon plan' },
        ],
      }}
      tools={{
        title: 'Free tools for nail salon owners',
        items: [
          { title: 'No-show cost calculator', text: 'See what missed appointments cost your salon each year.', to: '/tools/no-show-cost-calculator' },
          { title: 'Booking app fee calculator', text: 'Compare what booking software really costs per month.', to: '/tools/booking-app-fee-calculator' },
          { title: 'Cancellation policy generator', text: 'Write a clear cancellation policy for your whole team.', to: '/tools/nail-tech-cancellation-policy-generator' },
        ],
      }}
      showcase={{
        title: 'What each nail tech\'s page looks like today',
        sub: 'Every nail tech on your team can run a page like these today on the Independent plan. With the Salon plan, the team comes together on one salon page.',
        templates: ['split', 'classic', 'noir'],
        points: [
          'Services with photos, prices and duration',
          'Deposits shown before clients confirm',
          'Opening hours and buffer time respected automatically',
        ],
      }}
      compare={{
        title: 'Today vs. with the Salon plan',
        sub: 'The left column is on sale now, one account per nail tech. The right column is the upcoming Salon plan.',
        todayLabel: 'Today (Independent, per tech)',
        nextLabel: 'Salon plan (waitlist)',
        rows: [
          { label: 'Online booking page', today: true, next: 'One page for the team' },
          { label: 'Deposits and online payments', today: true, next: true },
          { label: 'Automatic reminders', today: true, next: true },
          { label: 'Team members on one account', today: false, next: `${STAFF} included, $${EXTRA} per extra` },
          { label: 'Custom domain', today: false, next: true },
          { label: 'Digital products, courses and coaching', today: false, next: true },
          { label: 'Email marketing and Instagram AutoDM', today: false, next: true },
          { label: 'Price', today: `$${ind.monthly}/mo per tech ($${ind.yearly}/mo yearly)`, next: `$${sal.monthly}/mo ($${sal.yearly}/mo yearly)` },
        ],
      }}
      pricing={{
        title: 'Nail salon pricing',
        sub: 'Join the waitlist for the team plan, or start as a solo nail tech today.',
        upcoming: {
          name: 'Salon plan',
          price: `$${sal.monthly}/month, or $${sal.yearly}/month billed yearly`,
          priceNote: `${STAFF} team members included, $${EXTRA}/month per extra member. Not on sale yet: join the waitlist and we will email you when it opens.`,
          points: sal.highlights,
          cta: WAITLIST,
        },
        pickerTitle: 'Start as a solo pro today',
      }}
      articles={{
        title: 'Guides for nail salon owners',
        audience: 'salons',
        slugs: ['best-booking-apps-nail-salons', 'booth-rental-vs-commission-nail-techs', 'independent-nail-tech-vs-nail-salon'],
      }}
      faq={[
        { q: 'Can my whole nail salon team use Nelsy today?', a: 'Not on one account yet. Today each nail tech can run their own Nelsy page on the Independent plan, with bookings, deposits and payments. Team members on one salon account come with the Salon plan, which has a waitlist.' },
        { q: 'How much will the Salon plan cost?', a: `$${sal.monthly}/month, or $${sal.yearly}/month billed yearly, with ${STAFF} team members included. Each extra team member is $${EXTRA}/month.` },
        { q: 'What is included in the Salon plan?', a: 'Everything in the Creator plan (bookings, deposits, payments, reminders, digital products, courses, coaching, memberships, email marketing and Instagram AutoDM), plus team members and a custom domain.' },
        { q: 'How do I join the Salon waitlist?', a: 'Email hello@getnelsy.com with the subject "Salon waitlist", or use the waitlist button on this page. Tell us your salon name and team size, and we will email you when the Salon plan opens.' },
        { q: 'Does Nelsy take a commission on nail salon bookings?', a: 'No. Nelsy charges 0% commission on bookings. You pay your plan, and standard payment processing fees apply to online payments.' },
        { q: 'Do clients need an app to book?', a: 'No. Clients open your link, pick a service and a time, and confirm. There is nothing to download and no account to create.' },
      ]}
      final={{
        title: 'Bring your nail salon to Nelsy',
        sub: 'Join the Salon waitlist, or start as a solo pro today and get booked from your link in bio.',
        primary: WAITLIST,
        secondary: SOLO,
        note: `Independent plan: ${TRIAL_DAYS}-day free trial · $0 today · Cancel anytime`,
      }}
    />
  );
}
