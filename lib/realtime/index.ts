// Realtime Infrastructure Exports for AEGIS OS

// Types
export * from './types';

// WebSocket Simulator
export { WebSocketSimulator, getWebSocketSimulator, resetWebSocketSimulator } from './websocket';

// Data Generators
export {
  generateLiveAlert,
  generateIncident,
  generateActivity,
  generateDashboardMetrics,
  generateIncidentUpdate,
  generateMultipleAlerts,
  generateMultipleIncidents,
  generateMultipleActivities,
} from './generators';

// Context and Hooks
export {
  RealtimeProvider,
  useRealtime,
  useAlerts,
  useIncidents,
  useMetrics,
  useActivityStream,
  useRealtimeConnection,
} from './RealtimeContext';

// Custom Hooks
export {
  useAlertsBySeverity,
  useAlertsByCategory,
  useCriticalAlerts,
  useNewAlerts,
  useActiveIncidents,
  useEscalatingIncidents,
  useIncidentsByRegion,
  useAlertSubscription,
  useRealtimeStats,
  useAlertNotifications,
  useIncidentNotifications,
  useRecentActivity,
  useAutoConnect,
  useConnectionStatus,
  useMetricsChange,
  useAlertsNearLocation,
  useDebouncedRealtime,
  useCountsByType,
} from './hooks';

// Made with Bob
