import { LayoutSpotlight } from '@/components/studio/layouts/LayoutSpotlight';
import type { Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

// ── Demo data — English copy, no fake ratings, picsum beauty photography ──────

const ACCENT = '#F52B8C';

const DEMO_MERCHANT: Merchant = {
  id: 'dev-spotlight',
  slug: 'dev-spotlight',
  salon_name: 'Camille Studio',
  name: 'Camille Studio',
  bio: 'Precision nail art & Russian volume lashes, Paris.',
  specialty: 'Nail Artist',
  location: 'Paris',
  instagram: 'camille.studio',
  tiktok: 'camille.studio',
  logo_url: 'https://picsum.photos/id/1027/400/600',
  rating: 0,
  review_count: 0,
  services: [
    {
      id: 'ds1',
      name: 'Gel Manicure',
      description: 'Gel builder base with semi-permanent polish finish.',
      price: 55,
      duration: 60,
      deposit: 15,
      category: 'Nails',
      image_url: 'https://picsum.photos/id/306/300/300',
    },
    {
      id: 'ds2',
      name: 'Lash Extensions',
      description: 'Russian volume lashes, natural to dramatic looks.',
      price: 90,
      duration: 120,
      deposit: 20,
      category: 'Lashes',
      is_featured: true,
      image_url: 'https://picsum.photos/id/888/400/300',
    },
    {
      id: 'ds3',
      name: 'Nail Art (2 fingers)',
      description: 'Custom designs on any two fingers.',
      price: 15,
      duration: 20,
      deposit: 0,
      category: 'Nails',
      image_url: 'https://picsum.photos/id/26/300/300',
    },
  ],
};

const DEMO_THEME: NelsyTheme = {
  id: 'blush',
  name: 'Blush',
  pageBg: ACCENT,
  cardBg: 'rgba(255,255,255,0.14)',
  cardBorder: 'rgba(255,255,255,0.12)',
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255,255,255,0.72)',
  accentText: '#FFFFFF',
  defaultAccent: ACCENT,
  fontClass: 'font-sans',
};

export default function SpotlightPreview() {
  return (
    <div style={{
      minHeight: '100dvh',
      backgroundColor: '#111',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px 0',
      gap: 12,
    }}>
      <p style={{ color: '#999', fontFamily: 'monospace', fontSize: 12, margin: 0 }}>
        DEV PREVIEW — Spotlight @ 390px
      </p>

      {/* Fixed 390px container — true mobile viewport width */}
      <div style={{ width: 390, overflow: 'hidden', borderRadius: 24, boxShadow: '0 16px 64px rgba(0,0,0,0.5)' }}>
        <LayoutSpotlight
          merchant={DEMO_MERCHANT}
          theme={DEMO_THEME}
          isPreview={false}
          photos={[]}
        />
      </div>
    </div>
  );
}
