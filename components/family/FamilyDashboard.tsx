'use client';

import React, { useState, useEffect } from 'react';
import {
  FamilyGroup,
  FamilyMember,
  SafetyStatistics,
  AIRecommendation,
  SafetyAlert,
  FamilySearchParams,
} from '@/types';
import { mockFamilyAPI } from '@/lib/mockFamilyData';
import { FamilySearchBar } from './FamilySearchBar';
import { SafetyStatusIndicator } from './SafetyStatusIndicator';
import { FamilyMemberCard } from './FamilyMemberCard';
import { EmergencyContactList } from './EmergencyContactCard';
import { AIRecommendations } from './AIRecommendations';
import Badge from '@/components/ui/Badge';

export const FamilyDashboard: React.FC = () => {
  const [families, setFamilies] = useState<FamilyGroup[]>([]);
  const [statistics, setStatistics] = useState<SafetyStatistics | null>(null);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [selectedFamily, setSelectedFamily] = useState<FamilyGroup | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      // Refresh statistics
      mockFamilyAPI.getSafetyStatistics().then(setStatistics);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [familiesData, statsData, recsData, alertsData] = await Promise.all([
        mockFamilyAPI.getAllFamilies(),
        mockFamilyAPI.getSafetyStatistics(),
        mockFamilyAPI.getAIRecommendations(),
        mockFamilyAPI.getSafetyAlerts(),
      ]);

      setFamilies(familiesData);
      setStatistics(statsData);
      setRecommendations(recsData);
      setAlerts(alertsData);

      // Auto-select first family if available
      if (familiesData.length > 0 && !selectedFamily) {
        setSelectedFamily(familiesData[0]);
      }
    } catch (error) {
      console.error('Error loading family data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (params: FamilySearchParams) => {
    setIsSearching(true);
    try {
      const results = await mockFamilyAPI.searchFamilies(params);
      setFamilies(results);
      
      // Update selected family if it's not in results
      if (selectedFamily && !results.find(f => f.id === selectedFamily.id)) {
        setSelectedFamily(results.length > 0 ? results[0] : null);
      }
    } catch (error) {
      console.error('Error searching families:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleMemberStatusClick = (member: FamilyMember) => {
    // In a real app, this would open a modal to update status
    console.log('Update status for:', member.name);
  };

  const handleMemberViewDetails = (member: FamilyMember) => {
    // In a real app, this would open a detailed view
    console.log('View details for:', member.name);
  };

  const handleRecommendationAction = (recommendation: AIRecommendation) => {
    // In a real app, this would handle the recommendation action
    console.log('Action for recommendation:', recommendation.title);
    if (recommendation.actionUrl) {
      window.location.href = recommendation.actionUrl;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🛡️</div>
          <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Loading Family Safety System...
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching real-time safety data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">🛡️</div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Family Safety System
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Real-time monitoring and emergency management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success" className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Live</span>
              </Badge>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-500">Last updated</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <FamilySearchBar onSearch={handleSearch} isLoading={isSearching} />

        {/* Safety Statistics */}
        {statistics && <SafetyStatusIndicator statistics={statistics} />}

        {/* Active Alerts */}
        {alerts.filter(a => !a.acknowledged).length > 0 && (
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🚨</span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Active Alerts
              </h2>
              <Badge variant="danger" className="ml-auto">
                {alerts.filter(a => !a.acknowledged).length}
              </Badge>
            </div>
            <div className="space-y-2">
              {alerts
                .filter(a => !a.acknowledged)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'critical'
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-500'
                        : alert.severity === 'warning'
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white mb-1">
                          {alert.message}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          alert.severity === 'critical'
                            ? 'danger'
                            : alert.severity === 'warning'
                            ? 'warning'
                            : 'primary'
                        }
                        className="capitalize"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Family Selection Tabs */}
        {families.length > 0 && (
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {families.map((family) => (
                <button
                  key={family.id}
                  onClick={() => setSelectedFamily(family)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    selectedFamily?.id === family.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">👨‍👩‍👧‍👦</span>
                  {family.name}
                  <Badge
                    variant={selectedFamily?.id === family.id ? 'success' : 'default'}
                    className="ml-2"
                  >
                    {family.members.length}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Selected Family Details */}
        {selectedFamily ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Family Members - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {selectedFamily.name}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📍 {selectedFamily.address}
                      </p>
                    </div>
                  </div>
                  <Badge variant="primary">
                    {selectedFamily.members.length} members
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {selectedFamily.members.map((member) => (
                    <FamilyMemberCard
                      key={member.id}
                      member={member}
                      onStatusClick={handleMemberStatusClick}
                      onViewDetails={handleMemberViewDetails}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Emergency Contacts & AI */}
            <div className="space-y-4">
              {/* Emergency Contacts */}
              {selectedFamily.members.length > 0 && (
                <EmergencyContactList
                  contacts={selectedFamily.members.flatMap(m => m.emergencyContacts)}
                  compact={true}
                />
              )}

              {/* AI Recommendations */}
              <AIRecommendations
                recommendations={recommendations}
                onActionClick={handleRecommendationAction}
                maxDisplay={3}
              />
            </div>
          </div>
        ) : (
          <div className="glass rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Families Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or clear filters to see all families
            </p>
            <button
              onClick={() => handleSearch({})}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Show All Families
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Made with Bob
