-- Prevent double-booking the same slot for a given salon.
-- Without this constraint, two concurrent requests could both pass the
-- SELECT availability check and both INSERT, resulting in two bookings
-- for the same time slot.
-- Only pending/confirmed/paid bookings block a slot; cancelled ones are excluded.

CREATE UNIQUE INDEX IF NOT EXISTS bookings_unique_active_slot
  ON bookings (profile_id, booking_datetime)
  WHERE status NOT IN ('cancelled', 'no_show');
