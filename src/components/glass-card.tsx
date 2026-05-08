'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GlassCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
  accent?: 'cyan' | 'amber' | 'emerald' | 'violet';
  className?: string;
}

const accentIconBg: Record<string, string> = {
  cyan: 'bg-cyan-500/10 text-cyan-300 group-hover:bg-cyan-500/20',
  amber: 'bg-amber-500/10 text-amber-300 group-hover:bg-amber-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-300 group-hover:bg-emerald-500/20',
  violet: 'bg-violet-500/10 text-violet-300 group-hover:bg-violet-500/20',
};

const accentLineMap: Record<string, string> = {
  cyan: 'via-cyan-500/40',
  amber: 'via-amber-500/40',
  emerald: 'via-emerald-500/40',
  violet: 'via-violet-500/40',
};

const accentTextMap: Record<string, string> = {
  cyan: 'text-cyan-300/80 group-hover:text-cyan-300',
  amber: 'text-amber-300/80 group-hover:text-amber-300',
  emerald: 'text-emerald-300/80 group-hover:text-emerald-300',
  violet: 'text-violet-300/80 group-hover:text-violet-300',
};

export function GlassCard({
  icon,
  title,
  description,
  action,
  accent = 'cyan',
  className,
}: GlassCardProps) {
  const content = (
    <>
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ${accentIconBg[accent]}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-slate-300 leading-relaxed">{description}</p>
      {action && (
        <div
          className={`mt-6 inline-flex items-center gap-1 text-xs font-semibold transition-colors ${accentTextMap[accent]}`}
        >
          {action.label}
          <svg
            className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
      <div
        className={`absolute bottom-0 left-6 right-6 h-px bg-linear-to-r from-transparent ${accentLineMap[accent]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
    </>
  );

  const cardClass = cn(
    'group relative rounded-4xl p-8',
    'bg-slate-900/70 dark:bg-slate-900/50',
    'backdrop-blur-xl',
    'border border-white/10 dark:border-white/6',
    'hover:bg-slate-900/80 dark:hover:bg-slate-900/60',
    'hover:border-cyan-500/30',
    'transition-all duration-500 hover:-translate-y-1',
    className,
  );

  if (action) {
    return (
      <Link href={action.href} className={cardClass}>
        {content}
      </Link>
    );
  }

  return <div className={cardClass}>{content}</div>;
}
