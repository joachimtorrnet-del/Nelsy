import UseCasePage from './UseCasePage';

export default function NailTechs() {
  return (
    <UseCasePage
      seo={{
        title: 'Nelsy for Nail Techs — Bookings, Deposits & More',
        description: 'The business platform built for nail techs. Take online bookings, collect deposits to prevent no-shows, get paid, and grow your clientele from Instagram.',
        canonical: '/use-cases/nail-techs',
      }}
      hero={{
        headline: 'The business platform built for nail techs',
        subheadline: 'Stop juggling DMs, spreadsheets, and scattered tools. Nelsy handles your bookings, deposits, and client growth so you can focus on your craft.',
      }}
      sections={[
        {
          heading: 'Get more nail clients',
          body: 'Your Nelsy booking page works as your link in bio, so every Instagram post and bio sends potential clients straight to a page where they can book instantly. No DM back-and-forth, no waiting. Instagram AutoDM captures booking intent the moment someone comments or asks how to book, turning casual followers into confirmed appointments before they scroll away.',
        },
        {
          heading: 'Stop losing money to no-shows',
          body: [
            'Require a deposit at booking time so clients have real skin in the game.',
            'Set your own deposit amount and cancellation policy on your terms.',
            'Automated appointment reminders go out before every booking.',
            'Clients who pay to hold a slot are far more likely to show up.',
          ],
        },
        {
          heading: 'Get paid for every service',
          body: 'Nelsy handles payments directly through your booking page, so you collect deposits and full payments without juggling Cash App, Venmo, or awkward in-person card readers. Every transaction is tracked automatically so your records stay clean.',
        },
        {
          heading: 'Turn Instagram followers into bookings',
          body: 'When someone comments on a nail set post asking about availability or price, AutoDM replies instantly with your booking link. You capture that intent while it is hot, instead of losing it to the next post in their feed. Your link in bio becomes a complete booking experience, not just a link to an Instagram or a website with no clear next step.',
        },
        {
          heading: 'Know your clients, grow your business',
          body: 'Every client who books through Nelsy becomes a contact in your CRM. See their history, the services they have had, and when they are due to rebook. Send follow-up emails to clients who have gone quiet and run email campaigns to your full list without needing a separate tool.',
        },
      ]}
      faq={[
        {
          q: 'Do I need a website to use Nelsy?',
          a: 'No. Nelsy gives you a professional booking page and link in bio out of the box. No website or tech skills needed.',
        },
        {
          q: 'Can I require deposits for all bookings?',
          a: 'Yes. You can require deposits for any or all services. You set the amount and clients pay before the booking is confirmed.',
        },
        {
          q: 'How does AutoDM work for nail techs?',
          a: 'When someone comments on your Instagram posts or sends a DM asking how to book, Nelsy automatically replies with your booking link. You capture that intent instead of losing it.',
        },
        {
          q: 'How long does it take to set up?',
          a: 'Most nail techs have their Nelsy page live and ready to share in under 15 minutes.',
        },
      ]}
      relatedFeatures={['bookings', 'deposits', 'payments', 'link-in-bio', 'instagram-autodm', 'crm']}
      relatedUseCases={['get-more-clients', 'reduce-no-shows', 'turn-followers-into-bookings']}
      relatedPostSlugs={[
        'how-to-get-more-nail-clients',
        'how-to-handle-nail-client-no-shows',
        'how-to-get-nail-clients-from-instagram',
      ]}
    />
  );
}
