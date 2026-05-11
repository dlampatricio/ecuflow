'use client';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart';
import type { Product } from '@/types';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: 'default' | 'compact';
}

export function ProductCard({
  product,
  index = 0,
  variant = 'default',
}: Readonly<ProductCardProps>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const images = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];
  const mainImage = images[0] || '/placeholder-product.jpg';

  return (
    <Link
      href={`/productos/${product.slug}`}
      className={cn(
        'group relative rounded-2xl sm:rounded-3xl overflow-hidden',
        'bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl',
        'border border-white/60 dark:border-white/10',
        'hover:bg-white/60 dark:hover:bg-white/10',
        'hover:border-cyan-500/30 dark:hover:border-cyan-500/30',
        'transition-all duration-500 ease-out',
        'animate-fade-up',
        variant === 'compact' ? 'p-3 sm:p-4' : 'p-3 sm:p-4 md:p-5',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'relative rounded-xl overflow-hidden mb-3 sm:mb-4',
          variant === 'compact' ? 'aspect-square' : 'aspect-4/3 sm:aspect-4/3',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 bg-white/20 dark:bg-white/10 transition-opacity duration-500',
            isLoaded ? 'opacity-0' : 'opacity-100',
          )}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 dark:bg-white/10 flex items-center justify-center animate-pulse">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="w-8 h-8 text-slate-400/50 dark:text-white/30"
              >
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <rect x="8" y="3" width="8" height="3" rx="1" />
              </svg>
            </div>
          </div>
        </div>

        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover transition-all duration-500',
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
            isHovered && 'scale-105',
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />

        <div
          className={cn(
            'absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
          )}
        />

        {product.featured && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-2 sm:px-3 py-1 rounded-full bg-cyan-500/90 backdrop-blur-sm text-[9px] sm:text-[10px] font-bold text-slate-900 uppercase tracking-wider">
            Destacado
          </div>
        )}

        <div
          className={cn(
            'absolute bottom-3 right-3 transition-all duration-300',
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500 backdrop-blur-sm text-slate-900 text-xs sm:text-sm font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25"
          >
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Añadir</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        <span className="text-[9px] sm:text-xs font-medium text-cyan-600 dark:text-cyan-400/80 uppercase tracking-wider">
          {product.category.replace('_', ' ')}
        </span>
        <h3
          className={cn(
            'font-bold line-clamp-1 transition-colors',
            variant === 'compact'
              ? 'text-sm sm:text-base'
              : 'text-base sm:text-lg',
            'text-slate-800 dark:text-white',
            isHovered && 'text-cyan-600 dark:text-cyan-400',
          )}
        >
          {product.name}
        </h3>
        {variant === 'default' && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-white/50 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-1.5 sm:pt-2">
          <div>
            <span className="text-lg sm:text-xl md:text-2xl font-black text-cyan-600 dark:text-cyan-400">
              ${product.price}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 dark:text-white/40 ml-1">
              USD
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-slate-400 dark:text-white/40">
            {product.stock} uds
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />
    </Link>
  );
}
