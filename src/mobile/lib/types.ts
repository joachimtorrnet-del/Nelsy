import type { DbBooking } from '@/lib/supabase';
import type { Merchant, Service } from '@/types';

export type BookingStatus = DbBooking['status'];

export interface ProBooking {
  id: string;
  datetime: string;
  clientName: string;
  serviceName: string;
  price: number;
  depositPaid: number;
  duration: number;
  status: BookingStatus;
}

export type ProService = Service & { active: boolean };

/** Everything the pro screens render, from Supabase or from the demo persona. */
export interface ProSnapshot {
  mode: 'live' | 'demo';
  profileId: string;
  email: string;
  fullName: string;
  salonName: string;
  slug: string;
  avatarUrl: string | null;
  currency: string;
  plan: string | null;
  subscriptionStatus: string | null;
  merchant: Merchant;
  services: ProService[];
  bookings: ProBooking[];
  totalRevenue: number;
  balance: number;
  pageViews28: number | null;
}
