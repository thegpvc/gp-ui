import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { InputWrapper } from './InputWrapper'
import type { InputVariant, InputSize, LabelVariant } from './types'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Input label text
   */
  label?: string

  /**
   * Label position relative to input
   * - above: Label stacked above input (default for forms)
   * - before: Label inline before input (horizontal layout)
   * - after: Label inline after input (checkboxes, toggles)
   */
  labelVariant?: LabelVariant

  /**
   * Visual style variant
   * - default: Standard input (border-gray-200)
   * - error: Error state (red border, red focus ring)
   * - success: Success state (green border, green focus ring)
   */
  variant?: InputVariant

  /**
   * Input size
   * - sm: Compact input (py-1.5)
   * - md: Standard size (py-2, default)
   * - lg: Large input (py-2.5)
   */
  size?: InputSize

  /**
   * Optional prefix icon (left side)
   */
  prefixIcon?: ReactNode

  /**
   * Optional suffix icon (right side)
   */
  suffixIcon?: ReactNode

  /**
   * Helper text below input (hints, error messages)
   */
  helperText?: string

  /**
   * Additional className for the wrapper container
   */
  wrapperClassName?: string
}

/**
 * Input component for text entry with label integration and icon support.
 * Supports all HTML5 input types.
 *
 * @example
 * ```tsx
 * // Basic text input
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="you@example.com"
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With error state
 * <Input
 *   label="Password"
 *   type="password"
 *   variant="error"
 *   helperText="Password must be at least 8 characters"
 *   required
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With prefix icon
 * import { Search } from 'lucide-react'
 *
 * <Input
 *   placeholder="Search..."
 *   prefixIcon={<Search className="w-4 h-4" />}
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      labelVariant = 'above',
      variant = 'default',
      size = 'md',
      prefixIcon,
      suffixIcon,
      helperText,
      required,
      className,
      wrapperClassName,
      ...props
    },
    ref
  ) => {
    // Base styles shared by all inputs
    const baseClasses = 'w-full border rounded-md bg-white dark:bg-navy-800 transition-colors focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-navy-900 placeholder:text-navy-400 dark:placeholder:text-navy-500 text-navy-900 dark:text-navy-100'

    // Variant-specific border and focus styles
    const variantClasses = {
      default: 'border-gray-200 dark:border-navy-600 focus:ring-orange-500',
      error: 'border-rose-400 dark:border-rose-600 focus:ring-rose-700',
      success: 'border-emerald-300 dark:border-emerald-600 focus:ring-emerald-700',
    }

    // Size-specific padding and font
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base',
    }

    return (
      <InputWrapper
        label={label}
        labelVariant={labelVariant}
        variant={variant}
        required={required}
        helperText={helperText}
        className={wrapperClassName}
      >
        {({ id }) => (
          <div className="relative">
            {prefixIcon && (
              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-navy-400 dark:text-navy-500 pointer-events-none">
                {prefixIcon}
              </div>
            )}
            <input
              ref={ref}
              id={id}
              className={cn(
                baseClasses,
                variantClasses[variant],
                sizeClasses[size],
                prefixIcon && 'pl-9',
                suffixIcon && 'pr-9',
                className
              )}
              aria-invalid={variant === 'error'}
              aria-describedby={helperText ? `${id}-helper` : undefined}
              required={required}
              {...props}
            />
            {suffixIcon && (
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-400 dark:text-navy-500 flex items-center">
                {suffixIcon}
              </div>
            )}
          </div>
        )}
      </InputWrapper>
    )
  }
)

Input.displayName = 'Input'
