import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircleWarning, Ghost, Hourglass, Smartphone, Sparkles, Wallet, CalendarCheck2 } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
import SeoCTA from '@/components/SeoCTA';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';

const PINK = '#F52B8C';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
} as const);

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Instagram Booking for Nail Techs',
    description: 'Turn your Instagram followers into booked nail appointments. Add your Nelsy booking link to your bio and let clients book, pay and leave deposits without DMs.',
    url: 'https://getnelsy.com/instagram-booking-for-nail-techs',
    isPartOf: { '@type': 'WebSite', url: 'https://getnelsy.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Instagram Booking for Nail Techs', item: 'https://getnelsy.com/instagram-booking-for-nail-techs' },
    ],
  },
];

const PROBLEMS = [
  {
    Icon: MessageCircleWarning,
    title: 'DMs don\'t confirm appointments',
    desc: 'A message saying "I want to book Saturday" isn\'t a booking. It\'s the start of a back-and-forth that often leads nowhere.',
  },
  {
    Icon: Ghost,
    title: 'Followers ghost after agreeing to book',
    desc: 'Without upfront payment or deposit, clients can disappear between "let\'s do it" and the day of the appointment.',
  },
  {
    Icon: Hourglass,
    title: 'Managing DMs eats your time',
    desc: 'Every DM booking is a manual process — confirming availability, sending prices, collecting details. That\'s time not spent doing nails.',
  },
];

const STEPS = [
  {
    Icon: Smartphone,
    title: 'Add your Nelsy link to your Instagram bio',
    desc: 'One link replaces your entire DM booking process. Anyone who visits your profile can book directly — no DMs required.',
  },
  {
    Icon: Sparkles,
    title: 'Followers browse your services and prices',
    desc: 'Your Nelsy booking page shows your full service menu, pricing and available times. Clients know exactly what they\'re booking before they commit.',
  },
  {
    Icon: Wallet,
    title: 'They leave a deposit to confirm',
    desc: 'Clients pay a deposit to lock in their slot. No deposit, no confirmed booking — which means no more no-shows from Instagram followers.',
  },
  {
    Icon: CalendarCheck2,
    title: 'The booking appears in your calendar',
    desc: 'Confirmed, paid, and in your schedule. You didn\'t send a single DM.',
  },
];

export default function InstagramBooking() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Instagram Booking for Nail Techs — Turn Followers into Clients | Nelsy"
        description="Add your Nelsy booking link to your Instagram bio. Followers click, browse your services, leave a deposit and book — without a single DM. Built for nail techs."
        canonical="/instagram-booking-for-nail-techs"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Instagram Booking for Nail Techs' }]} />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}
            >
              INSTAGRAM → PAID APPOINTMENTS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
              style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 16 }}
            >
              Turn Your Instagram Followers<br />
              <span style={{ color: PINK }}>into Booked Nail Appointments.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              Your Instagram is already bringing you clients. Nelsy gives you a booking page you can link from your bio — so followers can browse your services, pick a time and pay a deposit, without you being there.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <SeoCTA label="Create my booking page →" position="hero" />
            </motion.div>
            <p className="mt-4 text-sm text-gray-400">14-day free trial · No credit card required</p>
          </div>
        </section>

        {/* ── The problem ── */}
        <section className="py-14 sm:py-20 bg-white px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Why DMs Are a Broken Booking System
              </h2>
              <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-xl mx-auto">
                Instagram gives you reach. But DMs were never designed for appointment scheduling.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-3">
              {PROBLEMS.map((item, i) => (
                <motion.div
                  key={item.title}
                  {...fadeUp(i * 0.1)}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                >
                  <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <item.Icon size={18} strokeWidth={1.6} className="text-gray-500" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="py-14 sm:py-20 px-4" style={{ background: 'radial-gradient(ellipse 120% 65% at 50% 10%, #FFE4F0 0%, #FFF3F8 45%, #FFFFFF 80%)' }}>
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                From Instagram Follower to Paid Appointment in 4 Steps
              </h2>
            </motion.div>
            <div className="space-y-6">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  {...fadeUp(i * 0.08)}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-100 flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow"
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = PINK; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#F3F4F6'; }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center"
                    style={{ backgroundColor: PINK, boxShadow: '0 4px 12px rgba(245,43,140,0.3)' }}
                  >
                    <step.Icon size={16} strokeWidth={1.6} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── What your booking page includes ── */}
        <section className="py-14 sm:py-20 bg-white px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Your Nelsy Booking Page — Always On, Always Branded
              </h2>
              <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-xl mx-auto">
                Your booking page lives at your own Nelsy URL. Share it anywhere — Instagram bio, TikTok, stories, or direct message.
              </p>
            </motion.div>
            <motion.div {...fadeUp(0.1)} className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Your services and prices', desc: 'Every service, duration and price — visible before a client selects anything.' },
                { title: 'Real-time availability', desc: 'Clients only see slots you\'ve marked open. No double-bookings.' },
                { title: 'Online deposit collection', desc: 'Set a deposit amount. Clients pay it to confirm. No deposit, no booking.' },
                { title: 'Branded to your style', desc: 'Your name, your colors, your booking experience. Not a generic marketplace page.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  {...fadeUp(i * 0.07)}
                  className="rounded-2xl p-5 border border-gray-100 bg-gray-50"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: PINK }}>✓</span>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed pl-7">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Demo link ── */}
        <section className="py-10 px-4 bg-gray-50 border-y border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <motion.p {...fadeUp()} className="text-gray-600 text-base mb-3">
              Want to see what a Nelsy booking page looks like to your clients?
            </motion.p>
            <Link to="/studio/maya" className="text-base font-bold underline underline-offset-2" style={{ color: PINK }}>
              View the demo booking page →
            </Link>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-16 sm:py-24 text-white px-4 text-center"
          style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeUp()} className="text-3xl sm:text-5xl font-bold mb-4">
              Your Instagram is already working.<br />Make your bookings work too.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg mx-auto">
              Set up your Nelsy booking page in minutes. Add the link to your bio. Start converting followers into paying clients.
            </motion.p>
            <motion.div {...fadeUp(0.12)}>
              <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary-dark" />
            </motion.div>
            <motion.p {...fadeUp(0.18)} className="mt-5 text-xs text-white/60">
              $0 today · Cancel anytime · 0% Nelsy booking commission
            </motion.p>
          </div>
        </section>

        {/* ── Internal links ── */}
        <section className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">ALSO ON NELSY</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Nelsy — Nail Tech Booking App
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/nail-tech-deposits" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                How to Collect Deposits as a Nail Tech
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/studio/maya" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                View demo booking page
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
