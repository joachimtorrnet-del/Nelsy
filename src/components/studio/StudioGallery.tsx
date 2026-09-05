import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryPhoto } from '@/lib/supabase-queries';

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxProps {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < photos.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        backgroundColor: 'rgba(0,0,0,0.96)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute', top: 16, right: 16,
          width: 40, height: 40, borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.12)',
          border: 'none', color: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 1,
        }}
      >
        <X size={18} />
      </button>

      {/* Counter */}
      {photos.length > 1 && (
        <div
          style={{
            position: 'absolute', top: 22, left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 12, color: 'rgba(255,255,255,0.5)',
            fontWeight: 500, letterSpacing: '0.05em',
          }}
        >
          {index + 1} / {photos.length}
        </div>
      )}

      {/* Image */}
      <motion.img
        key={photo.id}
        src={photo.image_url}
        alt={photo.caption ?? 'Nail art'}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100vw', maxHeight: '90dvh',
          objectFit: 'contain', borderRadius: 8,
        }}
      />

      {/* Caption */}
      {photo.caption && (
        <div
          style={{
            position: 'absolute', bottom: 24, left: 0, right: 0,
            textAlign: 'center', color: 'rgba(255,255,255,0.55)',
            fontSize: 13, padding: '0 48px',
          }}
        >
          {photo.caption}
        </div>
      )}

      {/* Prev / Next */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          style={{
            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.12)',
            border: 'none', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 44, height: 44, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.12)',
            border: 'none', color: '#FFFFFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ChevronRight size={22} />
        </button>
      )}
    </motion.div>
  );
}

// ── Gallery ───────────────────────────────────────────────────────────────────

interface Props {
  photos: GalleryPhoto[];
  textSecondary?: string;
}

export function StudioGallery({ photos, textSecondary = '#9CA3AF' }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIdx(i), []);
  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevPhoto = useCallback(() =>
    setLightboxIdx((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const nextPhoto = useCallback(() =>
    setLightboxIdx((i) => (i !== null && i < photos.length - 1 ? i + 1 : i)), [photos.length]);

  if (photos.length === 0) return null;

  return (
    <>
      <section style={{ marginBottom: 28 }}>
        <p
          style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
            color: textSecondary, marginBottom: 10,
            textTransform: 'uppercase',
          }}
        >
          My work
        </p>

        {/* 2-col portrait grid — tappable */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 4,
          }}
        >
          {photos.map((photo, i) => (
            <motion.button
              key={photo.id}
              onClick={() => openLightbox(i)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                aspectRatio: '3 / 4',
                borderRadius: 14,
                overflow: 'hidden',
                backgroundColor: '#f0ece8',
                padding: 0, border: 'none',
                cursor: 'pointer', display: 'block',
              }}
              aria-label={photo.caption ?? `Nail art photo ${i + 1}`}
            >
              <img
                src={photo.image_url}
                alt={photo.caption ?? 'Nail art'}
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  display: 'block',
                }}
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Lightbox portal */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIdx}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </>
  );
}
