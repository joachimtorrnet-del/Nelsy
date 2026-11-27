import { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, ChevronRight, CreditCard, ExternalLink, FileText, Globe, LifeBuoy, Plug, User, Users, Wallet } from 'lucide-react';
import { tierFromProfilePlan, PLANS, hasFeature } from '@/lib/plans';
import { timezoneCity } from '@/lib/timezone';
import { useProData } from '../hooks/useProData';
import { DemoBanner, ScreenTitle, Toggle } from '../components/ui';
import { TimezoneBanner } from '../components/TimezoneBanner';
import { APP_BUILD, APP_VERSION, SUPPORT_EMAIL, WEB } from '../lib/constants';
import { isNative, openExternal } from '../lib/native';
import { fmtShortDate } from '../lib/format';
import { planLinksAllowed } from '../lib/storePolicy';
import { PUSH_PREF_KEY } from '../lib/push';
import type { PushKind } from '../lib/push';

const PUSH_KINDS: { id: PushKind; label: string; sub: string; creator?: boolean }[] = [
  { id: 'new_booking', label: 'New booking', sub: 'When a client books you' },
  { id: 'payment', label: 'Payments', sub: 'Deposits, full payments and product sales' },
  { id: 'cancellation', label: 'Cancellations', sub: 'When a booking is cancelled or refunded' },
  { id: 'lead', label: 'New leads', sub: 'When someone downloads a free resource', creator: true },
];

const STATUS_LABEL: Record<string, string> = {
  trial: 'Free trial',
  trialing: 'Free trial',
  active: 'Active',
  past_due: 'Payment issue',
  cancelled: 'Cancelled',
  inactive: 'Not started',
  incomplete: 'Not started',
};

function Card({ icon, title, children, defaultOpen = false }: { icon: ReactNode; title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="mx-4 mb-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="flex min-h-[56px] w-full items-center gap-3 px-4 text-left">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0F7] text-[#F52B8C]">{icon}</span>
        <span className="flex-1 text-[16px] font-bold">{title}</span>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="border-t border-gray-100 px-4 py-1">{children}</div>}
    </section>
  );
}

