'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  AlertTriangle,
  Activity,
  Users,
  Settings,
  FileText,
  Map,
  Radio,
  Menu,
  X,
  Shield,
  Brain,
  Plane,
  Heart,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  color?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home, color: 'cyan' },
  { name: 'SafeVault™', href: '/safevault', icon: Shield, color: 'blue' },
  { name: 'AI Intelligence', href: '/intelligence', icon: Brain, color: 'purple' },
  { name: 'Family Safety', href: '/family', icon: Heart, color: 'pink' },
  { name: 'Drone Fleet', href: '/drones', icon: Plane, color: 'indigo' },
  { name: 'Emergencies', href: '/emergencies', icon: AlertTriangle, badge: '3', color: 'red' },
  { name: 'Live Monitor', href: '/monitor', icon: Activity, color: 'green' },
  { name: 'Resources', href: '/resources', icon: Users, color: 'amber' },
  { name: 'Map View', href: '/map', icon: Map, color: 'teal' },
  { name: 'Communications', href: '/communications', icon: Radio, color: 'violet' },
  { name: 'Reports', href: '/reports', icon: FileText, color: 'slate' },
  { name: 'Settings', href: '/settings', icon: Settings, color: 'gray' },
];

const colorMap: Record<string, string> = {
  cyan: 'from-cyan-500 to-cyan-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  pink: 'from-pink-500 to-pink-600',
  indigo: 'from-indigo-500 to-indigo-600',
  red: 'from-red-500 to-red-600',
  green: 'from-green-500 to-green-600',
  amber: 'from-amber-500 to-amber-600',
  teal: 'from-teal-500 to-teal-600',
  violet: 'from-violet-500 to-violet-600',
  slate: 'from-slate-500 to-slate-600',
  gray: 'from-gray-500 to-gray-600',
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 glass p-2 rounded-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-72 glass-strong border-r border-white/10',
          'flex flex-col backdrop-blur-2xl',
          'z-[var(--z-sidebar)] lg:z-[var(--z-content)]',
          'lg:!transform-none shadow-2xl shadow-black/50'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-xl" />
          
          <Link href="/" className="flex items-center gap-3 relative z-10 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/50 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <Shield className="text-white relative z-10" size={24} />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AEGIS OS
              </h1>
              <p className="text-xs text-white/60 flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Emergency Response
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const gradient = colorMap[item.color || 'cyan'];

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300',
                    'hover:glass-strong group relative overflow-hidden',
                    isActive && 'glass-strong shadow-lg'
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${gradient} rounded-r-full`}
                      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <div className={cn(
                    'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300',
                    gradient
                  )} />

                  {/* Icon with gradient background */}
                  <div className={cn(
                    'relative z-10 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300',
                    isActive
                      ? `bg-gradient-to-br ${gradient} shadow-lg`
                      : 'bg-white/5 group-hover:bg-white/10'
                  )}>
                    <Icon
                      size={18}
                      className={cn(
                        'transition-all duration-300',
                        isActive ? 'text-white' : 'text-white/70 group-hover:text-white group-hover:scale-110'
                      )}
                    />
                  </div>

                  <span
                    className={cn(
                      'flex-1 transition-all duration-300 relative z-10',
                      isActive ? 'text-white font-semibold' : 'text-white/70 group-hover:text-white'
                    )}
                  >
                    {item.name}
                  </span>

                  {/* Badge */}
                  {item.badge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/20 relative z-10"
                    >
                      {item.badge}
                    </motion.span>
                  )}

                  {/* Arrow indicator for active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative z-10"
                    >
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                    </motion.div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* System Status */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-strong rounded-xl p-4 relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-3 mb-2 relative z-10">
              <div className="status-indicator status-normal" />
              <span className="text-sm font-semibold text-white">System Status</span>
            </div>
            <p className="text-xs text-white/60 relative z-10">All systems operational</p>
            <div className="mt-2 flex items-center gap-2 relative z-10">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '98%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                />
              </div>
              <span className="text-xs font-bold text-green-400">98%</span>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}

// Made with Bob
