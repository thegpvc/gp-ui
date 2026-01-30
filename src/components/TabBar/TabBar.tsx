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
   * Additional CSS classes for the container
   */
  className?: string
}

/**
 * TabBar component for navigation between sections.
 * Renders as a horizontal bar with underline-style active indicator.
 * The underline aligns with the bottom edge of the container.
 *
 * @example
 * ```tsx
 * const [activeTab, setActiveTab] = useState('overview')
 *
 * // Wrap in a container with border-b for the underline to align
 * <div className="border-b border-gray-200">
 *   <TabBar
 *     items={[
 *       { id: 'overview', label: 'Overview' },
 *       { id: 'details', label: 'Details' },
 *       { id: 'settings', label: 'Settings' },
 *     ]}
 *     activeId={activeTab}
 *     onChange={setActiveTab}
 *   />
 * </div>
 * ```
 */
export function TabBar({ items, activeId, onChange, className }: TabBarProps) {
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
              : 'border-transparent text-navy-600 dark:text-navy-400 hover:text-navy-900 dark:hover:text-navy-100 hover:border-gray-300 dark:hover:border-navy-600'
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
