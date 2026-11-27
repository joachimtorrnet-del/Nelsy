import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import {
  ArrowDown, ArrowUp, Check, Copy, ExternalLink, ImageIcon, Info, Link2, Loader2, Mail,
  MousePointerClick, Pencil, Plus, ShoppingBag, Sparkles, Tag, Trash2, X,
} from 'lucide-react';
import { hasFeature } from '@/lib/plans';
import { track } from '@/lib/analytics';
import {
  kitApi, normalizeKitUrl, normalizePromoCode, kitLinkHost,
  KIT_CATEGORY_SUGGESTIONS, KIT_DEFAULT_TITLE, KIT_DISCLOSURE, KIT_IMAGE_MAX_BYTES, KIT_LIMITS, KIT_MAX_ITEMS,
} from '@/lib/kit';
import type { KitClickCount, KitItem, KitItemInput } from '@/lib/kit';
import type { KitApi } from '@/lib/kitDemo';
import { isProductsDemo } from '@/lib/productsDemo';
import { KitCategoryIcon } from '@/components/studio/KitCategoryIcon';

export interface KitProfile {
  id: string;
  slug?: string;
  plan?: string | null;
}

interface Props {
  profile: KitProfile | null;
  /** Sandbox only: swap the API for an in-memory one. */
  api?: KitApi;
  /** Sandbox only: force the locked (upgrade) state. */
  forceLocked?: boolean;
}

const WAITLIST_HREF = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

const inputCls =
  'w-full min-h-[44px] px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none bg-white';

export default function Kit({ profile, api = kitApi, forceLocked = false }: Props) {
  // Shop my kit is the Creator feature key 'affiliates' (see src/lib/plans.ts).
  const unlocked = !forceLocked && (hasFeature(profile?.plan, 'affiliates') || isProductsDemo());

  if (!profile) return null;
  if (!unlocked) return <UpgradePanel />;
  return <KitManager profile={profile} api={api} />;
}

// ── Locked state ─────────────────────────────────────────────────────────────

function UpgradePanel() {
  return (
    <div className="px-4 py-8 lg:px-8 lg:py-12">
      <div className="max-w-2xl mx-auto rounded-3xl border border-gray-100 bg-gradient-to-b from-[#fff4f9] to-white p-6 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
          <ShoppingBag className="w-7 h-7 text-[#F52B8C]" strokeWidth={1.7} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#C2186F] mb-2">Creator plan</p>
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-3">Your clients ask what you use. Show them.</h2>
        <p className="text-[15px] text-gray-600 leading-relaxed max-w-lg mx-auto mb-7">
          Shop my kit is part of the Creator plan. List your lamp, gels, files and aftercare on your studio page
          with your own affiliate links and promo codes, and see which ones your followers click.
        </p>
        <ul className="grid sm:grid-cols-3 gap-3 text-left mb-8">
          {[
            { icon: Link2, title: 'Your own links', text: 'Amazon, brand codes or your distributor.' },
            { icon: Tag, title: 'Promo codes', text: 'Clients copy your code in one tap.' },
            { icon: MousePointerClick, title: 'Clicks per product', text: 'Over the last 7 and 28 days.' },
          ].map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl bg-white border border-gray-100 p-4">
              <Icon className="w-5 h-5 text-[#F52B8C] mb-2" strokeWidth={1.8} />
              <p className="text-sm font-semibold text-[#1A1A1A]">{title}</p>
              <p className="text-[13px] text-gray-500 mt-0.5">{text}</p>
            </li>
          ))}
        </ul>
        <a
          href={WAITLIST_HREF}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition"
        >
          <Mail className="w-4 h-4" /> Join the waitlist
        </a>
        <p className="text-xs text-gray-400 mt-3">We will email you as soon as the Creator plan opens.</p>
      </div>
    </div>
  );
}

// ── Manager ──────────────────────────────────────────────────────────────────

type Period = '7d' | '28d';

