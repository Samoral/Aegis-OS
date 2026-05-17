// Custom Hooks for Realtime Infrastructure

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRealtime } from './RealtimeContext';
import {
  LiveAlert,
  IncidentFeedItem,
  ActivityStreamItem,
  AlertSeverity,
  AlertCategory,
  SubscriptionOptions,
} from './types';

// Hook to filter alerts by severity
export function useAlertsBySeverity(severity: AlertSeverity | AlertSeverity[]) {
  const { alerts } = useRealtime();
  const severities = Array.isArray(severity) ? severity : [severity];
  
  return alerts.filter((alert) => severities.includes(alert.severity));
}

// Hook to filter alerts by category
export function useAlertsByCategory(category: AlertCategory | AlertCategory[]) {
  const { alerts } = useRealtime();
  const categories = Array.isArray(category) ? category : [category];
  
  return alerts.filter((alert) => categories.includes(alert.category));
}

// Hook to get critical alerts only
export function useCriticalAlerts() {
  return useAlertsBySeverity('critical');
}

// Hook to get new/unread alerts
export function useNewAlerts() {
  const { alerts } = useRealtime();
  return alerts.filter((alert) => alert.isNew);
}

// Hook to get active incidents
export function useActiveIncidents() {
  const { incidents } = useRealtime();
  return incidents.filter((incident) => 
    incident.status === 'active' || incident.status === 'escalating'
  );
}

// Hook to get escalating incidents
export function useEscalatingIncidents() {
  const { incidents } = useRealtime();
  return incidents.filter((incident) => incident.status === 'escalating');
}

// Hook to get incidents by region
export function useIncidentsByRegion(region: string) {
  const { incidents } = useRealtime();
  return incidents.filter((incident) => 
    incident.location.toLowerCase().includes(region.toLowerCase())
  );
}

// Hook to subscribe to specific alert types
export function useAlertSubscription(options: SubscriptionOptions) {
  const { subscribe, unsubscribe } = useRealtime();
  
  useEffect(() => {
    subscribe(options);
    return () => unsubscribe();
  }, [JSON.stringify(options)]);
}

// Hook to get realtime statistics
export function useRealtimeStats() {
  const { alerts, incidents, metrics, activityStream } = useRealtime();
  
  return {
    totalAlerts: alerts.length,
    criticalAlerts: alerts.filter((a) => a.severity === 'critical').length,
    newAlerts: alerts.filter((a) => a.isNew).length,
    activeIncidents: incidents.filter((i) => i.status === 'active').length,
    escalatingIncidents: incidents.filter((i) => i.status === 'escalating').length,
    totalActivities: activityStream.length,
    metrics,
  };
}

// Hook to track alert changes with callback
export function useAlertNotifications(
  callback: (alert: LiveAlert) => void,
  filter?: (alert: LiveAlert) => boolean
) {
  const { alerts } = useRealtime();
  const previousAlertsRef = useRef<LiveAlert[]>([]);

  useEffect(() => {
    const newAlerts = alerts.filter((alert) => {
      const isNew = !previousAlertsRef.current.some((prev) => prev.id === alert.id);
      const passesFilter = filter ? filter(alert) : true;
      return isNew && passesFilter;
    });

    newAlerts.forEach((alert) => callback(alert));
    previousAlertsRef.current = alerts;
  }, [alerts, callback, filter]);
}

// Hook to track incident updates with callback
export function useIncidentNotifications(
  callback: (incident: IncidentFeedItem) => void,
  filter?: (incident: IncidentFeedItem) => boolean
) {
  const { incidents } = useRealtime();
  const previousIncidentsRef = useRef<Map<string, Date>>(new Map());

  useEffect(() => {
    incidents.forEach((incident) => {
      const previousUpdate = previousIncidentsRef.current.get(incident.id);
      const isUpdated = !previousUpdate || 
        incident.lastUpdated.getTime() > previousUpdate.getTime();
      const passesFilter = filter ? filter(incident) : true;

      if (isUpdated && passesFilter) {
        callback(incident);
        previousIncidentsRef.current.set(incident.id, incident.lastUpdated);
      }
    });
  }, [incidents, callback, filter]);
}

// Hook to get recent activity (last N minutes)
export function useRecentActivity(minutes: number = 5) {
  const { activityStream } = useRealtime();
  const cutoffTime = new Date(Date.now() - minutes * 60 * 1000);
  
  return activityStream.filter((activity) => 
    new Date(activity.timestamp) > cutoffTime
  );
}

// Hook to auto-connect/disconnect
export function useAutoConnect(enabled: boolean = true) {
  const { connect, disconnect, connected } = useRealtime();

  useEffect(() => {
    if (enabled && !connected) {
      connect();
    }
    
    return () => {
      if (enabled && connected) {
        disconnect();
      }
    };
  }, [enabled]);

  return connected;
}

// Hook to get connection status with reconnect
export function useConnectionStatus() {
  const { connected, connect, disconnect } = useRealtime();
  const [reconnecting, setReconnecting] = useState(false);

  const reconnect = useCallback(() => {
    setReconnecting(true);
    disconnect();
    setTimeout(() => {
      connect();
      setReconnecting(false);
    }, 1000);
  }, [connect, disconnect]);

  return { connected, reconnecting, reconnect };
}

// Hook to track metrics changes
export function useMetricsChange(
  callback: (current: any, previous: any) => void
) {
  const { metrics } = useRealtime();
  const previousMetricsRef = useRef(metrics);

  useEffect(() => {
    if (JSON.stringify(metrics) !== JSON.stringify(previousMetricsRef.current)) {
      callback(metrics, previousMetricsRef.current);
      previousMetricsRef.current = metrics;
    }
  }, [metrics, callback]);
}

// Hook to get alerts in a specific location radius
export function useAlertsNearLocation(
  lat: number,
  lng: number,
  radiusKm: number = 50
) {
  const { alerts } = useRealtime();
  
  return alerts.filter((alert) => {
    const distance = calculateDistance(
      lat,
      lng,
      alert.location.lat,
      alert.location.lng
    );
    return distance <= radiusKm;
  });
}

// Helper function to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Hook for debounced realtime updates
export function useDebouncedRealtime<T>(
  selector: () => T,
  delay: number = 500
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(selector());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(selector());
    }, delay);

    return () => clearTimeout(handler);
  }, [selector(), delay]);

  return debouncedValue;
}

// Hook to get alert/incident counts by type
export function useCountsByType() {
  const { alerts, incidents } = useRealtime();

  const alertCounts = alerts.reduce((acc, alert) => {
    acc[alert.category] = (acc[alert.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const incidentCounts = incidents.reduce((acc, incident) => {
    acc[incident.type] = (acc[incident.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return { alertCounts, incidentCounts };
}

// Made with Bob
