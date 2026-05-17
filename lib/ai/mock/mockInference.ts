/**
 * AEGIS OS AI Intelligence Engine - Mock Inference System
 * Simulates AI model inference with realistic behavior and latency
 */

import {
  MockAIConfig,
  TrainingData,
  ModelMetrics,
  CrisisType,
  SeverityLevel,
} from '../types';

// ============================================================================
// Mock Configuration
// ============================================================================

const DEFAULT_MOCK_CONFIG: MockAIConfig = {
  latency: {
    min: 100,
    max: 500,
  },
  errorRate: 0.02, // 2% error rate
  confidenceRange: {
    min: 0.7,
    max: 0.98,
  },
  enableRealisticVariation: true,
};

// ============================================================================
// Mock Training Data
// ============================================================================

const MOCK_TRAINING_DATA: TrainingData[] = [
  // Natural disasters
  {
    crisisType: 'natural_disaster',
    features: [1, 0, 0, 0, 0, 0, 0, 0, 0],
    label: 'catastrophic',
    metadata: { subType: 'earthquake', magnitude: 7.5 },
  },
  {
    crisisType: 'natural_disaster',
    features: [0, 1, 0, 0, 0, 0, 0, 0, 0],
    label: 'critical',
    metadata: { subType: 'flood', severity: 'major' },
  },
  // Medical emergencies
  {
    crisisType: 'medical_emergency',
    features: [0, 0, 1, 0, 0, 0, 0, 0, 0],
    label: 'critical',
    metadata: { subType: 'cardiac_arrest' },
  },
  // Fires
  {
    crisisType: 'fire',
    features: [0, 0, 0, 1, 0, 0, 0, 0, 0],
    label: 'high',
    metadata: { subType: 'building_fire', floors: 5 },
  },
  // Security threats
  {
    crisisType: 'security_threat',
    features: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    label: 'critical',
    metadata: { subType: 'active_shooter' },
  },
];

// ============================================================================
// Mock Model Metrics
// ============================================================================

const MOCK_MODEL_METRICS: Record<string, ModelMetrics> = {
  classification: {
    accuracy: 0.94,
    precision: 0.92,
    recall: 0.91,
    f1Score: 0.915,
    lastUpdated: new Date().toISOString(),
  },
  severity_prediction: {
    accuracy: 0.89,
    precision: 0.87,
    recall: 0.88,
    f1Score: 0.875,
    lastUpdated: new Date().toISOString(),
  },
  recommendation: {
    accuracy: 0.91,
    precision: 0.90,
    recall: 0.89,
    f1Score: 0.895,
    lastUpdated: new Date().toISOString(),
  },
};

// ============================================================================
// Mock Inference Engine
// ============================================================================

export class MockInferenceEngine {
  private config: MockAIConfig;
  private inferenceCount: number = 0;
  private errorCount: number = 0;

  constructor(config: Partial<MockAIConfig> = {}) {
    this.config = { ...DEFAULT_MOCK_CONFIG, ...config };
  }

  /**
   * Simulate model inference with realistic latency
   */
  async infer<T>(
    modelName: string,
    input: any,
    processor: () => T
  ): Promise<T> {
    this.inferenceCount++;

    // Simulate network/processing latency
    await this.simulateLatency();

    // Simulate random errors
    if (this.shouldSimulateError()) {
      this.errorCount++;
      throw new Error(`Mock inference error for model: ${modelName}`);
    }

    // Add realistic variation if enabled
    if (this.config.enableRealisticVariation) {
      await this.addProcessingVariation();
    }

    // Execute the actual processing
    return processor();
  }

  /**
   * Simulate classification inference
   */
  async classifyInference(
    input: string,
    features: number[]
  ): Promise<{
    type: CrisisType;
    confidence: number;
    processingTime: number;
  }> {
    const startTime = Date.now();

    return this.infer('classification', input, () => {
      // Find best matching training data
      const match = this.findBestMatch(features);
      
      // Generate confidence with variation
      const confidence = this.generateConfidence();

      return {
        type: match.crisisType,
        confidence,
        processingTime: Date.now() - startTime,
      };
    });
  }

