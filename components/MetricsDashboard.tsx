
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { MODEL_METRICS, FEATURE_IMPORTANCES } from '../constants';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export const MetricsDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Accuracy Comparison */}
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-lg">
        <h3 className="text-lg font-semibold mb-6 text-slate-200">Model Performance Comparison</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MODEL_METRICS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis domain={[0, 1]} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Legend />
              <Bar dataKey="accuracy" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="f1" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Importance */}
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-lg">
        <h3 className="text-lg font-semibold mb-6 text-slate-200">Random Forest Feature Importance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={FEATURE_IMPORTANCES}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="feature" stroke="#94a3b8" fontSize={12} />
              <Radar
                name="Weight"
                dataKey="importance"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix (Mock representation) */}
      <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 shadow-lg col-span-full">
        <h3 className="text-lg font-semibold mb-6 text-slate-200">Confusion Matrix (Random Forest)</h3>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="space-y-4">
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
              <div className="text-3xl font-bold text-emerald-400">4,821</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">True Negative</div>
            </div>
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-400">142</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">False Negative</div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
              <div className="text-3xl font-bold text-red-400">205</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">False Positive</div>
            </div>
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center">
              <div className="text-3xl font-bold text-emerald-400">4,212</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">True Positive</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
