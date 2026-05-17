'use client';

import { Users, Package, Truck, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Resource Management</h1>
          <p className="text-white/60">Track and coordinate emergency supplies and personnel</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          Request Resources
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">342</span>
          </div>
          <p className="text-white/60">Active Personnel</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">1,847</span>
          </div>
          <p className="text-white/60">Supply Units</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Truck className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">28</span>
          </div>
          <p className="text-white/60">Vehicles Available</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <MapPin className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">15</span>
          </div>
          <p className="text-white/60">Distribution Centers</p>
        </Card>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-strong p-6">
          <h2 className="text-xl font-bold text-white mb-6">Supply Inventory</h2>
          <div className="space-y-4">
            {[
              { name: 'Medical Supplies', quantity: 450, status: 'Good', color: 'green' },
              { name: 'Food & Water', quantity: 1200, status: 'Good', color: 'green' },
              { name: 'Shelter Materials', quantity: 180, status: 'Low', color: 'yellow' },
              { name: 'Communication Equipment', quantity: 95, status: 'Critical', color: 'red' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 glass rounded-lg">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-white/60">{item.quantity} units available</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-bold rounded-full bg-${item.color}-500/20 text-${item.color}-400`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-strong p-6">
          <h2 className="text-xl font-bold text-white mb-6">Personnel Deployment</h2>
          <div className="space-y-4">
            {[
              { team: 'Medical Team Alpha', members: 12, location: 'Northern Region', status: 'Active' },
              { team: 'Rescue Team Bravo', members: 8, location: 'Coastal Area', status: 'Active' },
              { team: 'Support Team Charlie', members: 15, location: 'Downtown', status: 'Standby' },
              { team: 'Logistics Team Delta', members: 10, location: 'Distribution Center', status: 'Active' },
            ].map((team, i) => (
              <div key={i} className="flex items-center justify-between p-4 glass rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-semibold text-white">{team.team}</p>
                    <p className="text-sm text-white/60">{team.members} members • {team.location}</p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400">
                  {team.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// Made with Bob
