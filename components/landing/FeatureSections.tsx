'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Satellite,
  Shield,
  Zap,
  Globe,
  Radio,
  Database,
  Network,
  Eye,
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  stats?: string;
}

const features: Feature[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'AI-Powered Intelligence',
    description:
      'Advanced machine learning algorithms analyze patterns and predict emergencies before they escalate.',
    color: '#8b5cf6',
    stats: '94% accuracy',
  },
  {
    icon: <Satellite className="w-8 h-8" />,
    title: 'Satellite Monitoring',
    description:
      'Real-time satellite imagery and data from 50+ sources for comprehensive global coverage.',
    color: '#3b82f6',
    stats: '247 regions',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Rapid Response',
    description:
      'Coordinate emergency teams and resources with sub-5-minute deployment capabilities.',
    color: '#22c55e',
    stats: '4.2 min avg',
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Real-Time Alerts',
    description:
      'Instant notifications and automated response protocols for critical situations.',
    color: '#f59e0b',
    stats: '<1s latency',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Network',
    description:
      'Connected infrastructure spanning 180+ countries for seamless international coordination.',
    color: '#06b6d4',
    stats: '180+ countries',
  },
  {
    icon: <Radio className="w-8 h-8" />,
    title: 'Multi-Agency Sync',
    description:
      'Unified communication platform connecting government, NGOs, and emergency services.',
    color: '#ec4899',
    stats: '500+ agencies',
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Big Data Analytics',
    description:
      'Process millions of data points per second to identify trends and optimize response.',
    color: '#14b8a6',
    stats: '10M+ data points/s',
  },
  {
    icon: <Network className="w-8 h-8" />,
    title: 'Distributed Systems',
    description:
      'Fault-tolerant architecture ensures 99.99% uptime even during critical events.',
    color: '#f97316',
    stats: '99.99% uptime',
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: 'Predictive Modeling',
    description:
      'Forecast potential disasters using climate data, historical patterns, and AI simulations.',
    color: '#a855f7',
    stats: '72hr forecast',
  },
];

export default function FeatureSections() {
  return (
    <div className="w-full max-w-7xl">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6"
        >
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">ADVANCED CAPABILITIES</span>
        </motion.div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Next-Generation Emergency
          <br />
          <span className="gradient-text">Response Technology</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Combining artificial intelligence, satellite technology, and global coordination
          to save lives and protect communities worldwide.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-300 group relative overflow-hidden"
          >
            {/* Background glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${feature.color}, transparent 70%)`,
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex p-4 rounded-xl mb-4"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <div style={{ color: feature.color }}>{feature.icon}</div>
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-glow-sm transition-all duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Stats Badge */}
              {feature.stats && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                  style={{
                    backgroundColor: `${feature.color}10`,
                    borderColor: `${feature.color}30`,
                    color: feature.color,
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: feature.color }}
                  />
                  {feature.stats}
                </div>
              )}
            </div>

            {/* Decorative corner */}
            <div
              className="absolute top-0 right-0 w-20 h-20 opacity-10"
              style={{
                background: `radial-gradient(circle at top right, ${feature.color}, transparent)`,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <div className="glass-strong rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Emergency Response?
          </h3>
          <p className="text-gray-400 mb-6">
            Join 500+ agencies worldwide using AEGIS OS to protect communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-3 text-lg"
            >
              Request Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost px-8 py-3 text-lg"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Made with Bob