// Realtime Data Generators for AEGIS OS

import {
  LiveAlert,
  IncidentFeedItem,
  ActivityStreamItem,
  RealtimeDashboardMetrics,
  AlertSeverity,
  AlertCategory,
  IncidentStatus,
  ActivityType,
  IncidentUpdate,
} from './types';

// Sample data pools
const LOCATIONS = [
  { lat: 6.5244, lng: 3.3792, address: 'Victoria Island, Lagos', region: 'Lagos' },
  { lat: 9.0765, lng: 7.3986, address: 'Central District, Abuja', region: 'Abuja' },
  { lat: 7.3775, lng: 3.9470, address: 'Ibadan North, Oyo', region: 'Oyo' },
  { lat: 5.0197, lng: 7.9333, address: 'Port Harcourt City, Rivers', region: 'Rivers' },
  { lat: 11.8333, lng: 13.1500, address: 'Maiduguri, Borno', region: 'Borno' },
  { lat: 12.0022, lng: 8.5919, address: 'Kano City, Kano', region: 'Kano' },
  { lat: 6.3350, lng: 5.6037, address: 'Benin City, Edo', region: 'Edo' },
  { lat: 4.8156, lng: 7.0498, address: 'Calabar, Cross River', region: 'Cross River' },
];

const ALERT_TEMPLATES = {
  natural_disaster: [
    { title: 'Flash Flood Warning', message: 'Heavy rainfall causing flash floods in low-lying areas. Residents advised to move to higher ground.' },
    { title: 'Severe Thunderstorm Alert', message: 'Severe thunderstorms with strong winds and lightning expected. Stay indoors.' },
    { title: 'Earthquake Detected', message: 'Seismic activity detected. Minor tremors reported. Monitor for aftershocks.' },
    { title: 'Landslide Risk', message: 'Heavy rains increase landslide risk in hilly areas. Avoid steep terrain.' },
  ],
  security: [
    { title: 'Security Incident', message: 'Heightened security alert in the area. Avoid large gatherings.' },
    { title: 'Civil Unrest', message: 'Reports of civil unrest. Stay indoors and avoid affected areas.' },
    { title: 'Suspicious Activity', message: 'Suspicious activity reported. Security forces deployed.' },
    { title: 'Curfew Imposed', message: 'Emergency curfew in effect. Return home immediately.' },
  ],
  health: [
    { title: 'Disease Outbreak Alert', message: 'Potential disease outbreak detected. Health screening in progress.' },
    { title: 'Air Quality Warning', message: 'Poor air quality detected. Vulnerable individuals should stay indoors.' },
    { title: 'Water Contamination', message: 'Water supply contamination reported. Use bottled water only.' },
    { title: 'Heat Wave Advisory', message: 'Extreme heat conditions. Stay hydrated and avoid outdoor activities.' },
  ],
  infrastructure: [
    { title: 'Power Outage', message: 'Major power outage affecting the region. Restoration in progress.' },
    { title: 'Water Supply Disruption', message: 'Water supply temporarily disrupted. Emergency supplies being distributed.' },
    { title: 'Bridge Closure', message: 'Major bridge closed due to structural concerns. Use alternate routes.' },
    { title: 'Gas Leak', message: 'Gas leak reported. Area evacuated. Emergency crews responding.' },
  ],
  environmental: [
    { title: 'Oil Spill', message: 'Oil spill detected in waterway. Environmental response team deployed.' },
    { title: 'Wildfire', message: 'Wildfire spreading rapidly. Evacuation orders issued for nearby areas.' },
    { title: 'Chemical Spill', message: 'Hazardous chemical spill. Avoid the area. Cleanup in progress.' },
    { title: 'Air Pollution Spike', message: 'Dangerous air pollution levels. Wear masks and limit outdoor exposure.' },
  ],
  traffic: [
    { title: 'Major Accident', message: 'Multi-vehicle accident causing major delays. Emergency services on scene.' },
    { title: 'Road Closure', message: 'Major road closed due to emergency. Seek alternate routes.' },
    { title: 'Traffic Gridlock', message: 'Severe traffic congestion. Expect significant delays.' },
    { title: 'Bridge Collapse', message: 'Bridge structural failure. Area cordoned off. Emergency response active.' },
  ],
};

