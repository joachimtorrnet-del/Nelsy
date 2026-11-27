import { FileDown } from 'lucide-react';
import { formatProductPrice } from '@/lib/products';
import type { PublicProduct } from '@/lib/products';

export interface ProductsTone {
  text: string;
  muted: string;
  cardBg: string;
  cardBorder: string;
  accent: string;
  accentText: string;
  cardBlur?: string;
}

interface Props {
  products: PublicProduct[];
  tone: ProductsTone;
  isPreview?: boolean;
  onOpen: (product: PublicProduct) => void;
  /** Horizontal padding of the section, to match the layout's own gutters. */
  padding?: string;
}

/** "Shop" section rendered after the services on every studio template. */
export function StudioProducts({ products, tone, isPreview = false, onOpen, padding = '0 16px' }: Props) {
  if (products.length === 0) return null;
  return (
    <section id="nelsy-products" style={{ padding, margin: '20px 0 8px' }} aria-label="Products">
      <p style={{ fontSize: 17, fontWeight: 800, color: tone.text, letterSpacing: '-0.02em', margin: '0 0 10px' }}>
        Shop
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
        {products.map((p) => {
          const free = p.type === 'free_resource';
          const priceLabel = free ? 'Free' : formatProductPrice(p.price_cents, p.currency);
          return (
          <button
            key={p.id}
            type="button"
            onClick={isPreview ? undefined : () => onOpen(p)}
            aria-label={`${p.title}, ${priceLabel}`}
            style={{
              textAlign: 'left', padding: 8, display: 'flex', flexDirection: 'column',
              backgroundColor: tone.cardBg, border: `1px solid ${tone.cardBorder}`, borderRadius: 16,
              boxShadow: '0 1px 6px rgba(0,0,0,0.04)', cursor: isPreview ? 'default' : 'pointer',
              backdropFilter: tone.cardBlur, WebkitBackdropFilter: tone.cardBlur, font: 'inherit', minWidth: 0,
            }}
          >
            <ProductCover url={p.cover_url} accent={tone.accent} />
            <span style={{
              fontSize: 14, fontWeight: 700, color: tone.text, margin: '9px 2px 2px', lineHeight: 1.3,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            }}>
              {p.title}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6, margin: 'auto 2px 2px', paddingTop: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: tone.text }}>{priceLabel}</span>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '6px 12px', borderRadius: 10, backgroundColor: tone.accent, color: tone.accentText, whiteSpace: 'nowrap' }}>
                {free ? 'Get it' : 'Buy'}
              </span>
            </span>
          </button>
          );
        })}
      </div>
    </section>
  );
}

export function ProductCover({ url, accent, height }: { url: string | null; accent: string; height?: number }) {
  const box = { width: '100%', aspectRatio: height ? undefined : '4 / 3', height, borderRadius: 12, overflow: 'hidden' } as const;
  return url ? (
    <img src={url} alt="" loading="lazy" style={{ ...box, objectFit: 'cover', display: 'block' }} />
  ) : (
    <span style={{
      ...box, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 16%, transparent), color-mix(in srgb, ${accent} 5%, transparent))`,
    }}>
      <FileDown size={28} strokeWidth={1.6} style={{ color: accent }} />
    </span>
  );
}