function KitManager({ profile, api }: { profile: KitProfile; api: KitApi }) {
  const [items, setItems] = useState<KitItem[]>([]);
  const [clicks, setClicks] = useState<KitClickCount[]>([]);
  const [sectionTitle, setSectionTitle] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<KitItem | 'new' | null>(null);
  const [period, setPeriod] = useState<Period>('7d');
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [list, title] = await Promise.all([api.list(profile.id), api.getTitle(profile.id)]);
      setItems(list);
      setSectionTitle(title);
      // Click stats are a bonus: the list still works if they fail.
      api.clickCounts().then(setClicks).catch(() => setClicks([]));
    } catch {
      setLoadError('Your kit could not be loaded. Refresh the page to try again.');
    } finally {
      setLoading(false);
    }
  }, [api, profile.id]);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(t);
  }, [notice]);

  const clicksById = useMemo(() => {
    const m = new Map<string, KitClickCount>();
    clicks.forEach((c) => m.set(c.kit_item_id, c));
    return m;
  }, [clicks]);
  const totalClicks = clicks.reduce((sum, c) => sum + (period === '7d' ? c.clicks_7d : c.clicks_28d), 0);

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    const withPos = next.map((k, i) => ({ ...k, position: i }));
    setItems(withPos);
    try {
      await api.reorder(withPos.map(({ id, position }) => ({ id, position })));
    } catch {
      setNotice('The new order could not be saved.');
      void load();
    }
  };

  const toggleActive = async (item: KitItem) => {
    try {
      const updated = await api.update(item.id, { is_active: !item.is_active });
      setItems((ks) => ks.map((k) => (k.id === item.id ? updated : k)));
    } catch {
      setNotice('This change could not be saved.');
    }
  };

  if (editing) {
    return (
      <KitEditor
        profile={profile}
        api={api}
        item={editing === 'new' ? null : editing}
        nextPosition={items.length}
        categories={[...new Set([...KIT_CATEGORY_SUGGESTIONS, ...items.map((k) => k.category).filter((c): c is string => !!c)])]}
        onClose={() => setEditing(null)}
        onSaved={(saved, created) => {
          setItems((ks) => (created ? [...ks, saved] : ks.map((k) => (k.id === saved.id ? saved : k))));
          setEditing(null);
          setNotice(created ? 'Added to your kit.' : 'Changes saved.');
        }}
        onDeleted={(item) => {
          setItems((ks) => ks.filter((k) => k.id !== item.id));
          setEditing(null);
          setNotice('Removed from your kit.');
        }}
      />
    );
  }

  const full = items.length >= KIT_MAX_ITEMS;

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Shop my kit</h2>
          <p className="text-sm text-gray-500 mt-1">The products you use and recommend, with your affiliate links and promo codes.</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          disabled={full}
          title={full ? `A kit can hold ${KIT_MAX_ITEMS} products` : undefined}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition self-start sm:self-auto disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Add a product
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : loadError ? (
        <p className="text-sm text-red-600">{loadError}</p>
      ) : items.length === 0 ? (
        <EmptyKit onCreate={() => setEditing('new')} />
      ) : (
        <>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <p className="text-sm text-gray-600">
              <span className="font-bold text-[#1A1A1A]">{totalClicks}</span> {totalClicks === 1 ? 'click' : 'clicks'} on your links in the last {period === '7d' ? '7' : '28'} days
            </p>
            <div className="inline-flex p-1 rounded-xl bg-gray-100" role="radiogroup" aria-label="Click period">
              {(['7d', '28d'] as const).map((p) => (
                <button
                  key={p}
                  role="radio"
                  aria-checked={period === p}
                  onClick={() => setPeriod(p)}
                  className={`min-h-[36px] px-3.5 rounded-lg text-sm font-semibold transition ${period === p ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:text-[#1A1A1A]'}`}
                >
                  {p === '7d' ? '7 days' : '28 days'}
                </button>
              ))}
            </div>
          </div>

          <ul className="space-y-3">
            {items.map((k, i) => {
              const c = clicksById.get(k.id);
              return (
                <KitRow
                  key={k.id}
                  item={k}
                  clicks={c ? (period === '7d' ? c.clicks_7d : c.clicks_28d) : 0}
                  first={i === 0}
                  last={i === items.length - 1}
                  onUp={() => void move(i, -1)}
                  onDown={() => void move(i, 1)}
                  onEdit={() => setEditing(k)}
                  onToggle={() => void toggleActive(k)}
                />
              );
            })}
          </ul>

          <div className="mt-6">
            <SectionTitleCard
              value={sectionTitle}
              onSave={async (t) => {
                await api.setTitle(profile.id, t);
                setSectionTitle(t?.trim() || null);
                setNotice('Section title saved.');
              }}
            />
          </div>

          <p className="mt-5 flex items-start gap-2 text-[13px] text-gray-500">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-400" />
            <span>
              Your page always shows &ldquo;{KIT_DISCLOSURE}&rdquo; above your kit, and links are marked as sponsored.
              Prices are never shown: they change too often, and Amazon does not allow copying them.
            </span>
          </p>
        </>
      )}

      {notice && (
        <div role="status" className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-sm font-medium shadow-lg">
          {notice}
        </div>
      )}
    </div>
  );
}

