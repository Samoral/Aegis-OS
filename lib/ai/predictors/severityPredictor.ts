/**
 * AEGIS OS AI Intelligence Engine - Severity Prediction System
 * Advanced ML-based severity forecasting and trend analysis
 */

import {
  SeverityLevel,
  SeverityFactors,
  SeverityPrediction,
  CrisisType,
  CrisisClassification,
} from '../types';

// ============================================================================
// Prediction Models
// ============================================================================

interface PredictionModel {
  crisisType: CrisisType;
  escalationFactors: EscalationFactor[];
  deEscalationFactors: DeEscalationFactor[];
  timeToEscalationModel: (factors: SeverityFactors) => number;
  casualtyModel: (factors: SeverityFactors) => { min: number; max: number; expected: number };
}

interface EscalationFactor {
  name: string;
  weight: number;
  threshold: number;
  evaluate: (factors: SeverityFactors) => number;
}

interface DeEscalationFactor {
  name: string;
  weight: number;
  evaluate: (factors: SeverityFactors) => number;
}

// ============================================================================
// Severity Predictor Class
// ============================================================================

export class SeverityPredictor {
  private models: Map<CrisisType, PredictionModel>;
  private modelVersion: string = '1.0.0';

  constructor() {
    this.models = this.initializeModels();
  }

  /**
   * Predict severity evolution for a crisis
   */
  async predict(
    classification: CrisisClassification,
    factors: SeverityFactors
  ): Promise<SeverityPrediction> {
    const model = this.models.get(classification.type);
    if (!model) {
      return this.getDefaultPrediction(classification, factors);
    }

    // Calculate escalation score
    const escalationScore = this.calculateEscalationScore(model, factors);
    
    // Calculate de-escalation score
    const deEscalationScore = this.calculateDeEscalationScore(model, factors);
    
    // Determine trend
    const trend = this.determineTrend(escalationScore, deEscalationScore);
    
    // Predict future severity
    const predictedSeverity = this.predictFutureSeverity(
      classification.severity,
      trend,
      escalationScore
    );
    
    // Calculate confidence
    const confidence = this.calculateConfidence(factors, classification.confidence);
    
    // Estimate casualties
    const estimatedCasualties = model.casualtyModel(factors);
    
    // Estimate damage
    const estimatedDamage = this.estimateDamage(classification.type, factors, predictedSeverity);
    
    // Calculate time to escalation
    const timeToEscalation = trend === 'escalating' 
      ? model.timeToEscalationModel(factors)
      : undefined;
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(
      classification,
      trend,
      predictedSeverity,
      factors
    );

    return {
      currentSeverity: classification.severity,
      predictedSeverity,
      severityTrend: trend,
      confidence,
      estimatedCasualties,
      estimatedDamage,
      timeToEscalation,
      factors,
      recommendations,
    };
  }

