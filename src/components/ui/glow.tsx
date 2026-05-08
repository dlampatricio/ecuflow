import { cn } from '@/lib/utils';

interface GlowProps {
  readonly position?:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'center';
  readonly color?: 'cyan' | 'blue' | 'violet';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly className?: string;
}

const colorMap = {
  cyan: 'bg-cyan-500/4 dark:bg-cyan-500/10',
  blue: 'bg-blue-500/3 dark:bg-blue-500/6',
  violet: 'bg-violet-500/2 dark:bg-violet-500/5',
};

const sizeMap = {
  sm: 'w-80 h-80',
  md: 'w-120 h-120',
  lg: 'w-160 h-160',
};

const posMap = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

export function Glow({
  position = 'center',
  color = 'cyan',
  size = 'md',
  className,
}: GlowProps) {
  return (
    <div
      className={cn(
        'absolute rounded-full blur-[100px] pointer-events-none',
        colorMap[color],
        sizeMap[size],
        posMap[position],
        className,
      )}
    />
  );
}
