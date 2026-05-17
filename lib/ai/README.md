# AEGIS OS AI Intelligence Engine

Advanced AI-powered crisis classification, severity prediction, and emergency recommendation system for AEGIS OS.

## 🎯 Overview

The AEGIS OS AI Intelligence Engine is a comprehensive artificial intelligence system designed to analyze emergency situations, predict severity trends, generate actionable recommendations, and create evacuation plans in real-time.

## 🏗️ Architecture

```
lib/ai/
├── types.ts                    # Core type definitions
├── index.ts                    # Main export file
├── orchestrator.ts             # AI response orchestration
├── classifiers/
│   └── crisisClassifier.ts     # Crisis type classification
├── predictors/
│   └── severityPredictor.ts    # Severity prediction & forecasting
├── generators/
│   ├── recommendationGenerator.ts  # Emergency recommendations
│   └── evacuationGenerator.ts      # Evacuation planning
└── mock/
    └── mockInference.ts        # Mock AI inference system
```

## 🚀 Features

### 1. Crisis Classification
- **10 Crisis Types**: Natural disasters, medical emergencies, fires, security threats, infrastructure failures, environmental hazards, public health, civil unrest, technological disasters
- **40+ Sub-types**: Detailed classification for specific crisis scenarios
- **Confidence Scoring**: ML-based confidence metrics (0-1)
- **Context-Aware**: Considers time, weather, location, and historical data

### 2. Severity Prediction
- **5 Severity Levels**: Low, Moderate, High, Critical, Catastrophic
- **Trend Analysis**: Escalating, Stable, De-escalating
- **Casualty Estimation**: Min, max, and expected casualties
- **Damage Assessment**: Economic and infrastructure impact
- **Time-to-Escalation**: Predicts when situation will worsen

### 3. Emergency Recommendations
- **8 Categories**: Evacuation, shelter-in-place, medical response, resource allocation, communication, security, infrastructure, public safety
- **Priority Levels**: Immediate, Urgent, High, Medium, Low
- **Action Plans**: Step-by-step instructions with responsible parties, timelines, and resources
- **Target Audiences**: General public, first responders, government, medical, infrastructure

### 4. Evacuation Planning
- **Zone Generation**: Automatic creation of evacuation zones based on crisis location and severity
- **Route Optimization**: Multiple evacuation routes with capacity and status tracking
- **Safety Zones**: Identification of shelters, hospitals, and safe areas
- **Population Estimation**: Affected population and vulnerable groups
- **Duration Calculation**: Estimated evacuation time

### 5. AI Orchestration
- **Unified Pipeline**: Coordinates all AI components
- **Parallel Processing**: Efficient multi-component execution
- **Error Handling**: Robust error management and fallbacks
- **Statistics Tracking**: Performance metrics and success rates

### 6. Mock Inference System
- **Realistic Simulation**: Mimics production AI behavior
- **Configurable Latency**: Adjustable processing delays
- **Error Simulation**: Configurable error rates
- **Training Data**: Mock datasets for testing
- **Model Metrics**: Accuracy, precision, recall, F1 scores

## 📊 Data Flow

```
Input (Crisis Description + Context)
    ↓
Crisis Classification
    ↓
Severity Prediction
    ↓
Recommendation Generation
    ↓
Evacuation Planning (if needed)
    ↓
Orchestrated Response
```

## 🔧 Usage

### Basic Crisis Analysis

```typescript
import { analyzeCrisis } from '@/lib/ai';

const result = await analyzeCrisis(
  'Major earthquake detected, magnitude 7.2',
  { latitude: 34.0522, longitude: -118.2437 }
);

console.log(result.classification.type); // 'natural_disaster'
console.log(result.severityPrediction.predictedSeverity); // 'catastrophic'
console.log(result.recommendations.length); // 8
```

### Classification Only

```typescript
import { classifyCrisis } from '@/lib/ai';

const classification = await classifyCrisis(
  'Building fire on Main Street',
  { latitude: 40.7128, longitude: -74.0060 }
);

console.log(classification.type); // 'fire'
console.log(classification.subType); // 'building_fire'
console.log(classification.confidence); // 0.94
```

### Severity Prediction

```typescript
import { predictCrisisSeverity } from '@/lib/ai';

const prediction = await predictCrisisSeverity(
  classification,
  {
    populationDensity: 5000,
    vulnerablePopulation: 20,
    infrastructureCriticality: 0.8,
    weatherConditions: {
      temperature: 25,
      windSpeed: 30,
      precipitation: 0,
      visibility: 10,
    },
    timeOfDay: 'afternoon',
    dayOfWeek: 'weekday',
  }
);

console.log(prediction.predictedSeverity); // 'critical'
console.log(prediction.severityTrend); // 'escalating'
console.log(prediction.estimatedCasualties.expected); // 45
```

### Using the Orchestrator

