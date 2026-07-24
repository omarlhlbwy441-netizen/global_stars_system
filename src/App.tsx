import React, { useState, useEffect, useCallback } from 'react';
import {
  Folder,
  FileCode,
  ShieldCheck,
  Search,
  ExternalLink,
  Copy,
  Check,
  Database,
  Sparkles,
  Github,
  Server,
  Star,
  Zap,
  Activity,
  Code,
  RefreshCw,
  BellRing
} from 'lucide-react';
import {
  Repository,
  RenderService,
  HealthCheckResult,
  ToastNotification,
  MonetizationPlan
} from './types';
import { checkServiceHealth } from './utils/healthCheck';
import { RenderServicesGrid, RENDER_SERVICES } from './components/RenderServicesGrid';
import { ToastContainer } from './components/ToastContainer';
import { ProfitCharts } from './components/ProfitCharts';
import { AntiSpinDownEngine } from './components/AntiSpinDownEngine';
import { AutoHealingBot } from './components/AutoHealingBot';
import { SelfEvolutionEngine } from './components/SelfEvolutionEngine';
import { GoogleWalletPayoutSystem } from './components/GoogleWalletPayoutSystem';
import { DataAnalyticsMonetizationEngine } from './components/DataAnalyticsMonetizationEngine';
import { PaymentGatewayMerchantSystem } from './components/PaymentGatewayMerchantSystem';
import { SyntheticBotTrafficEngine } from './components/SyntheticBotTrafficEngine';

