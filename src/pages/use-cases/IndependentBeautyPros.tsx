import UseCasePage from './UseCasePage';

export default function IndependentBeautyPros() {
  return (
    <UseCasePage
      seo={{
        title: 'Booking App for Independent Beauty Pros: Deposits and Payments',
        description: 'Nelsy is the booking page for independent nail techs, lash and brow artists, makeup artists and estheticians: online booking, deposits, pay on arrival and 0% commission.',
        canonical: '/use-cases/independent-beauty-pros',
      }}
      hero={{
        headline: 'Get booked and paid, without the DM back-and-forth',
        subheadline: 'For independent nail techs, lash and brow artists, makeup artists, hairstylists and estheticians. Clients book from your link in bio, and you choose how they pay.',
      }}
      sections={[
        {
          heading: 'Clients book you 24/7',
          body: 'Your services, prices and availability are on one page you share in your Instagram and TikTok bio. Clients pick a slot and book in a minute, with no messages back and forth.',
        },
        {
          heading: 'You choose how each service is paid',
          body: [
            'Pay on arrival: the booking is confirmed straight away and the client pays at the appointment.',
            'Deposit: the client pays part online to hold the slot, the rest at the studio.',
            'Full payment upfront: ideal for long sets and special occasions.',
            'Cash or card at the studio: record it in Nelsy so your income stays in one place.',
          ],
        },
        {
          heading: 'Fewer no-shows',
          body: 'Deposits make clients commit, and confirmations go out automatically to you and your client. Set your own cancellation policy and keep your calendar protected.',
        },
        {
          heading: 'Your brand, not a marketplace listing',
          body: 'Your page uses your photos, colors and templates. Clients book with you, not with an app that shows them other pros, and Nelsy takes 0% commission on your bookings.',
        },
        {
          heading: 'Built for your craft',
          body: 'Nail techs, lash artists, brow artists, makeup artists, hairstylists and estheticians use the same booking page, with services, add-ons and durations set the way your work actually runs.',
        },
      ]}
      faq={[
        { q: 'Can clients pay at the appointment instead of online?', a: 'Yes. For each service you choose pay on arrival, a deposit, or full payment upfront. Pay-on-arrival bookings are confirmed straight away.' },
        { q: 'Does Nelsy take a commission on my bookings?', a: 'No. Nelsy charges 0% commission. Standard payment processing fees apply to online payments.' },
        { q: 'Do I need a website?', a: 'No. Your Nelsy page is your booking site and your link in bio.' },
        { q: 'Can I record cash payments?', a: 'Yes. Record cash or card payments taken at the studio so your income and client history stay complete.' },
      ]}
      relatedFeatures={['bookings', 'deposits', 'payments', 'link-in-bio', 'crm', 'analytics']}
      relatedUseCases={['nail-techs', 'lash-techs', 'reduce-no-shows', 'beauty-creators']}
      relatedPostSlugs={['how-to-get-more-nail-clients', 'how-much-deposit-should-nail-tech-charge', 'how-to-handle-nail-client-no-shows']}
    />
  );
}
