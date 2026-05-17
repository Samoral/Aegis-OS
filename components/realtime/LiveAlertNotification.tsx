'use client';

// Live Alert Notification Component for AEGIS OS

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveAlert, AlertSeverity } from '@/lib/realtime/types';
import { useAlerts } from '@/lib/realtime/RealtimeContext';
import { X, AlertTriangle, Info, AlertCircle, Bell } from 'lucide-react';

interface LiveAlertNotificationProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  maxVisible?: number;
  autoHideDuration?: number;
  enableSound?: boolean;
}

export function LiveAlertNotification({
  position = 'top-right',
  maxVisible = 3,
  autoHideDuration = 10000,
  enableSound = false,
}: LiveAlertNotificationProps) {
  const { alerts, dismissAlert, markAlertAsRead } = useAlerts();
  const [visibleAlerts, setVisibleAlerts] = useState<LiveAlert[]>([]);

  // Update visible alerts when new alerts arrive
  useEffect(() => {
    const newAlerts = alerts.filter((a) => a.isNew).slice(0, maxVisible);
    setVisibleAlerts(newAlerts);

    // Play sound for critical alerts
    if (enableSound && newAlerts.some((a) => a.severity === 'critical')) {
      playAlertSound();
    }
  }, [alerts, maxVisible, enableSound]);

  // Auto-hide alerts
  useEffect(() => {
    if (autoHideDuration > 0) {
      visibleAlerts.forEach((alert) => {
        const timer = setTimeout(() => {
          handleDismiss(alert.id);
        }, autoHideDuration);

        return () => clearTimeout(timer);
      });
    }
  }, [visibleAlerts, autoHideDuration]);

  const handleDismiss = (alertId: string) => {
    markAlertAsRead(alertId);
    setVisibleAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const playAlertSound = () => {
    // In a real implementation, play an actual sound
    console.log('🔊 Alert sound played');
  };

  const getPositionClasses = () => {
    const positions = {
      'top-right': 'top-4 right-4',
      'top-left': 'top-4 left-4',
      'bottom-right': 'bottom-4 right-4',
      'bottom-left': 'bottom-4 left-4',
    };
    return positions[position];
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 space-y-3 max-w-md`}>
      <AnimatePresence>
        {visibleAlerts.map((alert, index) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            index={index}
            onDismiss={handleDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface AlertCardProps {
  alert: LiveAlert;
  index: number;
  onDismiss: (id: string) => void;
}

function AlertCard({ alert, index, onDismiss }: AlertCardProps) {
  const severityConfig = getSeverityConfig(alert.severity);

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`
        relative overflow-hidden rounded-lg shadow-2xl backdrop-blur-sm
        ${severityConfig.bgColor} ${severityConfig.borderColor}
        border-2 p-4 min-w-[320px] max-w-md
      `}
    >
      {/* Animated background pulse for critical alerts */}
      {alert.severity === 'critical' && (
        <motion.div
          className="absolute inset-0 bg-red-500/20"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`${severityConfig.iconColor}`}>
              {severityConfig.icon}
            </div>
            <span className={`text-xs font-semibold uppercase ${severityConfig.textColor}`}>
              {alert.severity} Alert
            </span>
          </div>
          <button
            onClick={() => onDismiss(alert.id)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-bold text-white text-sm">{alert.title}</h3>
          <p className="text-gray-200 text-xs leading-relaxed">{alert.message}</p>
          
          {/* Location */}
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <span>📍</span>
            <span>{alert.location.address}</span>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-600/50">
            <span>{alert.affectedPopulation.toLocaleString()} affected</span>
            <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
          </div>

          {/* Action required badge */}
          {alert.actionRequired && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded text-yellow-300 text-xs font-semibold"
            >
              <Bell className="w-3 h-3" />
              Action Required
            </motion.div>
          )}
        </div>

        {/* Progress bar for auto-hide */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${severityConfig.progressColor}`}
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 10, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}

function getSeverityConfig(severity: AlertSeverity) {
  const configs = {
    critical: {
      icon: <AlertTriangle className="w-5 h-5" />,
      bgColor: 'bg-red-900/90',
      borderColor: 'border-red-500',
      textColor: 'text-red-300',
      iconColor: 'text-red-400',
      progressColor: 'bg-red-500',
    },
    high: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-orange-900/90',
      borderColor: 'border-orange-500',
      textColor: 'text-orange-300',
      iconColor: 'text-orange-400',
      progressColor: 'bg-orange-500',
    },
    medium: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-yellow-900/90',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-300',
      iconColor: 'text-yellow-400',
      progressColor: 'bg-yellow-500',
    },
    low: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-blue-900/90',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-300',
      iconColor: 'text-blue-400',
      progressColor: 'bg-blue-500',
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-gray-900/90',
      borderColor: 'border-gray-500',
      textColor: 'text-gray-300',
      iconColor: 'text-gray-400',
      progressColor: 'bg-gray-500',
    },
  };

  return configs[severity];
}

// Made with Bob
