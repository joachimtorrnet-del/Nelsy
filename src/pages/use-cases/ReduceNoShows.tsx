import UseCasePage from './UseCasePage';

export default function ReduceNoShows() {
  return (
    <UseCasePage
      seo={{
        title: 'Reduce No-Shows for Your Beauty Business — Nelsy',
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
          body: 'Some clients simply forget. Automated appointment reminders sent before the appointment reduce those accidental no-shows without requiring any manual effort from you.',
        },
        {
          heading: 'Set a clear cancellation policy',
          body: 'Nelsy helps you communicate your cancellation policy at booking time, so clients know the rules before they confirm. No awkward conversations after the fact.',
        },
      ]}
      faq={[
        {
          q: 'How much should I charge as a deposit?',
          a: 'Most beauty professionals charge between 20% and 50% of the service cost as a deposit. The right amount is enough to deter no-shows but not so high it deters genuine clients.',
        },
        {
          q: 'What happens if a client cancels with enough notice?',
          a: 'You can configure your cancellation policy in Nelsy. If a client cancels within your refund window, the deposit can be returned. If they cancel late or do not show, you keep it.',
        },
        {
          q: 'Will requiring deposits hurt my bookings?',
          a: 'In practice, deposits tend to attract more committed clients and filter out unreliable ones. Most professionals who switch to deposits report similar or better booking rates with far fewer no-shows.',
        },
        {
          q: 'How do automated reminders work?',
          a: 'Nelsy sends reminders to clients before their appointment automatically. You set the timing and the message is sent without any manual action from you.',
        },
      ]}
      relatedFeatures={['deposits', 'bookings', 'payments', 'crm']}
      relatedUseCases={['nail-techs', 'lash-techs', 'get-more-clients']}
      relatedPostSlugs={[
        'how-to-handle-nail-client-no-shows',
        'nail-tech-deposit-policy',
        'how-much-deposit-should-nail-tech-charge',
      ]}
    />
  );
}
