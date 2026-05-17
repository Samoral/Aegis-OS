'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Rocket, Shield, Users } from 'lucide-react';

const benefits = [
  'Real-time emergency monitoring',
  'AI-powered predictive analytics',
  'Multi-agency coordination',
  '24/7 global support',
  'Secure data infrastructure',
  'Customizable dashboards',
];

const testimonials = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Director, Global Emergency Response',
    organization: 'United Nations',
    quote:
      'AEGIS OS has revolutionized how we coordinate international disaster response. The AI predictions have saved countless lives.',
    avatar: '👩‍⚕️',
  },
  {
    name: 'James Rodriguez',
    role: 'Chief of Operations',
    organization: 'FEMA',
    quote:
      'The real-time data integration and response coordination features are unmatched. A game-changer for emergency management.',
    avatar: '👨‍💼',
  },
  {
    name: 'Dr. Aisha Patel',
    role: 'Climate Response Lead',
    organization: 'World Health Organization',
    quote:
      'Predictive modeling capabilities have allowed us to prepare for emergencies before they escalate. Truly innovative.',
    avatar: '👩‍🔬',
  },
];

export default function CTASections() {
  return (
    <div className="w-full space-y-24">
      {/* Primary CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl glass-strong p-12 md:p-16"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/20 to-green-500/20 blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400">GET STARTED TODAY</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Future of
            <br />
            <span className="text-glow text-cyan-400">Emergency Response</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Deploy AEGIS OS in your organization and experience the power of AI-driven
            emergency management. Start protecting lives today.
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 text-left"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg font-semibold inline-flex items-center gap-2 shadow-2xl shadow-primary-500/50"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost px-8 py-4 text-lg font-semibold"
            >
              Schedule Demo
            </motion.button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6"
          >
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-400">TRUSTED WORLDWIDE</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What Leaders Are Saying
          </h2>
          <p className="text-gray-400 text-lg">
            Trusted by emergency response teams across the globe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl p-6 hover:glass-strong transition-all duration-300"
            >
              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-xs text-gray-500">{testimonial.organization}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Secondary CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-12 max-w-4xl mx-auto text-center"
      >
        <Shield className="w-16 h-16 text-green-400 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Enterprise-Grade Security
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Bank-level encryption, SOC 2 compliance, and 99.99% uptime guarantee.
          Your data and operations are always secure.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>ISO 27001 Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>HIPAA Ready</span>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

// Made with Bob