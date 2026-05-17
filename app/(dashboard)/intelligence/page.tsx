'use client';

import { motion } from 'framer-motion';
import { Brain, AlertTriangle, TrendingUp, MapPin, Calendar, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import { mockClimateRisks, mockAIInsights } from '@/lib/mockSafeVaultData';
import { ClimateRiskAnalysis, RiskAssessment, AIInsight } from '@/types/safevault';

export default function IntelligencePage() {
  const [selectedLocation, setSelectedLocation] = useState(0);
  const currentRisk = mockClimateRisks[selectedLocation];

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-strong border-2 border-purple-500/30 p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">AI Intelligence Center</h1>
                  <p className="text-purple-400 text-lg">Climate Risk Analysis & Disaster Prediction</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg max-w-3xl">
                Advanced AI-powered climate risk assessment, disaster prediction, and preparedness recommendations
                powered by real-time data analysis and machine learning models.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-semibold">AI Active</span>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Location Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex gap-4 overflow-x-auto pb-2"
      >
        {mockClimateRisks.map((risk, index) => (
          <motion.button
            key={risk.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedLocation(index)}
            className={`
              flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all whitespace-nowrap
              ${selectedLocation === index
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                : 'glass-strong text-gray-400 hover:text-white'
              }
            `}
          >
            <MapPin className="w-5 h-5" />
            <div className="text-left">
              <div className="font-bold">{risk.location.region}</div>
              <div className="text-xs opacity-75">{risk.location.country}</div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Overall Threat Assessment */}
      <motion.div
        key={selectedLocation}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className={`glass-strong p-6 border-2 ${getThreatBorderColor(currentRisk.overallThreatLevel)}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className={`w-6 h-6 ${getThreatColor(currentRisk.overallThreatLevel)}`} />
              Overall Threat Assessment
            </h2>
            <div className={`px-4 py-2 rounded-full font-bold text-lg ${getThreatBadgeColor(currentRisk.overallThreatLevel)}`}>
              {currentRisk.overallThreatLevel.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard
              label="Active Risks"
              value={currentRisk.risks.length.toString()}
              icon={<AlertTriangle className="w-5 h-5" />}
              color="red"
            />
            <StatCard
              label="Predictions"
              value={currentRisk.predictions.length.toString()}
              icon={<TrendingUp className="w-5 h-5" />}
              color="purple"
            />
            <StatCard
              label="Last Updated"
              value={new Date(currentRisk.lastUpdated).toLocaleDateString()}
              icon={<Calendar className="w-5 h-5" />}
              color="cyan"
            />
          </div>

          <div className="glass-subtle rounded-xl p-4">
            <h3 className="text-white font-semibold mb-2">Location Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Address:</span>
                <span className="text-white ml-2">{currentRisk.location.address}</span>
              </div>
              <div>
                <span className="text-gray-400">Data Source:</span>
                <span className="text-white ml-2">{currentRisk.dataSource}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Risk Assessments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          Identified Risks
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentRisk.risks.map((risk, index) => (
            <RiskCard key={risk.id} risk={risk} delay={index * 0.1} />
          ))}
        </div>
      </div>

      {/* Disaster Predictions */}
      {currentRisk.predictions.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            AI Disaster Predictions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {currentRisk.predictions.map((prediction, index) => (
              <PredictionCard key={prediction.id} prediction={prediction} delay={index * 0.1} />
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          AI Recommendations
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {currentRisk.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="glass-strong p-4 hover:glass-hover transition-all">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{rec}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-cyan-400" />
          Latest AI Insights
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {mockAIInsights.map((insight, index) => (
            <InsightCard key={insight.id} insight={insight} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'red' | 'purple' | 'cyan';
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  const colorClasses = {
    red: 'from-red-500 to-rose-500 text-red-400',
    purple: 'from-purple-500 to-pink-500 text-purple-400',
    cyan: 'from-cyan-500 to-blue-500 text-cyan-400',
  };

  return (
    <div className="glass-subtle rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} flex items-center justify-center mb-3`}>
        <span className="text-white">{icon}</span>
      </div>
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className={`text-2xl font-bold ${colorClasses[color].split(' ')[2]}`}>{value}</div>
    </div>
  );
}

interface RiskCardProps {
  risk: RiskAssessment;
  delay: number;
}

function RiskCard({ risk, delay }: RiskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className={`glass-strong p-6 border-2 ${getSeverityBorderColor(risk.severity)}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className={`w-6 h-6 ${getSeverityColor(risk.severity)}`} />
            <div>
              <h3 className="text-xl font-bold text-white capitalize">{risk.type}</h3>
              <p className="text-gray-400 text-sm">{risk.timeframe}</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityBadgeColor(risk.severity)}`}>
            {risk.severity.toUpperCase()}
          </div>
        </div>

        <p className="text-gray-300 mb-4">{risk.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="glass-subtle rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Probability</div>
            <div className="text-white text-lg font-bold">{risk.probability}%</div>
            <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${risk.probability}%` }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                className={`h-full ${risk.probability > 70 ? 'bg-red-400' : risk.probability > 40 ? 'bg-yellow-400' : 'bg-green-400'}`}
              />
            </div>
          </div>
          <div className="glass-subtle rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Affected Population</div>
            <div className="text-white text-lg font-bold">{(risk.affectedPopulation / 1000000).toFixed(1)}M</div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2 text-sm">Mitigation Steps:</h4>
          <ul className="space-y-1">
            {risk.mitigationSteps.slice(0, 3).map((step, index) => (
              <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}

interface PredictionCardProps {
  prediction: any;
  delay: number;
}

function PredictionCard({ prediction, delay }: PredictionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="glass-strong p-6 border-2 border-purple-500/30">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-purple-400" />
            <div>
              <h3 className="text-xl font-bold text-white capitalize">{prediction.type} Prediction</h3>
              <p className="text-gray-400 text-sm">
                {new Date(prediction.predictedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-purple-400 text-sm">Confidence</div>
            <div className="text-white text-2xl font-bold">{prediction.confidence}%</div>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-lg mb-4 ${getSeverityBadgeColor(prediction.severity)}`}>
          <div className="font-bold">{prediction.severity.toUpperCase()} SEVERITY</div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="glass-subtle rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Casualties</div>
            <div className="text-white text-sm font-bold">{prediction.estimatedImpact.casualties}</div>
          </div>
          <div className="glass-subtle rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Damage</div>
            <div className="text-white text-sm font-bold">{prediction.estimatedImpact.economicDamage}</div>
          </div>
          <div className="glass-subtle rounded-lg p-3">
            <div className="text-gray-400 text-xs mb-1">Displaced</div>
            <div className="text-white text-sm font-bold">{(prediction.estimatedImpact.displacedPeople / 1000).toFixed(0)}K</div>
          </div>
        </div>

        {prediction.evacuationRecommended && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <AlertTriangle className="w-5 h-5" />
              <span>EVACUATION RECOMMENDED</span>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-white font-semibold mb-2 text-sm">Preparedness Actions:</h4>
          <ul className="space-y-1">
            {prediction.preparednessActions.map((action: string, index: number) => (
              <li key={index} className="text-gray-400 text-sm flex items-start gap-2">
                <span className="text-purple-400 mt-1">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}

// Helper functions
function getThreatColor(level: string) {
  switch (level) {
    case 'critical': return 'text-red-400';
    case 'high': return 'text-orange-400';
    case 'moderate': return 'text-yellow-400';
    default: return 'text-green-400';
  }
}

function getThreatBorderColor(level: string) {
  switch (level) {
    case 'critical': return 'border-red-500/50';
    case 'high': return 'border-orange-500/50';
    case 'moderate': return 'border-yellow-500/50';
    default: return 'border-green-500/50';
  }
}

function getThreatBadgeColor(level: string) {
  switch (level) {
    case 'critical': return 'bg-red-500/20 text-red-400 border border-red-500/50';
    case 'high': return 'bg-orange-500/20 text-orange-400 border border-orange-500/50';
    case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50';
    default: return 'bg-green-500/20 text-green-400 border border-green-500/50';
  }
}

function getSeverityColor(severity: string) {
  switch (severity) {
    case 'extreme':
    case 'critical': return 'text-red-400';
    case 'high': return 'text-orange-400';
    case 'moderate': return 'text-yellow-400';
    default: return 'text-green-400';
  }
}

function getSeverityBorderColor(severity: string) {
  switch (severity) {
    case 'extreme':
    case 'critical': return 'border-red-500/50';
    case 'high': return 'border-orange-500/50';
    case 'moderate': return 'border-yellow-500/50';
    default: return 'border-green-500/50';
  }
}

function getSeverityBadgeColor(severity: string) {
  switch (severity) {
    case 'extreme':
    case 'critical': return 'bg-red-500/20 text-red-400 border border-red-500/50';
    case 'high': return 'bg-orange-500/20 text-orange-400 border border-orange-500/50';
    case 'moderate': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50';
    default: return 'bg-green-500/20 text-green-400 border border-green-500/50';
  }
}

function getPriorityBorderColor(priority: string) {
  switch (priority) {
    case 'critical': return 'border-red-500/50';
    case 'high': return 'border-orange-500/50';
    case 'medium': return 'border-yellow-500/50';
    default: return 'border-cyan-500/50';
  }
}

function getPriorityBadgeColor(priority: string) {
  switch (priority) {
    case 'critical': return 'bg-red-500/20 text-red-400';
    case 'high': return 'bg-orange-500/20 text-orange-400';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400';
    default: return 'bg-cyan-500/20 text-cyan-400';
  }
}

interface InsightCardProps {
  insight: AIInsight;
  delay: number;
}

function InsightCard({ insight, delay }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className={`glass-strong p-6 border-2 ${getPriorityBorderColor(insight.priority)}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-white">{insight.title}</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityBadgeColor(insight.priority)}`}>
            {insight.priority.toUpperCase()}
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-4">{insight.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-400">
            Confidence: <span className="text-cyan-400 font-semibold">{insight.confidence}%</span>
          </div>
          {insight.actionable && insight.actions && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold"
            >
              Take Action
            </motion.button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// Made with Bob