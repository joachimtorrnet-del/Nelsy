import { useEffect } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import type { Merchant, Service } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { useMoney } from '@/lib/currency';
import { getStudioFont, ensureStudioFontLoaded } from '@/lib/studioFonts';
import { ServiceCollectionCard } from '../ServiceCollectionCard';
import { PoweredByNelsy } from '../PlgCTA';
import { VideoCallBadge } from '@/components/studio/VideoCallBadge';

interface GalleryPhoto { image_url: string }

// Header structures, one per creator template
type HeaderStyle =
  | 'row'            // avatar left, name + @handle, square socials (Classic, Gallery)
  | 'photo-left'     // edge-to-edge photo, name left with socials on the same line (Blush)
  | 'photo-center'   // edge-to-edge photo, italic name and bio centered (Atelier)
  | 'photo-fade'     // photo fading into a dark page, name over it (Noir)
  | 'avatar-round'   // centered round avatar (Minimal, Coach, Glow)
  | 'avatar-square'  // centered rounded-square avatar (Midnight)
  | 'split'          // photo left half, colored panel right (Split)
  | 'photo-bg';      // photo is the whole page backdrop (Muse)

// How the "callout" card style is drawn in this template
type CalloutStyle = 'row-button' | 'image-left' | 'image-top';

export interface CreatorVariant {
  header: HeaderStyle;
  callout: CalloutStyle;
  button: 'solid' | 'outline' | 'pill';
  social: 'square' | 'circle' | 'plain';
  nameStyle: 'sans' | 'serif' | 'serif-italic';
  nameFont: string;
  bodyFont: string;
  /** Text on cards when cards don't share the page's tone (Split, Muse). */
  cardText?: { primary: string; secondary: string };
  shadow?: boolean;
  /** Arrow on compact "button" cards (Blush). */
  buttonArrow?: boolean;
}

export const CREATOR_VARIANTS: Record<string, CreatorVariant> = {
  c_classic:  { header: 'row',           callout: 'row-button', button: 'solid',   social: 'square', nameStyle: 'sans',         nameFont: 'dm-sans',       bodyFont: 'dm-sans', shadow: true },
  c_gallery:  { header: 'row',           callout: 'image-top',  button: 'solid',   social: 'square', nameStyle: 'sans',         nameFont: 'poppins',       bodyFont: 'poppins', shadow: true },
  c_blush:    { header: 'photo-left',    callout: 'image-left', button: 'outline', social: 'plain',  nameStyle: 'serif',        nameFont: 'fraunces',      bodyFont: 'dm-sans', buttonArrow: true },
  c_atelier:  { header: 'photo-center',  callout: 'row-button', button: 'solid',   social: 'circle', nameStyle: 'serif-italic', nameFont: 'cormorant',     bodyFont: 'inter' },
  c_noir:     { header: 'photo-fade',    callout: 'row-button', button: 'solid',   social: 'plain',  nameStyle: 'sans',         nameFont: 'space-grotesk', bodyFont: 'space-grotesk' },
  c_minimal:  { header: 'avatar-round',  callout: 'row-button', button: 'solid',   social: 'plain',  nameStyle: 'sans',         nameFont: 'inter',         bodyFont: 'inter', shadow: true },
  c_midnight: { header: 'avatar-square', callout: 'row-button', button: 'solid',   social: 'plain',  nameStyle: 'sans',         nameFont: 'montserrat',    bodyFont: 'montserrat' },
  c_split:    { header: 'split',         callout: 'image-left', button: 'pill',    social: 'plain',  nameStyle: 'sans',         nameFont: 'poppins',       bodyFont: 'poppins', cardText: { primary: '#FFFFFF', secondary: 'rgba(255,255,255,0.85)' } },
  c_muse:     { header: 'photo-bg',      callout: 'row-button', button: 'solid',   social: 'plain',  nameStyle: 'serif',        nameFont: 'fraunces',      bodyFont: 'dm-sans', cardText: { primary: '#1A1A1A', secondary: '#6B6B6B' }, shadow: true },
  c_glow:     { header: 'avatar-round',  callout: 'row-button', button: 'pill',    social: 'circle', nameStyle: 'sans',         nameFont: 'dm-sans',       bodyFont: 'dm-sans' },
  c_coach:    { header: 'avatar-round',  callout: 'row-button', button: 'solid',   social: 'plain',  nameStyle: 'serif',        nameFont: 'lora',          bodyFont: 'dm-sans', shadow: true },
};

