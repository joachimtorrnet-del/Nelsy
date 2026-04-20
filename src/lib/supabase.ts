import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

// ============================================================
// Row types (what the DB returns on SELECT)
// Defined as plain interfaces to avoid circular self-references.
// ============================================================

export interface DbProfileRow {
  id: string;
  email: string;
  full_name: string;
  salon_name: string;
  slug: string;
  bio: string | null;
  logo_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  color_accent: string | null;
  stripe_account_id: string | null;
  stripe_customer_id: string | null;
  stripe_onboarding_complete: boolean;
  subscription_status: 'trial' | 'active' | 'cancelled' | 'trialing' | 'past_due' | 'inactive';
  notification_preferences: {
    new_bookings: boolean;
    purchase_confirmations: boolean;
    reminders: boolean;
  } | null;
  created_at: string;
  updated_at: string;
}

export interface DbServiceRow {
  id: string;
  profile_id: string;
  name: string;
  description: string | null;
  category: string | null;
  duration_minutes: number;
  price_total: number;
  deposit_amount: number;
  display_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface DbBookingRow {
  id: string;
  profile_id: string;
  service_id: string | null;
  booking_datetime: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'no_show' | 'cancelled';
  price_total: number;
  deposit_paid: number;
  nelsy_fee: number;
  stripe_payment_intent_id: string | null;
  stripe_fee_estimated: number;
  net_to_pro: number;
  created_at: string;
  paid_at: string | null;
  completed_at: string | null;
}

export interface DbAvailabilityRow {
  id: string;
  profile_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  break_duration_minutes: number;
  active: boolean;
  created_at: string;
}

export interface DbClosedDateRow {
  id: string;
  profile_id: string;
  closed_date: string;
  reason: string | null;
  created_at: string;
}

export interface DbTransactionRow {
  id: string;
  profile_id: string;
  booking_id: string | null;
  type: 'deposit' | 'remaining_payment' | 'refund' | 'payout';
  amount_gross: number;
  amount_net: number;
  stripe_transfer_id: string | null;
  created_at: string;
}

// Insert type for bookings (used in bookings.ts)
export interface DbBookingInsert {
  profile_id: string;
  service_id?: string | null;
  booking_datetime: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  status?: 'pending' | 'confirmed' | 'paid' | 'completed' | 'no_show' | 'cancelled';
  price_total: number;
  deposit_paid: number;
  nelsy_fee?: number;
  stripe_payment_intent_id?: string | null;
  stripe_fee_estimated?: number;
  net_to_pro?: number;
  paid_at?: string | null;
  completed_at?: string | null;
}

// ============================================================
// Database schema — explicit Insert/Update types to avoid
// circular references that collapse to 'never'
// ============================================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: DbProfileRow;
        Insert: {
          id: string;
          email: string;
          full_name: string;
          salon_name: string;
          slug: string;
          bio?: string | null;
          logo_url?: string | null;
          instagram_url?: string | null;
          stripe_account_id?: string | null;
          stripe_onboarding_complete?: boolean;
          subscription_status?: 'trial' | 'active' | 'cancelled';
        };
        Update: {
          email?: string;
          full_name?: string;
          salon_name?: string;
          slug?: string;
          bio?: string | null;
          logo_url?: string | null;
          instagram_url?: string | null;
          stripe_account_id?: string | null;
          stripe_onboarding_complete?: boolean;
          subscription_status?: 'trial' | 'active' | 'cancelled';
        };
        Relationships: [];
      };
      services: {
        Row: DbServiceRow;
        Insert: {
          profile_id: string;
          name: string;
          description?: string | null;
          category?: string | null;
          duration_minutes: number;
          price_total: number;
          deposit_amount: number;
          display_order?: number;
          active?: boolean;
        };
        Update: {
          name?: string;
          description?: string | null;
          category?: string | null;
          duration_minutes?: number;
          price_total?: number;
          deposit_amount?: number;
          display_order?: number;
          active?: boolean;
        };
        Relationships: [];
      };
      bookings: {
        Row: DbBookingRow;
        Insert: DbBookingInsert;
        Update: Partial<DbBookingInsert>;
        Relationships: [];
      };
      availabilities: {
        Row: DbAvailabilityRow;
        Insert: {
          profile_id: string;
          day_of_week: number;
          start_time: string;
          end_time: string;
          break_duration_minutes?: number;
          active?: boolean;
        };
        Update: {
          day_of_week?: number;
          start_time?: string;
          end_time?: string;
          break_duration_minutes?: number;
          active?: boolean;
        };
        Relationships: [];
      };
      closed_dates: {
        Row: DbClosedDateRow;
        Insert: {
          profile_id: string;
          closed_date: string;
          reason?: string | null;
        };
        Update: { reason?: string | null };
        Relationships: [];
      };
      transactions: {
        Row: DbTransactionRow;
        Insert: {
          profile_id: string;
          booking_id?: string | null;
          type: 'deposit' | 'remaining_payment' | 'refund' | 'payout';
          amount_gross: number;
          amount_net: number;
          stripe_transfer_id?: string | null;
        };
        Update: {
          amount_gross?: number;
          amount_net?: number;
          stripe_transfer_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

// Convenience aliases
export type DbProfile = DbProfileRow;
export type DbService = DbServiceRow;
export type DbBooking = DbBookingRow;
export type DbAvailability = DbAvailabilityRow;
// Use untyped client — Supabase CLI-generated types are the proper way to
// get full end-to-end type safety. For manual types we rely on explicit casts.
export type NelsupabaseClient = SupabaseClient;

// ============================================================
// Client — optional (falls back to mock data when env vars missing)
// ============================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.length > 0 &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.length > 0;

export const supabase: NelsupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        storageKey: 'nelsy-auth-token',
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
      },
    })
  : null;
