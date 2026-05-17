/**
 * AEGIS OS AI Intelligence Engine - Crisis Classification System
 * Advanced ML-based crisis type and severity classification
 */

import {
  CrisisType,
  CrisisSubType,
  SeverityLevel,
  CrisisClassification,
  Coordinates,
} from '../types';

// ============================================================================
// Classification Models
// ============================================================================

interface ClassificationFeatures {
  keywords: string[];
  location?: Coordinates;
  timeOfDay: number; // 0-23
  weatherConditions?: {
    temperature: number;
    windSpeed: number;
    precipitation: number;
  };
  reportSource: 'citizen' | 'sensor' | 'official' | 'social_media' | 'emergency_call';
  urgencyIndicators: number; // 0-1
  historicalContext?: any;
}

interface ClassificationModel {
  type: CrisisType;
  keywords: string[];
  patterns: RegExp[];
  weight: number;
  subTypeClassifiers: Map<string, string[]>;
}

// ============================================================================
// Classification Models Database
// ============================================================================

const CLASSIFICATION_MODELS: ClassificationModel[] = [
  {
    type: 'natural_disaster',
    keywords: ['earthquake', 'flood', 'hurricane', 'tornado', 'tsunami', 'wildfire', 'landslide', 'volcanic', 'storm', 'cyclone'],
    patterns: [/earthquake|seismic/i, /flood|flooding|inundation/i, /hurricane|typhoon|cyclone/i, /tornado|twister/i],
    weight: 1.0,
    subTypeClassifiers: new Map([
      ['earthquake', ['earthquake', 'seismic', 'tremor', 'quake', 'aftershock']],
      ['flood', ['flood', 'flooding', 'inundation', 'overflow', 'deluge']],
      ['hurricane', ['hurricane', 'typhoon', 'cyclone', 'tropical storm']],
      ['tornado', ['tornado', 'twister', 'funnel cloud']],
      ['wildfire', ['wildfire', 'forest fire', 'brush fire', 'bushfire']],
      ['tsunami', ['tsunami', 'tidal wave', 'seismic sea wave']],
      ['landslide', ['landslide', 'mudslide', 'rockslide', 'avalanche']],
      ['volcanic_eruption', ['volcanic', 'eruption', 'lava', 'volcano']],
    ]),
  },
  {
    type: 'medical_emergency',
    keywords: ['cardiac', 'stroke', 'injury', 'poisoning', 'allergic', 'respiratory', 'unconscious', 'bleeding', 'trauma'],
    patterns: [/cardiac|heart attack/i, /stroke|cerebral/i, /injury|trauma|accident/i, /poison|toxic/i],
    weight: 0.95,
    subTypeClassifiers: new Map([
      ['cardiac_arrest', ['cardiac', 'heart attack', 'chest pain', 'myocardial']],
      ['stroke', ['stroke', 'cerebral', 'brain attack', 'CVA']],
      ['severe_injury', ['injury', 'trauma', 'fracture', 'wound', 'bleeding']],
      ['poisoning', ['poison', 'toxic', 'overdose', 'ingestion']],
      ['allergic_reaction', ['allergic', 'anaphylaxis', 'reaction', 'allergy']],
      ['respiratory_failure', ['respiratory', 'breathing', 'asthma', 'choking']],
    ]),
  },
  {
    type: 'fire',
    keywords: ['fire', 'smoke', 'flames', 'burning', 'blaze', 'combustion', 'explosion'],
    patterns: [/fire|flames|burning/i, /smoke|combustion/i, /explosion|blast/i],
    weight: 0.9,
    subTypeClassifiers: new Map([
      ['building_fire', ['building', 'structure', 'house', 'apartment', 'office']],
      ['wildfire', ['wildfire', 'forest', 'brush', 'vegetation']],
      ['industrial_fire', ['industrial', 'factory', 'plant', 'warehouse']],
      ['vehicle_fire', ['vehicle', 'car', 'truck', 'bus', 'automobile']],
      ['electrical_fire', ['electrical', 'wiring', 'power', 'circuit']],
    ]),
  },
  {
    type: 'security_threat',
    keywords: ['shooter', 'bomb', 'hostage', 'terrorism', 'attack', 'threat', 'weapon', 'intrusion'],
    patterns: [/shooter|gunman|armed/i, /bomb|explosive/i, /hostage|kidnap/i, /terror|attack/i],
    weight: 1.0,
    subTypeClassifiers: new Map([
      ['active_shooter', ['shooter', 'gunman', 'armed', 'shooting', 'gunfire']],
      ['bomb_threat', ['bomb', 'explosive', 'IED', 'detonation']],
      ['hostage_situation', ['hostage', 'kidnap', 'abduction', 'captive']],
      ['terrorism', ['terrorism', 'terrorist', 'attack', 'extremist']],
      ['intrusion', ['intrusion', 'break-in', 'trespassing', 'unauthorized']],
    ]),
  },
  {
    type: 'infrastructure_failure',
    keywords: ['power outage', 'blackout', 'water', 'gas leak', 'bridge', 'dam', 'collapse', 'failure'],
    patterns: [/power outage|blackout/i, /water contamination/i, /gas leak/i, /collapse|structural failure/i],
    weight: 0.85,
    subTypeClassifiers: new Map([
      ['power_outage', ['power', 'outage', 'blackout', 'electricity', 'grid']],
      ['water_contamination', ['water', 'contamination', 'pollution', 'supply']],
      ['gas_leak', ['gas', 'leak', 'natural gas', 'propane']],
      ['bridge_collapse', ['bridge', 'collapse', 'structural']],
      ['dam_failure', ['dam', 'failure', 'breach', 'overflow']],
    ]),
  },
  {
    type: 'environmental_hazard',
    keywords: ['chemical', 'spill', 'radiation', 'leak', 'pollution', 'contamination', 'hazmat'],
    patterns: [/chemical spill|hazmat/i, /radiation|nuclear/i, /pollution|contamination/i],
    weight: 0.9,
    subTypeClassifiers: new Map([
      ['chemical_spill', ['chemical', 'spill', 'hazmat', 'toxic']],
      ['radiation_leak', ['radiation', 'nuclear', 'radioactive', 'leak']],
      ['air_pollution', ['air', 'pollution', 'smog', 'emissions']],
      ['water_pollution', ['water', 'pollution', 'contamination', 'runoff']],
    ]),
  },
  {
    type: 'public_health',
    keywords: ['epidemic', 'pandemic', 'outbreak', 'disease', 'virus', 'infection', 'contamination'],
    patterns: [/epidemic|pandemic/i, /outbreak|disease/i, /virus|infection/i],
    weight: 0.8,
    subTypeClassifiers: new Map([
      ['epidemic', ['epidemic', 'widespread', 'disease']],
      ['pandemic', ['pandemic', 'global', 'worldwide']],
      ['food_contamination', ['food', 'contamination', 'poisoning', 'outbreak']],
      ['disease_outbreak', ['outbreak', 'disease', 'infection', 'virus']],
    ]),
  },
  {
    type: 'civil_unrest',
    keywords: ['riot', 'protest', 'looting', 'violence', 'unrest', 'demonstration'],
    patterns: [/riot|violence/i, /protest|demonstration/i, /looting|vandalism/i],
    weight: 0.75,
    subTypeClassifiers: new Map([
      ['riot', ['riot', 'violence', 'mob', 'chaos']],
      ['protest', ['protest', 'demonstration', 'rally', 'march']],
      ['looting', ['looting', 'theft', 'vandalism', 'destruction']],
      ['civil_war', ['civil war', 'conflict', 'insurgency']],
    ]),
  },
  {
    type: 'technological_disaster',
    keywords: ['cyber', 'hack', 'breach', 'system failure', 'malware', 'ransomware', 'data breach'],
    patterns: [/cyber attack|hack/i, /data breach|leak/i, /system failure|crash/i],
    weight: 0.7,
    subTypeClassifiers: new Map([
      ['cyber_attack', ['cyber', 'hack', 'attack', 'breach']],
      ['data_breach', ['data', 'breach', 'leak', 'exposure']],
      ['system_failure', ['system', 'failure', 'crash', 'outage']],
      ['communication_breakdown', ['communication', 'breakdown', 'network', 'failure']],
    ]),
  },
];

