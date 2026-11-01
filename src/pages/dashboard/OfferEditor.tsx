import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Copy, CheckCheck, ChevronDown, ChevronUp,
  Loader2, Trash2, Eye, Smartphone, Monitor, AlertTriangle,
  ArrowRight, X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { updateService, createService, deleteService, uploadImage } from '@/lib/supabase-queries';
import { validatePrice } from '@/utils/validation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { PublicStudioView } from '@/components/studio/PublicStudioView';
import type { Merchant } from '@/types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ServiceRow {
  id: string;
  profile_id: string;
  name: string;
  description: string;
  category: string;
  duration_minutes: number;
  price_total: number;
  deposit_amount: number;
  active: boolean;
  is_featured: boolean;
  image_url: string | null;
}

interface ProfileRow {
  id: string;
  full_name?: string;
  salon_name?: string;
  bio?: string;
  slug?: string;
  logo_url?: string;
  cover_url?: string;
  specialty?: string;
  location?: string;
  instagram?: string;
  tiktok?: string;
  pinterest_url?: string;
  website_url?: string;
  theme_preset?: string;
  color_accent?: string;
  subscription_status?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const CATEGORIES = ['Nails', 'Hair', 'Makeup', 'Lashes', 'Brows', 'Skin Care', 'Massage', 'Other'];

const DURATIONS = [
  { label: '15 min', value: 15 }, { label: '30 min', value: 30 },
  { label: '45 min', value: 45 }, { label: '1h', value: 60 },
  { label: '1h 15min', value: 75 }, { label: '1h 30min', value: 90 },
  { label: '2h', value: 120 }, { label: '2h 30min', value: 150 },
  { label: '3h', value: 180 }, { label: '4h', value: 240 },
];

type CardStyle = 'button' | 'callout' | 'preview';
type SaveState = 'idle' | 'saving' | 'saved' | 'error';
type ActiveTab = 'thumbnail' | 'checkout' | 'options';

function localKey(serviceId: string) {
  return `nelsy_offer_style_${serviceId}`;
}

function loadLocalPrefs(serviceId: string): { cardStyle: CardStyle; cardSubtitle: string; cardCta: string } {
  try {
    const raw = localStorage.getItem(localKey(serviceId));
    if (raw) return JSON.parse(raw);
  } catch { /* empty */ }
  return { cardStyle: 'callout', cardSubtitle: '', cardCta: 'Book now' };
}

function saveLocalPrefs(serviceId: string, prefs: { cardStyle: CardStyle; cardSubtitle: string; cardCta: string }) {
  try { localStorage.setItem(localKey(serviceId), JSON.stringify(prefs)); } catch { /* empty */ }
}

// ── Card style icons ───────────────────────────────────────────────────────────

function ButtonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="9" width="18" height="6" rx="3"/>
    </svg>
  );
}

function CalloutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="2"/>
      <rect x="6" y="8" width="5" height="5" rx="1"/>
      <line x1="13" y1="9" x2="18" y2="9"/>
      <line x1="13" y1="12" x2="18" y2="12"/>
      <line x1="6" y1="16" x2="18" y2="16"/>
    </svg>
  );
}

function PreviewIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <rect x="3" y="3" width="18" height="8" rx="2"/>
      <line x1="3" y1="11" x2="21" y2="11"/>
      <line x1="6" y1="15" x2="14" y2="15"/>
      <line x1="6" y1="18" x2="11" y2="18"/>
    </svg>
  );
}

// ── Mini card previews ─────────────────────────────────────────────────────────

interface CardPreviewProps {
  cardStyle: CardStyle;
  name: string;
  subtitle: string;
  cta: string;
  imageUrl: string;
  price: string;
  accent: string;
}

