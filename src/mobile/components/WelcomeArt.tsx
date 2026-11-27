import type { ReactNode } from 'react';
import { PINK } from '../lib/constants';

// Illustrative mocks for the welcome carousel. Example data only, labeled as such.

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto w-[220px] rounded-[30px] border-[6px] border-[#1A1A1A] bg-white p-3 shadow-[0_24px_60px_rgba(245,43,140,0.25)]">
      <span className="absolute -right-3 -top-3 rounded-full bg-[#1A1A1A] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
        Example
      </span>
      {children}
    </div>
  );
}

export function ArtBookingPage() {
  return (
    <Frame>
      <div className="h-16 rounded-2xl" style={{ background: `linear-gradient(135deg, #FFD3E8, ${PINK})` }} />
      <div className="-mt-6 flex flex-col items-center">
        <div className="h-12 w-12 rounded-full border-[3px] border-white bg-[#F9B7D6]" />
        <p className="mt-1 text-[12px] font-bold">Your Studio</p>
        <p className="text-[9px] text-gray-400">getnelsy.com/yourname</p>
      </div>
      {[
        ['Gel manicure', '$45'],
        ['Lash lift', '$60'],
        ['Brow shaping', '$25'],
      ].map(([n, p]) => (
        <div key={n} className="mt-2 flex items-center gap-2 rounded-xl border border-gray-100 p-2">
          <div className="h-7 w-7 rounded-lg bg-[#FFE3F0]" />
          <div className="flex-1">
            <p className="text-[10px] font-semibold">{n}</p>
            <p className="text-[9px] text-gray-400">{p}</p>
          </div>
          <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: PINK }}>
            Book
          </span>
        </div>
      ))}
    </Frame>
  );
}

export function ArtBookings() {
  return (
    <Frame>
      <p className="px-1 text-[12px] font-extrabold">Today</p>
      {[
        ['10:00', 'Client A', 'Confirmed', '#E5F0FF', '#1F4FB8'],
        ['13:30', 'Client B', 'Deposit paid', '#E3F7EC', '#11733F'],
        ['16:00', 'Client C', 'Pending', '#FFF4DB', '#8A5A00'],
      ].map(([t, n, s, bg, fg]) => (
        <div key={t} className="mt-2 flex items-center gap-2 rounded-xl border border-gray-100 p-2">
          <span className="w-8 text-[10px] font-bold text-gray-500">{t}</span>
          <div className="flex-1">
            <p className="text-[10px] font-semibold">{n}</p>
            <p className="text-[9px] text-gray-400">Gel manicure</p>
          </div>
          <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ backgroundColor: bg, color: fg }}>
            {s}
          </span>
        </div>
      ))}
      <div className="mt-3 rounded-xl p-2 text-white" style={{ backgroundColor: PINK }}>
        <p className="text-[9px] font-semibold opacity-90">New booking</p>
        <p className="text-[10px] font-bold">Client D booked Lash lift</p>
      </div>
    </Frame>
  );
}

export function ArtRevenue() {
  return (
    <Frame>
      <p className="px-1 text-[9px] font-semibold text-gray-400">Total revenue</p>
      <p className="px-1 text-[20px] font-extrabold">$1,240</p>
      <svg viewBox="0 0 180 60" className="mt-1 h-14 w-full">
        <path d="M0,50 L25,42 L50,46 L75,30 L100,34 L125,18 L150,22 L180,8 L180,60 L0,60 Z" fill={PINK} opacity="0.15" />
        <path d="M0,50 L25,42 L50,46 L75,30 L100,34 L125,18 L150,22 L180,8" fill="none" stroke={PINK} strokeWidth="2.5" />
      </svg>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-gray-50 p-2">
          <p className="text-[8px] text-gray-400">Bookings</p>
          <p className="text-[13px] font-extrabold">24</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-2">
          <p className="text-[8px] text-gray-400">Deposits</p>
          <p className="text-[13px] font-extrabold">$360</p>
        </div>
      </div>
    </Frame>
  );
}
