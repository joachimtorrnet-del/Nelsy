import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-much-should-nail-tech-charge',
  title: 'How Much Should a Nail Tech Charge?',
  seoTitle: 'How Much Should a Nail Tech Charge? (2026 UK Pricing Guide)',
  excerpt: 'Setting your prices is one of the most important decisions in your nail business. Here\'s a practical guide to working out your nail tech prices in 2026.',
  seoDescription: 'How much should a nail tech charge in 2026? Work out your price for gel sets, extensions, infills and nail art from your costs, time and local market.',
  category: 'pricing-money',
  tags: ['nail tech pricing', 'how much to charge', 'nail prices', 'UK nail pricing'],
  heroImage: 'linear-gradient(135deg, #ECFDF5 0%, #86EFAC 100%)',
  heroImageAlt: 'How much should a nail tech charge',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'Charge at least your minimum hourly rate × service time, where minimum hourly rate = (monthly costs + target income) ÷ monthly client hours, then adjust to your local market.',
    detail: 'Example: £300 costs + £2,500 target income = £2,800 ÷ 80 client hours = £35 an hour, so a 90-minute set should be at least £52.50. Check local prices second, never first.',
    points: [
      { label: 'Floor', text: 'Your cost-based minimum: never price below it.' },
      { label: 'Market', text: 'Local prices for similar quality tell you how far above the floor you can go.' },
      { label: 'Raise', text: 'If you are booked out weeks ahead, test a 10% rise with 4 to 6 weeks\' notice.' },
    ],
  },
  toc: [
    { id: 'uk-pricing-overview', label: 'Example price tiers' },
    { id: 'factors', label: 'What affects your pricing' },
    { id: 'cost-based-pricing', label: 'Pricing based on your costs' },
    { id: 'market-research', label: 'Researching your local market' },
    { id: 'undercharging', label: 'Signs you\'re undercharging' },
    { id: 'raising-prices', label: 'How to raise your prices' },
  ],
  relatedSlugs: ['how-to-price-nail-services-for-profit', 'when-should-nail-tech-raise-prices', 'nail-tech-pricing-guide'],
  faq: [
    { q: 'What is the average price for a gel nail set in the UK in 2026?', a: 'There is no official UK average, and prices vary widely by city, experience and whether you work from home or a studio. The useful number is your own minimum: (monthly costs + target income) ÷ monthly client hours × service time. Then compare with 5 to 10 local nail techs of similar quality who publish prices.' },
    { q: 'Should I charge more for nail art?', a: 'Yes. Nail art takes extra time and skill, so price it as an add-on: either per nail or as tiers (simple, medium, complex) for the whole hand. A simple way to set it: extra minutes ÷ 60 × your hourly rate. Example: 20 extra minutes at £35 an hour = £11.67, rounded to £12.' },
    { q: 'How do I know if my nail prices are too low?', a: 'Work out your real hourly rate: weekly income minus costs, divided by all the hours you spend (appointments, set-up, cleaning, messages). If it is below what you need to live on, or below your minimum hourly rate from this guide, prices are too low. Being fully booked weeks ahead with a waiting list is another strong sign.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="uk-pricing-overview">
        <h2 className="font-serif text-2xl font-bold mb-4">Example price tiers</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail tech prices vary a lot by location, experience, speciality, and whether you work from a salon or home studio. The tiers below are <strong>illustrative examples</strong> of how a budget, mid-range and premium menu might be spread. They are not survey data: use them to picture positioning, then calculate your own.</p>
        <ArticleTable
          headers={['Service', 'Budget', 'Mid-range', 'Premium']}
          rows={[
            ['Gel full set', '£25–35', '£40–55', '£60–80+'],
            ['Gel infill', '£20–28', '£30–40', '£45–60'],
            ['Acrylic full set', '£30–40', '£45–60', '£65–90+'],
            ['Gel pedicure', '£25–35', '£35–50', '£55–75'],
            ['Nail art (per nail)', '£2–3', '£3–5', '£5–10+'],
            ['Gel removal + new set', '£35–45', '£50–65', '£70–90+'],
          ]}
          caption="Illustrative example tiers only. Check real prices in your own area."
        />
        <ArticleTip>Whatever tier you aim for, the price has to cover your costs, your time and a profit. The calculation below tells you your floor.</ArticleTip>
      </section>

      <section id="factors">
        <h2 className="font-serif text-2xl font-bold mb-4">What affects your pricing</h2>
        <ArticleTable
          headers={['Factor', 'How it affects price']}
          rows={[
            ['Location', 'Big cities usually support higher prices than small towns, but rent is higher too'],
            ['Experience and qualifications', 'More experience and speed justify higher prices; qualifications add credibility'],
            ['Speciality', 'Nail art and specialist techniques can be priced as premium add-ons'],
            ['Clientele', 'The clients you target shape what they expect to pay'],
            ['Studio vs home', 'Home studios have lower overheads, so the floor price is lower'],
            ['Demand', 'If you are booked out weeks ahead, you have room to raise prices'],
          ]}
        />
      </section>

      <section id="cost-based-pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing based on your costs</h2>
        <ArticleSteps
          steps={[
            { title: 'Add up monthly costs', body: 'Products, rent or space, insurance, software, card fees, training, equipment spread over its life.' },
            { title: 'Set your target income', body: 'What you want to earn after costs, before tax.' },
            { title: 'Count client hours', body: 'Hours actually spent on clients per month, not hours at work. Admin and content time are not billable.' },
            { title: 'Divide', body: '(Costs + target income) ÷ client hours = your minimum hourly rate.' },
            { title: 'Price each service', body: 'Minimum hourly rate × service hours = floor price. Round up.' },
          ]}
        />
        <ArticleCallout variant="info" title="Worked example">
          Example: monthly costs £300 + target income £2,500 = £2,800. Client hours: 80 a month (20 a week).<br />
          £2,800 ÷ 80 = <strong>£35 an hour</strong>.<br />
          Gel set, 90 minutes: 1.5 × £35 = <strong>£52.50 floor</strong>, rounded to £55.<br />
          Gel polish, 45 minutes: 0.75 × £35 = £26.25, rounded to £28.<br />
          Infill, 60 minutes: 1 × £35 = <strong>£35</strong>.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Run it for every service with the <Link to="/tools/nail-tech-pricing-calculator" className={link}>free nail tech pricing calculator</Link>.</p>
      </section>

      <section id="market-research">
        <h2 className="font-serif text-2xl font-bold mb-4">Researching your local market</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your floor price tells you what you need. Your local market tells you what clients nearby expect. Do this in 30 minutes:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Find 5 to 10 local nail techs on Instagram, Google Maps or booking apps who publish prices.</li>
          <li>Note their price for one comparable service (for example, a gel full set) and their quality level.</li>
          <li>Sort them from lowest to highest and see where your floor price falls.</li>
        </ol>
        <ArticleCallout variant="info" title="Example">
          Example: 8 local gel set prices: £30, £35, £38, £40, £42, £45, £50, £60. The middle two are £40 and £42, so the local midpoint is about £41. If your floor is £52.50, you either position above the middle with stronger photos and service, cut your costs, or rethink the service time.
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">Pricing at the right level from the start is easier than raising a low price later.</p>
      </section>

      <section id="undercharging">
        <h2 className="font-serif text-2xl font-bold mb-4">Signs you&apos;re undercharging</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You are consistently booked 3+ weeks ahead with a waiting list</li>
          <li>Clients never mention the price</li>
          <li>Your real hourly rate (income minus costs, divided by all hours including set-up and cleaning) is below your minimum hourly rate</li>
          <li>Your product costs have gone up but your prices haven&apos;t</li>
          <li>You haven&apos;t reviewed prices in 12+ months</li>
        </ul>
      </section>

      <section id="raising-prices">
        <h2 className="font-serif text-2xl font-bold mb-4">How to raise your prices</h2>
        <ArticleCallout variant="info" title="Example: why a rise rarely loses money">
          Example: 60 clients a month at £40 = £2,400. Raise to £45. Even if 6 clients (10%) leave, 54 × £45 = £2,430: slightly more money for 6 fewer appointments.
        </ArticleCallout>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Give clients 4 to 6 weeks&apos; notice.</li>
          <li>Announce it confidently: &quot;From [date], my prices are updating to [new price] to keep using the products and time your nails deserve.&quot; No apology needed.</li>
          <li>Update your booking page and price Highlight on the start date.</li>
          <li>Apply the new prices to everyone: exceptions create confusion.</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">Full guide: <Link to="/blog/when-should-nail-tech-raise-prices" className={link}>when should a nail tech raise prices?</Link></p>
      </section>
    </div>
  ),
});
export {};
