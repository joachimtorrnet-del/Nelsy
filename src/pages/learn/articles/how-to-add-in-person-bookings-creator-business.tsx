import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-add-in-person-bookings-creator-business',
  title: 'From Creator to Studio: Adding In-Person Bookings to Your Beauty Business',
  coverTitle: 'From Creator to Studio',
  seoTitle: 'From Beauty Creator to Studio: Add In-Person Bookings',
  excerpt: 'How beauty creators add in-person services, workshops and training days to an online business: what to offer, where to work, how to set up a booking link with deposits, policies, and how to protect your content time.',
  seoDescription: 'How beauty creators add in-person bookings: what services or workshops to offer, where to work, a booking link with deposits in your bio, policies and scheduling.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['how to add booking link to instagram', 'beauty creator studio', 'in-person beauty workshops', 'add booking to instagram', 'creator to salon'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'From beauty creator to studio: adding in-person bookings',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-27',
  tldr: {
    answer: 'Start with a few fixed booking days, a deposit at booking, and one link.',
    detail: 'Adding in-person work to a creator business gives you income you can predict, fresh content and proof for your products. Start small: a short service menu or a workshop format, a rented chair or room, set days in your week, deposits and clear policies, all bookable from your link in bio.',
    points: [
      { label: 'What to offer first', text: 'The service or class your audience asks for most.' },
      { label: 'Where', text: 'A rented chair, a suite by the day, or a pop-up before a lease.' },
      { label: 'How people book', text: 'A booking link in your bio with a deposit.' },
    ],
  },
  toc: [
    { id: 'why', label: 'Why creators add in-person work' },
    { id: 'what', label: '1. Choose what to offer' },
    { id: 'where', label: '2. Choose where to work' },
    { id: 'schedule', label: '3. Protect your content time' },
    { id: 'booking', label: '4. Set up bookings in your bio' },
    { id: 'policies', label: '5. Deposits and policies' },
    { id: 'announce', label: '6. Announce it to your audience' },
    { id: 'price', label: 'Price services and workshops' },
    { id: 'review', label: 'After 8 weeks: is it working?' },
    { id: 'legal', label: 'Licenses, insurance and the boring part' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['how-to-move-from-instagram-dms-to-online-booking', 'home-based-nail-tech-vs-salon-suite', 'how-to-sell-virtual-beauty-consultations'],
  relatedLinks: { tool: '/tools/deposit-calculator', pages: ['/features/bookings', '/features/deposits'] },
  faq: [
    { q: 'How do I add a booking link to Instagram?', a: 'Create a booking page with your services, prices and availability, then add its URL to the links section of your Instagram profile (Edit profile, then Links). You can also add it to stories with a link sticker and use it in DM replies.' },
    { q: 'Should a beauty creator take in-person clients?', a: 'If you have the skills and the local demand, in-person work adds steady income, real results to post, and trust that helps sell products and courses. Start with a few fixed days so it does not eat your content time.' },
    { q: 'What deposit should I ask for?', a: 'Enough to cover the time you would lose on a no-show. Many beauty pros charge a fixed amount or a percentage of the service. Our deposit calculator helps you pick a number per service.' },
    { q: 'Do I need a license to offer beauty services?', a: 'In many places, yes: beauty services such as lashes, nails, hair and skin treatments are often regulated. Requirements differ by country, state and service, so check with your local licensing authority before you take paying clients.' },
    { q: 'Can I run workshops without a studio?', a: 'Yes. You can rent a training room, a salon on its closed day, or a space in a partner boutique. Price the rental into the ticket and take payment at booking.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Beauty creators (makeup, lashes, brows, nails, hair, skin) who built an audience online and want to add in-person services, workshops or training days.
      </ArticleCallout>

      <section id="why">
        <h2 className={h2}>Why creators add in-person work</h2>
        <p className={p}>Online income from brand deals and products can swing from month to month. Bookings add a base you can plan around, and they feed the rest of your business:</p>
        <ArticleTable
          headers={['What in-person work gives you', 'How it helps the online side']}
          rows={[
            ['Predictable income', 'Less pressure to accept brand deals that do not fit'],
            ['Real client results', 'Content, before and afters, proof for your guides and courses'],
            ['Direct feedback', 'You hear the questions that become your next product'],
            ['Local reputation', 'Workshops, events and press in your city'],
          ]}
        />
      </section>

      <section id="what">
        <h2 className={h2}>1. Choose what to offer</h2>
        <p className={p}>Start from what your audience already asks for, and keep the menu short. A creator known for soft glam does not need 25 services; three clear options are easier to book and easier to run.</p>
        <ArticleTable
          headers={['Format', 'Example', 'Good when']}
          rows={[
            ['Signature services', 'Soft glam, bridal trial, lash lift, gel manicure', 'You are licensed and want regular clients'],
            ['Small-group workshops', 'Everyday makeup class for 6, skincare basics evening', 'Your audience wants to learn, not be done'],
            ['Pro training days', 'Hands-on lash or nail technique day for 2 to 4 pros', 'You sell a course and students want correction'],
            ['Events', 'Bridal party mornings, pop-ups at boutiques', 'You have a strong local following'],
          ]}
        />
        <ArticleTip>If you already sell an online course, an in-person practice day is a natural upsell: theory online, correction in person.</ArticleTip>
        <ArticleImage src="photo-1787651343620-8d5303006ecb" alt="Calm treatment room with a beauty bed by the window" />
      </section>

      <section id="where">
        <h2 className={h2}>2. Choose where to work</h2>
        <p className={p}>You do not need to sign a lease on day one. Test demand with flexible options first.</p>
        <ArticleTable
          headers={['Option', 'Commitment', 'Watch out for']}
          rows={[
            ['Home studio', 'Low', 'Local rules on running a business from home, privacy, client parking'],
            ['Chair or booth rental', 'Medium, usually monthly', 'Fixed rent whether you are busy or not'],
            ['Suite or room by the day', 'Low to medium', 'Availability on the days you need'],
            ['Mobile or on-location', 'Low', 'Travel time, kit setup, travel fees'],
            ['Pop-ups and partner spaces', 'Low', 'Partner terms, setup time'],
          ]}
        />
        <p className={p}>Compare options in detail in <Link to="/blog/home-based-nail-tech-vs-salon-suite" className={a}>home studio vs salon suite</Link> and <Link to="/blog/booth-rental-vs-commission-nail-techs" className={a}>booth rental vs commission</Link>. When it is time to commit, see <Link to="/blog/when-to-get-your-own-nail-studio" className={a}>when to get your own studio</Link>.</p>
      </section>

      <section id="schedule">
        <h2 className={h2}>3. Protect your content time</h2>
        <p className={p}>The biggest risk for a creator who adds clients is that bookings slowly fill every day and content stops. Block your week before you open bookings.</p>
        <ArticleTable
          headers={['Day', 'Example plan']}
          rows={[
            ['Monday', 'Content: filming and editing'],
            ['Tuesday', 'Clients'],
            ['Wednesday', 'Clients'],
            ['Thursday', 'Brand work, products, admin'],
            ['Friday', 'Clients or workshop'],
            ['Weekend', 'Bridal and events only, or off'],
          ]}
        />
        <p className={p}>Then film during client work (with permission): every appointment can give you a before and after, a process clip or a tip. See <Link to="/blog/how-to-batch-nail-content" className={a}>how to batch content</Link> and <Link to="/blog/how-to-build-weekly-nail-tech-schedule" className={a}>how to build a weekly schedule</Link>.</p>
      </section>

      <section id="booking">
        <h2 className={h2}>4. Set up bookings in your bio</h2>
        <p className={p}>Your audience already taps your link in bio. Put the bookings there instead of taking appointments in DMs.</p>
        <ArticleSteps
          steps={[
            { title: 'List your services', body: 'Name, length, price and a one-line description per service. Add a photo of the result.' },
            { title: 'Set your availability', body: 'Only the client days you blocked, with buffer time between appointments.' },
            { title: 'Choose the payment per service', body: 'A deposit for appointments, full payment for workshops and training days.' },
            { title: 'Add the link to your profile', body: 'On Instagram: Edit profile, then Links. On TikTok: the website field, if your account has it.' },
            { title: 'Use it everywhere', body: 'Story link stickers, DM replies, captions ("book via the link in my bio").' },
          ]}
        />
        <p className={p}>Moving from DMs to a booking link: <Link to="/blog/how-to-move-from-instagram-dms-to-online-booking" className={a}>how to move from Instagram DMs to online booking</Link>. For what to put next to the booking button, see <Link to="/blog/what-to-put-in-link-in-bio-beauty-creators" className={a}>what to put in your link in bio</Link>.</p>
        <ArticleImage src="photo-1706629503650-cade709d15e3" alt="Modern salon with arched mirrors and beige chairs on a marble floor" />
      </section>

      <section id="policies">
        <h2 className={h2}>5. Deposits and policies</h2>
        <p className={p}>An online audience is big, but some followers book on impulse and forget. A deposit and a clear policy protect your client days.</p>
        <ArticleChecklist
          title="Before you open bookings"
          items={[
            'A deposit per service, taken at booking (use the deposit calculator to choose an amount).',
            'A cancellation and rescheduling window, for example 48 hours.',
            'A late arrival rule.',
            'What happens to the deposit on a no-show.',
            'For workshops: refund or transfer rules if someone cannot come.',
            'Automatic reminders before each appointment.',
          ]}
        />
        <p className={p}>Tools: <Link to="/tools/deposit-calculator" className={a}>deposit calculator</Link>, <Link to="/tools/nail-tech-cancellation-policy-generator" className={a}>cancellation policy generator</Link>, and the guide on <Link to="/blog/how-much-deposit-should-nail-tech-charge" className={a}>how much deposit to charge</Link>.</p>
      </section>

      <section id="announce">
        <h2 className={h2}>6. Announce it to your audience</h2>
        <ArticleSteps
          steps={[
            { title: 'Tell your email list first', body: 'Give them first access to the opening days.' },
            { title: 'Post the space and the menu', body: 'A Reel of the room, the services, the prices and the booking link.' },
            { title: 'Open a limited first batch', body: 'A set number of slots or one workshop date. Selling out creates proof for the next batch.' },
            { title: 'Share the first results', body: 'Before and afters and client feedback, with their permission.' },
          ]}
        />
        <ArticleImage src="photo-1589710751893-f9a6770ad71b" alt="Lash artist placing an extension with tweezers over an under-eye patch" />
      </section>

      <section id="review">
        <h2 className={h2}>After 8 weeks: is it working?</h2>
        <p className={p}>Give the new setup two months, then look at a few numbers before you add days or sign anything longer.</p>
        <ArticleTable
          headers={['Check', 'What it tells you', 'What to do']}
          rows={[
            ['Share of slots booked', 'Real local demand', 'Mostly full: add a day or raise prices. Mostly empty: fewer days, more promotion'],
            ['No-shows and late cancellations', 'Whether your policy works', 'Raise the deposit or tighten the window'],
            ['Where bookings came from', 'Which posts and stories convert', 'Make more of that content'],
            ['Your content output', 'Whether clients are eating creator time', 'Protect the content day again'],
            ['Income per hour vs. online work', 'Which side deserves more of your week', 'Shift days toward the better return'],
          ]}
        />
      </section>

      <section id="legal">
        <h2 className={h2}>Licenses, insurance and the boring part</h2>
        <ArticleCallout variant="warning" title="Check before your first paying client">
          Many beauty services require a license, and some places also regulate where you can work (for example home studios). Get professional liability insurance that covers the services you offer, keep client consultation and consent forms, and follow hygiene rules for your craft. Rules vary by country, state and service: check with your local licensing authority and an insurance broker.
        </ArticleCallout>
      </section>

      <section id="price">
        <h2 className={h2}>Price in-person services and workshops</h2>
        <p className={p}>Creators often underprice in-person work because they compare themselves to local salons. Your audience is booking you, your style and your expertise, and your time in the chair is time not spent on content and brand work. Price from your costs and the hours each booking really takes.</p>
        <ArticleCallout variant="tip" title="Worked example: a 6-person makeup workshop (illustrative numbers)">
          The room costs $120 for the evening. Products and samples cost $15 per person ($90). You spend 3 hours on the workshop and 2 hours on preparation and follow-up: 5 hours at a target of $60 an hour = $300. Total to cover: $120 + $90 + $300 = $510. Divided by 6 seats = $85 per seat to break even on your target rate. You set the ticket at $95, which also leaves room for payment processing fees and a seat that does not sell.
        </ArticleCallout>
        <p className={p}>For services, the same method works per appointment: product cost, time including setup and cleanup, and your hourly target. The <Link to="/tools/nail-tech-pricing-calculator" className={a}>pricing calculator</Link> runs it for you, and <Link to="/blog/how-to-price-nail-services-for-profit" className={a}>how to price services for profit</Link> explains each input.</p>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>This is what Nelsy does today: a booking page for your link in bio with your services, prices and availability, a deposit or full payment per service, and automatic reminders, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/bookings" className={a}>bookings</Link>, <Link to="/features/deposits" className={a}>deposits</Link> and the <Link to="/demo" className={a}>live demo</Link>.</p>
        <p className={p}>Selling guides and courses next to your bookings is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
