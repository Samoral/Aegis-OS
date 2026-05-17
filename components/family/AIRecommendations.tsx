'use client';

import React, { useState } from 'react';
import { AIRecommendation } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
  onActionClick?: (recommendation: AIRecommendation) => void;
  maxDisplay?: number;
}

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendations,
  onActionClick,
  maxDisplay = 5,
}) => {
  const [showAll, setShowAll] = useState(false);

  const getTypeIcon = (type: AIRecommendation['type']): string => {
    switch (type) {
      case 'safety-tip':
        return '💡';
      case 'evacuation-route':
        return '🚪';
      case 'emergency-prep':
        return '🎒';
      case 'health-alert':
        return '⚕️';
      default:
        return '🤖';
    }
  };

  const getTypeLabel = (type: AIRecommendation['type']): string => {
    switch (type) {
      case 'safety-tip':
        return 'Safety Tip';
      case 'evacuation-route':
        return 'Evacuation';
      case 'emergency-prep':
        return 'Preparation';
      case 'health-alert':
        return 'Health';
      default:
        return 'AI Insight';
    }
  };

  const getPriorityColor = (priority: AIRecommendation['priority']): 'danger' | 'warning' | 'success' => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
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

  // Sort by priority and timestamp
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const displayedRecommendations = showAll
    ? sortedRecommendations
    : sortedRecommendations.slice(0, maxDisplay);

  return (
    <div className="glass rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤖</span>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Recommendations
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Personalized safety insights
            </p>
          </div>
        </div>
        <Badge variant="primary" className="flex items-center gap-1">
          <span>✨</span>
          <span>{recommendations.length} insights</span>
        </Badge>
      </div>

      {/* Recommendations List */}
      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🤖</div>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            No recommendations at this time
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            AI is analyzing your family safety data
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {displayedRecommendations.map((recommendation) => (
              <Card
                key={recommendation.id}
                className="hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-3xl flex-shrink-0">
                    {getTypeIcon(recommendation.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                          {recommendation.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {recommendation.description}
                        </p>
                      </div>
                      <Badge
                        variant={getPriorityColor(recommendation.priority)}
                        className="capitalize flex-shrink-0"
                      >
                        {recommendation.priority}
                      </Badge>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <span>🏷️</span>
                        <span>{getTypeLabel(recommendation.type)}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <span>🕐</span>
                        <span>{formatTimestamp(recommendation.timestamp)}</span>
                      </span>
                    </div>

                    {/* Action Button */}
                    {recommendation.actionable && (
                      <button
                        onClick={() => {
                          if (onActionClick) {
                            onActionClick(recommendation);
                          } else if (recommendation.actionUrl) {
                            window.location.href = recommendation.actionUrl;
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                      >
                        <span>→</span>
                        <span>Take Action</span>
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Show More/Less Button */}
          {recommendations.length > maxDisplay && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full mt-4 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>{showAll ? '↑' : '↓'}</span>
              <span>
                {showAll
                  ? 'Show Less'
                  : `Show ${recommendations.length - maxDisplay} More`}
              </span>
            </button>
          )}
        </>
      )}

      {/* AI Info Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
          <span>🤖</span>
          <span>
            Powered by AEGIS AI • Recommendations are updated in real-time based on
            safety data analysis
          </span>
        </div>
      </div>
    </div>
  );
};

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onActionClick?: (recommendation: AIRecommendation) => void;
  compact?: boolean;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  recommendation,
  onActionClick,
  compact = false,
}) => {
  const getTypeIcon = (type: AIRecommendation['type']): string => {
    switch (type) {
      case 'safety-tip':
        return '💡';
      case 'evacuation-route':
        return '🚪';
      case 'emergency-prep':
        return '🎒';
      case 'health-alert':
        return '⚕️';
      default:
        return '🤖';
    }
  };

  const getPriorityColor = (priority: AIRecommendation['priority']): 'danger' | 'warning' | 'success' => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors">
        <span className="text-2xl">{getTypeIcon(recommendation.type)}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
            {recommendation.title}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {recommendation.description}
          </p>
        </div>
        <Badge variant={getPriorityColor(recommendation.priority)} className="text-xs">
          {recommendation.priority}
        </Badge>
      </div>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="text-3xl">{getTypeIcon(recommendation.type)}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              {recommendation.title}
            </h3>
            <Badge variant={getPriorityColor(recommendation.priority)} className="capitalize">
              {recommendation.priority}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            {recommendation.description}
          </p>
          {recommendation.actionable && (
            <button
              onClick={() => {
                if (onActionClick) {
                  onActionClick(recommendation);
                } else if (recommendation.actionUrl) {
                  window.location.href = recommendation.actionUrl;
                }
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Take Action →
            </button>
          )}
        </div>
      </div>
    </Card>
  );
};

// Made with Bob
