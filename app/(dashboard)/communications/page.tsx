'use client';

import { Radio, Send, Phone, MessageSquare, Users, Signal } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function CommunicationsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Emergency Communications</h1>
          <p className="text-white/60">Coordinate with teams and broadcast emergency alerts</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          <Send className="w-5 h-5 inline mr-2" />
          Send Alert
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Radio className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">24</span>
          </div>
          <p className="text-white/60">Active Channels</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <MessageSquare className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">1,847</span>
          </div>
          <p className="text-white/60">Messages Sent</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">342</span>
          </div>
          <p className="text-white/60">Connected Users</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Signal className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">98%</span>
          </div>
          <p className="text-white/60">Network Strength</p>
        </Card>
      </div>

      {/* Communication Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-strong p-6">
          <h2 className="text-xl font-bold text-white mb-6">Active Channels</h2>
          <div className="space-y-4">
            {[
              { name: 'Emergency Command', users: 12, status: 'Active', color: 'red' },
              { name: 'Medical Team', users: 8, status: 'Active', color: 'green' },
              { name: 'Rescue Operations', users: 15, status: 'Active', color: 'cyan' },
              { name: 'Logistics', users: 6, status: 'Standby', color: 'yellow' },
            ].map((channel, i) => (
              <div key={i} className="flex items-center justify-between p-4 glass rounded-lg">
                <div className="flex items-center gap-3">
                  <Radio className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-semibold text-white">{channel.name}</p>
                    <p className="text-sm text-white/60">{channel.users} users connected</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-${channel.color}-500 animate-pulse`} />
                  <span className="text-sm text-white/80">{channel.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass-strong p-6">
          <h2 className="text-xl font-bold text-white mb-6">Recent Messages</h2>
          <div className="space-y-4">
            {[
              { from: 'Command Center', message: 'All teams report status', time: '2 min ago', type: 'broadcast' },
              { from: 'Medical Team Alpha', message: 'Arrived at location, setting up triage', time: '5 min ago', type: 'update' },
              { from: 'Rescue Team Bravo', message: 'Evacuating 15 civilians', time: '8 min ago', type: 'update' },
              { from: 'Logistics', message: 'Supply drop completed', time: '12 min ago', type: 'info' },
            ].map((msg, i) => (
              <div key={i} className="p-4 glass rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{msg.from}</span>
                  <span className="text-xs text-white/60">{msg.time}</span>
                </div>
                <p className="text-sm text-white/80">{msg.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-strong p-6">
        <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 glass rounded-lg hover:bg-white/10 transition-all text-center">
            <Phone className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <span className="text-sm text-white">Emergency Call</span>
          </button>
          <button className="p-4 glass rounded-lg hover:bg-white/10 transition-all text-center">
            <Send className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <span className="text-sm text-white">Broadcast Alert</span>
          </button>
          <button className="p-4 glass rounded-lg hover:bg-white/10 transition-all text-center">
            <MessageSquare className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <span className="text-sm text-white">Team Message</span>
          </button>
          <button className="p-4 glass rounded-lg hover:bg-white/10 transition-all text-center">
            <Radio className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <span className="text-sm text-white">Join Channel</span>
          </button>
        </div>
      </Card>
    </div>
  );
}

// Made with Bob
