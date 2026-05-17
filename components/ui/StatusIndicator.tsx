'use client';

import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface StatusIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  status: 'critical' | 'warning' | 'normal' | 'info' | 'success' | 'danger' | 'default';
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusIndicator({
  status,
  pulse = true,
  size = 'md',
  className,
  ...props
}: StatusIndicatorProps) {
  const statusClasses = {
    critical: 'status-critical',
    warning: 'status-warning',
    normal: 'status-normal',
    info: 'status-info',
    success: 'status-normal',
    danger: 'status-critical',
    default: 'bg-gray-400',
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <span
      className={cn(
        'status-indicator',
        statusClasses[status],
        sizeClasses[size],
        !pulse && 'before:hidden',
        className
      )}
      {...props}
    />
  );
}

// Made with Bob
