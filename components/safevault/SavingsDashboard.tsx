'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Target, Zap, Calendar, PiggyBank, ArrowUpRight } from 'lucide-react';
import { EmergencySavings } from '@/types/safevault';
import Card from '@/components/ui/Card';

interface SavingsDashboardProps {
  savings: EmergencySavings;
  className?: string;
}

export default function SavingsDashboard({ savings, className = '' }: SavingsDashboardProps) {
  const progressPercentage = (savings.balance / savings.targetAmount) * 100;
  const daysOfCoverage = Math.floor(savings.balance / 100); // Simplified calculation
  const monthsToTarget = Math.ceil((savings.targetAmount - savings.balance) / savings.monthlyContribution);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
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
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                  <PiggyBank className="w-4 h-4" />
                  <span>Emergency Reserve Balance</span>
                </div>
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-5xl font-bold text-white mb-2"
                >
                  ${savings.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </motion.div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{savings.savingsPercentage}% monthly contribution</span>
                </div>
              </div>
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center"
              >
                <DollarSign className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progress to Target</span>
                <span className="text-cyan-400 font-semibold">{progressPercentage.toFixed(1)}%</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>${savings.balance.toLocaleString()}</span>
                <span>Target: ${savings.targetAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label="Days of Coverage"
          value={daysOfCoverage.toString()}
          subtitle="Based on $100/day"
          color="cyan"
          delay={0.1}
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Months to Target"
          value={monthsToTarget.toString()}
          subtitle={`At $${savings.monthlyContribution}/month`}
          color="purple"
          delay={0.2}
        />
        <StatCard
          icon={<Zap className="w-6 h-6" />}
          label="Auto-Save"
          value={savings.autoSave ? 'Active' : 'Inactive'}
          subtitle={`${savings.savingsPercentage}% of income`}
          color="green"
          delay={0.3}
        />
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass-strong p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {savings.contributions.slice(0, 3).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg glass-hover hover:border-cyan-500/30 border border-transparent transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{transaction.description}</div>
                    <div className="text-gray-400 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-green-400 font-semibold">
                  +${transaction.amount.toFixed(2)}
                </div>
              </motion.div>
            ))}
            {savings.withdrawals.slice(0, 2).map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg glass-hover hover:border-red-500/30 border border-transparent transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-white font-medium">{transaction.description}</div>
                    <div className="text-gray-400 text-sm">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-red-400 font-semibold">
                  -${transaction.amount.toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Savings Adjustment Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="glass-strong p-6">
          <h3 className="text-xl font-bold text-white mb-4">Adjust Savings Plan</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Monthly Contribution</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  defaultValue={savings.monthlyContribution}
                  className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(6 182 212) 0%, rgb(6 182 212) ${(savings.monthlyContribution / 2000) * 100}%, rgba(255,255,255,0.1) ${(savings.monthlyContribution / 2000) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <span className="text-white font-semibold min-w-[80px]">
                  ${savings.monthlyContribution}
                </span>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Target Amount</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="5000"
                  max="50000"
                  step="1000"
                  defaultValue={savings.targetAmount}
                  className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(168 85 247) ${((savings.targetAmount - 5000) / 45000) * 100}%, rgba(255,255,255,0.1) ${((savings.targetAmount - 5000) / 45000) * 100}%, rgba(255,255,255,0.1) 100%)`,
                  }}
                />
                <span className="text-white font-semibold min-w-[80px]">
                  ${savings.targetAmount.toLocaleString()}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-primary py-3 mt-4"
            >
              Update Savings Plan
            </motion.button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
  color: 'cyan' | 'purple' | 'green';
  delay: number;
}

function StatCard({ icon, label, value, subtitle, color, delay }: StatCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500 text-cyan-400',
    purple: 'from-purple-500 to-pink-500 text-purple-400',
    green: 'from-green-500 to-emerald-500 text-green-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="glass-strong p-6 hover:glass-hover transition-all">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} flex items-center justify-center mb-4`}>
          <span className="text-white">{icon}</span>
        </div>
        <div className="text-gray-400 text-sm mb-1">{label}</div>
        <div className={`text-3xl font-bold mb-1 ${colorClasses[color].split(' ')[2]}`}>
          {value}
        </div>
        <div className="text-gray-500 text-xs">{subtitle}</div>
      </Card>
    </motion.div>
  );
}

// Made with Bob