  /**
   * Initialize prediction models for each crisis type
   */
  private initializeModels(): Map<CrisisType, PredictionModel> {
    const models = new Map<CrisisType, PredictionModel>();

    // Natural Disaster Model
    models.set('natural_disaster', {
      crisisType: 'natural_disaster',
      escalationFactors: [
        {
          name: 'population_density',
          weight: 0.3,
          threshold: 1000,
          evaluate: (f) => Math.min(f.populationDensity / 5000, 1),
        },
        {
          name: 'weather_severity',
          weight: 0.25,
          threshold: 50,
          evaluate: (f) => {
            const windScore = Math.min(f.weatherConditions.windSpeed / 100, 1);
            const precipScore = Math.min(f.weatherConditions.precipitation / 100, 1);
            return (windScore + precipScore) / 2;
          },
        },
        {
          name: 'vulnerable_population',
          weight: 0.2,
          threshold: 20,
          evaluate: (f) => f.vulnerablePopulation / 100,
        },
        {
          name: 'infrastructure_criticality',
          weight: 0.25,
          threshold: 0.7,
          evaluate: (f) => f.infrastructureCriticality,
        },
      ],
      deEscalationFactors: [
        {
          name: 'weather_improvement',
          weight: 0.4,
          evaluate: (f) => {
            const windImprovement = Math.max(0, 1 - f.weatherConditions.windSpeed / 50);
            const precipImprovement = Math.max(0, 1 - f.weatherConditions.precipitation / 50);
            return (windImprovement + precipImprovement) / 2;
          },
        },
        {
          name: 'time_of_day',
          weight: 0.3,
          evaluate: (f) => f.timeOfDay === 'morning' || f.timeOfDay === 'afternoon' ? 0.6 : 0.3,
        },
        {
          name: 'historical_response',
          weight: 0.3,
          evaluate: (f) => {
            if (!f.historicalData) return 0.5;
            return Math.max(0, 1 - f.historicalData.averageResponseTime / 60);
          },
        },
      ],
      timeToEscalationModel: (f) => {
        const baseTime = 30; // minutes
        const densityFactor = Math.max(0.5, 1 - f.populationDensity / 10000);
        const weatherFactor = Math.max(0.3, 1 - f.weatherConditions.windSpeed / 100);
        return baseTime * densityFactor * weatherFactor;
      },
      casualtyModel: (f) => {
        const baseCasualties = f.populationDensity * 0.01;
        const vulnerableFactor = 1 + (f.vulnerablePopulation / 100);
        const expected = Math.round(baseCasualties * vulnerableFactor);
        return {
          min: Math.round(expected * 0.5),
          max: Math.round(expected * 2),
          expected,
        };
      },
    });

    // Medical Emergency Model
    models.set('medical_emergency', {
      crisisType: 'medical_emergency',
      escalationFactors: [
        {
          name: 'response_time',
          weight: 0.4,
          threshold: 10,
          evaluate: (f) => {
            if (!f.historicalData) return 0.5;
            return Math.min(f.historicalData.averageResponseTime / 30, 1);
          },
        },
        {
          name: 'vulnerable_population',
          weight: 0.3,
          threshold: 30,
          evaluate: (f) => f.vulnerablePopulation / 100,
        },
        {
          name: 'time_criticality',
          weight: 0.3,
          threshold: 0.7,
          evaluate: (f) => f.timeOfDay === 'night' ? 0.8 : 0.5,
        },
      ],
      deEscalationFactors: [
        {
          name: 'rapid_response',
          weight: 0.5,
          evaluate: (f) => {
            if (!f.historicalData) return 0.5;
            return Math.max(0, 1 - f.historicalData.averageResponseTime / 15);
          },
        },
        {
          name: 'medical_infrastructure',
          weight: 0.5,
          evaluate: (f) => f.infrastructureCriticality,
        },
      ],
      timeToEscalationModel: (f) => {
        const baseTime = 10; // minutes - medical emergencies escalate quickly
        const responseFactor = f.historicalData ? Math.max(0.5, f.historicalData.averageResponseTime / 20) : 1;
        return baseTime * responseFactor;
      },
      casualtyModel: (f) => {
        const baseRisk = 1;
        const vulnerableFactor = 1 + (f.vulnerablePopulation / 50);
        const expected = Math.round(baseRisk * vulnerableFactor);
        return {
          min: 0,
          max: Math.round(expected * 3),
          expected,
        };
      },
    });

    // Fire Model
    models.set('fire', {
      crisisType: 'fire',
      escalationFactors: [
        {
          name: 'wind_speed',
          weight: 0.35,
          threshold: 30,
          evaluate: (f) => Math.min(f.weatherConditions.windSpeed / 80, 1),
        },
        {
          name: 'population_density',
          weight: 0.25,
          threshold: 500,
          evaluate: (f) => Math.min(f.populationDensity / 3000, 1),
        },
        {
          name: 'infrastructure_density',
          weight: 0.2,
          threshold: 0.6,
          evaluate: (f) => f.infrastructureCriticality,
        },
        {
          name: 'weather_conditions',
          weight: 0.2,
          threshold: 30,
          evaluate: (f) => {
            const tempScore = Math.min((f.weatherConditions.temperature - 20) / 30, 1);
            const dryScore = Math.max(0, 1 - f.weatherConditions.precipitation / 10);
            return (tempScore + dryScore) / 2;
          },
        },
      ],
      deEscalationFactors: [
        {
          name: 'precipitation',
          weight: 0.4,
          evaluate: (f) => Math.min(f.weatherConditions.precipitation / 20, 1),
        },
        {
          name: 'wind_reduction',
          weight: 0.3,
          evaluate: (f) => Math.max(0, 1 - f.weatherConditions.windSpeed / 40),
        },
        {
          name: 'response_capability',
          weight: 0.3,
          evaluate: (f) => f.infrastructureCriticality,
        },
      ],
      timeToEscalationModel: (f) => {
        const baseTime = 20;
        const windFactor = Math.max(0.3, 1 - f.weatherConditions.windSpeed / 60);
        const precipFactor = Math.max(0.5, 1 + f.weatherConditions.precipitation / 20);
        return baseTime * windFactor * precipFactor;
      },
      casualtyModel: (f) => {
        const baseCasualties = (f.populationDensity / 1000) * 2;
        const nightFactor = f.timeOfDay === 'night' ? 1.5 : 1;
        const expected = Math.round(baseCasualties * nightFactor);
        return {
          min: Math.round(expected * 0.3),
          max: Math.round(expected * 3),
          expected,
        };
      },
    });

    // Security Threat Model
    models.set('security_threat', {
      crisisType: 'security_threat',
      escalationFactors: [
        {
          name: 'population_density',
          weight: 0.4,
          threshold: 1000,
          evaluate: (f) => Math.min(f.populationDensity / 5000, 1),
        },
        {
          name: 'time_of_day',
          weight: 0.3,
          threshold: 0.5,
          evaluate: (f) => {
            const crowdedTimes = ['afternoon', 'evening'];
            return crowdedTimes.includes(f.timeOfDay) ? 0.8 : 0.4;
          },
        },
        {
          name: 'response_time',
          weight: 0.3,
          threshold: 5,
          evaluate: (f) => {
            if (!f.historicalData) return 0.6;
            return Math.min(f.historicalData.averageResponseTime / 15, 1);
          },
        },
      ],
      deEscalationFactors: [
        {
          name: 'rapid_response',
          weight: 0.6,
          evaluate: (f) => {
            if (!f.historicalData) return 0.5;
            return Math.max(0, 1 - f.historicalData.averageResponseTime / 10);
          },
        },
        {
          name: 'infrastructure_security',
          weight: 0.4,
          evaluate: (f) => f.infrastructureCriticality,
        },
      ],
      timeToEscalationModel: (f) => {
        const baseTime = 5; // Security threats escalate very quickly
        const densityFactor = Math.max(0.5, 1 - f.populationDensity / 8000);
        return baseTime * densityFactor;
      },
      casualtyModel: (f) => {
        const baseCasualties = (f.populationDensity / 500) * 3;
        const expected = Math.round(baseCasualties);
        return {
          min: Math.round(expected * 0.2),
          max: Math.round(expected * 5),
          expected,
        };
      },
    });

    // Add default models for other crisis types
    const defaultTypes: CrisisType[] = [
      'infrastructure_failure',
      'environmental_hazard',
      'public_health',
      'civil_unrest',
      'technological_disaster',
    ];

    for (const type of defaultTypes) {
      models.set(type, this.createDefaultModel(type));
    }

    return models;
  }

