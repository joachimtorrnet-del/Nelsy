import { useState, useEffect, useRef, useMemo } from 'react';
import { Share2, Eye, Plus, Pencil, Check, ExternalLink, Star, Camera, Loader2 } from 'lucide-react';
import { THEMES } from '../../lib/themes';
import Toast from '../../components/dashboard/Toast';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import AddEditServiceModal from '../../components/dashboard/AddEditServiceModal';
import GalleryManager from '../../components/dashboard/GalleryManager';
import { useToast } from '../../hooks/useToast';
import {
  getServices, deleteService, toggleServiceActive, updateProfile, uploadImage,
  getGalleryPhotos, setFeaturedService, clearFeaturedService,
} from '../../lib/supabase-queries';
import type { GalleryPhoto } from '../../lib/supabase-queries';
import { PublicStudioView } from '../../components/studio/PublicStudioView';
import type { Merchant, Service } from '../../types';

// ── Types ─────────────────────────────────────────────────────────────────────

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
}

interface ContentForm {
  full_name: string;
  specialty: string;
  location: string;
  bio: string;
  instagram_url: string;
  tiktok_url: string;
}

interface DesignForm {
  color_accent: string;
  theme_preset: string;
}

type ActiveTab = 'preview' | 'content' | 'services' | 'design';

// ── Live iPhone bezel preview ─────────────────────────────────────────────────

interface LivePhonePreviewProps {
  contentForm: ContentForm;
  designForm: DesignForm;
  avatarUrl: string;
  coverUrl: string;
  activeServices: DbService[];
  profileId?: string;
  profileSlug?: string;
  getServicePrice: (s: DbService) => number;
  getServiceDuration: (s: DbService) => number;
}

