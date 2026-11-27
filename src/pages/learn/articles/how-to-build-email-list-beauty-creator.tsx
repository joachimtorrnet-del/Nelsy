import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-build-email-list-beauty-creator',
  title: 'How to Build an Email List as a Beauty Creator (25 Lead Magnet Ideas)',
  seoTitle: 'How to Build an Email List as a Beauty Creator',
  excerpt: 'Why beauty creators need an email list, how to grow one from Instagram and TikTok without a website, 25 lead magnet ideas for makeup, skincare, hair, lash and nail creators, and what to send once people join.',
  seoDescription: 'How to build an email list from Instagram as a beauty creator: 25 lead magnet ideas, signups without a website, a welcome sequence and the legal basics.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['how to build an email list on instagram', 'how to build an email list without a website', 'lead magnet ideas', 'beauty newsletter', 'email marketing for creators'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to build an email list as a beauty creator',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'Offer one useful freebie in exchange for an email, and promote it every week.',
    detail: 'An email list is the audience you own: no algorithm decides who sees your launch. Pick an email tool, make one lead magnet that solves a small problem, put the signup in your link in bio, and mention it in your content every week.',
    points: [
      { label: 'Best lead magnet', text: 'A small, quick win linked to what you sell.' },
      { label: 'Where to collect', text: 'Link in bio, comment-to-get Reels, stories, your booking confirmation.' },
      { label: 'What to send', text: 'A welcome sequence, then one useful email a week or two.' },
    ],
  },
  toc: [
    { id: 'why', label: 'Why beauty creators need an email list' },
    { id: 'tool', label: '1. Pick an email tool' },
    { id: 'magnet', label: '2. Choose a lead magnet' },
    { id: 'ideas', label: '25 lead magnet ideas' },
    { id: 'collect', label: '3. Collect emails from Instagram and TikTok' },
    { id: 'welcome', label: '4. Write a welcome sequence' },
    { id: 'send', label: '5. What to send every week' },
    { id: 'legal', label: 'Consent and the legal basics' },
    { id: 'first-100', label: 'Your first 100 subscribers' },
    { id: 'subjects', label: 'Subject lines that get opened' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['how-to-build-email-list-nail-tech', 'what-to-put-in-link-in-bio-beauty-creators', 'how-to-sell-a-beauty-ebook'],
  relatedLinks: { tool: '/tools/nail-tech-cancellation-policy-generator', pages: ['/features/link-in-bio', '/use-cases/beauty-creators'] },
  faq: [
    { q: 'How do I build an email list without a website?', a: 'Use an email tool\'s hosted signup page or form and put its link in your bio. People tap the link, enter their email and receive your lead magnet automatically. No website is needed.' },
    { q: 'What is a lead magnet?', a: 'A free resource people get in exchange for their email: a checklist, a short guide, a template, a mini video class or a discount. The best ones solve one small problem quickly and are linked to what you sell.' },
    { q: 'How often should a beauty creator email their list?', a: 'Often enough that people remember you, and only when you have something useful. Once a week or every two weeks works for many creators. Consistency matters more than frequency.' },
    { q: 'Can I add my clients to my newsletter?', a: 'Only with their consent. Having someone\'s email for a booking does not automatically mean they agreed to marketing emails in many countries. Add a clear opt-in checkbox or ask them to sign up.' },
    { q: 'Is an email list still worth it if I have a big Instagram following?', a: 'Yes. Followers can lose reach after an algorithm change or an account problem. Your email list is a direct line you control, and it is usually where launches of guides, courses and openings sell first.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Beauty creators and beauty pros who want an audience they own, to launch guides, courses, openings and offers. Nail techs focused on client reminders can also read <Link to="/blog/how-to-build-email-list-nail-tech" className={a}>email marketing for nail techs</Link>.
      </ArticleCallout>

      <section id="why">
        <h2 className={h2}>Why beauty creators need an email list</h2>
        <p className={p}>Your followers live on platforms you do not control. Reach can change overnight, and an account can be hacked or restricted. An email list is different: you own the list, you decide when people hear from you, and the email lands in their inbox rather than a feed.</p>
        <ArticleTable
          headers={['', 'Followers', 'Email list']}
          rows={[
            ['Who controls reach', 'The platform algorithm', 'You'],
            ['Can you take it elsewhere', 'No', 'Yes, export it any time'],
            ['Best for', 'Discovery, new people', 'Launches, openings, loyal buyers'],
            ['Signal of intent', 'A follow or a like', 'A person chose to hear from you'],
          ]}
        />
      </section>

      <section id="tool">
        <h2 className={h2}>1. Pick an email tool</h2>
        <p className={p}>Any email marketing tool with these basics will do for a first list. Many offer a free or low-cost starter tier; check current pricing on their sites.</p>
        <ArticleChecklist
          items={[
            'A hosted signup page or form you can link from your bio (no website needed).',
            'Automatic delivery of your lead magnet after signup.',
            'An automated welcome sequence (several emails sent over the first days).',
            'Tags or groups, so you can separate clients, students and followers.',
            'A clear unsubscribe link and consent options built in.',
          ]}
        />
      </section>

      <section id="magnet">
        <h2 className={h2}>2. Choose a lead magnet</h2>
        <p className={p}>A good lead magnet is quick to consume, solves one small problem, and leads naturally to what you sell. If you plan to sell a skincare routine guide, the lead magnet is a 1-page &quot;what to use morning and night&quot; checklist. If you take lash clients, it is a &quot;how to make your lashes last until your fill&quot; card.</p>
        <ArticleSteps
          steps={[
            { title: 'Start from your paid offer', body: 'What does someone need to know or do just before buying it?' },
            { title: 'Make it small', body: 'One page, one video under 10 minutes, or one template. People should get the win the same day.' },
            { title: 'Name it with the result', body: '"The 5-minute morning routine for oily skin" beats "Free skincare guide".' },
            { title: 'Design it in your brand', body: 'Your colors, your photos, your name on every page.' },
          ]}
        />
        <ArticleImage src="photo-1499750310107-5fef28a66643" alt="Laptop, coffee cup, notepad and phone on a wooden desk" />
      </section>

      <section id="ideas">
        <h2 className={h2}>25 lead magnet ideas for beauty creators</h2>
        <ArticleTable
          headers={['Craft', 'Lead magnet ideas']}
          rows={[
            ['Makeup', 'Everyday 10-minute routine checklist; Foundation shade-matching guide; Bridal makeup timeline; Kit essentials under a budget; Mini video: winged liner in 3 steps'],
            ['Skincare', 'Morning and night routine by skin type; Ingredient cheat sheet; 30-day routine tracker; Travel skincare checklist; Patch test guide'],
            ['Hair', 'Wash-day routine for curly hair; Heatless styling guide; Color aftercare card; Products by hair type list; Salon visit prep checklist'],
            ['Lashes and brows', 'Lash aftercare card; How to make your set last until the fill; Brow shape guide by face; Lamination aftercare; For new techs: lash mapping cheat sheet'],
            ['Nails', 'At-home manicure care guide; Nail shape guide; Seasonal color palettes; For new techs: service price list template; Nail art practice sheet'],
          ]}
        />
        <ArticleTip>For an audience of beauty pros, business templates work very well as lead magnets: a consultation form, a price list template, a cancellation policy draft. You can also point to free tools like the <Link to="/tools/nail-tech-cancellation-policy-generator" className={a}>cancellation policy generator</Link> in your emails.</ArticleTip>
      </section>

      <section id="collect">
        <h2 className={h2}>3. Collect emails from Instagram and TikTok</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Link in bio:</strong> put the free resource right under your main button. See <Link to="/blog/what-to-put-in-link-in-bio-beauty-creators" className={a}>what to put in your link in bio</Link>.</li>
          <li><strong>&quot;Comment to get it&quot; Reels:</strong> answer part of a question and invite people to comment a keyword to receive the full checklist, then send the signup link in a DM.</li>
          <li><strong>Stories with a link sticker:</strong> show the inside of the freebie and add the signup link.</li>
          <li><strong>Pinned post and highlight:</strong> a permanent &quot;FREE GUIDE&quot; highlight.</li>
          <li><strong>Your clients:</strong> a signup link in your booking confirmation or aftercare message, with clear consent.</li>
          <li><strong>In person:</strong> a QR code at your station or at events.</li>
        </ul>
        <ArticleImage src="photo-1765030999960-8cc726c281ad" alt="Pink keyboard, mouse and laptop on a marble desk" />
      </section>

      <section id="welcome">
        <h2 className={h2}>4. Write a welcome sequence</h2>
        <p className={p}>New subscribers are at their most interested right after signing up. A short automated sequence introduces you and leads, gently, to your offer.</p>
        <ArticleTable
          headers={['Email', 'When', 'Content']}
          rows={[
            ['1', 'Right after signup', 'The lead magnet, a warm hello, what to expect from your emails'],
            ['2', 'Day 2', 'Your story and why you do this work, with one quick tip'],
            ['3', 'Day 4', 'A common mistake and how to fix it, with a result photo'],
            ['4', 'Day 6', 'Your offer: the guide, course, service or waitlist, and who it is for'],
            ['5', 'Day 8', 'Answers to the questions people ask before buying or booking'],
          ]}
        />
      </section>

      <section id="send">
        <h2 className={h2}>5. What to send every week</h2>
        <p className={p}>Mix useful emails with offers, so people stay subscribed. A simple rotation:</p>
        <ArticleChecklist
          items={[
            'A tip or tutorial they can use this week.',
            'A behind-the-scenes story (a client transformation with permission, a product test).',
            'Your openings, a new service or a launch.',
            'A question to reply to: replies help you understand your audience and what to sell next.',
          ]}
        />
        <p className={p}>When you launch a guide or course, email your list first. See <Link to="/blog/how-to-sell-a-beauty-ebook" className={a}>how to sell a beauty ebook</Link> for a launch plan.</p>
        <ArticleImage src="photo-1608571423902-eed4a5ad8108" alt="Amber dropper bottle on a wooden stand" />
      </section>

      <section id="legal">
        <h2 className={h2}>Consent and the legal basics</h2>
        <p className={p}>Email marketing rules depend on where you and your subscribers live. In many places you need clear consent to send marketing emails, an unsubscribe link in every email, and your business contact details in the footer. Do not buy lists, and do not add clients or brand contacts to your newsletter without their agreement. Your email tool&apos;s help center usually explains the rules for your region.</p>
      </section>

      <section id="first-100">
        <h2 className={h2}>Your first 100 subscribers: a simple plan</h2>
        <p className={p}>The first subscribers come from people who already know you. A four-week plan:</p>
        <ArticleTable
          headers={['Week', 'Action', 'Goal']}
          rows={[
            ['1', 'Publish the lead magnet, add it to your link in bio, post a story showing the inside', 'Your most engaged followers sign up'],
            ['2', 'A "comment to get it" Reel or TikTok answering part of the problem', 'Reach people who do not see your stories'],
            ['3', 'Tell clients and past buyers, with a QR code at your station or in your aftercare message', 'People who already trust you'],
            ['4', 'A LIVE or Q&A on the topic, ending with the signup link', 'Convert interested viewers'],
          ]}
        />
        <p className={p}>Then keep one signup mention in your content every week. Lists grow from steady reminders more than from one big push.</p>
      </section>

      <section id="subjects">
        <h2 className={h2}>Subject lines that get opened</h2>
        <p className={p}>Write subject lines like a message to a friend: specific, short, and about the reader. Some examples to adapt:</p>
        <ArticleTable
          headers={['Email type', 'Example subject line']}
          rows={[
            ['Tip', 'The 2-minute step that makes your base last all day'],
            ['Story', 'What I changed after a client\'s lashes fell out early'],
            ['Openings', 'Three fill slots left next week'],
            ['Launch', 'The routine guide is open (founding price until Sunday)'],
            ['Question', 'Quick question about your skin this winter'],
          ]}
        />
        <ArticleTip>Track two numbers per email: how many opened and how many clicked. If opens drop, test new subject lines; if clicks drop, your offer or call to action needs work.</ArticleTip>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>If you take clients, Nelsy handles the booking side from your link in bio: services, deposits, payments and automatic reminders, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/bookings" className={a}>bookings</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
