/**
 * AEGIS OS AI Intelligence Engine - Response Orchestrator
 * Coordinates all AI components for comprehensive crisis response
 */

import {
  AIRequest,
  AIResponse,
  AIOrchestrationResult,
  CrisisClassification,
  SeverityPrediction,
  EmergencyRecommendation,
  EvacuationRecommendation,
  SeverityFactors,
  Coordinates,
} from './types';
import { crisisClassifier } from './classifiers/crisisClassifier';
import { severityPredictor } from './predictors/severityPredictor';
import { recommendationGenerator } from './generators/recommendationGenerator';
import { evacuationGenerator } from './generators/evacuationGenerator';

// ============================================================================
// Orchestrator Configuration
// ============================================================================

interface OrchestratorConfig {
  enableClassification: boolean;
  enableSeverityPrediction: boolean;
  enableRecommendations: boolean;
  enableEvacuationPlanning: boolean;
  parallelProcessing: boolean;
  timeout: number; // milliseconds
}

const DEFAULT_CONFIG: OrchestratorConfig = {
  enableClassification: true,
  enableSeverityPrediction: true,
  enableRecommendations: true,
  enableEvacuationPlanning: true,
  parallelProcessing: true,
  timeout: 30000, // 30 seconds
};

// ============================================================================
// AI Orchestrator Class
// ============================================================================

export class AIOrchestrator {
  private config: OrchestratorConfig;
  private requestCount: number = 0;
  private successCount: number = 0;
  private errorCount: number = 0;

