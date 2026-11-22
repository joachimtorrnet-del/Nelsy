import { ArrowRight, Globe, Clock } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import type { Merchant, Service } from '@/types';
import type { NelsyTheme } from '@/lib/themes';
import { formatCurrency } from '@/lib/utils';
import { ServiceCollectionCard } from '../ServiceCollectionCard';

interface GalleryPhoto { image_url: string }

type HeaderStyle = 'row' | 'centered-round' | 'centered-square' | 'cover' | 'cover-overlay' | 'photo-bg';
type CardStyle = 'compact' | 'image-top' | 'thumb-arrow' | 'stacked';
type ButtonStyle = 'solid' | 'outline' | 'pill';
type SocialStyle = 'square' | 'circle-outline' | 'plain';

export interface CreatorVariant {
  header: HeaderStyle;
  card: CardStyle;
  button: ButtonStyle;
  social: SocialStyle;
  nameStyle: 'sans' | 'serif' | 'serif-italic';
  align: 'left' | 'center';
  /** Card text when cards sit on a background of the opposite tone (Muse). */
  cardText?: { primary: string; secondary: string };
  shadow?: boolean;
}

export const CREATOR_VARIANTS: Record<string, CreatorVariant> = {
  c_classic:  { header: 'row',             card: 'compact',     button: 'solid',   social: 'square',         nameStyle: 'sans',         align: 'left' },
  c_gallery:  { header: 'row',             card: 'image-top',   button: 'solid',   social: 'square',         nameStyle: 'sans',         align: 'left' },
  c_blush:    { header: 'cover',           card: 'thumb-arrow', button: 'outline', social: 'plain',          nameStyle: 'serif',        align: 'left' },
  c_atelier:  { header: 'cover',           card: 'stacked',     button: 'solid',   social: 'circle-outline', nameStyle: 'serif-italic', align: 'center' },
  c_noir:     { header: 'cover-overlay',   card: 'stacked',     button: 'solid',   social: 'plain',          nameStyle: 'sans',         align: 'center' },
  c_minimal:  { header: 'centered-round',  card: 'stacked',     button: 'solid',   social: 'plain',          nameStyle: 'sans',         align: 'center', shadow: true },
  c_midnight: { header: 'centered-square', card: 'stacked',     button: 'solid',   social: 'plain',          nameStyle: 'sans',         align: 'center' },
  c_muse:     { header: 'photo-bg',        card: 'stacked',     button: 'solid',   social: 'plain',          nameStyle: 'serif',        align: 'center', cardText: { primary: '#1A1A1A', secondary: '#6B6B6B' }, shadow: true },
  c_coach:    { header: 'centered-round',  card: 'stacked',     button: 'solid',   social: 'plain',          nameStyle: 'serif',        align: 'center', shadow: true },
};

interface Props {
  merchant: Merchant;
  theme: NelsyTheme;
  variant: CreatorVariant;
  isPreview: boolean;
  photos: GalleryPhoto[];
  onBook?: (serviceId: string) => void;
}

const SERIF = "'Playfair Display', Georgia, serif";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.13 8.13 0 004.78 1.52V6.82a4.85 4.85 0 01-1-.13z" />
    </svg>
  );
}

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).filter(Boolean).join('').slice(0, 2).toUpperCase() || 'N';
}

