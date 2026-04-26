"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export function ProductImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ProductImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={cn(
          "relative bg-linear-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden",
          className
        )}
      >
        <div className="absolute inset-0 opacity-20">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="20"
              y="30"
              width="60"
              height="40"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="35" cy="45" r="6" stroke="currentColor" strokeWidth="2" />
            <path
              d="M25 60L40 50L50 58L65 45L75 52"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
        <div className="absolute bottom-3 right-3 bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
          Sin imagen
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn(
          "object-cover transition-all duration-500",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export function CategoryPlaceholder({ category }: { category: string }) {
  const icons: Record<string, ReactNode> = {
    powerbanks: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-12 h-12"
      >
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <rect x="8" y="3" width="8" height="3" rx="1" />
        <rect x="7" y="10" width="10" height="5" rx="1" opacity="0.5" />
        <path d="M9 1v2M15 1v2" strokeLinecap="round" />
      </svg>
    ),
    ecoflow: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-12 h-12"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
      </svg>
    ),
    solar_panels: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-12 h-12"
      >
        <rect x="2" y="8" width="20" height="12" rx="1" />
        <line x1="8" y1="8" x2="8" y2="20" />
        <line x1="16" y1="8" x2="16" y2="20" />
        <line x1="2" y1="14" x2="22" y2="14" />
        <line x1="12" y1="2" x2="8" y2="8" strokeLinecap="round" />
      </svg>
    ),
    accessories: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="w-12 h-12"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
      {icons[category] || icons.accessories}
      <span className="text-xs uppercase tracking-wider">{category.replace("_", " ")}</span>
    </div>
  );
}