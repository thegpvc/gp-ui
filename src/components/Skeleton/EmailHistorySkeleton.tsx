import { Skeleton, SkeletonInteractionCard } from './Skeleton';

export function EmailHistorySkeleton() {
  return (
    <>
      {/* Summary Stats Skeleton */}
      <div className="px-4 py-3 border-b border-gray-100">
        <Skeleton className="h-3 w-16 mb-3" />
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-50 rounded px-3 py-2 text-center">
              <Skeleton className="h-5 w-8 mx-auto mb-1" />
              <Skeleton className="h-3 w-12 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Team Interactions Skeleton */}
      <div>
        <div className="px-4 py-3 border-b border-gray-100">
          <Skeleton className="h-3 w-28" />
        </div>
        <div>
          {[...Array(3)].map((_, i) => (
            <SkeletonInteractionCard key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
