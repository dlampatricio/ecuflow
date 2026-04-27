'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { LogIn, MessageCircle, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-1000">
      <div
        className={cn(
          'relative w-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          scrolled ? 'lg:max-w-[85%] sm:max-w-4xl mt-4' : 'max-w-full mt-0',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
            scrolled
              ? 'bg-white/40 dark:bg-slate-950/40 backdrop-blur-2xl rounded-4xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]'
              : 'bg-white/0 dark:bg-transparent backdrop-blur-0 rounded-none border-transparent',
          )}
        />

        <div className="relative z-10 flex h-16 sm:h-20 items-center justify-between px-6 sm:px-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Zap className="h-6 w-6 text-cyan-600 dark:text-cyan-400 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
              ecuflow
            </span>
          </Link>

          {/* Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/chat"
              className={cn(actionButtonClass, 'hidden sm:flex')}
            >
              <MessageCircle className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </Link>

            <Link href="/carrito" className={actionButtonClass}>
              <ShoppingCart className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white shadow-lg shadow-cyan-500/20">
                  {itemCount}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {isSignedIn ? (
              <div className={cn(actionButtonClass, 'overflow-hidden')}>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: 'h-6 w-6 transition-transform duration-300 scale-150',
                    },
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className={cn(actionButtonClass)}>
                  <LogIn className="h-5 w-5" />
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
