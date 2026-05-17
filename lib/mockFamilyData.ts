// Mock API utilities for Family Safety System
import {
  FamilyGroup,
  FamilyMember,
  SafetyStatus,
  EmergencyContact,
  SafetyAlert,
  AIRecommendation,
  SafetyStatistics,
  FamilySearchParams,
} from '@/types';

// Mock data generator
const generateMockFamilyMembers = (): FamilyMember[] => {
  return [
    {
      id: 'fm-001',
      name: 'John Smith',
      age: 45,
      relationship: 'Father',
      avatar: '👨',
      phone: '+234-801-234-5678',
      email: 'john.smith@email.com',
      safetyStatus: 'safe',
      lastKnownLocation: {
        address: '123 Victoria Island, Lagos',
        coordinates: { lat: 6.4281, lng: 3.4219 },
        timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
      },
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Penicillin'],
        medications: ['Blood pressure medication'],
        conditions: ['Hypertension'],
      },
      emergencyContacts: [
        {
          id: 'ec-001',
          name: 'Sarah Smith',
          relationship: 'Spouse',
          phone: '+234-801-234-5679',
          email: 'sarah.smith@email.com',
          isPrimary: true,
        },
      ],
    },
    {
      id: 'fm-002',
      name: 'Sarah Smith',
      age: 42,
      relationship: 'Mother',
      avatar: '👩',
      phone: '+234-801-234-5679',
      email: 'sarah.smith@email.com',
      safetyStatus: 'safe',
      lastKnownLocation: {
        address: '123 Victoria Island, Lagos',
        coordinates: { lat: 6.4281, lng: 3.4219 },
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
      },
      medicalInfo: {
        bloodType: 'A+',
        allergies: [],
        medications: [],
        conditions: [],
      },
      emergencyContacts: [
        {
          id: 'ec-002',
          name: 'John Smith',
          relationship: 'Spouse',
          phone: '+234-801-234-5678',
          isPrimary: true,
        },
      ],
    },
    {
      id: 'fm-003',
      name: 'Emma Smith',
      age: 16,
      relationship: 'Daughter',
      avatar: '👧',
      phone: '+234-801-234-5680',
      email: 'emma.smith@email.com',
      safetyStatus: 'safe',
      lastKnownLocation: {
        address: 'Lagos International School, Lekki',
        coordinates: { lat: 6.4474, lng: 3.5406 },
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
      },
      emergencyContacts: [
        {
          id: 'ec-003',
          name: 'John Smith',
          relationship: 'Father',
          phone: '+234-801-234-5678',
          isPrimary: true,
        },
        {
          id: 'ec-004',
          name: 'Sarah Smith',
          relationship: 'Mother',
          phone: '+234-801-234-5679',
          isPrimary: false,
        },
      ],
    },
    {
      id: 'fm-004',
      name: 'Michael Smith',
      age: 12,
      relationship: 'Son',
      avatar: '👦',
      phone: '+234-801-234-5681',
      safetyStatus: 'injured',
      lastKnownLocation: {
        address: 'Lagos University Teaching Hospital',
        coordinates: { lat: 6.4698, lng: 3.5852 },
        timestamp: new Date(Date.now() - 1000 * 60 * 45),
      },
      medicalInfo: {
        bloodType: 'O+',
        allergies: ['Peanuts'],
        medications: [],
        conditions: ['Asthma'],
      },
      emergencyContacts: [
        {
          id: 'ec-005',
          name: 'John Smith',
          relationship: 'Father',
          phone: '+234-801-234-5678',
          isPrimary: true,
        },
      ],
    },
  ];
};

const generateMockFamilyGroups = (): FamilyGroup[] => {
  return [
    {
      id: 'fg-001',
      name: 'Smith Family',
      address: '123 Victoria Island, Lagos',
      coordinates: { lat: 6.4281, lng: 3.4219 },
      members: generateMockFamilyMembers(),
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
    },
    {
      id: 'fg-002',
      name: 'Johnson Family',
      address: '456 Ikoyi Road, Lagos',
      coordinates: { lat: 6.4541, lng: 3.4316 },
      members: [
        {
          id: 'fm-005',
          name: 'David Johnson',
          age: 38,
          relationship: 'Father',
          avatar: '👨',
          phone: '+234-802-345-6789',
          safetyStatus: 'safe',
          lastKnownLocation: {
            address: '456 Ikoyi Road, Lagos',
            coordinates: { lat: 6.4541, lng: 3.4316 },
            timestamp: new Date(Date.now() - 1000 * 60 * 20),
          },
          emergencyContacts: [],
        },
        {
          id: 'fm-006',
          name: 'Grace Johnson',
          age: 35,
          relationship: 'Mother',
          avatar: '👩',
          phone: '+234-802-345-6790',
          safetyStatus: 'missing',
          lastKnownLocation: {
            address: 'Lekki Phase 1, Lagos',
            coordinates: { lat: 6.4474, lng: 3.5406 },
            timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
          },
          emergencyContacts: [],
        },
      ],
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date(),
    },
    {
      id: 'fg-003',
      name: 'Williams Family',
      address: '789 Surulere Street, Lagos',
      coordinates: { lat: 6.4969, lng: 3.3561 },
      members: [
        {
          id: 'fm-007',
          name: 'Peter Williams',
          age: 50,
          relationship: 'Father',
          avatar: '👨',
          phone: '+234-803-456-7890',
          safetyStatus: 'safe',
          lastKnownLocation: {
            address: '789 Surulere Street, Lagos',
            coordinates: { lat: 6.4969, lng: 3.3561 },
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
          },
          emergencyContacts: [],
        },
      ],
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date(),
    },
  ];
};

