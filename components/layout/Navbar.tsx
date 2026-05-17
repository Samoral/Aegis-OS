'use client';

import { Bell, Search, User, Command, Zap, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Badge from '@/components/ui/Badge';

export default function Navbar() {
  const [notificationCount] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 glass-strong border-b border-white/10 z-[var(--z-navbar)] backdrop-blur-2xl">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <motion.div
            className="relative"
            animate={{ scale: searchFocused ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Search
                className={`transition-colors duration-300 ${
                  searchFocused ? 'text-cyan-400' : 'text-white/40'
                }`}
                size={20}
              />
              {searchFocused && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="hidden md:flex items-center gap-1 text-xs text-white/40"
                >
                  <Command size={12} />
                  <span>K</span>
                </motion.div>
              )}
            </div>
            <input
              type="text"
              placeholder="Search emergencies, resources, locations..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className={`input pl-12 pr-4 w-full transition-all duration-300 ${
                searchFocused
                  ? 'ring-2 ring-cyan-500/50 bg-white/10'
                  : 'bg-white/5'
              }`}
            />
            {searchFocused && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40 hidden md:block"
              >
                Press ESC to cancel
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-6">
          {/* Quick Actions */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 glass-strong px-4 py-2 rounded-xl hover:bg-cyan-500/10 transition-all group"
            title="Quick Command"
          >
            <Zap size={18} className="text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            <span className="text-sm font-medium">Quick Action</span>
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative glass-strong p-3 rounded-xl hover:bg-red-500/10 transition-all group"
            aria-label="Notifications"
          >
            <Bell size={20} className="group-hover:text-red-400 transition-colors" />
            <AnimatePresence>
              {notificationCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-red-500/50"
                >
                  {notificationCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 glass-strong px-4 py-2 rounded-xl hover:bg-white/5 transition-all group relative overflow-hidden"
          >
            {/* Hover gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              <User size={18} className="relative z-10" />
            </div>
            <div className="text-left hidden sm:block relative z-10">
              <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                Admin User
              </p>
              <p className="text-xs text-white/60 flex items-center gap-1">
                <Shield size={10} className="text-cyan-400" />
                Emergency Coordinator
              </p>
            </div>
          </motion.button>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="success" withDot>
              Online
            </Badge>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </header>
  );
}

// Made with Bob
