import type { LucideIcon } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ComingSoonPlaceholder({ title, description, icon: Icon }: Props) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#fde8f3] flex items-center justify-center mx-auto mb-5">
          <Icon className="w-7 h-7 text-[#F52B8C]" strokeWidth={1.6} />
        </div>
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">{title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Coming soon
        </span>
      </div>
    </div>
  );
}
