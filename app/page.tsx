'use client';

import { ArrowRight, Play, Shield, Brain, Heart, Bell, Users, Zap, Globe, Satellite, Activity, AlertTriangle, TrendingUp, Radio } from 'lucide-react';
import Link from 'next/link';
import AnimatedGlobe from '@/components/landing/AnimatedGlobe';

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full overflow-hidden relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 grid-background opacity-20" />
      
      {/* Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500 rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[120px] opacity-15 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 glass-strong border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-cyan-400">AEGIS OS</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Home</Link>
              <Link href="/safevault" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Platform</Link>
              <Link href="/intelligence" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Solutions</Link>
              <Link href="/intelligence" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">AI Intelligence</Link>
              <Link href="/family" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Family Safety</Link>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block px-6 py-2 text-white hover:text-cyan-400 transition-colors font-medium">
                Login
              </button>
              <Link href="/safevault">
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-cyan-500/30">
              <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">
                AI-POWERED DISASTER RESILIENCE PLATFORM
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">PREDICT. PROTECT.</span>
              <br />
              <span className="text-white">RESPOND.</span>
              <br />
              <span className="text-cyan-400 animate-pulse">SAVE LIVES.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              AEGIS OS is an AI-powered operating system for disaster intelligence, real-time alerts,
              family safety, and emergency coordination. Built to protect humanity when it matters most.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/safevault">
                <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg font-semibold shadow-2xl shadow-cyan-500/50 inline-flex items-center gap-2 hover:shadow-cyan-500/70 transition-all">
                  Explore Dashboard
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="px-8 py-4 rounded-xl glass-strong text-white text-lg font-semibold inline-flex items-center gap-2 border border-white/10 hover:border-cyan-500/50 transition-all">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Trusted By */}
            <div className="pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Trusted by Leading Organizations</p>
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-2xl font-bold text-gray-500 hover:text-cyan-400 transition-colors">UNDRR</div>
                <div className="text-2xl font-bold text-gray-500 hover:text-cyan-400 transition-colors">WHO</div>
                <div className="text-2xl font-bold text-gray-500 hover:text-cyan-400 transition-colors">IFRC</div>
                <div className="text-2xl font-bold text-gray-500 hover:text-cyan-400 transition-colors">UNDP</div>
                <div className="text-2xl font-bold text-gray-500 hover:text-cyan-400 transition-colors">NASA</div>
              </div>
            </div>
          </div>

          {/* Right Side - Interactive Holographic Earth */}
          <div className="relative h-[700px] flex items-center justify-center">
            <AnimatedGlobe />

            {/* Floating Emergency Cards */}
            <EmergencyCard
              position="top-0 left-0"
              icon={<AlertTriangle className="w-5 h-5" />}
              title="CRITICAL ALERT"
              subtitle="Cyclone Approaching"
              detail="ETA: 4h 23m"
              status="EXTREME"
              color="red"
            />
            <EmergencyCard
              position="top-20 right-0"
              icon={<Brain className="w-5 h-5" />}
              title="AI RISK PREDICTION"
              subtitle="Risk Level: EXTREME"
              detail="Confidence: 94%"
              status="HIGH"
              color="orange"
            />
            <EmergencyCard
              position="bottom-0 left-0"
              icon={<Activity className="w-5 h-5" />}
              title="LIVE INCIDENTS"
              subtitle="247 Active"
              detail="Real-time Monitoring"
              status="MONITORING"
              color="cyan"
            />
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong border border-cyan-500/30 mb-6">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-400 uppercase tracking-wider">Advanced Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comprehensive Protection Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced AI systems working together to predict, prevent, and respond to emergencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Brain className="w-8 h-8" />}
              title="AI Crisis Intelligence"
              description="Real-time disaster prediction and risk assessment powered by advanced machine learning"
              color="cyan"
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8" />}
              title="Family Safety"
              description="Track and protect your loved ones with location monitoring and emergency alerts"
              color="pink"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Elderly SOS"
              description="24/7 monitoring with fall detection and instant emergency response for seniors"
              color="green"
            />
            <FeatureCard
              icon={<Bell className="w-8 h-8" />}
              title="Real-time Alerts"
              description="Instant notifications for disasters, emergencies, and critical situations"
              color="amber"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Resource Coordination"
              description="Efficient allocation and tracking of emergency supplies and response teams"
              color="blue"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="AI Emergency Assistant"
              description="Intelligent guidance and recommendations during crisis situations"
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass-strong rounded-3xl p-12 border border-cyan-500/30 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
                Global Impact & Reach
              </h2>
              <p className="text-center text-gray-400 mb-16 text-lg">
                Protecting communities worldwide with cutting-edge technology
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                <ImpactStat number="189" label="Countries Covered" icon={<Globe className="w-6 h-6" />} />
                <ImpactStat number="2.4M+" label="Lives Protected" icon={<Shield className="w-6 h-6" />} />
                <ImpactStat number="15.8K+" label="Active Volunteers" icon={<Users className="w-6 h-6" />} />
                <ImpactStat number="98.7%" label="Prediction Accuracy" icon={<TrendingUp className="w-6 h-6" />} />
                <ImpactStat number="24/7" label="Monitoring & Support" icon={<Radio className="w-6 h-6" />} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="glass-strong rounded-3xl p-12 text-center border border-cyan-500/30 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-xl" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Protect What Matters?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of organizations using AEGIS OS to save lives worldwide
              </p>
              <Link href="/safevault">
                <button className="px-10 py-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-semibold shadow-2xl shadow-cyan-500/50 inline-flex items-center gap-3 hover:shadow-cyan-500/70 transition-all">
                  Launch Mission Control
                  <ArrowRight className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 AEGIS OS. Protecting humanity through advanced AI and real-time intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Emergency Card Component
