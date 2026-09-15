import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'button' | 'segmented';
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  className = '',
  showLabel = false,
}) => {
  const { theme, isDark, setTheme, toggleTheme } = useTheme();

  if (variant === 'segmented') {
    const modes: { id: ThemeMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
      { id: 'light', label: 'Light', icon: Sun },
      { id: 'dark', label: 'Dark', icon: Moon },
      { id: 'system', label: 'System', icon: Monitor },
    ];

    return (
      <div
        role="radiogroup"
        aria-label="Color theme selection"
        className={`inline-flex p-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 ${className}`}
      >
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = theme === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setTheme(mode.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 text-blue-900 dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`inline-flex items-center justify-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors shadow-xs ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-90 duration-200" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-90 duration-200" />
      )}
      {showLabel && (
        <span className="text-xs font-semibold select-none">
          {isDark ? 'Light' : 'Dark'}
        </span>
      )}
    </button>
  );
};
