import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Plus, Eye, Copy, Check, ExternalLink, Pencil, Trash2, EyeOff,
  GripVertical, MoreHorizontal, ChevronLeft, Phone, Monitor,
  Camera, Loader2, Star, Sparkles, FileDown, Package, UserRound,
  BookOpen, Users, Gift, Link2, Instagram,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { THEMES } from '../../lib/themes';
import Toast from '../../components/dashboard/Toast';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import AddEditServiceModal from '../../components/dashboard/AddEditServiceModal';
import { useToast } from '../../hooks/useToast';
import {
  getServices, deleteService, toggleServiceActive, updateProfile, uploadImage,
  setFeaturedService, clearFeaturedService, reorderServices,
  createService,
} from '../../lib/supabase-queries';
import { PublicStudioView } from '../../components/studio/PublicStudioView';
import type { Merchant, Service } from '../../types';

// ── Types ─────────────────────────────────────────────────────────────────────

type MainTab = 'studio' | 'landing-pages' | 'design';
type StudioScreen = 'list' | 'type-picker' | 'edit-profile';
type OfferTypeId = 'beauty' | 'digital' | 'physical' | 'coaching' | 'course' | 'membership' | 'free' | 'link';
type PreviewDevice = 'phone' | 'desktop';

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

// ── Offer types config ────────────────────────────────────────────────────────

interface OfferType {
  id: OfferTypeId;
  name: string;
  description: string;
  icon: LucideIcon;
  live: boolean;
  categoryValue: string;
}

const OFFER_TYPES: OfferType[] = [
  {
    id: 'beauty',
    name: 'Beauty service',
    description: 'Nails, lashes, brows, makeup, hair, skincare — bookable with calendar',
    icon: Sparkles,
    live: true,
    categoryValue: 'Nails',
  },
  {
    id: 'digital',
    name: 'Digital product',
    description: 'Guides, ebooks, templates and downloadable resources',
    icon: FileDown,
    live: false,
    categoryValue: '_digital',
  },
  {
    id: 'physical',
    name: 'Physical product',
    description: 'Press-ons, kits and products you ship',
    icon: Package,
    live: false,
    categoryValue: '_physical',
  },
  {
    id: 'coaching',
    name: 'Coaching / consultation',
    description: 'Individual sessions, audits and consultations',
    icon: UserRound,
    live: false,
    categoryValue: '_coaching',
  },
  {
    id: 'course',
    name: 'Course / workshop',
    description: 'Structured training or live event with registration',
    icon: BookOpen,
    live: false,
    categoryValue: '_course',
  },
  {
    id: 'membership',
    name: 'Membership / community',
    description: 'Recurring access with monthly or annual billing',
    icon: Users,
    live: false,
    categoryValue: '_membership',
  },
  {
    id: 'free',
    name: 'Free resource',
    description: 'Free content with a simple form to collect contact details',
    icon: Gift,
    live: false,
    categoryValue: '_free',
  },
  {
    id: 'link',
    name: 'External link',
    description: 'Link to an external destination, affiliate or content',
    icon: Link2,
    live: false,
    categoryValue: '_link',
  },
];

function getOfferTypeFromCategory(category?: string): OfferType {
  if (!category) return OFFER_TYPES[0];
  const found = OFFER_TYPES.find((t) => t.categoryValue === category);
  return found ?? OFFER_TYPES[0];
}

// ── Templates config ──────────────────────────────────────────────────────────

interface Template {
  id: string;
  name: string;
  themeId: string;
  accentColor: string;
  preview: React.ReactNode;
}

