-- Private note a pro keeps on an appointment (allergies, shape, colour, "always late"...).
-- Its own table, not a column on bookings: bookings has a SELECT policy for clients by email,
-- and a pro's note must never be readable by the client.
--
-- Apply with: npx supabase db query --remote -f supabase/migrations/20261202_01_booking_notes.sql --yes

CREATE TABLE IF NOT EXISTS public.booking_notes (
  booking_id  uuid PRIMARY KEY REFERENCES public.bookings(id) ON DELETE CASCADE,
  profile_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  note        text NOT NULL CHECK (char_length(note) BETWEEN 1 AND 2000),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_booking_notes_profile ON public.booking_notes (profile_id);

ALTER TABLE public.booking_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS booking_notes_owner_all ON public.booking_notes;
CREATE POLICY booking_notes_owner_all ON public.booking_notes
  FOR ALL TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (
    profile_id = auth.uid()
    AND EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.profile_id = auth.uid())
  );

REVOKE ALL ON public.booking_notes FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.booking_notes TO authenticated;

-- Rollback: DROP TABLE IF EXISTS public.booking_notes;
