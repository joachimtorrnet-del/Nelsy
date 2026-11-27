import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-beauty-creators-make-money-on-instagram',
  title: 'How Beauty Creators Make Money on Instagram',
  seoTitle: 'How Beauty Creators Make Money on Instagram: 8 Ways',
  excerpt: 'The 8 ways beauty creators and beauty influencers make money on Instagram, from bookings and digital products to brand deals, UGC, affiliate links and Instagram\'s own creator tools, with what each needs and how to start.',
  seoDescription: 'How beauty influencers make money on Instagram: bookings, guides and courses, brand deals, UGC, affiliate links and Instagram creator tools, with how to start each.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['how do beauty influencers make money', 'how to make money on instagram', 'make money on instagram as a content creator', 'beauty influencer income', 'instagram monetization'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How beauty creators make money on Instagram',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-24',
  tldr: {
    answer: 'Instagram pays you indirectly: it sends people to what you sell.',
    detail: 'The main ways beauty creators earn on Instagram are selling their own things (appointments, guides, courses, coaching) and working with brands (sponsored posts, UGC, affiliate links). Instagram\'s own creator tools are a bonus where they are available, not a plan.',
    points: [
      { label: 'Works with a small audience', text: 'Bookings, guides, coaching, UGC.' },
      { label: 'Grows with your audience', text: 'Brand deals, affiliate links, courses.' },
      { label: 'Depends on Instagram', text: 'Subscriptions, gifts and bonuses where offered.' },
    ],
  },
  toc: [
    { id: 'overview', label: 'The 8 ways at a glance' },
    { id: 'bookings', label: '1. Bookings from your profile' },
    { id: 'products', label: '2. Guides and digital products' },
    { id: 'courses', label: '3. Courses and coaching' },
    { id: 'brands', label: '4. Sponsored posts' },
    { id: 'ugc', label: '5. UGC for brands' },
    { id: 'affiliate', label: '6. Affiliate links and codes' },
    { id: 'native', label: '7. Instagram creator tools' },
    { id: 'events', label: '8. Events and pop-ups' },
    { id: 'profile', label: 'Set up your profile to sell' },
    { id: 'plan', label: 'A 30-day plan' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['how-to-make-money-as-a-beauty-creator', 'how-to-get-brand-deals-beauty-creator', 'what-to-put-in-link-in-bio-beauty-creators'],
  relatedLinks: { tool: '/tools/instagram-engagement-calculator', pages: ['/features/link-in-bio', '/use-cases/turn-followers-into-bookings'] },
  faq: [
    { q: 'How do beauty influencers make money on Instagram?', a: 'Mostly from what Instagram sends them to: their own services and products (appointments, guides, courses, coaching) and work with brands (sponsored posts, UGC, affiliate links and discount codes). Some also use Instagram\'s creator tools, such as subscriptions or gifts, where those are available.' },
    { q: 'How many followers do you need to make money on Instagram?', a: 'There is no fixed number for selling your own services or products: a beauty pro with a small local following can fill a calendar. Brand deals and affiliate income usually grow with audience size and engagement. Instagram\'s own monetization tools have eligibility rules that Instagram sets and changes, shown in your professional dashboard.' },
    { q: 'Does Instagram pay you for views?', a: 'Instagram has run bonus and creator programs at different times and in different countries, and eligibility changes. Check the monetization section of your professional dashboard to see what your account can use today. Do not build a plan that depends on it.' },
    { q: 'What is the fastest way to make money on Instagram as a beauty pro?', a: 'Make it easy to book you. A clear bio, a booking link with your services and prices, and posts that end with a call to action convert followers you already have into paying clients.' },
    { q: 'Do I need a business account?', a: 'A professional account (creator or business) gives you insights, contact buttons and access to the monetization tools Instagram offers in your country. It is free to switch in the app settings.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Beauty creators and beauty pros (makeup, lashes, brows, nails, hair, skin) who post on Instagram and want it to bring in money, not just likes.
      </ArticleCallout>

      <section id="overview">
        <h2 className={h2}>The 8 ways at a glance</h2>
        <p className={p}>Instagram itself pays relatively few creators directly. The money comes from what your posts make people do next: book you, buy from you, or buy from a brand you recommend. Here is how the main options compare.</p>
        <ArticleTable
          headers={['Way to earn', 'Who pays you', 'Needs a big audience?', 'Good first step']}
          rows={[
            ['Bookings', 'Clients', 'No, a local one', 'Booking link in bio'],
            ['Guides and digital products', 'Followers or other pros', 'No, a targeted one', 'One PDF guide'],
            ['Courses and coaching', 'Students', 'No, needs trust', 'A paid 1:1 call'],
            ['Sponsored posts', 'Brands', 'Helps a lot', 'Media kit'],
            ['UGC', 'Brands', 'No', '3 sample videos'],
            ['Affiliate links and codes', 'Brands, per sale', 'Yes, or very engaged', 'Links to what you use'],
            ['Instagram creator tools', 'Instagram or fans', 'Depends on eligibility', 'Check your dashboard'],
            ['Events and pop-ups', 'Attendees', 'A local audience', 'A small workshop'],
          ]}
        />
      </section>

      <section id="bookings">
        <h2 className={h2}>1. Bookings from your profile</h2>
        <p className={p}>If you do beauty services, this is the most direct income Instagram can bring. People see your work, they want it, and the only question is how easy it is to book. Every extra DM (&quot;how much?&quot;, &quot;are you free Friday?&quot;) loses some of them.</p>
        <ArticleSteps
          steps={[
            { title: 'Say what you do and where in your bio', body: 'For example: "Soft glam and bridal makeup, Austin. Book below." The location matters for local search.' },
            { title: 'Put a booking link in your bio', body: 'Services, prices and available times on one page, so people can book without messaging you.' },
            { title: 'End posts with a call to action', body: 'Tell people what to do: "Book your bridal trial, link in bio." See our call to action examples.' },
            { title: 'Take a deposit', body: 'A deposit at booking turns a "maybe" into a real appointment and protects you from no-shows.' },
          ]}
        />
        <p className={p}>More in <Link to="/blog/how-to-turn-instagram-followers-into-nail-clients" className={a}>how to turn Instagram followers into clients</Link> and <Link to="/blog/nail-tech-call-to-action-examples" className={a}>call to action examples</Link>.</p>
        <ArticleImage src="photo-1709534771076-6c2298f57f2f" alt="Phone with a blank screen on a pink desk next to a keyboard and earbuds" />
      </section>

      <section id="products">
        <h2 className={h2}>2. Guides and digital products</h2>
        <p className={p}>A guide, a template or a checklist turns your most common DM into a product. Examples: a skincare routine guide for oily skin, a lash aftercare card pack, a pricing workbook for new nail techs, a list of the products in your kit with how you use each.</p>
        <p className={p}>Instagram is good at selling these because you can show the result in a Reel, show the inside pages in stories and send the link in DMs. Step by step: <Link to="/blog/how-to-sell-a-beauty-ebook" className={a}>how to sell a beauty ebook or guide</Link>, and 35 ideas in <Link to="/blog/digital-product-ideas-for-beauty-creators" className={a}>digital product ideas for beauty creators</Link>.</p>
      </section>

      <section id="courses">
        <h2 className={h2}>3. Courses and coaching</h2>
        <p className={p}>Once people ask &quot;do you teach?&quot;, you have an audience for education. Coaching (a paid video call, a portfolio review, a mentoring package) needs no product creation and can start this week. A course takes longer but can sell many times. See <Link to="/blog/how-to-sell-virtual-beauty-consultations" className={a}>how to sell virtual consultations and coaching</Link> and <Link to="/blog/how-to-create-an-online-beauty-course" className={a}>how to create an online beauty course</Link>.</p>
      </section>

      <section id="brands">
        <h2 className={h2}>4. Sponsored posts</h2>
        <p className={p}>Brands pay creators to feature a product in a Reel, a carousel or stories. What a brand pays depends on your audience size, how engaged it is, how well it matches their customer, the deliverables and the usage rights. There is no fixed rate per follower.</p>
        <ArticleChecklist
          title="Before you pitch or reply to a brand"
          items={[
            'Know your engagement rate: use the free Instagram engagement calculator.',
            'Know your audience: top countries, cities, age range, from your insights.',
            'Have a one-page media kit with examples of your best content.',
            'Know your minimum: the time a post takes multiplied by your hourly rate.',
            'Always label paid content with Instagram\'s paid partnership tool or a clear #ad.',
          ]}
        />
        <p className={p}>Full guide: <Link to="/blog/how-to-get-brand-deals-beauty-creator" className={a}>how to get brand deals as a beauty creator</Link>. To price a deal, use the <Link to="/tools/creator-rate-calculator" className={a}>creator rate calculator</Link> and check your numbers with the <Link to="/tools/instagram-engagement-calculator" className={a}>engagement calculator</Link>.</p>
      </section>

      <section id="ugc">
        <h2 className={h2}>5. UGC for brands</h2>
        <p className={p}>With UGC (user-generated content), a brand pays you to make photos or videos that they post on their own channels or use in ads. You do not need to post on your account, so follower count matters less. What matters is that you can film good-looking, natural content of products on skin, hair, lashes or nails. See <Link to="/blog/ugc-for-beauty-brands" className={a}>UGC for beauty brands: how to start and what to charge</Link>.</p>
      </section>

      <section id="affiliate">
        <h2 className={h2}>6. Affiliate links and discount codes</h2>
        <p className={p}>Many beauty brands and retailers run affiliate programs: you share a link or a code, and you earn a commission when someone buys. It works best when you recommend what you really use, in content where the product is visible (a routine, a &quot;what is in my kit&quot; Reel, a tutorial). Income grows with reach and trust, so it is rarely a first income stream for a small account. Always disclose that a link is an affiliate link.</p>
        <ArticleTip>Group your affiliate links on one page (&quot;my kit&quot;) instead of a different link in every post. It is easier to keep up to date and easier for followers to find.</ArticleTip>
      </section>

      <section id="native">
        <h2 className={h2}>7. Instagram&apos;s own creator tools</h2>
        <p className={p}>Instagram has offered several ways to earn directly in the app, such as subscriptions for exclusive content, gifts on Reels, and bonus programs. Which ones exist, in which countries, and who is eligible changes over time and is set by Instagram. To see what you can use, open your professional dashboard and look for the monetization section.</p>
        <ArticleCallout variant="warning" title="Treat it as a bonus">
          Income that depends on a platform program can change or stop at any time. Build your plan on what you control (services, products, your email list), and treat in-app payouts as extra.
        </ArticleCallout>
      </section>

      <section id="events">
        <h2 className={h2}>8. Events and pop-ups</h2>
        <p className={p}>A local audience can fill a masterclass, a pop-up at a boutique, or a bridal party day. Instagram is where you announce it, and a booking or ticket link is where people commit. See <Link to="/blog/how-to-run-nail-tech-popup-events" className={a}>how to run a pop-up event</Link>.</p>
        <ArticleImage src="photo-1607082348824-0a96f2a4b9da" alt="Red and black gift shopping bags with ribbon handles on a dark background" />
      </section>

      <section id="profile">
        <h2 className={h2}>Set up your profile to sell</h2>
        <p className={p}>Whatever you sell, the path is the same: post, profile, link, purchase. Fix the profile and every post works harder.</p>
        <ArticleTable
          headers={['Profile element', 'What to put there', 'Example']}
          rows={[
            ['Name field', 'Your name plus what you do (it is searchable)', 'Maya | Lash Artist NYC'],
            ['Bio', 'Who you help, the result, one call to action', 'Natural lash sets that last. New: aftercare guide below.'],
            ['Link in bio', 'One page with your offers in order of priority', 'Book / Guides / Free checklist'],
            ['Highlights', 'Services and prices, results, reviews, FAQ, products', 'BOOK, RESULTS, FAQ, GUIDE'],
            ['Pinned posts', 'Your best result, your main offer, who you are', 'Before and after, guide launch, intro Reel'],
          ]}
        />
        <p className={p}>For the link page itself, read <Link to="/blog/what-to-put-in-link-in-bio-beauty-creators" className={a}>what to put in your link in bio</Link>.</p>
      </section>

      <section id="plan">
        <h2 className={h2}>A 30-day plan to earn your first money from Instagram</h2>
        <ArticleSteps
          steps={[
            { title: 'Week 1: fix the path', body: 'Rewrite your bio, set up one link page, add highlights for services and FAQ.' },
            { title: 'Week 2: choose one offer', body: 'Bookings if you do services, or one small product (a guide, a paid call) built from your most common question.' },
            { title: 'Week 3: post for that offer', body: 'Three posts that show the result, one that explains the offer, daily stories with a link sticker.' },
            { title: 'Week 4: follow up and measure', body: 'Answer every DM with the link, check what sold and which post brought the clicks, then repeat what worked.' },
          ]}
        />
        <p className={p}>When the first offer works, add a second income stream from the table above. The full list of income streams is in <Link to="/blog/how-to-make-money-as-a-beauty-creator" className={a}>how to make money as a beauty creator</Link>.</p>
        <ArticleImage src="photo-1596462502278-27bfdc403348" alt="Pink makeup brushes, lipstick and blush laid out on a beige background" />
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>If bookings are your first income stream, Nelsy gives you the booking page for your link in bio: services, prices, available times and a deposit at booking, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/use-cases/turn-followers-into-bookings" className={a}>turn followers into bookings</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
