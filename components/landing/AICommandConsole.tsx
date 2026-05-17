'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Zap } from 'lucide-react';

interface Command {
  id: number;
  text: string;
  type: 'input' | 'output' | 'success' | 'warning' | 'error';
  timestamp: string;
}

const sampleCommands: Omit<Command, 'id' | 'timestamp'>[] = [
  { text: '> aegis --scan global-threats', type: 'input' },
  { text: 'Scanning 247 regions...', type: 'output' },
  { text: '✓ 3 critical alerts detected', type: 'warning' },
  { text: '> aegis --deploy emergency-response --region pacific', type: 'input' },
  { text: 'Deploying resources to Pacific region...', type: 'output' },
  { text: '✓ 12 units dispatched successfully', type: 'success' },
  { text: '> aegis --analyze climate-patterns --ai-enhanced', type: 'input' },
  { text: 'AI analysis in progress...', type: 'output' },
  { text: '✓ Pattern recognition complete: 94% accuracy', type: 'success' },
  { text: '> aegis --coordinate multi-agency --priority high', type: 'input' },
  { text: 'Establishing secure channels...', type: 'output' },
  { text: '✓ 8 agencies synchronized', type: 'success' },
];

export default function AICommandConsole() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= sampleCommands.length) {
      // Reset after showing all commands
      const timeout = setTimeout(() => {
        setCommands([]);
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      const newCommand: Command = {
        ...sampleCommands[currentIndex],
        id: currentIndex,
        timestamp: new Date().toLocaleTimeString(),
      };
      setCommands((prev) => [...prev, newCommand]);
      setCurrentIndex((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const getCommandColor = (type: Command['type']) => {
    switch (type) {
      case 'input':
        return 'text-cyan-400';
      case 'output':
        return 'text-gray-400';
      case 'success':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-strong rounded-xl p-6 max-w-2xl w-full"
    >
      {/* Console Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AEGIS AI Terminal</h3>
            <p className="text-xs text-gray-400">Neural Command Interface v3.2</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-xs text-gray-400">Active</span>
        </div>
      </div>

      {/* Console Body */}
      <div className="font-mono text-sm space-y-2 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {commands.map((command, index) => (
            <motion.div
              key={command.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={`${getCommandColor(command.type)} flex items-start gap-2`}
            >
              <span className="text-gray-600 text-xs mt-0.5 min-w-[60px]">
                {command.timestamp}
              </span>
              <span className="flex-1">{command.text}</span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        {commands.length > 0 && currentIndex < sampleCommands.length && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="flex items-center gap-2"
          >
            <span className="text-gray-600 text-xs min-w-[60px]">
              {new Date().toLocaleTimeString()}
            </span>
            <span className="text-cyan-400">▊</span>
          </motion.div>
        )}
      </div>

      {/* Console Footer */}
      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-4">
          <span>CPU: 34%</span>
          <span>MEM: 2.1GB</span>
          <span>NET: 847 Mbps</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>System Optimal</span>
        </div>
      </div>
    </motion.div>
  );
}

// Made with Bob