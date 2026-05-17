'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';
import { PreparednessScore } from '@/types/safevault';

interface PreparednessGaugeProps {
  score: PreparednessScore;
  className?: string;
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'excellent':
      return 'text-green-400';
    case 'good':
      return 'text-cyan-400';
    case 'moderate':
      return 'text-yellow-400';
    case 'low':
      return 'text-orange-400';
    case 'critical':
      return 'text-red-400';
    default:
      return 'text-gray-400';
  }
};

const getLevelGradient = (level: string) => {
  switch (level) {
    case 'excellent':
      return 'from-green-500 to-emerald-500';
    case 'good':
      return 'from-cyan-500 to-blue-500';
    case 'moderate':
      return 'from-yellow-500 to-amber-500';
    case 'low':
      return 'from-orange-500 to-red-500';
    case 'critical':
      return 'from-red-500 to-rose-600';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

export default function PreparednessGauge({ score, className = '' }: PreparednessGaugeProps) {
  const circumference = 2 * Math.PI * 120;
  const offset = circumference - (score.overall / 100) * circumference;

  return (
    <div className={`relative ${className}`}>
      {/* Main Gauge */}
      <div className="relative w-80 h-80 mx-auto">
        {/* Background Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="120"
            stroke="currentColor"
            strokeWidth="20"
            fill="none"
            className="text-white/10"
          />
          {/* Progress Circle */}
          <motion.circle
            cx="160"
            cy="160"
            r="120"
            stroke="url(#gradient)"
            strokeWidth="20"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" className={`${getLevelGradient(score.level).split(' ')[0].replace('from-', 'stop-')}`} />
              <stop offset="100%" className={`${getLevelGradient(score.level).split(' ')[1].replace('to-', 'stop-')}`} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center"
          >
            <Shield className={`w-12 h-12 mx-auto mb-2 ${getLevelColor(score.level)}`} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="text-6xl font-bold text-white mb-2"
            >
              {score.overall}
            </motion.div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">
              Preparedness Score
            </div>
            <div className={`text-lg font-semibold mt-2 uppercase ${getLevelColor(score.level)}`}>
              {score.level}
            </div>
          </motion.div>
        </div>

        {/* Pulse Effect */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className={`absolute inset-0 rounded-full bg-gradient-to-r ${getLevelGradient(score.level)} blur-2xl opacity-20`}
        />
      </div>

      {/* Score Breakdown */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <ScoreCard
          label="Financial"
          score={score.financial}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <ScoreCard
          label="Supplies"
          score={score.supplies}
          icon={<Shield className="w-5 h-5" />}
        />
        <ScoreCard
          label="Knowledge"
          score={score.knowledge}
          icon={<Shield className="w-5 h-5" />}
        />
        <ScoreCard
          label="Communication"
          score={score.communication}
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      {/* Recommendations */}
      {score.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="mt-6 glass-strong rounded-2xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            {score.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 1.7 + index * 0.1 }}
                className="text-gray-300 text-sm flex items-start gap-2"
              >
                <span className="text-cyan-400 mt-1">•</span>
                <span>{rec}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

interface ScoreCardProps {
  label: string;
  score: number;
  icon: React.ReactNode;
}

function ScoreCard({ label, score, icon }: ScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-strong rounded-xl p-4 hover:glass-hover transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className="text-cyan-400">{icon}</span>
      </div>
      <div className="text-2xl font-bold text-white">{score}</div>
      <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
        />
      </div>
    </motion.div>
  );
}

// Made with Bob