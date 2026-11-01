import { ArrowRight, Globe } from 'lucide-react';
import type { Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { ServiceCollectionCard } from '../ServiceCollectionCard';

interface GalleryPhoto { image_url: string; }

interface Props {
  merchant: Merchant;
  theme: NelsyTheme;
  isPreview: boolean;
  photos: GalleryPhoto[];
  onBook?: (serviceId: string) => void;
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z"/>
    </svg>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

// ── Card components ────────────────────────────────────────────────────────────

interface CardProps {
  service: Merchant['services'][0];
  thumb: string | undefined;
  accent: string;
  accentText: string;
  isPreview: boolean;
  onBook?: (id: string) => void;
  isFirst?: boolean;
}

function OverlapCard({ service, thumb, accent, accentText, isPreview, onBook, isFirst }: CardProps) {
  return (
    <div style={{
      margin: '0 16px',
      marginTop: isFirst ? -36 : 10,
      borderRadius: 16,
      backgroundColor: '#FDF8F3',
      boxShadow: '0 6px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Thumbnail + text row */}
      <div style={{ display: 'flex', gap: 12, padding: '16px 16px 12px' }}>
        <div style={{
          width: 72, height: 72, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
          backgroundColor: '#E8E0D8',
        }}>
          {thumb ? (
            <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${accent}30, ${accent}60)` }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', margin: '0 0 4px', lineHeight: 1.2 }}>
            {service.name}
          </p>
          {service.description && (
            <p style={{
              fontSize: 13, color: '#6B6560', margin: 0, lineHeight: 1.5,
              display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {service.description}
            </p>
          )}
        </div>
      </div>

      {/* Price row */}
      {service.price > 0 && (
        <div style={{ padding: '0 16px 12px' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>{fmt(service.price)}</span>
          {service.duration > 0 && (
            <span style={{ fontSize: 13, color: '#9B928A', marginLeft: 8 }}>{service.duration} min</span>
          )}
        </div>
      )}

      {/* Full-width CTA */}
      <div style={{ padding: '0 16px 16px' }}>
        <button
          onClick={isPreview ? undefined : () => onBook?.(service.id)}
          disabled={isPreview}
          style={{
            width: '100%', height: 48, borderRadius: 10,
            backgroundColor: accent, color: accentText,
            border: 'none', fontSize: 15, fontWeight: 600,
            cursor: isPreview ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Book now <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function ImageLedCard({ service, thumb, accent, accentText, isPreview, onBook }: CardProps) {
  return (
    <div style={{
      margin: '10px 16px 0',
      borderRadius: 16,
      backgroundColor: '#FDF8F3',
      boxShadow: '0 4px 20px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
    }}>
      {/* Full-width photo */}
      {thumb ? (
        <div style={{ width: '100%', height: 190, overflow: 'hidden' }}>
          <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div style={{ width: '100%', height: 190, background: `linear-gradient(160deg, ${accent}25, ${accent}55)` }} />
      )}
      {/* Content */}
      <div style={{ padding: '16px 16px 0' }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', margin: '0 0 4px', lineHeight: 1.2 }}>
          {service.name}
        </p>
        {service.description && (
          <p style={{ fontSize: 13, color: '#6B6560', margin: '0 0 8px', lineHeight: 1.5 }}>
            {service.description}
          </p>
        )}
        {service.price > 0 && (
          <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', margin: 0 }}>
            {fmt(service.price)}
            {service.duration > 0 && (
              <span style={{ fontSize: 13, fontWeight: 400, color: '#9B928A', marginLeft: 8 }}>{service.duration} min</span>
            )}
          </p>
        )}
      </div>
      <div style={{ padding: '12px 16px 16px' }}>
        <button
          onClick={isPreview ? undefined : () => onBook?.(service.id)}
          disabled={isPreview}
          style={{
            width: '100%', height: 48, borderRadius: 10,
            backgroundColor: accent, color: accentText,
            border: 'none', fontSize: 15, fontWeight: 600,
            cursor: isPreview ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          Book now <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function LayoutEditorial({ merchant, theme, isPreview, photos, onBook }: Props) {
  const accent = theme.defaultAccent;
  const accentText = theme.accentText;

  // Hero: prefer cover photo, then portrait, then first gallery photo
  const heroUrl = merchant.cover_url ?? merchant.logo_url ?? photos[0]?.image_url;

  // Service thumbnail source: first use service.image_url, then gallery photos
  const galleryThumbs = photos.filter((p) => p.image_url !== heroUrl);

  const services = merchant.services;

  const hasSocials = !!(merchant.instagram || merchant.tiktok || merchant.website_url);

  const heroHeight = 300;

  return (
    <div style={{
      minHeight: isPreview ? '100%' : '100dvh',
      backgroundColor: '#F7F4F0',
      fontFamily: 'Inter, sans-serif',
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* ── Hero block: guttered, rounded top corners ── */}
      <div style={{
        margin: '0 8px',
        borderRadius: '20px 20px 0 0',
        overflow: 'hidden',
        height: heroHeight,
        position: 'relative',
      }}>
        {/* Photo */}
        {heroUrl ? (
          <img
            src={heroUrl}
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 20%',
              display: 'block',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(170deg, #1a1a1a 0%, ${accent}cc 70%, ${accent} 100%)`,
          }} />
        )}

        {/* Gradient overlay: dark at top for name, dark at bottom for bleed */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.08) 45%, rgba(0,0,0,0.30) 100%)',
        }} />

        {/* Name + socials at top */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          padding: '28px 20px 0',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: 30, fontWeight: 800,
            fontFamily: 'Playfair Display, Georgia, serif',
            letterSpacing: '-0.01em',
            color: '#FFFFFF',
            margin: '0 0 14px',
            lineHeight: 1.1,
            textShadow: '0 1px 6px rgba(0,0,0,0.3)',
          }}>
            {merchant.salon_name}
          </h1>

          {/* Social icons */}
          {hasSocials && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
              {merchant.instagram && (
                <a
                  href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
                  onClick={isPreview ? (e) => e.preventDefault() : undefined}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.42)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FFFFFF', textDecoration: 'none', flexShrink: 0,
                  }}
                >
                  <InstagramIcon />
                </a>
              )}
              {merchant.tiktok && (
                <a
                  href={isPreview ? '#' : `https://tiktok.com/@${merchant.tiktok}`}
                  onClick={isPreview ? (e) => e.preventDefault() : undefined}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.42)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FFFFFF', textDecoration: 'none', flexShrink: 0,
                  }}
                >
                  <TikTokIcon />
                </a>
              )}
              {merchant.website_url && (
                <a
                  href={isPreview ? '#' : merchant.website_url}
                  onClick={isPreview ? (e) => e.preventDefault() : undefined}
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    backgroundColor: 'rgba(0,0,0,0.42)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#FFFFFF', textDecoration: 'none', flexShrink: 0,
                  }}
                >
                  <Globe size={15} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Service cards ─────────────────────────────────────────────────── */}
      {services.map((service, idx) => {
        const thumb = service.image_url ?? galleryThumbs[idx]?.image_url;
        const isFeatured = !!service.is_featured;

        if (isFeatured) {
          return (
            <ImageLedCard
              key={service.id}
              service={service}
              thumb={thumb}
              accent={accent}
              accentText={accentText}
              isPreview={isPreview}
              onBook={onBook}
            />
          );
        }

        return (
          <OverlapCard
            key={service.id}
            service={service}
            thumb={thumb}
            accent={accent}
            accentText={accentText}
            isPreview={isPreview}
            onBook={onBook}
            isFirst={idx === 0}
          />
        );
      })}

      {/* Service collections */}
      {(merchant.collections ?? []).filter((c) => c.active && c.members.length > 0).map((col) => (
        <div key={col.id} style={{ padding: '0 16px 0' }}>
          <ServiceCollectionCard collection={col} theme={theme} isPreview={isPreview} onBook={onBook} />
        </div>
      ))}

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '28px 0 32px' }}>
        <span style={{ fontSize: 11, color: '#B5ADA8' }}>
          Powered by <strong style={{ color: accent }}>Nelsy</strong>
        </span>
      </div>
    </div>
  );
}
