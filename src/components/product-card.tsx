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
  const addItem = useCartStore((s) => s.addItem);

  const images = Array.isArray(product.images)
    ? product.images
    : product.images
      ? [product.images]
      : [];
  const mainImage = images[0] || '/placeholder-product.jpg';

  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        'group relative rounded-2xl sm:rounded-3xl overflow-hidden',
        'bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl',
        'border border-white/60 dark:border-white/10',
        'hover:border-cyan-500/20 dark:hover:border-cyan-500/20',
        'transition-all duration-300 ease-out',
        'animate-fade-up',
        'shadow-lg shadow-black/5 dark:shadow-black/20',
        variant === 'compact' ? 'p-3 sm:p-4' : 'p-3 sm:p-4 md:p-5'
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image container */}
      <div
        className={cn(
          'relative rounded-xl overflow-hidden mb-3 sm:mb-4 group/image',
          variant === 'compact' ? 'aspect-square' : 'aspect-4/3 sm:aspect-4/3'
        )}
      >
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-white/20 dark:bg-white/10 animate-pulse" />
          </div>
        )}

        {/* Main image */}
        <Image
          src={mainImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            'object-cover transition-transform duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            'group-hover/image:scale-105'
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
        />

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 px-3 sm:px-4 py-1 rounded-full bg-cyan-500 text-[9px] sm:text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-lg shadow-cyan-500/30">
            Destacado
          </div>
        )}

        {/* Add to cart button - always visible */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-cyan-500/90 hover:bg-cyan-500 text-slate-900 transition-all duration-200 shadow-md shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-110 active:scale-95"
          title="Añadir al carrito"
        >
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="space-y-1.5 sm:space-y-2">
        {/* Category */}
        <span className="text-[9px] sm:text-xs font-medium text-cyan-500 dark:text-cyan-400 uppercase tracking-wider  transition-opacity">
          {product.category.replace('_', ' ')}
        </span>

        {/* Title */}
        <h3
          className={cn(
            'font-bold line-clamp-1 transition-colors duration-200',
            variant === 'compact' ? 'text-sm sm:text-base' : 'text-base sm:text-lg',
            'text-slate-800 dark:text-white',
            'group-hover:text-slate-900 dark:group-hover:text-slate-100'
          )}
        >
          {product.name}
        </h3>

        {/* Description */}
        {variant === 'default' && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-white/50 line-clamp-2 opacity-75 group-hover:opacity-100 transition-opacity duration-200">
            {product.description}
          </p>
        )}

        {/* Footer - Price and stock */}
        <div className="pt-2 sm:pt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-black text-cyan-600 dark:text-cyan-400">
              ${product.price}
            </span>
            <span className="text-[9px] sm:text-xs text-slate-400 dark:text-white/40">USD</span>
          </div>
          <span className="text-[9px] sm:text-xs font-medium text-slate-400 dark:text-white/40 bg-white/30 dark:bg-white/5 px-2 sm:px-3 py-1 rounded-full">
            {product.stock} uds
          </span>
        </div>
      </div>
    </Link>
  );
}
