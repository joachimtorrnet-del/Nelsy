import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'short-nail-ideas',
  title: '50 Short Nail Ideas for Clients Who Want Something Clean',
  seoTitle: '50 Short Nail Ideas: Clean, Wearable Designs for Clients',
  excerpt: 'Short nails are having a moment — and clients are booking them on purpose, not just by necessity. 50 ideas for clean, elevated short nail looks across every style.',
  seoDescription: 'Short nail ideas for nail techs. 50 design ideas for short nails — neutrals, minimal art, textures, chrome, and seasonal looks — with client consultation tips.',
  category: 'nail-inspo',
  tags: ['short nail ideas', 'short nails', 'nail inspo', 'minimal nails'],
  heroImage: 'linear-gradient(135deg, #F0FFF4 0%, #A7F3D0 100%)',
  heroImageAlt: '50 short nail ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-short-nails', label: 'Why short nails are a proper service' },
    { id: 'neutral-clean', label: 'Neutral & clean short nails (1–10)' },
    { id: 'minimal-art', label: 'Minimal nail art (11–20)' },
    { id: 'texture-finish', label: 'Texture & finish ideas (21–30)' },
    { id: 'colour-pop', label: 'Colour pop short nails (31–40)' },
    { id: 'occasion', label: 'Occasion & seasonal short nails (41–50)' },
    { id: 'consultation', label: 'Client consultation tips' },
  ],
  relatedSlugs: ['almond-nail-ideas', 'minimalist-nail-ideas', 'french-tip-nail-ideas', 'nail-file-grit-guide'],
  faq: [
    { q: 'Can short nails look expensive?', a: 'Absolutely — and increasingly, short nails are the luxury choice. A precisely shaped, flawlessly applied, gel-polish-finished short nail with a cuticle-clean look reads premium. The "clean girl" nail aesthetic is built on short nails. The key is flawless application and a deliberate finish, not length.' },
    { q: 'What nail shape works best on short nails?', a: 'Square, squoval, and rounded are the most flattering on short nails. Square elongates the nail bed slightly; squoval is the most universally flattering; rounded softens and is practical for everyday use. Avoid stiletto or strong almond shapes on very short nails as they require free edge length to look intentional.' },
    { q: 'How do I upsell clients who want short nails?', a: 'Short nails can carry gel polish upgrades, nail art, chrome finishes, and cuticle treatments. Price the service as a full gel manicure, not a budget option. The design possibilities on short nails are different from long nails but equally valuable.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-short-nails">
        <h2 className="font-serif text-2xl font-bold mb-4">Why short nails are a proper service — not a downgrade</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Short nails have shifted from "I can't grow them" to "I prefer them." Clients choosing short nails in 2025–2026 are making an intentional aesthetic decision — and they want the same quality of service, design consideration, and finish as extension clients.</p>
        <p className="text-gray-700 leading-relaxed">For nail techs, short nail clients are excellent recurring customers: they rebook consistently, the service is faster (which improves your hourly rate), and the natural nail care element gives you a professional edge over DIY.</p>
        <ArticleCallout variant="info" title="Short nails and the clean girl aesthetic">
          The "clean girl" nail look — associated with neutral colours, perfect cuticles, and a refined finish — is almost always short. These clients are discerning about quality and tend to be excellent regular clients.
        </ArticleCallout>
      </section>

      <section id="neutral-clean">
        <h2 className="font-serif text-2xl font-bold mb-4">Neutral & clean short nails (1–10)</h2>
        <div className="space-y-3">
          {[
            { n: 1, idea: 'Skin-tone nude', desc: 'The closest possible match to the client\'s skin tone — a "my nails but better" look. Requires product knowledge and colour-matching skill. Very high reorder rate from clients.' },
            { n: 2, idea: 'Milky sheer pink', desc: 'Translucent soft pink — sits between natural and polished. Works on short nails because the sheerness doesn\'t make the nail look stubby. Top with a high-shine topcoat.' },
            { n: 3, idea: 'Cool white', desc: 'Crisp, opaque white. One of the cleanest short nail looks. Apply precisely — any flooding of the cuticle is visible with white. Requires confident application.' },
            { n: 4, idea: 'Barely-there blush', desc: 'The faintest wash of warm pink — almost like tinted lip balm on the nail. BIAB or a sheer gel in a blush tone. Clients who want "natural" but still done.' },
            { n: 5, idea: 'Warm oat / latte', desc: 'Warm-toned neutral in the cream-beige family. Reliably popular across seasons. Particularly flattering on warmer skin tones.' },
            { n: 6, idea: 'Cool grey', desc: 'Light to mid grey — clean, minimal, unexpected. Suits clients with a monochrome or editorial wardrobe aesthetic.' },
            { n: 7, idea: 'Natural BIAB', desc: 'Builder in a bottle in a clear or pink-tinted shade over the natural nail. Strengthens while looking completely natural. Great for nail biters and pickers who want to grow.' },
            { n: 8, idea: 'Deep taupe', desc: 'A darker neutral — grey-brown or mauve-taupe. The winter alternative to summer nude. Add a satin finish for a matte-adjacent effect.' },
            { n: 9, idea: 'Porcelain off-white', desc: 'Off-white with a yellow-cream undertone — warmer than bright white, cooler than a full cream. Interesting without being statement.' },
            { n: 10, idea: 'Pale nude French', desc: 'The classic pale base with a white tip — but on short nails, the French line should be kept fine and close to the actual free edge. Avoid thick tips that look artificial on short nails.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#A7F3D0] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="minimal-art">
        <h2 className="font-serif text-2xl font-bold mb-4">Minimal nail art on short nails (11–20)</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">The key with nail art on short nails: restrain the scale. One or two design elements per nail rather than filling the whole canvas.</p>
        <div className="space-y-3">
          {[
            { n: 11, idea: 'Single thin line', desc: 'One horizontal or vertical metallic line across the nail. Can be applied with a liner brush or liner tape. Subtle but creates a graphic, editorial finish.' },
            { n: 12, idea: 'Dot accent', desc: 'One or three small dots in a contrasting colour — often chrome or white on a neutral base. Simple to execute, high-impact.' },
            { n: 13, idea: 'Negative space half moon', desc: 'A crescent of bare (clear or natural) nail at the cuticle, with the rest covered in colour. Clean, graphic, and one of the most elegant looks for short nails.' },
            { n: 14, idea: 'Micro florals', desc: 'Very small hand-painted flowers (3–5mm) on one accent nail. On a short nail, scale them down to single-petal daisy or tiny rose.' },
            { n: 15, idea: 'Abstract line art', desc: 'Abstract curved or geometric lines in a single colour over a contrasting base. Goes with most aesthetics — minimalist, editorial, maximalist depending on colour choice.' },
            { n: 16, idea: 'Tiny heart', desc: 'A single small hand-painted or foil heart on the ring finger. Perennially popular, particularly around Valentine\'s, but works year-round.' },
            { n: 17, idea: 'Star detail', desc: 'One small star outline or filled star — can be foil sticker or hand-painted. Celestial aesthetic is consistently popular on short nails.' },
            { n: 18, idea: 'White swipe', desc: 'A single thick swipe of white on one nail over a darker base — imprecise, painterly, effortlessly modern.' },
            { n: 19, idea: 'Gold foil fragments', desc: 'Small pieces of gold or silver foil applied randomly across one or two nails. Creates texture and interest without requiring brush work.' },
            { n: 20, idea: 'Marble effect', desc: 'Subtle marble nail art on one accent nail — vein lines in grey or white over an off-white or grey base. A classic nail technique that suits short nails well.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#FDE68A] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="texture-finish">
        <h2 className="font-serif text-2xl font-bold mb-4">Texture & finish ideas (21–30)</h2>
        <div className="space-y-3">
          {[
            { n: 21, idea: 'Matte finish', desc: 'Any colour with a matte topcoat. Transforms a classic gel polish into something contemporary. Particularly effective on bold colours — red, black, forest green.' },
            { n: 22, idea: 'Satin finish', desc: 'Between matte and shiny — a low-gloss satin. More refined than matte, less typical than high-shine. Nude or neutral in satin reads extremely premium.' },
            { n: 23, idea: 'Micro glitter all-over', desc: 'Fine glitter integrated throughout a sheer or solid gel colour. Not chunky — a sparkle within the colour rather than on top of it.' },
            { n: 24, idea: 'Chrome on short nails', desc: 'Chrome powder works excellently on short nails — the effect is as dramatic as on long nails. Rose gold, silver, and aurora chrome are all strong choices.' },
            { n: 25, idea: 'Cat eye gel', desc: 'Magnetic cat eye gel creates a shifting metallic stripe effect. Very eye-catching on short nails. Requires a magnet tool applied before curing.' },
            { n: 26, idea: 'Jelly finish', desc: 'Translucent, jewel-like gel — looks like coloured glass over the nail. Works in soft pinks, corals, and deeper tones. Very fashionable at time of publication.' },
            { n: 27, idea: 'Velvet / flock finish', desc: 'A textured velvet-like finish using specific gel textures. Unusual, tactile, very Instagram-friendly. Strong portfolio content.' },
            { n: 28, idea: 'Duochrome shift', desc: 'A gel that shifts between two colours depending on the viewing angle. Green-to-gold, pink-to-silver, purple-to-blue. Sophisticated and wearable on short nails.' },
            { n: 29, idea: 'Crystalline / gemstone effect', desc: 'Using clear gel with glitter or flakes to create a gemstone effect. Particularly strong in quartz-like palettes (clear with white flakes) or amethyst (sheer purple with silver flakes).' },
            { n: 30, idea: 'Two-finish mix', desc: 'Alternating nails in matte and glossy finishes in the same or complementary colours. Interesting without being complicated.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#FECDD3] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="colour-pop">
        <h2 className="font-serif text-2xl font-bold mb-4">Colour pop short nails (31–40)</h2>
        <div className="space-y-3">
          {[
            { n: 31, idea: 'Cherry red', desc: 'Bright warm red on short nails — classic and unexpectedly striking. Short nails in red have a retro, confident energy.' },
            { n: 32, idea: 'Bright coral', desc: 'Summer essential. Orange-leaning coral looks particularly good in summer light and photographs well.' },
            { n: 33, idea: 'Neon yellow', desc: 'Not for every client, but excellent for summer content. Clients with confidence in colour will love this.' },
            { n: 34, idea: 'Electric blue', desc: 'A clean, saturated blue. Short nails in a bold colour look intentional and fashion-forward.' },
            { n: 35, idea: 'Hot pink', desc: 'Bright, saturated pink — not the pale version. Short nails in hot pink have strong energy and create excellent Instagram content.' },
            { n: 36, idea: 'Emerald green', desc: 'Rich jewel-toned green. Works exceptionally well in autumn/winter. Add a gold chrome accent nail for a festive edge.' },
            { n: 37, idea: 'Burnt orange', desc: 'Warm, terracotta-adjacent orange. Autumn nail of choice. Particularly flattering on warm and olive skin tones.' },
            { n: 38, idea: 'Lavender', desc: 'Soft purple — spring and summer staple. Clean, fresh, universally popular across age groups.' },
            { n: 39, idea: 'Navy blue', desc: 'Deep navy — a sophisticated alternative to black. Strong in autumn/winter.' },
            { n: 40, idea: 'Multicolour mix', desc: 'A different bold colour on each finger. Playful, expressive, and a conversation starter. Works best when colours are in the same saturation family so they feel cohesive.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#BFDBFE] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="occasion">
        <h2 className="font-serif text-2xl font-bold mb-4">Occasion & seasonal short nails (41–50)</h2>
        <div className="space-y-3">
          {[
            { n: 41, idea: 'Clean bridal', desc: 'Short, square or squoval, sheer pink or white — very popular bridal choice for brides who find long nails impractical. Flawless application required.' },
            { n: 42, idea: 'Winter white', desc: 'Crisp white in winter — feels snowy and fresh against darker winter wardrobes.' },
            { n: 43, idea: 'Christmas red with gold foil', desc: 'Classic red with a foil accent on one nail. Short nails in Christmas red look intentional and festive without feeling over the top.' },
            { n: 44, idea: 'Summer French', desc: 'The French manicure in a summer palette — coral tip, peach base, or a reverse French with coloured base and nude tip.' },
            { n: 45, idea: 'Valentine\'s blush', desc: 'Soft blush pink with a minimal heart detail on one nail. Wearable for clients who don\'t want an overtly "Valentine\'s Day" look.' },
            { n: 46, idea: 'Halloween black', desc: 'Full black on short nails is more wearable than on long nails — feels more editorial, less gothic. Add a subtle spider web accent if client wants seasonal detail.' },
            { n: 47, idea: 'Spring mint', desc: 'Pale mint green — fresh, clean, springlike. One of the strongest short nail looks because the pale colour doesn\'t shorten the visual length of the finger.' },
            { n: 48, idea: 'Autumn burgundy', desc: 'Deep burgundy — the classic autumn colour. Incredibly versatile on short nails and flatters most skin tones.' },
            { n: 49, idea: 'Graduation nude glam', desc: 'Elegant nude with a single accent nail in rose gold chrome. Smart enough for a formal occasion, wearable everyday after.' },
            { n: 50, idea: 'New Year\'s glitter', desc: 'A sheer or nude base with a gold or silver micro-glitter overlay. Subtle enough to wear into January, special enough for New Year\'s Eve.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#E9D5FF] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="consultation">
        <h2 className="font-serif text-2xl font-bold mb-4">Client consultation tips for short nails</h2>
        <ArticleTable
          headers={['Client says', 'What to explore']}
          rows={[
            ['"Just natural looking"', 'Show examples of BIAB, sheer pink, and skin-tone nude — clarify whether they mean truly bare-looking or just understated'],
            ['"Short, just clean"', 'Establish shape preference: square, squoval, or rounded — and whether they want gel or polish only'],
            ['"Something for work"', 'Neutrals, sheer, or a muted colour. Short nails in workplace settings read professional.'],
            ['"I bite my nails"', 'BIAB or a structured base coat helps strengthen while looking natural. Focus on nail health alongside aesthetics.'],
          ]}
        />
        <ArticleTip>Short nail clients often don\'t realise how much the shape contributes to the final look. Spending 2 minutes on shape consultation — showing square vs squoval vs round on their hand — elevates the result and the client\'s appreciation of your expertise.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">For more ideas: <Link to="/learn/minimalist-nail-ideas" className="underline text-[#F52B8C]">minimalist nail ideas</Link> | <Link to="/learn/french-tip-nail-ideas" className="underline text-[#F52B8C]">French tip nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
