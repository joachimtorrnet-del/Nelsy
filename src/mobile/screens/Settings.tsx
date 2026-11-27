import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronDown, ChevronRight, CreditCard, ExternalLink, FileText, User, Wallet } from 'lucide-react';
import { tierFromProfilePlan, PLANS } from '@/lib/plans';
import { useProData } from '../hooks/useProData';
import { DemoBanner, ScreenTitle, Toggle } from '../components/ui';
import { APP_VERSION, WEB } from '../lib/constants';
import { openExternal, prefs } from '../lib/native';
import type { PushKind } from '../lib/push';

const PUSH_KINDS: { id: PushKind; label: string; sub: string }[] = [
  { id: 'new_booking', label: 'New booking', sub: 'When a client books you' },
  { id: 'payment_received', label: 'Payment received', sub: 'Deposits and full payments' },
  { id: 'cancellation', label: 'Cancellation', sub: 'When a client cancels' },
];
type PushPrefs = Record<PushKind, boolean>;
const DEFAULT_PUSH: PushPrefs = { new_booking: true, payment_received: true, cancellation: true };

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

function Row({ icon, label, value, onClick }: { icon?: ReactNode; label: string; value?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex min-h-[52px] w-full items-center gap-3 text-left">
      {icon && <span className="text-gray-400">{icon}</span>}
      <span className="flex-1">
        <span className="block text-[15px] font-semibold">{label}</span>
        {value && <span className="block truncate text-[13px] text-gray-500">{value}</span>}
      </span>
      <ChevronRight size={18} className="text-gray-300" />
    </button>
  );
}

export default function Settings() {
  const { data, signOut } = useProData();
  const [push, setPush] = useState<PushPrefs>(DEFAULT_PUSH);

  useEffect(() => {
    void prefs.get<PushPrefs>('push-kinds', DEFAULT_PUSH).then((p) => setPush({ ...DEFAULT_PUSH, ...p }));
  }, []);

  if (!data) return null;

  const setKind = (id: PushKind, on: boolean) => {
    const next = { ...push, [id]: on };
    setPush(next);
    // TODO(backend): mirror these to the pro's profile (notification_preferences) so the sender can honor them.
    void prefs.set('push-kinds', next);
  };

  const tier = tierFromProfilePlan(data.plan);
  const planName = tier ? PLANS[tier].name : 'No plan yet';
  const status = STATUS_LABEL[data.subscriptionStatus ?? ''] ?? 'Not started';

  return (
    <div className="pb-8">
      <ScreenTitle>Settings</ScreenTitle>
      {data.mode === 'demo' && <DemoBanner />}

      <Card icon={<Bell size={18} />} title="Notifications" defaultOpen>
        {PUSH_KINDS.map((k) => (
          <div key={k.id} className="flex min-h-[56px] items-center gap-3">
            <div className="flex-1">
              <p className="text-[15px] font-semibold">{k.label}</p>
              <p className="text-[13px] text-gray-500">{k.sub}</p>
            </div>
            <Toggle checked={push[k.id]} onChange={(v) => setKind(k.id, v)} label={k.label} />
          </div>
        ))}
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
                </p>
              </div>
            </div>
            {/* Apple rule: no in-app purchase of the subscription. Plan changes happen on the website. */}
            <button
              type="button"
              onClick={() => openExternal(WEB.plan)}
              className="mt-3 flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-gray-100 text-[14px] font-bold"
            >
              Manage plan on getnelsy.com <ExternalLink size={15} />
            </button>
          </div>
          <Row icon={<User size={18} />} label="Profile" value={`${data.fullName} · ${data.email}`} onClick={() => openExternal(WEB.settings)} />
          <Row icon={<Wallet size={18} />} label="Payouts" value="Stripe account and bank details" onClick={() => openExternal(WEB.payouts)} />
        </div>
      </Card>

      <Card icon={<FileText size={18} />} title="Legal">
        <div className="divide-y divide-gray-100">
          <Row label="Terms of service" onClick={() => openExternal(WEB.terms)} />
          <Row label="Privacy policy" onClick={() => openExternal(WEB.privacy)} />
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
        <p className="mt-2 text-center text-[12px] text-gray-400">Nelsy for pros · Version {APP_VERSION}</p>
      </div>
    </div>
  );
}
