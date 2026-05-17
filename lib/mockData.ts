/**
 * AEGIS OS - Comprehensive Mock Data Architecture
 * Realistic interconnected data for all dashboards and widgets
 */

import {
  Emergency,
  ResponseTeam,
  Resource,
  Alert,
  User,
  DashboardStats,
  Notification,
  ActivityLog,
  FamilyMember,
  FamilyGroup,
  SafetyAlert,
  AIRecommendation,
} from '@/types';

// ============================================================================
// INCIDENTS - Emergency Events
// ============================================================================

export const mockIncidents: Emergency[] = [
  {
    id: 'INC-001',
    type: 'fire',
    title: 'Building Fire at Victoria Island',
    description: 'Major fire outbreak in a 12-story commercial building. Multiple floors affected. Evacuation in progress.',
    location: {
      address: '23 Adeola Odeku Street, Victoria Island, Lagos',
      coordinates: { lat: 6.4281, lng: 3.4219 },
    },
    status: 'critical',
    priority: 'high',
    reportedAt: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 5),
    assignedTeams: ['TEAM-001', 'TEAM-002', 'TEAM-005'],
    affectedPeople: 150,
    estimatedDamage: '$2.5M - $5M',
  },
  {
    id: 'INC-002',
    type: 'medical',
    title: 'Mass Casualty Incident - Traffic Accident',
    description: 'Multi-vehicle collision on Third Mainland Bridge. 8 vehicles involved, multiple casualties.',
    location: {
      address: 'Third Mainland Bridge, Lagos',
      coordinates: { lat: 6.4698, lng: 3.3852 },
    },
    status: 'critical',
    priority: 'high',
    reportedAt: new Date(Date.now() - 1000 * 60 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 2),
    assignedTeams: ['TEAM-003', 'TEAM-004', 'TEAM-006'],
    affectedPeople: 25,
    estimatedDamage: '$500K - $1M',
  },
  {
    id: 'INC-003',
    type: 'natural-disaster',
    title: 'Flash Flooding in Lekki',
    description: 'Heavy rainfall causing severe flooding. Multiple roads impassable. Residents trapped in homes.',
    location: {
      address: 'Lekki Phase 1, Lagos',
      coordinates: { lat: 6.4474, lng: 3.5406 },
    },
    status: 'warning',
    priority: 'high',
    reportedAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 10),
    assignedTeams: ['TEAM-007', 'TEAM-008'],
    affectedPeople: 500,
    estimatedDamage: '$1M - $3M',
  },
  {
    id: 'INC-004',
    type: 'security',
    title: 'Security Breach at Government Facility',
    description: 'Unauthorized access detected at government building. Security teams responding.',
    location: {
      address: 'Alausa Secretariat, Ikeja, Lagos',
      coordinates: { lat: 6.6018, lng: 3.3515 },
    },
    status: 'warning',
    priority: 'medium',
    reportedAt: new Date(Date.now() - 1000 * 60 * 60),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15),
    assignedTeams: ['TEAM-009'],
    affectedPeople: 50,
  },
  {
    id: 'INC-005',
    type: 'natural-disaster',
    title: 'Coastal Erosion Warning',
    description: 'Severe coastal erosion threatening beachfront properties. Evacuation advisory issued.',
    location: {
      address: 'Bar Beach, Victoria Island, Lagos',
      coordinates: { lat: 6.4241, lng: 3.4197 },
    },
    status: 'normal',
    priority: 'medium',
    reportedAt: new Date(Date.now() - 1000 * 60 * 180),
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    assignedTeams: ['TEAM-010'],
    affectedPeople: 200,
    estimatedDamage: '$500K - $2M',
  },
  {
    id: 'INC-006',
    type: 'other',
    title: 'Power Grid Failure',
    description: 'Major power outage affecting multiple districts. Backup systems activated.',
    location: {
      address: 'Ikeja Electric Distribution, Lagos',
      coordinates: { lat: 6.5964, lng: 3.3515 },
    },
    status: 'resolved',
    priority: 'low',
    reportedAt: new Date(Date.now() - 1000 * 60 * 240),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60),
    assignedTeams: ['TEAM-011'],
    affectedPeople: 10000,
    estimatedDamage: '$100K - $500K',
  },
];

