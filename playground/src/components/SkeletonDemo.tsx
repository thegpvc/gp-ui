import { Skeleton, SkeletonText, SkeletonStatCard, SkeletonListItem, Card } from '@gp/ui'

export function SkeletonDemo() {
  return (
    <div className="space-y-8">
      <section className="demo-section">
        <h2 className="demo-section-title">Base Skeleton</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          The base skeleton can be customized with width and height classes.
        </p>
        <div className="space-y-3 max-w-md">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Skeleton Text</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Multi-line text skeleton with automatic width variation on the last line.
        </p>
        <div className="space-y-6 max-w-md">
          <div>
            <div className="demo-label">1 Line</div>
            <SkeletonText lines={1} />
          </div>
          <div>
            <div className="demo-label">2 Lines</div>
            <SkeletonText lines={2} />
          </div>
          <div>
            <div className="demo-label">4 Lines</div>
            <SkeletonText lines={4} />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Skeleton StatCard</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Loading state for StatCard component.
        </p>
        <div className="demo-grid">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Skeleton List Item</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Loading state for list items.
        </p>
        <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm overflow-hidden max-w-md">
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonListItem />
          <SkeletonListItem />
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Card Loading State</h2>
        <p className="text-sm text-navy-600 dark:text-navy-400 mb-4">
          Example of a card with skeleton content.
        </p>
        <div className="max-w-md">
          <Card>
            <Card.Header>
              <Skeleton className="h-5 w-40" />
            </Card.Header>
            <Card.Body>
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
              <SkeletonText lines={3} />
            </Card.Body>
            <Card.Footer>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </Card.Footer>
          </Card>
        </div>
      </section>

      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">{`import {
  Skeleton,
  SkeletonText,
  SkeletonStatCard,
  SkeletonListItem
} from '@gp/ui'

// Base skeleton with custom dimensions
<Skeleton className="h-4 w-full" />
<Skeleton className="h-12 w-12 rounded-full" />

// Multi-line text
<SkeletonText lines={3} />

// Pre-built components
<SkeletonStatCard />
<SkeletonListItem />`}</pre>
      </section>
    </div>
  )
}
