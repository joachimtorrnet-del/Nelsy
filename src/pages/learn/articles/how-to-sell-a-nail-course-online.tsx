import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-to-sell-a-nail-course-online',
  title: 'How to Sell a Nail Course Online (Step by Step)',
  seoTitle: 'How to Create and Sell a Nail Course Online: Step by Step',
  excerpt: 'How to turn your nail skills into an online course: picking the topic, recording it, pricing it, and selling it from your Instagram link in bio, with or without a large following.',
  seoDescription: 'How to create and sell an online nail course: choose a topic people pay for, record it with a phone, set your price, and sell it from your link in bio.',
  category: 'beauty-creators',
  tags: ['how to sell a nail course online', 'online nail course', 'nail tech course', 'sell nail tutorials', 'nail educator'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #E9D5FF 100%)',
  heroImageAlt: 'How to create and sell a nail course online',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-24',
  tldr: {
    answer: "Pick one technique, record it with your phone, sell it from your bio link.",
    detail: "A first course solves one specific problem other techs already ask you about. Price it on the result and support included, not on its length, and launch it to the audience you already have.",
    points: [
      { label: "Format to start", text: "A 3 to 6 video mini-course on one technique." },
      { label: "Equipment", text: "A recent phone, an overhead mount and soft light." },
      { label: "Where to sell", text: "On the same link-in-bio page your clients use to book." },
    ],
  },
  toc: [
    { id: 'topic', label: '1. Pick a topic people will pay for' },
    { id: 'format', label: '2. Choose the format' },
    { id: 'outline', label: '3. Outline the lessons' },
    { id: 'record', label: '4. Record with what you have' },
    { id: 'price', label: '5. Set your price' },
    { id: 'sell', label: '6. Sell it from your link in bio' },
    { id: 'launch', label: '7. Launch to your audience' },
    { id: 'legal', label: 'Certificates, licensing and refunds' },
  ],
  relatedSlugs: ['how-to-make-money-as-a-beauty-creator', 'how-to-film-nail-tech-tiktok-reels', 'how-to-take-better-nail-photos', 'how-to-grow-nail-tech-instagram'],
  faq: [
    { q: 'Can I sell a nail course without a big following?', a: 'Yes. A small audience of nail techs who trust your work is often enough for a first course, especially on a specific technique. Validate demand first: if people regularly ask how you do something, that is your topic.' },
    { q: 'How much should I charge for an online nail course?', a: 'Price from the result the course delivers and its depth, not from its length. A single-technique class sells at a lower price than a complete program with feedback. Look at what other educators charge for similar content, then test a launch price with your audience.' },
    { q: 'Do I need professional equipment to film a nail course?', a: 'No. A recent phone, a stable overhead mount, soft even light and a quiet room are enough. Clear close-ups of the hands and product matter more than cinematic quality.' },
    { q: 'Can my online nail course give a certificate?', a: 'You can give a certificate of completion for your own course. Whether it counts for licensing depends on the rules in your state or country, so say clearly that it is not a license and check local regulations before using words like accredited or certified.' },
  ],
  relatedFeatureSlugs: ['payments', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="The short version">
        Pick one technique people already ask you about, record it in short lessons with your phone, price it on the result it delivers, and sell it from the same link in bio your clients use to book.
      </ArticleCallout>

      <section id="topic">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Pick a topic people will pay for</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The best first course solves one specific problem, not &quot;everything about nails&quot;. Look at your DMs and comments: what do other techs ask you most? Common winners are a single technique (gel-x application, builder gel structure, chrome, French tips), a skill gap (prep and retention, speed) or a business topic (pricing, getting your first clients).</p>
        <ArticleTip>Check your most saved posts in Instagram Insights. Content people save is content they want to learn from.</ArticleTip>
      </section>

      <section id="format">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Choose the format</h2>
        <ArticleTable
          headers={['Format', 'Best for', 'Effort']}
          rows={[
            ['Mini-course (3 to 6 short videos)', 'One technique, first launch', 'Low'],
            ['Full recorded course', 'A complete skill with modules', 'Medium to high'],
            ['Live online workshop', 'Interaction and Q&A, testing demand', 'Low to prepare, fixed date'],
            ['Course + feedback', 'Students send photos for review', 'Ongoing time per student'],
            ['In-person class', 'Hands-on training, local students', 'Space, kits, date'],
          ]}
        />
      </section>

      <section id="outline">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Outline the lessons</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>The result:</strong> show the finished set and what students will be able to do.</li>
          <li><strong>Kit list:</strong> products and tools, with alternatives at different budgets.</li>
          <li><strong>Prep:</strong> the step most retention problems come from. See our <Link to="/blog/nail-prep-guide" className={a}>nail prep guide</Link>.</li>
          <li><strong>The technique</strong>, split into steps of 3 to 8 minutes each.</li>
          <li><strong>Common mistakes and fixes.</strong></li>
          <li><strong>Practice task</strong> and what a good result looks like.</li>
        </ol>
      </section>

      <section id="record">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Record with what you have</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>An overhead phone mount for hand shots, plus a second angle if you can.</li>
          <li>Soft, even light from the front; avoid strong shadows on the nail.</li>
          <li>Short lessons: easier to film, easier to rewatch.</li>
          <li>Voice-over after filming if talking while working is hard.</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">More: <Link to="/blog/how-to-film-nail-tech-tiktok-reels" className={a}>how to film nail Reels</Link> and <Link to="/blog/how-to-take-better-nail-photos" className={a}>how to take better nail photos</Link>.</p>
      </section>

      <section id="price">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Set your price</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Price on the result and the support you include, not the number of minutes. A one-technique mini-course, a full program and a program with personal feedback are three different price levels. Check what other educators charge for comparable content, then test.</p>
        <p className="text-gray-700 leading-relaxed">A launch price for the first students (in exchange for feedback and photos of their results) helps you collect proof for the next launch.</p>
      </section>

      <section id="sell">
        <h2 className="font-serif text-2xl font-bold mb-4">6. Sell it from your link in bio</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your students find you on Instagram and TikTok, so sell where they already click: your link in bio. Keep the course next to your bookings so clients and students land on the same page, and use a checkout that delivers access automatically after payment.</p>
        <p className="text-gray-700 leading-relaxed">Nelsy lets you sell courses, digital products and coaching next to your bookings, from one page, with 0% Nelsy commission. See <Link to="/blog/how-to-set-up-nail-tech-link-in-bio" className={a}>how to set up your link in bio</Link>.</p>
      </section>

      <section id="launch">
        <h2 className="font-serif text-2xl font-bold mb-4">7. Launch to your audience</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Post the problem the course solves for a week before you announce it.</li>
          <li>Open a waitlist in your stories and collect emails or DMs.</li>
          <li>Launch with a limited launch price and a clear end date.</li>
          <li>Share student results as they come in.</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">Bigger picture: <Link to="/blog/how-to-make-money-as-a-beauty-creator" className={a}>10 ways to make money as a beauty creator</Link>.</p>
      </section>

      <section id="legal">
        <h2 className="font-serif text-2xl font-bold mb-4">Certificates, licensing and refunds</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Certificates:</strong> a certificate of completion is fine; it is not a license. Check your local rules before calling a course accredited.</li>
          <li><strong>Refund policy:</strong> state it before purchase, especially for instant-access digital content.</li>
          <li><strong>Product brands:</strong> name the products you use, but don&apos;t imply a brand endorses your course unless it does.</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
