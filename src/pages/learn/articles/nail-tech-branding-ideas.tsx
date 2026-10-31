import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-branding-ideas',
  title: 'Nail Tech Branding Ideas That Make You Look Premium',
  seoTitle: 'Nail Tech Branding Ideas That Make You Look Premium',
  excerpt: 'Practical branding ideas for nail techs who want to look established and attract premium clients — without a big budget.',
  seoDescription: 'Nail tech branding ideas that make you look premium. Colour palettes, Instagram aesthetics, bio styles, photography props, and communication tips for nail techs.',
  category: 'branding-growth',
  tags: ['nail tech branding', 'premium nail brand', 'nail business aesthetic', 'nail branding ideas'],
  heroImage: 'linear-gradient(135deg, #FFF9F0 0%, #FEF3C7 100%)',
  heroImageAlt: 'Nail tech branding ideas for premium look',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'colour-palettes', label: 'Colour palette ideas' },
    { id: 'instagram-aesthetics', label: 'Instagram aesthetic directions' },
    { id: 'photography-props', label: 'Photography props and backdrops' },
    { id: 'bio-styles', label: 'Bio style ideas' },
    { id: 'communication-details', label: 'Communication details that signal premium' },
    { id: 'name-and-logo', label: 'Name and logo considerations' },
  ],
  relatedSlugs: ['how-to-brand-your-nail-business', 'how-to-make-nail-business-look-professional', 'best-instagram-bio-ideas-for-nail-techs'],
  faq: [
    { q: 'Do I need a professional photographer for my nail business?', a: 'No. Modern smartphones with a ring light produce nail photos that are indistinguishable from professionally shot photos for Instagram purposes. The main professional photography investment worth making is occasional brand photography (photos of you working, your workspace, etc.) if you want to elevate beyond nail photos alone.' },
    { q: 'What colour palette makes a nail brand look premium?', a: 'Neutral palettes (cream, dusty rose, warm white, soft terracotta) read as premium and timeless. Monochromatic palettes (varying shades of one colour) look intentional. Harsh primary colours or neon palettes can look less premium unless they\'re part of a deliberately bold brand identity.' },
    { q: 'How do I make my Instagram grid look more professional?', a: 'Consistent background for nail photos. Consistent lighting. Consistent editing (same filter or settings). Alternate content types (close-up, full hand, process) but keep the visual style cohesive. A marble or neutral background, a ring light, and consistent editing is all you need.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'instagram-autodm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="colour-palettes">
        <h2 className="font-serif text-2xl font-bold mb-4">Colour palette ideas</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your colour palette appears in your Instagram Highlights covers, any Canva graphics, your booking page (if customisable), and as a subtle thread through your content. Choose 2–3 colours:</p>
        <ArticleTable
          headers={['Palette name', 'Colours', 'Vibe']}
          rows={[
            ['Quiet Luxury', 'Cream, warm white, soft taupe', 'Premium, minimal, timeless'],
            ['Dusty Rose Studio', 'Dusty pink, ivory, blush', 'Feminine, warm, approachable'],
            ['Monochrome Edit', 'White, soft grey, black', 'Modern, clean, editorial'],
            ['Warm Terracotta', 'Terracotta, cream, warm brown', 'Earthy, personal, artisan'],
            ['Sage & Pearl', 'Sage green, pearl white, soft gold', 'Botanical, premium, original'],
            ['Midnight Glam', 'Deep navy, black, gold', 'Dramatic, luxe, bold'],
          ]}
        />
        <ArticleTip>Test your palette on your phone by creating a simple Instagram story with your chosen colours. Does it look like an account you\'d want to follow? Does it feel like you?</ArticleTip>
      </section>

      <section id="instagram-aesthetics">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram aesthetic directions</h2>
        <ArticleTable
          headers={['Aesthetic', 'Photography style', 'Content feel']}
          rows={[
            ['Quiet luxury', 'Clean white/marble background, natural light, close-ups', 'Understated, quality-focused, minimal captions'],
            ['Warm editorial', 'Textured backgrounds (linen, wood), warm tones', 'Personal, thoughtful, like a beauty magazine'],
            ['Clinical clean', 'All white, minimal props, precise framing', 'Professional, precise, no-nonsense'],
            ['Creative studio', 'Coloured backgrounds matching the nails, bold compositions', 'Artistic, distinctive, expressive'],
            ['Lifestyle blend', 'Mix of nails and environment: coffee, plants, etc.', 'Personal, warm, relationship-building'],
          ]}
        />
      </section>

      <section id="photography-props">
        <h2 className="font-serif text-2xl font-bold mb-4">Photography props and backdrops</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The backdrop matters more than the props. A consistent, simple background makes nail photos look editorial. Low-cost options that work:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>White foam board:</strong> Clean, neutral, shows nail colour accurately</li>
          <li><strong>Marble contact paper:</strong> £5–10, reusable, instantly looks premium</li>
          <li><strong>Concrete tile:</strong> Flat grey, works for moody or minimalist aesthetics</li>
          <li><strong>Linen or fabric:</strong> Textured, warm, feels artisan</li>
          <li><strong>Solid pastel card:</strong> Coordinates with the nail colour in the shot</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Props: fresh flowers, coffee cups, jewellery, and dried botanicals all work as occasional additions. Don't let them distract from the nails.</p>
        <ArticleCallout variant="info" title="One backdrop, consistently">
          Using one backdrop for 80% of your nail photos creates visual coherence faster than variety. Clients start associating the backdrop with your brand.
        </ArticleCallout>
      </section>

      <section id="bio-styles">
        <h2 className="font-serif text-2xl font-bold mb-4">Bio style ideas by positioning</h2>
        <ArticleTable
          headers={['Positioning', 'Bio style', 'Example']}
          rows={[
            ['Quiet luxury', 'Minimal, no emojis or few, location clear', 'Nail artist · East London\nBy appointment only · link below'],
            ['Warm professional', 'One emoji, friendly tone, clear CTA', 'Gel nails & art 💅 Manchester\nTaking new clients — book below ↓'],
            ['Creative studio', 'Bold, distinctive, personality-led', 'nail art that makes people look twice 🔥\nEast London · book via link'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">More bio templates: <Link to="/learn/best-instagram-bio-ideas-for-nail-techs" className="underline text-[#F52B8C]">best Instagram bio ideas for nail techs</Link>.</p>
      </section>

      <section id="communication-details">
        <h2 className="font-serif text-2xl font-bold mb-4">Communication details that signal premium</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Small written details that clients notice:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Booking confirmation that mentions the client's name and specific service</li>
          <li>Reminder that includes a personal note ("Looking forward to seeing you tomorrow")</li>
          <li>Cancellation policy phrased warmly, not legalistically</li>
          <li>Captions that speak to the ideal client specifically, not generically</li>
          <li>DM replies that feel human, not like auto-responses</li>
        </ul>
      </section>

      <section id="name-and-logo">
        <h2 className="font-serif text-2xl font-bold mb-4">Name and logo considerations</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A good business name doesn't need a complex logo. A simple wordmark (your business name in your chosen font) works better than an overcomplicated icon at small sizes. For Highlights covers: a simple shape or initial in your brand colours is cleaner than a detailed graphic.</p>
        <p className="text-gray-700 leading-relaxed">See: <Link to="/learn/how-to-name-your-nail-business" className="underline text-[#F52B8C]">how to name your nail business</Link>.</p>
      </section>
    </div>
  ),
});
export {};
