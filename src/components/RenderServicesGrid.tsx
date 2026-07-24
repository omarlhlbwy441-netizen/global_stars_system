import React from 'react';
import { RenderService, HealthCheckResult } from '../types';
import { StatusIndicator } from './StatusIndicator';
import { Server, Database, ExternalLink, RefreshCw, Activity, ShieldCheck, Zap } from 'lucide-react';

export const RENDER_SERVICES: RenderService[] = [
  {
    id: 'dtr-n-fixed-app',
    name: 'dtr-n-fixed-app',
    url: 'https://dtr-n-fixed-app.onrender.com',
    description: 'مربوط بقواعد بيانات PostgreSQL ومستودع dtr-n-fixed مع متغيرات البيئة كاملة.',
    tech: 'Python Web Service',
    isNew: true
  },
  {
    id: 'yasmin-render-app',
    name: 'yasmin-render-app',
    url: 'https://yasmin-render-app.onrender.com',
    description: 'منصة تواصل اجتماعي مع دردشة فورية وآخر الأخبار مربوطة بمستودع yasmin-render.',
    tech: 'Node.js Web Service',
    isNew: true
  },
  {
    id: 'agile-core-app',
    name: 'agile-core-app',
    url: 'https://agile-core-app.onrender.com',
    description: 'محرك الإدارة المرنة والتطوير السريع مربوط بمستودع agile-core-render.',
    tech: 'Python / FastAPI',
    isNew: true
  },
  {
    id: 'dtr2-render-app',
    name: 'dtr2-render-app',
    url: 'https://dtr2-render-app.onrender.com',
    description: 'منصة التحول الرقمي الكاملة مع Prisma ORM ومستودع dtr2-render.',
    tech: 'Next.js / Node.js',
    isNew: true
  },
  {
    id: 'dtr-system-gateway',
    name: 'dtr-system-gateway',
    url: 'https://dtr-system-gateway.onrender.com',
    description: 'بوابة الخدمات المصغرة للنظام مربوطة بدليل gateway ومستودع dtr-system-render.',
    tech: 'Python Gateway',
    isNew: true
  },
  {
    id: 'wolf-ai-render-app',
    name: 'wolf-ai-render-app',
    url: 'https://wolf-ai-render-app.onrender.com',
    description: 'منصة الذكاء الاصطناعي مع اقتصاد الألماس والمحتوى مربوطة بـ wolf-ai-render.',
    tech: 'Node.js / AI',
    isNew: true
  },
  {
    id: 'global-stars-system-app',
    name: 'global-stars-system-app',
    url: 'https://global-stars-system-app.onrender.com',
    description: 'نظام النجوم العالمي والبث المباشر المربوط بـ global_stars_system.',
    tech: 'Python Server',
    isNew: true
  },
  {
    id: 'al-hadiya-ai-expert',
    name: 'al-hadiya-ai-expert',
    url: 'https://al-hadiya-ai-expert.onrender.com',
    description: 'نظام الهدية الخبير للذكاء الاصطناعي مربوط بمستودع Al-Hadiya_AI_Expert.',
    tech: 'Python / AI',
    isNew: true
  },
  {
    id: 'dtr1-n',
    name: 'dtr1-n (رفيق AI)',
    url: 'https://dtr1-n.onrender.com',
    description: 'مساعد الذكاء الاصطناعي "رفيق" المربوط بالنظام البيئي الشامل.',
    tech: 'Python / HTML',
    isNew: false
  },
  {
    id: 'dtr-no',
    name: 'dtr-no',
    url: 'https://dtr-no.onrender.com',
    description: 'نواة الاتصال البرمجي المباشر والمستدام عبر FastAPI.',
    tech: 'Python / FastAPI',
    isNew: false
  },
  {
    id: 'dtr2',
    name: 'dtr2 SaaS Engine',
    url: 'https://dtr2.onrender.com',
    description: 'محرك أتمتة البيئات الافتراضية المخصص وتوزيع الخوادم.',
    tech: 'Python / Django',
    isNew: false
  }
];

