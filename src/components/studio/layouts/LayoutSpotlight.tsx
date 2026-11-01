import { Globe, ArrowRight } from 'lucide-react';
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

// ── Social icons ──────────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z"/>
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

// ── Component ─────────────────────────────────────────────────────────────────

export function LayoutSpotlight({ merchant, theme, isPreview, photos, onBook }: Props) {
  // Full-page background IS the accent color
  const bg = theme.defaultAccent;

  // Tonal surfaces over the saturated background
  const cardSurface = 'rgba(255,255,255,0.14)';
  const cardBorder  = 'rgba(255,255,255,0.12)';
  const socialBg    = 'rgba(255,255,255,0.18)';
  const ctaBg       = 'rgba(255,255,255,0.88)';
  const ctaText     = '#1A1A1A';
  const textWhite   = '#FFFFFF';
  const textSoft    = 'rgba(255,255,255,0.72)';
  const divider     = 'rgba(255,255,255,0.15)';

  const font = 'Inter, sans-serif'; // rounded sans, always — never serif for Spotlight

  // Portrait: prefer logo (headshot) over cover/gallery
  const portraitUrl = merchant.logo_url ?? merchant.cover_url ?? photos[0]?.image_url;

  // Available gallery photos for service thumbnails (skip portrait if reused)
  const servicePhotos = photos.filter((p) => p.image_url !== portraitUrl);

  const services = merchant.services;

  const hasSocials = !!(merchant.instagram || merchant.tiktok || merchant.pinterest_url || merchant.website_url);

  return (
    <div style={{
      backgroundColor: bg,
      minHeight: isPreview ? '100%' : '100dvh',
      fontFamily: font,
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* ── Profile section ─────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', padding: '32px 24px 0' }}>

        {/* Large circular portrait */}
        <div style={{
          width: 164, height: 164, borderRadius: '50%',
          margin: '0 auto 20px',
          overflow: 'hidden',
          border: '3px solid rgba(255,255,255,0.5)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
          flexShrink: 0,
        }}>
          {portraitUrl ? (
            <img
              src={portraitUrl}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 52, fontWeight: 900, color: textWhite, opacity: 0.8 }}>
                {merchant.salon_name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h1 style={{
          fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em',
          color: textWhite, margin: '0 0 12px', lineHeight: 1.15,
        }}>
          {merchant.salon_name}
        </h1>

        {/* Bio */}
        {merchant.bio && (
          <p style={{
            fontSize: 17, color: textSoft, lineHeight: '23px',
            margin: '0 auto 20px', maxWidth: 280,
          }}>
            {merchant.bio}
          </p>
        )}

        {/* Social icons row */}
        {hasSocials && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 28 }}>
            {merchant.instagram && (
              <a
                href={isPreview ? '#' : `https://instagram.com/${merchant.instagram}`}
                onClick={isPreview ? (e) => e.preventDefault() : undefined}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: socialBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: textWhite, textDecoration: 'none', flexShrink: 0,
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
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: socialBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: textWhite, textDecoration: 'none', flexShrink: 0,
                }}
              >
                <TikTokIcon />
              </a>
            )}
            {merchant.pinterest_url && (
              <a
                href={isPreview ? '#' : merchant.pinterest_url}
                onClick={isPreview ? (e) => e.preventDefault() : undefined}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: socialBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: textWhite, textDecoration: 'none', flexShrink: 0,
                }}
              >
                <PinterestIcon />
              </a>
            )}
            {merchant.website_url && (
              <a
                href={isPreview ? '#' : merchant.website_url}
                onClick={isPreview ? (e) => e.preventDefault() : undefined}
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  backgroundColor: socialBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: textWhite, textDecoration: 'none', flexShrink: 0,
                }}
              >
                <Globe size={18} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Service cards ─────────────────────────────────────────────────── */}
      <div style={{ padding: '0 14px 36px' }}>
        {services.map((service, idx) => {
          const thumb = service.image_url ?? servicePhotos[idx]?.image_url;
          const isFeatured = !!service.is_featured;

          if (isFeatured) {
            // Image-led card: large full-width image at top, content + CTA below
            return (
              <div key={service.id} style={{
                backgroundColor: cardSurface,
                border: `1px solid ${cardBorder}`,
                borderRadius: 16,
                overflow: 'hidden',
                marginBottom: 12,
              }}>
                {/* Full-width image */}
                {thumb && (
                  <div style={{ width: '100%', height: 180, overflow: 'hidden' }}>
                    <img
                      src={thumb} alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                )}
                {/* Content */}
                <div style={{ padding: '16px 20px 0' }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: textWhite, margin: '0 0 5px', lineHeight: 1.2 }}>
                    {service.name}
                  </p>
                  {service.description && (
                    <p style={{ fontSize: 14, color: textSoft, margin: '0 0 8px', lineHeight: 1.5 }}>
                      {service.description}
                    </p>
                  )}
                  {service.price > 0 && (
                    <p style={{ fontSize: 15, fontWeight: 700, color: textWhite, margin: '0 0 14px' }}>
                      {fmt(service.price)}
                      {service.duration > 0 && (
                        <span style={{ fontWeight: 400, color: textSoft, marginLeft: 8 }}>{service.duration} min</span>
                      )}
                    </p>
                  )}
                </div>
                {/* CTA */}
                <div style={{ padding: '0 20px 20px' }}>
                  <div style={{ height: 1, backgroundColor: divider, marginBottom: 14 }} />
                  <button
                    onClick={isPreview ? undefined : () => onBook?.(service.id)}
                    disabled={isPreview}
                    style={{
                      width: '100%', height: 46, borderRadius: 40,
                      backgroundColor: ctaBg, color: ctaText,
                      border: 'none', fontSize: 16, fontWeight: 600,
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

          // Standard card: thumbnail left + text right + full-width CTA
          return (
            <div key={service.id} style={{
              backgroundColor: cardSurface,
              border: `1px solid ${cardBorder}`,
              borderRadius: 16,
              marginBottom: 12,
              overflow: 'hidden',
            }}>
              {/* Upper: thumbnail + text */}
              <div style={{ display: 'flex', gap: 14, padding: '20px 20px 0' }}>
                {/* Thumbnail */}
                <div style={{
                  width: 72, height: 72, borderRadius: 10, flexShrink: 0, overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }}>
                  {thumb ? (
                    <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)' }} />
                  )}
                </div>
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: textWhite, margin: '0 0 5px', lineHeight: 1.2 }}>
                    {service.name}
                  </p>
                  {service.description && (
                    <p style={{
                      fontSize: 14, color: textSoft, margin: '0 0 8px', lineHeight: 1.45,
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {service.description}
                    </p>
                  )}
                  {/* Price + duration */}
                  {service.price > 0 && (
                    <p style={{ fontSize: 14, fontWeight: 600, color: textWhite, margin: 0 }}>
                      {fmt(service.price)}
                      {service.duration > 0 && (
                        <span style={{ fontWeight: 400, color: textSoft, marginLeft: 6 }}>{service.duration} min</span>
                      )}
                    </p>
                  )}
                  {/* Rating — only if real data */}
                  {merchant.rating != null && merchant.rating > 0 && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      marginTop: 8, padding: '3px 8px', borderRadius: 20,
                      backgroundColor: 'rgba(255,255,255,0.18)',
                    }}>
                      <span style={{ fontSize: 12, color: '#FFD700' }}>★</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: textWhite }}>{merchant.rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Separator */}
              <div style={{ height: 1, backgroundColor: divider, margin: '16px 20px 0' }} />

              {/* Full-width CTA */}
              <div style={{ padding: '12px 20px 20px' }}>
                <button
                  onClick={isPreview ? undefined : () => onBook?.(service.id)}
                  disabled={isPreview}
                  style={{
                    width: '100%', height: 46, borderRadius: 40,
                    backgroundColor: ctaBg, color: ctaText,
                    border: 'none', fontSize: 16, fontWeight: 600,
                    cursor: isPreview ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  Book now <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingBottom: 32 }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
          Powered by <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Nelsy</strong>
        </span>
      </div>
    </div>
  );
}
