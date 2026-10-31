import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-first-10-nail-clients',
  title: 'How to Get Your First 10 Nail Clients',
  seoTitle: 'How to Get Your First 10 Nail Clients as a New Nail Tech',
  excerpt: 'Getting your first 10 paying clients is the hardest part. Here\'s a realistic, step-by-step approach that doesn\'t require a big following or paid ads.',
  seoDescription: 'How to get your first 10 nail clients as a new nail tech. Practical steps covering portfolio building, Instagram, word of mouth, and pricing your first clients.',
  category: 'get-clients',
  tags: ['first clients', 'new nail tech', 'getting started', 'nail clients'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #E879F9 30%, #C084FC 100%)',
  heroImageAlt: 'How to get first 10 nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'the-hardest-part', label: 'Why the first 10 are hardest' },
    { id: 'step-by-step', label: 'A step-by-step approach' },
    { id: 'pricing-first-clients', label: 'How to price for first clients' },
    { id: 'instagram-basics', label: 'Instagram basics for new nail techs' },
    { id: 'word-of-mouth', label: 'Making word of mouth work' },
    { id: 'converting-to-regulars', label: 'Converting first clients to regulars' },
  ],
  relatedSlugs: ['how-to-get-more-nail-clients', 'how-to-get-nail-clients-from-instagram', 'how-to-get-more-local-nail-clients'],
  faq: [
    { q: 'How long does it take to get your first nail clients?', a: 'With a focused approach, most new nail techs get their first paying clients within 2–4 weeks. The key is being willing to do model sets initially, asking those models to post and refer, and having a booking mechanism ready before you start marketing.' },
    { q: 'Should I charge for my first nail clients?', a: 'Model sets (free or heavily discounted) are useful for building your portfolio before you have photos to show. Once you have 10–15 good portfolio photos, start charging — even if it\'s below your eventual target price. Charging from the start trains clients to value your work.' },
    { q: 'Do I need a website to get my first nail clients?', a: 'No. Instagram + a booking link is enough to get started. A website can come later. Focus on getting photos, getting clients, and getting reviews — those matter more than a website at the start.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="the-hardest-part">
        <h2 className="font-serif text-2xl font-bold mb-4">Why the first 10 clients are the hardest</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The first 10 clients are hard because you're trying to solve a chicken-and-egg problem: clients want to see your work before booking, but you need clients to build your portfolio. Without photos, you can't attract clients. Without clients, you can't take photos.</p>
        <p className="text-gray-700 leading-relaxed">The solution is to break the cycle with model sets — intentionally, not indefinitely. This guide shows you how to move through that phase quickly and start charging properly.</p>
      </section>

      <section id="step-by-step">
        <h2 className="font-serif text-2xl font-bold mb-4">A step-by-step approach</h2>
        <ArticleSteps steps={[
          { title: 'Set up your Instagram and booking page first', body: 'Before you tell anyone, create a dedicated nail Instagram account and set up a basic booking page. Even if it\'s empty, having these ready means you can point people somewhere the moment they express interest.' },
          { title: 'Do 5–10 model sets to build your portfolio', body: 'Ask friends, family, or post in local Facebook groups for nail models. Be clear: you\'re a new nail tech building your portfolio, the set will be free or heavily discounted, and you\'d like permission to photograph and post the results. Most people are happy with this.' },
          { title: 'Photograph every set carefully', body: 'Clean the nails, find good light (natural is best), and take multiple shots. Close-ups of individual nails, full hand shots, and if possible, a photo while you\'re working. These photos are your entire marketing at this stage.' },
          { title: 'Post consistently to Instagram', body: 'Post your portfolio photos. Use location tags (your city, local areas). Write captions that describe the set and include keywords clients might search for. Start building the habit of posting at least 3x per week.' },
          { title: 'Ask models to refer and post', body: 'After every model set, ask: "Would you mind posting a photo and tagging me? And if anyone you know is looking for a nail tech, I\'d love a referral." This is the fastest route to your first paying clients.' },
          { title: 'Start charging with client 11', body: 'Once you have a solid portfolio of 10–15 photos, start charging. Start below your full target price if you want to keep growing quickly, but charge from this point — even a small fee trains clients to see your work as valuable.' },
        ]} />
        <ArticleCallout variant="info" title="Model posts work better than you expect">
          When a real person posts photos of their nails and tags you, it reaches their friends — who are exactly the local potential clients you want. Your own posts reach your followers; your model's posts reach people who haven't found you yet.
        </ArticleCallout>
      </section>

      <section id="pricing-first-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">How to price for first clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A common mistake is charging too low for too long. Discounted pricing attracts bargain clients — people who are loyal to prices, not to you. When you eventually raise prices, they leave.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">A better approach:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Model sets (first 5–10): free or £10–15 materials cost only</li>
          <li>Early clients (clients 11–25): 20–30% below your target price</li>
          <li>Once established: full target price</li>
        </ul>
        <ArticleTip>Set your "introductory pricing" period and stick to it. Tell clients: "I'm currently offering introductory rates while I build my client base — rates will go up to £X in [month]." This creates urgency and sets expectations for price increases.</ArticleTip>
      </section>

      <section id="instagram-basics">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram basics for new nail techs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need thousands of followers to get local nail clients from Instagram. What you need:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>A clear bio: who you are, where you're based, how to book</li>
          <li>A booking link in your bio (even if you're not charging yet)</li>
          <li>Location tags on every post and reel</li>
          <li>Regular posting — 3x per week minimum while you're building</li>
          <li>Reply to every comment and DM promptly</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">For a full guide to Instagram growth: <Link to="/learn/how-to-grow-nail-tech-instagram" className="underline text-[#F52B8C]">How to grow your nail tech Instagram</Link>.</p>
      </section>

      <section id="word-of-mouth">
        <h2 className="font-serif text-2xl font-bold mb-4">Making word of mouth work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Word of mouth is your most powerful early marketing channel, but it doesn't happen automatically. You have to ask for it:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>At the end of every appointment: "I'm taking on new clients — if you know anyone looking for a nail tech, I'd love a referral."</li>
          <li>After posting a set: "If you're looking for a nail tech in [area], I have availability this week."</li>
          <li>In your Instagram bio: "Taking new clients — link below to book."</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Being explicit is more effective than being subtle. Clients genuinely want to help you if they like your work — but they won't act unless you ask.</p>
      </section>

      <section id="converting-to-regulars">
        <h2 className="font-serif text-2xl font-bold mb-4">Converting first clients to regulars</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your first 10 clients are valuable not just for income but for the referrals and reviews they generate. Make sure they leave wanting to rebook:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>At the end of each appointment, suggest when they should come back ("Infill in 3 weeks?")</li>
          <li>Make rebooking easy — have your booking page ready to show them on your phone</li>
          <li>Follow up after 2 weeks: "How are your nails holding up? Booking for an infill yet?"</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">A client who books three times is a regular. Regulars are the foundation of a stable nail business. See: <Link to="/learn/how-to-fill-nail-appointment-book" className="underline text-[#F52B8C]">How to fill your nail appointment book</Link>.</p>
      </section>
    </div>
  ),
});
export {};
