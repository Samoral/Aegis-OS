'use client';

import { Bell, Search, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              size={20}
            />
            <input
              type="text"
              placeholder="Search emergencies, resources, locations..."
              className="input pl-10 w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative glass p-2 rounded-lg hover:glass-strong transition-all"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger-500 rounded-full flex items-center justify-center text-xs font-bold">
              3
            </span>
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 glass px-3 py-2 rounded-lg hover:glass-strong transition-all"
          >
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-white/60">Emergency Coordinator</p>
            </div>
          </motion.button>

          {/* Status Badge */}
          <Badge variant="success" withDot>
            Online
          </Badge>
        </div>
      </div>
    </header>
  );
}

// Made with Bob
