'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import {
  BarChart3,
  LogIn,
  MessageCircle,
  Package,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isSignedIn } = useUser();
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const activeClass = 'text-cyan-600 dark:text-cyan-400';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-1000">
      <div
        className={cn(
          'relative w-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          scrolled ? 'max-w-[95%] sm:max-w-[85%] mt-4' : 'max-w-full mt-0'
        )}
      >
        <div
          className={cn(
            'absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
            scrolled
              ? 'bg-white/70 dark:bg-slate-950/50 backdrop-blur-3xl rounded-full shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/50 dark:border-white/8'
              : 'bg-transparent backdrop-blur-0 rounded-none border-transparent'
          )}
        />

        <div className="relative z-10 flex h-16 sm:h-20 items-center justify-between px-6 sm:px-10">
          {/* Logo y Badge de Admin */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl transition-all duration-300 group"
            >
              <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold tracking-tighter text-slate-800 dark:text-white">
                ecuflow
              </span>
            </Link>
          </div>

          {/* Navegación Dinámica */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAdminRoute ? (
              // --- VISTA ADMIN ---
              <>
                <Link
                  href="/admin"
                  className={cn(actionButtonClass, pathname === '/admin' && activeClass)}
                >
                  <BarChart3 className="h-5 w-5" />
                </Link>
                <Link
                  href="/admin/products"
                  className={cn(actionButtonClass, pathname.includes('/products') && activeClass)}
                >
                  <Package className="h-5 w-5" />
                </Link>
                <Link
                  href="/admin/orders"
                  className={cn(actionButtonClass, pathname.includes('/orders') && activeClass)}
                >
                  <ShoppingBag className="h-5 w-5" />
                </Link>
                <Link
                  href="/admin/chat"
                  className={cn(actionButtonClass, pathname.includes('/chat') && activeClass)}
                >
                  <MessageCircle className="h-5 w-5" />
                </Link>
              </>
            ) : (
              // --- VISTA USUARIO ---
              <>
                <Link href="/chat" className={cn(actionButtonClass)}>
                  <MessageCircle className="h-5 w-5" />
                </Link>

                <Link href="/products" className={cn(actionButtonClass)}>
                  <Package className="h-5 w-5" />
                </Link>

                <Link href="/carrito" className={actionButtonClass}>
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-white shadow-lg ring-2 ring-white dark:ring-slate-900">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </>
            )}

            <ThemeToggle />

            {isSignedIn ? (
              <div className={cn(actionButtonClass, 'overflow-hidden')}>
                <UserButton appearance={{ elements: { avatarBox: 'h-6 w-6 scale-150' } }}>
                  <UserButton.MenuItems>
                    {/* Opción rápida para volver al home si eres admin */}
                    <UserButton.Action
                      label={isAdminRoute ? 'Ir a la Tienda' : 'Admin Panel'}
                      labelIcon={
                        isAdminRoute ? (
                          <Zap className="h-4 w-4" />
                        ) : (
                          <Settings2 className="h-4 w-4" />
                        )
                      }
                      onClick={() => (globalThis.location.href = isAdminRoute ? '/' : '/admin')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className={actionButtonClass}>
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
