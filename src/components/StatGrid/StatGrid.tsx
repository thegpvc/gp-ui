import { Fragment, useState, useEffect, type ReactNode, cloneElement, isValidElement } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Card } from '../Card'

export interface StatGridItem {
  /**
   * Label/key for the stat
   */
  label: string

  /**
   * Value to display (can be string, number, or custom ReactNode)
   */
  value: string | number | ReactNode

  /**
   * Optional icon to display before the value
   */
  icon?: ReactNode

  /**
   * Status color for the value
   */
  status?: 'success' | 'warning' | 'error' | 'info' | 'default'

  /**
   * Show copy-to-clipboard icon on hover
   */
  copyable?: boolean

  /**
   * Custom value to copy (defaults to string representation of value)
   */
  copyValue?: string

  /**
   * Click handler for the value
   */
  onClick?: () => void

  /**
   * Format preset for common value types
   */
  format?: 'number' | 'currency' | 'date' | 'datetime' | 'bytes'
}

export interface StatGridProps {
  /**
   * Array of key-value items to display
   *
   * Note: Item labels are used as React keys, so they must be unique within the grid.
   */
  items: StatGridItem[]

  /**
   * Wrap in Card component with minimal padding
   *
   * Note: When true, the component assumes the Card has horizontal padding (px-3 or similar)
   * for proper divider alignment. The dividers use -mx-2 to extend to the Card edges.
   */
  asCard?: boolean

  /**
   * Additional CSS classes
   */
  className?: string
}

// Format helpers
function formatValue(value: string | number | ReactNode, format?: string): string | number | ReactNode {
  if (format && (typeof value === 'string' || typeof value === 'number')) {
    const numValue = typeof value === 'number' ? value : parseFloat(String(value))

    // If parsing failed, return original value
    if (isNaN(numValue)) {
      return value
    }

    switch (format) {
      case 'number':
        return numValue.toLocaleString()
      case 'currency':
        // Currency formatting assumes USD - pass numeric values or override formatting as needed
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(numValue)
      case 'bytes':
        return formatBytes(numValue)
      case 'date':
        return new Date(value).toLocaleDateString()
      case 'datetime':
        return new Date(value).toLocaleString()
      default:
        return value
    }
  }

  return value
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

// Status color classes
const statusClasses = {
  default: 'text-navy-900 dark:text-navy-100',
  success: 'text-emerald-700 dark:text-emerald-400',
  warning: 'text-amber-600 dark:text-amber-400',
  error: 'text-rose-700 dark:text-rose-400',
  info: 'text-blue-600 dark:text-blue-400',
}

// Copy button component
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  // Clean up timeout on unmount to prevent memory leak
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      // Silently fail - user will not see success indicator
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 dark:hover:bg-navy-700 rounded focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-navy-400" />
      )}
    </button>
  )
}

/**
 * StatGrid component for displaying key-value pairs in a grid layout.
 * Similar styling to StatCard, but optimized for tabular data.
 *
 * @example
 * ```tsx
 * <StatGrid
 *   items={[
 *     { label: 'Status', value: 'Active', icon: <Check />, status: 'success' },
 *     { label: 'User ID', value: 'usr_123', copyable: true },
 *     { label: 'Created', value: Date.now(), format: 'date' },
 *     { label: 'Email', value: 'user@example.com', onClick: () => alert('clicked') },
 *   ]}
 * />
 * ```
 */
export function StatGrid({
  items,
  asCard = false,
  className,
}: StatGridProps) {
  // Helper to apply status color to icon
  const getIconWithColor = (icon: ReactNode, status?: string) => {
    if (!icon || !status || status === 'default') return icon

    if (isValidElement(icon)) {
      return cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className: cn(
          (icon.props as { className?: string }).className,
          statusClasses[status as keyof typeof statusClasses]
        ),
      })
    }

    return icon
  }

  const content = (
    <div
      className={cn(
        'gp-stat-grid grid grid-cols-[minmax(140px,auto)_1fr] gap-x-3',
        className
      )}
    >
      {items.map((item, index) => {
        const { label, value, icon, status, onClick, copyable, copyValue: customCopyValue, format } = item
        const formattedValue = formatValue(value, format)
        const isNumeric = typeof formattedValue === 'number' || (typeof formattedValue === 'string' && !isNaN(Number(formattedValue)))
        const copyValue = customCopyValue || String(value)
        const hasInteraction = onClick || copyable
        const statusClass = statusClasses[status || 'default']

        return (
          <Fragment key={label}>
            {/* Divider row - spans both columns, extends beyond grid */}
            {index > 0 ? (
              <div className="col-span-2 border-t border-gray-200 dark:border-navy-700 -mx-2" />
            ) : null}

            {/* Label (key) - left column */}
            <div className="flex items-center py-2">
              <span className="text-xs text-navy-500 dark:text-navy-400 leading-5">
                {label}
              </span>
            </div>

            {/* Value - right column */}
            <div className="flex items-center gap-1.5 min-w-0 group py-2">
              {icon ? (
                <span className="flex-shrink-0 flex items-center" aria-hidden="true">
                  {getIconWithColor(icon, status)}
                </span>
              ) : null}

              {onClick ? (
                <button
                  className={cn(
                    'text-sm font-medium leading-5 text-left',
                    statusClass,
                    isNumeric && 'font-mono',
                    'cursor-pointer hover:underline',
                    hasInteraction && 'select-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:rounded'
                  )}
                  onClick={onClick}
                >
                  {formattedValue}
                </button>
              ) : (
                <span
                  className={cn(
                    'text-sm font-medium leading-5',
                    statusClass,
                    isNumeric && 'font-mono',
                    hasInteraction && 'select-all'
                  )}
                >
                  {formattedValue}
                </span>
              )}

              {copyable ? <CopyButton value={copyValue} /> : null}
            </div>
          </Fragment>
        )
      })}
    </div>
  )

  return asCard ? <Card className="py-1">{content}</Card> : content
}
