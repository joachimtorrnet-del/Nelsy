import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleImage } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-shapes-explained',
  title: 'Nail Shapes Explained: Almond, Square, Coffin, Oval and More',
  seoTitle: 'Nail Shapes Explained: Almond, Square, Coffin, Oval and More',
  excerpt: 'Not sure which nail shape is right for you — or how to describe what you want? Here\'s a complete guide to every nail shape, what makes each distinct, and who it suits.',
  seoDescription: 'Nail shapes explained: almond, square, coffin, oval, round, stiletto and squoval. What each shape looks like, who it suits and which is easiest to maintain.',
  category: 'nail-education',
  tags: ['nail shapes explained', 'nail shape guide', 'different nail shapes'],
  heroImage: 'linear-gradient(135deg, #FFF9FB 0%, #FCE4F5 100%)',
  heroImageAlt: 'Nail shapes explained',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: "The main nail shapes are square, round, oval, squoval, almond, coffin (ballerina) and stiletto, and squoval is the safest all-round choice.",
    detail: "Shapes differ in two places: the sidewalls (straight or tapered) and the tip (flat, curved or pointed). Straight sides and soft tips are strongest; tapered sides and points need length and usually extensions.",
    points: [
      { label: "Strongest", text: "Round, oval and squoval." },
      { label: "Most elongating", text: "Almond and oval." },
      { label: "Most dramatic", text: "Coffin and stiletto, usually on extensions." },
    ],
  },
  toc: [
    { id: 'shape-overview', label: 'Quick reference: all shapes' },
    { id: 'square', label: 'Square' },
    { id: 'round', label: 'Round' },
    { id: 'oval', label: 'Oval' },
    { id: 'squoval', label: 'Squoval' },
    { id: 'almond', label: 'Almond' },
    { id: 'coffin', label: 'Coffin / ballerina' },
    { id: 'stiletto', label: 'Stiletto / pointed' },
    { id: 'choosing', label: 'How to choose the right shape' },
  ],
  relatedSlugs: ['how-to-shape-almond-nails', 'how-to-shape-square-nails', 'how-to-shape-coffin-nails', 'how-to-file-nail-extensions-into-shape'],
  faq: [
    { q: "Which nail shape is the strongest?", a: "Round, oval and squoval are generally the strongest because there are no sharp corners to catch. Square corners can chip at the edges. Coffin and stiletto are the most fragile because their taper removes material at the sides, so they are usually done on extensions rather than natural nails." },
    { q: "Which nail shape makes fingers look longer?", a: "Oval and almond are the most elongating, because their tapered sides draw the eye toward the tip. Round and square shapes tend to make the nail look wider. Long stiletto nails also elongate, but they are impractical for most people day to day." },
    { q: "What is the difference between squoval and square?", a: "Square has straight sides and sharp, 90-degree corners. Squoval has the same straight sides and flat tip, but the corners are rounded off. Squoval snags less and suits more nail beds, which is why many clients who ask for square are happiest with squoval." },
    { q: "Are coffin and ballerina nails the same shape?", a: "Yes. Both names describe tapered sides with a flat tip. Coffin is the more common name; ballerina refers to the resemblance to a ballet pointe shoe." },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="shape-overview">
        <h2 className="font-serif text-2xl font-bold mb-4">Quick reference: all shapes</h2>
        <ArticleTable
          headers={['Shape', 'Key characteristic', 'Best for', 'Maintenance']}
          rows={[
            ['Square', 'Straight sides, flat top', 'Strong, practical, modern', 'Easy'],
            ['Round', 'Straight sides, curved tip following nail', 'Short nails, low maintenance', 'Very easy'],
            ['Oval', 'Tapered sides, rounded tip', 'Elongating, classic', 'Moderate'],
            ['Squoval', 'Slightly softened square corners', 'Most versatile and flattering', 'Easy'],
            ['Almond', 'Tapered sides, rounded pointed tip', 'Elegant, flattering on long nails', 'Moderate'],
            ['Coffin / ballerina', 'Tapered sides, flat tip', 'Bold, trendy, extensions only practical', 'High'],
            ['Stiletto / pointed', 'Tapered sides, sharp point', 'Statement, dramatic', 'Very high — fragile'],
          ]}
        />
      </section>

      <section id="square">
        <h2 className="font-serif text-2xl font-bold mb-4">Square</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Square nails have straight sidewalls and a completely flat, straight top edge. The corners are sharp and defined. This is one of the most popular shapes for gel extensions and gel polish because it's strong, modern, and suits most nail lengths.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Works best on:</strong> Most hand shapes; particularly good on longer nail beds. <strong>Length:</strong> Short to long. <Link to="/blog/how-to-shape-square-nails" className="underline text-[#F52B8C]">How to shape square nails.</Link></p>
      </section>

      <section id="round">
        <h2 className="font-serif text-2xl font-bold mb-4">Round</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Round nails follow the natural curve of the fingertip — straight sides with a curved tip that matches the shape of the finger. They're the most natural-looking shape and extremely low maintenance.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Works best on:</strong> Narrow nail beds, short nails, clients who prefer a natural look. <strong>Length:</strong> Short to medium.</p>
      </section>

      <section id="oval">
        <h2 className="font-serif text-2xl font-bold mb-4">Oval</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Oval nails taper gently at the sides and finish with a rounded tip — more elongated than round, but softer than almond. They're universally flattering and one of the most elegant shapes for natural nails.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Works best on:</strong> Most hand shapes; particularly good on wide or short nail beds (tapering makes them appear narrower). <strong>Length:</strong> Medium to long.</p>
      </section>

      <section id="squoval">
        <h2 className="font-serif text-2xl font-bold mb-4">Squoval</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Squoval is a hybrid of square and oval — a square shape with slightly softened corners. It's arguably the most versatile shape: the strength and cleanness of square with the softness of oval. It's widely considered the most universally flattering nail shape.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Works best on:</strong> Almost every hand shape — the default recommendation for clients who don't know what they want. <strong>Length:</strong> Any length.</p>
      </section>

      <section id="almond">
        <h2 className="font-serif text-2xl font-bold mb-4">Almond</h2>
        <ArticleImage src="photo-1770210257340-dc2b0f44642a" alt="Almond-shaped nails with a metallic gold manicure" />
        <p className="text-gray-700 mb-4 leading-relaxed">Almond nails taper at the sides and finish in a soft, rounded point — like the shape of an almond. They're elongating, elegant, and one of the most popular shapes for nail extensions. On natural nails, they require some length to work.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Works best on:</strong> Medium to long nail beds; elegant on most hand shapes. <strong>Length:</strong> Medium to long. <Link to="/blog/how-to-shape-almond-nails" className="underline text-[#F52B8C]">How to shape almond nails.</Link></p>
      </section>

      <section id="coffin">
        <h2 className="font-serif text-2xl font-bold mb-4">Coffin / ballerina</h2>
        <ArticleImage src="photo-1754799670410-b282791342c3" alt="Long coffin-shaped nails in white and soft pink" />
        <p className="text-gray-700 mb-4 leading-relaxed">Coffin nails (also called ballerina nails) taper at the sides like stiletto but finish with a flat, square tip instead of a point. Named for their resemblance to a coffin shape. Bold and trendy, they require length to read correctly — best achieved with extensions.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Works best on:</strong> Longer nail beds or extensions; statement looks. <strong>Length:</strong> Medium to very long. <Link to="/blog/how-to-shape-coffin-nails" className="underline text-[#F52B8C]">How to shape coffin nails.</Link></p>
      </section>

      <section id="stiletto">
        <h2 className="font-serif text-2xl font-bold mb-4">Stiletto / pointed</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Stiletto nails taper all the way to a sharp point. They're the most dramatic and fashion-forward shape — and the most impractical. On natural nails, they chip and break easily; most wearers use extensions. Not suitable as a long-term everyday shape for most clients.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Works best on:</strong> Extensions; special occasions; clients who prioritise aesthetics over practicality. <strong>Length:</strong> Long to very long.</p>
      </section>

      <section id="choosing">
        <h2 className="font-serif text-2xl font-bold mb-4">How to choose the right shape</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>For durability and practicality:</strong> Square, squoval, or round</li>
          <li><strong>For elongating effect:</strong> Oval, almond, or squoval with some length</li>
          <li><strong>For bold and trendy:</strong> Coffin or stiletto (extensions recommended)</li>
          <li><strong>For the most universally flattering:</strong> Squoval — it works on almost every nail bed shape and size</li>
          <li><strong>For clients with wide nail beds:</strong> Oval or almond (the taper narrows the appearance)</li>
          <li><strong>For very short nails:</strong> Round or squoval — other shapes require length to be visible</li>
        </ul>
        <h3 className="font-semibold text-lg mt-8 mb-3">Which shapes work at which length</h3>
        <ArticleTable
          headers={['Shape', 'Short', 'Medium', 'Long']}
          rows={[
            ['Round', 'Yes', 'Yes', 'Rarely chosen'],
            ['Square / squoval', 'Yes', 'Yes', 'Yes'],
            ['Oval', 'Possible', 'Yes', 'Yes'],
            ['Almond', 'Soft version only', 'Yes', 'Yes'],
            ['Coffin', 'Reads as square', 'Yes', 'Yes'],
            ['Stiletto', 'No', 'Possible', 'Yes'],
          ]}
        />
        <p className="text-gray-700 leading-relaxed">At consultation, ask clients what they do with their hands every day. Keyboard work, childcare and wet work all point toward shorter, softer shapes, whatever the inspo photo shows.</p>
      </section>
    </div>
  ),
});
export {};