// ============================================================================
// ALERTS - System-wide Notifications
// ============================================================================

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-001',
    type: 'danger',
    title: 'Critical Fire Emergency',
    message: 'Building fire at Victoria Island requires immediate attention. Multiple teams deployed.',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    actionUrl: '/incidents/INC-001',
  },
  {
    id: 'ALT-002',
    type: 'danger',
    title: 'Mass Casualty Event',
    message: 'Multi-vehicle accident on Third Mainland Bridge. All available medical teams respond.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    actionUrl: '/incidents/INC-002',
  },
  {
    id: 'ALT-003',
    type: 'warning',
    title: 'Flood Warning Active',
    message: 'Flash flooding in Lekki area. Residents advised to seek higher ground.',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: true,
    actionUrl: '/incidents/INC-003',
  },
  {
    id: 'ALT-004',
    type: 'warning',
    title: 'Security Alert',
    message: 'Security breach detected at government facility. Investigation ongoing.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    actionUrl: '/incidents/INC-004',
  },
  {
    id: 'ALT-005',
    type: 'info',
    title: 'Weather Advisory',
    message: 'Heavy rainfall expected in the next 6 hours. Monitor flood-prone areas.',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    read: true,
  },
  {
    id: 'ALT-006',
    type: 'success',
    title: 'Power Restored',
    message: 'Power grid failure resolved. All systems operational.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    actionUrl: '/incidents/INC-006',
  },
];

// ============================================================================
// SOS EVENTS - Emergency Distress Signals
// ============================================================================

export interface SOSEvent {
  id: string;
  userId: string;
  userName: string;
  type: 'medical' | 'security' | 'fire' | 'accident' | 'natural-disaster' | 'other';
  status: 'active' | 'responding' | 'resolved' | 'false-alarm';
  priority: 'critical' | 'high' | 'medium' | 'low';
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  timestamp: Date;
  description?: string;
  respondingTeams: string[];
  estimatedResponseTime?: number; // minutes
  audioRecording?: boolean;
  videoStream?: boolean;
  batteryLevel?: number;
}

