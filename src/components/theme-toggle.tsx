'use client';

import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const actionButtonClass =
    'relative flex h-10 w-10 items-center justify-center rounded-2xl ' +
    'bg-black/4 dark:bg-white/4 backdrop-blur-xl ' +
    'border border-white/20 dark:border-white/10 ' +
    'text-slate-700 dark:text-white/70 ' +
    'hover:text-black dark:hover:text-white ' +
    'hover:bg-white/50 dark:hover:bg-white/10 ' +
    'transition-all duration-300 ease-out ' +
    'shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]';

  if (!mounted) return <div className={actionButtonClass} />;

  const isDark = resolvedTheme === 'dark';

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
