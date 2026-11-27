import UseCasePage from './UseCasePage';

export default function BeautyCreators() {
  return (
    <UseCasePage
      upcomingPlan="Creator"
      seo={{
        title: 'Nelsy for Beauty Creators: Bookings Now, Creator Plan Next',
        description: 'Beauty creators can take bookings and deposits on Nelsy today. Courses, digital products, coaching and memberships are part of the upcoming Creator plan.',
        canonical: '/use-cases/beauty-creators',
      }}
      hero={{
        headline: 'Turn your beauty expertise into income',
        subheadline: 'Start with bookings and deposits from your link in bio today. Selling courses, guides, coaching and memberships from the same page is part of the upcoming Creator plan: join the waitlist to hear when it opens.',
      }}
      sections={[
        {
          heading: 'Available today: bookings from your link in bio',
          body: [
            'A booking page with your services, prices and available times.',
            'A deposit or full payment per service, or pay on arrival.',
            'Automatic appointment reminders.',
            'Independent plan: $29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission (standard payment processing fees apply).',
          ],
        },
        {
          heading: 'With the upcoming Creator plan: sell what you know',
          body: [
            'Courses and workshops: a gel-x class, a lash mapping masterclass, a bridal makeup workshop.',
            'Digital products: guides, price list templates, aftercare cards, photo presets.',
            'Coaching: portfolio reviews, pricing help, business calls for new techs.',
            'Memberships: a monthly club with tutorials, tips and perks.',
            'Email marketing, Instagram AutoDM and an affiliate program for your products.',
          ],
        },
        {
          heading: 'One link for clients, students and brands',
          body: 'The goal of the Creator plan is to put your services, products and courses side by side, so a follower who loves your work can book an appointment, buy your guide or join your class from one page. Until then, your Nelsy booking page can sit in your link in bio next to the store you already use.',
        },
        {
          heading: 'Know your numbers before you pitch brands',
          body: 'Use the free Instagram engagement rate calculator and the creator rate calculator to price sponsored posts and UGC.',
        },
      ]}
      faq={[
        { q: 'What can I sell on Nelsy as a beauty creator today?', a: 'Today, on the Independent plan, you can sell your time: client services, in-person training days and paid sessions, booked from your link in bio with a deposit or full payment. Courses, digital products, memberships and dedicated coaching tools are part of the upcoming Creator plan.' },
        { q: 'How do I join the Creator plan waitlist?', a: 'Email hello@getnelsy.com with the subject "Creator waitlist" and we will let you know when it opens.' },
        { q: 'Does Nelsy take a commission?', a: 'No. Nelsy charges 0% commission on bookings. Standard payment processing fees apply to online payments.' },
        { q: 'Do I need a big following to start?', a: 'No. Services, coaching and small digital products sell on trust and expertise. A small audience that values your work is enough to start.' },
      ]}
      relatedFeatures={['link-in-bio', 'courses', 'digital-products', 'coaching', 'memberships', 'instagram-autodm']}
      relatedUseCases={['independent-beauty-pros', 'turn-followers-into-bookings', 'nail-techs']}
      relatedPostSlugs={['how-to-make-money-as-a-beauty-creator', 'digital-product-ideas-for-beauty-creators', 'how-to-sell-a-beauty-ebook']}
    />
  );
}
