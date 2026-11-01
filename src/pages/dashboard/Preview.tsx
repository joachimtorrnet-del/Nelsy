import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Plus, Pencil, Trash2, EyeOff, GripVertical, MoreVertical,
  ChevronLeft, ChevronRight, Camera, Loader2, Star, Sparkles, FileDown, Package,
  UserRound, BookOpen, Users, Gift, Link2, Instagram, Check, Copy,
  Layers, ArrowUpRight, SlidersHorizontal,
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
}

interface DesignForm {
  color_accent: string;
  theme_preset: string;
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

const TEMPLATES = [
  { id: 'split',     name: 'Split',     themeId: 'minimal_nude', accentColor: '#3D312E' },
  { id: 'editorial', name: 'Editorial', themeId: 'editorial',    accentColor: '#0A0A0A' },
  { id: 'spotlight', name: 'Spotlight', themeId: 'blush',        accentColor: '#E8446E' },
];

// Demo merchant for template gallery — uses picsum.photos placeholder photography
// These images are for gallery preview only, never shown on a user's public studio
const DEMO_MERCHANT_BASE: Omit<Merchant, 'theme_preset' | 'color_accent'> = {
  id: 'demo-preview',
  slug: 'demo',
  salon_name: 'Camille Studio',
  name: 'Camille Studio',
  bio: 'Nail art & lashes · Spécialiste gel · Paris 9e',
  specialty: 'Nail Artist',
  location: 'Paris 9e',
  instagram: 'camille.studio',
  tiktok: 'camille.studio',
  // Portrait headshot (beauty / warm tones, seed 433)
  logo_url: 'https://picsum.photos/seed/433/400/500',
  services: [
    {
      id: 'd1', name: 'Gel naturel',
      description: 'Pose gel builder + vernis semi-permanent',
      price: 55, duration: 60, deposit: 15, category: 'Nails',
      image_url: 'https://picsum.photos/seed/nail-art-1/300/300',
    },
    {
      id: 'd2', name: 'Extension cils',
      description: 'Volume russe, effet naturel à dramatique',
      price: 90, duration: 120, deposit: 20, category: 'Lashes',
      is_featured: true,
      image_url: 'https://picsum.photos/seed/lashes-beauty/300/300',
    },
    {
      id: 'd3', name: 'Nail art 2 doigts',
      description: 'Motifs custom sur 2 ongles au choix',
      price: 15, duration: 20, deposit: 0, category: 'Nails',
      image_url: 'https://picsum.photos/seed/nail-art-3/300/300',
    },
  ] as Service[],
};

// ── Template gallery card ─────────────────────────────────────────────────────

interface TemplateCardProps {
  template: typeof TEMPLATES[number];
  accentOverride: string;
  selected: boolean;
  onClick: () => void;
}

function TemplateCard({ template, accentOverride, selected, onClick }: TemplateCardProps) {
  const demoMerchant: Merchant = {
    ...DEMO_MERCHANT_BASE,
    theme_preset: template.themeId,
    color_accent: accentOverride,
  };

  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2.5">
      <button
        onClick={onClick}
        className={`relative rounded-2xl overflow-hidden transition-all cursor-pointer focus-visible:outline-none ${
          selected
            ? 'ring-[2.5px] ring-[#F52B8C] ring-offset-2 shadow-xl'
            : 'ring-1 ring-gray-200 hover:ring-gray-300 hover:shadow-lg'
        }`}
        style={{ width: 195, height: 390 }}
      >
        {/* Render at 390×780 (mobile viewport) then scale 0.5 → fits 195×390 frame */}
        <div
          style={{
            width: 390, height: 780,
            transform: 'scale(0.5)', transformOrigin: 'top left',
            pointerEvents: 'none', userSelect: 'none',
          }}
        >
          <PublicStudioView merchant={demoMerchant} mode="preview" />
        </div>

        {/* Selected check badge */}
        {selected && (
          <>
            <div className="absolute inset-0 ring-2 ring-inset ring-[#F52B8C] rounded-2xl pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 bg-[#F52B8C] rounded-full flex items-center justify-center shadow-sm">
              <Check className="w-3.5 h-3.5 text-white" />
            </div>
          </>
        )}
      </button>

      {/* Template name label */}
      <p className={`text-[13px] font-semibold transition-colors ${selected ? 'text-[#F52B8C]' : 'text-gray-600'}`}>
        {template.name}
      </p>
    </div>
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
      className={`flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl shadow-sm transition-all cursor-default ${
        isDragOver ? 'ring-2 ring-[#F52B8C]/30' : ''
      }`}
    >
      {/* Drag handle */}
      <div
        className="cursor-grab text-gray-400 hover:text-gray-600 flex-shrink-0 active:cursor-grabbing touch-none"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Thumbnail */}
      <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
        {service.image_url
          ? <img src={service.image_url} alt={service.name} className="w-full h-full object-cover" />
          : <TypeIcon className="w-5 h-5 text-gray-300" />}
      </div>

