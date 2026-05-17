'use client';

// Realtime Infrastructure Demo Page for AEGIS OS

import React, { useState } from 'react';
import { 
  RealtimeProvider,
  useRealtime,
  useCriticalAlerts,
  useActiveIncidents,
  useRealtimeStats,
  useConnectionStatus,
} from '@/lib/realtime';
import {
  LiveAlertNotification,
  RealtimeDashboard,
  CompactRealtimeDashboard,
  ActivityStream,
  CompactActivityStream,
  EmergencyUpdates,
} from '@/components/realtime';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { 
  Play, 
  Pause, 
  RefreshCw, 
  Zap,
  AlertTriangle,
  Activity,
  Radio
} from 'lucide-react';

function RealtimeDemoContent() {
  const [view, setView] = useState<'full' | 'compact'>('full');
  const { connected, triggerAlert, triggerIncident, triggerActivity, triggerMetricsUpdate } = useRealtime();
  const { connected: isConnected, reconnecting, reconnect } = useConnectionStatus();
  const criticalAlerts = useCriticalAlerts();
  const activeIncidents = useActiveIncidents();
  const stats = useRealtimeStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      {/* Live Alert Notifications */}
      <LiveAlertNotification position="top-right" maxVisible={3} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Radio className="w-10 h-10 text-blue-400" />
                Realtime Infrastructure Demo
              </h1>
              <p className="text-gray-400">
                Live demonstration of AEGIS OS realtime capabilities
              </p>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                isConnected 
                  ? 'bg-green-500/20 border-green-500/50 text-green-300' 
                  : 'bg-red-500/20 border-red-500/50 text-red-300'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-400' : 'bg-red-400'
                } ${isConnected ? 'animate-pulse' : ''}`} />
                <span className="font-semibold">
                  {reconnecting ? 'Reconnecting...' : isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              
              {!isConnected && (
                <Button onClick={reconnect} variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reconnect
                </Button>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-red-500/10 border-red-500/30">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <div>
                  <div className="text-2xl font-bold">{criticalAlerts.length}</div>
                  <div className="text-xs text-gray-400">Critical Alerts</div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-orange-500/10 border-orange-500/30">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-orange-400" />
                <div>
                  <div className="text-2xl font-bold">{activeIncidents.length}</div>
                  <div className="text-xs text-gray-400">Active Incidents</div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-blue-500/10 border-blue-500/30">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold">{stats.totalActivities}</div>
                  <div className="text-xs text-gray-400">Activities</div>
                </div>
              </div>
            </Card>
            
            <Card className="bg-green-500/10 border-green-500/30">
              <div className="flex items-center gap-3">
                <Radio className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-2xl font-bold">{stats.totalAlerts}</div>
                  <div className="text-xs text-gray-400">Total Alerts</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="mb-8 bg-gray-800/50 border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Manual Triggers</h3>
              <p className="text-sm text-gray-400">Test the realtime system with manual triggers</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={triggerAlert}
                variant="outline"
                size="sm"
                disabled={!connected}
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Trigger Alert
              </Button>
              
              <Button 
                onClick={triggerIncident}
                variant="outline"
                size="sm"
                disabled={!connected}
              >
                <Activity className="w-4 h-4 mr-2" />
                Trigger Incident
              </Button>
              
              <Button 
                onClick={triggerActivity}
                variant="outline"
                size="sm"
                disabled={!connected}
              >
                <Zap className="w-4 h-4 mr-2" />
                Trigger Activity
              </Button>
              
              <Button 
                onClick={triggerMetricsUpdate}
                variant="outline"
                size="sm"
                disabled={!connected}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Update Metrics
              </Button>
            </div>
          </div>
        </Card>

        {/* View Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-lg border border-gray-700 bg-gray-800/50 p-1">
            <button
              onClick={() => setView('full')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'full'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Full View
            </button>
            <button
              onClick={() => setView('compact')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                view === 'compact'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Compact View
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Dashboard */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Dashboard Metrics</h2>
            {view === 'full' ? (
              <RealtimeDashboard />
            ) : (
              <CompactRealtimeDashboard />
            )}
          </section>

          {/* Emergency Updates & Activity Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Emergency Incidents</h2>
              <Card className="bg-gray-800/50 border-gray-700 h-[600px] overflow-hidden">
                <EmergencyUpdates 
                  maxIncidents={5} 
                  showUpdates={true}
                  autoExpand={false}
                />
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Activity Stream</h2>
              <Card className="bg-gray-800/50 border-gray-700 h-[600px]">
                {view === 'full' ? (
                  <ActivityStream 
                    maxItems={20}
                    showTimestamps={true}
                    autoScroll={true}
                    compact={false}
                  />
                ) : (
                  <CompactActivityStream />
                )}
              </Card>
            </section>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            This demo showcases the realtime infrastructure with simulated WebSocket connections.
          </p>
          <p className="mt-2">
            Data updates automatically every few seconds. Use manual triggers to test specific events.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RealtimeDemoPage() {
  return (
    <RealtimeProvider
      config={{
        alertInterval: 15000,
        incidentUpdateInterval: 30000,
        metricsUpdateInterval: 5000,
        activityStreamInterval: 8000,
        maxAlerts: 10,
        maxIncidents: 20,
        maxActivityItems: 50,
        enableAnimations: true,
        enableSound: false,
      }}
      autoConnect={true}
    >
      <RealtimeDemoContent />
    </RealtimeProvider>
  );
}

// Made with Bob