interface RenderServicesGridProps {
  healthResults: Record<string, HealthCheckResult>;
  onCheckSingle: (service: RenderService) => Promise<void>;
  onCheckAll: () => Promise<void>;
  isCheckingAll: boolean;
  checkingServiceIds: Set<string>;
}

export const RenderServicesGrid: React.FC<RenderServicesGridProps> = ({
  healthResults,
  onCheckSingle,
  onCheckAll,
  isCheckingAll,
  checkingServiceIds,
}) => {
  const resultsList = Object.values(healthResults) as HealthCheckResult[];
  const onlineCount = resultsList.filter((r) => r.status === 'online').length;
  const offlineCount = resultsList.filter((r) => r.status === 'offline' || r.status === 'degraded').length;
  const totalChecked = resultsList.length;

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6 dir-rtl">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" /> Render Cloud Infrastructure
            </span>
            <span className="text-xs text-gray-400 font-mono">Token: rnd_B3hBi...</span>

            {totalChecked > 0 && (
              <span className="px-2.5 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium font-mono">
                الحالة: {onlineCount} متصل / {offlineCount} غير متاح
              </span>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mt-2">
            مراقبة حالة خدمات وخوادم Render (Live Health Monitoring)
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            فحص مباشر ومستمر لاستجابة الخوادم ووقت الذهاب والإياب (Latency ms) مع إشعارات فورية عند الفشل.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCheckAll}
            disabled={isCheckingAll}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCheckingAll ? 'animate-spin' : ''}`} />
            <span>{isCheckingAll ? 'جاري فحص الكل...' : 'فحص ذكي شامل للكل'}</span>
          </button>

          <a
            href="https://dashboard.render.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-2xl text-xs font-medium transition-all flex items-center gap-2"
          >
            <span>لوحة Render</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {RENDER_SERVICES.map((service) => {
          const result = healthResults[service.id];
          const isSingleChecking = checkingServiceIds.has(service.id);

          return (
            <div
              key={service.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden flex flex-col justify-between ${
                result?.status === 'offline'
                  ? 'bg-rose-50/40 border-rose-200'
                  : result?.status === 'online'
                  ? 'bg-emerald-50/20 border-emerald-200/80'
                  : 'bg-gray-50/70 border-gray-200'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <StatusIndicator
                    result={result}
                    isChecking={isSingleChecking}
                    onCheckNow={() => onCheckSingle(service)}
                  />
                  <span className="text-[11px] font-mono text-gray-400">{service.tech}</span>
                </div>

                <h3 className="font-semibold text-gray-900 text-base">{service.name}</h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between mt-2">
                <a
                  href={service.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-emerald-600 hover:underline font-semibold flex items-center gap-1.5 truncate max-w-[200px]"
                >
                  <span className="truncate">{service.url.replace('https://', '')}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>

                <button
                  onClick={() => onCheckSingle(service)}
                  disabled={isSingleChecking}
                  className="text-[11px] text-gray-500 hover:text-emerald-700 bg-white border border-gray-200 hover:border-emerald-300 px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 flex items-center gap-1 shadow-2xs"
                >
                  <RefreshCw className={`w-3 h-3 ${isSingleChecking ? 'animate-spin' : ''}`} />
                  <span>إعادة فحص</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Database Info Card */}
        <div className="p-5 bg-purple-50/30 border border-purple-200/80 rounded-2xl space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-purple-700 bg-purple-100/80 border border-purple-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Database className="w-3 h-3 text-purple-600" /> PostgreSQL v16
              </span>
              <span className="text-xs font-mono text-gray-400">Database</span>
            </div>
            <h3 className="font-semibold text-gray-900 text-base">dtr-n-db</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              قاعدة بيانات سحابية مفتوحة ومربوطة بالتطبيقات (dtr_n_db_user @ Oregon).
            </p>
          </div>

          <div className="pt-3 border-t border-purple-200/60 flex items-center justify-between text-xs font-mono text-purple-800">
            <span className="flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" /> Active Database
            </span>
            <span className="bg-purple-100/80 px-2 py-0.5 rounded text-[11px]">Port 5432</span>
          </div>
        </div>
      </div>
    </div>
  );
};