const ALL_REPOSITORIES: Repository[] = [
  {
    id: 'dtr-n-fixed',
    name: 'dtr-n-fixed',
    description: 'نظام ذكاء اصطناعي متطور ومعدّل للانتشار التلقائي الذاتي على خوادم Render، يحتوي على قاعدة بيانات ومحرك هجرة تلقائي.',
    language: 'Python / HTML',
    type: 'AI System',
    status: 'جاهز ويعمل (100%)',
    filesCount: 28,
    featured: true,
    highlights: ['database.py (37KB)', 'auto_migration.py (27KB)', 'app.html (41KB)', 'session-dashboard.html']
  },
  {
    id: 'wolf-ai-render',
    name: 'wolf-ai-render',
    description: 'نواة الذكاء الاصطناعي الشاملة v8.0 تضم 10 خبراء في الذكاء الاصطناعي، واجهة محادثة (Chat Canvas)، واقتصاد الألماس المدمج.',
    language: 'TypeScript / React',
    type: 'AI System',
    status: 'مكتمل بنسبة 100%',
    filesCount: 45,
    featured: true,
    highlights: ['10 AI Experts Engine', 'Diamond Economy System', 'Interactive Chat Canvas', 'Render Deployment Setup']
  },
  {
    id: 'agile-core-render',
    name: 'agile-core-render',
    description: 'منظومة إدارة المشاهد والمؤسسات المتطورة تحتوي على 51 مكونًا برمجياً و 21 صفحة تفاعلية جاهزة للبيئات الإنتاجية.',
    language: 'Python / Full Stack',
    type: 'Core System',
    status: 'مكتمل بنسبة 100%',
    filesCount: 72,
    featured: true,
    highlights: ['51 Custom Components', '21 Full App Pages', 'Enterprise Dashboard', 'REST API Architecture']
  },
  {
    id: 'dtr-system-render',
    name: 'dtr-system-render',
    description: 'منصة التحول الرقمي الشاملة المزودة بـ 111 مكونًا برمجياً و 77 مسار API جاهز للتشغيل والربط المباشر.',
    language: 'Python / Node.js',
    type: 'Core System',
    status: 'مكتمل بنسبة 100%',
    filesCount: 188,
    featured: true,
    highlights: ['111 UI Components', '77 API Endpoints', 'Digital Transformation Suite', 'Microservices Framework']
  },
  {
    id: 'dtr2-render',
    name: 'dtr2-render',
    description: 'محرّك SaaS للأتمتة والبيئات التلقائية المخصصة لتجهيز وتدشين الخوادم وتعديل إعدادات البيئات تلقائياً.',
    language: 'TypeScript',
    type: 'SaaS & Render',
    status: 'مكتمل بنسبة 100%',
    filesCount: 38,
    highlights: ['Automated Server Provisioning', 'Environment Configurator', 'Container Automation', 'CI/CD Pipeline']
  },
  {
    id: 'yasmin-render',
    name: 'yasmin-render',
    description: 'منصة تواصل اجتماعي حديثة ومتكاملة v3.0 مع غرف محادثة فورية، آخر الأخبار (Feed)، وتصميم سريع للتفاعل.',
    language: 'JavaScript / Web',
    type: 'Social Platform',
    status: 'مكتمل بنسبة 100%',
    filesCount: 24,
    highlights: ['Real-time Chat Engine', 'Dynamic Feed System', 'User Profile Engine', 'Media Storage Handler']
  },
  {
    id: 'dtr1-n',
    name: 'dtr1-n',
    description: 'منظومة "رفيق" (Rafeeq) - المساعد الرقمي الذكي مع أقوى نواة برمجية للنظام البيئي الرقمي الشامل.',
    language: 'HTML / JS',
    type: 'AI System',
    status: 'مكتمل وتطوير مستمر',
    filesCount: 19,
    highlights: ['Rafeeq AI Companion', 'Ecosystem Integration', 'Offline Ready Canvas', 'Arabic NLP Interface']
  },
  {
    id: 'hm-ya',
    name: 'hm-ya',
    description: 'شبكة تواصل اجتماعي لامركزية متطورة معتمدة على تقنيات التشفير الحديثة وبنية حماية متقدمة.',
    language: 'TypeScript',
    type: 'Social Platform',
    status: 'نشط',
    filesCount: 32,
    highlights: ['Decentralized Protocols', 'Encrypted Messaging', 'P2P Syncing', 'Modern Responsive UI']
  },
  {
    id: 'design',
    name: 'design',
    description: 'منصة اكتشاف اجتماعي بصرية تعتمد على العرض المرئي، تحليلات الذكاء الاصطناعي، ونظام الإعلانات المدمجة.',
    language: 'TypeScript / React',
    type: 'Social Platform',
    status: 'نشط',
    filesCount: 29,
    highlights: ['Visual-first Feed', 'AI Analytics Hub', 'Native Ads Engine', 'Content Recommendation']
  },
  {
    id: 'global_stars_system',
    name: 'global_stars_system',
    description: 'النواة الذهبية المطلقة لنظام النجوم العالمي، مجهز بالأتمتة الكاملة عبر واجهات البرمجة API.',
    language: 'Python',
    type: 'Core System',
    status: 'جاهز للإطلاق',
    filesCount: 15,
    highlights: ['Automated Core API', 'Stars Allocation System', 'Global Ranking Engine', 'Webhook Integration']
  },
  {
    id: 'dtr-original-render',
    name: 'dtr-original-render',
    description: 'النسخة الأصلية لثورة التحول الرقمي (DTR Original) وتحتوي على أكثر من 133 ملف بايثون متكامل.',
    language: 'TypeScript / Python',
    type: 'Core System',
    status: 'مكتمل بنسبة 100%',
    filesCount: 133,
    highlights: ['133 Python Core Files', 'Legacy DTR Architecture', 'Full Transformation Engine', 'Enterprise Security']
  },
  {
    id: 'Sanad',
    name: 'Sanad',
    description: 'نواة سند الرقمية المخصصة لإدارة العمليات التلقائية وتقديم الخدمات عبر بروتوكولات API المباشرة.',
    language: 'HTML / JS',
    type: 'Core System',
    status: 'نشط',
    filesCount: 12,
    highlights: ['Sanad Core Engine', 'API Integration', 'Service Portal', 'Fast Lightweight UI']
  },
  {
    id: 'Al-Hadiya_AI_Expert',
    name: 'Al-Hadiya_AI_Expert',
    description: 'مشروع خبير الذكاء الاصطناعي المخصص لتحليل واستخراج التوصيات الذكية والحلول المخصصة.',
    language: 'Python',
    type: 'AI System',
    status: 'تحت التطوير',
    filesCount: 10,
    highlights: ['Specialized AI Model', 'Expert Knowledge Graph', 'Data Processor', 'Prompt Pipeline']
  },
  {
    id: 'al-theeb1',
    name: 'al-theeb1',
    description: 'نظام الذئب v1 للأتمتة السريعة والمراقبة الفورية للخدمات والخوادم.',
    language: 'Python',
    type: 'Core System',
    status: 'مكتمل',
    filesCount: 8,
    highlights: ['System Monitor', 'Automated Bot', 'Fast Python Kernel', 'Alert Handler']
  },
  {
    id: 'Omar',
    name: 'Omar',
    description: 'مستودع تجارب وتطوير النماذج الأولية والمحركات المستقلة.',
    language: 'Python',
    type: 'Archive & Utility',
    status: 'أرشيف شخصي',
    filesCount: 6,
    highlights: ['Experimental Scripts', 'Utility Tools', 'Fast Testing Environment']
  },
  {
    id: 'dtr_archive',
    name: 'dtr_archive',
    description: 'أرشيف شامل لنسخ منصة DTR قبل عملية الانتقال إلى إمبراطورية التطبيق الفائق (Super App Empire).',
    language: 'Multi-language',
    type: 'Archive & Utility',
    status: 'مؤرّخ',
    filesCount: 95,
    highlights: ['Pre-Empire Backup', 'Historical Codebase', 'Reference Modules']
  },
  {
    id: 'NEW_CLEAN_REPO',
    name: 'NEW_CLEAN_REPO',
    description: 'مستودع الحساب النظيف لتحليل البيانات وتدريب النماذج عبر مفكرات Jupyter Notebook.',
    language: 'Jupyter Notebook',
    type: 'Archive & Utility',
    status: 'نشط',
    filesCount: 5,
    highlights: ['Data Analysis Notebooks', 'Clean Baseline Environment', 'Model Prototyping']
  }
];

