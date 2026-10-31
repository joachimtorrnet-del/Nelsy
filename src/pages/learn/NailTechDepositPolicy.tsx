import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContents';
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
    '@type': 'Article',
    headline: 'Nail Tech Deposit Policy: How to Write and Enforce One',
    description: 'A practical guide to writing and enforcing a deposit policy for nail techs — how much to charge, how to communicate it, and how to handle exceptions.',
    url: 'https://getnelsy.com/learn/nail-tech-deposit-policy',
    datePublished: '2026-10-20',
    author: { '@type': 'Organization', name: 'Nelsy', url: 'https://getnelsy.com' },
    publisher: { '@type': 'Organization', name: 'Nelsy', url: 'https://getnelsy.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://getnelsy.com/learn' },
      { '@type': 'ListItem', position: 3, name: 'Nail Tech Deposit Policy', item: 'https://getnelsy.com/learn/nail-tech-deposit-policy' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much should a nail tech deposit be?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most nail techs charge 20–50% of the service price as a deposit. For standard services, 20–30% is common. For longer or custom services (full gel sets, nail art), 30–50% better reflects the preparation time and materials invested.' },
      },
      {
        '@type': 'Question',
        name: 'Is a nail deposit refundable?',
        acceptedAnswer: { '@type': 'Answer', text: 'This depends on your policy. Most nail techs make deposits non-refundable for cancellations inside a notice window (typically 24–48 hours) and for no-shows. Cancellations made with sufficient notice can be refunded or credited.' },
      },
      {
        '@type': 'Question',
        name: 'Can a nail tech keep a deposit?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes, if you have a clearly stated non-refundable deposit policy that the client agreed to before booking. This is standard practice and legally sound when the policy is documented and presented at the time of booking.' },
      },
      {
        '@type': 'Question',
        name: 'What if a client refuses to pay a deposit?',
        acceptedAnswer: { '@type': 'Answer', text: 'You\'re not obligated to book clients who won\'t pay a deposit. Clients who push back on deposit requirements are often the same clients who no-show. It\'s fair to decline to hold a slot without one.' },
      },
    ],
  },
];

const TOC = [
  { id: 'why-deposits', label: 'Why a deposit policy matters' },
  { id: 'how-much', label: 'How much to charge' },
  { id: 'refundable', label: 'Refundable vs non-refundable' },
  { id: 'writing-the-policy', label: 'Writing your deposit policy' },
  { id: 'communicating', label: 'Communicating your policy' },
  { id: 'handling-objections', label: 'Handling objections' },
  { id: 'collecting', label: 'How to collect deposits' },
  { id: 'faqs', label: 'Deposit policy FAQs' },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-20">
      <motion.div {...fadeUp()}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 border-l-4 bg-pink-50 border-pink-200 text-sm text-pink-900 leading-relaxed">
      {children}
    </div>
  );
}