  constructor(config: Partial<OrchestratorConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Process a complete AI request through all components
   */
  async processRequest(request: AIRequest): Promise<AIResponse<AIOrchestrationResult>> {
    const startTime = Date.now();
    this.requestCount++;

    try {
      // Validate request
      this.validateRequest(request);

      // Extract data from request
      const { description, location, factors } = this.extractRequestData(request);

      // Execute AI pipeline
      const result = await this.executePipeline(description, location, factors);

      // Calculate processing time
      const processingTime = Date.now() - startTime;

      // Calculate overall confidence
      const confidence = this.calculateOverallConfidence(result);

      this.successCount++;

      return {
        requestId: request.id,
        success: true,
        data: {
          ...result,
          processingTime,
          confidence,
        },
        metadata: {
          processingTime,
          modelVersion: '1.0.0',
          confidence,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      this.errorCount++;
      return this.handleError(request.id, error, Date.now() - startTime);
    }
  }

  /**
   * Process classification only
   */
  async classify(
    description: string,
    location?: Coordinates
  ): Promise<AIResponse<CrisisClassification>> {
    const startTime = Date.now();

    try {
      const classification = await crisisClassifier.classify(description, {
        location,
        reportSource: 'citizen',
      });

      return {
        requestId: `classify-${Date.now()}`,
        success: true,
        data: classification,
        metadata: {
          processingTime: Date.now() - startTime,
          modelVersion: '1.0.0',
          confidence: classification.confidence,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return this.handleError(`classify-${Date.now()}`, error, Date.now() - startTime);
    }
  }

  /**
   * Process severity prediction only
   */
  async predictSeverity(
    classification: CrisisClassification,
    factors: SeverityFactors
  ): Promise<AIResponse<SeverityPrediction>> {
    const startTime = Date.now();

    try {
      const prediction = await severityPredictor.predict(classification, factors);

      return {
        requestId: `predict-${Date.now()}`,
        success: true,
        data: prediction,
        metadata: {
          processingTime: Date.now() - startTime,
          modelVersion: '1.0.0',
          confidence: prediction.confidence,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return this.handleError(`predict-${Date.now()}`, error, Date.now() - startTime);
    }
  }

  /**
   * Generate recommendations only
   */
  async generateRecommendations(
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): Promise<AIResponse<EmergencyRecommendation[]>> {
    const startTime = Date.now();

    try {
      const recommendations = await recommendationGenerator.generate(classification, prediction);

      return {
        requestId: `recommend-${Date.now()}`,
        success: true,
        data: recommendations,
        metadata: {
          processingTime: Date.now() - startTime,
          modelVersion: '1.0.0',
          confidence: prediction.confidence,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return this.handleError(`recommend-${Date.now()}`, error, Date.now() - startTime);
    }
  }

  /**
   * Generate evacuation plan only
   */
  async generateEvacuationPlan(
    classification: CrisisClassification,
    prediction: SeverityPrediction,
    crisisCenter: Coordinates,
    affectedRadius: number
  ): Promise<AIResponse<EvacuationRecommendation>> {
    const startTime = Date.now();

    try {
      const evacuationPlan = await evacuationGenerator.generate(
        classification,
        prediction,
        {
          crisisCenter,
          affectedRadius,
        }
      );

      return {
        requestId: `evacuate-${Date.now()}`,
        success: true,
        data: evacuationPlan,
        metadata: {
          processingTime: Date.now() - startTime,
          modelVersion: '1.0.0',
          confidence: prediction.confidence,
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      return this.handleError(`evacuate-${Date.now()}`, error, Date.now() - startTime);
    }
  }

  /**
   * Execute the complete AI pipeline
   */
  private async executePipeline(
    description: string,
    location?: Coordinates,
    factors?: SeverityFactors
  ): Promise<Omit<AIOrchestrationResult, 'processingTime' | 'confidence'>> {
    // Step 1: Classification
    const classification = await crisisClassifier.classify(description, {
      location,
      reportSource: 'citizen',
    });

    // Step 2: Severity Prediction
    const severityFactors = factors || this.generateDefaultFactors(location);
    const prediction = await severityPredictor.predict(classification, severityFactors);

    // Step 3: Generate Recommendations
    const recommendations = await recommendationGenerator.generate(classification, prediction);

    // Step 4: Generate Evacuation Plan (if needed)
    let evacuationPlan: EvacuationRecommendation | undefined;
    if (
      this.config.enableEvacuationPlanning &&
      this.shouldGenerateEvacuationPlan(prediction)
    ) {
      evacuationPlan = await evacuationGenerator.generate(
        classification,
        prediction,
        {
          crisisCenter: location || { latitude: 0, longitude: 0 },
          affectedRadius: this.estimateAffectedRadius(classification, prediction),
        }
      );
    }

    return {
      classification,
      severityPrediction: prediction,
      recommendations,
      evacuationPlan,
    };
  }

  /**
   * Validate AI request
   */
  private validateRequest(request: AIRequest): void {
    if (!request.id) {
      throw new Error('Request ID is required');
    }

    if (!request.type) {
      throw new Error('Request type is required');
    }

    if (!request.data) {
      throw new Error('Request data is required');
    }

    if (request.type === 'classify' && !request.data.description) {
      throw new Error('Description is required for classification');
    }
  }

  /**
   * Extract data from request
   */
  private extractRequestData(request: AIRequest): {
    description: string;
    location?: Coordinates;
    factors?: SeverityFactors;
  } {
    return {
      description: request.data.description || '',
      location: request.data.location || request.context?.location,
      factors: request.data.factors,
    };
  }

  /**
   * Generate default severity factors
   */
  private generateDefaultFactors(location?: Coordinates): SeverityFactors {
    const now = new Date();
    const hour = now.getHours();

    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    if (hour >= 6 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 18) timeOfDay = 'afternoon';
    else if (hour >= 18 && hour < 22) timeOfDay = 'evening';
    else timeOfDay = 'night';

    const dayOfWeek = now.getDay() === 0 || now.getDay() === 6 ? 'weekend' : 'weekday';

    return {
      populationDensity: 1000, // default urban density
      vulnerablePopulation: 15, // 15% default
      infrastructureCriticality: 0.7,
      weatherConditions: {
        temperature: 20,
        windSpeed: 10,
        precipitation: 0,
        visibility: 10,
      },
      timeOfDay,
      dayOfWeek,
    };
  }

  /**
   * Determine if evacuation plan should be generated
   */
  private shouldGenerateEvacuationPlan(prediction: SeverityPrediction): boolean {
    return (
      prediction.predictedSeverity === 'critical' ||
      prediction.predictedSeverity === 'catastrophic' ||
      (prediction.predictedSeverity === 'high' && prediction.severityTrend === 'escalating')
    );
  }

  /**
   * Estimate affected radius based on crisis type and severity
   */
  private estimateAffectedRadius(
    classification: CrisisClassification,
    prediction: SeverityPrediction
  ): number {
    // Base radius by crisis type (in meters)
    const baseRadius: Record<string, number> = {
      natural_disaster: 5000,
      fire: 2000,
      security_threat: 1000,
      infrastructure_failure: 3000,
      environmental_hazard: 4000,
      medical_emergency: 500,
      public_health: 10000,
      civil_unrest: 2000,
      technological_disaster: 3000,
      unknown: 1000,
    };

    // Severity multipliers
    const severityMultipliers: Record<string, number> = {
      low: 0.5,
      moderate: 1,
      high: 1.5,
      critical: 2,
      catastrophic: 3,
    };

    const base = baseRadius[classification.type] || 1000;
    const multiplier = severityMultipliers[prediction.predictedSeverity] || 1;

    return base * multiplier;
  }

  /**
   * Calculate overall confidence score
   */
  private calculateOverallConfidence(
    result: Omit<AIOrchestrationResult, 'processingTime' | 'confidence'>
  ): number {
    const weights = {
      classification: 0.3,
      prediction: 0.4,
      recommendations: 0.3,
    };

    let totalConfidence = 0;
    totalConfidence += result.classification.confidence * weights.classification;
    totalConfidence += result.severityPrediction.confidence * weights.prediction;

    // Average recommendation effectiveness as confidence
    if (result.recommendations.length > 0) {
      const avgEffectiveness =
        result.recommendations.reduce((sum, rec) => sum + rec.effectiveness, 0) /
        result.recommendations.length;
      totalConfidence += avgEffectiveness * weights.recommendations;
    }

    return Math.min(totalConfidence, 1.0);
  }

  /**
   * Handle errors
   */
  private handleError(
    requestId: string,
    error: any,
    processingTime: number
  ): AIResponse<any> {
    console.error('AI Orchestrator Error:', error);

    return {
      requestId,
      success: false,
      error: {
        code: error.code || 'ORCHESTRATION_ERROR',
        message: error.message || 'An error occurred during AI processing',
        details: error.stack,
      },
      metadata: {
        processingTime,
        modelVersion: '1.0.0',
        confidence: 0,
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Get orchestrator statistics
   */
  getStatistics() {
    return {
      totalRequests: this.requestCount,
      successfulRequests: this.successCount,
      failedRequests: this.errorCount,
      successRate: this.requestCount > 0 ? this.successCount / this.requestCount : 0,
      config: this.config,
    };
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<OrchestratorConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * Reset statistics
   */
  resetStatistics() {
    this.requestCount = 0;
    this.successCount = 0;
    this.errorCount = 0;
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const aiOrchestrator = new AIOrchestrator();

// ============================================================================
// Convenience functions
// ============================================================================

/**
 * Quick crisis analysis
 */
export async function analyzeCrisis(
  description: string,
  location?: Coordinates,
  factors?: SeverityFactors
): Promise<AIOrchestrationResult> {
  const request: AIRequest = {
    id: `analyze-${Date.now()}`,
    type: 'analyze',
    timestamp: new Date().toISOString(),
    priority: 'high',
    data: { description, location, factors },
  };

  const response = await aiOrchestrator.processRequest(request);

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Analysis failed');
  }

  return response.data;
}

/**
 * Quick classification
 */
export async function classifyCrisis(
  description: string,
  location?: Coordinates
): Promise<CrisisClassification> {
  const response = await aiOrchestrator.classify(description, location);

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Classification failed');
  }

  return response.data;
}

/**
 * Quick severity prediction
 */
export async function predictCrisisSeverity(
  classification: CrisisClassification,
  factors: SeverityFactors
): Promise<SeverityPrediction> {
  const response = await aiOrchestrator.predictSeverity(classification, factors);

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Prediction failed');
  }

  return response.data;
}

// Made with Bob
