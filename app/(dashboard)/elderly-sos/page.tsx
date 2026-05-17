'use client';

import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Phone, MapPin, Activity, Clock, Bell, Shield } from 'lucide-react';
import { useState } from 'react';
import Card from '@/components/ui/Card';
import { mockElderlyProfiles, mockSOSAlerts, mockInactivityAlerts } from '@/lib/mockSafeVaultData';

export default function ElderlySOS() {
  const [selectedProfile, setSelectedProfile] = useState(0);
  const profile = mockElderlyProfiles[selectedProfile];
  const activeAlerts = mockSOSAlerts.filter(a => a.elderlyId === profile.id);
  const inactivityAlerts = mockInactivityAlerts.filter(a => a.elderlyId === profile.id);

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-strong border-2 border-pink-500/30 p-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-1">Elderly SOS & Care</h1>
                  <p className="text-pink-400 text-lg">AI-Powered Senior Safety Monitoring</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg max-w-3xl">
                24/7 monitoring with fall detection, inactivity alerts, and instant emergency response
                for elderly care and safety.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white font-semibold">All Systems Active</span>
              </div>
              <div className="text-right text-sm text-gray-400">
                {mockElderlyProfiles.length} Monitored Seniors
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Profile Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {mockElderlyProfiles.map((prof, index) => (
          <motion.button
            key={prof.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedProfile(index)}
            className={`
              text-left p-6 rounded-xl transition-all
              ${selectedProfile === index
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/50'
                : 'glass-strong text-gray-400 hover:text-white'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <img
                src={prof.avatar}
                alt={prof.name}
                className="w-16 h-16 rounded-full border-2 border-white/20"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">{prof.name}</h3>
                <p className="text-sm opacity-75">{prof.age} years old • {prof.address}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskBadgeColor(prof.riskLevel)}`}>
                {prof.riskLevel.toUpperCase()}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Profile Details */}
      <motion.div
        key={selectedProfile}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-strong p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full border-4 border-pink-500/30"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{profile.name}</h2>
                  <p className="text-gray-400">{profile.age} years old</p>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-gray-300 text-sm">{profile.address}</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold shadow-lg shadow-red-500/50 flex items-center gap-2"
              >
                <Bell className="w-5 h-5" />
                EMERGENCY SOS
              </motion.button>
            </div>

            {/* Health Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatusCard
                label="Mobility"
                value={profile.mobility}
                icon={<Activity className="w-5 h-5" />}
                color="cyan"
              />
              <StatusCard
                label="Cognitive"
                value={profile.cognitiveStatus.replace('-', ' ')}
                icon={<Activity className="w-5 h-5" />}
                color="purple"
              />
              <StatusCard
                label="Risk Level"
                value={profile.riskLevel}
                icon={<AlertTriangle className="w-5 h-5" />}
                color={profile.riskLevel === 'high' ? 'red' : profile.riskLevel === 'medium' ? 'yellow' : 'green'}
              />
              <StatusCard
                label="Last Check-in"
                value={getTimeAgo(profile.lastCheckIn)}
                icon={<Clock className="w-5 h-5" />}
                color="green"
              />
            </div>

            {/* Medical Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass-subtle rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2 text-sm">Medical Conditions</h4>
                <ul className="space-y-1">
                  {profile.medicalConditions.map((condition, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-subtle rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2 text-sm">Medications</h4>
                <ul className="space-y-1">
                  {profile.medications.map((med, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {med}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-subtle rounded-xl p-4">
                <h4 className="text-white font-semibold mb-2 text-sm">Allergies</h4>
                <ul className="space-y-1">
                  {profile.allergies.map((allergy, i) => (
                    <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      {allergy}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Monitoring Devices */}
          <Card className="glass-strong p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Monitoring Devices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.devices.map((device, index) => (
                <DeviceCard key={device.id} device={device} delay={index * 0.1} />
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar - Caregivers & Contacts */}
        <div className="space-y-6">
          <Card className="glass-strong p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-400" />
              Caregivers
            </h3>
            <div className="space-y-3">
              {profile.caregivers.map((caregiver, index) => (
                <motion.div
                  key={caregiver.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="glass-subtle rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold">{caregiver.name}</h4>
                    {caregiver.isPrimary && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-400">
                        PRIMARY
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{caregiver.relationship}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{caregiver.phone}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{caregiver.availability}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="glass-strong p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" />
              Emergency Contacts
            </h3>
            <div className="space-y-3">
              {profile.emergencyContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="glass-subtle rounded-lg p-4"
                >
                  <h4 className="text-white font-semibold mb-1">{contact.name}</h4>
                  <p className="text-gray-400 text-sm mb-2">{contact.relationship}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            Active SOS Alerts
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {activeAlerts.map((alert, index) => (
              <SOSAlertCard key={alert.id} alert={alert} delay={index * 0.1} />
            ))}
          </div>
        </div>
      )}

      {/* Inactivity Monitoring */}
      {inactivityAlerts.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-yellow-400" />
            Inactivity Alerts
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {inactivityAlerts.map((alert, index) => (
              <InactivityAlertCard key={alert.id} alert={alert} delay={index * 0.1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface StatusCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'cyan' | 'purple' | 'red' | 'yellow' | 'green';
}

function StatusCard({ label, value, icon, color }: StatusCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500 text-cyan-400',
    purple: 'from-purple-500 to-pink-500 text-purple-400',
    red: 'from-red-500 to-rose-500 text-red-400',
    yellow: 'from-yellow-500 to-amber-500 text-yellow-400',
    green: 'from-green-500 to-emerald-500 text-green-400',
  };

  return (
    <div className="glass-subtle rounded-xl p-4">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} flex items-center justify-center mb-3`}>
        <span className="text-white">{icon}</span>
      </div>
      <div className="text-gray-400 text-xs mb-1">{label}</div>
      <div className={`text-lg font-bold capitalize ${colorClasses[color].split(' ')[2]}`}>
        {value}
      </div>
    </div>
  );
}

function DeviceCard({ device, delay }: any) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      case 'low-battery': return 'text-yellow-400 bg-yellow-500/20';
      case 'malfunction': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="glass-subtle rounded-lg p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold capitalize">{device.type.replace('-', ' ')}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(device.status)}`}>
          {device.status.toUpperCase()}
        </span>
      </div>
      <p className="text-gray-400 text-sm mb-2">{device.name}</p>
      {device.battery !== undefined && (
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${device.battery}%` }}
              transition={{ duration: 1, delay: delay + 0.3 }}
              className={`h-full ${device.battery > 70 ? 'bg-green-400' : device.battery > 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
            />
          </div>
          <span className="text-xs text-gray-400">{device.battery}%</span>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        Last signal: {getTimeAgo(device.lastSignal)}
      </p>
    </motion.div>
  );
}

function SOSAlertCard({ alert, delay }: any) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'life-threatening': return 'border-red-500/50 bg-red-500/10';
      case 'critical': return 'border-orange-500/50 bg-orange-500/10';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-cyan-500/50 bg-cyan-500/10';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className={`glass-strong p-6 border-2 ${getSeverityColor(alert.severity)}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </motion.div>
            <div>
              <h3 className="text-xl font-bold text-white capitalize">{alert.type.replace('-', ' ')}</h3>
              <p className="text-gray-400 text-sm">{getTimeAgo(alert.timestamp)}</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-full font-bold ${alert.severity === 'life-threatening' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
            {alert.severity.toUpperCase()}
          </div>
        </div>

        <p className="text-gray-300 mb-4">{alert.description}</p>

        {alert.vitals && (
          <div className="grid grid-cols-4 gap-3 mb-4">
            {alert.vitals.heartRate && (
              <div className="glass-subtle rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Heart Rate</div>
                <div className="text-white font-bold">{alert.vitals.heartRate} bpm</div>
              </div>
            )}
            {alert.vitals.bloodPressure && (
              <div className="glass-subtle rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Blood Pressure</div>
                <div className="text-white font-bold">{alert.vitals.bloodPressure}</div>
              </div>
            )}
            {alert.vitals.oxygenLevel && (
              <div className="glass-subtle rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Oxygen</div>
                <div className="text-white font-bold">{alert.vitals.oxygenLevel}%</div>
              </div>
            )}
            {alert.vitals.temperature && (
              <div className="glass-subtle rounded-lg p-3">
                <div className="text-gray-400 text-xs mb-1">Temperature</div>
                <div className="text-white font-bold">{alert.vitals.temperature}°F</div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold"
          >
            Contact Caregiver
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold"
          >
            Dispatch Emergency
          </motion.button>
        </div>
      </Card>
    </motion.div>
  );
}

function InactivityAlertCard({ alert, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="glass-strong p-6 border-2 border-yellow-500/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-yellow-400" />
            <div>
              <h3 className="text-xl font-bold text-white">Inactivity Detected</h3>
              <p className="text-gray-400 text-sm">{alert.duration} hours of inactivity</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${getRiskBadgeColor(alert.aiAnalysis.riskLevel)}`}>
            {alert.aiAnalysis.riskLevel.toUpperCase()} RISK
          </div>
        </div>

        <div className="glass-subtle rounded-lg p-4 mb-4">
          <h4 className="text-white font-semibold mb-2 text-sm">AI Analysis</h4>
          <div className="text-gray-400 text-sm mb-2">
            Confidence: <span className="text-cyan-400 font-semibold">{alert.aiAnalysis.confidence}%</span>
          </div>
          <div className="space-y-1">
            <p className="text-gray-400 text-sm font-semibold">Possible Causes:</p>
            {alert.aiAnalysis.possibleCauses.map((cause: string, i: number) => (
              <p key={i} className="text-gray-400 text-sm flex items-center gap-2">
                <span className="text-yellow-400">•</span>
                {cause}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-white font-semibold text-sm">Recommended Actions:</p>
          {alert.aiAnalysis.recommendedActions.map((action: string, i: number) => (
            <p key={i} className="text-gray-400 text-sm flex items-center gap-2">
              <span className="text-cyan-400">→</span>
              {action}
            </p>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

function getRiskBadgeColor(level: string) {
  switch (level) {
    case 'critical':
    case 'high': return 'bg-red-500/20 text-red-400';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400';
    default: return 'bg-green-500/20 text-green-400';
  }
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// Made with Bob