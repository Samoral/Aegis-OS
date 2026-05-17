'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'danger' | 'warning' | 'success' | 'default';
  withDot?: boolean;
}

export default function Badge({
  className,
  variant = 'primary',
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'badge-primary',
    danger: 'badge-danger',
    warning: 'badge-warning',
    success: 'badge-success',
    default: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100',
  };

  return (
    <span className={cn('badge', variants[variant], className)} {...props}>
      {withDot && <span className="status-indicator" />}
      {children}
    </span>
  );
}

// Made with Bob
