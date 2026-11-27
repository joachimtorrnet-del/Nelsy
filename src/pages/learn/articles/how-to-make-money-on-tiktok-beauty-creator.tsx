import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-make-money-on-tiktok-beauty-creator',
  title: 'How to Monetize a Beauty TikTok: 7 Ways to Make Money',
  coverTitle: '7 Ways to Monetize TikTok',
  seoTitle: 'How to Make Money on TikTok as a Beauty Creator',
  excerpt: 'How beauty creators make money on TikTok: creator programs, TikTok Shop affiliate, brand deals, UGC, LIVE gifts, and selling your own services, guides and courses, with what each needs and how to start.',
  seoDescription: 'How to monetize a beauty TikTok: creator programs, TikTok Shop, brand deals, UGC, LIVE gifts and selling your own bookings, guides and courses. What each needs.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['how to make money on tiktok as a creator', 'how to monetize tiktok', 'beauty tiktok', 'sell makeup on tiktok', 'tiktok shop beauty'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to make money on TikTok as a beauty creator',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-24',
  tldr: {
    answer: 'Use TikTok for reach, and sell something you own.',
    detail: 'TikTok can pay beauty creators through its own programs, TikTok Shop and LIVE gifts, but eligibility and payouts are set by TikTok and change. The steadier income comes from brand work and from selling your own bookings, guides, coaching and courses to the people TikTok brings you.',
    points: [
      { label: 'Paid by TikTok', text: 'Creator programs and LIVE gifts, where eligible.' },
      { label: 'Paid by brands', text: 'TikTok Shop affiliate, sponsored videos, UGC.' },
      { label: 'Paid by your audience', text: 'Bookings, guides, coaching, courses.' },
    ],
  },
  toc: [
    { id: 'overview', label: 'How TikTok money works' },
    { id: 'programs', label: '1. TikTok creator programs' },
    { id: 'shop', label: '2. TikTok Shop affiliate' },
    { id: 'live', label: '3. LIVE gifts' },
    { id: 'brands', label: '4. Brand deals' },
    { id: 'ugc', label: '5. UGC' },
    { id: 'own', label: '6. Your own products and courses' },
    { id: 'bookings', label: '7. Bookings for beauty pros' },
    { id: 'content', label: 'Beauty content that converts' },
    { id: 'setup', label: 'Profile and link setup' },
    { id: 'start', label: 'Where to start, by account stage' },
    { id: 'mistakes', label: 'Mistakes that cost money' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['how-beauty-creators-make-money-on-instagram', 'ugc-for-beauty-brands', 'how-to-get-nail-clients-from-tiktok'],
  relatedLinks: { tool: '/tools/creator-rate-calculator', pages: ['/features/link-in-bio', '/use-cases/turn-followers-into-bookings'] },
  faq: [
    { q: 'How many followers do you need to make money on TikTok?', a: 'It depends on the method. TikTok\'s own programs, LIVE gifts and the link in bio have eligibility rules (such as age, follower count and region) that TikTok sets and updates in the app. Brand deals grow with audience size. Selling your own services, guides or coaching has no follower minimum: it depends on trust and a clear offer.' },
    { q: 'Does TikTok pay for views?', a: 'TikTok runs creator programs that pay eligible creators for qualifying videos. Which program exists in your country, the requirements and how payouts are calculated are set by TikTok and change, so check the Creator tools section of the app rather than relying on numbers you read online.' },
    { q: 'Can I sell makeup on TikTok?', a: 'Yes, through TikTok Shop where it is available: either as a seller of your own products or as an affiliate promoting other brands\' products for a commission. Beauty products can have extra rules on ingredients, claims and labeling, so check TikTok Shop policies and your local regulations.' },
    { q: 'Can I add a link to my TikTok bio?', a: 'TikTok shows the website field on eligible accounts, and the rules for who gets it are set by TikTok. If you cannot add a link yet, point people to your Instagram, where the link is available, or use comments and DMs.' },
    { q: 'What beauty content does best on TikTok?', a: 'Transformations, step-by-step tutorials, honest product tests, mistakes to avoid, and behind-the-scenes of client work. Content that shows a clear result in the first seconds tends to hold attention.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Makeup, skincare, hair, lash, brow and nail creators on TikTok, and beauty pros who use TikTok to find clients.
      </ArticleCallout>

      <section id="overview">
        <h2 className={h2}>How TikTok money works</h2>
        <p className={p}>There are three kinds of money on TikTok, and they behave differently:</p>
        <ArticleTable
          headers={['Who pays', 'Methods', 'What it depends on', 'Control']}
          rows={[
            ['TikTok', 'Creator programs, LIVE gifts (from viewers, paid out by TikTok)', 'Eligibility rules, views, region', 'Low: rules change'],
            ['Brands', 'TikTok Shop affiliate, sponsored videos, UGC', 'Reach, trust, content quality', 'Medium'],
            ['Your audience', 'Bookings, guides, coaching, courses', 'A clear offer and trust', 'High: you own it'],
          ]}
        />
        <p className={p}>A steadier setup combines one of each, with the third row as the base. The reason is simple: views can drop after an algorithm change, but a client list, an email list and your own products stay yours.</p>
      </section>

      <section id="programs">
        <h2 className={h2}>1. TikTok creator programs</h2>
        <p className={p}>TikTok pays eligible creators for qualifying videos through its creator programs. The details (minimum age, followers, views, video length, the countries covered and how payouts are calculated) are defined by TikTok and updated regularly. To see what applies to you, open your profile, go to the Creator tools section, and look for the monetization options listed there.</p>
        <ArticleTip>If you join a program, read which videos qualify. Some programs favor longer, original videos, which suits beauty tutorials, product tests and full transformations better than very short clips.</ArticleTip>
      </section>

      <section id="shop">
        <h2 className={h2}>2. TikTok Shop affiliate</h2>
        <p className={p}>Where TikTok Shop is available, beauty is a natural fit: you add a product to your video or LIVE, and you earn a commission set by the seller when viewers buy. You can also sell your own physical products if you have them (for example press-on nails or a skincare line), as long as they meet TikTok Shop and local rules.</p>
        <ArticleChecklist
          title="What makes affiliate beauty videos work"
          items={[
            'Show the product in use on real skin, hair, lashes or nails, in natural light.',
            'Show the result early, then the routine.',
            'Be honest about who it suits and who it does not.',
            'Only promote what you would recommend to a client.',
            'Follow the platform rules on disclosures and on beauty claims (no medical promises).',
          ]}
        />
      </section>

      <section id="live">
        <h2 className={h2}>3. LIVE gifts</h2>
        <p className={p}>During a LIVE, viewers can send virtual gifts that turn into payouts for eligible creators, under TikTok&apos;s rules. Beauty LIVEs that hold attention are practical: a full makeup look, a Q&amp;A while you do a set, a product test. LIVE is also a good place to answer questions about your services or products and point people to your link.</p>
        <ArticleImage src="photo-1585060544812-6b45742d762f" alt="Phone with a blank screen on a light wooden table" />
      </section>

      <section id="brands">
        <h2 className={h2}>4. Brand deals</h2>
        <p className={p}>Brands pay for sponsored TikToks the same way they do on Instagram: a fee for the video, and often extra for usage rights (when they can reuse it in ads). Your price depends on your reach, engagement, niche and the deliverables. Prepare a media kit, know your minimum, and label paid content with TikTok&apos;s content disclosure setting. Guide: <Link to="/blog/how-to-get-brand-deals-beauty-creator" className={a}>how to get brand deals as a beauty creator</Link>.</p>
      </section>

      <section id="ugc">
        <h2 className={h2}>5. UGC</h2>
        <p className={p}>TikTok-style videos are exactly what many beauty brands want for their ads, which is why UGC creators often build a portfolio from their own TikToks. You do not need a big following, you need well-lit, natural videos with a strong first second. See <Link to="/blog/ugc-for-beauty-brands" className={a}>UGC for beauty brands</Link> for how to start and how to calculate a rate.</p>
      </section>

      <section id="own">
        <h2 className={h2}>6. Your own guides, coaching and courses</h2>
        <p className={p}>A video that answers part of a question (&quot;why your lash extensions fall out after a week&quot;) followed by &quot;the full routine is in my guide&quot; is the simplest way to sell a digital product from TikTok. Coaching and courses follow the same pattern once people trust your expertise.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><Link to="/blog/how-to-sell-a-beauty-ebook" className={a}>How to sell a beauty ebook or guide</Link></li>
          <li><Link to="/blog/how-to-create-an-online-beauty-course" className={a}>How to create an online beauty course</Link></li>
          <li><Link to="/blog/how-to-sell-virtual-beauty-consultations" className={a}>How to sell virtual consultations and coaching</Link></li>
        </ul>
      </section>

      <section id="bookings">
        <h2 className={h2}>7. Bookings for beauty pros</h2>
        <p className={p}>TikTok is not only for national reach. Videos tagged with your city and filmed in your studio can bring local clients. Add your city to your bio and captions, answer comments asking &quot;where are you based?&quot;, and send people to a booking page with your services and prices. More in <Link to="/blog/how-to-get-nail-clients-from-tiktok" className={a}>how to get clients from TikTok</Link>.</p>
        <ArticleImage src="photo-1631214540553-ff044a3ff1d4" alt="Open mascara tube and wand on a pink background" />
      </section>

      <section id="content">
        <h2 className={h2}>Beauty content that converts on TikTok</h2>
        <p className={p}>Views pay little on their own. Content that leads to a sale or a booking has a clear result, a clear person it is for, and a next step.</p>
        <ArticleTable
          headers={['Format', 'Hook example', 'Next step to offer']}
          rows={[
            ['Transformation', '"Same lashes, 3 weeks later: here is why they lasted"', 'Book a set, or the aftercare guide'],
            ['Mistakes', '"3 things that make your foundation separate by noon"', 'Full routine guide or a 1:1 consult'],
            ['Tutorial', '"Soft glam in 10 minutes, every step"', 'Product list or a course'],
            ['Behind the scenes', '"What a bridal morning looks like from my side"', 'Bridal booking enquiries'],
            ['Product test', '"I tested this primer for a full workday"', 'Affiliate or TikTok Shop link'],
          ]}
        />
        <p className={p}>For more hooks and filming tips, see <Link to="/blog/nail-tech-reel-hooks" className={a}>hooks that stop the scroll</Link> and <Link to="/blog/how-to-film-nail-tech-tiktok-reels" className={a}>how to film TikToks and Reels</Link>.</p>
      </section>

      <section id="setup">
        <h2 className={h2}>Profile and link setup</h2>
        <ArticleSteps
          steps={[
            { title: 'Switch to a business or creator account if it fits', body: 'Check which account type unlocks the tools you want in your region; some monetization features differ between them.' },
            { title: 'Write a bio with a promise and a location', body: 'For example: "Bridal makeup, Manchester. Tips daily. Bookings below."' },
            { title: 'Add your link where available', body: 'One page with your bookings and offers in order. If the link field is not available yet, point to your Instagram.' },
            { title: 'Pin three videos', body: 'Your best result, a video about your main offer, and one that shows who you are.' },
            { title: 'Track what sells', body: 'Note which videos lead to DMs, bookings or sales, not only views, and make more of those.' },
          ]}
        />
        <ArticleImage src="photo-1678695692040-e9a39502c357" alt="Makeup brushes arranged on a pink and burgundy background" />
      </section>

      <section id="start">
        <h2 className={h2}>Where to start, by account stage</h2>
        <p className={p}>You do not need to do all seven at once. Pick the methods that fit where your account is today, and add others as it grows.</p>
        <ArticleTable
          headers={['Stage', 'Focus on', 'Why']}
          rows={[
            ['Just starting', 'Bookings (if you do services), UGC samples, one small guide', 'None of these need a large audience'],
            ['Growing and consistent', 'Brand deals with small brands, TikTok Shop affiliate where available, coaching', 'Brands and buyers can see a track record'],
            ['Established audience', 'Courses, larger brand partnerships, LIVE, creator programs if eligible', 'Reach makes scalable offers worth building'],
          ]}
        />
        <p className={p}>Whatever the stage, start collecting emails early. A list lets you launch products to people who chose to hear from you, without depending on the feed. See <Link to="/blog/how-to-build-email-list-beauty-creator" className={a}>how to build an email list as a beauty creator</Link>.</p>
      </section>

      <section id="mistakes">
        <h2 className={h2}>Mistakes that cost beauty creators money on TikTok</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Chasing views instead of buyers:</strong> a viral trend video can bring followers who will never book or buy. Mix trends with content for your real customer.</li>
          <li><strong>No next step:</strong> every video that performs should point somewhere: your link, a keyword to comment, a LIVE time.</li>
          <li><strong>Saying yes to every brand:</strong> promoting products you do not use costs trust, and trust is what sells your own offers later.</li>
          <li><strong>Underpricing brand work:</strong> quote from your time and reach, and charge separately for ad usage.</li>
          <li><strong>Making health claims:</strong> beauty content that promises to treat skin conditions can break platform rules and advertising law.</li>
          <li><strong>Relying on one income source:</strong> if a program changes its rules, you want the other rows of the table still paying.</li>
        </ul>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>For beauty pros, Nelsy is the booking page behind your link: services, prices, free slots and a deposit at booking, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/bookings" className={a}>bookings</Link> and <Link to="/features/link-in-bio" className={a}>link in bio</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
