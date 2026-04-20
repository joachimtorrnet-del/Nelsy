import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, prefix, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-4 text-gray-500 font-medium text-sm pointer-events-none select-none">
              {prefix}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-xl border-2 bg-white px-4 py-3 text-base text-espresso placeholder-gray-400',
              'focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100',
              'transition-all duration-200',
              'min-h-[44px]',
              error ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-gray-200',
              prefix ? 'pl-16' : '',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