export default function NailTechDepositPolicy() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Nail Tech Deposit Policy: How to Write and Enforce One | Nelsy"
        description="How to write and enforce a nail tech deposit policy — how much to charge, refund rules, how to communicate it, and how to handle client objections."
        canonical="/learn/nail-tech-deposit-policy"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Learn' },
          { label: 'Nail Tech Deposit Policy' },
        ]} />

        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-12">
          <div className="max-w-3xl mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}>
              NAIL TECH BUSINESS GUIDE
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Nail Tech Deposit Policy: How to Write and Enforce One
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed mb-4">
              A deposit policy protects your income, reduces no-shows, and sets a professional standard for your business. This guide covers everything from how much to charge to what happens when a client refuses.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-sm text-gray-400">
              Written for independent nail techs · Updated October 2026
            </motion.p>
          </div>
        </section>

        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto space-y-14">

            <TableOfContents items={TOC} />

            <Section id="why-deposits" title="1. Why a deposit policy matters">
              <p>
                A no-show costs you more than the price of the service. You lose the appointment revenue, the slot that could have gone to another client, and any materials or preparation time you invested. A deposit doesn't prevent no-shows entirely, but it shifts the calculus for clients who might otherwise cancel carelessly.
              </p>
              <p>
                The difference a deposit makes:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="font-semibold text-red-700 text-sm mb-2">Without a deposit</p>
                  <ul className="text-sm text-red-600 space-y-1.5">
                    <li>→ Cancellation costs the client nothing</li>
                    <li>→ No-shows are common and unpredictable</li>
                    <li>→ You absorb the full financial impact</li>
                    <li>→ Awkward conversation if you try to charge after</li>
                  </ul>
                </div>
                <div className="rounded-xl p-4 border bg-green-50 border-green-100">
                  <p className="font-semibold text-green-700 text-sm mb-2">With a deposit policy</p>
                  <ul className="text-sm text-green-700 space-y-1.5">
                    <li>→ Clients commit when they book</li>
                    <li>→ No-show rate drops significantly</li>
                    <li>→ You hold the deposit — no need to chase</li>
                    <li>→ Policy was agreed to before the appointment</li>
                  </ul>
                </div>
              </div>
              <p>
                Deposits also attract a higher quality of client. Someone willing to put money down to hold a slot is more likely to show up prepared, on time and willing to pay your rates.
              </p>
            </Section>

            <Section id="how-much" title="2. How much to charge">
              <p>
                The right deposit amount balances two things: enough to matter (so clients are genuinely committed) but not so high that it becomes a barrier to booking.
              </p>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[380px] sm:min-w-0 px-4 sm:px-0">
                  <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Service type</th>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Typical deposit range</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Standard gel manicure / pedicure', '20–30% of service price'],
                        ['Nail extensions (acrylic / gel)', '25–40%'],
                        ['Custom nail art or full sets', '30–50%'],
                        ['Long appointments (90 min+)', '30–50%'],
                        ['New or first-time clients', '25–50% (higher — new relationships carry more risk)'],
                      ].map(([service, range], i) => (
                        <tr key={i} className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                          <td className="px-4 py-3 text-gray-700">{service}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{range}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p>
                Some nail techs charge a flat fee (e.g., $25 for all bookings) rather than a percentage. This is simpler to communicate and administer, though it proportionally means less protection on larger services.
              </p>
              <Callout>
                Whatever amount you choose, be consistent. Applying different deposits to different clients creates confusion and can feel arbitrary.
              </Callout>
            </Section>

            <Section id="refundable" title="3. Refundable vs non-refundable">
              <p>
                Most nail tech deposit policies are non-refundable for late cancellations and no-shows, but refundable (or transferable to a reschedule) for cancellations made with sufficient notice.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Fully non-refundable', detail: 'The deposit is never returned regardless of notice given. Simple to communicate, but can feel harsh to clients who cancel well in advance. May deter first-time bookings.' },
                  { label: 'Non-refundable within notice window', detail: 'The most common approach. Deposit is refunded (or credited) for cancellations with 24–48+ hours notice, retained for cancellations inside that window or no-shows. Balances protection with fairness.' },
                  { label: 'Transferable to reschedule', detail: 'Deposit can\'t be refunded but can be carried to a future appointment. Retains the commitment while being more flexible. Works well for clients you want to keep.' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p>
                The most important thing is that your policy is stated clearly before the client books — so there's no dispute about whether they knew.
              </p>
            </Section>

            <Section id="writing-the-policy" title="4. Writing your deposit policy">
              <p>Your deposit policy should cover:</p>
              <ul className="space-y-2.5">
                {[
                  'The deposit amount or percentage',
                  'When it\'s charged (at booking)',
                  'Whether it\'s refundable, and under what conditions',
                  'What happens on a no-show',
                  'How it applies to reschedules',
                  'How and when the remainder is due',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor: PINK }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Keep it plain and direct. A deposit policy doesn't need to read like a legal document — it needs to be clearly understood by a client reading it in 30 seconds before they book.
              </p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-3">Example policy (short version)</p>
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "A non-refundable deposit of [X]% is required to confirm your booking. This is applied to your service balance on the day. Deposits are retained for cancellations made within 24 hours of the appointment and for no-shows. Cancellations with more than 24 hours notice will be credited toward a future appointment."
                </p>
              </div>
              <p>
                Or use the <Link to="/tools/nail-tech-cancellation-policy-generator" className="font-bold underline underline-offset-2" style={{ color: PINK }}>cancellation policy generator</Link> to create a full policy covering deposits, cancellations, no-shows and late arrivals.
              </p>
            </Section>

            <Section id="communicating" title="5. Communicating your policy">
              <p>
                A policy only protects you if clients see it before they book. Present it in at least two places:
              </p>
              <ul className="space-y-2.5">
                {[
                  { place: 'On your booking page', detail: 'Visible before the client confirms their booking. This is the most important placement.' },
                  { place: 'In the booking confirmation', detail: 'Include the policy or a summary in every confirmation. "Your deposit of $X has been received. This is non-refundable within 24 hours of your appointment."' },
                  { place: 'Instagram highlights or bio', detail: 'New clients often check your Instagram before booking. A "Booking info" highlight that covers your deposit policy sets expectations early.' },
                  { place: 'At the first appointment', detail: 'Verbally confirming your policies with new clients at the first appointment cements the relationship professionally.' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 font-bold text-gray-400 text-xs mt-0.5">{i + 1}.</span>
                    <span><strong className="text-gray-800">{item.place}:</strong> {item.detail}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="handling-objections" title="6. Handling objections">
              <p>
                Some clients will push back on deposit requirements, especially if they're used to booking with nail techs who don't require them. Common objections and how to handle them:
              </p>
              <div className="space-y-3">
                {[
                  {
                    objection: '"I\'ve never had to pay a deposit before."',
                    response: 'That\'s fine — this is my policy. A deposit protects my time and confirms your slot. If you\'d like to book, I can send you the link.',
                  },
                  {
                    objection: '"What if I need to cancel?"',
                    response: 'Explain your cancellation terms directly: with [X hours] notice, the deposit is [credited/refunded]. Inside [X hours], it\'s non-refundable.',
                  },
                  {
                    objection: '"Can I pay on the day instead?"',
                    response: 'A deposit in advance is how I confirm bookings. I can\'t hold a slot without one, but I\'d love to book you in.',
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-gray-700 text-sm mb-2">"{item.objection}"</p>
                    <p className="text-sm text-gray-500 leading-relaxed"><span className="font-medium text-gray-700">Response: </span>{item.response}</p>
                  </div>
                ))}
              </div>
              <Callout>
                Clients who won't book because of a deposit requirement often aren't clients you want. The ones who no-show most often are also the ones most resistant to deposit requirements. A firm, polite response is always the right move.
              </Callout>
            </Section>

            <Section id="collecting" title="7. How to collect deposits">
              <p>
                How you collect deposits affects how smoothly the policy works in practice. Options from least to most friction:
              </p>
              <div className="space-y-3">
                {[
                  { method: 'Automated at booking (recommended)', detail: 'The deposit is charged when the client selects a time. No follow-up needed. The booking isn\'t confirmed until payment goes through. This is how Nelsy works — the deposit is collected before the slot is held.' },
                  { method: 'Payment link sent after DM', detail: 'Client DMs you, you send a payment link, they pay, you confirm the booking. Adds friction on both sides and relies on the client following through after the DM.' },
                  { method: 'Cash or bank transfer', detail: 'Works but creates admin overhead and makes tracking harder. Difficult to scale.' },
                ].map((item) => (
                  <div key={item.method} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.method}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p>
                Automating deposit collection at booking removes the awkward step of chasing payment and removes any ambiguity about whether the slot is confirmed.
              </p>
              <Link to="/nail-tech-deposits" className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-2" style={{ color: PINK }}>
                How to set up deposit collection as a nail tech →
              </Link>
            </Section>

            {/* FAQs */}
            <div id="faqs" className="scroll-mt-20">
              <motion.div {...fadeUp()}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Deposit policy FAQs</h2>
                <div className="space-y-4">
                  {[
                    { q: 'How much should a nail tech deposit be?', a: 'Most nail techs charge 20–50% of the service price as a deposit. For standard services, 20–30% is common. For longer or custom services, 30–50% better reflects the preparation time and materials invested.' },
                    { q: 'Is a nail deposit refundable?', a: 'This depends on your policy. Most nail techs make deposits non-refundable for cancellations inside a notice window (typically 24–48 hours) and for no-shows. Cancellations with sufficient notice can be refunded or credited.' },
                    { q: 'Can a nail tech keep a deposit?', a: 'Yes, if you have a clearly stated non-refundable deposit policy that the client agreed to before booking. This is standard practice and legally sound when the policy is documented and presented at the time of booking.' },
                    { q: 'What if a client refuses to pay a deposit?', a: 'You\'re not obligated to book clients who won\'t pay a deposit. It\'s fair to decline to hold a slot without one. Clients who push back strongly on deposit requirements are often the same clients who no-show.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm mb-2">{item.q}</p>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 sm:py-20 text-white px-4 text-center"
          style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}>
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeUp()} className="text-3xl sm:text-4xl font-bold mb-4">
              Collect deposits automatically at booking.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Nelsy collects deposits when clients book — the slot isn't confirmed until they pay. No chasing, no awkward conversations.
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
                { to: '/tools/nail-tech-cancellation-policy-generator', label: 'Cancellation Policy Generator' },
                { to: '/learn/nail-tech-pricing-guide', label: 'Nail Tech Pricing Guide' },
                { to: '/learn/how-to-get-more-nail-clients', label: 'How to Get More Nail Clients' },
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
