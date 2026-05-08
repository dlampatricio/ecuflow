import { cn } from '@/lib/utils';
import Link from 'next/link';

interface GlassButtonProps {
  readonly href: string;
  readonly children: React.ReactNode;
  readonly variant?: 'primary' | 'secondary';
  readonly shadow?: boolean;
  readonly className?: string;
}

export function GlassButton({
  href,
  children,
  variant = 'secondary',
  shadow = true,
  className,
}: GlassButtonProps) {
  const base =
    'group px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ease-out flex items-center gap-2';

  const styles = {
    primary:
      'bg-cyan-500/10 hover:bg-cyan-500/20 backdrop-blur-xl ' +
      'border border-cyan-500/30 dark:border-cyan-500/20 ' +
      'text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-cyan-100 ' +
      (shadow
        ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] hover:shadow-cyan-500/20 hover:border-cyan-500/40'
        : 'hover:border-cyan-500/40'),
    secondary:
      'bg-black/5 dark:bg-white/5 backdrop-blur-xl ' +
      'border border-black/5 dark:border-white/10 ' +
      'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white ' +
      'hover:bg-white/60 dark:hover:bg-white/10 ' +
      (shadow ? 'shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]' : ''),
  };

  return (
    <Link href={href} className={cn(base, styles[variant], className)}>
      {children}
    </Link>
  );
}
