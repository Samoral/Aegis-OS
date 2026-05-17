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
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'SafeVault™', href: '/safevault', icon: Shield },
  { name: 'AI Intelligence', href: '/intelligence', icon: Brain },
  { name: 'Family Safety', href: '/family', icon: Heart },
  { name: 'Drone Fleet', href: '/drones', icon: Plane },
  { name: 'Emergencies', href: '/emergencies', icon: AlertTriangle, badge: '3' },
  { name: 'Live Monitor', href: '/monitor', icon: Activity },
  { name: 'Resources', href: '/resources', icon: Users },
  { name: 'Map View', href: '/map', icon: Map },
  { name: 'Communications', href: '/communications', icon: Radio },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

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
        transition={{ type: 'spring', damping: 20 }}
        className={cn(
          'fixed lg:sticky top-0 left-0 h-screen w-64 glass-strong border-r border-white/10 z-40',
          'lg:translate-x-0 flex flex-col'
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <AlertTriangle className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-glow">AEGIS OS</h1>
              <p className="text-xs text-white/60">Emergency Response</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  'hover:glass-strong group relative',
                  isActive && 'glass-strong border-l-4 border-primary-500'
                )}
              >
                <Icon
                  size={20}
                  className={cn(
                    'transition-colors',
                    isActive ? 'text-primary-400' : 'text-white/70 group-hover:text-white'
                  )}
                />
                <span
                  className={cn(
                    'flex-1 transition-colors',
                    isActive ? 'text-white font-medium' : 'text-white/70 group-hover:text-white'
                  )}
                >
                  {item.name}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-danger-500/20 text-danger-300 border border-danger-500/30">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary-500/10 rounded-lg -z-10"
                    transition={{ type: 'spring', damping: 20 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="glass rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="status-indicator status-normal" />
              <span className="text-sm font-medium">System Status</span>
            </div>
            <p className="text-xs text-white/60">All systems operational</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

// Made with Bob
