'use client';

import { motion } from 'framer-motion';
import { Package, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { EmergencyReserve, ReserveItem } from '@/types/safevault';
import Card from '@/components/ui/Card';

interface ReserveInventoryProps {
  reserve: EmergencyReserve;
  className?: string;
}

export default function ReserveInventory({ reserve, className = '' }: ReserveInventoryProps) {
  const adequateItems = reserve.items.filter(i => i.status === 'adequate').length;
  const lowItems = reserve.items.filter(i => i.status === 'low').length;
  const criticalItems = reserve.items.filter(i => i.status === 'critical').length;
  const expiringItems = reserve.items.filter(i => 
    i.expiryDate && new Date(i.expiryDate) < new Date(Date.now() + 30 * 24 * 3600000)
  ).length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Items"
          value={reserve.items.length}
          icon={<Package className="w-5 h-5" />}
          color="cyan"
          trend="+3 this month"
        />
        <StatCard
          label="Adequate"
          value={adequateItems}
          icon={<CheckCircle className="w-5 h-5" />}
          color="green"
          trend={`${Math.round((adequateItems / reserve.items.length) * 100)}%`}
        />
        <StatCard
          label="Low Stock"
          value={lowItems}
          icon={<AlertTriangle className="w-5 h-5" />}
          color="yellow"
          trend="Needs attention"
        />
        <StatCard
          label="Expiring Soon"
          value={expiringItems}
          icon={<Clock className="w-5 h-5" />}
          color="orange"
          trend="Next 30 days"
        />
      </div>

      {/* Adequacy Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              Supply Adequacy Score
            </h3>
            <div className="text-3xl font-bold text-cyan-400">{reserve.adequacyScore}/100</div>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${reserve.adequacyScore}%` }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full relative"
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              />
            </motion.div>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            Based on household size of {reserve.householdSize} people
          </div>
        </Card>
      </motion.div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getCategoryStats(reserve.items).map((cat, index) => (
          <CategoryCard key={cat.category} category={cat} delay={index * 0.1} />
        ))}
      </div>

      {/* Items List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass-strong p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            Inventory Details
          </h3>
          <div className="space-y-3">
            {reserve.items.map((item, index) => (
              <ItemCard key={item.id} item={item} delay={0.5 + index * 0.05} />
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Recommendations */}
      {reserve.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="glass-strong p-6 border-2 border-yellow-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              AI Recommendations
            </h3>
            <ul className="space-y-2">
              {reserve.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg glass-hover"
                >
                  <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'cyan' | 'green' | 'yellow' | 'orange';
  trend: string;
}

function StatCard({ label, value, icon, color, trend }: StatCardProps) {
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500 text-cyan-400',
    green: 'from-green-500 to-emerald-500 text-green-400',
    yellow: 'from-yellow-500 to-amber-500 text-yellow-400',
    orange: 'from-orange-500 to-red-500 text-orange-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glass-strong p-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} flex items-center justify-center mb-3`}>
          <span className="text-white">{icon}</span>
        </div>
        <div className="text-gray-400 text-sm mb-1">{label}</div>
        <div className={`text-2xl font-bold mb-1 ${colorClasses[color].split(' ')[2]}`}>
          {value}
        </div>
        <div className="text-gray-500 text-xs">{trend}</div>
      </Card>
    </motion.div>
  );
}

interface CategoryCardProps {
  category: {
    category: string;
    count: number;
    adequate: number;
    low: number;
  };
  delay: number;
}

function CategoryCard({ category, delay }: CategoryCardProps) {
  const percentage = (category.adequate / category.count) * 100;
  const getColor = () => {
    if (percentage >= 80) return 'text-green-400 bg-green-500/20';
    if (percentage >= 50) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="glass-strong p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-semibold capitalize">{category.category}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getColor()}`}>
            {Math.round(percentage)}%
          </span>
        </div>
        <div className="text-2xl font-bold text-white mb-2">{category.count}</div>
        <div className="text-xs text-gray-400">
          {category.adequate} adequate • {category.low} low
        </div>
        <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: delay + 0.3 }}
            className={`h-full ${
              percentage >= 80
                ? 'bg-green-400'
                : percentage >= 50
                ? 'bg-yellow-400'
                : 'bg-red-400'
            }`}
          />
        </div>
      </Card>
    </motion.div>
  );
}

interface ItemCardProps {
  item: ReserveItem;
  delay: number;
}

function ItemCard({ item, delay }: ItemCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'adequate':
        return 'text-green-400 bg-green-500/20';
      case 'low':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'critical':
        return 'text-red-400 bg-red-500/20';
      case 'expired':
        return 'text-gray-400 bg-gray-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const isExpiringSoon = item.expiryDate && 
    new Date(item.expiryDate) < new Date(Date.now() + 30 * 24 * 3600000);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center justify-between p-4 rounded-lg glass-hover hover:border-cyan-500/30 border border-transparent transition-all"
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-semibold">{item.name}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(item.status)}`}>
              {item.status.toUpperCase()}
            </span>
            {isExpiringSoon && (
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold text-orange-400 bg-orange-500/20">
                EXPIRING SOON
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Qty: {item.quantity} {item.unit}</span>
            <span>•</span>
            <span className="capitalize">{item.category}</span>
            <span>•</span>
            <span>{item.location}</span>
            {item.expiryDate && (
              <>
                <span>•</span>
                <span>Expires: {new Date(item.expiryDate).toLocaleDateString()}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-white font-semibold mb-1">
          {item.quantity}/{item.recommendedQuantity}
        </div>
        <div className="text-xs text-gray-400">
          ${item.cost.toFixed(2)}
        </div>
      </div>
    </motion.div>
  );
}

function getCategoryStats(items: ReserveItem[]) {
  const categories = new Map<string, { count: number; adequate: number; low: number }>();
  
  items.forEach(item => {
    const cat = categories.get(item.category) || { count: 0, adequate: 0, low: 0 };
    cat.count++;
    if (item.status === 'adequate') cat.adequate++;
    if (item.status === 'low' || item.status === 'critical') cat.low++;
    categories.set(item.category, cat);
  });

  return Array.from(categories.entries()).map(([category, stats]) => ({
    category,
    ...stats,
  }));
}

// Made with Bob