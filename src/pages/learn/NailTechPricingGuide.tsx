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
    headline: 'Nail Tech Pricing Guide: How to Set Your Rates and Charge What You\'re Worth',
    description: 'A practical guide to nail tech pricing — cost-based pricing, market positioning, how to raise rates, and what to include on your booking page.',
    url: 'https://getnelsy.com/learn/nail-tech-pricing-guide',
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
      { '@type': 'ListItem', position: 3, name: 'Nail Tech Pricing Guide', item: 'https://getnelsy.com/learn/nail-tech-pricing-guide' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I know if I\'m charging enough as a nail tech?',
        acceptedAnswer: { '@type': 'Answer', text: 'If you\'re fully booked but not profitable, you\'re not charging enough. Calculate your actual costs (materials, overhead, time) and compare to your current rates. If your rate leaves you below minimum wage after costs, raise it.' },
      },
      {
        '@type': 'Question',
        name: 'How much should I raise my nail prices?',
        acceptedAnswer: { '@type': 'Answer', text: 'Most nail techs who are undercharging need 15–30% increases to reach sustainable rates. Small incremental raises (5–10%) are easier for clients to accept and easier to communicate than large jumps.' },
      },
      {
        '@type': 'Question',
        name: 'Should I charge more for nail art?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes. Nail art takes additional time and materials and requires specialized skills. Charge by complexity or by time added. Many nail techs use tiered pricing: simple art (per nail), detailed art (per nail, higher), and custom full sets as a flat rate.' },
      },
      {
        '@type': 'Question',
        name: 'How do I show my prices without scaring clients off?',
        acceptedAnswer: { '@type': 'Answer', text: 'Clear pricing doesn\'t scare good clients away — it filters out clients who aren\'t a fit. Present prices with what\'s included (duration, what\'s covered) so clients can see the value, not just the number.' },
      },
    ],
  },
];

