import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactNode, type ReactElement } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * - primary: Orange background (TheGP brand) - use for primary CTAs only
   * - secondary: Navy outline - use for secondary actions
   * - ghost: Transparent with hover - use for tertiary actions
   * - destructive: Red background - use for delete/remove actions
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'

  /**
   * Button size
   * - sm: Compact button for tight spaces
   * - md: Standard button size (default)
   * - lg: Large button for primary actions
   */
  size?: 'sm' | 'md' | 'lg'

  /**
   * Show loading spinner and disable interaction
   */
  loading?: boolean

  /**
   * Optional icon to display
   */
  icon?: ReactNode

  /**
   * Icon position (default: left)
   */
  iconPosition?: 'left' | 'right'

  /**
   * Apply spin animation to the icon
   */
  spin?: boolean
}

/**
 * Button component with TheGP design system styling.
 *
 * Icons passed via the `icon` prop are automatically sized to match the button size.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleSubmit}>
 *   Submit
 * </Button>
 *
 * <Button variant="secondary" loading={isLoading}>
 *   Save Draft
 * </Button>
 *
 * <Button variant="destructive" icon={<Trash2 />}>
 *   Delete
 * </Button>
 *
 * <Button variant="ghost" size="sm" icon={<RefreshCw />} spin={isRefreshing}>
 *   Refresh
 * </Button>
 * ```
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  spin = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'gp-button-primary',
    secondary: 'gp-button-secondary',
    ghost: 'gp-button-ghost',
    destructive: 'gp-button-destructive',
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  }

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const isDisabled = disabled || loading

  // Helper to render icon with appropriate size and animation classes
  const renderIcon = (iconNode: ReactNode) => {
    if (!isValidElement(iconNode)) {
      return iconNode
    }

    // Clone the icon element and inject size and animation classes
    return cloneElement(iconNode as ReactElement<{ className?: string }>, {
      className: cn(
        iconSizeClasses[size],
        spin && 'animate-spin',
        (iconNode as ReactElement<{ className?: string }>).props.className
      ),
    })
  }

  return (
    <button
      className={cn(
        variantClasses[variant],
        sizeClasses[size],
        'inline-flex items-center justify-center gap-2',
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled}
      {...props}
    >
      {loading && (
        <Loader2 className={cn(iconSizeClasses[size], 'animate-spin')} aria-hidden="true" />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span aria-hidden="true">
          {renderIcon(icon)}
        </span>
      )}
      {children}
      {!loading && icon && iconPosition === 'right' && (
        <span aria-hidden="true">
          {renderIcon(icon)}
        </span>
      )}
    </button>
  )
}
