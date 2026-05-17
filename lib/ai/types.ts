/**
 * AEGIS OS AI Intelligence Engine - Type Definitions
 * Comprehensive type system for crisis classification, severity prediction,
 * and emergency recommendation generation
 */

// ============================================================================
// Crisis Classification Types
// ============================================================================

export type CrisisType =
  | 'natural_disaster'
  | 'medical_emergency'
  | 'fire'
  | 'security_threat'
  | 'infrastructure_failure'
  | 'environmental_hazard'
  | 'public_health'
  | 'civil_unrest'
  | 'technological_disaster'
  | 'unknown';

export type CrisisSubType = {
  natural_disaster: 'earthquake' | 'flood' | 'hurricane' | 'tornado' | 'wildfire' | 'tsunami' | 'landslide' | 'volcanic_eruption';
  medical_emergency: 'cardiac_arrest' | 'stroke' | 'severe_injury' | 'poisoning' | 'allergic_reaction' | 'respiratory_failure';
  fire: 'building_fire' | 'wildfire' | 'industrial_fire' | 'vehicle_fire' | 'electrical_fire';
  security_threat: 'active_shooter' | 'bomb_threat' | 'hostage_situation' | 'terrorism' | 'intrusion';
  infrastructure_failure: 'power_outage' | 'water_contamination' | 'gas_leak' | 'bridge_collapse' | 'dam_failure';
  environmental_hazard: 'chemical_spill' | 'radiation_leak' | 'air_pollution' | 'water_pollution';
  public_health: 'epidemic' | 'pandemic' | 'food_contamination' | 'disease_outbreak';
  civil_unrest: 'riot' | 'protest' | 'looting' | 'civil_war';
  technological_disaster: 'cyber_attack' | 'data_breach' | 'system_failure' | 'communication_breakdown';
  unknown: 'unclassified';
};

export type SeverityLevel = 'low' | 'moderate' | 'high' | 'critical' | 'catastrophic';

export interface CrisisClassification {
  type: CrisisType;
  subType: string;
  confidence: number; // 0-1
  severity: SeverityLevel;
  severityScore: number; // 0-100
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
    radius?: number; // affected radius in meters
  };
  metadata: {
    source: string;
    processingTime: number; // milliseconds
    modelVersion: string;
  };
}

// ============================================================================
// Severity Prediction Types
// ============================================================================

export interface SeverityFactors {
  populationDensity: number; // people per sq km
  vulnerablePopulation: number; // percentage
  infrastructureCriticality: number; // 0-1
  weatherConditions: {
    temperature: number;
    windSpeed: number;
    precipitation: number;
    visibility: number;
  };
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  dayOfWeek: 'weekday' | 'weekend';
  historicalData?: {
    similarIncidents: number;
    averageCasualties: number;
    averageResponseTime: number;
  };
}

export interface SeverityPrediction {
  currentSeverity: SeverityLevel;
  predictedSeverity: SeverityLevel;
  severityTrend: 'escalating' | 'stable' | 'de-escalating';
  confidence: number; // 0-1
  estimatedCasualties: {
    min: number;
    max: number;
    expected: number;
  };
  estimatedDamage: {
    economic: number; // USD
    infrastructure: 'minimal' | 'moderate' | 'severe' | 'catastrophic';
  };
  timeToEscalation?: number; // minutes
  factors: SeverityFactors;
  recommendations: string[];
}

// ============================================================================
// Emergency Recommendation Types
// ============================================================================

export type RecommendationPriority = 'immediate' | 'urgent' | 'high' | 'medium' | 'low';

export type RecommendationCategory =
  | 'evacuation'
  | 'shelter_in_place'
  | 'medical_response'
  | 'resource_allocation'
  | 'communication'
  | 'security'
  | 'infrastructure'
  | 'public_safety';

