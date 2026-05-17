'use client';

import { Activity, TrendingUp, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function MonitorPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Live Monitor</h1>
          <p className="text-white/60">Real-time system monitoring and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="status-indicator status-normal" />
          <span className="text-sm font-medium text-white">All Systems Operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">99.9%</span>
          </div>
          <p className="text-white/60">System Uptime</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">1,247</span>
          </div>
          <p className="text-white/60">Active Connections</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">156</span>
          </div>
          <p className="text-white/60">Completed Tasks</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">23ms</span>
          </div>
          <p className="text-white/60">Avg Response Time</p>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card className="glass-strong p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { type: 'success', message: 'Emergency alert sent successfully', time: '2 min ago' },
            { type: 'info', message: 'System backup completed', time: '15 min ago' },
            { type: 'warning', message: 'High traffic detected', time: '1 hour ago' },
            { type: 'success', message: 'New user registered', time: '2 hours ago' },
            { type: 'info', message: 'Database optimization completed', time: '3 hours ago' },
          ].map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-4 glass rounded-lg">
              {activity.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
              {activity.type === 'info' && <Activity className="w-5 h-5 text-cyan-400" />}
              {activity.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-400" />}
              <div className="flex-1">
                <p className="text-white">{activity.message}</p>
                <p className="text-sm text-white/60">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Made with Bob
