import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/lib/supabase-queries';

interface Props {
  testimonials: Testimonial[];
  accentColor?: string;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={13}
          style={{ color: s <= rating ? '#FBBF24' : '#E5E7EB', fill: s <= rating ? '#FBBF24' : '#E5E7EB' }}
        />
      ))}
    </div>
  );
}

export function StudioTestimonials({ testimonials, accentColor = '#F52B8C' }: Props) {
  if (testimonials.length === 0) return null;

  const shown = testimonials.slice(0, 4);

  return (
    <section style={{ padding: '0 16px', marginBottom: 28 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <p style={{
          fontSize: 17, fontWeight: 800, color: '#1A1A1A',
          letterSpacing: '-0.02em', margin: 0,
        }}>
          Loved by my clients
        </p>
        {testimonials.length > 4 && (
          <span style={{ fontSize: 12, fontWeight: 600, color: accentColor }}>
            See all →
          </span>
        )}
      </div>

      {/* 2-column grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {shown.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.25 }}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              padding: '12px 12px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column',
            }}
          >
            <StarRow rating={t.rating} />
            <p style={{
              fontSize: 12, color: '#374151', lineHeight: 1.45,
              margin: '0 0 10px', flex: 1,
              overflow: 'hidden', display: '-webkit-box',
              WebkitLineClamp: 4, WebkitBoxOrient: 'vertical',
            }}>
              "{t.text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {t.client_avatar ? (
                <img
                  src={t.client_avatar}
                  alt={t.client_name}
                  style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <div style={{
                  width: 22, height: 22, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: accentColor, color: '#FFFFFF',
                  fontSize: 10, fontWeight: 700, flexShrink: 0,
                }}>
                  {t.client_name.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{
                fontSize: 12, fontWeight: 600, color: '#111827',
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
              }}>
                {t.client_name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