function EmergencyCard({ position, icon, title, subtitle, detail, status, color }: any) {
  const colorClasses = {
    red: {
      border: 'border-red-500/50',
      bg: 'bg-red-500/10',
      text: 'text-red-400',
      glow: 'shadow-red-500/50',
    },
    orange: {
      border: 'border-orange-500/50',
      bg: 'bg-orange-500/10',
      text: 'text-orange-400',
      glow: 'shadow-orange-500/50',
    },
    cyan: {
      border: 'border-cyan-500/50',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/50',
    },
  };

  const colors = colorClasses[color as keyof typeof colorClasses];

  return (
    <div className={`absolute ${position} glass-strong rounded-xl p-4 border-2 ${colors.border} ${colors.bg} min-w-[220px] shadow-xl ${colors.glow} backdrop-blur-xl hover:scale-105 transition-transform`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={colors.text}>{icon}</div>
        <span className={`text-xs font-bold ${colors.text} uppercase tracking-wider`}>{status}</span>
        <div className={`ml-auto w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')} animate-pulse`} />
      </div>
      <h4 className="text-white font-bold mb-1 text-sm">{title}</h4>
      <p className="text-gray-300 text-xs mb-1">{subtitle}</p>
      <p className={`text-xs ${colors.text} font-semibold`}>{detail}</p>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, color }: any) {
  const colorMap: any = {
    cyan: 'from-cyan-500 to-cyan-600',
    pink: 'from-pink-500 to-pink-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className="glass-strong rounded-2xl p-8 border border-white/10 hover:border-cyan-500/50 transition-all group relative overflow-hidden hover:-translate-y-2">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
      
      <div className="relative z-10">
        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorMap[color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
          <span className="text-white">{icon}</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// Impact Stat Component
function ImpactStat({ number, label, icon }: any) {
  return (
    <div className="text-center group hover:scale-105 transition-transform">
      <div className="flex justify-center mb-3">
        <div className="text-cyan-400 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{number}</div>
      <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  );
}

// Made with Bob
