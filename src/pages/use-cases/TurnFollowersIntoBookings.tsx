import UseCasePage from './UseCasePage';

export default function TurnFollowersIntoBookings() {
  return (
    <UseCasePage
      seo={{
        title: 'Turn Instagram Followers Into Bookings — Nelsy',
        description: 'Turn your Instagram followers into paying clients. Nelsy AutoDM and link in bio convert social media attention into real bookings.',
        canonical: '/use-cases/turn-followers-into-bookings',
      }}
      hero={{
        headline: 'Turn your Instagram followers into paying clients',
        subheadline: 'You have built an audience. Now convert that attention into appointments and revenue with tools designed for beauty professionals.',
      }}
      sections={[
        {
          heading: 'The gap between followers and clients',
          body: 'It is possible to have thousands of followers and still struggle to fill your appointment book. Followers see your work, want to book, then hit friction: where is the booking link? Which services do you offer? How much does it cost? Every unanswered question costs you a booking.',
        },
        {
          heading: 'AutoDM captures booking intent in real time',
          body: [
            'Someone comments "I love this, how do I book?" on your reel.',
            'Nelsy automatically sends them your booking link.',
            'They book before they scroll to the next post.',
            'You wake up to new bookings without lifting a finger.',
          ],
        },
        {
          heading: 'Link in bio as a conversion tool',
          body: 'Your link in bio is the one place Instagram lets you send traffic. Nelsy turns it into a complete booking funnel: your services, pricing, availability, and a booking form all in one place. Not just a list of links.',
        },
        {
          heading: 'Own your audience, do not just rent it',
          body: 'Instagram reach fluctuates. Algorithms change. Accounts get restricted. Nelsy audience capture helps you collect client emails and contact details so you own a direct line to your audience regardless of what any platform does.',
        },
      ]}
      faq={[
        {
          q: 'How does AutoDM work exactly?',
          a: 'You set up triggers in Nelsy. When someone uses a specific keyword in a comment or DM (like "book" or "how to book"), Nelsy automatically sends them your booking link. You can customise the message.',
        },
        {
          q: 'Do I need a lot of followers for this to work?',
          a: 'No. Even a small, engaged following converts well when the booking process is smooth. The goal is to remove friction between seeing your work and booking an appointment.',
        },
        {
          q: 'What is the difference between link in bio and just a Linktree?',
          a: 'A Linktree is a list of links. Nelsy link in bio is a complete booking and business page with your services, prices, and a booking form. It is designed to convert visitors into clients, not just send them somewhere else.',
        },
      ]}
      relatedFeatures={['instagram-autodm', 'link-in-bio', 'bookings', 'audience-capture']}
      relatedUseCases={['get-more-clients', 'grow-your-audience', 'nail-techs']}
      relatedPostSlugs={[
        'how-to-get-nail-clients-from-instagram',
        'how-to-grow-nail-tech-instagram',
        'how-to-move-from-instagram-dms-to-online-booking',
      ]}
    />
  );
}
