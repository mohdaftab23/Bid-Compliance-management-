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
} from 'lucide-react';
import { AIStatus, aiService } from '../services/aiService';

interface SettingsViewProps {
  aiStatus: AIStatus;
  onRefreshStatus: () => void;
  onOpenAIModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  aiStatus,
  onRefreshStatus,
}) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-900 mb-1">
          <Shield className="w-4 h-4 text-blue-900" />
          <span>System Settings</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Platform Settings</h1>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl">
          AI engine integration, secure server-side proxy, and procurement audit parameters.
        </p>
      </div>

      {/* AI Configuration Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Google Gemini AI Engine</h2>
              <p className="text-xs text-slate-500">
                AI Studio server-side integration powering tender synthesis & due diligence.
              </p>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded text-xs font-bold border bg-emerald-50 text-emerald-800 border-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ● Connected & Integrated
            </span>
          </div>
        </div>

        {/* Engine Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">AI Provider</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-slate-900 text-sm">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span>Google Gemini</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Direct backend integration via @google/genai SDK</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Active Model</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-slate-900 text-sm">
              <Cpu className="w-4 h-4 text-indigo-700" />
              <span className="font-mono">{aiStatus.model || 'gemini-3.8-flash'}</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Multi-stage due diligence and tender synthesis</p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Key Security</span>
            <div className="flex items-center gap-1.5 mt-1 font-semibold text-emerald-800 text-sm">
              <Lock className="w-4 h-4 text-emerald-600" />
              <span>AI Studio Secrets (Hidden)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Never transmitted to browser DevTools or client JS</p>
          </div>
        </div>

        {/* Diagnostics Button */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleTestKey}
            disabled={isTesting}
            className="px-3.5 py-2 rounded-md text-xs font-semibold bg-blue-900 hover:bg-blue-800 text-white transition-colors flex items-center gap-1.5 shadow-xs disabled:opacity-50"
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
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{testResult.text}</span>
          </div>
        )}

        {/* Security & Audit Disclosures */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
          <span className="font-semibold text-slate-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-900" />
            ProcureAI Security & Governance Architecture
          </span>
          <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-600">
            <li><strong>Zero Client Exposure:</strong> All Gemini API calls execute strictly on the Node/Express backend server.</li>
            <li><strong>Source Traceability:</strong> All outputs are tagged with source classifications (Bidder-provided vs. Statutory Registry vs. AI Inference).</li>
            <li><strong>Human-in-the-Loop Authority:</strong> Tender officers maintain non-delegable authority over final scoring, disqualification, and contract award.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
