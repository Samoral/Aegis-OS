'use client';

// Realtime Dashboard Component for AEGIS OS

import React from 'react';
import { motion } from 'framer-motion';
import { useMetrics } from '@/lib/realtime/RealtimeContext';
import { 
  AlertTriangle, 
  Users, 
  Radio, 
  Home, 
  Package,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

export function RealtimeDashboard() {
  const metrics = useMetrics();

  const metricCards = [
    {
      title: 'Active Incidents',
      value: metrics.activeIncidents,
      trend: metrics.trend.incidents,
      icon: AlertTriangle,
      color: 'red',
      description: 'Ongoing emergencies',
    },
    {
      title: 'Critical Alerts',
      value: metrics.criticalAlerts,
      trend: metrics.trend.alerts,
      icon: Radio,
      color: 'orange',
      description: 'High priority warnings',
    },
    {
      title: 'People Affected',
      value: metrics.peopleAffected,
      trend: metrics.trend.affected,
      icon: Users,
      color: 'blue',
      description: 'Individuals impacted',
      format: 'number' as const,
    },
    {
      title: 'Active Responders',
      value: metrics.activeResponders,
      trend: 0,
      icon: Users,
      color: 'green',
      description: 'Emergency personnel deployed',
    },
    {
      title: 'Evacuation Centers',
      value: metrics.evacuationCenters,
      trend: 0,
      icon: Home,
      color: 'purple',
      description: 'Safe zones operational',
    },
    {
      title: 'Resources Deployed',
      value: metrics.resourcesDeployed,
      trend: 0,
      icon: Package,
      color: 'cyan',
      description: 'Emergency supplies distributed',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metricCards.map((metric, index) => (
        <MetricCard key={metric.title} metric={metric} index={index} />
      ))}
    </div>
  );
}

interface MetricCardProps {
  metric: {
    title: string;
    value: number;
    trend: number;
    icon: React.ElementType;
    color: string;
    description: string;
    format?: 'number';
  };
  index: number;
}

function MetricCard({ metric, index }: MetricCardProps) {
  const { title, value, trend, icon: Icon, color, description, format } = metric;

  const colorClasses = {
    red: {
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      icon: 'text-red-400',
      text: 'text-red-300',
      glow: 'shadow-red-500/20',
    },
    orange: {
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      icon: 'text-orange-400',
      text: 'text-orange-300',
      glow: 'shadow-orange-500/20',
    },
    blue: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: 'text-blue-400',
      text: 'text-blue-300',
      glow: 'shadow-blue-500/20',
    },
    green: {
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      icon: 'text-green-400',
      text: 'text-green-300',
      glow: 'shadow-green-500/20',
    },
    purple: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      icon: 'text-purple-400',
      text: 'text-purple-300',
      glow: 'shadow-purple-500/20',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      icon: 'text-cyan-400',
      text: 'text-cyan-300',
      glow: 'shadow-cyan-500/20',
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  const formatValue = (val: number) => {
    if (format === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  const getTrendIcon = () => {
    if (trend > 0) return <TrendingUp className="w-4 h-4" />;
    if (trend < 0) return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend > 0) return 'text-red-400';
    if (trend < 0) return 'text-green-400';
    return 'text-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-sm
        ${colors.bg} ${colors.border} ${colors.glow}
        shadow-lg p-6 hover:shadow-xl transition-shadow
      `}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} border`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          
          {trend !== 0 && (
            <div className={`flex items-center gap-1 text-xs font-semibold ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-2"
        >
          <div className="text-3xl font-bold text-white">
            {formatValue(value)}
          </div>
        </motion.div>

        {/* Title and Description */}
        <div>
          <h3 className="text-sm font-semibold text-gray-200 mb-1">{title}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>

        {/* Pulse animation for active metrics */}
        {(title === 'Active Incidents' || title === 'Critical Alerts') && value > 0 && (
          <motion.div
            className={`absolute top-2 right-2 w-2 h-2 rounded-full ${colors.icon}`}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </div>
    </motion.div>
  );
}

// Compact version for smaller displays
export function CompactRealtimeDashboard() {
  const metrics = useMetrics();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      <CompactMetric
        label="Incidents"
        value={metrics.activeIncidents}
        trend={metrics.trend.incidents}
        color="red"
      />
      <CompactMetric
        label="Alerts"
        value={metrics.criticalAlerts}
        trend={metrics.trend.alerts}
        color="orange"
      />
      <CompactMetric
        label="Affected"
        value={metrics.peopleAffected}
        trend={metrics.trend.affected}
        color="blue"
        format="compact"
      />
      <CompactMetric
        label="Responders"
        value={metrics.activeResponders}
        color="green"
      />
      <CompactMetric
        label="Centers"
        value={metrics.evacuationCenters}
        color="purple"
      />
      <CompactMetric
        label="Resources"
        value={metrics.resourcesDeployed}
        color="cyan"
      />
    </div>
  );
}

interface CompactMetricProps {
  label: string;
  value: number;
  trend?: number;
  color: string;
  format?: 'compact';
}

function CompactMetric({ label, value, trend, color, format }: CompactMetricProps) {
  const formatValue = (val: number) => {
    if (format === 'compact') {
      if (val >= 1000000) return `${(val / 1000000).toFixed(1)}M`;
      if (val >= 1000) return `${(val / 1000).toFixed(1)}K`;
    }
    return val.toLocaleString();
  };

  const colorClasses = {
    red: 'bg-red-500/10 border-red-500/30 text-red-300',
    orange: 'bg-orange-500/10 border-orange-500/30 text-orange-300',
    blue: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    green: 'bg-green-500/10 border-green-500/30 text-green-300',
    purple: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    cyan: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
  };

  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <motion.div
      key={value}
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`rounded-lg border backdrop-blur-sm p-3 ${colors}`}
    >
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="flex items-baseline justify-between">
        <div className="text-xl font-bold">{formatValue(value)}</div>
        {trend !== undefined && trend !== 0 && (
          <div className={`text-xs ${trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Made with Bob
