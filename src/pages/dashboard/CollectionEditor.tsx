import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, CheckCheck, ChevronDown, ChevronUp, Loader2, Trash2,
  AlertTriangle, Plus, X, GripVertical, ArrowUp, ArrowDown,
  Eye, Search, Copy, Pencil,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  uploadImage,
  createCollection, updateCollection, deleteCollection,
  addCollectionMember,
  getCollectionsForProfile, upsertSubcategory,
} from '@/lib/supabase-queries';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { ServiceCollectionCard } from '@/components/studio/ServiceCollectionCard';
import { getTheme } from '@/lib/themes';
import { formatCurrency } from '@/lib/utils';
import type { ServiceCollection, CollectionMember, CollectionSubcategory } from '@/types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ProfileRow {
  id: string; full_name?: string; salon_name?: string; bio?: string; slug?: string;
  logo_url?: string; cover_url?: string; specialty?: string; location?: string;
  instagram?: string; tiktok?: string; theme_preset?: string; color_accent?: string;
}

interface ServiceRow {
  id: string; name: string; description?: string; category?: string;
  duration_minutes?: number; price_total?: number; deposit_amount?: number;
  active: boolean; is_featured?: boolean; image_url?: string;
  studio_placement?: string;
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error';
type ActiveTab = 'card' | 'services' | 'options';

// ── Accordion ─────────────────────────────────────────────────────────────────

function Accordion({ title, icon, children, defaultOpen = false }: { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition text-left">
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

// ── Delete confirm ─────────────────────────────────────────────────────────────

function DeleteConfirm({ onConfirm, onCancel, loading }: { onConfirm: () => void; onCancel: () => void; loading: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="font-bold text-gray-900">Delete this collection?</h3>
        </div>
        <p className="text-sm text-gray-500 mb-2">The collection and its subcategories will be permanently deleted.</p>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
          Individual services are not deleted. They will revert to standalone studio cards if their placement includes "individual".
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
          <button onClick={onConfirm} disabled={loading} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Delete collection'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Service picker modal ───────────────────────────────────────────────────────

interface ServicePickerProps {
  services: ServiceRow[];
  memberIds: Set<string>;
  onAdd: (serviceId: string) => void;
  onClose: () => void;
}

function ServicePicker({ services, memberIds, onAdd, onClose }: ServicePickerProps) {
  const [query, setQuery] = useState('');
  const eligible = services.filter((s) => {
    const cat = s.category ?? '';
    // Only appointment-based services (not prefixed with _digital, _physical, etc.)
    if (cat.startsWith('_')) return false;
    return true;
  });
  const filtered = eligible.filter((s) =>
    !memberIds.has(s.id) && (query === '' || s.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0">
          <h3 className="font-bold text-gray-900">Add services</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <div className="px-4 pb-3 flex-shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services…"
              className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F52B8C]"
              autoFocus
            />
          </div>
        </div>
        <div className="overflow-y-auto flex-1 px-4 pb-4">
          {filtered.length === 0 ? (
            <p className="text-center py-8 text-sm text-gray-400">
              {query ? 'No matching services.' : 'All eligible services are already in this collection.'}
            </p>
          ) : (
            <div className="space-y-1">
              {filtered.map((s) => (
                <button
                  key={s.id}
                  onClick={() => { onAdd(s.id); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                    {s.image_url
                      ? <img src={s.image_url} alt="" className="w-full h-full object-cover" />
                      : <span className="w-full h-full flex items-center justify-center text-lg">💅</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                    <p className="text-xs text-gray-500">
                      {s.duration_minutes ?? 60} min · {formatCurrency(parseFloat(String(s.price_total ?? 0)))}
                      {!s.active && ' · Hidden'}
                    </p>
                  </div>
                  <Plus className="w-4 h-4 text-[#F52B8C] flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Member row ─────────────────────────────────────────────────────────────────

function MemberRow({
  member, idx, total, subcategories, onRemove, onMoveUp, onMoveDown, onSubChange,
}: {
  member: CollectionMember; idx: number; total: number;
  subcategories: CollectionSubcategory[];
  onRemove: () => void; onMoveUp: () => void; onMoveDown: () => void;
  onSubChange: (subcategoryId: string | null) => void;
}) {
  const svc = member.service;
  const isHidden = (svc).active === false;
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
      <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0 cursor-grab" />
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
        {svc.image_url
          ? <img src={svc.image_url} alt="" className="w-full h-full object-cover" />
          : <span className="w-full h-full flex items-center justify-center">💅</span>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900 truncate">{svc.name}</span>
          {isHidden && <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-md font-medium">Hidden</span>}
        </div>
        <p className="text-xs text-gray-500">
          {svc.duration ?? 60} min · {formatCurrency(svc.price)}
        </p>
      </div>
      {subcategories.length > 0 && (
        <select
          value={member.subcategory_id ?? ''}
          onChange={(e) => onSubChange(e.target.value || null)}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-1 focus:ring-[#F52B8C] bg-white text-gray-600 flex-shrink-0 max-w-[110px]"
        >
          <option value="">No subcategory</option>
          {subcategories.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
      )}
      <div className="flex gap-1 flex-shrink-0">
        <button onClick={onMoveUp} disabled={idx === 0}
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition">
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
        <button onClick={onMoveDown} disabled={idx === total - 1}
          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-30 transition">
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
        <button onClick={onRemove}
          className="w-7 h-7 rounded-lg border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 transition">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function CollectionEditor() {
  const { collectionId } = useParams<{ collectionId: string }>();
  const navigate = useNavigate();
  const isNew = collectionId === 'new';

  const [profileId, setProfileId] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [allServices, setAllServices] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [saveError, setSaveError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('card');

  // Card fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Members (local draft — persisted on save)
  const [members, setMembers] = useState<CollectionMember[]>([]);

  // Subcategories (local draft)
  const [subcategories, setSubcategories] = useState<CollectionSubcategory[]>([]);
  const [newSubName, setNewSubName] = useState('');

  // Options
  const [isActive, setIsActive] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const loadedRef = useRef(false);
  const [dirty, setDirty] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  // ── Load ──
  const load = useCallback(async () => {
    if (!supabase) { navigate('/login'); return; }
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { navigate('/login'); return; }
    setProfileId(user.id);

    const [profRes, svcsRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('services').select('*').eq('profile_id', user.id).order('display_order'),
    ]);
    setProfile(profRes.data);
    setAllServices((svcsRes.data ?? []) as ServiceRow[]);

    if (!isNew && collectionId) {
      const cols = await getCollectionsForProfile(user.id);
      const col = cols.find((c) => c.id === collectionId);
      if (!col) { navigate('/dashboard/preview'); return; }
      setTitle(col.title);
      setDescription(col.description ?? '');
      setImageUrl(col.image_url ?? '');
      setIsActive(col.active);
      setSubcategories(col.subcategories);
      setMembers(col.members);
    }

    setLoading(false);
    setTimeout(() => { loadedRef.current = true; }, 0);
  }, [collectionId, isNew, navigate]);

  useEffect(() => { void load(); }, [load]);

  useEffect(() => {
    if (!loadedRef.current) return;
    setDirty(true);
  }, [title, description, imageUrl, isActive, members, subcategories]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [dirty]);

  // ── Image upload ──
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const prev = imageUrl;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'collections');
      setImageUrl(url);
    } catch {
      setImageUrl(prev);
      setErrors((p) => ({ ...p, image: 'Upload failed. Please try again.' }));
    } finally {
      setUploadingImage(false);
      if (imageRef.current) imageRef.current.value = '';
    }
  };

  // ── Member ops (local draft) ──
  const memberIds = new Set(members.map((m) => m.service.id));

  const addMember = (serviceId: string) => {
    const svc = allServices.find((s) => s.id === serviceId);
    if (!svc) return;
    setMembers((prev) => [...prev, {
      service: {
        id: svc.id, name: svc.name, description: svc.description ?? '',
        price: parseFloat(String(svc.price_total ?? 0)),
        duration: svc.duration_minutes ?? 60,
        deposit: parseFloat(String(svc.deposit_amount ?? 0)),
        category: svc.category, image_url: svc.image_url,
        is_featured: svc.is_featured ?? false,
        active: svc.active,
      } as CollectionMember['service'],
      subcategory_id: null,
      display_order: prev.length,
    }]);
  };

  const removeMember = (idx: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const moveMember = (idx: number, dir: 1 | -1) => {
    const next = [...members];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setMembers(next.map((m, i) => ({ ...m, display_order: i })));
  };

  const changeMemberSub = (idx: number, subcategoryId: string | null) => {
    setMembers((prev) => prev.map((m, i) => i === idx ? { ...m, subcategory_id: subcategoryId } : m));
  };

  // ── Subcategory ops ──
  const addSubcategory = () => {
    const name = newSubName.trim();
    if (!name) return;
    setSubcategories((prev) => [...prev, {
      id: `new-${Date.now()}`, name, display_order: prev.length,
    }]);
    setNewSubName('');
  };

  const removeSubcategory = (subId: string) => {
    setSubcategories((prev) => prev.filter((s) => s.id !== subId));
    // Unassign members from deleted subcategory
    setMembers((prev) => prev.map((m) => m.subcategory_id === subId ? { ...m, subcategory_id: null } : m));
  };

  // ── Validate ──
  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = 'Collection title is required.';
    if (isActive) {
      const publishedMembers = members.filter((m) => m.service.active !== false);
      if (publishedMembers.length === 0) e.members = 'At least one published service is required to publish a collection.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Save ──
  const handleSave = async (publish: boolean) => {
    const saveActive = publish ? true : isActive && !isNew;
    setIsActive(saveActive);
    if (!validate()) return;
    if (!profileId) return;
    setSaveState('saving');
    setSaveError('');

    try {
      let savedId = collectionId!;

      const collectionPayload = {
        profile_id: profileId,
        title: title.trim(),
        ...(description.trim() ? { description: description.trim() } : {}),
        ...(imageUrl ? { image_url: imageUrl } : {}),
        active: saveActive,
      };

      if (isNew) {
        const { data, error } = await createCollection(collectionPayload);
        if (error) throw error;
        savedId = (data as { id: string }).id;
      } else {
        const { error } = await updateCollection(savedId, collectionPayload);
        if (error) throw error;
      }

      // Persist subcategories: for new ones (id starts with 'new-') insert, others update
      const subIdMap: Record<string, string> = {};
      for (const sub of subcategories) {
        const isNewSub = sub.id.startsWith('new-');
        const saved = await upsertSubcategory({
          id: isNewSub ? undefined : sub.id,
          collection_id: savedId,
          profile_id: profileId,
          name: sub.name,
          display_order: sub.display_order,
        });
        subIdMap[sub.id] = saved.id;
      }

      // Sync members: delete all existing, re-insert in current order
      // (simpler than diffing for MVP; only touches collection_members rows)
      if (!supabase) throw new Error('Supabase not initialized');
      await supabase.from('collection_members').delete().eq('collection_id', savedId);
      for (let i = 0; i < members.length; i++) {
        const m = members[i];
        const subId = m.subcategory_id ? (subIdMap[m.subcategory_id] ?? m.subcategory_id) : undefined;
        await addCollectionMember(savedId, m.service.id, subId);
      }

      setDirty(false);
      setSaveState('saved');
      if (isNew) {
        navigate(`/dashboard/collection/${savedId}`, { replace: true });
      } else {
        setTimeout(() => setSaveState('idle'), 2500);
      }
    } catch (err) {
      setSaveState('error');
      setSaveError(err instanceof Error ? err.message : 'Save failed. Please try again.');
    }
  };

  // ── Delete ──
  const handleDelete = async () => {
    if (!collectionId || isNew) return;
    setDeleting(true);
    try {
      await deleteCollection(collectionId);
      navigate('/dashboard/preview');
    } catch { setDeleting(false); setShowDelete(false); }
  };

  // ── Preview ──
  const theme = getTheme(profile?.theme_preset, profile?.color_accent);
  const slug = profile?.slug ?? 'my-studio';
  const studioUrl = `getnelsy.com/${slug}`;
  const publishedMemberCount = members.filter(
    (m) => m.service.active !== false
  ).length;

  const draftCollection: ServiceCollection = {
    id: collectionId ?? 'draft',
    profile_id: profileId ?? '',
    title: title || 'Collection name',
    description: description || null,
    image_url: imageUrl || null,
    display_order: 0,
    active: isActive,
    subcategories,
    members,
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
      <Sidebar
        profile={profile}
        activeTab="preview"
        setActiveTab={(tab) => navigate(tab === 'home' ? '/dashboard' : `/dashboard/${tab}`)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-14 flex-shrink-0 bg-white border-b border-gray-100 flex items-center px-4 lg:px-6 gap-3">
          <Link to="/dashboard/preview" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition">
            <ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">My Studio</span>
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-gray-900 truncate max-w-[160px]">
            {isNew ? 'New collection' : (title || 'Edit collection')}
          </span>
          <div className="flex-1" />
          <div className="hidden sm:flex items-center gap-2">
            <a href={`/${slug}`} target="_blank" rel="noopener noreferrer"
              className="text-[#F52B8C] text-sm font-medium hover:opacity-80 truncate max-w-[180px]">{studioUrl}</a>
            <button
              onClick={() => { navigator.clipboard.writeText(`https://${studioUrl}`).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:border-[#F52B8C] hover:text-[#F52B8C] transition">
              {copied ? <CheckCheck className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Edit column */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-white px-4 lg:px-6 flex-shrink-0">
              {(['card', 'services', 'options'] as const).map((tab) => {
                const label = tab === 'card' ? 'Card' : tab === 'services' ? 'Services' : 'Options';
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3.5 text-sm font-semibold border-b-2 transition mr-2 ${activeTab === tab ? 'border-[#F52B8C] text-[#F52B8C]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                    {label}
                    {tab === 'services' && members.length > 0 && (
                      <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">{members.length}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-xl px-4 lg:px-6 py-6 space-y-8">

                {/* ── CARD TAB ── */}
                {activeTab === 'card' && (
                  <>
                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">1</span>
                        Title
                      </p>
                      <input
                        type="text" value={title} maxLength={60} onChange={(e) => setTitle(e.target.value)}
                        placeholder="Nails"
                        className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${errors.title ? 'border-red-400' : 'border-gray-200'}`}
                      />
                      {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </section>

                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">2</span>
                        Short description
                      </p>
                      <textarea
                        value={description} rows={2} maxLength={200}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Optional short description shown on the collection card"
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none resize-none"
                      />
                    </section>

                    <section>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold mr-2">3</span>
                        Cover image
                      </p>
                      <div
                        className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:border-gray-300 transition cursor-pointer"
                        onClick={() => imageRef.current?.click()}
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                          {imageUrl ? <img src={imageUrl} alt="" className="w-full h-full object-cover" /> : <Eye className="w-5 h-5 text-gray-400" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-gray-400 mb-2">Optional · 400 × 400 recommended</p>
                          <button type="button" disabled={uploadingImage}
                            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition disabled:opacity-50">
                            {uploadingImage && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                            {uploadingImage ? 'Uploading…' : 'Choose image'}
                          </button>
                          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        </div>
                      </div>
                      <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </section>
                  </>
                )}

                {/* ── SERVICES TAB ── */}
                {activeTab === 'services' && (
                  <>
                    {/* Subcategories */}
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subcategories</p>
                        <p className="text-xs text-gray-400">Optional</p>
                      </div>
                      {subcategories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-700">
                              <span>{sub.name}</span>
                              <button onClick={() => removeSubcategory(sub.id)} className="text-gray-400 hover:text-red-500 transition">
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <input
                          type="text" value={newSubName} onChange={(e) => setNewSubName(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSubcategory(); } }}
                          placeholder="Add subcategory (e.g. Gel, Extensions)"
                          className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#F52B8C] outline-none"
                        />
                        <button onClick={addSubcategory} disabled={!newSubName.trim()}
                          className="px-3 py-2 bg-gray-100 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-200 transition disabled:opacity-40">
                          Add
                        </button>
                      </div>
                    </section>

                    {/* Member list */}
                    <section>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          Services
                          {publishedMemberCount > 0 && <span className="ml-2 font-normal normal-case text-gray-400">({publishedMemberCount} published)</span>}
                        </p>
                      </div>
                      {errors.members && (
                        <p className="text-amber-700 text-xs bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">{errors.members}</p>
                      )}
                      {members.length === 0 ? (
                        <div className="border-2 border-dashed border-gray-200 rounded-xl py-8 text-center mb-3">
                          <p className="text-sm text-gray-400">No services added yet.</p>
                          <p className="text-xs text-gray-300 mt-1">Click "Add services" below.</p>
                        </div>
                      ) : (
                        <div className="bg-white border border-gray-100 rounded-2xl px-4 mb-3 shadow-sm">
                          {members.map((m, idx) => (
                            <MemberRow
                              key={m.service.id} member={m} idx={idx} total={members.length}
                              subcategories={subcategories}
                              onRemove={() => removeMember(idx)}
                              onMoveUp={() => moveMember(idx, -1)}
                              onMoveDown={() => moveMember(idx, 1)}
                              onSubChange={(subId) => changeMemberSub(idx, subId)}
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowPicker(true)}
                          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                          <Plus className="w-4 h-4" /> Add services
                        </button>
                        <button
                          onClick={() => navigate('/dashboard/offer/new')}
                          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                        >
                          <Pencil className="w-4 h-4" /> Create new service
                        </button>
                      </div>
                    </section>
                  </>
                )}

                {/* ── OPTIONS TAB ── */}
                {activeTab === 'options' && (
                  <div className="space-y-3">
                    <Accordion title="Visibility" icon={<Eye className="w-4 h-4" />} defaultOpen>
                      <div className="flex items-center justify-between pt-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Active</p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {isActive ? 'Visible to clients on your studio page.' : 'Saved as draft — not visible to clients.'}
                          </p>
                        </div>
                        <button onClick={() => setIsActive(!isActive)}
                          className={`relative w-11 h-6 rounded-full transition flex-shrink-0 ${isActive ? 'bg-green-500' : 'bg-gray-200'}`}>
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isActive ? 'translate-x-5' : ''}`} />
                        </button>
                      </div>
                    </Accordion>

                    <Accordion title="Display order" icon={<span>↕️</span>}>
                      <p className="text-sm text-gray-600 pt-4">
                        Collection order relative to other content is managed in the My Studio panel. Drag service rows in the Services tab to reorder within this collection.
                      </p>
                    </Accordion>
                  </div>
                )}

                {saveState === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{saveError}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-gray-100 bg-white px-4 lg:px-6 py-3 flex items-center gap-3">
              {!isNew && (
                <button onClick={() => setShowDelete(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 border border-red-200 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-50 transition">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              )}
              <div className="flex-1" />
              <button onClick={() => handleSave(false)} disabled={saveState === 'saving'}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-50">
                Save as draft
              </button>
              <button onClick={() => handleSave(true)} disabled={saveState === 'saving'}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#F52B8C] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saveState === 'saving' ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving…</>
                  : saveState === 'saved' ? <><CheckCheck className="w-3.5 h-3.5" /> Saved!</>
                  : 'Publish'}
              </button>
            </div>
          </div>

          {/* Preview column */}
          <div className="hidden lg:flex w-72 flex-shrink-0 flex-col border-l border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white flex-shrink-0">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</span>
              <span className="text-xs text-gray-400">{publishedMemberCount} visible</span>
            </div>
            <div className="flex-1 overflow-y-auto py-5 px-3">
              {/* Collapsed state */}
              <p className="text-xs text-gray-400 mb-3 text-center">Collapsed</p>
              <ServiceCollectionCard collection={draftCollection} theme={theme} isPreview defaultOpen={false} />

              {/* Expanded state */}
              <p className="text-xs text-gray-400 mb-3 mt-4 text-center">Expanded</p>
              <ServiceCollectionCard collection={draftCollection} theme={theme} isPreview defaultOpen={true} />

              {members.length === 0 && (
                <p className="text-xs text-gray-400 text-center mt-3">Add services to see the expanded list.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showDelete && <DeleteConfirm onConfirm={handleDelete} onCancel={() => setShowDelete(false)} loading={deleting} />}
      {showPicker && (
        <ServicePicker
          services={allServices}
          memberIds={memberIds}
          onAdd={(id) => addMember(id)}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
}
