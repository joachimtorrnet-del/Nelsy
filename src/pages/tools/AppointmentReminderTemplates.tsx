import { useState } from 'react';
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
    name: 'Nail Tech Appointment Reminder Templates',
    description: 'Free appointment reminder message templates for nail techs. Copy-paste text, DM, and email reminders for confirmation, 24-hour reminder, and follow-up.',
    url: 'https://getnelsy.com/tools/nail-tech-appointment-reminder-templates',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://getnelsy.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Appointment Reminder Templates', item: 'https://getnelsy.com/tools/nail-tech-appointment-reminder-templates' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When should I send an appointment reminder to nail clients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Send a booking confirmation immediately after booking, a 48-hour reminder two days before the appointment, and a 24-hour reminder the day before. For high-value or long appointments (gel-x, full sets), a same-day morning reminder can also reduce no-shows.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does sending appointment reminders actually reduce no-shows?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Most nail techs who add a 24-hour reminder see fewer no-shows and last-minute cancellations. Reminders also give clients enough notice to reschedule rather than simply not showing up, which means you can often fill the slot.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I text or DM clients for appointment reminders?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Text (SMS) has higher open rates than DMs for reminders, but use the channel your client already uses to book with you. If they booked via Instagram DM, remind them there. If they have your number, SMS works well.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should an appointment reminder include?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Include: the client\'s name, the service booked, the date and time, your location or address, your cancellation policy notice period, and a way to confirm or reschedule. Keep it short — one paragraph is enough.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I automate appointment reminders as a nail tech?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Booking apps like Nelsy send confirmation and reminder messages automatically when a client books. You write the template once and the app sends it at the right time without any manual effort.',
        },
      },
    ],
  },
];

type Channel = 'text' | 'dm' | 'email';
type ReminderType = 'confirmation' | 'reminder48' | 'reminder24' | 'followup' | 'reschedule';

interface Config {
  yourName: string;
  salonName: string;
  address: string;
  cancelHours: string;
  depositRequired: boolean;
  bookingLink: string;
}

const DEFAULTS: Config = {
  yourName: '',
  salonName: '',
  address: '',
  cancelHours: '24',
  depositRequired: false,
  bookingLink: '',
};

interface Template {
  id: ReminderType;
  label: string;
  timing: string;
  channel: Channel;
  generate: (c: Config) => string;
}

const name = (c: Config) => c.yourName || 'Your Name';
const salon = (c: Config) => c.salonName || 'my studio';
const addr = (c: Config) => c.address || 'my studio';
const link = (c: Config) => c.bookingLink || 'my booking page';

const TEMPLATES: Template[] = [
  {
    id: 'confirmation',
    label: 'Booking Confirmation',
    timing: 'Immediately after booking',
    channel: 'text',
    generate: (c) =>
      `Hi [Client Name]! 🎀 This is ${name(c)} from ${salon(c)}. Your appointment is confirmed for [Date] at [Time].\n\n📍 Location: ${addr(c)}\n💅 Service: [Service Name]\n${c.depositRequired ? '\nYour deposit has been received — thank you!\n' : ''}\nPlease cancel or reschedule at least ${c.cancelHours} hours in advance. Reply to this message if you need to make changes.\n\nSee you soon! 🩷`,
  },
  {
    id: 'reminder48',
    label: '48-Hour Reminder',
    timing: '2 days before appointment',
    channel: 'text',
    generate: (c) =>
      `Hi [Client Name]! Friendly reminder from ${name(c)} — your appointment is coming up on [Date] at [Time] at ${addr(c)}.\n\nIf you need to reschedule, please let me know at least ${c.cancelHours} hours before. Looking forward to seeing you! 🩷`,
  },
  {
    id: 'reminder24',
    label: '24-Hour Reminder',
    timing: 'Day before appointment',
    channel: 'text',
    generate: (c) =>
      `Hi [Client Name]! Just a reminder — you have an appointment with ${name(c)} tomorrow at [Time].\n\n📍 ${addr(c)}\n\nIf anything has come up, please message me ASAP so I can offer the slot to someone else. Can't wait to see you! 💅`,
  },
  {
    id: 'followup',
    label: 'Post-Appointment Follow-Up',
    timing: '1–2 days after appointment',
    channel: 'dm',
    generate: (c) =>
      `Hi [Client Name]! 🩷 It was so lovely to have you in! I hope you’re loving your nails.\n\nIf you have a chance, I’d really appreciate a review or a tag if you share a photo — it means the world to a small business like mine.\n\n${c.bookingLink ? `You can rebook anytime here: ${link(c)}` : `Message me when you’re ready to book your next appointment!`}\n\nThank you so much! — ${name(c)} ✨`,
  },
  {
    id: 'reschedule',
    label: 'Reschedule Request',
    timing: 'When you need to move an appointment',
    channel: 'text',
    generate: (c) =>
      `Hi [Client Name], this is ${name(c)} from ${salon(c)}. I’m so sorry — I need to reschedule your appointment on [Date] at [Time] due to [brief reason].\n\nI’d love to get you in as soon as possible. ${c.bookingLink ? `You can pick a new time here: ${link(c)}` : `Please message me back with a few times that work for you.`}\n\nSorry for any inconvenience and thank you for understanding! 💗`,
  },
];

