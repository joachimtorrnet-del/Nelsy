import { useEffect, useState } from 'react';
import {
  getGalleryPhotos,
  getApprovedTestimonials,
  getBusinessHours,
  getPublicCollections,
} from '@/lib/supabase-queries';
import type { GalleryPhoto, Testimonial, BusinessHour } from '@/lib/supabase-queries';
import type { ServiceCollection } from '@/types';

interface UseStudioPublicResult {
  photos: GalleryPhoto[];
  testimonials: Testimonial[];
  hours: BusinessHour[];
  collections: ServiceCollection[];
}

export function useStudioPublic(profileId: string): UseStudioPublicResult {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [collections, setCollections] = useState<ServiceCollection[]>([]);

  useEffect(() => {
    if (!profileId) return;
    void Promise.all([
      getGalleryPhotos(profileId).then(setPhotos),
      getApprovedTestimonials(profileId).then(setTestimonials),
      getBusinessHours(profileId).then(setHours),
      getPublicCollections(profileId).then(setCollections).catch(() => setCollections([])),
    ]);
  }, [profileId]);

  return { photos, testimonials, hours, collections };
}