// ============================================================================
// Crisis Classifier Class
// ============================================================================

export class CrisisClassifier {
  private models: ClassificationModel[];
  private modelVersion: string = '1.0.0';

  constructor() {
    this.models = CLASSIFICATION_MODELS;
  }

  /**
   * Classify a crisis based on input features
   */
  async classify(
    description: string,
    features?: Partial<ClassificationFeatures>
  ): Promise<CrisisClassification> {
    const startTime = Date.now();

    // Extract keywords from description
    const keywords = this.extractKeywords(description);
    
    // Score each crisis type
    const scores = this.scoreModels(description, keywords, features);
    
    // Get the best match
    const bestMatch = this.getBestMatch(scores);
    
    // Classify sub-type
    const subType = this.classifySubType(bestMatch.type, description, keywords);
    
    // Calculate severity
    const severity = this.calculateSeverity(bestMatch.type, subType, features);
    
    const processingTime = Date.now() - startTime;

    return {
      type: bestMatch.type,
      subType,
      confidence: bestMatch.confidence,
      severity: severity.level,
      severityScore: severity.score,
      timestamp: new Date().toISOString(),
      location: features?.location,
      metadata: {
        source: features?.reportSource || 'unknown',
        processingTime,
        modelVersion: this.modelVersion,
      },
    };
  }

  /**
   * Batch classify multiple crises
   */
  async batchClassify(
    items: Array<{ description: string; features?: Partial<ClassificationFeatures> }>
  ): Promise<CrisisClassification[]> {
    return Promise.all(
      items.map(item => this.classify(item.description, item.features))
    );
  }

  /**
   * Extract keywords from description
   */
  private extractKeywords(description: string): string[] {
    const words = description.toLowerCase().split(/\s+/);
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for']);
    return words.filter(word => !stopWords.has(word) && word.length > 2);
  }

