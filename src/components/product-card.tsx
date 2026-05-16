'use client';

import { cn } from '@/lib/utils';
import type { Product } from '@/types';
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
        'group relative flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden',
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
          'aspect-square'
        )}
      >
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 flex items-center justify-center z-10">
            <div className="w-10 h-10 rounded-lg bg-white/20 dark:bg-white/10 animate-pulse" />
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
            'group-hover:scale-110'
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          priority={index < 4}
        />
      </div>

      {/* Content section - flex-1 to fill available space */}
      <div className="flex-1 flex flex-col space-y-1.5 sm:space-y-2">
        {/* Category badge */}
        <span className="text-[9px] sm:text-xs font-medium text-cyan-500 dark:text-cyan-400 uppercase tracking-wider opacity-80">
          {product.category.replace('_', ' ')}
        </span>

        {/* Title */}
        <h3
          className={cn(
            'font-bold whitespace-normal transition-colors duration-200',
            variant === 'compact' ? 'text-sm sm:text-base' : 'text-base sm:text-lg',
            'text-slate-800 dark:text-white',
            'group-hover:text-slate-900 dark:group-hover:text-slate-100'
          )}
        >
          {product.name}
        </h3>

        {/* Spacer to push footer to bottom */}
        <div className="flex-1" />

        {/* Footer - Price and stock */}
        <div className="pt-2 sm:pt-3 flex items-center justify-between gap-2 border-t border-white/20 dark:border-white/5">
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-black text-cyan-600 dark:text-cyan-400">
              ${product.price}
            </span>
            <span className="text-[9px] sm:text-xs text-slate-400 dark:text-white/40">USD</span>
          </div>
          <span className="text-[9px] sm:text-xs font-medium text-slate-500 dark:text-white/50 bg-white/20 dark:bg-white/5 px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap">
            {product.stock} uds
          </span>
        </div>
      </div>
    </Link>
  );
}
