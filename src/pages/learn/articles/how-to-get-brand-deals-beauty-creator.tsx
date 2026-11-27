import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-get-brand-deals-beauty-creator',
  title: 'How to Get Brand Deals as a Beauty Creator (+ Media Kit Checklist)',
  coverTitle: 'Land Your First Brand Deal',
  seoTitle: 'How to Get Brand Deals as a Beauty Creator + Media Kit',
  excerpt: 'How beauty creators land brand deals, even as a small creator: getting brand-ready, building a media kit (with a checklist), finding and pitching brands, pricing the deal and negotiating usage rights.',
  seoDescription: 'How to get brand deals as a small beauty creator: get brand-ready, build a media kit (checklist inside), pitch brands with a template, price and negotiate the deal.',
  category: 'beauty-creators',
  audience: ['creators'],
  craft: 'all',
  tags: ['how to get brand deals', 'how to get brand deals as a small creator', 'beauty influencer media kit', 'how to make a media kit for brand deals', 'brand collaborations'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to get brand deals as a beauty creator',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-25',
  tldr: {
    answer: 'Make your niche obvious, show proof, pitch brands you already use.',
    detail: 'Brands look for creators whose audience matches their customer and whose content they would be proud to share. Get brand-ready (clear niche, consistent content, a media kit), pitch with one specific idea, and price from your numbers, not from what others say they earn.',
    points: [
      { label: 'Before pitching', text: 'A clear niche and 9 to 12 posts that look like sponsored content could.' },
      { label: 'Media kit', text: 'One page: who you are, audience, numbers, examples, offers, contact.' },
      { label: 'Pricing', text: 'Your time and reach, plus usage rights and exclusivity.' },
    ],
  },
  toc: [
    { id: 'how', label: 'How beauty brand deals work' },
    { id: 'ready', label: '1. Get brand-ready' },
    { id: 'media-kit', label: '2. Build your media kit (checklist)' },
    { id: 'find', label: '3. Find the right brands' },
    { id: 'pitch', label: '4. Pitch with one idea' },
    { id: 'price', label: '5. Price the deal' },
    { id: 'negotiate', label: '6. Negotiate and sign' },
    { id: 'deliver', label: '7. Deliver and get rebooked' },
    { id: 'red-flags', label: 'Red flags in brand offers' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['ugc-for-beauty-brands', 'how-beauty-creators-make-money-on-instagram', 'how-to-make-money-on-tiktok-beauty-creator'],
  relatedLinks: { tool: '/tools/creator-rate-calculator', pages: ['/features/link-in-bio', '/use-cases/beauty-creators'] },
  faq: [
    { q: 'How many followers do you need to get brand deals?', a: 'There is no official minimum. Small creators with a clear niche and an engaged audience do get paid deals, often from smaller and local brands, or as gifted collaborations at first. Larger audiences usually command higher fees.' },
    { q: 'What should a beauty influencer media kit include?', a: 'Your name and niche, a short bio, audience data (countries or cities, age range, gender split) from your insights, follower counts and engagement rate per platform, examples of your best content, past collaborations if any, the formats you offer and how to contact you.' },
    { q: 'Should I put my rates in my media kit?', a: 'It is your choice. Listing starting rates saves time and filters out brands that cannot pay. Leaving them out lets you quote per brief. Many creators keep a separate rate sheet that they send on request.' },
    { q: 'Should I accept gifted collaborations?', a: 'Gifted products can be a way to build a portfolio with brands you love, but they are not payment for your time. Accept them only if you would post about the product anyway, and do not promise content in exchange unless it is worth it for you.' },
    { q: 'Do I need to disclose sponsored posts?', a: 'Yes. Use the platform\'s paid partnership or disclosure tool and a clear label such as #ad. Advertising rules in many countries require it, and brands expect it.' },
    { q: 'How do I find a brand\'s contact for collaborations?', a: 'Look for a creator or partnerships email on the brand\'s website or Instagram profile, search LinkedIn for their social media or influencer marketing manager, or apply through their creator program if they have one.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Makeup, skincare, hair, lash, brow and nail creators who want paid collaborations with beauty brands, including small creators getting their first deal.
      </ArticleCallout>

      <section id="how">
        <h2 className={h2}>How beauty brand deals work</h2>
        <p className={p}>In a brand deal, a beauty brand pays you to create content about its product and post it on your account. The fee pays for your content, your audience&apos;s attention, and often the right for the brand to reuse the content. Common deliverables:</p>
        <ArticleTable
          headers={['Deliverable', 'What the brand gets', 'Good for']}
          rows={[
            ['Reel or TikTok', 'A video on your account, often reused by the brand', 'Launches, tutorials, routines'],
            ['Carousel', 'A saveable post with steps or swatches', 'Shade ranges, routines'],
            ['Stories (a set of 3 to 5)', 'Short-lived reach, link sticker clicks', 'Discount codes, launches'],
            ['Affiliate or code', 'Commission per sale on top of a fee or alone', 'Ongoing partnerships'],
            ['Ambassador deal', 'Several posts over months', 'Brands you use for real'],
          ]}
        />
        <p className={p}>If a brand only wants the content, not your audience, that is UGC: see <Link to="/blog/ugc-for-beauty-brands" className={a}>UGC for beauty brands</Link>.</p>
      </section>

      <section id="ready">
        <h2 className={h2}>1. Get brand-ready</h2>
        <p className={p}>Before you pitch, look at your profile as a brand manager would. In a few seconds they want to know who you are for, whether your content looks good next to their product, and whether your audience reacts.</p>
        <ArticleChecklist
          items={[
            'A clear niche in your bio: for example "skincare for sensitive skin" or "bridal makeup in Leeds".',
            'Consistent, well-lit content: your last 9 to 12 posts would not embarrass a brand.',
            'Proof of engagement: comments and saves, not just likes. Check your rate with the free engagement calculator.',
            'A few posts about products you already love, unsponsored, that show how you would feature a brand.',
            'A professional contact: an email in your bio and a link page.',
          ]}
        />
        <ArticleTip>Make one &quot;spec&quot; post per month: content about a product you use, made exactly like a sponsored post would be. It shows brands what working with you looks like.</ArticleTip>
      </section>

      <section id="media-kit">
        <h2 className={h2}>2. Build your media kit (checklist)</h2>
        <p className={p}>A media kit is a one or two-page PDF or web page that a brand can read in a minute. Make it in Canva or any design tool, and update the numbers every month or two.</p>
        <ArticleChecklist
          title="Media kit checklist"
          items={[
            'Your name, photo or logo, niche in one line, location if relevant.',
            'Short bio: who you create for and what you are known for.',
            'Platforms with handles, follower counts and engagement rate, with the date of the numbers.',
            'Audience: top countries or cities, age range and gender split, from your insights.',
            'Average views on Reels or TikToks and story views (pick a period and say which).',
            '3 to 6 examples of your best content, with links.',
            'Past brand partners or results, only if real and shareable.',
            'What you offer: Reels, TikToks, carousels, stories, UGC, LIVEs, affiliate.',
            'Starting rates or "rates on request", and a contact email.',
          ]}
        />
        <ArticleCallout variant="warning" title="Only real numbers">
          Never round up followers or invent results. Brands can ask for screenshots of your insights, and a mismatch ends a relationship before it starts.
        </ArticleCallout>
        <ArticleImage src="photo-1586281380349-632531db7ed4" alt="Clipboard with a blank checklist next to a laptop on a marble desk" />
      </section>

      <section id="find">
        <h2 className={h2}>3. Find the right brands</h2>
        <p className={p}>The best first brands are the ones already in your content. List the products you use and mention, then add brands that fit your niche and your audience&apos;s budget.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Brands you use:</strong> easy to pitch with real enthusiasm and existing content.</li>
          <li><strong>Indie and local brands:</strong> often more open to small creators and faster to decide.</li>
          <li><strong>Brands working with creators like you:</strong> check who similar creators tag in paid partnerships.</li>
          <li><strong>Creator programs and marketplaces:</strong> some brands run application forms or use creator platforms.</li>
          <li><strong>Pro brands, if you are a beauty pro:</strong> professional lash, nail, brow and skincare brands like creators who show the product in real client work.</li>
        </ul>
      </section>

      <section id="pitch">
        <h2 className={h2}>4. Pitch with one specific idea</h2>
        <p className={p}>Generic pitches (&quot;I would love to collaborate!&quot;) get ignored. A short message with one concrete idea shows you understand the product and the audience.</p>
        <ArticleCallout variant="tip" title="Pitch template">
          Subject: [Your name] x [Brand]: [idea in five words]<br /><br />
          Hi [name], I create [niche] content for [audience] on [platform]. I have been using [product] for [time] and my followers often ask about [problem it solves].<br /><br />
          Idea: a [format] showing [specific result or routine], posted around [date or moment].<br /><br />
          My media kit is attached, with audience data and examples. Would this fit your plans for [season or launch]?<br /><br />
          [Name, handle, email]
        </ArticleCallout>
        <ArticleSteps
          steps={[
            { title: 'Send to a person, not a generic inbox', body: 'Find the social or partnerships contact. Personal emails get read more often.' },
            { title: 'Follow up once', body: 'After about a week, reply to your own email with one new detail (a recent post that did well).' },
            { title: 'Track your pitches', body: 'A simple sheet: brand, contact, date, idea, reply. You will see which pitches work.' },
          ]}
        />
      </section>

      <section id="price">
        <h2 className={h2}>5. Price the deal</h2>
        <p className={p}>Rates quoted online vary too much to rely on. Build yours from two parts: the cost of producing the content (your time and expenses) and the value of your audience (reach and engagement), then add usage and exclusivity.</p>
        <ArticleCallout variant="tip" title="Worked example (illustrative numbers, not market rates)">
          A Reel takes you 4 hours to plan, film and edit. You value your time at $45 an hour: production = 4 x $45 = $180. Your Reels average 6,000 views and you decide to charge $15 per 1,000 average views for the reach: 6 x $15 = $90. Base price = $180 + $90 = $270. The brand wants to use the Reel in ads for 3 months, which you price at 30% of the base: + $81. Quote: $351. Every input here is your choice, so write them down and use the same method for each deal.
        </ArticleCallout>
        <p className={p}>The <Link to="/tools/creator-rate-calculator" className={a}>creator rate calculator</Link> runs this for you, and the <Link to="/tools/instagram-engagement-calculator" className={a}>engagement calculator</Link> gives you the number brands will ask for.</p>
        <ArticleImage src="photo-1460925895917-afdab827c52f" alt="Laptop showing an analytics dashboard with charts" />
      </section>

      <section id="negotiate">
        <h2 className={h2}>6. Negotiate and sign</h2>
        <p className={p}>If the budget is lower than your quote, change the scope instead of only lowering the price: fewer deliverables, shorter usage, no exclusivity, or stories instead of a Reel. Then put everything in writing.</p>
        <ArticleTable
          headers={['Point to agree', 'Why it matters']}
          rows={[
            ['Deliverables and dates', 'Avoids "can you add a TikTok too?" after the fact'],
            ['Approval and revisions', 'How many rounds of changes are included'],
            ['Usage rights', 'Where the brand can reuse your content and for how long'],
            ['Exclusivity', 'Which competitors you cannot work with, and until when'],
            ['Payment terms', 'Amount, deposit, due date, invoice details'],
            ['Disclosure', 'Paid partnership label, #ad, and any brand wording'],
          ]}
        />
      </section>

      <section id="deliver">
        <h2 className={h2}>7. Deliver and get rebooked</h2>
        <p className={p}>The easiest deal to land is the second one with the same brand. Deliver on time, send a short results report one or two weeks after posting (reach, views, saves, link clicks, screenshots), and suggest a next idea. Brands remember creators who make their job easy.</p>
        <ArticleImage src="photo-1516975080664-ed2fc6a32937" alt="Makeup brushes in a cup on a vanity" />
      </section>

      <section id="red-flags">
        <h2 className={h2}>Red flags in brand offers</h2>
        <ArticleChecklist
          title="Slow down if you see"
          items={[
            'A request to pay for products or a "starter kit" before you are paid.',
            'No written agreement, or terms that change after you deliver.',
            'Unlimited, perpetual usage of your content for a one-time small fee.',
            'Long exclusivity that blocks your whole category for a single post.',
            'Pressure to make claims you cannot back up, especially health or medical claims.',
            'A request to hide that the post is sponsored.',
          ]}
        />
        <p className={p}>A real brand will put the deal in writing and answer questions about usage and payment. If it will not, walk away.</p>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>Brand deals often come once your profile shows what you do and how to work with you. If you also take clients, Nelsy gives you a booking page for your link in bio, with deposits and payments, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/link-in-bio" className={a}>link in bio</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
