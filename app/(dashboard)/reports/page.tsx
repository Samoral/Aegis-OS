'use client';

import { FileText, Download, Calendar, TrendingUp, BarChart, PieChart } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-white/60">Generate and view emergency response reports</p>
        </div>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">156</span>
          </div>
          <p className="text-white/60">Total Reports</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">89%</span>
          </div>
          <p className="text-white/60">Success Rate</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">24</span>
          </div>
          <p className="text-white/60">This Month</p>
        </Card>
        <Card className="glass-strong p-6">
          <div className="flex items-center justify-between mb-4">
            <PieChart className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">12</span>
          </div>
          <p className="text-white/60">Pending Review</p>
        </Card>
      </div>

      <Card className="glass-strong p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Reports</h2>
        <div className="space-y-4">
          {[
            { title: 'Monthly Emergency Response Summary', date: 'May 2026', type: 'Monthly', status: 'Complete' },
            { title: 'Wildfire Incident Report', date: 'May 15, 2026', type: 'Incident', status: 'Complete' },
            { title: 'Resource Allocation Analysis', date: 'May 10, 2026', type: 'Analysis', status: 'Complete' },
            { title: 'Team Performance Review', date: 'May 5, 2026', type: 'Review', status: 'Pending' },
          ].map((report, i) => (
            <div key={i} className="flex items-center justify-between p-4 glass rounded-lg">
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="font-semibold text-white">{report.title}</p>
                  <div className="flex items-center gap-3 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs">
                      {report.type}
                    </span>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Made with Bob
