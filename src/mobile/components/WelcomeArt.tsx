import type { CSSProperties, ReactNode } from 'react';
import { Bell, Check } from 'lucide-react';
import { INK, PINK } from '../lib/constants';
import { TINT } from './onboardingUi';

// Illustrations for the welcome carousel: product UI with example figures, labeled "Example" on the panel.
// Layout follows a 390 px wide stage; cards are placed from the stage centre so they overlap the panel edges.

const PANEL = '#FBE3EE';
const SHADOW = '0 12px 32px rgba(26,26,26,0.10)';

function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[344px] w-full max-w-[390px]">
      <div className="absolute left-1/2 top-0 h-[344px] w-[184px] -translate-x-1/2 rounded-[32px]" style={{ backgroundColor: PANEL }}>
        <span className="absolute bottom-3 left-0 right-0 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-[#D98CB1]">
          Example
        </span>
      </div>
      {children}
    </div>
  );
}

/** Absolute position from the stage centre (x) and top (y), in px. */
const at = (x: number, y: number, extra?: CSSProperties): CSSProperties => ({ position: 'absolute', left: `calc(50% + ${x}px)`, top: y, ...extra });

function AppIcon({ size = 24 }: { size?: number }) {
  return (
    <span className="relative flex shrink-0 items-center justify-center rounded-[7px] font-extrabold text-white" style={{ width: size, height: size, backgroundColor: PINK, fontSize: size * 0.58 }}>
      N
      <span className="absolute -right-1.5 -top-1.5 flex h-[13px] w-[13px] items-center justify-center rounded-full border-[1.5px] border-white bg-[#22C55E]">
        <Check size={7} strokeWidth={4} className="text-white" />
      </span>
    </span>
  );
}

const AVATARS: [string, string][] = [
  ['AL', '#F9B7D6'],
  ['MK', '#FFD9A8'],
  ['JS', '#C9E7D8'],
  ['RB', '#D6D3F5'],
];

