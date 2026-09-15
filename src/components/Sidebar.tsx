import React from 'react';
import {
  Shield,
  BarChart3,
  FileText,
  Sparkles,
  Database,
  History,
  Settings,
  Building,
  Sliders,
  Users,
  ChevronRight,
  ExternalLink,
  Lock,
  Sun,
  Moon,
  Monitor
} from 'lucide-react';
import { UserRole, User } from '../types';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
  userRole: UserRole;
  onToggleRole: () => void;
  aiConnected: boolean;
  onOpenAIConfig: () => void;
  tendersCount: number;
  currentUser?: User | null;
  onLogout?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  live?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  userRole,
  onToggleRole,
  aiConnected,
  onOpenAIConfig,
  tendersCount,
  currentUser,
  onLogout,
}) => {
  const { theme, isDark, setTheme, toggleTheme } = useTheme();

  const officerNav: NavItem[] = [
    { id: 'dashboard', label: 'Officer Home', icon: BarChart3 },
    { id: 'tenders', label: 'View Tenders', icon: FileText, badge: tendersCount.toString() },
    { id: 'comparison', label: 'Review Bids', icon: Sparkles },
    { id: 'integrations', label: 'External Registries', icon: Database, live: true },
    { id: 'audit', label: 'Audit Trail & Logs', icon: History },
    { id: 'settings', label: 'System & Theme', icon: Settings },
  ];

  const bidderNav: NavItem[] = [
    { id: 'dashboard', label: 'Bidder Home', icon: BarChart3 },
    { id: 'tender-browser', label: 'Find Tenders', icon: FileText, badge: tendersCount.toString() },
    { id: 'submissions', label: 'My Applications', icon: Building },
    { id: 'integrations', label: 'Registry Status (GST/PAN)', icon: Database },
    { id: 'settings', label: 'System & Theme', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none z-30">
      {/* Brand & Portal Header */}
      <div>
        <div className="p-4 border-b border-slate-800">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onSelectView(userRole === 'OFFICER' ? 'dashboard' : 'submissions')}
          >
            <div className="w-9 h-9 rounded-md bg-blue-700 flex items-center justify-center text-white font-bold shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-white tracking-tight">
                  Procure<span className="text-blue-400">AI</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                  GOV
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Tender Due-Diligence Support</p>
            </div>
          </div>
        </div>

        {/* Navigation Group */}
        <div className="p-3 space-y-6">
          <div>
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              {userRole === 'OFFICER' ? 'Evaluation Workspace' : 'Vendor Portal'}
            </span>
            <nav className="space-y-0.5">
              {(userRole === 'OFFICER' ? officerNav : bidderNav).map((item) => {
                const Icon = item.icon;
                const isActive =
                  currentView === item.id ||
                  (item.id === 'comparison' && currentView === 'report') ||
                  (item.id === 'tenders' && currentView === 'tender-detail');

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-800 text-white font-semibold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">
                        {item.badge}
                      </span>
                    )}
                    {item.live && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        LIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div>
            <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              System & Policy
            </span>
            <nav className="space-y-0.5">
              <button
                onClick={() => onSelectView('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  currentView === 'settings'
                    ? 'bg-blue-800 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Settings className={`w-4 h-4 ${currentView === 'settings' ? 'text-white' : 'text-slate-400'}`} />
                <span>Engine & Settings</span>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Footer Area: AI Engine Status & Role Switcher */}
      <div className="p-3 border-t border-slate-800 space-y-3 bg-slate-950/50">
        {/* AI Engine Status Pill */}
        <button
          onClick={onOpenAIConfig}
          className={`w-full p-2.5 rounded-md border text-left flex items-center justify-between transition-colors ${
            aiConnected
              ? 'bg-slate-900 border-slate-700 hover:border-slate-600 text-slate-200'
              : 'bg-slate-900 border-slate-700 hover:border-slate-600 text-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 shrink-0 text-blue-400" />
            <div className="min-w-0">
              <span className="block text-[11px] font-semibold truncate">
                Google Gemini
              </span>
              <span className="block text-[10px] text-slate-400 truncate">
                gemini-3.8-flash (Active)
              </span>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full shrink-0 bg-emerald-400" />
        </button>

        {/* Theme Switcher Control */}
        <div>
          <div className="text-[10px] text-slate-400 font-medium mb-1.5 flex items-center justify-between">
            <span>Interface Mode:</span>
            <span className="font-semibold text-slate-300 capitalize flex items-center gap-1">
              {isDark ? (
                <>
                  <Moon className="w-3 h-3 text-blue-400" />
                  Dark
                </>
              ) : (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  Light
                </>
              )}
            </span>
          </div>
          <div className="grid grid-cols-3 p-0.5 bg-slate-900 border border-slate-800 rounded-md">
            <button
              type="button"
              onClick={() => setTheme('light')}
              title="Switch to Light Theme"
              className={`py-1 flex items-center justify-center gap-1 text-[11px] font-medium rounded transition-colors ${
                theme === 'light'
                  ? 'bg-blue-700 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span>Light</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              title="Switch to Dark Theme"
              className={`py-1 flex items-center justify-center gap-1 text-[11px] font-medium rounded transition-colors ${
                theme === 'dark'
                  ? 'bg-blue-700 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>Dark</span>
            </button>
            <button
              type="button"
              onClick={() => setTheme('system')}
              title="Sync with System Theme"
              className={`py-1 flex items-center justify-center gap-1 text-[11px] font-medium rounded transition-colors ${
                theme === 'system'
                  ? 'bg-blue-700 text-white font-semibold shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>Auto</span>
            </button>
          </div>
        </div>

        {/* Role Toggle Switch */}
        <div>
          <div className="text-[10px] text-slate-400 font-medium mb-1.5 flex items-center justify-between">
            <span>Simulated View:</span>
            <span className="font-semibold text-slate-300">
              {userRole === 'OFFICER' ? 'Procurement Officer' : 'Vendor Bidder'}
            </span>
          </div>
          <div className="grid grid-cols-2 p-0.5 bg-slate-900 border border-slate-800 rounded-md">
            <button
              onClick={() => { if (userRole !== 'OFFICER') onToggleRole(); }}
              className={`py-1 text-[11px] font-medium rounded transition-colors ${
                userRole === 'OFFICER'
                  ? 'bg-blue-700 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Officer
            </button>
            <button
              onClick={() => { if (userRole !== 'BIDDER') onToggleRole(); }}
              className={`py-1 text-[11px] font-medium rounded transition-colors ${
                userRole === 'BIDDER'
                  ? 'bg-blue-700 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bidder
            </button>
          </div>
        </div>

        {/* User Badge */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-blue-900 text-blue-200 font-bold flex items-center justify-center text-[11px] shrink-0 border border-blue-700">
              {(currentUser?.fullName || currentUser?.name || (userRole === 'OFFICER' ? 'Nurul Zaman' : 'AquaTech Rep'))
                .split(' ')
                .filter(Boolean)
                .map(n => n[0])
                .join('')
                .substring(0, 2)
                .toUpperCase() || (userRole === 'OFFICER' ? 'NZ' : 'AT')}
            </div>
            <div className="leading-tight min-w-0">
              <span className="block font-medium text-slate-200 text-[11px] truncate">
                {currentUser?.fullName || currentUser?.name || (userRole === 'OFFICER' ? 'Nurul Zaman' : 'AquaTech Rep')}
              </span>
              <span className="block text-[9px] text-slate-400 truncate">
                {currentUser?.organization || (userRole === 'OFFICER' ? 'Procurement Authority' : 'AquaTech Solutions')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