const generateMockAlerts = (): SafetyAlert[] => {
  return [
    {
      id: 'sa-001',
      familyMemberId: 'fm-004',
      type: 'status-change',
      message: 'Michael Smith status changed to injured - Minor accident at school',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      severity: 'warning',
      acknowledged: false,
    },
    {
      id: 'sa-002',
      familyMemberId: 'fm-006',
      type: 'emergency',
      message: 'Grace Johnson reported missing - Last seen 2 hours ago',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      severity: 'critical',
      acknowledged: false,
    },
    {
      id: 'sa-003',
      familyMemberId: 'fm-003',
      type: 'check-in',
      message: 'Emma Smith checked in safely at school',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      severity: 'info',
      acknowledged: true,
    },
  ];
};

const generateMockRecommendations = (): AIRecommendation[] => {
  return [
    {
      id: 'ai-001',
      type: 'emergency-prep',
      title: 'Update Emergency Contacts',
      description: 'Some family members have incomplete emergency contact information. Update now to ensure quick response in emergencies.',
      priority: 'high',
      actionable: true,
      actionUrl: '/family/contacts',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: 'ai-002',
      type: 'health-alert',
      title: 'Medical Information Review',
      description: 'Michael Smith has asthma. Ensure rescue inhaler is available and not expired.',
      priority: 'medium',
      actionable: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: 'ai-003',
      type: 'safety-tip',
      title: 'Weather Alert',
      description: 'Heavy rainfall expected in Lagos area. Ensure family members avoid flood-prone areas.',
      priority: 'medium',
      actionable: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: 'ai-004',
      type: 'evacuation-route',
      title: 'Evacuation Route Update',
      description: 'New evacuation routes available for Victoria Island area. Review and share with family.',
      priority: 'low',
      actionable: true,
      actionUrl: '/family/evacuation',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
    },
  ];
};

// Mock API functions
export const mockFamilyAPI = {
  // Get all family groups
  getAllFamilies: async (): Promise<FamilyGroup[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return generateMockFamilyGroups();
  },

  // Search families by address
  searchFamiliesByAddress: async (address: string): Promise<FamilyGroup[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const families = generateMockFamilyGroups();
    return families.filter((family) =>
      family.address.toLowerCase().includes(address.toLowerCase())
    );
  },

  // Search families by parameters
  searchFamilies: async (params: FamilySearchParams): Promise<FamilyGroup[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    let families = generateMockFamilyGroups();

    if (params.address) {
      families = families.filter((family) =>
        family.address.toLowerCase().includes(params.address!.toLowerCase())
      );
    }

    if (params.name) {
      families = families.filter((family) =>
        family.members.some((member) =>
          member.name.toLowerCase().includes(params.name!.toLowerCase())
        )
      );
    }

    if (params.status) {
      families = families.filter((family) =>
        family.members.some((member) => member.safetyStatus === params.status)
      );
    }

    return families;
  },

  // Get family by ID
  getFamilyById: async (id: string): Promise<FamilyGroup | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const families = generateMockFamilyGroups();
    return families.find((family) => family.id === id) || null;
  },

  // Get family member by ID
  getFamilyMemberById: async (id: string): Promise<FamilyMember | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const families = generateMockFamilyGroups();
    for (const family of families) {
      const member = family.members.find((m) => m.id === id);
      if (member) return member;
    }
    return null;
  },

  // Update family member status
  updateMemberStatus: async (
    memberId: string,
    status: SafetyStatus
  ): Promise<FamilyMember> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const member = await mockFamilyAPI.getFamilyMemberById(memberId);
    if (!member) throw new Error('Member not found');
    return { ...member, safetyStatus: status };
  },

  // Get safety alerts
  getSafetyAlerts: async (): Promise<SafetyAlert[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateMockAlerts();
  },

  // Get AI recommendations
  getAIRecommendations: async (): Promise<AIRecommendation[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return generateMockRecommendations();
  },

  // Get safety statistics
  getSafetyStatistics: async (): Promise<SafetyStatistics> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const families = generateMockFamilyGroups();
    const allMembers = families.flatMap((f) => f.members);

    const stats: SafetyStatistics = {
      totalMembers: allMembers.length,
      safeCount: allMembers.filter((m) => m.safetyStatus === 'safe').length,
      injuredCount: allMembers.filter((m) => m.safetyStatus === 'injured').length,
      missingCount: allMembers.filter((m) => m.safetyStatus === 'missing').length,
      unknownCount: allMembers.filter((m) => m.safetyStatus === 'unknown').length,
      lastUpdated: new Date(),
    };
    
    return stats;
  },

  // Simulate real-time updates
  subscribeToUpdates: (callback: (update: SafetyAlert) => void) => {
    const interval = setInterval(() => {
      const alerts = generateMockAlerts();
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      callback({
        ...randomAlert,
        id: `sa-${Date.now()}`,
        timestamp: new Date(),
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  },
};

// Export mock data for direct use
export const mockFamilyGroups = generateMockFamilyGroups();
export const mockAlerts = generateMockAlerts();
export const mockRecommendations = generateMockRecommendations();

// Made with Bob
