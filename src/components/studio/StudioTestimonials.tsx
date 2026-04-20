import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/supabase-queries';

interface Props {
  testimonials: Testimonial[];
  accentColor?: string;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 mb-2">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export function StudioTestimonials({ testimonials, accentColor = '#F52B8C' }: Props) {
  if (testimonials.length === 0) return null;

  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <section className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Avis clients</h2>
        <div className="flex items-center gap-1.5">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-gray-900">{avgRating.toFixed(1)}</span>
          <span className="text-xs text-gray-400">({testimonials.length})</span>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className="flex-shrink-0 w-72 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm snap-start"
          >
            <StarRow rating={t.rating} />
            <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-4">
              "{t.text}"
            </p>
            <div className="flex items-center gap-2">
              {t.client_avatar ? (
                <img
                  src={t.client_avatar}
                  alt={t.client_name}
                  className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: accentColor }}
                >
                  {t.client_name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-xs font-semibold text-gray-900 truncate">{t.client_name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
