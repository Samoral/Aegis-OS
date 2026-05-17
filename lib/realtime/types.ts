// Realtime Infrastructure Types for AEGIS OS

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type AlertCategory = 'natural_disaster' | 'security' | 'health' | 'infrastructure' | 'environmental' | 'traffic';
export type IncidentStatus = 'active' | 'monitoring' | 'resolved' | 'escalating';
export type ActivityType = 'alert' | 'incident' | 'update' | 'resolution' | 'evacuation' | 'resource_deployment';

// Live Alert Interface
export interface LiveAlert {
  id: string;
  timestamp: Date;
  severity: AlertSeverity;
  category: AlertCategory;
  title: string;
  message: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    region: string;
  };
  affectedPopulation: number;
  isNew: boolean;
  expiresAt?: Date;
  actionRequired?: boolean;
  metadata?: Record<string, any>;
}

// Incident Feed Item
export interface IncidentFeedItem {
  id: string;
  timestamp: Date;
  status: IncidentStatus;
  type: AlertCategory;
  title: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: AlertSeverity;
  casualties?: number;
  evacuees?: number;
  responders?: number;
  updates: IncidentUpdate[];
  trend: 'escalating' | 'stable' | 'improving';
  lastUpdated: Date;
}

// Incident Update
export interface IncidentUpdate {
  id: string;
  timestamp: Date;
  message: string;
  type: 'status_change' | 'resource_update' | 'casualty_update' | 'general';
  severity?: AlertSeverity;
}

// Activity Stream Item
export interface ActivityStreamItem {
  id: string;
  timestamp: Date;
  type: ActivityType;
  title: string;
  description: string;
  severity: AlertSeverity;
  location?: string;
  icon?: string;
  metadata?: Record<string, any>;
}

// Dashboard Metrics (realtime)
export interface RealtimeDashboardMetrics {
  activeIncidents: number;
  criticalAlerts: number;
  peopleAffected: number;
  activeResponders: number;
  evacuationCenters: number;
  resourcesDeployed: number;
  trend: {
    incidents: number; // percentage change
    alerts: number;
    affected: number;
  };
  lastUpdated: Date;
}

// WebSocket Message Types
export type WebSocketMessageType = 
  | 'alert'
  | 'incident_update'
  | 'metrics_update'
  | 'activity'
  | 'connection'
  | 'heartbeat';

export interface WebSocketMessage<T = any> {
  type: WebSocketMessageType;
  timestamp: Date;
  data: T;
  id: string;
}

// Realtime Configuration
export interface RealtimeConfig {
  alertInterval: number; // ms between new alerts
  incidentUpdateInterval: number; // ms between incident updates
  metricsUpdateInterval: number; // ms between metrics updates
  activityStreamInterval: number; // ms between activity items
  maxAlerts: number; // max concurrent alerts
  maxIncidents: number; // max concurrent incidents
  maxActivityItems: number; // max items in activity stream
  enableAnimations: boolean;
  enableSound: boolean;
}

// Realtime Event Handlers
export interface RealtimeEventHandlers {
  onAlert?: (alert: LiveAlert) => void;
  onIncidentUpdate?: (incident: IncidentFeedItem) => void;
  onMetricsUpdate?: (metrics: RealtimeDashboardMetrics) => void;
  onActivity?: (activity: ActivityStreamItem) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

// Realtime State
export interface RealtimeState {
  connected: boolean;
  alerts: LiveAlert[];
  incidents: IncidentFeedItem[];
  metrics: RealtimeDashboardMetrics;
  activityStream: ActivityStreamItem[];
  lastUpdate: Date;
}

// Subscription Options
export interface SubscriptionOptions {
  categories?: AlertCategory[];
  severities?: AlertSeverity[];
  regions?: string[];
  includeResolved?: boolean;
}

// Made with Bob
