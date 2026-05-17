/**
 * AEGIS OS AI Intelligence Engine - Evacuation Recommendation System
 * Intelligent evacuation planning and route optimization
 */

import {
  EvacuationRecommendation,
  EvacuationZone,
  EvacuationRoute,
  SafetyZone,
  CrisisClassification,
  SeverityPrediction,
  RecommendationPriority,
  Coordinates,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

// ============================================================================
// Evacuation Planning Models
// ============================================================================

interface EvacuationParameters {
  crisisCenter: Coordinates;
  affectedRadius: number; // meters
  populationData?: {
    total: number;
    vulnerable: number;
    density: number;
  };
  availableRoutes?: number;
  availableShelters?: number;
}

interface RouteOptimizationFactors {
  distance: number;
  capacity: number;
  currentTraffic: number;
  hazardProximity: number;
  accessibility: number;
}

// ============================================================================
// Evacuation Generator Class
// ============================================================================

export class EvacuationGenerator {
  private modelVersion: string = '1.0.0';

  /**
   * Generate comprehensive evacuation recommendation
   */
  async generate(
    classification: CrisisClassification,
    prediction: SeverityPrediction,
    parameters: EvacuationParameters
  ): Promise<EvacuationRecommendation> {
    const crisisId = uuidv4();
    
    // Determine evacuation urgency
    const urgency = this.determineUrgency(classification, prediction);
    
    // Generate evacuation zones
    const zones = this.generateEvacuationZones(
      parameters.crisisCenter,
      parameters.affectedRadius,
      classification,
      prediction
    );
    
    // Generate safety zones
    const safetyZones = this.generateSafetyZones(
      parameters.crisisCenter,
      parameters.affectedRadius,
      zones
    );
    
    // Calculate affected population
    const estimatedAffectedPopulation = this.calculateAffectedPopulation(
      zones,
      parameters.populationData
    );
    
    // Estimate evacuation duration
    const estimatedEvacuationDuration = this.estimateEvacuationDuration(
      zones,
      safetyZones,
      estimatedAffectedPopulation
    );
    
    // Generate instructions
    const instructions = this.generateInstructions(classification, urgency);
    
    // Generate contraindications
    const contraindications = this.generateContraindications(classification, prediction);
    
    return {
      id: crisisId,
      crisisId: classification.metadata.source,
      timestamp: new Date().toISOString(),
      urgency,
      zones,
      safetyZones,
      estimatedAffectedPopulation,
      estimatedEvacuationDuration,
      instructions,
      contraindications,
      updates: [],
    };
  }

  /**
   * Update existing evacuation recommendation
   */
  async updateRecommendation(
    existing: EvacuationRecommendation,
    newPrediction: SeverityPrediction,
    message: string,
    priority: RecommendationPriority
  ): Promise<EvacuationRecommendation> {
    const updated = { ...existing };
    
    updated.updates.push({
      timestamp: new Date().toISOString(),
      message,
      priority,
    });
    
    // Update urgency if severity changed
    if (newPrediction.severityTrend === 'escalating') {
      updated.urgency = this.escalateUrgency(updated.urgency);
    } else if (newPrediction.severityTrend === 'de-escalating') {
      updated.urgency = this.deEscalateUrgency(updated.urgency);
    }
    
    return updated;
  }

  /**
   * Determine evacuation urgency
   */
  private determineUrgency(
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): 'immediate' | 'within_1_hour' | 'within_6_hours' | 'within_24_hours' | 'monitor' {
    // Immediate evacuation for catastrophic events
    if (prediction.predictedSeverity === 'catastrophic') {
      return 'immediate';
    }
    
    // Critical events with escalation
    if (prediction.predictedSeverity === 'critical' && prediction.severityTrend === 'escalating') {
      return 'immediate';
    }
    
    // Critical events stable
    if (prediction.predictedSeverity === 'critical') {
      return 'within_1_hour';
    }
    
    // High severity with escalation
    if (prediction.predictedSeverity === 'high' && prediction.severityTrend === 'escalating') {
      return 'within_1_hour';
    }
    
    // High severity stable
    if (prediction.predictedSeverity === 'high') {
      return 'within_6_hours';
    }
    
    // Moderate severity
    if (prediction.predictedSeverity === 'moderate') {
      return 'within_24_hours';
    }
    
    // Low severity - monitor only
    return 'monitor';
  }

  /**
   * Generate evacuation zones based on crisis location and severity
   */
  private generateEvacuationZones(
    crisisCenter: Coordinates,
    affectedRadius: number,
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): EvacuationZone[] {
    const zones: EvacuationZone[] = [];
    
    // Zone 1: Immediate danger zone (0-30% of radius)
    const zone1Radius = affectedRadius * 0.3;
    zones.push({
      id: uuidv4(),
      name: 'Immediate Danger Zone',
      priority: 1,
      coordinates: this.generateCircleCoordinates(crisisCenter, zone1Radius),
      population: this.estimateZonePopulation(zone1Radius, 'high'),
      vulnerablePopulation: this.estimateVulnerablePopulation(zone1Radius, 'high'),
      estimatedEvacuationTime: 15,
      routes: this.generateRoutesForZone(crisisCenter, zone1Radius, 1),
    });
    
    // Zone 2: High risk zone (30-60% of radius)
    const zone2Radius = affectedRadius * 0.6;
    zones.push({
      id: uuidv4(),
      name: 'High Risk Zone',
      priority: 2,
      coordinates: this.generateCircleCoordinates(crisisCenter, zone2Radius),
      population: this.estimateZonePopulation(zone2Radius - zone1Radius, 'medium'),
      vulnerablePopulation: this.estimateVulnerablePopulation(zone2Radius - zone1Radius, 'medium'),
      estimatedEvacuationTime: 30,
      routes: this.generateRoutesForZone(crisisCenter, zone2Radius, 2),
    });
    
    // Zone 3: Moderate risk zone (60-100% of radius)
    zones.push({
      id: uuidv4(),
      name: 'Moderate Risk Zone',
      priority: 3,
      coordinates: this.generateCircleCoordinates(crisisCenter, affectedRadius),
      population: this.estimateZonePopulation(affectedRadius - zone2Radius, 'low'),
      vulnerablePopulation: this.estimateVulnerablePopulation(affectedRadius - zone2Radius, 'low'),
      estimatedEvacuationTime: 60,
      routes: this.generateRoutesForZone(crisisCenter, affectedRadius, 3),
    });
    
    return zones;
  }

  /**
   * Generate safety zones (shelters, safe areas)
   */
  private generateSafetyZones(
    crisisCenter: Coordinates,
    affectedRadius: number,
    evacuationZones: EvacuationZone[]
  ): SafetyZone[] {
    const safetyZones: SafetyZone[] = [];
    const safeDistance = affectedRadius * 1.5; // 50% beyond affected radius
    
    // Generate shelters in cardinal directions
    const directions = [
      { name: 'North', angle: 0 },
      { name: 'Northeast', angle: 45 },
      { name: 'East', angle: 90 },
      { name: 'Southeast', angle: 135 },
      { name: 'South', angle: 180 },
      { name: 'Southwest', angle: 225 },
      { name: 'West', angle: 270 },
      { name: 'Northwest', angle: 315 },
    ];
    
    for (const direction of directions) {
      const location = this.calculatePointAtDistance(
        crisisCenter,
        safeDistance,
        direction.angle
      );
      
      safetyZones.push({
        id: uuidv4(),
        name: `${direction.name} Emergency Shelter`,
        type: 'shelter',
        location: {
          lat: location.latitude,
          lng: location.longitude,
          address: `Emergency Shelter - ${direction.name} Sector`,
        },
        capacity: 500,
        currentOccupancy: 0,
        facilities: ['food', 'water', 'medical', 'sanitation', 'communication'],
        accessibility: {
          wheelchair: true,
          medical: true,
          pets: true,
        },
        distance: safeDistance,
        estimatedTravelTime: Math.round(safeDistance / 50), // Assuming 50m/min average speed
      });
    }
    
    // Add hospital as safety zone
    const hospitalLocation = this.calculatePointAtDistance(crisisCenter, safeDistance, 45);
    safetyZones.push({
      id: uuidv4(),
      name: 'Regional Medical Center',
      type: 'hospital',
      location: {
        lat: hospitalLocation.latitude,
        lng: hospitalLocation.longitude,
        address: 'Regional Medical Center',
      },
      capacity: 200,
      currentOccupancy: 50,
      facilities: ['emergency_care', 'surgery', 'intensive_care', 'trauma'],
      accessibility: {
        wheelchair: true,
        medical: true,
        pets: false,
      },
      distance: safeDistance,
      estimatedTravelTime: Math.round(safeDistance / 100), // Faster for ambulances
    });
    
    return safetyZones;
  }

  /**
   * Generate evacuation routes for a zone
   */
  private generateRoutesForZone(
    crisisCenter: Coordinates,
    zoneRadius: number,
    zonePriority: number
  ): EvacuationRoute[] {
    const routes: EvacuationRoute[] = [];
    const numRoutes = 4; // 4 routes per zone
    
    for (let i = 0; i < numRoutes; i++) {
      const angle = (360 / numRoutes) * i;
      const startPoint = this.calculatePointAtDistance(crisisCenter, zoneRadius * 0.8, angle);
      const endPoint = this.calculatePointAtDistance(crisisCenter, zoneRadius * 2, angle);
      
      routes.push({
        id: uuidv4(),
        name: `Route ${zonePriority}-${i + 1}`,
        startPoint: { lat: startPoint.latitude, lng: startPoint.longitude },
        endPoint: { lat: endPoint.latitude, lng: endPoint.longitude },
        waypoints: this.generateWaypoints(startPoint, endPoint, 3),
        distance: this.calculateDistance(startPoint, endPoint),
        estimatedTime: Math.round(this.calculateDistance(startPoint, endPoint) / 50),
        capacity: 1000,
        status: this.determineRouteStatus(zonePriority),
        alternativeRoutes: [],
      });
    }
    
    // Link alternative routes
    routes.forEach((route, index) => {
      const nextIndex = (index + 1) % routes.length;
      const prevIndex = (index - 1 + routes.length) % routes.length;
      route.alternativeRoutes = [routes[nextIndex].id, routes[prevIndex].id];
    });
    
    return routes;
  }

  /**
   * Generate instructions for different groups
   */
  private generateInstructions(
    classification: CrisisClassification,
    urgency: 'immediate' | 'within_1_hour' | 'within_6_hours' | 'within_24_hours' | 'monitor'
  ): {
    general: string[];
    vulnerable: string[];
    pets: string[];
    vehicles: string[];
  } {
    const instructions = {
      general: [] as string[],
      vulnerable: [] as string[],
      pets: [] as string[],
      vehicles: [] as string[],
    };
    
    // General instructions
    if (urgency === 'immediate') {
      instructions.general.push('Evacuate immediately - do not delay');
      instructions.general.push('Take only essential items (medications, documents, phone)');
      instructions.general.push('Follow designated evacuation routes');
      instructions.general.push('Do not return until authorities declare it safe');
    } else {
      instructions.general.push('Prepare to evacuate - gather essential items');
      instructions.general.push('Monitor emergency broadcasts for updates');
      instructions.general.push('Identify your evacuation route');
      instructions.general.push('Ensure vehicle has fuel');
    }
    
    instructions.general.push('Bring identification and important documents');
    instructions.general.push('Bring medications and medical supplies');
    instructions.general.push('Bring phone charger and emergency contacts');
    instructions.general.push('Turn off utilities if time permits');
    instructions.general.push('Lock doors and windows');
    
    // Vulnerable population instructions
    instructions.vulnerable.push('Request assistance if needed - call emergency services');
    instructions.vulnerable.push('Bring all medications and medical equipment');
    instructions.vulnerable.push('Inform responders of special needs');
    instructions.vulnerable.push('Bring medical records if possible');
    instructions.vulnerable.push('Priority evacuation available for mobility-impaired');
    
    // Pet instructions
    instructions.pets.push('Bring pets in carriers or on leashes');
    instructions.pets.push('Bring pet food, water, and medications');
    instructions.pets.push('Bring pet medical records and identification');
    instructions.pets.push('Pet-friendly shelters available');
    instructions.pets.push('Do not leave pets behind');
    
    // Vehicle instructions
    instructions.vehicles.push('Ensure vehicle has at least half tank of fuel');
    instructions.vehicles.push('Follow traffic control and law enforcement directions');
    instructions.vehicles.push('Do not stop to sightsee or take photos');
    instructions.vehicles.push('Keep windows closed and air conditioning on recirculate');
    instructions.vehicles.push('If vehicle breaks down, move to shoulder and call for help');
    
    return instructions;
  }

  /**
   * Generate contraindications (when NOT to evacuate)
   */
  private generateContraindications(
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): string[] {
    const contraindications: string[] = [];
    
    // Crisis-specific contraindications
    if (classification.type === 'fire' || classification.type === 'natural_disaster') {
      contraindications.push('Do not evacuate if fire/hazard blocks all routes - shelter in place');
      contraindications.push('Do not drive through flooded areas');
      contraindications.push('Do not evacuate during peak hazard conditions if safer to shelter');
    }
    
    if (classification.type === 'security_threat') {
      contraindications.push('Do not evacuate during active threat - shelter in place until cleared');
      contraindications.push('Do not evacuate if it exposes you to greater danger');
    }
    
    // General contraindications
    contraindications.push('Do not evacuate if you have no safe destination');
    contraindications.push('Do not evacuate if conditions make travel more dangerous than staying');
    contraindications.push('Do not evacuate if you cannot do so safely');
    
    return contraindications;
  }

  /**
   * Calculate affected population
   */
  private calculateAffectedPopulation(
    zones: EvacuationZone[],
    populationData?: { total: number; vulnerable: number; density: number }
  ): number {
    if (populationData) {
      return populationData.total;
    }
    
    return zones.reduce((total, zone) => total + zone.population, 0);
  }

  /**
   * Estimate evacuation duration
   */
  private estimateEvacuationDuration(
    zones: EvacuationZone[],
    safetyZones: SafetyZone[],
    affectedPopulation: number
  ): number {
    // Calculate total evacuation capacity per hour
    const totalCapacity = zones.reduce((sum, zone) => {
      const routeCapacity = zone.routes.reduce((rSum, route) => rSum + route.capacity, 0);
      return sum + routeCapacity;
    }, 0);
    
    // Calculate hours needed
    const hoursNeeded = affectedPopulation / totalCapacity;
    
    // Add buffer for congestion and delays (30%)
    const bufferedHours = hoursNeeded * 1.3;
    
    // Convert to minutes
    return Math.round(bufferedHours * 60);
  }

  /**
   * Helper: Generate circle coordinates
   */
  private generateCircleCoordinates(center: Coordinates, radius: number): Array<{ lat: number; lng: number }> {
    const points: Array<{ lat: number; lng: number }> = [];
    const numPoints = 32;
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (360 / numPoints) * i;
      const point = this.calculatePointAtDistance(center, radius, angle);
      points.push({ lat: point.latitude, lng: point.longitude });
    }
    
    return points;
  }

  /**
   * Helper: Calculate point at distance and angle
   */
  private calculatePointAtDistance(
    center: Coordinates,
    distance: number,
    angleDegrees: number
  ): Coordinates {
    const earthRadius = 6371000; // meters
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const lat1 = (center.latitude * Math.PI) / 180;
    const lon1 = (center.longitude * Math.PI) / 180;
    
    const lat2 = Math.asin(
      Math.sin(lat1) * Math.cos(distance / earthRadius) +
      Math.cos(lat1) * Math.sin(distance / earthRadius) * Math.cos(angleRadians)
    );
    
    const lon2 = lon1 + Math.atan2(
      Math.sin(angleRadians) * Math.sin(distance / earthRadius) * Math.cos(lat1),
      Math.cos(distance / earthRadius) - Math.sin(lat1) * Math.sin(lat2)
    );
    
    return {
      latitude: (lat2 * 180) / Math.PI,
      longitude: (lon2 * 180) / Math.PI,
    };
  }

  /**
   * Helper: Calculate distance between two points
   */
  private calculateDistance(point1: Coordinates, point2: Coordinates): number {
    const earthRadius = 6371000; // meters
    const lat1 = (point1.latitude * Math.PI) / 180;
    const lat2 = (point2.latitude * Math.PI) / 180;
    const deltaLat = ((point2.latitude - point1.latitude) * Math.PI) / 180;
    const deltaLon = ((point2.longitude - point1.longitude) * Math.PI) / 180;
    
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return earthRadius * c;
  }

  /**
   * Helper: Generate waypoints between two points
   */
  private generateWaypoints(
    start: Coordinates,
    end: Coordinates,
    numWaypoints: number
  ): Array<{ lat: number; lng: number }> {
    const waypoints: Array<{ lat: number; lng: number }> = [];
    
    for (let i = 1; i <= numWaypoints; i++) {
      const fraction = i / (numWaypoints + 1);
      waypoints.push({
        lat: start.latitude + (end.latitude - start.latitude) * fraction,
        lng: start.longitude + (end.longitude - start.longitude) * fraction,
      });
    }
    
    return waypoints;
  }

  /**
   * Helper: Estimate zone population
   */
  private estimateZonePopulation(radius: number, density: 'high' | 'medium' | 'low'): number {
    const area = Math.PI * radius * radius; // square meters
    const densityFactors = { high: 0.01, medium: 0.005, low: 0.002 }; // people per sq meter
    return Math.round(area * densityFactors[density]);
  }

  /**
   * Helper: Estimate vulnerable population
   */
  private estimateVulnerablePopulation(radius: number, density: 'high' | 'medium' | 'low'): number {
    const totalPopulation = this.estimateZonePopulation(radius, density);
    return Math.round(totalPopulation * 0.15); // 15% vulnerable
  }

  /**
   * Helper: Determine route status
   */
  private determineRouteStatus(zonePriority: number): 'clear' | 'congested' | 'blocked' | 'hazardous' {
    // Higher priority zones more likely to have clear routes
    if (zonePriority === 1) return 'clear';
    if (zonePriority === 2) return Math.random() > 0.3 ? 'clear' : 'congested';
    return Math.random() > 0.5 ? 'congested' : 'clear';
  }

  /**
   * Helper: Escalate urgency
   */
  private escalateUrgency(
    current: 'immediate' | 'within_1_hour' | 'within_6_hours' | 'within_24_hours' | 'monitor'
  ): 'immediate' | 'within_1_hour' | 'within_6_hours' | 'within_24_hours' | 'monitor' {
    const levels = ['monitor', 'within_24_hours', 'within_6_hours', 'within_1_hour', 'immediate'];
    const currentIndex = levels.indexOf(current);
    const newIndex = Math.min(currentIndex + 1, levels.length - 1);
    return levels[newIndex] as any;
  }

  /**
   * Helper: De-escalate urgency
   */
  private deEscalateUrgency(
    current: 'immediate' | 'within_1_hour' | 'within_6_hours' | 'within_24_hours' | 'monitor'
  ): 'immediate' | 'within_1_hour' | 'within_6_hours' | 'within_24_hours' | 'monitor' {
    const levels = ['monitor', 'within_24_hours', 'within_6_hours', 'within_1_hour', 'immediate'];
    const currentIndex = levels.indexOf(current);
    const newIndex = Math.max(currentIndex - 1, 0);
    return levels[newIndex] as any;
  }

  /**
   * Get model information
   */
  getModelInfo() {
    return {
      version: this.modelVersion,
      capabilities: [
        'zone_generation',
        'route_optimization',
        'safety_zone_identification',
        'population_estimation',
        'duration_calculation',
      ],
    };
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const evacuationGenerator = new EvacuationGenerator();
