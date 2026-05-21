import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: ReactNode

  /**
   * Make the card clickable/hoverable
   */
  interactive?: boolean

  /**
   * Corner radius
   * - md: 6px — tight, inline cards
   * - lg: 8px — small cards (previous Card default)
   * - card: 16px — brand-tile look (new default)
   */
  radius?: 'md' | 'lg' | 'card'
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Card component with compound pattern for structured content.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Card.Header>
 *     <h2>Title</h2>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Content goes here</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 *
 * @example Simple usage without sections
 * ```tsx
 * <Card>
 *   <h2>Title</h2>
 *   <p>Content</p>
 * </Card>
 * ```
 */
const radiusClasses: Record<NonNullable<CardProps['radius']>, string> = {
  md: 'rounded-md',
  lg: 'rounded-lg',
  card: '', // gp-card already applies rounded-card
}

export function Card({ children, interactive = false, radius = 'card', className = '', ...props }: CardProps) {
  // For non-default radii, override the rounded-card baked into gp-card.
  const radiusOverride = radius === 'card' ? '' : `!${radiusClasses[radius]}`
  return (
    <div
      className={cn(
        'gp-card',
        radiusOverride,
        interactive && 'cursor-pointer hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card header with bottom border
 */
Card.Header = function CardHeader({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div
      className={cn('border-b border-gray-200 dark:border-navy-700 pb-3 mb-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Card body (main content area)
 */
Card.Body = function CardBody({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

/**
 * Card footer with top border
 */
Card.Footer = function CardFooter({ children, className = '', ...props }: CardSectionProps) {
  return (
    <div
      className={cn('border-t border-gray-200 dark:border-navy-700 pt-3 mt-3', className)}
      {...props}
    >
      {children}
    </div>
  )
}
