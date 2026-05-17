'use client';

import { Settings, User, Bell, Shield, Globe, Moon, Zap } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-white/60">Manage your account and system preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-strong p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg glass text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg glass text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Role</label>
              <select className="w-full px-4 py-2 rounded-lg glass text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option>Emergency Coordinator</option>
                <option>Medical Team</option>
                <option>Rescue Team</option>
                <option>Administrator</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="glass-strong p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <div>
                <p className="font-medium text-white">Emergency Alerts</p>
                <p className="text-sm text-white/60">Critical emergency notifications</p>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <div>
                <p className="font-medium text-white">Team Updates</p>
                <p className="text-sm text-white/60">Messages from your team</p>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <div>
                <p className="font-medium text-white">System Status</p>
                <p className="text-sm text-white/60">System health notifications</p>
              </div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
        </Card>

        <Card className="glass-strong p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full px-4 py-3 rounded-lg glass hover:bg-white/10 transition-all text-left">
              <p className="font-medium text-white">Change Password</p>
              <p className="text-sm text-white/60">Update your account password</p>
            </button>
            <button className="w-full px-4 py-3 rounded-lg glass hover:bg-white/10 transition-all text-left">
              <p className="font-medium text-white">Two-Factor Authentication</p>
              <p className="text-sm text-white/60">Add extra security to your account</p>
            </button>
            <button className="w-full px-4 py-3 rounded-lg glass hover:bg-white/10 transition-all text-left">
              <p className="font-medium text-white">Active Sessions</p>
              <p className="text-sm text-white/60">Manage your active sessions</p>
            </button>
          </div>
        </Card>

        <Card className="glass-strong p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="font-medium text-white">Dark Mode</p>
                  <p className="text-sm text-white/60">Always enabled</p>
                </div>
              </div>
              <input type="checkbox" className="w-5 h-5" defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between p-3 glass rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="font-medium text-white">Language</p>
                  <p className="text-sm text-white/60">English (US)</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-6 py-3 rounded-lg glass text-white hover:bg-white/10 transition-all">
          Cancel
        </button>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          Save Changes
        </button>
      </div>
    </div>
  );
}

// Made with Bob
