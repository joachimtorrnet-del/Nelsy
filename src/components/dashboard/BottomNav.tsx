import { Home, CalendarDays, Sparkles, BarChart2, Settings } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  Icon: LucideIcon;
  badge?: number;
}

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount?: number;
}

const BASE_TABS: Tab[] = [
  { id: 'home',      label: 'Home',         Icon: Home },
  { id: 'calendar',  label: 'Bookings',     Icon: CalendarDays },
  { id: 'preview',   label: 'Studio',       Icon: Sparkles },
  { id: 'analytics', label: 'Stats',        Icon: BarChart2 },
  { id: 'settings',  label: 'More',         Icon: Settings },
];

export default function BottomNav({ activeTab, setActiveTab, pendingCount }: BottomNavProps) {
  const tabs = BASE_TABS.map((t) =>
    t.id === 'calendar' && pendingCount && pendingCount > 0
      ? { ...t, badge: Math.min(pendingCount, 99) }
      : t
  );
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around px-1 pt-2 pb-5">
        {tabs.map(({ id, label, Icon, badge }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
                active ? 'text-[#F52B8C]' : 'text-gray-400'
              }`}
            >
              <Icon
                className="w-5 h-5"
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] ${active ? 'font-bold' : 'font-normal'}`}>
                {label}
              </span>
              {badge !== undefined && (
                <div className="absolute -top-0.5 right-2 w-4 h-4 bg-[#F52B8C] text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                  {badge}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
