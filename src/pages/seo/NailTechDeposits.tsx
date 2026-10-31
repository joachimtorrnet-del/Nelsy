import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ghost, Clock3, BriefcaseBusiness } from 'lucide-react';
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
    name: 'How to Collect Deposits as a Nail Tech',
    description: 'Learn how to require and collect deposits as a nail tech to stop no-shows, protect your schedule and get paid before every appointment.',
    url: 'https://getnelsy.com/nail-tech-deposits',
    isPartOf: { '@type': 'WebSite', url: 'https://getnelsy.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Nail Tech Deposits', item: 'https://getnelsy.com/nail-tech-deposits' },
    ],
  },
];

const WHY_DEPOSITS = [
  {
    Icon: Ghost,
    title: 'No-Show Protection',
    desc: 'A client who has paid a deposit has skin in the game. No-shows drop significantly when money is already on the line.',
  },
  {
    Icon: Clock3,
    title: 'Your Time Has Value',
    desc: 'An empty appointment slot is lost income. Deposits ensure that even a last-minute cancellation compensates you for blocked time.',
  },
  {
    Icon: BriefcaseBusiness,
    title: 'Professionalism',
    desc: 'Requiring a deposit signals that you run a real business. It attracts serious clients and filters out the ones who don\'t value your work.',
  },
];

const HOW_MUCH = [
  { label: '20–25%', use: 'Entry point. Low barrier for clients, still commits them.' },
  { label: '30–50%', use: 'Most common for nail techs. Balances accessibility with protection.' },
  { label: '100%',   use: 'For new clients, high-demand periods, or if you\'ve had frequent no-shows.' },
];

export default function NailTechDeposits() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="How to Collect Deposits as a Nail Tech — Stop No-Shows | Nelsy"
        description="Learn how to require deposits as a nail tech. Set the right deposit amount, protect your schedule from no-shows and collect payments automatically with Nelsy."
        canonical="/nail-tech-deposits"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Nail Tech Deposits' }]} />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-16 sm:pt-14 sm:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}
            >
              STOP NO-SHOWS
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}
              style={{ fontSize: 'clamp(2rem, 6vw, 3.25rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 16 }}
            >
              How to Collect Deposits as a Nail Tech<br />
              <span style={{ color: PINK }}>And Stop No-Shows for Good.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-8"
            >
              No-shows cost independent nail techs hundreds of dollars every month. Requiring a deposit before confirming any appointment is the most effective way to protect your schedule — and your income.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
              <SeoCTA label="Create my booking page →" position="hero" />
            </motion.div>
          </div>
        </section>

        {/* ── Why deposits matter ── */}
        <section className="py-14 sm:py-20 bg-white px-4">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-12">
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Why Nail Techs Require Deposits
              </h2>
              <p className="text-gray-500 mt-4 text-base sm:text-lg max-w-xl mx-auto">
                A deposit policy isn't just about money — it's about protecting your time, your income and your energy.
              </p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-3">
              {WHY_DEPOSITS.map((item, i) => (
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

        {/* ── How much to charge ── */}
        <section className="py-14 sm:py-20 px-4" style={{ background: 'radial-gradient(ellipse 120% 65% at 50% 10%, #FFE4F0 0%, #FFF3F8 45%, #FFFFFF 80%)' }}>
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                How Much Deposit Should You Charge?
              </h2>
              <p className="text-gray-500 mt-4 text-base max-w-lg mx-auto">
                There's no single right answer — it depends on your market, your services and how often you experience no-shows.
              </p>
            </motion.div>
            <div className="space-y-4">
              {HOW_MUCH.map((row, i) => (
                <motion.div
                  key={row.label}
                  {...fadeUp(i * 0.08)}
                  className="bg-white rounded-2xl px-6 py-5 flex items-start gap-5 border-2 border-gray-100 shadow-sm"
                >
                  <div
                    className="flex-shrink-0 rounded-xl px-4 py-2 font-black text-white text-lg"
                    style={{ backgroundColor: PINK, minWidth: 72, textAlign: 'center' }}
                  >
                    {row.label}
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-1">{row.use}</p>
                </motion.div>
              ))}
            </div>
            <motion.p {...fadeUp(0.3)} className="mt-6 text-sm text-gray-400 text-center">
              Most nail techs start at 30% and adjust based on experience. You can always change your deposit amount in Nelsy.
            </motion.p>
          </div>
        </section>

        {/* ── How Nelsy handles it ── */}
        <section className="py-14 sm:py-20 bg-white px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeUp()} className="text-center mb-10">
              <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
                How Nelsy Automates Your Deposit Collection
              </h2>
              <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto">
                You set it once. Nelsy enforces it every time — no reminders, no awkward conversations, no chasing clients.
              </p>
            </motion.div>
            <div className="space-y-5">
              {[
                { step: '1', title: 'Set your deposit amount', desc: 'Choose a flat amount or percentage. Applies automatically to every new booking on your page.' },
                { step: '2', title: 'Client books and pays the deposit', desc: 'When a client picks a service and time, they\'re prompted to pay the deposit before the slot is confirmed.' },
                { step: '3', title: 'You get a confirmed booking', desc: 'The appointment only appears in your calendar once the deposit is collected. No ghosting.' },
                { step: '4', title: 'Remaining balance at appointment', desc: 'Clients know exactly what they owe at their appointment. No surprises on either side.' },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  {...fadeUp(i * 0.08)}
                  className="flex gap-5 items-start"
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full text-white font-black text-sm flex items-center justify-center shadow-md"
                    style={{ backgroundColor: PINK, boxShadow: '0 4px 12px rgba(245,43,140,0.3)' }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Deposit policy tip ── */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fadeUp()} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Communicating Your Deposit Policy
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
                Be upfront. Add your deposit requirement to your Instagram bio, your booking page description and your confirmation messages. Most clients will respect a clear policy — the ones who push back are often the ones who would have no-showed anyway.
              </p>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                With Nelsy, your deposit policy is visible on your booking page before a client selects a time. They agree to it by completing their booking.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          className="py-16 sm:py-24 text-white px-4 text-center"
          style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}
        >
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeUp()} className="text-3xl sm:text-5xl font-bold mb-4">
              Ready to stop no-shows?
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-lg sm:text-xl text-white/80 mb-8 max-w-lg mx-auto">
              Set up your deposit requirements in minutes. Your Nelsy booking page handles the rest — automatically.
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
              <Link to="/instagram-booking-for-nail-techs" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Instagram Booking for Nail Techs
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/onboarding" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Create your booking page
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/tools/nail-tech-appointment-reminder-templates" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Appointment Reminder Templates
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
