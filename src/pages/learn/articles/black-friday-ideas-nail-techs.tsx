import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable, ArticleSteps, ArticleTip } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'black-friday-ideas-nail-techs',
  title: 'Black Friday Ideas for Nail Techs',
  seoTitle: 'Black Friday Ideas for Nail Techs (Without Discounting)',
  excerpt: 'Black Friday doesn\'t have to mean discounting your services. Here\'s how nail techs can take part in the biggest shopping weekend of the year, on their own terms.',
  seoDescription: 'Black Friday ideas for nail techs. Run a Black Friday promotion without slashing prices: gift cards, add-ons, product bundles, and smart ways to use the weekend.',
  category: 'get-clients',
  tags: ['black friday nail tech', 'black friday nail business', 'nail tech black friday ideas'],
  heroImage: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
  heroImageAlt: 'Black Friday ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'The best Black Friday offer for most nail techs is a bonus-value gift card or a prepaid bundle, not a discount on regular services.',
    detail: 'Gift cards and bundles bring cash in now and lock in future visits, while a blanket discount trains clients to wait for sales. Only discount if you have empty slots, and limit it to new clients and quiet days.',
    points: [
      { label: 'Best offer', text: 'Gift card with bonus value, for example pay £45, get £50.' },
      { label: 'If you discount', text: 'New clients only, quiet weekdays only, strict deadline.' },
      { label: 'Timing', text: 'Announce Thursday or Friday, last-chance post Sunday evening, close by Cyber Monday.' },
    ],
  },
  toc: [
    { id: 'should-you-participate', label: 'Should nail techs participate in Black Friday?' },
    { id: 'without-discounting', label: 'Black Friday ideas without discounting services' },
    { id: 'run-the-numbers', label: 'Run the numbers before you choose' },
    { id: 'if-you-discount', label: 'If you want to offer a discount' },
    { id: 'content-ideas', label: 'Content ideas for Black Friday week' },
    { id: 'timing', label: 'Timing your promotion' },
  ],
  relatedSlugs: ['christmas-marketing-ideas-nail-techs', 'when-should-nail-tech-raise-prices', 'nail-tech-giveaway-ideas', 'holiday-booking-strategy-nail-techs'],
  faq: [
    { q: 'Do I have to do Black Friday as a nail tech?', a: 'No. If you are already fully booked through December, a promotion only adds admin. If you have empty November slots or want to sell gift cards before Christmas, a short, limited offer can help. Decide based on your calendar, not on what brands are doing.' },
    { q: 'Is it bad to discount nail services on Black Friday?', a: 'A blanket discount can attract clients who book once for the deal and don\'t return at full price, and it makes regulars wonder why they pay full price the rest of the year. Gift cards, add-ons and prepaid bundles bring in money without lowering what clients think your service is worth.' },
    { q: 'What is a good Black Friday gift card offer for a nail tech?', a: 'A bonus value of around 10% is simple and easy to afford: pay £45, get a £50 card, or buy a £100 card and get a free £10 add-on. Put an expiry date and the terms on the card, and check that your local rules on gift card expiry allow it.' },
    { q: 'When should I post my Black Friday offer?', a: 'Tease it a few days before, announce it on the Thursday or Friday morning, post a reminder on Saturday and a last-chance post on Sunday evening. Close it by Cyber Monday at the latest so the deadline stays real.' },
  ],
  relatedFeatureSlugs: ['email-newsletters', 'instagram-autodm', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="should-you-participate">
        <h2 className="font-serif text-2xl font-bold mb-4">Should nail techs participate in Black Friday?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">It depends on your situation:</p>
        <ArticleTable
          headers={['Situation', 'Worth participating?']}
          rows={[
            ['Already fully booked through December', 'Not really: you don\'t need more demand. A gift card offer can still work'],
            ['Have empty November slots to fill', 'Yes: a targeted promotion can help'],
            ['Want to sell gift cards before Christmas', 'Yes: Black Friday is an ideal moment'],
            ['Have nail products to sell (retail)', 'Yes: product discounts fit Black Friday naturally'],
            ['Just starting out and building a client base', 'Yes: a first-visit offer can attract new clients'],
          ]}
        />
      </section>

      <section id="without-discounting">
        <h2 className="font-serif text-2xl font-bold mb-4">Black Friday ideas without discounting services</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Gift cards at a bonus value:</strong> sell a £50 gift card for £45. The client gets more value, your service price stays the same.</li>
          <li><strong>Nail art add-on promotion:</strong> a free accent nail or chrome upgrade with any full-price booking made this weekend.</li>
          <li><strong>Product bundle:</strong> if you retail cuticle oil or aftercare, bundle a set with a gift card.</li>
          <li><strong>Priority booking for regulars:</strong> give loyal clients early access to December slots. It costs you nothing.</li>
          <li><strong>Prepaid service bundle:</strong> sell three appointments at a small saving, paid upfront. You get cash flow, the client commits to returning.</li>
        </ul>
        <ArticleCallout variant="info" title="Copy this offer post">
          &quot;Black Friday at [studio name] 🖤 This weekend only: buy a £50 gift card for £45, or a £100 card for £90. Perfect for Christmas presents (or for you). Valid until [date]. Tap the link in bio or DM me GIFT. Offer ends Sunday at 9pm.&quot;
        </ArticleCallout>
      </section>

      <section id="run-the-numbers">
        <h2 className="font-serif text-2xl font-bold mb-4">Run the numbers before you choose</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Here is the same weekend with three different offers. Example figures: a gel set at £40 and 20 clients taking the offer.</p>
        <ArticleTable
          headers={['Offer', 'Calculation', 'What it costs you', 'What you get']}
          rows={[
            ['20% off all gel sets', '£40 × 20% = £8 off, × 20 clients', '£160', '20 visits at £32, many from regulars who would have paid £40'],
            ['Gift card: pay £45, get £50', '£5 bonus × 20 cards', '£100', '£900 cash now and 20 future visits, some from new clients'],
            ['3 sets prepaid for £110', '(£40 × 3) − £110 = £10 saving, × 20 clients', '£200', '£2,200 upfront and 60 visits already booked in'],
          ]}
        />
        <p className="text-gray-700 leading-relaxed">The discount costs real money on visits you would have had anyway. The gift card and bundle cost similar amounts but bring cash and future bookings. To check your own margins per service before setting an offer, use the <Link to="/tools/nail-tech-pricing-calculator" className={link}>nail tech pricing calculator</Link>.</p>
      </section>

      <section id="if-you-discount">
        <h2 className="font-serif text-2xl font-bold mb-4">If you want to offer a discount</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you do choose to discount, protect your pricing:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Discount new client first bookings only, not your existing client base (they would book anyway).</li>
          <li>Time-limit it strictly: &quot;valid for bookings made by Sunday [date], 9pm&quot; or &quot;first 5 bookings only&quot;.</li>
          <li>Apply it to quiet periods, for example &quot;£5 off a Monday to Wednesday appointment in December&quot;.</li>
          <li>Leave your premium complex sets out of it: protect the services that show your highest skill level.</li>
          <li>Take a deposit on discounted bookings so deal hunters still show up.</li>
        </ul>
        <ArticleTip>A fixed amount off (£5) is easier to afford than a percentage on high-value sets: 20% of a £70 set is £14, while £5 stays £5.</ArticleTip>
      </section>

      <section id="content-ideas">
        <h2 className="font-serif text-2xl font-bold mb-4">Content ideas for Black Friday week</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Announce your gift card offer on Black Friday morning.</li>
          <li>&quot;Treat yourself this Black Friday&quot;: self-care angle.</li>
          <li>&quot;Give the gift of gorgeous nails&quot;: gifting angle for gift cards.</li>
          <li>A Story countdown sticker to the offer ending.</li>
          <li>Behind the scenes: wrapping physical gift cards or printing vouchers.</li>
          <li>&quot;Skip the sales queue, book your Christmas nails instead&quot;: playful alternative angle.</li>
        </ul>
      </section>

      <section id="timing">
        <h2 className="font-serif text-2xl font-bold mb-4">Timing your promotion</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many brands now run Black Friday for a full week. For a nail tech, a short window works better because the deadline is believable:</p>
        <ArticleSteps
          steps={[
            { title: 'Monday to Wednesday: tease', body: 'A Story poll ("Should I do a Black Friday gift card offer?") and a "something is coming Friday" post.' },
            { title: 'Thursday or Friday morning: announce', body: 'Feed post plus Stories with the exact offer, price and deadline. Pin the post.' },
            { title: 'Saturday: remind', body: 'Share a photo of a physical gift card or a client gift message. Repost the offer.' },
            { title: 'Sunday evening: last chance', body: '"Ends tonight at 9pm" Story. Then close it, and don\'t extend.' },
          ]}
        />
        <p className="text-gray-700 leading-relaxed">Then move straight into December: <Link to="/blog/christmas-marketing-ideas-nail-techs" className={link}>Christmas marketing ideas for nail techs</Link>.</p>
      </section>
    </div>
  ),
});
export {};
