import { useEffect, useRef, useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { KitCategoryIcon } from './KitCategoryIcon';
import { track } from '@/lib/analytics';
import { KIT_DISCLOSURE, getPublicKit, recordKitClick } from '@/lib/kit';
import type { PublicKit, PublicKitItem } from '@/lib/kit';
import type { ProductsTone } from './StudioProducts';

interface Props {
  profileId: string;
  tone: ProductsTone;
  isPreview?: boolean;
  /** Horizontal padding of the section, to match the layout's own gutters. */
  padding?: string;
}

/** Active kit for a studio page (public_kit_items view, or demo data without Supabase). */
function useStudioKit(profileId: string): PublicKit | null {
  const [kit, setKit] = useState<PublicKit | null>(null);
  useEffect(() => {
    if (!profileId) return;
    let cancelled = false;
    getPublicKit(profileId).then((k) => { if (!cancelled) setKit(k); }).catch(() => undefined);
    return () => { cancelled = true; };
  }, [profileId]);
  return kit;
}

/**
 * "My kit" section (Shop my kit, Creator plan): the products the pro uses, with her
 * affiliate links. Rendered after the products on every studio template.
 * Never shows prices (Amazon Associates forbids copying Amazon prices).
 */
export function StudioKit({ profileId, tone, isPreview = false, padding = '0 16px' }: Props) {
  const kit = useStudioKit(profileId);
  if (!kit || kit.items.length === 0) return null;
  return (
    <section id="nelsy-kit" style={{ padding, margin: '20px 0 8px' }} aria-labelledby="nelsy-kit-title">
      <h2 id="nelsy-kit-title" style={{ fontSize: 17, fontWeight: 800, color: tone.text, letterSpacing: '-0.02em', margin: 0 }}>
        {kit.title}
      </h2>
      <p style={{ fontSize: 12.5, color: tone.muted, margin: '3px 0 10px', lineHeight: 1.4 }}>{KIT_DISCLOSURE}</p>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10, listStyle: 'none', padding: 0, margin: 0 }}>
        {kit.items.map((item) => (
          <KitCard key={item.id} item={item} tone={tone} isPreview={isPreview} />
        ))}
      </ul>
    </section>
  );
}

function KitCard({ item, tone, isPreview }: { item: PublicKitItem; tone: ProductsTone; isPreview: boolean }) {
  const onShop = () => {
    track('kit_item_clicked', {
      profile_id: item.profile_id, kit_item_id: item.id, category: item.category, has_promo_code: !!item.promo_code,
    });
    recordKitClick(item.id);
  };
  const shopStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, minHeight: 44, borderRadius: 12,
    backgroundColor: tone.accent, color: tone.accentText, fontSize: 14, fontWeight: 700, textDecoration: 'none',
  } as const;
  return (
    <li style={{
      display: 'flex', flexDirection: 'column', padding: 8, minWidth: 0,
      backgroundColor: tone.cardBg, border: `1px solid ${tone.cardBorder}`, borderRadius: 16,
      boxShadow: '0 1px 6px rgba(0,0,0,0.04)', backdropFilter: tone.cardBlur, WebkitBackdropFilter: tone.cardBlur,
    }}>
      <KitImage url={item.image_url} category={item.category} accent={tone.accent} />
      <div style={{ padding: '9px 2px 0', display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        {item.brand && (
          <span style={{ fontSize: 11, fontWeight: 700, color: tone.muted, textTransform: 'uppercase', letterSpacing: '0.06em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {item.brand}
          </span>
        )}
        <span style={{
          fontSize: 14, fontWeight: 700, color: tone.text, lineHeight: 1.3,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {item.title}
        </span>
        {item.note && (
          <span style={{
            fontSize: 12.5, color: tone.muted, lineHeight: 1.4, marginTop: 2,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {item.note}
          </span>
        )}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {item.promo_code && <PromoChip code={item.promo_code} tone={tone} itemId={item.id} profileId={item.profile_id} />}
        {isPreview ? (
          <span style={shopStyle}>Shop</span>
        ) : (
          <a
            href={item.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={onShop}
            aria-label={`Shop ${item.title}${item.brand ? ` by ${item.brand}` : ''} (opens a new tab)`}
            style={shopStyle}
          >
            Shop <ExternalLink size={14} strokeWidth={2.2} aria-hidden="true" />
          </a>
        )}
      </div>
    </li>
  );
}

function PromoChip({ code, tone, itemId, profileId }: { code: string; tone: ProductsTone; itemId: string; profileId: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Older browsers: select-and-copy fallback.
      const el = document.createElement('textarea');
      el.value = code;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.opacity = '0';
      document.body.appendChild(el);
      el.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      el.remove();
    }
    setCopied(true);
    track('kit_promo_copied', { profile_id: profileId, kit_item_id: itemId });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={() => void copy()}
      aria-label={copied ? `Code ${code} copied` : `Copy code ${code}`}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, minHeight: 44, padding: '0 10px',
        borderRadius: 12, border: `1.5px dashed ${tone.accent}`, background: 'transparent', color: tone.text,
        font: 'inherit', cursor: 'pointer', minWidth: 0,
      }}
    >
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, lineHeight: 1.15 }}>
        <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: tone.muted }}>Code</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, letterSpacing: '0.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{code}</span>
      </span>
      <span aria-live="polite" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 700, color: tone.muted, flexShrink: 0 }}>
        {copied ? <><Check size={14} strokeWidth={2.4} aria-hidden="true" /> Copied</> : <Copy size={14} strokeWidth={2} aria-hidden="true" />}
      </span>
    </button>
  );
}

function KitImage({ url, category, accent }: { url: string | null; category: string | null; accent: string }) {
  const box = { width: '100%', aspectRatio: '1 / 1', borderRadius: 12, overflow: 'hidden' } as const;
  if (url) return <img src={url} alt="" loading="lazy" style={{ ...box, objectFit: 'cover', display: 'block', backgroundColor: '#F4F4F5' }} />;
  return (
    <span aria-hidden="true" style={{
      ...box, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 16%, transparent), color-mix(in srgb, ${accent} 5%, transparent))`,
    }}>
      <KitCategoryIcon category={category} size={30} style={{ color: accent }} />
    </span>
  );
}
