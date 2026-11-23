import { Link } from 'react-router-dom';
import { Mail, ShieldCheck, BookOpen } from 'lucide-react';
import SEOMeta from '@/components/SEOMeta';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';

const PINK = '#F52B8C';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Nelsy',
  url: 'https://getnelsy.com/contact',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://getnelsy.com/#organization',
    name: 'Nelsy',
    url: 'https://getnelsy.com',
    contactPoint: [
      { '@type': 'ContactPoint', email: 'support@getnelsy.com', contactType: 'customer support', availableLanguage: ['English', 'French'] },
      { '@type': 'ContactPoint', email: 'privacy@getnelsy.com', contactType: 'privacy' },
    ],
  },
};

const CHANNELS = [
  { Icon: Mail, title: 'Support and questions', text: 'Help with your account, bookings, payments or your page.', email: 'support@getnelsy.com' },
  { Icon: ShieldCheck, title: 'Privacy and data', text: 'Requests about your personal data or your clients’ data.', email: 'privacy@getnelsy.com' },
];

export default function Contact() {
  return (
    <>
      <SEOMeta
        title="Contact Nelsy"
        description="Contact the Nelsy team: support for beauty pros and creators using Nelsy for bookings, payments and their online store, and privacy requests."
        canonical="/contact"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <main className="bg-[#FFFBFB] min-h-screen pt-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PINK }}>Contact</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-4">Talk to the Nelsy team</h1>
          <p className="text-gray-500 text-lg mb-10 max-w-xl">
            Nelsy is the booking and online store platform for beauty pros and creators. Write to us and a real person will reply, in English or French.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {CHANNELS.map(({ Icon, title, text, email }) => (
              <a key={email} href={`mailto:${email}`} className="block bg-white rounded-2xl border border-gray-200 p-6 hover:border-pink-300 transition">
                <Icon className="w-5 h-5 mb-3" style={{ color: PINK }} />
                <p className="font-bold text-gray-900 mb-1">{title}</p>
                <p className="text-sm text-gray-500 mb-3">{text}</p>
                <p className="text-sm font-semibold" style={{ color: PINK }}>{email}</p>
              </a>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-start gap-3">
            <BookOpen className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: PINK }} />
            <p className="text-sm text-gray-600 leading-relaxed">
              Looking for answers first? Browse the <Link to="/blog" className="underline" style={{ color: PINK }}>Nelsy blog</Link>, the <Link to="/tools" className="underline" style={{ color: PINK }}>free tools</Link> and <Link to="/pricing" className="underline" style={{ color: PINK }}>pricing</Link>.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
