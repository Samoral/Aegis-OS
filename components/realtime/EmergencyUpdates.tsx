'use client';

// Animated Emergency Updates Component for AEGIS OS

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIncidents } from '@/lib/realtime/RealtimeContext';
import { IncidentFeedItem, IncidentStatus } from '@/lib/realtime/types';
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  MapPin,
  Users,
  Clock,
  ChevronDown,
  ChevronUp,
  Activity
} from 'lucide-react';

interface EmergencyUpdatesProps {
  maxIncidents?: number;
  showUpdates?: boolean;
  autoExpand?: boolean;
}

export function EmergencyUpdates({
  maxIncidents = 10,
  showUpdates = true,
  autoExpand = false,
}: EmergencyUpdatesProps) {
  const { incidents } = useIncidents();
  const [expandedIncidents, setExpandedIncidents] = useState<Set<string>>(
    autoExpand ? new Set(incidents.slice(0, 3).map(i => i.id)) : new Set()
  );

  const displayedIncidents = incidents.slice(0, maxIncidents);

  const toggleIncident = (incidentId: string) => {
    setExpandedIncidents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(incidentId)) {
        newSet.delete(incidentId);
      } else {
        newSet.add(incidentId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <h2 className="text-xl font-bold text-white">Emergency Incidents</h2>
          <span className="px-2 py-1 text-xs font-semibold bg-red-500/20 text-red-300 rounded-full border border-red-500/30">
            {incidents.length} Active
          </span>
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-3">
        {displayedIncidents.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No active incidents</p>
          </div>
        ) : (
          <AnimatePresence>
            {displayedIncidents.map((incident, index) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                index={index}
                isExpanded={expandedIncidents.has(incident.id)}
                onToggle={() => toggleIncident(incident.id)}
                showUpdates={showUpdates}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

interface IncidentCardProps {
  incident: IncidentFeedItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  showUpdates: boolean;
}

function IncidentCard({ incident, index, isExpanded, onToggle, showUpdates }: IncidentCardProps) {
  const statusConfig = getStatusConfig(incident.status);
  const severityConfig = getSeverityConfig(incident.severity);
  const trendConfig = getTrendConfig(incident.trend);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`
        relative overflow-hidden rounded-xl border backdrop-blur-sm
        ${severityConfig.bgColor} ${severityConfig.borderColor}
        shadow-lg hover:shadow-xl transition-all
      `}
    >
      {/* Animated background for escalating incidents */}
      {incident.status === 'escalating' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      )}

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 text-xs font-semibold rounded ${statusConfig.bgColor} ${statusConfig.textColor} border ${statusConfig.borderColor}`}>
                {incident.status.toUpperCase()}
              </span>
              <span className={`px-2 py-1 text-xs font-semibold rounded ${severityConfig.badgeBg} ${severityConfig.badgeText} border ${severityConfig.badgeBorder}`}>
                {incident.severity.toUpperCase()}
              </span>
              <div className={`flex items-center gap-1 text-xs ${trendConfig.color}`}>
                {trendConfig.icon}
                <span className="font-semibold">{incident.trend}</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{incident.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-2">{incident.description}</p>
          </div>
          
          <button
            onClick={onToggle}
            className="ml-3 p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
          <StatItem
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={incident.location}
          />
          {incident.casualties !== undefined && (
            <StatItem
              icon={<AlertTriangle className="w-4 h-4" />}
              label="Casualties"
              value={incident.casualties.toString()}
              highlight
            />
          )}
          {incident.evacuees !== undefined && (
            <StatItem
              icon={<Users className="w-4 h-4" />}
              label="Evacuees"
              value={incident.evacuees.toLocaleString()}
            />
          )}
          {incident.responders !== undefined && (
            <StatItem
              icon={<Users className="w-4 h-4" />}
              label="Responders"
              value={incident.responders.toString()}
            />
          )}
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
          <Clock className="w-3 h-3" />
          <span>Updated {formatTimestamp(incident.lastUpdated)}</span>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && showUpdates && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-gray-700/50">
                <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Recent Updates ({incident.updates.length})
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {incident.updates.slice(0, 5).map((update, idx) => (
                    <motion.div
                      key={update.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-3 p-2 rounded-lg bg-black/20"
                    >
                      <div className="flex-shrink-0 w-1 bg-blue-500 rounded-full" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-300">{update.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(update.timestamp)}
                          </span>
                          {update.severity && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${getSeverityConfig(update.severity).badgeBg} ${getSeverityConfig(update.severity).badgeText}`}>
                              {update.severity}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}

function StatItem({ icon, label, value, highlight }: StatItemProps) {
  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg ${highlight ? 'bg-red-500/10 border border-red-500/30' : 'bg-black/20'}`}>
      <div className={highlight ? 'text-red-400' : 'text-gray-400'}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-400 truncate">{label}</div>
        <div className={`text-sm font-semibold truncate ${highlight ? 'text-red-300' : 'text-white'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

function getStatusConfig(status: IncidentStatus) {
  const configs = {
    active: {
      bgColor: 'bg-red-500/20',
      textColor: 'text-red-300',
      borderColor: 'border-red-500/50',
    },
    monitoring: {
      bgColor: 'bg-yellow-500/20',
      textColor: 'text-yellow-300',
      borderColor: 'border-yellow-500/50',
    },
    resolved: {
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-300',
      borderColor: 'border-green-500/50',
    },
    escalating: {
      bgColor: 'bg-orange-500/20',
      textColor: 'text-orange-300',
      borderColor: 'border-orange-500/50',
    },
  };
  return configs[status];
}

function getSeverityConfig(severity: string) {
  const configs = {
    critical: {
      bgColor: 'bg-red-900/30',
      borderColor: 'border-red-500/40',
      badgeBg: 'bg-red-500/20',
      badgeText: 'text-red-300',
      badgeBorder: 'border-red-500/50',
    },
    high: {
      bgColor: 'bg-orange-900/30',
      borderColor: 'border-orange-500/40',
      badgeBg: 'bg-orange-500/20',
      badgeText: 'text-orange-300',
      badgeBorder: 'border-orange-500/50',
    },
    medium: {
      bgColor: 'bg-yellow-900/30',
      borderColor: 'border-yellow-500/40',
      badgeBg: 'bg-yellow-500/20',
      badgeText: 'text-yellow-300',
      badgeBorder: 'border-yellow-500/50',
    },
    low: {
      bgColor: 'bg-blue-900/30',
      borderColor: 'border-blue-500/40',
      badgeBg: 'bg-blue-500/20',
      badgeText: 'text-blue-300',
      badgeBorder: 'border-blue-500/50',
    },
    info: {
      bgColor: 'bg-gray-900/30',
      borderColor: 'border-gray-500/40',
      badgeBg: 'bg-gray-500/20',
      badgeText: 'text-gray-300',
      badgeBorder: 'border-gray-500/50',
    },
  };
  return configs[severity as keyof typeof configs] || configs.info;
}

function getTrendConfig(trend: string) {
  const configs = {
    escalating: {
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-red-400',
    },
    stable: {
      icon: <Minus className="w-4 h-4" />,
      color: 'text-yellow-400',
    },
    improving: {
      icon: <TrendingDown className="w-4 h-4" />,
      color: 'text-green-400',
    },
  };
  return configs[trend as keyof typeof configs] || configs.stable;
}

function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(timestamp).getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return new Date(timestamp).toLocaleDateString();
}

// Made with Bob
