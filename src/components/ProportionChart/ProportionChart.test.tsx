import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProportionChart, type ColorConfig, type ProportionSegment } from './ProportionChart'

describe('ProportionChart', () => {
  const mockData: ProportionSegment[] = [
    { key: 'completed', value: 60 },
    { key: 'in-progress', value: 30 },
    { key: 'pending', value: 10 },
  ]

  const mockColors: Record<string, ColorConfig> = {
    completed: { bg: 'bg-green-500', label: 'Completed' },
    'in-progress': { bg: 'bg-blue-500', label: 'In Progress' },
    pending: { bg: 'bg-yellow-500', label: 'Pending' },
  }

  const mockFormatValue = (value: number) => `${value} items`

  describe('rendering', () => {
    it('renders with basic props', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      expect(container.querySelector('.gp-proportion-chart')).toBeInTheDocument()
    })

    it('applies base theme class', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const chart = container.querySelector('.gp-proportion-chart')
      expect(chart).toHaveClass('gp-proportion-chart')
    })

    it('applies custom className', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          className="custom-class"
        />
      )
      const chart = container.querySelector('.gp-proportion-chart')
      expect(chart).toHaveClass('gp-proportion-chart', 'custom-class')
    })
  })

  describe('data handling', () => {
    it('renders all non-zero segments', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const segments = container.querySelectorAll('.bg-green-500, .bg-blue-500, .bg-yellow-500')
      expect(segments).toHaveLength(3)
    })

    it('filters out zero-value segments', () => {
      const dataWithZero: ProportionSegment[] = [
        { key: 'completed', value: 60 },
        { key: 'in-progress', value: 0 },
        { key: 'pending', value: 40 },
      ]
      const { container } = render(
        <ProportionChart
          data={dataWithZero}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const segments = container.querySelectorAll('.bg-green-500, .bg-blue-500, .bg-yellow-500')
      expect(segments).toHaveLength(2) // Only completed and pending
      expect(container.querySelector('.bg-blue-500')).not.toBeInTheDocument()
    })

    it('calculates percentages correctly', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const completedSegment = container.querySelector('.bg-green-500')
      expect(completedSegment).toHaveStyle({ width: '60%' }) // 60/100
    })
  })

  describe('validation', () => {
    it('throws error when data contains negative values', () => {
      const negativeData: ProportionSegment[] = [
        { key: 'completed', value: 100 },
        { key: 'in-progress', value: -30 },
      ]

      expect(() => {
        render(
          <ProportionChart
            data={negativeData}
            colors={mockColors}
            formatValue={mockFormatValue}
          />
        )
      }).toThrow('ProportionChart: Negative values are not supported')
    })

    it('throws error when color configuration is missing for a segment', () => {
      const dataWithMissingColor: ProportionSegment[] = [
        { key: 'completed', value: 60 },
        { key: 'unknown', value: 40 },
      ]

      expect(() => {
        render(
          <ProportionChart
            data={dataWithMissingColor}
            colors={mockColors}
            formatValue={mockFormatValue}
          />
        )
      }).toThrow('ProportionChart: Missing color configuration for segment keys: unknown')
    })

    it('throws error listing all missing color configurations', () => {
      const dataWithMultipleMissing: ProportionSegment[] = [
        { key: 'completed', value: 30 },
        { key: 'missing1', value: 35 },
        { key: 'missing2', value: 35 },
      ]

      expect(() => {
        render(
          <ProportionChart
            data={dataWithMultipleMissing}
            colors={mockColors}
            formatValue={mockFormatValue}
          />
        )
      }).toThrow('missing1, missing2')
    })
  })

  describe('height prop', () => {
    it('applies default height class', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const bar = container.querySelector('.flex.rounded')
      expect(bar).toHaveClass('h-2')
    })

    it('applies custom height class', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          height="h-4"
        />
      )
      const bar = container.querySelector('.flex.rounded')
      expect(bar).toHaveClass('h-4')
    })
  })

  describe('legend', () => {
    it('does not show legend by default', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const legend = container.querySelector('[role="list"]')
      expect(legend).not.toBeInTheDocument()
    })

    it('shows legend when showLegend is true', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          showLegend={true}
        />
      )
      const legend = container.querySelector('[role="list"]')
      expect(legend).toBeInTheDocument()
    })

    it('renders legend items with correct labels', () => {
      render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          showLegend={true}
        />
      )
      expect(screen.getByText('Completed')).toBeInTheDocument()
      expect(screen.getByText('In Progress')).toBeInTheDocument()
      expect(screen.getByText('Pending')).toBeInTheDocument()
    })

    it('renders legend items with formatted values', () => {
      render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          showLegend={true}
        />
      )
      expect(screen.getByText('60 items')).toBeInTheDocument()
      expect(screen.getByText('30 items')).toBeInTheDocument()
      expect(screen.getByText('10 items')).toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('renders empty state when total is zero', () => {
      const emptyData: ProportionSegment[] = [{ key: 'none', value: 0 }]
      render(
        <ProportionChart
          data={emptyData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      expect(screen.getByText('No data')).toBeInTheDocument()
    })

    it('renders empty state when all values are zero', () => {
      const allZeroData: ProportionSegment[] = [
        { key: 'a', value: 0 },
        { key: 'b', value: 0 },
        { key: 'c', value: 0 },
      ]
      render(
        <ProportionChart
          data={allZeroData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      expect(screen.getByText('No data')).toBeInTheDocument()
    })

    it('renders empty state with custom className', () => {
      const emptyData: ProportionSegment[] = [{ key: 'none', value: 0 }]
      const { container } = render(
        <ProportionChart
          data={emptyData}
          colors={mockColors}
          formatValue={mockFormatValue}
          className="custom-empty"
        />
      )
      const chart = container.querySelector('.gp-proportion-chart')
      expect(chart).toHaveClass('custom-empty')
    })
  })

  describe('formatValue function', () => {
    it('uses custom format function for values', () => {
      const customFormat = (value: number) => `$${value.toFixed(2)}`
      render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={customFormat}
          showLegend={true}
        />
      )
      expect(screen.getByText('$60.00')).toBeInTheDocument()
      expect(screen.getByText('$30.00')).toBeInTheDocument()
    })

    it('formats different value types correctly', () => {
      const percentFormat = (value: number) => `${value}%`
      render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={percentFormat}
          showLegend={true}
        />
      )
      expect(screen.getByText('60%')).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has role="img" on the bar', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const bar = container.querySelector('.flex.rounded')
      expect(bar).toHaveAttribute('role', 'img')
    })

    it('uses custom aria-label when provided', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          ariaLabel="Task distribution chart"
        />
      )
      const bar = container.querySelector('[role="img"]')
      expect(bar).toHaveAttribute('aria-label', 'Task distribution chart')
    })

    it('generates default aria-label when not provided', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const bar = container.querySelector('[role="img"]')
      const ariaLabel = bar?.getAttribute('aria-label')
      expect(ariaLabel).toContain('Proportion chart')
      expect(ariaLabel).toContain('100 items') // total formatted
    })

    it('has aria-label on empty state', () => {
      const emptyData: ProportionSegment[] = [{ key: 'none', value: 0 }]
      const { container } = render(
        <ProportionChart
          data={emptyData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const chart = container.querySelector('[role="img"]')
      expect(chart).toHaveAttribute('aria-label', 'Empty chart with no data')
    })

    it('marks color indicators as aria-hidden in legend', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          showLegend={true}
        />
      )
      const colorIndicators = container.querySelectorAll('.w-3.h-3.rounded')
      colorIndicators.forEach((indicator) => {
        expect(indicator).toHaveAttribute('aria-hidden', 'true')
      })
    })

    it('has semantic role attributes on legend', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          showLegend={true}
        />
      )
      const legend = container.querySelector('[role="list"]')
      expect(legend).toBeInTheDocument()
      expect(legend).toHaveAttribute('aria-label', 'Chart legend')

      const legendItems = container.querySelectorAll('[role="listitem"]')
      expect(legendItems).toHaveLength(3)
    })
  })

  describe('colors', () => {
    it('applies correct color classes to segments', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      expect(container.querySelector('.bg-green-500')).toBeInTheDocument()
      expect(container.querySelector('.bg-blue-500')).toBeInTheDocument()
      expect(container.querySelector('.bg-yellow-500')).toBeInTheDocument()
    })

    it('applies hover opacity transition to segments', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const segments = container.querySelectorAll('.transition-opacity.hover\\:opacity-80')
      expect(segments).toHaveLength(3)
    })

    it('applies color classes to legend indicators', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          showLegend={true}
        />
      )
      const legendColors = container.querySelectorAll('.w-3.h-3.rounded')
      expect(legendColors[0]).toHaveClass('bg-green-500')
      expect(legendColors[1]).toHaveClass('bg-blue-500')
      expect(legendColors[2]).toHaveClass('bg-yellow-500')
    })
  })

  describe('tooltip', () => {
    it('renders tooltip trigger', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      // Tooltip.Trigger wraps the bar
      const bar = container.querySelector('.flex.rounded.cursor-pointer')
      expect(bar).toBeInTheDocument()
    })

    it('bar has cursor-pointer for tooltip interaction', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
        />
      )
      const bar = container.querySelector('.flex.rounded')
      expect(bar).toHaveClass('cursor-pointer')
    })
  })

  describe('HTML attributes passthrough', () => {
    it('passes through HTML attributes to root element', () => {
      const { container } = render(
        <ProportionChart
          data={mockData}
          colors={mockColors}
          formatValue={mockFormatValue}
          data-testid="custom-chart"
          id="my-chart"
        />
      )
      const chart = container.querySelector('.gp-proportion-chart')
      expect(chart).toHaveAttribute('data-testid', 'custom-chart')
      expect(chart).toHaveAttribute('id', 'my-chart')
    })
  })
})
