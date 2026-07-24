import { HealthCheckResult, HealthStatus } from '../types';

export async function checkServiceHealth(
  serviceId: string,
  serviceName: string,
  url: string,
  timeoutMs = 8000
): Promise<HealthCheckResult> {
  const startTime = performance.now();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Attempt standard CORS fetch first
    const response = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    clearTimeout(timeoutId);
    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    if (response.ok || response.status === 404) {
      // 200-399 or 404 means server is up and serving routes
      return {
        serviceId,
        serviceName,
        url,
        status: 'online',
        latencyMs,
        statusCode: response.status,
        lastCheckedAt: new Date()
      };
    } else if (response.status >= 500) {
      // 500, 502, 503, 504 Bad Gateway / Server error
      return {
        serviceId,
        serviceName,
        url,
        status: 'offline',
        latencyMs,
        statusCode: response.status,
        errorMsg: `خطأ الخادم (رمز ${response.status}) - ${response.statusText || 'Bad Gateway'}`,
        lastCheckedAt: new Date()
      };
    } else {
      return {
        serviceId,
        serviceName,
        url,
        status: 'degraded',
        latencyMs,
        statusCode: response.status,
        errorMsg: `استجابة غريبة (رمز ${response.status})`,
        lastCheckedAt: new Date()
      };
    }
  } catch (err: unknown) {
    clearTimeout(timeoutId);

    // Try fallback mode: 'no-cors' if it was a CORS or network restriction
    try {
      const fallbackStartTime = performance.now();
      const fallbackController = new AbortController();
      const fallbackTimeout = setTimeout(() => fallbackController.abort(), 4000);

      const opaqueResponse = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: fallbackController.signal
      });

      clearTimeout(fallbackTimeout);
      const fallbackEndTime = performance.now();
      const latencyMs = Math.round(fallbackEndTime - fallbackStartTime);

      // Opaque response received means TCP/TLS connected successfully
      return {
        serviceId,
        serviceName,
        url,
        status: 'online',
        latencyMs,
        statusCode: 200,
        lastCheckedAt: new Date()
      };
    } catch {
      const endTime = performance.now();
      const latencyMs = Math.round(endTime - startTime);
      const isAbort = err instanceof Error && err.name === 'AbortError';

      return {
        serviceId,
        serviceName,
        url,
        status: 'offline',
        latencyMs: latencyMs > timeoutMs ? timeoutMs : latencyMs,
        errorMsg: isAbort ? 'انتهت مهلة الاتصال (Timeout)' : 'تعذر الاتصال بالخادم (Network Error)',
        lastCheckedAt: new Date()
      };
    }
  }
}
