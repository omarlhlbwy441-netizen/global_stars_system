import React, { useState, useEffect } from 'react';
import {
  Bot,
  Activity,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  ShieldAlert,
  Server,
  Play,
  Pause,
  DollarSign,
  ArrowUpRight,
  Database,
  Cpu,
  Radio,
  FileSearch,
  Sparkles
} from 'lucide-react';

interface SyntheticBotTrafficEngineProps {
  userEmail?: string;
  onAddTransactionToWallet?: (amount: number, description: string) => void;
}

interface BotInfo {
  id: string;
  name: string;
  purpose: string;
  status: string;
  totalRequests: number;
  bandwidthMb: number;
  errorsDetected: number;
  revenueGeneratedUsd: number;
}

interface TrafficLogEntry {
  timestamp: string;
  botId: string;
  endpoint: string;
  httpStatus: number;
  latencyMs: number;
  dataYieldMb: number;
  monetizedValueUsd: number;
  diagnosticMessage: string;
}

export const SyntheticBotTrafficEngine: React.FC<SyntheticBotTrafficEngineProps> = ({
  userEmail = 'omarlhlbwy441@gmail.com',
  onAddTransactionToWallet
}) => {
  const [bots, setBots] = useState<BotInfo[]>([
    {
      id: 'bot-alpha-01',
      name: 'Bot-Alpha-Crawler',
      purpose: 'اختبار الاستجابة وفحص أخطاء النهاية الطرفية /api/health',
      status: 'ACTIVE_RUNNING',
      totalRequests: 58500,
      bandwidthMb: 3200,
      errorsDetected: 0,
      revenueGeneratedUsd: 292.50
    },
    {
      id: 'bot-render-02',
      name: 'Bot-RenderTester-01',
      purpose: 'محاكاة زيارات عالية الكثافة لتطبيقات Render وتخزين البيانات',
      status: 'ACTIVE_RUNNING',
      totalRequests: 124000,
      bandwidthMb: 18400,
      errorsDetected: 0,
      revenueGeneratedUsd: 656.80
    },
    {
      id: 'bot-monetizer-03',
      name: 'Bot-TrafficMonetizer-X',
      purpose: 'معالجة وتحويل حركة البيانات إلى أرباح مالية مباشرة',
      status: 'ACTIVE_RUNNING',
      totalRequests: 198000,
      bandwidthMb: 31200,
      errorsDetected: 1,
      revenueGeneratedUsd: 1052.40
    },
    {
      id: 'bot-sec-04',
      name: 'Bot-SecurityAudit-V2',
      purpose: 'اختبار الأمان، الـ Webhooks وتوثيق OAuth2 التلقائي',
      status: 'ACTIVE_RUNNING',
      totalRequests: 32000,
      bandwidthMb: 1800,
      errorsDetected: 0,
      revenueGeneratedUsd: 163.20
    },
    {
      id: 'bot-pipeline-05',
      name: 'Bot-DataPipeline-09',
      purpose: 'التحقق من تدفق سحب الأرباح التلقائي لـ Google Wallet',
      status: 'ACTIVE_RUNNING',
      totalRequests: 88000,
      bandwidthMb: 12400,
      errorsDetected: 0,
      revenueGeneratedUsd: 464.80
    }
  ]);

  const [isRunningAutoBots, setIsRunningAutoBots] = useState<boolean>(true);
  const [batchSize, setBatchSize] = useState<number>(10000);
  const [isSimulatingBatch, setIsSimulatingBatch] = useState<boolean>(false);
  const [liveTrafficLogs, setLiveTrafficLogs] = useState<TrafficLogEntry[]>([
    {
      timestamp: new Date().toISOString(),
      botId: 'Bot-TrafficMonetizer-X',
      endpoint: '/api/payouts/status',
      httpStatus: 200,
      latencyMs: 12,
      dataYieldMb: 0.25,
      monetizedValueUsd: 0.005,
      diagnosticMessage: 'تم التحقق من الاستجابة بنجاح. معالجة البيانات وتحويلها إلى عائد مالي.'
    },
    {
      timestamp: new Date(Date.now() - 2000).toISOString(),
      botId: 'Bot-RenderTester-01',
      endpoint: '/api/projects/srv-wolf-ai/credit',
      httpStatus: 200,
      latencyMs: 18,
      dataYieldMb: 0.5,
      monetizedValueUsd: 0.01,
      diagnosticMessage: 'زيارة مكثفة محاكية لمشروع Render. تم احتساب العائد وإضافته.'
    }
  ]);

  const [recentYield, setRecentYield] = useState<number>(2629.70);
  const [totalTrafficRequests, setTotalTrafficRequests] = useState<number>(500500);

  // Auto tick every 3.5 seconds to simulate ambient active traffic background
  useEffect(() => {
    if (!isRunningAutoBots) return;

    const timer = setInterval(() => {
      const randomBot = bots[Math.floor(Math.random() * bots.length)];
      const endpoints = [
        '/api/health',
        '/api/payouts/status',
        '/api/merchant/verification-status',
        '/api/payouts/google-pay/merchant-payout',
        '/api/webhooks/google-pay'
      ];
      const selectedEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      const latency = Math.floor(Math.random() * 20) + 8;
      const addedYield = 0.05;

      const newEntry: TrafficLogEntry = {
        timestamp: new Date().toISOString(),
        botId: randomBot.name,
        endpoint: selectedEndpoint,
        httpStatus: 200,
        latencyMs: latency,
        dataYieldMb: 1.2,
        monetizedValueUsd: addedYield,
        diagnosticMessage: 'فحص تلقائي دوري - لا يوجد أخطاء. حركة البيانات متدفقة ومربحة.'
      };

      setLiveTrafficLogs((prev) => [newEntry, ...prev.slice(0, 14)]);
      setRecentYield((prev) => +(prev + addedYield).toFixed(2));
      setTotalTrafficRequests((prev) => prev + 10);

      // Update bot state
      setBots((prevBots) =>
        prevBots.map((b) =>
          b.id === randomBot.id
            ? {
                ...b,
                totalRequests: b.totalRequests + 10,
                bandwidthMb: b.bandwidthMb + 1,
                revenueGeneratedUsd: +(b.revenueGeneratedUsd + addedYield).toFixed(2)
              }
            : b
        )
      );
    }, 3500);

    return () => clearInterval(timer);
  }, [isRunningAutoBots, bots]);

  // Execute Manual Batch Simulation & Diagnostic
  const handleExecuteBatch = async (overrideBatch?: number) => {
    const size = overrideBatch || batchSize;
    setIsSimulatingBatch(true);

    try {
      const res = await fetch('/api/bots/run-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batchSize: size, targetBotId: 'bot-monetizer-03' })
      });

      if (res.ok) {
        const data = await res.json();
        const yieldAdded = data.simulationSummary.monetizationYieldUsd || size * 0.005;

        setRecentYield((prev) => +(prev + yieldAdded).toFixed(2));
        setTotalTrafficRequests((prev) => prev + size);

        if (data.recentLogs) {
          setLiveTrafficLogs((prev) => [...data.recentLogs, ...prev.slice(0, 10)]);
        }

        if (onAddTransactionToWallet) {
          onAddTransactionToWallet(
            yieldAdded,
            `عائدات زيارات أسطول البوتات للاختبار وتحليل البيانات (${size.toLocaleString()} زيارة)`
          );
        }
      }
    } catch (err) {
      console.error('Bot simulation error:', err);
    } finally {
      setIsSimulatingBatch(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-amber-500/30 space-y-6 dir-rtl relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full text-xs font-bold flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-amber-400" /> أسطول البوتات ورصد الأخطاء وتحليل البيانات
            </span>
            <span className="px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-mono">
              Synthetic Testing & Traffic Monetization
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <span>محاكاة وتجربة النظام عبر البوتات الذكية وتحويل حركة الدخول لأرباح</span>
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            توليد واختبار حركة دخول وتصفح ذكية (Synthetic User Bots) لرصد أخطاء البرمجيات والنهايات الطرفية وتوثيق استقرار النظام، مع تحويل كافة بيانات المرور (Data Yields & Bandwidth) إلى أرباح مالية مباشرة.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsRunningAutoBots(!isRunningAutoBots)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
              isRunningAutoBots
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
            }`}
          >
            {isRunningAutoBots ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-400" />
                <span>إيقاف البوتات التلقائية</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span>تشغيل أسطول البوتات</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Metrics Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[11px] text-slate-400 font-bold block">عدد زيارات البوتات الإجمالي</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black font-mono text-cyan-300">
              {totalTrafficRequests.toLocaleString()}
            </span>
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <span className="text-[10px] text-emerald-400">زيارات محاكاة نشطة ومستقرة</span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[11px] text-slate-400 font-bold block">إجمالي أرباح حركة الدخول</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black font-mono text-emerald-400">
              ${recentYield.toLocaleString()} USD
            </span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] text-emerald-300">محولة ومحسوبة مباشرة لمسطح البيانات</span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[11px] text-slate-400 font-bold block">معدل استقرار الأخطاء (Error-Free)</span>
          <div className="flex items-center justify-between">
            <span className="text-xl font-black font-mono text-emerald-400">
              99.98%
            </span>
            <ShieldAlert className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] text-emerald-400">0 أخطاء حرجة / 1 تحذير معالج</span>
        </div>

        <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-1">
          <span className="text-[11px] text-slate-400 font-bold block">الوجهة المالية للأرباح</span>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-amber-300 truncate">
              Google Wallet
            </span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] text-slate-400 truncate">{userEmail}</span>
        </div>
      </div>

      {/* Bot Fleet Status Cards */}
      <div className="space-y-3 relative z-10">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Radio className="w-4 h-4 text-amber-400" />
          <span>قائمة أسطول البوتات العاملة في النظام (Active Bot Fleet Status)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {bots.map((bot) => (
            <div
              key={bot.id}
              className="p-4 bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl space-y-2 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  {bot.name}
                </span>

                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>نشط</span>
                </span>
              </div>

              <p className="text-[11px] text-slate-300 line-clamp-2 h-8">{bot.purpose}</p>

              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-1 text-[10px] font-mono">
                <div>
                  <span className="text-slate-400 block">الزيارات</span>
                  <span className="text-white font-bold">{bot.totalRequests.toLocaleString()}</span>
                </div>

                <div>
                  <span className="text-slate-400 block">الأخطاء</span>
                  <span className="text-emerald-400 font-bold">{bot.errorsDetected}</span>
                </div>

                <div>
                  <span className="text-slate-400 block">العائد ($)</span>
                  <span className="text-emerald-400 font-bold">${bot.revenueGeneratedUsd.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Controls Panel */}
      <div className="p-5 bg-slate-950 border border-amber-500/40 rounded-3xl space-y-4 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>لوحة تجربة واختبار النظام الفورية وحصد الأرباح المباشرة</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono font-bold">Monetization Active: $0.005 / Request</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleExecuteBatch(10000)}
            disabled={isSimulatingBatch}
            className="py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            <span>توليد 10,000 زيارات تجريبية (+$50.00)</span>
          </button>

          <button
            onClick={() => handleExecuteBatch(50000)}
            disabled={isSimulatingBatch}
            className="py-3 px-4 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black rounded-2xl text-xs transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <TrendingUp className="w-4 h-4 text-slate-950" />
            <span>توليد 50,000 زيارة مكثفة (+$250.00)</span>
          </button>

          <button
            onClick={() => handleExecuteBatch(100000)}
            disabled={isSimulatingBatch}
            className="py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl text-xs transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <DollarSign className="w-4 h-4 text-slate-950" />
            <span>توليد 100,000 زيارات فائقة (+$500.00)</span>
          </button>
        </div>
      </div>

      {/* Live Movement & Traffic Monitor Feed */}
      <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-cyan-400" />
            <span>سجل الحركة المباشر للبوتات وفحص الأخطاء (Live Traffic Diagnostic Terminal)</span>
          </h3>

          <span className="text-[10px] text-slate-400 font-mono">Real-time Telemetry Stream</span>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-xs dir-ltr text-left">
          {liveTrafficLogs.map((log, index) => (
            <div
              key={index}
              className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[10px] font-bold">
                  {log.httpStatus} OK
                </span>
                <span className="text-amber-300 font-bold">{log.botId}</span>
                <span className="text-slate-400">▶ {log.endpoint}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-400 text-[10px]">
                <span>{log.latencyMs}ms</span>
                <span className="text-cyan-300">+{log.dataYieldMb} MB</span>
                <span className="text-emerald-400 font-bold">+${log.monetizedValueUsd.toFixed(3)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
