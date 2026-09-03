import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStudio } from '@/hooks/useStudio';
import { BookingModal } from '@/components/studio/BookingModal';
import { PublicStudioView, PreviewSkeleton } from '@/components/studio/PublicStudioView';
import { getTheme } from '@/lib/themes';
import { recordPageView } from '@/lib/supabase-queries';

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

export default function Studio() {
  const { slug } = useParams<{ slug: string }>();
  const { merchant, loading } = useStudio(slug ?? '');
  const trackedRef = useRef(false);

  useEffect(() => {
    if (!merchant?.id || trackedRef.current) return;
    const sessionKey = `pv_${merchant.id}`;
    if (sessionStorage.getItem(sessionKey)) return;
    trackedRef.current = true;
    sessionStorage.setItem(sessionKey, '1');
    void recordPageView(merchant.id);
  }, [merchant?.id]);

  useEffect(() => {
    if (merchant) document.title = `${merchant.salon_name} — Book on Nelsy`;
    return () => { document.title = 'Nelsy'; };
  }, [merchant?.salon_name]);

  const theme = getTheme(merchant?.theme_preset, merchant?.color_accent);

  return (
    <div className={`min-h-dvh ${theme.fontClass}`} style={{ backgroundColor: '#E8E8E8' }}>
      <div className="w-full max-w-[480px] mx-auto min-h-dvh relative">
        {loading ? (
          <PreviewSkeleton bgColor={theme.pageBg} />
        ) : !merchant ? (
          <NotFound accent={theme.defaultAccent} />
        ) : (
          <PublicStudioView merchant={merchant} mode="live" />
        )}
      </div>

      {merchant && <BookingModal merchant={merchant} />}
    </div>
  );
}
