import { cn } from '../../utils/cn'

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={cn('animate-skeleton rounded', className)} />;
}

export function SkeletonText({ lines = 1, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-3', i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div className="flex items-center gap-2 bg-gray-50 dark:bg-navy-800/50 rounded px-3 py-2">
      <Skeleton className="w-4 h-4 rounded shrink-0" />
      <div className="min-w-0 flex-1">
        <Skeleton className="h-5 w-12 mb-1" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}

export function SkeletonListItem() {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 dark:border-navy-800">
      <div className="min-w-0 flex-1">
        <Skeleton className="h-4 w-32 mb-1.5" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="w-4 h-4 rounded shrink-0 ml-3" />
    </div>
  );
}
