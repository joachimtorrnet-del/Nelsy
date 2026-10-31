import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    name: 'Nail Tech Cancellation Policy Generator',
    description: 'Free cancellation policy generator for nail techs. Generate a professional cancellation and no-show policy for your booking page in under two minutes.',
    url: 'https://getnelsy.com/tools/nail-tech-cancellation-policy-generator',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://getnelsy.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Cancellation Policy Generator', item: 'https://getnelsy.com/tools/nail-tech-cancellation-policy-generator' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do nail techs need a written cancellation policy?',
        acceptedAnswer: { '@type': 'Answer', text: 'A written cancellation policy protects you in disputes and sets clear expectations before clients book. Without one, it\'s your word against the client\'s when a no-show or last-minute cancellation happens.' },
      },
      {
        '@type': 'Question',
        name: 'How much notice should I require for cancellations?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most nail techs require 24–48 hours notice. 24 hours is the minimum needed to fill a cancelled slot. 48 hours is more protective but can feel strict to clients. A tiered policy (full refund 48+ hours, partial refund 24–48 hours, no refund under 24 hours) balances both.' },
      },
      {
        '@type': 'Question',
        name: 'What should I charge for a no-show?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most nail techs retain the full deposit on a no-show. If you\'re not collecting deposits, a fee equivalent to 50–100% of the service is common. The goal is not to punish clients but to cover the income lost when a slot can\'t be filled.' },
      },
      {
        '@type': 'Question',
        name: 'How do I communicate my cancellation policy to clients?',
        acceptedAnswer: { '@type': 'Answer', text: 'Add your policy to your booking page, booking confirmation message, and Instagram bio or highlights. Clients can\'t claim they didn\'t know if it was presented before they confirmed their booking.' },
      },
    ],
  },
];

type NoticeOption = '12' | '24' | '48' | '72';
type FeeOption = 'deposit' | '25' | '50' | '100';
type NoShowOption = 'deposit' | '50' | '75' | '100' | 'future_ban';
type RescheduleOption = 'free' | 'once' | 'fee';
type LateOption = '10' | '15' | '20' | 'cancel';

interface FormState {
  businessName: string;
  noticeHours: NoticeOption;
  cancelFee: FeeOption;
  noShowFee: NoShowOption;
  reschedule: RescheduleOption;
  lateArrival: LateOption;
  depositRequired: boolean;
}

const DEFAULTS: FormState = {
  businessName: '',
  noticeHours: '24',
  cancelFee: 'deposit',
  noShowFee: 'deposit',
  reschedule: 'once',
  lateArrival: '15',
  depositRequired: true,
};

