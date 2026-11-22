import { useState } from 'react';
import { ChevronDown, Sparkles, CreditCard, CalendarDays, Share2, Mail, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Guide {
  icon: LucideIcon;
  title: string;
  steps: string[];
  cta: { label: string; tab: string };
}

const GUIDES: Guide[] = [
  {
    icon: Sparkles,
    title: 'Build your studio page',
    steps: [
      'Open My Studio and tap Edit profile to add your photo, cover, bio and studio URL.',
      'Add your services with a price, duration and optional deposit.',
      'Pick a template and accent color in the Design tab.',
      'Use Preview to see the page exactly as your clients will.',
    ],
    cta: { label: 'Go to My Studio', tab: 'preview' },
  },
  {
    icon: CalendarDays,
    title: 'Set your opening hours',
    steps: [
      'Open Settings, then Availability.',
      'Turn on the days you work and set your start and end times.',
      'Clients can only book slots inside these hours, and never on top of an existing booking.',
    ],
    cta: { label: 'Go to Settings', tab: 'settings' },
  },
  {
    icon: CreditCard,
    title: 'Get paid',
    steps: [
      'Open Payments and connect your Stripe account. It takes a few minutes and asks for your ID and bank details.',
      'Once Stripe approves your account, clients can pay deposits when they book.',
      'Money lands in your balance. Withdraw it to your bank from Income whenever you want.',
    ],
    cta: { label: 'Set up payments', tab: 'stripe' },
  },
  {
    icon: Share2,
    title: 'Share your link',
    steps: [
      'Copy your studio link from the top of the dashboard.',
      'Put it in your Instagram and TikTok bio.',
      'Send it to clients by DM or text instead of booking them by hand.',
    ],
    cta: { label: 'Back to Home', tab: 'home' },
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Does Nelsy take a commission on my bookings?',
    a: 'No. Nelsy takes 0% commission. You pay your monthly or yearly plan, and Stripe charges its standard card processing fee on each payment.',
  },
  {
    q: 'When do I receive my money?',
    a: 'Payments go to your Stripe balance. Once funds are available, open Income and request a payout to your bank account.',
  },
  {
    q: 'Why can\'t clients pay on my page?',
    a: 'Payments only work once your Stripe account is fully verified. Open Payments to see what Stripe still needs from you.',
  },
  {
    q: 'What happens if a client starts booking but doesn\'t pay?',
    a: 'The slot is held for a short time while they pay. If the payment isn\'t completed, the slot is released automatically so another client can book it.',
  },
  {
    q: 'How do I change my studio URL?',
    a: 'Open My Studio, tap Edit profile and change the Studio URL field. Your old link stops working, so update it in your bios.',
  },
  {
    q: 'Can I reschedule or cancel a booking?',
    a: 'Yes. Open Bookings, select the appointment and choose Reschedule or Cancel.',
  },
  {
    q: 'How do I export my client list?',
    a: 'Open Customers and use Export CSV. You get every client with their contact details, visits and total booked.',
  },
];

export default function Help({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="px-4 py-6 lg:px-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-1">Getting started</h2>
        <p className="text-sm text-gray-500">Four steps to take your first booking.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {GUIDES.map((g, i) => (
          <div key={g.title} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#fde8f3] flex items-center justify-center">
                <g.icon className="w-5 h-5 text-[#F52B8C]" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Step {i + 1}</p>
                <h3 className="font-bold text-[#1A1A1A]">{g.title}</h3>
              </div>
            </div>
            <ol className="space-y-2 mb-5 flex-1">
              {g.steps.map((s, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{j + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
            <button
              onClick={() => onNavigate?.(g.cta.tab)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F52B8C] hover:opacity-80 transition self-start"
            >
              {g.cta.label} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Frequently asked questions</h2>
      <div className="bg-white border border-gray-100 rounded-2xl divide-y divide-gray-100 mb-10">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:bg-[#fff8fa]"
              >
                <span className="text-sm font-semibold text-[#1A1A1A]">{item.q}</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <p className="px-5 pb-4 -mt-1 text-sm text-gray-600 leading-relaxed">{item.a}</p>}
            </div>
          );
        })}
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white mb-1">Still stuck?</h3>
          <p className="text-sm text-white/60">Write to us and we'll help you get set up.</p>
        </div>
        <a
          href="mailto:support@getnelsy.com"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#1A1A1A] text-sm font-bold hover:bg-gray-100 transition"
        >
          <Mail className="w-4 h-4" /> support@getnelsy.com
        </a>
      </div>
    </div>
  );
}
