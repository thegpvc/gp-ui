import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface StatCardProps {
  /**
   * Metric label (e.g., "Total Emails", "Last Contact")
   */
  label: string

  /**
   * Metric value (will be displayed in monospace font if numeric)
   */
  value: string | number

  /**
   * Optional icon to display before the value
   */
  icon?: ReactNode

  /**
   * Optional trend indicator
   */
  trend?: {
    /**
     * Trend direction (up = positive/green, down = negative/red)
     */
    direction: 'up' | 'down'
    /**
     * Trend value (e.g., "+12%", "-3")
     */
    value: string
    /**
     * Optional label (e.g., "vs last month")
     */
    label?: string
  }

  /**
   * Variant size
   * - default: Standard stat card with large value
   * - compact: Smaller padding with large value
   * - inline: Label on top, value below, left-aligned (for debug user stats)
   * - centered: Label on top, value below, centered (for email history contact cards)
   */
  variant?: 'default' | 'compact' | 'inline' | 'centered'

  /**
   * Color scheme
   * - default: Navy/gray theme (standard)
   * - accent: Orange theme (for active/syncing states)
   */
  color?: 'default' | 'accent'

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * StatCard component for displaying metrics and statistics.
 * Replaces inline `bg-gray-50 rounded px-3 py-2` patterns.
 *
 * @example
 * ```tsx
 * // Default variant with large value (homepage, debug summary)
 * <StatCard
 *   label="Total Emails"
 *   value={1234}
 *   icon={<Mail />}
 *   variant="compact"
 * />
 *
 * // Centered variant (email history contact cards)
 * <StatCard label="Sent" value={42} variant="centered" />
 *
 * // Inline variant (debug user stats)
 * <StatCard label="Emails" value="1,234" variant="inline" />
 *
 * // Inline variant with accent color (sync progress)
 * <StatCard label="Messages" value={150} variant="inline" color="accent" />
 * ```
 */
export function StatCard({
  label,
  value,
  icon,
  trend,
  variant = 'default',
  color = 'default',
  className = '',
}: StatCardProps) {
  const isNumeric = typeof value === 'number' || !isNaN(Number(value))

  // Color scheme classes
  const colorClasses = {
    default: {
      label: 'text-navy-500 dark:text-navy-400',
      value: 'text-navy-900 dark:text-navy-100',
      bg: 'bg-gray-50 dark:bg-navy-800/50',
      icon: 'text-navy-400 dark:text-navy-500',
    },
    accent: {
      label: 'text-orange-600 dark:text-orange-400',
      value: 'text-orange-800 dark:text-orange-200',
      bg: 'bg-white/80 dark:bg-navy-800/80',
      icon: 'text-orange-500 dark:text-orange-400',
    },
  }

  // Inline variant: label on top, value below, left-aligned.
  if (variant === 'inline') {
    return (
      <div className={cn('gp-stat-card flex flex-col items-start gap-0.5', colorClasses[color].bg, className)}>
        {/* Label on top */}
        <span className={cn('text-xs leading-tight', colorClasses[color].label)}>
          {label}
        </span>

        {/* Value below - same size font, darker, monospace for numbers */}
        <span className={cn('text-xs font-medium leading-tight', colorClasses[color].value, isNumeric && 'font-mono tabular-nums')}>
          {value}
        </span>
      </div>
    )
  }

  // Centered variant: label on top, value below, centered.
  if (variant === 'centered') {
    return (
      <div className={cn('gp-stat-card flex flex-col items-center text-center gap-1', colorClasses[color].bg, className)}>
        {/* Label on top */}
        <span className={cn('text-xs leading-tight', colorClasses[color].label)}>
          {label}
        </span>

        {/* Value below - slightly bigger, darker, monospace for numbers */}
        <span className={cn('text-sm font-semibold leading-tight', colorClasses[color].value, isNumeric && 'font-mono tabular-nums')}>
          {value}
        </span>
      </div>
    )
  }

  // Default and compact variants use flex-col layout with large value
  const variantClasses = {
    default: 'gap-1',
    compact: 'gap-0.5',
  }

  return (
    <div className={cn('gp-stat-card flex flex-col items-start', colorClasses[color].bg, variantClasses[variant], className)}>
      {/* Value and icon row */}
      <div className="flex items-center gap-2 min-w-0">
        {icon && (
          <span className={cn("shrink-0", colorClasses[color].icon)} aria-hidden="true">
            {icon}
          </span>
        )}

        <span className={cn('text-lg font-semibold leading-none', colorClasses[color].value, isNumeric && 'font-mono tabular-nums')}>
          {value}
        </span>

        {trend && (
          <div
            className={cn(
              'inline-flex items-center gap-1 text-xs font-medium',
              trend.direction === 'up' ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
            )}
            aria-label={`Trend: ${trend.direction === 'up' ? 'increasing' : 'decreasing'} ${trend.value}`}
          >
            {trend.direction === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{trend.value}</span>
            {trend.label && (
              <span className="text-gray-500 dark:text-navy-400 ml-0.5">{trend.label}</span>
            )}
          </div>
        )}
      </div>

      {/* Label below */}
      <span className={cn('text-xs leading-tight', colorClasses[color].label)}>
        {label}
      </span>
    </div>
  )
}
