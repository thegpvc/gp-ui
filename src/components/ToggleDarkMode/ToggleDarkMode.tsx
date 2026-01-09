import { useState, useEffect, useCallback } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button, type ButtonProps } from '../Button'

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
   * localStorage key for persisting preference
   */
  storageKey?: string

  /**
   * Callback when dark mode changes
   */
  onChange?: (isDark: boolean) => void

  /**
   * Additional CSS classes
   */
  className?: string
}

/**
 * Toggle button for switching between light and dark modes.
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
 * // Custom labels
 * <ToggleDarkMode showLabel lightLabel="Light" darkLabel="Dark" />
 *
 * // With change callback
 * <ToggleDarkMode onChange={(isDark) => console.log('Dark mode:', isDark)} />
 * ```
 */
export function ToggleDarkMode({
  mode = 'light',
  size = 'sm',
  variant = 'ghost',
  showLabel = false,
  lightLabel = 'Light',
  darkLabel = 'Dark',
  storageKey = 'darkMode',
  onChange,
  className,
}: ToggleDarkModeProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Check for saved preference or system preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey)
      if (saved !== null) return saved === 'true'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  // Apply dark mode class to html element
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem(storageKey, String(isDarkMode))
  }, [isDarkMode, storageKey])

  const toggle = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev
      onChange?.(next)
      return next
    })
  }, [onChange])

  return (
    <Button
      variant={variant}
      size={size}
      mode={mode}
      icon={isDarkMode ? <Sun /> : <Moon />}
      onClick={toggle}
      className={className}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {showLabel && (isDarkMode ? lightLabel : darkLabel)}
    </Button>
  )
}
