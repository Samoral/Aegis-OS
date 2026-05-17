// Global Type Definitions for AEGIS OS

export interface Emergency {
  id: string;
  type: 'fire' | 'medical' | 'traffic' | 'natural-disaster' | 'security' | 'other';
  title: string;
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: 'critical' | 'warning' | 'normal' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  reportedAt: Date;
  updatedAt: Date;
  assignedTeams: string[];
  affectedPeople?: number;
  estimatedDamage?: string;
}

export interface ResponseTeam {
  id: string;
  name: string;
  type: 'fire' | 'medical' | 'police' | 'rescue' | 'utility';
  status: 'available' | 'deployed' | 'offline';
  members: number;
  location: {
    lat: number;
    lng: number;
  };
  equipment: string[];
  currentAssignment?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'vehicle' | 'equipment' | 'personnel' | 'facility';
  status: 'available' | 'in-use' | 'maintenance';
  quantity: number;
  location: string;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'danger' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'coordinator' | 'responder' | 'viewer';
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
  department: string;
}

export interface DashboardStats {
  activeEmergencies: number;
  responseTeams: number;
  activeZones: number;
  avgResponseTime: number;
  trends: {
    emergencies: number;
    responseTime: number;
  };
}

export interface MapMarker {
  id: string;
  type: 'emergency' | 'team' | 'resource' | 'facility';
  position: {
    lat: number;
    lng: number;
  };
  data: Emergency | ResponseTeam | Resource;
}

export interface Notification {
  id: string;
  type: 'emergency' | 'team' | 'system' | 'message';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  target: string;
  timestamp: Date;
  details?: Record<string, any>;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Form Types
export interface EmergencyReportForm {
  type: Emergency['type'];
  title: string;
  description: string;
  location: string;
  priority: Emergency['priority'];
  contactName?: string;
  contactPhone?: string;
}

export interface TeamDeploymentForm {
  emergencyId: string;
  teamIds: string[];
  instructions?: string;
  estimatedArrival?: Date;
}
// Family Safety System Types
export type SafetyStatus = 'safe' | 'injured' | 'missing' | 'unknown';

export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relationship: string;
  avatar?: string;
  phone: string;
  email?: string;
  safetyStatus: SafetyStatus;
  lastKnownLocation: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    timestamp: Date;
  };
  medicalInfo?: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
  };
  emergencyContacts: EmergencyContact[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface FamilyGroup {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  members: FamilyMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SafetyAlert {
  id: string;
  familyMemberId: string;
  type: 'status-change' | 'location-update' | 'emergency' | 'check-in';
  message: string;
  timestamp: Date;
  severity: 'info' | 'warning' | 'critical';
  acknowledged: boolean;
}

export interface AIRecommendation {
  id: string;
  type: 'safety-tip' | 'evacuation-route' | 'emergency-prep' | 'health-alert';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  actionUrl?: string;
  timestamp: Date;
}

export interface FamilySearchParams {
  address?: string;
  name?: string;
  status?: SafetyStatus;
}

export interface SafetyStatistics {
  totalMembers: number;
  safeCount: number;
  injuredCount: number;
  missingCount: number;
  unknownCount: number;
  lastUpdated: Date;
}


// Made with Bob
