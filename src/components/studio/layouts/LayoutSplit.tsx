import { Globe } from 'lucide-react';
import type { Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

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
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export function LayoutSplit({ merchant, theme, isPreview, photos, onBook }: Props) {
  const accent = theme.defaultAccent;
  const font = theme.fontClass === 'font-serif' ? 'Playfair Display, Georgia, serif' : 'Inter, sans-serif';

  // Portrait photo: logo (headshot), then cover, then first gallery photo
  const portraitUrl = merchant.logo_url ?? merchant.cover_url ?? photos[0]?.image_url;

  // Service thumbnail: gallery photos after portrait
  const serviceThumbs = photos.filter((p) => p.image_url !== portraitUrl);

  const services = merchant.services;

  return (
    <div style={{
      minHeight: isPreview ? '100%' : '100dvh',
      backgroundColor: theme.pageBg,
      fontFamily: font,
    }}>

      {/* ── PROFILE HEADER — split only within this block ── */}
      <div style={{
        display: 'flex',
        width: '100%',
        height: 220,
        overflow: 'hidden',
        borderRadius: isPreview ? 0 : 0,
      }}>
        {/* LEFT: portrait photo ~45% */}
        <div style={{
          width: '45%',
          flexShrink: 0,
          overflow: 'hidden',
          position: 'relative',
        }}>
          {portraitUrl ? (
            <img
              src={portraitUrl}
              alt=""
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
                display: 'block',
              }}
            />
          ) : (
            // Placeholder when no photo — accent gradient
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(160deg, ${accent}40 0%, ${accent}99 100%)`,
            }} />
          )}
        </div>

        {/* RIGHT: colored text panel */}
        <div style={{
          flex: 1,
          backgroundColor: accent,
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}>
          {/* Top: name + specialty */}
          <div>
            <h1 style={{
              fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em',
              color: theme.accentText, margin: '0 0 5px', lineHeight: 1.15,
            }}>
              {merchant.salon_name}
            </h1>
            {(merchant.specialty || merchant.location) && (
              <p style={{
                fontSize: 12, color: `${theme.accentText}cc`,
                margin: 0, lineHeight: 1.4,
              }}>
                {[merchant.specialty, merchant.location].filter(Boolean).join(' · ')}
              </p>
            )}
            {merchant.bio && (
              <p style={{
                fontSize: 12, color: `${theme.accentText}bb`,
                margin: '8px 0 0', lineHeight: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {merchant.bio}
              </p>
            )}
          </div>

          {/* Bottom: social icons */}
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {merchant.instagram && (
              <a
                href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
                onClick={isPreview ? (e) => e.preventDefault() : undefined}
                style={{
                  width: 30, height: 30, borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.accentText, textDecoration: 'none', flexShrink: 0,
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
                  width: 30, height: 30, borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.accentText, textDecoration: 'none', flexShrink: 0,
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
                  width: 30, height: 30, borderRadius: '50%',
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.accentText, textDecoration: 'none', flexShrink: 0,
                }}
              >
                <Globe size={14} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── SERVICES — all full width ── */}
      <div style={{ padding: '16px 16px 32px' }}>
        {services.map((service, idx) => {
          const thumb = service.image_url ?? serviceThumbs[idx]?.image_url;
          const isFeatured = service.is_featured ?? idx === 1;

          if (isFeatured) {
            // Featured card: large image left, text right
            return (
              <div key={service.id} style={{
                display: 'flex',
                backgroundColor: theme.cardBg,
                border: `1px solid ${theme.cardBorder}`,
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 12,
              }}>
                {/* Large image */}
                <div style={{ width: 120, flexShrink: 0, minHeight: 120, position: 'relative' }}>
                  {thumb ? (
                    <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', minHeight: 120, background: `linear-gradient(135deg, ${accent}25, ${accent}55)` }} />
                  )}
                </div>
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0, padding: '14px 14px' }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, margin: '0 0 5px', lineHeight: 1.2 }}>
                    {service.name}
                  </p>
                  {service.description && (
                    <p style={{
                      fontSize: 12, color: theme.textSecondary, margin: '0 0 10px', lineHeight: 1.45,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {service.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div>
                      <span style={{ fontSize: 15, fontWeight: 800, color: accent }}>{fmt(service.price)}</span>
                      {service.duration > 0 && <span style={{ fontSize: 12, color: theme.textSecondary, marginLeft: 6 }}>{service.duration} min</span>}
                    </div>
                    <button
                      onClick={isPreview ? undefined : () => onBook?.(service.id)}
                      disabled={isPreview}
                      style={{
                        padding: '8px 14px', borderRadius: 10,
                        backgroundColor: accent, color: theme.accentText,
                        border: 'none', fontSize: 12, fontWeight: 700,
                        cursor: isPreview ? 'default' : 'pointer', whiteSpace: 'nowrap',
                      }}
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          // Compact card
          return (
            <div key={service.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 14, padding: '12px 14px',
              marginBottom: 10,
            }}>
              {/* Thumbnail */}
              <div style={{
                width: 56, height: 56, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
              }}>
                {thumb ? (
                  <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${accent}20, ${accent}45)` }} />
                )}
              </div>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, margin: 0 }}>
                  {service.name}
                </p>
                <p style={{ fontSize: 13, margin: '3px 0 0' }}>
                  <span style={{ color: accent, fontWeight: 700 }}>{fmt(service.price)}</span>
                  {service.duration > 0 && <span style={{ color: theme.textSecondary, marginLeft: 8 }}>{service.duration} min</span>}
                </p>
              </div>
              <button
                onClick={isPreview ? undefined : () => onBook?.(service.id)}
                disabled={isPreview}
                style={{
                  flexShrink: 0, padding: '8px 13px', borderRadius: 10,
                  backgroundColor: theme.cardBg,
                  border: `1.5px solid ${accent}`,
                  color: accent, fontSize: 12, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer',
                }}
              >
                Book
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingBottom: 28 }}>
        <span style={{ fontSize: 11, color: theme.textSecondary }}>
          Powered by <strong style={{ color: accent }}>Nelsy</strong>
        </span>
      </div>
    </div>
  );
}
