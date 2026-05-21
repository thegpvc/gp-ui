import { cn } from '../../utils/cn'

export interface TabBarItem {
  id: string
  label: string
}

export interface TabBarProps {
  /**
   * Array of tab items
   */
  items: TabBarItem[]

  /**
   * Currently active tab id
   */
  activeId: string

  /**
   * Callback when a tab is selected
   */
  onChange: (id: string) => void

  /**
   * Visual style
   * - underline: in-page section tabs with an orange underline (default)
   * - pill: top-nav style — rounded-full tabs with an orange-filled active state
   */
  variant?: 'underline' | 'pill'

  /**
   * Additional CSS classes for the container
   */
  className?: string
}

/**
 * TabBar component for navigation between sections.
 *
 * Defaults to `variant="underline"` (in-page tabs). Use `variant="pill"` for
 * the top-nav style used on brand pages — rounded-full tabs with an
 * orange-filled active pill.
 *
 * The underline variant aligns with the bottom edge of its container; wrap in
 * a `border-b` element for the alignment to read correctly.
 *
 * @example
 * ```tsx
 * <div className="border-b border-gray-200">
 *   <TabBar items={…} activeId={tab} onChange={setTab} />
 * </div>
 *
 * <TabBar variant="pill" items={…} activeId={tab} onChange={setTab} />
 * ```
 */
export function TabBar({ items, activeId, onChange, variant = 'underline', className }: TabBarProps) {
  if (variant === 'pill') {
    return (
      <div
        role="tablist"
        className={cn('inline-flex items-center gap-1 p-1 rounded-full bg-navy-900/5 dark:bg-navy-800/60', className)}
      >
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item.id)}
              className={cn(
                'px-3 py-1 text-xs font-semibold uppercase whitespace-nowrap rounded-full transition-colors',
                'tracking-wider',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                isActive
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-cream hover:bg-white/60 dark:hover:bg-navy-800',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div role="tablist" className={cn('flex gap-1 overflow-x-auto -mb-px', className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={activeId === item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            'px-3 pt-4 pb-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-inset',
            activeId === item.id
              ? 'border-orange-500 text-orange-600 dark:text-orange-400'
              : 'border-transparent text-navy-600 dark:text-navy-300 hover:text-navy-900 dark:hover:text-navy-100 hover:border-gray-300 dark:hover:border-navy-600'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
