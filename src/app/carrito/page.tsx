'use client';

import { useCartStore } from '@/stores/cart';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center p-8 pt-28">
        <div className="w-24 h-24 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl flex items-center justify-center mb-8 animate-float">
          <ShoppingBag className="h-12 w-12 text-slate-400 dark:text-white/30" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white mb-4">
          Tu carrito está vacío
        </h1>
        <p className="text-slate-500 dark:text-white/50 text-center mb-10 max-w-sm">
          Explora nuestros productos y añade los que necesites a tu carrito
        </p>
        <Link
          href="/productos"
          className="group inline-flex items-center gap-2 rounded-2xl bg-cyan-500 px-8 py-4 text-sm font-bold text-slate-900 hover:bg-cyan-400 transition-all hover:gap-3 hover:shadow-lg hover:shadow-cyan-500/25"
        >
          Ver productos
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-800 dark:text-white mb-12">
          Carrito de compras
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const images = item.product.images || [];
              const mainImage = images[0] || '/placeholder-product.jpg';

              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10"
                >
                  <Link
                    href={`/productos/${item.product.slug}`}
                    className="shrink-0"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white/40 dark:bg-white/10">
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
                        href={`/productos/${item.product.slug}`}
                        className="font-bold text-lg text-slate-800 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-slate-500 dark:text-white/50 mt-1">
                        ${item.product.price} por unidad
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 bg-white/40 dark:bg-slate-900/50 rounded-2xl p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                        >
                          <Minus className="h-4 w-4 text-slate-600 dark:text-white/70" />
                        </button>
                        <span className="w-12 text-center font-semibold text-slate-700 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
                        >
                          <Plus className="h-4 w-4 text-slate-600 dark:text-white/70" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end justify-center">
                    <span className="text-2xl font-black text-cyan-500">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 sm:p-8 rounded-3xl bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
                Resumen
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-white/50">
                    Subtotal ({items.length} productos)
                  </span>
                  <span className="font-medium text-slate-700 dark:text-white">
                    ${getTotal()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-white/50">
                    Envío
                  </span>
                  <span className="text-slate-500 dark:text-white/50">
                    Por confirmar
                  </span>
                </div>
                <div className="pt-4 border-t border-white/60 dark:border-white/10">
                  <div className="flex justify-between font-black text-xl">
                    <span className="text-slate-800 dark:text-white">
                      Total
                    </span>
                    <span className="text-cyan-500">${getTotal()}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/chat"
                className="group block w-full rounded-2xl bg-cyan-500 px-4 py-4 text-center text-sm font-bold text-slate-900 hover:bg-cyan-400 transition-all hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Continuar al chat
              </Link>

              <p className="mt-4 text-xs text-center text-slate-400 dark:text-white/40">
                Coordina el envío y pago a través del chat
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
