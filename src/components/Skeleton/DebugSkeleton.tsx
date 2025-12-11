import { Skeleton, SkeletonStatCard } from './Skeleton';

export function DebugSkeleton() {
  return (
    <div className="space-y-4">
      {/* System Overview Skeleton */}
      <div className="bg-white rounded-md border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <Skeleton className="h-3 w-28" />
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            <SkeletonStatCard />
            <SkeletonStatCard />
            <SkeletonStatCard />
          </div>
        </div>
      </div>

      {/* User Sync Status Skeleton */}
      <div className="bg-white rounded-md border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-100">
          <Skeleton className="h-3 w-32" />
        </div>
        <div className="divide-y divide-gray-100">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-5 w-14 rounded" />
                  </div>
                  <Skeleton className="h-3 w-40 mt-1" />
                </div>
                <Skeleton className="h-3 w-32" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="bg-gray-50 rounded px-2 py-1.5">
                    <Skeleton className="h-3 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
