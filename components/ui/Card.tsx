'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'default' | 'strong' | 'subtle';
  interactive?: boolean;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      interactive = false,
      hover = false,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'glass',
      strong: 'glass-strong',
      subtle: 'glass-subtle',
    };

    const baseClassName = cn(
      'rounded-xl p-6',
      variants[variant],
      interactive && 'cursor-pointer',
      hover && 'hover-lift',
      className
    );

    if (interactive || hover) {
      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ duration: 0.2 }}
          {...(props as Omit<HTMLMotionProps<'div'>, 'ref'>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        className={baseClassName}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

// Made with Bob
