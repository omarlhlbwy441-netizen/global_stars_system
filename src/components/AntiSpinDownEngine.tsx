import React, { useState, useEffect } from 'react';
import { KeepAliveConfig } from '../types';
import {
  Zap,
  Power,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Flame,
  ShieldAlert,
  Terminal,
  Activity,
  Cpu
} from 'lucide-react';

interface AntiSpinDownEngineProps {
  onRunKeepAlivePing: () => Promise<void>;
  isPinging: boolean;
  servicesCount: number;
  onlineCount: number;
}

export const AntiSpinDownEngine: React.FC<AntiSpinDownEngineProps> = ({
  onRunKeepAlivePing,
  isPinging,
  servicesCount,
  onlineCount,
}) => {
  const [enabled, setEnabled] = useState(true);
  const [intervalMinutes, setIntervalMinutes] = useState(10); // 10 mins is optimal before Render's 15-min idle cutoff
  const [secondsLeft, setSecondsLeft] = useState(intervalMinutes * 60);
  const [totalPingRuns, setTotalPingRuns] = useState(1);
  const [lastPingTime, setLastPingTime] = useState<Date>(new Date());
  const [copiedScript, setCopiedScript] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  // Timer Countdown logic
  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Trigger Keep Alive Ping automatically
          onRunKeepAlivePing();
          setTotalPingRuns((c) => c + 1);
          setLastPingTime(new Date());
          return intervalMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [enabled, intervalMinutes, onRunKeepAlivePing]);

  // Reset countdown when interval changes
  const handleIntervalChange = (newMins: number) => {
    setIntervalMinutes(newMins);
    setSecondsLeft(newMins * 60);
  };

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const githubActionWorkflow = `name: Render Keep Alive Ping
on:
  schedule:
    # Runs every 10 minutes (prevents Render 15-min spin down)
    - cron: '*/10 * * * *'
  workflow_dispatch:

jobs:
  ping-render:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Render Web Services
        run: |
          urls=(
            "https://dtr-n-fixed-app.onrender.com"
            "https://yasmin-render-app.onrender.com"
            "https://agile-core-app.onrender.com"
            "https://dtr2-render-app.onrender.com"
            "https://dtr-system-gateway.onrender.com"
            "https://wolf-ai-render-app.onrender.com"
            "https://global-stars-system-app.onrender.com"
            "https://al-hadiya-ai-expert.onrender.com"
            "https://dtr1-n.onrender.com"
            "https://dtr-no.onrender.com"
            "https://dtr2.onrender.com"
          )
          for url in "\${urls[@]}"; do
            echo "Pinging $url ..."
            curl -s -m 10 "$url" > /dev/null || true
          done
          echo "All Render services kept alive successfully!"`;

  const handleCopyGithubAction = () => {
    navigator.clipboard.writeText(githubActionWorkflow);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-emerald-800/60 space-y-6 dir-rtl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/50 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> حل مشكلة الخمول البرمجي (Render Anti-Spin-Down Engine)
            </span>
            <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 rounded-full text-xs font-mono">
              Render Free Limit: 15 mins
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
            <span>مُحرّك النبض التلقائي ومنع الخمول (Keep-Alive Heartbeat)</span>
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            تقوم خوادم Render المجانية بالدخول في حالة نوم (Spin Down) بعد 15 دقيقة من عدم الاستخدام. هذا المحرك يصدر إشارات نبض دورية (Pings) لإبقاء جميع الخوادم دافئة وجاهزة للاستجابة السريعة فوراً!
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-3 bg-slate-800/90 p-2 rounded-2xl border border-slate-700/80 shrink-0">
          <span className="text-xs font-medium text-slate-200">المنع التلقائي:</span>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center p-1 ${
              enabled ? 'bg-emerald-500 justify-end' : 'bg-slate-600 justify-start'
            }`}
          >
            <span className="w-4 h-4 bg-white rounded-full shadow-md transition-transform" />
          </button>
          <span className={`text-xs font-bold ${enabled ? 'text-emerald-400' : 'text-slate-400'}`}>
            {enabled ? 'نشط' : 'متوقف'}
          </span>
        </div>
      </div>

      {/* Main Engine Bar & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Next Ping Countdown */}
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-400" /> النبضة القادمة</span>
            <span className="font-mono text-[11px]">{enabled ? 'عد تنازلي' : 'متوقف'}</span>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono tracking-wider">
            {enabled ? formatCountdown(secondsLeft) : '--:--'}
          </div>
          <div className="text-[10px] text-slate-400">
            الدورة كل {intervalMinutes} دقائق (قبل مهلة الـ 15 دقيقة)
          </div>
        </div>

        {/* Interval Selection */}
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-2">
          <span className="text-xs text-slate-400 block font-medium">معدل تكرار النبض (Interval)</span>
          <div className="flex items-center gap-1.5 pt-1">
            {[5, 10, 12].map((m) => (
              <button
                key={m}
                onClick={() => handleIntervalChange(m)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all ${
                  intervalMinutes === m
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {m} دقائق
              </button>
            ))}
          </div>
          <span className="text-[10px] text-slate-400 block">10 دقائق هي القيمة الموصى بها لـ Render</span>
        </div>

        {/* Engine Stats */}
        <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-1.5">
          <span className="text-xs text-slate-400 block font-medium">إحصائيات التشغيل الفوري</span>
          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xl font-bold text-white font-mono">{totalPingRuns} نبضة</span>
            <span className="text-xs text-emerald-400 font-semibold">{onlineCount} / {servicesCount} متصل</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            آخر نبضة: {lastPingTime.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>

        {/* Manual Force Ping Action */}
        <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 space-y-2 flex flex-col justify-between">
          <div>
            <span className="text-xs text-emerald-300 block font-bold">إيقاظ فوري شامل</span>
            <span className="text-[11px] text-slate-300 block">إرسال إشارة إيقاظ سريعة لجميع الخوادم.</span>
          </div>

          <button
            onClick={() => {
              onRunKeepAlivePing();
              setTotalPingRuns((c) => c + 1);
              setLastPingTime(new Date());
              setSecondsLeft(intervalMinutes * 60);
            }}
            disabled={isPinging}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-60"
          >
            <Zap className={`w-4 h-4 text-slate-950 ${isPinging ? 'animate-bounce' : ''}`} />
            <span>{isPinging ? 'جاري الإيقاظ...' : 'إيقاظ وإنعاش الآن (Keep Warm)'}</span>
          </button>
        </div>

      </div>

      {/* Perpetual 24/7 Solution Banner & Modal Trigger */}
      <div className="pt-2 border-t border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-200">
          <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>حل دائم 24/7 دون حاجة لفتح المتصفح:</strong> يمكنك استخدام UptimeRobot مجاناً أو كود GitHub Actions التلقائي.
          </span>
        </div>

        <button
          onClick={() => setShowGuideModal(true)}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-600/50 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>كود الحل الخارجي 24/7 (GitHub Action)</span>
        </button>
      </div>

      {/* Modal for 24/7 Keep Alive Code */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-right">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 space-y-5 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-400" />
                <span>طريقة معالجة خمول Render بشكل دائم (24 ساعة / 7 أيام)</span>
              </h3>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>
                لجعل خوادمك المفتوحة على Render تعمل دون أي تأخير أو خمول، اختر إحدى الطريقتين المجانيتين التاليتين:
              </p>

              {/* Option 1: GitHub Actions */}
              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center justify-between">
                  <span>الخيار الأول: كود GitHub Actions تلقائي مجاني (موصى به)</span>
                  <button
                    onClick={handleCopyGithubAction}
                    className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1"
                  >
                    {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedScript ? 'تم النسخ' : 'نسخ كود الـ Workflow'}</span>
                  </button>
                </h4>
                <p className="text-slate-300">
                  ضع هذا الملف في مستودعك بمسار <code className="bg-slate-950 text-emerald-300 px-1.5 py-0.5 rounded font-mono">.github/workflows/keep-alive.yml</code> وسيعمل تلقائياً كل 10 دقائق لإبقاء الخوادم نشطة.
                </p>

                <pre className="p-3 bg-slate-950 text-emerald-300 rounded-xl font-mono text-[11px] overflow-x-auto text-left dir-ltr max-h-48 border border-slate-800">
                  {githubActionWorkflow}
                </pre>
              </div>

              {/* Option 2: UptimeRobot */}
              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center justify-between">
                  <span>الخيار الثاني: منصات الفحص المجانية (UptimeRobot / Cron-Job)</span>
                  <a
                    href="https://uptimerobot.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs flex items-center gap-1"
                  >
                    <span>فتح UptimeRobot</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </h4>
                <p className="text-slate-300">
                  قم بإنشاء حساب مجاني في <strong className="text-white">UptimeRobot.com</strong> وأضف رابط أي خدمة Render برابط HTTP Monitor كـ Check Interval = 5 دقائق. ستقوم المنصة بإبقاء خادمك دافئاً ويعمل 24/7 دون أي رسوم!
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
