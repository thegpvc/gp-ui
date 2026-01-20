import { Fragment, type HTMLAttributes } from 'react'
import { Tooltip } from '../Tooltip/Tooltip'
import { cn } from '../../utils/cn'

/**
 * Configuration for a color in the chart
 */
export interface ColorConfig {
  /**
   * Tailwind background color class (e.g., 'bg-blue-500')
   */
  bg: string
  /**
   * Human-readable label for this category
   */
  label: string
}

/**
 * A single data segment in the chart
 */
export interface ProportionSegment {
  /**
   * Unique identifier for this segment
   */
  key: string
  /**
   * Numeric value (will be converted to percentage)
   */
  value: number
}

export interface ProportionChartProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of data segments to display
   */
  data: ProportionSegment[]

  /**
   * Color configuration mapped by segment key
   * @example
   * ```tsx
   * colors={{
   *   active: { bg: 'bg-green-500', label: 'Active' },
   *   pending: { bg: 'bg-yellow-500', label: 'Pending' }
   * }}
   * ```
   */
  colors: Record<string, ColorConfig>

  /**
   * Function to format numeric values for display
   * @example
   * ```tsx
   * formatValue={(ms) => `${(ms / 1000).toFixed(1)}s`}
   * ```
   */
  formatValue: (value: number) => string

  /**
   * Tailwind height class for the chart bar
   * @default 'h-2'
   */
  height?: string

  /**
   * Show optional legend below the chart
   * @default false
   */
  showLegend?: boolean

  /**
   * Accessible label for screen readers
   */
  ariaLabel?: string
}

/**
 * ProportionChart displays data as a horizontal segmented bar showing relative proportions.
 * Includes an interactive tooltip with detailed breakdown and optional legend.
 *
 * @example Basic usage
 * ```tsx
 * <ProportionChart
 *   data={[
 *     { key: 'completed', value: 65 },
 *     { key: 'in-progress', value: 25 },
 *     { key: 'pending', value: 10 }
 *   ]}
 *   colors={{
 *     completed: { bg: 'bg-green-500', label: 'Completed' },
 *     'in-progress': { bg: 'bg-blue-500', label: 'In Progress' },
 *     pending: { bg: 'bg-gray-400', label: 'Pending' }
 *   }}
 *   formatValue={(v) => `${v} items`}
 * />
 * ```
 *
 * @example With legend and custom height
 * ```tsx
 * <ProportionChart
 *   data={data}
 *   colors={colors}
 *   formatValue={formatValue}
 *   height="h-4"
 *   showLegend={true}
 *   ariaLabel="Task distribution by status"
 * />
 * ```
 */
export function ProportionChart({
  data,
  colors,
  formatValue,
  height = 'h-2',
  showLegend = false,
  ariaLabel,
  className,
  ...props
}: ProportionChartProps) {
  // Validate: no negative values allowed
  const hasNegative = data.some((d) => d.value < 0)
  if (hasNegative) {
    throw new Error(
      'ProportionChart: Negative values are not supported. All segment values must be >= 0.'
    )
  }

  // Filter out zero-value segments and enrich with color config
  const validSegments = data.filter((d) => d.value > 0)

  // Validate: all segment keys must have color configuration
  const missingColors = validSegments.filter((d) => !colors[d.key])
  if (missingColors.length > 0) {
    const missingKeys = missingColors.map((d) => d.key).join(', ')
    throw new Error(
      `ProportionChart: Missing color configuration for segment keys: ${missingKeys}. ` +
      `Ensure all segment keys have corresponding entries in the colors prop.`
    )
  }

  // Calculate total first for percentage calculations
  const total = validSegments.reduce((sum, d) => sum + d.value, 0)

  // Enrich segments with color config and pre-calculate percentages (DRY)
  const segments = validSegments.map((d) => {
    const percentage = (d.value / total) * 100
    return {
      ...d,
      ...colors[d.key],
      percentage,
    }
  })

  // Empty state: no data or all values are zero
  if (total === 0) {
    return (
      <div
        className={cn('gp-proportion-chart', className)}
        role="img"
        aria-label={ariaLabel || 'Empty chart with no data'}
        {...props}
      >
        <div
          className={cn(
            height,
            'w-full rounded bg-gray-200 dark:bg-gray-700',
            'flex items-center justify-center'
          )}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400">No data</span>
        </div>
      </div>
    )
  }

  // Generate accessible label if not provided
  const defaultAriaLabel = `Proportion chart showing ${segments.length} categories totaling ${formatValue(total)}`

  return (
    <div className={cn('gp-proportion-chart', className)} {...props}>
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <div
              className={cn('flex rounded overflow-hidden cursor-pointer', height)}
              role="img"
              aria-label={ariaLabel || defaultAriaLabel}
            >
              {segments.map((seg) => (
                <div
                  key={seg.key}
                  className={cn(seg.bg, 'transition-opacity hover:opacity-80')}
                  style={{ width: `${seg.percentage}%` }}
                  aria-label={`${seg.label}: ${formatValue(seg.value)} (${seg.percentage.toFixed(0)}%)`}
                />
              ))}
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content className="text-xs">
            <div className="grid grid-cols-[auto_auto_auto] gap-x-4 gap-y-1">
              {segments.map((seg) => (
                <Fragment key={seg.key}>
                  <span className="flex items-center gap-1.5">
                    <span className={cn('w-2 h-2 rounded-sm', seg.bg)} aria-hidden="true" />
                    {seg.label}
                  </span>
                  <span className="text-right font-mono">{formatValue(seg.value)}</span>
                  <span className="text-right text-gray-400 dark:text-gray-500">
                    {seg.percentage.toFixed(0)}%
                  </span>
                </Fragment>
              ))}
            </div>
            <div
              className="mt-1 pt-1 border-t border-gray-600 dark:border-gray-500 flex justify-between"
              role="row"
            >
              <span role="cell">Total</span>
              <span className="font-mono" role="cell">
                {formatValue(total)}
              </span>
            </div>
          </Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>

      {/* Legend (optional) */}
      {showLegend && (
        <div
          className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-3"
          role="list"
          aria-label="Chart legend"
        >
          {segments.map((seg) => (
            <div key={seg.key} className="flex items-center gap-2" role="listitem">
              <span className={cn('w-3 h-3 rounded', seg.bg)} aria-hidden="true" />
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{seg.label}</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatValue(seg.value)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
