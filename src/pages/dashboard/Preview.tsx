import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Pencil, Trash2, EyeOff, GripVertical, MoreVertical,
  ChevronLeft, ChevronRight, Camera, Loader2, Star, Sparkles, FileDown, Package,
  UserRound, BookOpen, Users, Gift, Link2, Instagram, Check, Copy,
  Layers, ArrowUpRight, SlidersHorizontal,
  Eye, Monitor, Smartphone, X as XIcon, Info, Search, ChevronDown,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { THEMES } from '../../lib/themes';
import Toast from '../../components/dashboard/Toast';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import AddEditServiceModal from '../../components/dashboard/AddEditServiceModal';
import { useToast } from '../../hooks/useToast';
import {
  getServices, deleteService, toggleServiceActive, updateProfile, uploadImage,
  setFeaturedService, clearFeaturedService, reorderServices, createService,
} from '../../lib/supabase-queries';
import { supabase } from '../../lib/supabase';
import { buildLiveMerchant } from '../../lib/liveMerchant';
import { STUDIO_FONTS, ensureStudioFontLoaded, getStudioFont } from '../../lib/studioFonts';
import { CREATOR_VARIANTS } from '../../components/studio/layouts/LayoutCreator';
import { AnimatePresence, motion } from 'framer-motion';
import { StudioPhonePreview } from '../../components/dashboard/StudioPhonePreview';
import { TEMPLATE_DEMOS } from '../../lib/templateDemos';
import { STUDIO_TEMPLATES } from '@/lib/templateDemos';
import { PublicStudioView } from '../../components/studio/PublicStudioView';
import type { Merchant, Service } from '../../types';

// ── Types ─────────────────────────────────────────────────────────────────────

type MainTab = 'studio' | 'landing-pages' | 'design';
type StudioScreen = 'list' | 'type-picker' | 'edit-profile';
type OfferTypeId = 'beauty' | 'digital' | 'physical' | 'coaching' | 'course' | 'membership' | 'free' | 'link';

interface Profile {
  id?: string;
  full_name?: string;
  slug?: string;
  logo_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  color_accent?: string;
  theme_preset?: string;
  color_background?: string | null;
  font_family?: string | null;
  bio?: string;
  cover_url?: string;
  specialty?: string;
  location?: string;
}

interface DbService {
  id: string;
  name: string;
  description?: string;
  category?: string;
  price?: number;
  price_total?: number;
  deposit_amount?: number;
  duration?: number;
  duration_minutes?: number;
  active: boolean;
  image_url?: string;
  is_featured?: boolean;
  display_order?: number;
  card_style?: 'button' | 'callout' | 'preview' | null;
  card_subtitle?: string | null;
  card_cta_text?: string | null;
}