      {/* Name + price + duration */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-semibold text-[#1A1A1A] text-[15px] leading-tight truncate">{service.name}</p>
          {service.is_featured && <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />}
          {offerType.id !== 'beauty' && (
            <TypeIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          )}
          {!service.active && (
            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full flex-shrink-0">Hidden</span>
          )}
        </div>
        <p className="text-[14px] font-normal text-gray-700 mt-0.5">
          {fmt(price)}
          {offerType.id === 'beauty' && (
            <span className="text-gray-400"> · {getServiceDuration(service)} min</span>
          )}
        </p>
      </div>

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
    specialty: profile?.specialty ?? '',
    location: profile?.location ?? '',
    bio: profile?.bio ?? '',
    instagram_url: profile?.instagram_url ?? '',
    tiktok_url: profile?.tiktok_url ?? '',
  });
  const [avatarUrl, setAvatarUrl] = useState(profile?.logo_url ?? '');
  const [coverUrl, setCoverUrl] = useState(profile?.cover_url ?? '');
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useToast();

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
    setSaving(true);
    try {
      await updateProfile(profile.id, {
        full_name: form.full_name, bio: form.bio,
        instagram_url: form.instagram_url, tiktok_url: form.tiktok_url,
        specialty: form.specialty || null, location: form.location || null,
      });
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

// ── Main component ─────────────────────────────────────────────────────────────

export default function Preview({ profile }: { profile: Profile | null }) {
  const [activeTab, setActiveTab] = useState<MainTab>('studio');
  const [studioScreen, setStudioScreen] = useState<StudioScreen>('list');
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [settingFeatured, setSettingFeatured] = useState<string | null>(null);
  const [savingDesign, setSavingDesign] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.logo_url ?? '');
  const [savedDesign, setSavedDesign] = useState<DesignForm>({
    color_accent: profile?.color_accent ?? '#F52B8C',
    theme_preset: profile?.theme_preset ?? 'soft_pink',
  });
  const [designForm, setDesignForm] = useState<DesignForm>(savedDesign);

  // Template gallery carousel index
  const selectedTplIdx = TEMPLATES.findIndex((t) => t.themeId === designForm.theme_preset);
  const currentTplIdx = selectedTplIdx >= 0 ? selectedTplIdx : 0;

  // Drag state
  const dragSrcIdx = useRef<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean; title: string; message: string; onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const { toast, showSuccess, showError, hideToast } = useToast();
  useEffect(() => {
    setAvatarUrl(profile?.logo_url ?? '');
    const d = { color_accent: profile?.color_accent ?? '#F52B8C', theme_preset: profile?.theme_preset ?? 'soft_pink' };
    setSavedDesign(d);
    setDesignForm(d);
  }, [profile?.logo_url, profile?.color_accent, profile?.theme_preset]);

  const loadServices = useCallback(async () => {
    if (!profile?.id) { setLoading(false); return; }
    try {
      const { data } = await getServices(profile.id);
      setServices((data as DbService[]) ?? []);
    } catch { showError('Failed to load offers'); }
    finally { setLoading(false); }
  }, [profile?.id, showError]);

  useEffect(() => { void loadServices(); }, [loadServices]);

  const handleEdit = (service: DbService) => { setEditingService(service); setShowServiceModal(true); };

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
      await updateProfile(profile.id, { color_accent: designForm.color_accent, theme_preset: designForm.theme_preset });
      setSavedDesign(designForm);
      showSuccess('Design saved!');
    } catch { showError('Failed'); }
    finally { setSavingDesign(false); }
  };

  const cancelDesign = () => setDesignForm(savedDesign);

  const navigateTemplate = (dir: 1 | -1) => {
    const newIdx = (currentTplIdx + dir + TEMPLATES.length) % TEMPLATES.length;
    const tpl = TEMPLATES[newIdx];
    setDesignForm((f) => ({ ...f, theme_preset: tpl.themeId, color_accent: tpl.accentColor }));
  };

  // ── Tab definitions ──────────────────────────────────────────────

  const TABS = [
    { id: 'studio' as MainTab,        label: 'Studio',        Icon: Layers           },
    { id: 'landing-pages' as MainTab, label: 'Landing Pages', Icon: ArrowUpRight     },
    { id: 'design' as MainTab,        label: 'Edit Design',   Icon: SlidersHorizontal },
  ];

  const bgColor = THEMES[designForm.theme_preset]?.pageBg ?? '#FFFFFF';

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div className="bg-[#f6f4f4] min-h-full">

      {/* Tab bar */}
      <div className="px-8 pt-6 pb-0">
        <div className="inline-flex items-center">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveTab(id); setStudioScreen('list'); }}
              className={`flex items-center gap-2 pb-3.5 px-0 mr-8 text-[15px] font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === id
                  ? 'text-[#F52B8C] border-[#F52B8C]'
                  : 'text-gray-700 border-transparent hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── STUDIO TAB ─────────────────────────────────────────────── */}
      {activeTab === 'studio' && (
        <>
          {studioScreen === 'type-picker' && (
            <OfferTypePicker
              onSelect={() => {
                setEditingService(null);
                setStudioScreen('list');
                setShowServiceModal(true);
              }}
              onCancel={() => setStudioScreen('list')}
            />
          )}

          {studioScreen === 'edit-profile' && (
            <EditProfilePanel profile={profile} onBack={() => setStudioScreen('list')} />
          )}

          {studioScreen === 'list' && (
            <div className="px-8 pt-5 pb-8">

              {/* Profile card */}
              <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-sm mb-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0 group cursor-pointer"
                  onClick={() => setStudioScreen('edit-profile')}>
                  <div
                    className="w-[76px] h-[76px] rounded-lg overflow-hidden flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #F52B8C, #E0167A)' }}
                  >
                    {avatarUrl
                      ? <img src={avatarUrl} alt={profile?.full_name ?? ''} className="w-full h-full object-cover" />
                      : <span className="text-white font-bold text-2xl">{(profile?.full_name ?? 'Y').charAt(0).toUpperCase()}</span>}
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-black/25 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1A1A] text-[18px] leading-tight truncate">{profile?.full_name || 'Your Studio'}</p>
                  {profile?.slug && (
                    <p className="text-[13px] text-gray-500 mt-0.5">@{profile.slug}</p>
                  )}
                  {(profile?.instagram_url || profile?.tiktok_url || profile?.specialty || profile?.location) && (
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      {profile?.instagram_url && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                            <Instagram className="w-2 h-2 text-white" />
                          </div>
                          <span className="text-[13px] text-gray-500 truncate max-w-[120px]">{profile.instagram_url.replace('@', '')}</span>
                        </div>
                      )}
                      {profile?.specialty && (
                        <span className="text-[13px] text-gray-500">{profile.specialty}</span>
                      )}
                      {profile?.location && (
                        <span className="text-[13px] text-gray-500">{profile.location}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Edit profile */}
                <button
                  onClick={() => setStudioScreen('edit-profile')}
                  className="flex-shrink-0 flex items-center gap-1.5 text-[13px] font-semibold text-[#F52B8C] hover:opacity-75 transition self-start"
                >
                  <Pencil className="w-3 h-3" /> Edit profile
                </button>
              </div>

              {/* Offer list */}
              {loading ? (
                <div className="space-y-2.5 mb-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-[80px] bg-white rounded-xl shadow-sm animate-pulse" />
                  ))}
                </div>
              ) : services.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm py-12 text-center mb-4">
                  <p className="text-2xl mb-2">💅</p>
                  <p className="font-semibold text-[#1A1A1A] mb-1 text-[15px]">No offers yet</p>
                  <p className="text-[13px] text-gray-400">Add your first offer to start getting booked</p>
                </div>
              ) : (
                <div className="space-y-2.5 mb-4">
                  {services.map((service, idx) => (
                    <OfferRow
                      key={service.id}
                      service={service}
                      isDragOver={dragOverIdx === idx}
                      dragRowProps={{
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
                  ))}
                </div>
              )}

              {/* Add offer */}
              <button
                onClick={() => setStudioScreen('type-picker')}
                className="w-full h-12 bg-[#F52B8C] text-white rounded-full font-semibold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 transition mb-4"
              >
                <Plus className="w-4 h-4" /> Add an offer
              </button>

              {/* Add section */}
              <div className="text-center">
                <button
                  onClick={() => showSuccess('Sections — available soon')}
                  className="text-[15px] font-semibold text-[#F52B8C] hover:opacity-75 transition"
                >
                  Add a section
                </button>
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
          {/* Section header */}
          <div className="px-8 pt-6 pb-5 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Template</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTemplate(-1)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTemplate(1)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Gallery cards — horizontal scroll, wide */}
          <div className="flex items-start gap-5 px-8 pb-6 overflow-x-auto scrollbar-hide">
            {TEMPLATES.map((tpl, idx) => (
              <TemplateCard
                key={tpl.id}
                template={tpl}
                accentOverride={currentTplIdx === idx ? designForm.color_accent : tpl.accentColor}
                selected={currentTplIdx === idx}
                onClick={() => setDesignForm((f) => ({ ...f, theme_preset: tpl.themeId, color_accent: tpl.accentColor }))}
              />
            ))}
          </div>

          {/* Colors + Font */}
          <div className="border-t border-gray-100 px-8 py-6 grid grid-cols-2 gap-10">
            {/* Colors */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Colors</p>
              <div className="flex gap-8">
                {/* Accent */}
                <div>
                  <p className="text-xs text-gray-400 mb-2">Accent</p>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div className="w-10 h-10 rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
                      <div className="w-full h-full" style={{ background: designForm.color_accent }} />
                      <input type="color" value={designForm.color_accent}
                        onChange={(e) => setDesignForm((f) => ({ ...f, color_accent: e.target.value }))}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                    </div>
                    <code className="text-sm font-mono text-gray-700 group-hover:text-[#F52B8C] transition">
                      {designForm.color_accent.toUpperCase()}
                    </code>
                  </label>
                </div>
                {/* Background */}
                <div>
                  <p className="text-xs text-gray-400 mb-2">Background</p>
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl shadow-sm border border-gray-200" style={{ background: bgColor }} />
                    <code className="text-sm font-mono text-gray-700">{bgColor.toUpperCase()}</code>
                  </div>
                </div>
              </div>
              {/* Color swatches */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {['#F52B8C', '#E8446E', '#0A0A0A', '#3B82F6', '#8B5CF6', '#059669', '#D97706'].map((c) => (
                  <button key={c} onClick={() => setDesignForm((f) => ({ ...f, color_accent: c }))}
                    className="w-7 h-7 rounded-full transition hover:scale-110"
                    style={{ background: c, outline: designForm.color_accent === c ? `3px solid ${c}` : '3px solid transparent', outlineOffset: '2px' }} />
                ))}
                <label className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition overflow-hidden relative">
                  <input type="color" value={designForm.color_accent}
                    onChange={(e) => setDesignForm((f) => ({ ...f, color_accent: e.target.value }))}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                  <span className="text-gray-400 text-xs font-bold pointer-events-none">+</span>
                </label>
              </div>
            </div>

            {/* Font */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Font</p>
              <div className="space-y-2">
                {[
                  { label: 'Inter', value: 'sans', preview: 'Aa', class: 'font-sans' },
                  { label: 'Playfair Display', value: 'serif', preview: 'Aa', class: 'font-serif' },
                ].map((font) => {
                  const currentFont = THEMES[designForm.theme_preset]?.fontClass ?? 'font-sans';
                  const isSelected = currentFont === `font-${font.value}`;
                  return (
                    <button key={font.value}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                        isSelected ? 'border-[#F52B8C] bg-[#fff8fa]' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className={`text-xl font-bold text-gray-700 w-8 text-center ${font.class}`}>{font.preview}</span>
                      <span className="text-sm text-gray-700">{font.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#F52B8C] ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-100 px-8 py-4 flex items-center justify-end gap-3">
            <button onClick={cancelDesign}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:border-gray-300 transition">
              Cancel
            </button>
            <button onClick={saveDesign} disabled={savingDesign}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#F52B8C] rounded-xl hover:opacity-90 transition disabled:opacity-50">
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
