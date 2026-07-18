import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  const tile = (label: string) =>
    // the tile is the nearest element carrying the gp-stat-card class
    screen.getByText(label).closest('.gp-stat-card') as HTMLElement

  describe('surface', () => {
    it('defaults to the muted fill', () => {
      render(<StatCard label="Sent" value={42} />)
      expect(tile('Sent')).toHaveClass('bg-gray-50')
    })

    it('renders a transparent tile when surface="plain"', () => {
      render(<StatCard label="Sent" value={42} surface="plain" />)
      const el = tile('Sent')
      expect(el).toHaveClass('bg-transparent')
      expect(el).not.toHaveClass('bg-gray-50')
    })

    it('applies plain across tiled variants (centered)', () => {
      render(<StatCard label="Sent" value={42} variant="centered" surface="plain" />)
      expect(tile('Sent')).toHaveClass('bg-transparent')
    })

    it('drops the accent fill when accent color is plain', () => {
      render(<StatCard label="Sync" value={5} color="accent" surface="plain" />)
      const el = tile('Sync')
      expect(el).toHaveClass('bg-transparent')
      expect(el).not.toHaveClass('bg-white/80')
    })
  })

  describe('display variant', () => {
    it('renders no tile chrome regardless of surface', () => {
      render(<StatCard label="Founders" value={99} variant="display" surface="plain" />)
      expect(screen.getByText('Founders').closest('.gp-stat-card')).toBeNull()
    })
  })
})
