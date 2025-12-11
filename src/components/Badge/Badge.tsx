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

  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-1 text-sm',
  }

  const iconSizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
  }

  return (
    <span
      className={cn(
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
      {children}
    </span>
  )
}
