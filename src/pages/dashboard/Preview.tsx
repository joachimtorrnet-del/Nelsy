import { useState, useEffect, useRef } from 'react';
import { Share2, Eye, Plus, Pencil, Check, ExternalLink } from 'lucide-react';
import Toast from '../../components/dashboard/Toast';
import ConfirmDialog from '../../components/dashboard/ConfirmDialog';
import AddEditServiceModal from '../../components/dashboard/AddEditServiceModal';
import { useToast } from '../../hooks/useToast';
import { getServices, deleteService, toggleServiceActive, updateProfile, uploadImage } from '../../lib/supabase-queries';

interface Profile {
  id?: string;
  full_name?: string;
  slug?: string;
  logo_url?: string;
  instagram_url?: string;
  tiktok_url?: string;
  color_accent?: string;
}

const THEME_COLORS = ['#F52B8C', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71'] as const;

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
}

type ActiveTab = 'studio' | 'services' | 'customize';

export default function Preview({ profile }: { profile: Profile | null }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('studio');
  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddService, setShowAddService] = useState(false);
  const [editingService, setEditingService] = useState<DbService | null>(null);
  const [copied, setCopied] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.logo_url || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Customize tab fields
  const [customForm, setCustomForm] = useState({
    full_name: profile?.full_name || '',
    instagram_url: profile?.instagram_url || '',
    tiktok_url: profile?.tiktok_url || '',
    color_accent: profile?.color_accent || '#F52B8C',
  });

  // Sync when profile prop changes
  useEffect(() => {
    setAvatarUrl(profile?.logo_url || '');
    setCustomForm({
      full_name: profile?.full_name || '',
      instagram_url: profile?.instagram_url || '',
      tiktok_url: profile?.tiktok_url || '',
      color_accent: profile?.color_accent || '#F52B8C',
    });
  }, [profile?.full_name, profile?.instagram_url, profile?.tiktok_url, profile?.color_accent, profile?.logo_url]);

  const { toast, showSuccess, showError, hideToast } = useToast();

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadImage(file, 'avatars');
      await updateProfile(profile.id, { logo_url: url });
      setAvatarUrl(url);
      showSuccess('Photo updated!');
    } catch {
      showError('Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

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
    if (profile?.id) loadServices(); else setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id]);

  const copyLink = () => {
    navigator.clipboard.writeText(`https://nelsy.app/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showSuccess('Link copied!');
  };

  const handleDeleteService = (service: DbService) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Service',
      message: `Delete "${service.name}"? This cannot be undone.`,
      onConfirm: async () => {
        try {
          await deleteService(service.id);
          showSuccess('Service deleted');
          loadServices();
        } catch { showError('Failed to delete service'); }
      },
    });
  };

  const handleToggleActive = async (service: DbService) => {
    try {
      await toggleServiceActive(service.id, !service.active);
      showSuccess(service.active ? 'Service hidden' : 'Service activated');
      loadServices();
    } catch { showError('Failed to update service'); }
  };

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: 'studio', label: 'Studio' },
    { id: 'services', label: `Services (${services.length})` },
    { id: 'customize', label: 'Edit Design' },
  ];

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* Underline Tabs */}
      <div className="flex border-b border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3.5 text-sm font-semibold transition-colors border-b-2 -mb-px ${
              activeTab === tab.id
                ? 'text-gray-900 border-[#F52B8C]'
                : 'text-gray-400 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── STUDIO TAB ── */}
      {activeTab === 'studio' && (
        <div className="px-4 pt-5 space-y-5">

          {/* Store URL banner */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-0.5">Your store link</p>
              <p className="text-sm font-semibold text-gray-900 truncate">nelsy.app/{slug}</p>
            </div>
            <button
              onClick={copyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                copied ? 'bg-green-100 text-green-700' : 'bg-[#F52B8C] text-white hover:opacity-90'
              }`}
            >
              {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Share2 className="w-3 h-3" /> Share</>}
            </button>
          </div>

          {/* Phone Mockup Preview */}
          <div className="flex justify-center">
            <div className="relative" style={{ width: 240 }}>
              {/* Phone frame */}
              <div className="bg-gray-900 rounded-[44px] p-2.5 shadow-2xl shadow-gray-400/30">
                {/* Dynamic island */}
                <div className="flex justify-center mb-1">
                  <div className="w-20 h-5 bg-gray-900 rounded-full border-2 border-gray-800" />
                </div>
                {/* Screen */}
                <div className="bg-white rounded-[36px] overflow-hidden" style={{ height: 460 }}>
                  {/* Store header */}
                  <div className="bg-gradient-to-b from-[#F52B8C] to-[#E0167A] px-4 pt-5 pb-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-white/25 border-2 border-white/60 flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-xl">{initials}</span>
                    </div>
                    <p className="text-white font-bold text-sm leading-tight">{displayName}</p>
                    <p className="text-white/70 text-xs mt-0.5">Professional Nail Tech 💅</p>
                    <div className="flex justify-center mt-2">
                      <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
                        <span className="text-white text-[9px] font-bold">IG</span>
                      </div>
                    </div>
                  </div>

                  {/* Services inside preview */}
                  <div className="px-3 pt-3 overflow-y-auto" style={{ height: 300 }}>
                    {loading ? (
                      <div className="space-y-2">
                        {[0, 1].map((i) => (
                          <div key={i} className="h-14 bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                      </div>
                    ) : activeServices.length === 0 ? (
                      <div className="text-center py-6">
                        <p className="text-gray-300 text-xs">No services yet</p>
                        <button
                          onClick={() => setActiveTab('services')}
                          className="mt-2 text-[10px] text-[#F52B8C] font-semibold"
                        >
                          + Add a service
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {activeServices.slice(0, 4).map((service) => (
                          <div key={service.id} className="bg-gray-50 rounded-xl p-2.5 flex items-center justify-between">
                            <div className="min-w-0">
                              <p className="text-gray-900 font-semibold text-[11px] truncate">{service.name}</p>
                              <p className="text-gray-400 text-[10px]">{getServiceDuration(service)} min</p>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <p className="text-gray-900 font-bold text-[11px]">€{getServicePrice(service).toFixed(0)}</p>
                              <div className="bg-[#F52B8C] rounded-lg px-1.5 py-0.5">
                                <p className="text-white text-[9px] font-bold">Book</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        {activeServices.length > 4 && (
                          <p className="text-center text-gray-300 text-[10px]">+{activeServices.length - 4} more</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom CTA inside phone */}
                  <div className="px-3 pb-3">
                    <div className="bg-[#F52B8C] rounded-xl py-2 text-center">
                      <p className="text-white font-bold text-xs">Book a Service</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reflection effect */}
              <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            </div>
          </div>

          {/* Action buttons */}
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

      {/* ── SERVICES TAB ── */}
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
                      : <span className="text-2xl">💅</span>
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="font-bold text-gray-900 leading-tight">{service.name}</p>
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

      {/* ── EDIT DESIGN TAB ── */}
      {activeTab === 'customize' && (
        <div className="px-4 pt-5 space-y-4">

          {/* Profile section */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Profile</p>

            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#F52B8C] to-[#E0167A] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                {avatarUrl
                  ? <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-white font-bold text-2xl">{initials}</span>
                }
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                <Pencil className="w-3.5 h-3.5" />
                {uploadingPhoto ? 'Uploading…' : 'Change photo'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Studio name</label>
                <input
                  type="text"
                  value={customForm.full_name}
                  onChange={(e) => setCustomForm((f) => ({ ...f, full_name: e.target.value }))}
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                  placeholder="Your Studio Name"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Social Links</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  IG
                </div>
                <input
                  type="text"
                  value={customForm.instagram_url}
                  onChange={(e) => setCustomForm((f) => ({ ...f, instagram_url: e.target.value }))}
                  placeholder="@your_instagram"
                  className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                  TT
                </div>
                <input
                  type="text"
                  value={customForm.tiktok_url}
                  onChange={(e) => setCustomForm((f) => ({ ...f, tiktok_url: e.target.value }))}
                  placeholder="@your_tiktok"
                  className="flex-1 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* Theme Color */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Theme Color</p>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl shadow-md flex-shrink-0 transition-all"
                style={{ background: customForm.color_accent, boxShadow: `0 4px 12px ${customForm.color_accent}50` }}
              />
              <div className="flex gap-2">
                {THEME_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCustomForm((f) => ({ ...f, color_accent: color }))}
                    className="w-8 h-8 rounded-full shadow-sm transition hover:scale-110"
                    style={{
                      background: color,
                      outline: customForm.color_accent === color ? `3px solid ${color}` : '3px solid transparent',
                      outlineOffset: '2px',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            disabled={savingProfile}
            onClick={async () => {
              if (!profile?.id) return;
              setSavingProfile(true);
              try {
                const { error } = await updateProfile(profile.id, {
                  full_name: customForm.full_name,
                  instagram_url: customForm.instagram_url,
                  tiktok_url: customForm.tiktok_url,
                  color_accent: customForm.color_accent,
                });
                if (error) throw error;
                showSuccess('Changes saved!');
              } catch {
                showError('Failed to save changes');
              } finally {
                setSavingProfile(false);
              }
            }}
            className="w-full py-4 bg-[#F52B8C] text-white rounded-2xl font-bold text-base hover:opacity-90 active:scale-[0.98] transition shadow-md shadow-[#F52B8C]/25 disabled:opacity-50"
          >
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>

          {/* View live link */}
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
        onSuccess={() => { loadServices(); showSuccess(editingService ? 'Service updated!' : 'Service added!'); }}
        service={editingService ? {
          id: editingService.id,
          name: editingService.name,
          description: editingService.description ?? '',
          category: editingService.category ?? 'Nails',
          duration_minutes: editingService.duration_minutes ?? editingService.duration ?? 60,
          price_total: editingService.price_total ?? editingService.price ?? 0,
          deposit_amount: editingService.deposit_amount ?? 0,
          active: editingService.active,
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