  /**
   * Score each model against the input
   */
  private scoreModels(
    description: string,
    keywords: string[],
    features?: Partial<ClassificationFeatures>
  ): Map<CrisisType, number> {
    const scores = new Map<CrisisType, number>();

    for (const model of this.models) {
      let score = 0;

      // Keyword matching
      const keywordMatches = model.keywords.filter(kw =>
        keywords.some(k => k.includes(kw) || kw.includes(k))
      );
      score += (keywordMatches.length / model.keywords.length) * 0.4;

      // Pattern matching
      const patternMatches = model.patterns.filter(pattern =>
        pattern.test(description)
      );
      score += (patternMatches.length / model.patterns.length) * 0.4;

      // Context scoring
      if (features) {
        score += this.scoreContext(model.type, features) * 0.2;
      }

      // Apply model weight
      score *= model.weight;

      scores.set(model.type, score);
    }

    return scores;
  }

  /**
   * Score based on contextual features
   */
  private scoreContext(type: CrisisType, features: Partial<ClassificationFeatures>): number {
    let score = 0;

    // Time of day context
    if (features.timeOfDay !== undefined) {
      if (type === 'fire' && (features.timeOfDay >= 22 || features.timeOfDay <= 6)) {
        score += 0.2; // Fires more dangerous at night
      }
      if (type === 'security_threat' && (features.timeOfDay >= 20 || features.timeOfDay <= 5)) {
        score += 0.15; // Security threats more common at night
      }
    }

    // Weather context
    if (features.weatherConditions) {
      const { windSpeed, precipitation } = features.weatherConditions;
      if (type === 'natural_disaster' && (windSpeed > 50 || precipitation > 50)) {
        score += 0.3;
      }
      if (type === 'fire' && windSpeed > 30) {
        score += 0.2; // High winds increase fire severity
      }
    }

    // Source reliability
    if (features.reportSource) {
      const sourceWeights = {
        official: 0.3,
        sensor: 0.25,
        emergency_call: 0.2,
        citizen: 0.15,
        social_media: 0.1,
      };
      score += sourceWeights[features.reportSource] || 0;
    }

    return Math.min(score, 1.0);
  }

  /**
   * Get the best matching crisis type
   */
  private getBestMatch(scores: Map<CrisisType, number>): { type: CrisisType; confidence: number } {
    let bestType: CrisisType = 'unknown';
    let bestScore = 0;

    for (const [type, score] of scores.entries()) {
      if (score > bestScore) {
        bestScore = score;
        bestType = type;
      }
    }

    return {
      type: bestType,
      confidence: Math.min(bestScore, 1.0),
    };
  }

  /**
   * Classify the sub-type of a crisis
   */
  private classifySubType(type: CrisisType, description: string, keywords: string[]): string {
    const model = this.models.find(m => m.type === type);
    if (!model) return 'unclassified';

    let bestSubType = 'unclassified';
    let bestScore = 0;

    for (const [subType, subKeywords] of model.subTypeClassifiers.entries()) {
      const matches = subKeywords.filter(kw =>
        keywords.some(k => k.includes(kw) || kw.includes(k)) ||
        description.toLowerCase().includes(kw)
      );
      const score = matches.length / subKeywords.length;

      if (score > bestScore) {
        bestScore = score;
        bestSubType = subType;
      }
    }

    return bestSubType;
  }

  /**
   * Calculate severity level and score
   */
  private calculateSeverity(
    type: CrisisType,
    subType: string,
    features?: Partial<ClassificationFeatures>
  ): { level: SeverityLevel; score: number } {
    let score = 0;

    // Base severity by crisis type
    const baseSeverity: Record<CrisisType, number> = {
      natural_disaster: 70,
      medical_emergency: 65,
      fire: 60,
      security_threat: 75,
      infrastructure_failure: 50,
      environmental_hazard: 55,
      public_health: 60,
      civil_unrest: 45,
      technological_disaster: 40,
      unknown: 30,
    };

    score = baseSeverity[type];

    // Adjust for sub-type
    const criticalSubTypes = ['earthquake', 'tsunami', 'cardiac_arrest', 'active_shooter', 'bomb_threat'];
    if (criticalSubTypes.includes(subType)) {
      score += 15;
    }

    // Adjust for urgency indicators
    if (features?.urgencyIndicators) {
      score += features.urgencyIndicators * 20;
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Determine level
    let level: SeverityLevel;
    if (score >= 90) level = 'catastrophic';
    else if (score >= 75) level = 'critical';
    else if (score >= 60) level = 'high';
    else if (score >= 40) level = 'moderate';
    else level = 'low';

    return { level, score };
  }

  /**
   * Get model information
   */
  getModelInfo() {
    return {
      version: this.modelVersion,
      supportedTypes: this.models.map(m => m.type),
      totalModels: this.models.length,
    };
  }
}

// ============================================================================
// Export singleton instance
// ============================================================================

export const crisisClassifier = new CrisisClassifier();

// Made with Bob
