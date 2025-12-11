import { Skeleton, SkeletonStatCard, SkeletonListItem } from './Skeleton';

export function HomeSkeleton() {
  return (
    <>
      {/* Sync Status Skeleton */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>

        <Skeleton className="h-3 w-28 mt-2" />
      </div>

      {/* Recent Contacts Skeleton */}
      <div>
        <div className="px-4 py-3 border-b border-gray-100">
          <Skeleton className="h-3 w-24" />
        </div>
        <div>
          {[...Array(5)].map((_, i) => (
            <SkeletonListItem key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
