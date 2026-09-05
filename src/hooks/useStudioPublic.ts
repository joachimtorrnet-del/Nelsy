import { useEffect, useState } from 'react';
import {
  getGalleryPhotos,
  getApprovedTestimonials,
  getBusinessHours,
} from '@/lib/supabase-queries';
import type { GalleryPhoto, Testimonial, BusinessHour } from '@/lib/supabase-queries';

interface UseStudioPublicResult {
  photos: GalleryPhoto[];
  testimonials: Testimonial[];
  hours: BusinessHour[];
}

export function useStudioPublic(profileId: string): UseStudioPublicResult {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [hours, setHours] = useState<BusinessHour[]>([]);

  useEffect(() => {
    if (!profileId) return;
    void Promise.all([
      getGalleryPhotos(profileId).then(setPhotos),
      getApprovedTestimonials(profileId).then(setTestimonials),
      getBusinessHours(profileId).then(setHours),
    ]);
  }, [profileId]);

  return { photos, testimonials, hours };
}
