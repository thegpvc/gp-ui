import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { EyebrowLabel } from '../EyebrowLabel'
import { StatCard } from '../StatCard'

export interface HeroStat {
  /**
   * Big numeral or display value (e.g. 99, '80%', '300,000')
   */
  value: string | number
  /**
   * Tiny uppercase caption beneath
   */
  label: string
}

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Tiny uppercase eyebrow above the headline.
   * Pass a string for the default treatment, or a ReactNode for full control.
   */
  eyebrow?: ReactNode

  /**
   * Show a leading orange dot on the eyebrow (string-eyebrow only)
   */
  eyebrowDot?: boolean

  /**
   * Display headline. Renders as the page H1.
   */
  title: ReactNode

  /**
   * Optional lede / supporting paragraph beneath the headline.
   */
  lede?: ReactNode

  /**
   * Optional actions slot (buttons). Rendered in a row beneath the lede.
   */
  actions?: ReactNode

  /**
   * Optional stats row rendered beneath actions, using StatCard variant="display".
   */
  stats?: HeroStat[]

  /**
   * Headline size
   * - lg: 40–48px (default — fits inside app layouts)
   * - xl: 56–72px (landing / login)
   */
  size?: 'lg' | 'xl'

  /**
   * Alignment of the eyebrow / title / lede stack
   */
  align?: 'start' | 'center'
}

/**
 * Hero — eyebrow + display headline + lede + actions + optional stats.
 *
 * Used for login screens, empty states, and brand-flavored app pages. Pairs
 * with `bg-navy-950` brand surface for the full effect, but also works on
 * the standard application background.
 *
 * @example
 * ```tsx
 * <Hero
 *   eyebrow="A new model for founders"
 *   eyebrowDot
 *   title={<>Where you build your <span className="text-orange-500">best company.</span></>}
 *   lede="We're the only VC structurally built to trade in two currencies: capital + work."
 *   actions={
 *     <>
 *       <Button variant="primary" shape="pill">The Model</Button>
 *       <Button variant="outline" shape="pill">The Team</Button>
 *     </>
 *   }
 *   stats={[
 *     { value: 99, label: 'Founders partnered with' },
 *     { value: 500, label: 'Key hires placed' },
 *   ]}
 * />
 * ```
 */
export function Hero({
  eyebrow,
  eyebrowDot = false,
  title,
  lede,
  actions,
  stats,
  size = 'lg',
  align = 'start',
  className,
  ...props
}: HeroProps) {
  const titleSize = size === 'xl' ? 'text-display-xl' : 'text-display-lg'
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  const statsCols =
    stats && stats.length > 3
      ? 'sm:grid-cols-4'
      : stats && stats.length === 3
        ? 'sm:grid-cols-3'
        : 'sm:grid-cols-2'

  return (
    <section className={cn('flex flex-col gap-6', alignClass, className)} {...props}>
      {eyebrow ? (
        typeof eyebrow === 'string' ? (
          <EyebrowLabel color="orange" dot={eyebrowDot}>
            {eyebrow}
          </EyebrowLabel>
        ) : (
          eyebrow
        )
      ) : null}

      <h1
        className={cn(
          titleSize,
          'font-extrabold leading-[1.05] tracking-tight',
          'text-navy-900 dark:text-cream',
        )}
      >
        {title}
      </h1>

      {lede ? (
        <p className="max-w-2xl text-base sm:text-lg text-navy-700 dark:text-navy-200 leading-relaxed">
          {lede}
        </p>
      ) : null}

      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}

      {stats && stats.length > 0 ? (
        <div className={cn('mt-4 grid grid-cols-2 gap-x-8 gap-y-6 w-full', statsCols)}>
          {stats.map((stat) => (
            <StatCard key={stat.label} variant="display" value={stat.value} label={stat.label} />
          ))}
        </div>
      ) : null}
    </section>
  )
}