const DM_VARIANTS: Partial<Record<ReminderType, (c: Config) => string>> = {
  confirmation: (c: Config) =>
    `Hey [Client Name]! 🎀 Just confirming your booking with ${name(c)} for [Service] on [Date] at [Time].\n\n${c.depositRequired ? `Your deposit is secured 💗\n\n` : ``}Heads up: cancellations need ${c.cancelHours}+ hours notice. DM me if anything changes!\n\nCan’t wait! ✨`,
  reminder24: (c: Config) =>
    `Hey [Client Name]! 🩷 See you tomorrow at [Time]! If anything has come up DM me ASAP — I want to give you as much notice as possible if the slot needs to go to someone else.\n\n${addr(c)} — see you soon! 💅`,
};

const EMAIL_VARIANT = (c: Config, type: ReminderType): string => {
  const subject: Record<ReminderType, string> = {
    confirmation: `Your nail appointment is confirmed — ${salon(c)}`,
    reminder48: `Your appointment is in 2 days`,
    reminder24: `Reminder: appointment tomorrow`,
    followup: `Thank you for visiting ${salon(c)}!`,
    reschedule: `Your appointment needs to be rescheduled`,
  };
  return `Subject: ${subject[type]}\n\nHi [Client Name],\n\n${TEMPLATES.find((t) => t.id === type)?.generate(c) ?? ''}\n\nBest,\n${name(c)}\n${salon(c)}`;
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button
      onClick={handleCopy}
      className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors"
      style={copied ? { background: PINK, color: '#fff', borderColor: PINK } : { color: PINK, borderColor: PINK }}
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  );
}

