import UseCasePage from './UseCasePage';

export default function GetMoreClients() {
  return (
    <UseCasePage
      seo={{
        title: 'How to Get More Beauty Clients with Nelsy',
        description: 'Get more beauty clients without paid ads. Use your Instagram following, link in bio, and AutoDM to turn followers into bookings.',
        canonical: '/use-cases/get-more-clients',
      }}
      hero={{
        headline: 'Get more beauty clients without paid ads',
        subheadline: 'Your next clients are already following you on Instagram. Nelsy helps you convert that attention into actual bookings.',
      }}
      sections={[
        {
          heading: 'Your followers already want to book you',
          body: 'Most beauty professionals with a solid Instagram following are leaving bookings on the table. Followers who love your work do not book because the path from discovery to appointment is unclear or too many steps.',
        },
        {
          heading: 'Link in bio that actually converts',
          body: [
            'One branded page with all your services and booking options.',
            'No sending followers to a plain Linktree with dead ends.',
            'Looks professional and matches your brand.',
            'Works on any device, loads fast.',
          ],
        },
        {
          heading: 'AutoDM captures clients at the moment of intent',
          body: 'When someone comments "How do I book?" or DMs asking about availability, Nelsy automatically replies with your booking link. You capture that intent in real time instead of responding hours later when they have moved on.',
        },
        {
          heading: 'Build an audience you own',
          body: 'Social media reach is rented. Nelsy helps you capture client emails and contacts so you can reach your audience directly through email, without depending on what any algorithm decides to show.',
        },
      ]}
      faq={[
        {
          q: 'Do I need a large Instagram following to benefit?',
          a: 'No. Even with a small but engaged following, converting even a fraction of your audience into regular clients can meaningfully grow your business. Quality of engagement matters more than follower count.',
        },
        {
          q: 'How does AutoDM help me get more clients?',
          a: 'AutoDM automatically responds to comments and DMs with your booking link. When someone expresses interest, Nelsy captures that immediately rather than letting it slip through the cracks.',
        },
        {
          q: 'What is audience capture and why does it matter?',
          a: 'Audience capture lets you collect client emails and contacts, so you can reach them directly without relying on social media algorithms. It protects your business from platform changes.',
        },
      ]}
      relatedFeatures={['link-in-bio', 'instagram-autodm', 'bookings', 'audience-capture']}
      relatedUseCases={['nail-techs', 'lash-techs', 'turn-followers-into-bookings', 'grow-your-audience']}
      relatedPostSlugs={[
        'how-to-get-more-nail-clients',
        'how-to-get-nail-clients-from-instagram',
        'how-to-get-first-10-nail-clients',
      ]}
    />
  );
}
