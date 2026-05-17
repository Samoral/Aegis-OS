# AEGIS OS Family Safety System

## Overview

The Family Safety System is a comprehensive real-time monitoring and emergency management solution designed to track family members' safety status, provide emergency contact management, and deliver AI-powered safety recommendations.

## Features

### ✅ Implemented Features

1. **Family Search by Address**
   - Search families by address, name, or safety status
   - Quick filter buttons for critical statuses (Missing, Injured, Safe)
   - Real-time search with loading states

2. **Safety Status Indicators**
   - Visual status cards showing Safe, Injured, Missing, and Unknown counts
   - Percentage distribution display
   - Interactive progress bar visualization
   - Real-time status updates every 30 seconds
   - Critical alerts for missing or injured members

3. **Safe/Injured/Missing Visuals**
   - Color-coded status badges (Green=Safe, Yellow=Injured, Red=Missing, Gray=Unknown)
   - Status icons (✓, ⚠, !, ?)
   - Pulsing indicators for critical statuses
   - Visual alerts with severity levels

4. **Real-time Updates Simulation**
   - Auto-refresh every 30 seconds
   - Live status indicator
   - Last updated timestamp
   - Simulated real-time data changes

5. **Emergency Contact Cards**
   - Primary contact highlighting
   - Quick call and email actions
   - Compact and full card views
   - Contact relationship display
   - Sorted by primary status

6. **Interactive Family Dashboard**
   - Family selection tabs
   - Member cards with detailed information
   - Location tracking with timestamps
   - Medical information badges
   - Status update actions
   - Responsive grid layout

7. **AI Recommendations**
   - Personalized safety insights
   - Priority-based sorting (High, Medium, Low)
   - Actionable recommendations
   - Category-based icons (Safety Tips, Evacuation Routes, Emergency Prep, Health Alerts)
   - Expandable list with show more/less functionality

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom reusable components
- **State Management**: React Hooks (useState, useEffect)
- **Data**: Mock API with simulated real-time updates

## File Structure

```
├── types/
│   └── index.ts                          # TypeScript type definitions
├── lib/
│   └── mockFamilyData.ts                 # Mock API and data generators
├── components/
│   ├── family/
│   │   ├── FamilyDashboard.tsx          # Main dashboard component
│   │   ├── FamilyMemberCard.tsx         # Individual member card
│   │   ├── FamilySearchBar.tsx          # Search and filter component
│   │   ├── SafetyStatusIndicator.tsx    # Status overview component
│   │   ├── EmergencyContactCard.tsx     # Contact management component
│   │   ├── AIRecommendations.tsx        # AI insights component
│   │   └── index.ts                     # Component exports
│   └── ui/
│       ├── Card.tsx                      # Base card component
│       ├── Badge.tsx                     # Badge component
│       └── StatusIndicator.tsx           # Status indicator component
└── app/
    └── family/
        └── page.tsx                      # Family safety page route
```

## Type Definitions

### Core Types

```typescript
// Safety status for family members
type SafetyStatus = 'safe' | 'injured' | 'missing' | 'unknown';

// Family member with complete information
interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relationship: string;
  avatar?: string;
  phone: string;
  email?: string;
  safetyStatus: SafetyStatus;
  lastKnownLocation: {
    address: string;
    coordinates: { lat: number; lng: number };
    timestamp: Date;
  };
  medicalInfo?: {
    bloodType?: string;
    allergies?: string[];
    medications?: string[];
    conditions?: string[];
  };
  emergencyContacts: EmergencyContact[];
}

// Family group with members
interface FamilyGroup {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  members: FamilyMember[];
  createdAt: Date;
  updatedAt: Date;
}

// AI recommendation
interface AIRecommendation {
  id: string;
  type: 'safety-tip' | 'evacuation-route' | 'emergency-prep' | 'health-alert';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  actionUrl?: string;
  timestamp: Date;
}
```

## Components

### FamilyDashboard

Main orchestration component that manages the entire family safety system.

**Features:**
- Data loading and state management
- Real-time updates simulation
- Family selection
- Search integration
- Alert display

**Usage:**
```tsx
import { FamilyDashboard } from '@/components/family';

export default function FamilyPage() {
  return <FamilyDashboard />;
}
```

### FamilySearchBar

Search and filter component for finding families.

**Props:**
- `onSearch`: Callback function with search parameters
- `isLoading`: Loading state indicator

**Features:**
- Address search
- Name search
- Status filter dropdown
- Quick filter buttons
- Clear functionality

### SafetyStatusIndicator

Visual overview of safety statistics.

**Props:**
- `statistics`: SafetyStatistics object
- `showPercentages`: Toggle percentage display

