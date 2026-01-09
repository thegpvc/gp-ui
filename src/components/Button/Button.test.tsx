import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Trash2, RefreshCw } from 'lucide-react'
import { Button } from './Button'

describe('Button', () => {
  describe('variants', () => {
    it('renders primary variant with correct class', () => {
      render(<Button variant="primary">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-primary')
    })

    it('renders secondary variant with correct class', () => {
      render(<Button variant="secondary">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-secondary')
    })

    it('renders ghost variant with correct class', () => {
      render(<Button variant="ghost">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-ghost')
    })

    it('renders destructive variant with correct class', () => {
      render(<Button variant="destructive">Delete</Button>)
      const button = screen.getByRole('button', { name: /delete/i })
      expect(button).toHaveClass('gp-button-destructive')
    })
  })

  describe('mode prop', () => {
    it('defaults to light mode', () => {
      render(<Button variant="primary">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-primary')
    })

    it('renders dark mode variant when mode is dark', () => {
      render(<Button variant="primary" mode="dark">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-primary-dark')
    })

    it('renders secondary-dark when variant=secondary and mode=dark', () => {
      render(<Button variant="secondary" mode="dark">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-secondary-dark')
    })

    it('renders ghost-dark when variant=ghost and mode=dark', () => {
      render(<Button variant="ghost" mode="dark">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-ghost-dark')
    })

    it('renders destructive-dark when variant=destructive and mode=dark', () => {
      render(<Button variant="destructive" mode="dark">Delete</Button>)
      const button = screen.getByRole('button', { name: /delete/i })
      expect(button).toHaveClass('gp-button-destructive-dark')
    })
  })

  describe('sizes', () => {
    it('renders small size with correct classes', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button', { name: /small/i })
      expect(button).toHaveClass('px-3', 'py-1.5', 'text-xs')
    })

    it('renders medium size with correct classes (default)', () => {
      render(<Button size="md">Medium</Button>)
      const button = screen.getByRole('button', { name: /medium/i })
      expect(button).toHaveClass('px-4', 'py-2', 'text-sm')
    })

    it('renders large size with correct classes', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button', { name: /large/i })
      expect(button).toHaveClass('px-5', 'py-2.5', 'text-base')
    })
  })

  describe('loading state', () => {
    it('shows loader when loading is true', () => {
      render(<Button loading>Submit</Button>)
      const loader = document.querySelector('.animate-spin')
      expect(loader).toBeInTheDocument()
    })

    it('disables button when loading', () => {
      render(<Button loading>Submit</Button>)
      const button = screen.getByRole('button', { name: /submit/i })
      expect(button).toBeDisabled()
    })

    it('sets aria-busy when loading', () => {
      render(<Button loading>Submit</Button>)
      const button = screen.getByRole('button', { name: /submit/i })
      expect(button).toHaveAttribute('aria-busy', 'true')
    })

    it('hides icon when loading', () => {
      render(<Button loading icon={<Trash2 data-testid="trash-icon" />}>Delete</Button>)
      expect(screen.queryByTestId('trash-icon')).not.toBeInTheDocument()
    })
  })

  describe('disabled state', () => {
    it('disables button when disabled prop is true', () => {
      render(<Button disabled>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeDisabled()
    })

    it('sets aria-disabled when disabled', () => {
      render(<Button disabled>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('icons', () => {
    it('renders icon on the left by default', () => {
      const { container } = render(
        <Button icon={<Trash2 data-testid="icon" />}>Delete</Button>
      )
      const button = container.querySelector('button')
      const icon = screen.getByTestId('icon')
      const iconWrapper = icon.closest('span')

      expect(iconWrapper).toBeInTheDocument()
      expect(button!.childNodes[0]).toBe(iconWrapper) // Icon should be first child (left position)
    })

    it('renders icon on the right when iconPosition is right', () => {
      const { container } = render(
        <Button icon={<Trash2 data-testid="icon" />} iconPosition="right">
          Delete
        </Button>
      )
      const button = container.querySelector('button')
      const icon = screen.getByTestId('icon')
      const iconWrapper = icon.closest('span')
      const lastChild = button!.lastChild

      expect(iconWrapper).toBeInTheDocument()
      expect(lastChild).toBe(iconWrapper)
    })

    it('applies spin animation when spin prop is true', () => {
      render(<Button icon={<RefreshCw />} spin>Refresh</Button>)
      const icon = document.querySelector('.animate-spin')
      expect(icon).toBeInTheDocument()
    })

    it('sizes icon correctly for sm size', () => {
      render(<Button size="sm" icon={<Trash2 />}>Delete</Button>)
      const icon = document.querySelector('.w-3\\.5')
      expect(icon).toBeInTheDocument()
    })

    it('sizes icon correctly for md size', () => {
      render(<Button size="md" icon={<Trash2 />}>Delete</Button>)
      const icon = document.querySelector('.w-4')
      expect(icon).toBeInTheDocument()
    })

    it('sizes icon correctly for lg size', () => {
      render(<Button size="lg" icon={<Trash2 />}>Delete</Button>)
      const icon = document.querySelector('.w-5')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)

      const button = screen.getByRole('button', { name: /click me/i })
      await user.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} disabled>Click me</Button>)

      const button = screen.getByRole('button', { name: /click me/i })
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('does not call onClick when loading', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<Button onClick={handleClick} loading>Click me</Button>)

      const button = screen.getByRole('button', { name: /click me/i })
      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('custom className', () => {
    it('merges custom className with default classes', () => {
      render(<Button className="custom-class">Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveClass('gp-button-primary', 'custom-class')
    })
  })

  describe('accessibility', () => {
    it('has correct aria-busy attribute when not loading', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveAttribute('aria-busy', 'false')
    })

    it('has correct aria-disabled attribute when not disabled', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toHaveAttribute('aria-disabled', 'false')
    })

    it('marks icon as aria-hidden', () => {
      render(<Button icon={<Trash2 data-testid="icon" />}>Delete</Button>)
      const iconWrapper = screen.getByTestId('icon').closest('span')
      expect(iconWrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
