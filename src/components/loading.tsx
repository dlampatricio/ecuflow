"use client";

import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
}

export function Loading({ className, text }: Readonly<LoadingProps>) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-12", className)}>
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
        <div className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
      </div>
      {text && (
        <p className="text-sm text-slate-500 dark:text-white/50">{text}</p>
      )}
    </div>
  );
}

export function LoadingCard({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700",
        className
      )}
    />
  );
}

export function LoadingSkeleton({ className }: Readonly<{ className?: string }>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700",
        className
      )}
    />
  );
}

export function ProductCardSkeleton({ index = 0 }: Readonly<{ index?: number }>) {
  return (
    <div
      className="animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-700 p-5"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="aspect-4/3 rounded-2xl bg-slate-300 dark:bg-slate-600 mb-4" />
      <div className="h-4 w-20 rounded bg-slate-300 dark:bg-slate-600 mb-2" />
      <div className="h-6 w-3/4 rounded bg-slate-300 dark:bg-slate-600 mb-2" />
      <div className="h-4 w-full rounded bg-slate-300 dark:bg-slate-600 mb-2" />
      <div className="flex justify-between">
        <div className="h-8 w-24 rounded bg-slate-300 dark:bg-slate-600" />
        <div className="h-4 w-12 rounded bg-slate-300 dark:bg-slate-600" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: Readonly<{ count?: number }>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}