const INCIDENT_DESCRIPTIONS = {
  natural_disaster: [
    'Severe flooding has inundated residential areas, displacing families and damaging infrastructure.',
    'Powerful storm system bringing destructive winds and heavy rainfall across the region.',
    'Seismic activity has caused structural damage to buildings and infrastructure.',
    'Prolonged drought conditions leading to water scarcity and agricultural impact.',
  ],
  security: [
    'Security situation requires immediate attention. Multiple agencies coordinating response.',
    'Civil disturbance reported with potential for escalation. Security forces deployed.',
    'Coordinated security operation underway to address emerging threats.',
    'Emergency security measures implemented to ensure public safety.',
  ],
  health: [
    'Public health emergency declared. Medical teams conducting assessments and treatment.',
    'Disease outbreak spreading rapidly. Quarantine measures being implemented.',
    'Mass casualty incident. All available medical resources mobilized.',
    'Environmental health hazard affecting population. Decontamination procedures initiated.',
  ],
  infrastructure: [
    'Critical infrastructure failure affecting essential services. Emergency repairs underway.',
    'Major utility disruption impacting thousands. Restoration crews working around the clock.',
    'Structural collapse of key infrastructure. Search and rescue operations active.',
    'Cascading infrastructure failures requiring coordinated emergency response.',
  ],
  environmental: [
    'Environmental disaster with potential long-term ecological impact. Containment efforts ongoing.',
    'Hazardous material release threatening public health and environment.',
    'Large-scale environmental contamination. Cleanup and remediation in progress.',
    'Ecological emergency requiring immediate intervention and resource deployment.',
  ],
  traffic: [
    'Major transportation incident causing widespread disruption. Emergency services responding.',
    'Critical transportation infrastructure compromised. Alternate routes being established.',
    'Mass transit emergency affecting thousands of commuters. Evacuation procedures initiated.',
    'Transportation system failure requiring emergency management coordination.',
  ],
};

const ACTIVITY_MESSAGES = {
  alert: ['New alert issued', 'Emergency alert broadcast', 'Warning notification sent', 'Alert system activated'],
  incident: ['New incident reported', 'Emergency incident logged', 'Crisis situation developing', 'Incident response initiated'],
  update: ['Situation update available', 'Status change reported', 'New information received', 'Update from field teams'],
  resolution: ['Incident resolved', 'Situation stabilized', 'Emergency concluded', 'All-clear issued'],
  evacuation: ['Evacuation order issued', 'Evacuation in progress', 'Safe zone established', 'Evacuation complete'],
  resource_deployment: ['Resources deployed', 'Emergency teams dispatched', 'Support units mobilized', 'Aid distribution started'],
};

// Utility functions
function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSeverity(): AlertSeverity {
  const severities: AlertSeverity[] = ['critical', 'high', 'medium', 'low', 'info'];
  const weights = [0.1, 0.2, 0.3, 0.25, 0.15]; // Weighted distribution
  const random = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random <= sum) return severities[i];
  }
  return 'medium';
}

function randomCategory(): AlertCategory {
  const categories: AlertCategory[] = [
    'natural_disaster',
    'security',
    'health',
    'infrastructure',
    'environmental',
    'traffic',
  ];
  return randomElement(categories);
}

// Generate Live Alert
export function generateLiveAlert(): LiveAlert {
  const category = randomCategory();
  const severity = randomSeverity();
  const location = randomElement(LOCATIONS);
  const template = randomElement(ALERT_TEMPLATES[category]);
  
  return {
    id: `alert-${Date.now()}-${randomInt(1000, 9999)}`,
    timestamp: new Date(),
    severity,
    category,
    title: template.title,
    message: template.message,
    location: {
      ...location,
    },
    affectedPopulation: randomInt(100, 50000),
    isNew: true,
    expiresAt: new Date(Date.now() + randomInt(300000, 3600000)), // 5-60 minutes
    actionRequired: severity === 'critical' || severity === 'high',
    metadata: {
      source: 'AEGIS Monitoring System',
      confidence: randomInt(70, 100),
    },
  };
}

// Generate Incident Feed Item
export function generateIncident(): IncidentFeedItem {
  const type = randomCategory();
  const severity = randomSeverity();
  const location = randomElement(LOCATIONS);
  const status: IncidentStatus = randomElement(['active', 'monitoring', 'escalating']);
  const template = randomElement(ALERT_TEMPLATES[type]);
  const description = randomElement(INCIDENT_DESCRIPTIONS[type]);
  
  const incident: IncidentFeedItem = {
    id: `incident-${Date.now()}-${randomInt(1000, 9999)}`,
    timestamp: new Date(Date.now() - randomInt(0, 7200000)), // Up to 2 hours ago
    status,
    type,
    title: template.title,
    description,
    location: location.address,
    coordinates: { lat: location.lat, lng: location.lng },
    severity,
    casualties: severity === 'critical' || severity === 'high' ? randomInt(0, 50) : undefined,
    evacuees: severity === 'critical' || severity === 'high' ? randomInt(100, 5000) : undefined,
    responders: randomInt(10, 200),
    updates: [],
    trend: randomElement(['escalating', 'stable', 'improving']),
    lastUpdated: new Date(),
  };
  
  // Add some updates
  const updateCount = randomInt(1, 4);
  for (let i = 0; i < updateCount; i++) {
    incident.updates.push(generateIncidentUpdate(incident.id, i));
  }
  
  return incident;
}

