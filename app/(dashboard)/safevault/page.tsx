'use client';

import { motion } from 'framer-motion';
import { Shield, DollarSign, Package, Plane, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import PreparednessGauge from '@/components/safevault/PreparednessGauge';
import SavingsDashboard from '@/components/safevault/SavingsDashboard';
import DroneTracker from '@/components/safevault/DroneTracker';
import ReserveInventory from '@/components/safevault/ReserveInventory';
import Card from '@/components/ui/Card';
import { safeVaultMockData } from '@/lib/mockSafeVaultData';

type TabType = 'overview' | 'savings' | 'reserves' | 'drones';

export default function SafeVaultPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        <Card className="glass-strong border-2 border-cyan-500/30 p-8">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-3 mb-4"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1">AEGIS SafeVault™</h1>
                    <p className="text-cyan-400 text-lg">Emergency Preparedness & Resilience System</p>
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-gray-300 text-lg max-w-3xl"
                >
                  Prepare financially and logistically for emergencies with AI-powered insights,
                  automated savings, emergency reserves, and drone delivery logistics.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-strong"
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold">AI-Powered</span>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <QuickStat
                icon={<Shield className="w-6 h-6" />}
                label="Preparedness"
                value={`${safeVaultMockData.preparedness.overall}/100`}
                color="cyan"
              />
              <QuickStat
                icon={<DollarSign className="w-6 h-6" />}
                label="Emergency Fund"
                value={`$${safeVaultMockData.savings.balance.toLocaleString()}`}
                color="green"
              />
              <QuickStat
                icon={<Package className="w-6 h-6" />}
                label="Reserve Items"
                value={safeVaultMockData.reserve.items.length.toString()}
                color="purple"
              />
              <QuickStat
                icon={<Plane className="w-6 h-6" />}
                label="Active Drones"
                value={safeVaultMockData.drones.filter(d => d.status !== 'idle').length.toString()}
                color="orange"
              />
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        <TabButton
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
          icon={<Shield className="w-5 h-5" />}
          label="Overview"
        />
        <TabButton
          active={activeTab === 'savings'}
          onClick={() => setActiveTab('savings')}
          icon={<DollarSign className="w-5 h-5" />}
          label="Emergency Savings"
        />
        <TabButton
          active={activeTab === 'reserves'}
          onClick={() => setActiveTab('reserves')}
          icon={<Package className="w-5 h-5" />}
          label="Supply Reserves"
        />
        <TabButton
          active={activeTab === 'drones'}
          onClick={() => setActiveTab('drones')}
          icon={<Plane className="w-5 h-5" />}
          label="Drone Fleet"
        />
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PreparednessGauge score={safeVaultMockData.preparedness} />
              <div className="space-y-6">
                <Card className="glass-strong p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Financial Preparedness
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Emergency Balance</span>
                      <span className="text-2xl font-bold text-green-400">
                        ${safeVaultMockData.savings.balance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Monthly Contribution</span>
                      <span className="text-xl font-bold text-cyan-400">
                        ${safeVaultMockData.savings.monthlyContribution}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Days of Coverage</span>
                      <span className="text-xl font-bold text-purple-400">
                        {safeVaultMockData.analytics.savingsSummary.daysOfCoverage}
                      </span>
                    </div>
                  </div>
                </Card>

                <Card className="glass-strong p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-purple-400" />
                    Supply Status
                  </h3>
                  <div className="space-y-3">
                    <SupplyBar
                      label="Adequate"
                      value={safeVaultMockData.analytics.supplySummary.adequateItems}
                      total={safeVaultMockData.analytics.supplySummary.totalItems}
                      color="green"
                    />
                    <SupplyBar
                      label="Low Stock"
                      value={safeVaultMockData.analytics.supplySummary.lowItems}
                      total={safeVaultMockData.analytics.supplySummary.totalItems}
                      color="yellow"
                    />
                    <SupplyBar
                      label="Critical"
                      value={safeVaultMockData.analytics.supplySummary.criticalItems}
                      total={safeVaultMockData.analytics.supplySummary.totalItems}
                      color="red"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'savings' && (
          <SavingsDashboard savings={safeVaultMockData.savings} />
        )}

        {activeTab === 'reserves' && (
          <ReserveInventory reserve={safeVaultMockData.reserve} />
        )}

        {activeTab === 'drones' && (
          <DroneTracker drones={safeVaultMockData.drones} />
        )}
      </motion.div>
    </div>
  );
}

interface QuickStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'cyan' | 'green' | 'purple' | 'orange';
}

function QuickStat({ icon, label, value, color }: QuickStatProps) {
  const colorClasses = {
    cyan: 'text-cyan-400 bg-cyan-500/20',
    green: 'text-green-400 bg-green-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
    orange: 'text-orange-400 bg-orange-500/20',
  };

  return (
    <div className="glass-subtle rounded-xl p-4 flex items-center gap-3">
      <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
        <span className={colorClasses[color].split(' ')[0]}>{icon}</span>
      </div>
      <div>
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="text-white text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap
        ${active
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
          : 'glass-strong text-gray-400 hover:text-white'
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}

interface SupplyBarProps {
  label: string;
  value: number;
  total: number;
  color: 'green' | 'yellow' | 'red';
}

function SupplyBar({ label, value, total, color }: SupplyBarProps) {
  const percentage = (value / total) * 100;
  const colorClasses = {
    green: 'bg-green-400 text-green-400',
    yellow: 'bg-yellow-400 text-yellow-400',
    red: 'bg-red-400 text-red-400',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-gray-400">{label}</span>
        <span className={`font-semibold ${colorClasses[color].split(' ')[1]}`}>
          {value}/{total}
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1 }}
          className={`h-full ${colorClasses[color].split(' ')[0]}`}
        />
      </div>
    </div>
  );
}

// Made with Bob