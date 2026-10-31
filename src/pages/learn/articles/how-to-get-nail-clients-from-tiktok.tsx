import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-nail-clients-from-tiktok',
  title: 'How to Get Nail Clients from TikTok',
  seoTitle: 'How to Get Nail Clients from TikTok (What Actually Works)',
  excerpt: 'TikTok can send a wave of new nail enquiries — but only if you approach it differently from Instagram. Here\'s how to convert TikTok reach into actual bookings.',
  seoDescription: 'How to get nail clients from TikTok. What content drives bookings, how to convert viewers into clients, and how TikTok differs from Instagram for nail tech marketing.',
  category: 'get-clients',
  tags: ['TikTok nail tech', 'nail clients TikTok', 'nail tech social media', 'nail business TikTok'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: 'How to get nail clients from TikTok',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'tiktok-vs-instagram', label: 'How TikTok is different from Instagram' },
    { id: 'content-that-converts', label: 'Content that converts to bookings' },
    { id: 'booking-link', label: 'Making the booking link accessible' },
    { id: 'local-discovery', label: 'Getting found by local clients' },
    { id: 'consistency', label: 'Consistency and realistic expectations' },
  ],
  relatedSlugs: ['tiktok-ideas-nail-techs', 'how-to-get-nail-clients-from-instagram', 'how-to-get-more-nail-clients', 'nail-tech-call-to-action-examples'],
  faq: [
    { q: 'Can TikTok actually get me local nail clients?', a: 'Yes — but TikTok\'s algorithm is primarily interest-based rather than location-based, so your content will reach people nationally or internationally before it reaches people in your city. To improve local reach: mention your city in your bio, your videos, and your captions. Use your city name in on-screen text. Clients who live locally and see your videos can find and book you — but TikTok requires more effort to convert into local bookings than Google local search does.' },
    { q: 'Should I prioritise TikTok or Instagram?', a: 'If you\'re already active on Instagram, don\'t abandon it for TikTok — your Instagram content is already attracting a local audience that knows you. TikTok is better thought of as an additional reach channel. Many nail techs post the same short-form video content on both Reels and TikTok with minimal extra effort, maximising reach without doubling workload.' },
    { q: 'What kind of nail content does best on TikTok?', a: 'Process videos (timelapse or real-time nail application), transformation videos (before and after), "get ready with me" nail content, and educational content ("how to make your nails last longer") tend to perform well. Pure portfolio posts (just a photo of nails) perform less well on TikTok than on Instagram.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="tiktok-vs-instagram">
        <h2 className="font-serif text-2xl font-bold mb-4">How TikTok is different from Instagram for nail techs</h2>
        <ArticleTable
          headers={['Factor', 'Instagram', 'TikTok']}
          rows={[
            ['Discovery algorithm', 'Reach weighted toward people who already follow you', 'Heavy organic reach to non-followers — videos go to the For You Page based on interest'],
            ['Location targeting', 'Better for local discovery via explore and hashtags', 'Primarily interest-based; location less precise'],
            ['Content format', 'Photos + Reels; polished aesthetic performs well', 'Video-first; authentic, less polished content often performs better'],
            ['Booking path', 'Link in bio; well-established client journey', 'Link in bio; TikTok audiences may be younger / less purchase-ready'],
            ['Best for nail techs', 'Building a local following, converting clients you\'ve already warmed up', 'Reaching a large new audience; viral potential for interesting content'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">TikTok's organic reach potential is much higher than Instagram's — a video can reach hundreds of thousands of non-followers. But that reach is interest-based, not location-based, so it takes more effort to convert TikTok views into local bookings.</p>
      </section>

      <section id="content-that-converts">
        <h2 className="font-serif text-2xl font-bold mb-4">Content that converts to bookings</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Not all viral TikTok nail content drives bookings. Content that shows your location and invites a booking action works harder:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Process videos with a CTA:</strong> Show the nail application start to finish, end with "DM to book / link in bio"</li>
          <li><strong>Transformation videos:</strong> Before client's nails → after — with your name and area in text overlay</li>
          <li><strong>"A day in my nail business" content:</strong> Shows your workspace, your process, your personality — drives interest in booking specifically with you</li>
          <li><strong>Educational content:</strong> "Why your nails might be lifting" — positions you as the expert and ends with a booking CTA</li>
          <li><strong>Client-facing content:</strong> What to expect at your first appointment, your prep routine, aftercare tips — builds trust before clients book</li>
        </ul>
        <ArticleTip>Add your city name as on-screen text in every video: "Nail Tech | Manchester" or "Booking open | London nail set." This is visible to every viewer and significantly improves local conversion.</ArticleTip>
      </section>

      <section id="booking-link">
        <h2 className="font-serif text-2xl font-bold mb-4">Making the booking link accessible</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">TikTok only allows one link in bio (unlike Instagram's Linktree options — though both work similarly). Ensure your booking link is:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Directly in your TikTok bio — not a step removed</li>
          <li>Your actual booking page, not your Instagram profile</li>
          <li>Mentioned verbally or as on-screen text in videos: "link in bio to book"</li>
        </ul>
        <ArticleCallout variant="info" title="TikTok DMs">
          Many TikTok viewers DM nail techs directly rather than clicking the link. If you're going to use TikTok, be prepared for DM enquiries and have a clear response process — even a pinned auto-reply directing people to your booking link.
        </ArticleCallout>
      </section>

      <section id="local-discovery">
        <h2 className="font-serif text-2xl font-bold mb-4">Getting found by local clients</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Include your city in your TikTok bio: "Nail Tech | Bristol | Book via link"</li>
          <li>Say your city in videos when it makes sense: "If you're based in Bristol and want nails like this..."</li>
          <li>Use your city name as on-screen text in every video</li>
          <li>Use location-specific hashtags: #BristolNailTech #BristolNails</li>
          <li>TikTok has a "nearby" feature in some markets — tag your location when available</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">TikTok's local discovery is less precise than Google's — for pure local search, your Google Business Profile outperforms TikTok. Use TikTok for reach and brand building; use Google for intent-based local discovery. Full guide: <Link to="/learn/local-seo-for-nail-techs" className="underline text-[#F52B8C]">local SEO for nail techs</Link>.</p>
      </section>

      <section id="consistency">
        <h2 className="font-serif text-2xl font-bold mb-4">Consistency and realistic expectations</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">TikTok rewards consistency. One video rarely changes a business — an ongoing presence compounds over time. What matters most:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Post at least 2–3 times per week to maintain algorithmic visibility</li>
          <li>One strong video per week is better than five rushed ones</li>
          <li>Repurpose your TikTok videos as Instagram Reels — double the reach for the same content</li>
          <li>TikTok bookings often take weeks to materialise — a viewer watches multiple videos before becoming a client</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For TikTok content ideas: <Link to="/learn/tiktok-ideas-nail-techs" className="underline text-[#F52B8C]">50 TikTok ideas for nail techs</Link>.</p>
      </section>
    </div>
  ),
});
export {};
