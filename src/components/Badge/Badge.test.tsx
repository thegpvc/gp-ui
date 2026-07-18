import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Check } from 'lucide-react'
import { Badge } from './Badge'

describe('Badge', () => {
  describe('variants', () => {
    it('applies the variant class for the chosen variant', () => {
      render(<Badge variant="warning">Pending</Badge>)
      expect(screen.getByText('Pending')).toHaveClass('gp-badge-warning')
    })

    it('defaults to the neutral variant', () => {
      render(<Badge>Draft</Badge>)
      expect(screen.getByText('Draft')).toHaveClass('gp-badge-neutral')
    })
  })

  describe('count', () => {
    it('renders the count when provided', () => {
      render(<Badge count={10}>flagged</Badge>)
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    it('omits the count element when count is not provided', () => {
      const { container } = render(<Badge>plain</Badge>)
      expect(container.querySelector('.font-mono')).toBeNull()
    })

    it('renders a zero count (count={0} is not treated as absent)', () => {
      render(<Badge count={0}>none</Badge>)
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('places the count before the label by default (leading)', () => {
      const { container } = render(<Badge count={7}>items</Badge>)
      expect(container.firstChild?.textContent).toBe('7items')
    })

    it('places the count after the label when countPosition="trailing"', () => {
      const { container } = render(
        <Badge count={525} countPosition="trailing">
          other
        </Badge>
      )
      expect(container.firstChild?.textContent).toBe('other525')
    })
  })

  describe('icon', () => {
    it('renders an icon in the leading slot', () => {
      render(
        <Badge icon={<Check data-testid="badge-icon" />}>Synced</Badge>
      )
      expect(screen.getByTestId('badge-icon')).toBeInTheDocument()
    })
  })
})
