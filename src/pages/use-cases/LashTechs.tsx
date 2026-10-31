import UseCasePage from './UseCasePage';

export default function LashTechs() {
  return (
    <UseCasePage
      seo={{
        title: 'Nelsy for Lash Techs — Online Booking & Client Management',
        description: 'Run your lash business without the admin headache. Nelsy handles online booking, deposits for lash fills, client reminders, and more.',
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
            'Automated reminders go out before every appointment so clients do not forget.',
          ],
        },
        {
          heading: 'Build a loyal lash clientele',
          body: 'Repeat business is the foundation of a lash business. Nelsy keeps a full history for every client, including their lash style preferences, allergies, and past appointments. You can see which clients are overdue for a fill and send targeted follow-up emails to bring them back before they book elsewhere.',
        },
        {
          heading: 'Manage client communication without the chaos',
          body: 'Stop tracking conversations across DMs, texts, and emails. Nelsy sends automated appointment reminders so you are not manually following up with every client. When you want to reach your full list, email newsletters let you announce promotions or fill last-minute openings without posting to Instagram and hoping the algorithm shows it.',
        },
      ]}
      faq={[
        {
          q: 'Can I set different deposit amounts for lash fills vs new sets?',
          a: 'Yes. You can configure deposit amounts per service, so fills and new sets can have different requirements.',
        },
        {
          q: 'How do automated reminders work?',
          a: 'Nelsy sends reminders to clients before their appointment, reducing no-shows without any manual effort from you.',
        },
        {
          q: 'Can I manage a waitlist for cancellations?',
          a: 'You can capture client contact details through audience capture, making it easy to message clients when a slot opens up.',
        },
      ]}
      relatedFeatures={['bookings', 'deposits', 'crm', 'email-newsletters', 'payments']}
      relatedUseCases={['reduce-no-shows', 'manage-clients', 'get-more-clients']}
      relatedPostSlugs={[
        'how-to-get-more-nail-client-rebookings',
        'how-to-handle-nail-client-no-shows',
        'nail-tech-deposit-policy',
      ]}
    />
  );
}
