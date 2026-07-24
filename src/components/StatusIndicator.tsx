import React from 'react';
import { HealthCheckResult } from '../types';
import { RefreshCw, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

interface StatusIndicatorProps {
  result?: HealthCheckResult;
  onCheckNow?: () => void;
  isChecking?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  result,
  onCheckNow,
  isChecking = false,
}) => {
  const status = result?.status || 'idle';
  const latency = result?.latencyMs;
  const statusCode = result?.statusCode;

  if (isChecking || status === 'checking') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-xs font-medium">
        <RefreshCw className="w-3 h-3 animate-spin text-amber-600" />
        <span>جاري الفحص...</span>
      </div>
    );
  }

  if (status === 'online') {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200/80 text-emerald-700 rounded-full text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
          <span>متصل</span>
          {latency !== undefined && (
            <span className="font-mono text-[11px] bg-emerald-100/80 text-emerald-800 px-1.5 py-0.2 rounded-md dir-ltr">
              {latency}ms
            </span>
          )}
        </span>

        {onCheckNow && (
          <button
            onClick={onCheckNow}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            title="إعادة الفحص الآن"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  if (status === 'offline' || status === 'degraded') {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 rounded-full text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
          <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
          <span>غير متاح</span>
          {statusCode && (
            <span className="font-mono text-[11px] bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-md dir-ltr">
              {statusCode}
            </span>
          )}
          {latency !== undefined && (
            <span className="font-mono text-[11px] text-rose-600 dir-ltr">
              ({latency}ms)
            </span>
          )}
        </span>

        {onCheckNow && (
          <button
            onClick={onCheckNow}
            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-100/60 rounded-md transition-colors"
            title="إعادة محاولة الفحص"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-full text-xs font-medium">
        <Activity className="w-3 h-3 text-gray-400" />
        <span>لم يُفحص بعد</span>
      </span>
      {onCheckNow && (
        <button
          onClick={onCheckNow}
          className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          title="فحص الاتصال"
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
