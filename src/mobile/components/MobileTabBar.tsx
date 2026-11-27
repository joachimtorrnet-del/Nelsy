import { NavLink } from 'react-router-dom';
import { CalendarDays, Eye, Home, Settings, Store } from 'lucide-react';
import { PINK } from '../lib/constants';

const TABS = [
  { to: '/home', label: 'Home', Icon: Home },
  { to: '/bookings', label: 'Bookings', Icon: CalendarDays },
  { to: '/studio', label: 'Studio', Icon: Store },
  { to: '/preview', label: 'Preview', Icon: Eye },
  { to: '/settings', label: 'Settings', Icon: Settings },
];

export function MobileTabBar() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 pb-safe"
      style={{ backgroundColor: PINK }}
      aria-label="Main"
    >
      <ul className="flex h-[60px] items-stretch px-1">
        {TABS.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex h-full min-h-[44px] flex-col items-center justify-center gap-1 text-white transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-65'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={23} strokeWidth={isActive ? 2.5 : 2} />
                  <span className={`text-[11px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
