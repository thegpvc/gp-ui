import {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '../../utils/cn'
import { InputWrapper } from './InputWrapper'
import type { InputVariant, InputSize } from './types'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * TextArea label text
   */
  label?: string

  /**
   * Label position (only 'above' supported for textarea)
   */
  labelVariant?: 'above'

  /**
   * Visual style variant
   * - default: Standard textarea (border-gray-200)
   * - error: Error state (red border, red focus ring)
   * - success: Success state (green border, green focus ring)
   */
  variant?: InputVariant

  /**
   * TextArea size (affects padding and min-height)
   * - sm: Compact (min-h-[4rem])
   * - md: Standard (min-h-[6rem], default)
   * - lg: Large (min-h-[8rem])
   */
  size?: InputSize

  /**
   * Helper text below textarea (hints, error messages)
   */
  helperText?: string

  /**
   * Auto-resize based on content (default: false)
   */
  autoResize?: boolean

  /**
   * Additional className for the wrapper container
   */
  wrapperClassName?: string
}

/**
 * TextArea component for multi-line text entry with label integration.
 * Supports optional auto-resize functionality.
 *
 * @example
 * ```tsx
 * // Basic textarea
 * <TextArea
 *   label="Description"
 *   placeholder="Enter description..."
 *   rows={4}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With auto-resize
 * <TextArea
 *   label="Comments"
 *   placeholder="Your comments..."
 *   autoResize
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With error state
 * <TextArea
 *   label="Message"
 *   variant="error"
 *   helperText="Message is required"
 *   required
 * />
 * ```
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      labelVariant = 'above',
      variant = 'default',
      size = 'md',
      helperText,
      required,
      autoResize = false,
      className,
      wrapperClassName,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null)

    // Expose the ref to parent components
    useImperativeHandle(ref, () => internalRef.current!)

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && internalRef.current) {
        // Reset height to auto to get the correct scrollHeight
        internalRef.current.style.height = 'auto'
        // Set height to scrollHeight
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`
      }
    }, [value, autoResize])

    // Base styles shared by all textareas
    const baseClasses = 'w-full border rounded-md bg-white transition-colors resize-y focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 placeholder:text-navy-400 text-navy-900'

    // Variant-specific border and focus styles
    const variantClasses = {
      default: 'border-gray-200 focus:ring-orange-500',
      error: 'border-rose-400 focus:ring-rose-700',
      success: 'border-emerald-300 focus:ring-emerald-700',
    }

    // Size-specific padding, font, and min-height
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm min-h-[4rem]',
      md: 'px-3 py-2 text-sm min-h-[6rem]',
      lg: 'px-4 py-2.5 text-base min-h-[8rem]',
    }

    return (
      <InputWrapper
        label={label}
        labelVariant={labelVariant}
        variant={variant}
        required={required}
        helperText={helperText}
        helperSpacing="mt-0.5"
        className={wrapperClassName}
      >
        {({ id }) => (
          <textarea
            ref={internalRef}
            id={id}
            className={cn(
              baseClasses,
              variantClasses[variant],
              sizeClasses[size],
              autoResize && 'resize-none',
              className
            )}
            aria-invalid={variant === 'error'}
            aria-describedby={helperText ? `${id}-helper` : undefined}
            required={required}
            value={value}
            onChange={onChange}
            {...props}
          />
        )}
      </InputWrapper>
    )
  }
)

TextArea.displayName = 'TextArea'
