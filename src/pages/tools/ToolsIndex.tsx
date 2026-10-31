import { Link } from 'react-router-dom';
import { Calculator, ShieldCheck, BellRing } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';

const PINK = '#F52B8C';

const TOOLS = [
  {
    Icon: Calculator,
    title: 'Pricing Calculator',
    description: 'Calculate the right prices for your services based on your costs and target income.',
    href: '/tools/nail-tech-pricing-calculator',
  },
  {
    Icon: ShieldCheck,
    title: 'Cancellation Policy Generator',
    description: 'Generate a professional cancellation policy for your booking page in seconds.',
    href: '/tools/nail-tech-cancellation-policy-generator',
  },
  {
    Icon: BellRing,
    title: 'Appointment Reminder Templates',
    description: 'Copy-paste reminder messages that reduce no-shows and keep clients informed.',
    href: '/tools/nail-tech-appointment-reminder-templates',
  },
];

export default function ToolsIndex() {
  return (
    <>
      <SEOMeta
        title="Free Tools for Beauty Professionals | Nelsy"
        description="Free calculators, generators and templates to help you run a better beauty business."
        canonical="/tools"
      />
      <SiteNav />
      <div className="bg-[#FFFBFB] min-h-screen pt-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PINK }}>
            Free tools
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">
            Tools to grow your business
          </h1>
          <p className="text-gray-500 text-lg mb-12 max-w-lg">
            Free calculators, generators and templates — no signup required.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                to={t.href}
                className="group block bg-white rounded-2xl border border-[#F4C2C2]/40 p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FFF5F9] flex items-center justify-center mb-4 group-hover:bg-[#FFE5F3] transition-colors">
                  <t.Icon size={16} strokeWidth={1.6} style={{ color: PINK }} />
                </div>
                <h2 className="font-semibold text-[#1A1A1A] text-base mb-1 group-hover:text-[#F52B8C] transition-colors">
                  {t.title}
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed">{t.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
