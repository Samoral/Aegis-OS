# AEGIS OS Realtime Infrastructure

A comprehensive realtime infrastructure for AEGIS OS that provides live alerts, websocket simulation, changing incident feeds, animated emergency updates, dynamic dashboard refresh, and realtime activity streams.

## Features

- ✅ **Live Alerts** - Real-time emergency notifications with severity-based styling
- ✅ **WebSocket Simulation** - Simulated WebSocket connection for development and testing
- ✅ **Incident Feeds** - Dynamic incident tracking with status updates
- ✅ **Emergency Updates** - Animated incident cards with expandable details
- ✅ **Dashboard Metrics** - Real-time statistics with trend indicators
- ✅ **Activity Streams** - Live feed of all system activities
- ✅ **Custom Hooks** - Extensive hook library for filtering and subscribing to data

## Quick Start

### 1. Wrap your app with RealtimeProvider

```tsx
import { RealtimeProvider } from '@/lib/realtime';

export default function RootLayout({ children }) {
  return (
    <RealtimeProvider autoConnect={true}>
      {children}
    </RealtimeProvider>
  );
}
```

### 2. Use Components

```tsx
import { 
  LiveAlertNotification,
  RealtimeDashboard,
  ActivityStream,
  EmergencyUpdates 
} from '@/components/realtime';

export default function Dashboard() {
  return (
    <div>
      <LiveAlertNotification position="top-right" />
      <RealtimeDashboard />
      <EmergencyUpdates maxIncidents={10} />
      <ActivityStream maxItems={20} />
    </div>
  );
}
```

### 3. Use Hooks

```tsx
import { 
  useRealtime,
  useCriticalAlerts,
  useActiveIncidents,
  useRealtimeStats 
} from '@/lib/realtime';

function MyComponent() {
  const { connected } = useRealtime();
  const criticalAlerts = useCriticalAlerts();
  const activeIncidents = useActiveIncidents();
  const stats = useRealtimeStats();

  return (
    <div>
      <p>Status: {connected ? 'Connected' : 'Disconnected'}</p>
      <p>Critical Alerts: {criticalAlerts.length}</p>
      <p>Active Incidents: {activeIncidents.length}</p>
    </div>
  );
}
```

## Components

### LiveAlertNotification

Displays live alert notifications with auto-dismiss and animations.

```tsx
<LiveAlertNotification
  position="top-right"
  maxVisible={3}
  autoHideDuration={10000}
  enableSound={false}
/>
```

**Props:**
- `position`: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
- `maxVisible`: Maximum number of visible alerts (default: 3)
- `autoHideDuration`: Auto-hide duration in ms (default: 10000)
- `enableSound`: Enable sound for critical alerts (default: false)

### RealtimeDashboard

Displays real-time metrics with animated updates.

```tsx
<RealtimeDashboard />
```

Also available: `<CompactRealtimeDashboard />` for smaller displays.

### ActivityStream

Shows a live feed of all system activities.

```tsx
<ActivityStream
  maxItems={20}
  showTimestamps={true}
  autoScroll={true}
  compact={false}
/>
```

**Props:**
- `maxItems`: Maximum items to display (default: 20)
- `showTimestamps`: Show timestamps (default: true)
- `autoScroll`: Auto-scroll to new items (default: true)
- `compact`: Use compact layout (default: false)

Also available: `<CompactActivityStream />` for sidebars.

### EmergencyUpdates

Displays incident feed with expandable details.

```tsx
<EmergencyUpdates
  maxIncidents={10}
  showUpdates={true}
  autoExpand={false}
/>
```

**Props:**
- `maxIncidents`: Maximum incidents to display (default: 10)
- `showUpdates`: Show incident updates (default: true)
- `autoExpand`: Auto-expand first 3 incidents (default: false)

## Hooks

### Basic Hooks

```tsx
// Get all realtime data
const { alerts, incidents, metrics, activityStream, connected } = useRealtime();

// Get specific data
const { alerts, dismissAlert, markAlertAsRead } = useAlerts();
const { incidents, getIncidentById } = useIncidents();
const metrics = useMetrics();
const { activityStream, clearActivityStream } = useActivityStream();
const { connected, connect, disconnect } = useRealtimeConnection();
```

### Filtering Hooks

```tsx
// Filter by severity
const criticalAlerts = useCriticalAlerts();
const highAlerts = useAlertsBySeverity('high');
const urgentAlerts = useAlertsBySeverity(['critical', 'high']);

// Filter by category
const naturalDisasters = useAlertsByCategory('natural_disaster');
const securityAlerts = useAlertsByCategory(['security', 'infrastructure']);

// Filter incidents
const activeIncidents = useActiveIncidents();
const escalatingIncidents = useEscalatingIncidents();
const lagosIncidents = useIncidentsByRegion('Lagos');

// Get new/unread alerts
const newAlerts = useNewAlerts();
```

### Subscription Hooks

```tsx
// Subscribe to specific alert types
useAlertSubscription({
  categories: ['natural_disaster', 'security'],
  severities: ['critical', 'high'],
  regions: ['Lagos', 'Abuja'],
  includeResolved: false,
});
```

### Notification Hooks

```tsx
// Get notified of new alerts
useAlertNotifications(
  (alert) => {
    console.log('New alert:', alert);
    // Show notification, play sound, etc.
  },
  (alert) => alert.severity === 'critical' // Optional filter
);

// Get notified of incident updates
useIncidentNotifications(
  (incident) => {
    console.log('Incident updated:', incident);
  },
  (incident) => incident.status === 'escalating' // Optional filter
);
```

