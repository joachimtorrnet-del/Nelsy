import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-create-an-online-beauty-course',
  title: 'How to Create and Sell an Online Beauty Course',
  coverTitle: 'Build a Beauty Course',
  seoTitle: 'How to Create an Online Beauty Course (Makeup, Lash, Nails)',
  excerpt: 'How to plan, film and sell an online makeup, lash, brow, nail or skincare course: choosing the outcome, structuring modules, filming with a phone, pricing, and launching to your audience.',
  seoDescription: 'How to create and sell an online beauty course: pick the outcome, plan modules, film with your phone, set a price and launch. Makeup, lash, nails.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['how to create an online beauty course', 'how to create an online makeup course', 'lash course online', 'beauty educator', 'online beauty training'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to create and sell an online beauty course',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-23',
  tldr: {
    answer: 'Teach one outcome, film it on your phone, pre-sell before you build.',
    detail: 'The beauty courses that sell promise one result (a clean lash fill, a soft glam look, a gel-x set that lasts) and get the student there with short, well-lit videos plus practice tasks. Pre-sell to your audience first, then film.',
    points: [
      { label: 'Good first course', text: 'One technique, 4 to 8 short lessons.' },
      { label: 'Equipment', text: 'A recent phone, a tripod or overhead arm, two soft lights, a lapel mic.' },
      { label: 'Before filming', text: 'Pre-sell to a waitlist to check people will pay.' },
    ],
  },
  toc: [
    { id: 'types', label: 'Which kind of beauty course to make' },
    { id: 'outcome', label: '1. Choose one outcome' },
    { id: 'presell', label: '2. Validate and pre-sell' },
    { id: 'structure', label: '3. Structure the modules' },
    { id: 'film', label: '4. Film it with your phone' },
    { id: 'extras', label: '5. Add practice, feedback and certificates' },
    { id: 'price', label: '6. Price the course' },
    { id: 'platform', label: '7. Choose a platform' },
    { id: 'launch', label: '8. Launch and keep selling' },
    { id: 'mistakes', label: 'Mistakes that make courses hard to sell' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['how-to-sell-a-nail-course-online', 'best-platform-to-sell-beauty-courses', 'how-to-price-a-digital-product-or-course'],
  relatedLinks: { tool: '/tools/creator-rate-calculator', pages: ['/features/bookings', '/use-cases/beauty-creators'] },
  faq: [
    { q: 'Do I need a certification to sell a beauty course?', a: 'It depends on what you teach and where. Teaching a technique or a business skill online is usually not regulated, but in many places a course cannot make someone legally qualified to perform a licensed service. Never promise a license. Say clearly what your certificate of completion is, and is not.' },
    { q: 'How long should an online beauty course be?', a: 'As long as it takes to reach the outcome. A first course of 4 to 8 lessons of 5 to 15 minutes each is common and easier to finish. Students value finishing more than hours of footage.' },
    { q: 'What equipment do I need to film a makeup or lash course?', a: 'A recent phone, a tripod or overhead arm, two soft continuous lights placed at an angle, and a clip-on microphone. A second phone for a wide angle is a bonus, not a must.' },
    { q: 'Should I sell a course or do in-person training?', a: 'Both work and they feed each other. An online course reaches students anywhere and scales; in-person training lets you correct hands-on technique. Many educators sell the online course as the theory and book in-person practice days separately.' },
    { q: 'How much should I charge for a beauty course?', a: 'Base it on the outcome and the support included, not on video length. Compare it with what the student would pay for an in-person class, and with the money the skill helps them earn. See our guide to pricing a digital product or course for the method.' },
  ],
  relatedFeatureSlugs: ['bookings', 'payments', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Makeup artists, lash and brow artists, nail techs, hairstylists and estheticians who get asked &quot;do you teach?&quot; and want to package what they know into an online course. For nail-specific steps, see <Link to="/blog/how-to-sell-a-nail-course-online" className={a}>how to sell a nail course online</Link>.
      </ArticleCallout>

      <section id="types">
        <h2 className={h2}>Which kind of beauty course to make</h2>
        <p className={p}>Before planning lessons, decide who the student is. That one choice changes the price, the depth and where you will find buyers.</p>
        <ArticleTable
          headers={['Course type', 'Student', 'Examples', 'Typical format']}
          rows={[
            ['Technique course for pros', 'Working or new beauty pros', 'Lash mapping, volume fans, gel-x, brow lamination, bridal makeup', 'Video lessons plus practice tasks and feedback'],
            ['Business course for pros', 'Pros who want more clients or income', 'Pricing, content, booking policies, going independent', 'Video or audio plus templates'],
            ['Self-care course for consumers', 'Your followers', 'Everyday makeup, skincare routines, hair styling at home', 'Short videos, product lists'],
            ['Hybrid (online plus in-person)', 'Pros who need hands-on correction', 'Online theory plus a practice day in your studio', 'Course plus bookable training day'],
          ]}
        />
        <ArticleImage src="photo-1596704017254-9b121068fb31" alt="Hand holding a makeup brush over an eyeshadow palette next to a laptop" />
      </section>

      <section id="outcome">
        <h2 className={h2}>1. Choose one outcome</h2>
        <p className={p}>Write the course promise in one sentence: &quot;By the end, you will be able to [result] without [main pain].&quot; For example: &quot;By the end, you will be able to do a classic lash fill in under 60 minutes without stickies.&quot; If you cannot write it in one sentence, the course is probably two courses.</p>
        <ArticleTip>The smaller the outcome, the easier the first course is to finish, film and sell. You can always add an advanced course later for the students who finished the first one.</ArticleTip>
      </section>

      <section id="presell">
        <h2 className={h2}>2. Validate and pre-sell before you film</h2>
        <p className={p}>Filming is the expensive part, so check that people will pay first.</p>
        <ArticleSteps
          steps={[
            { title: 'Post about the problem', body: 'A Reel or carousel on the result your course gives, ending with "comment COURSE to get on the list".' },
            { title: 'Collect a waitlist', body: 'Send each person a link to a form or email signup. A list of real names beats a count of likes.' },
            { title: 'Open a pre-sale', body: 'Offer a founding price to the waitlist, with a clear date when lessons will be ready.' },
            { title: 'Set a minimum', body: 'Decide in advance how many pre-sales make the course worth filming. If you do not reach it, refund and rethink the topic.' },
          ]}
        />
        <p className={p}>Pre-selling also tells you what to film: ask founding students what they struggle with most and build the lessons around their answers.</p>
      </section>

      <section id="structure">
        <h2 className={h2}>3. Structure the modules</h2>
        <p className={p}>A clear structure helps students finish. Here is a template you can adapt to most technique courses:</p>
        <ArticleTable
          headers={['Module', 'What it covers', 'Example: lash fill course']}
          rows={[
            ['1. Start here', 'Promise, what to prepare, how to use the course', 'Kit list, how to set up your bed and light'],
            ['2. Foundations', 'Theory the technique depends on', 'Natural lash growth cycle, isolation'],
            ['3. The method', 'Your process step by step', 'Removing grown-out extensions, refilling, mapping'],
            ['4. Common mistakes', 'What goes wrong and how to fix it', 'Stickies, poor retention, uneven density'],
            ['5. Practice', 'Tasks and how to submit work', 'Photo checklist for a practice set'],
            ['6. Client side', 'Aftercare, pricing, rebooking', 'Aftercare card template, fill timing'],
          ]}
        />
        <p className={p}>Keep each lesson to one idea and 5 to 15 minutes. Short lessons are easier to rewatch at the station, which is how beauty students actually use a course.</p>
      </section>

      <section id="film">
        <h2 className={h2}>4. Film it with your phone</h2>
        <p className={p}>You do not need a studio. You need a stable shot, flat light and clear sound.</p>
        <ArticleChecklist
          title="Filming setup"
          items={[
            'Phone on a tripod or overhead arm, locked focus and exposure (long-press on the screen on most phones).',
            'Two soft lights at 45 degrees on each side to avoid shadows from your hands.',
            'Clip-on microphone, or record the voice-over separately in a quiet room.',
            'Neutral, clean background; nothing branded you do not want in the shot.',
            'Film close-ups of every step, plus one wide shot so students understand your posture and setup.',
            'Use a practice head, a mannequin or a model who has agreed in writing to be filmed.',
          ]}
        />
        <p className={p}>Edit simply: cut pauses, add a title per step, and add text on screen for any measurement or product name. Free editors on your phone are enough for a first course. Our <Link to="/blog/how-to-film-nail-tech-tiktok-reels" className={a}>filming guide</Link> covers angles and light in more detail.</p>
        <ArticleImage src="photo-1636485042715-f0e844b82338" alt="Pink desk setup with a microphone, monitor and plants" />
      </section>

      <section id="extras">
        <h2 className={h2}>5. Add practice, feedback and certificates</h2>
        <p className={p}>In beauty, students improve by practicing and getting corrected. These extras raise the value of a course more than extra video:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Practice tasks</strong> at the end of each module, with a photo checklist.</li>
          <li><strong>Feedback:</strong> students send photos of their work and you reply with corrections, by email or in a group, within a set time.</li>
          <li><strong>Live Q&amp;A</strong> once a month, recorded for those who miss it.</li>
          <li><strong>Downloads:</strong> kit list, mapping sheets, aftercare cards, consultation forms.</li>
          <li><strong>Certificate of completion:</strong> fine to offer, as long as you state it is not a license or accreditation unless it really is.</li>
        </ul>
        <ArticleCallout variant="warning" title="Be careful with promises">
          Do not promise income, a license or results you cannot control. Say what the student will learn and practice. Check the rules in your country before teaching anything that involves chemicals, needles or medical claims.
        </ArticleCallout>
      </section>

      <section id="price">
        <h2 className={h2}>6. Price the course</h2>
        <p className={p}>Look at three anchors: the price of comparable in-person classes in your area, the money or time the skill saves the student, and the support you include. A course with feedback on student work is worth more than a video-only course, and it also takes more of your time, so price that time in.</p>
        <ArticleCallout variant="tip" title="Worked example (illustrative numbers)">
          You plan a video course with two group feedback calls. You estimate 30 hours to create it and 2 hours of support per cohort. If you want the first cohort to pay you at least $60 an hour for that work, it needs to bring in 32 x $60 = $1,920. With 15 founding students, that means a price of about $1,920 / 15 = $128. Later cohorts do not need the 30 creation hours, so the same price pays much more per hour.
        </ArticleCallout>
        <p className={p}>The full method is in <Link to="/blog/how-to-price-a-digital-product-or-course" className={a}>how to price a digital product or course</Link>, and the <Link to="/tools/creator-rate-calculator" className={a}>creator rate calculator</Link> helps you check what your time is worth.</p>
      </section>

      <section id="platform">
        <h2 className={h2}>7. Choose a platform</h2>
        <p className={p}>Course platforms differ on monthly price, fees on sales, community features and how well they handle bookings. We compared Kajabi, Teachable, Stan and Beacons for beauty educators in <Link to="/blog/best-platform-to-sell-beauty-courses" className={a}>best platform to sell beauty courses</Link>. Questions to ask any platform:</p>
        <ArticleChecklist
          items={[
            'Can students watch comfortably on a phone?',
            'Is there a fee on each sale on top of payment processing?',
            'Can you offer payment plans or a founding price?',
            'Can students upload practice photos, or do you need another tool for feedback?',
            'Can you sell in-person training days next to the course?',
          ]}
        />
      </section>

      <section id="launch">
        <h2 className={h2}>8. Launch and keep selling</h2>
        <p className={p}>Open enrollment to your waitlist first, then to your followers. A launch week usually mixes a results post, a free mini-lesson, a look inside the course, a Q&amp;A in stories and a clear closing date for any founding price. After launch, keep the course visible: a pinned post, a highlight with student results (with permission), and a link in your bio.</p>
        <p className={p}>A course also sells well to people who already know you through a smaller product. That is why many educators start with a guide (see <Link to="/blog/how-to-sell-a-beauty-ebook" className={a}>how to sell a beauty ebook</Link>) and an email list (see <Link to="/blog/how-to-build-email-list-beauty-creator" className={a}>how to build an email list</Link>).</p>
        <ArticleImage src="photo-1770999086860-143f54adf01b" alt="Tweezers resting on a tray of lash extension strips" />
      </section>

      <section id="mistakes">
        <h2 className={h2}>Mistakes that make courses hard to sell</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Too much in one course:</strong> students buy an outcome, not hours of footage.</li>
          <li><strong>Dark or shaky video:</strong> in beauty, if students cannot see the detail, they cannot learn it.</li>
          <li><strong>No practice or feedback:</strong> without it, students drop out and do not recommend you.</li>
          <li><strong>Launching to nobody:</strong> build the waitlist before you film.</li>
          <li><strong>Promising a license:</strong> a certificate of completion is not a professional qualification unless it really is accredited.</li>
        </ul>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>Hybrid courses need a booking side: in-person practice days, 1:1 corrections, client services. You can set those up today on Nelsy as bookable services with a deposit or full payment, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/bookings" className={a}>bookings</Link> and <Link to="/features/payments" className={a}>payments</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
