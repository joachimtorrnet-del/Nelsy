import UseCasePage from './UseCasePage';

export default function GrowYourBeautyBusiness() {
  return (
    <UseCasePage
      seo={{
        title: 'Grow Your Beauty Business with Nelsy',
        description: 'Everything you need to grow a sustainable beauty business. Bookings, marketing, client management and analytics in one platform.',
        canonical: '/use-cases/grow-your-beauty-business',
      }}
      hero={{
        headline: 'Everything you need to grow a sustainable beauty business',
        subheadline: 'Stop juggling six tools that do not talk to each other. Nelsy brings your bookings, marketing, clients, and insights together in one place.',
      }}
      sections={[
        {
          heading: 'Growth requires a system, not just hustle',
          body: 'Most beauty professionals work incredibly hard but still feel like they are not growing fast enough. The problem is usually not effort. It is fragmentation: bookings in one app, clients in a spreadsheet, Instagram strategy on the fly, payments in another system. Nelsy replaces the patchwork.',
        },
        {
          heading: 'The four pillars of a growing beauty business',
          body: [
            'Get clients: a professional booking page, link in bio, and Instagram AutoDM that converts followers into appointments.',
            'Retain clients: CRM that tracks your clients, their history, and when they are due for a rebook.',
            'Get paid reliably: deposits, online payments, and a clear cancellation policy that protects your income.',
            'Understand what is working: analytics that show you where your bookings come from and which services are driving growth.',
          ],
        },
        {
          heading: 'See your business clearly',
          body: 'Most beauty professionals run their business blind. They work hard but do not know which Instagram posts drive the most bookings, which services are most profitable, or how client retention has changed. Nelsy analytics give you visibility so you can make better decisions.',
        },
        {
          heading: 'Spend less time on admin',
          body: 'Every hour spent on manual booking management, chasing payments, or sending reminders is an hour not spent on clients or rest. Nelsy automates the admin layer so your energy goes where it matters.',
        },
      ]}
      faq={[
        {
          q: 'Is Nelsy just for booking, or does it do marketing too?',
          a: 'Nelsy covers the full stack: booking, payments, deposits, link in bio, Instagram AutoDM, email, audience capture, CRM, and analytics. It is designed as an all-in-one growth platform, not just a scheduling tool.',
        },
        {
          q: 'Can I migrate from another booking app to Nelsy?',
          a: 'Yes. Nelsy is designed to be easy to set up and most professionals have their page live within minutes. You can start fresh or bring your existing client list with you.',
        },
        {
          q: 'How does Nelsy compare to using multiple separate tools?',
          a: 'Individual tools each do one thing. The problem is they do not share data and switching between them creates friction and errors. Nelsy keeps everything connected, so a booking automatically updates your CRM, triggers reminders, and shows up in your analytics.',
        },
      ]}
      relatedFeatures={['analytics', 'crm', 'bookings', 'email-newsletters', 'instagram-autodm']}
      relatedUseCases={['get-more-clients', 'reduce-no-shows', 'turn-followers-into-bookings', 'manage-clients']}
      relatedPostSlugs={[
        'how-to-get-more-nail-clients',
        'best-business-apps-nail-techs',
        'nail-tech-revenue-goals',
      ]}
    />
  );
}