function generatePolicy(f: FormState): string {
  const name = f.businessName.trim() || 'this studio';
  const noticeLine = f.noticeHours === '12' ? '12 hours' : f.noticeHours === '24' ? '24 hours' : f.noticeHours === '48' ? '48 hours' : '72 hours';

  const cancelFeeLine = (() => {
    if (f.cancelFee === 'deposit') return 'your deposit will not be refunded';
    if (f.cancelFee === '25') return '25% of the service price will be charged';
    if (f.cancelFee === '50') return '50% of the service price will be charged';
    return '100% of the service price will be charged';
  })();

  const noShowLine = (() => {
    if (f.noShowFee === 'deposit') return 'your deposit will be retained in full';
    if (f.noShowFee === '50') return '50% of the service price will be charged';
    if (f.noShowFee === '75') return '75% of the service price will be charged';
    if (f.noShowFee === '100') return '100% of the service price will be charged';
    return 'future bookings may be declined';
  })();

  const rescheduleLine = (() => {
    if (f.reschedule === 'free') return 'You may reschedule at no charge with at least ' + noticeLine + ' notice.';
    if (f.reschedule === 'once') return 'One free reschedule is offered with at least ' + noticeLine + ' notice. Further reschedules within the same appointment cycle may be subject to a fee.';
    return 'Rescheduling requests are subject to a rescheduling fee. Please contact us as early as possible.';
  })();

  const lateLine = (() => {
    if (f.lateArrival === 'cancel') return 'Clients arriving more than 10 minutes late may have their appointment shortened or cancelled, and the full service price remains due.';
    return `Clients arriving more than ${f.lateArrival} minutes late may have their appointment shortened to avoid affecting the next client. The full service price remains due.`;
  })();

  const depositClause = f.depositRequired
    ? 'A non-refundable deposit is required at the time of booking to confirm your appointment. This deposit is applied to the balance of your service.'
    : '';

  return [
    `CANCELLATION & NO-SHOW POLICY — ${name.toUpperCase()}`,
    '',
    'Please read this policy carefully before booking.',
    '',
    '─────────────────────────────────────',
    'CANCELLATIONS',
    '─────────────────────────────────────',
    `Cancellations made less than ${noticeLine} before the appointment: ${cancelFeeLine}.`,
    '',
    'Cancellations made with more than ' + noticeLine + ' notice will be refunded or credited in full' + (f.depositRequired ? ' minus the deposit' : '') + '.',
    '',
    '─────────────────────────────────────',
    'NO-SHOWS',
    '─────────────────────────────────────',
    `If you do not arrive for your appointment without prior notice, ${noShowLine}. No-shows affect other clients waiting for availability.`,
    '',
    '─────────────────────────────────────',
    'RESCHEDULING',
    '─────────────────────────────────────',
    rescheduleLine,
    '',
    '─────────────────────────────────────',
    'LATE ARRIVALS',
    '─────────────────────────────────────',
    lateLine,
    '',
    (depositClause ? '─────────────────────────────────────\nDEPOSITS\n─────────────────────────────────────\n' + depositClause + '\n\n' : '') +
    '─────────────────────────────────────',
    'ACKNOWLEDGEMENT',
    '─────────────────────────────────────',
    'By completing a booking, you confirm that you have read and agree to this cancellation policy.',
  ].join('\n');
}

