import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Info } from 'lucide-react';
import { StudioPhonePreview } from '@/components/dashboard/StudioPhonePreview';
import { useProData } from '../hooks/useProData';
import { DemoBanner, ScreenTitle } from '../components/ui';
import { pageUrl } from '../lib/constants';

/** The live public page (same PublicStudioView as the website) in a phone frame. Read-only. */
export default function Preview() {
  const { data } = useProData();
  const [width, setWidth] = useState(() => Math.min(300, window.innerWidth - 72));

  useEffect(() => {
    const onResize = () => setWidth(Math.min(300, window.innerWidth - 72));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (!data) return null;

  // Scrolling works, taps do nothing: links and buttons are not clickable in preview mode.
  const block = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="min-h-full bg-[#F2F2F2] pb-6">
      <ScreenTitle right={<span className="truncate pl-3 text-[13px] font-semibold text-gray-500">{pageUrl(data.slug)}</span>}>
        Preview
      </ScreenTitle>
      {data.mode === 'demo' && <DemoBanner />}
      <div className="mx-4 flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-3 py-2.5 text-white">
        <Info size={16} className="shrink-0" />
        <p className="text-[13px] font-medium">
          <span className="font-bold">Preview mode</span> · Buttons and links are not clickable
        </p>
      </div>
      <div className="mt-5 flex justify-center opacity-90" onClickCapture={block}>
        <StudioPhonePreview merchant={data.merchant} width={width} />
      </div>
    </div>
  );
}
