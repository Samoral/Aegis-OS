// WebSocket Simulation Service for AEGIS OS

import {
  WebSocketMessage,
  WebSocketMessageType,
  RealtimeConfig,
  RealtimeEventHandlers,
  LiveAlert,
  IncidentFeedItem,
  RealtimeDashboardMetrics,
  ActivityStreamItem,
} from './types';
import {
  generateLiveAlert,
  generateIncident,
  generateActivity,
  generateDashboardMetrics,
  generateIncidentUpdate,
} from './generators';

// Default configuration
const DEFAULT_CONFIG: RealtimeConfig = {
  alertInterval: 15000, // 15 seconds
  incidentUpdateInterval: 30000, // 30 seconds
  metricsUpdateInterval: 5000, // 5 seconds
  activityStreamInterval: 8000, // 8 seconds
  maxAlerts: 10,
  maxIncidents: 20,
  maxActivityItems: 50,
  enableAnimations: true,
  enableSound: false,
};

export class WebSocketSimulator {
  private config: RealtimeConfig;
  private handlers: RealtimeEventHandlers;
  private connected: boolean = false;
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private currentMetrics?: RealtimeDashboardMetrics;
  private activeIncidents: Map<string, IncidentFeedItem> = new Map();

  constructor(config?: Partial<RealtimeConfig>, handlers?: RealtimeEventHandlers) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.handlers = handlers || {};
  }

  // Connect to simulated WebSocket
  connect(): void {
    if (this.connected) {
      console.warn('WebSocket already connected');
      return;
    }

    this.connected = true;
    console.log('🔌 WebSocket simulator connected');

    // Send connection message
    this.sendMessage('connection', { status: 'connected', timestamp: new Date() });
    this.handlers.onConnect?.();

    // Start all intervals
    this.startAlertInterval();
    this.startIncidentUpdateInterval();
    this.startMetricsUpdateInterval();
    this.startActivityStreamInterval();
    this.startHeartbeatInterval();
  }

  // Disconnect from simulated WebSocket
  disconnect(): void {
    if (!this.connected) {
      console.warn('WebSocket not connected');
      return;
    }

    this.connected = false;
    console.log('🔌 WebSocket simulator disconnected');

    // Clear all intervals
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals.clear();

    // Send disconnection message
    this.sendMessage('connection', { status: 'disconnected', timestamp: new Date() });
    this.handlers.onDisconnect?.();
  }

  // Update configuration
  updateConfig(config: Partial<RealtimeConfig>): void {
    this.config = { ...this.config, ...config };
    
    // Restart intervals if connected
    if (this.connected) {
      this.disconnect();
      this.connect();
    }
  }

  // Update event handlers
  updateHandlers(handlers: Partial<RealtimeEventHandlers>): void {
    this.handlers = { ...this.handlers, ...handlers };
  }

  // Check connection status
  isConnected(): boolean {
    return this.connected;
  }

  // Get current configuration
  getConfig(): RealtimeConfig {
    return { ...this.config };
  }

  // Private: Start alert interval
  private startAlertInterval(): void {
    const interval = setInterval(() => {
      if (!this.connected) return;

      const alert = generateLiveAlert();
      this.sendMessage('alert', alert);
      this.handlers.onAlert?.(alert);
    }, this.config.alertInterval);

    this.intervals.set('alerts', interval);
  }

  // Private: Start incident update interval
  private startIncidentUpdateInterval(): void {
    const interval = setInterval(() => {
      if (!this.connected) return;

      // Randomly either create new incident or update existing one
      if (this.activeIncidents.size < this.config.maxIncidents && Math.random() > 0.3) {
        // Create new incident
        const incident = generateIncident();
        this.activeIncidents.set(incident.id, incident);
        this.sendMessage('incident_update', incident);
        this.handlers.onIncidentUpdate?.(incident);
      } else if (this.activeIncidents.size > 0) {
        // Update existing incident
        const incidents = Array.from(this.activeIncidents.values());
        const incident = incidents[Math.floor(Math.random() * incidents.length)];
        
        // Add new update
        const update = generateIncidentUpdate(incident.id, incident.updates.length);
        incident.updates.push(update);
        incident.lastUpdated = new Date();
        
        // Randomly change status or trend
        if (Math.random() > 0.7) {
          const statuses: IncidentFeedItem['status'][] = ['active', 'monitoring', 'resolved', 'escalating'];
          incident.status = statuses[Math.floor(Math.random() * statuses.length)];
          
          if (incident.status === 'resolved') {
            // Remove resolved incidents after a delay
            setTimeout(() => {
              this.activeIncidents.delete(incident.id);
            }, 60000); // 1 minute
          }
        }
        
        if (Math.random() > 0.6) {
          const trends: IncidentFeedItem['trend'][] = ['escalating', 'stable', 'improving'];
          incident.trend = trends[Math.floor(Math.random() * trends.length)];
        }
        
        this.sendMessage('incident_update', incident);
        this.handlers.onIncidentUpdate?.(incident);
      }
    }, this.config.incidentUpdateInterval);

    this.intervals.set('incidents', interval);
  }

  // Private: Start metrics update interval
  private startMetricsUpdateInterval(): void {
    const interval = setInterval(() => {
      if (!this.connected) return;

      const metrics = generateDashboardMetrics(this.currentMetrics);
      this.currentMetrics = metrics;
      this.sendMessage('metrics_update', metrics);
      this.handlers.onMetricsUpdate?.(metrics);
    }, this.config.metricsUpdateInterval);

    this.intervals.set('metrics', interval);

    // Send initial metrics immediately
    if (this.connected) {
      const metrics = generateDashboardMetrics();
      this.currentMetrics = metrics;
      this.sendMessage('metrics_update', metrics);
      this.handlers.onMetricsUpdate?.(metrics);
    }
  }

  // Private: Start activity stream interval
  private startActivityStreamInterval(): void {
    const interval = setInterval(() => {
      if (!this.connected) return;

      const activity = generateActivity();
      this.sendMessage('activity', activity);
      this.handlers.onActivity?.(activity);
    }, this.config.activityStreamInterval);

    this.intervals.set('activity', interval);
  }

  // Private: Start heartbeat interval
  private startHeartbeatInterval(): void {
    const interval = setInterval(() => {
      if (!this.connected) return;

      this.sendMessage('heartbeat', { timestamp: new Date() });
    }, 30000); // 30 seconds

    this.intervals.set('heartbeat', interval);
  }

  // Private: Send message
  private sendMessage<T>(type: WebSocketMessageType, data: T): void {
    const message: WebSocketMessage<T> = {
      type,
      timestamp: new Date(),
      data,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    // In a real implementation, this would send over WebSocket
    // For simulation, we just log it
    if (type !== 'heartbeat') {
      console.log(`📡 [${type}]`, message);
    }
  }

  // Manual trigger methods for testing
  triggerAlert(): void {
    if (!this.connected) return;
    const alert = generateLiveAlert();
    this.sendMessage('alert', alert);
    this.handlers.onAlert?.(alert);
  }

  triggerIncident(): void {
    if (!this.connected) return;
    const incident = generateIncident();
    this.activeIncidents.set(incident.id, incident);
    this.sendMessage('incident_update', incident);
    this.handlers.onIncidentUpdate?.(incident);
  }

  triggerActivity(): void {
    if (!this.connected) return;
    const activity = generateActivity();
    this.sendMessage('activity', activity);
    this.handlers.onActivity?.(activity);
  }

  triggerMetricsUpdate(): void {
    if (!this.connected) return;
    const metrics = generateDashboardMetrics(this.currentMetrics);
    this.currentMetrics = metrics;
    this.sendMessage('metrics_update', metrics);
    this.handlers.onMetricsUpdate?.(metrics);
  }

  // Get active incidents
  getActiveIncidents(): IncidentFeedItem[] {
    return Array.from(this.activeIncidents.values());
  }

  // Get current metrics
  getCurrentMetrics(): RealtimeDashboardMetrics | undefined {
    return this.currentMetrics;
  }
}

// Singleton instance
let simulatorInstance: WebSocketSimulator | null = null;

// Get or create simulator instance
export function getWebSocketSimulator(
  config?: Partial<RealtimeConfig>,
  handlers?: RealtimeEventHandlers
): WebSocketSimulator {
  if (!simulatorInstance) {
    simulatorInstance = new WebSocketSimulator(config, handlers);
  } else if (config || handlers) {
    if (config) simulatorInstance.updateConfig(config);
    if (handlers) simulatorInstance.updateHandlers(handlers);
  }
  return simulatorInstance;
}

// Reset simulator instance (useful for testing)
export function resetWebSocketSimulator(): void {
  if (simulatorInstance?.isConnected()) {
    simulatorInstance.disconnect();
  }
  simulatorInstance = null;
}

// Made with Bob
