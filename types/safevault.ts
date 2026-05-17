// AEGIS SafeVault™ Type Definitions

export type PreparednessLevel = 'critical' | 'low' | 'moderate' | 'good' | 'excellent';
export type DroneStatus = 'idle' | 'dispatched' | 'in-transit' | 'delivering' | 'returning' | 'maintenance';
export type ReserveCategory = 'food' | 'water' | 'medical' | 'power' | 'communication' | 'shelter' | 'baby' | 'pet';
export type RiskType = 'flood' | 'storm' | 'wildfire' | 'earthquake' | 'heatwave' | 'tsunami' | 'tornado' | 'hurricane';
export type RiskSeverity = 'low' | 'moderate' | 'high' | 'critical' | 'extreme';

// Smart Emergency Savings
export interface EmergencySavings {
  id: string;
  userId: string;
  balance: number;
  monthlyContribution: number;
  savingsPercentage: number;
  targetAmount: number;
  currency: string;
  autoSave: boolean;
  createdAt: Date;
  lastContribution: Date;
  totalSaved: number;
  withdrawals: SavingsTransaction[];
  contributions: SavingsTransaction[];
}

export interface SavingsTransaction {
  id: string;
  type: 'contribution' | 'withdrawal' | 'emergency-use';
  amount: number;
  date: Date;
  description: string;
  emergencyId?: string;
}

export interface PreparednessScore {
  overall: number; // 0-100
  financial: number;
  supplies: number;
  knowledge: number;
  communication: number;
  level: PreparednessLevel;
  recommendations: string[];
  lastCalculated: Date;
}

// AI Climate & Risk Intelligence
export interface ClimateRiskAnalysis {
  id: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    region: string;
    country: string;
  };
  risks: RiskAssessment[];
  overallThreatLevel: RiskSeverity;
  predictions: DisasterPrediction[];
  recommendations: string[];
  lastUpdated: Date;
  dataSource: string;
}

export interface RiskAssessment {
  id: string;
  type: RiskType;
  severity: RiskSeverity;
  probability: number; // 0-100
  timeframe: string;
  affectedPopulation: number;
  description: string;
  mitigationSteps: string[];
  historicalData?: {
    lastOccurrence: Date;
    frequency: number;
    averageDamage: string;
  };
}

export interface DisasterPrediction {
  id: string;
  type: RiskType;
  predictedDate: Date;
  confidence: number; // 0-100
  severity: RiskSeverity;
  affectedAreas: string[];
  estimatedImpact: {
    casualties: string;
    economicDamage: string;
    displacedPeople: number;
  };
  preparednessActions: string[];
  evacuationRecommended: boolean;
}

// Emergency Resource Reserve System
export interface EmergencyReserve {
  id: string;
  userId: string;
  householdSize: number;
  items: ReserveItem[];
  totalValue: number;
  lastUpdated: Date;
  adequacyScore: number; // 0-100
  recommendations: string[];
}

export interface ReserveItem {
  id: string;
  name: string;
  category: ReserveCategory;
  quantity: number;
  unit: string;
  expiryDate?: Date;
  location: string;
  priority: 'essential' | 'important' | 'recommended';
  status: 'adequate' | 'low' | 'critical' | 'expired';
  recommendedQuantity: number;
  cost: number;
  supplier?: string;
  lastChecked: Date;
}

export interface SurvivalKit {
  id: string;
  name: string;
  type: 'basic' | 'advanced' | 'family' | 'elderly' | 'baby' | 'pet';
  items: ReserveItem[];
  totalCost: number;
  duration: number; // days
  peopleSupported: number;
  completeness: number; // 0-100
}

// AEGIS Air™ Drone Delivery System
export interface Drone {
  id: string;
  name: string;
  model: string;
  status: DroneStatus;
  location: {
    lat: number;
    lng: number;
    altitude: number;
  };
  battery: number; // 0-100
  maxPayload: number; // kg
  currentPayload: number;
  range: number; // km
  speed: number; // km/h
  assignedDelivery?: DroneDelivery;
  maintenanceSchedule?: Date;
  flightHours: number;
  lastMaintenance: Date;
}

