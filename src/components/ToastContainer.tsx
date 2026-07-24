import React from 'react';
import { ToastNotification } from '../types';
import { AlertTriangle, RefreshCw, X, CheckCircle, Info, WifiOff } from 'lucide-react';

interface ToastContainerProps {
  toasts: ToastNotification[];
  onDismiss: (id: string) => void;
  onRetry: (serviceId: string) => Promise<void>;
  retryingServiceIds: Set<string>;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  onRetry,
  retryingServiceIds,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex flex-col space-y-3 max-w-md w-full px-4 sm:px-0 pointer-events-none"
      dir="rtl"
    >
      {toasts.map((toast) => {
        const isRetrying = toast.serviceId ? retryingServiceIds.has(toast.serviceId) : false;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all transform animate-in slide-in-from-bottom-5 duration-300 flex flex-col space-y-3 ${
              toast.type === 'error'
                ? 'bg-rose-900/95 text-white border-rose-700/80'
                : toast.type === 'warning'
                ? 'bg-amber-900/95 text-white border-amber-700/80'
                : toast.type === 'success'
                ? 'bg-emerald-900/95 text-white border-emerald-700/80'
                : 'bg-slate-900/95 text-white border-slate-700/80'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-xl bg-white/10 shrink-0 mt-0.5">
                  {toast.type === 'error' ? (
                    <WifiOff className="w-5 h-5 text-rose-300" />
                  ) : toast.type === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-amber-300" />
                  ) : toast.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-emerald-300" />
                  ) : (
                    <Info className="w-5 h-5 text-blue-300" />
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                    {toast.title}
                  </h4>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {toast.message}
                  </p>
                  {toast.url && (
                    <span className="text-[11px] font-mono text-slate-300 block bg-black/20 px-2 py-0.5 rounded w-max mt-1 direction-ltr text-left">
                      {toast.url}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                title="إغلاق התنبيه"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Retry Button if associated with a service */}
            {toast.serviceId && (
              <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                <span className="text-[11px] text-slate-300 font-mono">
                  {new Date(toast.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <button
                  onClick={() => toast.serviceId && onRetry(toast.serviceId)}
                  disabled={isRetrying}
                  className="px-3.5 py-1.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 active:scale-95 disabled:opacity-60"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-800 ${isRetrying ? 'animate-spin' : ''}`} />
                  <span>{isRetrying ? 'جاري الفحص...' : 'إعادة المحاولة (Retry)'}</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