export const mockSOSEvents: SOSEvent[] = [
  {
    id: 'SOS-001',
    userId: 'fm-004',
    userName: 'Michael Smith',
    type: 'medical',
    status: 'responding',
    priority: 'critical',
    location: {
      address: 'Lagos University Teaching Hospital',
      coordinates: { lat: 6.4698, lng: 3.5852 },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    description: 'Child injured in school accident. Asthma attack triggered.',
    respondingTeams: ['TEAM-003'],
    estimatedResponseTime: 8,
    audioRecording: true,
    batteryLevel: 45,
  },
  {
    id: 'SOS-002',
    userId: 'fm-006',
    userName: 'Grace Johnson',
    type: 'security',
    status: 'active',
    priority: 'critical',
    location: {
      address: 'Lekki Phase 1, Lagos',
      coordinates: { lat: 6.4474, lng: 3.5406 },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    description: 'Person reported missing. Last known location 2 hours ago.',
    respondingTeams: ['TEAM-009'],
    estimatedResponseTime: 15,
    batteryLevel: 12,
  },
  {
    id: 'SOS-003',
    userId: 'USR-015',
    userName: 'Ahmed Bello',
    type: 'accident',
    status: 'responding',
    priority: 'high',
    location: {
      address: 'Third Mainland Bridge, Lagos',
      coordinates: { lat: 6.4698, lng: 3.3852 },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    description: 'Involved in multi-vehicle collision. Minor injuries.',
    respondingTeams: ['TEAM-003', 'TEAM-004'],
    estimatedResponseTime: 5,
    audioRecording: true,
    videoStream: true,
    batteryLevel: 78,
  },
  {
    id: 'SOS-004',
    userId: 'USR-022',
    userName: 'Chioma Okafor',
    type: 'fire',
    status: 'responding',
    priority: 'critical',
    location: {
      address: '23 Adeola Odeku Street, Victoria Island',
      coordinates: { lat: 6.4281, lng: 3.4219 },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    description: 'Trapped on 8th floor of burning building. Smoke inhalation.',
    respondingTeams: ['TEAM-001', 'TEAM-002'],
    estimatedResponseTime: 3,
    audioRecording: true,
    videoStream: false,
    batteryLevel: 23,
  },
  {
    id: 'SOS-005',
    userId: 'USR-031',
    userName: 'Oluwaseun Adeyemi',
    type: 'natural-disaster',
    status: 'resolved',
    priority: 'medium',
    location: {
      address: 'Lekki Phase 1, Lagos',
      coordinates: { lat: 6.4474, lng: 3.5406 },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 150),
    description: 'Trapped by flooding. Successfully rescued.',
    respondingTeams: ['TEAM-007'],
    batteryLevel: 89,
  },
];

// Made with Bob


// ============================================================================
// VOLUNTEERS - Emergency Response Volunteers
// ============================================================================

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'available' | 'deployed' | 'off-duty' | 'training';
  skills: string[];
  certifications: string[];
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  availability: {
    days: string[];
    hours: string;
  };
  experience: number; // years
  deploymentHistory: number;
  rating: number; // 0-5
  currentAssignment?: string;
  joinedDate: Date;
}

export const mockVolunteers: Volunteer[] = [
  {
    id: 'VOL-001',
    name: 'Dr. Adebayo Ogunlesi',
    email: 'adebayo.ogunlesi@volunteer.aegis.org',
    phone: '+234-805-123-4567',
    avatar: '👨‍⚕️',
    status: 'deployed',
    skills: ['Emergency Medicine', 'Trauma Care', 'Triage'],
    certifications: ['EMT-P', 'ACLS', 'PALS', 'BLS'],
    location: {
      address: 'Third Mainland Bridge, Lagos',
      coordinates: { lat: 6.4698, lng: 3.3852 },
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '24/7',
    },
    experience: 8,
    deploymentHistory: 156,
    rating: 4.9,
    currentAssignment: 'INC-002',
    joinedDate: new Date('2020-03-15'),
  },
  {
    id: 'VOL-002',
    name: 'Ngozi Eze',
    email: 'ngozi.eze@volunteer.aegis.org',
    phone: '+234-806-234-5678',
    avatar: '👩‍🚒',
    status: 'deployed',
    skills: ['Firefighting', 'Rescue Operations', 'First Aid'],
    certifications: ['Firefighter I', 'Firefighter II', 'Hazmat Awareness'],
    location: {
      address: '23 Adeola Odeku Street, Victoria Island',
      coordinates: { lat: 6.4281, lng: 3.4219 },
    },
    availability: {
      days: ['All Days'],
      hours: '24/7',
    },
    experience: 5,
    deploymentHistory: 89,
    rating: 4.8,
    currentAssignment: 'INC-001',
    joinedDate: new Date('2021-06-20'),
  },
  {
    id: 'VOL-003',
    name: 'Ibrahim Yusuf',
    email: 'ibrahim.yusuf@volunteer.aegis.org',
    phone: '+234-807-345-6789',
    avatar: '👨‍💼',
    status: 'available',
    skills: ['Search and Rescue', 'Water Rescue', 'Navigation'],
    certifications: ['Swift Water Rescue', 'Rope Rescue', 'CPR'],
    location: {
      address: 'Ikeja, Lagos',
      coordinates: { lat: 6.5964, lng: 3.3515 },
    },
    availability: {
      days: ['Saturday', 'Sunday'],
      hours: '08:00-20:00',
    },
    experience: 3,
    deploymentHistory: 42,
    rating: 4.6,
    joinedDate: new Date('2022-09-10'),
  },
  {
    id: 'VOL-004',
    name: 'Fatima Abdullahi',
    email: 'fatima.abdullahi@volunteer.aegis.org',
    phone: '+234-808-456-7890',
    avatar: '👩‍⚕️',
    status: 'available',
    skills: ['Nursing', 'Pediatric Care', 'Mental Health Support'],
    certifications: ['RN', 'PALS', 'Mental Health First Aid'],
    location: {
      address: 'Surulere, Lagos',
      coordinates: { lat: 6.4969, lng: 3.3561 },
    },
    availability: {
      days: ['Monday', 'Wednesday', 'Friday'],
      hours: '09:00-17:00',
    },
    experience: 6,
    deploymentHistory: 78,
    rating: 4.9,
    joinedDate: new Date('2020-11-05'),
  },
  {
    id: 'VOL-005',
    name: 'Chukwudi Nwosu',
    email: 'chukwudi.nwosu@volunteer.aegis.org',
    phone: '+234-809-567-8901',
    avatar: '👨‍🔧',
    status: 'training',
    skills: ['Technical Rescue', 'Equipment Operation', 'Communications'],
    certifications: ['Technical Rescue I', 'Radio Operator'],
    location: {
      address: 'Lekki, Lagos',
      coordinates: { lat: 6.4474, lng: 3.5406 },
    },
    availability: {
      days: ['All Days'],
      hours: 'Flexible',
    },
    experience: 2,
    deploymentHistory: 23,
    rating: 4.5,
    joinedDate: new Date('2023-02-14'),
  },
  {
    id: 'VOL-006',
    name: 'Aisha Mohammed',
    email: 'aisha.mohammed@volunteer.aegis.org',
    phone: '+234-810-678-9012',
    avatar: '👩‍💻',
    status: 'available',
    skills: ['GIS Mapping', 'Data Analysis', 'Logistics Coordination'],
    certifications: ['GIS Professional', 'Project Management'],
    location: {
      address: 'Victoria Island, Lagos',
      coordinates: { lat: 6.4281, lng: 3.4219 },
    },
    availability: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      hours: '08:00-18:00',
    },
    experience: 4,
    deploymentHistory: 67,
    rating: 4.7,
    joinedDate: new Date('2021-08-22'),
  },
];

// ============================================================================
// CLIMATE RISKS - Environmental Hazards
// ============================================================================

export interface ClimateRisk {
  id: string;
  type: 'flood' | 'heatwave' | 'storm' | 'drought' | 'sea-level-rise' | 'air-quality' | 'wildfire';
  title: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'extreme';
  probability: number; // 0-100
  affectedAreas: string[];
  coordinates: { lat: number; lng: number }[];
  timeframe: {
    start: Date;
    end: Date;
  };
  population: number;
  recommendations: string[];
  lastUpdated: Date;
  source: string;
}

export const mockClimateRisks: ClimateRisk[] = [
  {
    id: 'CLM-001',
    type: 'flood',
    title: 'High Flood Risk - Coastal Areas',
    description: 'Rising sea levels and heavy rainfall increase flood risk in low-lying coastal areas. Immediate action required.',
    severity: 'high',
    probability: 85,
    affectedAreas: ['Victoria Island', 'Lekki', 'Ikoyi', 'Bar Beach'],
    coordinates: [
      { lat: 6.4281, lng: 3.4219 },
      { lat: 6.4474, lng: 3.5406 },
      { lat: 6.4541, lng: 3.4316 },
    ],
    timeframe: {
      start: new Date(),
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    },
    population: 50000,
    recommendations: [
      'Evacuate low-lying areas',
      'Prepare emergency supplies',
      'Monitor weather updates',
      'Avoid flood-prone roads',
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 30),
    source: 'Nigerian Meteorological Agency',
  },
  {
    id: 'CLM-002',
    type: 'heatwave',
    title: 'Extreme Heat Warning',
    description: 'Temperatures expected to exceed 38°C for extended period. Heat-related illnesses likely.',
    severity: 'extreme',
    probability: 92,
    affectedAreas: ['Ikeja', 'Surulere', 'Yaba', 'Mushin'],
    coordinates: [
      { lat: 6.5964, lng: 3.3515 },
      { lat: 6.4969, lng: 3.3561 },
      { lat: 6.5044, lng: 3.3711 },
    ],
    timeframe: {
      start: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days
    },
    population: 200000,
    recommendations: [
      'Stay hydrated',
      'Avoid outdoor activities during peak hours',
      'Check on vulnerable individuals',
      'Use cooling centers',
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 15),
    source: 'National Emergency Management Agency',
  },
  {
    id: 'CLM-003',
    type: 'storm',
    title: 'Severe Thunderstorm Alert',
    description: 'Strong winds, heavy rain, and lightning expected. Potential for property damage and power outages.',
    severity: 'moderate',
    probability: 70,
    affectedAreas: ['Entire Lagos State'],
    coordinates: [
      { lat: 6.5244, lng: 3.3792 },
    ],
    timeframe: {
      start: new Date(Date.now() + 1000 * 60 * 60 * 6), // 6 hours
      end: new Date(Date.now() + 1000 * 60 * 60 * 18), // 18 hours
    },
    population: 15000000,
    recommendations: [
      'Secure loose outdoor items',
      'Stay indoors during storm',
      'Unplug electronic devices',
      'Have flashlights ready',
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 45),
    source: 'Nigerian Meteorological Agency',
  },
  {
    id: 'CLM-004',
    type: 'air-quality',
    title: 'Poor Air Quality Advisory',
    description: 'High levels of particulate matter due to traffic and industrial emissions. Respiratory issues possible.',
    severity: 'moderate',
    probability: 78,
    affectedAreas: ['Apapa', 'Tin Can Island', 'Oshodi', 'Ojota'],
    coordinates: [
      { lat: 6.4474, lng: 3.3594 },
      { lat: 6.5392, lng: 3.3489 },
    ],
    timeframe: {
      start: new Date(),
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
    },
    population: 80000,
    recommendations: [
      'Limit outdoor activities',
      'Use air purifiers indoors',
      'Wear masks if necessary',
      'Keep windows closed',
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60),
    source: 'Lagos State Environmental Protection Agency',
  },
  {
    id: 'CLM-005',
    type: 'sea-level-rise',
    title: 'Coastal Erosion Risk',
    description: 'Long-term sea level rise threatening coastal infrastructure and communities.',
    severity: 'high',
    probability: 95,
    affectedAreas: ['Bar Beach', 'Kuramo Beach', 'Elegushi Beach'],
    coordinates: [
      { lat: 6.4241, lng: 3.4197 },
      { lat: 6.4389, lng: 3.4267 },
    ],
    timeframe: {
      start: new Date(),
      end: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
    },
    population: 5000,
    recommendations: [
      'Relocate vulnerable structures',
      'Implement coastal defenses',
      'Monitor erosion patterns',
      'Plan long-term adaptation',
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
    source: 'Nigerian Institute for Oceanography',
  },
];

// ============================================================================
// AI RECOMMENDATIONS - Intelligent Suggestions
// ============================================================================

export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 'AI-REC-001',
    type: 'evacuation-route',
    title: 'Optimal Evacuation Route - Victoria Island Fire',
    description: 'AI analysis suggests using Falomo Bridge and Ozumba Mbadiwe Avenue for fastest evacuation. Avoid Adeola Odeku due to fire proximity.',
    priority: 'high',
    actionable: true,
    actionUrl: '/map/evacuation/INC-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
  },
  {
    id: 'AI-REC-002',
    type: 'emergency-prep',
    title: 'Resource Allocation Recommendation',
    description: 'Deploy 2 additional ambulances to Third Mainland Bridge. Current resources insufficient for casualty count.',
    priority: 'high',
    actionable: true,
    actionUrl: '/resources/allocate',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: 'AI-REC-003',
    type: 'health-alert',
    title: 'Heat-Related Illness Prevention',
    description: 'Extreme heat expected. Recommend opening 5 cooling centers in high-risk areas. Prioritize elderly and children.',
    priority: 'medium',
    actionable: true,
    actionUrl: '/climate/heatwave/CLM-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
  },
  {
    id: 'AI-REC-004',
    type: 'safety-tip',
    title: 'Flood Preparedness Alert',
    description: 'Historical data shows 85% flood probability in next 48 hours. Recommend pre-positioning rescue boats in Lekki and VI.',
    priority: 'high',
    actionable: true,
    actionUrl: '/climate/flood/CLM-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
  },
  {
    id: 'AI-REC-005',
    type: 'emergency-prep',
    title: 'Volunteer Mobilization',
    description: 'Current incident load exceeds capacity. Recommend activating 10 additional volunteers with medical training.',
    priority: 'medium',
    actionable: true,
    actionUrl: '/volunteers/mobilize',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: 'AI-REC-006',
    type: 'safety-tip',
    title: 'Traffic Pattern Analysis',
    description: 'AI detects unusual traffic congestion on Lekki-Epe Expressway. Possible secondary incident or evacuation bottleneck.',
    priority: 'medium',
    actionable: true,
    actionUrl: '/map/traffic',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: 'AI-REC-007',
    type: 'health-alert',
    title: 'Air Quality Health Advisory',
    description: 'Poor air quality detected in Apapa. Recommend issuing health advisory for residents with respiratory conditions.',
    priority: 'low',
    actionable: true,
    actionUrl: '/climate/air-quality/CLM-004',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
  },
];


// ============================================================================
// ACTIVITY FEEDS - Real-time System Activity
// ============================================================================

export interface ActivityFeed {
  id: string;
  type: 'incident' | 'sos' | 'volunteer' | 'resource' | 'alert' | 'system' | 'climate';
  action: string;
  description: string;
  actor?: string;
  target?: string;
  timestamp: Date;
  severity?: 'info' | 'warning' | 'critical';
  metadata?: Record<string, any>;
}

export const mockActivityFeeds: ActivityFeed[] = [
  {
    id: 'ACT-001',
    type: 'incident',
    action: 'INCIDENT_CREATED',
    description: 'New critical fire incident reported at Victoria Island',
    actor: 'System',
    target: 'INC-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    severity: 'critical',
    metadata: { incidentType: 'fire', location: 'Victoria Island' },
  },
  {
    id: 'ACT-002',
    type: 'volunteer',
    action: 'VOLUNTEER_DEPLOYED',
    description: 'Dr. Adebayo Ogunlesi deployed to mass casualty incident',
    actor: 'Coordinator John Doe',
    target: 'VOL-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    severity: 'info',
    metadata: { volunteerId: 'VOL-001', incidentId: 'INC-002' },
  },
  {
    id: 'ACT-003',
    type: 'sos',
    action: 'SOS_ACTIVATED',
    description: 'Emergency SOS activated by Michael Smith - Medical emergency',
    actor: 'Michael Smith',
    target: 'SOS-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    severity: 'critical',
    metadata: { sosType: 'medical', userId: 'fm-004' },
  },
  {
    id: 'ACT-004',
    type: 'resource',
    action: 'RESOURCE_ALLOCATED',
    description: '3 fire trucks allocated to Victoria Island incident',
    actor: 'Resource Manager',
    target: 'INC-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 42),
    severity: 'info',
    metadata: { resourceType: 'vehicle', quantity: 3 },
  },
  {
    id: 'ACT-005',
    type: 'alert',
    action: 'ALERT_ISSUED',
    description: 'Critical alert issued for building fire emergency',
    actor: 'System',
    target: 'ALT-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    severity: 'critical',
    metadata: { alertType: 'danger' },
  },
  {
    id: 'ACT-006',
    type: 'climate',
    action: 'CLIMATE_RISK_UPDATED',
    description: 'Flood risk probability increased to 85% for coastal areas',
    actor: 'Climate AI',
    target: 'CLM-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    severity: 'warning',
    metadata: { riskType: 'flood', probability: 85 },
  },
  {
    id: 'ACT-007',
    type: 'incident',
    action: 'INCIDENT_UPDATED',
    description: 'Mass casualty incident status updated - 8 patients transported',
    actor: 'Field Commander',
    target: 'INC-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    severity: 'info',
    metadata: { patientsTransported: 8 },
  },
  {
    id: 'ACT-008',
    type: 'volunteer',
    action: 'VOLUNTEER_DEPLOYED',
    description: 'Ngozi Eze deployed to building fire incident',
    actor: 'Coordinator Jane Smith',
    target: 'VOL-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    severity: 'info',
    metadata: { volunteerId: 'VOL-002', incidentId: 'INC-001' },
  },
  {
    id: 'ACT-009',
    type: 'sos',
    action: 'SOS_RESPONDING',
    description: 'Emergency team responding to Grace Johnson missing person SOS',
    actor: 'TEAM-009',
    target: 'SOS-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 110),
    severity: 'warning',
    metadata: { sosType: 'security', estimatedArrival: 15 },
  },
  {
    id: 'ACT-010',
    type: 'system',
    action: 'AI_RECOMMENDATION',
    description: 'AI generated optimal evacuation route for Victoria Island',
    actor: 'AEGIS AI',
    target: 'AI-REC-001',
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    severity: 'info',
    metadata: { recommendationType: 'evacuation-route' },
  },
  {
    id: 'ACT-011',
    type: 'incident',
    action: 'INCIDENT_RESOLVED',
    description: 'Power grid failure incident resolved - All systems operational',
    actor: 'Technical Team',
    target: 'INC-006',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    severity: 'info',
    metadata: { resolutionTime: 180 },
  },
  {
    id: 'ACT-012',
    type: 'climate',
    action: 'CLIMATE_ALERT_ISSUED',
    description: 'Extreme heat warning issued for multiple districts',
    actor: 'Climate Monitoring System',
    target: 'CLM-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    severity: 'warning',
    metadata: { riskType: 'heatwave', severity: 'extreme' },
  },
  {
    id: 'ACT-013',
    type: 'resource',
    action: 'RESOURCE_REQUESTED',
    description: 'Additional ambulances requested for Third Mainland Bridge',
    actor: 'Field Coordinator',
    target: 'INC-002',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
    severity: 'warning',
    metadata: { resourceType: 'ambulance', quantity: 2 },
  },
  {
    id: 'ACT-014',
    type: 'sos',
    action: 'SOS_RESOLVED',
    description: 'Flood rescue SOS resolved - Oluwaseun Adeyemi safely rescued',
    actor: 'TEAM-007',
    target: 'SOS-005',
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    severity: 'info',
    metadata: { sosType: 'natural-disaster', outcome: 'successful' },
  },
  {
    id: 'ACT-015',
    type: 'volunteer',
    action: 'VOLUNTEER_AVAILABLE',
    description: 'Ibrahim Yusuf marked as available for deployment',
    actor: 'Ibrahim Yusuf',
    target: 'VOL-003',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    severity: 'info',
    metadata: { volunteerId: 'VOL-003', status: 'available' },
  },
];

// ============================================================================
// RESPONSE TEAMS
// ============================================================================

export const mockResponseTeams: ResponseTeam[] = [
  {
    id: 'TEAM-001',
    name: 'Fire Brigade Alpha',
    type: 'fire',
    status: 'deployed',
    members: 8,
    location: { lat: 6.4281, lng: 3.4219 },
    equipment: ['Fire Truck', 'Ladder', 'Hoses', 'Breathing Apparatus'],
    currentAssignment: 'INC-001',
  },
  {
    id: 'TEAM-002',
    name: 'Fire Brigade Bravo',
    type: 'fire',
    status: 'deployed',
    members: 6,
    location: { lat: 6.4281, lng: 3.4219 },
    equipment: ['Fire Truck', 'Rescue Tools', 'Thermal Camera'],
    currentAssignment: 'INC-001',
  },
  {
    id: 'TEAM-003',
    name: 'Medical Response Unit 1',
    type: 'medical',
    status: 'deployed',
    members: 5,
    location: { lat: 6.4698, lng: 3.3852 },
    equipment: ['Ambulance', 'Defibrillator', 'Medical Supplies', 'Stretchers'],
    currentAssignment: 'INC-002',
  },
  {
    id: 'TEAM-004',
    name: 'Medical Response Unit 2',
    type: 'medical',
    status: 'deployed',
    members: 5,
    location: { lat: 6.4698, lng: 3.3852 },
    equipment: ['Ambulance', 'Trauma Kit', 'Oxygen Tanks'],
    currentAssignment: 'INC-002',
  },
  {
    id: 'TEAM-005',
    name: 'Rescue Squad Alpha',
    type: 'rescue',
    status: 'deployed',
    members: 10,
    location: { lat: 6.4281, lng: 3.4219 },
    equipment: ['Rescue Vehicle', 'Ropes', 'Cutting Tools', 'Life Detectors'],
    currentAssignment: 'INC-001',
  },
  {
    id: 'TEAM-006',
    name: 'Police Rapid Response',
    type: 'police',
    status: 'deployed',
    members: 12,
    location: { lat: 6.4698, lng: 3.3852 },
    equipment: ['Patrol Vehicles', 'Traffic Control Equipment', 'Communication Gear'],
    currentAssignment: 'INC-002',
  },
  {
    id: 'TEAM-007',
    name: 'Water Rescue Team',
    type: 'rescue',
    status: 'deployed',
    members: 8,
    location: { lat: 6.4474, lng: 3.5406 },
    equipment: ['Rescue Boats', 'Life Jackets', 'Diving Gear', 'Ropes'],
    currentAssignment: 'INC-003',
  },
  {
    id: 'TEAM-008',
    name: 'Utility Response Team',
    type: 'utility',
    status: 'deployed',
    members: 6,
    location: { lat: 6.4474, lng: 3.5406 },
    equipment: ['Service Trucks', 'Pumps', 'Generators', 'Tools'],
    currentAssignment: 'INC-003',
  },
  {
    id: 'TEAM-009',
    name: 'Security Response Unit',
    type: 'police',
    status: 'deployed',
    members: 15,
    location: { lat: 6.6018, lng: 3.3515 },
    equipment: ['Patrol Vehicles', 'Surveillance Equipment', 'K-9 Units'],
    currentAssignment: 'INC-004',
  },
  {
    id: 'TEAM-010',
    name: 'Environmental Response',
    type: 'utility',
    status: 'deployed',
    members: 7,
    location: { lat: 6.4241, lng: 3.4197 },
    equipment: ['Survey Equipment', 'Monitoring Devices', 'Safety Barriers'],
    currentAssignment: 'INC-005',
  },
  {
    id: 'TEAM-011',
    name: 'Power Restoration Team',
    type: 'utility',
    status: 'available',
    members: 10,
    location: { lat: 6.5964, lng: 3.3515 },
    equipment: ['Service Trucks', 'Electrical Tools', 'Generators', 'Safety Gear'],
  },
];

// ============================================================================
// DASHBOARD STATISTICS
// ============================================================================

export const mockDashboardStats: DashboardStats = {
  activeEmergencies: 5,
  responseTeams: 11,
  activeZones: 8,
  avgResponseTime: 8.5, // minutes
  trends: {
    emergencies: -12, // -12% from last period
    responseTime: -8, // -8% improvement
  },
};

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export const mockNotifications: Notification[] = [
  {
    id: 'NOT-001',
    type: 'emergency',
    title: 'Critical Fire Emergency',
    message: 'Building fire at Victoria Island requires immediate attention',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    priority: 'high',
  },
  {
    id: 'NOT-002',
    type: 'emergency',
    title: 'Mass Casualty Incident',
    message: 'Multi-vehicle accident on Third Mainland Bridge',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    priority: 'high',
  },
  {
    id: 'NOT-003',
    type: 'team',
    title: 'Team Deployed',
    message: 'Fire Brigade Alpha deployed to Victoria Island incident',
    timestamp: new Date(Date.now() - 1000 * 60 * 42),
    read: true,
    priority: 'medium',
  },
  {
    id: 'NOT-004',
    type: 'system',
    title: 'AI Recommendation',
    message: 'New evacuation route recommendation available',
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    read: true,
    priority: 'medium',
  },
  {
    id: 'NOT-005',
    type: 'message',
    title: 'Volunteer Request',
    message: 'Additional medical volunteers needed for incident response',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    read: false,
    priority: 'high',
  },
];

// ============================================================================
// MOCK API FUNCTIONS - Interconnected Data Access
// ============================================================================

export const mockAPI = {
  // Incidents
  getIncidents: async (): Promise<Emergency[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockIncidents;
  },

  getIncidentById: async (id: string): Promise<Emergency | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockIncidents.find(inc => inc.id === id) || null;
  },

  getActiveIncidents: async (): Promise<Emergency[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockIncidents.filter(inc => inc.status === 'critical' || inc.status === 'warning');
  },

  // Alerts
  getAlerts: async (): Promise<Alert[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAlerts;
  },

  getUnreadAlerts: async (): Promise<Alert[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockAlerts.filter(alert => !alert.read);
  },

  // SOS Events
  getSOSEvents: async (): Promise<SOSEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockSOSEvents;
  },

  getActiveSOSEvents: async (): Promise<SOSEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockSOSEvents.filter(sos => sos.status === 'active' || sos.status === 'responding');
  },

  getSOSEventById: async (id: string): Promise<SOSEvent | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSOSEvents.find(sos => sos.id === id) || null;
  },

  // Volunteers
  getVolunteers: async (): Promise<Volunteer[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockVolunteers;
  },

  getAvailableVolunteers: async (): Promise<Volunteer[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockVolunteers.filter(vol => vol.status === 'available');
  },

  getDeployedVolunteers: async (): Promise<Volunteer[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockVolunteers.filter(vol => vol.status === 'deployed');
  },

  getVolunteerById: async (id: string): Promise<Volunteer | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockVolunteers.find(vol => vol.id === id) || null;
  },

  // Climate Risks
  getClimateRisks: async (): Promise<ClimateRisk[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockClimateRisks;
  },

  getHighSeverityRisks: async (): Promise<ClimateRisk[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockClimateRisks.filter(risk => risk.severity === 'high' || risk.severity === 'extreme');
  },

  getClimateRiskById: async (id: string): Promise<ClimateRisk | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockClimateRisks.find(risk => risk.id === id) || null;
  },

  // AI Recommendations
  getAIRecommendations: async (): Promise<AIRecommendation[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockAIRecommendations;
  },

  getHighPriorityRecommendations: async (): Promise<AIRecommendation[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockAIRecommendations.filter(rec => rec.priority === 'high');
  },

  // Activity Feeds
  getActivityFeeds: async (limit?: number): Promise<ActivityFeed[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return limit ? mockActivityFeeds.slice(0, limit) : mockActivityFeeds;
  },

  getRecentActivity: async (): Promise<ActivityFeed[]> => {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockActivityFeeds.slice(0, 10);
  },

  // Response Teams
  getResponseTeams: async (): Promise<ResponseTeam[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockResponseTeams;
  },

  getAvailableTeams: async (): Promise<ResponseTeam[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockResponseTeams.filter(team => team.status === 'available');
  },

  getDeployedTeams: async (): Promise<ResponseTeam[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockResponseTeams.filter(team => team.status === 'deployed');
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockDashboardStats;
  },

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockNotifications;
  },

  getUnreadNotifications: async (): Promise<Notification[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockNotifications.filter(notif => !notif.read);
  },

  // Cross-referenced queries
  getIncidentWithTeams: async (incidentId: string): Promise<{ incident: Emergency | null; teams: ResponseTeam[] }> => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const incident = mockIncidents.find(inc => inc.id === incidentId) || null;
    const teams = incident 
      ? mockResponseTeams.filter(team => incident.assignedTeams.includes(team.id))
      : [];
    return { incident, teams };
  },

  getVolunteersByIncident: async (incidentId: string): Promise<Volunteer[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockVolunteers.filter(vol => vol.currentAssignment === incidentId);
  },

  getSOSEventsByLocation: async (lat: number, lng: number, radius: number): Promise<SOSEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Simple distance calculation (not accurate for production)
    return mockSOSEvents.filter(sos => {
      const distance = Math.sqrt(
        Math.pow(sos.location.coordinates.lat - lat, 2) + 
        Math.pow(sos.location.coordinates.lng - lng, 2)
      );
      return distance <= radius;
    });
  },

  // Real-time simulation
  subscribeToUpdates: (callback: (update: ActivityFeed) => void) => {
    const interval = setInterval(() => {
      const randomActivity = mockActivityFeeds[Math.floor(Math.random() * mockActivityFeeds.length)];
      callback({
        ...randomActivity,
        id: `ACT-${Date.now()}`,
        timestamp: new Date(),
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  },
};

// ============================================================================
// DATA RELATIONSHIP HELPERS
// ============================================================================

export const dataRelationships = {
  // Get all data related to an incident
  getIncidentContext: async (incidentId: string) => {
    const incident = await mockAPI.getIncidentById(incidentId);
    if (!incident) return null;

    const teams = mockResponseTeams.filter(team => 
      incident.assignedTeams.includes(team.id)
    );
    const volunteers = mockVolunteers.filter(vol => 
      vol.currentAssignment === incidentId
    );
    const sosEvents = mockSOSEvents.filter(sos => 
      Math.abs(sos.location.coordinates.lat - incident.location.coordinates.lat) < 0.01 &&
      Math.abs(sos.location.coordinates.lng - incident.location.coordinates.lng) < 0.01
    );
    const activities = mockActivityFeeds.filter(act => 
      act.target === incidentId
    );
    const recommendations = mockAIRecommendations.filter(rec => 
      rec.actionUrl?.includes(incidentId)
    );

    return {
      incident,
      teams,
      volunteers,
      sosEvents,
      activities,
      recommendations,
    };
  },

  // Get dashboard overview with all interconnected data
  getDashboardOverview: async () => {
    const [
      incidents,
      alerts,
      sosEvents,
      volunteers,
      climateRisks,
      recommendations,
      activities,
      teams,
      stats,
      notifications,
    ] = await Promise.all([
      mockAPI.getActiveIncidents(),
      mockAPI.getUnreadAlerts(),
      mockAPI.getActiveSOSEvents(),
      mockAPI.getAvailableVolunteers(),
      mockAPI.getHighSeverityRisks(),
      mockAPI.getHighPriorityRecommendations(),
      mockAPI.getRecentActivity(),
      mockAPI.getDeployedTeams(),
      mockAPI.getDashboardStats(),
      mockAPI.getUnreadNotifications(),
    ]);

    return {
      incidents,
      alerts,
      sosEvents,
      volunteers,
      climateRisks,
      recommendations,
      activities,
      teams,
      stats,
      notifications,
      summary: {
        criticalIncidents: incidents.filter(i => i.status === 'critical').length,
        activeSOS: sosEvents.length,
        deployedTeams: teams.length,
        availableVolunteers: volunteers.length,
        highRiskClimate: climateRisks.length,
        urgentRecommendations: recommendations.length,
      },
    };
  },
};

// Made with Bob
