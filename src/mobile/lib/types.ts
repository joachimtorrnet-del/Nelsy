import type { DbBooking } from '@/lib/supabase';
import type { Product } from '@/lib/products';
import type { KitItem } from '@/lib/kit';
import type { Merchant, Service } from '@/types';

export type BookingStatus = DbBooking['status'];

export interface ProBooking {
  id: string;
  datetime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string | null;
  serviceName: string;
  price: number;
  depositPaid: number;
  duration: number;
  status: BookingStatus;
  /** services.location_type = 'online' (Creator plan video session). */
  online: boolean;
  /** Owner-only meeting link from service_video_links, when set. */
  videoUrl: string | null;
}

export type ProService = Service & { active: boolean; online: boolean };

/** notification_preferences on profiles. Every key is optional: absent means on. */
export interface NotificationPrefs {
  client_reminders?: boolean;
  push_new_booking?: boolean;
  push_payment?: boolean;
  push_cancellation?: boolean;
  push_lead?: boolean;
  [key: string]: unknown;
}

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
  /** End of the trial or of the current billing period, when known. */
  planRenewsAt: string | null;
  stripeConnected: boolean;
  /** profiles.timezone: every time in the app is shown in it. */
  timezone: string;
  notificationPrefs: NotificationPrefs;
  merchant: Merchant;
  services: ProService[];
  bookings: ProBooking[];
  /** Digital products and free resources (Creator plan). */
  products: Product[];
  kit: KitItem[];
  totalRevenue: number;
  balance: number;
  pageViews28: number | null;
}
