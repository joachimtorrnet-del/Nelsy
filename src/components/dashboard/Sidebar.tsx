import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Calendar,
  Sparkles,
  CreditCard,
  Wallet,
  Settings,
  Copy,
  CheckCheck,
  LogOut,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const navItems = [
  { to: '/dashboard', icon: Home, label: 'Accueil', end: true },
  { to: '/dashboard/calendar', icon: Calendar, label: 'Agenda' },
  { to: '/dashboard/services', icon: Sparkles, label: 'Services' },
  { to: '/dashboard/stripe', icon: CreditCard, label: 'Paiements' },
  { to: '/dashboard/cash-out', icon: Wallet, label: 'Cash Out' },
  { to: '/dashboard/settings', icon: Settings, label: 'Réglages' },
];

const studioUrl = 'nelsy.app/studio-maya';

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(studioUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div className="h-full flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
        <span className="text-2xl font-black text-espresso">Nelsy</span>
        {onMobileClose && (
          <button onClick={onMobileClose} className="lg:hidden p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onMobileClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Studio link */}
      <div className="border-t border-gray-100 pt-4 mt-4">
        <p className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Mon studio</p>
        <div className="bg-gray-50 rounded-2xl p-3">
          <p className="text-xs text-gray-500 mb-2 truncate font-medium">{studioUrl}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-colors ${
              copied
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-white border border-gray-200 text-gray-700 hover:border-purple-200'
            }`}
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copié !' : 'Copier mon lien'}
          </motion.button>
        </div>

        <button
          onClick={async () => {
            if (supabase) await supabase.auth.signOut();
            navigate('/login');
          }}
          className="flex items-center gap-2 mt-3 px-3 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors w-full rounded-xl hover:bg-gray-50"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onMobileClose}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative w-72 bg-white h-full shadow-2xl"
          >
            {content}
          </motion.aside>
        </div>
      )}
    </>
  );
}