  /**
   * Create a default prediction model
   */
  private createDefaultModel(crisisType: CrisisType): PredictionModel {
    return {
      crisisType,
      escalationFactors: [
        {
          name: 'population_density',
          weight: 0.4,
          threshold: 1000,
          evaluate: (f) => Math.min(f.populationDensity / 4000, 1),
        },
        {
          name: 'infrastructure_criticality',
          weight: 0.3,
          threshold: 0.6,
          evaluate: (f) => f.infrastructureCriticality,
        },
        {
          name: 'vulnerable_population',
          weight: 0.3,
          threshold: 25,
          evaluate: (f) => f.vulnerablePopulation / 100,
        },
      ],
      deEscalationFactors: [
        {
          name: 'response_capability',
          weight: 0.5,
          evaluate: (f) => f.infrastructureCriticality,
        },
        {
          name: 'time_factor',
          weight: 0.5,
          evaluate: (f) => f.timeOfDay === 'morning' ? 0.7 : 0.5,
        },
      ],
      timeToEscalationModel: (f) => {
        return 45 * Math.max(0.5, 1 - f.populationDensity / 5000);
      },
      casualtyModel: (f) => {
        const expected = Math.round((f.populationDensity / 2000) * (f.vulnerablePopulation / 50));
        return {
          min: Math.round(expected * 0.4),
          max: Math.round(expected * 2.5),
          expected,
        };
      },
    };
  }