**Features:**
- Status count cards
- Progress bar visualization
- Alert messages
- Last updated timestamp

### FamilyMemberCard

Individual family member display card.

**Props:**
- `member`: FamilyMember object
- `onStatusClick`: Status update callback
- `onViewDetails`: Details view callback

**Features:**
- Avatar with status indicator
- Contact information
- Location tracking
- Medical info badges
- Action buttons

### EmergencyContactCard

Emergency contact display and management.

**Props:**
- `contact`: EmergencyContact object
- `onCall`: Call action callback
- `onEmail`: Email action callback
- `compact`: Compact view toggle

**Features:**
- Primary contact highlighting
- Quick action buttons
- Compact and full views
- Contact sorting

### AIRecommendations

AI-powered safety recommendations display.

**Props:**
- `recommendations`: Array of AIRecommendation
- `onActionClick`: Action callback
- `maxDisplay`: Maximum items to show initially

**Features:**
- Priority-based sorting
- Category icons
- Actionable items
- Expandable list
- Timestamp display

## Mock API

The system uses a comprehensive mock API that simulates real-world data:

### Available Methods

```typescript
// Get all families
mockFamilyAPI.getAllFamilies(): Promise<FamilyGroup[]>

// Search families by address
mockFamilyAPI.searchFamiliesByAddress(address: string): Promise<FamilyGroup[]>

// Search with parameters
mockFamilyAPI.searchFamilies(params: FamilySearchParams): Promise<FamilyGroup[]>

// Get family by ID
mockFamilyAPI.getFamilyById(id: string): Promise<FamilyGroup | null>

// Get member by ID
mockFamilyAPI.getFamilyMemberById(id: string): Promise<FamilyMember | null>

// Update member status
mockFamilyAPI.updateMemberStatus(memberId: string, status: SafetyStatus): Promise<FamilyMember>

// Get safety alerts
mockFamilyAPI.getSafetyAlerts(): Promise<SafetyAlert[]>

// Get AI recommendations
mockFamilyAPI.getAIRecommendations(): Promise<AIRecommendation[]>

// Get statistics
mockFamilyAPI.getSafetyStatistics(): Promise<SafetyStatistics>

// Subscribe to real-time updates
mockFamilyAPI.subscribeToUpdates(callback: (update: SafetyAlert) => void): () => void
```

## Usage Examples

### Basic Implementation

```tsx
import { FamilyDashboard } from '@/components/family';

export default function FamilyPage() {
  return <FamilyDashboard />;
}
```

### Custom Search Implementation

```tsx
import { FamilySearchBar } from '@/components/family';
import { mockFamilyAPI } from '@/lib/mockFamilyData';

function CustomSearch() {
  const handleSearch = async (params) => {
    const results = await mockFamilyAPI.searchFamilies(params);
    console.log('Search results:', results);
  };

  return <FamilySearchBar onSearch={handleSearch} />;
}
```

### Individual Component Usage

```tsx
import { FamilyMemberCard, SafetyStatusIndicator } from '@/components/family';

function CustomView({ member, statistics }) {
  return (
    <div>
      <SafetyStatusIndicator statistics={statistics} />
      <FamilyMemberCard 
        member={member}
        onStatusClick={(m) => console.log('Update status:', m)}
        onViewDetails={(m) => console.log('View details:', m)}
      />
    </div>
  );
}
```

## Responsive Design

The system is fully responsive with breakpoints:

- **Mobile**: Single column layout, compact cards
- **Tablet**: 2-column grid for members, stacked sidebar
- **Desktop**: 3-column layout with sidebar, full cards

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly

## Performance Optimizations

- Component memoization where beneficial
- Efficient re-rendering with React hooks
- Lazy loading for large lists
- Debounced search inputs
- Optimized mock API delays

## Future Enhancements

1. **Real Backend Integration**
   - Replace mock API with actual backend
   - WebSocket for real-time updates
   - Database persistence

2. **Advanced Features**
   - Map integration for location tracking
   - Push notifications
   - SMS/Email alerts
   - Photo uploads
   - Document storage

3. **Enhanced AI**
   - Machine learning predictions
   - Pattern recognition
   - Risk assessment
   - Automated alerts

4. **Mobile App**
   - Native mobile applications
   - Offline support
   - GPS tracking
   - Emergency SOS button

## Testing

To test the system:

1. Navigate to `/family` route
2. Use search bar to filter families
3. Click on family tabs to switch between families
4. Interact with member cards
5. Test emergency contact actions
6. Review AI recommendations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Part of AEGIS OS - Emergency Management System

---

**Built with ❤️ by Bob**