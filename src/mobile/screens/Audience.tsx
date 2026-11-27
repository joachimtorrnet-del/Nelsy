import { useEffect, useMemo, useState } from 'react';
import { Mail, Search, Users } from 'lucide-react';
import { hasFeature } from '@/lib/plans';
import { CONTACT_SOURCE_LABEL, consentState, getMyContacts } from '@/lib/contacts';
import type { Contact } from '@/lib/contacts';
import { useProData } from '../hooks/useProData';
import { BackHeader, DemoBanner, EmptyState, Spinner } from '../components/ui';
import { PlanGate } from '../components/PlanGate';
import { DEMO_CONTACTS } from '../lib/demo';
import { fmtShortDate } from '../lib/format';

const CONSENT: Record<ReturnType<typeof consentState>, { label: string; bg: string; fg: string }> = {
  subscribed: { label: 'Subscribed', bg: '#E3F7EC', fg: '#11733F' },
  unsubscribed: { label: 'Unsubscribed', bg: '#EEEEEE', fg: '#6B6B6B' },
  no_consent: { label: 'No marketing', bg: '#F5F5F5', fg: '#6B6B6B' },
};

/** Contacts list (read-only). Same table and Creator gate as the website Audience page. */
export default function Audience() {
  const { data } = useProData();
  const [live, setLive] = useState<Contact[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState('');
  const unlocked = !!data && hasFeature(data.plan, 'digital_products');
  const contacts = data?.mode === 'demo' ? DEMO_CONTACTS : live;

  useEffect(() => {
    if (!data || !unlocked || data.mode === 'demo') return;
    let alive = true;
    getMyContacts(data.profileId)
      .then((c) => alive && setLive(c))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [data, unlocked]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!contacts || !term) return contacts ?? [];
    return contacts.filter((c) => c.email.toLowerCase().includes(term) || (c.first_name ?? '').toLowerCase().includes(term));
  }, [contacts, q]);

  if (!data) return null;
  const subscribed = (contacts ?? []).filter((c) => consentState(c) === 'subscribed').length;

  return (
    <div className="pb-8">
      <BackHeader to="/settings" label="Settings" title="Audience" />
      <div className="h-3" />
      {data.mode === 'demo' && <DemoBanner />}

      {!unlocked ? (
        <PlanGate
          icon={<Users size={22} />}
          feature="Audience"
          what="Everyone who downloads a free resource or buys a product joins your contacts list, with their marketing consent."
        />
      ) : failed ? (
        <EmptyState icon={<Users size={24} />} title="We could not load your contacts" sub="Check your connection and try again." />
      ) : !contacts ? (
        <Spinner />
      ) : contacts.length === 0 ? (
        <EmptyState icon={<Users size={24} />} title="No contacts yet" sub="Share a free resource from your page to start your list." />
      ) : (
        <>
          <div className="mx-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-gray-100 p-3.5">
              <p className="text-[12px] text-gray-500">Contacts</p>
              <p className="text-[24px] font-extrabold">{contacts.length}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 p-3.5">
              <p className="text-[12px] text-gray-500">Subscribed</p>
              <p className="text-[24px] font-extrabold">{subscribed}</p>
            </div>
          </div>

          <label className="mx-4 mt-4 flex h-11 items-center gap-2 rounded-full bg-gray-100 px-4">
            <Search size={16} className="text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or email"
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none"
              type="search"
            />
          </label>

          <ul className="mt-2 divide-y divide-gray-100 px-4">
            {filtered.map((c) => {
              const s = CONSENT[consentState(c)];
              return (
                <li key={c.id} className="flex min-h-[64px] items-center gap-3 py-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFF0F7] text-[14px] font-bold text-[#F52B8C]">
                    {(c.first_name || c.email)[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-semibold">{c.first_name || c.email.split('@')[0]}</p>
                    <p className="truncate text-[13px] text-gray-500">{c.email}</p>
                    <p className="text-[12px] text-gray-400">
                      {CONTACT_SOURCE_LABEL[c.source] ?? c.source} · {fmtShortDate(c.created_at)}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none" style={{ backgroundColor: s.bg, color: s.fg }}>
                      {s.label}
                    </span>
                    <a href={`mailto:${c.email}`} aria-label={`Email ${c.email}`} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
                      <Mail size={15} />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
          {filtered.length === 0 && <p className="mx-4 mt-4 text-center text-[14px] text-gray-500">No contact matches this search.</p>}
          <p className="mx-4 mt-4 text-center text-[12px] text-gray-400">Export your list as a CSV on getnelsy.com.</p>
        </>
      )}
    </div>
  );
}
