import UseCasePage from './UseCasePage';

export default function ReduceNoShows() {
  return (
    <UseCasePage
      seo={{
        title: 'Reduce No-Shows for Your Beauty Business: Nelsy',
        description: 'Stop losing money to no-shows and last-minute cancellations. Nelsy deposits and automated reminders protect your time and income.',
        canonical: '/use-cases/reduce-no-shows',
      }}
      hero={{
        headline: 'Stop losing money to no-shows and last-minute cancellations',
        subheadline: 'A single no-show costs you more than just one appointment. Nelsy deposits and reminders protect your schedule and your income.',
      }}
      sections={[
        {
          heading: 'No-shows are the silent tax on beauty businesses',
          body: 'Every no-show is a blocked time slot you could have filled. Over a year, even one no-show per week adds up to significant lost income. The good news is that deposits are the most effective tool for reducing them.',
        },
        {
          heading: 'Deposits change client behaviour',
          body: [
            'Clients who pay a deposit have made a financial commitment.',
            'No-show rates drop significantly when a deposit is required.',
            'You keep the deposit if they cancel without enough notice.',
            'It filters out clients who were never serious to begin with.',
          ],
        },
        {
          heading: 'Automated reminders catch the rest',
          body: 'Some clients simply forget. Nelsy emails each client a reminder 24 hours before the appointment, which catches those accidental no-shows without any manual effort from you.',
        },
        {
          heading: 'Set a clear cancellation policy',
          body: 'Write your policy with the free cancellation policy generator and add it to your service descriptions, so clients see the rules on your booking page before they confirm. No awkward conversations after the fact.',
        },
      ]}
      faq={[
        {
          q: 'How much should I charge as a deposit?',
          a: 'Most beauty professionals charge between 20% and 50% of the service cost as a deposit. The right amount is enough to deter no-shows but not so high it deters genuine clients.',
        },
        {
          q: 'What happens if a client cancels with enough notice?',
          a: 'That depends on your own policy. Nelsy does not refund deposits automatically: if your policy says the deposit is returned, you refund it from your Stripe dashboard. If they cancel late or do not show, you keep it.',
        },
        {
          q: 'Will requiring deposits hurt my bookings?',
          a: 'In practice, deposits tend to attract more committed clients and filter out unreliable ones. Most professionals who switch to deposits report similar or better booking rates with far fewer no-shows.',
        },
        {
          q: 'How do automated reminders work?',
          a: 'Nelsy emails each client a reminder 24 hours before their appointment, with the date, time and your studio page link. It is on by default and you can switch it off in Settings. Reminders are sent by email only, not by text message.',
        },
      ]}
      relatedFeatures={['deposits', 'bookings', 'payments', 'crm']}
      relatedUseCases={['nail-techs', 'lash-techs', 'turn-followers-into-bookings']}
      relatedPostSlugs={[
        'how-to-handle-nail-client-no-shows',
        'nail-tech-deposit-policy',
        'how-much-deposit-should-nail-tech-charge',
      ]}
    />
  );
}
