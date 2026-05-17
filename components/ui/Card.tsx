'use client';

import { HTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
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

    const Component = interactive || hover ? motion.div : 'div';
    const motionProps = interactive || hover
      ? {
          whileHover: { scale: 1.02, y: -4 },
          transition: { duration: 0.2 },
        }
      : {};

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-xl p-6',
          variants[variant],
          interactive && 'cursor-pointer',
          hover && 'hover-lift',
          className
        )}
        {...(interactive || hover ? motionProps : {})}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export default Card;

// Made with Bob