  /**
   * Calculate escalation score
   */
  private calculateEscalationScore(model: PredictionModel, factors: SeverityFactors): number {
    let totalScore = 0;
    let totalWeight = 0;

    for (const factor of model.escalationFactors) {
      const score = factor.evaluate(factors);
      totalScore += score * factor.weight;
      totalWeight += factor.weight;
    }

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  /**
   * Calculate de-escalation score
   */
  private calculateDeEscalationScore(model: PredictionModel, factors: SeverityFactors): number {
    let totalScore = 0;
    let totalWeight = 0;

    for (const factor of model.deEscalationFactors) {
      const score = factor.evaluate(factors);
      totalScore += score * factor.weight;
      totalWeight += factor.weight;
    }

    return totalWeight > 0 ? totalScore / totalWeight : 0;
  }

  /**
   * Determine severity trend
   */
  private determineTrend(
    escalationScore: number,
    deEscalationScore: number
  ): 'escalating' | 'stable' | 'de-escalating' {
    const diff = escalationScore - deEscalationScore;
    
    if (diff > 0.2) return 'escalating';
    if (diff < -0.2) return 'de-escalating';
    return 'stable';
  }

  /**
   * Predict future severity level
   */
  private predictFutureSeverity(
    currentSeverity: SeverityLevel,
    trend: 'escalating' | 'stable' | 'de-escalating',
    escalationScore: number
  ): SeverityLevel {
    const severityLevels: SeverityLevel[] = ['low', 'moderate', 'high', 'critical', 'catastrophic'];
    const currentIndex = severityLevels.indexOf(currentSeverity);

    if (trend === 'stable') {
      return currentSeverity;
    }

    if (trend === 'escalating') {
      const steps = escalationScore > 0.7 ? 2 : 1;
      const newIndex = Math.min(currentIndex + steps, severityLevels.length - 1);
      return severityLevels[newIndex];
    }

    // De-escalating
    const newIndex = Math.max(currentIndex - 1, 0);
    return severityLevels[newIndex];
  }

  /**
   * Calculate prediction confidence
   */
  private calculateConfidence(factors: SeverityFactors, classificationConfidence: number): number {
    let confidence = classificationConfidence;

    // Reduce confidence if missing data
    if (!factors.historicalData) confidence *= 0.9;
    if (!factors.weatherConditions) confidence *= 0.95;

    // Increase confidence with more data points
    if (factors.historicalData && factors.historicalData.similarIncidents > 10) {
      confidence = Math.min(confidence * 1.1, 1.0);
    }

    return Math.max(0.5, Math.min(confidence, 1.0));
  }

  /**
   * Estimate economic and infrastructure damage
   */
  private estimateDamage(
    crisisType: CrisisType,
    factors: SeverityFactors,
    predictedSeverity: SeverityLevel
  ): { economic: number; infrastructure: 'minimal' | 'moderate' | 'severe' | 'catastrophic' } {
    // Base economic damage by crisis type (in millions USD)
    const baseDamage: Record<CrisisType, number> = {
      natural_disaster: 50,
      fire: 20,
      infrastructure_failure: 30,
      environmental_hazard: 40,
      security_threat: 15,
      medical_emergency: 5,
      public_health: 25,
      civil_unrest: 10,
      technological_disaster: 35,
      unknown: 10,
    };

    // Severity multipliers
    const severityMultipliers: Record<SeverityLevel, number> = {
      low: 0.5,
      moderate: 1,
      high: 2,
      critical: 5,
      catastrophic: 10,
    };

    const economic = baseDamage[crisisType] * 
                    severityMultipliers[predictedSeverity] * 
                    (factors.populationDensity / 1000) *
                    factors.infrastructureCriticality;

    // Determine infrastructure damage level
    let infrastructure: 'minimal' | 'moderate' | 'severe' | 'catastrophic';
    if (predictedSeverity === 'catastrophic') infrastructure = 'catastrophic';
    else if (predictedSeverity === 'critical') infrastructure = 'severe';
    else if (predictedSeverity === 'high') infrastructure = 'moderate';
    else infrastructure = 'minimal';

    return { economic: Math.round(economic), infrastructure };
  }

  /**
   * Generate severity-based recommendations
   */
  private generateRecommendations(
    classification: CrisisClassification,
    trend: 'escalating' | 'stable' | 'de-escalating',
    predictedSeverity: SeverityLevel,
    factors: SeverityFactors
  ): string[] {
    const recommendations: string[] = [];

    if (trend === 'escalating') {
      recommendations.push('Immediate escalation to higher alert level recommended');
      recommendations.push('Deploy additional emergency resources');
      recommendations.push('Activate emergency response protocols');
    }

    if (predictedSeverity === 'critical' || predictedSeverity === 'catastrophic') {
      recommendations.push('Consider mass evacuation procedures');
      recommendations.push('Request state/federal emergency assistance');
      recommendations.push('Establish emergency command center');
    }

    if (factors.vulnerablePopulation > 30) {
      recommendations.push('Prioritize vulnerable population protection');
      recommendations.push('Deploy specialized medical teams');
    }

    if (factors.populationDensity > 2000) {
      recommendations.push('Implement crowd control measures');
      recommendations.push('Establish multiple evacuation routes');
    }

    if (trend === 'de-escalating') {
      recommendations.push('Maintain current response level');
      recommendations.push('Begin damage assessment procedures');
      recommendations.push('Prepare for recovery phase transition');
    }

    return recommendations;
  }

  /**
   * Get default prediction when model is unavailable
   */
  private getDefaultPrediction(
    classification: CrisisClassification,
    factors: SeverityFactors
  ): SeverityPrediction {
    return {
      currentSeverity: classification.severity,
      predictedSeverity: classification.severity,
      severityTrend: 'stable',
      confidence: 0.6,
      estimatedCasualties: {
        min: 0,
        max: 10,
        expected: 2,
      },
      estimatedDamage: {
        economic: 1000000,
        infrastructure: 'minimal',
      },
      factors,
      recommendations: ['Monitor situation closely', 'Maintain standard response protocols'],
    };
  }

  /**
   * Get model information
   */
  getModelInfo() {
    return {
      version: this.modelVersion,
      supportedTypes: Array.from(this.models.keys()),
      totalModels: this.models.size,
    };
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const severityPredictor = new SeverityPredictor();

// Made with Bob
