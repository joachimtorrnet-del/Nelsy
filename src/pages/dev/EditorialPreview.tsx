import { LayoutEditorial } from '@/components/studio/layouts/LayoutEditorial';
import type { Merchant } from '@/types';
import type { NelsyTheme } from '@/lib/themes';

const ACCENT = '#0A0A0A';

const DEMO_MERCHANT: Merchant = {
  id: 'dev-editorial',
  slug: 'dev-editorial',
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
      id: 'de1',
      name: 'Gel Manicure',
      description: 'Gel builder base with semi-permanent polish finish.',
      price: 55,
      duration: 60,
      deposit: 15,
      category: 'Nails',
      image_url: 'https://picsum.photos/id/306/300/300',
    },
    {
      id: 'de2',
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
      id: 'de3',
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
  id: 'editorial',
  name: 'Editorial',
  pageBg: '#F7F4F0',
  cardBg: '#FDF8F3',
  cardBorder: '#E8E0D8',
  textPrimary: '#1A1A1A',
  textSecondary: '#6B6560',
  accentText: '#FFFFFF',
  defaultAccent: ACCENT,
  fontClass: 'font-sans',
};

export default function EditorialPreview() {
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
        DEV PREVIEW — Editorial @ 390px
      </p>
      <div style={{ width: 390, overflow: 'hidden', borderRadius: 24, boxShadow: '0 16px 64px rgba(0,0,0,0.5)' }}>
        <LayoutEditorial
          merchant={DEMO_MERCHANT}
          theme={DEMO_THEME}
          isPreview={false}
          photos={[]}
        />
      </div>
    </div>
  );
}
