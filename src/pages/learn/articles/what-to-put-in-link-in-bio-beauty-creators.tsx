import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'what-to-put-in-link-in-bio-beauty-creators',
  title: 'What to Put in Your Link in Bio: Ideas and Examples for Beauty Creators',
  seoTitle: 'Link in Bio Ideas and Examples for Beauty Creators',
  excerpt: 'What to put in your link in bio as a beauty creator or beauty pro: the order that converts, 20 link ideas, button wording that gets clicks, and four example pages for makeup, lash, skincare and nail creators.',
  seoDescription: 'Link in bio ideas for beauty creators: what to put on the page, in which order, button wording that gets clicks, and 4 example layouts.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['link in bio ideas', 'link in bio examples for instagram', 'what to put in link in bio', 'instagram link in bio ideas', 'link in bio for beauty'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'What to put in your link in bio as a beauty creator',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'Lead with the one thing you most want people to do, then three or four links at most.',
    detail: 'A beauty link in bio page converts when the main action (book, buy, join) is at the top, every button says exactly what happens on click, and the rest is grouped and short. Update it every time your main offer changes.',
    points: [
      { label: 'Top button', text: 'Your main offer: book, buy the guide, join the waitlist.' },
      { label: 'Then', text: 'A free resource, your best content, how to contact you.' },
      { label: 'Remove', text: 'Dead links, old promos, anything that competes with the main action.' },
    ],
  },
  toc: [
    { id: 'job', label: 'The job of your link in bio' },
    { id: 'order', label: 'The order that converts' },
    { id: 'ideas', label: '20 link ideas for beauty creators' },
    { id: 'wording', label: 'Button wording that gets clicks' },
    { id: 'examples', label: '4 example pages' },
    { id: 'mistakes', label: 'Common mistakes' },
    { id: 'update', label: 'Keep it working' },
    { id: 'pros-vs-creators', label: 'Beauty pros vs. beauty creators' },
    { id: 'booking-link', label: 'What a booking link should show' },
    { id: 'promote', label: 'How to send people to your link' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['best-link-in-bio-for-beauty-creators', 'how-to-set-up-nail-tech-link-in-bio', 'how-to-build-email-list-beauty-creator'],
  relatedLinks: { tool: '/tools/instagram-engagement-calculator', pages: ['/features/link-in-bio', '/use-cases/turn-followers-into-bookings'] },
  faq: [
    { q: 'What should I put in my link in bio?', a: 'Your main offer first (booking, a product, a waitlist), then a free resource that collects emails, your best content or results, and a way to contact you. Keep it to about three to six links so people do not get lost.' },
    { q: 'How many links should a link in bio have?', a: 'As few as possible. Every extra link takes attention from the main one. One main button and three to five secondary links, grouped by theme, is a good starting point.' },
    { q: 'Should my link in bio go to my website?', a: 'Only if your website is fast on a phone and has the actions people want in one tap. A dedicated link page usually converts better from Instagram and TikTok because it shows only the next steps.' },
    { q: 'How often should I update my link in bio?', a: 'Each time your main offer changes (a launch, a new service, a sale), and check the whole page at least once a month for broken or outdated links.' },
    { q: 'Can I take bookings from my link in bio?', a: 'Yes. With a booking page as your link, people can see your services, prices and free times, book and pay a deposit without messaging you.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Beauty creators and beauty pros (makeup, lashes, brows, nails, hair, skin) who send people from Instagram or TikTok to one link. If you are choosing the tool itself, read <Link to="/blog/best-link-in-bio-for-beauty-creators" className={a}>best link in bio for beauty creators</Link>.
      </ArticleCallout>

      <section id="job">
        <h2 className={h2}>The job of your link in bio</h2>
        <p className={p}>Someone taps your link because a post made them want something: your lash set, your routine, your guide. The page has one job: get them to that thing in one or two taps. It is not a directory of everything you have ever done online.</p>
        <p className={p}>Start by answering one question: what is the single action that matters most for your business this month? For a beauty pro, it is usually a booking. For a creator, it might be a product, a waitlist or an email signup. That action goes at the top.</p>
      </section>

      <section id="order">
        <h2 className={h2}>The order that converts</h2>
        <ArticleSteps
          steps={[
            { title: 'Header: who you are and the promise', body: 'Photo or logo, name, one line on what you do ("Soft glam and bridal makeup, Lyon").' },
            { title: 'Main action', body: 'One big button: Book an appointment, Get the guide, Join the waitlist.' },
            { title: 'A free resource', body: 'A checklist, a mini-guide or a discount in exchange for an email. It turns visitors who are not ready into contacts.' },
            { title: 'Proof', body: 'Results, reviews, before and afters, press or brand partners.' },
            { title: 'Secondary links', body: 'Your kit or affiliate list, latest YouTube video, brand enquiries.' },
            { title: 'Contact and socials', body: 'Email for collaborations, other platforms as small icons.' },
          ]}
        />
        <ArticleImage src="photo-1512054502232-10a0a035d672" alt="Phone on a white desk next to a succulent" />
      </section>

      <section id="ideas">
        <h2 className={h2}>20 link ideas for beauty creators</h2>
        <p className={p}>Pick the few that serve your main action. You do not need all of them.</p>
        <ArticleTable
          headers={['Goal', 'Link ideas']}
          rows={[
            ['Bookings', 'Book an appointment; Bridal trial enquiries; Last-minute openings; Gift cards; Group or event bookings'],
            ['Products', 'Your guide or ebook; Your course or masterclass; Templates (price list, consultation form); Presets or content packs'],
            ['Audience', 'Free checklist for email signup; Newsletter; Waitlist for your next launch; Community or close friends group'],
            ['Trust', 'Reviews; Before and after gallery; FAQ and aftercare; Policies'],
            ['Brand work', 'Media kit; Brand enquiries email; My kit (affiliate links)'],
          ]}
        />
        <ArticleTip>If you are a beauty pro, put your aftercare and policies one tap away from the booking button. Clients who read them before booking cancel less and ask fewer questions.</ArticleTip>
      </section>

      <section id="wording">
        <h2 className={h2}>Button wording that gets clicks</h2>
        <p className={p}>A button should say what happens on click and what the person gets. Compare:</p>
        <ArticleTable
          headers={['Vague', 'Clear']}
          rows={[
            ['Services', 'Book your lash fill (free slots this week)'],
            ['Shop', 'Get my 10-minute makeup guide (PDF)'],
            ['Newsletter', 'Free skincare routine checklist'],
            ['Education', 'Join the waitlist for my lash mapping course'],
            ['Contact', 'Brand collaborations: email me'],
          ]}
        />
        <p className={p}>Keep it under about 40 characters so it fits on one line on a phone, and match the wording to the call to action in your posts (&quot;comment GUIDE&quot; in the Reel, &quot;Get the guide&quot; on the button). More wording in <Link to="/blog/nail-tech-call-to-action-examples" className={a}>call to action examples</Link>.</p>
      </section>

      <section id="examples">
        <h2 className={h2}>4 example pages</h2>
        <p className={p}>These are example layouts to adapt, not real accounts.</p>
        <ArticleTable
          headers={['Creator', 'Main button', 'Then', 'Bottom']}
          rows={[
            ['Makeup artist (bridal)', 'Bridal enquiries and trial booking', 'Bridal FAQ, gallery, reviews, free bridal timeline PDF', 'Brand enquiries, socials'],
            ['Lash artist', 'Book a full set or fill', 'Aftercare, policies, fill timing guide, gift cards', 'Waitlist for lash training'],
            ['Skincare creator', 'Get my routine guide', 'Free product checklist (email), my kit (affiliate), latest video', 'Media kit, socials'],
            ['Nail tech and educator', 'Book your nails', 'Nail art course waitlist, pricing workbook for nail techs, results', 'Brand enquiries'],
          ]}
        />
        <ArticleImage src="photo-1563986768609-322da13575f3" alt="Hand holding a phone in front of a laptop in a cafe" />
      </section>

      <section id="mistakes">
        <h2 className={h2}>Common mistakes</h2>
        <ArticleChecklist
          title="Check your page for these"
          items={[
            'More than one "main" button, so nothing stands out.',
            'Links to an old promo, a sold-out product or a broken page.',
            'A booking link that opens a form instead of real available times.',
            'Buttons named with one word ("Shop", "Links") that do not say what is behind them.',
            'No way to collect emails, so visitors who are not ready leave for good.',
            'A page that is slow or hard to read on a phone.',
          ]}
        />
      </section>

      <section id="update">
        <h2 className={h2}>Keep it working</h2>
        <p className={p}>Treat your link page like a shop window. Change the main button when your focus changes: a launch week, a slow month when you want bookings, a holiday season with gift cards. Look at which links get clicks (most link tools show this) and remove the ones nobody uses.</p>
        <p className={p}>For an email signup that works from your link, see <Link to="/blog/how-to-build-email-list-beauty-creator" className={a}>how to build an email list as a beauty creator</Link>. For a nail-tech specific setup, see <Link to="/blog/how-to-set-up-nail-tech-link-in-bio" className={a}>how to set up your link in bio</Link>.</p>
        <ArticleImage src="photo-1792792747504-35e67572f529" alt="Small beauty studio with two macrame chairs and a plant" />
      </section>

      <section id="pros-vs-creators">
        <h2 className={h2}>Beauty pros vs. beauty creators: different first buttons</h2>
        <p className={p}>The right page depends on how you earn. A lash artist with a full client book and a skincare creator who sells guides need different pages, even if their content looks similar.</p>
        <ArticleTable
          headers={['', 'Beauty pro (services)', 'Beauty creator (products, brands)', 'Both']}
          rows={[
            ['Main button', 'Book an appointment', 'Your product or waitlist', 'The one that brings the most income this month'],
            ['Second link', 'Aftercare and policies', 'Free lead magnet', 'Free lead magnet'],
            ['Proof', 'Results gallery, reviews', 'Buyer feedback, press, brand partners', 'Results and feedback'],
            ['Easy to forget', 'Last-minute openings', 'Media kit for brands', 'An email signup'],
          ]}
        />
        <p className={p}>If you do both, do not split attention evenly. Pick one main action per season and move the other one lower. During a launch week, the product goes on top; during a busy booking month, the booking button does.</p>
      </section>

      <section id="booking-link">
        <h2 className={h2}>What a booking link should show</h2>
        <p className={p}>When the main button is a booking, the page behind it does a lot of the selling. A visitor who taps &quot;Book&quot; and lands on a contact form or a DM request often gives up. Check that your booking page shows:</p>
        <ArticleChecklist
          items={[
            'Every service with its length and price, so nobody has to ask.',
            'Real available times, bookable in a few taps on a phone.',
            'Any deposit, clearly stated before checkout.',
            'Your cancellation and late policy, one tap away.',
            'Where you are (or that you travel), and how to get there.',
            'A confirmation and reminder after booking, so clients do not forget.',
          ]}
        />
        <p className={p}>More on this in <Link to="/blog/what-should-nail-tech-booking-page-include" className={a}>what a booking page should include</Link> and <Link to="/blog/how-to-move-from-instagram-dms-to-online-booking" className={a}>how to move from DMs to online booking</Link>.</p>
      </section>

      <section id="promote">
        <h2 className={h2}>How to send people to your link</h2>
        <p className={p}>A great page does nothing if nobody taps it. Mention it on purpose, in a way that tells people what they get:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>In captions:</strong> one clear line at the end, such as &quot;Fill slots for next week are open, link in bio.&quot;</li>
          <li><strong>In stories:</strong> a link sticker straight to the right page, not only to the top of your link page.</li>
          <li><strong>In DMs:</strong> a saved reply with the link for the questions you get daily (prices, availability, the guide).</li>
          <li><strong>In Reels and TikToks:</strong> say it out loud and show the page on screen for a second.</li>
          <li><strong>Offline:</strong> a QR code on your mirror, your business cards or the aftercare card you hand out.</li>
        </ul>
        <ArticleTip>Change the link sticker destination to match the story. A story about a new service should open that service&apos;s booking page directly, not your general page.</ArticleTip>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>If your main button is a booking, Nelsy can be the page behind your link: your services, prices, free slots and a deposit at booking, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/link-in-bio" className={a}>link in bio</Link> and <Link to="/features/bookings" className={a}>bookings</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
