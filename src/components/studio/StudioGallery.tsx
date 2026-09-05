import { motion } from 'framer-motion';
import type { GalleryPhoto } from '@/lib/supabase-queries';

interface Props {
  photos: GalleryPhoto[];
  textSecondary?: string;
}

export function StudioGallery({ photos, textSecondary = '#9CA3AF' }: Props) {
  if (photos.length === 0) return null;

  return (
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

      {/* Near-edge-to-edge 2-col grid with portrait crops */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
        }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            style={{
              aspectRatio: '3 / 4',
              borderRadius: 14,
              overflow: 'hidden',
              backgroundColor: '#f0ece8',
            }}
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
