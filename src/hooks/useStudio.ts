import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { DbProfile, DbService } from '@/lib/supabase';
import type { Merchant, Service } from '@/types';
import { getMerchantBySlug } from '@/lib/mockData';

// ----------------------------------------------------------------
// Adapters: Supabase DB rows → App types
// ----------------------------------------------------------------

function dbServiceToService(s: DbService): Service {
  return {
    id: s.id,
    name: s.name,
    description: s.description ?? '',
    price: Number(s.price_total),
    duration: s.duration_minutes,
    deposit: Number(s.deposit_amount),
    category: s.category ?? undefined,
  };
}

function dbProfileToMerchant(profile: DbProfile, services: DbService[]): Merchant {
  return {
    id: profile.id,
    slug: profile.slug,
    salon_name: profile.salon_name,
    name: profile.full_name,
    bio: profile.bio ?? '',
    logo_url: profile.logo_url ?? undefined,
    instagram: profile.instagram_url
      ? profile.instagram_url.replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
      : undefined,
    tiktok: profile.tiktok_url ?? undefined,
    color_accent: profile.color_accent ?? undefined,
    services: services.map(dbServiceToService),
  };
}

// ----------------------------------------------------------------
// Hook
// ----------------------------------------------------------------

interface UseStudioResult {
  merchant: Merchant | null;
  loading: boolean;
  error: string | null;
  usingMockData: boolean;
}

export function useStudio(slug: string): UseStudioResult {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchStudio() {
      setLoading(true);
      setError(null);

      // Capture module-level var in local const so TypeScript can narrow it
      const client = supabase;

      // --- Fallback to mock data when Supabase is not configured ---
      if (!isSupabaseConfigured || !client) {
        const mock = getMerchantBySlug(slug);
        if (!cancelled) {
          setMerchant(mock ?? null);
          setUsingMockData(true);
          setLoading(false);
        }
        return;
      }

      try {
        // Fetch profile by slug
        const { data: profileData, error: profileError } = await client
          .from('profiles')
          .select('*')
          .eq('slug', slug)
          .single();

        if (profileError) {
          // Fall back to mock data on error (404, network, etc.)
          const mock = getMerchantBySlug(slug);
          if (!cancelled) {
            setMerchant(mock ?? null);
            setUsingMockData(true);
            setLoading(false);
          }
          return;
        }

        // Fetch active services
        const { data: servicesData, error: servicesError } = await client
          .from('services')
          .select('*')
          .eq('profile_id', profileData.id)
          .eq('active', true)
          .order('display_order', { ascending: true });

        if (servicesError) throw servicesError;

        if (!cancelled) {
          setMerchant(dbProfileToMerchant(profileData, servicesData ?? []));
          setUsingMockData(false);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur inconnue');
          // Still try mock as final fallback
          const mock = getMerchantBySlug(slug);
          setMerchant(mock ?? null);
          setUsingMockData(true);
          setLoading(false);
        }
      }
    }

    void fetchStudio();
    return () => { cancelled = true; };
  }, [slug]);

  return { merchant, loading, error, usingMockData };
}
