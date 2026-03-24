import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'signal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90',
      secondary: 'bg-surface-highest text-white hover:bg-white/10',
      outline: 'border border-outline-variant/30 text-white/60 hover:text-white hover:bg-surface-container',
      ghost: 'text-white/60 hover:text-white hover:bg-surface-high',
      signal: 'signal-gradient text-white hover:opacity-90',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-[10px]',
      md: 'px-4 py-2 text-xs',
      lg: 'px-6 py-3 text-sm',
      xl: 'px-8 py-4 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-headline font-bold uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
