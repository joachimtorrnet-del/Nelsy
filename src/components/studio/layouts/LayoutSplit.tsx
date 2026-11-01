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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export function LayoutSplit({ merchant, theme, isPreview, photos, onBook }: Props) {
  const accent = theme.defaultAccent;
  const heroPhoto = merchant.cover_url ?? photos[0]?.image_url;
  const initials = merchant.salon_name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
  const hasSocials = !!(merchant.instagram || merchant.tiktok);

  return (
    <div style={{
      display: 'flex',
      minHeight: isPreview ? '100%' : '100dvh',
      backgroundColor: theme.pageBg,
      fontFamily: theme.fontClass === 'font-serif' ? 'Playfair Display, Georgia, serif' : 'Inter, sans-serif',
    }}>
      {/* Left: portrait panel */}
      <div style={{
        width: '42%',
        flexShrink: 0,
        position: isPreview ? 'relative' : 'sticky',
        top: 0,
        height: isPreview ? 'auto' : '100dvh',
        minHeight: isPreview ? '100%' : undefined,
        overflow: 'hidden',
      }}>
        {heroPhoto ? (
          <img src={heroPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%', minHeight: 400,
            background: `linear-gradient(160deg, ${accent}60 0%, ${accent} 100%)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 56, fontWeight: 900, color: '#fff', opacity: 0.7, letterSpacing: -2 }}>
              {initials}
            </span>
          </div>
        )}
        {/* Subtle overlay on photo */}
        {heroPhoto && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.15) 100%)',
          }} />
        )}
      </div>

      {/* Right: scrollable content */}
      <div style={{
        flex: 1, minWidth: 0,
        overflowY: isPreview ? 'hidden' : 'auto',
        padding: '36px 24px 32px',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Name */}
        <h1 style={{
          fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em',
          color: theme.textPrimary, margin: '0 0 6px',
          lineHeight: 1.1,
        }}>
          {merchant.salon_name}
        </h1>

        {/* Handle / specialty */}
        {(merchant.specialty || merchant.location) && (
          <p style={{ fontSize: 13, color: theme.textSecondary, marginBottom: 8, lineHeight: 1.4 }}>
            {[merchant.specialty, merchant.location].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Bio */}
        {merchant.bio && (
          <p style={{
            fontSize: 13, color: theme.textSecondary, lineHeight: 1.6,
            marginBottom: 16, maxWidth: 260,
          }}>
            {merchant.bio}
          </p>
        )}

        {/* Social icons */}
        {hasSocials && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {merchant.instagram && (
              <a href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
                onClick={isPreview ? (e) => e.preventDefault() : undefined}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.textPrimary, textDecoration: 'none', flexShrink: 0,
                }}>
                <InstagramIcon />
              </a>
            )}
            {merchant.tiktok && (
              <a href={isPreview ? '#' : `https://tiktok.com/@${merchant.tiktok}`}
                onClick={isPreview ? (e) => e.preventDefault() : undefined}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.textPrimary, textDecoration: 'none', flexShrink: 0,
                }}>
                <TikTokIcon />
              </a>
            )}
            {merchant.website_url && (
              <a href={isPreview ? '#' : merchant.website_url}
                onClick={isPreview ? (e) => e.preventDefault() : undefined}
                style={{
                  width: 34, height: 34, borderRadius: '50%',
                  backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: theme.textPrimary, textDecoration: 'none', flexShrink: 0,
                }}>
                <Globe size={15} />
              </a>
            )}
          </div>
        )}

        {/* Divider */}
        <div style={{ height: 1, backgroundColor: theme.cardBorder, marginBottom: 20 }} />

        {/* Service list */}
        <div style={{ flex: 1 }}>
          {merchant.services.map((service) => (
            <div key={service.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 14, padding: '12px 14px',
              marginBottom: 10,
            }}>
              {/* Thumbnail */}
              <div style={{
                width: 52, height: 52, borderRadius: 10, flexShrink: 0,
                overflow: 'hidden', backgroundColor: `${accent}15`,
              }}>
                {service.image_url ? (
                  <img src={service.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${accent}20, ${accent}40)` }} />
                )}
              </div>
              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: theme.textPrimary, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {service.name}
                </p>
                <p style={{ fontSize: 13, color: accent, fontWeight: 700, margin: '2px 0 0' }}>
                  {fmt(service.price)}
                  {service.duration > 0 && <span style={{ color: theme.textSecondary, fontWeight: 400, marginLeft: 6 }}>{service.duration} min</span>}
                </p>
              </div>
              {/* Book button */}
              <button
                onClick={isPreview ? undefined : () => onBook?.(service.id)}
                disabled={isPreview}
                style={{
                  flexShrink: 0, padding: '8px 14px', borderRadius: 10,
                  backgroundColor: accent, color: theme.accentText,
                  border: 'none', fontSize: 12, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer', opacity: isPreview ? 0.7 : 1,
                }}>
                Book
              </button>
            </div>
          ))}
        </div>

        {/* Nelsy footer */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: theme.textSecondary }}>
            Powered by <strong style={{ color: accent }}>Nelsy</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
