import { motion } from 'framer-motion';
import type { GalleryPhoto } from '@/lib/supabase-queries';

interface Props {
  photos: GalleryPhoto[];
  textPrimary?: string;
}

export function StudioGallery({ photos, textPrimary = '#111827' }: Props) {
  if (photos.length === 0) return null;

  return (
    <section className="mb-5">
      <h2 className="text-sm font-bold mb-3 uppercase tracking-wide" style={{ fontSize: 11, letterSpacing: '1px', color: textPrimary, opacity: 0.55 }}>
        Mes réalisations
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className="aspect-square rounded-2xl overflow-hidden bg-gray-100"
          >
            <img
              src={photo.image_url}
              alt={photo.caption ?? 'Photo du studio'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