  /**
   * Simulate severity prediction inference
   */
  async severityInference(
    crisisType: CrisisType,
    features: number[]
  ): Promise<{
    severity: SeverityLevel;
    confidence: number;
    processingTime: number;
  }> {
    const startTime = Date.now();

    return this.infer('severity_prediction', { crisisType, features }, () => {
      // Calculate severity based on features
      const severityScore = this.calculateSeverityScore(features);
      const severity = this.scoreToSeverityLevel(severityScore);
      const confidence = this.generateConfidence();

      return {
        severity,
        confidence,
        processingTime: Date.now() - startTime,
      };
    });
  }

  /**
   * Simulate recommendation generation inference
   */
  async recommendationInference(
    crisisType: CrisisType,
    severity: SeverityLevel
  ): Promise<{
    recommendationIds: string[];
    confidence: number;
    processingTime: number;
  }> {
    const startTime = Date.now();

    return this.infer('recommendation', { crisisType, severity }, () => {
      // Generate mock recommendation IDs
      const numRecommendations = this.getRecommendationCount(severity);
      const recommendationIds = Array.from(
        { length: numRecommendations },
        (_, i) => `rec-${crisisType}-${severity}-${i + 1}`
      );
      
      const confidence = this.generateConfidence();

      return {
        recommendationIds,
        confidence,
        processingTime: Date.now() - startTime,
      };
    });
  }

  /**
   * Simulate batch inference
   */
  async batchInfer<T>(
    modelName: string,
    inputs: any[],
    processor: (input: any) => T
  ): Promise<T[]> {
    // Process in parallel with some delay
    const results = await Promise.all(
      inputs.map(async (input) => {
        await this.simulateLatency();
        return processor(input);
      })
    );

    return results;
  }

