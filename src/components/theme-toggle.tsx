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
    'relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/80 dark:hover:bg-white/10 transition-all duration-200 border border-transparent';

  if (!mounted) {
    return <div className={actionButtonClass} />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={actionButtonClass}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      <Sun
        className={cn(
          'h-5 w-5 transition-all duration-500 transform',
          isDark
            ? 'opacity-0 scale-50 rotate-90'
            : 'opacity-100 scale-100 rotate-0',
        )}
      />
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-500 transform',
          isDark
            ? 'opacity-100 scale-100 rotate-0'
            : 'opacity-0 scale-50 -rotate-90',
        )}
      />
    </button>
  );
}
