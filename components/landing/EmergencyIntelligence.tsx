'use client';

import { motion } from 'framer-motion';
import { Activity, TrendingUp, AlertTriangle, Shield } from 'lucide-react';

interface IntelData {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
}

const intelligenceData: IntelData[] = [
  {
    label: 'Threat Level',
    value: 67,
    max: 100,
    color: '#ef4444',
    icon: <AlertTriangle className="w-4 h-4" />,
    trend: 'down',
  },
  {
    label: 'Response Rate',
    value: 94,
    max: 100,
    color: '#22c55e',
    icon: <Activity className="w-4 h-4" />,
    trend: 'up',
  },
  {
    label: 'Active Missions',
    value: 23,
    max: 50,
    color: '#3b82f6',
    icon: <Shield className="w-4 h-4" />,
    trend: 'stable',
  },
  {
    label: 'AI Efficiency',
    value: 89,
    max: 100,
    color: '#8b5cf6',
    icon: <TrendingUp className="w-4 h-4" />,
    trend: 'up',
  },
];

export default function EmergencyIntelligence() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      {intelligenceData.map((data, index) => (
        <motion.div
          key={data.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass rounded-xl p-5 hover-lift"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${data.color}20` }}
              >
                <div style={{ color: data.color }}>{data.icon}</div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">{data.label}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-bold" style={{ color: data.color }}>
                    {data.value}
                  </span>
                  <span className="text-xs text-gray-400">/ {data.max}</span>
                </div>
              </div>
            </div>

            {/* Trend Indicator */}
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                data.trend === 'up'
                  ? 'bg-green-500/20 text-green-400'
                  : data.trend === 'down'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-500/20 text-gray-400'
              }`}
            >
              {data.trend === 'up' && '↑'}
              {data.trend === 'down' && '↓'}
              {data.trend === 'stable' && '→'}
              <span className="capitalize">{data.trend}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(data.value / data.max) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
              className="h-full rounded-full relative"
              style={{ backgroundColor: data.color }}
            >
              {/* Animated shine effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 w-1/2"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                }}
              />
            </motion.div>
          </div>

          {/* Mini Chart */}
          <div className="mt-4 flex items-end justify-between h-12 gap-1">
            {Array.from({ length: 12 }).map((_, i) => {
              const height = Math.random() * 60 + 40;
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 + i * 0.05 }}
                  className="flex-1 rounded-t"
                  style={{
                    backgroundColor: `${data.color}40`,
                    minWidth: '4px',
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Made with Bob