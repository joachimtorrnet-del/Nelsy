import UseCasePage from './UseCasePage';

export default function BeautyCreators() {
  return (
    <UseCasePage
      seo={{
        title: 'Nelsy for Beauty Creators: Sell Courses, Guides and Bookings',
        description: 'The link in bio store for beauty creators: sell courses, digital products, coaching and memberships next to your bookings, with 0% Nelsy commission.',
        canonical: '/use-cases/beauty-creators',
      }}
      hero={{
        headline: 'Turn your beauty expertise into income',
        subheadline: 'Your followers already ask how you do it. Sell your courses, guides, coaching and memberships from the same link in bio your clients use to book you.',
      }}
      sections={[
        {
          heading: 'Sell what you know, not only your chair time',
          body: [
            'Courses and workshops: a gel-x class, a lash mapping masterclass, a bridal makeup workshop.',
            'Digital products: guides, price list templates, aftercare cards, photo presets.',
            '1:1 coaching: portfolio reviews, pricing help, business calls for new techs.',
            'Memberships: a monthly club with tutorials, tips and perks.',
          ],
        },
        {
          heading: 'One link for clients, students and brands',
          body: 'Your Nelsy page puts your services, products and courses side by side. A follower who loves your work can book an appointment, buy your guide or join your class without leaving the page.',
        },
        {
          heading: 'Keep what you earn',
          body: 'Nelsy takes 0% commission on your bookings and sales. You pay your plan and standard payment processing fees, nothing on top. Clients pay by card, Apple Pay or Google Pay in a few taps.',
        },
        {
          heading: 'Grow an audience you own',
          body: 'Instagram AutoDM sends your link to people who comment on your posts, and email lets you reach your buyers again without depending on the algorithm. Every client and buyer becomes a contact in your CRM.',
        },
        {
          heading: 'Know your numbers before you pitch brands',
          body: 'Use the free Instagram engagement rate calculator and the creator rate calculator to price sponsored posts and UGC, then send brands to the same page as your offers.',
        },
      ]}
      faq={[
        { q: 'What can I sell on Nelsy as a beauty creator?', a: 'Client bookings, online courses and workshops, digital products such as guides and templates, 1:1 coaching sessions and paid memberships, all from one page.' },
        { q: 'Does Nelsy take a commission on my sales?', a: 'No. Nelsy charges 0% commission on bookings and sales. Standard payment processing fees apply to online payments.' },
        { q: 'Do I need a big following to start?', a: 'No. Services, coaching and small digital products sell on trust and expertise. A small audience that values your work is enough to start.' },
        { q: 'Can I keep taking bookings on the same page?', a: 'Yes. Your services, deposits and calendar live on the same page as your products and courses.' },
      ]}
      relatedFeatures={['courses', 'digital-products', 'coaching', 'memberships', 'link-in-bio', 'instagram-autodm']}
      relatedUseCases={['independent-beauty-pros', 'turn-followers-into-bookings', 'nail-techs']}
      relatedPostSlugs={['how-to-make-money-as-a-beauty-creator', 'how-to-sell-a-nail-course-online', 'how-to-grow-nail-tech-instagram']}
    />
  );
}
