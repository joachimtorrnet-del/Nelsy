import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudio } from '@/hooks/useStudio';
import { BookingModal } from '@/components/studio/BookingModal';
import { PublicStudioView, PreviewSkeleton } from '@/components/studio/PublicStudioView';
import { getTheme } from '@/lib/themes';
import { recordPageView } from '@/lib/supabase-queries';
import SEOMeta from '@/components/SEOMeta';
import { CurrencyProvider } from '@/lib/currency';
import { buildStudioSeo, isStudioIndexable } from '@/lib/studioSeo';

function NotFound({ accent }: { accent: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-6">
      <div className="text-5xl mb-4">💅</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Studio not found</h1>
      <p className="text-gray-400 text-sm mb-6">
        This studio doesn't exist on Nelsy yet.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-white px-5 py-2.5 rounded-xl font-semibold text-sm"
        style={{ background: accent }}
      >
        Create mine →
      </Link>
    </div>
  );
}

// The slug exists but the page is a draft or paused (plan or free trial ended): a calm message, not a 404.
function Unavailable({ slug }: { slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6 bg-white">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl mb-5" aria-hidden="true">🌙</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">This page is not available right now</h1>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
        getnelsy.com/{slug} is taking a short break and cannot take bookings at the moment. Please check back soon.
      </p>
      <Link to="/" className="mt-8 text-xs font-semibold text-gray-400 hover:text-gray-600">
        Powered by Nelsy
      </Link>
    </div>
  );
}

export default function Studio() {
  const { slug } = useParams<{ slug: string }>();
  const { merchant, loading, unavailable } = useStudio(slug ?? '');
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!merchant?.id || trackedRef.current) return;
    const sessionKey = `pv_${merchant.id}`;
    if (sessionStorage.getItem(sessionKey)) return;
    trackedRef.current = true;
    sessionStorage.setItem(sessionKey, '1');
    void recordPageView(merchant.id);
  }, [merchant?.id]);

  const theme = getTheme(merchant?.theme_preset, merchant?.color_accent);
  const seo = merchant ? buildStudioSeo(merchant) : null;

  return (
    <div className={`min-h-dvh ${theme.fontClass}`} style={{ backgroundColor: '#E8E8E8' }}>
      {merchant && seo ? (
        <SEOMeta
          title={seo.title}
          description={seo.description}
          canonical={`/${merchant.slug}`}
          noindex={!isStudioIndexable(merchant)}
          ogImage={seo.ogImage}
          jsonLd={seo.jsonLd}
        />
      ) : !loading && unavailable ? (
        <SEOMeta title="Page not available" description="This booking page is not available right now." noindex />
      ) : !loading ? (
        <SEOMeta title="Studio not found" description="This studio doesn't exist on Nelsy yet." noindex />
      ) : null}
      <div className="w-full max-w-[480px] md:max-w-[560px] mx-auto min-h-dvh relative">
        {loading ? (
          <PreviewSkeleton bgColor={theme.pageBg} />
        ) : !merchant && unavailable ? (
          <Unavailable slug={slug ?? ''} />
        ) : !merchant ? (
          <NotFound accent={theme.defaultAccent} />
        ) : (
          <PublicStudioView merchant={merchant} mode="live" />
        )}
      </div>

      {merchant && (
        <CurrencyProvider currency={merchant.currency}>
          <BookingModal merchant={merchant} />
        </CurrencyProvider>
      )}
    </div>
  );
}
