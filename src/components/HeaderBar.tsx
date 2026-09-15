import React, { useState } from 'react';
import { Shield, Sparkles, PlusCircle, LogOut, User as UserIcon, AlertTriangle } from 'lucide-react';
import { Tender, UserRole, User } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface HeaderBarProps {
  tenders: Tender[];
  selectedTender?: Tender | null;
  onSelectTender: (t: Tender) => void;
  userRole: UserRole;
  onRunDueDiligence: () => void;
  onOpenCreateTender: () => void;
  onOpenComparison: () => void;
  aiConnected: boolean;
  currentUser?: User | null;
  onLogout?: () => void;
  onOpenAIConfig?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  tenders,
  selectedTender,
  onSelectTender,
  userRole,
  onRunDueDiligence,
  onOpenCreateTender,
  onOpenComparison,
  aiConnected,
  currentUser,
  onLogout,
  onOpenAIConfig,
}) => {
  const [showConnectNotice, setShowConnectNotice] = useState(false);

  const handleRunAnalysisClick = () => {
    if (!aiConnected) {
      setShowConnectNotice(true);
    } else {
      onRunDueDiligence();
    }
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-20 shadow-xs transition-colors">
      {/* Top Banner: Mandatory Decision Support & Human Review Law */}
      <div className="bg-slate-900 dark:bg-slate-950 px-4 py-1.5 text-[11px] text-slate-300 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <strong className="text-white font-semibold">Government Procurement Decision-Support System:</strong>
          <span className="text-slate-300 hidden sm:inline">
            Evidence-backed intelligence, automated anti-hallucination checks, and explainable scoring. Final award decisions strictly remain with authorized human officers.
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-400">
          <span>Audit Standard: USWDS / ISO 27001</span>
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            System Online
          </span>
        </div>
      </div>

      {/* Missing AI Connection Prompt Banner if triggered */}
      {showConnectNotice && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 px-4 py-2.5 flex items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="font-semibold">Configure AI to run automated analysis.</span>
            <span className="text-amber-700 dark:text-amber-300 hidden md:inline">
              An API key enables the multi-stage document due diligence engine.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setShowConnectNotice(false);
                onOpenAIConfig?.();
              }}
              className="px-3 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Configure AI
            </button>
            <button
              type="button"
              onClick={() => setShowConnectNotice(false)}
              className="px-2 py-1 text-amber-700 dark:text-amber-300 hover:text-amber-900 dark:hover:text-white text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Main Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Active Tender Selector Dropdown */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
              Active Evaluation Tender
            </label>
            {tenders.length > 0 && selectedTender?.id ? (
              <div className="flex items-center gap-2">
                <select
                  value={selectedTender.id}
                  onChange={(e) => {
                    const found = tenders.find((t) => t && t.id === e.target.value);
                    if (found) onSelectTender(found);
                  }}
                  className="text-xs font-semibold text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-md py-1.5 pl-2.5 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:bg-white dark:focus:bg-slate-900 cursor-pointer"
                >
                  {tenders.filter((t): t is Tender => Boolean(t && t.id)).map((t) => (
                    <option key={t.id} value={t.id} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                      [{t.referenceNumber}] {t.title ? (t.title.length > 55 ? t.title.substring(0, 55) + '...' : t.title) : 'Untitled Tender'}
                    </option>
                  ))}
                </select>
                {selectedTender.budget && (
                  <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Budget: {selectedTender.budget}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic py-1">
                <span>No active tender selected</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Action Buttons & User Menu */}
        <div className="flex items-center gap-3">
          {userRole === 'OFFICER' && (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCreateTender}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>New Tender</span>
              </button>
              <button
                onClick={onOpenComparison}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-colors shadow-xs"
              >
                <span>Compare Bids</span>
              </button>
              <button
                onClick={handleRunAnalysisClick}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-blue-900 hover:bg-blue-800 text-white transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Run AI Due Diligence</span>
              </button>
            </div>
          )}

          {/* Theme Toggle Button */}
          <div className="pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800 flex items-center">
            <ThemeToggle showLabel={false} />
          </div>

          {/* Authenticated User & Logout */}
          <div className="pl-3 border-l border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {currentUser?.fullName || currentUser?.name || (userRole === 'OFFICER' ? 'Nurul Zaman' : 'AquaTech Rep')}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                {currentUser?.organization || (userRole === 'OFFICER' ? 'Procurement Authority' : 'AquaTech Solutions')}
              </span>
            </div>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign out of ProcureAI"
                className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:border-rose-200 dark:hover:border-rose-800 text-slate-600 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-400 text-xs transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hover:text-rose-600" />
                <span className="hidden sm:inline font-medium">Sign Out</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