function TemplatePreviewClean({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <div className="flex flex-col items-center pt-5 pb-3 px-3">
        <div className="w-10 h-10 rounded-full mb-2 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${accent}40, ${accent}80)` }} />
        <div className="h-2.5 w-20 rounded-full bg-gray-900 mb-1" />
        <div className="h-1.5 w-14 rounded-full bg-gray-300 mb-3" />
        <div className="h-1 w-24 rounded-full bg-gray-200 mb-0.5" />
        <div className="h-1 w-20 rounded-full bg-gray-200" />
      </div>
      <div className="mx-3 h-px bg-gray-100 mb-2" />
      {[1, 2].map((i) => (
        <div key={i} className="mx-3 mb-2 flex items-center gap-2 bg-gray-50 rounded-lg p-2">
          <div className="w-7 h-7 rounded-md flex-shrink-0" style={{ background: `${accent}20` }} />
          <div className="flex-1">
            <div className="h-1.5 w-16 rounded-full bg-gray-700 mb-1" />
            <div className="h-1 w-10 rounded-full bg-gray-300" />
          </div>
          <div className="h-5 w-10 rounded-md flex items-center justify-center" style={{ background: accent }}>
            <div className="h-1 w-6 rounded-full bg-white" />
          </div>
        </div>
      ))}
    </div>
  );
}

