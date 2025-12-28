import { useId, type ReactNode } from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/cn'
import type { InputVariant, LabelVariant } from './types'

export interface InputWrapperProps {
  /**
   * Label text
   */
  label?: string

  /**
   * Label position relative to input
   */
  labelVariant?: LabelVariant

  /**
   * Visual style variant (affects helper text color)
   */
  variant?: InputVariant

  /**
   * Required field indicator
   */
  required?: boolean

  /**
   * Helper text below input
   */
  helperText?: string

  /**
   * Spacing above helper text (default: 'mt-1')
   */
  helperSpacing?: string

  /**
   * Render prop that receives the generated ID
   */
  children: (props: { id: string }) => ReactNode

  /**
   * Additional className for the wrapper
   */
  className?: string
}

/**
 * Shared wrapper component for Input and TextArea that handles:
 * - Label positioning (above/before/after)
 * - Required indicator
 * - Helper text with variant styling
 */
export function InputWrapper({
  label,
  labelVariant = 'above',
  variant = 'default',
  required = false,
  helperText,
  helperSpacing = 'mt-1',
  children,
  className,
}: InputWrapperProps) {
  const id = useId()

  // If no label, just render the input with optional helper text
  if (!label) {
    return (
      <div className={cn('w-full', className)}>
        {children({ id })}
        {helperText && (
          <p
            className={cn(
              helperSpacing,
              'text-xs',
              variant === 'error' && 'text-rose-700',
              variant === 'success' && 'text-emerald-700',
              variant === 'default' && 'text-navy-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }

  // Label above (vertical layout)
  if (labelVariant === 'above') {
    return (
      <div className={cn('w-full', className)}>
        <LabelPrimitive.Root
          htmlFor={id}
          className={cn('text-sm font-medium text-navy-900 mb-1', required && 'gp-input-label-required')}
        >
          {label}
        </LabelPrimitive.Root>
        {children({ id })}
        {helperText && (
          <p
            className={cn(
              helperSpacing,
              'text-xs',
              variant === 'error' && 'text-rose-700',
              variant === 'success' && 'text-emerald-700',
              variant === 'default' && 'text-navy-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }

  // Label before (horizontal layout)
  if (labelVariant === 'before') {
    return (
      <div className={cn('w-full', className)}>
        <div className="flex items-center gap-2">
          <LabelPrimitive.Root
            htmlFor={id}
            className={cn(
              'text-sm font-medium text-navy-900 shrink-0',
              required && 'gp-input-label-required'
            )}
          >
            {label}
          </LabelPrimitive.Root>
          {children({ id })}
        </div>
        {helperText && (
          <p
            className={cn(
              helperSpacing,
              'text-xs',
              variant === 'error' && 'text-rose-700',
              variant === 'success' && 'text-emerald-700',
              variant === 'default' && 'text-navy-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }

  // Label after (horizontal layout, reversed)
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center gap-2 flex-row-reverse justify-end">
        <LabelPrimitive.Root
          htmlFor={id}
          className={cn('text-sm font-medium text-navy-900', required && 'gp-input-label-required')}
        >
          {label}
        </LabelPrimitive.Root>
        {children({ id })}
      </div>
      {helperText && (
        <p
          className={cn(
            helperSpacing,
            'text-xs',
            variant === 'error' && 'text-red-600',
            variant === 'success' && 'text-emerald-600',
            variant === 'default' && 'text-navy-500'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
