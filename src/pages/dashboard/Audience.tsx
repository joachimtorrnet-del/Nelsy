import { useCallback, useEffect, useMemo, useState } from 'react';
import { Users, Search, Download, Gift, MailCheck, ShieldCheck, FileDown } from 'lucide-react';
import { hasFeature } from '@/lib/plans';
import { track } from '@/lib/analytics';
import { contactsApi, consentState, downloadContactsCsv, CONTACT_SOURCE_LABEL } from '@/lib/contacts';
import type { Contact, ContactsApi, ContactSource, ConsentState } from '@/lib/contacts';
import { isProductsDemo } from '@/lib/productsDemo';
import { CreatorUpgradePanel } from '@/components/dashboard/CreatorUpgradePanel';

export interface AudienceProfile {
  id: string;
  slug?: string;
  plan?: string | null;
}

interface Props {
  profile: AudienceProfile | null;
  onNavigate?: (tab: string) => void;
  /** Sandbox only: swap the API for an in-memory one. */
  api?: ContactsApi;
  /** Sandbox only: force the locked (upgrade) state. */
  forceLocked?: boolean;
}

export default function Audience({ profile, onNavigate, api = contactsApi, forceLocked = false }: Props) {
  // Contacts come from free resources and product sales, both part of digital products.
  const unlocked = !forceLocked && (hasFeature(profile?.plan, 'digital_products') || isProductsDemo());
  if (!profile) return null;
  if (!unlocked) {
    return (
      <CreatorUpgradePanel
        icon={Users}
        title="Grow a list of clients you can reach"
        text="Audience is part of the Creator plan. Offer a free guide on your studio page, collect the emails of the people who want it, and see who agreed to hear from you."
        points={[
          { icon: Gift, title: 'Free resources', text: 'A guide or checklist in exchange for an email.' },
          { icon: ShieldCheck, title: 'Consent built in', text: 'Unticked opt-in box and unsubscribe links.' },
          { icon: FileDown, title: 'Export anytime', text: 'Download your contacts as a CSV file.' },
        ]}
      />
    );
  }
  return <AudienceList profile={profile} api={api} onNavigate={onNavigate} />;
}

// 'booking' is a valid source in the schema but bookings do not feed contacts yet.
const SOURCES: (ContactSource | 'all')[] = ['all', 'free_resource', 'product_purchase'];

