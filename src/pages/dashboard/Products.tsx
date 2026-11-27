import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import {
  Package, Plus, Upload, FileDown, ImageIcon, Trash2, ArrowUp, ArrowDown, Loader2,
  Mail, X, AlertTriangle, ShoppingBag, Sparkles, Pencil, CheckCircle2, Link2,
} from 'lucide-react';
import { hasFeature } from '@/lib/plans';
import { track } from '@/lib/analytics';
import {
  productsApi, formatProductPrice, formatBytes, centsToMajor, majorToCents,
  PRODUCT_FILE_MAX_BYTES, PRODUCT_COVER_MAX_BYTES, PRODUCT_MAX_DOWNLOADS, removeProductFile,
} from '@/lib/products';
import type { Product, ProductInput, ProductOrder } from '@/lib/products';
import { isProductsDemo } from '@/lib/productsDemo';
import type { ProductsApi } from '@/lib/productsDemo';

export interface ProductsProfile {
  id: string;
  slug?: string;
  plan?: string | null;
  business_currency?: string | null;
  stripe_onboarding_complete?: boolean;
}

interface Props {
  profile: ProductsProfile | null;
  onNavigate?: (tab: string) => void;
  /** Sandbox only: swap the API for an in-memory one. */
  api?: ProductsApi;
  /** Sandbox only: force the locked (upgrade) state. */
  forceLocked?: boolean;
}

const WAITLIST_HREF = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

const inputCls =
  'w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-[#1A1A1A] placeholder:text-gray-400 focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none bg-white';

export default function Products({ profile, onNavigate, api = productsApi, forceLocked = false }: Props) {
  const unlocked = !forceLocked && (hasFeature(profile?.plan, 'digital_products') || isProductsDemo());

  if (!profile) return null;
  if (!unlocked) return <UpgradePanel />;
  return <ProductsManager profile={profile} api={api} onNavigate={onNavigate} />;
}

// ── Locked state ─────────────────────────────────────────────────────────────

