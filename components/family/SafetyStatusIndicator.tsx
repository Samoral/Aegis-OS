'use client';

import React from 'react';
import { SafetyStatistics } from '@/types';

interface SafetyStatusIndicatorProps {
  statistics: SafetyStatistics;
  showPercentages?: boolean;
}

export const SafetyStatusIndicator: React.FC<SafetyStatusIndicatorProps> = ({
  statistics,
  showPercentages = true,
}) => {
  const getPercentage = (count: number): number => {
    if (statistics.totalMembers === 0) return 0;
    return Math.round((count / statistics.totalMembers) * 100);
  };

  const formatLastUpdated = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(date).toLocaleDateString();
  };

  const statusItems = [
    {
      label: 'Safe',
      count: statistics.safeCount,
      percentage: getPercentage(statistics.safeCount),
      icon: '✓',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      borderColor: 'border-green-500',
    },
    {
      label: 'Injured',
      count: statistics.injuredCount,
      percentage: getPercentage(statistics.injuredCount),
      icon: '⚠',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      borderColor: 'border-yellow-500',
    },
    {
      label: 'Missing',
      count: statistics.missingCount,
      percentage: getPercentage(statistics.missingCount),
      icon: '!',
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
      borderColor: 'border-red-500',
    },
    {
      label: 'Unknown',
      count: statistics.unknownCount,
      percentage: getPercentage(statistics.unknownCount),
      icon: '?',
      color: 'text-gray-600 dark:text-gray-400',
      bgColor: 'bg-gray-100 dark:bg-gray-900/30',
      borderColor: 'border-gray-500',
    },
  ];

  return (
    <div className="glass rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛡️</span>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Safety Overview
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Members: {statistics.totalMembers}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Last updated
          </p>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatLastUpdated(statistics.lastUpdated)}
          </p>
        </div>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statusItems.map((item) => (
          <div
            key={item.label}
            className={`${item.bgColor} rounded-lg p-4 border-l-4 ${item.borderColor} transition-transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-2xl ${item.color}`}>{item.icon}</span>
              <span className={`text-3xl font-bold ${item.color}`}>
                {item.count}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {item.label}
            </p>
            {showPercentages && (
              <p className={`text-xs ${item.color} font-semibold`}>
                {item.percentage}% of total
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Visual Progress Bar */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Status Distribution
        </p>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
          {statistics.safeCount > 0 && (
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${getPercentage(statistics.safeCount)}%` }}
              title={`Safe: ${statistics.safeCount}`}
            />
          )}
          {statistics.injuredCount > 0 && (
            <div
              className="bg-yellow-500 h-full transition-all duration-500"
              style={{ width: `${getPercentage(statistics.injuredCount)}%` }}
              title={`Injured: ${statistics.injuredCount}`}
            />
          )}
          {statistics.missingCount > 0 && (
            <div
              className="bg-red-500 h-full transition-all duration-500"
              style={{ width: `${getPercentage(statistics.missingCount)}%` }}
              title={`Missing: ${statistics.missingCount}`}
            />
          )}
          {statistics.unknownCount > 0 && (
            <div
              className="bg-gray-500 h-full transition-all duration-500"
              style={{ width: `${getPercentage(statistics.unknownCount)}%` }}
              title={`Unknown: ${statistics.unknownCount}`}
            />
          )}
        </div>
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Alert Messages */}
      {statistics.missingCount > 0 && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400 text-xl">⚠️</span>
            <p className="text-sm font-medium text-red-800 dark:text-red-300">
              Critical Alert: {statistics.missingCount} member(s) reported missing
            </p>
          </div>
        </div>
      )}

      {statistics.injuredCount > 0 && (
        <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 dark:text-yellow-400 text-xl">⚠️</span>
            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
              Warning: {statistics.injuredCount} member(s) reported injured
            </p>
          </div>
        </div>
      )}

      {statistics.missingCount === 0 && statistics.injuredCount === 0 && statistics.safeCount === statistics.totalMembers && (
        <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400 text-xl">✓</span>
            <p className="text-sm font-medium text-green-800 dark:text-green-300">
              All Clear: All family members are safe
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Made with Bob
