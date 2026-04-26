'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { SignInButton, SignOutButton, useUser } from '@clerk/nextjs';
import { LogIn, LogOut, MessageCircle, ShoppingCart, Zap } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isSignedIn, user } = useUser();

  const actionButtonClass =
    'relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-slate-200/50 dark:hover:bg-white/10 transition-all duration-300 border border-transparent';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out',
        scrolled
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]'
          : 'bg-transparent',
      )}
    >
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 h-1px transition-opacity duration-700',
          'bg-linear-to-r from-transparent via-slate-200 dark:via-white/10 to-transparent',
          scrolled ? 'opacity-100' : 'opacity-0',
        )}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between transition-all duration-500">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-500/40 transition-colors" />
              <Zap className="h-7 w-7 text-cyan-600 dark:text-cyan-400 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white">
              ecuflow
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/chat"
              className={cn(actionButtonClass, 'hidden sm:flex')}
            >
              <MessageCircle className="h-5 w-5" />
            </Link>

            <Link href="/carrito" className={actionButtonClass}>
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <SignOutButton>
                  <button className={actionButtonClass} title="Cerrar sesión">
                    <LogOut className="h-5 w-5" />
                  </button>
                </SignOutButton>

                {/* Badge de Usuario */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-[10px] tracking-widest shadow-sm hover:scale-105 transition-transform duration-300">
                  {user?.emailAddresses[0]?.emailAddress
                    ?.split('@')[0]
                    ?.substring(0, 2)
                    ?.toUpperCase()}
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button
                  className={cn(actionButtonClass, 'hidden md:flex')}
                  title="Ingresar"
                >
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
