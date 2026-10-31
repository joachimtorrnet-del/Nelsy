import { Link } from 'react-router-dom';
import {
  Calendar, Wallet, CreditCard, Gift, Layers,
  Link2, MessageCircle, Mail, UserPlus,
  UsersRound, BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const PINK = '#F52B8C';

const FEATURE_MAP: Record<string, {
  title: string;
  desc: string;
  route: string;
  icon: LucideIcon;
}> = {
  bookings: {
    title: 'Online Booking',
    desc: 'Let clients book your services 24/7 without DMs.',
    route: '/features/bookings',
    icon: Calendar,
  },
  deposits: {
    title: 'Deposits',
    desc: 'Collect deposits at booking to protect your time.',
    route: '/features/deposits',
    icon: Wallet,
  },
  payments: {
    title: 'Payments',
    desc: 'Get paid for every appointment, seamlessly.',
    route: '/features/payments',
    icon: CreditCard,
  },
  'gift-cards': {
    title: 'Gift Cards',
    desc: 'Sell gift cards directly from your page.',
    route: '/features/gift-cards',
    icon: Gift,
  },
  packages: {
    title: 'Packages',
    desc: 'Bundle your services into irresistible offers.',
    route: '/features/packages',
    icon: Layers,
  },
  'link-in-bio': {
    title: 'Link in Bio',
    desc: 'One link that shows your entire beauty business.',
    route: '/features/link-in-bio',
    icon: Link2,
  },
  'instagram-autodm': {
    title: 'Instagram AutoDM',
    desc: 'Turn Instagram comments into confirmed bookings.',
    route: '/features/instagram-autodm',
    icon: MessageCircle,
  },
  email: {
    title: 'Email & Newsletters',
    desc: 'Message your client list directly, without algorithms.',
    route: '/features/email-newsletters',
    icon: Mail,
  },
  'audience-capture': {
    title: 'Audience Capture',
    desc: 'Own your audience beyond social media.',
    route: '/features/audience-capture',
    icon: UserPlus,
  },
  crm: {
    title: 'CRM & Clients',
    desc: 'Know your clients and grow your repeat business.',
    route: '/features/crm',
    icon: UsersRound,
  },
  analytics: {
    title: 'Analytics',
    desc: 'Understand your bookings, income, and trends.',
    route: '/features/analytics',
    icon: BarChart3,
  },
};

interface RelatedFeaturesProps {
  slugs: string[];
  heading?: string;
}

export default function RelatedFeatures({
  slugs,
  heading = 'Related Nelsy features',
}: RelatedFeaturesProps) {
  const features = slugs
    .map(s => ({ slug: s, ...FEATURE_MAP[s] }))
    .filter(f => f.title);

  if (features.length === 0) return null;

  return (
    <section className="mt-10">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">
        Nelsy tools
      </p>
      <h2 className="font-serif text-xl font-bold text-[#1A1A1A] mb-5">{heading}</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {features.map(f => {
          const Icon = f.icon;
          return (
            <Link
              key={f.slug}
              to={f.route}
              className="group flex items-start gap-3 bg-white border border-[#F4C2C2]/40 rounded-xl p-4 transition-all hover:border-[#F52B8C]/40 hover:shadow-sm"
            >
              <span
                className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg"
                style={{ background: `${PINK}10` }}
              >
                <Icon size={16} strokeWidth={1.75} color={PINK} />
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-semibold text-[#1A1A1A] group-hover:text-[#F52B8C] transition-colors leading-snug">
                  {f.title}
                </p>
                <p className="mt-0.5 text-[12px] text-gray-500 leading-snug">{f.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
