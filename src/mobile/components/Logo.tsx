import { PINK } from '../lib/constants';

/** Nelsy mark + wordmark (same "N" tile as the website favicon). */
export function Logo({
  size = 32,
  wordmark = true,
  light = false,
  textSize,
  gap = 8,
}: {
  size?: number;
  wordmark?: boolean;
  light?: boolean;
  /** Wordmark font size in px (default: 0.62 x the tile size). */
  textSize?: number;
  gap?: number;
}) {
  return (
    <div className="flex items-center" style={{ gap }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="17" fill={light ? '#FFFFFF' : PINK} />
        <text
          x="32"
          y="46"
          textAnchor="middle"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="800"
          fontSize="40"
          fill={light ? PINK : '#FFFFFF'}
        >
          N
        </text>
      </svg>
      {wordmark && (
        <span className={`font-extrabold tracking-tight ${light ? 'text-white' : 'text-[#1A1A1A]'}`} style={{ fontSize: textSize ?? size * 0.62 }}>
          Nelsy
        </span>
      )}
    </div>
  );
}