// Generate Incident Update
export function generateIncidentUpdate(incidentId: string, index: number): IncidentUpdate {
  const updateTypes: IncidentUpdate['type'][] = ['status_change', 'resource_update', 'casualty_update', 'general'];
  const messages = [
    'Emergency response teams have arrived on scene',
    'Situation assessment in progress',
    'Additional resources requested and en route',
    'Evacuation procedures initiated for affected areas',
    'Medical teams treating casualties',
    'Perimeter established and secured',
    'Coordination with local authorities ongoing',
    'Weather conditions complicating response efforts',
    'Specialized equipment deployed',
    'Communication systems restored in affected area',
  ];
  
  return {
    id: `update-${incidentId}-${index}`,
    timestamp: new Date(Date.now() - randomInt(0, 3600000)),
    message: randomElement(messages),
    type: randomElement(updateTypes),
    severity: Math.random() > 0.7 ? randomSeverity() : undefined,
  };
}

// Generate Activity Stream Item
export function generateActivity(): ActivityStreamItem {
  const type: ActivityType = randomElement([
    'alert',
    'incident',
    'update',
    'resolution',
    'evacuation',
    'resource_deployment',
  ]);
  const severity = randomSeverity();
  const location = randomElement(LOCATIONS);
  const message = randomElement(ACTIVITY_MESSAGES[type]);
  
  return {
    id: `activity-${Date.now()}-${randomInt(1000, 9999)}`,
    timestamp: new Date(),
    type,
    title: message,
    description: `${message} in ${location.region}`,
    severity,
    location: location.address,
    icon: getActivityIcon(type),
    metadata: {
      region: location.region,
      automated: Math.random() > 0.3,
    },
  };
}

// Generate Dashboard Metrics
export function generateDashboardMetrics(previous?: RealtimeDashboardMetrics): RealtimeDashboardMetrics {
  const activeIncidents = previous ? 
    Math.max(0, previous.activeIncidents + randomInt(-2, 3)) : 
    randomInt(15, 45);
  
  const criticalAlerts = previous ?
    Math.max(0, previous.criticalAlerts + randomInt(-1, 2)) :
    randomInt(5, 20);
  
  const peopleAffected = previous ?
    Math.max(0, previous.peopleAffected + randomInt(-500, 1000)) :
    randomInt(5000, 50000);
  
  const activeResponders = previous ?
    Math.max(0, previous.activeResponders + randomInt(-10, 20)) :
    randomInt(200, 800);
  
  const evacuationCenters = previous ?
    Math.max(0, previous.evacuationCenters + randomInt(-1, 2)) :
    randomInt(10, 30);
  
  const resourcesDeployed = previous ?
    Math.max(0, previous.resourcesDeployed + randomInt(-5, 10)) :
    randomInt(50, 200);
  
  return {
    activeIncidents,
    criticalAlerts,
    peopleAffected,
    activeResponders,
    evacuationCenters,
    resourcesDeployed,
    trend: {
      incidents: previous ? 
        Math.round(((activeIncidents - previous.activeIncidents) / previous.activeIncidents) * 100) : 
        randomInt(-10, 10),
      alerts: previous ?
        Math.round(((criticalAlerts - previous.criticalAlerts) / previous.criticalAlerts) * 100) :
        randomInt(-15, 15),
      affected: previous ?
        Math.round(((peopleAffected - previous.peopleAffected) / previous.peopleAffected) * 100) :
        randomInt(-5, 20),
    },
    lastUpdated: new Date(),
  };
}

// Helper function to get activity icon
function getActivityIcon(type: ActivityType): string {
  const icons: Record<ActivityType, string> = {
    alert: '🚨',
    incident: '⚠️',
    update: '📢',
    resolution: '✅',
    evacuation: '🚶',
    resource_deployment: '🚁',
  };
  return icons[type];
}

// Batch generators
export function generateMultipleAlerts(count: number): LiveAlert[] {
  return Array.from({ length: count }, () => generateLiveAlert());
}

export function generateMultipleIncidents(count: number): IncidentFeedItem[] {
  return Array.from({ length: count }, () => generateIncident());
}

export function generateMultipleActivities(count: number): ActivityStreamItem[] {
  return Array.from({ length: count }, () => generateActivity());
}

// Made with Bob
