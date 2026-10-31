import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-caption-ideas',
  title: 'Nail Tech Caption Ideas for Instagram (50+ Examples)',
  seoTitle: 'Nail Tech Caption Ideas for Instagram (50+ Copy-Paste Examples)',
  excerpt: 'Caption ideas for every type of nail tech Instagram post — portfolio posts, booking prompts, behind the scenes, educational, and seasonal content.',
  seoDescription: 'Nail tech caption ideas for Instagram. 50+ caption examples for nail photos, booking posts, behind the scenes, seasonal content — with CTA formulas that get responses.',
  category: 'instagram-content',
  tags: ['instagram captions', 'nail tech captions', 'instagram content', 'nail tech social media'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: 'Nail tech Instagram caption ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'portfolio-captions', label: 'Portfolio / nail photo captions' },
    { id: 'booking-captions', label: 'Booking prompt captions' },
    { id: 'bts-captions', label: 'Behind-the-scenes captions' },
    { id: 'seasonal-captions', label: 'Seasonal captions' },
    { id: 'cta-formulas', label: 'CTA formulas that actually work' },
  ],
  relatedSlugs: ['nail-content-that-gets-bookings', 'nail-tech-story-ideas-that-get-clients-to-book', 'nail-tech-content-pillars', '100-nail-tech-content-ideas'],
  faq: [
    { q: 'How long should nail tech Instagram captions be?', a: 'It depends on the post type. For a nail photo: 1–3 sentences is plenty — the image does the work. For a more personal or educational post: 2–4 short paragraphs can work well. Instagram shows the first 1–2 lines before "more" — your first line needs to be the hook. Very long captions on a nail photo are usually ignored.' },
    { q: 'Should nail techs use hashtags in captions?', a: 'Yes, but put them at the end of the caption or in the first comment. 5–15 relevant hashtags per post is more effective than 30 generic ones. Use a mix of location-specific (e.g. #ManchesterNails), niche (#GelNailArt), and slightly broader tags (#NailInspo). Avoid maxed-out tags like #Nails (500M+ posts) — you\'ll get buried.' },
    { q: 'What\'s the best caption for a nail photo?', a: 'Name the colour, describe the vibe, then invite action. For example: "Raspberry glazed — this Aprés pink-red is everything this season. Swipe for the full set and tap the link in bio to book yours 🩷" It\'s concrete, sensory, and has a CTA.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="portfolio-captions">
        <h2 className="font-serif text-2xl font-bold mb-4">Portfolio / nail photo captions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">These captions accompany your best nail photos. Name the look, create a sensory moment, end with a booking nudge:</p>
        <div className="space-y-3">
          {[
            '"The nude you didn\'t know you needed. Subtle, clean, and absolutely addictive. Link in bio to book yours."',
            '"Obsessed with how this came out. Glazed, milky, perfection. Tap the link in bio to get booked in 🤍"',
            '"This red is criminal. Coming in or staying in? Either way, nails need to be doing THIS. Book via link in bio."',
            '"Soft girl nails for a not-so-soft week. Sometimes you need your nails to carry you. Book now — link in bio."',
            '"I don\'t know who these nails are for but I love her. 3D florals, summer ready. Comment BOOK and I\'ll send you the link."',
            '"The set that made me put my phone down mid-application. Yes, they\'re that good. Book in via the link in bio 🌷"',
            '"Glazed donut nails are having a moment and I am here for it. All you need is a chrome powder and a vibe. DM me GLAZE for the inspo."',
            '"Nail art that makes strangers ask about your hands. This is the standard we\'re setting. Book while slots are available."',
          ].map((caption, i) => (
            <ArticleCallout key={i} variant="info" title="">
              {caption}
            </ArticleCallout>
          ))}
        </div>
      </section>

      <section id="booking-captions">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking prompt captions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Direct booking posts — pair with a nail photo, a before/after, or a availability graphic:</p>
        <div className="space-y-3">
          {[
            '"Spots are open for [month] — grab yours before they\'re gone. I book up [X] weeks in advance so now is the time. Link in bio."',
            '"Cancellation alert: [day] at [time] just opened up. First to reply gets it 👀 DM me BOOK."',
            '"PSA: [month] bookings are now live. These go fast — especially weekends. Link in bio. You know what to do."',
            '"If your nails have been on your to-do list for three weeks, this is the sign. Book via link in bio. I\'ll take care of the rest."',
            '"Reminder that you deserve fresh nails. Not next month. Now. Link in bio 💅"',
            '"Still thinking about it? Don\'t wait — last week I had [X] people on a waitlist. Secure your slot now. Link in bio."',
          ].map((caption, i) => (
            <ArticleCallout key={i} variant="info" title="">
              {caption}
            </ArticleCallout>
          ))}
        </div>
        <ArticleTip>Booking captions don't need to be long. A clear statement, a sense of urgency, and a CTA is the formula. One short paragraph often outperforms an essay.</ArticleTip>
      </section>

      <section id="bts-captions">
        <h2 className="font-serif text-2xl font-bold mb-4">Behind-the-scenes captions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">BTS captions are warmer and more personal — they build the relationship with potential clients who aren't quite ready to book yet:</p>
        <div className="space-y-3">
          {[
            '"Setting up for a full day of sets. I\'ve got my coffee, my new press-on kit from [brand], and absolutely zero regrets about becoming a nail tech."',
            '"This is what [X] hours of nail appointments looks like. Tired? Yes. Happy? Absolutely."',
            '"Not me almost buying every colour in this new collection. I only need 47 of them. [Brand] got me again."',
            '"Real talk: I practice new techniques on myself first. These were attempt 3. You should see attempt 1."',
            '"My desk at 9am vs my desk at 6pm. The chaos is worth it."',
            '"Sometimes I get so into a set I forget to eat. Today was one of those days. Anyway, tap the link in bio if you want nails that make you forget to eat."',
          ].map((caption, i) => (
            <ArticleCallout key={i} variant="info" title="">
              {caption}
            </ArticleCallout>
          ))}
        </div>
      </section>

      <section id="seasonal-captions">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal captions</h2>
        <ArticleTable
          headers={['Season / occasion', 'Caption idea']}
          rows={[
            ['January', '"New year, new nails. Let\'s start [year] with your hands looking their absolute best. Bookings open — link in bio."'],
            ['Spring', '"Spring is finally here and these nails know it. Fresh colour, fresh energy. Book your spring refresh — link in bio 🌸"'],
            ['Summer', '"Summer nails are a different breed. Brighter, bolder, and slightly unhinged in the best way. Link in bio to book."'],
            ['Autumn', '"Autumn nail season is my favourite. Burnt caramel, deep burgundy, muted sage. Obsessed. Booking now — link in bio 🍂"'],
            ['Christmas', '"December books are going fast. Get your Christmas nails secured before it\'s too late. Link in bio."'],
            ['Valentine\'s Day', '"Whether you have a Valentine or you\'re your own Valentine, your nails need to be this cute. Book now 🩷"'],
            ['Wedding season', '"Bridal season is here. Wedding nails, bridesmaids, hen parties — I\'ve got you. DM me for group bookings."'],
          ]}
        />
      </section>

      <section id="cta-formulas">
        <h2 className="font-serif text-2xl font-bold mb-4">CTA formulas that actually work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Every booking-related caption needs a clear call to action. The formula is: <strong>what you want them to do + how to do it</strong>. Don't leave it vague.</p>
        <ArticleTable
          headers={['Weak CTA', 'Strong CTA']}
          rows={[
            ['"Bookings available"', '"3 slots left this week — link in bio to book before they\'re gone"'],
            ['"Message me for details"', '"DM me BOOK and I\'ll send you availability for [month]"'],
            ['"Check my bio for info"', '"All the details are at the link in bio — takes 2 minutes to book"'],
            ['"Let me know if you\'re interested"', '"Comment INTERESTED and I\'ll DM you the details"'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For more on creating content that actually converts: <Link to="/learn/nail-content-that-gets-bookings" className="underline text-[#F52B8C]">nail content that gets bookings</Link>.</p>
      </section>
    </div>
  ),
});
export {};