export function LayoutCreator({ merchant, theme, variant, isPreview, photos, onBook }: Props) {
  const accent = theme.defaultAccent;
  const accentText = theme.accentText;
  const pageText = theme.textPrimary;
  const pageMuted = theme.textSecondary;
  const cardText = variant.cardText?.primary ?? theme.textPrimary;
  const cardMuted = variant.cardText?.secondary ?? theme.textSecondary;
  // Outline/price text must stay readable on the card, not just on the page
  const accentOnCard = variant.cardText ? accent : (theme.accentOnBg ?? accent);
  const name = merchant.salon_name || merchant.name;
  const avatar = merchant.logo_url;
  const cover = merchant.cover_url ?? photos[0]?.image_url ?? merchant.logo_url;
  const baseFont = theme.fontFamily ?? "'Inter', system-ui, sans-serif";
  const nameFont = theme.fontFamily ?? (variant.nameStyle === 'sans' ? baseFont : SERIF);
  const center = variant.align === 'center';

  const services = [...merchant.services].sort((a, b) => Number(!!b.is_featured) - Number(!!a.is_featured));
  const book = (s: Service) => (isPreview ? undefined : () => onBook?.(s.id));
  const stopInPreview = isPreview ? (e: React.MouseEvent) => e.preventDefault() : undefined;

  const socials: { href: string; label: string; icon: ReactNode }[] = [];
  if (merchant.instagram) socials.push({ href: `https://instagram.com/${merchant.instagram.replace(/^@/, '')}`, label: 'Instagram', icon: <InstagramIcon /> });
  if (merchant.tiktok) socials.push({ href: `https://tiktok.com/@${merchant.tiktok.replace(/^@/, '')}`, label: 'TikTok', icon: <TikTokIcon /> });
  if (merchant.website_url) socials.push({ href: merchant.website_url, label: 'Website', icon: <Globe size={15} /> });

  const onPhoto = variant.header === 'cover-overlay' || variant.header === 'photo-bg';

  const socialRow = socials.length > 0 && (
    <div style={{ display: 'flex', gap: variant.social === 'plain' ? 14 : 8, justifyContent: center ? 'center' : 'flex-start', marginTop: 12 }}>
      {socials.map((s) => {
        const color = onPhoto ? '#FFFFFF' : pageText;
        const box: CSSProperties =
          variant.social === 'square' ? { width: 32, height: 32, borderRadius: 8, border: `1.5px solid ${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          : variant.social === 'circle-outline' ? { width: 34, height: 34, borderRadius: 999, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }
          : { display: 'flex', alignItems: 'center' };
        return (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} onClick={stopInPreview} style={{ ...box, color, opacity: 0.9 }}>
            {s.icon}
          </a>
        );
      })}
    </div>
  );

  const nameEl = (color: string, size: number) => (
    <h1 style={{
      fontFamily: nameFont, fontStyle: variant.nameStyle === 'serif-italic' ? 'italic' : 'normal',
      fontSize: size, fontWeight: variant.nameStyle === 'sans' ? 800 : 600, lineHeight: 1.1,
      letterSpacing: variant.nameStyle === 'sans' ? '-0.02em' : '-0.01em', color, margin: 0,
    }}>{name}</h1>
  );

  const bioEl = (color: string) => merchant.bio ? (
    <p style={{
      fontSize: 14, lineHeight: 1.5, color, margin: '8px 0 0',
      fontStyle: variant.nameStyle === 'serif-italic' ? 'italic' : 'normal',
      fontFamily: variant.nameStyle === 'serif-italic' ? nameFont : undefined,
    }}>{merchant.bio}</p>
  ) : null;

  const avatarEl = (size: number, radius: number | string) => (
    <div style={{ width: size, height: size, borderRadius: radius, overflow: 'hidden', flexShrink: 0, background: `linear-gradient(135deg, ${accent}, ${accent}aa)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {avatar
        ? <img src={avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : <span style={{ color: accentText, fontWeight: 700, fontSize: size * 0.34 }}>{initials(name)}</span>}
    </div>
  );

  // ── Header ────────────────────────────────────────────────────────────
  let header: ReactNode;
  if (variant.header === 'row') {
    header = (
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '28px 20px 8px' }}>
        {avatarEl(64, 999)}
        <div style={{ minWidth: 0 }}>
          {nameEl(pageText, 20)}
          {merchant.slug && <p style={{ fontSize: 13, color: pageMuted, margin: '2px 0 0' }}>@{merchant.slug}</p>}
          {socialRow}
        </div>
      </div>
    );
  } else if (variant.header === 'centered-round' || variant.header === 'centered-square') {
    header = (
      <div style={{ textAlign: 'center', padding: '40px 24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {avatarEl(variant.header === 'centered-round' ? 104 : 112, variant.header === 'centered-round' ? 999 : 20)}
        <div style={{ height: 16 }} />
        {nameEl(pageText, 26)}
        {bioEl(pageMuted)}
        {socialRow}
      </div>
    );
  } else if (variant.header === 'cover') {
    header = (
      <div>
        <div style={{ margin: '12px 12px 0', borderRadius: 18, overflow: 'hidden', aspectRatio: '4 / 3', background: `linear-gradient(135deg, ${accent}55, ${accent}22)` }}>
          {cover && <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ padding: '18px 20px 6px', textAlign: center ? 'center' : 'left' }}>
          {center ? nameEl(pageText, 28) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              {nameEl(pageText, 28)}
              {socials.length > 0 && <div style={{ marginTop: -12 }}>{socialRow}</div>}
            </div>
          )}
          {bioEl(pageMuted)}
          {center && socialRow}
        </div>
      </div>
    );
  } else if (variant.header === 'cover-overlay') {
    header = (
      <div style={{ position: 'relative', aspectRatio: '1 / 1.05', background: '#222' }}>
        {cover && <img src={cover} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0) 35%, ${theme.pageBg} 100%)` }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 18, padding: '0 20px', textAlign: 'center' }}>
          {nameEl('#FFFFFF', 30)}
          {bioEl('rgba(255,255,255,0.8)')}
          {socialRow}
        </div>
      </div>
    );
  } else {
    // photo-bg: the photo is the page backdrop, handled on the wrapper
    header = (
      <div style={{ textAlign: 'center', padding: '48px 24px 24px' }}>
        {nameEl('#FFFFFF', 32)}
        {bioEl('rgba(255,255,255,0.88)')}
        {socialRow}
      </div>
    );
  }

  // ── Cards ─────────────────────────────────────────────────────────────
  const cardBox: CSSProperties = {
    background: theme.cardBg,
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: 18,
    boxShadow: variant.shadow ? '0 6px 24px -10px rgba(0,0,0,0.18)' : undefined,
    overflow: 'hidden',
    color: cardText,
  };

  const button = (s: Service, label: string, full = true) => {
    const style: CSSProperties = variant.button === 'outline'
      ? { border: `1.5px solid ${accentOnCard}`, color: accentOnCard, background: 'transparent' }
      : { background: accent, color: accentText, border: 'none' };
    return (
      <button
        onClick={book(s)}
        style={{
          ...style, width: full ? '100%' : undefined, padding: full ? '12px 16px' : '9px 14px',
          borderRadius: variant.button === 'pill' ? 999 : 12, fontWeight: 700, fontSize: 14,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          cursor: isPreview ? 'default' : 'pointer', fontFamily: baseFont,
        }}
      >
        {label} <ArrowRight size={15} />
      </button>
    );
  };

  const meta = (s: Service) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
      <span style={{ fontWeight: 700, fontSize: 15, color: cardText }}>{formatCurrency(s.price)}</span>
      {s.duration > 0 && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, color: cardMuted }}>
          <Clock size={12} /> {s.duration} min
        </span>
      )}
      {s.deposit > 0 && <span style={{ fontSize: 12, color: cardMuted }}>· {formatCurrency(s.deposit)} deposit</span>}
    </div>
  );

  const thumb = (s: Service, size: number) => (
    <div style={{ width: size, height: size, borderRadius: 12, overflow: 'hidden', flexShrink: 0, background: `${accent}1f` }}>
      {s.image_url && <img src={s.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
    </div>
  );

  const renderCard = (s: Service, idx: number) => {
    const featured = idx === 0 && !!s.is_featured;
    const style = featured && variant.card !== 'image-top' ? 'image-top' : variant.card;

    if (style === 'image-top') {
      return (
        <div key={s.id} style={cardBox}>
          {s.image_url && <div style={{ aspectRatio: '16 / 10', overflow: 'hidden' }}><img src={s.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
          <div style={{ padding: 16 }}>
            <p style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>{s.name}</p>
            {s.description && <p style={{ fontSize: 13, color: cardMuted, margin: '4px 0 0', lineHeight: 1.45 }}>{s.description}</p>}
            {meta(s)}
            <div style={{ marginTop: 14 }}>{button(s, 'Book now')}</div>
          </div>
        </div>
      );
    }
    if (style === 'thumb-arrow') {
      return (
        <button key={s.id} onClick={book(s)} style={{ ...cardBox, display: 'flex', alignItems: 'center', gap: 12, padding: 12, width: '100%', textAlign: 'left', cursor: isPreview ? 'default' : 'pointer', fontFamily: baseFont }}>
          {thumb(s, 56)}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{s.name}</p>
            {meta(s)}
          </div>
          <ArrowRight size={18} color={cardText} />
        </button>
      );
    }
    if (style === 'compact') {
      return (
        <div key={s.id} style={{ ...cardBox, display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
          {thumb(s, 52)}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{s.name}</p>
            {meta(s)}
          </div>
          {button(s, 'Book', false)}
        </div>
      );
    }
    // stacked
    return (
      <div key={s.id} style={{ ...cardBox, padding: 14 }}>
        <div style={{ display: 'flex', gap: 12, textAlign: 'left' }}>
          {thumb(s, 64)}
          <div style={{ minWidth: 0 }}>
            <p style={{ fontWeight: 700, fontSize: 15, margin: 0 }}>{s.name}</p>
            {s.description && <p style={{ fontSize: 12.5, color: cardMuted, margin: '3px 0 0', lineHeight: 1.45 }}>{s.description}</p>}
            {meta(s)}
          </div>
        </div>
        <div style={{ marginTop: 12 }}>{button(s, 'Book now')}</div>
      </div>
    );
  };

  const wrapperBg: CSSProperties = variant.header === 'photo-bg' && cover
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.35)), url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: isPreview ? 'scroll' : 'fixed' }
    : {};

  return (
    <div style={{ minHeight: isPreview ? '100%' : '100dvh', backgroundColor: theme.pageBg, fontFamily: baseFont, color: pageText, WebkitFontSmoothing: 'antialiased', ...wrapperBg }}>
      <div style={{ maxWidth: 480, margin: '0 auto', paddingBottom: 32 }}>
        {header}

        <div id="nelsy-services" style={{ padding: '16px 14px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {services.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: 14, color: onPhoto ? 'rgba(255,255,255,0.85)' : pageMuted, padding: '24px 0' }}>
              No services available yet.
            </p>
          )}
          {services.map(renderCard)}
          {(merchant.collections ?? []).map((col) => (
            <ServiceCollectionCard key={col.id} collection={col} theme={theme} isPreview={isPreview} onBook={onBook} />
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, marginTop: 28, color: onPhoto ? 'rgba(255,255,255,0.75)' : pageMuted }}>
          Powered by <strong style={{ color: onPhoto ? '#FFFFFF' : (theme.accentOnBg ?? accent) }}>Nelsy</strong>
        </p>
      </div>
    </div>
  );
}
