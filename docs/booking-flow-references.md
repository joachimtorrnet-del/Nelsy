# Booking flow references: Planity and Fresha

Study done on 2026-11-28 to redesign the client booking flow of Nelsy
(`src/components/studio/BookingModal.tsx`). Only patterns were studied. No text,
image or branding from either product is used in Nelsy.

## How it was studied

Headless Chrome (puppeteer), public pages only, no account, at 390x844 and
1440x900. Each flow was walked from the salon page up to the point where the
product asks for an account, and stopped there.

| Product | Pages walked | How far |
| --- | --- | --- |
| Planity | two Paris nail salons | salon page, service list, calendar, time picked, account wall (not entered) |
| Fresha | one Marseille nail salon in full, one more for the salon page and service list | salon page, service list, service added, professional, date and time, empty day, next available day |

Neither site blocked automation. Limits of the study:

- Payment and confirmation screens sit behind an account on both products, so
  they were not seen. The notes on those two steps below come from general
  product knowledge, not from this session.
- On Fresha the last "Continue" after picking a time was not triggered by the
  script on desktop, so the screen right after it was not captured.
- The Fresha salon studied lists its times as one flat list, every 5 minutes.
  The grouping by part of the day that Fresha is often described with was not
  shown on that salon.
- Both sites were served in French. Labels are described here, not quoted.

Screenshots were kept in the session scratchpad (`booking/ref/`), not in the
repository, because they show third-party interfaces and real salons.

## Planity

**Service selection.** On the salon page itself. Services are grouped by
category. Desktop: one row per service with name, one line of description,
duration, price and a small dark button. Mobile: categories are accordions,
closed by default, so the page stays short.

**After choosing a service.** One page with three numbered sections stacked in
reading order: the chosen service, the date and time, then identification. A
finished section collapses to one line with an edit link, so the client always
sees what is already decided. That numbered stack is the step indicator: there
is no separate progress bar.

**Date and time, desktop.** A week of seven day columns. Each column has the
weekday and date as its header and the list of start times under it, as small
grey chips. Arrows move one week, and a "choose a date" button sits above the week
(not opened in this study). The
client sees a whole week of real availability at a glance and picks day and
time with a single click. Columns have different lengths, which makes busy and
quiet days obvious without any legend.

**Date and time, mobile.** The same data as one accordion per day. The first
day with availability is open and shows its times in a 3 column grid of chips.
Other days are collapsed. A button at the bottom loads more days.

**Summary.** No cart. The collapsed sections are the summary. Price and
duration stay visible in the first section.

**What is good.** Day and time in one step. Availability is shown, never
guessed. Very few taps. Every choice stays visible and editable.

**What is weaker.** On mobile the page gets long and the client scrolls through
days one by one. No total or next action stays in view.

## Fresha

**Service selection.** A full-screen flow that opens over the salon page, with
a back arrow top left and a close button top right. Services are large cards
(name, duration, two lines of description, price) with a round add button that
turns into a filled check when selected. The selected card gets a coloured
border.

**Step indicator.** Desktop: a breadcrumb of the four steps above a large
title, current step in black, the others grey. Mobile: no breadcrumb, only the
large title, which shrinks into the top bar when the page scrolls.

**Sticky summary.** Desktop: a card on the right that never moves, with the
salon, the chosen service with duration and price, the total, and the Continue
button pinned at the bottom of the card. The button is grey until the step is
complete. Mobile: a bar pinned to the bottom with the total and the duration on
the left and the Continue button on the right.

**Date and time.** A horizontal strip of day chips, each with the weekday, a
large day number and the month. The selected day is filled with the accent
colour. Days without availability are greyed out but still in the strip.
Arrows page the strip on desktop, and a calendar button sits next to it (not
opened in this study). The
times of the selected day are listed below as full-width rows.

**Empty state.** When the selected day has nothing: a small illustration, one
sentence saying there is nothing that day, the date of the next opening, and a
button that jumps straight to it. The client is never left at a dead end.

**What is good.** The date strip with greyed days. The empty state with a way
out. The summary and the next action always in view. Large tap targets.

**What is weaker.** A long flat list of times is slow to scan on a phone. The
total is repeated but the breakdown between what is paid now and what is paid
later only appears at the end.

## Confirmation (from product knowledge, not seen in this session)

Both products end on a quiet confirmation: a clear "it is booked" statement,
the appointment recap (service, date, time, place), and actions to add the
appointment to a calendar and to go back. Neither celebrates loudly.

## What Nelsy takes from this

| Pattern | Source | In Nelsy |
| --- | --- | --- |
| Day and time chosen in one step | both | one "date and time" step instead of two |
| Horizontal day strip, greyed days without availability | Fresha | 28 day strip in the pro's timezone, Today and Tomorrow labels, month label, arrows |
| Availability shown before the click | Planity | each day is checked through the existing slot lookup, cached per day, at most 4 requests at a time |
| Times as chips in a grid | Planity mobile | 3 columns on mobile, 4 on desktop, 48px high, grouped Morning, Afternoon, Evening so a long day stays easy to scan |
| Open on the first day that has a slot | Planity | the first day with an opening is selected when the dialog opens |
| Empty day with a jump to the next opening | Fresha | "No openings on this day" plus a "Next available" button |
| Summary always in view, action pinned | Fresha | desktop: right column with studio, service, date, time, price breakdown and the button. Mobile: bottom bar with the amount due today, the chosen time and the button |
| Decided things stay visible and editable | Planity | back keeps the day, the time and the typed details |
| Full-screen flow on mobile, close button, back arrow | Fresha | full-screen sheet on mobile, centered two column dialog on desktop |
| Step indicator | Fresha | "Step 1 of 3", a title and a segmented bar. Labels under the bar on desktop |
| Quiet confirmation with calendar and back actions | both | check mark, recap, Add to calendar (.ics), Back to the studio page |

Things Nelsy deliberately does differently:

- **No account.** Both references stop the client at an account wall. Nelsy
  asks for a name, an email and a phone number and nothing else.
- **No professional step.** A Nelsy page is one pro.
- **One service per booking.** No cart, so the summary is a recap and not a
  basket.
- **Price breakdown from the first step.** Deposit due today and what is left
  to pay at the studio are shown from the start, since deposits are central to
  Nelsy.
- **The template's colour.** The dialog uses the accent of the pro's template.
  When that accent is too light to read on white, it falls back to the
  template's dark page colour.
- **No ratings or reviews** in the summary.
