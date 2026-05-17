'use client';

import { Map, MapPin, AlertTriangle, Users, Layers } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function MapPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Interactive Map View</h1>
          <p className="text-white/60">Real-time visualization of emergencies and resources</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-lg glass-strong text-white hover:bg-white/10 transition-all">
            <Layers className="w-5 h-5" />
          </button>
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
            Full Screen
          </button>
        </div>
      </div>

      {/* Map Container */}
      <Card className="glass-strong p-0 overflow-hidden h-[600px] relative">
        {/* Placeholder Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-24 h-24 text-cyan-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-2xl font-bold text-white mb-2">Interactive Map</h3>
            <p className="text-white/60 mb-6">Real-time emergency and resource tracking</p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm text-white/80">Critical Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-sm text-white/80">Active Resources</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-white/80">Safe Zones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Overlay Stats */}
        <div className="absolute top-4 left-4 space-y-3 z-10">
          <div className="glass-strong p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="font-bold text-white">3 Active Emergencies</span>
            </div>
            <p className="text-sm text-white/60">2 Critical, 1 High Priority</p>
          </div>
          <div className="glass-strong p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white">247 People Tracked</span>
            </div>
            <p className="text-sm text-white/60">189 Safe, 58 In Transit</p>
          </div>
          <div className="glass-strong p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="font-bold text-white">15 Safe Zones</span>
            </div>
            <p className="text-sm text-white/60">All Operational</p>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <Card className="glass-strong p-6">
        <h2 className="text-xl font-bold text-white mb-4">Map Legend</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <span className="text-white/80">Critical Emergency</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-500" />
            <span className="text-white/80">High Priority</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-cyan-500" />
            <span className="text-white/80">Resources</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-white/80">Safe Zones</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Made with Bob
