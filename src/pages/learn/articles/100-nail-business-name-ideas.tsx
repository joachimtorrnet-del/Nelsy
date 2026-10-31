import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: '100-nail-business-name-ideas',
  title: '100 Nail Business Name Ideas',
  seoTitle: '100 Nail Business Name Ideas (Creative, Elegant & Unique)',
  excerpt: 'A curated list of 100 nail business name ideas — from minimal and elegant to bold and personal. Use them as-is or as inspiration for your own.',
  seoDescription: '100 nail business name ideas for nail techs. Creative, elegant, minimal, location-based, and personal name ideas you can use or adapt for your nail brand.',
  category: 'branding-growth',
  tags: ['nail business name ideas', 'nail business names', 'nail brand names', 'nail studio names'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: '100 nail business name ideas',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
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
    { q: 'Is it okay to use a name from this list?', a: 'Yes — these are ideas for your starting point. Before using any name, check Instagram handle availability, run a Google search, and check Companies House if registering as a limited company. Adapt any of these to add your own name, location, or a distinguishing word.' },
  ],
  relatedFeatureSlugs: ['link-in-bio', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="tip" title="How to use this list">
        Don't take a name straight from this list without checking availability. Use these as starting points — mix in your own name, location, or a word that feels like you.
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
          {['[Name] Nails', 'Nails by [Name]', '[Name] Nail Studio', '[Name] & Co. Nails', '[Name] Creates Nails', '[Name] Nail Atelier', '[Name] Polish', 'By [Name]', '[Name]\'s Nails', '[Name] Beauty Nails', '[Name] Nail Co.', '[Name] Nail Art', 'The [Name] Nail Edit', '[Name] Crafted Nails', '[Name] Nail Lab', '[Name] Nail Studio', 'Made by [Name]', '[Name] Nail Collective', '[Name]\'s Studio', 'Nails & [Name]'].map(n => (
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
        <ArticleTip>Mood-based names work best when your Instagram aesthetic matches the vibe. "Twilight Nails" works beautifully if your feed has a moody, dark aesthetic — less so if it\'s all bright pink.</ArticleTip>
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
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Shortlist 5–10 that feel right</li>
          <li>Check Instagram handle availability for each</li>
          <li>Google each one to check for existing nail businesses with the same name</li>
          <li>Adapt your top 2–3: add your name, location, or a distinguishing word</li>
          <li>Say it out loud. Write it in your bio. How does it feel?</li>
        </ol>
        <p className="text-gray-700 mt-6 leading-relaxed">More guidance on choosing: <Link to="/learn/how-to-name-your-nail-business" className="underline text-[#F52B8C]">how to name your nail business</Link>. Once you have a name, next step: <Link to="/learn/how-to-brand-your-nail-business" className="underline text-[#F52B8C]">how to brand your nail business</Link>.</p>
      </section>
    </div>
  ),
});
export {};
