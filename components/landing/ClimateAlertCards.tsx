'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Cloud, Flame, Waves, Wind, Zap } from 'lucide-react';

interface Alert {
  id: string;
  type: 'wildfire' | 'flood' | 'hurricane' | 'earthquake' | 'storm' | 'heatwave';
  severity: 'critical' | 'high' | 'medium';
  location: string;
  description: string;
  affected: string;
  time: string;
  icon: React.ReactNode;
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'wildfire',
    severity: 'critical',
    location: 'California, USA',
    description: 'Rapid wildfire spreading across 2,400 acres',
    affected: '12,000 residents',
    time: '2 min ago',
    icon: <Flame className="w-5 h-5" />,
  },
  {
    id: '2',
    type: 'flood',
    severity: 'high',
    location: 'Bangladesh',
    description: 'Severe flooding due to monsoon rains',
    affected: '45,000 residents',
    time: '15 min ago',
    icon: <Waves className="w-5 h-5" />,
  },
  {
    id: '3',
    type: 'hurricane',
    severity: 'critical',
    location: 'Gulf of Mexico',
    description: 'Category 4 hurricane approaching coastline',
    affected: '200,000 residents',
    time: '32 min ago',
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: '4',
    type: 'earthquake',
    severity: 'high',
    location: 'Tokyo, Japan',
    description: 'Magnitude 6.2 earthquake detected',
    affected: '1.2M residents',
    time: '1 hour ago',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: '5',
    type: 'storm',
    severity: 'medium',
    location: 'North Atlantic',
    description: 'Severe thunderstorm with heavy rainfall',
    affected: '8,500 residents',
    time: '2 hours ago',
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    id: '6',
    type: 'heatwave',
    severity: 'high',
    location: 'Phoenix, Arizona',
    description: 'Extreme heat warning - 118°F expected',
    affected: '1.7M residents',
    time: '3 hours ago',
    icon: <AlertTriangle className="w-5 h-5" />,
  },
];

const severityColors = {
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    glow: 'shadow-red-500/20',
  },
  high: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
  medium: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/20',
  },
};

export default function ClimateAlertCards() {
  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-bold text-white mb-2">Active Climate Alerts</h2>
        <p className="text-gray-400">Real-time emergency monitoring across 247 regions</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {alerts.map((alert, index) => {
          const colors = severityColors[alert.severity];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`glass rounded-xl p-5 border ${colors.border} hover:shadow-xl ${colors.glow} transition-all duration-300 cursor-pointer`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${colors.bg}`}>
                  <div className={colors.text}>{alert.icon}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase ${colors.bg} ${colors.text} border ${colors.border}`}
                  >
                    {alert.severity}
                  </span>
                  {alert.severity === 'critical' && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')}`}
                    />
                  )}
                </div>
              </div>

              {/* Location */}
              <h3 className="text-white font-semibold text-lg mb-2">{alert.location}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{alert.description}</p>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-xs text-gray-400">{alert.affected} affected</span>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>

              {/* Progress indicator for critical alerts */}
              {alert.severity === 'critical' && (
                <div className="mt-3 relative h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className={`absolute inset-0 w-1/3 ${colors.text.replace('text-', 'bg-')}`}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-6 text-center"
      >
        <button className="glass-strong px-6 py-3 rounded-lg text-white font-medium hover:glass transition-all duration-300 inline-flex items-center gap-2">
          View All Alerts
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </button>
      </motion.div>
    </div>
  );
}

// Made with Bob