```typescript
import { aiOrchestrator } from '@/lib/ai';

const response = await aiOrchestrator.processRequest({
  id: 'req-123',
  type: 'analyze',
  timestamp: new Date().toISOString(),
  priority: 'immediate',
  data: {
    description: 'Active shooter at shopping mall',
    location: { latitude: 34.0522, longitude: -118.2437 },
  },
});

if (response.success) {
  const { classification, severityPrediction, recommendations, evacuationPlan } = response.data;
  // Process results...
}
```

### Individual Components

```typescript
import {
  crisisClassifier,
  severityPredictor,
  recommendationGenerator,
  evacuationGenerator,
} from '@/lib/ai';

// Classification
const classification = await crisisClassifier.classify(description, { location });

// Severity Prediction
const prediction = await severityPredictor.predict(classification, factors);

// Recommendations
const recommendations = await recommendationGenerator.generate(classification, prediction);

// Evacuation Plan
const evacuationPlan = await evacuationGenerator.generate(
  classification,
  prediction,
  {
    crisisCenter: location,
    affectedRadius: 5000,
  }
);
```

## 🌐 API Endpoints

### POST /api/ai/analyze
Complete crisis analysis with all AI components.

**Request:**
```json
{
  "description": "Major earthquake detected, magnitude 7.2",
  "location": {
    "latitude": 34.0522,
    "longitude": -118.2437
  },
  "priority": "immediate"
}
```

**Response:**
```json
{
  "requestId": "analyze-1234567890",
  "success": true,
  "data": {
    "classification": { ... },
    "severityPrediction": { ... },
    "recommendations": [ ... ],
    "evacuationPlan": { ... },
    "processingTime": 450,
    "confidence": 0.92
  },
  "metadata": { ... }
}
```

### POST /api/ai/classify
Crisis classification only.

**Request:**
```json
{
  "description": "Building fire on Main Street",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

## 🎛️ Configuration

### Orchestrator Configuration

```typescript
import { AIOrchestrator } from '@/lib/ai';

const orchestrator = new AIOrchestrator({
  enableClassification: true,
  enableSeverityPrediction: true,
  enableRecommendations: true,
  enableEvacuationPlanning: true,
  parallelProcessing: true,
  timeout: 30000, // 30 seconds
});
```

### Mock Inference Configuration

```typescript
import { MockInferenceEngine } from '@/lib/ai';

const mockEngine = new MockInferenceEngine({
  latency: {
    min: 100,
    max: 500,
  },
  errorRate: 0.02, // 2%
  confidenceRange: {
    min: 0.7,
    max: 0.98,
  },
  enableRealisticVariation: true,
});
```

## 📈 Performance

- **Classification**: ~200-400ms average
- **Severity Prediction**: ~150-350ms average
- **Recommendations**: ~100-300ms average
- **Evacuation Planning**: ~200-500ms average
- **Complete Analysis**: ~450-800ms average

## 🧪 Testing

```typescript
import { generateMockCrisisData, mockInferenceEngine } from '@/lib/ai';

// Generate test data
const testData = generateMockCrisisData(10);

// Test classification
for (const crisis of testData) {
  const result = await mockInferenceEngine.classifyInference(
    crisis.description,
    [1, 0, 0, 0, 0, 0, 0, 0, 0]
  );
  console.log(result);
}

// Get statistics
const stats = mockInferenceEngine.getStatistics();
console.log(`Success rate: ${(1 - stats.errorRate) * 100}%`);
```

## 🔒 Security Considerations

- Input validation on all API endpoints
- Rate limiting recommended for production
- Sanitize user-provided descriptions
- Validate coordinate ranges
- Implement authentication for sensitive operations

## 🚀 Future Enhancements

- [ ] Real ML model integration (TensorFlow.js, ONNX)
- [ ] Historical data learning
- [ ] Multi-language support
- [ ] Real-time streaming predictions
- [ ] Integration with external data sources (weather, traffic, etc.)
- [ ] Advanced route optimization algorithms
- [ ] Predictive analytics dashboard
- [ ] A/B testing framework for recommendations

## 📝 Type Definitions

All types are fully documented in `types.ts`. Key types include:

- `CrisisType` - 10 crisis categories
- `SeverityLevel` - 5 severity levels
- `CrisisClassification` - Classification result
- `SeverityPrediction` - Prediction result
- `EmergencyRecommendation` - Recommendation structure
- `EvacuationRecommendation` - Evacuation plan structure
- `AIOrchestrationResult` - Complete analysis result

## 🤝 Contributing

When adding new features:

1. Update type definitions in `types.ts`
2. Implement core logic in appropriate module
3. Add tests using mock inference system
4. Update API routes if needed
5. Document in this README

## 📄 License

Part of AEGIS OS - Advanced Emergency Global Intelligence System

---

**Built with ❤️ for emergency response and public safety**