interface Props {
  merchant: Merchant;
  theme: NelsyTheme;
  variant: CreatorVariant;
  isPreview: boolean;
  photos: GalleryPhoto[];
  onBook?: (serviceId: string) => void;
  /** Products section (digital products), rendered after the services. */
  productsSlot?: ReactNode;
}

const SERIF = "'Playfair Display', Georgia, serif";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).filter(Boolean).join('').slice(0, 2).toUpperCase() || 'N';
}

function onDark(hex: string) {
  const m = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
  if (!m) return false;
  const [r, g, b] = [m[1], m[2], m[3]].map((h) => parseInt(h, 16));
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
}

export function LayoutCreator({ merchant, theme, variant, isPreview, photos, onBook, productsSlot }: Props) {
  const formatCurrency = useMoney();
  const nameFontDef = getStudioFont(variant.nameFont);
  const bodyFontDef = getStudioFont(variant.bodyFont);
  useEffect(() => {
    ensureStudioFontLoaded(nameFontDef);
    ensureStudioFontLoaded(bodyFontDef);
  }, [nameFontDef, bodyFontDef]);

  const accent = theme.defaultAccent;
  const accentText = theme.accentText;
  const pageText = theme.textPrimary;
  const pageMuted = theme.textSecondary;
  const cardText = variant.cardText?.primary ?? theme.textPrimary;
  const cardMuted = variant.cardText?.secondary ?? theme.textSecondary;
  const onColoredCards = variant.header === 'split';
  const name = merchant.salon_name || merchant.name;
  const handle = merchant.slug ? `@${merchant.slug}` : '';
  const avatar = merchant.logo_url;
  const photo = merchant.cover_url ?? merchant.logo_url ?? photos[0]?.image_url;
  const baseFont = theme.fontFamily ?? bodyFontDef?.stack ?? "'Inter', system-ui, sans-serif";
  const nameFont = theme.fontFamily ?? nameFontDef?.stack ?? (variant.nameStyle === 'sans' ? baseFont : SERIF);
  const italic = variant.nameStyle === 'serif-italic';
  const darkPage = onDark(theme.pageBg);

  const book = (s: Service) => (isPreview ? undefined : () => onBook?.(s.id));
  const stopInPreview = isPreview ? (e: React.MouseEvent) => e.preventDefault() : undefined;

  const socials: { href: string; label: string; icon: ReactNode }[] = [];
  if (merchant.instagram) socials.push({ href: `https://instagram.com/${merchant.instagram.replace(/^@/, '')}`, label: 'Instagram', icon: <InstagramIcon /> });
  if (merchant.tiktok) socials.push({ href: `https://tiktok.com/@${merchant.tiktok.replace(/^@/, '')}`, label: 'TikTok', icon: <TikTokIcon /> });
  if (merchant.website_url) socials.push({ href: merchant.website_url, label: 'Website', icon: <Globe size={15} /> });

  const socialRow = (color: string, justify: 'center' | 'flex-start' | 'flex-end' = 'center', top = 12) => socials.length > 0 && (
    <div style={{ display: 'flex', gap: variant.social === 'plain' ? 16 : 8, justifyContent: justify, marginTop: top, flexShrink: 0 }}>
      {socials.map((s) => {
        const box: CSSProperties =
          variant.social === 'square' ? { width: 30, height: 30, borderRadius: 8, border: `1.5px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          : variant.social === 'circle' ? { width: 34, height: 34, borderRadius: 999, border: `1px solid ${color}55`, background: darkPage ? 'rgba(255,255,255,0.14)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }
          : { display: 'flex', alignItems: 'center' };
        return (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} onClick={stopInPreview} style={{ ...box, color }}>
            {s.icon}
          </a>
        );
      })}
    </div>
  );

  const nameEl = (color: string, size: number, align: 'left' | 'center' = 'center') => (
    <h1 style={{
      fontFamily: nameFont, fontStyle: italic ? 'italic' : 'normal', textAlign: align,
      fontSize: size, fontWeight: variant.nameStyle === 'sans' ? 800 : italic ? 500 : 600, lineHeight: 1.08,
      letterSpacing: variant.nameStyle === 'sans' ? '-0.025em' : '-0.01em', color, margin: 0,
    }}>{name}</h1>
  );

  const bioEl = (color: string, align: 'left' | 'center' = 'center') => merchant.bio ? (
    <p style={{
      fontSize: 14, lineHeight: 1.5, color, margin: '8px 0 0', textAlign: align,
      fontStyle: italic ? 'italic' : 'normal', fontFamily: italic ? nameFont : undefined,
    }}>{merchant.bio}</p>
  ) : null;

  const avatarEl = (size: number, radius: number | string, ring?: string) => (
    <div style={{
      width: size, height: size, borderRadius: radius, overflow: 'hidden', flexShrink: 0,
      background: `linear-gradient(135deg, ${accent}, ${accent}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: ring ? `0 0 0 4px ${ring}` : undefined,
    }}>
      {avatar
        ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ color: accentText, fontWeight: 700, fontSize: size * 0.34 }}>{initials(name)}</span>}
    </div>
  );

  const photoEl = (style: CSSProperties) => (
    <div style={{ overflow: 'hidden', background: `linear-gradient(135deg, ${accent}66, ${accent}22)`, ...style }}>
      {photo && <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
    </div>
  );

  // ── Header ────────────────────────────────────────────────────────────
  let header: ReactNode = null;
  switch (variant.header) {
    case 'row':
      header = (
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '28px 18px 10px' }}>
          {avatarEl(60, 999)}
          <div style={{ minWidth: 0, paddingTop: 4 }}>
            <p style={{ margin: 0, fontFamily: nameFont, fontWeight: 700, fontSize: 17, color: pageText, letterSpacing: '-0.01em' }}>
              {name} {handle && <span style={{ fontWeight: 500, fontSize: 14, color: theme.accentOnBg ?? accent }}>{handle}</span>}
            </p>
            {socialRow(pageText, 'flex-start', 8)}
          </div>
        </div>
      );
      break;
    case 'photo-left':
      header = (
        <div>
          {photoEl({ aspectRatio: '1 / 0.82' })}
          <div style={{ padding: '18px 18px 4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              {nameEl(pageText, 30, 'left')}
              {socialRow(pageText, 'flex-end', 0)}
            </div>
            {bioEl(pageMuted, 'left')}
          </div>
        </div>
      );
      break;
    case 'photo-center':
      header = (
        <div>
          {photoEl({ aspectRatio: '1 / 0.78' })}
          <div style={{ padding: '22px 22px 6px' }}>
            {nameEl(pageText, 32)}
            {bioEl(pageMuted)}
            {socialRow(pageMuted, 'center', 16)}
          </div>
        </div>
      );
      break;
    case 'photo-fade':
      header = (
        <div style={{ position: 'relative' }}>
          {photoEl({ aspectRatio: '1 / 1.02' })}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.05) 30%, ${theme.pageBg} 96%)` }} />
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 14, padding: '0 20px' }}>
            {nameEl('#FFFFFF', 30)}
            {socialRow('#FFFFFF', 'center', 12)}
          </div>
        </div>
      );
      break;
    case 'avatar-round':
    case 'avatar-square': {
      const round = variant.header === 'avatar-round';
      header = (
        <div style={{ padding: '40px 24px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {avatarEl(round ? 104 : 112, round ? 999 : 22, round && darkPage ? 'rgba(255,255,255,0.35)' : undefined)}
          <div style={{ height: 16 }} />
          {nameEl(pageText, variant.nameStyle === 'sans' ? 26 : 30)}
          {bioEl(pageMuted)}
          {socialRow(pageText, 'center', 14)}
        </div>
      );
      break;
    }
    case 'split':
      header = (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 230 }}>
          {photoEl({ height: '100%' })}
          <div style={{ background: accent, color: accentText, padding: '22px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ margin: 0, fontFamily: nameFont, fontWeight: 800, fontSize: 21, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{name}</p>
            {merchant.bio && <p style={{ margin: '8px 0 0', fontSize: 12.5, lineHeight: 1.45, opacity: 0.9 }}>{merchant.bio}</p>}
            {socialRow(accentText, 'flex-start', 14)}
          </div>
        </div>
      );
      break;
    case 'photo-bg':
      header = (
        <div style={{ padding: '52px 24px 20px' }}>
          {nameEl('#FFFFFF', 34)}
          {bioEl('rgba(255,255,255,0.9)')}
          {socialRow('#FFFFFF', 'center', 14)}
        </div>
      );
      break;
  }

  // ── Cards ─────────────────────────────────────────────────────────────
  const cardBox: CSSProperties = {
    background: theme.cardBg,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: 16,
    boxShadow: variant.shadow ? '0 8px 24px -14px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.04)' : undefined,
    overflow: 'hidden',
    color: cardText,
    textAlign: 'left',
    width: '100%',
    fontFamily: baseFont,
  };

  // Button colors are drawn against the card, not the page
  const btnColors: CSSProperties = onColoredCards
    ? { background: '#FFFFFF', color: accent, border: 'none' }
    : variant.button === 'outline'
      ? { background: 'transparent', color: cardText, border: `1.5px solid ${cardText}` }
      : { background: accent, color: accentText, border: 'none' };

  const cta = (s: Service, full = true) => (
    <button onClick={book(s)} style={{
      ...btnColors, width: full ? '100%' : undefined, padding: full ? '12px 16px' : '9px 16px',
      borderRadius: variant.button === 'pill' ? 999 : 10, fontWeight: 700, fontSize: 14, fontFamily: baseFont,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: isPreview ? 'default' : 'pointer',
    }}>
      {s.card_cta_text || 'Book now'} <ArrowRight size={15} />
    </button>
  );

  const title = (s: Service, size = 15) => (
    <p style={{ margin: 0, fontWeight: 700, fontSize: size, lineHeight: 1.25, fontFamily: variant.nameStyle === 'sans' ? baseFont : nameFont, color: cardText }}>{s.name}</p>
  );
  const desc = (s: Service, clamp = 2) => {
    const text = s.card_subtitle || s.description;
    return text ? (
      <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: 1.45, color: cardMuted, display: '-webkit-box', WebkitLineClamp: clamp, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{text}</p>
    ) : null;
  };
  const price = (s: Service) => (
    <p style={{ margin: '6px 0 0', fontSize: 14, color: cardText }}>
      <strong style={{ fontWeight: 700 }}>{formatCurrency(s.price)}</strong>
      {s.duration > 0 && <span style={{ color: cardMuted, fontSize: 12.5 }}> · {s.duration} min</span>}
      {s.location_type === 'online' && <span style={{ marginLeft: 6 }}><VideoCallBadge color={cardText} background="rgba(128,128,128,0.14)" /></span>}
    </p>
  );
  const image = (s: Service, style: CSSProperties) => (
    <div style={{ overflow: 'hidden', flexShrink: 0, background: `${accent}22`, ...style }}>
      {s.image_url && <img src={s.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
    </div>
  );

  const renderCard = (s: Service) => {
    const style = s.card_style ?? 'callout';

    if (style === 'button') {
      return (
        <button key={s.id} onClick={book(s)} style={{ ...cardBox, display: 'flex', alignItems: 'center', gap: 12, padding: 10, cursor: isPreview ? 'default' : 'pointer' }}>
          {image(s, { width: 52, height: 52, borderRadius: 10 })}
          <div style={{ flex: 1, minWidth: 0 }}>
            {title(s)}
            {price(s)}
          </div>
          {variant.buttonArrow && <ArrowRight size={18} color={cardText} style={{ marginRight: 4, flexShrink: 0 }} />}
        </button>
      );
    }

    if (style === 'preview') {
      return (
        <button key={s.id} onClick={book(s)} style={{ ...cardBox, padding: 0, cursor: isPreview ? 'default' : 'pointer' }}>
          {image(s, { aspectRatio: '16 / 11' })}
          <div style={{ padding: '12px 14px 14px' }}>
            {title(s)}
            {desc(s)}
            {price(s)}
          </div>
        </button>
      );
    }

    // callout
    if (variant.callout === 'image-left') {
      return (
        <div key={s.id} style={{ ...cardBox, display: 'flex', gap: 12, padding: 10 }}>
          {image(s, { width: '44%', aspectRatio: '1 / 1.08', borderRadius: 12 })}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', padding: '4px 2px' }}>
            {title(s)}
            {desc(s, 3)}
            {price(s)}
            <div style={{ marginTop: 'auto', paddingTop: 10 }}>{cta(s, false)}</div>
          </div>
        </div>
      );
    }
    if (variant.callout === 'image-top') {
      return (
        <div key={s.id} style={cardBox}>
          {image(s, { aspectRatio: '16 / 11' })}
          <div style={{ padding: 14 }}>
            {title(s, 16)}
            {desc(s)}
            {price(s)}
            <div style={{ marginTop: 12 }}>{cta(s)}</div>
          </div>
        </div>
      );
    }
    return (
      <div key={s.id} style={{ ...cardBox, padding: 14 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {image(s, { width: 60, height: 60, borderRadius: 10 })}
          <div style={{ minWidth: 0 }}>
            {title(s)}
            {desc(s)}
            {price(s)}
          </div>
        </div>
        <div style={{ marginTop: 12 }}>{cta(s)}</div>
      </div>
    );
  };

  const photoBg = variant.header === 'photo-bg' && photo;
  const wrapper: CSSProperties = photoBg
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.4)), url(${photo})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: isPreview ? 'scroll' : 'fixed' }
    : {};
  const footerColor = variant.header === 'photo-bg' ? 'rgba(255,255,255,0.8)' : pageMuted;

  return (
    <div style={{ minHeight: isPreview ? '100%' : '100dvh', backgroundColor: theme.pageBg, fontFamily: baseFont, color: pageText, WebkitFontSmoothing: 'antialiased', ...wrapper }}>
      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 28 }}>
        {header}

        <div id="nelsy-services" style={{ padding: '16px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {merchant.services.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: 14, color: footerColor, padding: '24px 0' }}>No services available yet.</p>
          )}
          {merchant.services.map(renderCard)}
          {(merchant.collections ?? []).map((col) => (
            <ServiceCollectionCard key={col.id} collection={col} theme={theme} isPreview={isPreview} onBook={onBook} />
          ))}
        </div>

        {productsSlot}

        <p style={{ textAlign: 'center', marginTop: 28 }}>
          <PoweredByNelsy profileId={merchant.id} isPreview={isPreview} color={footerColor} brandColor={variant.header === 'photo-bg' ? '#FFFFFF' : (theme.accentOnBg ?? accent)} />
        </p>
      </div>
    </div>
  );
}
