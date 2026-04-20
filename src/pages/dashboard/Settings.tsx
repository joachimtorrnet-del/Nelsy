import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, ChevronDown, LogOut, Edit2, Clock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { updateProfile } from '../../lib/supabase-queries';
import ImageUpload from '../../components/dashboard/ImageUpload';
import EditProfileModal from '../../components/dashboard/EditProfileModal';
import ChangePasswordModal from '../../components/dashboard/ChangePasswordModal';
import Toast from '../../components/dashboard/Toast';
import AvailabilitySection from '../../components/dashboard/AvailabilitySection';
import { useToast } from '../../hooks/useToast';

export interface SettingsProfile {
  id?: string;
  full_name?: string;
  slug?: string;
  logo_url?: string;
  [key: string]: unknown;
}

export default function Settings({ profile: profileProp }: { profile?: SettingsProfile | null }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<SettingsProfile | null>(profileProp ?? null);
  const [saving, setSaving] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('notifications');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { toast, showSuccess, showError, showInfo, hideToast } = useToast();

  const [notifications, setNotifications] = useState({
    purchase_confirmations: true,
    new_bookings: true,
    reminders: false,
  });
  const [loadingPortal, setLoadingPortal] = useState(false);

  // Sync from parent prop, or load independently if not provided
  useEffect(() => {
    if (profileProp) {
      setProfile(profileProp);
      if (profileProp.notification_preferences) {
        setNotifications(profileProp.notification_preferences as typeof notifications);
      }
    } else {
      void loadProfile();
    }
  }, [profileProp]);

  const loadProfile = async () => {
    if (!supabase) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) setProfile(data as SettingsProfile);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (type === 'error') showError(message);
    else if (type === 'info') showInfo(message);
    else showSuccess(message);
  };

  const handleAvatarUploaded = async (url: string) => {
    if (!profile?.id) return;
    setSaving(true);
    try {
      await updateProfile(profile.id as string, { logo_url: url });
      setProfile({ ...profile, logo_url: url });
      showToast('Avatar updated!');
    } catch { showToast('Failed to update avatar', 'error'); }
    finally { setSaving(false); }
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/login');
  };

  const toggleSection = (name: string) => {
    setOpenSection(openSection === name ? null : name);
  };

  const toggleNotification = async (key: keyof typeof notifications) => {
    if (!profile?.id) return;
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    try {
      await updateProfile(profile.id as string, { notification_preferences: updated });
    } catch {
      setNotifications(notifications); // rollback on failure
      showToast('Failed to save notification preference', 'error');
    }
  };

  const handleSubscription = async () => {
    if (!supabase || !profile?.id) return;
    setLoadingPortal(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-billing-portal', {
        body: { return_url: window.location.origin + '/dashboard' },
      });
      if (error || !data?.url) throw new Error(error?.message ?? 'No URL returned');
      window.location.href = data.url as string;
    } catch {
      showToast('Could not open subscription portal. Try again later.', 'error');
    } finally {
      setLoadingPortal(false);
    }
  };

  const accountItems = [
    { label: 'Edit Profile Details', desc: 'Update name, email, address', action: () => setShowEditProfile(true) },
    { label: 'Change Password', desc: 'Update your password', action: () => setShowChangePassword(true) },
    { label: 'Subscription', desc: loadingPortal ? 'Opening portal…' : (profile?.subscription_status as string || 'Trial plan'), action: () => void handleSubscription() },
    { label: 'Payment Methods', desc: 'Setup Stripe payouts', action: () => navigate('/onboarding-stripe') },
  ];

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#F52B8C] border-t-transparent" />
      </div>
    );
  }

  const initials = (profile.full_name as string || 'N').charAt(0).toUpperCase();

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="px-4 pt-5 space-y-5">

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

        {/* Profile Card */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
              {profile.logo_url
                ? <img src={profile.logo_url as string} alt="avatar" className="w-full h-full object-cover" />
                : <span className="text-gray-600 font-bold text-xl">{initials}</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-gray-900">{profile.full_name as string}</p>
              <p className="text-gray-400 text-sm">{profile.email as string}</p>
              <p className="text-[#F52B8C] text-xs mt-0.5">nelsy.app/{profile.slug as string}</p>
            </div>
            <button
              onClick={() => setShowEditProfile(true)}
              className="p-2 text-gray-400 hover:text-gray-600 transition flex-shrink-0"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* Avatar Upload */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-400 mb-3">Profile Photo</p>
            <ImageUpload
              currentImageUrl={profile.logo_url as string | null}
              onImageUploaded={handleAvatarUploaded}
              userId={profile.id as string}
              folder="avatars"
              maxSizeMB={5}
            />
            {saving && <p className="text-xs text-gray-400 text-center mt-2">Saving...</p>}
          </div>
        </div>

        {/* Availability Settings Accordion */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('availability')}
            className="w-full px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-900">My Hours</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSection === 'availability' ? 'rotate-180' : ''}`} />
          </button>

          {openSection === 'availability' && profile?.id && (
            <div className="px-5 pb-5 border-t border-gray-200 pt-4">
              <AvailabilitySection profileId={profile.id as string} />
            </div>
          )}
        </div>

        {/* Notification Settings Accordion */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('notifications')}
            className="w-full px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <Bell className="w-4 h-4 text-gray-600" />
              </div>
              <span className="font-semibold text-gray-900">Notification Settings</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSection === 'notifications' ? 'rotate-180' : ''}`} />
          </button>

          {openSection === 'notifications' && (
            <div className="px-5 pb-4 border-t border-gray-200 pt-4 space-y-4">
              {[
                { key: 'purchase_confirmations', label: 'New Bookings', desc: 'Receive a notification each time a client books' },
                { key: 'new_bookings', label: 'Booking Confirmations', desc: 'Notify when a client confirms their appointment' },
                { key: 'reminders', label: 'Appointment Reminders', desc: 'Get reminded 1h before each appointment' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                  <button
                    onClick={() => void toggleNotification(key as keyof typeof notifications)}
                    className={`relative w-12 h-7 rounded-full transition-colors flex-shrink-0 mt-0.5 ${
                      notifications[key as keyof typeof notifications] ? 'bg-[#F52B8C]' : 'bg-gray-200'
                    }`}
                  >
                    <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${
                      notifications[key as keyof typeof notifications] ? 'left-6' : 'left-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Settings Accordion */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('account')}
            className="w-full px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm">⚙️</span>
              </div>
              <span className="font-semibold text-gray-900">Account Settings</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSection === 'account' ? 'rotate-180' : ''}`} />
          </button>

          {openSection === 'account' && (
            <div className="border-t border-gray-200">
              {accountItems.map((item, i) => (
                <button
                  key={i}
                  onClick={item.action}
                  className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-gray-100 transition border-b border-gray-100 last:border-0"
                >
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pricing & Fees */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('pricing')}
            className="w-full px-5 py-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-sm">💎</span>
              </div>
              <span className="font-semibold text-gray-900">Pricing & Fees</span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openSection === 'pricing' ? 'rotate-180' : ''}`} />
          </button>

          {openSection === 'pricing' && (
            <div className="px-5 pb-5 border-t border-gray-200 pt-4 space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-900 mb-2">Comment ça fonctionne</p>
                <ul className="text-sm text-green-800 space-y-1.5">
                  <li>✅ Vos clientes paient le prix exact de votre prestation</li>
                  <li>✅ Vous recevez 100% moins les frais de paiement (~2.9%)</li>
                  <li>✅ <strong>Zéro commission Nelsy sur vos réservations</strong></li>
                  <li>✅ Juste un abonnement mensuel pour tout illimité</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">Exemple concret :</p>
                <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Votre cliente paie</span>
                    <span className="font-semibold text-gray-900">€65.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frais Stripe (~2.9% + 0.25€)</span>
                    <span className="text-red-500 font-medium">−€2.14</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Commission Nelsy</span>
                    <span className="text-green-600 font-semibold">€0.00 ✨</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-bold text-gray-900">Vous recevez</span>
                    <span className="font-bold text-[#F52B8C]">€62.86</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400">
                Les frais de paiement (~2.9% + 0.25€) vont à Stripe, le standard de l'industrie pour les paiements sécurisés. Nelsy prend 0% de commission — uniquement l'abonnement mensuel.
              </p>
            </div>
          )}
        </div>

        {/* Legal */}
        <div className="bg-gray-50 rounded-2xl overflow-hidden">
          <a href="/terms" target="_blank" className="flex items-center justify-between px-5 py-4 border-b border-gray-200 hover:bg-gray-100 transition">
            <span className="text-sm font-semibold text-gray-900">Terms of Service</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </a>
          <a href="/privacy" target="_blank" className="flex items-center justify-between px-5 py-4 hover:bg-gray-100 transition">
            <span className="text-sm font-semibold text-gray-900">Privacy Policy</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </a>
        </div>

        {/* Log Out */}
        <button
          onClick={handleLogout}
          className="w-full py-4 border-2 border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-700 font-semibold hover:bg-gray-50 transition"
        >
          <LogOut className="w-5 h-5" />
          Log out
        </button>

        <p className="text-center text-xs text-gray-300 pb-2">Nelsy v1.0.0</p>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        onSuccess={() => { loadProfile(); showToast('Profile updated!'); }}
        profile={profile}
      />

      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
        onSuccess={() => showToast('Password changed!')}
      />

      {toast && <Toast type={toast.type} message={toast.message} onClose={hideToast} />}
    </div>
  );
}
