# AEGIS OS Mock Data Architecture Guide

## Overview

This guide documents the comprehensive mock data architecture for AEGIS OS. The mock data provides realistic, interconnected information across all dashboards and widgets, simulating a real emergency management system.

## File Structure

```
lib/
├── mockData.ts          # Main mock data file (this architecture)
├── mockFamilyData.ts    # Family safety system data
└── MOCK_DATA_GUIDE.md   # This documentation
```

## Data Categories

### 1. Incidents (Emergency Events)

**Type:** `Emergency[]`  
**Export:** `mockIncidents`  
**Count:** 6 incidents

Realistic emergency scenarios including:
- Building fires
- Traffic accidents
- Natural disasters (flooding, coastal erosion)
- Security breaches
- Infrastructure failures

**Key Features:**
- Real Lagos, Nigeria locations with coordinates
- Multiple status levels (critical, warning, normal, resolved)
- Assigned response teams
- Estimated damage and affected population
- Timestamps for tracking

**Example Usage:**
```typescript
import { mockAPI } from '@/lib/mockData';

// Get all incidents
const incidents = await mockAPI.getIncidents();

// Get active incidents only
const activeIncidents = await mockAPI.getActiveIncidents();

// Get specific incident
const incident = await mockAPI.getIncidentById('INC-001');
```

### 2. Alerts (System Notifications)

**Type:** `Alert[]`  
**Export:** `mockAlerts`  
**Count:** 6 alerts

System-wide notifications with different severity levels:
- Danger (critical emergencies)
- Warning (important updates)
- Info (general information)
- Success (resolved situations)

**Key Features:**
- Read/unread status
- Action URLs for navigation
- Timestamps
- Linked to incidents

**Example Usage:**
```typescript
// Get all alerts
const alerts = await mockAPI.getAlerts();

// Get unread alerts only
const unreadAlerts = await mockAPI.getUnreadAlerts();
```

### 3. SOS Events (Emergency Distress Signals)

**Type:** `SOSEvent[]`  
**Export:** `mockSOSEvents`  
**Count:** 5 SOS events

Emergency distress signals from individuals:
- Medical emergencies
- Security threats
- Accidents
- Natural disaster situations

**Key Features:**
- Real-time status (active, responding, resolved)
- Priority levels
- Battery level tracking
- Audio/video recording status
- Estimated response times
- Responding teams

**Example Usage:**
```typescript
// Get all SOS events
const sosEvents = await mockAPI.getSOSEvents();

// Get active SOS events
const activeSOS = await mockAPI.getActiveSOSEvents();

// Get SOS by location
const nearbySOS = await mockAPI.getSOSEventsByLocation(6.4281, 3.4219, 0.1);
```

### 4. Volunteers (Emergency Response Personnel)

**Type:** `Volunteer[]`  
**Export:** `mockVolunteers`  
**Count:** 6 volunteers

Emergency response volunteers with diverse skills:
- Medical professionals
- Firefighters
- Rescue specialists
- Technical support
- Logistics coordinators

**Key Features:**
- Skills and certifications
- Availability schedules
- Deployment history
- Rating system
- Current assignments
- Experience levels

**Example Usage:**
```typescript
// Get all volunteers
const volunteers = await mockAPI.getVolunteers();

// Get available volunteers
const available = await mockAPI.getAvailableVolunteers();

// Get deployed volunteers
const deployed = await mockAPI.getDeployedVolunteers();

// Get volunteers by incident
const incidentVolunteers = await mockAPI.getVolunteersByIncident('INC-001');
```

### 5. Climate Risks (Environmental Hazards)

**Type:** `ClimateRisk[]`  
**Export:** `mockClimateRisks`  
**Count:** 5 climate risks

Environmental hazards and climate-related threats:
- Flooding
- Heatwaves
- Storms
- Air quality issues
- Sea level rise/coastal erosion

**Key Features:**
- Severity levels (low, moderate, high, extreme)
- Probability percentages
- Affected areas and populations
- Time frames
- Actionable recommendations
- Data sources