### Utility Hooks

```tsx
// Get statistics
const stats = useRealtimeStats();
// Returns: { totalAlerts, criticalAlerts, newAlerts, activeIncidents, etc. }

// Get recent activity (last 5 minutes)
const recentActivity = useRecentActivity(5);

// Get alerts near a location
const nearbyAlerts = useAlertsNearLocation(6.5244, 3.3792, 50); // lat, lng, radius in km

// Auto-connect on mount
const connected = useAutoConnect(true);

// Connection status with reconnect
const { connected, reconnecting, reconnect } = useConnectionStatus();

// Track metrics changes
useMetricsChange((current, previous) => {
  console.log('Metrics changed:', current, previous);
});

// Get counts by type
const { alertCounts, incidentCounts } = useCountsByType();
```

## Configuration

Configure the realtime system when creating the provider:

```tsx
<RealtimeProvider
  config={{
    alertInterval: 15000,           // ms between new alerts
    incidentUpdateInterval: 30000,  // ms between incident updates
    metricsUpdateInterval: 5000,    // ms between metrics updates
    activityStreamInterval: 8000,   // ms between activity items
    maxAlerts: 10,                  // max concurrent alerts
    maxIncidents: 20,               // max concurrent incidents
    maxActivityItems: 50,           // max items in activity stream
    enableAnimations: true,         // enable animations
    enableSound: false,             // enable sound notifications
  }}
  autoConnect={true}
>
  {children}
</RealtimeProvider>
```

## Manual Control

```tsx
import { getWebSocketSimulator } from '@/lib/realtime';

const simulator = getWebSocketSimulator();

// Manual triggers (useful for testing)
simulator.triggerAlert();
simulator.triggerIncident();
simulator.triggerActivity();
simulator.triggerMetricsUpdate();

// Connection control
simulator.connect();
simulator.disconnect();

// Get data
const activeIncidents = simulator.getActiveIncidents();
const currentMetrics = simulator.getCurrentMetrics();
```

## Data Generators

Generate mock data for testing:

```tsx
import {
  generateLiveAlert,
  generateIncident,
  generateActivity,
  generateDashboardMetrics,
  generateMultipleAlerts,
} from '@/lib/realtime';

// Generate single items
const alert = generateLiveAlert();
const incident = generateIncident();
const activity = generateActivity();
const metrics = generateDashboardMetrics();

// Generate multiple items
const alerts = generateMultipleAlerts(5);
const incidents = generateMultipleIncidents(10);
const activities = generateMultipleActivities(20);
```

## Types

All TypeScript types are exported:

```tsx
import type {
  LiveAlert,
  IncidentFeedItem,
  ActivityStreamItem,
  RealtimeDashboardMetrics,
  AlertSeverity,
  AlertCategory,
  IncidentStatus,
  ActivityType,
  RealtimeConfig,
  RealtimeState,
  SubscriptionOptions,
} from '@/lib/realtime';
```

## Best Practices

1. **Use the Provider at the root level** - Wrap your entire app to ensure all components have access to realtime data.

2. **Filter data with hooks** - Use filtering hooks instead of filtering in components for better performance.

3. **Subscribe to specific data** - Use `useAlertSubscription` to only receive relevant alerts.

4. **Handle notifications properly** - Use notification hooks to respond to new data without polling.

5. **Clean up on unmount** - The provider automatically handles cleanup, but be mindful of custom subscriptions.

6. **Use compact components for sidebars** - Use `CompactRealtimeDashboard` and `CompactActivityStream` for space-constrained layouts.

7. **Debounce frequent updates** - Use `useDebouncedRealtime` for components that don't need instant updates.

## Examples

### Emergency Dashboard

```tsx
import { 
  RealtimeProvider,
  LiveAlertNotification,
  RealtimeDashboard,
  EmergencyUpdates,
  ActivityStream,
  useCriticalAlerts,
  useEscalatingIncidents,
} from '@/lib/realtime';

function EmergencyDashboard() {
  const criticalAlerts = useCriticalAlerts();
  const escalatingIncidents = useEscalatingIncidents();

  return (
    <div className="p-6 space-y-6">
      <LiveAlertNotification position="top-right" />
      
      {criticalAlerts.length > 0 && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
          <h2 className="text-red-300 font-bold">
            ⚠️ {criticalAlerts.length} Critical Alerts
          </h2>
        </div>
      )}

      <RealtimeDashboard />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmergencyUpdates maxIncidents={5} />
        <ActivityStream maxItems={15} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <RealtimeProvider autoConnect={true}>
      <EmergencyDashboard />
    </RealtimeProvider>
  );
}
```

### Custom Alert Handler

```tsx
import { useAlertNotifications, useIncidentNotifications } from '@/lib/realtime';

function AlertHandler() {
  // Handle critical alerts
  useAlertNotifications(
    (alert) => {
      // Show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(alert.title, {
          body: alert.message,
          icon: '/alert-icon.png',
        });
      }
      
      // Play sound
      const audio = new Audio('/alert-sound.mp3');
      audio.play();
    },
    (alert) => alert.severity === 'critical'
  );

  // Handle escalating incidents
  useIncidentNotifications(
    (incident) => {
      console.log('Incident escalating:', incident.title);
      // Send to monitoring system, etc.
    },
    (incident) => incident.status === 'escalating'
  );

  return null;
}
```

## License

Part of AEGIS OS - Advanced Emergency Global Intelligence System