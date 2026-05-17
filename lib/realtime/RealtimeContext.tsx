'use client';

// Realtime Context for AEGIS OS
// Provides global state management for realtime data

import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import {
  RealtimeState,
  LiveAlert,
  IncidentFeedItem,
  RealtimeDashboardMetrics,
  ActivityStreamItem,
  RealtimeConfig,
  SubscriptionOptions,
} from './types';
import { WebSocketSimulator, getWebSocketSimulator } from './websocket';

interface RealtimeContextValue extends RealtimeState {
  // Connection methods
  connect: () => void;
  disconnect: () => void;
  
  // Configuration
  updateConfig: (config: Partial<RealtimeConfig>) => void;
  
  // Subscription management
  subscribe: (options?: SubscriptionOptions) => void;
  unsubscribe: () => void;
  
  // Manual triggers (for testing)
  triggerAlert: () => void;
  triggerIncident: () => void;
  triggerActivity: () => void;
  triggerMetricsUpdate: () => void;
  
  // Alert management
  dismissAlert: (alertId: string) => void;
  markAlertAsRead: (alertId: string) => void;
  
  // Incident management
  getIncidentById: (incidentId: string) => IncidentFeedItem | undefined;
  
  // Activity management
  clearActivityStream: () => void;
}

const RealtimeContext = createContext<RealtimeContextValue | undefined>(undefined);

interface RealtimeProviderProps {
  children: React.ReactNode;
  config?: Partial<RealtimeConfig>;
  autoConnect?: boolean;
}

