import type { LucideIcon } from 'lucide-react';
import { Mail } from 'lucide-react';

export const CREATOR_WAITLIST_HREF = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

interface Props {
  icon: LucideIcon;
  title: string;
  text: string;
  points: { icon: LucideIcon; title: string; text: string }[];
}

/** Locked state for Creator plan pages (same pattern as the Products upgrade panel). */
export function CreatorUpgradePanel({ icon: Icon, title, text, points }: Props) {
  return (
    <div className="px-4 py-8 lg:px-8 lg:py-12">
      <div className="max-w-2xl mx-auto rounded-3xl border border-gray-100 bg-gradient-to-b from-[#fff4f9] to-white p-6 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
          <Icon className="w-7 h-7 text-[#F52B8C]" strokeWidth={1.7} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#C2186F] mb-2">Creator plan</p>
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-3">{title}</h2>
        <p className="text-[15px] text-gray-600 leading-relaxed max-w-lg mx-auto mb-7">{text}</p>
        <ul className="grid sm:grid-cols-3 gap-3 text-left mb-8">
          {points.map(({ icon: PointIcon, title: t, text: d }) => (
            <li key={t} className="rounded-2xl bg-white border border-gray-100 p-4">
              <PointIcon className="w-5 h-5 text-[#F52B8C] mb-2" strokeWidth={1.8} />
              <p className="text-sm font-semibold text-[#1A1A1A]">{t}</p>
              <p className="text-[13px] text-gray-500 mt-0.5">{d}</p>
            </li>
          ))}
        </ul>
        <a
          href={CREATOR_WAITLIST_HREF}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition"
        >
          <Mail className="w-4 h-4" /> Join the waitlist
        </a>
        <p className="text-xs text-gray-400 mt-3">We will email you as soon as the Creator plan opens.</p>
      </div>
    </div>
  );
}
