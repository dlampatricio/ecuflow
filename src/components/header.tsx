'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { BarChart3, LogIn, Menu, MessageCircle, Package, Settings2, X, Zap } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const { isSignedIn } = useUser();
  const isAdminRoute = pathname.startsWith('/admin');
  const menuTimeoutRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMenuExpanded(false);
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
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

  const mobileNavItems = isAdminRoute
    ? [
        {
          href: '/admin',
          icon: BarChart3,
          label: 'Dashboard',
          active: pathname === '/admin',
        },
        {
          href: '/admin/products',
          icon: Package,
          label: 'Productos',
          active: pathname.includes('/products'),
        },
        {
          href: '/admin/chat',
          icon: MessageCircle,
          label: 'Chat',
          active: pathname.includes('/chat'),
        },
      ]
    : [
        {
          href: '/chat',
          icon: MessageCircle,
          label: 'Chat',
          active: pathname === '/chat',
        },
        {
          href: '/products',
          icon: Package,
          label: 'Productos',
          active: pathname === '/products' || pathname.startsWith('/products/'),
        },
      ];

  const isExpanded = scrolled ? menuExpanded || mobileMenuOpen : mobileMenuOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-1000">
      <div
        className={cn(
          'relative w-full transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          scrolled ? 'max-w-[95%] sm:max-w-[85%] mt-4' : 'max-w-full mt-0'
        )}
      >
        {/* Fondo único - FIX HÍBRIDO PREMIUM */}
        <div
          className={cn(
            'absolute inset-0 transition-all ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden',
            isExpanded ? 'duration-0' : 'duration-700',
            scrolled && !isExpanded
              ? 'rounded-full'
              : isExpanded && scrolled
                ? 'rounded-[36px]'
                : isExpanded && !scrolled
                  ? 'rounded-b-4xl rounded-t-none'
                  : 'rounded-none',
            isExpanded || scrolled
              ? 'bg-white/70 dark:bg-slate-950/50 backdrop-blur-3xl shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-white/50 dark:border-white/8'
              : 'bg-transparent backdrop-blur-0 border-transparent'
          )}
        />

        {/* Contenedor principal del header */}
        <div
          className={cn(
            'relative z-10 transition-all duration-500 ease-in-out',
            mobileMenuOpen ? 'sm:flex' : 'flex'
          )}
          style={{
            flexDirection: 'column',
          }}
        >
          {/* Header top - Logo y acciones */}
          <div
            className={cn(
              'flex items-center justify-between px-6 sm:px-10 transition-all duration-500 h-18'
            )}
          >
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <Zap className="h-5 w-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold tracking-tighter text-slate-800 dark:text-white">
                  ecuflow
                </span>
              </Link>
            </div>

            {/* Navegación Desktop (sm+) */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3">
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
                </>
              )}

              <ThemeToggle />

              {isSignedIn ? (
                <div className={cn(actionButtonClass, 'overflow-hidden')}>
                  <UserButton
                    appearance={{
                      elements: { avatarBox: 'h-6 w-6 scale-150' },
                    }}
                  >
                    <UserButton.MenuItems>
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

            {/* Navegación Mobile (< sm) */}
            <button
              onClick={() => {
                const nextState = !mobileMenuOpen;
                if (nextState) {
                  setMenuExpanded(true);
                  setMobileMenuOpen(true);
                } else {
                  setMobileMenuOpen(false);
                  if (scrolled) {
                    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
                    menuTimeoutRef.current = setTimeout(() => {
                      setMenuExpanded(false);
                    }, 520);
                  } else {
                    setMenuExpanded(false);
                  }
                }
              }}
              className={cn(
                'flex sm:hidden items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ease-in-out',
                scrolled
                  ? 'bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-black dark:text-white'
                  : 'bg-transparent border-transparent text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5',
                mobileMenuOpen && !scrolled
              )}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <div className="relative h-5 w-5">
                <X
                  className={cn(
                    'absolute inset-0 h-5 w-5 transition-all duration-300 transform',
                    mobileMenuOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  )}
                />
                <Menu
                  className={cn(
                    'absolute inset-0 h-5 w-5 transition-all duration-300 transform',
                    mobileMenuOpen ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
                  )}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu - Animación fluida*/}
          <div
            className={cn(
              'sm:hidden grid transition-all duration-500 ease-in-out',
              mobileMenuOpen
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0 pointer-events-none'
            )}
          >
            <div className="overflow-hidden">
              <div
                className={cn(
                  'px-6 pb-6 pt-2 transition-all duration-500',
                  scrolled ? 'mt-0' : 'mt-2'
                )}
              >
                {/* Separador sutil */}
                <div className="h-px w-full bg-linear-to-r from-transparent via-black/5 dark:via-white/10 to-transparent mb-4" />

                <nav className="space-y-2">
                  {mobileNavItems.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-4 px-2 py-2 rounded-2xl transition-all duration-300',
                        'text-slate-700 dark:text-slate-300',
                        'hover:bg-black/5 dark:hover:bg-white/10',
                        item.active && 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
                        // Animación de entrada escalonada para los items
                        mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      )}
                      style={{ transitionDelay: `${index * 40}ms` }}
                    >
                      <div
                        className={cn(
                          actionButtonClass,
                          item.active && 'border-cyan-500/30 bg-cyan-500/10 text-cyan-500'
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>

                      <span className="flex-1 font-semibold text-[15px] tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  ))}

                  {/* Sección de Usuario / Theme al final de la lista */}
                  <div className="pt-2 mt-2 border-t border-black/5 dark:border-white/5">
                    {isSignedIn ? (
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-3">
                          <div className={cn(actionButtonClass, 'overflow-hidden')}>
                            <UserButton
                              appearance={{
                                elements: { avatarBox: 'h-6 w-6 scale-150' },
                              }}
                            >
                              <UserButton.MenuItems>
                                <UserButton.Action
                                  label={isAdminRoute ? 'Ir a la Tienda' : 'Admin Panel'}
                                  labelIcon={
                                    isAdminRoute ? (
                                      <Zap className="h-4 w-4" />
                                    ) : (
                                      <Settings2 className="h-4 w-4" />
                                    )
                                  }
                                  onClick={() =>
                                    (globalThis.location.href = isAdminRoute ? '/' : '/admin')
                                  }
                                />
                              </UserButton.MenuItems>
                            </UserButton>
                          </div>
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Mi Cuenta
                          </span>
                        </div>
                        <ThemeToggle />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between px-2">
                        <SignInButton mode="modal">
                          <button className="flex items-center gap-3">
                            <div className={cn(actionButtonClass)}>
                              <LogIn className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                              Iniciar Sesión
                            </span>
                          </button>
                        </SignInButton>
                        <ThemeToggle />
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
