'use client';

import React from 'react';
import { FamilyMember, SafetyStatus } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import StatusIndicator from '@/components/ui/StatusIndicator';

interface FamilyMemberCardProps {
  member: FamilyMember;
  onStatusClick?: (member: FamilyMember) => void;
  onViewDetails?: (member: FamilyMember) => void;
}

const getStatusColor = (status: SafetyStatus): 'success' | 'warning' | 'danger' | 'default' => {
  switch (status) {
    case 'safe':
      return 'success';
    case 'injured':
      return 'warning';
    case 'missing':
      return 'danger';
    default:
      return 'default';
  }
};

const getStatusIcon = (status: SafetyStatus): string => {
  switch (status) {
    case 'safe':
      return '✓';
    case 'injured':
      return '⚠';
    case 'missing':
      return '!';
    default:
      return '?';
  }
};

const formatTimestamp = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export const FamilyMemberCard: React.FC<FamilyMemberCardProps> = ({
  member,
  onStatusClick,
  onViewDetails,
}) => {
  const statusColor = getStatusColor(member.safetyStatus);
  const statusIcon = getStatusIcon(member.safetyStatus);

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl">
            {member.avatar || '👤'}
          </div>
          <div className="absolute -bottom-1 -right-1">
            <StatusIndicator status={statusColor} size="sm" pulse={member.safetyStatus === 'missing'} />
          </div>
        </div>

        {/* Member Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {member.relationship} • {member.age} years old
              </p>
            </div>
            <Badge variant={statusColor} className="capitalize flex items-center gap-1">
              <span>{statusIcon}</span>
              <span>{member.safetyStatus}</span>
            </Badge>
          </div>

          {/* Contact Info */}
          <div className="space-y-1 mb-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>📱</span>
              <span>{member.phone}</span>
            </div>
            {member.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>✉️</span>
                <span className="truncate">{member.email}</span>
              </div>
            )}
          </div>

          {/* Location Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-3">
            <div className="flex items-start gap-2">
              <span className="text-lg">📍</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Last Known Location
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {member.lastKnownLocation.address}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  Updated {formatTimestamp(member.lastKnownLocation.timestamp)}
                </p>
              </div>
            </div>
          </div>

          {/* Medical Info Badge */}
          {member.medicalInfo && (
            <div className="flex flex-wrap gap-2 mb-3">
              {member.medicalInfo.bloodType && (
                <Badge variant="default" className="text-xs">
                  🩸 {member.medicalInfo.bloodType}
                </Badge>
              )}
              {member.medicalInfo.conditions && member.medicalInfo.conditions.length > 0 && (
                <Badge variant="warning" className="text-xs">
                  ⚕️ {member.medicalInfo.conditions.length} condition(s)
                </Badge>
              )}
              {member.medicalInfo.allergies && member.medicalInfo.allergies.length > 0 && (
                <Badge variant="danger" className="text-xs">
                  ⚠️ {member.medicalInfo.allergies.length} allergy(ies)
                </Badge>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails?.(member)}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              View Details
            </button>
            <button
              onClick={() => onStatusClick?.(member)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm font-medium rounded-lg transition-colors"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Made with Bob
