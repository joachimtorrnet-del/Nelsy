import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ArticleMeta } from '@/lib/articles';
import { CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/articles';

interface Props {
  article: ArticleMeta;
  size?: 'featured' | 'spotlight' | 'grid';
}

// Gradient fallback used only when the generated cover fails to load
const GRADIENT_FALLBACK: Record<string, string> = {
  'get-clients':         'linear-gradient(135deg, #FDF0F7 0%, #FBCFE8 100%)',
  'instagram-content':   'linear-gradient(135deg, #FFF0F5 0%, #F9A8D4 100%)',
  'pricing-money':       'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  'booking-software':    'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
  'policies-clients':    'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  'start-your-business': 'linear-gradient(135deg, #FDF4FF 0%, #E9D5FF 100%)',
  'nail-education':      'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  'nail-inspo':          'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  comparisons:           'linear-gradient(135deg, #F0FDFA 0%, #99F6E4 100%)',
  'branding-growth':     'linear-gradient(135deg, #FFF8F0 0%, #FED7AA 100%)',
};

// Generated cover image — falls back to gradient on error
function CoverImage({
  slug,
  category,
  alt,
  className,
}: {
  slug: string;
  category: string;
  alt: string;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className={className}
        style={{ background: GRADIENT_FALLBACK[category] ?? GRADIENT_FALLBACK['get-clients'] }}
      />
    );
  }
  return (
    <img
      src={`/blog-covers/${slug}.png`}
      alt={alt}
      className={`${className ?? ''} object-cover`}
      loading="lazy"
      onError={() => setErrored(true)}
    />
  );
}

function CategoryPill({ category }: { category: string }) {
  const c = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS];
  const label = CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS] ?? category;
  return (
    <span
      className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
      style={{ background: c?.bg ?? '#F7F3F3', color: c?.text ?? '#555' }}
    >
      {label}
    </span>
  );
}

export default function ArticleCard({ article, size = 'grid' }: Props) {
  const isFeatured = size === 'featured';
  const isSpotlight = size === 'spotlight';

  // Real editorial photo takes priority; otherwise use generated cover
  const imageEl = article.heroImage.startsWith('/') ? (
    <img
      src={article.heroImage}
      alt={article.heroImageAlt}
      className="w-full h-full object-cover"
      loading="lazy"
    />
  ) : (
    <CoverImage
      slug={article.slug}
      category={article.category}
      alt={article.heroImageAlt}
      className="w-full h-full"
    />
  );

  if (isFeatured) {
    return (
      <Link
        to={`/blog/${article.slug}`}
        className="group block rounded-3xl overflow-hidden bg-white border border-[#F4C2C2]/30 hover:shadow-lg transition-shadow"
      >
        <div className="grid md:grid-cols-2">
          <div className="aspect-[4/3] md:aspect-auto overflow-hidden min-h-[260px]">
            {imageEl}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <CategoryPill category={article.category} />
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A] mt-3 mb-3 group-hover:text-[#F52B8C] transition-colors leading-snug">
              {article.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{article.author}</span>
              <span>·</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (isSpotlight) {
    return (
      <Link
        to={`/blog/${article.slug}`}
        className="group block rounded-2xl overflow-hidden bg-white border border-[#F4C2C2]/30 hover:shadow-md transition-shadow"
      >
        <div className="aspect-[16/9] overflow-hidden">{imageEl}</div>
        <div className="p-5">
          <CategoryPill category={article.category} />
          <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mt-2 mb-2 group-hover:text-[#F52B8C] transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  // Grid card
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group block rounded-2xl overflow-hidden bg-white border border-[#F4C2C2]/30 hover:shadow-md transition-shadow"
    >
      <div className="aspect-[16/9] overflow-hidden">{imageEl}</div>
      <div className="p-5">
        <CategoryPill category={article.category} />
        <h3 className="font-serif text-base font-bold text-[#1A1A1A] mt-2 mb-2 group-hover:text-[#F52B8C] transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
        <span className="text-xs text-gray-400">
          {new Date(article.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </span>
      </div>
    </Link>
  );
}