export default function AppointmentReminderTemplates() {
  const [config, setConfig] = useState<Config>(DEFAULTS);
  const [channel, setChannel] = useState<Channel>('text');
  const [activeTab, setActiveTab] = useState<ReminderType>('confirmation');

  function set(key: keyof Config, value: string | boolean) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function getTemplateText(t: Template): string {
    if (channel === 'email') return EMAIL_VARIANT(config, t.id);
    if (channel === 'dm') {
      const dm = DM_VARIANTS[t.id];
      return typeof dm === 'function' ? dm(config) : t.generate(config);
    }
    return t.generate(config);
  }

  const activeTemplate = TEMPLATES.find((t) => t.id === activeTab)!;
  const previewText = getTemplateText(activeTemplate);

  return (
    <>
      <SEOMeta
        title="Nail Tech Appointment Reminder Templates — Free Copy-Paste Messages"
        description="Free appointment reminder templates for nail techs. Copy-paste text, DM, and email reminders for booking confirmation, 24-hour reminder, and follow-up. Personalise with your name and send instantly."
        canonical="/tools/nail-tech-appointment-reminder-templates"
        jsonLd={JSON_LD}
      />
      <SiteNav />

      <main className="bg-[#FFFBFB] min-h-screen">
        {/* Hero */}
        <section className="pt-16 pb-10 px-4 max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'Appointment Reminder Templates' }]} />
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1A1A] mt-4 mb-3">
              Nail Tech Appointment Reminder Templates
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Free copy-paste reminders for every stage of the client journey — confirmation, 24-hour reminder, follow-up, and more. Personalise with your name and send instantly.
            </p>
          </motion.div>
        </section>

        {/* Tool */}
        <section className="px-4 pb-16 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[300px_1fr] gap-8">
            {/* Config panel */}
            <motion.div {...fadeUp(0.1)} className="space-y-5">
              <div className="bg-white rounded-2xl border border-[#F4C2C2]/50 p-5 shadow-sm">
                <h2 className="font-serif text-base font-semibold text-[#1A1A1A] mb-4">Personalise</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Your name</label>
                    <input
                      type="text"
                      placeholder="e.g. Maya"
                      value={config.yourName}
                      onChange={(e) => set('yourName', e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#F52B8C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Studio / business name</label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Nails"
                      value={config.salonName}
                      onChange={(e) => set('salonName', e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#F52B8C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Location / address</label>
                    <input
                      type="text"
                      placeholder="e.g. 12 Rose St, London"
                      value={config.address}
                      onChange={(e) => set('address', e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#F52B8C]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Cancellation notice required</label>
                    <select
                      value={config.cancelHours}
                      onChange={(e) => set('cancelHours', e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#F52B8C]"
                    >
                      <option value="12">12 hours</option>
                      <option value="24">24 hours</option>
                      <option value="48">48 hours</option>
                      <option value="72">72 hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Booking link (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. getnelsy.com/maya"
                      value={config.bookingLink}
                      onChange={(e) => set('bookingLink', e.target.value)}
                      className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#F52B8C]"
                    />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.depositRequired}
                      onChange={(e) => set('depositRequired', e.target.checked)}
                      className="accent-[#F52B8C] w-4 h-4"
                    />
                    <span className="text-xs font-medium text-gray-600">I collect deposits</span>
                  </label>
                </div>
              </div>

              {/* Channel selector */}
              <div className="bg-white rounded-2xl border border-[#F4C2C2]/50 p-5 shadow-sm">
                <h2 className="font-serif text-base font-semibold text-[#1A1A1A] mb-3">Channel</h2>
                <div className="flex flex-col gap-2">
                  {(['text', 'dm', 'email'] as Channel[]).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setChannel(ch)}
                      className="text-left text-sm px-3 py-2 rounded-lg font-medium transition-colors"
                      style={
                        channel === ch
                          ? { background: '#FDF0F7', color: PINK, border: `1.5px solid ${PINK}` }
                          : { color: '#555', border: '1.5px solid #e5e7eb' }
                      }
                    >
                      {ch === 'text' && '💬 SMS / Text'}
                      {ch === 'dm' && '📩 Instagram DM'}
                      {ch === 'email' && '✉️ Email'}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Template viewer */}
            <motion.div {...fadeUp(0.15)}>
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                    style={
                      activeTab === t.id
                        ? { background: PINK, color: '#fff' }
                        : { background: '#F7F3F3', color: '#555' }
                    }
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Preview card */}
              <div className="bg-white rounded-2xl border border-[#F4C2C2]/50 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-[#F4C2C2]/30 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">{activeTemplate.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Send: {activeTemplate.timing}</p>
                  </div>
                  <CopyButton text={previewText} />
                </div>
                <pre className="px-5 py-5 text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {previewText}
                </pre>
              </div>

              <p className="text-xs text-gray-400 mt-3 px-1">
                Replace <span className="font-mono bg-gray-100 px-1 rounded">[Client Name]</span>, <span className="font-mono bg-gray-100 px-1 rounded">[Date]</span>, <span className="font-mono bg-gray-100 px-1 rounded">[Time]</span>, and <span className="font-mono bg-gray-100 px-1 rounded">[Service Name]</span> with the actual details before sending.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Inline CTA — automate */}
        <section className="px-4 pb-16 max-w-3xl mx-auto">
          <motion.div
            {...fadeUp()}
            className="rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #FDF0F7 0%, #FFF5FB 100%)', border: `1.5px solid #F4C2C2` }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: PINK }}>Stop doing this manually</p>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">
              Let Nelsy send these automatically
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Set up your reminder templates once. Nelsy sends the confirmation, 24-hour reminder, and follow-up for every booking — no copy-paste, no forgetting.
            </p>
            <SeoCTA label="Send reminders automatically →" position="inline" variant="primary" />
          </motion.div>
        </section>

        {/* Guide content */}
        <section className="px-4 pb-16 max-w-3xl mx-auto space-y-12">

          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">Why appointment reminders matter for nail techs</h2>
            <p className="text-gray-700 mb-4">
              No-shows and same-day cancellations are the most common reason nail techs lose income. A slot that sits empty costs the same as a slot you never sold — but it's worse, because you turned away other clients to hold it.
            </p>
            <p className="text-gray-700 mb-4">
              The single highest-leverage thing most nail techs can add to their workflow is a 24-hour reminder message. It gives clients enough notice to reschedule rather than ghost, which means you can often fill the slot with someone from your waitlist.
            </p>
            <p className="text-gray-700">
              Reminders also reduce the "I forgot" no-show — a client who genuinely didn't mean to miss. A quick text the day before turns most of those into on-time arrivals.
            </p>
          </motion.div>

          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">The reminder sequence that works</h2>
            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Booking confirmation (immediately)',
                  body: 'Sent right after the client books. This sets expectations: what service, when, where, and your cancellation policy. Clients reference this message when they\'re looking for the address or time — keep it clear and complete.',
                },
                {
                  step: '2',
                  title: '48-hour reminder (optional but valuable)',
                  body: 'For clients who book weeks in advance, a 48-hour heads-up is a low-effort way to catch conflicts early. If someone needs to reschedule, you want to know 48 hours out — not 2 hours before.',
                },
                {
                  step: '3',
                  title: '24-hour reminder (the most important)',
                  body: 'This is the one message most nail techs don\'t send and most regret not sending. It\'s the last real opportunity to fill a slot if someone cancels. Make it short, friendly, and easy to reply to.',
                },
                {
                  step: '4',
                  title: 'Post-appointment follow-up (1–2 days after)',
                  body: 'A brief thank-you message + rebooking prompt. Clients who book their next appointment within a week of their current one are significantly more likely to become regulars. This message is the nudge.',
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 p-4 bg-white rounded-xl border border-[#F4C2C2]/30">
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                    style={{ background: '#FDF0F7', color: PINK }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">SMS vs Instagram DM vs email</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-[#F4C2C2]/40">
                    <th className="text-left py-2 pr-4 font-semibold text-[#1A1A1A]">Channel</th>
                    <th className="text-left py-2 pr-4 font-semibold text-[#1A1A1A]">Best for</th>
                    <th className="text-left py-2 font-semibold text-[#1A1A1A]">Watch out for</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4C2C2]/20">
                  {[
                    ['SMS / Text', 'Confirmations, 24-hour reminders — highest open rate', 'Requires client\'s mobile number; some clients prefer not to share'],
                    ['Instagram DM', 'Clients who booked via DM, follow-up and rebook prompts', 'DMs can get buried; not ideal if you have many clients'],
                    ['Email', 'Detailed confirmations with service info, directions', 'Lower open rate for reminders; better for receipts'],
                  ].map(([ch, best, watch]) => (
                    <tr key={ch}>
                      <td className="py-3 pr-4 font-medium text-[#1A1A1A]">{ch}</td>
                      <td className="py-3 pr-4 text-gray-600">{best}</td>
                      <td className="py-3 text-gray-600">{watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">How to use these templates</h2>
            <ol className="space-y-3 text-gray-700">
              {[
                'Fill in your name, studio, and address in the "Personalise" panel above.',
                'Choose your preferred channel (SMS, DM, or Email).',
                'Click the template type you need and hit Copy.',
                'Paste into your message app and replace [Client Name], [Date], [Time], and [Service Name] before sending.',
                'Consider saving each message as a saved reply or note so you can send faster.',
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 font-bold text-sm" style={{ color: PINK }}>{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-gray-600 text-sm">
              If you find yourself copying and pasting every day,{' '}
              <Link to="/best-booking-app-for-nail-techs" className="underline" style={{ color: PINK }}>
                a booking app
              </Link>{' '}
              that automates reminders will save you significant time. Nelsy sends these messages automatically at the right time for every booking.
            </p>
          </motion.div>

          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-4">Reminders work best alongside a deposit policy</h2>
            <p className="text-gray-700 mb-3">
              Reminders reduce accidental no-shows. A{' '}
              <Link to="/nail-tech-deposits" className="underline" style={{ color: PINK }}>
                deposit policy
              </Link>{' '}
              protects you from intentional ones. Together, they're the two highest-leverage policies a nail tech can have.
            </p>
            <p className="text-gray-700 mb-3">
              A client who has paid a £20 deposit is far less likely to ghost than one who has nothing at stake. And if they do cancel, you've already covered part of the lost income.
            </p>
            <p className="text-gray-700">
              See our guide on{' '}
              <Link to="/learn/nail-tech-deposit-policy" className="underline" style={{ color: PINK }}>
                how to set a deposit policy as a nail tech
              </Link>{' '}
              for exact amounts, scripts for introducing deposits to existing clients, and how to handle objections.
            </p>
          </motion.div>

          {/* FAQ */}
          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'When should I send an appointment reminder to nail clients?',
                  a: 'Send a booking confirmation immediately after booking, a 48-hour reminder two days before, and a 24-hour reminder the day before. For long appointments (gel-x, full sets), a same-day morning message can also help.',
                },
                {
                  q: 'Does sending appointment reminders actually reduce no-shows?',
                  a: 'Yes. Most nail techs who add a 24-hour reminder see fewer no-shows. Reminders also give clients time to reschedule rather than ghost, which means you can often fill the slot from a waitlist.',
                },
                {
                  q: 'Should I text or DM clients for reminders?',
                  a: 'Use the channel your client already uses to contact you. SMS has higher open rates for reminders, but if they booked via Instagram DM, reply there.',
                },
                {
                  q: 'Can I automate appointment reminders as a nail tech?',
                  a: 'Yes. Booking apps like Nelsy send confirmation and reminder messages automatically when a client books. You write the template once and the app handles delivery.',
                },
              ].map((item, i) => (
                <details key={i} className="group bg-white rounded-xl border border-[#F4C2C2]/30 p-4 cursor-pointer">
                  <summary className="font-semibold text-[#1A1A1A] text-sm list-none flex items-center justify-between gap-3">
                    {item.q}
                    <span className="text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </motion.div>

          {/* Related links */}
          <motion.div {...fadeUp()} className="border-t border-[#F4C2C2]/30 pt-10">
            <h2 className="font-serif text-lg font-bold text-[#1A1A1A] mb-4">Related guides &amp; tools</h2>
            <ul className="space-y-2 text-sm">
              {[
                ['/nail-tech-deposits', 'How to take deposits as a nail tech'],
                ['/learn/nail-tech-deposit-policy', 'Setting a deposit policy: amounts, scripts, objections'],
                ['/tools/nail-tech-cancellation-policy-generator', 'Free cancellation policy generator'],
                ['/learn/how-to-get-more-nail-clients', 'How to get more nail clients'],
                ['/best-booking-app-for-nail-techs', 'Best booking apps for nail techs (2025 comparison)'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link to={href} className="underline" style={{ color: PINK }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* Footer CTA */}
        <section className="px-4 pb-20 max-w-2xl mx-auto text-center">
          <motion.div {...fadeUp()}>
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mb-3">Never manually send a reminder again</h2>
            <p className="text-gray-600 mb-6">
              Nelsy sends booking confirmations, reminders, and follow-ups automatically for every appointment. Set it up once.
            </p>
            <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary" />
          </motion.div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