export default function CancellationPolicyGenerator() {
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const [copied, setCopied] = useState(false);
  const policy = generatePolicy(form);

  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleCopy() {
    navigator.clipboard.writeText(policy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  const inputClass = 'w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300 transition';
  const labelClass = 'block text-xs font-semibold text-gray-700 mb-1.5';

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Nail Tech Cancellation Policy Generator — Free Tool | Nelsy"
        description="Generate a professional cancellation and no-show policy for your nail tech booking page in under two minutes. Free tool — copy and paste instantly."
        canonical="/tools/nail-tech-cancellation-policy-generator"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Tools' },
          { label: 'Cancellation Policy Generator' },
        ]} />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-10">
          <div className="max-w-3xl mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}>
              FREE TOOL FOR NAIL TECHS
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 2.8rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 14 }}>
              Cancellation Policy Generator for Nail Techs
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Set your terms, generate a professional policy, copy and paste it to your booking page and Instagram. Takes less than two minutes.
            </motion.p>
          </div>
        </section>

        {/* ── Tool ── */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* ── Inputs ── */}
              <div className="space-y-5">
                <h2 className="text-base font-bold text-gray-900">Your policy settings</h2>

                <div>
                  <label className={labelClass}>Your business or trading name (optional)</label>
                  <input type="text" placeholder="e.g. Maya Nails" value={form.businessName}
                    onChange={e => update('businessName', e.target.value)}
                    className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Minimum notice required for free cancellation</label>
                  <select value={form.noticeHours} onChange={e => update('noticeHours', e.target.value as NoticeOption)} className={inputClass}>
                    <option value="12">12 hours</option>
                    <option value="24">24 hours (recommended)</option>
                    <option value="48">48 hours</option>
                    <option value="72">72 hours</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Fee for late cancellations (under notice window)</label>
                  <select value={form.cancelFee} onChange={e => update('cancelFee', e.target.value as FeeOption)} className={inputClass}>
                    <option value="deposit">Forfeit deposit</option>
                    <option value="25">25% of service price</option>
                    <option value="50">50% of service price</option>
                    <option value="100">100% of service price</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>No-show policy</label>
                  <select value={form.noShowFee} onChange={e => update('noShowFee', e.target.value as NoShowOption)} className={inputClass}>
                    <option value="deposit">Retain full deposit</option>
                    <option value="50">Charge 50% of service price</option>
                    <option value="75">Charge 75% of service price</option>
                    <option value="100">Charge 100% of service price</option>
                    <option value="future_ban">May decline future bookings</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Rescheduling</label>
                  <select value={form.reschedule} onChange={e => update('reschedule', e.target.value as RescheduleOption)} className={inputClass}>
                    <option value="free">Free with sufficient notice</option>
                    <option value="once">One free reschedule allowed</option>
                    <option value="fee">Subject to a rescheduling fee</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Late arrival grace period</label>
                  <select value={form.lateArrival} onChange={e => update('lateArrival', e.target.value as LateOption)} className={inputClass}>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes (recommended)</option>
                    <option value="20">20 minutes</option>
                    <option value="cancel">Strict — may cancel immediately</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => update('depositRequired', !form.depositRequired)}
                    className="relative w-10 h-6 rounded-full transition-colors duration-200 focus:outline-none"
                    style={{ backgroundColor: form.depositRequired ? PINK : '#D1D5DB' }}
                    aria-pressed={form.depositRequired}
                  >
                    <span
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                      style={{ transform: form.depositRequired ? 'translateX(16px)' : 'translateX(0)' }}
                    />
                  </button>
                  <label className="text-sm font-medium text-gray-700">I collect deposits at booking</label>
                </div>
              </div>

              {/* ── Output ── */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-bold text-gray-900">Your policy</h2>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg border transition"
                    style={{ borderColor: PINK, color: copied ? '#16A34A' : PINK, backgroundColor: copied ? '#F0FDF4' : 'transparent' }}
                  >
                    {copied ? '✓ Copied!' : 'Copy policy'}
                  </button>
                </div>
                <pre className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap font-mono h-96 overflow-y-auto">
                  {policy}
                </pre>
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-2">
              This generator produces a template for informational purposes. Review it for your specific situation before publishing. It is not legal advice.
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="border-t border-gray-100" />

        {/* ── SEO Content ── */}
        <section className="py-14 px-4">
          <div className="max-w-3xl mx-auto space-y-12">

            <motion.div {...fadeUp()}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Why nail techs need a cancellation policy</h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  No-shows and last-minute cancellations are one of the most damaging things that can happen to a nail tech's income. A cancelled appointment isn't just lost revenue for that slot — it's also the revenue you could have earned by booking someone else in that time, and it's time you can't get back.
                </p>
                <p>
                  A written cancellation policy does three things:
                </p>
                <ul className="space-y-2">
                  {[
                    'Sets clear expectations before the booking is confirmed — clients know what happens if they cancel or no-show',
                    'Gives you a documented basis for any fees you charge — no more awkward conversations where you\'re enforcing an unspoken rule',
                    'Filters clients — clients who read and accept your policy are taking the booking seriously',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div {...fadeUp()}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">What to include in your cancellation policy</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Notice window', detail: 'How many hours notice is required for a free cancellation. This is the core of the policy — 24–48 hours is standard.' },
                  { label: 'Late cancellation fee', detail: 'What you charge when a client cancels inside the notice window. Usually the deposit or a percentage of the service.' },
                  { label: 'No-show fee', detail: 'No-shows are more disruptive than cancellations. Most nail techs retain the full deposit or charge a higher percentage.' },
                  { label: 'Rescheduling terms', detail: 'Whether clients can reschedule, how much notice they need, and whether there\'s a fee for repeated rescheduling.' },
                  { label: 'Late arrival', detail: 'A grace period after which you may shorten or cancel the appointment. This protects your schedule and the next client.' },
                  { label: 'Deposit requirement', detail: 'If you collect deposits (highly recommended), reference this in the policy so clients know it\'s non-negotiable.' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp()}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Where to publish your policy</h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>A policy is only useful if clients see it before they book. Publish it in:</p>
                <ul className="space-y-2.5">
                  {[
                    { place: 'Your booking page', detail: 'This is the most important placement. Clients should see it when they\'re booking, before they confirm.' },
                    { place: 'Booking confirmation message', detail: 'Include a summary or link to the full policy in every booking confirmation. Clients can\'t claim they weren\'t informed.' },
                    { place: 'Instagram bio or highlights', detail: 'A "Booking Policy" Instagram highlight that clients can read before they DM or book.' },
                    { place: 'In your intake form', detail: 'If you use a client intake form, add an acknowledgement checkbox.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 font-bold text-gray-400 text-xs mt-0.5">{i + 1}.</span>
                      <span><strong className="text-gray-800">{item.place}:</strong> {item.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div {...fadeUp()}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">How to enforce your policy without losing clients</h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  Enforcing your policy is easier when it was clearly communicated upfront. Most clients will accept a fee that they knew about when they booked. The tricky situations arise when clients feel surprised.
                </p>
                <p>
                  Practically:
                </p>
                <ul className="space-y-2">
                  {[
                    'Be consistent — applying the policy to some clients and not others creates resentment and word-of-mouth complaints',
                    'Be matter-of-fact, not apologetic — "Per the cancellation policy you agreed to, the deposit is non-refundable" is enough',
                    'Make exceptions rarely and for genuine emergencies, not social pressure — exceptions become precedents',
                    'If a client disputes a fee, remind them when the policy was presented and that they confirmed the booking',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Collecting deposits at booking makes enforcement straightforward: you already hold the fee before the appointment. No awkward conversations about collecting after a no-show.
                </p>
                <Link to="/nail-tech-deposits" className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-2" style={{ color: PINK }}>
                  How to collect deposits as a nail tech →
                </Link>
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div {...fadeUp()}>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Cancellation policy FAQs</h2>
              <div className="space-y-4">
                {[
                  { q: 'Do nail techs need a written cancellation policy?', a: 'A written cancellation policy protects you in disputes and sets clear expectations before clients book. Without one, it\'s your word against the client\'s when a no-show or last-minute cancellation happens.' },
                  { q: 'How much notice should I require for cancellations?', a: 'Most nail techs require 24–48 hours notice. 24 hours is the minimum needed to fill a cancelled slot. 48 hours is more protective but can feel strict to some clients. A tiered policy (full refund with 48+ hours, partial with 24–48, no refund under 24 hours) balances both.' },
                  { q: 'What should I charge for a no-show?', a: 'Most nail techs retain the full deposit on a no-show. If you\'re not collecting deposits, a fee equivalent to 50–100% of the service is common. The goal is to cover the income lost when a slot can\'t be filled.' },
                  { q: 'How do I communicate my cancellation policy to clients?', a: 'Add your policy to your booking page, booking confirmation message, and Instagram bio or highlights. Clients can\'t claim they didn\'t know if it was presented before they confirmed their booking.' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-2">{item.q}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 sm:py-20 text-white px-4 text-center"
          style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}>
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeUp()} className="text-3xl sm:text-4xl font-bold mb-4">
              Enforce your policy automatically with deposit collection.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Nelsy collects deposits at booking and shows your policy before the client confirms. No-shows are already covered before the appointment day.
            </motion.p>
            <motion.div {...fadeUp(0.12)}>
              <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary-dark" />
            </motion.div>
            <motion.p {...fadeUp(0.18)} className="mt-5 text-xs text-white/60">
              $0 today · Cancel anytime · 0% Nelsy booking commission
            </motion.p>
          </div>
        </section>

        {/* ── Related ── */}
        <section className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">RELATED GUIDES & TOOLS</p>
            <div className="flex flex-wrap gap-3 items-center">
              {[
                { to: '/nail-tech-deposits', label: 'How to Collect Deposits' },
                { to: '/learn/nail-tech-deposit-policy', label: 'Deposit Policy Guide' },
                { to: '/learn/nail-tech-pricing-guide', label: 'Nail Tech Pricing Guide' },
                { to: '/learn/how-to-get-more-nail-clients', label: 'How to Get More Nail Clients' },
                { to: '/tools/nail-tech-appointment-reminder-templates', label: 'Appointment Reminder Templates' },
              ].map((link, i) => (
                <>
                  {i > 0 && <span key={`dot-${i}`} className="text-gray-300">·</span>}
                  <Link key={link.to} to={link.to} className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                    {link.label}
                  </Link>
                </>
              ))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
