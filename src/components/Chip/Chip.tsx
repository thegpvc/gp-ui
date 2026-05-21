import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../utils/cn'

export interface ChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /**
   * Chip content
   */
  children: ReactNode

  /**
   * Whether this chip represents the active / selected state
   */
  active?: boolean

  /**
   * Optional leading icon
   */
  icon?: ReactNode

  /**
   * If provided, renders a remove (×) affordance and calls this when clicked.
   * The chip itself remains clickable; clicks on × do not bubble to onClick.
   */
  onRemove?: () => void

  /**
   * Size
   * - sm: 11px label (default)
   * - md: 13px label
   */
  size?: 'sm' | 'md'
}

/**
 * Chip — filter and category selector. Use for things like "Engineering",
 * "ETH", "Capital" — interactive pills that can toggle or be removed.
 *
 * Distinct from `Badge` (status indicator) and `Button` (action).
 *
 * @example
 * ```tsx
 * <Chip>Engineering</Chip>
 * <Chip active>ETH</Chip>
 * <Chip onRemove={() => removeFilter('capital')}>Capital</Chip>
 * ```
 */
export function Chip({
  children,
  active = false,
  icon,
  onRemove,
  size = 'sm',
  className,
  type = 'button',
  ...props
}: ChipProps) {
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  }

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.()
  }

  return (
    <button
      type={type}
      aria-pressed={active}
      className={cn(
        'gp-chip',
        active && 'gp-chip-active',
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className={cn(iconSize, 'shrink-0')} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span className="truncate">{children}</span>
      {onRemove ? (
        <span
          role="button"
          tabIndex={-1}
          onClick={handleRemove}
          className={cn(
            iconSize,
            'shrink-0 -mr-0.5 inline-flex items-center justify-center rounded-full hover:bg-navy-900/10 dark:hover:bg-cream/10 transition-colors',
          )}
          aria-label="Remove"
        >
          <X className={iconSize} aria-hidden="true" />
        </span>
      ) : null}
    </button>
  )
}