function EmptyKit({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-12 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#fde8f3] flex items-center justify-center mx-auto mb-4">
        <ShoppingBag className="w-6 h-6 text-[#F52B8C]" strokeWidth={1.7} />
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Add the first product of your kit</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
        Your lamp, your builder gel, the files you swear by, the cuticle oil you send clients home with.
        Paste your affiliate link and add your promo code if you have one.
      </p>
      <button onClick={onCreate} className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition">
        <Plus className="w-4 h-4" /> Add a product
      </button>
    </div>
  );
}

function SectionTitleCard({ value, onSave }: { value: string | null; onSave: (t: string | null) => Promise<void> }) {
  const [draft, setDraft] = useState(value ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { setDraft(value ?? ''); }, [value]);
  const dirty = draft.trim() !== (value ?? '');

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave(draft.trim() || null);
    } catch {
      setError('The title could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4">
      <label htmlFor="kit-section-title" className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">Section title on your page</label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id="kit-section-title"
          value={draft}
          maxLength={KIT_LIMITS.sectionTitle}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={KIT_DEFAULT_TITLE}
          className={inputCls}
        />
        <button
          onClick={() => void save()}
          disabled={!dirty || saving}
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-xl border border-gray-200 text-sm font-semibold text-[#1A1A1A] hover:bg-gray-50 disabled:opacity-40 whitespace-nowrap"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save title
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-1.5">Leave it empty to use &ldquo;{KIT_DEFAULT_TITLE}&rdquo;.</p>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

function KitThumb({ url, category, size = 'md' }: { url: string | null; category: string | null; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'w-full aspect-square' : 'w-16 h-16 sm:w-20 sm:h-20';
  return url ? (
    <img src={url} alt="" className={`${box} rounded-xl object-cover flex-shrink-0 bg-gray-100`} />
  ) : (
    <div className={`${box} rounded-xl flex-shrink-0 bg-gradient-to-br from-[#fde3f0] to-[#fbcfe4] flex items-center justify-center`} aria-hidden="true">
      <KitCategoryIcon category={category} className="w-6 h-6 text-[#C2186F]" />
    </div>
  );
}

function KitRow({ item, clicks, first, last, onUp, onDown, onEdit, onToggle }: {
  item: KitItem; clicks: number; first: boolean; last: boolean;
  onUp: () => void; onDown: () => void; onEdit: () => void; onToggle: () => void;
}) {
  const arrowCls = 'w-11 h-11 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent';
  return (
    <li className={`rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] ${item.is_active ? '' : 'bg-gray-50'}`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden sm:flex flex-col">
          <button onClick={onUp} disabled={first} aria-label={`Move ${item.title} up`} className={arrowCls}><ArrowUp className="w-4 h-4" /></button>
          <button onClick={onDown} disabled={last} aria-label={`Move ${item.title} down`} className={arrowCls}><ArrowDown className="w-4 h-4" /></button>
        </div>
        <div className={item.is_active ? '' : 'opacity-60'}>
          <KitThumb url={item.image_url} category={item.category} />
        </div>
        <div className={`flex-1 min-w-0 ${item.is_active ? '' : 'opacity-70'}`}>
          {(item.brand || item.category) && (
            <p className="text-[11px] font-bold uppercase tracking-wide text-gray-400 truncate">
              {[item.brand, item.category].filter(Boolean).join(' · ')}
            </p>
          )}
          <p className="text-[15px] font-semibold text-[#1A1A1A] line-clamp-2 sm:truncate">{item.title}</p>
          <p className="text-[13px] text-gray-500 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 font-semibold text-[#1A1A1A]">
              <MousePointerClick className="w-3.5 h-3.5 text-gray-400" /> {clicks} {clicks === 1 ? 'click' : 'clicks'}
            </span>
            <span className="text-gray-300">|</span>
            <span className="truncate max-w-[160px] sm:max-w-[240px]">{kitLinkHost(item.url)}</span>
            {item.promo_code && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#fde8f3] text-[#C2186F] text-[11px] font-bold">
                <Tag className="w-3 h-3" /> {item.promo_code}
              </span>
            )}
          </p>
          {!item.is_active && <p className="text-xs font-medium text-gray-500 mt-1">Hidden from your page</p>}
        </div>
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <Switch checked={item.is_active} onChange={onToggle} label={item.is_active ? `${item.title} is visible on your page` : `${item.title} is hidden`} />
          <button onClick={onEdit} aria-label={`Edit ${item.title}`} className="w-11 h-11 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* Mobile actions: one row of 44px targets */}
      <div className="sm:hidden flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
        <div className="flex items-center">
          <button onClick={onUp} disabled={first} aria-label={`Move ${item.title} up`} className={arrowCls}><ArrowUp className="w-4 h-4" /></button>
          <button onClick={onDown} disabled={last} aria-label={`Move ${item.title} down`} className={arrowCls}><ArrowDown className="w-4 h-4" /></button>
        </div>
        <div className="flex items-center gap-1">
          <Switch checked={item.is_active} onChange={onToggle} label={item.is_active ? `${item.title} is visible on your page` : `${item.title} is hidden`} />
          <button onClick={onEdit} aria-label={`Edit ${item.title}`} className="w-11 h-11 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100">
            <Pencil className="w-4 h-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: () => void; label: string; disabled?: boolean }) {
  // 44px hit area around a 40x24 track.
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onChange}
      className="h-11 px-1 flex items-center flex-shrink-0 disabled:opacity-40"
    >
      <span className={`relative w-10 h-6 rounded-full transition-colors ${checked ? 'bg-[#F52B8C]' : 'bg-gray-200'}`}>
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`} />
      </span>
    </button>
  );
}

// ── Editor ───────────────────────────────────────────────────────────────────

function KitEditor({ profile, api, item, nextPosition, categories, onClose, onSaved, onDeleted }: {
  profile: KitProfile;
  api: KitApi;
  item: KitItem | null;
  nextPosition: number;
  categories: string[];
  onClose: () => void;
  onSaved: (k: KitItem, created: boolean) => void;
  onDeleted: (k: KitItem) => void;
}) {
  const [title, setTitle] = useState(item?.title ?? '');
  const [brand, setBrand] = useState(item?.brand ?? '');
  const [category, setCategory] = useState(item?.category ?? '');
  const [url, setUrl] = useState(item?.url ?? '');
  const [promo, setPromo] = useState(item?.promo_code ?? '');
  const [note, setNote] = useState(item?.note ?? '');
  const [imageUrl, setImageUrl] = useState<string | null>(item?.image_url ?? null);
  const [isActive, setIsActive] = useState(item?.is_active ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  // Images uploaded in this session that would be orphaned if the editor is cancelled.
  const uploaded = useRef<string[]>([]);

  const cleanup = (keep?: string | null) => {
    uploaded.current.filter((u) => u !== keep).forEach((u) => { void api.removeImage(u).catch(() => undefined); });
    uploaded.current = [];
  };

  const onImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(f.type)) { setError('The photo must be a PNG, JPG, WebP or GIF image.'); return; }
    if (f.size > KIT_IMAGE_MAX_BYTES) { setError('The photo must be 5 MB or less.'); return; }
    setError(null);
    setUploading(true);
    try {
      const u = await api.uploadImage(f, profile.id);
      uploaded.current.push(u);
      setImageUrl(u);
    } catch {
      setError('The photo could not be uploaded. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const checkUrl = () => {
    if (!url.trim()) { setUrlError(null); return; }
    const r = normalizeKitUrl(url);
    setUrlError('error' in r ? r.error : null);
    if ('url' in r && r.url !== url) setUrl(r.url);
  };

  const save = async () => {
    // Same order as the fields on screen.
    const link = normalizeKitUrl(url);
    if ('error' in link) { setUrlError(link.error); setError(null); return; }
    const cleanTitle = title.trim();
    if (!cleanTitle) { setError('Give the product a name.'); return; }
    const code = normalizePromoCode(promo);
    if ('error' in code) { setError(code.error); return; }
    setError(null);
    setUrlError(null);
    setSaving(true);
    const input: KitItemInput = {
      title: cleanTitle.slice(0, KIT_LIMITS.title),
      brand: brand.trim() ? brand.trim().slice(0, KIT_LIMITS.brand) : null,
      category: category.trim() ? category.trim().slice(0, KIT_LIMITS.category) : null,
      url: link.url,
      promo_code: code.code,
      note: note.trim() ? note.trim().slice(0, KIT_LIMITS.note) : null,
      image_url: imageUrl,
      is_active: isActive,
    };
    try {
      if (item) {
        const saved = await api.update(item.id, input);
        if (item.image_url && item.image_url !== input.image_url) void api.removeImage(item.image_url).catch(() => undefined);
        cleanup(input.image_url);
        onSaved(saved, false);
      } else {
        const saved = await api.create(profile.id, input, nextPosition);
        track('kit_item_created', { kit_item_id: saved.id, category: saved.category, has_image: !!saved.image_url, has_promo_code: !!saved.promo_code, link_host: kitLinkHost(saved.url) });
        cleanup(input.image_url);
        onSaved(saved, true);
      }
    } catch {
      setError('This product could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!item) return;
    setSaving(true);
    try {
      await api.remove(item);
      cleanup();
      onDeleted(item);
    } catch {
      setError('This product could not be deleted.');
      setSaving(false);
    }
  };

  const busy = saving || uploading;
  const close = () => { cleanup(item?.image_url); onClose(); };
  const isDemoApi = api !== kitApi;

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={close} aria-label="Back to my kit" className="w-11 h-11 -ml-2 flex items-center justify-center rounded-lg text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight flex-1">{item ? 'Edit product' : 'Add a product to your kit'}</h2>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-8">
        <div className="space-y-5">
          <Field label="Link" htmlFor="k-url" hint="Your affiliate link, brand link or distributor link. It must start with https://" error={urlError}>
            <input id="k-url" type="url" inputMode="url" autoComplete="off" spellCheck={false} value={url}
              onChange={(e) => { setUrl(e.target.value); if (urlError) setUrlError(null); }} onBlur={checkUrl}
              placeholder="https://www.amazon.fr/dp/...?tag=yourtag-21" className={`${inputCls} ${urlError ? 'border-red-300' : ''}`}
              aria-invalid={!!urlError} />
          </Field>

          <Field label="Product name" htmlFor="k-title">
            <input id="k-title" value={title} maxLength={KIT_LIMITS.title} onChange={(e) => setTitle(e.target.value)} placeholder="Cordless LED/UV lamp 48W" className={inputCls} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Brand" htmlFor="k-brand" optional>
              <input id="k-brand" value={brand} maxLength={KIT_LIMITS.brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand name" className={inputCls} />
            </Field>
            <Field label="Promo code" htmlFor="k-promo" optional hint="Shown with a copy button.">
              <input id="k-promo" value={promo} maxLength={KIT_LIMITS.promo} autoCapitalize="characters" spellCheck={false}
                onChange={(e) => setPromo(e.target.value.replace(/\s/g, ''))} placeholder="MAYA10" className={inputCls} />
            </Field>
          </div>

          <Field label="Category" htmlFor="k-category" optional>
            <input id="k-category" value={category} maxLength={KIT_LIMITS.category} onChange={(e) => setCategory(e.target.value)} placeholder="Gel & polish" className={inputCls} />
            <div className="flex flex-wrap gap-2 mt-2">
              {categories.map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c}
                  className={`min-h-[36px] px-3 rounded-full border text-[13px] font-semibold transition ${category === c ? 'border-[#F52B8C] bg-[#fde8f3] text-[#C2186F]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {c}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Why I use it" htmlFor="k-note" optional hint={`${note.length}/${KIT_LIMITS.note}`}>
            <textarea id="k-note" value={note} maxLength={KIT_LIMITS.note} rows={3} onChange={(e) => setNote(e.target.value)}
              placeholder="Cures builder gel in 30 seconds and the battery lasts a full day of clients."
              className={`${inputCls} resize-none`} />
          </Field>

          <Field label="Photo" optional hint="Use your own photo of the product. Square works best, 5 MB max.">
            <input ref={imageInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={onImage} />
            <div className="flex items-center gap-4">
              <div className="w-20">
                <KitThumb url={imageUrl} category={category || null} size="lg" />
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <button type="button" onClick={() => imageInput.current?.click()} disabled={uploading}
                  className="inline-flex items-center gap-2 min-h-[44px] px-3.5 rounded-xl border border-gray-200 text-sm font-semibold text-[#1A1A1A] hover:bg-gray-50 disabled:opacity-50">
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  {imageUrl ? 'Change photo' : 'Add a photo'}
                </button>
                {imageUrl && (
                  <button type="button" onClick={() => setImageUrl(null)} className="min-h-[32px] text-xs text-gray-500 hover:text-red-600">Remove photo</button>
                )}
              </div>
            </div>
          </Field>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 px-4 py-2">
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Visible on your studio page</p>
              <p className="text-xs text-gray-500">Hide it to keep it here without showing it.</p>
            </div>
            <Switch checked={isActive} onChange={() => setIsActive((v) => !v)} label="Visible on your studio page" />
          </div>

          {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{error}</div>}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button onClick={() => void save()} disabled={busy}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-50">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {item ? 'Save changes' : 'Add to my kit'}
            </button>
            <button onClick={close} disabled={saving} className="min-h-[44px] px-4 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            {item && (
              confirmDelete ? (
                <span className="ml-auto inline-flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Delete this product?</span>
                  <button onClick={() => void remove()} disabled={saving} className="min-h-[44px] px-3 rounded-lg bg-red-600 text-white font-semibold">Delete</button>
                  <button onClick={() => setConfirmDelete(false)} className="min-h-[44px] px-3 rounded-lg text-gray-600 hover:bg-gray-100">Keep</button>
                </span>
              ) : (
                <button onClick={() => setConfirmDelete(true)} className="ml-auto inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              )
            )}
          </div>
        </div>

        {/* Live card preview */}
        <aside className="lg:sticky lg:top-6 self-start">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Preview</p>
          <div className="max-w-[220px] rounded-2xl border border-gray-100 bg-white p-2 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <KitThumb url={imageUrl} category={category || null} size="lg" />
            <div className="px-0.5 pt-2.5">
              {brand && <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500 truncate">{brand}</p>}
              <p className="text-sm font-bold text-[#1A1A1A] line-clamp-2">{title || 'Product name'}</p>
              {note && <p className="text-[12.5px] text-gray-500 mt-0.5 line-clamp-3">{note}</p>}
            </div>
            <div className="mt-2.5 space-y-1.5">
              {promo && (
                <div className="flex items-center justify-between min-h-[44px] px-2.5 rounded-xl border-[1.5px] border-dashed border-[#F52B8C]">
                  <span className="leading-tight">
                    <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-500">Code</span>
                    <span className="block text-[13.5px] font-extrabold text-[#1A1A1A] truncate">{promo}</span>
                  </span>
                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                </div>
              )}
              <div className="flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl bg-[#F52B8C] text-white text-sm font-bold">
                Shop <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-[13px] text-gray-500">
            <p className="flex items-start gap-2"><Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Your link opens as is, so your affiliate tag is kept.</p>
            <p className="flex items-start gap-2"><Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" /> No price is shown. Your page says &ldquo;{KIT_DISCLOSURE}&rdquo;</p>
            {profile.slug && (
              <p className="flex items-start gap-2"><Link2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" /> Shown on getnelsy.com/{profile.slug}, after your services and products.</p>
            )}
            {isDemoApi && (
              <p className="flex items-start gap-2 text-amber-700"><Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" /> Sandbox: nothing is uploaded or saved.</p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, htmlFor, hint, optional, error, children }: {
  label: string; htmlFor?: string; hint?: string; optional?: boolean; error?: string | null; children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">
        {label}{optional && <span className="ml-1.5 text-xs font-normal text-gray-400">Optional</span>}
      </label>
      {children}
      {error ? <p className="text-xs text-red-600 mt-1.5" role="alert">{error}</p> : hint && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
    </div>
  );
}