function TemplatePreviewEditorial({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#FAFAFA' }}>
      <div className="h-20 flex flex-col items-start justify-end px-3 pb-3" style={{ background: 'linear-gradient(160deg, #1A1A1A 0%, #2D2D2D 100%)' }}>
        <div className="h-2 w-20 rounded bg-white mb-1" />
        <div className="h-1.5 w-14 rounded" style={{ background: 'rgba(255,255,255,0.45)' }} />
      </div>
      <div className="flex-1 px-3 pt-3">
        {[1, 2].map((i) => (
          <div key={i} className="mb-2 border border-gray-100 rounded-lg overflow-hidden bg-white">
            <div className="h-10 w-full" style={{ background: `${accent}15` }} />
            <div className="p-2">
              <div className="h-1.5 w-14 rounded-full bg-gray-800 mb-1" />
              <div className="flex items-center justify-between">
                <div className="h-1 w-8 rounded-full bg-gray-300" />
                <div className="h-4 w-10 rounded flex items-center justify-center" style={{ background: accent }}>
                  <div className="h-0.5 w-5 rounded bg-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TemplatePreviewSpotlight({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: '#FFF8F9' }}>
      <div className="h-20 flex flex-col items-center justify-end pb-3 px-3" style={{ background: `linear-gradient(160deg, ${accent}40 0%, ${accent}25 100%)` }}>
        <div className="w-10 h-10 rounded-full border-2 border-white mb-1" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}bb)` }} />
        <div className="h-1.5 w-16 rounded bg-white/90 mb-0.5" />
        <div className="h-1 w-10 rounded" style={{ background: 'rgba(255,255,255,0.6)' }} />
      </div>
      <div className="flex-1 px-2 pt-2 grid grid-cols-2 gap-1.5 content-start">
        {[1, 2].map((i) => (
          <div key={i} className="rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="h-10" style={{ background: `${accent}20` }} />
            <div className="p-1.5">
              <div className="h-1.5 w-10 rounded-full mb-1" style={{ background: '#1A1A1A' }} />
              <div className="h-3.5 w-full rounded-md flex items-center justify-center" style={{ background: accent }}>
                <div className="h-0.5 w-6 rounded bg-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TEMPLATES: Template[] = [
  {
    id: 'clean',
    name: 'Clean',
    themeId: 'minimal_nude',
    accentColor: '#1A1A1A',
    preview: <TemplatePreviewClean accent="#1A1A1A" />,
  },
  {
    id: 'editorial',
    name: 'Editorial',
    themeId: 'editorial',
    accentColor: '#0A0A0A',
    preview: <TemplatePreviewEditorial accent="#0A0A0A" />,
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    themeId: 'blush',
    accentColor: '#E8446E',
    preview: <TemplatePreviewSpotlight accent="#E8446E" />,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getServicePrice(s: DbService) { return parseFloat(String(s.price_total ?? s.price ?? 0)); }
function getServiceDuration(s: DbService) { return s.duration_minutes ?? s.duration ?? 60; }

function fmt(n: number, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);
}

// ── Offer row ─────────────────────────────────────────────────────────────────

interface OfferRowProps {
  service: DbService;
  isDragging: boolean;
  isDragOver: boolean;
  dragHandleProps: React.HTMLAttributes<HTMLDivElement>;
  dragRowProps: React.HTMLAttributes<HTMLDivElement>;
  onEdit: () => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  onToggleFeatured: () => void;
  settingFeatured: boolean;
}

function OfferRow({
  service, isDragging, isDragOver,
  dragHandleProps, dragRowProps,
  onEdit, onDuplicate, onToggleVisibility, onDelete, onToggleFeatured, settingFeatured,
}: OfferRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const offerType = getOfferTypeFromCategory(service.category);
  const price = getServicePrice(service);
  const duration = getServiceDuration(service);

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
      className={`group flex items-center gap-3 bg-white border rounded-xl px-3 py-2.5 transition-all cursor-default ${
        isDragOver ? 'border-[#F52B8C] bg-[#fff8fa]' : 'border-gray-100 hover:border-gray-200'
      } ${isDragging ? 'opacity-40' : ''}`}
    >
      {/* Drag handle */}
      <div
        {...dragHandleProps}
        className="cursor-grab text-gray-300 hover:text-gray-400 flex-shrink-0 active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4" />
      </div>

      {/* Thumbnail */}
      <div className="w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
        {service.image_url
          ? <img src={service.image_url} alt={service.name} className="w-full h-full object-cover" />
          : <offerType.icon className="w-4 h-4 text-gray-400" />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-sm text-[#1A1A1A] truncate">{service.name}</p>
          {service.is_featured && <Star className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[11px] text-gray-400">{offerType.name}</span>
          {offerType.id === 'beauty' && (
            <span className="text-[11px] text-gray-300">· {duration} min</span>
          )}
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right">
        <p className="font-bold text-sm text-[#1A1A1A]">{fmt(price)}</p>
      </div>

      {/* Status */}
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${service.active ? 'bg-green-400' : 'bg-gray-300'}`} />

      {/* Menu */}
      <div className="relative flex-shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
            <button onClick={() => { setMenuOpen(false); onEdit(); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
              <Pencil className="w-3.5 h-3.5" /> Edit offer
            </button>
            <button onClick={() => { setMenuOpen(false); onDuplicate(); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
              <Copy className="w-3.5 h-3.5" /> Duplicate
            </button>
            <button onClick={() => { setMenuOpen(false); onToggleFeatured(); }} disabled={settingFeatured} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition disabled:opacity-40">
              <Star className={`w-3.5 h-3.5 ${service.is_featured ? 'fill-amber-400 text-amber-400' : ''}`} />
              {service.is_featured ? 'Remove featured' : 'Set as featured'}
            </button>
            <div className="h-px bg-gray-100 my-1" />
            <button onClick={() => { setMenuOpen(false); onToggleVisibility(); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
              <EyeOff className="w-3.5 h-3.5" /> {service.active ? 'Hide from studio' : 'Show in studio'}
            </button>
            <div className="h-px bg-gray-100 my-1" />
            <button onClick={() => { setMenuOpen(false); onDelete(); }} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition">
              <Trash2 className="w-3.5 h-3.5" /> Delete offer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Type picker ───────────────────────────────────────────────────────────────

function OfferTypePicker({ onSelect, onCancel }: { onSelect: (type: OfferType) => void; onCancel: () => void }) {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
        <button onClick={onCancel} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-bold text-[#1A1A1A]">Choose your offer type</h2>
          <p className="text-xs text-gray-400">Pick the format that fits what you're offering</p>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {OFFER_TYPES.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type)}
              className={`flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all hover:shadow-sm ${
                type.live
                  ? 'bg-white border-gray-200 hover:border-[#F52B8C] hover:bg-[#fff8fa]'
                  : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
              }`}
              disabled={!type.live}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                type.live ? 'bg-[#fff0f7]' : 'bg-gray-100'
              }`}>
                <Icon className={`w-5 h-5 ${type.live ? 'text-[#F52B8C]' : 'text-gray-400'}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className={`font-semibold text-sm ${type.live ? 'text-[#1A1A1A]' : 'text-gray-500'}`}>{type.name}</p>
                  {!type.live && (
                    <span className="text-[10px] font-medium text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">Soon</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{type.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Profile card ──────────────────────────────────────────────────────────────

interface ProfileCardProps {
  profile: Profile | null;
  avatarUrl: string;
  onEditProfile: () => void;
}

function ProfileCard({ profile, avatarUrl, onEditProfile }: ProfileCardProps) {
  const name = profile?.full_name || 'Your Studio';
  const slug = profile?.slug || '';
  const initials = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-2xl">
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #F52B8C, #E0167A)' }}
      >
        {avatarUrl
          ? <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          : <span className="text-white font-bold text-xl">{initials}</span>}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-[#1A1A1A] truncate">{name}</p>
        {slug && <p className="text-xs text-gray-400 mt-0.5">getnelsy.com/{slug}</p>}
        {profile?.bio && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{profile.bio}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          {profile?.instagram_url && (
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Instagram className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Edit */}
      <button
        onClick={onEditProfile}
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:border-[#F52B8C] hover:text-[#F52B8C] transition"
      >
        <Pencil className="w-3 h-3" /> Edit profile
      </button>
    </div>
  );
}

// ── Edit Profile panel ────────────────────────────────────────────────────────

interface EditProfilePanelProps {
  profile: Profile | null;
  onBack: () => void;
  onSaved: () => void;
}

function EditProfilePanel({ profile, onBack, onSaved }: EditProfilePanelProps) {
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
    } catch { showError('Upload failed'); }
    finally { setUploadingCover(false); if (coverRef.current) coverRef.current.value = ''; }
  };

  const save = async () => {
    if (!profile?.id) return;
    setSaving(true);
    try {
      await updateProfile(profile.id, {
        full_name: form.full_name,
        bio: form.bio,
        instagram_url: form.instagram_url,
        tiktok_url: form.tiktok_url,
        specialty: form.specialty || null,
        location: form.location || null,
      });
      showSuccess('Profile saved');
      onSaved();
    } catch { showError('Failed to save'); }
    finally { setSaving(false); }
  };

  const initials = (form.full_name || 'Y').charAt(0).toUpperCase();

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-gray-100">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="font-bold text-[#1A1A1A]">Edit profile</h2>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Cover */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">Cover photo</p>
          <div onClick={() => coverRef.current?.click()}
            className="relative w-full h-24 rounded-2xl overflow-hidden cursor-pointer group">
            {coverUrl
              ? <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-gray-400" />
                </div>}
            {uploadingCover && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
            )}
          </div>
          <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
        </div>

        {/* Avatar */}
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-2">Profile photo</p>
          <div className="flex items-center gap-3">
            <div onClick={() => avatarRef.current?.click()}
              className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 cursor-pointer flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #F52B8C, #E0167A)' }}>
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                : <span className="text-white font-bold text-xl">{initials}</span>}
            </div>
            <button onClick={() => avatarRef.current?.click()} disabled={uploadingAvatar}
              className="px-3 py-2 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50">
              {uploadingAvatar ? 'Uploading…' : 'Change photo'}
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Profile info</p>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Studio name</label>
            <input type="text" value={form.full_name}
              onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
              placeholder="Your Studio Name" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Specialty</label>
              <input type="text" value={form.specialty}
                onChange={(e) => setForm((f) => ({ ...f, specialty: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                placeholder="Nail Artist" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Location</label>
              <input type="text" value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                placeholder="Paris 9e" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Bio</label>
            <textarea value={form.bio}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={2} maxLength={160}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition resize-none"
              placeholder="Gel & nail art specialist · 5+ years" />
            <p className="text-right text-[10px] text-gray-300 -mt-0.5">{form.bio.length}/160</p>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Social links</p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">IG</div>
            <input type="text" value={form.instagram_url}
              onChange={(e) => setForm((f) => ({ ...f, instagram_url: e.target.value }))}
              placeholder="@your_instagram"
              className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition" />
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">TT</div>
            <input type="text" value={form.tiktok_url}
              onChange={(e) => setForm((f) => ({ ...f, tiktok_url: e.target.value }))}
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

// ── Live preview panel (for Design tab on desktop) ────────────────────────────

interface LivePreviewProps {
  profile: Profile | null;
  avatarUrl: string;
  coverUrl: string;
  services: DbService[];
  designForm: DesignForm;
  device: PreviewDevice;
}

function LivePreview({ profile, avatarUrl, coverUrl, services, designForm, device }: LivePreviewProps) {
  const merchant: Merchant = useMemo(() => {
    const mappedServices: Service[] = services.filter((s) => s.active).map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description ?? '',
      price: getServicePrice(s),
      duration: getServiceDuration(s),
      deposit: s.deposit_amount ?? 0,
      category: s.category,
      image_url: s.image_url,
      is_featured: s.is_featured ?? false,
    }));
    return {
      id: profile?.id ?? 'preview',
      slug: profile?.slug ?? 'preview',
      salon_name: profile?.full_name ?? 'Your Studio',
      name: profile?.full_name ?? 'Your Studio',
      bio: profile?.bio ?? '',
      logo_url: avatarUrl || undefined,
      cover_url: coverUrl || undefined,
      specialty: profile?.specialty,
      location: profile?.location,
      instagram: profile?.instagram_url?.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\/?/, ''),
      tiktok: profile?.tiktok_url,
      color_accent: designForm.color_accent,
      theme_preset: designForm.theme_preset,
      services: mappedServices,
    };
  }, [profile, avatarUrl, coverUrl, services, designForm]);

  if (device === 'phone') {
    return (
      <div className="flex justify-center py-4">
        <div className="relative" style={{ width: 240 }}>
          <div className="bg-gray-900 rounded-[44px] p-2.5 shadow-2xl shadow-gray-400/20">
            <div className="flex justify-center mb-1">
              <div className="w-20 h-5 bg-gray-900 rounded-full border-2 border-gray-800" />
            </div>
            <div className="rounded-[36px] overflow-hidden" style={{ height: 480 }}>
              <div style={{ width: 480, height: 960, transform: 'scale(0.5)', transformOrigin: 'top left', pointerEvents: 'none', userSelect: 'none' }}>
                <PublicStudioView merchant={merchant} mode="preview" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
        </div>
      </div>
    );
  }

  // Desktop preview
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm" style={{ height: 480 }}>
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        <div className="flex-1 mx-2 px-2 py-0.5 bg-white rounded text-[10px] text-gray-400 font-mono truncate">
          getnelsy.com/{profile?.slug ?? 'studio'}
        </div>
      </div>
      <div className="relative overflow-hidden" style={{ height: 448 }}>
        <div style={{ width: '200%', height: '200%', transform: 'scale(0.5)', transformOrigin: 'top left', pointerEvents: 'none', userSelect: 'none' }}>
          <PublicStudioView merchant={merchant} mode="preview" />
        </div>
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
  const [, setPendingOfferType] = useState<OfferType | null>(null);
  const [copied, setCopied] = useState(false);
  const [settingFeatured, setSettingFeatured] = useState<string | null>(null);
  const [savingDesign, setSavingDesign] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.logo_url ?? '');
  const [coverUrl, setCoverUrl] = useState(profile?.cover_url ?? '');
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('phone');

  // Drag state
  const dragSrcIdx = useRef<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const [designForm, setDesignForm] = useState<DesignForm>({
    color_accent: profile?.color_accent ?? '#F52B8C',
    theme_preset: profile?.theme_preset ?? 'soft_pink',
  });

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean; title: string; message: string; onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const { toast, showSuccess, showError, hideToast } = useToast();

  const slug = profile?.slug ?? 'your-studio';

  // Re-sync profile-driven state when profile updates
  useEffect(() => {
    setAvatarUrl(profile?.logo_url ?? '');
    setCoverUrl(profile?.cover_url ?? '');
    setDesignForm({
      color_accent: profile?.color_accent ?? '#F52B8C',
      theme_preset: profile?.theme_preset ?? 'soft_pink',
    });
  }, [profile?.logo_url, profile?.cover_url, profile?.color_accent, profile?.theme_preset]);

  const loadServices = useCallback(async () => {
    if (!profile?.id) { setLoading(false); return; }
    try {
      const { data } = await getServices(profile.id);
      setServices((data as DbService[]) ?? []);
    } catch { showError('Failed to load offers'); }
    finally { setLoading(false); }
  }, [profile?.id, showError]);

  useEffect(() => { void loadServices(); }, [loadServices]);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://getnelsy.com/${slug}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Service actions ──────────────────────────────────────────────

  const handleEdit = (service: DbService) => {
    setEditingService(service);
    setPendingOfferType(null);
    setShowServiceModal(true);
  };

  const handleDuplicate = async (service: DbService) => {
    if (!profile?.id) return;
    try {
      const { name, description, category, price_total, price, deposit_amount, duration_minutes, duration, active } = service;
      await createService({
        profile_id: profile.id,
        name: `${name} (copy)`,
        description: description ?? '',
        category: category ?? 'Nails',
        price_total: price_total ?? price ?? 0,
        deposit_amount: deposit_amount ?? 0,
        duration_minutes: duration_minutes ?? duration ?? 60,
        active: active ?? true,
        display_order: services.length,
      });
      showSuccess('Offer duplicated');
      void loadServices();
    } catch { showError('Failed to duplicate'); }
  };

  const handleToggleVisibility = async (service: DbService) => {
    try {
      await toggleServiceActive(service.id, !service.active);
      showSuccess(service.active ? 'Offer hidden' : 'Offer visible');
      void loadServices();
    } catch { showError('Failed to update'); }
  };

  const handleDelete = (service: DbService) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete offer',
      message: `Delete "${service.name}"? This cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteService(service.id);
          showSuccess('Offer deleted');
          void loadServices();
        } catch { showError('Failed to delete'); }
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
    } catch { showError('Failed to update'); }
    finally { setSettingFeatured(null); }
  };

  // ── Drag & drop reorder ──────────────────────────────────────────

  const handleReorder = async (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const reordered = [...services];
    const [moved] = reordered.splice(fromIdx, 1);
    reordered.splice(toIdx, 0, moved);
    const updates = reordered.map((s, i) => ({ id: s.id, display_order: i }));
    setServices(reordered);
    try {
      await reorderServices(updates);
    } catch { void loadServices(); }
  };

  // ── Design save ──────────────────────────────────────────────────

  const saveDesign = async () => {
    if (!profile?.id) return;
    setSavingDesign(true);
    try {
      await updateProfile(profile.id, {
        color_accent: designForm.color_accent,
        theme_preset: designForm.theme_preset,
      });
      showSuccess('Design saved!');
    } catch { showError('Failed to save design'); }
    finally { setSavingDesign(false); }
  };

  // ── Offer type selection → open modal ────────────────────────────

  const handleTypeSelected = (type: OfferType) => {
    setPendingOfferType(type);
    setEditingService(null);
    setStudioScreen('list');
    setShowServiceModal(true);
  };

  const mainTabs = [
    { id: 'studio' as MainTab, label: 'Studio' },
    { id: 'landing-pages' as MainTab, label: 'Landing Pages' },
    { id: 'design' as MainTab, label: 'Design' },
  ];

  // ── Render ───────────────────────────────────────────────────────

  return (
    <div className="bg-white min-h-full">

      {/* Tab bar + header actions */}
      <div className="border-b border-gray-100 px-4 lg:px-8 flex items-center justify-between gap-4">
        <div className="flex">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setStudioScreen('list'); }}
              className={`py-3.5 px-1 mr-6 text-sm font-semibold transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'text-[#1A1A1A] border-[#F52B8C]'
                  : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Header actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:border-gray-300 transition"
          >
            {copied ? <><Check className="w-3 h-3 text-green-600" /><span className="text-green-600">Copied!</span></> : <><Copy className="w-3 h-3" />Copy link</>}
          </button>
          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#1A1A1A] rounded-lg hover:opacity-90 transition"
          >
            <Eye className="w-3 h-3" /> Preview
          </a>
        </div>
      </div>

      {/* ── STUDIO TAB ─────────────────────────────────────────────── */}
      {activeTab === 'studio' && (
        <>
          {studioScreen === 'type-picker' && (
            <OfferTypePicker
              onSelect={handleTypeSelected}
              onCancel={() => setStudioScreen('list')}
            />
          )}

          {studioScreen === 'edit-profile' && (
            <EditProfilePanel
              profile={profile}
              onBack={() => setStudioScreen('list')}
              onSaved={() => setStudioScreen('list')}
            />
          )}

          {studioScreen === 'list' && (
            <div className="px-4 lg:px-8 py-5 max-w-2xl">
              {/* Profile card */}
              <div className="mb-5">
                <ProfileCard
                  profile={profile}
                  avatarUrl={avatarUrl}
                  onEditProfile={() => setStudioScreen('edit-profile')}
                />
              </div>

              {/* Offers header */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {services.length > 0 ? `Offers (${services.length})` : 'Offers'}
                </p>
              </div>

              {/* Offer list */}
              {loading ? (
                <div className="space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : services.length === 0 ? (
                <div className="border-2 border-dashed border-gray-200 rounded-2xl py-10 text-center">
                  <div className="text-3xl mb-2">💅</div>
                  <p className="font-semibold text-gray-900 mb-1">No offers yet</p>
                  <p className="text-sm text-gray-400 mb-4">Add your first offer to start getting booked</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {services.map((service, idx) => (
                    <OfferRow
                      key={service.id}
                      service={service}
                      isDragging={dragSrcIdx.current === idx}
                      isDragOver={dragOverIdx === idx}
                      dragHandleProps={{}}
                      dragRowProps={{
                        draggable: true,
                        onDragStart: () => { dragSrcIdx.current = idx; },
                        onDragOver: (e) => { e.preventDefault(); setDragOverIdx(idx); },
                        onDrop: (e) => {
                          e.preventDefault();
                          if (dragSrcIdx.current !== null) {
                            void handleReorder(dragSrcIdx.current, idx);
                            dragSrcIdx.current = null;
                          }
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

              {/* Add button */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => setStudioScreen('type-picker')}
                  className="w-full py-3.5 bg-[#F52B8C] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md shadow-[#F52B8C]/20"
                >
                  <Plus className="w-4 h-4" /> Add an offer
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── LANDING PAGES TAB ────────────────────────────────────── */}
      {activeTab === 'landing-pages' && (
        <div className="px-4 lg:px-8 py-10 max-w-lg">
          <div className="border-2 border-dashed border-gray-200 rounded-2xl py-14 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-5 h-5 text-gray-400" />
            </div>
            <p className="font-bold text-[#1A1A1A] mb-2">Landing Pages</p>
            <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed mb-6">
              Share a direct link to any offer without displaying it on your public studio page.
            </p>
            <button
              onClick={() => { setActiveTab('studio'); setStudioScreen('type-picker'); }}
              className="px-6 py-3 bg-[#F52B8C] text-white rounded-xl font-bold text-sm hover:opacity-90 transition"
            >
              + Add an offer first
            </button>
          </div>
        </div>
      )}

      {/* ── DESIGN TAB ───────────────────────────────────────────── */}
      {activeTab === 'design' && (
        <div className="flex flex-col lg:flex-row lg:gap-0 min-h-full">

          {/* Left — form */}
          <div className="flex-1 lg:max-w-lg px-4 lg:px-8 py-5 space-y-6 lg:border-r lg:border-gray-100 overflow-y-auto">

            {/* Templates */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Template</p>
              <div className="grid grid-cols-3 gap-3">
                {TEMPLATES.map((tpl) => {
                  const selected = designForm.theme_preset === tpl.themeId;
                  return (
                    <button
                      key={tpl.id}
                      onClick={() => setDesignForm((f) => ({ ...f, theme_preset: tpl.themeId, color_accent: tpl.accentColor }))}
                      className={`relative rounded-2xl overflow-hidden transition-all ${
                        selected ? 'ring-2 ring-[#F52B8C] ring-offset-2' : 'ring-1 ring-gray-200 hover:ring-gray-300'
                      }`}
                      style={{ height: 160 }}
                    >
                      {/* Template visual preview */}
                      <div className="w-full h-full">
                        {tpl.id === 'clean' && <TemplatePreviewClean accent={designForm.color_accent} />}
                        {tpl.id === 'editorial' && <TemplatePreviewEditorial accent={designForm.color_accent} />}
                        {tpl.id === 'spotlight' && <TemplatePreviewSpotlight accent={designForm.color_accent} />}
                      </div>
                      {/* Name */}
                      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-white/90 backdrop-blur-sm border-t border-gray-100">
                        <p className="text-[11px] font-bold text-center text-[#1A1A1A]">{tpl.name}</p>
                      </div>
                      {/* Selected check */}
                      {selected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-[#F52B8C] rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Accent color */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Accent color</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl shadow-sm flex-shrink-0" style={{ background: designForm.color_accent }} />
                <div className="flex gap-2 flex-wrap">
                  {['#F52B8C', '#E8446E', '#0A0A0A', '#3B82F6', '#8B5CF6', '#059669', '#D97706', '#EF4444'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setDesignForm((f) => ({ ...f, color_accent: color }))}
                      className="w-7 h-7 rounded-full transition hover:scale-110"
                      style={{
                        background: color,
                        outline: designForm.color_accent === color ? `3px solid ${color}` : '3px solid transparent',
                        outlineOffset: '2px',
                      }}
                    />
                  ))}
                  <label className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition overflow-hidden relative">
                    <input
                      type="color"
                      value={designForm.color_accent}
                      onChange={(e) => setDesignForm((f) => ({ ...f, color_accent: e.target.value }))}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <span className="text-gray-400 text-xs font-bold pointer-events-none">+</span>
                  </label>
                </div>
              </div>
            </div>

            {/* All themes (advanced) */}
            <details className="group">
              <summary className="text-xs font-semibold text-gray-400 cursor-pointer hover:text-gray-600 transition list-none flex items-center gap-1">
                <span className="group-open:hidden">Show all themes ↓</span>
                <span className="hidden group-open:block">Hide themes ↑</span>
              </summary>
              <div className="grid grid-cols-5 gap-2 mt-3">
                {Object.values(THEMES).map((t) => {
                  const selected = designForm.theme_preset === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setDesignForm((f) => ({ ...f, theme_preset: t.id, color_accent: t.defaultAccent }))}
                      className={`relative rounded-xl overflow-hidden transition-all ${selected ? 'ring-2 ring-[#F52B8C] ring-offset-1' : 'ring-1 ring-gray-200'}`}
                    >
                      <div className="h-10" style={{ background: t.headerGradient }} />
                      <div className="py-1" style={{ backgroundColor: t.pageBg }}>
                        <p className="text-[9px] font-bold text-center truncate px-0.5" style={{ color: t.textPrimary }}>{t.name}</p>
                      </div>
                      {selected && (
                        <div className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-[#F52B8C] rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </details>

            <button
              disabled={savingDesign}
              onClick={saveDesign}
              className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base hover:opacity-90 transition disabled:opacity-50"
            >
              {savingDesign ? 'Saving…' : 'Save design'}
            </button>
          </div>

          {/* Right — live preview (desktop only) */}
          <div className="hidden lg:flex flex-col items-center justify-start flex-shrink-0 w-80 xl:w-96 px-6 py-5 bg-gray-50 border-l border-gray-100">
            <div className="flex items-center gap-2 mb-4 self-start">
              <button
                onClick={() => setPreviewDevice('phone')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${previewDevice === 'phone' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Phone className="w-3.5 h-3.5" /> Phone
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${previewDevice === 'desktop' ? 'bg-white shadow-sm text-[#1A1A1A]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
            </div>
            <LivePreview
              profile={profile}
              avatarUrl={avatarUrl}
              coverUrl={coverUrl}
              services={services}
              designForm={designForm}
              device={previewDevice}
            />
          </div>
        </div>
      )}

      {/* ── Modals ───────────────────────────────────────────────── */}
      <AddEditServiceModal
        isOpen={showServiceModal}
        onClose={() => { setShowServiceModal(false); setEditingService(null); setPendingOfferType(null); }}
        onSuccess={() => {
          void loadServices();
          showSuccess(editingService ? 'Offer updated!' : 'Offer added!');
        }}
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
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