function AudienceList({ profile, api, onNavigate }: { profile: AudienceProfile; api: ContactsApi; onNavigate?: (tab: string) => void }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [source, setSource] = useState<ContactSource | 'all'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setContacts(await api.list(profile.id));
    } catch {
      setLoadError('Your contacts could not be loaded. Refresh the page to try again.');
    } finally {
      setLoading(false);
    }
  }, [api, profile.id]);

  useEffect(() => { void load(); }, [load]);

  const subscribed = useMemo(() => contacts.filter((c) => consentState(c) === 'subscribed').length, [contacts]);
  const fromFree = useMemo(() => contacts.filter((c) => c.source === 'free_resource').length, [contacts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((c) =>
      (source === 'all' || c.source === source) &&
      (!q || c.email.includes(q) || (c.first_name ?? '').toLowerCase().includes(q)));
  }, [contacts, query, source]);

  const exportCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadContactsCsv(filtered, `nelsy-contacts-${stamp}.csv`);
    track('contacts_exported', { count: filtered.length, filtered: filtered.length !== contacts.length });
  };

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Audience</h2>
          <p className="text-sm text-gray-500 mt-1">People who got a free resource or bought a product from your studio page.</p>
        </div>
        <button
          onClick={exportCsv}
          disabled={loading || filtered.length === 0}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-[#1A1A1A] text-sm font-bold hover:bg-gray-50 transition self-start sm:self-auto disabled:opacity-40 disabled:hover:bg-white"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label="Contacts" value={contacts.length} loading={loading} />
        <Stat label="Can receive emails" value={subscribed} loading={loading} accent />
        <Stat label="From free resources" value={fromFree} loading={loading} />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-2xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : loadError ? (
        <p className="text-sm text-red-600">{loadError}</p>
      ) : contacts.length === 0 ? (
        <EmptyAudience onCreate={onNavigate ? () => onNavigate('products') : undefined} />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by email or name"
                aria-label="Search contacts"
                className="w-full pl-10 pr-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none bg-white"
              />
            </div>
            <div className="flex gap-1 p-1 rounded-xl bg-gray-100 overflow-x-auto" role="tablist" aria-label="Filter by source">
              {SOURCES.map((s) => (
                <button
                  key={s}
                  role="tab"
                  aria-selected={source === s}
                  onClick={() => setSource(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition ${source === s ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:text-[#1A1A1A]'}`}
                >
                  {s === 'all' ? 'All' : CONTACT_SOURCE_LABEL[s]}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-gray-200 px-6 py-10 text-center text-sm text-gray-500">No contact matches this search.</p>
          ) : (
            <ContactsTable contacts={filtered} />
          )}

          <p className="flex items-start gap-2 text-[13px] text-gray-500 mt-4">
            <ShieldCheck className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            Only send marketing emails to contacts marked Subscribed. They ticked the opt-in box themselves, and every email Nelsy sends them includes an unsubscribe link.
          </p>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, loading, accent }: { label: string; value: number; loading: boolean; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400 leading-tight">{label}</p>
      {loading ? (
        <div className="h-7 w-10 mt-1.5 rounded-md bg-gray-100 animate-pulse" />
      ) : (
        <p className={`text-xl sm:text-2xl font-bold mt-1 ${accent ? 'text-[#C2186F]' : 'text-[#1A1A1A]'}`}>{value}</p>
      )}
    </div>
  );
}

const CONSENT_PILL: Record<ConsentState, { label: string; cls: string }> = {
  subscribed: { label: 'Subscribed', cls: 'bg-green-50 text-green-700' },
  no_consent: { label: 'No consent', cls: 'bg-gray-100 text-gray-500' },
  unsubscribed: { label: 'Unsubscribed', cls: 'bg-amber-50 text-amber-700' },
};

function ConsentBadge({ contact }: { contact: Contact }) {
  const { label, cls } = CONSENT_PILL[consentState(contact)];
  return <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap ${cls}`}>{label}</span>;
}

function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const date = (iso: string) => new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Emails</th>
            <th className="px-4 py-3 text-right">Added</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {contacts.map((c) => (
            <tr key={c.id}>
              <td className="px-4 py-3 min-w-0">
                <p className="font-medium text-[#1A1A1A] truncate max-w-[320px]">{c.first_name || c.email}</p>
                {c.first_name && <p className="text-xs text-gray-500 truncate max-w-[320px]">{c.email}</p>}
              </td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{CONTACT_SOURCE_LABEL[c.source]}</td>
              <td className="px-4 py-3"><ConsentBadge contact={c} /></td>
              <td className="px-4 py-3 text-right text-gray-500 whitespace-nowrap">{date(c.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden divide-y divide-gray-100">
        {contacts.map((c) => (
          <li key={c.id} className="p-4 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A1A] truncate">{c.first_name || c.email}</p>
              {c.first_name && <p className="text-[13px] text-gray-500 truncate">{c.email}</p>}
              <p className="text-xs text-gray-400 mt-0.5">{CONTACT_SOURCE_LABEL[c.source]} · {date(c.created_at)}</p>
            </div>
            <ConsentBadge contact={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyAudience({ onCreate }: { onCreate?: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-12 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#fde8f3] flex items-center justify-center mx-auto mb-4">
        <MailCheck className="w-6 h-6 text-[#F52B8C]" strokeWidth={1.7} />
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">No contacts yet</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
        Offer a free resource on your studio page, like an aftercare checklist. Everyone who asks for it shows up here, and so do your product buyers.
      </p>
      {onCreate && (
        <button onClick={onCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition">
          <Gift className="w-4 h-4" /> Create a free resource
        </button>
      )}
    </div>
  );
}
