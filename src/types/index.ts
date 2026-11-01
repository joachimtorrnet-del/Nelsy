export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  deposit: number;
  category?: string;
  image_url?: string;
  is_featured?: boolean;
  active?: boolean;
  studio_placement?: 'individual' | 'collection' | 'both';
  card_style?: 'button' | 'callout' | 'preview';
  card_subtitle?: string;
  card_cta_text?: string;
}

export interface CollectionSubcategory {
  id: string;
  name: string;
  display_order: number;
}

export interface CollectionMember {
  service: Service;
  subcategory_id: string | null;
  display_order: number;
}

export interface ServiceCollection {
  id: string;
  profile_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  active: boolean;
  subcategories: CollectionSubcategory[];
  members: CollectionMember[];
}

export interface Merchant {
  id: string;
  slug: string;
  salon_name: string;
  name: string;
  bio: string;
  logo_url?: string;
  cover_url?: string;
  specialty?: string;
  location?: string;
  instagram?: string;
  tiktok?: string;
  pinterest_url?: string;
  website_url?: string;
  rating?: number;
  review_count?: number;
  services: Service[];
  collections?: ServiceCollection[];
  theme_preset?: string;
  color_accent?: string;
  timezone?: string;
}

export interface Booking {
  id: string;
  merchant_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service: Service;
  date: string;
  time: string;
  deposit: number;
  status: 'pending' | 'paid' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface KPI {
  revenue: number;
  revenue_trend: number;
  bookings_total: number;
  bookings_confirmed: number;
  bookings_pending: number;
  occupation_rate: number;
  available_balance: number;
}

export interface DayRevenue {
  date: string;
  revenue: number;
  bookings: number;
}
