'use client';

import { Glow } from '@/components/ui/glow';
import { useCartStore } from '@/stores/cart';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="relative flex-1 overflow-hidden dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
        {/* Glow backdrop */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/3 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/2 dark:bg-blue-500/8 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8 pt-28">
          <Glow position="top-left" color="cyan" />
          <div className="w-24 h-24 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl flex items-center justify-center mb-8 animate-float shadow-lg shadow-black/5 dark:shadow-black/20">
            <ShoppingBag className="h-12 w-12 text-slate-400 dark:text-white/30" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 dark:text-white mb-4 text-center">
            Tu carrito está vacío
          </h1>
          <p className="text-slate-500 dark:text-white/50 text-center mb-10 max-w-sm leading-relaxed">
            Explora nuestros productos y añade los que necesites a tu carrito
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 px-8 py-4 text-sm font-bold text-slate-900 transition-all hover:gap-3 hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-105 active:scale-95"
          >
            Ver productos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex-1 overflow-hidden dark:bg-slate-950 bg-slate-50 dark:text-white text-slate-900">
      {/* Glow backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-5%] left-[-5%] w-160 h-160 bg-cyan-500/3 dark:bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-160 h-160 bg-blue-500/2 dark:bg-blue-500/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header section */}
        <section className="relative pt-28 pb-12 sm:pb-16">
          <Glow position="top-left" color="cyan" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-2 animate-fade-up">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter bg-linear-to-br from-slate-900 via-slate-700 to-cyan-600 dark:from-white dark:via-slate-200 dark:to-cyan-400 bg-clip-text text-transparent">
                Carrito de compras
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
              </p>
            </div>
          </div>
        </section>

        {/* Cart content */}
        <section className="relative py-12 sm:py-20 pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => {
                  const images = item.product.images || [];
                  const mainImage = images[0] || '/placeholder-product.jpg';

                  return (
                    <div
                      key={item.product.id}
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 hover:bg-white/60 dark:hover:bg-white/10 transition-all animate-fade-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <Link href={`/products/${item.product.slug}`} className="shrink-0">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 hover:border-cyan-500/30 transition-all">
                          <Image
                            src={mainImage}
                            alt={item.product.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-bold text-lg text-slate-800 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-slate-500 dark:text-white/50 mt-1">
                            ${item.product.price} por unidad
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                          <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/50 rounded-2xl p-1 border border-white/50 dark:border-white/10">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-white/70 hover:text-slate-800 dark:hover:text-white"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-12 text-center font-semibold text-slate-700 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-white/70 hover:text-slate-800 dark:hover:text-white"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-red-500 dark:hover:text-red-400 transition-colors font-medium"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Eliminar</span>
                          </button>
                        </div>
                      </div>

                      <div className="hidden sm:flex flex-col items-end justify-center min-w-fit">
                        <span className="text-2xl font-black bg-linear-to-br from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary sidebar */}
              <div className="lg:col-span-1">
                <div
                  className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 space-y-6 animate-fade-up"
                  style={{ animationDelay: '200ms' }}
                >
                  <h2 className="text-lg font-bold text-slate-800 dark:text-white tracking-tight">
                    Resumen de compra
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-white/60">
                        Subtotal ({items.length} {items.length === 1 ? 'producto' : 'productos'})
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-white">
                        ${getTotal()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-white/60">Envío</span>
                      <span className="text-slate-500 dark:text-white/60 text-xs font-medium">
                        Por confirmar
                      </span>
                    </div>
                    <div className="pt-4 border-t border-white/50 dark:border-white/10">
                      <div className="flex justify-between font-black text-xl">
                        <span className="text-slate-800 dark:text-white">Total</span>
                        <span className="bg-linear-to-br from-cyan-600 to-cyan-500 dark:from-cyan-400 dark:to-cyan-300 bg-clip-text text-transparent">
                          ${getTotal()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/chat"
                    className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 px-4 py-4 text-center text-sm font-bold text-slate-900 transition-all shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-105 active:scale-95"
                  >
                    Continuar al chat
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <p className="text-xs text-center text-slate-500 dark:text-white/50 leading-relaxed">
                    Coordina el envío y pago a través del chat con nuestro equipo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