export interface EmergencyRecommendation {
  id: string;
  category: RecommendationCategory;
  priority: RecommendationPriority;
  title: string;
  description: string;
  actions: Array<{
    step: number;
    action: string;
    responsible: string[];
    estimatedTime: number; // minutes
    resources: string[];
  }>;
  targetAudience: ('general_public' | 'first_responders' | 'government' | 'medical' | 'infrastructure')[];
  effectiveness: number; // 0-1
  risks: string[];
  alternatives?: string[];
  validUntil?: string;
}

// ============================================================================
// Evacuation Recommendation Types
// ============================================================================

export interface EvacuationZone {
  id: string;
  name: string;
  priority: number; // 1 = highest
  coordinates: Array<{ lat: number; lng: number }>;
  population: number;
  vulnerablePopulation: number;
  estimatedEvacuationTime: number; // minutes
  routes: EvacuationRoute[];
}

export interface EvacuationRoute {
  id: string;
  name: string;
  startPoint: { lat: number; lng: number };
  endPoint: { lat: number; lng: number };
  waypoints: Array<{ lat: number; lng: number }>;
  distance: number; // meters
  estimatedTime: number; // minutes
  capacity: number; // people per hour
  status: 'clear' | 'congested' | 'blocked' | 'hazardous';
  alternativeRoutes: string[]; // route IDs
}

export interface SafetyZone {
  id: string;
  name: string;
  type: 'shelter' | 'hospital' | 'safe_area' | 'assembly_point';
  location: { lat: number; lng: number; address: string };
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  accessibility: {
    wheelchair: boolean;
    medical: boolean;
    pets: boolean;
  };
  distance: number; // meters from crisis center
  estimatedTravelTime: number; // minutes
}

export interface EvacuationRecommendation {
  id: string;
  crisisId: string;
  timestamp: string;
  urgency: 'immediate' | 'within_1_hour' | 'within_6_hours' | 'within_24_hours' | 'monitor';
  zones: EvacuationZone[];
  safetyZones: SafetyZone[];
  estimatedAffectedPopulation: number;
  estimatedEvacuationDuration: number; // minutes
  instructions: {
    general: string[];
    vulnerable: string[];
    pets: string[];
    vehicles: string[];
  };
  contraindications: string[]; // when NOT to evacuate
  updates: Array<{
    timestamp: string;
    message: string;
    priority: RecommendationPriority;
  }>;
}

// ============================================================================
// AI Response Orchestration Types
// ============================================================================

export interface AIRequest {
  id: string;
  type: 'classify' | 'predict' | 'recommend' | 'evacuate' | 'analyze';
  timestamp: string;
  priority: RecommendationPriority;
  data: any;
  context?: {
    userId?: string;
    sessionId?: string;
    location?: { lat: number; lng: number };
    previousRequests?: string[];
  };
}

export interface AIResponse<T = any> {
  requestId: string;
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  metadata: {
    processingTime: number;
    modelVersion: string;
    confidence: number;
    timestamp: string;
  };
}

export interface AIOrchestrationResult {
  classification: CrisisClassification;
  severityPrediction: SeverityPrediction;
  recommendations: EmergencyRecommendation[];
  evacuationPlan?: EvacuationRecommendation;
  processingTime: number;
  confidence: number;
}

// ============================================================================
// Mock AI Pipeline Types
// ============================================================================

export interface MockAIConfig {
  latency: {
    min: number;
    max: number;
  };
  errorRate: number; // 0-1
  confidenceRange: {
    min: number;
    max: number;
  };
  enableRealisticVariation: boolean;
}

export interface TrainingData {
  crisisType: CrisisType;
  features: number[];
  label: SeverityLevel;
  metadata?: any;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix?: number[][];
  lastUpdated: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface TimeWindow {
  start: string;
  end: string;
}

export interface ResourceAllocation {
  type: 'personnel' | 'equipment' | 'supplies' | 'vehicles';
  quantity: number;
  location: string;
  estimatedArrival: number; // minutes
}
