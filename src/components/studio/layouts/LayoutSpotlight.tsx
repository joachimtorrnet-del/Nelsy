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

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

export function LayoutSpotlight({ merchant, theme, isPreview, photos, onBook }: Props) {
  const accent = theme.defaultAccent;
  const pageBg = theme.pageBg;
  const avatarPhoto = merchant.logo_url ?? photos[0]?.image_url;
  const font = theme.fontClass === 'font-serif' ? 'Playfair Display, Georgia, serif' : 'Inter, sans-serif';
  const initials = merchant.salon_name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  // Spotlight uses a bold tinted header band + white/card lower section
  const headerBg = theme.headerGradient ?? `linear-gradient(150deg, ${accent} 0%, ${accent}cc 100%)`;
  const isLightHeader = accent === '#F4C2C2' || accent === '#e8c9c9' || pageBg === '#FFFBFB';
  const headerText = isLightHeader ? theme.textPrimary : '#ffffff';
  const headerTextSub = isLightHeader ? theme.textSecondary : 'rgba(255,255,255,0.75)';

  return (
    <div style={{
      minHeight: isPreview ? '100%' : '100dvh',
      backgroundColor: theme.pageBg,
      fontFamily: font,
    }}>
      {/* Bold header with circular avatar */}
      <div style={{
        background: headerBg,
        padding: '36px 24px 28px',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Circular avatar */}
        <div style={{
          width: 100, height: 100, borderRadius: '50%',
          margin: '0 auto 16px',
          overflow: 'hidden',
          border: `3px solid rgba(255,255,255,0.4)`,
          boxShadow: `0 4px 20px rgba(0,0,0,0.15)`,
          flexShrink: 0,
        }}>
          {avatarPhoto ? (
            <img src={avatarPhoto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: headerText, opacity: 0.9 }}>
                {initials}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em',
          color: headerText, margin: '0 0 5px', lineHeight: 1.1,
        }}>
          {merchant.salon_name}
        </h1>

        {/* Specialty / location */}
        {(merchant.specialty || merchant.location) && (
          <p style={{ fontSize: 13, color: headerTextSub, margin: '0 0 10px', letterSpacing: '0.02em' }}>
            {[merchant.specialty, merchant.location].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Bio */}
        {merchant.bio && (
          <p style={{
            fontSize: 13, color: headerTextSub, lineHeight: 1.6,
            margin: '0 auto 14px', maxWidth: 280,
          }}>
            {merchant.bio}
          </p>
        )}

        {/* Social icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {merchant.instagram && (
            <a href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
              onClick={isPreview ? (e) => e.preventDefault() : undefined}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: headerText, textDecoration: 'none',
              }}>
              <InstagramIcon />
            </a>
          )}
          {merchant.tiktok && (
            <a href={isPreview ? '#' : `https://tiktok.com/@${merchant.tiktok}`}
              onClick={isPreview ? (e) => e.preventDefault() : undefined}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: headerText, textDecoration: 'none',
              }}>
              <TikTokIcon />
            </a>
          )}
          {merchant.website_url && (
            <a href={isPreview ? '#' : merchant.website_url}
              onClick={isPreview ? (e) => e.preventDefault() : undefined}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: headerText, textDecoration: 'none',
              }}>
              <Globe size={13} />
            </a>
          )}
        </div>
      </div>

      {/* Services section on white/page-bg */}
      <div style={{ padding: '20px 16px 32px' }}>
        <p style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
          color: theme.textSecondary, textTransform: 'uppercase',
          marginBottom: 14, textAlign: 'center',
        }}>
          Mes services
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {merchant.services.map((service) => (
            <div key={service.id} style={{
              display: 'flex', alignItems: 'center',
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              borderRadius: 16, padding: '14px 16px',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Accent bar left */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                backgroundColor: accent, borderRadius: '16px 0 0 16px',
              }} />
              <div style={{ flex: 1, minWidth: 0, paddingLeft: 8 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: theme.textPrimary, margin: '0 0 3px' }}>
                  {service.name}
                </p>
                <p style={{ fontSize: 13, color: theme.textSecondary, margin: 0 }}>
                  <span style={{ color: accent, fontWeight: 700 }}>{fmt(service.price)}</span>
                  {service.duration > 0 && <span style={{ marginLeft: 8 }}>{service.duration} min</span>}
                </p>
              </div>
              <button
                onClick={isPreview ? undefined : () => onBook?.(service.id)}
                disabled={isPreview}
                style={{
                  flexShrink: 0, padding: '9px 16px', borderRadius: 40,
                  backgroundColor: accent, color: theme.accentText,
                  border: 'none', fontSize: 13, fontWeight: 700,
                  cursor: isPreview ? 'default' : 'pointer',
                  boxShadow: `0 2px 8px rgba(${hexToRgb(accent.length === 7 ? accent : '#000000')},0.3)`,
                }}>
                Réserver
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <span style={{ fontSize: 11, color: theme.textSecondary }}>
            Powered by <strong style={{ color: accent }}>Nelsy</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