function UpgradePanel() {
  return (
    <div className="px-4 py-8 lg:px-8 lg:py-12">
      <div className="max-w-2xl mx-auto rounded-3xl border border-gray-100 bg-gradient-to-b from-[#fff4f9] to-white p-6 sm:p-10 text-center">
        <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
          <Package className="w-7 h-7 text-[#F52B8C]" strokeWidth={1.7} />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#C2186F] mb-2">Creator plan</p>
        <h2 className="text-2xl sm:text-[28px] font-bold text-[#1A1A1A] tracking-tight mb-3">Sell what you know, not only your time</h2>
        <p className="text-[15px] text-gray-600 leading-relaxed max-w-lg mx-auto mb-7">
          Products are part of the Creator plan. Put guides, templates, price lists or tutorial videos on your studio page,
          get paid straight to your Stripe account, and Nelsy emails the download link to your client.
        </p>
        <ul className="grid sm:grid-cols-3 gap-3 text-left mb-8">
          {[
            { icon: FileDown, title: 'Any file up to 50 MB', text: 'PDF, video, template or zip.' },
            { icon: ShoppingBag, title: 'Checkout on your page', text: 'Card, Apple Pay and Google Pay.' },
            { icon: Mail, title: 'Delivered by email', text: 'A secure link, valid for 10 downloads.' },
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
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition"
        >
          <Mail className="w-4 h-4" /> Join the waitlist
        </a>
        <p className="text-xs text-gray-400 mt-3">We will email you as soon as the Creator plan opens.</p>
      </div>
    </div>
  );
}

// ── Manager ──────────────────────────────────────────────────────────────────

function ProductsManager({ profile, api, onNavigate }: { profile: ProductsProfile; api: ProductsApi; onNavigate?: (tab: string) => void }) {
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Product | 'new' | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const currency = (profile.business_currency ?? 'eur').toLowerCase();

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [p, o] = await Promise.all([api.list(profile.id), api.orders(profile.id)]);
      setProducts(p);
      setOrders(o);
    } catch {
      setLoadError('Your products could not be loaded. Refresh the page to try again.');
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

  const salesByProduct = useMemo(() => {
    const m = new Map<string, number>();
    orders.filter((o) => o.status === 'paid').forEach((o) => m.set(o.product_id, (m.get(o.product_id) ?? 0) + 1));
    return m;
  }, [orders]);

  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= products.length) return;
    const next = [...products];
    [next[index], next[target]] = [next[target], next[index]];
    const withPos = next.map((p, i) => ({ ...p, position: i }));
    setProducts(withPos);
    try {
      await api.reorder(withPos.map(({ id, position }) => ({ id, position })));
    } catch {
      setNotice('The new order could not be saved.');
      void load();
    }
  };

  const toggleActive = async (product: Product) => {
    if (!product.is_active && !product.file_path) {
      setEditing(product);
      return;
    }
    try {
      const updated = await api.update(product.id, { is_active: !product.is_active });
      setProducts((ps) => ps.map((p) => (p.id === product.id ? updated : p)));
    } catch {
      setNotice('This change could not be saved.');
    }
  };

  if (editing) {
    return (
      <ProductEditor
        profile={profile}
        api={api}
        currency={currency}
        product={editing === 'new' ? null : editing}
        nextPosition={products.length}
        onClose={() => setEditing(null)}
        onSaved={(saved, created) => {
          setProducts((ps) => (created ? [...ps, saved] : ps.map((p) => (p.id === saved.id ? saved : p))));
          setEditing(null);
          setNotice(created ? 'Product created.' : 'Changes saved.');
        }}
        onDeleted={(product, how) => {
          setProducts((ps) => ps.filter((p) => p.id !== product.id));
          setEditing(null);
          setNotice(how === 'archived' ? 'This product has orders, so it was hidden instead of deleted.' : 'Product deleted.');
        }}
      />
    );
  }

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Products</h2>
          <p className="text-sm text-gray-500 mt-1">Sell guides, templates and videos from your studio page. Clients get the file by email.</p>
        </div>
        <button
          onClick={() => setEditing('new')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> New product
        </button>
      </div>

      {!profile.stripe_onboarding_complete && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-amber-900">Connect Stripe to start selling</p>
            <p className="text-[13px] text-amber-800">Clients pay you directly through Stripe. Until it is connected, checkout on your products is turned off.</p>
          </div>
          {onNavigate && (
            <button onClick={() => onNavigate('stripe')} className="text-sm font-bold text-amber-900 underline underline-offset-2 whitespace-nowrap">
              Connect
            </button>
          )}
        </div>
      )}

      <div className="inline-flex p-1 rounded-xl bg-gray-100 mb-5" role="tablist">
        {(['products', 'orders'] as const).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${tab === t ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:text-[#1A1A1A]'}`}
          >
            {t === 'products' ? `Products${products.length ? ` (${products.length})` : ''}` : `Orders${orders.length ? ` (${orders.length})` : ''}`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => <div key={i} className="h-24 rounded-2xl bg-gray-100 animate-pulse" />)}
        </div>
      ) : loadError ? (
        <p className="text-sm text-red-600">{loadError}</p>
      ) : tab === 'products' ? (
        products.length === 0 ? (
          <EmptyProducts onCreate={() => setEditing('new')} />
        ) : (
          <ul className="space-y-3">
            {products.map((p, i) => (
              <ProductRow
                key={p.id}
                product={p}
                sales={salesByProduct.get(p.id) ?? 0}
                first={i === 0}
                last={i === products.length - 1}
                onUp={() => void move(i, -1)}
                onDown={() => void move(i, 1)}
                onEdit={() => setEditing(p)}
                onToggle={() => void toggleActive(p)}
              />
            ))}
          </ul>
        )
      ) : (
        <OrdersList orders={orders} products={products} />
      )}

      {notice && (
        <div role="status" className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-[#1A1A1A] text-white text-sm font-medium shadow-lg">
          {notice}
        </div>
      )}
    </div>
  );
}

