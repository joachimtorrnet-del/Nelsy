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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export function LayoutEditorial({ merchant, theme, isPreview, photos, onBook }: Props) {
  const accent = theme.defaultAccent;
  const heroPhoto = merchant.cover_url ?? photos[0]?.image_url;
  const font = theme.fontClass === 'font-serif' ? 'Playfair Display, Georgia, serif' : 'Inter, sans-serif';

  return (
    <div style={{
      minHeight: isPreview ? '100%' : '100dvh',
      backgroundColor: theme.pageBg,
      fontFamily: font,
    }}>
      {/* Hero block — full width, tall */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: isPreview ? 360 : '55vh',
        minHeight: isPreview ? 360 : 320,
        overflow: 'hidden',
      }}>
        {heroPhoto ? (
          <img src={heroPhoto} alt="" style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 25%',
            display: 'block',
          }} />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            background: `linear-gradient(170deg, #0f0f1a 0%, ${accent}cc 60%, ${accent} 100%)`,
          }} />
        )}
        {/* Dark scrim for text legibility */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
        }} />

        {/* Name + socials overlaid at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 24px 22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{
                fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em',
                color: '#fff', margin: '0 0 4px', lineHeight: 1.05,
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}>
                {merchant.salon_name}
              </h1>
              {(merchant.specialty || merchant.location) && (
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: 0, letterSpacing: '0.01em' }}>
                  {[merchant.specialty, merchant.location].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
            {/* Social pill */}
            <div style={{ display: 'flex', gap: 6 }}>
              {merchant.instagram && (
                <a href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
                  onClick={isPreview ? (e) => e.preventDefault() : undefined}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none',
                  }}>
                  <InstagramIcon />
                </a>
              )}
              {merchant.tiktok && (
                <a href={isPreview ? '#' : `https://tiktok.com/@${merchant.tiktok}`}
                  onClick={isPreview ? (e) => e.preventDefault() : undefined}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none',
                  }}>
                  <TikTokIcon />
                </a>
              )}
              {merchant.website_url && (
                <a href={isPreview ? '#' : merchant.website_url}
                  onClick={isPreview ? (e) => e.preventDefault() : undefined}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none',
                  }}>
                  <Globe size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: '20px 20px 32px', maxWidth: 600, margin: '0 auto' }}>
        {/* Bio */}
        {merchant.bio && (
          <p style={{
            fontSize: 14, color: theme.textSecondary, lineHeight: 1.65,
            marginBottom: 22,
          }}>
            {merchant.bio}
          </p>
        )}

        {/* Services header */}
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          color: theme.textSecondary, textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          Services
        </p>

        {/* Service cards — horizontal photo card style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {merchant.services.map((service, i) => (
            <div key={service.id} style={{
              display: 'flex', gap: 14,
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 16, overflow: 'hidden',
            }}>
              {/* Large thumbnail */}
              <div style={{
                width: 90, height: 90, flexShrink: 0,
                overflow: 'hidden',
              }}>
                {service.image_url ? (
                  <img src={service.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    background: `linear-gradient(135deg, ${accent}${18 + i * 8}% , ${accent}${45 + i * 8}%)`,
                    backgroundImage: `linear-gradient(135deg, ${accent}30, ${accent}70)`,
                    opacity: 0.8 + i * 0.05,
                  }}>
                    <div style={{
                      width: '100%', height: '100%',
                      background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)`,
                    }} />
                  </div>
                )}
              </div>
              {/* Text + button */}
              <div style={{ flex: 1, minWidth: 0, padding: '14px 14px 14px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, margin: '0 0 3px', lineHeight: 1.2 }}>
                    {service.name}
                  </p>
                  {service.description && (
                    <p style={{ fontSize: 12, color: theme.textSecondary, margin: '0 0 6px', lineHeight: 1.4,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {service.description}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: theme.textPrimary }}>{fmt(service.price)}</span>
                    {service.duration > 0 && <span style={{ fontSize: 12, color: theme.textSecondary, marginLeft: 6 }}>{service.duration} min</span>}
                  </div>
                  <button
                    onClick={isPreview ? undefined : () => onBook?.(service.id)}
                    disabled={isPreview}
                    style={{
                      padding: '7px 14px', borderRadius: 10,
                      backgroundColor: accent, color: theme.accentText,
                      border: 'none', fontSize: 12, fontWeight: 700,
                      cursor: isPreview ? 'default' : 'pointer',
                      letterSpacing: '0.01em',
                    }}>
                    Réserver
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 28, textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: theme.textSecondary }}>
            Powered by <strong style={{ color: accent }}>Nelsy</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
