'use client';

import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  isMobile?: boolean;
}

export function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const actionButtonClass =
    'relative flex h-10 w-10 items-center justify-center rounded-2xl ' +
    'bg-black/5 dark:bg-white/5 backdrop-blur-xl ' +
    'border border-black/5 dark:border-white/10 ' +
    'text-slate-700 dark:text-slate-300 ' +
    'hover:text-black dark:hover:text-white ' +
    'hover:bg-white/60 dark:hover:bg-white/10 ' +
    'transition-all duration-300 ease-out ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]';

  const mobileButtonClass =
    'flex items-center gap-3 w-full text-left ' +
    'text-slate-700 dark:text-slate-300 ' +
    'hover:bg-black/5 dark:hover:bg-white/10 ' +
    'transition-colors duration-300 rounded-xl p-2';

  if (!mounted) {
    return isMobile ? (
      <div className={mobileButtonClass}>
        <div className="h-5 w-5" />
        <span className="font-medium">Tema</span>
      </div>
    ) : (
      <div className={actionButtonClass} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  if (isMobile) {
    return (
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className={mobileButtonClass}
      >
        <div className="relative flex h-5 w-5 items-center justify-center">
          <Sun
            className={cn(
              'h-5 w-5 transition-all duration-500',
              isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100',
            )}
          />
          <Moon
            className={cn(
              'absolute h-5 w-5 transition-all duration-500',
              isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-50 -rotate-90',
            )}
          />
        </div>
        <span className="flex-1 font-medium">Tema</span>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {isDark ? 'Oscuro' : 'Claro'}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={actionButtonClass}
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all duration-500',
          isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100',
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-500',
          isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-50 -rotate-90',
        )}
      />
    </button>
  );
}