**Example Usage:**
```typescript
// Get all climate risks
const risks = await mockAPI.getClimateRisks();

// Get high severity risks
const highRisks = await mockAPI.getHighSeverityRisks();

// Get specific risk
const risk = await mockAPI.getClimateRiskById('CLM-001');
```

### 6. AI Recommendations

**Type:** `AIRecommendation[]`  
**Export:** `mockAIRecommendations`  
**Count:** 7 recommendations

Intelligent suggestions from AI analysis:
- Evacuation routes
- Resource allocation
- Health alerts
- Safety tips
- Emergency preparedness

**Key Features:**
- Priority levels
- Actionable items with URLs
- Type categorization
- Timestamps

**Example Usage:**
```typescript
// Get all recommendations
const recommendations = await mockAPI.getAIRecommendations();

// Get high priority recommendations
const urgent = await mockAPI.getHighPriorityRecommendations();
```

### 7. Activity Feeds (System Activity Log)

**Type:** `ActivityFeed[]`  
**Export:** `mockActivityFeeds`  
**Count:** 15 activities

Real-time system activity tracking:
- Incident updates
- Volunteer deployments
- SOS activations
- Resource allocations
- Climate alerts
- System events

**Key Features:**
- Activity types and actions
- Actor and target tracking
- Severity indicators
- Metadata for context
- Chronological ordering

**Example Usage:**
```typescript
// Get all activities
const activities = await mockAPI.getActivityFeeds();

// Get recent activities (limited)
const recent = await mockAPI.getRecentActivity();

// Get limited number
const latest = await mockAPI.getActivityFeeds(10);
```

### 8. Response Teams

**Type:** `ResponseTeam[]`  
**Export:** `mockResponseTeams`  
**Count:** 11 teams

Emergency response teams:
- Fire brigades
- Medical units
- Police/security
- Rescue squads
- Utility teams

**Key Features:**
- Team types and specializations
- Status (available, deployed, offline)
- Member counts
- Equipment lists
- Current assignments
- Real-time locations

**Example Usage:**
```typescript
// Get all teams
const teams = await mockAPI.getResponseTeams();

// Get available teams
const available = await mockAPI.getAvailableTeams();

// Get deployed teams
const deployed = await mockAPI.getDeployedTeams();
```

### 9. Dashboard Statistics

**Type:** `DashboardStats`  
**Export:** `mockDashboardStats`

Key metrics for dashboard overview:
- Active emergencies count
- Response teams count
- Active zones
- Average response time
- Trend indicators

**Example Usage:**
```typescript
const stats = await mockAPI.getDashboardStats();
```

### 10. Notifications

**Type:** `Notification[]`  
**Export:** `mockNotifications`  
**Count:** 5 notifications

User notifications:
- Emergency alerts
- Team updates
- System messages
- Priority indicators

**Example Usage:**
```typescript
// Get all notifications
const notifications = await mockAPI.getNotifications();

// Get unread notifications
const unread = await mockAPI.getUnreadNotifications();
```

## Data Relationships

### Cross-Referenced Queries

The mock data architecture includes helper functions for accessing interconnected data:

#### Get Incident with Teams
```typescript
const { incident, teams } = await mockAPI.getIncidentWithTeams('INC-001');
// Returns incident and all assigned teams
```

#### Get Incident Context
```typescript
import { dataRelationships } from '@/lib/mockData';

const context = await dataRelationships.getIncidentContext('INC-001');
// Returns: {
//   incident,
//   teams,
//   volunteers,
//   sosEvents,
//   activities,
//   recommendations
// }
```

#### Get Dashboard Overview
```typescript
const overview = await dataRelationships.getDashboardOverview();
// Returns comprehensive dashboard data with summary statistics
```

## Real-Time Simulation

Subscribe to real-time updates:

```typescript
const unsubscribe = mockAPI.subscribeToUpdates((update: ActivityFeed) => {
  console.log('New activity:', update);
  // Handle real-time update
});

// Later, unsubscribe
unsubscribe();
```

## Data Interconnections

### How Data is Connected