function EmptyProducts({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-12 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#fde8f3] flex items-center justify-center mx-auto mb-4">
        <Package className="w-6 h-6 text-[#F52B8C]" strokeWidth={1.7} />
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">Create your first product</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
        An aftercare guide, a price list template, a tutorial video: anything your clients ask you about can become a download.
      </p>
      <button onClick={onCreate} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition">
        <Plus className="w-4 h-4" /> Create a product
      </button>
    </div>
  );
}

function CoverThumb({ url, title, size = 'md' }: { url: string | null; title: string; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'w-full aspect-[4/3]' : 'w-16 h-16 sm:w-20 sm:h-20';
  return url ? (
    <img src={url} alt="" className={`${box} rounded-xl object-cover flex-shrink-0 bg-gray-100`} />
  ) : (
    <div className={`${box} rounded-xl flex-shrink-0 bg-gradient-to-br from-[#fde3f0] to-[#fbcfe4] flex items-center justify-center`} aria-label={title}>
      <FileDown className="w-6 h-6 text-[#C2186F]" strokeWidth={1.7} />
    </div>
  );
}

function ProductRow({ product, sales, first, last, onUp, onDown, onEdit, onToggle }: {
  product: Product; sales: number; first: boolean; last: boolean;
  onUp: () => void; onDown: () => void; onEdit: () => void; onToggle: () => void;
}) {
  return (
    <li className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="hidden sm:flex flex-col gap-1">
        <button onClick={onUp} disabled={first} aria-label="Move up" className="p-1 rounded-md text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">
          <ArrowUp className="w-4 h-4" />
        </button>
        <button onClick={onDown} disabled={last} aria-label="Move down" className="p-1 rounded-md text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent">
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
      <CoverThumb url={product.cover_url} title={product.title} />
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-[#1A1A1A] line-clamp-2 sm:truncate">{product.title}</p>
        <p className="text-sm text-gray-500 mt-0.5">
          <span className="font-semibold text-[#1A1A1A]">{formatProductPrice(product.price_cents, product.currency)}</span>
          <span className="mx-1.5 text-gray-300">|</span>
          {sales} {sales === 1 ? 'sale' : 'sales'}
          {product.file_name && <span className="hidden md:inline"><span className="mx-1.5 text-gray-300">|</span>{product.file_name}</span>}
        </p>
        {!product.file_path && <p className="text-xs font-medium text-amber-700 mt-1">Add a file to publish this product</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <Switch checked={product.is_active} onChange={onToggle} label={product.is_active ? 'Visible on your page' : 'Hidden'} />
        <button onClick={onEdit} aria-label={`Edit ${product.title}`} className="p-2 rounded-lg text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100">
          <Pencil className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
}

function Switch({ checked, onChange, label, disabled }: { checked: boolean; onChange: () => void; label: string; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onChange}
      className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 disabled:opacity-40 ${checked ? 'bg-[#F52B8C]' : 'bg-gray-200'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`} />
    </button>
  );
}

// ── Orders ───────────────────────────────────────────────────────────────────

function OrdersList({ orders, products }: { orders: ProductOrder[]; products: Product[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-12 text-center">
        <ShoppingBag className="w-6 h-6 text-gray-400 mx-auto mb-3" strokeWidth={1.7} />
        <p className="text-sm font-semibold text-[#1A1A1A]">No orders yet</p>
        <p className="text-sm text-gray-500 mt-1">When a client buys a product, the order shows up here and you get an email.</p>
      </div>
    );
  }
  const titleOf = (id: string) => products.find((p) => p.id === id)?.title ?? 'Archived product';
  const date = (iso: string) => new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
  const statusPill = (s: ProductOrder['status']) => (
    <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold ${s === 'paid' ? 'bg-green-50 text-green-700' : s === 'refunded' ? 'bg-gray-100 text-gray-500' : 'bg-amber-50 text-amber-700'}`}>
      {s === 'paid' ? 'Paid' : s === 'refunded' ? 'Refunded' : 'Pending'}
    </span>
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Buyer</th>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3 text-right">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Downloads</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{date(o.paid_at ?? o.created_at)}</td>
              <td className="px-4 py-3 min-w-0">
                <p className="font-medium text-[#1A1A1A] truncate max-w-[220px]">{o.buyer_name || o.buyer_email}</p>
                {o.buyer_name && <p className="text-xs text-gray-500 truncate max-w-[220px]">{o.buyer_email}</p>}
              </td>
              <td className="px-4 py-3 text-gray-700 truncate max-w-[240px]">{titleOf(o.product_id)}</td>
              <td className="px-4 py-3 text-right font-semibold text-[#1A1A1A] whitespace-nowrap">{formatProductPrice(o.amount_cents, o.currency)}</td>
              <td className="px-4 py-3">{statusPill(o.status)}</td>
              <td className="px-4 py-3 text-right text-gray-500">{o.download_count}/{PRODUCT_MAX_DOWNLOADS}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden divide-y divide-gray-100">
        {orders.map((o) => (
          <li key={o.id} className="p-4 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A1A] truncate">{titleOf(o.product_id)}</p>
              <p className="text-[13px] text-gray-500 truncate">{o.buyer_name || o.buyer_email}</p>
              <p className="text-xs text-gray-400 mt-0.5">{date(o.paid_at ?? o.created_at)} · {o.download_count}/{PRODUCT_MAX_DOWNLOADS} downloads</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-sm font-bold text-[#1A1A1A]">{formatProductPrice(o.amount_cents, o.currency)}</p>
              <div className="mt-1">{statusPill(o.status)}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Editor ───────────────────────────────────────────────────────────────────

function ProductEditor({ profile, api, currency, product, nextPosition, onClose, onSaved, onDeleted }: {
  profile: ProductsProfile;
  api: ProductsApi;
  currency: string;
  product: Product | null;
  nextPosition: number;
  onClose: () => void;
  onSaved: (p: Product, created: boolean) => void;
  onDeleted: (p: Product, how: 'deleted' | 'archived') => void;
}) {
  const productCurrency = product?.currency ?? currency;
  const [title, setTitle] = useState(product?.title ?? '');
  const [description, setDescription] = useState(product?.description ?? '');
  const [price, setPrice] = useState(product ? String(centsToMajor(product.price_cents, productCurrency)) : '');
  const [coverUrl, setCoverUrl] = useState<string | null>(product?.cover_url ?? null);
  const [file, setFile] = useState<{ path: string; name: string; size: number } | null>(
    product?.file_path ? { path: product.file_path, name: product.file_name ?? 'File', size: product.file_size_bytes ?? 0 } : null,
  );
  const [isActive, setIsActive] = useState(product?.is_active ?? true);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  // Files uploaded in this session that would be orphaned if the editor is cancelled.
  const uploadedPaths = useRef<string[]>([]);
  const isDemoApi = api !== productsApi;

  const priceNumber = Number(price.replace(',', '.'));
  const priceCents = Number.isFinite(priceNumber) ? majorToCents(priceNumber, productCurrency) : NaN;
  const canPublish = !!file && priceCents > 0;

  const cleanup = (keep?: string | null) => {
    if (isDemoApi) return;
    uploadedPaths.current.filter((p) => p !== keep).forEach((p) => { void removeProductFile(p).catch(() => undefined); });
    uploadedPaths.current = [];
  };

  const onCover = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (!f.type.startsWith('image/')) { setError('The cover must be an image (PNG, JPG or WebP).'); return; }
    if (f.size > PRODUCT_COVER_MAX_BYTES) { setError('The cover image must be 5 MB or less.'); return; }
    setError(null);
    setUploadingCover(true);
    try {
      setCoverUrl(await api.uploadCover(f, profile.id));
    } catch {
      setError('The cover could not be uploaded. Please try again.');
    } finally {
      setUploadingCover(false);
    }
  };

  const onFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (f.size > PRODUCT_FILE_MAX_BYTES) { setError('The file must be 50 MB or less.'); return; }
    if (f.size === 0) { setError('This file is empty.'); return; }
    setError(null);
    setUploadingFile(true);
    try {
      const uploaded = await api.uploadFile(f, profile.id);
      uploadedPaths.current.push(uploaded.path);
      setFile(uploaded);
    } catch {
      setError('The file could not be uploaded. Check your connection and try again.');
    } finally {
      setUploadingFile(false);
    }
  };

  const save = async () => {
    const cleanTitle = title.trim();
    if (!cleanTitle) { setError('Give your product a title.'); return; }
    if (!Number.isFinite(priceCents) || priceCents <= 0) { setError('Set a price above zero.'); return; }
    if (isActive && !file) { setError('Upload the file before making the product visible.'); return; }
    setError(null);
    setSaving(true);
    const input: ProductInput = {
      title: cleanTitle.slice(0, 120),
      description: description.trim() ? description.trim().slice(0, 5000) : null,
      price_cents: priceCents,
      cover_url: coverUrl,
      file_path: file?.path ?? null,
      file_name: file?.name ?? null,
      file_size_bytes: file?.size ?? null,
      is_active: isActive && !!file,
    };
    try {
      if (product) {
        const saved = await api.update(product.id, input);
        // The previous file is replaced: remove it (buyers now get the new one).
        if (!isDemoApi && product.file_path && product.file_path !== input.file_path) {
          void removeProductFile(product.file_path).catch(() => undefined);
        }
        cleanup(input.file_path);
        onSaved(saved, false);
      } else {
        const saved = await api.create(profile.id, input, nextPosition);
        track('product_created', { product_id: saved.id, price_cents: saved.price_cents, currency: saved.currency, has_cover: !!saved.cover_url, is_active: saved.is_active });
        cleanup(input.file_path);
        onSaved(saved, true);
      }
    } catch {
      setError('Your product could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!product) return;
    setSaving(true);
    try {
      const how = await api.remove(product);
      cleanup();
      onDeleted(product, how);
    } catch {
      setError('This product could not be deleted.');
      setSaving(false);
    }
  };

  const busy = saving || uploadingCover || uploadingFile;

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => { cleanup(product?.file_path); onClose(); }} aria-label="Back to products" className="p-2 -ml-2 rounded-lg text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-[#1A1A1A] tracking-tight flex-1">{product ? 'Edit product' : 'New product'}</h2>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-6 lg:gap-8">
        <div className="space-y-5">
          <Field label="Title" htmlFor="p-title">
            <input id="p-title" value={title} maxLength={120} onChange={(e) => setTitle(e.target.value)} placeholder="Aftercare guide for gel extensions" className={inputCls} />
          </Field>

          <Field label="Description" htmlFor="p-desc" hint="What your client gets, in a few lines.">
            <textarea id="p-desc" value={description} maxLength={5000} rows={5} onChange={(e) => setDescription(e.target.value)}
              placeholder="A 12 page PDF with daily care tips, what to avoid, and when to book a fill."
              className={`${inputCls} resize-none`} />
          </Field>

          <Field label="Price" htmlFor="p-price">
            <div className="relative max-w-[220px]">
              <input id="p-price" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value.replace(/[^\d.,]/g, ''))}
                placeholder="9.00" className={`${inputCls} pr-14`} />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">{productCurrency.toUpperCase()}</span>
            </div>
          </Field>

          <Field label="File" hint="The download your client receives. Any format, up to 50 MB.">
            <input ref={fileInput} type="file" className="hidden" onChange={onFile} />
            {file ? (
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3.5 py-3">
                <div className="w-9 h-9 rounded-lg bg-[#fde8f3] flex items-center justify-center flex-shrink-0">
                  <FileDown className="w-4 h-4 text-[#C2186F]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1A1A1A] truncate">{file.name}</p>
                  {file.size > 0 && <p className="text-xs text-gray-500">{formatBytes(file.size)}</p>}
                </div>
                <button type="button" onClick={() => fileInput.current?.click()} disabled={uploadingFile}
                  className="text-sm font-semibold text-[#C2186F] hover:underline disabled:opacity-50">
                  {uploadingFile ? 'Uploading…' : 'Replace'}
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => fileInput.current?.click()} disabled={uploadingFile}
                className="w-full flex flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-gray-200 px-4 py-7 text-sm text-gray-500 hover:border-[#F52B8C] hover:text-[#C2186F] transition disabled:opacity-60">
                {uploadingFile ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                <span className="font-semibold">{uploadingFile ? 'Uploading your file…' : 'Upload a file'}</span>
                <span className="text-xs text-gray-400">PDF, video, zip... up to 50 MB</span>
              </button>
            )}
          </Field>

          <Field label="Cover image" hint="Shown on your studio page. Square or 4:3 works best, 5 MB max.">
            <input ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={onCover} />
            <div className="flex items-center gap-4">
              <div className="w-24">
                <CoverThumb url={coverUrl} title={title} size="lg" />
              </div>
              <div className="flex flex-col items-start gap-1.5">
                <button type="button" onClick={() => coverInput.current?.click()} disabled={uploadingCover}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-[#1A1A1A] hover:bg-gray-50 disabled:opacity-50">
                  {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  {coverUrl ? 'Change cover' : 'Add a cover'}
                </button>
                {coverUrl && (
                  <button type="button" onClick={() => setCoverUrl(null)} className="text-xs text-gray-500 hover:text-red-600">Remove cover</button>
                )}
              </div>
            </div>
          </Field>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">Visible on your studio page</p>
              <p className="text-xs text-gray-500">{canPublish ? 'Clients can buy it as soon as you save.' : 'Add a file and a price to publish.'}</p>
            </div>
            <Switch checked={isActive && canPublish} disabled={!canPublish} onChange={() => setIsActive((v) => !v)} label="Visible on your studio page" />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800">{error}</div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button onClick={() => void save()} disabled={busy}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-50">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {product ? 'Save changes' : 'Create product'}
            </button>
            <button onClick={() => { cleanup(product?.file_path); onClose(); }} disabled={saving} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            {product && (
              confirmDelete ? (
                <span className="ml-auto inline-flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Delete this product?</span>
                  <button onClick={() => void remove()} disabled={saving} className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold">Delete</button>
                  <button onClick={() => setConfirmDelete(false)} className="px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100">Keep</button>
                </span>
              ) : (
                <button onClick={() => setConfirmDelete(true)} className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              )
            )}
          </div>
        </div>

        {/* Live card preview */}
        <aside className="lg:sticky lg:top-6 self-start">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">Preview</p>
          <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
            <CoverThumb url={coverUrl} title={title} size="lg" />
            <p className="text-[15px] font-bold text-[#1A1A1A] mt-3 line-clamp-2">{title || 'Product title'}</p>
            {description && <p className="text-[13px] text-gray-500 mt-1 line-clamp-2">{description}</p>}
            <div className="flex items-center justify-between mt-3">
              <span className="text-[15px] font-bold text-[#1A1A1A]">
                {priceCents > 0 ? formatProductPrice(priceCents, productCurrency) : formatProductPrice(0, productCurrency)}
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#F52B8C] text-white text-xs font-bold">Buy</span>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-[13px] text-gray-500">
            <p className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> Paid straight to your Stripe account, 0% Nelsy commission.</p>
            <p className="flex items-start gap-2"><Mail className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" /> Your client gets a download link by email, valid for {PRODUCT_MAX_DOWNLOADS} downloads.</p>
            {profile.slug && (
              <p className="flex items-start gap-2"><Link2 className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" /> Shown on getnelsy.com/{profile.slug}, after your services.</p>
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

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-[#1A1A1A] mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-1.5">{hint}</p>}
    </div>
  );
}
