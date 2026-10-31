import { useState, useEffect } from 'react';
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
    name: 'Free Nail Tech Pricing Calculator',
    description: 'Calculate what to charge for nail services based on your time, materials, overhead and target income. Free pricing tool for nail techs.',
    url: 'https://getnelsy.com/tools/nail-tech-pricing-calculator',
    isPartOf: { '@type': 'WebSite', url: 'https://getnelsy.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://getnelsy.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Nail Tech Pricing Calculator', item: 'https://getnelsy.com/tools/nail-tech-pricing-calculator' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do nail techs calculate service prices?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most nail techs price by combining their labor cost (hourly rate × service duration), materials cost, and a share of their monthly overhead per appointment. A profit margin is then optionally added on top.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should nail techs charge per hour?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Target hourly income varies by market, experience level and service type. Most established independent nail techs in North America aim for $30–$75/hour before overhead and materials. The right number depends on your location, demand and the complexity of services you offer.',
        },
      },
    ],
  },
];

function NumberInput({
  label, value, onChange, min, max, step, prefix, suffix, hint
}: {
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; step?: number;
  prefix?: string; suffix?: string; hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      <div className="flex items-center gap-0 rounded-xl border-2 border-gray-200 focus-within:border-pink-400 overflow-hidden transition-colors">
        {prefix && (
          <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm font-medium border-r border-gray-200 select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min ?? 0}
          max={max}
          step={step ?? 1}
          value={value}
          onChange={(e) => onChange(Math.max(min ?? 0, Number(e.target.value)))}
          className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-900 outline-none bg-white min-w-0"
        />
        {suffix && (
          <span className="px-3 py-2.5 bg-gray-50 text-gray-500 text-sm font-medium border-l border-gray-200 select-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value, formula, highlight = false }: {
  label: string; value: string; formula?: string; highlight?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between gap-3 py-3 border-b border-gray-100 last:border-0 ${highlight ? 'pt-4' : ''}`}>
      <div>
        <p className={`text-sm font-medium ${highlight ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>{label}</p>
        {formula && <p className="text-xs text-gray-400 mt-0.5 font-mono">{formula}</p>}
      </div>
      <span className={`flex-shrink-0 font-bold text-right ${highlight ? 'text-xl' : 'text-sm text-gray-700'}`}
        style={highlight ? { color: PINK } : {}}>
        {value}
      </span>
    </div>
  );
}

export default function PricingCalculator() {
  const [duration, setDuration] = useState(60);
  const [materialCost, setMaterialCost] = useState(15);
  const [targetHourly, setTargetHourly] = useState(35);
  const [monthlyOverhead, setMonthlyOverhead] = useState(400);
  const [monthlyAppts, setMonthlyAppts] = useState(40);
  const [profitMargin, setProfitMargin] = useState(0);
  const [copied, setCopied] = useState(false);

  const laborCost = (duration / 60) * targetHourly;
  const overheadPerAppt = monthlyAppts > 0 ? monthlyOverhead / monthlyAppts : 0;
  const basePrice = laborCost + overheadPerAppt + materialCost;
  const finalPrice = profitMargin > 0 ? basePrice / (1 - profitMargin / 100) : basePrice;
  const effectiveHourly = duration > 0 ? (finalPrice / duration) * 60 : 0;

  const fmt = (n: number) => `$${n.toFixed(2)}`;

  const handleCopy = () => {
    const text = `Nail Tech Pricing Estimate\n\nService duration: ${duration} min\nMaterial cost: ${fmt(materialCost)}\nTarget hourly income: ${fmt(targetHourly)}/hr\nMonthly overhead: ${fmt(monthlyOverhead)} across ${monthlyAppts} appointments\n\nLabor cost: ${fmt(laborCost)}\nOverhead allocation: ${fmt(overheadPerAppt)}\nMaterial cost: ${fmt(materialCost)}\nBase price: ${fmt(basePrice)}${profitMargin > 0 ? `\nWith ${profitMargin}% margin: ${fmt(finalPrice)}` : ''}\n\nSuggested price: ${fmt(finalPrice)}\nEffective hourly rate: ${fmt(effectiveHourly)}/hr\n\nGenerated at getnelsy.com/tools/nail-tech-pricing-calculator`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="Free Nail Tech Pricing Calculator — Set Your Service Rates | Nelsy"
        description="Calculate what to charge for nail services. Enter your time, materials, overhead and income target. See exactly how your price is calculated — free tool for nail techs."
        canonical="/tools/nail-tech-pricing-calculator"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Tools' },
          { label: 'Pricing Calculator' },
        ]} />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-8 pb-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}>
              FREE TOOL
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 14 }}>
              Nail Tech Pricing Calculator
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
              Enter your service details and see a transparent, step-by-step breakdown of what to charge — based on your time, materials and business costs.
            </motion.p>
          </div>
        </section>

        {/* ── Calculator ── */}
        <section className="px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">

              {/* Inputs */}
              <motion.div {...fadeUp()} className="bg-white rounded-2xl border-2 border-gray-100 p-6 sm:p-7 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 mb-5">Your service details</h2>
                <div className="space-y-5">
                  <NumberInput label="Service duration" value={duration} onChange={setDuration}
                    min={5} max={300} step={5} suffix="min"
                    hint="How long does this service take, start to finish?" />
                  <NumberInput label="Material & product cost" value={materialCost} onChange={setMaterialCost}
                    min={0} step={0.50} prefix="$"
                    hint="Gel, acrylic, nail art supplies, etc. for one service." />
                  <NumberInput label="Target hourly income" value={targetHourly} onChange={setTargetHourly}
                    min={1} step={1} prefix="$" suffix="/hr"
                    hint="How much you want to earn per hour of work, before overhead." />
                  <NumberInput label="Monthly overhead costs" value={monthlyOverhead} onChange={setMonthlyOverhead}
                    min={0} step={10} prefix="$"
                    hint="Rent, software, insurance, supplies not counted above — per month." />
                  <NumberInput label="Monthly appointments" value={monthlyAppts} onChange={setMonthlyAppts}
                    min={1} step={1} suffix="appts"
                    hint="Average number of appointments you complete per month." />
                  <NumberInput label="Profit margin (optional)" value={profitMargin} onChange={setProfitMargin}
                    min={0} max={60} step={5} suffix="%"
                    hint="Add a buffer above cost. Many nail techs use 10–20%." />
                </div>
              </motion.div>

              {/* Results */}
              <motion.div {...fadeUp(0.08)}>
                <div className="bg-white rounded-2xl border-2 p-6 sm:p-7 shadow-sm mb-4" style={{ borderColor: PINK }}>
                  <h2 className="text-base font-bold text-gray-900 mb-1">Price breakdown</h2>
                  <p className="text-xs text-gray-400 mb-5">Every number shown, every step explained.</p>

                  <ResultRow
                    label="Labor cost"
                    value={fmt(laborCost)}
                    formula={`(${duration} min ÷ 60) × $${targetHourly}/hr`}
                  />
                  <ResultRow
                    label="Overhead per appointment"
                    value={fmt(overheadPerAppt)}
                    formula={`$${monthlyOverhead} overhead ÷ ${monthlyAppts} appts`}
                  />
                  <ResultRow
                    label="Materials"
                    value={fmt(materialCost)}
                  />
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <ResultRow
                      label="Base price"
                      value={fmt(basePrice)}
                      formula={`labor + overhead + materials`}
                    />
                    {profitMargin > 0 && (
                      <ResultRow
                        label={`With ${profitMargin}% margin`}
                        value={fmt(finalPrice)}
                        formula={`$${basePrice.toFixed(2)} ÷ (1 − ${profitMargin}%)`}
                      />
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t-2 border-gray-100 rounded-xl p-4 text-center"
                    style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFF 100%)' }}>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Suggested price</p>
                    <p className="text-4xl font-black mb-1" style={{ color: PINK, letterSpacing: '-0.04em' }}>
                      {fmt(finalPrice)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Effective hourly rate: <strong>{fmt(effectiveHourly)}/hr</strong>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCopy}
                  className="w-full py-3 rounded-xl border-2 text-sm font-bold transition active:scale-95"
                  style={{ borderColor: PINK, color: PINK }}
                >
                  {copied ? '✓ Copied to clipboard' : 'Copy price breakdown'}
                </button>

                <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                  This is a cost-based estimate. Your actual price should also reflect your experience, local market rates, the complexity of the specific design, and client demand. Location and skill level matter as much as the math.
                </p>
              </motion.div>
            </div>

            {/* Add to Nelsy CTA */}
            <motion.div {...fadeUp(0.1)} className="mt-8 rounded-2xl p-6 sm:p-8 text-center border border-gray-100 bg-gray-50">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Ready to set your prices on your Nelsy booking page?
              </p>
              <SeoCTA label="Add your services to Nelsy →" position="inline" className="px-7 py-3 text-white font-bold rounded-xl text-sm hover:opacity-90 transition active:scale-95" />
            </motion.div>
          </div>
        </section>

        {/* ── Explanatory content ── */}
        <section className="py-14 sm:py-20 bg-gray-50 px-4">
          <div className="max-w-3xl mx-auto prose-custom space-y-12">

            <motion.div {...fadeUp()}>
              <h2 id="how-pricing-works" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                How the pricing formula works
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The calculator uses cost-based pricing: you start with what it costs you to deliver the service, then add the profit margin you want on top. Unlike guessing or copying competitor prices, cost-based pricing ensures you're always covering your costs — and making progress toward your income goals.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                There are four components:
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Labor cost', detail: 'How much your time is worth for this service. If you target $35/hr and the service takes 60 minutes, your labor cost is $35. A 90-minute appointment costs $52.50 in labor.' },
                  { label: 'Overhead per appointment', detail: 'Your monthly fixed costs (rent, software, insurance, tools) divided by how many appointments you do. If you pay $400/month in overhead and do 40 appointments, each appointment carries $10 of overhead.' },
                  { label: 'Material cost', detail: 'The consumables used in the service — gel, acrylic, nail art supplies, gloves, prep products. Estimate per service, not per bottle.' },
                  { label: 'Profit margin (optional)', detail: 'A buffer above your break-even. At 15% margin, a $60 base price becomes $70.59. This gives you room for slow months, price stability and business reinvestment.' },
                ].map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-5 border border-gray-200">
                    <p className="font-bold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp()}>
              <h2 id="what-cost-based-doesnt-cover" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                What cost-based pricing doesn't cover
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                The calculator tells you your <strong>floor</strong> — the minimum you need to charge to cover your costs and hit your income target. But your actual market price can and often should be higher, based on:
              </p>
              <ul className="space-y-2 text-gray-600">
                {[
                  'Your local market — what nail techs in your city charge for the same service',
                  'Your experience level — a 10-year nail tech can charge more than someone 6 months in',
                  'Demand and waitlist — if you\'re fully booked, your price may be too low',
                  'Design complexity — intricate nail art takes more skill and time than a basic gel',
                  'Your niche — specialist techs (press-ons, custom nail art, extensions) command premium prices',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ backgroundColor: PINK }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mt-4">
                Use this calculator to set your floor, then research your local market to set your ceiling.
              </p>
            </motion.div>

            <motion.div {...fadeUp()}>
              <h2 id="example" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                Worked example: gel manicure
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700">Input</th>
                      <th className="text-right px-5 py-3 font-semibold text-gray-700">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Service duration', '60 min'],
                      ['Target hourly income', '$35/hr'],
                      ['Materials (gel, nail prep, etc.)', '$12'],
                      ['Monthly overhead', '$350'],
                      ['Monthly appointments', '45'],
                      ['Profit margin', '10%'],
                    ].map(([label, val]) => (
                      <tr key={label} className="border-b border-gray-50">
                        <td className="px-5 py-3 text-gray-600">{label}</td>
                        <td className="px-5 py-3 text-gray-900 font-medium text-right">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 space-y-1.5 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Labor (60/60 × $35)</span><span>$35.00</span></div>
                  <div className="flex justify-between text-gray-600"><span>Overhead ($350 ÷ 45)</span><span>$7.78</span></div>
                  <div className="flex justify-between text-gray-600"><span>Materials</span><span>$12.00</span></div>
                  <div className="flex justify-between text-gray-600"><span>Base price</span><span>$54.78</span></div>
                  <div className="flex justify-between font-bold text-gray-900 pt-1 border-t border-gray-200">
                    <span>With 10% margin</span><span style={{ color: PINK }}>$60.87</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                In this example, charging $60 covers all costs and hits the target rate. If market rates for gel manicures in your area are $70–$80, you have room to price higher without losing clients.
              </p>
            </motion.div>

            <motion.div {...fadeUp()}>
              <h2 id="faq" className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">Frequently asked questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'How do I estimate my material cost per service?',
                    a: 'Divide the cost of each supply by how many uses you get from it. A $20 bottle of gel base coat used 50 times = $0.40 per service. Add up all consumables: gel, top coat, nail prep, forms, foils, nail art supplies, gloves. Most gel manicures run $8–$20 in materials depending on complexity.',
                  },
                  {
                    q: 'What counts as overhead?',
                    a: 'Anything you pay monthly to run your business that isn\'t tied to a specific service: rent or booth fee, salon software subscriptions, insurance, phone, marketing spend, tools and equipment that aren\'t consumable. Don\'t include your personal income — that\'s captured in your target hourly rate.',
                  },
                  {
                    q: 'Should I charge the same price for every client?',
                    a: 'For standard services, consistent pricing is generally easier to manage and communicate. For add-ons, nail art complexity or longer-than-booked services, it\'s fair to charge more — but make your pricing policy clear before clients book.',
                  },
                  {
                    q: 'How often should I recalculate my prices?',
                    a: 'Revisit your pricing any time your costs change significantly — when product prices rise, when you move to a new space, when you buy new equipment, or when you raise your income target. Many nail techs review pricing annually at minimum.',
                  },
                ].map((item) => (
                  <div key={item.q} className="bg-white rounded-xl p-5 border border-gray-200">
                    <p className="font-bold text-gray-900 mb-2 text-sm">{item.q}</p>
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
              Set your prices. Add them to Nelsy.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Your Nelsy booking page shows your services and prices before clients book. Combine clear pricing with deposit collection and stop undercharging for your time.
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
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">RELATED RESOURCES</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/learn/nail-tech-pricing-guide" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Nail Tech Pricing Guide
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/nail-tech-deposits" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                How to Collect Deposits
              </Link>
              <span className="text-gray-300">·</span>
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                Nelsy — Nail Tech Booking App
              </Link>
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