function ServiceCardPreview({ cardStyle, name, subtitle, cta, imageUrl, price, accent }: CardPreviewProps) {
  const formattedPrice = price ? `€${parseFloat(price || '0').toFixed(0)}` : '';

  if (cardStyle === 'button') {
    return (
      <div style={{
        border: '1px solid #e5e7eb', borderRadius: 12, padding: '12px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        background: '#fff',
      }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', margin: 0 }}>{name || 'Service name'}</p>
          {formattedPrice && <p style={{ fontSize: 13, color: '#6b7280', margin: '2px 0 0' }}>{formattedPrice}</p>}
        </div>
        <button style={{
          flexShrink: 0, padding: '8px 14px', borderRadius: 8,
          background: accent, color: '#fff', border: 'none', fontSize: 12, fontWeight: 600,
        }}>{cta || 'Book now'}</button>
      </div>
    );
  }

  if (cardStyle === 'callout') {
    return (
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
        <div style={{ display: 'flex', gap: 12, padding: '12px 14px 10px' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 8, flexShrink: 0, overflow: 'hidden',
            background: `linear-gradient(135deg, ${accent}20, ${accent}50)`,
          }}>
            {imageUrl && <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', margin: '0 0 2px' }}>{name || 'Service name'}</p>
            {subtitle && <p style={{ fontSize: 12, color: '#6b7280', margin: 0, lineHeight: 1.4 }}>{subtitle}</p>}
            {formattedPrice && <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', margin: '4px 0 0' }}>{formattedPrice}</p>}
          </div>
        </div>
        <div style={{ padding: '0 14px 12px' }}>
          <button style={{
            width: '100%', padding: '9px 0', borderRadius: 8,
            background: accent, color: '#fff', border: 'none', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>{cta || 'Book now'} <ArrowRight size={13} /></button>
        </div>
      </div>
    );
  }

  // preview style
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
      {imageUrl ? (
        <div style={{ height: 120, overflow: 'hidden' }}>
          <img src={imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div style={{ height: 120, background: `linear-gradient(135deg, ${accent}20, ${accent}60)` }} />
      )}
      <div style={{ padding: '12px 14px' }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', margin: '0 0 2px' }}>{name || 'Service name'}</p>
        {subtitle && <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 6px', lineHeight: 1.4 }}>{subtitle}</p>}
        {formattedPrice && <p style={{ fontSize: 13, fontWeight: 600, color: '#1A1A1A', margin: '0 0 10px' }}>{formattedPrice}</p>}
        <button style={{
          width: '100%', padding: '9px 0', borderRadius: 8,
          background: accent, color: '#fff', border: 'none', fontSize: 13, fontWeight: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>{cta || 'Book now'} <ArrowRight size={13} /></button>
      </div>
    </div>
  );
}

// ── Phone mockup ───────────────────────────────────────────────────────────────

function PhoneMockup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: 240, flexShrink: 0,
      background: '#1A1A1A', borderRadius: 36, padding: '10px 8px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.08)',
      position: 'relative',
    }}>
      {/* Side buttons */}
      <div style={{
        position: 'absolute', left: -2, top: 80, width: 3, height: 24,
        background: '#333', borderRadius: '2px 0 0 2px',
      }} />
      <div style={{
        position: 'absolute', left: -2, top: 112, width: 3, height: 24,
        background: '#333', borderRadius: '2px 0 0 2px',
      }} />
      <div style={{
        position: 'absolute', right: -2, top: 100, width: 3, height: 36,
        background: '#333', borderRadius: '0 2px 2px 0',
      }} />
      {/* Screen */}
      <div style={{
        background: '#fff', borderRadius: 28, overflow: 'hidden',
        height: 462,
      }}>
        <div style={{
          width: 390, height: 750,
          transform: `scale(${224 / 390})`, transformOrigin: 'top left',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── Accordion ─────────────────────────────────────────────────────────────────

interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Accordion({ title, icon, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-500">{icon}</span>
          <span className="font-semibold text-gray-900 text-sm">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-gray-100">{children}</div>}
    </div>
  );
}

// ── Confirm delete dialog ──────────────────────────────────────────────────────

function DeleteConfirm({ onConfirm, onCancel, loading }: { onConfirm: () => void; onCancel: () => void; loading: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-bold text-gray-900">Delete this service?</h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          This will permanently remove the service. Existing bookings are preserved. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function OfferEditor() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const isNew = serviceId === 'new';

  // ── Auth + data ──
  const [profileId, setProfileId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [saveError, setSaveError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ── Tab ──
  const [activeTab, setActiveTab] = useState<ActiveTab>('thumbnail');
  const [previewMode, setPreviewMode] = useState<'phone' | 'desktop'>('phone');

  // ── Thumbnail tab ──
  const [cardStyle, setCardStyle] = useState<CardStyle>('callout');
  const [cardSubtitle, setCardSubtitle] = useState('');
  const [cardCta, setCardCta] = useState('Book now');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [uploadingThumb, setUploadingThumb] = useState(false);

  // ── Checkout tab (main service fields) ──
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [heroUrl, setHeroUrl] = useState('');
  const [uploadingHero, setUploadingHero] = useState(false);
  const [priceTotal, setPriceTotal] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [category, setCategory] = useState('Nails');

  // ── Options tab ──
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // ── Validation errors ──
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Unsaved changes ──
  const [dirty, setDirty] = useState(false);

  const thumbRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // ── Sidebar state ──
  const [mobileOpen, setMobileOpen] = useState(false);

  // ── Load data ──
  const load = useCallback(async () => {
    if (!supabase) { navigate('/login'); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate('/login'); return; }
    setProfileId(user.id);

    const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    setProfile(prof);

    if (!isNew && serviceId) {
      const { data: svc } = await supabase.from('services').select('*').eq('id', serviceId).eq('profile_id', user.id).single();
      if (!svc) { navigate('/dashboard/preview'); return; }
      const row = svc as ServiceRow;
      setName(row.name);
      setDescription(row.description ?? '');
      setThumbnailUrl(row.image_url ?? '');
      setHeroUrl(row.image_url ?? '');
      setPriceTotal(row.price_total?.toString() ?? '');
      setDepositAmount(row.deposit_amount > 0 ? row.deposit_amount.toString() : '');
      setDurationMinutes(row.duration_minutes ?? 60);
      setCategory(row.category ?? 'Nails');
      setIsActive(row.active ?? true);
      setIsFeatured(row.is_featured ?? false);

      // Load local prefs
      const prefs = loadLocalPrefs(row.id);
      setCardStyle(prefs.cardStyle);
      setCardSubtitle(prefs.cardSubtitle);
      setCardCta(prefs.cardCta || 'Book now');
    }

    setLoading(false);
  }, [serviceId, isNew, navigate]);

  useEffect(() => { load(); }, [load]);

  // ── Mark dirty on change ──
  useEffect(() => {
    if (!loading) setDirty(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, description, thumbnailUrl, heroUrl, priceTotal, depositAmount, durationMinutes,
      category, isActive, isFeatured, cardStyle, cardSubtitle, cardCta]);

  // ── Warn on navigation with unsaved changes ──
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) { e.preventDefault(); e.returnValue = ''; }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  // ── Upload handlers ──
  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumb(true);
    try {
      const url = await uploadImage(file, 'services');
      setThumbnailUrl(url);
      if (!heroUrl) setHeroUrl(url); // pre-fill hero if empty
    } catch { setErrors((p) => ({ ...p, thumb: 'Upload failed. Please try again.' })); }
    finally { setUploadingThumb(false); if (thumbRef.current) thumbRef.current.value = ''; }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHero(true);
    try {
      const url = await uploadImage(file, 'services');
      setHeroUrl(url);
    } catch { setErrors((p) => ({ ...p, hero: 'Upload failed. Please try again.' })); }
    finally { setUploadingHero(false); if (heroRef.current) heroRef.current.value = ''; }
  };

  // ── Validate ──
  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Service name is required.';
    const price = parseFloat(priceTotal);
    if (!priceTotal || isNaN(price) || !validatePrice(price)) e.price = 'Enter a valid price.';
    const dep = parseFloat(depositAmount);
    if (depositAmount && (isNaN(dep) || dep < 0 || dep > price)) e.deposit = 'Deposit must be between 0 and the total price.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save ──
  const handleSave = async (publish = true) => {
    if (!validate() || !profileId) return;
    setSaveState('saving');
    setSaveError('');

    const payload = {
      profile_id: profileId,
      name: name.trim(),
      description: description.trim(),
      image_url: thumbnailUrl || null,
      price_total: parseFloat(priceTotal),
      deposit_amount: depositAmount ? parseFloat(depositAmount) : 0,
      duration_minutes: durationMinutes,
      category,
      active: publish ? true : false,
      is_featured: isFeatured,
    };

    try {
      if (isNew) {
        const { data, error } = await createService(payload);
        if (error) throw error;
        const newId = (data as ServiceRow).id;
        saveLocalPrefs(newId, { cardStyle, cardSubtitle, cardCta });
        setDirty(false);
        setSaveState('saved');
        navigate(`/dashboard/offer/${newId}`, { replace: true });
      } else if (serviceId) {
        const { error } = await updateService(serviceId, payload);
        if (error) throw error;
        saveLocalPrefs(serviceId, { cardStyle, cardSubtitle, cardCta });
        setDirty(false);
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 2500);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Save failed. Please try again.';
      setSaveState('error');
      setSaveError(msg);
    }
  };

  // ── Delete ──
  const handleDelete = async () => {
    if (!serviceId || isNew) return;
    setDeleting(true);
    try {
      await deleteService(serviceId);
      navigate('/dashboard/preview');
    } catch { setDeleting(false); setShowDelete(false); }
  };

  // ── Studio slug ──
  const slug = profile?.slug ?? 'my-studio';
  const studioUrl = `getnelsy.com/${slug}`;

  // ── Build live merchant for preview ──
  const accent = profile?.color_accent ?? '#F52B8C';
  const previewMerchant: Merchant = {
    id: profile?.id ?? 'preview',
    slug: slug,
    salon_name: profile?.salon_name ?? profile?.full_name ?? 'My Studio',
    name: profile?.full_name ?? '',
    bio: profile?.bio ?? '',
    logo_url: profile?.logo_url,
    cover_url: profile?.cover_url,
    specialty: profile?.specialty,
    location: profile?.location,
    instagram: profile?.instagram,
    tiktok: profile?.tiktok,
    theme_preset: profile?.theme_preset,
    color_accent: accent,
    services: [{
      id: serviceId ?? 'preview-service',
      name: name || 'Service name',
      description: description,
      price: parseFloat(priceTotal) || 0,
      duration: durationMinutes,
      deposit: parseFloat(depositAmount) || 0,
      category,
      image_url: thumbnailUrl || undefined,
      is_featured: isFeatured,
    }],
    rating: 0,
    review_count: 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[#F52B8C]" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Sidebar */}
      <Sidebar
        profile={profile}
        activeTab="preview"
        setActiveTab={(tab) => navigate(tab === 'home' ? '/dashboard' : `/dashboard/${tab}`)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* ── Main panel ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Header ── */}
        <header className="h-14 flex-shrink-0 bg-white border-b border-gray-100 flex items-center px-4 lg:px-6 gap-3">
          <Link
            to="/dashboard/preview"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">My Studio</span>
          </Link>
          <span className="text-gray-300 text-sm">/</span>
          <span className="text-sm font-semibold text-gray-900">
            {isNew ? 'New service' : (name || 'Edit service')}
          </span>
          <div className="flex-1" />
          {/* Studio URL */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={`/${slug}`} target="_blank" rel="noopener noreferrer"
              className="text-[#F52B8C] text-sm font-medium hover:opacity-80 transition truncate max-w-[180px]"
            >
              {studioUrl}
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`https://${studioUrl}`).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-[#F52B8C] hover:text-[#F52B8C] transition"
            >
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </header>

        {/* ── Body: form + preview ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* ── Edit column ── */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-white px-4 lg:px-6 flex-shrink-0">
              {(['thumbnail', 'checkout', 'options'] as const).map((tab) => {
                const label = tab === 'thumbnail' ? 'Thumbnail' : tab === 'checkout' ? 'Checkout Page' : 'Options';
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3.5 text-sm font-semibold border-b-2 transition mr-2 ${
                      activeTab === tab
                        ? 'border-[#F52B8C] text-[#F52B8C]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Form area */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-xl px-4 lg:px-6 py-6 space-y-8">

                {/* ── THUMBNAIL TAB ── */}
                {activeTab === 'thumbnail' && (
                  <>
                    {/* Step 1: Card style */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">1</span>
                        Pick a style
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {([
                          { id: 'button' as CardStyle, label: 'Button', icon: <ButtonIcon /> },
                          { id: 'callout' as CardStyle, label: 'Callout', icon: <CalloutIcon /> },
                          { id: 'preview' as CardStyle, label: 'Preview', icon: <PreviewIcon /> },
                        ] as const).map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setCardStyle(style.id)}
                            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition ${
                              cardStyle === style.id
                                ? 'border-[#F52B8C] bg-pink-50 text-[#F52B8C]'
                                : 'border-gray-200 text-gray-500 hover:border-gray-300'
                            }`}
                          >
                            {style.icon}
                            <span className="text-xs font-semibold">{style.label}</span>
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-3">
                        Card style is saved to this device. A future update will sync it across devices.
                      </p>
                    </section>

                    {/* Step 2: Image */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">2</span>
                        Select image
                      </p>
                      <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                        <div
                          className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0 relative cursor-pointer group"
                          onClick={() => thumbRef.current?.click()}
                        >
                          {thumbnailUrl
                            ? <img src={thumbnailUrl} alt="" className="w-full h-full object-cover" />
                            : <span className="text-2xl">💅</span>}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition rounded-xl flex items-center justify-center">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-600 mb-1">Thumbnail</p>
                          <p className="text-xs text-gray-400 mb-2">400 × 400 recommended</p>
                          <button
                            onClick={() => thumbRef.current?.click()}
                            disabled={uploadingThumb}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                          >
                            {uploadingThumb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                            {uploadingThumb ? 'Uploading…' : 'Choose image'}
                          </button>
                        </div>
                      </div>
                      {errors.thumb && <p className="text-red-500 text-xs mt-1">{errors.thumb}</p>}
                      <input ref={thumbRef} type="file" accept="image/*" className="hidden" onChange={handleThumbUpload} />
                    </section>

                    {/* Step 3: Text */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">3</span>
                        Add text
                      </p>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                            <span className="text-xs text-gray-400">{name.length}/50</span>
                          </div>
                          <input
                            type="text"
                            value={name}
                            maxLength={50}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Gel Manicure"
                            className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-medium text-gray-700">Subtitle</label>
                            <span className="text-xs text-gray-400">{cardSubtitle.length}/100</span>
                          </div>
                          <input
                            type="text"
                            value={cardSubtitle}
                            maxLength={100}
                            onChange={(e) => setCardSubtitle(e.target.value)}
                            placeholder="Short tagline for this service"
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none"
                          />
                          <p className="text-xs text-gray-400 mt-1">Only shown in Callout and Preview styles.</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-sm font-medium text-gray-700">Button text <span className="text-red-500">*</span></label>
                            <span className="text-xs text-gray-400">{cardCta.length}/30</span>
                          </div>
                          <input
                            type="text"
                            value={cardCta}
                            maxLength={30}
                            onChange={(e) => setCardCta(e.target.value)}
                            placeholder="Book now"
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none"
                          />
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {/* ── CHECKOUT PAGE TAB ── */}
                {activeTab === 'checkout' && (
                  <>
                    {/* Step 1: Image */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">1</span>
                        Select image
                      </p>
                      <div
                        className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-gray-300 transition cursor-pointer"
                        onClick={() => heroRef.current?.click()}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                          {heroUrl
                            ? <img src={heroUrl} alt="" className="w-full h-full object-cover" />
                            : <Eye className="w-6 h-6 text-gray-400" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 mb-2">Drag your image here · 1920 × 1080 recommended</p>
                          <button
                            type="button"
                            disabled={uploadingHero}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                          >
                            {uploadingHero ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                            {uploadingHero ? 'Uploading…' : 'Choose image'}
                          </button>
                        </div>
                      </div>
                      {errors.hero && <p className="text-red-500 text-xs mt-1">{errors.hero}</p>}
                      <input ref={heroRef} type="file" accept="image/*" className="hidden" onChange={handleHeroUpload} />
                    </section>

                    {/* Step 2: Description */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">2</span>
                        Write description
                      </p>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1.5">Title <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Gel Manicure"
                            className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1.5">Description</label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe what clients can expect from this service…"
                            rows={5}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none resize-none"
                          />
                        </div>
                      </div>
                    </section>

                    {/* Step 3: Price */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">3</span>
                        Set price
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1.5">Price (€) <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                            <input
                              type="number" value={priceTotal} step="0.01" min="0"
                              onChange={(e) => setPriceTotal(e.target.value)}
                              placeholder="65"
                              className={`w-full pl-7 pr-3.5 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${errors.price ? 'border-red-400' : 'border-gray-200'}`}
                            />
                          </div>
                          {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1.5">Deposit (€)</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">€</span>
                            <input
                              type="number" value={depositAmount} step="0.01" min="0"
                              onChange={(e) => setDepositAmount(e.target.value)}
                              placeholder="0"
                              className={`w-full pl-7 pr-3.5 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${errors.deposit ? 'border-red-400' : 'border-gray-200'}`}
                            />
                          </div>
                          {errors.deposit && <p className="text-red-500 text-xs mt-1">{errors.deposit}</p>}
                        </div>
                      </div>
                    </section>

                    {/* Step 4: Collect info */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">4</span>
                        Collect info
                      </p>
                      <div className="border border-gray-200 rounded-xl overflow-hidden">
                        {['Name', 'Email'].map((field, i) => (
                          <div key={field} className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                              {field === 'Name' ? '👤' : '✉️'}
                            </div>
                            <span className="text-sm font-medium text-gray-700">{field}</span>
                            <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">Required</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Name and email are always collected. Custom fields are coming soon.</p>
                    </section>

                    {/* Step 5: Service details */}
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">5</span>
                        Service details
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1.5">Duration</label>
                          <select
                            value={durationMinutes}
                            onChange={(e) => setDurationMinutes(parseInt(e.target.value))}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none bg-white"
                          >
                            {DURATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-1.5">Category</label>
                          <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none bg-white"
                          >
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {/* ── OPTIONS TAB ── */}
                {activeTab === 'options' && (
                  <div className="space-y-3">
                    {/* Featured */}
                    <Accordion
                      title="Featured service"
                      icon={<span>⭐</span>}
                      defaultOpen
                    >
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Highlight as most booked</p>
                          <p className="text-xs text-gray-500 mt-0.5">Marks this card as your featured service in the studio.</p>
                        </div>
                        <button
                          onClick={() => setIsFeatured(!isFeatured)}
                          className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${isFeatured ? 'bg-[#F52B8C]' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isFeatured ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    </Accordion>

                    {/* Active */}
                    <Accordion title="Visibility" icon={<Eye className="w-4 h-4" />}>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Active</p>
                          <p className="text-xs text-gray-500 mt-0.5">Visible to clients on your public studio page.</p>
                        </div>
                        <button
                          onClick={() => setIsActive(!isActive)}
                          className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${isActive ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isActive ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    </Accordion>

                    {/* Email flows */}
                    <Accordion title="Confirmation email" icon={<span>✉️</span>}>
                      <div className="pt-4">
                        <p className="text-sm text-gray-600">Nelsy automatically sends a booking confirmation email to your client when a booking is created.</p>
                        <p className="text-xs text-gray-400 mt-2">Custom email content and flows are coming in a future update.</p>
                      </div>
                    </Accordion>

                    {/* Reviews */}
                    <Accordion title="Reviews" icon={<span>⭐</span>}>
                      <div className="pt-4">
                        <p className="text-sm text-gray-600">Collect verified reviews from clients after their appointment.</p>
                        <p className="text-xs text-gray-400 mt-2">Review collection is coming in a future update.</p>
                      </div>
                    </Accordion>

                    {/* Advanced */}
                    <Accordion title="Advanced" icon={<span>⚙️</span>}>
                      <div className="pt-4 space-y-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 block mb-1.5">Service URL</label>
                          {serviceId && !isNew ? (
                            <div className="flex items-center gap-2">
                              <input
                                readOnly
                                value={`getnelsy.com/${slug}#${serviceId.slice(0, 8)}`}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-500 bg-gray-50 outline-none"
                              />
                              <button
                                onClick={() => { navigator.clipboard.writeText(`https://getnelsy.com/${slug}`).catch(() => {}); }}
                                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400">URL will be available after saving.</p>
                          )}
                        </div>
                      </div>
                    </Accordion>
                  </div>
                )}

                {/* Global save error */}
                {saveState === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{saveError}</p>
                  </div>
                )}
              </div>
            </div>

            {/* ── Footer ── */}
            <div className="flex-shrink-0 border-t border-gray-100 bg-white px-4 lg:px-6 py-3 flex items-center gap-3">
              {!isNew && (
                <button
                  onClick={() => setShowDelete(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              )}
              <div className="flex-1" />
              <button
                onClick={() => handleSave(false)}
                disabled={saveState === 'saving'}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                Save as draft
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={saveState === 'saving'}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {saveState === 'saving' ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</>
                ) : saveState === 'saved' ? (
                  <><CheckCheck className="w-3.5 h-3.5" /> Saved!</>
                ) : (
                  'Publish'
                )}
              </button>
            </div>
          </div>

          {/* ── Preview column (desktop only) ── */}
          <div className="hidden lg:flex w-72 flex-shrink-0 flex-col border-l border-gray-100 bg-gray-50">
            {/* Preview controls */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</span>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setPreviewMode('phone')}
                  className={`p-1.5 transition ${previewMode === 'phone' ? 'bg-[#F52B8C] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-1.5 transition ${previewMode === 'desktop' ? 'bg-[#F52B8C] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col items-center py-6 px-4 gap-4">
              {previewMode === 'phone' && activeTab === 'thumbnail' ? (
                <>
                  <p className="text-xs text-gray-400 text-center">Service card preview</p>
                  <div className="w-full max-w-[260px]">
                    <ServiceCardPreview
                      cardStyle={cardStyle}
                      name={name}
                      subtitle={cardSubtitle}
                      cta={cardCta}
                      imageUrl={thumbnailUrl}
                      price={priceTotal}
                      accent={accent}
                    />
                  </div>
                  <p className="text-xs text-gray-400 text-center px-4">
                    {cardStyle === 'button' && 'Minimal button — works well for express services.'}
                    {cardStyle === 'callout' && 'Callout — shows photo, title, subtitle, and CTA.'}
                    {cardStyle === 'preview' && 'Preview — large image with full details.'}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-400 text-center">Studio preview</p>
                  <PhoneMockup>
                    <PublicStudioView merchant={previewMerchant} mode="preview" />
                  </PhoneMockup>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm */}
      {showDelete && (
        <DeleteConfirm
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
          loading={deleting}
        />
      )}
    </div>
  );
}