function Row({ icon, label, value, onClick, to, external }: { icon?: ReactNode; label: string; value?: string; onClick?: () => void; to?: string; external?: boolean }) {
  const inner = (
    <>
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold">{label}</span>
        {value && <span className="block truncate text-[13px] text-gray-500">{value}</span>}
      </span>
      {external ? <ExternalLink size={16} className="text-gray-300" /> : <ChevronRight size={18} className="text-gray-300" />}
    </>
  );
  const cls = 'flex min-h-[56px] w-full items-center gap-3 text-left';
  return to ? (
    <Link to={to} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

function ToggleRow({ label, sub, checked, onChange }: { label: string; sub: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex min-h-[60px] items-center gap-3">
      <div className="flex-1">
        <p className="text-[15px] font-semibold">{label}</p>
        <p className="text-[13px] text-gray-500">{sub}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={label} />
    </div>
  );
}

export default function Settings() {
  const { data, signOut, setNotificationPref } = useProData();
  const [saveError, setSaveError] = useState(false);

  if (!data) return null;
  const prefs = data.notificationPrefs;
  const on = (key: string) => prefs[key] !== false;
  const set = async (key: string, value: boolean) => {
    setSaveError(false);
    if (!(await setNotificationPref(key, value))) setSaveError(true);
  };

  const tier = tierFromProfilePlan(data.plan);
  const planName = tier ? PLANS[tier].name : 'No plan yet';
  const status = STATUS_LABEL[data.subscriptionStatus ?? ''] ?? 'Not started';
  const trial = data.subscriptionStatus === 'trialing' || data.subscriptionStatus === 'trial';
  const renew = data.planRenewsAt ? `${trial ? 'Trial ends' : 'Renews'} ${fmtShortDate(data.planRenewsAt)}` : null;
  const creator = hasFeature(data.plan, 'digital_products');

  return (
    <div className="pb-8">
      <ScreenTitle>Settings</ScreenTitle>
      {data.mode === 'demo' && <DemoBanner />}
      <TimezoneBanner />

      <Card icon={<Bell size={18} />} title="Notifications" defaultOpen>
        <p className="pt-3 text-[12px] font-bold uppercase tracking-wide text-gray-400">Push notifications</p>
        {PUSH_KINDS.filter((k) => !k.creator || creator).map((k) => (
          <ToggleRow key={k.id} label={k.label} sub={k.sub} checked={on(PUSH_PREF_KEY[k.id])} onChange={(v) => void set(PUSH_PREF_KEY[k.id], v)} />
        ))}
        <p className="pt-3 text-[12px] font-bold uppercase tracking-wide text-gray-400">Emails to your clients</p>
        <ToggleRow
          label="Client reminders"
          sub="Email your clients a reminder 24 hours before each appointment"
          checked={on('client_reminders')}
          onChange={(v) => void set('client_reminders', v)}
        />
        {saveError && <p className="pb-2 text-[13px] text-[#B42318]">Could not save. Check your connection and try again.</p>}
        {isNative() && <p className="pb-3 pt-1 text-[12px] text-gray-400">To receive push notifications, allow them for Nelsy in your phone settings.</p>}
      </Card>

      <Card icon={<User size={18} />} title="Account" defaultOpen>
        <div className="divide-y divide-gray-100">
          <div className="py-3">
            <div className="flex items-center gap-3">
              <CreditCard size={18} className="text-gray-400" />
              <div className="flex-1">
                <p className="text-[15px] font-semibold">Plan</p>
                <p className="text-[13px] text-gray-500">
                  {planName} · {status}
                  {renew && ` · ${renew}`}
                </p>
              </div>
            </div>
            {/* Store builds show plan status only: no purchase, upgrade or plan link (Guideline 3.1.3(f)). */}
            {planLinksAllowed() && (
              <button
                type="button"
                onClick={() => openExternal(WEB.plan)}
                className="mt-3 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-gray-100 text-[14px] font-bold"
              >
                Manage plan on getnelsy.com <ExternalLink size={15} />
              </button>
            )}
          </div>
          <Row icon={<Wallet size={18} />} label="Payment methods" value="How you get paid: Stripe account and bank" onClick={() => openExternal(WEB.payouts)} external />
          <Row icon={<User size={18} />} label="Profile" value={`${data.fullName} · ${data.email}`} onClick={() => openExternal(WEB.settings)} external />
          <Row
            icon={<Plug size={18} />}
            label="Integrations"
            value={`Stripe payments: ${data.stripeConnected ? 'connected' : 'not connected'}`}
            onClick={() => openExternal(WEB.payouts)}
            external
          />
          <Row icon={<Users size={18} />} label="Audience" value="Your contacts list" to="/audience" />
          <div className="flex min-h-[56px] items-center gap-3">
            <Globe size={18} className="text-gray-400" />
            <div className="flex-1">
              <p className="text-[15px] font-semibold">Time zone</p>
              <p className="text-[13px] text-gray-500">{timezoneCity(data.timezone)}: all times in the app use it</p>
            </div>
          </div>
        </div>
      </Card>

      <Card icon={<LifeBuoy size={18} />} title="Help">
        <div className="divide-y divide-gray-100">
          <Row label="Contact support" value={SUPPORT_EMAIL} onClick={() => (window.location.href = `mailto:${SUPPORT_EMAIL}`)} />
        </div>
      </Card>

      <Card icon={<FileText size={18} />} title="Legal">
        <div className="divide-y divide-gray-100">
          <Row label="Terms of service" onClick={() => openExternal(WEB.terms)} external />
          <Row label="Privacy policy" onClick={() => openExternal(WEB.privacy)} external />
        </div>
      </Card>

      <div className="mx-4 mt-6">
        <button
          type="button"
          onClick={() => void signOut()}
          className="h-12 w-full rounded-full border-2 border-[#1A1A1A] text-[15px] font-bold text-[#1A1A1A] active:bg-gray-50"
        >
          Log out
        </button>
        <Link to="/settings/delete" className="mt-2 flex h-11 items-center justify-center text-[14px] font-semibold text-[#B42318]">
          Delete account
        </Link>
        <p className="mt-2 text-center text-[12px] text-gray-400">
          Nelsy for pros · Version {APP_VERSION} ({APP_BUILD})
        </p>
      </div>
    </div>
  );
}
