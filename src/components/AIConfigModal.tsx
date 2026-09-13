import React, { useState } from 'react';
import { Sparkles, CheckCircle2, AlertCircle, Loader2, X, Lock, ShieldCheck, Cpu, Activity } from 'lucide-react';
import { aiService } from '../services/aiService';

interface AIConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyConfigured?: () => void;
  initialMaskedKey?: string | null;
  forceFirstTimeGate?: boolean;
}

export const AIConfigModal: React.FC<AIConfigModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);

  if (!isOpen) return null;

  const handleTestDiagnostics = async () => {
    setTestResult(null);
    setIsTesting(true);

    const res = await aiService.testKey();
    setIsTesting(false);

    if (res.success) {
      setTestResult({
        success: true,
        message: res.message || '✓ Google Gemini engine connected and active (gemini-3.8-flash).',
      });
    } else {
      setTestResult({
        success: false,
        message: res.error || 'Unable to connect to Google Gemini service.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">AI Engine Status</h2>
              <p className="text-xs text-slate-400">Google Gemini • Procurement Intelligence Engine</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Active Status Card */}
          <div className="p-4 rounded-lg bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                <span className="text-sm font-bold text-white">Google Gemini Connected</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                Server-Side Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-700/60">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Active Model</span>
                <span className="font-mono text-slate-200 font-semibold">gemini-3.8-flash</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">Key Management</span>
                <span className="text-slate-200 font-medium">AI Studio Secrets</span>
              </div>
            </div>
          </div>

          {/* Security & Architecture Highlights */}
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block font-semibold">Secure Server-Side Architecture</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  API credentials remain strictly hidden on the server. Calls are proxied through secure backend routes with zero exposure to client browsers.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800">
              <Cpu className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-100 block font-semibold">Automated Procurement Synthesis</strong>
                <span className="text-slate-400 text-[11px] leading-relaxed">
                  Powers tender requirements extraction, bidder dossier structuring, multi-parameter due diligence, and statutory consistency checks.
                </span>
              </div>
            </div>
          </div>

          {/* Test Diagnostic Result */}
          {testResult && (
            <div
              className={`p-3.5 rounded-lg border text-xs font-medium flex items-center gap-2 ${
                testResult.success
                  ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-800/80 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              )}
              <span>{testResult.message}</span>
            </div>
          )}

          {/* Audit / Human Review Reminder */}
          <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-900/60 text-[11px] text-slate-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>ProcureAI Policy:</strong> AI outputs are advisory and evidence-grounded. Final evaluation scores and award approvals strictly remain with human procurement officers.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleTestDiagnostics}
            disabled={isTesting}
            className="px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-50 flex items-center gap-1.5 transition-colors"
          >
            {isTesting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Activity className="w-3.5 h-3.5 text-blue-400" />
            )}
            <span>Run Connection Diagnostic</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
