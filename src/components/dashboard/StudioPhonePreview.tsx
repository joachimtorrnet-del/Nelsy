import { PublicStudioView } from '../studio/PublicStudioView';
import type { Merchant } from '../../types';

const DEVICE_WIDTH = 390;
const DEVICE_HEIGHT = 780;

/** Live, scrollable studio rendered at real phone width and scaled down to `width`. */
export function StudioPhonePreview({ merchant, width = 300 }: { merchant: Merchant; width?: number }) {
  const scale = width / DEVICE_WIDTH;
  return (
    <div
      className="rounded-[36px] border-[7px] border-[#1A1A1A] bg-[#1A1A1A] shadow-xl overflow-hidden"
      style={{ width: width + 14, height: DEVICE_HEIGHT * scale + 14 }}
    >
      <div className="rounded-[29px] overflow-hidden bg-white" style={{ width, height: DEVICE_HEIGHT * scale }}>
        <div
          className="overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ width: DEVICE_WIDTH, height: DEVICE_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}
        >
          <PublicStudioView merchant={merchant} mode="preview" />
        </div>
      </div>
    </div>
  );
}
