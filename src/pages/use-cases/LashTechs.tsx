import UseCasePage from './UseCasePage';

export default function LashTechs() {
  return (
    <UseCasePage
      seo={{
        title: 'Nelsy for Lash Techs: Online Booking & Client Management',
        description: 'Run your lash business without the admin headache. Nelsy handles online booking, deposits for lash fills, email reminders 24 hours before each appointment, and more.',
        canonical: '/use-cases/lash-techs',
      }}
      hero={{
        headline: 'Run your lash business without the admin headache',
        subheadline: 'Manage your appointment book, collect deposits, and keep clients coming back, all from one platform built for beauty professionals.',
      }}
      sections={[
        {
          heading: 'Fill your lash calendar consistently',
          body: 'Lash clients need regular fills to keep their sets looking full. Nelsy makes rebooking effortless by letting clients book online any time, see your real-time availability, and lock in their next fill appointment before they leave the chair. New clients find you through your Instagram link in bio and can book immediately, without needing to wait for a DM reply.',
        },
        {
          heading: 'Reduce lash fill no-shows',
          body: [
            'A lash appointment is typically 90 minutes or longer. An empty slot costs you real income.',
            'Deposits at booking time mean clients are financially committed before they show up.',
            'Set different deposit amounts for full sets versus fill appointments.',
            'Clients get an email reminder 24 hours before every appointment so they do not forget.',
          ],
        },
        {
          heading: 'Build a loyal lash clientele',
          body: 'Repeat business is the foundation of a lash business. Every client who books lands in your Nelsy client list with their past appointments, so you can see who has not been back for a fill and reach out before they book elsewhere.',
        },
        {
          heading: 'Manage client communication without the chaos',
          body: 'Stop tracking conversations across DMs, texts, and emails. Clients get a booking confirmation by email, then an email reminder 24 hours before the appointment, so you are not manually following up with every client.',
        },
      ]}
      faq={[
        {
          q: 'Can I set different deposit amounts for lash fills vs new sets?',
          a: 'Yes. You can configure deposit amounts per service, so fills and new sets can have different requirements.',
        },
        {
          q: 'How do automated reminders work?',
          a: 'Nelsy emails each client a reminder 24 hours before their appointment, with the date, time and your studio page link. It is on by default and you can switch it off in Settings. Reminders are sent by email only, not by text message.',
        },
        {
          q: 'Can I manage a waitlist for cancellations?',
          a: 'There is no automatic waitlist yet. Every client who books is saved in your client list with their email and phone, so you can contact them yourself when a slot opens up.',
        },
      ]}
      relatedFeatures={['bookings', 'deposits', 'crm', 'email-newsletters', 'payments']}
      relatedUseCases={['reduce-no-shows', 'nail-techs', 'turn-followers-into-bookings']}
      relatedPostSlugs={[
        'how-to-get-more-nail-client-rebookings',
        'how-to-handle-nail-client-no-shows',
        'nail-tech-deposit-policy',
      ]}
    />
  );
}
