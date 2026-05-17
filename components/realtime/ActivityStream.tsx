'use client';

// Activity Stream Component for AEGIS OS

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivityStream } from '@/lib/realtime/RealtimeContext';
import { ActivityStreamItem, ActivityType } from '@/lib/realtime/types';
import {
  AlertTriangle,
  Info,
  RefreshCw,
  CheckCircle,
  Users,
  Package,
  Clock,
  Trash2,
  Radio
} from 'lucide-react';

interface ActivityStreamProps {
  maxItems?: number;
  showTimestamps?: boolean;
  autoScroll?: boolean;
  compact?: boolean;
}

export function ActivityStream({
  maxItems = 20,
  showTimestamps = true,
  autoScroll = true,
  compact = false,
}: ActivityStreamProps) {
  const { activityStream, clearActivityStream } = useActivityStream();
  const streamRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new items arrive
  useEffect(() => {
    if (autoScroll && streamRef.current) {
      streamRef.current.scrollTop = streamRef.current.scrollHeight;
    }
  }, [activityStream, autoScroll]);

  const displayedActivities = activityStream.slice(0, maxItems);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Radio className="w-5 h-5 text-blue-400" />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h3 className="text-lg font-semibold text-white">Live Activity</h3>
          <span className="text-xs text-gray-400">
            ({activityStream.length} events)
          </span>
        </div>
        
        {activityStream.length > 0 && (
          <button
            onClick={clearActivityStream}
            className="flex items-center gap-1 px-3 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
            aria-label="Clear activity stream"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Activity List */}
      <div
        ref={streamRef}
        className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        {displayedActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Info className="w-12 h-12 mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {displayedActivities.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                index={index}
                showTimestamp={showTimestamps}
                compact={compact}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

interface ActivityItemProps {
  activity: ActivityStreamItem;
  index: number;
  showTimestamp: boolean;
  compact: boolean;
}

function ActivityItem({ activity, index, showTimestamp, compact }: ActivityItemProps) {
  const config = getActivityConfig(activity.type, activity.severity);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, height: 0 }}
      animate={{ opacity: 1, x: 0, height: 'auto' }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      className={`
        relative overflow-hidden rounded-lg border backdrop-blur-sm
        ${config.bgColor} ${config.borderColor}
        ${compact ? 'p-2' : 'p-3'}
        hover:shadow-lg transition-shadow
      `}
    >
      {/* Animated border for new items */}
      {index === 0 && (
        <motion.div
          className={`absolute inset-0 border-2 ${config.borderColor} rounded-lg`}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2 }}
        />
      )}

      <div className="relative z-10 flex items-start gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          {config.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className={`font-semibold text-white ${compact ? 'text-xs' : 'text-sm'}`}>
                {activity.title}
              </h4>
              {!compact && (
                <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                  {activity.description}
                </p>
              )}
            </div>
            
            {showTimestamp && (
              <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                <Clock className="w-3 h-3" />
                <span>{formatTimestamp(activity.timestamp)}</span>
              </div>
            )}
          </div>

          {/* Location */}
          {activity.location && !compact && (
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
              <span>📍</span>
              <span className="truncate">{activity.location}</span>
            </div>
          )}

          {/* Metadata badges */}
          {activity.metadata && !compact && (
            <div className="flex items-center gap-2 mt-2">
              {activity.metadata.automated && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Automated
                </span>
              )}
              {activity.metadata.region && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-700/50 text-gray-300">
                  {activity.metadata.region}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function getActivityConfig(type: ActivityType, severity: string) {
  const severityColors = {
    critical: {
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-500/30',
      iconColor: 'text-red-400',
    },
    high: {
      bgColor: 'bg-orange-900/20',
      borderColor: 'border-orange-500/30',
      iconColor: 'text-orange-400',
    },
    medium: {
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-500/30',
      iconColor: 'text-yellow-400',
    },
    low: {
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    info: {
      bgColor: 'bg-gray-900/20',
      borderColor: 'border-gray-500/30',
      iconColor: 'text-gray-400',
    },
  };

  const typeIcons: Record<ActivityType, React.ReactNode> = {
    alert: <AlertTriangle className="w-5 h-5" />,
    incident: <AlertTriangle className="w-5 h-5" />,
    update: <RefreshCw className="w-5 h-5" />,
    resolution: <CheckCircle className="w-5 h-5" />,
    evacuation: <Users className="w-5 h-5" />,
    resource_deployment: <Package className="w-5 h-5" />,
  };

  const colors = severityColors[severity as keyof typeof severityColors] || severityColors.info;

  return {
    ...colors,
    icon: typeIcons[type],
  };
}

function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return new Date(timestamp).toLocaleDateString();
}

// Compact version for sidebars
export function CompactActivityStream() {
  return (
    <ActivityStream
      maxItems={10}
      showTimestamps={false}
      autoScroll={true}
      compact={true}
    />
  );
}


// Made with Bob
