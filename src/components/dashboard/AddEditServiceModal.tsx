import { useState, useEffect, useRef } from 'react';
import { X, Star, Loader2 } from 'lucide-react';
import { createService, updateService, uploadImage } from '../../lib/supabase-queries';
import { validatePrice, sanitizeInput } from '../../utils/validation';

interface Service {
  id?: string;
  name: string;
  description: string;
  category: string;
  duration_minutes: number;
  price_total: number;
  deposit_amount: number;
  active: boolean;
  image_url?: string;
  is_featured?: boolean;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  service?: Service | null;
  profileId: string;
}

const CATEGORIES = [
  'Nails', 'Hair', 'Makeup', 'Lashes', 'Brows', 'Skin Care', 'Massage', 'Other',
];

const DURATIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '1h', value: 60 },
  { label: '1h 15min', value: 75 },
  { label: '1h 30min', value: 90 },
  { label: '2h', value: 120 },
  { label: '2h 30min', value: 150 },
  { label: '3h', value: 180 },
  { label: '3h 30min', value: 210 },
  { label: '4h', value: 240 },
];

export default function AddEditServiceModal({ isOpen, onClose, onSuccess, service, profileId }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Nails',
    duration_minutes: 60,
    price_total: '',
    deposit_amount: '',
    active: true,
    is_featured: false,
  });

  const [imageUrl, setImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const imageFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description || '',
        category: service.category,
        duration_minutes: service.duration_minutes,
        price_total: service.price_total.toString(),
        deposit_amount: service.deposit_amount.toString(),
        active: service.active,
        is_featured: service.is_featured ?? false,
      });
      setImageUrl(service.image_url ?? '');
    } else {
      setFormData({
        name: '',
        description: '',
        category: 'Nails',
        duration_minutes: 60,
        price_total: '',
        deposit_amount: '',
        active: true,
        is_featured: false,
      });
      setImageUrl('');
    }
    setErrors({});
  }, [service, isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'services');
      setImageUrl(url);
    } catch {
      setErrors((prev) => ({ ...prev, submit: 'Failed to upload image. Please try again.' }));
    } finally {
      setUploadingImage(false);
      if (imageFileRef.current) imageFileRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    const price = parseFloat(formData.price_total);
    if (!formData.price_total || isNaN(price) || !validatePrice(price)) {
      newErrors.price_total = 'Please enter a valid price';
    }

    const deposit = parseFloat(formData.deposit_amount);
    if (formData.deposit_amount && (isNaN(deposit) || deposit < 0 || deposit > price)) {
      newErrors.deposit_amount = 'Deposit must be between 0 and total price';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const serviceData = {
        profile_id: profileId,
        name: sanitizeInput(formData.name),
        description: sanitizeInput(formData.description),
        category: formData.category,
        duration_minutes: formData.duration_minutes,
        price_total: parseFloat(formData.price_total),
        deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : 0,
        active: formData.active,
        is_featured: formData.is_featured,
        image_url: imageUrl || null,
      };

      if (service?.id) {
        const { error } = await updateService(service.id, serviceData);
        if (error) throw error;
      } else {
        const { error } = await createService(serviceData);
        if (error) throw error;
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving service:', error);
      const msg = error instanceof Error ? error.message
        : (typeof error === 'object' && error !== null && 'message' in error)
          ? String((error as { message: unknown }).message)
          : 'Failed to save service. Please try again.';
      setErrors({ submit: msg });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {service ? 'Edit Service' : 'Add Service'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Full Set Gel Nails"
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your service..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none"
            />
          </div>

          {/* Service photo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service photo (optional)</label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                {imageUrl
                  ? <img src={imageUrl} alt="service preview" className="w-full h-full object-cover" />
                  : <span className="text-2xl">💅</span>}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => imageFileRef.current?.click()}
                  disabled={uploadingImage}
                  className="flex items-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-50"
                >
                  {uploadingImage
                    ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Uploading…</>
                    : 'Upload photo'}
                </button>
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="px-3 py-2 text-gray-400 text-sm hover:text-gray-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
              <input
                ref={imageFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
            <select
              value={formData.duration_minutes}
              onChange={(e) => setFormData({ ...formData, duration_minutes: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none"
            >
              {DURATIONS.map((dur) => (
                <option key={dur.value} value={dur.value}>{dur.label}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
              <input
                type="number"
                value={formData.price_total}
                onChange={(e) => setFormData({ ...formData, price_total: e.target.value })}
                placeholder="65"
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${
                  errors.price_total ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.price_total && <p className="text-red-500 text-sm mt-1">{errors.price_total}</p>}
          </div>

          {/* Deposit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deposit (optional)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">€</span>
              <input
                type="number"
                value={formData.deposit_amount}
                onChange={(e) => setFormData({ ...formData, deposit_amount: e.target.value })}
                placeholder="0"
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent outline-none ${
                  errors.deposit_amount ? 'border-red-500' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.deposit_amount && <p className="text-red-500 text-sm mt-1">{errors.deposit_amount}</p>}
            <p className="text-xs text-gray-500 mt-1">Optional upfront payment required from clients</p>
          </div>

          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <p className="font-medium text-gray-900">Active</p>
              <p className="text-sm text-gray-500">Service visible to clients</p>
            </div>
            <button
              onClick={() => setFormData({ ...formData, active: !formData.active })}
              className={`relative w-14 h-8 rounded-full transition ${formData.active ? 'bg-green-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${formData.active ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {/* Most booked / Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
            <div>
              <p className="font-medium text-gray-900 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                Most booked
              </p>
              <p className="text-sm text-gray-500">Highlight as your featured service</p>
            </div>
            <button
              onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
              className={`relative w-14 h-8 rounded-full transition ${formData.is_featured ? 'bg-amber-500' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${formData.is_featured ? 'translate-x-6' : ''}`} />
            </button>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-800 text-sm">{errors.submit}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-[#F52B8C] text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Saving...' : service ? 'Save Changes' : 'Create Service'}
          </button>
        </div>
      </div>
    </div>
  );
}
