import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'home-based-nail-tech-vs-salon-suite',
  title: 'Home-Based Nail Tech vs Salon Suite: What\'s the Difference?',
  seoTitle: 'Home-Based Nail Tech vs Salon Suite: Which Is Right for You?',
  excerpt: 'Home studio or rented salon suite — both are popular models for independent nail techs. Here\'s an honest comparison to help you decide which fits your situation.',
  seoDescription: 'Home-based nail tech vs salon suite. Compare working from home vs renting a salon suite — costs, client experience, privacy, professionalism, and career stage.',
  category: 'start-your-business',
  tags: ['home nail tech vs salon suite', 'nail salon suite vs home studio', 'home based nail tech'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'Home-based nail tech vs salon suite',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'home-studio', label: 'Working from home' },
    { id: 'salon-suite', label: 'Renting a salon suite' },
    { id: 'comparison', label: 'Side-by-side comparison' },
    { id: 'which-to-choose', label: 'Which suits your situation?' },
    { id: 'transition', label: 'Moving from home to a suite' },
  ],
  relatedSlugs: ['when-to-get-your-own-nail-studio', 'how-to-transition-home-nail-tech-to-studio', 'independent-nail-tech-vs-nail-salon', 'booth-rental-vs-commission-nail-techs'],
  faq: [
    { q: 'Do I need planning permission to work as a nail tech from home?', a: 'Planning permission requirements vary by country and local authority. In many cases, occasional professional use of a home doesn\'t require planning permission — but if you\'re having multiple clients per day, using a dedicated room, or it changes the use of the property, you may need to check with your local authority. Also check your mortgage or rental terms, as home use for business can affect these.' },
    { q: 'Can I grow to the same income working from home as in a salon suite?', a: 'Yes — income is driven by pricing, booking volume, and service quality, not whether you work from home or a suite. Many home-based nail techs are fully booked at premium prices. The difference is client perception and the number of clients willing to travel to a home vs a professional studio space.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="home-studio">
        <h2 className="font-serif text-2xl font-bold mb-4">Working from home</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A home studio means using a dedicated space in your home (a spare room, garden room, garage conversion) as your nail workspace. Clients come to your home address.</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Advantages:</strong></p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>No monthly rent — significantly lower overheads</li>
          <li>No commute — work/life integration is easy</li>
          <li>Complete control over your space and aesthetic</li>
          <li>Flexible hours with no landlord constraints</li>
        </ul>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Challenges:</strong></p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Privacy — clients know where you live</li>
          <li>Professionalism — some clients prefer a dedicated salon space</li>
          <li>Home/work boundaries can blur</li>
          <li>Limits on signage and visibility (no walk-in footfall)</li>
        </ul>
        <ArticleCallout variant="info" title="Privacy matters most for home studios">
          If privacy is a concern — especially as a sole trader working from home — you can give your full address only to confirmed, deposit-paid bookings, not to enquirers. Most booking platforms let you show your general area but not your exact address until booking is confirmed.
        </ArticleCallout>
      </section>

      <section id="salon-suite">
        <h2 className="font-serif text-2xl font-bold mb-4">Renting a salon suite</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A salon suite is a private or semi-private room or space within a larger salon building, rented on a weekly or monthly basis. You bring your own equipment and run it as your own brand.</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Advantages:</strong></p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Dedicated professional space — clear work/home separation</li>
          <li>Privacy — clients don't come to your home</li>
          <li>Potentially more credibility with new clients unfamiliar with you</li>
          <li>Potential for some footfall from the building</li>
        </ul>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Challenges:</strong></p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Monthly rent is a fixed cost regardless of bookings</li>
          <li>Travel time to and from the suite</li>
          <li>Lease commitments and terms to navigate</li>
          <li>Shared facilities (reception, toilets, waiting area) may be shared with other renters</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Side-by-side comparison</h2>
        <ArticleTable
          headers={['Factor', 'Home studio', 'Salon suite']}
          rows={[
            ['Monthly cost', 'No separate rent', 'Weekly/monthly rent required'],
            ['Privacy', 'Clients visit your home', 'Separate from your home'],
            ['Commute', 'None', 'Travel required'],
            ['Professionalism', 'Can be very professional; depends on setup', 'Inherently professional space'],
            ['Flexibility', 'Very high', 'Bound by lease/booking terms'],
            ['Break-even clients', 'Lower (fewer costs)', 'Higher (must cover rent)'],
          ]}
        />
      </section>

      <section id="which-to-choose">
        <h2 className="font-serif text-2xl font-bold mb-4">Which suits your situation?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Home studio suits you if:</strong> you're starting out, want to minimise overhead risk, have a suitable space, and are comfortable with clients knowing your general area.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Salon suite suits you if:</strong> you have an established client base, want the clear home/work separation, can consistently cover the rent, and want a more professional-feeling environment for your brand.</p>
      </section>

      <section id="transition">
        <h2 className="font-serif text-2xl font-bold mb-4">Moving from home to a suite</h2>
        <p className="text-gray-700 leading-relaxed">Most nail techs who move to a salon suite do so when they're consistently fully booked at home and the income comfortably covers the additional rent cost. It's not necessarily a "next step" — many successful nail techs work from home indefinitely and are happy doing so. The decision is about what fits your life and income goals, not a universal progression.</p>
      </section>
    </div>
  ),
});
export {};