const TOC = [
  { id: 'why-pricing-matters', label: 'Why pricing matters beyond income' },
  { id: 'cost-based-pricing', label: 'Start with cost-based pricing' },
  { id: 'what-to-include', label: 'What costs to include' },
  { id: 'market-positioning', label: 'Market positioning and local rates' },
  { id: 'service-menu', label: 'Structuring your service menu' },
  { id: 'nail-art-pricing', label: 'Pricing nail art and add-ons' },
  { id: 'raising-prices', label: 'How to raise your prices' },
  { id: 'showing-prices', label: 'Displaying prices on your booking page' },
  { id: 'faqs', label: 'Pricing FAQs' },
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

export default function NailTechPricingGuide() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Nail Tech Pricing Guide: How to Set Your Rates and Charge What You're Worth | Nelsy"
        description="A practical nail tech pricing guide — cost-based pricing, market positioning, nail art pricing, how to raise rates, and how to display prices on your booking page."
        canonical="/learn/nail-tech-pricing-guide"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Learn' },
          { label: 'Nail Tech Pricing Guide' },
        ]} />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-12">
          <div className="max-w-3xl mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}>
              NAIL TECH BUSINESS GUIDE
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 16 }}>
              Nail Tech Pricing Guide: How to Set Your Rates and Charge What You're Worth
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed mb-4">
              Most nail techs undercharge — not because they don't deserve more, but because they've never worked through the actual numbers. This guide walks through how to set prices based on real costs, how to position in your market, and how to raise your rates without losing clients.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-sm text-gray-400">
              Written for independent nail techs · Updated October 2026
            </motion.p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto space-y-14">

            <TableOfContents items={TOC} />

            <Section id="why-pricing-matters" title="1. Why pricing matters beyond income">
              <p>
                Pricing is often treated as a pure income question — charge more, earn more. But your prices affect more than your take-home. They affect which clients you attract, how busy you stay, whether clients respect your time, and how sustainable your business is long-term.
              </p>
              <p>
                Undercharging creates several problems nail techs don't always connect to pricing:
              </p>
              <ul className="space-y-2.5">
                {[
                  'You need more appointments to hit the same income, which leads to physical strain and burnout',
                  'Low prices attract price-sensitive clients who are more likely to no-show or push back on policies',
                  'You can\'t reinvest in quality products, education or equipment — which limits what you can offer',
                  'There\'s no buffer for slow weeks, illness or business costs',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Pricing correctly isn't about charging what you want — it's about charging what the business requires.
              </p>
            </Section>

            <Section id="cost-based-pricing" title="2. Start with cost-based pricing">
              <p>
                The most reliable starting point for nail tech pricing is cost-based pricing: work out what each appointment actually costs you, and price above that.
              </p>
              <p>The basic formula:</p>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 font-mono text-sm space-y-2">
                <p><span className="text-gray-400">// per appointment</span></p>
                <p>Labor cost = (service duration ÷ 60) × target hourly rate</p>
                <p>Overhead per appt = monthly overhead ÷ monthly appointments</p>
                <p>Base price = labor + overhead + materials</p>
                <p>Final price = base price ÷ (1 − profit margin %)</p>
              </div>
              <p>
                The key variable most nail techs ignore is <strong>target hourly rate</strong>. This should reflect what you need to earn — not what you think clients will pay, not what other local nail techs charge. Start with what you need to make the business work, then see how it compares to the market.
              </p>
              <Callout>
                Use the <Link to="/tools/nail-tech-pricing-calculator" className="font-bold underline underline-offset-2" style={{ color: PINK }}>Nelsy pricing calculator</Link> to run these numbers for your specific services. It shows the formula breakdown for each line so you can see exactly how price is calculated.
              </Callout>
            </Section>

            <Section id="what-to-include" title="3. What costs to include">
              <p>
                The costs nail techs most commonly undercount:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Product and materials', detail: 'Gel, acrylic, base and top coats, nail art supplies, glitters, foils. Include consumables like wipes, files, buffers — these add up.' },
                  { label: 'Monthly overhead', detail: 'Rent or booth fee, utilities, insurance, subscriptions (booking software, accounting, Spotify). Divide by your monthly appointments.' },
                  { label: 'Continuing education', detail: 'Courses, certifications, industry events. Spread annually across your appointments to get the monthly cost.' },
                  { label: 'Equipment and tools', detail: 'Lamp, drill, table, sanitation equipment. These depreciate over time — include a monthly depreciation allowance.' },
                  { label: 'Platform or booking fees', detail: 'If your booking software charges per booking or a commission, it\'s a direct cost per appointment.' },
                  { label: 'Taxes and self-employment', detail: 'Self-employment tax and income tax. For a simple estimate, set aside 25–30% of income. Include this in your target hourly rate, not as an afterthought.' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <p>
                The goal isn't to build a detailed accounting spreadsheet for every service. A reasonable monthly overhead number and a per-service materials estimate is enough to get to a defensible price floor.
              </p>
            </Section>

            <Section id="market-positioning" title="4. Market positioning and local rates">
              <p>
                Once you know your cost floor, compare to local market rates. Search Instagram and Google for nail techs in your area. Look at their booking pages or price lists. This tells you the range clients are used to seeing.
              </p>
              <p>Three positions to consider:</p>
              <div className="space-y-3">
                {[
                  { label: 'Volume pricing', price: 'At or slightly below market', detail: 'Works if you can fill your calendar consistently and are efficient. Leaves less margin and means you need more appointments to hit your income target. Harder to raise later.' },
                  { label: 'Market rate', price: 'Broadly in line with comparable local techs', detail: 'Works well when your quality, experience and client experience match the average in your area. Safe starting point for most nail techs.' },
                  { label: 'Premium pricing', price: 'Above local market', detail: 'Requires differentiation: a specialty (gel extensions, nail art, a particular aesthetic), strong Instagram presence, positive reviews, and a premium booking and client experience. Attracts fewer inquiries but more serious clients.' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex flex-col sm:flex-row gap-3">
                    <div className="flex-shrink-0">
                      <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.price}</p>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed sm:border-l sm:border-gray-200 sm:pl-4">{item.detail}</p>
                  </div>
                ))}
              </div>
              <Callout>
                <strong>Price is part of positioning.</strong> A nail tech charging $25 for gel manicures and one charging $75 are not competing for the same clients. Decide which market you're in, then price and present yourself consistently.
              </Callout>
            </Section>

            <Section id="service-menu" title="5. Structuring your service menu">
              <p>
                A clear, well-structured service menu makes pricing easier for clients to understand and reduces the number of "how much is X?" DMs you get.
              </p>
              <p>General principles:</p>
              <ul className="space-y-2.5">
                {[
                  'List each service with its price and duration — so clients know what they\'re booking and how long to allow',
                  'Group logically: manicures, pedicures, enhancements, nail art',
                  'Be specific about what\'s included: "Gel Manicure — includes removal of previous gel, prep, two gel coats, top coat"',
                  'Separate add-ons clearly: nail art, length extensions, repair, removal are better priced as add-ons than hidden in base prices',
                  'Don\'t have too many tiers — 6–8 core services with clear add-ons is more bookable than 20 variations',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                When clients can see your services clearly, they self-select into the right service for them. This means fewer appointment adjustments on the day.
              </p>
            </Section>

            <Section id="nail-art-pricing" title="6. Pricing nail art and add-ons">
              <p>
                Nail art is where many nail techs leave money on the table. It takes more time, uses more materials, and requires specific skills — and it should be priced accordingly.
              </p>
              <p>Common approaches:</p>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[400px] sm:min-w-0 px-4 sm:px-0">
                  <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Approach</th>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">How it works</th>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Best for</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Per nail', 'Charge per nail for art. Simple art $2–5/nail, detailed $5–15/nail', 'Accent nails, simple additions to a set'],
                        ['Flat add-on', 'Fixed fee per set for a type of art (e.g., chrome +$15, foils +$10)', 'Defined techniques with predictable time'],
                        ['Time-based', 'Charge an hourly rate for nail art time on top of base service', 'Complex custom work, bespoke sets'],
                        ['Custom set flat rate', 'One price for the full custom set', 'Full gel extension sets with detailed art'],
                      ].map(([approach, how, bestFor], i) => (
                        <tr key={i} className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                          <td className="px-4 py-3 font-medium text-gray-800">{approach}</td>
                          <td className="px-4 py-3 text-gray-500">{how}</td>
                          <td className="px-4 py-3 text-gray-500">{bestFor}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p>
                Be explicit on your booking page about how nail art is priced. If it's not clear, clients will assume the base price includes it, which leads to awkward conversations at the end of the appointment.
              </p>
            </Section>

            <Section id="raising-prices" title="7. How to raise your prices">
              <p>
                Most nail techs who are undercharging know it — but worry about losing clients when they raise prices. Here's what typically happens in practice:
              </p>
              <ul className="space-y-2.5">
                {[
                  'Most existing clients stay — especially loyal ones who book regularly',
                  'A small number of price-sensitive clients leave, and are replaced by clients willing to pay the new rate',
                  'The clients who leave are often the most difficult: those who push back on policies, no-show, or need excessive discounts',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p><strong>How to communicate a price increase:</strong></p>
              <div className="space-y-3">
                {[
                  { step: '1. Give notice', detail: 'Tell existing clients 2–4 weeks before the new rate takes effect. A short message in your booking confirmation or a post is enough.' },
                  { step: '2. Keep it brief', detail: 'You don\'t owe a detailed explanation. "My prices are increasing to [rate] from [date]" is sufficient. A brief mention of product costs or education is fine, but don\'t over-explain.' },
                  { step: '3. Don\'t apologise', detail: 'Apologising frames the increase as something wrong. You\'re running a business; price adjustments are normal.' },
                  { step: '4. Update your booking page on the day', detail: 'Consistency between what you say and what you charge removes any ambiguity.' },
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.step}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="showing-prices" title="8. Displaying prices on your booking page">
              <p>
                Displaying prices openly on your booking page is one of the highest-leverage things you can do for your business. It filters clients before they book (reducing DMs from people who aren't a fit), sets expectations before the appointment (reducing end-of-appointment friction), and builds trust.
              </p>
              <p>Your booking page should show:</p>
              <ul className="space-y-2.5">
                {[
                  'Each service name, price and duration',
                  'What\'s included in the base price',
                  'Add-on pricing (nail art, length, removal)',
                  'Your deposit requirement, if any',
                  'A clear cancellation and rescheduling policy',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor: PINK }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                Clients who see a professional, clear booking page with transparent pricing make a decision before reaching out. They arrive knowing what they booked and what it costs — which is better for everyone.
              </p>
              <div className="rounded-xl p-5 border border-gray-200 bg-white">
                <p className="text-sm font-semibold text-gray-900 mb-2">Your booking page with Nelsy</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Nelsy gives you a branded booking page where you list your services with prices and durations. Clients self-book, pick a time from your real availability, and pay a deposit to confirm — all without DMs. Your page is your public price list and your booking system in one place.
                </p>
                <Link to="/studio/maya" className="inline-block mt-3 text-sm font-bold underline underline-offset-2" style={{ color: PINK }}>
                  See an example booking page →
                </Link>
              </div>
            </Section>

            {/* ── FAQs ── */}
            <div id="faqs" className="scroll-mt-20">
              <motion.div {...fadeUp()}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Pricing FAQs</h2>
                <div className="space-y-4">
                  {[
                    {
                      q: 'How do I know if I\'m charging enough as a nail tech?',
                      a: 'If you\'re fully booked but not profitable, or you\'re physically exhausted but not hitting your income goals, you\'re not charging enough. Calculate your actual costs (materials, overhead, time) using the pricing calculator and compare to your current rates.',
                    },
                    {
                      q: 'How much should I raise my nail prices?',
                      a: 'Most nail techs who are undercharging need 15–30% increases to reach sustainable rates. Small incremental raises (5–10%) are easier for clients to accept and easier to communicate than large jumps. If you\'re significantly undercharging, one larger increase is usually better than dragging out the adjustment.',
                    },
                    {
                      q: 'Should I charge more for nail art?',
                      a: 'Yes. Nail art takes additional time and materials and requires specialized skills. Charge by complexity or by time added. Many nail techs use tiered per-nail pricing: simple art (e.g., $3/nail), detailed art (e.g., $8/nail), and custom full sets as a flat rate.',
                    },
                    {
                      q: 'How do I show my prices without scaring clients off?',
                      a: 'Clear pricing doesn\'t scare good clients away — it filters out clients who aren\'t a fit. Present prices with what\'s included (duration, what\'s covered) so clients can see the value, not just the number. Clients who can see your work and your prices and still reach out are much more likely to book and show up.',
                    },
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
              A booking page that shows your prices and books clients automatically.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Nelsy gives you a branded booking page with your services, prices and real-time availability. Clients self-book and pay a deposit — no DMs required.
            </motion.p>
            <motion.div {...fadeUp(0.12)} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary-dark" />
              <Link to="/studio/maya" className="text-sm text-white/70 hover:text-white underline underline-offset-2 transition">
                See example booking page
              </Link>
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
                { to: '/tools/nail-tech-pricing-calculator', label: 'Pricing Calculator' },
                { to: '/nail-tech-deposits', label: 'How to Collect Deposits' },
                { to: '/tools/nail-tech-cancellation-policy-generator', label: 'Cancellation Policy Generator' },
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
