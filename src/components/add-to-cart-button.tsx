'use client';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: Readonly<AddToCartButtonProps>) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      onClick={() => addItem(product)}
      className={cn(
        'group inline-flex w-full items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-bold text-sm sm:text-base transition-all',
        'bg-linear-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500',
        'text-slate-900 dark:text-slate-900',
        'shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40',
        'hover:scale-105 active:scale-95',
        'backdrop-blur-sm',
        className
      )}
    >
      <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-110" />
      <span>Añadir al carrito</span>
    </button>
  );
}
