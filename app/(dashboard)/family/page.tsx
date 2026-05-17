import { FamilyDashboard } from '@/components/family';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Safety System | AEGIS OS',
  description: 'Real-time family safety monitoring and emergency management system',
};

export default function FamilyPage() {
  return <FamilyDashboard />;
}

// Made with Bob
