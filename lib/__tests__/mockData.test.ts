/**
 * AEGIS OS Mock Data Integration Tests
 * Verifies data structure and relationships
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
} from '../mockData';

describe('Mock Data Structure Tests', () => {
  test('Incidents data is valid', () => {
    expect(mockIncidents).toBeDefined();
    expect(Array.isArray(mockIncidents)).toBe(true);
    expect(mockIncidents.length).toBeGreaterThan(0);
    
    const incident = mockIncidents[0];
    expect(incident).toHaveProperty('id');
    expect(incident).toHaveProperty('type');
    expect(incident).toHaveProperty('title');
    expect(incident).toHaveProperty('location');
    expect(incident.location).toHaveProperty('coordinates');
  });

  test('Alerts data is valid', () => {
    expect(mockAlerts).toBeDefined();
    expect(Array.isArray(mockAlerts)).toBe(true);
    expect(mockAlerts.length).toBeGreaterThan(0);
    
    const alert = mockAlerts[0];
    expect(alert).toHaveProperty('id');
    expect(alert).toHaveProperty('type');
    expect(alert).toHaveProperty('message');
    expect(alert).toHaveProperty('timestamp');
  });

  test('SOS Events data is valid', () => {
    expect(mockSOSEvents).toBeDefined();
    expect(Array.isArray(mockSOSEvents)).toBe(true);
    expect(mockSOSEvents.length).toBeGreaterThan(0);
    
    const sos = mockSOSEvents[0];
    expect(sos).toHaveProperty('id');
    expect(sos).toHaveProperty('userId');
    expect(sos).toHaveProperty('type');
    expect(sos).toHaveProperty('status');
    expect(sos).toHaveProperty('location');
  });

  test('Volunteers data is valid', () => {
    expect(mockVolunteers).toBeDefined();
    expect(Array.isArray(mockVolunteers)).toBe(true);
    expect(mockVolunteers.length).toBeGreaterThan(0);
    
    const volunteer = mockVolunteers[0];
    expect(volunteer).toHaveProperty('id');
    expect(volunteer).toHaveProperty('name');
    expect(volunteer).toHaveProperty('skills');
    expect(volunteer).toHaveProperty('status');
    expect(Array.isArray(volunteer.skills)).toBe(true);
  });

  test('Climate Risks data is valid', () => {
    expect(mockClimateRisks).toBeDefined();
    expect(Array.isArray(mockClimateRisks)).toBe(true);
    expect(mockClimateRisks.length).toBeGreaterThan(0);
    
    const risk = mockClimateRisks[0];
    expect(risk).toHaveProperty('id');
    expect(risk).toHaveProperty('type');
    expect(risk).toHaveProperty('severity');
    expect(risk).toHaveProperty('probability');
    expect(risk.probability).toBeGreaterThanOrEqual(0);
    expect(risk.probability).toBeLessThanOrEqual(100);
  });

  test('AI Recommendations data is valid', () => {
    expect(mockAIRecommendations).toBeDefined();
    expect(Array.isArray(mockAIRecommendations)).toBe(true);
    expect(mockAIRecommendations.length).toBeGreaterThan(0);
    
    const recommendation = mockAIRecommendations[0];
    expect(recommendation).toHaveProperty('id');
    expect(recommendation).toHaveProperty('type');
    expect(recommendation).toHaveProperty('priority');
    expect(recommendation).toHaveProperty('actionable');
  });

  test('Activity Feeds data is valid', () => {
    expect(mockActivityFeeds).toBeDefined();
    expect(Array.isArray(mockActivityFeeds)).toBe(true);
    expect(mockActivityFeeds.length).toBeGreaterThan(0);
    
    const activity = mockActivityFeeds[0];
    expect(activity).toHaveProperty('id');
    expect(activity).toHaveProperty('type');
    expect(activity).toHaveProperty('action');
    expect(activity).toHaveProperty('timestamp');
  });

  test('Response Teams data is valid', () => {
    expect(mockResponseTeams).toBeDefined();
    expect(Array.isArray(mockResponseTeams)).toBe(true);
    expect(mockResponseTeams.length).toBeGreaterThan(0);
    
    const team = mockResponseTeams[0];
    expect(team).toHaveProperty('id');
    expect(team).toHaveProperty('name');
    expect(team).toHaveProperty('type');
    expect(team).toHaveProperty('status');
    expect(team).toHaveProperty('equipment');
  });

  test('Dashboard Stats data is valid', () => {
    expect(mockDashboardStats).toBeDefined();
    expect(mockDashboardStats).toHaveProperty('activeEmergencies');
    expect(mockDashboardStats).toHaveProperty('responseTeams');
    expect(mockDashboardStats).toHaveProperty('avgResponseTime');
    expect(mockDashboardStats).toHaveProperty('trends');
  });

  test('Notifications data is valid', () => {
    expect(mockNotifications).toBeDefined();
    expect(Array.isArray(mockNotifications)).toBe(true);
    expect(mockNotifications.length).toBeGreaterThan(0);
    
    const notification = mockNotifications[0];
    expect(notification).toHaveProperty('id');
    expect(notification).toHaveProperty('type');
    expect(notification).toHaveProperty('priority');
    expect(notification).toHaveProperty('read');
  });
});

describe('Mock API Functions Tests', () => {
  test('getIncidents returns data', async () => {
    const incidents = await mockAPI.getIncidents();
    expect(Array.isArray(incidents)).toBe(true);
    expect(incidents.length).toBeGreaterThan(0);
  });

  test('getActiveIncidents filters correctly', async () => {
    const activeIncidents = await mockAPI.getActiveIncidents();
    expect(Array.isArray(activeIncidents)).toBe(true);
    activeIncidents.forEach(incident => {
      expect(['critical', 'warning']).toContain(incident.status);
    });
  });

  test('getIncidentById returns correct incident', async () => {
    const incident = await mockAPI.getIncidentById('INC-001');
    expect(incident).toBeDefined();
    expect(incident?.id).toBe('INC-001');
  });

  test('getUnreadAlerts filters correctly', async () => {
    const unreadAlerts = await mockAPI.getUnreadAlerts();
    expect(Array.isArray(unreadAlerts)).toBe(true);
    unreadAlerts.forEach(alert => {
      expect(alert.read).toBe(false);
    });
  });

  test('getActiveSOSEvents filters correctly', async () => {
    const activeSOS = await mockAPI.getActiveSOSEvents();
    expect(Array.isArray(activeSOS)).toBe(true);
    activeSOS.forEach(sos => {
      expect(['active', 'responding']).toContain(sos.status);
    });
  });

  test('getAvailableVolunteers filters correctly', async () => {
    const available = await mockAPI.getAvailableVolunteers();
    expect(Array.isArray(available)).toBe(true);
    available.forEach(volunteer => {
      expect(volunteer.status).toBe('available');
    });
  });

  test('getHighSeverityRisks filters correctly', async () => {
    const highRisks = await mockAPI.getHighSeverityRisks();
    expect(Array.isArray(highRisks)).toBe(true);
    highRisks.forEach(risk => {
      expect(['high', 'extreme']).toContain(risk.severity);
    });
  });

  test('getRecentActivity returns limited results', async () => {
    const recent = await mockAPI.getRecentActivity();
    expect(Array.isArray(recent)).toBe(true);
    expect(recent.length).toBeLessThanOrEqual(10);
  });
});

describe('Data Relationships Tests', () => {
  test('Incidents have assigned teams', () => {
    const incidentWithTeams = mockIncidents.find(inc => inc.assignedTeams.length > 0);
    expect(incidentWithTeams).toBeDefined();
    expect(Array.isArray(incidentWithTeams?.assignedTeams)).toBe(true);
  });

  test('Volunteers can be assigned to incidents', () => {
    const deployedVolunteer = mockVolunteers.find(vol => vol.currentAssignment);
    expect(deployedVolunteer).toBeDefined();
    expect(deployedVolunteer?.currentAssignment).toBeTruthy();
  });

  test('Response teams can be assigned to incidents', () => {
    const deployedTeam = mockResponseTeams.find(team => team.currentAssignment);
    expect(deployedTeam).toBeDefined();
    expect(deployedTeam?.currentAssignment).toBeTruthy();
  });

  test('getIncidentWithTeams returns related data', async () => {
    const result = await mockAPI.getIncidentWithTeams('INC-001');
    expect(result).toHaveProperty('incident');
    expect(result).toHaveProperty('teams');
    expect(Array.isArray(result.teams)).toBe(true);
  });

  test('getVolunteersByIncident returns correct volunteers', async () => {
    const volunteers = await mockAPI.getVolunteersByIncident('INC-001');
    expect(Array.isArray(volunteers)).toBe(true);
    volunteers.forEach(volunteer => {
      expect(volunteer.currentAssignment).toBe('INC-001');
    });
  });

  test('getIncidentContext returns comprehensive data', async () => {
    const context = await dataRelationships.getIncidentContext('INC-001');
    expect(context).toBeDefined();
    expect(context).toHaveProperty('incident');
    expect(context).toHaveProperty('teams');
    expect(context).toHaveProperty('volunteers');
    expect(context).toHaveProperty('sosEvents');
    expect(context).toHaveProperty('activities');
    expect(context).toHaveProperty('recommendations');
  });

  test('getDashboardOverview returns all data', async () => {
    const overview = await dataRelationships.getDashboardOverview();
    expect(overview).toBeDefined();
    expect(overview).toHaveProperty('incidents');
    expect(overview).toHaveProperty('alerts');
    expect(overview).toHaveProperty('sosEvents');
    expect(overview).toHaveProperty('volunteers');
    expect(overview).toHaveProperty('climateRisks');
    expect(overview).toHaveProperty('recommendations');
    expect(overview).toHaveProperty('activities');
    expect(overview).toHaveProperty('teams');
    expect(overview).toHaveProperty('stats');
    expect(overview).toHaveProperty('notifications');
    expect(overview).toHaveProperty('summary');
  });
});

describe('Data Consistency Tests', () => {
  test('All incidents have valid coordinates', () => {
    mockIncidents.forEach(incident => {
      expect(incident.location.coordinates.lat).toBeGreaterThan(0);
      expect(incident.location.coordinates.lng).toBeGreaterThan(0);
    });
  });

  test('All SOS events have valid coordinates', () => {
    mockSOSEvents.forEach(sos => {
      expect(sos.location.coordinates.lat).toBeGreaterThan(0);
      expect(sos.location.coordinates.lng).toBeGreaterThan(0);
    });
  });

  test('All volunteers have valid ratings', () => {
    mockVolunteers.forEach(volunteer => {
      expect(volunteer.rating).toBeGreaterThanOrEqual(0);
      expect(volunteer.rating).toBeLessThanOrEqual(5);
    });
  });

  test('All climate risks have valid probabilities', () => {
    mockClimateRisks.forEach(risk => {
      expect(risk.probability).toBeGreaterThanOrEqual(0);
      expect(risk.probability).toBeLessThanOrEqual(100);
    });
  });

  test('All timestamps are valid dates', () => {
    mockIncidents.forEach(incident => {
      expect(incident.reportedAt instanceof Date).toBe(true);
      expect(incident.updatedAt instanceof Date).toBe(true);
    });
  });

  test('Team assignments match incident assignments', () => {
    const incident = mockIncidents.find(inc => inc.assignedTeams.length > 0);
    if (incident) {
      const teamIds = incident.assignedTeams;
      teamIds.forEach(teamId => {
        const team = mockResponseTeams.find(t => t.id === teamId);
        expect(team).toBeDefined();
      });
    }
  });
});

describe('Real-time Simulation Tests', () => {
  test('subscribeToUpdates returns unsubscribe function', () => {
    const unsubscribe = mockAPI.subscribeToUpdates(() => {});
    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
  });

  test('subscribeToUpdates calls callback', (done) => {
    const unsubscribe = mockAPI.subscribeToUpdates((update) => {
      expect(update).toHaveProperty('id');
      expect(update).toHaveProperty('type');
      expect(update).toHaveProperty('timestamp');
      unsubscribe();
      done();
    });
  }, 35000); // Allow time for callback
});

console.log('✅ All mock data integration tests configured');

// Made with Bob