export function ArtRevenue() {
  return (
    <Stage>
      {/* Total revenue card */}
      <div className="overflow-hidden rounded-[14px] bg-white" style={at(-89, 71, { width: 218, height: 135, boxShadow: SHADOW })}>
        <p className="pl-4 pt-[14px] text-[12.5px] font-medium text-[#8E8A93]">Total revenue</p>
        <p className="pl-4 text-[25px] font-extrabold leading-tight tracking-tight" style={{ color: INK }}>$1,284.50</p>
        <svg viewBox="0 0 218 135" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="nelsy-rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PINK} stopOpacity="0.28" />
              <stop offset="100%" stopColor={PINK} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M76 98 L96 92 L108 88 L118 88 L128 83 L138 80 L146 72 L152 67 L162 66 L170 60 L178 49 L186 46 L194 46 L200 40 L204 25 L211 20 L211 135 L76 135 Z" fill="url(#nelsy-rev)" />
          <path d="M76 98 L96 92 L108 88 L118 88 L128 83 L138 80 L146 72 L152 67 L162 66 L170 60 L178 49 L186 46 L194 46 L200 40 L204 25 L211 20" fill="none" stroke={PINK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>

      {/* Payment notification */}
      <div className="flex items-center gap-2.5 rounded-[12px] bg-white px-2.5" style={at(-171, 143, { width: 158, height: 47, boxShadow: SHADOW })}>
        <AppIcon />
        <p className="whitespace-nowrap text-[10px] font-medium leading-[1.35] tracking-[-0.01em]" style={{ color: INK }}>
          You received $45.00
          <br />
          for Gel-X full set!
        </p>
      </div>

      {/* Avatar stack */}
      <div className="flex" style={at(-127, 219)}>
        {AVATARS.map(([i, c], n) => (
          <span key={i} className="flex h-[25px] w-[25px] items-center justify-center rounded-full border-2 border-white text-[8px] font-bold" style={{ backgroundColor: c, color: INK, marginLeft: n ? -4 : 0 }}>
            {i}
          </span>
        ))}
      </div>


      {/* Booking card */}
      <div className="flex items-center gap-3 rounded-[10px] bg-white p-2" style={at(-2, 182, { width: 186, height: 80, boxShadow: SHADOW, transform: 'rotate(1.5deg)' })}>
        <div className="flex h-[60px] w-[58px] shrink-0 items-center justify-center rounded-[7px] text-[28px]" style={{ background: 'linear-gradient(140deg, #FFD3E8, #F78FC0)' }}>
          💅
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[9.5px] font-bold" style={{ color: INK }}>Gel-X full set</p>
          <p className="text-[9px] font-medium text-[#5A5560]">$45 · 90 min</p>
          <span className="mt-1.5 flex h-[24px] items-center justify-center gap-1 rounded-full text-[8.5px] font-semibold text-white" style={{ backgroundColor: PINK }}>
            Book now →
          </span>
        </div>
      </div>
      {/* Rating chip (above the booking card) */}
      <span className="flex items-center gap-1 rounded-[4px] bg-[#FFE27A] px-2 text-[10px] font-bold" style={at(-24, 223, { height: 18, color: INK })}>
        ★ 5.0
      </span>
    </Stage>
  );
}

const CONFETTI: [number, number, string, number][] = [
  [-120, 104, '#2BD4A0', 7],
  [-66, 118, '#F43F5E', 7],
  [-122, 165, '#FACC15', 10],
  [77, 73, '#F43F5E', 10],
  [94, 106, '#FB923C', 7],
  [64, 121, '#FB923C', 7],
  [111, 182, '#3B82F6', 7],
  [-104, 240, '#F43F5E', 10],
  [-74, 234, '#F9A8D4', 7],
  [58, 238, '#FACC15', 7],
  [88, 233, '#3B82F6', 7],
  [107, 259, '#2BD4A0', 10],
];

export function ArtCashout() {
  return (
    <Stage>
      {CONFETTI.map(([x, y, c, s], i) => (
        <span key={i} className="rounded-[2px]" style={at(x, y, { width: s, height: s, backgroundColor: c, transform: 'rotate(45deg)' })} />
      ))}
      <span className="text-[78px] leading-none" style={at(-45, 60)} aria-hidden="true">
        🎉
      </span>
      <div className="flex items-center justify-center rounded-[16px]" style={at(-144, 137, { width: 288, height: 87, backgroundColor: '#FFF4F9', boxShadow: SHADOW })}>
        <span className="text-[44px] font-extrabold tracking-tight" style={{ color: PINK }}>$193.47</span>
      </div>
      <span className="flex items-center justify-center gap-1.5 rounded-full text-[14px] font-bold" style={at(-38, 235, { width: 76, height: 31, backgroundColor: '#2BD4A0', color: INK, boxShadow: '0 8px 18px rgba(43,212,160,0.35)' })}>
        ▲ 8.5%
      </span>
    </Stage>
  );
}

export function ArtNotifs() {
  return (
    <Stage>
      <Bell size={38} strokeWidth={1.6} style={at(-19, 54, { color: '#F290BE' })} />
      <div className="flex items-center rounded-[20px] px-[17px]" style={at(-172, 112, { width: 344, height: 78, backgroundColor: '#FFF4F9', boxShadow: SHADOW })}>
        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[11px] text-[28px]" style={{ backgroundColor: PINK }}>
          📅
        </span>
        <span className="ml-[18px] flex-1 text-[20px] font-bold tracking-tight" style={{ color: INK }}>New booking!</span>
        <span className="text-[16px] font-medium text-[#E58BB5]">Now</span>
      </div>
      <div className="flex items-center rounded-[14px] px-[13px]" style={at(-129, 205, { width: 258, height: 64, backgroundColor: '#FFF4F9', boxShadow: SHADOW })}>
        <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[8px] text-[22px]" style={{ backgroundColor: TINT }}>
          💰
        </span>
        <span className="ml-[14px] text-[16px] font-semibold" style={{ color: INK }}>You got paid</span>
      </div>
    </Stage>
  );
}
