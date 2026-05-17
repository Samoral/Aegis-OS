'use client';

import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'default' | 'dots' | 'pulse' | 'orbit';
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  className,
  variant = 'default',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center gap-2', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn('rounded-full bg-cyan-500', size === 'sm' ? 'w-2 h-2' : size === 'lg' ? 'w-4 h-4' : 'w-3 h-3')}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        {text && <span className="ml-2 text-sm text-white/70">{text}</span>}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
        <motion.div
          className={cn('rounded-full bg-gradient-to-br from-cyan-500 to-blue-600', sizeClasses[size])}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {text && <span className="text-sm text-white/70 animate-pulse">{text}</span>}
      </div>
    );
  }

  if (variant === 'orbit') {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
        <div className={cn('relative', sizeClasses[size])}>
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-cyan-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `0.5rem ${size === 'sm' ? '0.5rem' : size === 'lg' ? '1.5rem' : size === 'xl' ? '2rem' : '1rem'}` }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-500/30"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute top-0 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full bg-blue-500"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `0.5rem ${size === 'sm' ? '0.5rem' : size === 'lg' ? '1.5rem' : size === 'xl' ? '2rem' : '1rem'}` }}
          />
        </div>
        {text && <span className="text-sm text-white/70">{text}</span>}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={cn('text-cyan-500', sizeClasses[size])} />
      </motion.div>
      {text && <span className="text-sm text-white/70">{text}</span>}
    </div>
  );
}

// Full Page Loading Component
export function FullPageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-gray-950/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-premium rounded-2xl p-8 flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" variant="orbit" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white mb-1">{text}</h3>
          <p className="text-sm text-white/60">Please wait...</p>
        </div>
      </div>
    </div>
  );
}

// Made with Bob