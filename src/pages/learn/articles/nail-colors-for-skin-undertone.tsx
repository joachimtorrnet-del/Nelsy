import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-colors-for-skin-undertone',
  title: 'Best Nail Colours for Your Skin Undertone',
  seoTitle: 'Best Nail Colours for Your Skin Undertone (Warm, Cool, Neutral)',
  excerpt: 'The right nail colour for your skin isn\'t just about what\'s trending — it\'s about undertone. Here\'s how to find shades that genuinely flatter your complexion.',
  seoDescription: 'Best nail colours for skin undertone. How to choose nail polish colours for warm, cool, and neutral undertones — with specific shade recommendations for each.',
  category: 'nail-inspo',
  tags: ['nail colors for skin undertone', 'nail polish for skin tone', 'best nail colors skin undertone'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'Best nail colours for skin undertone',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-undertone', label: 'What is skin undertone?' },
    { id: 'warm-undertone', label: 'Best nail colours for warm undertones' },
    { id: 'cool-undertone', label: 'Best nail colours for cool undertones' },
    { id: 'neutral-undertone', label: 'Best nail colours for neutral undertones' },
    { id: 'universally-flattering', label: 'Universally flattering shades' },
  ],
  relatedSlugs: ['best-nail-colors-every-season', 'nail-trends-2027', 'luxury-nail-ideas', 'bridal-nail-ideas'],
  faq: [
    { q: 'How do I find out my skin undertone?', a: 'Three quick methods: (1) Look at the veins on your inner wrist — green or olive veins suggest warm undertone; blue or purple veins suggest cool. (2) How does your skin react to sun? Warm undertones tan easily; cool undertones burn more easily. (3) What jewellery suits you — gold tends to flatter warm undertones; silver tends to flatter cool. Neither clearly better = neutral.' },
    { q: 'Does skin depth (light, medium, deep) matter for nail colour?', a: 'Both undertone and depth matter. Undertone determines which hues flatter you; depth affects how shades read — a nude that works on deep skin may look washed out on very fair skin. The undertone guide here applies across depths, but shades may need adjustment based on how light or dark your skin is.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-undertone">
        <h2 className="font-serif text-2xl font-bold mb-4">What is skin undertone?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Skin undertone is the subtle colour beneath the surface of your skin — warm (yellow, peachy, golden tones), cool (pink, red, bluish tones), or neutral (a mix of both). It doesn't change with tanning or seasons; it's your baseline hue.</p>
        <p className="text-gray-700 leading-relaxed">Undertone matters for nail colour because colours that share your undertone harmonise with your skin, while clashing undertones can make nails look jarring or hands look washed out.</p>
      </section>

      <section id="warm-undertone">
        <h2 className="font-serif text-2xl font-bold mb-4">Best nail colours for warm undertones</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Warm undertones — yellow, peachy, golden. Warm nail shades with orange, yellow, or golden leanings complement this.</p>
        <ArticleTable
          headers={['Shade', 'Why it flatters']}
          rows={[
            ['Coral', 'Orange-pink warmth enhances the golden glow of warm skin'],
            ['Terracotta / burnt orange', 'Earthy warm tones mirror the skin\'s warmth'],
            ['Caramel nude', 'Warm beige with yellow undertone reads as a natural skin tone'],
            ['Warm red', 'Orange-red rather than blue-red; harmonises with warm complexions'],
            ['Peach', 'Soft and skin-adjacent; glowing and flattering'],
            ['Gold / bronze chrome', 'Metallic warmth that matches rather than contrasts'],
            ['Warm burgundy', 'Deep earthy wine rather than cool berry'],
          ]}
        />
      </section>

      <section id="cool-undertone">
        <h2 className="font-serif text-2xl font-bold mb-4">Best nail colours for cool undertones</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Cool undertones — pink, red, blue. Cool nail shades with blue, purple, or grey leanings enhance this.</p>
        <ArticleTable
          headers={['Shade', 'Why it flatters']}
          rows={[
            ['True red / blue-based red', 'A blue-red rather than orange-red; crisp and classic on cool skin'],
            ['Deep berry / plum', 'Purple-pinks that share the pink-blue of cool undertones'],
            ['Lavender / lilac', 'Cool pink-purple; soft and ethereal against fair cool skin'],
            ['Baby blue', 'Cool and harmonious against pink-blue undertoned skin'],
            ['Dusty rose / muted pink', 'Pink with a cool grey or lilac base rather than a warm peachy base'],
            ['Navy', 'Deep blue that suits the cool depth of pink-based undertones'],
            ['Silver chrome', 'Cooler metallic that enhances rather than clashes'],
          ]}
        />
      </section>

      <section id="neutral-undertone">
        <h2 className="font-serif text-2xl font-bold mb-4">Best nail colours for neutral undertones</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Neutral undertones — a mix of warm and cool, or neither dominant. This is the most flexible undertone — most colours work, including shades that clash for warmer or cooler skin.</p>
        <ArticleTable
          headers={['Shade', 'Notes']}
          rows={[
            ['Warm nudes and cool nudes', 'Both work — pick based on the season or outfit'],
            ['Mauve / greige', 'A straddling shade between warm and cool; perfect for neutral undertones'],
            ['Classic red', 'Neutral reds work particularly well — neither orange nor blue leaning'],
            ['Soft pink', 'Most pinks flatter neutral undertones'],
            ['Most earth tones', 'Brown, khaki, caramel — all work well'],
          ]}
        />
      </section>

      <section id="universally-flattering">
        <h2 className="font-serif text-2xl font-bold mb-4">Universally flattering shades</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A handful of nail colours are genuinely flattering across most undertones and depths:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Chocolate brown:</strong> Neutral brown with slight warmth works across all undertones</li>
          <li><strong>Classic red:</strong> A true mid-red (not too orange, not too blue) flatters universally</li>
          <li><strong>Soft white:</strong> Clean but not stark; works well across skin tones</li>
          <li><strong>Sheer/glazed finish:</strong> A high-shine sheer layer enhances any undertone rather than fighting it</li>
        </ul>
        <ArticleCallout variant="info" title="Nudes are not universal">
          The idea of a "universal nude" is a myth. A nude that works beautifully on one skin tone can look ashy, washed out, or orange on another. Nudes need to be matched to undertone carefully — often requiring testing a few shades.
        </ArticleCallout>
      </section>
    </div>
  ),
});
export {};
