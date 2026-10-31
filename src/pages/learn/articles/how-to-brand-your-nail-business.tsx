import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-brand-your-nail-business',
  title: 'How to Brand Your Nail Business',
  seoTitle: 'How to Brand Your Nail Business (Step-by-Step Guide)',
  excerpt: 'Branding is more than a logo — it\'s everything a client sees and feels about your business. A practical guide to building a nail brand that attracts the right clients.',
  seoDescription: 'How to brand your nail business. Build a cohesive nail brand: choosing your visual style, colour palette, voice, and Instagram aesthetic that attracts ideal clients.',
  category: 'branding-growth',
  tags: ['nail business branding', 'nail brand', 'visual identity', 'nail business marketing'],
  heroImage: 'linear-gradient(135deg, #FFF9F0 0%, #FCA5A5 100%)',
  heroImageAlt: 'How to brand your nail business',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  spotlight: true,
  toc: [
    { id: 'what-branding-is', label: 'What branding actually is' },
    { id: 'positioning', label: 'Your positioning' },
    { id: 'visual-identity', label: 'Visual identity' },
    { id: 'voice-tone', label: 'Voice and tone' },
    { id: 'instagram-aesthetic', label: 'Instagram aesthetic' },
    { id: 'consistency', label: 'Applying it consistently' },
  ],
  relatedSlugs: ['how-to-name-your-nail-business', 'nail-tech-branding-ideas', 'how-to-make-nail-business-look-professional', 'best-instagram-bio-ideas-for-nail-techs'],
  faq: [
    { q: 'Do I need a logo to brand my nail business?', a: 'A logo is useful but not essential to start. Many nail techs build recognisable brands through consistent colour palette, photography style, and Instagram aesthetic without a formal logo. If you want a logo, Canva has templates, and Fiverr has affordable designers. Don\'t let logo design delay launching.' },
    { q: 'How do I make my nail business look premium?', a: 'Premium branding is about consistency and taste, not just expense. Clean, well-lit photos. A clear, minimal Instagram aesthetic. Thoughtful written communications. Consistent colours. A professional booking page. These cost almost nothing but signal quality.' },
    { q: 'How long does it take to establish a nail brand?', a: 'Branding builds over time through consistent execution. Your first Instagram post and your hundredth have the same ingredients — good photos, clear message, consistent aesthetic. After 3–6 months of consistent posting, patterns emerge and clients start recognising your style.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-branding-is">
        <h2 className="font-serif text-2xl font-bold mb-4">What branding actually is</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Branding is the sum of everything a potential client perceives about your business before they meet you: your Instagram aesthetic, the name you trade under, how you write your captions, what your booking confirmation message says, the atmosphere when a client arrives.</p>
        <p className="text-gray-700 leading-relaxed">A nail brand isn't just a logo. It's an impression. And impressions compound — a client who perceives you as professional, reliable, and premium before they've even booked is more likely to become a loyal regular than one who has no impression at all.</p>
      </section>

      <section id="positioning">
        <h2 className="font-serif text-2xl font-bold mb-4">Your positioning</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Positioning is who you're for and what makes you different. Not every nail tech should position the same way. Some questions to clarify yours:</p>
        <ArticleTable
          headers={['Question', 'Example answers']}
          rows={[
            ['Who is my ideal client?', '"Professional women who want reliable, clean gel sets every 3 weeks"'],
            ['What do I do better than most?', '"Intricate nail art" / "Perfect gel retention" / "Quick appointments for busy clients"'],
            ['What\'s my price point?', '"Mid-range" / "Premium" / "Accessible"'],
            ['What\'s my vibe?', '"Quiet and professional" / "Warm and chatty" / "Creative and artistic"'],
          ]}
        />
        <ArticleTip>You don\'t need to have all of this figured out before you start. But having a rough idea of your positioning helps you make consistent decisions about your Instagram aesthetic, your bio, and how you communicate with clients.</ArticleTip>
      </section>

      <section id="visual-identity">
        <h2 className="font-serif text-2xl font-bold mb-4">Visual identity</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For a nail tech, visual identity is primarily your Instagram aesthetic. The core elements:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Colour palette:</strong> 2–3 consistent colours that appear across your posts, highlights covers, and any graphics. Chose based on the mood you want to create: soft pinks and whites for a premium minimal feel; bold jewel tones for a more dramatic aesthetic.</li>
          <li><strong>Photography style:</strong> Consistent lighting, background, and framing. Even if your nail styles vary, the photography looks cohesive.</li>
          <li><strong>Fonts:</strong> If you use text on graphics (Canva), choose 1–2 fonts and stick to them. Consistent typography signals thoughtfulness.</li>
          <li><strong>Logo:</strong> Optional. A simple text logo in your chosen font works better than a complex graphic that doesn't work at small sizes.</li>
        </ul>
      </section>

      <section id="voice-tone">
        <h2 className="font-serif text-2xl font-bold mb-4">Voice and tone</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">How you write matters as much as what you write. Your captions, DM replies, confirmation messages, and Instagram bio all reflect your brand voice. Pick one and apply it consistently:</p>
        <ArticleTable
          headers={['Brand voice', 'Caption example']}
          rows={[
            ['Warm and personal', '"Obsessed with how this turned out! ✨ Can\'t wait for more appointments like this 🙏"'],
            ['Clean and professional', '"Gel full set this week — custom nail art in soft rose and cream. Book via link in bio."'],
            ['Premium and editorial', '"Quiet luxury gel. Available [dates]. Booking via link below."'],
            ['Fun and energetic', '"THESE NAILS!! 🔥 Head to the link in my bio to grab a slot — going fast!"'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">None of these is better than another — the best voice is the one you can sustain consistently and that resonates with your ideal clients.</p>
      </section>

      <section id="instagram-aesthetic">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram aesthetic</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your Instagram grid is your portfolio and your brand at the same time. The fastest way to build a coherent aesthetic:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Choose one background for nail photos (a marble contact paper sheet costs £5–10 and makes everything look editorial)</li>
          <li>Set up consistent lighting — same ring light position every time</li>
          <li>Edit photos with the same filter or settings</li>
          <li>Vary the content type (close-up, full hand, detail) but keep the background and lighting consistent</li>
        </ol>
        <ArticleCallout variant="info" title="Consistency beats perfection">
          A feed of consistently lit, clean photos on a simple background looks more professional than a feed with occasional stunning photos and lots of variable quality. Aim for consistently good, not occasionally perfect.
        </ArticleCallout>
      </section>

      <section id="consistency">
        <h2 className="font-serif text-2xl font-bold mb-4">Applying it consistently</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Branding compounds with time and consistency. Apply your brand across every client touchpoint:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Instagram bio and posts</li>
          <li>Booking confirmation message (write this as if it's an email from your brand)</li>
          <li>Reminder messages</li>
          <li>Any packaging or nail mats if you use branded ones</li>
          <li>How you describe your services on your booking page</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">See also: <Link to="/learn/how-to-make-nail-business-look-professional" className="underline text-[#F52B8C]">how to make your nail business look more professional</Link>.</p>
      </section>
    </div>
  ),
});
export {};
