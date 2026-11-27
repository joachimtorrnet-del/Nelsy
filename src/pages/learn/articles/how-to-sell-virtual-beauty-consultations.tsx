import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-sell-virtual-beauty-consultations',
  title: 'How to Sell 1:1 Beauty Coaching and Virtual Consultations',
  seoTitle: 'How to Sell Virtual Makeup Consultations and Beauty Coaching',
  excerpt: 'How to offer and sell virtual beauty consultations and 1:1 coaching: what to offer (makeup lessons, skincare consults, mentoring for new pros), how to run the call, how to price it, and how to fill your first sessions.',
  seoDescription: 'How to sell virtual makeup consultations, online makeup lessons and 1:1 coaching for beauty pros: offers, call structure, pricing math and how to get first clients.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['virtual makeup consultation', 'online makeup coaching', 'online makeup lessons', 'how to sell coaching services online', 'beauty mentoring'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to sell 1:1 beauty coaching and virtual consultations',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-27',
  tldr: {
    answer: 'Sell a clear outcome in a fixed time, paid upfront.',
    detail: 'A virtual beauty consultation or coaching call is the fastest offer to launch: no product to build, just your expertise in a structured session. Name the result, fix the length, take payment at booking, and send a short written follow-up after the call.',
    points: [
      { label: 'For consumers', text: 'Makeup lessons, skincare consults, hair routine reviews.' },
      { label: 'For beauty pros', text: 'Pricing, portfolio, technique reviews and mentoring.' },
      { label: 'Format', text: '30 to 90 minutes on video, with a written plan afterwards.' },
    ],
  },
  toc: [
    { id: 'offers', label: 'What you can sell' },
    { id: 'define', label: '1. Define the offer' },
    { id: 'structure', label: '2. Structure the session' },
    { id: 'tools', label: '3. Tools you need' },
    { id: 'price', label: '4. Price it' },
    { id: 'packages', label: '5. Packages and mentoring' },
    { id: 'first', label: '6. Get your first clients' },
    { id: 'limits', label: 'What not to promise' },
    { id: 'menu', label: 'Example session menu' },
    { id: 'follow-up', label: 'Follow-up template' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['how-to-create-an-online-beauty-course', 'how-to-price-a-digital-product-or-course', 'how-to-make-money-as-a-beauty-creator'],
  relatedLinks: { tool: '/tools/deposit-calculator', pages: ['/features/bookings', '/features/payments'] },
  faq: [
    { q: 'What is a virtual makeup consultation?', a: 'A video call where a makeup artist helps a client choose products, shades and techniques for their face, often with the client\'s own makeup bag. It usually ends with a written list of products and steps.' },
    { q: 'How do I run an online makeup lesson?', a: 'Ask the client to send photos and their product list before the call, sit them in front of a window with the camera at eye level, demonstrate each step on yourself or a model, then watch them do it and correct in real time. Send a written routine afterwards.' },
    { q: 'How much should I charge for a virtual consultation?', a: 'Price the total time (preparation, call and follow-up) at your hourly rate, then compare with your in-person services. A worked example in this guide shows the math. Coaching for beauty pros can be priced higher when it helps them earn more.' },
    { q: 'Should I take payment before the call?', a: 'Yes. Ask for full payment at booking for virtual sessions. It removes no-shows and awkward follow-ups, and it is what clients expect for online services.' },
    { q: 'Can I coach other beauty pros without being a certified coach?', a: 'Mentoring based on your own experience (pricing, building a client base, technique) is common. Be clear about what you offer, do not promise income, and avoid advice outside your expertise, such as legal or tax advice.' },
  ],
  relatedFeatureSlugs: ['bookings', 'payments', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Makeup artists, estheticians, hairstylists, lash and brow artists, nail techs and beauty creators who want to sell their expertise on video, to consumers or to other beauty pros.
      </ArticleCallout>

      <section id="offers">
        <h2 className={h2}>What you can sell</h2>
        <p className={p}>Virtual sessions work when the value is in your knowledge and your eye, not in your hands on the client. Some ideas by audience:</p>
        <ArticleTable
          headers={['Offer', 'Who buys', 'What they get']}
          rows={[
            ['Virtual makeup lesson', 'Consumers', 'A routine adapted to their face and products, practiced live'],
            ['Makeup bag edit', 'Consumers', 'What to keep, what to replace, a shopping list by budget'],
            ['Skincare consultation', 'Consumers', 'A routine for their skin, product order, what to stop using'],
            ['Hair routine review', 'Consumers', 'Wash-day, styling and product plan for their hair type'],
            ['Bridal or event prep call', 'Brides, event clients', 'Look planning, timeline, trial preparation'],
            ['Technique review', 'Beauty pros', 'Feedback on photos or videos of their work, with fixes'],
            ['Business mentoring', 'Beauty pros', 'Pricing, policies, getting clients, going independent'],
            ['Portfolio and Instagram review', 'Beauty pros and creators', 'What to change in their profile, photos and offers'],
          ]}
        />
      </section>

      <section id="define">
        <h2 className={h2}>1. Define the offer</h2>
        <p className={p}>A vague &quot;book a call with me&quot; does not sell. A precise offer does: who it is for, the result, the length, what happens before and after.</p>
        <ArticleCallout variant="tip" title="Offer template">
          <strong>[Name of session]</strong> for [who] who want [result]. In [length] on video, we [what you do together]. Before: [what they send]. After: [what they receive, for example a written routine within 48 hours]. Price: [price], paid at booking.
        </ArticleCallout>
        <p className={p}>Example: &quot;Everyday makeup lesson, for women who want a 10-minute routine with the makeup they already own. 60 minutes on video. Before: a photo of your makeup bag. After: your routine in writing with a shopping list.&quot;</p>
      </section>

      <section id="structure">
        <h2 className={h2}>2. Structure the session</h2>
        <ArticleSteps
          steps={[
            { title: 'Intake before the call', body: 'A short form: goals, skin or hair type, products they own, photos in daylight, allergies or sensitivities.' },
            { title: 'First 5 minutes: confirm the goal', body: 'Repeat back what they want, so the call stays focused.' },
            { title: 'Main part: show, then watch', body: 'Demonstrate a step, let them do it, correct. For mentoring: review their numbers or work, then agree on changes.' },
            { title: 'Last 10 minutes: the plan', body: 'Summarize the 3 to 5 actions. Ask what is still unclear.' },
            { title: 'Follow-up within 48 hours', body: 'A written routine or action plan, product links, and an invitation to book again or to your next offer.' },
          ]}
        />
        <ArticleImage src="photo-1705907014767-1c1a4d8ce6be" alt="Laptop, keyboard and mouse on a pink desk seen from above" />
      </section>

      <section id="tools">
        <h2 className={h2}>3. Tools you need</h2>
        <ArticleChecklist
          items={[
            'A video call tool you and the client can join from a phone or laptop.',
            'A booking page where the client picks a time and pays upfront.',
            'An intake form (a simple online form is enough).',
            'Good light on your face and a second light or window for demonstrations.',
            'A ring light or phone mount if you demonstrate on yourself.',
            'A template for the follow-up document, so it takes 15 minutes, not an hour.',
          ]}
        />
        <ArticleTip>Ask clients to sit facing a window for makeup and skincare calls. Daylight on their face makes shade matching and skin reading much easier than any filter.</ArticleTip>
      </section>

      <section id="price">
        <h2 className={h2}>4. Price it</h2>
        <p className={p}>Price the full time, not just the call. Preparation and the written follow-up often take as long as the call itself.</p>
        <ArticleCallout variant="tip" title="Worked example (illustrative numbers)">
          A 60-minute virtual makeup lesson takes 20 minutes to prepare (reading the intake, preparing products), 60 minutes on the call and 25 minutes to write the routine: 105 minutes in total. At an hourly rate of $50, that is 1.75 x $50 = $87.50. You round to $89. If your processor charges, for example, 2.9% + $0.30, you keep $89 minus $2.58 minus $0.30 = $86.12 per session before tax.
        </ArticleCallout>
        <p className={p}>For beauty pros, coaching that helps them raise prices or fill their calendar is worth more to them than a consumer lesson is to a consumer, so mentoring is often priced higher. To set your hourly rate, see <Link to="/blog/how-to-calculate-nail-tech-hourly-rate" className={a}>how to calculate your hourly rate</Link>, and for the general method, <Link to="/blog/how-to-price-a-digital-product-or-course" className={a}>how to price a digital product or course</Link>.</p>
      </section>

      <section id="packages">
        <h2 className={h2}>5. Packages and mentoring</h2>
        <p className={p}>Single sessions are a good start. Packages give clients time to practice and give you steadier income.</p>
        <ArticleTable
          headers={['Format', 'Structure', 'Good for']}
          rows={[
            ['Single session', 'One call plus written follow-up', 'Makeup lessons, skincare consults'],
            ['3-session package', 'Kick-off, check-in after 2 weeks, final review', 'Routines that need practice'],
            ['Monthly mentoring', '2 calls a month plus message support', 'Beauty pros building a business'],
            ['Group call', '4 to 10 people, same topic', 'Q&A, technique masterclass at a lower price per person'],
          ]}
        />
        <p className={p}>Group calls are a good bridge to a course: the same content, recorded and structured, can become your first online course. See <Link to="/blog/how-to-create-an-online-beauty-course" className={a}>how to create an online beauty course</Link>.</p>
        <ArticleImage src="photo-1764694187667-f28a05a52c0e" alt="Drop of serum falling into a glass bottle" />
      </section>

      <section id="first">
        <h2 className={h2}>6. Get your first clients</h2>
        <ArticleSteps
          steps={[
            { title: 'Tell your current clients', body: 'In-person clients who moved away or want to learn to do it themselves are often the first buyers.' },
            { title: 'Post a mini-session', body: 'A Reel or TikTok where you answer one person\'s question (with permission), then mention the full session.' },
            { title: 'Reply to DMs with the offer', body: 'When someone asks a long question, answer briefly and offer the session for the full answer.' },
            { title: 'Pin it and add it to your link in bio', body: 'See what to put in your link in bio.' },
            { title: 'Ask for feedback', body: 'After each session, ask what helped most. Use the words clients use in your offer description.' },
          ]}
        />
        <p className={p}>More ideas in <Link to="/blog/what-to-put-in-link-in-bio-beauty-creators" className={a}>what to put in your link in bio</Link> and <Link to="/blog/how-beauty-creators-make-money-on-instagram" className={a}>how beauty creators make money on Instagram</Link>.</p>
        <ArticleImage src="photo-1506784983877-45594efa4cbe" alt="Coffee cup on an open monthly planner with goals written in" />
      </section>

      <section id="limits">
        <h2 className={h2}>What not to promise</h2>
        <ArticleCallout variant="warning" title="Stay within your expertise">
          Skin conditions, allergies, hair loss and anything medical belong with a doctor or dermatologist: say so when it comes up. In mentoring, do not promise income or give legal or tax advice. Write a cancellation and rescheduling policy for virtual sessions too; our <Link to="/tools/nail-tech-cancellation-policy-generator" className={a}>cancellation policy generator</Link> can help.
        </ArticleCallout>
      </section>

      <section id="menu">
        <h2 className={h2}>Example session menu</h2>
        <p className={p}>A small menu with clear differences is easier to choose from than one open-ended &quot;consultation&quot;. An example for a makeup artist (prices are placeholders to replace with your own math):</p>
        <ArticleTable
          headers={['Session', 'Length', 'Includes', 'Price']}
          rows={[
            ['Makeup bag edit', '45 min', 'Review of their products, keep or replace list', '[your price]'],
            ['Everyday makeup lesson', '60 min', 'Routine practiced live, written routine afterwards', '[your price]'],
            ['Event look planning', '45 min', 'Look plan, products, timeline for the day', '[your price]'],
            ['3-lesson package', '3 x 60 min', 'Day look, evening look, review and corrections', '[your price, slightly under 3 singles]'],
          ]}
        />
      </section>

      <section id="follow-up">
        <h2 className={h2}>Follow-up template</h2>
        <p className={p}>The written follow-up is what clients keep, share and come back to. A template saves you time and keeps quality consistent:</p>
        <ArticleCallout variant="tip" title="Follow-up template">
          Hi [name], thank you for today&apos;s session! Here is your plan.<br /><br />
          <strong>Your goal:</strong> [in their words].<br />
          <strong>Your routine:</strong> 1. [step and product] 2. [step and product] 3. [step and product].<br />
          <strong>What to practice this week:</strong> [one or two things].<br />
          <strong>Products to consider:</strong> [list, with a budget option].<br /><br />
          If you want me to check your progress, you can book a follow-up session here: [link]. Questions about this plan? Reply to this email within 7 days.
        </ArticleCallout>
        <p className={p}>Setting a clear window for questions (for example 7 days) keeps support generous without turning one session into unlimited free coaching.</p>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>You can add a virtual session as a service on your Nelsy booking page today: a name, a description that says it happens by video, a length, a price and full payment at booking, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). Nelsy services do not have a video-link field yet, and the booking confirmation does not include one, so send the call link yourself to the email or phone number the client gives when booking. See <Link to="/features/bookings" className={a}>bookings</Link> and <Link to="/features/payments" className={a}>payments</Link>.</p>
        <p className={p}>Dedicated coaching tools, along with selling guides and courses, are part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
