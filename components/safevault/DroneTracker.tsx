'use client';

import { motion } from 'framer-motion';
import { Plane, Battery, Package, MapPin, Clock, Zap } from 'lucide-react';
import { Drone, DroneDelivery } from '@/types/safevault';
import Card from '@/components/ui/Card';

interface DroneTrackerProps {
  drones: Drone[];
  className?: string;
}

export default function DroneTracker({ drones, className = '' }: DroneTrackerProps) {
  const activeDrones = drones.filter(d => d.status === 'in-transit' || d.status === 'dispatched');
  const availableDrones = drones.filter(d => d.status === 'idle').length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FleetStatCard
          label="Total Fleet"
          value={drones.length}
          icon={<Plane className="w-5 h-5" />}
          color="cyan"
        />
        <FleetStatCard
          label="Available"
          value={availableDrones}
          icon={<Zap className="w-5 h-5" />}
          color="green"
        />
        <FleetStatCard
          label="Active Deliveries"
          value={activeDrones.length}
          icon={<Package className="w-5 h-5" />}
          color="purple"
        />
        <FleetStatCard
          label="In Maintenance"
          value={drones.filter(d => d.status === 'maintenance').length}
          icon={<Clock className="w-5 h-5" />}
          color="orange"
        />
      </div>

      {/* Active Drones Map Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-strong p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Live Drone Tracking
          </h3>
          <div className="relative h-96 bg-gradient-to-br from-blue-950/50 to-purple-950/50 rounded-xl overflow-hidden border border-cyan-500/20">
            {/* Grid Background */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Animated Scan Lines */}
            <motion.div
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"
            />

            {/* Drones on Map */}
            {activeDrones.map((drone, index) => (
              <DroneMarker key={drone.id} drone={drone} index={index} />
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 glass-strong rounded-lg p-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-gray-300">In Transit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-gray-300">Dispatched</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Drone List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {drones.map((drone, index) => (
          <DroneCard key={drone.id} drone={drone} delay={index * 0.1} />
        ))}
      </div>
    </div>
  );
}

interface FleetStatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'cyan' | 'green' | 'purple' | 'orange';
}

function FleetStatCard({ label, value, icon, color }: FleetStatCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500 text-cyan-400',
    green: 'from-green-500 to-emerald-500 text-green-400',
    purple: 'from-purple-500 to-pink-500 text-purple-400',
    orange: 'from-orange-500 to-red-500 text-orange-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-strong p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-400 text-sm mb-1">{label}</div>
            <div className={`text-3xl font-bold ${colorClasses[color].split(' ')[2]}`}>
              {value}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} flex items-center justify-center`}>
            <span className="text-white">{icon}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

interface DroneMarkerProps {
  drone: Drone;
  index: number;
}

function DroneMarker({ drone, index }: DroneMarkerProps) {
  // Simulate position on map (in real app, would use actual coordinates)
  const position = {
    x: 20 + (index * 25) % 60,
    y: 20 + (index * 30) % 60,
  };

  const statusColor = drone.status === 'in-transit' ? 'bg-green-400' : 'bg-yellow-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="absolute"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      {/* Pulse Effect */}
      <motion.div
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`absolute inset-0 w-8 h-8 rounded-full ${statusColor} -translate-x-1/2 -translate-y-1/2`}
      />

      {/* Drone Icon */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`relative w-8 h-8 rounded-full ${statusColor} flex items-center justify-center shadow-lg`}
      >
        <Plane className="w-4 h-4 text-white" />
      </motion.div>

      {/* Info Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 glass-strong rounded-lg p-2 text-xs whitespace-nowrap z-10"
      >
        <div className="font-semibold text-white">{drone.name}</div>
        <div className="text-gray-400">{drone.status}</div>
        <div className="text-cyan-400">{drone.battery}% battery</div>
      </motion.div>
    </motion.div>
  );
}

interface DroneCardProps {
  drone: Drone;
  delay: number;
}

function DroneCard({ drone, delay }: DroneCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idle':
        return 'text-green-400 bg-green-500/20';
      case 'in-transit':
        return 'text-cyan-400 bg-cyan-500/20';
      case 'dispatched':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'maintenance':
        return 'text-orange-400 bg-orange-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 70) return 'text-green-400';
    if (battery > 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="glass-strong p-6 hover:glass-hover transition-all">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">{drone.name}</h4>
            <p className="text-gray-400 text-sm">{drone.model}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(drone.status)}`}>
            {drone.status.toUpperCase()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Battery className="w-4 h-4" />
              <span>Battery</span>
            </div>
            <div className={`text-xl font-bold ${getBatteryColor(drone.battery)}`}>
              {drone.battery}%
            </div>
            <div className="mt-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${drone.battery}%` }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                className={`h-full ${
                  drone.battery > 70
                    ? 'bg-green-400'
                    : drone.battery > 30
                    ? 'bg-yellow-400'
                    : 'bg-red-400'
                }`}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
              <Package className="w-4 h-4" />
              <span>Payload</span>
            </div>
            <div className="text-xl font-bold text-white">
              {drone.currentPayload}/{drone.maxPayload}kg
            </div>
            <div className="mt-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(drone.currentPayload / drone.maxPayload) * 100}%` }}
                transition={{ duration: 1, delay: delay + 0.3 }}
                className="h-full bg-purple-400"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="glass-subtle rounded-lg p-2">
            <div className="text-gray-400 mb-1">Range</div>
            <div className="text-white font-semibold">{drone.range}km</div>
          </div>
          <div className="glass-subtle rounded-lg p-2">
            <div className="text-gray-400 mb-1">Speed</div>
            <div className="text-white font-semibold">{drone.speed}km/h</div>
          </div>
          <div className="glass-subtle rounded-lg p-2">
            <div className="text-gray-400 mb-1">Hours</div>
            <div className="text-white font-semibold">{drone.flightHours}h</div>
          </div>
        </div>

        {drone.assignedDelivery && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="flex items-center gap-2 text-cyan-400 text-sm mb-2">
              <Package className="w-4 h-4" />
              <span className="font-semibold">Active Delivery</span>
            </div>
            <div className="text-gray-300 text-sm">
              To: {drone.assignedDelivery.destination.address}
            </div>
            <div className="text-gray-400 text-xs mt-1">
              ETA: {new Date(drone.assignedDelivery.estimatedArrival).toLocaleTimeString()}
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}

// Made with Bob