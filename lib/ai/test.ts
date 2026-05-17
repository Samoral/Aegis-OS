/**
 * AEGIS OS AI Intelligence Engine - Integration Test
 * Quick test to verify all components work together
 */

import { analyzeCrisis, classifyCrisis, generateMockCrisisData } from './index';

async function testAIEngine() {
  console.log('🧪 AEGIS OS AI Engine Integration Test\n');
  console.log('=' .repeat(60));

  try {
    // Test 1: Crisis Classification
    console.log('\n📊 Test 1: Crisis Classification');
    console.log('-'.repeat(60));
    
    const classification = await classifyCrisis(
      'Major earthquake detected, magnitude 7.2, multiple buildings collapsed',
      { latitude: 34.0522, longitude: -118.2437 }
    );
    
    console.log('✅ Classification successful');
    console.log(`   Type: ${classification.type}`);
    console.log(`   Sub-type: ${classification.subType}`);
    console.log(`   Severity: ${classification.severity}`);
    console.log(`   Confidence: ${(classification.confidence * 100).toFixed(1)}%`);
    console.log(`   Processing time: ${classification.metadata.processingTime}ms`);

    // Test 2: Complete Analysis
    console.log('\n📊 Test 2: Complete Crisis Analysis');
    console.log('-'.repeat(60));
    
    const analysis = await analyzeCrisis(
      'Active shooter situation at shopping mall, multiple casualties reported',
      { latitude: 40.7128, longitude: -74.0060 }
    );
    
    console.log('✅ Analysis successful');
    console.log(`   Crisis Type: ${analysis.classification.type}`);
    console.log(`   Current Severity: ${analysis.severityPrediction.currentSeverity}`);
    console.log(`   Predicted Severity: ${analysis.severityPrediction.predictedSeverity}`);
    console.log(`   Trend: ${analysis.severityPrediction.severityTrend}`);
    console.log(`   Recommendations: ${analysis.recommendations.length}`);
    console.log(`   Evacuation Plan: ${analysis.evacuationPlan ? 'Generated' : 'Not needed'}`);
    console.log(`   Overall Confidence: ${(analysis.confidence * 100).toFixed(1)}%`);
    console.log(`   Total Processing Time: ${analysis.processingTime}ms`);

    // Test 3: Multiple Crisis Types
    console.log('\n📊 Test 3: Multiple Crisis Types');
    console.log('-'.repeat(60));
    
    const testCases = [
      'Building fire on Main Street, flames visible',
      'Severe flooding in downtown area, water level rising',
      'Gas leak reported at industrial facility',
      'Cardiac arrest patient needs immediate attention',
    ];

    for (const testCase of testCases) {
      const result = await classifyCrisis(testCase);
      console.log(`✅ "${testCase.substring(0, 40)}..."`);
      console.log(`   → ${result.type} (${result.subType}) - ${result.severity}`);
    }

    // Test 4: Mock Data Generation
    console.log('\n📊 Test 4: Mock Data Generation');
    console.log('-'.repeat(60));
    
    const mockData = generateMockCrisisData(5);
    console.log(`✅ Generated ${mockData.length} mock crisis scenarios`);
    mockData.forEach((crisis, i) => {
      console.log(`   ${i + 1}. ${crisis.type} - ${crisis.severity}`);
    });

    // Test 5: Recommendations
    console.log('\n📊 Test 5: Emergency Recommendations');
    console.log('-'.repeat(60));
    
    if (analysis.recommendations.length > 0) {
      console.log(`✅ Generated ${analysis.recommendations.length} recommendations:`);
      analysis.recommendations.slice(0, 3).forEach((rec, i) => {
        console.log(`   ${i + 1}. [${rec.priority.toUpperCase()}] ${rec.title}`);
        console.log(`      Category: ${rec.category}`);
        console.log(`      Actions: ${rec.actions.length} steps`);
        console.log(`      Effectiveness: ${(rec.effectiveness * 100).toFixed(0)}%`);
      });
    }

    // Test 6: Evacuation Planning
    console.log('\n📊 Test 6: Evacuation Planning');
    console.log('-'.repeat(60));
    
    if (analysis.evacuationPlan) {
      const plan = analysis.evacuationPlan;
      console.log('✅ Evacuation plan generated');
      console.log(`   Urgency: ${plan.urgency}`);
      console.log(`   Evacuation Zones: ${plan.zones.length}`);
      console.log(`   Safety Zones: ${plan.safetyZones.length}`);
      console.log(`   Affected Population: ${plan.estimatedAffectedPopulation.toLocaleString()}`);
      console.log(`   Estimated Duration: ${plan.estimatedEvacuationDuration} minutes`);
      
      if (plan.zones.length > 0) {
        console.log('\n   Zone Details:');
        plan.zones.forEach((zone, i) => {
          console.log(`   ${i + 1}. ${zone.name} (Priority ${zone.priority})`);
          console.log(`      Population: ${zone.population.toLocaleString()}`);
          console.log(`      Routes: ${zone.routes.length}`);
          console.log(`      Est. Time: ${zone.estimatedEvacuationTime} min`);
        });
      }
    } else {
      console.log('ℹ️  No evacuation plan needed for this severity level');
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ All tests completed successfully!');
    console.log('='.repeat(60));
    console.log('\n🎉 AEGIS OS AI Engine is fully operational!\n');

  } catch (error: any) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run tests if executed directly
if (require.main === module) {
  testAIEngine().catch(console.error);
}

export { testAIEngine };

// Made with Bob