interface DesignForm {
  color_accent: string;
  theme_preset: string;
  /** null = use the template's own background / font */
  color_background: string | null;
  font_family: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getServicePrice(s: DbService) { return parseFloat(String(s.price_total ?? s.price ?? 0)); }
function getServiceDuration(s: DbService) { return s.duration_minutes ?? s.duration ?? 60; }
function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

// ── Offer types config ────────────────────────────────────────────────────────

interface OfferType {
  id: OfferTypeId;
  name: string;
  description: string;
  icon: LucideIcon;
  live: boolean;
}

const OFFER_TYPES: OfferType[] = [
  { id: 'beauty',     name: 'Beauty service',        description: 'Nails, lashes, brows, makeup, hair, skincare — bookable with calendar', icon: Sparkles,  live: true  },
  { id: 'digital',    name: 'Digital product',        description: 'Guides, ebooks, templates and downloadable resources',                  icon: FileDown,  live: false },
  { id: 'physical',   name: 'Physical product',       description: 'Press-ons, kits and products you ship',                                 icon: Package,   live: false },
  { id: 'coaching',   name: 'Coaching / consultation',description: 'Individual sessions, audits and consultations',                         icon: UserRound, live: false },
  { id: 'course',     name: 'Course / workshop',      description: 'Structured training or live event with registration',                   icon: BookOpen,  live: false },
  { id: 'membership', name: 'Membership / community', description: 'Recurring access with monthly or annual billing',                       icon: Users,     live: false },
  { id: 'free',       name: 'Free resource',          description: 'Free content with a simple form to collect contacts',                   icon: Gift,      live: false },
  { id: 'link',       name: 'External link',          description: 'Link to an external destination, affiliate or content',                 icon: Link2,     live: false },
];

function getOfferTypeFromCategory(category?: string): OfferType {
  const typeMap: Record<string, OfferType> = {
    '_digital':    OFFER_TYPES[1],
    '_physical':   OFFER_TYPES[2],
    '_coaching':   OFFER_TYPES[3],
    '_course':     OFFER_TYPES[4],
    '_membership': OFFER_TYPES[5],
    '_free':       OFFER_TYPES[6],
    '_link':       OFFER_TYPES[7],
  };
  return (category && typeMap[category]) ? typeMap[category] : OFFER_TYPES[0];
}

// ── Templates config ──────────────────────────────────────────────────────────

// Template list shared with the public /demo page
const TEMPLATES = STUDIO_TEMPLATES;


// Demo merchant for template gallery — uses specific picsum.photos IDs (Unsplash CC0)
// Gallery preview only — never applied to a user's published studio
const DEMO_MERCHANT_BASE: Omit<Merchant, 'theme_preset' | 'color_accent'> = {
  id: 'demo-preview',
  slug: 'demo',
  salon_name: 'Camille Studio',
  name: 'Camille Studio',
  bio: 'Precision nail art & Russian volume lashes, Paris.',
  specialty: 'Nail Artist',
  location: 'Paris',
  instagram: 'camille.studio',
  tiktok: 'camille.studio',
  // id/1027: warm beauty close-up portrait (Unsplash CC0)
  logo_url: 'https://picsum.photos/id/1027/400/600',
  rating: 0,
  review_count: 0,
  services: [
    {
      id: 'd1', name: 'Gel Manicure',
      description: 'Gel builder base with semi-permanent polish finish',
      price: 55, duration: 60, deposit: 15, category: 'Nails',
      // id/306: lotus flower — delicate, clean aesthetic
      image_url: 'https://picsum.photos/id/306/300/300',
    },
    {
      id: 'd2', name: 'Lash Extensions',
      description: 'Russian volume lashes, natural to dramatic looks',
      price: 90, duration: 120, deposit: 20, category: 'Lashes',
      is_featured: true,
      // id/888: warm atmospheric purple tones — works as hero image
      image_url: 'https://picsum.photos/id/888/400/300',
    },
    {
      id: 'd3', name: 'Nail Art (2 fingers)',
      description: 'Custom designs on any two fingers',
      price: 15, duration: 20, deposit: 0, category: 'Nails',
      // id/26: accessories flatlay — clean editorial aesthetic
      image_url: 'https://picsum.photos/id/26/300/300',
    },
  ] as Service[],
};

// ── Design controls ───────────────────────────────────────────────────────────

function ColorField({ label, value, onChange, isDefault, onReset }: {
  label: string; value: string; onChange: (v: string) => void; isDefault?: boolean; onReset?: () => void;
}) {
  const [text, setText] = useState(value.toUpperCase());
  useEffect(() => { setText(value.toUpperCase()); }, [value]);
  const commit = () => {
    const v = text.trim().startsWith('#') ? text.trim() : `#${text.trim()}`;
    if (/^#[0-9a-f]{6}$/i.test(v)) onChange(v.toLowerCase());
    else setText(value.toUpperCase());
  };
  const swatch = /^#[0-9a-f]{6}$/i.test(value) ? value : '#ffffff';
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-gray-500">{label}</span>
        {onReset && !isDefault && (
          <button onClick={onReset} className="text-[11px] font-semibold text-[#F52B8C] hover:opacity-75 transition">Reset</button>
        )}
      </div>
      <div className="flex items-center gap-2.5 px-3 py-2.5 border border-gray-200 rounded-xl bg-white focus-within:border-[#F52B8C] transition">
        <label className="relative w-7 h-7 rounded-full border border-black/10 flex-shrink-0 cursor-pointer overflow-hidden" style={{ background: swatch }}>
          <input type="color" value={swatch} onChange={(e) => onChange(e.target.value)} aria-label={`${label} color`}
            className="absolute inset-0 opacity-0 cursor-pointer" />
        </label>
        <input
          value={isDefault ? 'Template' : text}
          onFocus={() => { if (isDefault) setText(value.toUpperCase()); }}
          onChange={(e) => setText(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
          aria-label={`${label} hex code`}
          spellCheck={false}
          className={`w-full min-w-0 text-sm font-mono outline-none bg-transparent ${isDefault ? 'text-gray-400' : 'text-gray-800'}`}
        />
      </div>
    </div>
  );
}

function FontSelect({ value, templateFont, onChange }: {
  value: string | null; templateFont: string; onChange: (id: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  const options = [
    { id: null as string | null, label: `Template default (${templateFont})`, stack: undefined as string | undefined },
    ...STUDIO_FONTS.map((f) => ({ id: f.id as string | null, label: f.label, stack: f.stack })),
  ];
  const current = options.find((o) => o.id === value) ?? options[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white hover:border-gray-300 transition text-left"
      >
        <span className="text-[15px] text-gray-800 truncate" style={{ fontFamily: current.stack }}>{current.label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.14 }}
            className="absolute z-30 left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5"
          >
            {options.map((o) => {
              const selected = o.id === value;
              return (
                <li key={o.id ?? 'default'}>
                  <button
                    role="option"
                    aria-selected={selected}
                    onClick={() => { onChange(o.id); setOpen(false); }}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition ${selected ? 'bg-[#fff4f9]' : ''}`}
                  >
                    <span className="text-[15px] text-gray-800 truncate" style={{ fontFamily: o.stack }}>{o.label}</span>
                    {selected && <Check className="w-4 h-4 text-[#F52B8C] flex-shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Template coverflow ────────────────────────────────────────────────────────
// Selected card centered and in front; neighbours fan out with a slight 3D turn.

function TemplateCoverflow({ currentIdx, renderCard }: {
  currentIdx: number;
  renderCard: (idx: number, selected: boolean) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = TEMPLATES.length;
  const step = Math.max(70, Math.min(205, (width - CARD_W) / 4.2));
  const visible = width < 640 ? 1 : 3;

  return (
    <div ref={ref} className="relative mx-auto overflow-hidden" style={{ height: CARD_H + 48, perspective: 1600 }}>
      {TEMPLATES.map((tpl, idx) => {
        // Shortest signed distance on the ring so wrapping animates the right way
        let o = idx - currentIdx;
        if (o > n / 2) o -= n;
        if (o < -n / 2) o += n;
        const d = Math.abs(o);
        const hidden = d > visible;
        return (
          <div
            key={tpl.id}
            aria-hidden={o !== 0}
            style={{
              position: 'absolute',
              left: '50%',
              top: 20,
              width: CARD_W,
              marginLeft: -CARD_W / 2,
              transform: `translateX(${o * step}px) translateZ(${-d * 90}px) rotateY(${o === 0 ? 0 : o > 0 ? -16 : 16}deg) scale(${1 - Math.min(d, 3) * 0.06})`,
              zIndex: 20 - d,
              opacity: hidden ? 0 : d === 0 ? 1 : d === 1 ? 0.92 : 0.7,
              pointerEvents: hidden ? 'none' : 'auto',
              transition: 'transform 450ms cubic-bezier(.2,.8,.2,1), opacity 300ms ease',
            }}
          >
            {/* Far cards aren't mounted: each preview renders a full studio page */}
            {d <= visible + 1 ? renderCard(idx, o === 0) : null}
          </div>
        );
      })}
    </div>
  );
}

// ── Template gallery card ─────────────────────────────────────────────────────
// Card frame: 240×462px
// Inner render: 390×750px at scale(240/390 ≈ 0.615) — true mobile-width viewport
// Selected card: elevated shadow; others slightly dimmed. No colored ring.

interface TemplateCardProps {
  template: typeof TEMPLATES[number];
  accentOverride: string;
  backgroundOverride?: string | null;
  fontOverride?: string | null;
  selected: boolean;
  onClick: () => void;
}

const CARD_W = 240;
const CARD_H = 462;
const INNER_W = 390;
const INNER_H = 750;
const CARD_SCALE = CARD_W / INNER_W; // 0.6154…

function TemplateCard({ template, accentOverride, backgroundOverride, fontOverride, selected, onClick }: TemplateCardProps) {
  const demoMerchant: Merchant = {
    ...(TEMPLATE_DEMOS[template.id] ?? DEMO_MERCHANT_BASE),
    theme_preset: template.themeId,
    color_accent: accentOverride,
    color_background: backgroundOverride ?? undefined,
    font_family: fontOverride ?? undefined,
  };

  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${template.name} template`}
      className="flex-shrink-0 relative rounded-[22px] overflow-hidden bg-white focus-visible:outline-2 focus-visible:outline-[#F52B8C] focus-visible:outline-offset-2 cursor-pointer"
      style={{
        width: CARD_W,
        height: CARD_H,
        boxShadow: selected
          ? '0 24px 60px -18px rgba(26,26,26,0.35), 0 4px 14px rgba(26,26,26,0.08)'
          : '0 12px 30px -16px rgba(26,26,26,0.25)',
        transition: 'box-shadow 300ms ease',
      }}
    >
      {/* Mobile-width render clipped inside the card frame */}
      <div
        style={{
          width: INNER_W,
          height: INNER_H,
          transform: `scale(${CARD_SCALE})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <PublicStudioView merchant={demoMerchant} mode="preview" />
      </div>
    </button>
  );
}

// ── Offer row ─────────────────────────────────────────────────────────────────

interface OfferRowProps {
  service: DbService;
  isDragOver: boolean;
  onEdit: () => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
  settingFeatured: boolean;
  dragRowProps: React.HTMLAttributes<HTMLDivElement>;
}

function OfferRow({
  service, isDragOver,
  onEdit, onDuplicate, onToggleVisibility, onDelete, onToggleFeatured, settingFeatured,
  dragRowProps,
}: OfferRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const offerType = getOfferTypeFromCategory(service.category);
  const price = getServicePrice(service);
  const TypeIcon = offerType.icon;

  useEffect(() => {
    if (!menuOpen) return;
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [menuOpen]);

  return (
    <div
      {...dragRowProps}
      className={`group flex items-center gap-3 sm:gap-4 pl-2 pr-2 sm:pr-3 py-3 bg-white border rounded-2xl transition-all duration-200 cursor-default hover:-translate-y-px hover:shadow-[0_8px_24px_-14px_rgba(26,26,26,0.25)] ${
        isDragOver ? 'border-[#F52B8C] ring-2 ring-[#F52B8C]/20' : 'border-gray-100 hover:border-gray-200'
      } ${service.active ? '' : 'opacity-70'}`}
    >
      {/* Drag handle */}
      <div
        className="cursor-grab text-gray-300 group-hover:text-gray-500 flex-shrink-0 active:cursor-grabbing touch-none px-1"
        onMouseDown={(e) => e.stopPropagation()}
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Thumbnail */}
      <button onClick={onEdit} className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#fff4f9] flex items-center justify-center" aria-label={`Edit ${service.name}`}>
        {service.image_url
          ? <img src={service.image_url} alt="" className="w-full h-full object-cover" />
          : <TypeIcon className="w-5 h-5 text-[#F52B8C]/50" />}
      </button>

      {/* Name + price */}
      <button onClick={onEdit} className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1.5 min-w-0">
          <p className="font-semibold text-[#1A1A1A] text-[15px] sm:text-base leading-tight truncate">{service.name}</p>
          {service.is_featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" aria-label="Featured" />}
          {!service.active && <OfferStatusBadge active={false} />}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          <span className="font-medium text-gray-800">{fmt(price)}</span>
          {offerType.id === 'beauty' && <span> · {getServiceDuration(service)} min</span>}
          {Number(service.deposit_amount ?? 0) > 0 && <span> · {fmt(Number(service.deposit_amount))} deposit</span>}
        </p>
      </button>

      {/* ⋮ menu — far right */}
      <div className="relative flex-shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl z-30 py-1.5 overflow-hidden">
            <button onClick={() => { setMenuOpen(false); onEdit(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
              <Pencil className="w-3.5 h-3.5" /> Edit offer
            </button>
            <button onClick={() => { setMenuOpen(false); onDuplicate(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
              <Copy className="w-3.5 h-3.5" /> Duplicate
            </button>
            <button onClick={() => { setMenuOpen(false); onToggleFeatured(); }} disabled={settingFeatured}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-40">
              <Star className={`w-3.5 h-3.5 ${service.is_featured ? 'fill-amber-400 text-amber-400' : ''}`} />
              {service.is_featured ? 'Remove featured' : 'Set as featured'}
            </button>
            <div className="h-px bg-gray-100 mx-3 my-1" />
            <button onClick={() => { setMenuOpen(false); onToggleVisibility(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
              <EyeOff className="w-3.5 h-3.5" />
              {service.active ? 'Hide from studio' : 'Show in studio'}
            </button>
            <div className="h-px bg-gray-100 mx-3 my-1" />
            <button onClick={() => { setMenuOpen(false); onDelete(); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Offer type picker ─────────────────────────────────────────────────────────

function OfferTypePicker({ onSelect, onCancel }: {
  onSelect: (type: OfferType) => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-center gap-3 px-8 py-5 border-b border-gray-100">
        <button onClick={onCancel} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-lg text-[#1A1A1A]">Choose your offer type</h2>
          <p className="text-sm text-gray-400 mt-0.5">Pick the format that fits what you're offering</p>
        </div>
      </div>
      <div className="flex-1 px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
        {OFFER_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type)}
              disabled={!type.live}
              className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all ${
                type.live
                  ? 'bg-white border-gray-200 hover:border-[#F52B8C] hover:bg-[#fff8fa] hover:shadow-sm'
                  : 'bg-gray-50 border-gray-100 cursor-not-allowed'
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                type.live ? 'bg-[#fff0f7]' : 'bg-gray-100'
              }`}>
                <Icon className={`w-5 h-5 ${type.live ? 'text-[#F52B8C]' : 'text-gray-400'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className={`font-semibold ${type.live ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>{type.name}</p>
                  {!type.live && (
                    <span className="text-[10px] font-medium text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">Soon</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{type.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Edit profile panel ────────────────────────────────────────────────────────

function EditProfilePanel({ profile, onBack }: { profile: Profile | null; onBack: () => void }) {
  const [form, setForm] = useState({
    full_name: profile?.full_name ?? '',
    slug: profile?.slug ?? '',
    specialty: profile?.specialty ?? '',
    location: profile?.location ?? '',
    bio: profile?.bio ?? '',
    instagram_url: profile?.instagram_url ?? '',
    tiktok_url: profile?.tiktok_url ?? '',
  });
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const slugTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.logo_url ?? '');
  const [coverUrl, setCoverUrl] = useState(profile?.cover_url ?? '');
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useToast();

  const checkSlug = useCallback(async (value: string) => {
    if (!value || value === profile?.slug) { setSlugStatus('idle'); return; }
    if (!/^[a-z0-9-]{3,30}$/.test(value)) { setSlugStatus('invalid'); return; }
    setSlugStatus('checking');
    try {
      // profiles RLS only exposes the caller's own row; the public view covers all slugs
      const { count } = await supabase!
        .from('public_profiles')
        .select('id', { count: 'exact', head: true })
        .eq('slug', value)
        .neq('id', profile?.id ?? '');
      setSlugStatus((count ?? 0) > 0 ? 'taken' : 'available');
    } catch { setSlugStatus('idle'); }
  }, [profile?.id, profile?.slug]);

  const handleSlugChange = (value: string) => {
    const clean = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setForm((f) => ({ ...f, slug: clean }));
    setSlugStatus('idle');
    if (slugTimer.current) clearTimeout(slugTimer.current);
    slugTimer.current = setTimeout(() => void checkSlug(clean), 500);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadImage(file, 'avatars');
      await updateProfile(profile.id, { logo_url: url });
      setAvatarUrl(url);
      showSuccess('Photo updated');
    } catch { showError('Upload failed'); }
    finally { setUploadingAvatar(false); if (avatarRef.current) avatarRef.current.value = ''; }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    setUploadingCover(true);
    try {
      const url = await uploadImage(file, 'covers');
      await updateProfile(profile.id, { cover_url: url });
      setCoverUrl(url);
      showSuccess('Cover updated');
    } catch { showError('Upload failed'); }
    finally { setUploadingCover(false); if (coverRef.current) coverRef.current.value = ''; }
  };

  const save = async () => {
    if (!profile?.id) return;
    if (slugStatus === 'taken') { showError('This URL is already taken'); return; }
    if (slugStatus === 'invalid') { showError('URL must be 3-30 characters, lowercase letters, numbers and hyphens only'); return; }
    setSaving(true);
    try {
      const updates: Record<string, unknown> = {
        full_name: form.full_name, bio: form.bio,
        instagram_url: form.instagram_url, tiktok_url: form.tiktok_url,
        instagram: form.instagram_url, tiktok: form.tiktok_url,
        specialty: form.specialty || null, location: form.location || null,
      };
      if (form.slug && form.slug !== profile?.slug && slugStatus === 'available') {
        updates.slug = form.slug;
      }
      await updateProfile(profile.id, updates);
      showSuccess('Profile saved');
      onBack();
    } catch { showError('Failed to save'); }
    finally { setSaving(false); }
  };

  const initials = (form.full_name || 'Y').charAt(0).toUpperCase();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-8 py-4 border-b border-gray-100">
        <button onClick={onBack} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-[#1A1A1A]">Edit profile</h2>
      </div>

      <div className="px-8 py-6 space-y-6 max-w-xl">
        {/* Cover */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Cover photo</p>
          <div onClick={() => coverRef.current?.click()}
            className="relative w-full h-28 rounded-2xl overflow-hidden cursor-pointer group">
            {coverUrl
              ? <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-gray-400" />
                </div>}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            {uploadingCover && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><Loader2 className="w-5 h-5 text-white animate-spin" /></div>}
          </div>
          <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
        </div>

        {/* Avatar */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-widest">Profile photo</p>
          <div className="flex items-center gap-4">
            <div onClick={() => avatarRef.current?.click()}
              className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 cursor-pointer group flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F52B8C, #E0167A)' }}>
              {avatarUrl ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" /> : <span className="text-white font-bold text-xl">{initials}</span>}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"><Camera className="w-4 h-4 text-white" /></div>
            </div>
            <button onClick={() => avatarRef.current?.click()} disabled={uploadingAvatar}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
              {uploadingAvatar ? 'Uploading…' : 'Change photo'}
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Profile info</p>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Studio name</label>
            <input type="text" value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition" placeholder="Your Studio Name" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Studio URL</label>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#F52B8C] transition bg-white">
              <span className="px-3 py-3 text-sm text-gray-400 bg-gray-50 border-r border-gray-200 whitespace-nowrap flex-shrink-0">getnelsy.com/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                maxLength={30}
                className="flex-1 px-3 py-3 text-sm focus:outline-none bg-transparent"
                placeholder="your-studio"
              />
              {slugStatus === 'checking' && <span className="pr-3 text-xs text-gray-400">checking…</span>}
              {slugStatus === 'available' && <span className="pr-3 text-xs text-green-600 font-semibold">✓ available</span>}
              {slugStatus === 'taken' && <span className="pr-3 text-xs text-red-500 font-semibold">✗ taken</span>}
              {slugStatus === 'invalid' && <span className="pr-3 text-xs text-red-500 font-semibold">✗ invalid</span>}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">Lowercase letters, numbers and hyphens only. Min 3 characters.</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Specialty</label>
              <input type="text" value={form.specialty} onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition" placeholder="Nail Artist" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Location</label>
              <input type="text" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition" placeholder="Paris 9e" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Bio</label>
            <textarea value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={3} maxLength={160}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition resize-none"
              placeholder="Gel & nail art specialist · 5+ years" />
            <p className="text-right text-[10px] text-gray-300 -mt-0.5">{form.bio.length}/160</p>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Social links</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">IG</div>
            <input type="text" value={form.instagram_url} onChange={(e) => setForm((f) => ({ ...f, instagram_url: e.target.value }))}
              placeholder="@your_instagram"
              className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">TT</div>
            <input type="text" value={form.tiktok_url} onChange={(e) => setForm((f) => ({ ...f, tiktok_url: e.target.value }))}
              placeholder="@your_tiktok"
              className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition" />
          </div>
        </div>

        <button disabled={saving} onClick={save}
          className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base hover:opacity-90 transition disabled:opacity-50">
          {saving ? 'Saving…' : 'Save profile'}
        </button>
      </div>
    </div>
  );
}

// ── Studio Preview Modal ───────────────────────────────────────────────────────

type PreviewViewport = 'phone' | 'desktop';

interface StudioPreviewModalProps {
  merchant: Merchant;
  onClose: () => void;
}

function StudioPreviewModal({ merchant, onClose }: StudioPreviewModalProps) {
  const [viewport, setViewport] = useState<PreviewViewport>('phone');

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#1A1A1A]">
        <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5">
          <button
            onClick={() => setViewport('phone')}
            aria-label="Phone preview"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              viewport === 'phone' ? 'bg-white text-[#1A1A1A]' : 'text-white/70 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Phone
          </button>
          <button
            onClick={() => setViewport('desktop')}
            aria-label="Desktop preview"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
              viewport === 'desktop' ? 'bg-white text-[#1A1A1A]' : 'text-white/70 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
        </div>
        <p className="text-xs text-white/50 flex-1 text-center">
          Preview only — no changes are published
        </p>
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <XIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Preview frame */}
      <div className="flex-1 overflow-hidden flex items-start justify-center py-6 px-4">
        {viewport === 'phone' ? (
          /* Phone: 390px frame with rounded corners like a device */
          <div
            className="w-[390px] flex-shrink-0 bg-white overflow-y-auto shadow-2xl"
            style={{ height: '100%', maxHeight: 780, borderRadius: 24, border: '6px solid #333' }}
          >
            <PublicStudioView merchant={merchant} mode="preview" />
          </div>
        ) : (
          /* Desktop: full-width scrollable content area */
          <div
            className="w-full max-w-5xl bg-white overflow-y-auto shadow-2xl flex-shrink-0"
            style={{ height: '100%', borderRadius: 12, border: '1px solid rgba(255,255,255,0.15)' }}
          >
            <PublicStudioView merchant={merchant} mode="preview" />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Status badge helpers ───────────────────────────────────────────────────────

function OfferStatusBadge({ active }: { active: boolean }) {
  if (active) {
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-full flex-shrink-0 leading-none">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
        Published
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded-full flex-shrink-0 leading-none">
      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
      Hidden
    </span>
  );
}

// ── Secondary action buttons ───────────────────────────────────────────────────

function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        aria-label="More information"
        className="p-0.5 text-gray-400 hover:text-gray-600 transition focus-visible:ring-1 focus-visible:ring-[#F52B8C] focus-visible:outline-none rounded"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {open && (
        <div
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-56 bg-[#1A1A1A] text-white text-xs leading-snug rounded-xl px-3 py-2.5 shadow-xl pointer-events-none"
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1A1A1A]" />
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Preview({ profile }: { profile: Profile | null }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainTab>('studio');
  const [studioScreen, setStudioScreen] = useState<StudioScreen>('list');
  const [offerQuery, setOfferQuery] = useState('');
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [settingFeatured, setSettingFeatured] = useState<string | null>(null);
  const [savingDesign, setSavingDesign] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.logo_url ?? '');
  const [savedDesign, setSavedDesign] = useState<DesignForm>({
    color_accent: profile?.color_accent ?? '#F52B8C',
    theme_preset: profile?.theme_preset ?? 'soft_pink',
    color_background: profile?.color_background ?? null,
    font_family: profile?.font_family ?? null,
  });
  const [designForm, setDesignForm] = useState<DesignForm>(savedDesign);

  // Template gallery carousel index
  const selectedTplIdx = TEMPLATES.findIndex((t) => t.themeId === designForm.theme_preset);
  const currentTplIdx = selectedTplIdx >= 0 ? selectedTplIdx : 0;
  // Studio still on a template that is no longer offered in the gallery
  const legacyTemplate = selectedTplIdx < 0;

  // Drag state
  const dragSrcIdx = useRef<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean; title: string; message: string; onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const { toast, showSuccess, showError, hideToast } = useToast();
  // Font buttons render in their own typeface
  useEffect(() => {
    if (activeTab === 'design') STUDIO_FONTS.forEach(ensureStudioFontLoaded);
  }, [activeTab]);
  useEffect(() => {
    setAvatarUrl(profile?.logo_url ?? '');
    const d: DesignForm = {
      color_accent: profile?.color_accent ?? '#F52B8C',
      theme_preset: profile?.theme_preset ?? 'soft_pink',
      color_background: profile?.color_background ?? null,
      font_family: profile?.font_family ?? null,
    };
    setSavedDesign(d);
    setDesignForm(d);
  }, [profile?.logo_url, profile?.color_accent, profile?.theme_preset, profile?.color_background, profile?.font_family]);

  const loadServices = useCallback(async () => {
    if (!profile?.id) { setLoading(false); return; }
    try {
      const { data } = await getServices(profile.id);
      setServices((data as DbService[]) ?? []);
    } catch { showError('Failed to load offers'); }
    finally { setLoading(false); }
  }, [profile?.id, showError]);

  useEffect(() => { void loadServices(); }, [loadServices]);

  const handleEdit = (service: DbService) => { navigate(`/dashboard/offer/${service.id}`); };

  const handleDuplicate = async (service: DbService) => {
    if (!profile?.id) return;
    try {
      await createService({
        profile_id: profile.id,
        name: `${service.name} (copy)`,
        description: service.description ?? '',
        category: service.category ?? 'Nails',
        price_total: service.price_total ?? service.price ?? 0,
        deposit_amount: service.deposit_amount ?? 0,
        duration_minutes: service.duration_minutes ?? service.duration ?? 60,
        active: true,
        display_order: services.length,
      });
      showSuccess('Duplicated');
      void loadServices();
    } catch { showError('Failed'); }
  };

  const handleToggleVisibility = async (service: DbService) => {
    try {
      await toggleServiceActive(service.id, !service.active);
      showSuccess(service.active ? 'Hidden' : 'Visible');
      void loadServices();
    } catch { showError('Failed'); }
  };

  const handleDelete = (service: DbService) => {
    setConfirmDialog({
      isOpen: true, title: 'Delete offer',
      message: `Delete "${service.name}"? This cannot be undone.`,
      onConfirm: async () => {
        try { await deleteService(service.id); showSuccess('Deleted'); void loadServices(); }
        catch { showError('Failed'); }
      },
    });
  };

  const handleToggleFeatured = async (service: DbService) => {
    if (!profile?.id) return;
    setSettingFeatured(service.id);
    try {
      if (service.is_featured) {
        await clearFeaturedService(profile.id);
        setServices((prev) => prev.map((s) => ({ ...s, is_featured: false })));
      } else {
        await setFeaturedService(profile.id, service.id);
        setServices((prev) => prev.map((s) => ({ ...s, is_featured: s.id === service.id })));
      }
    } catch { showError('Failed'); }
    finally { setSettingFeatured(null); }
  };

  const handleReorder = async (from: number, to: number) => {
    if (from === to) return;
    const reordered = [...services];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setServices(reordered);
    try { await reorderServices(reordered.map((s, i) => ({ id: s.id, display_order: i }))); }
    catch { void loadServices(); }
  };

  const saveDesign = async () => {
    if (!profile?.id) return;
    setSavingDesign(true);
    try {
      const { error } = await updateProfile(profile.id, {
        color_accent: designForm.color_accent,
        theme_preset: designForm.theme_preset,
        color_background: designForm.color_background,
        font_family: designForm.font_family,
      });
      if (error) throw error;
      setSavedDesign(designForm);
      showSuccess('Design saved!');
    } catch { showError('Failed'); }
    finally { setSavingDesign(false); }
  };

  const cancelDesign = () => setDesignForm(savedDesign);

  // A new template starts from its own colors and font
  const applyTemplate = (tpl: typeof TEMPLATES[number]) =>
    setDesignForm((f) => ({ ...f, theme_preset: tpl.themeId, color_accent: tpl.accentColor, color_background: null, font_family: null }));

  const navigateTemplate = (dir: 1 | -1) => {
    applyTemplate(TEMPLATES[(currentTplIdx + dir + TEMPLATES.length) % TEMPLATES.length]);
  };

  const visibleServices = offerQuery.trim()
    ? services.filter((sv) => sv.name.toLowerCase().includes(offerQuery.trim().toLowerCase()))
    : services;

  // ── Tab definitions ──────────────────────────────────────────────

  const TABS = [
    { id: 'studio' as MainTab,        label: 'Studio',        Icon: Layers           },
    { id: 'landing-pages' as MainTab, label: 'Landing Pages', Icon: ArrowUpRight     },
    { id: 'design' as MainTab,        label: 'Edit Design',   Icon: SlidersHorizontal },
  ];

  const templateBg = THEMES[designForm.theme_preset]?.pageBg ?? '#FFFFFF';
  const templateFontLabel = getStudioFont(CREATOR_VARIANTS[designForm.theme_preset]?.nameFont)?.label
    ?? (THEMES[designForm.theme_preset]?.fontClass === 'font-serif' ? 'Playfair Display' : 'Inter');
  const designDirty = designForm.theme_preset !== savedDesign.theme_preset
    || designForm.color_accent !== savedDesign.color_accent
    || designForm.color_background !== savedDesign.color_background
    || designForm.font_family !== savedDesign.font_family;
  const bgColor = designForm.color_background ?? templateBg;

  // Build a live merchant from real profile + services for preview
  const liveMerchant: Merchant = buildLiveMerchant(profile, services, {
    theme_preset: designForm.theme_preset,
    color_accent: designForm.color_accent,
    color_background: designForm.color_background,
    font_family: designForm.font_family,
  });

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div className="bg-white min-h-full">

      {/* Tab bar */}
      <div className="px-4 sm:px-8 pt-6 pb-0">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200">
          <div className="flex items-center min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setStudioScreen('list'); }}
              className={`relative flex items-center gap-1.5 sm:gap-2 pb-3.5 px-0 mr-5 sm:mr-8 text-sm sm:text-[15px] font-semibold whitespace-nowrap flex-shrink-0 transition-colors ${
                activeTab === id ? 'text-[#F52B8C]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {activeTab === id && (
                <motion.span layoutId="studio-tab-underline" className="absolute left-0 right-0 -bottom-px h-[2px] rounded-full bg-[#F52B8C]"
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
              )}
            </button>
          ))}
          </div>
          {/* Preview button */}
          <button
            onClick={() => setShowPreview(true)}
            aria-label="Preview your studio"
            className="flex flex-shrink-0 items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 mb-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:border-[#F52B8C] hover:text-[#F52B8C] transition focus-visible:ring-2 focus-visible:ring-[#F52B8C] focus-visible:outline-none"
          >
            <Eye className="w-4 h-4" /> <span className="hidden sm:inline">Preview</span>
          </button>
        </div>
      </div>

      {/* Preview modal */}
      {showPreview && (
        <StudioPreviewModal merchant={liveMerchant} onClose={() => setShowPreview(false)} />
      )}

      {/* ── STUDIO TAB ─────────────────────────────────────────────── */}
      {activeTab === 'studio' && (
        <>
          {studioScreen === 'type-picker' && (
            <OfferTypePicker
              onSelect={() => {
                navigate('/dashboard/offer/new');
              }}
              onCancel={() => setStudioScreen('list')}
            />
          )}

          {studioScreen === 'edit-profile' && (
            <EditProfilePanel profile={profile} onBack={() => setStudioScreen('list')} />
          )}

          {studioScreen === 'list' && (
            <div className="px-4 sm:px-8 pt-6 pb-10">
              <div className="grid xl:grid-cols-[minmax(0,1fr)_320px] gap-8 xl:gap-12">
                <div className="min-w-0 space-y-4">
                  {/* Profile card */}
                  <div className="flex items-start gap-4 sm:gap-5 p-4 sm:p-5 bg-white border border-gray-100 rounded-2xl">
                    <button
                      onClick={() => setStudioScreen('edit-profile')}
                      className="relative flex-shrink-0 group w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #F52B8C, #E0167A)' }}
                      aria-label="Change photo"
                    >
                      {avatarUrl
                        ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
                        : <span className="text-white font-bold text-3xl">{(profile?.full_name ?? 'Y').charAt(0).toUpperCase()}</span>}
                      <span className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <Camera className="w-5 h-5 text-white" />
                      </span>
                    </button>

                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold text-[#1A1A1A] text-lg sm:text-xl leading-tight truncate">{profile?.full_name || 'Your studio'}</p>
                          {profile?.slug && <p className="text-sm text-gray-500 mt-0.5 truncate">@{profile.slug}</p>}
                        </div>
                        <button
                          onClick={() => setStudioScreen('edit-profile')}
                          className="flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold text-[#F52B8C] hover:opacity-75 transition"
                        >
                          <Pencil className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Edit profile</span>
                        </button>
                      </div>
                      {(profile?.specialty || profile?.location) && (
                        <p className="text-sm text-gray-500 mt-1.5 truncate">{[profile?.specialty, profile?.location].filter(Boolean).join(' · ')}</p>
                      )}
                      <div className="flex items-center gap-2 mt-3">
                        {profile?.instagram_url && (
                          <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center" title={`Instagram: ${profile.instagram_url}`}>
                            <Instagram className="w-4 h-4 text-gray-700" />
                          </span>
                        )}
                        {profile?.tiktok_url && (
                          <span className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-[11px] font-bold text-gray-700" title={`TikTok: ${profile.tiktok_url}`}>
                            TT
                          </span>
                        )}
                        {!profile?.instagram_url && !profile?.tiktok_url && (
                          <button onClick={() => setStudioScreen('edit-profile')} className="text-xs font-semibold text-gray-500 hover:text-[#F52B8C] transition">
                            + Add your Instagram or TikTok
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Search */}
                  {services.length > 3 && (
                    <div className="relative">
                      <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="search"
                        value={offerQuery}
                        onChange={(e) => setOfferQuery(e.target.value)}
                        placeholder="Search your offers"
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                      />
                    </div>
                  )}

                  {/* Offer list */}
                  {loading ? (
                    <div className="space-y-2.5">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="h-[82px] bg-gray-50 border border-gray-100 rounded-2xl animate-pulse" />
                      ))}
                    </div>
                  ) : services.length === 0 ? (
                    <button
                      onClick={() => setStudioScreen('type-picker')}
                      className="w-full border-2 border-dashed border-gray-200 hover:border-[#F52B8C] rounded-2xl py-12 px-6 text-center transition group"
                    >
                      <span className="w-12 h-12 rounded-2xl bg-[#fde8f3] flex items-center justify-center mx-auto mb-3">
                        <Sparkles className="w-6 h-6 text-[#F52B8C]" />
                      </span>
                      <p className="font-semibold text-[#1A1A1A]">Add your first offer</p>
                      <p className="text-sm text-gray-500 mt-1">A service with a price and a duration is all clients need to book you.</p>
                    </button>
                  ) : (
                    <div className="space-y-2.5">
                      {visibleServices.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-6">No offer matches "{offerQuery}".</p>
                      )}
                      {visibleServices.map((service) => {
                        const idx = services.indexOf(service);
                        return (
                          <OfferRow
                            key={service.id}
                            service={service}
                            isDragOver={dragOverIdx === idx}
                            dragRowProps={offerQuery ? {} : {
                              draggable: true,
                              onDragStart: () => { dragSrcIdx.current = idx; },
                              onDragOver: (e) => { e.preventDefault(); setDragOverIdx(idx); },
                              onDrop: (e) => {
                                e.preventDefault();
                                if (dragSrcIdx.current !== null) { void handleReorder(dragSrcIdx.current, idx); dragSrcIdx.current = null; }
                                setDragOverIdx(null);
                              },
                              onDragEnd: () => { dragSrcIdx.current = null; setDragOverIdx(null); },
                            }}
                            onEdit={() => handleEdit(service)}
                            onDuplicate={() => void handleDuplicate(service)}
                            onToggleVisibility={() => void handleToggleVisibility(service)}
                            onDelete={() => handleDelete(service)}
                            onToggleFeatured={() => void handleToggleFeatured(service)}
                            settingFeatured={settingFeatured === service.id}
                          />
                        );
                      })}
                    </div>
                  )}

                  {/* Add offer */}
                  <button
                    onClick={() => setStudioScreen('type-picker')}
                    className="w-full h-14 bg-[#F52B8C] text-white rounded-full font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition active:scale-[0.99] shadow-[0_8px_24px_-8px_rgba(245,43,140,0.6)]"
                  >
                    <Plus className="w-5 h-5" /> Add an offer
                  </button>

                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => navigate('/dashboard/collection/new')}
                      className="text-sm font-semibold text-[#F52B8C] hover:opacity-75 transition flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add a service collection
                    </button>
                    <InfoTooltip text="Group bookable services under one heading, like Nails or Lashes. Clients browse and book within the collection." />
                  </div>
                </div>

                {/* Live preview */}
                <aside className="hidden xl:block">
                  <div className="sticky top-6 flex flex-col items-center gap-4">
                    <StudioPhonePreview merchant={liveMerchant} width={290} />
                    <button
                      onClick={() => setShowPreview(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fde8f3] text-[#F52B8C] text-sm font-bold hover:bg-[#fbd9eb] transition"
                    >
                      <Eye className="w-4 h-4" /> Full preview
                    </button>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── LANDING PAGES TAB ──────────────────────────────────────── */}
      {activeTab === 'landing-pages' && (
        <div className="px-8 pt-7 pb-8">
          <div className="w-full border border-gray-200 rounded-2xl min-h-[440px] flex flex-col items-center justify-center text-center px-8">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <ArrowUpRight className="w-6 h-6 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Create a landing page</h2>
            <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed mb-8">
              Share a direct link to any offer without displaying it on your public studio page.
            </p>
            <button
              onClick={() => {
                if (services.length === 0) {
                  setActiveTab('studio');
                  setTimeout(() => setStudioScreen('type-picker'), 100);
                } else {
                  setActiveTab('studio');
                  setTimeout(() => setStudioScreen('type-picker'), 100);
                }
              }}
              className="px-8 py-3.5 bg-[#F52B8C] text-white rounded-2xl font-bold text-sm hover:opacity-90 transition"
            >
              + Add landing page
            </button>
            {services.length === 0 && (
              <p className="text-xs text-gray-400 mt-4">
                Add at least one offer first — you'll be able to link to it via a landing page.
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── DESIGN TAB ─────────────────────────────────────────────── */}
      {activeTab === 'design' && (
        <div>
          {/* Gallery: carousel centered on the selected template */}
          <div
            className="pt-6 pb-2 outline-none"
            tabIndex={0}
            role="region"
            aria-label="Template gallery"
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') { e.preventDefault(); navigateTemplate(-1); }
              if (e.key === 'ArrowRight') { e.preventDefault(); navigateTemplate(1); }
            }}
          >
            <TemplateCoverflow
              currentIdx={currentTplIdx}
              renderCard={(idx, selected) => {
                const tpl = TEMPLATES[idx];
                return (
                  <TemplateCard
                    template={tpl}
                    accentOverride={selected ? designForm.color_accent : tpl.accentColor}
                    backgroundOverride={selected ? designForm.color_background : null}
                    fontOverride={selected ? designForm.font_family : null}
                    selected={selected}
                    onClick={() => (selected && !legacyTemplate ? undefined : applyTemplate(tpl))}
                  />
                );
              }}
            />
          </div>

          {/* Template name + prev/next controls */}
          <div className="flex items-center justify-center gap-4 py-4">
            <button
              onClick={() => navigateTemplate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
              aria-label="Previous template"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-[18px] font-bold text-[#1A1A1A] w-32 text-center">
              {TEMPLATES[currentTplIdx]?.name ?? ''}
            </span>
            <button
              onClick={() => navigateTemplate(1)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
              aria-label="Next template"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-[13px] text-gray-400 pb-5 px-4">
            {legacyTemplate
              ? <>Your studio uses an older template. Click a card to pick a new one, then save.</>
              : <>Use the arrows, your keyboard arrow keys, or click a card. {currentTplIdx + 1} of {TEMPLATES.length}.</>}
          </p>

          {/* Colors + font, one panel */}
          <div className="px-4 sm:px-8 pb-2">
            <div className="border border-gray-200 rounded-2xl p-5 sm:p-6 grid md:grid-cols-2 gap-6 md:gap-10 bg-white">
              <div>
                <p className="text-[15px] font-semibold text-[#1A1A1A] mb-3">Colors</p>
                <div className="grid grid-cols-2 gap-3">
                  <ColorField
                    label="Accent"
                    value={designForm.color_accent}
                    onChange={(v) => setDesignForm((f) => ({ ...f, color_accent: v }))}
                  />
                  <ColorField
                    label="Background"
                    value={bgColor}
                    isDefault={!designForm.color_background}
                    onChange={(v) => setDesignForm((f) => ({ ...f, color_background: v }))}
                    onReset={() => setDesignForm((f) => ({ ...f, color_background: null }))}
                  />
                </div>
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#1A1A1A] mb-3">Font</p>
                <FontSelect
                  value={designForm.font_family}
                  templateFont={templateFontLabel}
                  onChange={(id) => setDesignForm((f) => ({ ...f, font_family: id }))}
                />
              </div>
            </div>
          </div>

          {/* Cancel / Save */}
          <div className="px-4 sm:px-8 py-5 flex items-center justify-end gap-3">
            <AnimatePresence>
              {designDirty && (
                <motion.span initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="mr-auto text-sm text-gray-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F52B8C]" /> Unsaved changes
                </motion.span>
              )}
            </AnimatePresence>
            <button
              onClick={cancelDesign}
              disabled={!designDirty || savingDesign}
              className="px-6 py-2.5 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full hover:border-gray-400 transition active:scale-[0.98] disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              onClick={saveDesign}
              disabled={!designDirty || savingDesign}
              className="px-7 py-2.5 text-sm font-bold text-white bg-[#F52B8C] rounded-full hover:opacity-90 transition active:scale-[0.98] disabled:opacity-40 shadow-[0_8px_20px_-8px_rgba(245,43,140,0.6)]"
            >
              {savingDesign ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddEditServiceModal
        isOpen={showServiceModal}
        onClose={() => { setShowServiceModal(false); setEditingService(null); }}
        onSuccess={() => { void loadServices(); showSuccess(editingService ? 'Updated!' : 'Added!'); }}
        service={editingService ? {
          id: editingService.id,
          name: editingService.name,
          description: editingService.description ?? '',
          category: editingService.category ?? 'Nails',
          duration_minutes: editingService.duration_minutes ?? editingService.duration ?? 60,
          price_total: editingService.price_total ?? editingService.price ?? 0,
          deposit_amount: editingService.deposit_amount ?? 0,
          active: editingService.active,
          image_url: editingService.image_url,
          is_featured: editingService.is_featured ?? false,
        } : null}
        profileId={profile?.id ?? ''}
      />

      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog((d) => ({ ...d, isOpen: false }))}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
        type="danger" confirmText="Delete" cancelText="Cancel"
      />
    </div>
  );
}
