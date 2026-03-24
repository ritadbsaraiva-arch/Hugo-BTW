import React from 'react';
import { cn } from '../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'low' | 'high' | 'highest' | 'glass';
  border?: 'none' | 'left' | 'right' | 'bottom' | 'top';
  borderColor?: 'primary' | 'tertiary' | 'outline';
  children?: React.ReactNode;
  className?: string;
}

export const Card = ({ 
  className, 
  variant = 'default', 
  border = 'none',
  borderColor = 'primary',
  children, 
  ...props 
}: CardProps) => {
  const variants = {
    default: 'bg-surface-container',
    low: 'bg-surface-low',
    high: 'bg-surface-high',
    highest: 'bg-surface-highest',
    glass: 'glass-hud',
  };

  const borders = {
    none: '',
    left: cn('border-l-2', borderColor === 'primary' ? 'border-primary' : borderColor === 'tertiary' ? 'border-tertiary' : 'border-outline-variant'),
    right: cn('border-r-2', borderColor === 'primary' ? 'border-primary' : borderColor === 'tertiary' ? 'border-tertiary' : 'border-outline-variant'),
    bottom: cn('border-b-2', borderColor === 'primary' ? 'border-primary' : borderColor === 'tertiary' ? 'border-tertiary' : 'border-outline-variant'),
    top: cn('border-t-2', borderColor === 'primary' ? 'border-primary' : borderColor === 'tertiary' ? 'border-tertiary' : 'border-outline-variant'),
  };

  return (
    <div
      className={cn(
        variants[variant],
        borders[border],
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
