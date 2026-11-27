import { Video } from 'lucide-react';

/** Small "Video call" pill for online services (Creator plan). Theme-aware via props. */
export function VideoCallBadge({ color, background, size = 'sm' }: { color: string; background: string; size?: 'sm' | 'md' }) {
  const md = size === 'md';
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: md ? '4px 10px' : '2px 8px', borderRadius: 999,
        fontSize: md ? 12 : 11, fontWeight: 700, lineHeight: 1.4,
        color, backgroundColor: background, whiteSpace: 'nowrap', verticalAlign: 'middle',
      }}
    >
      <Video size={md ? 13 : 11} strokeWidth={2.2} aria-hidden="true" />
      Video call
    </span>
  );
}
