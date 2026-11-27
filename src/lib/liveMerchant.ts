import type { Merchant } from '../types';

interface ProfileLike {
  id?: string | null;
  slug?: string | null;
  business_currency?: string | null;
  full_name?: string | null;
  bio?: string | null;
  logo_url?: string | null;
  cover_url?: string | null;
  specialty?: string | null;
  location?: string | null;
  instagram_url?: string | null;
  tiktok_url?: string | null;
  theme_preset?: string | null;
  color_accent?: string | null;
  color_background?: string | null;
  font_family?: string | null;
  timezone?: string | null;
}

interface ServiceLike {
  id: string;
  name: string;
  description?: string | null;
  price_total?: number | string | null;
  price?: number | string | null;
  duration_minutes?: number | null;
  duration?: number | null;
  deposit_amount?: number | string | null;
  category?: string | null;
  image_url?: string | null;
  is_featured?: boolean | null;
  active?: boolean | null;
  card_style?: 'button' | 'callout' | 'preview' | null;
  card_subtitle?: string | null;
  card_cta_text?: string | null;
  payment_mode?: 'on_arrival' | 'deposit' | 'full' | null;
  on_arrival_methods?: ('cash' | 'card')[] | null;
  location_type?: 'in_person' | 'online' | null;
}

/** The pro's studio as clients would see it, built from dashboard data (draft-safe: no fetch). */
export function buildLiveMerchant(
  profile: ProfileLike | null | undefined,
  services: ServiceLike[],
  design?: { theme_preset?: string; color_accent?: string; color_background?: string | null; font_family?: string | null },
): Merchant {
  return {
    id: profile?.id ?? '',
    slug: profile?.slug ?? '',
    currency: (profile?.business_currency ?? 'EUR').toUpperCase(),
    salon_name: profile?.full_name ?? 'My Studio',
    name: profile?.full_name ?? 'My Studio',
    bio: profile?.bio ?? '',
    logo_url: profile?.logo_url ?? undefined,
    cover_url: profile?.cover_url ?? undefined,
    specialty: profile?.specialty ?? undefined,
    location: profile?.location ?? undefined,
    instagram: profile?.instagram_url ?? undefined,
    tiktok: profile?.tiktok_url ?? undefined,
    timezone: profile?.timezone ?? undefined,
    theme_preset: design?.theme_preset ?? profile?.theme_preset ?? undefined,
    color_accent: design?.color_accent ?? profile?.color_accent ?? undefined,
    // undefined in `design` means "not edited"; null means "cleared back to the template"
    color_background: (design && 'color_background' in design ? design.color_background : profile?.color_background) ?? undefined,
    font_family: (design && 'font_family' in design ? design.font_family : profile?.font_family) ?? undefined,
    services: services
      .filter((s) => s.active !== false)
      .map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description ?? '',
        price: parseFloat(String(s.price_total ?? s.price ?? 0)),
        duration: s.duration_minutes ?? s.duration ?? 60,
        deposit: parseFloat(String(s.deposit_amount ?? 0)),
        category: s.category ?? undefined,
        image_url: s.image_url ?? undefined,
        is_featured: s.is_featured ?? false,
        active: s.active ?? true,
        card_style: s.card_style ?? undefined,
        card_subtitle: s.card_subtitle ?? undefined,
        card_cta_text: s.card_cta_text ?? undefined,
        payment_mode: s.payment_mode ?? undefined,
        on_arrival_methods: s.on_arrival_methods ?? undefined,
        location_type: s.location_type ?? undefined,
      })),
  } as Merchant;
}
