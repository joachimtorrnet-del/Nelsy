import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'ugc-for-beauty-brands',
  title: 'UGC for Beauty Brands: How to Start and What to Charge',
  seoTitle: 'Beauty UGC Creator: How to Start and What to Charge',
  excerpt: 'How to become a beauty UGC creator: what brands want, how to build a portfolio with no clients, how to find beauty brands, and how to calculate your rate for videos, raw footage and usage rights.',
  seoDescription: 'How to become a beauty UGC creator: build a portfolio, find brands and calculate your rate per video, with usage rights and raw footage. Worked examples.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['ugc beauty creator', 'how to become a ugc creator', 'how much to charge for ugc video', 'ugc rates', 'ugc usage rights'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'UGC for beauty brands',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-25',
  tldr: {
    answer: 'Brands pay UGC creators for content, not followers: price your time, then add rights.',
    detail: 'A beauty UGC rate is your base fee for making the video (time, skill, products, equipment), plus extras the brand asks for: usage rights for ads, exclusivity, raw footage, extra hooks or edits. Calculate it, put it in a rate sheet, and adjust per brief.',
    points: [
      { label: 'Followers needed', text: 'None: the brand posts the content, not you.' },
      { label: 'Portfolio to start', text: '3 to 6 sample videos with products you own.' },
      { label: 'Always priced separately', text: 'Paid ad usage, exclusivity, raw footage.' },
    ],
  },
  toc: [
    { id: 'what', label: 'What beauty UGC is' },
    { id: 'want', label: 'What beauty brands want' },
    { id: 'portfolio', label: '1. Build a portfolio with no clients' },
    { id: 'kit', label: '2. Your filming kit' },
    { id: 'find', label: '3. Find and pitch beauty brands' },
    { id: 'rate', label: '4. Calculate your rate' },
    { id: 'extras', label: '5. Usage rights, raw footage and extras' },
    { id: 'contract', label: '6. Contracts and getting paid' },
    { id: 'rate-sheet', label: 'A simple UGC rate sheet template' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['how-to-get-brand-deals-beauty-creator', 'how-to-make-money-on-tiktok-beauty-creator', 'how-to-price-a-digital-product-or-course'],
  relatedLinks: { tool: '/tools/creator-rate-calculator', pages: ['/features/link-in-bio', '/use-cases/beauty-creators'] },
  faq: [
    { q: 'Do you need followers to be a UGC creator?', a: 'No. In UGC the brand publishes the content on its own channels or in ads, so it pays for the quality of the video, not your audience. A portfolio of good sample videos matters more than follower count.' },
    { q: 'How much should I charge for a UGC video?', a: 'There is no fixed market rate. Calculate a base fee from the hours the video takes and the hourly rate you need, add product and equipment costs, then add separate fees for paid ad usage, exclusivity, raw footage and extra edits. Our worked example shows the math step by step.' },
    { q: 'What are UGC usage rights?', a: 'Usage rights define where and for how long the brand can use your content: organic posts on its own accounts, paid ads, website, email, and for how many months. Paid ad usage and longer periods are usually charged extra because the content works harder for the brand.' },
    { q: 'Should I send raw footage to a brand?', a: 'Only if it is in the agreement. Raw footage lets a brand cut many new ads from your work, so creators usually price it as an add-on rather than including it for free.' },
    { q: 'Can beauty pros do UGC?', a: 'Yes, and they have an edge: a nail tech, lash artist or makeup artist can film products in real use with professional results, which is what many beauty brands look for.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Beauty creators and beauty pros who want to get paid by brands for photos and videos, whatever their follower count.
      </ArticleCallout>

      <section id="what">
        <h2 className={h2}>What beauty UGC is (and how it differs from influencer work)</h2>
        <p className={p}>UGC stands for user-generated content. In practice, a UGC creator is paid by a brand to make content that looks like a real customer made it: an unboxing, a routine, a before and after, a &quot;3 reasons I switched&quot; video. The brand then posts it on its own accounts, on its product pages, or uses it in paid ads.</p>
        <ArticleTable
          headers={['', 'UGC creator', 'Influencer']}
          rows={[
            ['Who posts the content', 'The brand', 'You, on your account'],
            ['What the brand pays for', 'The content and the right to use it', 'Your audience and the content'],
            ['Followers needed', 'No minimum', 'Usually more matters'],
            ['What drives your rate', 'Time, skill, deliverables, usage rights', 'Reach, engagement, deliverables, usage'],
          ]}
        />
        <p className={p}>You can do both. Many creators start with UGC because it pays from the first client, then add sponsored posts as their audience grows (see <Link to="/blog/how-to-get-brand-deals-beauty-creator" className={a}>how to get brand deals</Link>).</p>
      </section>

      <section id="want">
        <h2 className={h2}>What beauty brands want from UGC</h2>
        <ArticleChecklist
          items={[
            'A strong first 1 to 2 seconds (the hook): a result, a problem, a surprising claim the product can back up.',
            'The product in use, on real skin, hair, lashes or nails, in good light.',
            'Natural, trustworthy delivery: talking to camera like you would to a friend.',
            'Clear texture and result shots: swatches, application, finish, wear after hours.',
            'Vertical video, clean sound, no background music unless asked (brands add their own).',
            'Several hook versions of the same video, so they can test them in ads.',
          ]}
        />
        <ArticleImage src="photo-1631730486572-226d1f595b68" alt="Makeup and skincare bottles on a pink surface" />
      </section>

      <section id="portfolio">
        <h2 className={h2}>1. Build a portfolio with no clients</h2>
        <p className={p}>Brands want to see what you can do before they pay you. Make sample videos with products you already own, as if a brand had briefed you.</p>
        <ArticleSteps
          steps={[
            { title: 'Pick 3 to 6 products you use', body: 'Ideally from different categories: a skincare product, a makeup product, a tool, a hair or nail product.' },
            { title: 'Make one video per format', body: 'Unboxing, routine or tutorial, before and after, testimonial to camera, problem and solution.' },
            { title: 'Keep them short', body: 'Aim for 15 to 45 seconds per video, and show you can tell a clear story in that time.' },
            { title: 'Put them on one page', body: 'A simple portfolio page or a shared folder with your best videos, your name, contact and the formats you offer.' },
          ]}
        />
        <ArticleTip>Do not put competitor logos front and center in sample videos you send to a brand. Turn labels away or use unbranded products where possible.</ArticleTip>
      </section>

      <section id="kit">
        <h2 className={h2}>2. Your filming kit</h2>
        <p className={p}>A recent phone, a tripod, a ring light or a softbox, a clip-on microphone and a clean background are enough. For beauty, light matters most: textures and shades must look true to life, or the brand cannot use the video. If you are a beauty pro, your work station is already a great set. Filming tips in <Link to="/blog/how-to-film-nail-tech-tiktok-reels" className={a}>how to film TikToks and Reels</Link>.</p>
      </section>

      <section id="find">
        <h2 className={h2}>3. Find and pitch beauty brands</h2>
        <p className={p}>Start with brands you already use: you can speak about them honestly, and your sample videos may already feature them. Small and growing beauty brands that run ads are often the most open to new UGC creators.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Where to look:</strong> brands running ads in your feed, indie brands at local shops, brands tagged by other creators, UGC and creator marketplaces.</li>
          <li><strong>Who to contact:</strong> the marketing, social or creator partnerships person, found on LinkedIn or the brand&apos;s website.</li>
          <li><strong>What to send:</strong> a short email or DM with one idea for their product, a link to your portfolio and your rate sheet or &quot;rates on request&quot;.</li>
        </ul>
        <ArticleCallout variant="tip" title="Pitch template">
          Hi [name], I am a [lash artist / makeup creator] and I make short UGC videos for beauty brands. I already use [product] and have an idea: a 30-second [before and after / routine] showing [specific result]. Portfolio: [link]. Would you be open to a first video? Happy to send my rates.
        </ArticleCallout>
      </section>

      <section id="rate">
        <h2 className={h2}>4. Calculate your rate</h2>
        <p className={p}>You will see many &quot;UGC rates&quot; quoted online. They vary hugely by country, niche and experience, and none of them knows your costs. Calculate your own base fee instead, then adjust to the brief.</p>
        <ArticleSteps
          steps={[
            { title: 'Count the hours', body: 'Brief and script, setup, filming, editing, revisions, admin. Be honest: a 30-second video can take a half day.' },
            { title: 'Pick your hourly rate', body: 'What you need to earn per hour after taxes and costs. Beauty pros can start from their service hourly rate.' },
            { title: 'Add costs', body: 'Products you buy, props, a share of equipment and software.' },
            { title: 'Base fee = hours x hourly rate + costs', body: 'This covers making the video and the brand posting it on its own organic channels for an agreed period.' },
            { title: 'Add extras', body: 'Paid ad usage, longer usage periods, exclusivity, raw footage, extra hooks, rush delivery.' },
          ]}
        />
        <ArticleCallout variant="tip" title="Worked example (illustrative numbers, not market rates)">
          A video takes you 5 hours in total. You set your hourly rate at $40. Products and props cost $15. Base fee = 5 x $40 + $15 = $215. The brand also wants 3 hook variations (you estimate 1 extra hour: + $40) and 3 months of paid ad usage, which you price at 30% of the base fee (+ $64.50). Quote: $215 + $40 + $64.50 = $319.50, rounded to $320. Change any input and the math still works.
        </ArticleCallout>
        <p className={p}>The <Link to="/tools/creator-rate-calculator" className={a}>creator rate calculator</Link> helps you run these numbers. If you already price beauty services, the same logic is in <Link to="/blog/how-to-calculate-nail-tech-hourly-rate" className={a}>how to calculate your hourly rate</Link>.</p>
        <ArticleImage src="photo-1583209814683-c023dd293cc6" alt="Pink skincare jars and tubes laid out on a light background" />
      </section>

      <section id="extras">
        <h2 className={h2}>5. Usage rights, raw footage and extras</h2>
        <p className={p}>Put each extra on its own line in your rate sheet, so the brand sees what it is paying for and can choose.</p>
        <ArticleTable
          headers={['Extra', 'What it means', 'How creators often price it']}
          rows={[
            ['Paid ad usage', 'The brand runs your video as an ad', 'A percentage of the base fee per period (for example per month or per 3 months)'],
            ['Extended usage', 'Longer than the standard period', 'An added percentage per extra period'],
            ['Exclusivity', 'You cannot work with competitors for a time', 'Priced on the work you turn down during that time'],
            ['Raw footage', 'All unedited clips', 'A flat add-on, since the brand can cut many new videos'],
            ['Extra hooks or edits', 'Variations of the same video', 'Per variation, based on your time'],
            ['Whitelisting / partnership ads', 'Ads run through your account', 'Separate fee and a clear time limit'],
          ]}
        />
        <p className={p}>The percentages are your choice: write them down once in a rate sheet so you quote consistently.</p>
      </section>

      <section id="contract">
        <h2 className={h2}>6. Contracts and getting paid</h2>
        <ArticleChecklist
          title="Agree in writing before you film"
          items={[
            'Deliverables: number of videos, length, format, hooks, photos.',
            'Usage: where, paid or organic, for how long, and in which countries.',
            'Revisions: how many rounds are included.',
            'Deadlines and how products reach you.',
            'Fee, payment terms (for example 50% upfront for new clients) and invoice details.',
            'Exclusivity, if any, with dates.',
            'Disclosure rules if anything is posted on your own account.',
          ]}
        />
        <p className={p}>Keep track of income and expenses from the first job: UGC is usually treated as business income. A local accountant can tell you what to register and declare.</p>
        <ArticleImage src="photo-1599050751795-6cdaafbc2319" alt="Phone held over a card reader to pay contactless" />
      </section>

      <section id="rate-sheet">
        <h2 className={h2}>A simple UGC rate sheet template</h2>
        <p className={p}>Send the same one-page sheet to every brand and adjust per brief. Fill in your own numbers from the calculation above:</p>
        <ArticleTable
          headers={['Line', 'Your price']}
          rows={[
            ['1 video, up to 45 seconds, 1 hook, organic use for [period]', '[base fee]'],
            ['Extra hook variation', '[per variation]'],
            ['Photo set (5 edited photos)', '[price]'],
            ['Paid ad usage, per [period]', '[% of base fee]'],
            ['Raw footage', '[flat add-on]'],
            ['Rush delivery (under [x] days)', '[% added]'],
            ['Bundle of 3 videos', '[price, slightly under 3 singles]'],
          ]}
        />
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>Many UGC creators are also beauty pros with clients. Nelsy is the booking page for that side: services, deposits and payments behind your link in bio, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply).</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
