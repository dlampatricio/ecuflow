import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  readonly badge?: React.ReactNode;
  readonly title: React.ReactNode;
  readonly description?: React.ReactNode;
  readonly className?: string;
}

export function SectionHeader({
  badge,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('text-center mb-12 sm:mb-14 lg:mb-16', className)}>
      {badge && <div className="mb-6">{badge}</div>}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
