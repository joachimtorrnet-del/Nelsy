import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: '100-nail-business-name-ideas',
  title: '100 Nail Business Name Ideas',
  seoTitle: '100 Nail Business Name Ideas (Creative, Elegant & Unique)',
  excerpt: 'A curated list of 100 nail business name ideas, from minimal and elegant to bold and personal. Use them as-is or as inspiration for your own.',
  seoDescription: '100 nail business name ideas for nail techs. Creative, elegant, minimal, location-based, and personal name ideas you can use or adapt for your nail brand.',
  category: 'branding-growth',
  tags: ['nail business name ideas', 'nail business names', 'nail brand names', 'nail studio names'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: '100 nail business name ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'A good nail business name is easy to spell, says "nails" or beauty, has a free Instagram handle, and still fits if you move or add services.',
    detail: 'Use the 100 ideas below as starting points, add your name or area to make them unique, then score your top 3 with the 5-test scorecard at the end.',
    points: [
      { label: 'Safest', text: 'Name-based ("Nails by [Name]"): unique, personal, easy to claim.' },
      { label: 'Most brandable', text: 'Elegant single words ("Lustre", "Velvet") plus "Nails" or "Studio".' },
      { label: 'Best for local search', text: 'Area-based names, if you plan to stay in that area.' },
    ],
  },
  toc: [
    { id: 'elegant', label: 'Elegant and minimal (1–20)' },
    { id: 'personal', label: 'Personal and name-based (21–40)' },
    { id: 'bold', label: 'Bold and confident (41–60)' },
    { id: 'aesthetic', label: 'Aesthetic and mood-based (61–80)' },
    { id: 'location', label: 'Location and studio (81–100)' },
    { id: 'how-to-choose', label: 'How to choose from the list' },
  ],
  relatedSlugs: ['how-to-name-your-nail-business', 'how-to-brand-your-nail-business', 'nail-tech-branding-ideas'],
  faq: [
    { q: 'What are some good words for a nail business name?', a: 'Words that work well in nail business names: Polish, Gloss, Lustre, Petal, Pearl, Velvet, Blush, Silk, Mist, Bloom, Dusk, Éclat, Studio, Atelier, Co., Collective. These have the right aesthetic connotations without being too literal or overused.' },
    { q: 'Should my nail business name be in English or can I use French/Italian words?', a: 'Foreign words add elegance and are used successfully by many nail businesses. Just make sure they\'re pronounceable by your audience, and that you\'re comfortable explaining the meaning if asked. Éclat (brilliance), Lumière (light), and Lusso (luxury in Italian) are examples that work in UK beauty contexts.' },
    { q: 'Is it okay to use a name from this list?', a: 'Yes, as a starting point. Before using any name, check the Instagram and TikTok handle, Google "[name] nails [your city]", and check your company register (Companies House in the UK) if you are registering a company. Adding your own name or area is the easiest way to make a list name unique.' },
    { q: 'Should I put my city in my nail business name?', a: 'Only if you plan to stay there. A city in the name helps local clients recognise you, but you can get the same benefit by putting the city in your Instagram name field and bio, for example "Lustre Nails | Leeds", while keeping the business name itself portable.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="tip" title="How to use this list">
        Don&apos;t take a name straight from this list without checking availability. Use these as starting points: mix in your own name, location, or a word that feels like you, then score your shortlist with the scorecard at the end.
      </ArticleCallout>

      <section id="elegant">
        <h2 className="font-serif text-2xl font-bold mb-4">Elegant and minimal (1–20)</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          {['Lustre Nails', 'Velvet Studio', 'Pearl Nail Co.', 'Blush & Polish', 'Éclat Nails', 'Silk Nails', 'Mist Studio', 'Petal Nails', 'The Nail Edit', 'Gloss Studio', 'Serenity Nails', 'Ivory Nail Co.', 'Fine Nails', 'The Polish Room', 'Satin Studio', 'Dusk Nails', 'Lacquer Studio', 'Sheer Nails', 'Porcelain Nails', 'Studio Nails Co.'].map(n => (
            <span key={n} className="py-1 px-2 bg-gray-50 rounded text-sm">{n}</span>
          ))}
        </div>
      </section>

      <section id="personal">
        <h2 className="font-serif text-2xl font-bold mb-4">Personal and name-based (21–40)</h2>
        <p className="text-gray-700 mb-4 text-sm italic">Replace "[Name]" with your own first name or surname.</p>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          {['[Name] Nails', 'Nails by [Name]', '[Name] Nail Studio', '[Name] & Co. Nails', '[Name] Creates Nails', '[Name] Nail Atelier', '[Name] Polish', 'By [Name]', '[Name]\'s Nails', '[Name] Beauty Nails', '[Name] Nail Co.', '[Name] Nail Art', 'The [Name] Nail Edit', '[Name] Crafted Nails', '[Name] Nail Lab', '[Name] Hand Studio', 'Made by [Name]', '[Name] Nail Collective', '[Name]\'s Studio', 'Nails & [Name]'].map(n => (
            <span key={n} className="py-1 px-2 bg-gray-50 rounded text-sm">{n}</span>
          ))}
        </div>
      </section>

      <section id="bold">
        <h2 className="font-serif text-2xl font-bold mb-4">Bold and confident (41–60)</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          {['Flawless Nails', 'The Nail Boss', 'Crown Nails', 'Iconic Nails', 'The Polish Standard', 'Nail Authority', 'The Nail Club', 'Polished & Perfect', 'Premium Nail Studio', 'Nail Royale', 'Elevated Nails', 'The Nail Lab', 'Bold Polish', 'Masterpiece Nails', 'Signature Nails', 'The Nail Craft', 'Prestige Nails', 'Expert Nails', 'Nail Society', 'Prime Nails'].map(n => (
            <span key={n} className="py-1 px-2 bg-gray-50 rounded text-sm">{n}</span>
          ))}
        </div>
      </section>

      <section id="aesthetic">
        <h2 className="font-serif text-2xl font-bold mb-4">Aesthetic and mood-based (61–80)</h2>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          {['Bloom Nails', 'Rosy Nails', 'Twilight Nails', 'Golden Hour Nails', 'Sunday Nails', 'Haze Nails', 'Moonlit Nails', 'Soft Nail Studio', 'Cherry Nails', 'Warm Nail Co.', 'Reverie Nails', 'Wabi Nails', 'Pastel & Polish', 'Still Life Nails', 'Morning Light Nails', 'Autumn Nail Studio', 'Coral Nails', 'Honey Nails', 'Sage Nail Co.', 'Cloud Nails'].map(n => (
            <span key={n} className="py-1 px-2 bg-gray-50 rounded text-sm">{n}</span>
          ))}
        </div>
        <ArticleTip>Mood-based names work best when your Instagram aesthetic matches the vibe. &quot;Twilight Nails&quot; works if your feed has a moody, dark aesthetic, less so if it&apos;s all bright pink.</ArticleTip>
      </section>

      <section id="location">
        <h2 className="font-serif text-2xl font-bold mb-4">Location and studio (81–100)</h2>
        <p className="text-gray-700 mb-4 text-sm italic">Replace "[Area]" with your neighbourhood, city, or a nearby landmark.</p>
        <div className="grid grid-cols-2 gap-2 text-gray-700">
          {['[Area] Nail Studio', '[Area] Nails', 'The [Area] Nail Room', 'North [City] Nails', '[City] Nail Atelier', 'Studio [Area]', '[Area] Polish', '[Landmark] Nails', 'The [Street] Nail Studio', '[City] Nail Co.', '[Area] Beauty Nails', 'Central [City] Nails', 'The Local Nail Studio', '[Neighbourhood] Nails', 'West End Nails', 'East Side Nail Studio', 'The [City] Nail Room', 'Village Nails', '[Postcode Area] Nails', 'Neighbourhood Nails'].map(n => (
            <span key={n} className="py-1 px-2 bg-gray-50 rounded text-sm">{n}</span>
          ))}
        </div>
      </section>

      <section id="how-to-choose">
        <h2 className="font-serif text-2xl font-bold mb-4">How to choose from the list</h2>
        <ArticleSteps
          steps={[
            { title: 'Shortlist 5 to 10 names', body: 'Pick the ones that match your style and the clients you want. Add your name or area to any that feel too generic.' },
            { title: 'Check availability', body: 'Search the Instagram and TikTok handle, Google "[name] nails [your city]", and check your business register if you plan to register a company.' },
            { title: 'Score your top 3', body: 'Use the scorecard below. Give each test 0 (no), 1 (sort of) or 2 (yes).' },
            { title: 'Test it out loud', body: 'Say it as if answering the phone, and ask 3 friends to spell it after hearing it once.' },
            { title: 'Claim it everywhere the same day', body: 'Handle, booking page link, Google Business Profile and email, so nobody takes it in between.' },
          ]}
        />
        <ArticleTable
          headers={['Test', 'Example: "Lustre Nails"', 'Example: "Nails by Jade Leeds"', 'Example: "Éclat Nail Atelier"']}
          rows={[
            ['Easy to spell after hearing it', '2', '2', '0'],
            ['Handle free on Instagram', '1 (needs a city suffix)', '2', '2'],
            ['Says "nails" or beauty', '2', '2', '2'],
            ['Still fits if you move or add services', '2', '1 (city in the name)', '2'],
            ['Matches your style and prices', '2', '1', '2'],
            [<strong key="t">Total out of 10</strong>, <strong key="a">9</strong>, <strong key="b">8</strong>, <strong key="c">8</strong>],
          ]}
          caption="Example scores only: rate your own shortlist honestly."
        />
        <ArticleChecklist
          title="Before you commit"
          items={[
            'The handle (or a close variant like name.nails.city) is free',
            'No other nail business nearby uses the same or a very similar name',
            'It fits in an Instagram name field with your city',
            'You would be happy saying it in 5 years',
          ]}
        />
        <p className="text-gray-700 mt-6 leading-relaxed">More guidance on choosing: <Link to="/blog/how-to-name-your-nail-business" className="underline text-[#F52B8C]">how to name your nail business</Link>. Once you have a name, next step: <Link to="/blog/how-to-brand-your-nail-business" className="underline text-[#F52B8C]">how to brand your nail business</Link>.</p>
      </section>
    </div>
  ),
});
export {};
