import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { INK, PINK } from '../lib/constants';

// Shared pieces for the welcome carousel and the signup flow (Stan-style layout, Nelsy colours).

/** Soft pink tint used for chips, cards and the segmented control. */
export const TINT = '#FDEAF3';
/** Lighter tint for pill inputs. */
export const FIELD = '#FFF5F9';
/** Icon + placeholder pink inside inputs. */
export const FAINT = '#F19BC3';
/** Secondary text. */
export const MUTED = '#8E8A93';

export function PrimaryPill({ children, className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      type="button"
      {...rest}
      className={`flex h-[59px] w-full items-center justify-center rounded-full text-[19px] font-bold text-white transition active:scale-[0.98] disabled:opacity-40 ${className}`}
      style={{ backgroundColor: PINK, ...rest.style }}
    >
      {children}
    </button>
  );
}

export function PillInput({ icon, right, ...rest }: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode; right?: ReactNode }) {
  return (
    <div
      className="flex h-[49px] items-center rounded-full border-2 border-transparent pl-[18px] pr-3 transition focus-within:border-[#F7B6D4]"
      style={{ backgroundColor: FIELD }}
    >
      {icon && (
        <span className="mr-[11px] flex shrink-0 items-center" style={{ color: FAINT }}>
          {icon}
        </span>
      )}
      <input
        {...rest}
        className="h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-[#F19BC3]"
        style={{ color: INK }}
      />
      {right}
    </div>
  );
}

/** Centered title + muted subline, as on every signup screen. */
export function Title({ children, sub, step }: { children: ReactNode; sub?: ReactNode; step?: string }) {
  return (
    <div className="text-center">
      <h1 className="text-[27px] font-extrabold leading-[1.5] tracking-[-0.02em]" style={{ color: INK }}>
        {children}
      </h1>
      {sub && (
        <p className="mt-[14px] text-[16.5px] font-semibold" style={{ color: MUTED }}>
          {sub}
        </p>
      )}
      {step && (
        <p className="mt-[18px] text-[16px] font-semibold" style={{ color: MUTED }}>
          {step}
        </p>
      )}
    </div>
  );
}