  /**
   * Get model metrics
   */
  getModelMetrics(modelName: string): ModelMetrics {
    return MOCK_MODEL_METRICS[modelName] || {
      accuracy: 0.85,
      precision: 0.83,
      recall: 0.84,
      f1Score: 0.835,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Get training data
   */
  getTrainingData(crisisType?: CrisisType): TrainingData[] {
    if (crisisType) {
      return MOCK_TRAINING_DATA.filter(data => data.crisisType === crisisType);
    }
    return MOCK_TRAINING_DATA;
  }

  /**
   * Simulate model training
   */
  async trainModel(
    modelName: string,
    trainingData: TrainingData[]
  ): Promise<{
    success: boolean;
    metrics: ModelMetrics;
    trainingTime: number;
  }> {
    const startTime = Date.now();

    // Simulate training time (longer than inference)
    await this.sleep(this.config.latency.max * 5);

    // Generate mock metrics
    const metrics: ModelMetrics = {
      accuracy: 0.85 + Math.random() * 0.1,
      precision: 0.83 + Math.random() * 0.1,
      recall: 0.84 + Math.random() * 0.1,
      f1Score: 0.835 + Math.random() * 0.1,
      lastUpdated: new Date().toISOString(),
    };

    return {
      success: true,
      metrics,
      trainingTime: Date.now() - startTime,
    };
  }

  /**
   * Get inference statistics
   */
  getStatistics() {
    return {
      totalInferences: this.inferenceCount,
      errors: this.errorCount,
      errorRate: this.inferenceCount > 0 ? this.errorCount / this.inferenceCount : 0,
      config: this.config,
    };
  }

  /**
   * Reset statistics
   */
  resetStatistics() {
    this.inferenceCount = 0;
    this.errorCount = 0;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<MockAIConfig>) {
    this.config = { ...this.config, ...config };
  }

  // ============================================================================
  // Private Helper Methods
  // ============================================================================

  /**
   * Simulate processing latency
   */
  private async simulateLatency(): Promise<void> {
    const latency = this.getRandomLatency();
    await this.sleep(latency);
  }

  /**
   * Add random processing variation
   */
  private async addProcessingVariation(): Promise<void> {
    // Add small random delay (0-50ms)
    const variation = Math.random() * 50;
    await this.sleep(variation);
  }

  /**
   * Determine if error should be simulated
   */
  private shouldSimulateError(): boolean {
    return Math.random() < this.config.errorRate;
  }

  /**
   * Generate random confidence score
   */
  private generateConfidence(): number {
    const { min, max } = this.config.confidenceRange;
    return min + Math.random() * (max - min);
  }

  /**
   * Get random latency within configured range
   */
  private getRandomLatency(): number {
    const { min, max } = this.config.latency;
    return min + Math.random() * (max - min);
  }

  /**
   * Find best matching training data
   */
  private findBestMatch(features: number[]): TrainingData {
    // Simple cosine similarity
    let bestMatch = MOCK_TRAINING_DATA[0];
    let bestScore = -1;

    for (const data of MOCK_TRAINING_DATA) {
      const score = this.cosineSimilarity(features, data.features);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = data;
      }
    }

    return bestMatch;
  }

  /**
   * Calculate cosine similarity
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  }

  /**
   * Calculate severity score from features
   */
  private calculateSeverityScore(features: number[]): number {
    // Weighted sum of features
    const weights = [0.3, 0.25, 0.2, 0.15, 0.1];
    let score = 0;

    for (let i = 0; i < Math.min(features.length, weights.length); i++) {
      score += features[i] * weights[i];
    }

    // Normalize to 0-100
    return Math.min(Math.max(score * 100, 0), 100);
  }

  /**
   * Convert severity score to level
   */
  private scoreToSeverityLevel(score: number): SeverityLevel {
    if (score >= 90) return 'catastrophic';
    if (score >= 75) return 'critical';
    if (score >= 60) return 'high';
    if (score >= 40) return 'moderate';
    return 'low';
  }

  /**
   * Get number of recommendations based on severity
   */
  private getRecommendationCount(severity: SeverityLevel): number {
    const counts: Record<SeverityLevel, number> = {
      catastrophic: 8,
      critical: 6,
      high: 5,
      moderate: 3,
      low: 2,
    };
    return counts[severity];
  }

  /**
   * Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ============================================================================
// Mock Data Generators
// ============================================================================

/**
 * Generate mock crisis data
 */
export function generateMockCrisisData(count: number = 10): Array<{
  description: string;
  type: CrisisType;
  severity: SeverityLevel;
}> {
  const templates = [
    { type: 'natural_disaster' as CrisisType, descriptions: [
      'Major earthquake detected, magnitude 7.2',
      'Severe flooding in downtown area',
      'Hurricane approaching coastal region',
      'Tornado warning issued for multiple counties',
    ]},
    { type: 'fire' as CrisisType, descriptions: [
      'Large building fire reported on Main Street',
      'Wildfire spreading rapidly in forest area',
      'Industrial fire at chemical plant',
      'Vehicle fire blocking highway',
    ]},
    { type: 'medical_emergency' as CrisisType, descriptions: [
      'Cardiac arrest patient needs immediate attention',
      'Multiple casualties from traffic accident',
      'Severe allergic reaction reported',
      'Stroke victim requires emergency transport',
    ]},
    { type: 'security_threat' as CrisisType, descriptions: [
      'Active shooter situation at shopping mall',
      'Bomb threat at government building',
      'Hostage situation in progress',
      'Suspicious package found at train station',
    ]},
  ];

  const severities: SeverityLevel[] = ['low', 'moderate', 'high', 'critical', 'catastrophic'];
  const data: Array<{ description: string; type: CrisisType; severity: SeverityLevel }> = [];

  for (let i = 0; i < count; i++) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];

    data.push({
      description,
      type: template.type,
      severity,
    });
  }

  return data;
}

/**
 * Generate mock feature vector
 */
export function generateMockFeatures(dimension: number = 9): number[] {
  return Array.from({ length: dimension }, () => Math.random());
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const mockInferenceEngine = new MockInferenceEngine();

// Made with Bob
