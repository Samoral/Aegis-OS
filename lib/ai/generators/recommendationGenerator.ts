/**
 * AEGIS OS AI Intelligence Engine - Emergency Recommendation Generator
 * Intelligent action plan generation for emergency response
 */

import {
  EmergencyRecommendation,
  RecommendationPriority,
  RecommendationCategory,
  CrisisClassification,
  SeverityPrediction,
  CrisisType,
  SeverityLevel,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

// ============================================================================
// Recommendation Templates
// ============================================================================

interface RecommendationTemplate {
  category: RecommendationCategory;
  priority: RecommendationPriority;
  title: string;
  description: string;
  actions: Array<{
    step: number;
    action: string;
    responsible: string[];
    estimatedTime: number;
    resources: string[];
  }>;
  targetAudience: ('general_public' | 'first_responders' | 'government' | 'medical' | 'infrastructure')[];
  effectiveness: number;
  risks: string[];
  alternatives?: string[];
  conditions?: (classification: CrisisClassification, prediction: SeverityPrediction) => boolean;
}

// ============================================================================
// Recommendation Generator Class
// ============================================================================

export class RecommendationGenerator {
  private templates: Map<CrisisType, RecommendationTemplate[]>;
  private modelVersion: string = '1.0.0';

  constructor() {
    this.templates = this.initializeTemplates();
  }

  /**
   * Generate emergency recommendations
   */
  async generate(
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): Promise<EmergencyRecommendation[]> {
    const templates = this.templates.get(classification.type) || [];
    const recommendations: EmergencyRecommendation[] = [];

    // Filter templates based on conditions
    const applicableTemplates = templates.filter(template => {
      if (!template.conditions) return true;
      return template.conditions(classification, prediction);
    });

    // Generate recommendations from templates
    for (const template of applicableTemplates) {
      const recommendation = this.createRecommendation(template, classification, prediction);
      recommendations.push(recommendation);
    }

    // Add severity-specific recommendations
    const severityRecommendations = this.generateSeverityRecommendations(
      classification,
      prediction
    );
    recommendations.push(...severityRecommendations);

    // Add trend-specific recommendations
    if (prediction.severityTrend === 'escalating') {
      const escalationRecommendations = this.generateEscalationRecommendations(
        classification,
        prediction
      );
      recommendations.push(...escalationRecommendations);
    }

    // Sort by priority
    return this.sortByPriority(recommendations);
  }

  /**
   * Generate recommendations for specific audience
   */
  async generateForAudience(
    classification: CrisisClassification,
    prediction: SeverityPrediction,
    audience: 'general_public' | 'first_responders' | 'government' | 'medical' | 'infrastructure'
  ): Promise<EmergencyRecommendation[]> {
    const allRecommendations = await this.generate(classification, prediction);
    return allRecommendations.filter(rec => rec.targetAudience.includes(audience));
  }

  /**
   * Initialize recommendation templates
   */
  private initializeTemplates(): Map<CrisisType, RecommendationTemplate[]> {
    const templates = new Map<CrisisType, RecommendationTemplate[]>();

    // Natural Disaster Templates
    templates.set('natural_disaster', [
      {
        category: 'evacuation',
        priority: 'immediate',
        title: 'Immediate Evacuation Required',
        description: 'Evacuate all residents from high-risk zones immediately due to imminent natural disaster threat.',
        actions: [
          {
            step: 1,
            action: 'Activate emergency alert system',
            responsible: ['emergency_management', 'communications'],
            estimatedTime: 5,
            resources: ['alert_system', 'communication_channels'],
          },
          {
            step: 2,
            action: 'Deploy evacuation teams to designated zones',
            responsible: ['first_responders', 'law_enforcement'],
            estimatedTime: 15,
            resources: ['vehicles', 'personnel', 'equipment'],
          },
          {
            step: 3,
            action: 'Open emergency shelters',
            responsible: ['shelter_management', 'red_cross'],
            estimatedTime: 30,
            resources: ['shelters', 'supplies', 'staff'],
          },
          {
            step: 4,
            action: 'Establish evacuation routes and traffic control',
            responsible: ['law_enforcement', 'traffic_management'],
            estimatedTime: 20,
            resources: ['traffic_control', 'signage', 'personnel'],
          },
        ],
        targetAudience: ['general_public', 'first_responders', 'government'],
        effectiveness: 0.95,
        risks: ['Traffic congestion', 'Panic', 'Incomplete evacuation'],
        alternatives: ['Shelter in place if evacuation routes compromised'],
        conditions: (c, p) => p.predictedSeverity === 'critical' || p.predictedSeverity === 'catastrophic',
      },
      {
        category: 'shelter_in_place',
        priority: 'urgent',
        title: 'Shelter in Place Protocol',
        description: 'Remain indoors and take protective measures until the natural disaster passes.',
        actions: [
          {
            step: 1,
            action: 'Move to interior rooms away from windows',
            responsible: ['general_public'],
            estimatedTime: 10,
            resources: ['none'],
          },
          {
            step: 2,
            action: 'Secure emergency supplies (water, food, first aid)',
            responsible: ['general_public'],
            estimatedTime: 15,
            resources: ['emergency_kit'],
          },
          {
            step: 3,
            action: 'Monitor emergency broadcasts',
            responsible: ['general_public'],
            estimatedTime: 0,
            resources: ['radio', 'phone', 'tv'],
          },
        ],
        targetAudience: ['general_public'],
        effectiveness: 0.8,
        risks: ['Building structural failure', 'Prolonged isolation'],
        alternatives: ['Evacuate if conditions worsen'],
        conditions: (c, p) => p.predictedSeverity === 'moderate' || p.predictedSeverity === 'high',
      },
      {
        category: 'resource_allocation',
        priority: 'high',
        title: 'Emergency Resource Deployment',
        description: 'Deploy emergency resources and personnel to affected areas.',
        actions: [
          {
            step: 1,
            action: 'Mobilize search and rescue teams',
            responsible: ['fire_department', 'emergency_services'],
            estimatedTime: 20,
            resources: ['rescue_teams', 'equipment', 'vehicles'],
          },
          {
            step: 2,
            action: 'Deploy medical teams and supplies',
            responsible: ['medical_services', 'hospitals'],
            estimatedTime: 30,
            resources: ['medical_personnel', 'ambulances', 'supplies'],
          },
          {
            step: 3,
            action: 'Establish emergency supply distribution points',
            responsible: ['emergency_management', 'logistics'],
            estimatedTime: 45,
            resources: ['supplies', 'distribution_centers', 'personnel'],
          },
        ],
        targetAudience: ['first_responders', 'government'],
        effectiveness: 0.9,
        risks: ['Resource shortages', 'Coordination challenges'],
      },
    ]);

    // Medical Emergency Templates
    templates.set('medical_emergency', [
      {
        category: 'medical_response',
        priority: 'immediate',
        title: 'Emergency Medical Response',
        description: 'Immediate medical intervention required for life-threatening condition.',
        actions: [
          {
            step: 1,
            action: 'Call emergency services (911)',
            responsible: ['general_public'],
            estimatedTime: 1,
            resources: ['phone'],
          },
          {
            step: 2,
            action: 'Begin CPR if trained and necessary',
            responsible: ['general_public', 'first_responders'],
            estimatedTime: 0,
            resources: ['none'],
          },
          {
            step: 3,
            action: 'Dispatch nearest ambulance',
            responsible: ['emergency_dispatch'],
            estimatedTime: 2,
            resources: ['ambulance', 'paramedics'],
          },
          {
            step: 4,
            action: 'Alert receiving hospital',
            responsible: ['emergency_dispatch'],
            estimatedTime: 3,
            resources: ['communication_system'],
          },
        ],
        targetAudience: ['general_public', 'first_responders', 'medical'],
        effectiveness: 0.95,
        risks: ['Delayed response', 'Inadequate first aid'],
        conditions: (c, p) => p.predictedSeverity === 'critical' || p.predictedSeverity === 'catastrophic',
      },
      {
        category: 'resource_allocation',
        priority: 'urgent',
        title: 'Medical Resource Mobilization',
        description: 'Deploy additional medical resources to handle emergency.',
        actions: [
          {
            step: 1,
            action: 'Activate trauma team',
            responsible: ['hospital_administration'],
            estimatedTime: 5,
            resources: ['medical_staff', 'equipment'],
          },
          {
            step: 2,
            action: 'Prepare emergency room',
            responsible: ['emergency_department'],
            estimatedTime: 10,
            resources: ['medical_supplies', 'equipment'],
          },
          {
            step: 3,
            action: 'Request additional ambulances if needed',
            responsible: ['emergency_management'],
            estimatedTime: 15,
            resources: ['ambulances', 'paramedics'],
          },
        ],
        targetAudience: ['medical', 'first_responders'],
        effectiveness: 0.9,
        risks: ['Resource constraints', 'Staff fatigue'],
      },
    ]);

    // Fire Templates
    templates.set('fire', [
      {
        category: 'evacuation',
        priority: 'immediate',
        title: 'Fire Evacuation Protocol',
        description: 'Evacuate building immediately due to active fire.',
        actions: [
          {
            step: 1,
            action: 'Activate fire alarm',
            responsible: ['general_public', 'building_management'],
            estimatedTime: 1,
            resources: ['fire_alarm_system'],
          },
          {
            step: 2,
            action: 'Call fire department (911)',
            responsible: ['general_public'],
            estimatedTime: 2,
            resources: ['phone'],
          },
          {
            step: 3,
            action: 'Evacuate via nearest safe exit',
            responsible: ['general_public'],
            estimatedTime: 5,
            resources: ['exit_routes'],
          },
          {
            step: 4,
            action: 'Assemble at designated meeting point',
            responsible: ['general_public'],
            estimatedTime: 10,
            resources: ['assembly_area'],
          },
        ],
        targetAudience: ['general_public', 'first_responders'],
        effectiveness: 0.95,
        risks: ['Smoke inhalation', 'Blocked exits', 'Panic'],
        alternatives: ['Shelter in place if exits blocked'],
      },
      {
        category: 'resource_allocation',
        priority: 'immediate',
        title: 'Fire Suppression Response',
        description: 'Deploy fire suppression resources immediately.',
        actions: [
          {
            step: 1,
            action: 'Dispatch fire engines to scene',
            responsible: ['fire_department'],
            estimatedTime: 5,
            resources: ['fire_engines', 'firefighters', 'equipment'],
          },
          {
            step: 2,
            action: 'Establish water supply',
            responsible: ['fire_department'],
            estimatedTime: 10,
            resources: ['hydrants', 'water_supply'],
          },
          {
            step: 3,
            action: 'Begin fire suppression operations',
            responsible: ['fire_department'],
            estimatedTime: 15,
            resources: ['water', 'foam', 'equipment'],
          },
          {
            step: 4,
            action: 'Request mutual aid if needed',
            responsible: ['fire_chief'],
            estimatedTime: 20,
            resources: ['additional_departments'],
          },
        ],
        targetAudience: ['first_responders'],
        effectiveness: 0.9,
        risks: ['Insufficient water supply', 'Structural collapse'],
      },
    ]);

    // Security Threat Templates
    templates.set('security_threat', [
      {
        category: 'security',
        priority: 'immediate',
        title: 'Active Threat Response',
        description: 'Immediate response to active security threat.',
        actions: [
          {
            step: 1,
            action: 'Alert law enforcement (911)',
            responsible: ['general_public'],
            estimatedTime: 1,
            resources: ['phone'],
          },
          {
            step: 2,
            action: 'Implement lockdown procedures',
            responsible: ['security', 'building_management'],
            estimatedTime: 3,
            resources: ['security_systems', 'communication'],
          },
          {
            step: 3,
            action: 'Run, Hide, Fight protocol',
            responsible: ['general_public'],
            estimatedTime: 0,
            resources: ['none'],
          },
          {
            step: 4,
            action: 'Deploy tactical response team',
            responsible: ['law_enforcement'],
            estimatedTime: 10,
            resources: ['swat_team', 'equipment'],
          },
        ],
        targetAudience: ['general_public', 'first_responders', 'government'],
        effectiveness: 0.85,
        risks: ['Casualties', 'Panic', 'Escalation'],
        conditions: (c, p) => c.subType === 'active_shooter' || c.subType === 'terrorism',
      },
      {
        category: 'evacuation',
        priority: 'urgent',
        title: 'Controlled Evacuation',
        description: 'Evacuate area under law enforcement supervision.',
        actions: [
          {
            step: 1,
            action: 'Establish secure perimeter',
            responsible: ['law_enforcement'],
            estimatedTime: 10,
            resources: ['personnel', 'barriers'],
          },
          {
            step: 2,
            action: 'Coordinate evacuation routes',
            responsible: ['law_enforcement', 'emergency_management'],
            estimatedTime: 15,
            resources: ['personnel', 'vehicles'],
          },
          {
            step: 3,
            action: 'Screen evacuees',
            responsible: ['law_enforcement'],
            estimatedTime: 30,
            resources: ['personnel', 'equipment'],
          },
        ],
        targetAudience: ['first_responders', 'government'],
        effectiveness: 0.8,
        risks: ['Threat escape', 'Incomplete evacuation'],
      },
    ]);

    // Infrastructure Failure Templates
    templates.set('infrastructure_failure', [
      {
        category: 'infrastructure',
        priority: 'urgent',
        title: 'Infrastructure Emergency Response',
        description: 'Respond to critical infrastructure failure.',
        actions: [
          {
            step: 1,
            action: 'Isolate affected area',
            responsible: ['utilities', 'emergency_management'],
            estimatedTime: 15,
            resources: ['personnel', 'equipment'],
          },
          {
            step: 2,
            action: 'Deploy repair crews',
            responsible: ['utilities', 'contractors'],
            estimatedTime: 30,
            resources: ['crews', 'equipment', 'materials'],
          },
          {
            step: 3,
            action: 'Establish alternative services',
            responsible: ['utilities', 'emergency_management'],
            estimatedTime: 60,
            resources: ['generators', 'water_trucks', 'supplies'],
          },
        ],
        targetAudience: ['infrastructure', 'government'],
        effectiveness: 0.85,
        risks: ['Extended outage', 'Secondary failures'],
      },
    ]);

    // Add default templates for remaining types
    const remainingTypes: CrisisType[] = [
      'environmental_hazard',
      'public_health',
      'civil_unrest',
      'technological_disaster',
    ];

    for (const type of remainingTypes) {
      templates.set(type, this.createDefaultTemplates(type));
    }

    return templates;
  }

  /**
   * Create default templates for a crisis type
   */
  private createDefaultTemplates(crisisType: CrisisType): RecommendationTemplate[] {
    return [
      {
        category: 'public_safety',
        priority: 'high',
        title: 'Emergency Safety Measures',
        description: `Implement safety measures for ${crisisType.replace(/_/g, ' ')}.`,
        actions: [
          {
            step: 1,
            action: 'Alert affected population',
            responsible: ['emergency_management'],
            estimatedTime: 10,
            resources: ['alert_system'],
          },
          {
            step: 2,
            action: 'Deploy emergency response teams',
            responsible: ['first_responders'],
            estimatedTime: 20,
            resources: ['personnel', 'equipment'],
          },
          {
            step: 3,
            action: 'Establish command center',
            responsible: ['emergency_management'],
            estimatedTime: 30,
            resources: ['facility', 'communication', 'personnel'],
          },
        ],
        targetAudience: ['general_public', 'first_responders', 'government'],
        effectiveness: 0.75,
        risks: ['Delayed response', 'Inadequate resources'],
      },
    ];
  }

  /**
   * Create recommendation from template
   */
  private createRecommendation(
    template: RecommendationTemplate,
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): EmergencyRecommendation {
    return {
      id: uuidv4(),
      category: template.category,
      priority: this.adjustPriority(template.priority, prediction.predictedSeverity),
      title: template.title,
      description: template.description,
      actions: template.actions,
      targetAudience: template.targetAudience,
      effectiveness: template.effectiveness,
      risks: template.risks,
      alternatives: template.alternatives,
      validUntil: this.calculateValidUntil(prediction),
    };
  }

  /**
   * Adjust priority based on severity
   */
  private adjustPriority(
    basePriority: RecommendationPriority,
    severity: SeverityLevel
  ): RecommendationPriority {
    if (severity === 'catastrophic' || severity === 'critical') {
      return 'immediate';
    }
    if (severity === 'high' && basePriority !== 'immediate') {
      return 'urgent';
    }
    return basePriority;
  }

  /**
   * Generate severity-specific recommendations
   */
  private generateSeverityRecommendations(
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): EmergencyRecommendation[] {
    const recommendations: EmergencyRecommendation[] = [];

    if (prediction.predictedSeverity === 'catastrophic') {
      recommendations.push({
        id: uuidv4(),
        category: 'communication',
        priority: 'immediate',
        title: 'Catastrophic Event - Mass Communication',
        description: 'Activate all emergency communication channels for catastrophic event.',
        actions: [
          {
            step: 1,
            action: 'Activate Emergency Alert System (EAS)',
            responsible: ['emergency_management', 'communications'],
            estimatedTime: 2,
            resources: ['EAS', 'broadcast_systems'],
          },
          {
            step: 2,
            action: 'Issue wireless emergency alerts',
            responsible: ['emergency_management'],
            estimatedTime: 5,
            resources: ['WEA_system'],
          },
          {
            step: 3,
            action: 'Coordinate with media outlets',
            responsible: ['public_information_officer'],
            estimatedTime: 10,
            resources: ['media_contacts'],
          },
        ],
        targetAudience: ['government', 'first_responders'],
        effectiveness: 0.95,
        risks: ['System overload', 'Message confusion'],
      });
    }

    if (prediction.estimatedCasualties.expected > 10) {
      recommendations.push({
        id: uuidv4(),
        category: 'medical_response',
        priority: 'immediate',
        title: 'Mass Casualty Incident Response',
        description: 'Activate mass casualty protocols due to high expected casualties.',
        actions: [
          {
            step: 1,
            action: 'Declare mass casualty incident',
            responsible: ['incident_commander'],
            estimatedTime: 5,
            resources: ['none'],
          },
          {
            step: 2,
            action: 'Activate hospital surge capacity',
            responsible: ['hospital_administration'],
            estimatedTime: 15,
            resources: ['medical_staff', 'supplies', 'beds'],
          },
          {
            step: 3,
            action: 'Establish triage areas',
            responsible: ['medical_services'],
            estimatedTime: 20,
            resources: ['medical_personnel', 'equipment', 'supplies'],
          },
        ],
        targetAudience: ['medical', 'first_responders'],
        effectiveness: 0.9,
        risks: ['Resource overwhelm', 'Triage errors'],
      });
    }

    return recommendations;
  }

  /**
   * Generate escalation-specific recommendations
   */
  private generateEscalationRecommendations(
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): EmergencyRecommendation[] {
    return [
      {
        id: uuidv4(),
        category: 'resource_allocation',
        priority: 'urgent',
        title: 'Escalation Response - Additional Resources',
        description: 'Deploy additional resources due to escalating situation.',
        actions: [
          {
            step: 1,
            action: 'Request mutual aid from neighboring jurisdictions',
            responsible: ['emergency_management'],
            estimatedTime: 15,
            resources: ['communication', 'agreements'],
          },
          {
            step: 2,
            action: 'Activate reserve personnel',
            responsible: ['emergency_management'],
            estimatedTime: 30,
            resources: ['personnel', 'equipment'],
          },
          {
            step: 3,
            action: 'Escalate to state/federal assistance',
            responsible: ['government'],
            estimatedTime: 60,
            resources: ['communication', 'documentation'],
          },
        ],
        targetAudience: ['government', 'first_responders'],
        effectiveness: 0.85,
        risks: ['Coordination challenges', 'Delayed arrival'],
      },
    ];
  }

  /**
   * Sort recommendations by priority
   */
  private sortByPriority(recommendations: EmergencyRecommendation[]): EmergencyRecommendation[] {
    const priorityOrder: Record<RecommendationPriority, number> = {
      immediate: 1,
      urgent: 2,
      high: 3,
      medium: 4,
      low: 5,
    };

    return recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  /**
   * Calculate recommendation validity period
   */
  private calculateValidUntil(prediction: SeverityPrediction): string {
    const now = new Date();
    let validityMinutes = 60; // default 1 hour

    if (prediction.severityTrend === 'escalating') {
      validityMinutes = 30; // shorter validity for escalating situations
    } else if (prediction.severityTrend === 'de-escalating') {
      validityMinutes = 120; // longer validity for de-escalating situations
    }

    if (prediction.timeToEscalation && prediction.timeToEscalation < validityMinutes) {
      validityMinutes = prediction.timeToEscalation;
    }

    now.setMinutes(now.getMinutes() + validityMinutes);
    return now.toISOString();
  }

  /**
   * Get model information
   */
  getModelInfo() {
    return {
      version: this.modelVersion,
      supportedTypes: Array.from(this.templates.keys()),
      totalTemplates: Array.from(this.templates.values()).reduce((sum, arr) => sum + arr.length, 0),
    };
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const recommendationGenerator = new RecommendationGenerator();

// Made with Bob
