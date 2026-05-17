/**
 * AEGIS OS Mock Data Validation Script
 * Run this to verify all mock data is properly structured
 */

import {
  mockIncidents,
  mockAlerts,
  mockSOSEvents,
  mockVolunteers,
  mockClimateRisks,
  mockAIRecommendations,
  mockActivityFeeds,
  mockResponseTeams,
  mockDashboardStats,
  mockNotifications,
  mockAPI,
  dataRelationships,
} from './mockData';

// Validation utilities
const validate = {
  passed: 0,
  failed: 0,
  
  test(name: string, condition: boolean) {
    if (condition) {
      console.log(`✅ ${name}`);
      this.passed++;
    } else {
      console.error(`❌ ${name}`);
      this.failed++;
    }
  },
  
  summary() {
    console.log('\n' + '='.repeat(50));
    console.log(`Total Tests: ${this.passed + this.failed}`);
    console.log(`Passed: ${this.passed}`);
    console.log(`Failed: ${this.failed}`);
    console.log('='.repeat(50));
    return this.failed === 0;
  }
};

// Run validation tests
async function validateMockData() {
  console.log('🔍 AEGIS OS Mock Data Validation\n');
  
  // Structure Tests
  console.log('📋 Structure Tests:');
  validate.test('Incidents array exists', Array.isArray(mockIncidents));
  validate.test('Incidents has data', mockIncidents.length > 0);
  validate.test('Alerts array exists', Array.isArray(mockAlerts));
  validate.test('SOS Events array exists', Array.isArray(mockSOSEvents));
  validate.test('Volunteers array exists', Array.isArray(mockVolunteers));
  validate.test('Climate Risks array exists', Array.isArray(mockClimateRisks));
  validate.test('AI Recommendations array exists', Array.isArray(mockAIRecommendations));
  validate.test('Activity Feeds array exists', Array.isArray(mockActivityFeeds));
  validate.test('Response Teams array exists', Array.isArray(mockResponseTeams));
  validate.test('Dashboard Stats exists', mockDashboardStats !== undefined);
  validate.test('Notifications array exists', Array.isArray(mockNotifications));
  
  // Data Integrity Tests
  console.log('\n🔐 Data Integrity Tests:');
  validate.test('All incidents have IDs', mockIncidents.every(i => i.id));
  validate.test('All incidents have locations', mockIncidents.every(i => i.location?.coordinates));
  validate.test('All SOS events have coordinates', mockSOSEvents.every(s => s.location?.coordinates));
  validate.test('All volunteers have skills', mockVolunteers.every(v => Array.isArray(v.skills)));
  validate.test('All climate risks have probabilities', mockClimateRisks.every(r => r.probability >= 0 && r.probability <= 100));
  validate.test('All activities have timestamps', mockActivityFeeds.every(a => a.timestamp instanceof Date));
  
  // Relationship Tests
  console.log('\n🔗 Relationship Tests:');
  const incidentWithTeams = mockIncidents.find(i => i.assignedTeams.length > 0);
  validate.test('Incidents can have assigned teams', incidentWithTeams !== undefined);
  
  const deployedVolunteer = mockVolunteers.find(v => v.currentAssignment);
  validate.test('Volunteers can be assigned to incidents', deployedVolunteer !== undefined);
  
  const deployedTeam = mockResponseTeams.find(t => t.currentAssignment);
  validate.test('Teams can be assigned to incidents', deployedTeam !== undefined);
  
  // API Tests
  console.log('\n🌐 API Function Tests:');
  try {
    const incidents = await mockAPI.getIncidents();
    validate.test('getIncidents() returns data', incidents.length > 0);
    
    const activeIncidents = await mockAPI.getActiveIncidents();
    validate.test('getActiveIncidents() filters correctly', 
      activeIncidents.every(i => i.status === 'critical' || i.status === 'warning'));
    
    const incident = await mockAPI.getIncidentById('INC-001');
    validate.test('getIncidentById() returns correct incident', incident?.id === 'INC-001');
    
    const unreadAlerts = await mockAPI.getUnreadAlerts();
    validate.test('getUnreadAlerts() filters correctly', unreadAlerts.every(a => !a.read));
    
    const activeSOS = await mockAPI.getActiveSOSEvents();
    validate.test('getActiveSOSEvents() filters correctly',
      activeSOS.every(s => s.status === 'active' || s.status === 'responding'));
    
    const availableVols = await mockAPI.getAvailableVolunteers();
    validate.test('getAvailableVolunteers() filters correctly',
      availableVols.every(v => v.status === 'available'));
    
    const highRisks = await mockAPI.getHighSeverityRisks();
    validate.test('getHighSeverityRisks() filters correctly',
      highRisks.every(r => r.severity === 'high' || r.severity === 'extreme'));
    
    const stats = await mockAPI.getDashboardStats();
    validate.test('getDashboardStats() returns stats', stats.activeEmergencies !== undefined);
    
  } catch (error) {
    console.error('API test error:', error);
    validate.test('API functions work without errors', false);
  }
  
  // Relationship Helper Tests
  console.log('\n🤝 Relationship Helper Tests:');
  try {
    const incidentContext = await dataRelationships.getIncidentContext('INC-001');
    validate.test('getIncidentContext() returns comprehensive data',
      incidentContext !== null && 
      incidentContext.incident !== null &&
      Array.isArray(incidentContext.teams));
    
    const overview = await dataRelationships.getDashboardOverview();
    validate.test('getDashboardOverview() returns all data',
      overview.incidents !== undefined &&
      overview.alerts !== undefined &&
      overview.summary !== undefined);
    
  } catch (error) {
    console.error('Relationship helper error:', error);
    validate.test('Relationship helpers work without errors', false);
  }
  
  // Data Statistics
  console.log('\n📊 Data Statistics:');
  console.log(`   Incidents: ${mockIncidents.length}`);
  console.log(`   Alerts: ${mockAlerts.length}`);
  console.log(`   SOS Events: ${mockSOSEvents.length}`);
  console.log(`   Volunteers: ${mockVolunteers.length}`);
  console.log(`   Climate Risks: ${mockClimateRisks.length}`);
  console.log(`   AI Recommendations: ${mockAIRecommendations.length}`);
  console.log(`   Activity Feeds: ${mockActivityFeeds.length}`);
  console.log(`   Response Teams: ${mockResponseTeams.length}`);
  console.log(`   Notifications: ${mockNotifications.length}`);
  
  // Summary
  const success = validate.summary();
  
  if (success) {
    console.log('\n🎉 All validation tests passed!');
    console.log('✨ Mock data architecture is ready for use.');
  } else {
    console.log('\n⚠️  Some validation tests failed.');
    console.log('Please review the errors above.');
  }
  
  return success;
}

// Run validation if executed directly
if (require.main === module) {
  validateMockData().then(success => {
    process.exit(success ? 0 : 1);
  });
}

export { validateMockData };

// Made with Bob
