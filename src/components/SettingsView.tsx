import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Lock,
  RefreshCw,
  Cpu,
  ShieldCheck,
  Sun,
  Moon,
  Monitor,
  Palette,
  Check
} from 'lucide-react';
import { AIStatus, aiService } from '../services/aiService';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface SettingsViewProps {
  aiStatus: AIStatus;
  onRefreshStatus: () => void;
  onOpenAIModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  aiStatus,
  onRefreshStatus,
}) => {
  const { theme, isDark, setTheme } = useTheme();
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; text: string } | null>(null);

  const handleTestKey = async () => {
    setIsTesting(true);
    setTestResult(null);

    const res = await aiService.testKey();
    setIsTesting(false);

    if (res.success) {
      setTestResult({ success: true, text: res.message || '✓ Google Gemini engine active and verified.' });
      onRefreshStatus();
    } else {
      setTestResult({ success: false, text: res.error || '⚠ Connection error: Unable to connect to Google Gemini service.' });
    }
  };

  const themeOptions: {
    id: ThemeMode;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    previewBg: string;
    previewBorder: string;
  }[] = [
    {
      id: 'light',
      title: 'Light Mode',
      description: 'Clean, high-contrast document paper style tailored for daylight procurement sessions.',
      icon: Sun,
      previewBg: 'bg-slate-100 text-slate-800',
      previewBorder: 'border-slate-300',
    },
    {
      id: 'dark',
      title: 'Dark Mode',
      description: 'Deep midnight slate palette engineered to reduce visual fatigue during comprehensive audits.',
      icon: Moon,
      previewBg: 'bg-slate-900 text-slate-100',
      previewBorder: 'border-slate-700',
    },
    {
      id: 'system',
      title: 'System Automatic',
      description: 'Automatically synchronizes with your device operating system display preferences.',
      icon: Monitor,
      previewBg: 'bg-gradient-to-r from-slate-200 to-slate-900 text-slate-700',
      previewBorder: 'border-slate-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs transition-colors">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-900 dark:text-blue-400 mb-1">
          <Shield className="w-4 h-4 text-blue-900 dark:text-blue-400" />
          <span>System Settings</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Platform Settings</h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Interface display themes, AI engine integration, secure server-side proxy, and procurement audit parameters.
        </p>
      </div>

      {/* Appearance & Display Theme Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-5 transition-colors">
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="w-9 h-9 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-900 dark:text-blue-300">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Appearance & Theme</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Customize the visual display theme for tender evaluations, comparisons, and submission forms.
            </p>
          </div>
        </div>

        {/* Theme Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={`relative p-4 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-blue-700 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-700/20 dark:ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Active checkmark */}
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center text-[11px] shadow-xs">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-md ${
                    isSelected ? 'bg-blue-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {opt.title}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {opt.description}
                </p>

                {/* Visual miniature mockup */}
                <div className={`h-12 rounded border ${opt.previewBorder} ${opt.previewBg} p-2 flex flex-col justify-between overflow-hidden shadow-2xs`}>
                  <div className="flex items-center justify-between">
                    <div className="h-1.5 w-12 rounded bg-current opacity-40" />
                    <div className="h-1.5 w-4 rounded-full bg-blue-500" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-xs bg-current opacity-50" />
                    <div className="h-1.5 w-16 rounded bg-current opacity-30" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-3 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-900 dark:text-slate-200">Current Active Display:</span>
            <span className="capitalize text-blue-900 dark:text-blue-400 font-bold">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            {theme === 'system' && <span className="text-[11px] text-slate-500 dark:text-slate-400">(Synced with Operating System)</span>}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Persists across browser sessions</span>
        </div>
      </div>

      {/* AI Configuration Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-5 shadow-xs space-y-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-900 dark:text-blue-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Google Gemini AI Engine</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                AI Studio server-side integration powering tender synthesis & due diligence.
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded text-xs font-bold border bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ● Connected & Integrated
            </span>
          </div>
        </div>

        {/* Engine Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">AI Provider</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <Sparkles className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>Google Gemini</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Direct backend integration via @google/genai SDK</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Active Model</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <Cpu className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
              <span className="font-mono">{aiStatus.model || 'gemini-3.8-flash'}</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Multi-stage due diligence and tender synthesis</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">Key Security</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-emerald-800 dark:text-emerald-300 text-sm">
              <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>AI Studio Secrets (Hidden)</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Never transmitted to browser DevTools or client JS</p>
          </div>
        </div>

        {/* Diagnostics Button */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleTestKey}
            disabled={isTesting}
            className="px-3.5 py-2 rounded-md text-xs font-semibold bg-blue-900 dark:bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-600 text-white transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            <span>{isTesting ? 'Testing Engine Connection...' : 'Run Engine Health Check'}</span>
          </button>
        </div>

        {/* Feedback messages */}
        {testResult && (
          <div
            className={`p-3 rounded-md border text-xs font-semibold flex items-center gap-2 ${
              testResult.success
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            )}
            <span>{testResult.text}</span>
          </div>
        )}

        {/* Security & Audit Disclosures */}
        <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 space-y-2">
          <span className="font-semibold text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-900 dark:text-blue-400" />
            ProcureAI Security & Governance Architecture
          </span>
          <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-600 dark:text-slate-400">
            <li><strong>Zero Client Exposure:</strong> All Gemini API calls execute strictly on the Node/Express backend server.</li>
            <li><strong>Source Traceability:</strong> All outputs are tagged with source classifications (Bidder-provided vs. Statutory Registry vs. AI Inference).</li>
            <li><strong>Human-in-the-Loop Authority:</strong> Tender officers maintain non-delegable authority over final scoring, disqualification, and contract award.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

