import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'coffin-nail-ideas',
  title: '50 Coffin Nail Ideas to Save for Your Next Set',
  seoTitle: '50 Coffin Nail Ideas to Save for Your Next Set',
  excerpt: 'Coffin nails — long, tapered sides with a squared-off tip — are one of the most popular nail shapes. Here are 50 coffin nail ideas across every style.',
  seoDescription: '50 coffin nail ideas for your next set. Ombre, chrome, nail art, minimalist, seasonal, and bold coffin nail designs for gel and acrylic extensions.',
  category: 'nail-inspo',
  tags: ['coffin nail ideas', 'coffin nail designs', 'coffin nail art', 'ballerina nail ideas'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: '50 coffin nail ideas to save for your next set',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'classic', label: 'Classic coffin styles' },
    { id: 'ombre', label: 'Ombre and gradient coffin nails' },
    { id: 'chrome-metallic', label: 'Chrome and metallic styles' },
    { id: 'nail-art', label: 'Nail art on coffin nails' },
    { id: 'seasonal-bold', label: 'Seasonal and bold ideas' },
    { id: 'why-coffin', label: 'Why the coffin shape is so popular' },
  ],
  relatedSlugs: ['square-nail-ideas', 'french-tip-nail-ideas', 'summer-nail-ideas', 'trendy-nail-designs'],
  faq: [
    { q: 'What\'s the difference between coffin and ballerina nails?', a: 'Coffin and ballerina are the same shape — tapered sides with a flat, squared-off tip. "Coffin" is the more commonly used name internationally; "ballerina" refers to the shape\'s resemblance to a ballet pointe shoe. Both terms describe the same shape.' },
    { q: 'How long do coffin nails need to be?', a: 'Coffin nails work best at medium-to-long lengths — the tapered shape needs enough length to show the full silhouette. Very short coffin nails lose the characteristic shape and may not look like coffin at all. Most clients asking for coffin nails want medium-long or long length. Discuss this at consultation.' },
    { q: 'Are coffin nails more likely to break than other shapes?', a: 'The tapered sides of coffin nails (compared to square\'s straight sides) create slightly different stress points. As an extension shape, acrylics and gel extensions can be built to appropriate strength for the length. The flat tip — unlike the pointed tip of stiletto — is less vulnerable than very pointed shapes. Clients should still be advised on aftercare and lifestyle considerations for wearing long extensions.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="classic">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic coffin styles (10)</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>All-white coffin — long, bright white, iconic</li>
          <li>Nude coffin with a glossy finish — clean and elegant</li>
          <li>Nude pink — BIAB or gel, soft and wearable</li>
          <li>Soft lilac coffin with a sheer finish</li>
          <li>Black coffin — bold, simple, always in style</li>
          <li>Classic red coffin — maximalist in size, classic in colour</li>
          <li>Milky white translucent — jelly finish, modern minimal</li>
          <li>Neutral taupe — business-appropriate, still stylish</li>
          <li>French coffin — white tip on nude; the length makes it look luxe</li>
          <li>Soft baby blue coffin — pastel, wearable, fresh</li>
        </ol>
      </section>

      <section id="ombre">
        <h2 className="font-serif text-2xl font-bold mb-4">Ombre and gradient coffin nails (10)</h2>
        <ol start={11} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Pink-to-white ombre — classic, Kylie Jenner-era iconic</li>
          <li>Nude-to-nude ombre — subtle gradient within the same colour family</li>
          <li>Purple-to-blue ombre — cool-toned gradient</li>
          <li>Black-to-dark grey ombre — moody and dramatic</li>
          <li>Peach-to-coral gradient — warm summer ombre</li>
          <li>Champagne-to-rose gold — warm metallic gradient</li>
          <li>Sage green-to-mint ombre</li>
          <li>White-to-silver ombre with glitter at the tip</li>
          <li>Sunset ombre — orange, coral, pink across the set</li>
          <li>Nude-to-glitter ombre — subtle at the cuticle, sparkle at the tip</li>
        </ol>
      </section>

      <section id="chrome-metallic">
        <h2 className="font-serif text-2xl font-bold mb-4">Chrome and metallic styles (10)</h2>
        <ol start={21} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Full silver mirror chrome coffin — reflective, dramatic</li>
          <li>Rose gold chrome on nude base</li>
          <li>Gold chrome coffin — warm, luxury feel</li>
          <li>Holographic chrome — rainbow shift, eye-catching</li>
          <li>Cat eye magnetic gel — coffin shape shows the effect beautifully across the flat tip</li>
          <li>Chrome ombre — chrome powder on tips fading to nude at the base</li>
          <li>Black with gold foil flakes — dark base, warm gold detail</li>
          <li>Purple velvet cat eye — colour-shifting magnetic gel in deep purple</li>
          <li>Duochrome — shifts between two colours in the light</li>
          <li>Nude base with scattered chrome flakes (not full chrome — more subtle)</li>
        </ol>
      </section>

      <section id="nail-art">
        <h2 className="font-serif text-2xl font-bold mb-4">Nail art on coffin nails (10)</h2>
        <ol start={31} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Marble on nude coffin — white and grey veining on a beige base</li>
          <li>3D gel flowers on the ring finger</li>
          <li>Abstract expressionist painting style — loose colour strokes</li>
          <li>Swirl art — fluid organic curves in contrasting colour</li>
          <li>Glazed donut finish — sheer pink with chrome on top</li>
          <li>Leopard print accent nails on a nude base</li>
          <li>Botanical press — dried flowers under gel on clear base</li>
          <li>Disney or character nail art — themed sets for personality</li>
          <li>Written text / name on a single nail — personalised detail</li>
          <li>Geometric colour blocking — clean shapes on a contrasting base</li>
        </ol>
        <ArticleCallout variant="info" title="For nail techs">
          Coffin nails' tapered shape and flat tip makes them particularly suited to nail art that extends to the edge — the flat squared tip creates a mini canvas. French tips, detailed art at the tip, and 3D elements all sit naturally on coffin nails.
        </ArticleCallout>
      </section>

      <section id="seasonal-bold">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal and bold ideas (10)</h2>
        <ol start={41} className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Spring:</strong> Pastel rainbow coffin set — one colour per nail</li>
          <li><strong>Spring:</strong> White coffin with floral art — cherry blossom or daisy</li>
          <li><strong>Summer:</strong> Hot orange or electric coral coffin</li>
          <li><strong>Summer:</strong> Tropical print art on neon base</li>
          <li><strong>Autumn:</strong> Deep plum with gold foil — rich autumn palette</li>
          <li><strong>Autumn:</strong> Warm burnt orange ombre from tip</li>
          <li><strong>Winter:</strong> Dark forest green with pine art detail</li>
          <li><strong>Winter:</strong> White with silver glitter ombre — snowy feel</li>
          <li><strong>Year-round bold:</strong> Red with black zebra print accent nail</li>
          <li><strong>Year-round bold:</strong> Electric blue coffin — unexpected and striking</li>
        </ol>
      </section>

      <section id="why-coffin">
        <h2 className="font-serif text-2xl font-bold mb-4">Why the coffin shape is so popular</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Coffin nails became mainstream in the early 2010s and have remained one of the most requested shapes. The combination of length (which looks luxurious), tapered sides (which elongate the finger), and flat tip (which is more practical than a sharp stiletto point) hits a sweet spot of dramatic but wearable.</p>
        <p className="text-gray-700 leading-relaxed">The shape works particularly well for ombre, chrome, and nail art — three of the most shareable styles on social media — which has kept it consistently popular in nail content.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">For more shape inspo: <Link to="/learn/square-nail-ideas" className="underline text-[#F52B8C]">50 square nail ideas for every style</Link>. For seasonal colour ideas: <Link to="/learn/summer-nail-ideas" className="underline text-[#F52B8C]">summer nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
