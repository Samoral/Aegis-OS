'use client';

import { Plane, Battery, MapPin, Activity, AlertCircle } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function DronesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Drone Fleet Management</h1>
          <p className="text-white/60">Monitor and control autonomous emergency response drones</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          Deploy Drone
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Plane className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">24</span>
          </div>
          <p className="text-white/60">Active Drones</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Battery className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">87%</span>
          </div>
          <p className="text-white/60">Avg Battery</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <MapPin className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">12</span>
          </div>
          <p className="text-white/60">Missions Active</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">156</span>
          </div>
          <p className="text-white/60">Total Flights</p>
        </Card>
      </div>

      {/* Drone Fleet */}
      <Card className="glass-strong p-6">
        <h2 className="text-xl font-bold text-white mb-6">Fleet Status</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 glass rounded-lg">
              <div className="flex items-center gap-4">
                <Plane className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="font-semibold text-white">Drone Alpha-{i}</p>
                  <p className="text-sm text-white/60">Medical Supply Delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-white/60">Battery</p>
                  <p className="font-semibold text-green-400">{90 - i * 5}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/60">Status</p>
                  <p className="font-semibold text-cyan-400">Active</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Made with Bob
