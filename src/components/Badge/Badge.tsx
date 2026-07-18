import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps {
  /**
   * Visual style variant
   * - success: Emerald (for active, synced, completed states)
   * - warning: Amber (for pending, in-progress states)
   * - error: Red (for failed, error states)
   * - info: Navy (for informational states)
   * - neutral: Gray (for default, draft states)
   */
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral'

  /**
   * Badge size
   * - sm: Compact badge (default)
   * - md: Standard badge
   */
  size?: 'sm' | 'md'

  /**
   * Optional icon to display before text
   */
  icon?: ReactNode

  /**
   * Optional monospace count rendered inside the badge (e.g. a session or
   * item total). Tabular figures keep it aligned across rows.
   */
  count?: number | string

  /**
   * Which edge the count sits on.
   * - leading: before the label (default) — reads as "10 flagged"
   * - trailing: after the label — reads as "other 525"
   */
  countPosition?: 'leading' | 'trailing'

  /**
   * Badge content
   */
  children: ReactNode

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Badge component for status indicators and labels.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Synced</Badge>
 * <Badge variant="warning">Pending</Badge>
 * <Badge variant="error">Failed</Badge>
 * <Badge variant="info" icon={<InfoIcon />}>Info</Badge>
 * ```
 */
export function Badge({
  variant = 'neutral',
  size = 'sm',
  icon,
  count,
  countPosition = 'leading',
  children,
  className = '',
}: BadgeProps) {
  const variantClasses = {
    success: 'gp-badge-success',
    warning: 'gp-badge-warning',
    error: 'gp-badge-error',
    info: 'gp-badge-info',
    neutral: 'gp-badge-neutral',
  }

  // Geometry only — color and weight come from the gp-badge-* variant classes.
  const baseClasses = 'inline-flex items-center rounded-full'

  const sizeClasses = {
    sm: 'gap-1.5 px-3 py-[5px] text-xs',
    md: 'gap-2 px-3.5 py-1.5 text-sm',
  }

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  }

  const countEl =
    count != null ? (
      <span className="font-mono text-[11px] tabular-nums opacity-80">
        {count}
      </span>
    ) : null

  return (
    <span
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon && (
        <span className={iconSizeClasses[size]} aria-hidden="true">
          {icon}
        </span>
      )}
      {countPosition === 'leading' && countEl}
      {children}
      {countPosition === 'trailing' && countEl}
    </span>
  )
}
