import { registerArticle } from '@/lib/articles';
import { ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'best-nail-colors-every-season',
  title: 'Best Nail Colours for Every Season',
  seoTitle: 'Best Nail Colours for Every Season (Spring, Summer, Autumn, Winter)',
  excerpt: 'Not sure what to wear on your nails? Here\'s a guide to the best nail colours for every season — and how to pick one that works for you.',
  seoDescription: 'Best nail colours for every season. Spring, summer, autumn, and winter nail colour guides — from classics to trending shades, for every style and skin tone.',
  category: 'nail-inspo',
  tags: ['best nail colors every season', 'seasonal nail colors', 'nail colors by season'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 100%)',
  heroImageAlt: 'Best nail colours for every season',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'spring', label: 'Spring nail colours' },
    { id: 'summer', label: 'Summer nail colours' },
    { id: 'autumn', label: 'Autumn nail colours' },
    { id: 'winter', label: 'Winter nail colours' },
    { id: 'year-round', label: 'Year-round classics' },
  ],
  relatedSlugs: ['nail-trends-2027', 'nail-colors-for-skin-undertone', 'luxury-nail-ideas', 'vacation-nail-ideas'],
  faq: [
    { q: 'Do seasonal nail colours really matter?', a: 'They\'re a guide, not a rule. You can wear burgundy in July or a pastel pink in November if you love it. Seasonal colour guides are useful for inspiration and for helping clients who want something that feels current — not a strict system you have to follow.' },
    { q: 'What\'s the most versatile nail colour across all seasons?', a: 'Soft nude or skin-toned shades work across every season — they\'re the one nail colour that never looks "wrong." A barely-pink nude in spring, a warmer nude in summer, a caramel nude in autumn, and a cool greige in winter all work beautifully year-round with slight seasonal adjustments.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="spring">
        <h2 className="font-serif text-2xl font-bold mb-4">Spring nail colours</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Spring nails lean lighter, fresher, and more optimistic after winter's deeper shades.</p>
        <ArticleTable
          headers={['Colour', 'Why it works']}
          rows={[
            ['Pastel pink', 'Fresh and feminine — the quintessential spring shade'],
            ['Mint green', 'Cool and crisp; feels new and modern'],
            ['Lilac / soft lavender', 'Romantic and current; flatters most skin tones'],
            ['Peach / apricot', 'Warm and soft; bridges winter nudes and summer brights'],
            ['Baby blue', 'Cool and playful; a perennial spring favourite'],
            ['Soft yellow', 'Cheerful and on-trend; pairs well with spring florals'],
            ['Warm white / off-white', 'Clean and classic; works for the "clean girl" aesthetic'],
          ]}
        />
      </section>

      <section id="summer">
        <h2 className="font-serif text-2xl font-bold mb-4">Summer nail colours</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Summer is the season for brighter, bolder colour — or very clean nudes that complement tanned skin.</p>
        <ArticleTable
          headers={['Colour', 'Why it works']}
          rows={[
            ['Coral', 'A summer classic — warm orange-pink that flatters tan skin'],
            ['Bright red', 'The original summer power nail — bold and timeless'],
            ['Neon pink', 'High-impact, playful — perfect for holiday and festival looks'],
            ['Aqua / turquoise', 'Reminiscent of sea and sky — strongly seasonal'],
            ['Warm nude', 'Glows against tanned skin; low-maintenance and elegant'],
            ['Bright white', 'Clean and bold; contrasts beautifully against warm skin'],
            ['Orange', 'From peach-orange to burnt orange — a summer statement'],
          ]}
        />
      </section>

      <section id="autumn">
        <h2 className="font-serif text-2xl font-bold mb-4">Autumn nail colours</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Autumn is nail tech season — rich, complex colours that photograph beautifully and feel deeply on-trend.</p>
        <ArticleTable
          headers={['Colour', 'Why it works']}
          rows={[
            ['Burgundy / wine', 'The ultimate autumn shade — rich, classic, universally flattering'],
            ['Terracotta / burnt orange', 'Earthy and warm; feels of-the-moment and seasonal'],
            ['Chocolate brown', 'Understated elegance; works across all skin tones'],
            ['Forest / olive green', 'Moody and on-trend; particularly strong this year'],
            ['Mauve / dusty rose', 'Muted pink-purple that bridges the summer-autumn gap'],
            ['Rust', 'Warm red-orange that reads "autumn" immediately'],
            ['Caramel nude', 'The autumn neutral — warmer than summer nudes, softer than winter tones'],
          ]}
        />
      </section>

      <section id="winter">
        <h2 className="font-serif text-2xl font-bold mb-4">Winter nail colours</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Winter moves between deep, dramatic shades and clean, icy tones — plus festive glitter and chrome.</p>
        <ArticleTable
          headers={['Colour', 'Why it works']}
          rows={[
            ['Deep red / scarlet', 'Festive and sophisticated — the Christmas nail classic'],
            ['Navy blue', 'Dark and elegant; a winter alternative to black'],
            ['Deep plum / aubergine', 'Rich and moody — especially popular through late November–January'],
            ['Black', 'Striking and graphic; strong for winter editorial looks'],
            ['Icy blue / silver', 'Cool and wintery; strong paired with chrome or shimmer finish'],
            ['Greige / taupe', 'The winter neutral — works with any winter wardrobe'],
            ['Dark forest green', 'Festive without being overtly Christmas — deep and refined'],
          ]}
        />
      </section>

      <section id="year-round">
        <h2 className="font-serif text-2xl font-bold mb-4">Year-round classics</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some nail colours transcend seasons — these are reliable requests year-round:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Soft nude / skin-toned pink:</strong> Universally flattering, always wearable</li>
          <li><strong>Classic red:</strong> No season owns red — it works year-round for a reason</li>
          <li><strong>Clean white:</strong> A modern classic that works across all seasons</li>
          <li><strong>Soft pink:</strong> Never goes out of style; constantly reinvented each season</li>
          <li><strong>Clear / gloss:</strong> The glazed, glossy look works on any colour at any time</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
