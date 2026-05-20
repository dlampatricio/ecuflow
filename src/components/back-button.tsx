"use client";

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-white/60 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors mb-6 animate-fade-up"
    >
      <ArrowLeft className="h-4 w-4" />
      Volver atrás
    </button>
  );
}