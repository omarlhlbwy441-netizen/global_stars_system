export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  type: 'AI System' | 'SaaS & Render' | 'Social Platform' | 'Core System' | 'Archive & Utility';
  status: string;
  filesCount?: number;
  featured?: boolean;
  highlights: string[];
}

export type HealthStatus = 'idle' | 'checking' | 'online' | 'offline' | 'degraded';

export interface HealthCheckResult {
  serviceId: string;
  serviceName: string;
  url: string;
  status: HealthStatus;
  latencyMs?: number;
  statusCode?: number;
  errorMsg?: string;
  lastCheckedAt?: Date;
}

export interface RenderService {
  id: string;
  name: string;
  url: string;
  description: string;
  tech: string;
  isDatabase?: boolean;
  repoId?: string;
  isNew?: boolean;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'error' | 'warning' | 'success' | 'info';
  serviceId?: string;
  serviceName?: string;
  url?: string;
  timestamp: Date;
}

export interface MonetizationPlan {
  id: string;
  title: string;
  repo: string;
  timeframe: string;
  timeMinutes: number;
  potentialMin: number;
  potentialMax: number;
  potentialLabel: string;
  action: string;
  badge: string;
  category: string;
}

export interface ProfitChartData {
  name: string;
  shortTitle: string;
  minUSD: number;
  maxUSD: number;
  avgUSD: number;
  setupTimeMin: number;
  roiScore: number;
}

export interface KeepAliveConfig {
  enabled: boolean;
  intervalMinutes: number; // e.g. 5 or 10 minutes
  lastPingAt?: Date;
  nextPingAt?: Date;
  pingCount: number;
}

export interface AutoHealingLog {
  id: string;
  timestamp: Date;
  target: string; // e.g., 'yasmin-render-app' or 'wolf-ai-render'
  targetType: 'Render Service' | 'GitHub Repository';
  issueDetected: string;
  actionTaken: string;
  resultStatus: 'fixed' | 'retrying' | 'failed' | 'simulated_redeploy';
  latencyMs?: number;
}

export interface AutoFixConfig {
  autoHealRender: boolean;
  autoHealGithub: boolean;
  autoRedeployOn502: boolean;
  webhookUrl?: string;
  maxRetries: number;
}

export interface SelfEvolutionLog {
  id: string;
  timestamp: Date;
  repoOrService: string;
  evolutionType: 'Auto-Refactor' | 'Performance Optimization' | 'Security Patch' | 'Self-Generated Feature';
  description: string;
  impactScore: string;
  status: 'applied' | 'in_progress' | 'verified';
}

export interface EvolutionConfig {
  autoEvolveCode: boolean;
  autoOptimizePerformance: boolean;
  autoPatchVulnerabilities: boolean;
  evolutionIntervalHours: number;
}

export interface PayoutTransaction {
  id: string;
  timestamp: Date;
  amountUsd: number;
  destination: string;
  status: 'completed' | 'processing' | 'failed';
  txHash: string;
  sourceProject?: string;
}

export interface WalletAccount {
  email: string;
  googlePayId: string;
  walletStatus: 'connected' | 'unlinked' | 'verifying';
  autoPayoutEnabled: boolean;
  minPayoutThreshold: number;
  payoutFrequency: 'instant' | 'daily' | 'weekly';
}

export interface DataAnalyticsYield {
  projectId: string;
  projectName: string;
  dataRequestsCount: number;
  dataMonetizationRateUsd: number; // e.g. $0.004 per request
  renderTrafficMb: number;
  renderTrafficMonetizationUsd: number;
  totalEarningsUsd: number;
  autoSweepStatus: 'auto_swept' | 'pending';
}

export interface RenderMonetizationConfig {
  autoSweepRenderEarnings: boolean;
  autoSweepAnalyticsEarnings: boolean;
  googleWalletDestination: string;
  minSweepThreshold: number; // e.g. $10
  sweepFrequencyHours: number;
}


