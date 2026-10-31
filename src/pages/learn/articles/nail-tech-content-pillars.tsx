import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-content-pillars',
  title: 'Nail Tech Content Pillars: What Should You Post About?',
  seoTitle: 'Nail Tech Content Pillars: What to Post on Instagram (Framework)',
  excerpt: 'Stop staring at a blank caption box. Content pillars give your Instagram a strategy — so you always know what to post, why, and for whom.',
  seoDescription: 'Nail tech content pillars explained. The 5 content types every nail tech should post, with examples for each pillar and a weekly planning framework.',
  category: 'instagram-content',
  tags: ['content pillars', 'nail tech content strategy', 'instagram strategy', 'nail tech social media'],
  heroImage: 'linear-gradient(135deg, #FAF5FF 0%, #E9D5FF 100%)',
  heroImageAlt: 'Nail tech content pillars framework',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'what-are-pillars', label: 'What content pillars are' },
    { id: 'five-pillars', label: 'The 5 content pillars for nail techs' },
    { id: 'pillar-breakdown', label: 'Each pillar in detail' },
    { id: 'weekly-mix', label: 'Weekly content mix' },
    { id: 'common-mistakes', label: 'Common content strategy mistakes' },
  ],
  relatedSlugs: ['nail-content-that-gets-bookings', 'how-often-should-nail-techs-post', '100-nail-tech-content-ideas', 'nail-tech-caption-ideas'],
  faq: [
    { q: 'How many content pillars should a nail tech have?', a: '3–5 is the ideal range. Fewer than 3 and your content becomes repetitive. More than 5 and it\'s hard to stay consistent across all of them. Most nail techs work well with 4 pillars: portfolio, booking/CTAs, education, and personal/BTS. Add a fifth if you have a specific content strength (e.g. humour, tutorials, reviews).' },
    { q: 'Do I need to stick rigidly to content pillars?', a: 'No — they\'re a guide, not a cage. Use them to break out of creative blocks and ensure you\'re covering the right ground each week. If a spontaneous idea doesn\'t fit a pillar, post it anyway. The pillars are there to help you plan, not to stop you being yourself.' },
    { q: 'What\'s the most important content pillar for getting bookings?', a: 'The booking/conversion pillar — the content with direct CTAs. This is the thing that most nail techs underpost. They post lots of portfolio content but rarely include explicit booking prompts. You need to ask for the booking regularly and specifically, not just post your work and hope clients figure it out.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-are-pillars">
        <h2 className="font-serif text-2xl font-bold mb-4">What content pillars are (and why they matter)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Content pillars are the 3–5 recurring themes your Instagram content returns to. Instead of deciding from scratch what to post every day, you choose a pillar and generate ideas within it. The result: a more coherent account, less creative fatigue, and content that serves different client needs rather than just repeating the same type of post.</p>
        <p className="text-gray-700 leading-relaxed">A nail tech with no content strategy tends to post only portfolio content (nail photos) and occasionally a booking reminder. A nail tech with clear pillars posts a variety that builds trust, educates potential clients, shows personality, and directly drives bookings — which reaches different types of followers at different stages of deciding to book.</p>
      </section>

      <section id="five-pillars">
        <h2 className="font-serif text-2xl font-bold mb-4">The 5 content pillars for nail techs</h2>
        <ArticleTable
          headers={['Pillar', 'Purpose', 'Content goal']}
          rows={[
            ['Portfolio', 'Show your work and range', 'Convert visitors who see your profile for the first time'],
            ['Education', 'Teach something about nails or nail care', 'Build authority; attract clients who value expertise'],
            ['Behind the scenes', 'Show the person behind the work', 'Build trust and familiarity; encourage repeat bookings'],
            ['Booking / conversion', 'Directly prompt people to book', 'Fill your calendar'],
            ['Social proof', 'Share client results, reviews, feedback', 'Reassure undecided potential clients'],
          ]}
        />
        <ArticleTip>Most nail techs already have "portfolio" as a de facto pillar. The underused pillars that drive the most bookings are "booking/conversion" and "social proof." Add intentional posts from these two and you\'ll likely see an immediate uptick in enquiries.</ArticleTip>
      </section>

      <section id="pillar-breakdown">
        <h2 className="font-serif text-2xl font-bold mb-4">Each pillar in detail</h2>

        <h3 className="font-semibold text-lg mb-2">1. Portfolio</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">Your most natural content: the nail sets you're proud of. To make it work harder, vary the format (close-up, full hand, process, before/after) and add a caption that names the look and invites action. Don't just post a photo with "obsessed 💅" as the caption — that's a missed CTA.</p>

        <h3 className="font-semibold text-lg mb-2 mt-4">2. Education</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">Teach something your clients or potential clients genuinely want to know. The best educational content pre-answers questions clients ask in DMs: "How do I stop my gel from lifting?", "What's the difference between gel and acrylic?", "Should I have my nails done while pregnant?" These build your authority and get saved — which is a strong signal to the algorithm.</p>

        <h3 className="font-semibold text-lg mb-2 mt-4">3. Behind the scenes</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">The day-in-the-life content that shows who you are beyond the nails. Your desk setup, your favourite products, a funny moment from a client session (anonymised), the struggle of ordering supplies at midnight. This content builds the relationship that turns a follower into a loyal client who rebooks every 3 weeks.</p>

        <h3 className="font-semibold text-lg mb-2 mt-4">4. Booking / conversion</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">The content that explicitly asks for the booking. Availability posts ("2 slots left this week — link in bio"), seasonal prompts ("get your Christmas nails sorted — book before October"), limited-offer content, and rebooking reminders. These feel obvious but most nail techs don't post enough of them.</p>
        <ArticleCallout variant="info" title="Aim for 20–25% of your posts to include a direct booking CTA">
          If you post 5 times a week, at least 1 should be directly about booking. A profile that only shows work but never asks for the booking leaves conversions on the table.
        </ArticleCallout>

        <h3 className="font-semibold text-lg mb-2 mt-4">5. Social proof</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">Client results and feedback. Before/after photos. A screenshot of a client's DM saying they loved their nails. A client's own post with your tag. A Google review screenshot. This pillar answers the unspoken question every potential client has: "Is she actually good?"</p>
      </section>

      <section id="weekly-mix">
        <h2 className="font-serif text-2xl font-bold mb-4">Weekly content mix</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you post 5 times a week (across feed + Stories), a balanced weekly mix might look like:</p>
        <ArticleTable
          headers={['Day', 'Pillar', 'Example post']}
          rows={[
            ['Monday', 'Booking', 'Story: "Slots open this week — link in bio to grab one"'],
            ['Tuesday', 'Portfolio', 'Feed post: your best set from last week, strong caption + CTA'],
            ['Wednesday', 'Behind the scenes', 'Story: desk setup, new product arrival, or relatable work moment'],
            ['Thursday', 'Education', 'Reel or carousel: "Why your gel lifts (and how to fix it)"'],
            ['Friday', 'Social proof', 'Feed post or Story: client review screenshot or before/after'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">This isn't a formula to follow rigidly — it's a starting point. Adjust based on what you're comfortable creating and what your audience responds to best.</p>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common content strategy mistakes</h2>
        <ArticleTable
          headers={['Mistake', 'What it looks like', 'Fix']}
          rows={[
            ['Only portfolio content', 'Every post is a nail photo, rarely a CTA', 'Add 1 booking post + 1 social proof post per week'],
            ['No booking CTAs', 'Beautiful posts, no mention of how to book', 'End every portfolio caption with a CTA'],
            ['Posting to post', 'Daily posts, inconsistent quality', 'Reduce frequency, increase quality'],
            ['No content plan', 'Post randomly; dry spells followed by floods', 'Plan a week ahead — 30 minutes on Sunday'],
            ['Ignoring Stories', 'Only posts, no Stories', 'Stories convert warmer followers; post availability there especially'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For specific post ideas across each pillar: <Link to="/learn/100-nail-tech-content-ideas" className="underline text-[#F52B8C]">100 nail tech content ideas</Link>. For caption help: <Link to="/learn/nail-tech-caption-ideas" className="underline text-[#F52B8C]">nail tech caption ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
