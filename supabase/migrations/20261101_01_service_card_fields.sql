-- Add card presentation fields to services.
-- card_style: one of 'button' | 'callout' | 'preview'. Defaults to 'callout'.
-- card_subtitle: optional short tagline shown below the title on the card.
-- card_cta_text: override for the booking CTA button label. NULL means "Book now".
-- All three are additive and nullable / have defaults to avoid breaking existing rows.

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS card_style    TEXT    NOT NULL DEFAULT 'callout'
    CHECK (card_style IN ('button', 'callout', 'preview')),
  ADD COLUMN IF NOT EXISTS card_subtitle TEXT,
  ADD COLUMN IF NOT EXISTS card_cta_text TEXT;
