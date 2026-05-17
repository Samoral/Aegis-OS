'use client';

import { AlertTriangle, Clock, MapPin, Users, TrendingUp } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function EmergenciesPage() {
  const emergencies = [
    { severity: 'CRITICAL', type: 'Wildfire', location: 'Northern Region', time: '2 min ago', affected: 150, color: 'red' },
    { severity: 'HIGH', type: 'Flood Warning', location: 'Coastal Area', time: '15 min ago', affected: 80, color: 'orange' },
    { severity: 'MEDIUM', type: 'Power Outage', location: 'Downtown', time: '1 hour ago', affected: 17, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Active Emergencies</h1>
          <p className="text-white/60">Real-time emergency monitoring and response coordination</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          Report Emergency
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-strong p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <span className="text-2xl font-bold text-white">3</span>
          </div>
          <p className="text-white/60">Critical Alerts</p>
        </Card>
        <Card className="glass-strong p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-orange-400" />
            <span className="text-2xl font-bold text-white">12</span>
          </div>
          <p className="text-white/60">Active Incidents</p>
        </Card>
        <Card className="glass-strong p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">247</span>
          </div>
          <p className="text-white/60">People Affected</p>
        </Card>
        <Card className="glass-strong p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">89%</span>
          </div>
          <p className="text-white/60">Response Rate</p>
        </Card>
      </div>

      {/* Emergency List */}
      <Card className="glass-strong p-6">
        <h2 className="text-xl font-bold text-white mb-6">Active Emergencies</h2>
        <div className="space-y-4">
          {emergencies.map((emergency, i) => (
            <div key={i} className="flex items-center justify-between p-4 glass rounded-lg border-l-4 border-red-500">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-red-500/20 text-red-400">
                      {emergency.severity}
                    </span>
                    <p className="font-semibold text-white">{emergency.type}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {emergency.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {emergency.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {emergency.affected} affected
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all">
                View Details
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Made with Bob
