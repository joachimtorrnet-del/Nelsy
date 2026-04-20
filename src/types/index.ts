export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  deposit: number;
  category?: string;
}

export interface Merchant {
  id: string;
  slug: string;
  salon_name: string;
  name: string;
  bio: string;
  logo_url?: string;
  instagram?: string;
  tiktok?: string;
  rating?: number;
  review_count?: number;
  services: Service[];
  theme?: 'light' | 'dark';
  color_accent?: string;
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