const MONETIZATION_PLANS: MonetizationPlan[] = [
  {
    id: 'b2b-saas',
    title: '1. بيع منصات جاهزة للشركات (B2B SaaS / White-Label)',
    repo: 'wolf-ai-render / agile-core-render',
    timeframe: '30 - 45 دقيقة',
    timeMinutes: 35,
    potentialMin: 300,
    potentialMax: 1500,
    potentialLabel: '$300 - $1,500 للعميل',
    action: 'قم بنشر أحد المستودعات المكتملة (مثل wolf-ai أو agile-core) على خادم Render أو Cloud Run مجاناً خلال 10 دقائق، ثم اعرض المنصة كـ "نظام إدارة ذكاء اصطناعي مخصص" على أصحاب الأعمال والشركات الصغيرة.',
    badge: 'الأسرع والأعلى ربحاً',
    category: 'Enterprise'
  },
  {
    id: 'freelance-setup',
    title: '2. تقديم خدمات التركيب الفوري على منصات الحرية (Freelance Gigs)',
    repo: 'dtr-system-render / dtr2-render',
    timeframe: '15 - 30 دقيقة',
    timeMinutes: 20,
    potentialMin: 50,
    potentialMax: 200,
    potentialLabel: '$50 - $200 لكل خدمة',
    action: 'أنشئ خدمة سريعة على Upwork أو Fiverr أو الكفيل/خمسات بعنوان "سأقوم بتركيب وتدشين منصة تحول رقمي متكاملة بـ 111 المكون خلال ساعة". لديك الأكواد جاهزة 100%.',
    badge: 'طلب مباشر مرتفع',
    category: 'Services'
  },
  {
    id: 'marketplace-script',
    title: '3. إعادة بيع القوالب والسكريبتات (Script Marketplace)',
    repo: 'yasmin-render / dtr1-n',
    timeframe: '45 دقيقة',
    timeMinutes: 45,
    potentialMin: 20,
    potentialMax: 50,
    potentialLabel: '$20 - $50 مبيعات متكررة',
    action: 'رفع مشروع yasmin-render (منصة شبكة اجتماعية مع شات مباشر) أو dtr1-n على منصات مثل Gumroad أو BuyMeACoffee أو CodeCanyon كسكريبت كامل مخصص للبيع الفوري.',
    badge: 'دخل منفعل متكرر',
    category: 'Digital Product'
  },
  {
    id: 'saas-subscriptions',
    title: '4. تفعيل الاشتراكات المدفوعة والبوابات المباشرة (SaaS Monetization)',
    repo: 'wolf-ai-render (Diamond Economy)',
    timeframe: '60 دقيقة',
    timeMinutes: 60,
    potentialMin: 10,
    potentialMax: 99,
    potentialLabel: '$10 - $99/شهرياً لكل مشترك',
    action: 'ربط بوابة Stripe أو PayPal بمشروع wolf-ai-render المفعل به نظام الألماس (Diamond Economy)، واستقبال اشتراكات حقيقية فورية من المستخدمين الراغبين بإنشاء محتوى ذكي.',
    badge: 'اشتراكات دورية',
    category: 'Subscription'
  }
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [activeRepo, setActiveRepo] = useState<Repository | null>(ALL_REPOSITORIES[0]);

  // Health checking states
  const [healthResults, setHealthResults] = useState<Record<string, HealthCheckResult>>({});
  const [checkingServiceIds, setCheckingServiceIds] = useState<Set<string>>(new Set());
  const [isCheckingAll, setIsCheckingAll] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const owner = 'omarlhlbwy441-netizen';

  const handleCopyToken = () => {
    navigator.clipboard.writeText('github_pat_token_configured_in_render');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDismissToast = (toastId: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  };

  // Single service health check
  const checkSingleService = useCallback(async (service: RenderService) => {
    setCheckingServiceIds((prev) => new Set(prev).add(service.id));

    const result = await checkServiceHealth(service.id, service.name, service.url);

    setHealthResults((prev) => ({
      ...prev,
      [service.id]: result
    }));

    setCheckingServiceIds((prev) => {
      const next = new Set(prev);
      next.delete(service.id);
      return next;
    });

    // Handle toast creation or updating
    if (result.status === 'offline' || result.status === 'degraded') {
      const newToast: ToastNotification = {
        id: `toast-${service.id}-${Date.now()}`,
        title: `تنبيه: تعذر الاتصال بـ ${service.name}`,
        message: result.errorMsg || `فشل الاتصال برابط الخدمة (${result.url})`,
        type: 'error',
        serviceId: service.id,
        serviceName: service.name,
        url: service.url,
        timestamp: new Date()
      };

      setToasts((prev) => {
        // Remove existing toast for same service if any
        const filtered = prev.filter((t) => t.serviceId !== service.id);
        return [newToast, ...filtered];
      });
    } else if (result.status === 'online') {
      // If service is online, dismiss any existing error toast for this service
      setToasts((prev) => prev.filter((t) => t.serviceId !== service.id));
    }

    return result;
  }, []);

  // Check all services health
  const runHealthCheckAll = useCallback(async () => {
    setIsCheckingAll(true);
    const checks = RENDER_SERVICES.map((s) => checkSingleService(s));
    await Promise.all(checks);
    setIsCheckingAll(false);
  }, [checkSingleService]);

  // Run initial health check on component mount
  useEffect(() => {
    runHealthCheckAll();
  }, [runHealthCheckAll]);

  // Retry from Toast notification
  const handleRetryFromToast = async (serviceId: string) => {
    const service = RENDER_SERVICES.find((s) => s.id === serviceId);
    if (!service) return;

    const result = await checkSingleService(service);

    if (result.status === 'online') {
      // Create a brief success toast
      const successToast: ToastNotification = {
        id: `success-${serviceId}-${Date.now()}`,
        title: `تم الاتصال بنجاح (${service.name})`,
        message: `الخادم متصل ويعمل بسرعة استجابة ${result.latencyMs}ms.`,
        type: 'success',
        timestamp: new Date()
      };
      setToasts((prev) => [successToast, ...prev]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== successToast.id));
      }, 4000);
    }
  };

  const filteredRepos = ALL_REPOSITORIES.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(search.toLowerCase()) ||
      repo.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || repo.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getTypeBadge = (type: Repository['type']) => {
    switch (type) {
      case 'AI System':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Core System':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Social Platform':
        return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'SaaS & Render':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#1a1a1a] p-4 md:p-8 font-sans relative" dir="rtl">
      
      {/* Toast Notifications Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
        onRetry={handleRetryFromToast}
        retryingServiceIds={checkingServiceIds}
      />

      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Main Header / Banner */}
        <header className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50/50 rounded-full blur-3xl -z-0 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 space-x-reverse flex-wrap gap-2">
                <span className="px-3.5 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> حساب موثّق بالكامل
                </span>
                <span className="px-3.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-mono rounded-full flex items-center gap-1">
                  <Github className="w-3.5 h-3.5" /> {owner}
                </span>
                <span className="px-3.5 py-1 bg-purple-50 border border-purple-100 text-purple-700 text-xs font-semibold rounded-full flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> 17 مستودعاً برمجياً
                </span>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse pt-1">
                <div className="w-12 h-12 bg-emerald-100/60 rounded-2xl flex items-center justify-center text-emerald-800 font-bold text-xl border border-emerald-200">
                  OH
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900">
                    مركز المستودعات والأنظمة الرقمية <span className="font-semibold">({owner})</span>
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    استعراض تفصيلي وشامل لكافة برمجيات التحول الرقمي، أنظمة الذكاء الاصطناعي، والمنصات التفاعلية المربوطة بمفتاح GitHub الخفي.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyToken}
                className="px-4 py-2.5 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-2xl text-xs font-medium transition-all flex items-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                {copied ? 'تم نسخ الرمز المميز' : 'نسخ Token المباشر'}
              </button>

              <a
                href={`https://github.com/${owner}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#1a1a1a] text-white hover:bg-gray-800 rounded-2xl text-xs font-medium transition-all shadow-md flex items-center gap-2"
              >
                <span>الملف الشخصي على GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">إجمالي المستودعات</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-semibold text-gray-900">17</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">جاهزة ومتاحة</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">أنظمة الذكاء الاصطناعي</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-semibold text-purple-600">5</span>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">AI Engines</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">أنظمة التحول الرقمي</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-semibold text-blue-600">6</span>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Core Systems</span>
            </div>
          </div>

          <div className="p-5 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">المنصات والخدمات</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-semibold text-orange-600">6</span>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">Platforms & SaaS</span>
            </div>
          </div>
        </div>

        {/* Repositories Explorer & Filters */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث في أسماء وتفاصيل المستودعات الـ 17..."
                className="w-full pr-11 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'الكل (17)' },
                { id: 'AI System', label: 'ذكاء اصطناعي' },
                { id: 'Core System', label: 'أنظمة أصلية' },
                { id: 'Social Platform', label: 'منصات تواصل' },
                { id: 'SaaS & Render', label: 'سحابية SaaS' },
                { id: 'Archive & Utility', label: 'أرشيف وأدوات' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedType === t.id
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Repository Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                onClick={() => setActiveRepo(repo)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 hover:shadow-md ${
                  activeRepo?.id === repo.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-50/20'
                    : 'border-gray-100 bg-white hover:border-gray-200'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 border rounded-full text-[11px] font-semibold ${getTypeBadge(repo.type)}`}>
                      {repo.type}
                    </span>
                    {repo.featured && (
                      <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[10px] font-semibold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> مميز
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                    <span>{repo.name}</span>
                  </h3>

                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-gray-100/80">
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-1.5">
                    {repo.highlights.slice(0, 2).map((h, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-gray-50 border border-gray-100 rounded-md text-[10px] font-mono text-gray-600">
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-gray-400" /> {repo.language}
                    </span>
                    <span className="text-emerald-600 font-medium">{repo.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Detailed Modal / Inspection Drawer */}
        {activeRepo && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-0.5 border rounded-full text-xs font-semibold ${getTypeBadge(activeRepo.type)}`}>
                    {activeRepo.type}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">ID: {activeRepo.id}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">{activeRepo.name}</h2>
                <p className="text-sm text-gray-500 mt-1">{activeRepo.description}</p>
              </div>

              <a
                href={`https://github.com/${owner}/${activeRepo.id}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-[#1a1a1a] text-white rounded-2xl text-xs font-medium hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>استعراض على GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Detailed Cards for Selected Repo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-gray-50/60 border border-gray-100 rounded-2xl space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">اللغة الرئيسية والتقنيات</span>
                <span className="text-base font-semibold text-gray-800 font-mono">{activeRepo.language}</span>
                <p className="text-xs text-gray-500">تم تكوين وتطوير الأكواد باستخدام أحدث أطر العمل المستقرة.</p>
              </div>

              <div className="p-5 bg-gray-50/60 border border-gray-100 rounded-2xl space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">حالة النشر والتشغيل</span>
                <span className="text-base font-semibold text-emerald-600">{activeRepo.status}</span>
                <p className="text-xs text-gray-500">جاهز للتكامل مع Render وحاويات Docker وسحابة Google.</p>
              </div>

              <div className="p-5 bg-gray-50/60 border border-gray-100 rounded-2xl space-y-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">عدد الملفات والمكونات</span>
                <span className="text-base font-semibold text-purple-600">{activeRepo.filesCount || '~30'} عنصر برمجياً</span>
                <p className="text-xs text-gray-500">يتضمن بروتوكولات الربط المباشر وقواعد البيانات.</p>
              </div>
            </div>

            {/* Highlights List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" /> أهم الملفات والمكونات في هذا المستودع:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {activeRepo.highlights.map((h, idx) => (
                  <div key={idx} className="p-3.5 bg-white border border-gray-200 rounded-xl text-xs font-mono text-gray-800 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Autonomous Auto-Healing & Auto-Fix Bot Component */}
        <AutoHealingBot
          healthResults={healthResults}
          services={RENDER_SERVICES}
          repositories={ALL_REPOSITORIES}
          onTriggerRecheckService={checkSingleService}
        />

        {/* Official Payment Gateway & Google Pay Merchant Integration */}
        <PaymentGatewayMerchantSystem
          userEmail="omarlhlbwy441@gmail.com"
        />

        {/* Synthetic Bot Fleet, Error Diagnostics & Traffic Monetization Engine */}
        <SyntheticBotTrafficEngine
          userEmail="omarlhlbwy441@gmail.com"
        />

        {/* Data Analytics Monetization & Render Deployment Revenue Sweep Engine */}
        <DataAnalyticsMonetizationEngine
          userEmail="omarlhlbwy441@gmail.com"
          services={RENDER_SERVICES}
          repositories={ALL_REPOSITORIES}
        />

        {/* Financial Google Wallet Payout System */}
        <GoogleWalletPayoutSystem
          userEmail="omarlhlbwy441@gmail.com"
          services={RENDER_SERVICES}
        />

        {/* Self-Evolution Codebase Engine */}
        <SelfEvolutionEngine
          repositories={ALL_REPOSITORIES}
          services={RENDER_SERVICES}
        />

        {/* Anti-Spin-Down Keep Alive Heartbeat Engine */}
        <AntiSpinDownEngine
          onRunKeepAlivePing={runHealthCheckAll}
          isPinging={isCheckingAll}
          servicesCount={RENDER_SERVICES.length}
          onlineCount={(Object.values(healthResults) as HealthCheckResult[]).filter((r) => r.status === 'online').length}
        />

        {/* Live Render Deployments Grid with Health Monitoring & Status Indicators */}
        <RenderServicesGrid
          healthResults={healthResults}
          onCheckSingle={checkSingleService}
          onCheckAll={runHealthCheckAll}
          isCheckingAll={isCheckingAll}
          checkingServiceIds={checkingServiceIds}
        />

        {/* 1-Hour Monetization Execution Plan Section + Recharts Analytics */}
        <div className="bg-gradient-to-br from-emerald-900 to-gray-900 text-white rounded-3xl p-6 md:p-8 shadow-xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/60 pb-6">
            <div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold flex items-center gap-1.5 w-max">
                <Zap className="w-3.5 h-3.5 text-emerald-400" /> دليل وتوقعات الربح الفوري المكتمل
              </span>
              <h2 className="text-2xl font-bold mt-2 text-white">خطط الربح والتحليلات المادية المتوقعة</h2>
              <p className="text-sm text-emerald-200/80 mt-1">
                جميع هذه المشاريع مكتملة بنسبة 100% وجاهزة للبيئات الإنتاجية. إليك أسرع 4 طرق لتحويلها إلى عائد مالي مباشر:
              </p>
            </div>
            <div className="text-left font-mono">
              <span className="text-xs text-emerald-300 uppercase block">العائد التقديري الإجمالي</span>
              <span className="text-2xl font-extrabold text-emerald-400">$100 - $1,500+</span>
            </div>
          </div>

          {/* Recharts Analytics Module */}
          <ProfitCharts plans={MONETIZATION_PLANS} />

          {/* Cards Grid for Monetization Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
            {MONETIZATION_PLANS.map((plan) => (
              <div key={plan.id} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[11px] font-semibold">
                    {plan.badge}
                  </span>
                  <span className="text-xs font-mono text-emerald-300 flex items-center gap-1">
                    <Activity className="w-3 h-3" /> {plan.timeframe}
                  </span>
                </div>

                <h3 className="font-semibold text-base text-white">{plan.title}</h3>

                <p className="text-xs text-gray-300 leading-relaxed">
                  {plan.action}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-gray-400">المستودع المرشح: <strong className="text-emerald-300">{plan.repo}</strong></span>
                  <span className="text-emerald-400 font-bold">{plan.potentialLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 py-6 tracking-widest uppercase border-t border-gray-100">
          نظام الإدارة والأنظمة الذكية &copy; ٢٠٢٦ - جميع مستودعات {owner} متاحة ومربوطة بسحابة Render.
        </footer>

      </div>
    </div>
  );
}
