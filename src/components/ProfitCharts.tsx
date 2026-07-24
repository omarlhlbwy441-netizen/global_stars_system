import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { MonetizationPlan, ProfitChartData } from '../types';
import { TrendingUp, DollarSign, Clock, PieChart as PieIcon, BarChart3, Activity } from 'lucide-react';

interface ProfitChartsProps {
  plans: MonetizationPlan[];
}

const CHART_DATA: ProfitChartData[] = [
  {
    name: 'بي المنسات B2B',
    shortTitle: 'B2B SaaS',
    minUSD: 300,
    maxUSD: 1500,
    avgUSD: 900,
    setupTimeMin: 35,
    roiScore: 92
  },
  {
    name: 'خدمات التركيب',
    shortTitle: 'Freelance Gigs',
    minUSD: 50,
    maxUSD: 200,
    avgUSD: 125,
    setupTimeMin: 20,
    roiScore: 85
  },
  {
    name: 'متجر السكريبتات',
    shortTitle: 'Marketplace',
    minUSD: 20,
    maxUSD: 50,
    avgUSD: 35,
    setupTimeMin: 45,
    roiScore: 78
  },
  {
    name: 'الاشتراكات SaaS',
    shortTitle: 'Subscriptions',
    minUSD: 10,
    maxUSD: 99,
    avgUSD: 55,
    setupTimeMin: 60,
    roiScore: 95
  }
];

const COLORS = ['#10b981', '#3b82f6', '#a855f7', '#f59e0b'];

export const ProfitCharts: React.FC<ProfitChartsProps> = ({ plans }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'timeline' | 'distribution'>('comparison');

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700/80 text-xs space-y-1.5 dir-rtl">
          <p className="font-bold text-emerald-400 border-b border-slate-700 pb-1 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 font-mono">
              <span style={{ color: entry.color }} className="font-sans font-medium">
                {entry.name}:
              </span>
              <span className="font-bold text-white">${entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-slate-900/90 text-white rounded-3xl border border-slate-800 space-y-6 shadow-2xl relative overflow-hidden dir-rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> التحليل المالي والربحي المتقدم (Recharts Analytics)
          </span>
          <h3 className="text-xl font-bold text-white mt-2 flex items-center gap-2">
            <span>مخطط العائد المالي والإنتاجية</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            تصوير بياني تحليلي للعائد الأدنى والأقصى المتوقع لكل مسار استثماري مع حساب الوقت المستغرق.
          </p>
        </div>

        {/* View Switches */}
        <div className="flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'comparison'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>مقارنة الأرباح ($)</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'timeline'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>سرعة الإنجاز والوقت</span>
          </button>

          <button
            onClick={() => setActiveTab('distribution')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'distribution'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>توزيع النماذج</span>
          </button>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'comparison' ? (
            <BarChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} unit="$" />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ color: '#cbd5e1', fontSize: '12px', paddingTop: '10px' }}
                formatter={(value) => (value === 'minUSD' ? 'العائد الأدنى ($)' : 'العائد الأقصى ($)')}
              />
              <Bar dataKey="minUSD" name="minUSD" fill="#34d399" radius={[6, 6, 0, 0]} barSize={28} />
              <Bar dataKey="maxUSD" name="maxUSD" fill="#059669" radius={[6, 6, 0, 0]} barSize={28} />
            </BarChart>
          ) : activeTab === 'timeline' ? (
            <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <defs>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: '12px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="avgUSD"
                name="متوسط الربح التقديري ($)"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorAvg)"
              />
              <Area
                type="monotone"
                dataKey="setupTimeMin"
                name="الوقت المطلوبة (بالدقائق)"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorTime)"
              />
            </AreaChart>
          ) : (
            <PieChart>
              <Pie
                data={CHART_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={5}
                dataKey="avgUSD"
                nameKey="name"
                label={({ name, avgUSD }) => `${name}: $${avgUSD}`}
              >
                {CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#cbd5e1', fontSize: '12px' }} />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* KPI Cards under Chart */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 block font-medium">أعلى صفقة فردية</span>
          <span className="text-lg font-bold text-emerald-400 font-mono">$1,500</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">B2B SaaS Platform</span>
        </div>

        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 block font-medium">أسرع تحصيل مالي</span>
          <span className="text-lg font-bold text-blue-400 font-mono">15 - 20 دقيقة</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Freelance Installation</span>
        </div>

        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 block font-medium">متوسط العائد/ساعة</span>
          <span className="text-lg font-bold text-amber-400 font-mono">$280 - $600</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">مبني على الجاهزية 100%</span>
        </div>

        <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60">
          <span className="text-[11px] text-slate-400 block font-medium">استقرار الدخل</span>
          <span className="text-lg font-bold text-purple-400 font-mono">تراكمي متكرر</span>
          <span className="text-[10px] text-slate-400 block mt-0.5">SaaS & Marketplace</span>
        </div>
      </div>
    </div>
  );
};
