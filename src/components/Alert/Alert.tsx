import type { ReactNode } from 'react'
import { Info, AlertTriangle, X, CheckCircle, XCircle } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface AlertProps {
  /**
   * Visual style variant
   * - info: Navy (informational messages)
   * - warning: Amber (warnings, cautions)
   * - error: Red (errors, critical issues)
   * - success: Green (success confirmations)
   */
  variant: 'info' | 'warning' | 'error' | 'success'

  /**
   * Optional title for the alert
   */
  title?: string

  /**
   * Alert content
   */
  children: ReactNode

  /**
   * If true, shows a close button
   */
  dismissible?: boolean

  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Alert component for displaying contextual messages.
 *
 * @example
 * ```tsx
 * <Alert variant="info">
 *   This is an informational message.
 * </Alert>
 *
 * <Alert variant="error" title="Error" dismissible onDismiss={() => setShowAlert(false)}>
 *   Something went wrong. Please try again.
 * </Alert>
 * ```
 */
export function Alert({
  variant,
  title,
  children,
  dismissible = false,
  onDismiss,
  className = '',
}: AlertProps) {
  const variantClasses = {
    info: 'gp-alert-info',
    warning: 'gp-alert-warning',
    error: 'gp-alert-error',
    success: 'gp-alert-success',
  }

  const icons = {
    info: <Info className="w-5 h-5" aria-hidden="true" />,
    warning: <AlertTriangle className="w-5 h-5" aria-hidden="true" />,
    error: <XCircle className="w-5 h-5" aria-hidden="true" />,
    success: <CheckCircle className="w-5 h-5" aria-hidden="true" />,
  }

  const iconColors = {
    info: 'text-navy-600 dark:text-navy-300',
    warning: 'text-amber-600 dark:text-amber-400',
    error: 'text-rose-700 dark:text-rose-400',
    success: 'text-emerald-700 dark:text-emerald-400',
  }

  return (
    <div
      className={cn(
        variantClasses[variant],
        'flex gap-3',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className={cn('flex-shrink-0', iconColors[variant])}>
        {icons[variant]}
      </div>

      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="font-semibold mb-1">
            {title}
          </h3>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>

      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
