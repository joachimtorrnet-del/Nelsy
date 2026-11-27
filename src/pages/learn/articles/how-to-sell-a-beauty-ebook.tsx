import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-sell-a-beauty-ebook',
  title: 'How to Sell a Beauty Ebook or Guide (Step by Step)',
  coverTitle: 'Sell Your Beauty Ebook',
  seoTitle: 'How to Sell a Beauty Ebook or PDF Guide Online',
  excerpt: 'How to write, design and sell a beauty ebook or PDF guide from Instagram: picking a topic people pay for, outlining it, pricing it, and getting your first sales without a big audience.',
  seoDescription: 'How to sell a beauty ebook or PDF guide: pick a topic people pay for, write and design it in Canva, set a price, and sell it from Instagram and your link in bio.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['how to sell an ebook', 'sell pdf guides online', 'beauty ebook', 'lash tech ebook', 'makeup artist ebook', 'digital products'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to sell a beauty ebook or guide',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-23',
  tldr: {
    answer: 'Sell the answer to a question people already DM you about.',
    detail: 'A beauty ebook sells when it solves one specific problem for one specific reader. Write it short, design it in a template, price it on the result, and sell it from your link in bio with a few posts that show what is inside.',
    points: [
      { label: 'Best first topic', text: 'The question you answer most in DMs or comments.' },
      { label: 'Length', text: '15 to 40 pages is plenty for a focused guide.' },
      { label: 'Where it sells', text: 'Instagram and TikTok, through the link in your bio.' },
    ],
  },
  toc: [
    { id: 'what-sells', label: 'What kind of beauty ebook sells' },
    { id: 'topic', label: '1. Pick a topic people pay for' },
    { id: 'outline', label: '2. Outline it before you write' },
    { id: 'write', label: '3. Write and design it' },
    { id: 'price', label: '4. Set your price' },
    { id: 'where', label: '5. Choose where to sell it' },
    { id: 'launch', label: '6. Launch it on Instagram and TikTok' },
    { id: 'after', label: '7. Keep it selling' },
    { id: 'legal', label: 'Copyright, refunds and taxes' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['digital-product-ideas-for-beauty-creators', 'how-to-price-a-digital-product-or-course', 'how-to-build-email-list-beauty-creator'],
  relatedLinks: { tool: '/tools/creator-rate-calculator', pages: ['/features/link-in-bio', '/use-cases/beauty-creators'] },
  faq: [
    { q: 'Can I sell a beauty ebook with a small following?', a: 'Yes. An ebook that solves a precise problem (for example lash retention for new techs) sells to a small, targeted audience. What matters is that the people who follow you have that problem and trust your work.' },
    { q: 'How long should a beauty ebook be?', a: 'Long enough to solve the problem and no longer. For a focused guide, 15 to 40 pages with photos, checklists and examples is usually plenty. Readers pay for the result, not the page count.' },
    { q: 'What format should I use for an ebook?', a: 'A PDF is the simplest: it opens on any phone or laptop and keeps your layout and photos. Design it in Canva, Google Docs or Keynote and export it as PDF.' },
    { q: 'Can I sell an ebook on Instagram directly?', a: 'Instagram does not host the file or the checkout for you. You post about the guide, then send people to a page where they can pay and download it, usually through the link in your bio or a DM with the link.' },
    { q: 'Do I need to register a business to sell an ebook?', a: 'Rules depend on your country and how much you sell. Selling digital products is usually treated as business income, and some countries charge VAT or sales tax on digital sales. Check with a local accountant before your first launch.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Nail techs, lash and brow artists, makeup artists, hairstylists, estheticians and beauty creators who get the same questions over and over and want to turn the answer into a product.
      </ArticleCallout>

      <section id="what-sells">
        <h2 className={h2}>What kind of beauty ebook sells</h2>
        <p className={p}>A beauty ebook (or PDF guide) is a file you make once and sell many times. The ones that sell are narrow. &quot;Everything about makeup&quot; competes with free YouTube. &quot;Bridal makeup that lasts 12 hours: my exact prep, products and timeline&quot; does not, because it is specific, it comes from your work, and it saves the reader trial and error.</p>
        <p className={p}>There are two kinds of buyers, and it helps to pick one per guide:</p>
        <ArticleTable
          headers={['Buyer', 'What they want', 'Example guides']}
          rows={[
            ['Other beauty pros', 'To work faster, earn more, avoid mistakes', 'Lash mapping guide, nail tech pricing workbook, client consultation scripts, studio setup checklist'],
            ['Your followers (consumers)', 'To get a result at home', 'Skincare routine for oily skin, everyday makeup in 10 minutes, how to make a manicure last, curly hair wash-day guide'],
          ]}
        />
        <p className={p}>Guides for pros usually sell at a higher price because they help the buyer make money. Guides for consumers can reach more people but compete with more free content, so they need a clear, specific promise.</p>
      </section>

      <section id="topic">
        <h2 className={h2}>1. Pick a topic people pay for</h2>
        <p className={p}>Your best topic is already in your inbox. Spend 20 minutes going through your DMs, comments and client questions, and write down every question you get more than once. Then score each one:</p>
        <ArticleChecklist
          title="A topic worth writing"
          items={[
            'People ask it without being prompted, more than once.',
            'You can answer it better than a quick search can, from your own work.',
            'The answer leads to a clear result (fewer lifts, a faster routine, a full calendar).',
            'It takes more than one post or video to explain properly.',
            'The reader would feel the result was worth more than the price.',
          ]}
        />
        <p className={p}>Then test it before you write a word. Post a story poll (&quot;Would a step-by-step guide on X help you?&quot;), or a Reel that answers part of the question and ends with &quot;comment GUIDE if you want the full version&quot;. The replies tell you if the topic has buyers, and they become your first waitlist.</p>
        <ArticleTip>If you are not sure between two topics, pick the one where you have the most photos or videos of real results. Visual proof sells a beauty guide more than any description.</ArticleTip>
      </section>

      <section id="outline">
        <h2 className={h2}>2. Outline it before you write</h2>
        <p className={p}>A guide that sells feels like a path from problem to result. Outline it as steps, not as chapters about everything you know. A simple structure that works for most beauty guides:</p>
        <ArticleSteps
          steps={[
            { title: 'The promise', body: 'One page: who the guide is for, the result, and what they need before starting.' },
            { title: 'Why it goes wrong', body: 'The 3 to 5 mistakes you see most often, with photos if you have them.' },
            { title: 'The method', body: 'Your process, step by step, with one photo or diagram per step.' },
            { title: 'Tools and products', body: 'What you use and why, with cheaper alternatives where they exist.' },
            { title: 'Troubleshooting', body: 'What to do when it does not work: the questions clients and students ask after trying.' },
            { title: 'Templates or checklists', body: 'Something they can print or copy: a routine card, a price sheet, a consultation form.' },
          ]}
        />
        <ArticleImage src="photo-1484480974693-6ca0a78fb36b" alt="Hand writing a checklist in an open notebook" />
      </section>

      <section id="write">
        <h2 className={h2}>3. Write and design it</h2>
        <p className={p}>Write the way you talk to a client: short sentences, direct instructions, your own words. Then design it in a tool you already know.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Canva:</strong> has ebook and workbook templates you can restyle with your colors and fonts, then export as PDF.</li>
          <li><strong>Google Docs or Word:</strong> fine for text-heavy guides. Add headings, a cover page and your photos, then export as PDF.</li>
          <li><strong>Keynote or PowerPoint:</strong> each slide becomes a page, which works well for very visual guides.</li>
        </ul>
        <p className={p}>A few details make a guide feel worth paying for:</p>
        <ArticleChecklist
          items={[
            'A cover with the title, the promise and your name or brand.',
            'A clickable table of contents on page 2.',
            'Your own photos of real work, not stock images of products.',
            'One idea per page, with plenty of white space so it reads well on a phone.',
            'A last page with what to do next: book a session, follow you, or buy the next guide.',
          ]}
        />
        <p className={p}>Use only photos you own or have permission to use. If a photo shows a client, ask them first in writing, even if their face is not in it.</p>
      </section>

      <section id="price">
        <h2 className={h2}>4. Set your price</h2>
        <p className={p}>Price on the value of the result, not on the number of pages. A guide that helps a lash tech stop losing clients to retention problems is worth more to her than a longer guide of general tips.</p>
        <p className={p}>Three questions help you land on a number:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>What would the reader pay to solve this another way (a class, a 1:1 call, wasted product)?</li>
          <li>Is the buyer a pro who will earn money from it, or a consumer?</li>
          <li>How much support is included (none, a Q&amp;A, a bonus video)?</li>
        </ol>
        <p className={p}>For the full method, with worked examples, read <Link to="/blog/how-to-price-a-digital-product-or-course" className={a}>how to price a digital product or course</Link>.</p>
        <ArticleCallout variant="tip" title="Worked example (illustrative numbers)">
          You price a nail tech pricing workbook at $27 and your payment processor takes, for example, 2.9% + $0.30 per sale. Each sale leaves you $27 minus $0.78 minus $0.30 = $25.92 before tax. If your goal is $500 from the launch, you need 500 / 25.92 = about 20 sales. Check your own processor&apos;s rates: they vary by country and payment method.
        </ArticleCallout>
      </section>

      <section id="where">
        <h2 className={h2}>5. Choose where to sell it</h2>
        <p className={p}>You need three things: a page that explains the guide, a checkout, and automatic delivery of the file after payment. You can get them from different kinds of tools:</p>
        <ArticleTable
          headers={['Option', 'Good for', 'Watch out for']}
          rows={[
            ['Link-in-bio store', 'Selling from Instagram and TikTok with one link', 'Fees on sales vary by tool and plan'],
            ['Marketplace (Etsy and similar)', 'Being found by people searching the marketplace', 'Listing and transaction fees, less control over the customer relationship'],
            ['Course or digital product platform', 'Guides bundled with videos or a course', 'Higher monthly prices on some platforms'],
            ['Your own website', 'Full control of the design', 'More setup: checkout, delivery, tax'],
          ]}
        />
        <p className={p}>If most of your audience comes from Instagram or TikTok, a link-in-bio page is the shortest path from a post to a purchase. We compared the main options in <Link to="/blog/best-link-in-bio-for-beauty-creators" className={a}>best link in bio for beauty creators</Link> and <Link to="/blog/stan-store-alternatives-for-beauty-creators" className={a}>Stan Store alternatives</Link>.</p>
      </section>

      <section id="launch">
        <h2 className={h2}>6. Launch it on Instagram and TikTok</h2>
        <p className={p}>A launch is a short, focused week of content where the guide is the main topic. A simple 7-day plan:</p>
        <ArticleTable
          headers={['Day', 'Post', 'Goal']}
          rows={[
            ['1', 'Reel: the problem the guide solves, with a before and after', 'Make people feel the problem'],
            ['2', 'Carousel: 3 mistakes from the guide', 'Show you know the topic'],
            ['3', 'Stories: a look inside the PDF, page by page', 'Show what they get'],
            ['4', 'Launch post: what it is, who it is for, the price, link in bio', 'First sales'],
            ['5', 'Stories: answers to questions people sent', 'Remove doubts'],
            ['6', 'Reel: one quick tip from the guide', 'Reach new people'],
            ['7', 'Stories: last reminder of a launch bonus, if you offered one', 'Late buyers'],
          ]}
        />
        <p className={p}>If you collected emails or a waitlist while testing the topic, write to them first: they are the warmest buyers. See <Link to="/blog/how-to-build-email-list-beauty-creator" className={a}>how to build an email list as a beauty creator</Link>.</p>
        <ArticleImage src="photo-1769596722174-38df0c84206b" alt="Laptop and pink phone on a wooden desk with dried flowers" />
      </section>

      <section id="after">
        <h2 className={h2}>7. Keep it selling after launch</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Pin a post</strong> about the guide to the top of your profile.</li>
          <li><strong>Add a highlight</strong> with the inside pages and buyer questions.</li>
          <li><strong>Answer DMs with the link</strong> when someone asks the question the guide answers.</li>
          <li><strong>Ask buyers for feedback</strong> one or two weeks later, and with their permission share what they say.</li>
          <li><strong>Update it</strong> once a year and tell past buyers they get the new version.</li>
        </ul>
        <p className={p}>Once one guide sells, the next step is usually a second guide for the same buyer, a bundle, or a course. Ideas in <Link to="/blog/digital-product-ideas-for-beauty-creators" className={a}>35 digital product ideas for beauty creators</Link> and <Link to="/blog/how-to-create-an-online-beauty-course" className={a}>how to create an online beauty course</Link>.</p>
        <ArticleImage src="photo-1583209814683-c023dd293cc6" alt="Pink skincare jars and tubes laid out on a light background" />
      </section>

      <section id="legal">
        <h2 className={h2}>Copyright, refunds and taxes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Your content is yours.</strong> Do not copy text, photos or diagrams from other educators or brands.</li>
          <li><strong>Write a refund policy</strong> before launch and show it on the sales page. Many sellers of digital files do not refund after download; whatever you choose, say it clearly.</li>
          <li><strong>Add a disclaimer</strong> for anything that touches skin, eyes or health: the guide is education, not medical advice, and readers should patch test.</li>
          <li><strong>Taxes:</strong> digital sales can be subject to VAT or sales tax depending on where the buyer lives. Ask a local accountant.</li>
        </ul>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>Many beauty creators who sell guides also take clients. Nelsy today is a booking page for that side of the business: your services, deposits and payments behind your link in bio, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/link-in-bio" className={a}>link in bio</Link> and <Link to="/features/deposits" className={a}>deposits</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> and we will email you when it opens.</p>
      </section>
    </div>
  ),
});
export {};
