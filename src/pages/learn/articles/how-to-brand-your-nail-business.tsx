import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist, ArticleSteps } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-to-brand-your-nail-business',
  title: 'How to Brand Your Nail Business',
  coverTitle: 'Brand Your Nail Business',
  seoTitle: 'How to Brand Your Nail Business (Step-by-Step Guide)',
  excerpt: 'Branding is more than a logo: it\'s everything a client sees and feels about your business. A practical guide to building a nail brand that attracts the right clients.',
  seoDescription: 'How to brand your nail business. Build a cohesive nail brand: choosing your visual style, colour palette, voice, and Instagram aesthetic that attracts ideal clients.',
  category: 'branding-growth',
  audience: ['pros'],
  craft: 'nails',
  tags: ['nail business branding', 'nail brand', 'visual identity', 'nail business marketing'],
  heroImage: 'linear-gradient(135deg, #FFF9F0 0%, #FCA5A5 100%)',
  heroImageAlt: 'How to brand your nail business',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  updatedAt: '2026-11-26',
  spotlight: true,
  tldr: {
    answer: 'To brand your nail business, decide who you are for and what you are known for, then repeat the same colours, photo style and voice on every touchpoint, from your bio to your booking confirmation.',
    detail: 'You don\'t need a designer to start. Fill in the one-page brand sheet below in an afternoon and apply it to your Instagram, booking page and client messages.',
    points: [
      { label: 'Positioning', text: 'One sentence: "I do [speciality] for [client] who want [result]".' },
      { label: 'Visuals', text: '2 to 3 colours, 1 to 2 fonts, one photo background and light setup.' },
      { label: 'Voice', text: 'One tone used in captions, DMs, confirmations and reminders.' },
    ],
  },
  toc: [
    { id: 'what-branding-is', label: 'What branding actually is' },
    { id: 'positioning', label: 'Your positioning' },
    { id: 'visual-identity', label: 'Visual identity' },
    { id: 'voice-tone', label: 'Voice and tone' },
    { id: 'instagram-aesthetic', label: 'Instagram aesthetic' },
    { id: 'brand-sheet', label: 'Your one-page brand sheet' },
    { id: 'consistency', label: 'Applying it consistently' },
  ],
  relatedSlugs: ['how-to-name-your-nail-business', 'nail-tech-branding-ideas', 'how-to-make-nail-business-look-professional', 'best-instagram-bio-ideas-for-nail-techs'],
  faq: [
    { q: 'Do I need a logo to brand my nail business?', a: 'Not to start. Many nail techs build a recognisable brand through consistent colours, photo style and voice without a formal logo. If you want one, start with a simple text logo: your business name in one of your brand fonts. It works at small sizes, like a profile photo, and you can upgrade later.' },
    { q: 'How do I make my nail business look premium?', a: 'Premium comes from consistency and detail more than spending. Use the same clean background and lighting for every photo, keep a short and clear service menu with prices, write confirmations and reminders in a polished tone, and send clients to a tidy booking page rather than a DM thread. These cost little but signal quality.' },
    { q: 'How long does it take to establish a nail brand?', a: 'Think in months, not weeks. A brand becomes recognisable once people have seen the same look and voice many times. If you post 3 to 5 times a week with consistent photos, you will have a cohesive grid of several dozen posts within a few months, which is when people start recognising your style before they see your name.' },
    { q: 'How many brand colours should a nail tech have?', a: 'Two or three is enough: one main colour, one neutral (white, cream, black or grey) and an optional accent. Use them on Highlight covers, Story text, your booking page and any printed cards. More colours make the feed look busy next to colourful nail sets.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-branding-is">
        <h2 className="font-serif text-2xl font-bold mb-4">What branding actually is</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Branding is everything a potential client notices about your business before they meet you: your Instagram aesthetic, your name, how you write captions, what your booking confirmation says, and the atmosphere when they arrive.</p>
        <p className="text-gray-700 leading-relaxed">A nail brand isn&apos;t just a logo. It is an impression, and it builds up: a client who sees you as professional and reliable before booking is more likely to book, pay a deposit without hesitation, and come back.</p>
      </section>

      <section id="positioning">
        <h2 className="font-serif text-2xl font-bold mb-4">Your positioning</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Positioning is who you are for and what makes you different. Answer these four questions:</p>
        <ArticleTable
          headers={['Question', 'Example answers']}
          rows={[
            ['Who is my ideal client?', '"Busy professionals who want clean gel sets every 3 weeks"'],
            ['What do I do better than most?', '"Intricate nail art" / "Gel that lasts" / "Quick appointments for busy clients"'],
            ['What\'s my price point?', '"Mid-range" / "Premium" / "Accessible"'],
            ['What\'s my vibe?', '"Quiet and professional" / "Warm and chatty" / "Creative and artistic"'],
          ]}
        />
        <ArticleCallout variant="info" title="Copy this positioning sentence">
          &quot;I do [speciality] for [ideal client] who want [result], in a [vibe] setting in [area].&quot;<br /><br />
          Example: &quot;I do structured gel manicures for busy professionals who want nails that last 3 weeks, in a calm home studio in Didsbury.&quot;
        </ArticleCallout>
        <ArticleTip>You don&apos;t need it perfect before you start. A rough sentence already helps you decide what to post, what to put in your bio, and how to word your messages.</ArticleTip>
      </section>

      <section id="visual-identity">
        <h2 className="font-serif text-2xl font-bold mb-4">Visual identity</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For a nail tech, visual identity is mostly your Instagram and booking page. The core elements:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-700">
          <li><strong>Colour palette:</strong> 2 to 3 colours across your Highlight covers, graphics and booking page. Soft pinks and cream feel minimal and premium; deep jewel tones feel dramatic; black and white feels editorial.</li>
          <li><strong>Photography style:</strong> the same lighting, background and framing every time. Your nail styles can vary while the photos still look cohesive.</li>
          <li><strong>Fonts:</strong> 1 to 2 fonts for text on graphics, used every time.</li>
          <li><strong>Logo:</strong> optional. A simple text logo works better than a detailed graphic that disappears at profile-photo size.</li>
        </ul>
      </section>

      <section id="voice-tone">
        <h2 className="font-serif text-2xl font-bold mb-4">Voice and tone</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your captions, DM replies, confirmations and bio all carry your voice. Pick one and use it everywhere:</p>
        <ArticleTable
          headers={['Brand voice', 'Caption example']}
          rows={[
            ['Warm and personal', '"Obsessed with how this turned out! ✨ Can\'t wait for more appointments like this 🙏"'],
            ['Clean and professional', '"Gel full set this week: custom nail art in soft rose and cream. Book via link in bio."'],
            ['Premium and editorial', '"Quiet luxury gel. Available [dates]. Booking via link below."'],
            ['Fun and energetic', '"THESE NAILS!! 🔥 Head to the link in my bio to grab a slot, going fast!"'],
          ]}
        />
        <ArticleCallout variant="info" title="Same message, two voices">
          <strong>Warm:</strong> &quot;Yay, you&apos;re booked! 💕 See you Thursday at 2pm for your gel set. Come with clean, polish-free nails and any inspo pics you love. Can&apos;t wait!&quot;<br /><br />
          <strong>Premium:</strong> &quot;Your appointment is confirmed for Thursday at 2pm: structured gel manicure, 75 minutes. Please arrive with bare nails. Directions and parking are below.&quot;
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Neither voice is better. The best voice is the one you can keep up, and that suits the clients you want.</p>
      </section>

      <section id="instagram-aesthetic">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram aesthetic</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your Instagram grid is your portfolio and your brand at the same time. The fastest way to make it cohesive:</p>
        <ArticleSteps
          steps={[
            { title: 'Pick one background', body: 'A marble sheet, a linen cloth or a plain card in one of your brand colours. Use it for every nail photo.' },
            { title: 'Fix your light', body: 'Same lamp or window, same position, every time. Mark the spot on your desk.' },
            { title: 'Save one edit preset', body: 'Same brightness, warmth and contrast settings for every photo.' },
            { title: 'Vary the shot, not the setup', body: 'Rotate close-up, full hand and detail shots on the same background and light.' },
          ]}
        />
        <ArticleCallout variant="info" title="Consistency beats perfection">
          A feed of consistently lit, clean photos on a simple background looks more professional than a feed with a few stunning photos among many uneven ones. Aim for consistently good, not occasionally perfect.
        </ArticleCallout>
      </section>

      <section id="brand-sheet">
        <h2 className="font-serif text-2xl font-bold mb-4">Your one-page brand sheet</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Copy this into your notes app and fill it in. Example answers are shown for a fictional studio.</p>
        <ArticleTable
          headers={['Item', 'Your answer', 'Example']}
          rows={[
            ['Business name', '', 'Lustre Nails'],
            ['Positioning sentence', '', 'Structured gel for busy professionals in Didsbury'],
            ['Main colour', '', 'Dusty rose #F4C2C2'],
            ['Neutral + accent', '', 'Cream #FFFBFB + charcoal #1A1A1A'],
            ['Fonts', '', 'One serif for headings, one clean sans for text'],
            ['Photo setup', '', 'Cream linen, window light from the left'],
            ['Voice in 3 words', '', 'Calm, precise, warm'],
            ['Words I use', '', '"Structured", "lasting", "your set"'],
            ['Words I avoid', '', '"Cheap", "quick job", too many exclamation marks'],
          ]}
        />
      </section>

      <section id="consistency">
        <h2 className="font-serif text-2xl font-bold mb-4">Applying it consistently</h2>
        <ArticleChecklist
          title="Every touchpoint, same brand"
          items={[
            'Instagram name field, bio and Highlight covers',
            'Profile photo (logo or a consistent photo of you)',
            'Booking page: colours, photos, service descriptions',
            'Booking confirmation and reminder messages',
            'DM reply templates',
            'Aftercare card, gift cards or packaging if you use them',
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">To see what a branded booking page looks like in practice, open the <Link to="/demo" className={link}>demo booking page</Link>. See also: <Link to="/blog/how-to-make-nail-business-look-professional" className={link}>how to make your nail business look more professional</Link>.</p>
      </section>
    </div>
  ),
});
export {};
