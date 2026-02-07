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
export function Card({ children, interactive = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'gp-card',
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
