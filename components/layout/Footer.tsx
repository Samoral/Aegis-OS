'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-strong border-t border-white/10 mt-auto">
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AEGIS OS</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Advanced Emergency Global Intelligence System - Coordinating rapid
              response and resource management for critical situations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/documentation"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/training"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Training
                </Link>
              </li>
              <li>
                <Link
                  href="/protocols"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Protocols
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">Connect</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-lg hover:glass-strong transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-lg hover:glass-strong transition-all"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-2 rounded-lg hover:glass-strong transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © {currentYear} AEGIS OS. All rights reserved.
          </p>
          <p className="text-sm text-white/60 flex items-center gap-1">
            Built with <Heart size={14} className="text-danger-500" /> for emergency
            responders
          </p>
        </div>
      </div>
    </footer>
  );
}

// Made with Bob