export function RealtimeProvider({ 
  children, 
  config,
  autoConnect = true 
}: RealtimeProviderProps) {
  const [state, setState] = useState<RealtimeState>({
    connected: false,
    alerts: [],
    incidents: [],
    metrics: {
      activeIncidents: 0,
      criticalAlerts: 0,
      peopleAffected: 0,
      activeResponders: 0,
      evacuationCenters: 0,
      resourcesDeployed: 0,
      trend: { incidents: 0, alerts: 0, affected: 0 },
      lastUpdated: new Date(),
    },
    activityStream: [],
    lastUpdate: new Date(),
  });

  const simulatorRef = useRef<WebSocketSimulator | null>(null);
  const subscriptionRef = useRef<SubscriptionOptions | undefined>(undefined);
  const maxAlertsRef = useRef(10);
  const maxIncidentsRef = useRef(20);
  const maxActivitiesRef = useRef(50);

  // Initialize simulator
  useEffect(() => {
    simulatorRef.current = getWebSocketSimulator(config, {
      onAlert: handleAlert,
      onIncidentUpdate: handleIncidentUpdate,
      onMetricsUpdate: handleMetricsUpdate,
      onActivity: handleActivity,
      onConnect: handleConnect,
      onDisconnect: handleDisconnect,
      onError: handleError,
    });

    if (autoConnect) {
      simulatorRef.current.connect();
    }

    return () => {
      if (simulatorRef.current?.isConnected()) {
        simulatorRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoConnect, config]);

  // Handle new alert
  const handleAlert = useCallback((alert: LiveAlert) => {
    setState((prev) => {
      // Check subscription filters
      if (subscriptionRef.current) {
        const { categories, severities, regions } = subscriptionRef.current;
        
        if (categories && !categories.includes(alert.category)) return prev;
        if (severities && !severities.includes(alert.severity)) return prev;
        if (regions && !regions.includes(alert.location.region)) return prev;
      }

      // Add alert and maintain max limit
      const newAlerts = [alert, ...prev.alerts].slice(0, maxAlertsRef.current);
      
      return {
        ...prev,
        alerts: newAlerts,
        lastUpdate: new Date(),
      };
    });
  }, []);

  // Handle incident update
  const handleIncidentUpdate = useCallback((incident: IncidentFeedItem) => {
    setState((prev) => {
      // Check subscription filters
      if (subscriptionRef.current) {
        const { categories, severities, includeResolved } = subscriptionRef.current;
        
        if (categories && !categories.includes(incident.type)) return prev;
        if (severities && !severities.includes(incident.severity)) return prev;
        if (!includeResolved && incident.status === 'resolved') return prev;
      }

      // Update or add incident
      const existingIndex = prev.incidents.findIndex((i) => i.id === incident.id);
      let newIncidents: IncidentFeedItem[];
      
      if (existingIndex >= 0) {
        // Update existing incident
        newIncidents = [...prev.incidents];
        newIncidents[existingIndex] = incident;
      } else {
        // Add new incident
        newIncidents = [incident, ...prev.incidents];
      }
      
      // Remove resolved incidents after they've been in the list
      newIncidents = newIncidents.filter((i) => {
        if (i.status === 'resolved') {
          const timeSinceResolved = Date.now() - i.lastUpdated.getTime();
          return timeSinceResolved < 300000; // Keep for 5 minutes
        }
        return true;
      });
      
      // Maintain max limit
      newIncidents = newIncidents.slice(0, maxIncidentsRef.current);
      
      return {
        ...prev,
        incidents: newIncidents,
        lastUpdate: new Date(),
      };
    });
  }, []);

  // Handle metrics update
  const handleMetricsUpdate = useCallback((metrics: RealtimeDashboardMetrics) => {
    setState((prev) => ({
      ...prev,
      metrics,
      lastUpdate: new Date(),
    }));
  }, []);

  // Handle activity
  const handleActivity = useCallback((activity: ActivityStreamItem) => {
    setState((prev) => {
      // Check subscription filters
      if (subscriptionRef.current) {
        const { severities, regions } = subscriptionRef.current;
        
        if (severities && !severities.includes(activity.severity)) return prev;
        if (regions && activity.location && !regions.some(r => activity.location?.includes(r))) return prev;
      }

      // Add activity and maintain max limit
      const newActivities = [activity, ...prev.activityStream].slice(0, maxActivitiesRef.current);
      
      return {
        ...prev,
        activityStream: newActivities,
        lastUpdate: new Date(),
      };
    });
  }, []);

  // Handle connection
  const handleConnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      connected: true,
      lastUpdate: new Date(),
    }));
  }, []);

  // Handle disconnection
  const handleDisconnect = useCallback(() => {
    setState((prev) => ({
      ...prev,
      connected: false,
      lastUpdate: new Date(),
    }));
  }, []);

  // Handle error
  const handleError = useCallback((error: Error) => {
    console.error('Realtime error:', error);
  }, []);

  // Connect method
  const connect = useCallback(() => {
    simulatorRef.current?.connect();
  }, []);

  // Disconnect method
  const disconnect = useCallback(() => {
    simulatorRef.current?.disconnect();
  }, []);

  // Update configuration
  const updateConfig = useCallback((newConfig: Partial<RealtimeConfig>) => {
    simulatorRef.current?.updateConfig(newConfig);
    
    // Update local refs
    if (newConfig.maxAlerts !== undefined) {
      maxAlertsRef.current = newConfig.maxAlerts;
    }
    if (newConfig.maxIncidents !== undefined) {
      maxIncidentsRef.current = newConfig.maxIncidents;
    }
    if (newConfig.maxActivityItems !== undefined) {
      maxActivitiesRef.current = newConfig.maxActivityItems;
    }
  }, []);

  // Subscribe with filters
  const subscribe = useCallback((options?: SubscriptionOptions) => {
    subscriptionRef.current = options;
  }, []);

  // Unsubscribe
  const unsubscribe = useCallback(() => {
    subscriptionRef.current = undefined;
  }, []);

  // Manual triggers
  const triggerAlert = useCallback(() => {
    simulatorRef.current?.triggerAlert();
  }, []);

  const triggerIncident = useCallback(() => {
    simulatorRef.current?.triggerIncident();
  }, []);

  const triggerActivity = useCallback(() => {
    simulatorRef.current?.triggerActivity();
  }, []);

  const triggerMetricsUpdate = useCallback(() => {
    simulatorRef.current?.triggerMetricsUpdate();
  }, []);

  // Dismiss alert
  const dismissAlert = useCallback((alertId: string) => {
    setState((prev) => ({
      ...prev,
      alerts: prev.alerts.filter((a) => a.id !== alertId),
      lastUpdate: new Date(),
    }));
  }, []);

  // Mark alert as read
  const markAlertAsRead = useCallback((alertId: string) => {
    setState((prev) => ({
      ...prev,
      alerts: prev.alerts.map((a) =>
        a.id === alertId ? { ...a, isNew: false } : a
      ),
      lastUpdate: new Date(),
    }));
  }, []);

  // Get incident by ID
  const getIncidentById = useCallback((incidentId: string) => {
    return state.incidents.find((i) => i.id === incidentId);
  }, [state.incidents]);

  // Clear activity stream
  const clearActivityStream = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activityStream: [],
      lastUpdate: new Date(),
    }));
  }, []);

  const value: RealtimeContextValue = {
    ...state,
    connect,
    disconnect,
    updateConfig,
    subscribe,
    unsubscribe,
    triggerAlert,
    triggerIncident,
    triggerActivity,
    triggerMetricsUpdate,
    dismissAlert,
    markAlertAsRead,
    getIncidentById,
    clearActivityStream,
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
}

// Custom hook to use realtime context
export function useRealtime(): RealtimeContextValue {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
}

// Custom hooks for specific data
export function useAlerts() {
  const { alerts, dismissAlert, markAlertAsRead } = useRealtime();
  return { alerts, dismissAlert, markAlertAsRead };
}

export function useIncidents() {
  const { incidents, getIncidentById } = useRealtime();
  return { incidents, getIncidentById };
}

export function useMetrics() {
  const { metrics } = useRealtime();
  return metrics;
}

export function useActivityStream() {
  const { activityStream, clearActivityStream } = useRealtime();
  return { activityStream, clearActivityStream };
}

export function useRealtimeConnection() {
  const { connected, connect, disconnect } = useRealtime();
  return { connected, connect, disconnect };
}

// Made with Bob
