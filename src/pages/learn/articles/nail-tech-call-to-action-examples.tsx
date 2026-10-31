import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-call-to-action-examples',
  title: 'Nail Tech Call-to-Action Examples That Get More Bookings',
  seoTitle: 'Nail Tech Call-to-Action Examples That Get More Bookings',
  excerpt: 'A great post with a weak call to action is a wasted opportunity. Here are nail tech CTA examples that actually prompt bookings — with caption copy you can adapt.',
  seoDescription: 'Nail tech call-to-action examples for Instagram, TikTok and captions. Booking CTAs, enquiry CTAs, link in bio prompts, and direct message CTAs with copy you can use.',
  category: 'instagram-content',
  tags: ['nail tech call to action', 'nail tech instagram captions', 'nail tech booking CTA', 'nail tech social media'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'Nail tech call-to-action examples for more bookings',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-ctas-matter', label: 'Why your CTA matters' },
    { id: 'booking-ctas', label: 'Booking CTAs' },
    { id: 'enquiry-ctas', label: 'Enquiry and DM CTAs' },
    { id: 'link-in-bio', label: 'Link in bio CTAs' },
    { id: 'story-ctas', label: 'Instagram Story CTAs' },
    { id: 'cta-mistakes', label: 'CTA mistakes to avoid' },
  ],
  relatedSlugs: ['tiktok-ideas-nail-techs', 'nail-tech-content-calendar-30-day', 'how-to-set-up-nail-tech-link-in-bio', 'how-to-get-nail-clients-from-tiktok'],
  faq: [
    { q: 'Should every post have a call to action?', a: 'Most posts should have some kind of CTA, but not every post needs to ask for a booking. A mix of CTAs works better: booking prompts for availability posts, save/share requests for inspo, comments for engagement-building posts. If every post ends in "book now," the urgency becomes background noise. Vary your CTAs to match what the post is trying to accomplish.' },
    { q: 'What\'s better: "link in bio" or "DM to book"?', a: 'Both have a place. "Link in bio" is lower friction for clients who are ready — they click, they book. "DM to book" works well if your booking system isn\'t online yet, or when you want a personal conversation before accepting a booking (complex nail art, new client vetting). If you have online booking, default to "link in bio" — fewer steps between intent and booking.' },
    { q: 'How long should a nail tech caption be?', a: 'Long enough to serve the CTA, short enough to hold attention. A booking availability post can be 2–3 sentences. An educational post about nail care can be longer — but only if the information earns the length. Most nail tech captions that perform well are under 150 words. Put the CTA at the end — Instagram truncates long captions, so if your CTA is buried, many people won\'t see it.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-ctas-matter">
        <h2 className="font-serif text-2xl font-bold mb-4">Why your CTA matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail tech posts show beautiful nails. Fewer tell the viewer exactly what to do next. Without a clear call to action, people admire the work, double-tap, and scroll on — they don't book.</p>
        <p className="text-gray-700 leading-relaxed">A CTA removes the decision for the viewer. It tells them: this is what I want you to do next. The key is matching the CTA to where the viewer is in their thinking — a cold follower needs a different prompt than someone who's been following you for three months.</p>
      </section>

      <section id="booking-ctas">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking CTAs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Use these when you have availability to fill and want direct bookings:</p>
        <ArticleTable
          headers={['Situation', 'CTA copy']}
          rows={[
            ['Availability announcement', '"I have a few spots left in [month] — book in the link in my bio before they go."'],
            ['Last-minute opening', '"A spot just opened up [day] at [time]. First to book it via the link in bio gets it."'],
            ['New service launch', '"I\'m now offering [service] — slots are open. Book your first appointment in bio."'],
            ['After posting a set you loved', '"Want something like this? I have [X] openings in [month]. Link in bio to book."'],
            ['Reminder post', '"If you\'ve been thinking about booking — this is your sign. Open slots this week. Bio link."'],
          ]}
        />
        <ArticleTip>Mention your specific availability rather than just "book now." "I have 3 spots left this week" creates urgency that "book now" doesn't.</ArticleTip>
      </section>

      <section id="enquiry-ctas">
        <h2 className="font-serif text-2xl font-bold mb-4">Enquiry and DM CTAs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">These work when you want to qualify the client before booking or don't yet have an online booking system:</p>
        <ArticleTable
          headers={['Situation', 'CTA copy']}
          rows={[
            ['Nail art enquiry', '"Want something custom? DM me a photo of your inspo and I\'ll let you know if we can make it happen."'],
            ['New client welcome', '"Never been to me before? DM me \'new client\' and I\'ll send you my current availability and prices."'],
            ['Waitlist building', '"No slots right now but DM me \'waitlist\' and I\'ll message you as soon as one opens up."'],
            ['Location-based growth', '"Based in [area]? DM me — I take clients in [area/postcode] and currently have openings."'],
          ]}
        />
      </section>

      <section id="link-in-bio">
        <h2 className="font-serif text-2xl font-bold mb-4">Link in bio CTAs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The standard on Instagram — but how you phrase it matters:</p>
        <ArticleCallout variant="info" title="Weak vs strong">
          Weak: "Book via the link in my bio."<br />
          Strong: "Check my availability and book your slot in the link in my bio — slots go fast at the start of each month."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Add context to the link in bio reference: what will they find there, why should they click now? The additional specificity converts more than the generic instruction.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">For setting up your link in bio page effectively: <Link to="/learn/how-to-set-up-nail-tech-link-in-bio" className="underline text-[#F52B8C]">how to set up a nail tech link in bio page</Link>.</p>
      </section>

      <section id="story-ctas">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram Story CTAs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Stories are higher-intent than feed — people watching stories are engaged. Use that:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>"Swipe up / tap the link" (use the link sticker) for direct booking</li>
          <li>Poll sticker: "Would you book this set?" (Yes / No) — engagement + intent signal</li>
          <li>Question sticker: "What nails are you dreaming of for [month]?" — starts a booking conversation</li>
          <li>Countdown sticker to when bookings open — creates anticipation</li>
          <li>DM prompt: "Reply to this story with 'book me' and I'll send you my next available dates"</li>
        </ul>
      </section>

      <section id="cta-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">CTA mistakes to avoid</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>No CTA at all:</strong> The most common mistake — beautiful post, nothing to do next</li>
          <li><strong>Multiple CTAs in one post:</strong> "Book / DM / share / save / follow" — too many actions, people take none</li>
          <li><strong>CTA buried at the end of a very long caption:</strong> Instagram truncates; many won't see it</li>
          <li><strong>Generic urgency:</strong> "Book fast!" without specific availability isn't persuasive</li>
          <li><strong>Wrong CTA for the post:</strong> An inspo post doesn't need a booking CTA — it needs a save/share CTA</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