1. **Incidents ↔ Teams**: Incidents have `assignedTeams` array linking to team IDs
2. **Incidents ↔ Volunteers**: Volunteers have `currentAssignment` linking to incident IDs
3. **Incidents ↔ SOS Events**: Connected by location proximity
4. **Incidents ↔ Activities**: Activities reference incidents in `target` field
5. **Incidents ↔ Recommendations**: Recommendations link via `actionUrl`
6. **Alerts ↔ Incidents**: Alerts have `actionUrl` pointing to incidents
7. **Climate Risks ↔ Incidents**: Natural disaster incidents relate to climate risks

### Location-Based Connections

All data with locations uses Lagos, Nigeria coordinates:
- Victoria Island: `{ lat: 6.4281, lng: 3.4219 }`
- Lekki: `{ lat: 6.4474, lng: 3.5406 }`
- Third Mainland Bridge: `{ lat: 6.4698, lng: 3.3852 }`
- Ikeja: `{ lat: 6.5964, lng: 3.3515 }`

## Best Practices

### 1. Use Async/Await
All mock API functions are async to simulate real API calls:
```typescript
const data = await mockAPI.getIncidents();
```

### 2. Handle Loading States
Mock functions include realistic delays (200-400ms):
```typescript
const [loading, setLoading] = useState(true);
const [data, setData] = useState([]);

useEffect(() => {
  mockAPI.getIncidents().then(incidents => {
    setData(incidents);
    setLoading(false);
  });
}, []);
```

### 3. Use Type Safety
Import types from the main types file:
```typescript
import { Emergency, SOSEvent, Volunteer } from '@/types';
import { mockAPI } from '@/lib/mockData';
```

### 4. Leverage Relationships
Use relationship helpers for complex queries:
```typescript
import { dataRelationships } from '@/lib/mockData';

const context = await dataRelationships.getIncidentContext('INC-001');
```

## Integration Examples

### Dashboard Widget
```typescript
import { mockAPI } from '@/lib/mockData';
import { useEffect, useState } from 'react';

export function EmergencyWidget() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    mockAPI.getActiveIncidents().then(setIncidents);
  }, []);

  return (
    <div>
      {incidents.map(incident => (
        <div key={incident.id}>{incident.title}</div>
      ))}
    </div>
  );
}
```

### Map Component
```typescript
import { mockAPI } from '@/lib/mockData';

export async function MapView() {
  const [incidents, teams, sosEvents] = await Promise.all([
    mockAPI.getActiveIncidents(),
    mockAPI.getDeployedTeams(),
    mockAPI.getActiveSOSEvents(),
  ]);

  // Render map with markers
}
```

### Real-Time Feed
```typescript
import { mockAPI } from '@/lib/mockData';
import { useEffect, useState } from 'react';

export function ActivityFeed() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    mockAPI.getRecentActivity().then(setActivities);

    const unsubscribe = mockAPI.subscribeToUpdates((update) => {
      setActivities(prev => [update, ...prev].slice(0, 10));
    });

    return unsubscribe;
  }, []);

  return (
    <div>
      {activities.map(activity => (
        <div key={activity.id}>{activity.description}</div>
      ))}
    </div>
  );
}
```

## Data Statistics

- **Total Incidents:** 6 (5 active, 1 resolved)
- **Total Alerts:** 6 (2 unread)
- **Total SOS Events:** 5 (3 active/responding, 1 resolved)
- **Total Volunteers:** 6 (3 available, 2 deployed, 1 training)
- **Total Climate Risks:** 5 (2 high/extreme severity)
- **Total AI Recommendations:** 7 (3 high priority)
- **Total Activity Feeds:** 15 recent activities
- **Total Response Teams:** 11 (10 deployed, 1 available)
- **Total Notifications:** 5 (2 unread)

## Future Enhancements

Potential additions to the mock data:
- Historical incident data
- Weather data integration
- Traffic patterns
- Resource inventory
- Training schedules
- Communication logs
- Media attachments
- Evacuation routes
- Safe zones/shelters

## Support

For questions or issues with the mock data architecture, refer to:
- Main types: `types/index.ts`
- AI types: `lib/ai/types.ts`
- Family data: `lib/mockFamilyData.ts`

---

**Made with Bob** - Comprehensive Mock Data Architecture for AEGIS OS