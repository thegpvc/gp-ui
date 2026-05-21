import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface EyebrowLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Show a small leading dot. Defaults to orange when omitted.
   */
  dot?: boolean

  /**
   * Color treatment.
   * - muted: dim navy/cream — for secondary section labels (default)
   * - orange: brand accent — for hero eyebrows and the dot pattern
   * - cream: warm off-white — for use on dark surfaces
   * - navy: deep navy — for use on light surfaces
   */
  color?: 'muted' | 'orange' | 'cream' | 'navy'

  /**
   * Label content
   */
  children: ReactNode
}

const colorClasses: Record<NonNullable<EyebrowLabelProps['color']>, string> = {
  muted: 'text-navy-500 dark:text-navy-300',
  orange: 'text-orange-500 dark:text-orange-400',
  cream: 'text-cream dark:text-cream',
  navy: 'text-navy-900 dark:text-navy-100',
}

/**
 * EyebrowLabel — tiny tracked uppercase section label. Pair with display
 * headlines, hero blocks, and section dividers.
 *
 * @example
 * ```tsx
 * <EyebrowLabel>A new model for founders</EyebrowLabel>
 * <EyebrowLabel dot color="orange">Case studies</EyebrowLabel>
 * <EyebrowLabel color="cream">Filter by services</EyebrowLabel>
 * ```
 */
export function EyebrowLabel({
  dot = false,
  color = 'muted',
  children,
  className,
  ...props
}: EyebrowLabelProps) {
  return (
    <span className={cn('gp-eyebrow', colorClasses[color], className)} {...props}>
      {dot ? <span className="gp-eyebrow-dot" aria-hidden="true" /> : null}
      {children}
    </span>
  )
}
