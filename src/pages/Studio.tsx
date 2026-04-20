import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { useStudio } from '@/hooks/useStudio';
import { useBookingStore } from '@/store/bookingStore';
import { BookingModal } from '@/components/studio/BookingModal';
import { StudioHero } from '@/components/studio/StudioHero';
import { StudioServiceList } from '@/components/studio/StudioServiceList';
import { StudioGallery } from '@/components/studio/StudioGallery';
import { StudioTestimonials } from '@/components/studio/StudioTestimonials';
import { StudioHours } from '@/components/studio/StudioHours';
import type { Service } from '@/types';
import {
  recordPageView,
  getGalleryPhotos,
  getApprovedTestimonials,
  getBusinessHours,
} from '@/lib/supabase-queries';
import type { GalleryPhoto, Testimonial, BusinessHour } from '@/lib/supabase-queries';

// ── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="animate-pulse px-4">
      <div className="flex flex-col items-center pt-8 pb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 mb-4" />
        <div className="h-8 bg-gray-200 rounded-xl w-44 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-64 mb-1" />
        <div className="h-4 bg-gray-200 rounded w-48" />
      </div>
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-32" />
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Studio() {
  const { slug } = useParams<{ slug: string }>();
  const openModal = useBookingStore((s) => s.openModal);
  const { merchant, loading } = useStudio(slug ?? '');

  const trackedRef = useRef(false);
  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [hours, setHours] = useState<BusinessHour[]>([]);

  // Track visit once per session
  useEffect(() => {
    if (!merchant?.id || trackedRef.current) return;
    const sessionKey = `pv_${merchant.id}`;
    if (sessionStorage.getItem(sessionKey)) return;
    trackedRef.current = true;
    sessionStorage.setItem(sessionKey, '1');
    void recordPageView(merchant.id);
  }, [merchant?.id]);

  // SEO title
  useEffect(() => {
    if (merchant) document.title = `${merchant.salon_name} — Réserver sur Nelsy`;
    return () => { document.title = 'Nelsy'; };
  }, [merchant?.salon_name]);

  // Fetch supplementary data
  useEffect(() => {
    if (!merchant?.id) return;
    const id = merchant.id;
    void getGalleryPhotos(id).then(setGallery);
    void getApprovedTestimonials(id).then(setTestimonials);
    void getBusinessHours(id).then(setHours);
  }, [merchant?.id]);

  const handleBook = (service?: Service) => {
    if (service) { openModal(service); return; }
    if (merchant && merchant.services.length === 1) {
      openModal(merchant.services[0]);
    } else {
      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: merchant?.salon_name, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  const accent = merchant?.color_accent ?? '#F52B8C';

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal sticky header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: accent }}
            >
              <span className="text-white font-bold text-[10px]">N</span>
            </div>
            <span className="font-bold text-gray-900 text-sm">Nelsy</span>
          </Link>
          {merchant && (
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-gray-100"
            >
              <Share2 className="w-3.5 h-3.5" />
              Partager
            </button>
          )}
        </div>
      </header>

      <div className="max-w-lg mx-auto pb-20">
        {loading ? (
          <Skeleton />
        ) : !merchant ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="text-5xl mb-4">💅</div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Studio introuvable</h1>
            <p className="text-gray-400 text-sm mb-6">Ce studio n'existe pas encore sur Nelsy.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
              style={{ background: accent }}
            >
              Créer le mien →
            </Link>
          </div>
        ) : (
          <>
            <StudioHero merchant={merchant} />

            <StudioServiceList
              services={merchant.services}
              accentColor={accent}
              onBook={handleBook}
            />

            <div className="px-4">
              <StudioGallery photos={gallery} />
              <StudioTestimonials testimonials={testimonials} accentColor={accent} />
              <StudioHours hours={hours} accentColor={accent} />
            </div>

            {/* Footer */}
            <div className="text-center mt-10 pb-4">
              <Link
                to="/"
                className="text-xs text-gray-300 hover:text-gray-400 transition-colors"
              >
                Propulsé par <span className="font-bold" style={{ color: accent }}>Nelsy</span>
              </Link>
            </div>
          </>
        )}
      </div>

      {merchant && <BookingModal merchant={merchant} />}
    </div>
  );
}
