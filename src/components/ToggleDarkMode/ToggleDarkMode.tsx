import { useState, useEffect, useCallback } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button, type ButtonProps } from '../Button'

export type ThemePreference = 'light' | 'dark' | 'system'

export interface ToggleDarkModeProps {
  /**
   * Color mode for background context (passed to Button)
   * - light: Optimized for light backgrounds (default)
   * - dark: Optimized for dark backgrounds (e.g., dark headers)
   */
  mode?: ButtonProps['mode']

  /**
   * Button size
   */
  size?: ButtonProps['size']

  /**
   * Button variant (default: ghost)
   */
  variant?: ButtonProps['variant']

  /**
   * Show label text next to icon
   */
  showLabel?: boolean

  /**
   * Custom label for light mode
   */
  lightLabel?: string

  /**
   * Custom label for dark mode
   */
  darkLabel?: string

  /**
   * Custom label for system mode
   */
  systemLabel?: string

  /**
   * localStorage key for persisting preference
   */
  storageKey?: string

  /**
   * Callback when theme preference changes
   */
  onChange?: (theme: ThemePreference) => void

  /**
   * Additional CSS classes
   */
  className?: string
}

const CYCLE: ThemePreference[] = ['light', 'dark', 'system']

function getSystemDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

/**
 * Toggle button for cycling between light, dark, and system color modes.
 * Automatically persists preference to localStorage and applies
 * the 'dark' class to the document element.
 *
 * @example
 * ```tsx
 * // In a dark header
 * <ToggleDarkMode mode="dark" />
 *
 * // With label
 * <ToggleDarkMode showLabel />
 *
 * // With change callback
 * <ToggleDarkMode onChange={(theme) => console.log('Theme:', theme)} />
 * ```
 */
export function ToggleDarkMode({
  mode = 'light',
  size = 'sm',
  variant = 'ghost',
  showLabel = false,
  lightLabel = 'Light',
  darkLabel = 'Dark',
  systemLabel = 'System',
  storageKey = 'darkMode',
  onChange,
  className,
}: ToggleDarkModeProps) {
  const [theme, setTheme] = useState<ThemePreference>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      // Migrate legacy boolean values
      if (saved === 'true') return 'dark'
      if (saved === 'false') return 'light'
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved
    }
    return 'system'
  })

  // Apply dark mode class based on theme preference
  useEffect(() => {
    const apply = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark)
    }

    if (theme === 'system') {
      apply(getSystemDark())
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => apply(e.matches)
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }

    apply(theme === 'dark')
  }, [theme])

  // Persist preference
  useEffect(() => {
    localStorage.setItem(storageKey, theme)
  }, [theme, storageKey])

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = CYCLE[(CYCLE.indexOf(prev) + 1) % CYCLE.length]
      onChange?.(next)
      return next
    })
  }, [onChange])

  const icon = { light: <Sun />, dark: <Moon />, system: <Monitor /> }[theme]
  const label = { light: lightLabel, dark: darkLabel, system: systemLabel }[theme]
  const nextTheme = CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]
  const ariaLabel = `Switch to ${nextTheme} mode`

  return (
    <Button
      variant={variant}
      size={size}
      mode={mode}
      icon={icon}
      onClick={toggle}
      className={className}
      aria-label={ariaLabel}
    >
      {showLabel && label}
    </Button>
  )
}