export interface DroneDelivery {
  id: string;
  droneId: string;
  emergencyId: string;
  status: 'pending' | 'dispatched' | 'in-transit' | 'delivered' | 'failed' | 'cancelled';
  priority: 'critical' | 'high' | 'medium' | 'low';
  origin: {
    lat: number;
    lng: number;
    address: string;
  };
  destination: {
    lat: number;
    lng: number;
    address: string;
  };
  route: RoutePoint[];
  items: DeliveryItem[];
  totalWeight: number;
  estimatedArrival: Date;
  actualArrival?: Date;
  dispatchTime: Date;
  distance: number;
  recipient: {
    name: string;
    phone: string;
    instructions?: string;
  };
}

export interface RoutePoint {
  lat: number;
  lng: number;
  altitude: number;
  timestamp: Date;
  speed: number;
}

export interface DeliveryItem {
  id: string;
  name: string;
  category: ReserveCategory;
  quantity: number;
  weight: number;
  urgent: boolean;
}

// Elderly SOS & Distress AI
export interface ElderlyProfile {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  phone: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  medicalConditions: string[];
  medications: string[];
  allergies: string[];
  mobility: 'independent' | 'assisted' | 'wheelchair' | 'bedridden';
  cognitiveStatus: 'normal' | 'mild-impairment' | 'moderate-impairment' | 'severe-impairment';
  caregivers: Caregiver[];
  emergencyContacts: EmergencyContact[];
  devices: MonitoringDevice[];
  lastCheckIn: Date;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export interface Caregiver {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
  availability: string;
  notificationPreferences: {
    sms: boolean;
    email: boolean;
    push: boolean;
  };
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  isPrimary: boolean;
}

export interface MonitoringDevice {
  id: string;
  type: 'wearable' | 'fall-detector' | 'motion-sensor' | 'door-sensor' | 'panic-button';
  name: string;
  status: 'active' | 'inactive' | 'low-battery' | 'malfunction';
  battery?: number;
  lastSignal: Date;
  location?: string;
}

export interface SOSAlert {
  id: string;
  elderlyId: string;
  type: 'manual-sos' | 'fall-detected' | 'inactivity' | 'abnormal-behavior' | 'medical-emergency';
  severity: 'info' | 'warning' | 'critical' | 'life-threatening';
  timestamp: Date;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  description: string;
  vitals?: {
    heartRate?: number;
    bloodPressure?: string;
    temperature?: number;
    oxygenLevel?: number;
  };
  status: 'active' | 'acknowledged' | 'responding' | 'resolved' | 'false-alarm';
  respondingTeams: string[];
  notifiedContacts: string[];
  resolution?: string;
  responseTime?: number; // minutes
}

export interface InactivityAlert {
  id: string;
  elderlyId: string;
  detectedAt: Date;
  duration: number; // hours
  lastActivity: Date;
  activityType: string;
  location: string;
  aiAnalysis: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    possibleCauses: string[];
    recommendedActions: string[];
    confidence: number;
  };
  status: 'monitoring' | 'escalated' | 'resolved';
}

// AI Recommendations
export interface AIInsight {
  id: string;
  type: 'savings' | 'preparedness' | 'risk' | 'supply' | 'evacuation' | 'health';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionable: boolean;
  actions?: AIAction[];
  confidence: number; // 0-100
  timestamp: Date;
  expiresAt?: Date;
  category: string;
  impact: 'low' | 'medium' | 'high';
}

export interface AIAction {
  id: string;
  label: string;
  type: 'navigate' | 'external' | 'modal' | 'api-call';
  url?: string;
  handler?: string;
  icon?: string;
}

// Dashboard Analytics
export interface SafeVaultAnalytics {
  userId: string;
  preparednessScore: PreparednessScore;
  savingsSummary: {
    totalSaved: number;
    monthlyGrowth: number;
    projectedReserve: number;
    daysOfCoverage: number;
  };
  supplySummary: {
    totalItems: number;
    adequateItems: number;
    lowItems: number;
    criticalItems: number;
    expiringItems: number;
  };
  riskSummary: {
    activeRisks: number;
    highRisks: number;
    predictions: number;
    lastAssessment: Date;
  };
  droneSummary: {
    totalDrones: number;
    availableDrones: number;
    activeDeliveries: number;
    completedToday: number;
  };
  lastUpdated: Date;
}

// Made with Bob