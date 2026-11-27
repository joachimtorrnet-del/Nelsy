import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'nail-tech-caption-ideas',
  title: 'Nail Tech Caption Ideas for Instagram (50+ Examples)',
  seoTitle: "50+ Nail Tech Caption Ideas for Instagram (Copy & Paste)",
  excerpt: 'Caption ideas for every type of nail tech Instagram post: portfolio posts, booking prompts, behind the scenes, educational, and seasonal content.',
  seoDescription: "Copy-and-paste Instagram captions for nail techs: nail photo captions, booking posts, new set reveals and seasonal captions that get clients to book.",
  category: 'instagram-content',
  audience: ['pros'],
  craft: 'nails',
  tags: ['instagram captions', 'nail tech captions', 'instagram content', 'nail tech social media'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: 'Nail tech Instagram caption ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-20',
  tldr: {
    answer: 'The best nail tech captions name the look in the first line, add one detail that makes clients feel it, and end with one clear booking action.',
    detail: 'Use the 3-line formula below for every nail photo, then rotate in booking, behind-the-scenes and seasonal captions. Copy the templates and swap the brackets.',
    points: [
      { label: 'Formula', text: 'Hook (the look) + detail (colour, shape, vibe) + CTA (book, DM a keyword, or save).' },
      { label: 'Length', text: '1 to 3 short lines on nail photos; longer only for stories and education.' },
      { label: 'CTA', text: 'Say exactly what to do: "Link in bio, takes 2 minutes" beats "bookings available".' },
    ],
  },
  toc: [
    { id: 'caption-formula', label: 'The 3-line caption formula' },
    { id: 'portfolio-captions', label: 'Portfolio / nail photo captions' },
    { id: 'booking-captions', label: 'Booking prompt captions' },
    { id: 'bts-captions', label: 'Behind-the-scenes captions' },
    { id: 'seasonal-captions', label: 'Seasonal captions' },
    { id: 'cta-formulas', label: 'CTA formulas that actually work' },
    { id: 'measure', label: 'How to know which captions work' },
  ],
  relatedSlugs: ['nail-content-that-gets-bookings', 'nail-tech-story-ideas-that-get-clients-to-book', 'nail-tech-content-pillars', '100-nail-tech-content-ideas'],
  faq: [
    { q: 'How long should nail tech Instagram captions be?', a: 'For a nail photo, 1 to 3 short lines is enough because the image does the work. For a personal or educational post, 2 to 4 short paragraphs can work. Instagram shows only the first line or two before "more", so put the hook (the name of the look) first and the CTA last.' },
    { q: 'Should nail techs use hashtags in captions?', a: 'Yes, a few relevant ones at the end of the caption. Mix a location tag (for example #ManchesterNails), a technique tag (#GelNailArt) and one broader tag (#NailInspo). Very broad tags like #Nails are so crowded that a small account is unlikely to be seen there, so local and niche tags matter more.' },
    { q: 'What is the best caption for a nail photo?', a: 'Name the colour or style, describe the feel in a few words, then invite one action. Example: "Raspberry glazed. Pink-red with a chrome finish, perfect for December. Swipe for the full set and tap the link in bio to book yours." It is concrete, sensory, and ends with a CTA.' },
    { q: 'Should every caption ask people to book?', a: 'No. A simple rotation works well: about half your posts end with a booking CTA, and the rest ask for a save, a comment or a share. Constant hard selling makes people scroll past, while no CTA at all leaves bookings on the table.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="caption-formula">
        <h2 className="font-serif text-2xl font-bold mb-4">The 3-line caption formula</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Almost every caption below follows the same structure. Once you know it, you can write a caption in under a minute:</p>
        <ArticleSteps
          steps={[
            { title: 'Line 1: the hook', body: 'Name the look so it shows before "more": "Milky French on short almond."' },
            { title: 'Line 2: the detail', body: 'One sensory or practical detail: the colour name, the finish, how long it lasts, who it suits.' },
            { title: 'Line 3: the CTA', body: 'One action only: "Link in bio to book", "DM me FRENCH for prices", or "Save this for your next appointment".' },
          ]}
        />
        <ArticleCallout variant="info" title="Copy this template">
          &quot;[Name of the look] on [shape/length]. [One detail: colour, finish, vibe or occasion]. [One action] 💅&quot;
          <br /><br />
          Example filled in: &quot;Chocolate chrome on short square. Rich brown with a soft mirror finish, made for autumn. Link in bio to book yours 💅&quot;
        </ArticleCallout>
      </section>

      <section id="portfolio-captions">
        <h2 className="font-serif text-2xl font-bold mb-4">Portfolio / nail photo captions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">These captions accompany your best nail photos. Name the look, create a sensory moment, end with a booking nudge:</p>
        <div className="space-y-3">
          {[
            '"The nude you didn\'t know you needed. Subtle, clean, and absolutely addictive. Link in bio to book yours."',
            '"Obsessed with how this came out. Glazed, milky, perfection. Tap the link in bio to get booked in 🤍"',
            '"This red is criminal. Coming in or staying in? Either way, nails need to be doing THIS. Book via link in bio."',
            '"Soft girl nails for a not-so-soft week. Sometimes you need your nails to carry you. Book now, link in bio."',
            '"I don\'t know who these nails are for but I love her. 3D florals, summer ready. Comment BOOK and I\'ll send you the link."',
            '"The set that made me put my phone down mid-application. Yes, they\'re that good. Book in via the link in bio 🌷"',
            '"Glazed donut nails are having a moment and I am here for it. Chrome powder and a vibe. DM me GLAZE for the inspo."',
            '"Nail art that makes strangers ask about your hands. This is the standard we\'re setting. Book while slots are available."',
            '"[Shape] + [colour] = the combo of the season. [Length] so it works for [work/gym/everyday]. Link in bio."',
            '"Swipe to the last photo for the close-up. Cuticles, apex, shine: this is what [service name] looks like here. Book via link in bio."',
          ].map((caption, i) => (
            <ArticleCallout key={i} variant="info" title="">
              {caption}
            </ArticleCallout>
          ))}
        </div>
      </section>

      <section id="booking-captions">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking prompt captions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Direct booking posts. Pair them with a nail photo, a before/after, or an availability graphic:</p>
        <div className="space-y-3">
          {[
            '"Spots are open for [month]. Grab yours before they\'re gone. I book up [X] weeks in advance so now is the time. Link in bio."',
            '"Cancellation alert: [day] at [time] just opened up. First to reply gets it 👀 DM me BOOK."',
            '"PSA: [month] bookings are now live. These go fast, especially weekends. Link in bio. You know what to do."',
            '"If your nails have been on your to-do list for three weeks, this is the sign. Book via link in bio. I\'ll take care of the rest."',
            '"Reminder that you deserve fresh nails. Not next month. Now. Link in bio 💅"',
            '"Still thinking about it? Last week I had [X] people on the waitlist. Secure your slot now. Link in bio."',
            '"New clients: [service] is [price] and takes [time]. Pick your slot at the link in bio, no DMs needed."',
          ].map((caption, i) => (
            <ArticleCallout key={i} variant="info" title="">
              {caption}
            </ArticleCallout>
          ))}
        </div>
        <ArticleTip>Booking captions don&apos;t need to be long. A clear statement, a real reason to act now (a specific open slot, a date bookings open), and a CTA. Only use urgency that is true: if you say 3 slots are left, 3 slots should be left.</ArticleTip>
      </section>

      <section id="bts-captions">
        <h2 className="font-serif text-2xl font-bold mb-4">Behind-the-scenes captions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">BTS captions are warmer and more personal. They build the relationship with potential clients who aren&apos;t quite ready to book yet:</p>
        <div className="space-y-3">
          {[
            '"Setting up for a full day of sets. Coffee: ready. Lamp: on. Zero regrets about becoming a nail tech."',
            '"This is what [X] hours of nail appointments looks like. Tired? Yes. Happy? Absolutely."',
            '"Not me almost buying every colour in this new collection. Which one should go on my next client?"',
            '"Real talk: I practice new techniques on myself first. These were attempt 3. You should see attempt 1."',
            '"My desk at 9am vs my desk at 6pm. The chaos is worth it."',
            '"How I sanitise between every client, in 30 seconds. Because clean tools are non-negotiable."',
            '"Sometimes I get so into a set I forget to eat. Today was one of those days. Tap the link in bio if you want nails that make you forget to eat."',
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
            ['January', '"New year, new nails. Let\'s start [year] with your hands looking their best. Bookings open, link in bio."'],
            ['Spring', '"Spring is finally here and these nails know it. Fresh colour, fresh energy. Book your spring refresh at the link in bio 🌸"'],
            ['Summer', '"Summer nails are a different breed. Brighter, bolder, and slightly unhinged in the best way. Link in bio to book."'],
            ['Autumn', '"Autumn nail season is my favourite. Burnt caramel, deep burgundy, muted sage. Booking now, link in bio 🍂"'],
            ['Christmas', '"December books are going fast. Get your Christmas nails secured before it\'s too late. Link in bio."'],
            ['Valentine\'s Day', '"Whether you have a Valentine or you\'re your own Valentine, your nails need to be this cute. Book now 🩷"'],
            ['Wedding season', '"Bridal season is here. Wedding nails, bridesmaids, hen parties: I\'ve got you. DM me BRIDAL for group bookings."'],
          ]}
        />
      </section>

      <section id="cta-formulas">
        <h2 className="font-serif text-2xl font-bold mb-4">CTA formulas that actually work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Every booking-related caption needs a clear call to action. The formula is: <strong>what you want them to do + how to do it + how easy it is</strong>.</p>
        <ArticleTable
          headers={['Weak CTA', 'Strong CTA']}
          rows={[
            ['"Bookings available"', '"3 slots left this week. Link in bio to book before they\'re gone"'],
            ['"Message me for details"', '"DM me BOOK and I\'ll send you availability for [month]"'],
            ['"Check my bio for info"', '"Prices, times and open slots are at the link in bio. Takes 2 minutes to book"'],
            ['"Let me know if you\'re interested"', '"Comment INTERESTED and I\'ll DM you the details"'],
            ['"Like if you love these"', '"Save this so you can show me at your next appointment"'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For more on creating content that actually converts: <Link to="/blog/nail-content-that-gets-bookings" className={link}>nail content that gets bookings</Link>.</p>
      </section>

      <section id="measure">
        <h2 className="font-serif text-2xl font-bold mb-4">How to know which captions work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Likes alone don&apos;t tell you much. Track two numbers for each post for a month: engagement rate and booking actions (link taps, keyword DMs, bookings).</p>
        <ArticleCallout variant="info" title="Example calculation">
          Example: a post reaches 2,000 accounts and gets 60 likes, 10 comments, 25 saves and 5 shares. Engagement = 60 + 10 + 25 + 5 = 100. Engagement rate = 100 ÷ 2,000 = 5%. If that post also brought 4 DMs with your keyword, compare it with a post using a different CTA style and keep the winner.
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">You can run the same maths in seconds with the <Link to="/tools/instagram-engagement-calculator" className={link}>Instagram engagement calculator</Link>.</p>
      </section>
    </div>
  ),
});
export {};