function LivePhonePreview({
  contentForm, designForm, avatarUrl, coverUrl,
  activeServices, profileId, profileSlug,
  getServicePrice, getServiceDuration,
}: LivePhonePreviewProps) {
  const previewMerchant: Merchant = useMemo(() => {
    const mappedServices: Service[] = activeServices.map((s) => ({
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
      id: profileId ?? 'preview',
      slug: profileSlug ?? 'preview',
      salon_name: contentForm.full_name || 'Your Studio',
      name: contentForm.full_name || 'Your Studio',
      bio: contentForm.bio || '',
      logo_url: avatarUrl || undefined,
      cover_url: coverUrl || undefined,
      specialty: contentForm.specialty || undefined,
      location: contentForm.location || undefined,
      instagram: contentForm.instagram_url
        ? contentForm.instagram_url.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\/?/, '')
        : undefined,
      tiktok: contentForm.tiktok_url || undefined,
      color_accent: designForm.color_accent,
      theme_preset: designForm.theme_preset,
      services: mappedServices,
    };
  }, [contentForm, designForm, avatarUrl, coverUrl, activeServices, profileId, profileSlug, getServicePrice, getServiceDuration]);

  return (
    <div className="flex justify-center">
      <div className="relative" style={{ width: 240 }}>
        <div className="bg-gray-900 rounded-[44px] p-2.5 shadow-2xl shadow-gray-400/30">
          <div className="flex justify-center mb-1">
            <div className="w-20 h-5 bg-gray-900 rounded-full border-2 border-gray-800" />
          </div>
          <div className="rounded-[36px] overflow-hidden" style={{ height: 480, position: 'relative' }}>
            <div
              style={{
                width: 480, height: 960,
                transform: 'scale(0.5)',
                transformOrigin: 'top left',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              <PublicStudioView merchant={previewMerchant} mode="preview" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Preview({ profile }: { profile: Profile | null }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview');
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [copied, setCopied] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [savingDesign, setSavingDesign] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [settingFeatured, setSettingFeatured] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.logo_url || '');
  const [coverUrl, setCoverUrl] = useState(profile?.cover_url || '');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [contentForm, setContentForm] = useState<ContentForm>({
    full_name: profile?.full_name || '',
    specialty: profile?.specialty || '',
    location: profile?.location || '',
    bio: profile?.bio || '',
    instagram_url: profile?.instagram_url || '',
    tiktok_url: profile?.tiktok_url || '',
  });

  const [designForm, setDesignForm] = useState<DesignForm>({
    color_accent: profile?.color_accent || '#F52B8C',
    theme_preset: profile?.theme_preset || 'soft',
  });

  // Re-sync when profile loads
  useEffect(() => {
    setAvatarUrl(profile?.logo_url || '');
    setCoverUrl(profile?.cover_url || '');
    setContentForm({
      full_name: profile?.full_name || '',
      specialty: profile?.specialty || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      instagram_url: profile?.instagram_url || '',
      tiktok_url: profile?.tiktok_url || '',
    });
    setDesignForm({
      color_accent: profile?.color_accent || '#F52B8C',
      theme_preset: profile?.theme_preset || 'soft',
    });
  }, [
    profile?.full_name, profile?.specialty, profile?.location, profile?.bio,
    profile?.instagram_url, profile?.tiktok_url, profile?.color_accent,
    profile?.theme_preset, profile?.logo_url, profile?.cover_url,
  ]);

  const { toast, showSuccess, showError, hideToast } = useToast();

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean; title: string; message: string; onConfirm: () => void;
  }>({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const slug = profile?.slug || 'your-studio';
  const displayName = profile?.full_name || 'Your Studio';
  const initials = displayName.charAt(0).toUpperCase();

  const getServicePrice = (s: DbService) => parseFloat(String(s.price_total ?? s.price ?? 0));
  const getServiceDuration = (s: DbService) => s.duration_minutes ?? s.duration ?? 60;
  const activeServices = services.filter((s) => s.active);

  const loadServices = async () => {
    if (!profile?.id) return;
    try {
      const { data } = await getServices(profile.id);
      setServices((data as DbService[]) ?? []);
    } catch {
      showError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      void loadServices();
      getGalleryPhotos(profile.id).then(setGalleryPhotos).catch(console.error);
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://getnelsy.com/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showSuccess('Link copied!');
  };

  // ── Upload handlers ────────────────────────────────────────────

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadImage(file, 'avatars');
      await updateProfile(profile.id, { logo_url: url });
      setAvatarUrl(url);
      showSuccess('Profile photo updated!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      showError(`Avatar upload failed: ${msg}`);
    } finally {
      setUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    setUploadingCover(true);
    try {
      const url = await uploadImage(file, 'covers');
      await updateProfile(profile.id, { cover_url: url });
      setCoverUrl(url);
      showSuccess('Cover photo updated!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : JSON.stringify(err);
      showError(`Cover upload failed: ${msg}`);
    } finally {
      setUploadingCover(false);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
  };

  // ── Save handlers ──────────────────────────────────────────────

  const saveContent = async () => {
    if (!profile?.id) return;
    setSavingContent(true);
    try {
      const { error } = await updateProfile(profile.id, {
        full_name: contentForm.full_name,
        bio: contentForm.bio,
        instagram_url: contentForm.instagram_url,
        tiktok_url: contentForm.tiktok_url,
        specialty: contentForm.specialty || null,
        location: contentForm.location || null,
      });
      if (error) throw error;
      showSuccess('Profile saved!');
    } catch {
      showError('Failed to save profile');
    } finally {
      setSavingContent(false);
    }
  };

  const saveDesign = async () => {
    if (!profile?.id) return;
    setSavingDesign(true);
    try {
      const { error } = await updateProfile(profile.id, {
        color_accent: designForm.color_accent,
        theme_preset: designForm.theme_preset,
      });
      if (error) throw error;
      showSuccess('Design saved!');
    } catch {
      showError('Failed to save design');
    } finally {
      setSavingDesign(false);
    }
  };

  // ── Service handlers ───────────────────────────────────────────

  const handleDeleteService = (service: DbService) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Service',
      message: `Delete "${service.name}"? This cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteService(service.id);
          showSuccess('Service deleted');
          void loadServices();
        } catch { showError('Failed to delete service'); }
      },
    });
  };

  const handleToggleActive = async (service: DbService) => {
    try {
      await toggleServiceActive(service.id, !service.active);
      showSuccess(service.active ? 'Service hidden' : 'Service activated');
      void loadServices();
    } catch { showError('Failed to update service'); }
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
    } catch { showError('Failed to update featured service'); }
    finally { setSettingFeatured(null); }
  };

  // ── Tabs ───────────────────────────────────────────────────────

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'preview', label: 'Preview' },
    { id: 'content', label: 'Content' },
    { id: 'services', label: `Services${services.length ? ` (${services.length})` : ''}` },
    { id: 'design', label: 'Design' },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* Underline Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3.5 text-xs font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'text-gray-900 border-[#F52B8C]'
                : 'text-gray-400 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── PREVIEW TAB ────────────────────────────────────────── */}
      {activeTab === 'preview' && (
        <div className="px-4 pt-5 space-y-5">
          {/* Store URL banner */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">Your store link</p>
              <p className="text-sm font-semibold text-gray-900 truncate">getnelsy.com/{slug}</p>
            </div>
            <button
              onClick={copyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                copied ? 'bg-green-100 text-green-700' : 'bg-[#F52B8C] text-white hover:opacity-90'
              }`}
            >
              {copied
                ? <><Check className="w-3 h-3" /> Copied!</>
                : <><Share2 className="w-3 h-3" /> Share</>}
            </button>
          </div>

          {/* Live phone preview */}
          <LivePhonePreview
            contentForm={contentForm}
            designForm={designForm}
            avatarUrl={avatarUrl}
            coverUrl={coverUrl}
            activeServices={activeServices}
            profileId={profile?.id}
            profileSlug={profile?.slug}
            getServicePrice={getServicePrice}
            getServiceDuration={getServiceDuration}
          />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={copyLink}
              className="flex-1 py-3.5 bg-[#F52B8C] text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition shadow-md shadow-[#F52B8C]/25"
            >
              <Share2 className="w-4 h-4" />
              Share Store Link
            </button>
            <a
              href={`/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3.5 bg-gray-100 text-gray-700 rounded-2xl font-bold text-sm hover:bg-gray-200 transition"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Quick add if no services */}
          {!loading && activeServices.length === 0 && (
            <button
              onClick={() => { setEditingService(null); setShowAddService(true); }}
              className="w-full py-4 border-2 border-dashed border-[#F52B8C]/40 rounded-2xl font-bold text-sm text-[#F52B8C] flex items-center justify-center gap-2 hover:bg-[#F52B8C]/5 transition"
            >
              <Plus className="w-4 h-4" />
              Add your first service
            </button>
          )}
        </div>
      )}

      {/* ── CONTENT TAB ────────────────────────────────────────── */}
      {activeTab === 'content' && (
        <div className="px-4 pt-5 space-y-5 pb-6">

          {/* Photos section */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Photos</p>

            {/* Cover photo */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-500 mb-2">Cover photo</label>
              <div
                onClick={() => coverInputRef.current?.click()}
                className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
                style={{ height: 110 }}
              >
                {coverUrl ? (
                  <>
                    <img src={coverUrl} alt="cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-100 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-1 group-hover:bg-gray-50 transition">
                    <Camera className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-400 font-medium">Add cover photo</span>
                  </div>
                )}
                {uploadingCover && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-2xl">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2">Profile photo</label>
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 flex items-center justify-center cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #F52B8C, #E0167A)' }}
                  onClick={() => avatarInputRef.current?.click()}
                >
                  {avatarUrl
                    ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                    : <span className="text-white font-bold text-xl">{initials}</span>}
                </div>
                <button
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                >
                  {uploadingAvatar ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Uploading…</> : <><Pencil className="w-3.5 h-3.5" />Change photo</>}
                </button>
                <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </div>
            </div>
          </div>

          {/* Profile info */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile</p>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Studio name</label>
              <input
                type="text"
                value={contentForm.full_name}
                onChange={(e) => setContentForm((f) => ({ ...f, full_name: e.target.value }))}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                placeholder="Your Studio Name"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Specialty</label>
                <input
                  type="text"
                  value={contentForm.specialty}
                  onChange={(e) => setContentForm((f) => ({ ...f, specialty: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                  placeholder="Nail Artist"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Location</label>
                <input
                  type="text"
                  value={contentForm.location}
                  onChange={(e) => setContentForm((f) => ({ ...f, location: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                  placeholder="Paris 9e"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">Bio</label>
              <textarea
                value={contentForm.bio}
                onChange={(e) => setContentForm((f) => ({ ...f, bio: e.target.value }))}
                rows={2}
                maxLength={160}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition resize-none"
                placeholder="Gel & nail art specialist · 5+ years"
              />
              <p className="text-right text-[10px] text-gray-300 mt-1">{contentForm.bio.length}/160</p>
            </div>
          </div>

          {/* Social links */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Social Links</p>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">IG</div>
              <input
                type="text"
                value={contentForm.instagram_url}
                onChange={(e) => setContentForm((f) => ({ ...f, instagram_url: e.target.value }))}
                placeholder="@your_instagram"
                className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">TT</div>
              <input
                type="text"
                value={contentForm.tiktok_url}
                onChange={(e) => setContentForm((f) => ({ ...f, tiktok_url: e.target.value }))}
                placeholder="@your_tiktok"
                className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
              />
            </div>
          </div>

          {/* Portfolio gallery */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Portfolio</p>
            <p className="text-xs text-gray-400">Add your best work — shown as a scrollable gallery on your page.</p>
            {profile?.id ? (
              <GalleryManager
                profileId={profile.id}
                photos={galleryPhotos}
                onPhotosChange={setGalleryPhotos}
              />
            ) : (
              <p className="text-sm text-gray-400 py-4 text-center">Connect your Nelsy account to manage your portfolio.</p>
            )}
          </div>

          <button
            disabled={savingContent}
            onClick={saveContent}
            className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base hover:opacity-90 active:scale-[0.98] transition shadow-md shadow-[#F52B8C]/25 disabled:opacity-50"
          >
            {savingContent ? 'Saving…' : 'Save Profile'}
          </button>

          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-[#F52B8C] text-sm font-semibold"
          >
            <Eye className="w-4 h-4" />
            View live store
          </a>
        </div>
      )}

      {/* ── SERVICES TAB ───────────────────────────────────────── */}
      {activeTab === 'services' && (
        <div className="px-4 pt-5 space-y-3">
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">💅</div>
              <p className="text-gray-900 font-bold text-lg mb-1">No services yet</p>
              <p className="text-gray-400 text-sm mb-8">Add your first service to start booking clients</p>
            </div>
          ) : (
            services.map((service) => (
              <div key={service.id} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  {/* Thumbnail */}
                  <div className="w-14 h-14 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {service.image_url
                      ? <img src={service.image_url} alt={service.name} className="w-full h-full object-cover" />
                      : <span className="text-2xl">💅</span>}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-bold text-gray-900 leading-tight truncate">{service.name}</p>
                      {service.is_featured && (
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 flex-shrink-0" />
                      )}
                    </div>
                    {service.description && (
                      <p className="text-xs text-gray-400 truncate mb-1">{service.description}</p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="font-bold text-gray-900">€{getServicePrice(service).toFixed(0)}</span>
                      <span>{getServiceDuration(service)} min</span>
                    </div>
                  </div>
                </div>

                {/* Actions row */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => { setEditingService(service); setShowAddService(true); }}
                    className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-1"
                  >
                    <Pencil className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleFeatured(service)}
                    disabled={settingFeatured === service.id}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition border flex items-center justify-center gap-1 ${
                      service.is_featured
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-amber-200 hover:text-amber-600'
                    }`}
                  >
                    {settingFeatured === service.id
                      ? <Loader2 className="w-3 h-3 animate-spin" />
                      : <Star className={`w-3 h-3 ${service.is_featured ? 'fill-amber-500 text-amber-500' : ''}`} />}
                    {service.is_featured ? 'Featured' : 'Feature'}
                  </button>
                  <button
                    onClick={() => handleToggleActive(service)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold transition border ${
                      service.active
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-gray-100 text-gray-500 border-transparent'
                    }`}
                  >
                    {service.active ? '● Active' : '○ Hidden'}
                  </button>
                  <button
                    onClick={() => handleDeleteService(service)}
                    className="px-3 py-2 bg-red-50 text-red-400 rounded-xl text-xs font-semibold hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          <button
            onClick={() => { setEditingService(null); setShowAddService(true); }}
            className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base hover:opacity-90 active:scale-[0.98] transition shadow-md shadow-[#F52B8C]/25 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </button>
        </div>
      )}

      {/* ── DESIGN TAB ─────────────────────────────────────────── */}
      {activeTab === 'design' && (
        <div className="px-4 pt-5 space-y-5 pb-6">

          {/* Templates */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Template</p>
            <div className="grid grid-cols-5 gap-2">
              {Object.values(THEMES).map((t) => {
                const selected = designForm.theme_preset === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setDesignForm((f) => ({ ...f, theme_preset: t.id, color_accent: t.defaultAccent }))}
                    className={`relative rounded-2xl overflow-hidden transition-all ${selected ? 'ring-2 ring-[#F52B8C] ring-offset-2' : 'ring-1 ring-gray-200'}`}
                  >
                    <div className="h-14" style={{ background: t.headerGradient }} />
                    <div
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white"
                      style={{ backgroundColor: t.defaultAccent }}
                    />
                    <div className="py-1.5 text-center" style={{ backgroundColor: t.pageBg }}>
                      <p className="text-[10px] font-bold truncate px-1" style={{ color: t.textPrimary }}>
                        {t.name}
                      </p>
                    </div>
                    {selected && (
                      <div className="absolute top-1 right-1 w-4 h-4 bg-[#F52B8C] rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent color */}
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Accent Color</p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl shadow-sm flex-shrink-0"
                style={{ background: designForm.color_accent }}
              />
              <div className="flex gap-2 flex-wrap">
                {['#F52B8C', '#9333EA', '#3B82F6', '#E0024A', '#8B6343', '#059669'].map((color) => (
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
                <label className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition overflow-hidden">
                  <input
                    type="color"
                    value={designForm.color_accent}
                    onChange={(e) => setDesignForm((f) => ({ ...f, color_accent: e.target.value }))}
                    className="opacity-0 absolute w-1 h-1"
                  />
                  <span className="text-gray-400 text-xs font-bold">+</span>
                </label>
              </div>
            </div>
          </div>

          <button
            disabled={savingDesign}
            onClick={saveDesign}
            className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base hover:opacity-90 active:scale-[0.98] transition shadow-md shadow-[#F52B8C]/25 disabled:opacity-50"
          >
            {savingDesign ? 'Saving…' : 'Save Design'}
          </button>

          <a
            href={`/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 text-[#F52B8C] text-sm font-semibold"
          >
            <Eye className="w-4 h-4" />
            View live store
          </a>
        </div>
      )}

      {/* Modals */}
      <AddEditServiceModal
        isOpen={showAddService}
        onClose={() => { setShowAddService(false); setEditingService(null); }}
        onSuccess={() => {
          void loadServices();
          showSuccess(editingService ? 'Service updated!' : 'Service added!');
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
