'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Clock, TrendingUp } from 'lucide-react';

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const stats: Stat[] = [
  {
    label: 'Lives Saved',
    value: 247893,
    suffix: '+',
    icon: <Users className="w-6 h-6" />,
    color: '#22c55e',
    description: 'Through coordinated response',
  },
  {
    label: 'Active Regions',
    value: 247,
    suffix: '',
    icon: <MapPin className="w-6 h-6" />,
    color: '#3b82f6',
    description: 'Real-time monitoring',
  },
  {
    label: 'Avg Response Time',
    value: 4.2,
    suffix: 'min',
    icon: <Clock className="w-6 h-6" />,
    color: '#f59e0b',
    description: 'Emergency deployment',
  },
  {
    label: 'Success Rate',
    value: 94.7,
    suffix: '%',
    icon: <TrendingUp className="w-6 h-6" />,
    color: '#8b5cf6',
    description: 'Mission completion',
  },
];

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(value * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function EmergencyStats() {
  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Global Impact in Real-Time
        </h2>
        <p className="text-gray-400 text-lg">
          Powered by AI-driven intelligence and coordinated response systems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-strong rounded-2xl p-6 hover-lift relative overflow-hidden group"
          >
            {/* Background gradient effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at center, ${stat.color}, transparent)`,
              }}
            />

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="inline-flex p-3 rounded-xl mb-4"
              style={{ backgroundColor: `${stat.color}20` }}
            >
              <div style={{ color: stat.color }}>{stat.icon}</div>
            </motion.div>

            {/* Value */}
            <div className="mb-2">
              <div className="flex items-baseline gap-1">
                <motion.span
                  className="text-4xl font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <AnimatedCounter value={stat.value} />
                </motion.span>
                <span className="text-2xl font-semibold" style={{ color: stat.color }}>
                  {stat.suffix}
                </span>
              </div>
            </div>

            {/* Label */}
            <h3 className="text-lg font-semibold text-white mb-1">{stat.label}</h3>
            <p className="text-sm text-gray-400">{stat.description}</p>

            {/* Animated border */}
            <motion.div
              className="absolute bottom-0 left-0 h-1 rounded-full"
              style={{ backgroundColor: stat.color }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
            />

            {/* Pulse effect for first stat */}
            {index === 0 && (
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 rounded-full"
                style={{ backgroundColor: stat.color }}
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Additional Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 glass rounded-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400 mb-1">24/7</div>
            <div className="text-sm text-gray-400">Continuous Monitoring</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 mb-1">AI-Powered</div>
            <div className="text-sm text-gray-400">Predictive Analytics</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400 mb-1">Global</div>
            <div className="text-sm text-gray-400">Coordinated Response</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Made with Bob