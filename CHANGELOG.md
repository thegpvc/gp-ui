# Changelog

All notable changes to @thegpvc/ui will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-07-18

### Added
- `Badge` gained a `count` prop (with `countPosition`) to render a monospace, tabular count on the leading or trailing edge
- `StatCard` gained a `surface` prop: `muted` (default, filled tile) or `plain` (transparent, for tiles nested inside a Card/SectionCard)

### Changed
- `Badge` light-mode variants moved from white-fill + colored glow to a soft tint + solid hairline border for a roomier, less noisy look; `neutral` is now navy-tinted

## [0.4.0] - 2026-07-18

### Changed
- `Card` gains a hairline border in light mode for extra definition (dark mode unchanged)
- Pill-style `TabBar` now reads as a segmented control: dropped the uppercase/tracked label style, sized up, and added a container border
- Sidebar chrome is now always navy in both light and dark mode; active nav rows carry the orange brand accent and softer rounded corners
- `Layout` and `ContentPane` fall back to a cream page background in light mode (was gray)
- `ProportionChart` gained a `legendColumns` prop; the legend now lays out in a single non-wrapping row so a trailing item can't become a lone widow, with truncating labels/values

## [0.3.0] - 2026-05-21

### Added
- `Hero` component — eyebrow + display headline + lede + actions + optional stats row
- `EyebrowLabel` component — tiny tracked uppercase section label with optional orange dot
- `Chip` component — filter/category pill with `active`, `onRemove`, and icon support. Distinct from Badge (status) and Button (action)
- `Button` gained `variant="outline"` (cream-on-navy CTA) and `shape="pill"` (rounded-full geometry)
- `TabBar` gained `variant="pill"` — rounded-full tabs with an orange-filled active state
- `StatCard` gained `variant="display"` — huge cream numeral above tiny uppercase caption, no chrome
- `Card` gained `radius="md" | "lg" | "card"` prop (default `card` = 16px)
- Display typography tokens: `text-display-xl`, `text-display-lg`, `tracking-eyebrow`, `--radius-card`, `--radius-pill`
- `--color-cream-fg` (#f4ead9) — warm off-white foreground token for use on dark surfaces
- Playground previews for Hero, EyebrowLabel, Chip; extended demos for Button, TabBar, StatCard

### Changed
- Deeper brand navy: `--color-navy-900` is now `#06143b` (was `#0a1a35`). The previous value lives on as `--color-navy-850`
- Three-tier dark surface hierarchy: page = `navy-950`, chrome (Layout header, Sidebar, search bar) = `navy-850`, raised brand content (cards, modals, hero blocks) = `navy-900`
- Default Card radius bumped to 16px (`rounded-card`); pass `radius="lg"` to restore the prior 8px
- Cards on dark drop their shadow in favor of a 1px border, matching the brand-tile look
- Bumped muted text contrast on dark across components: secondary text uses `navy-300` (was `navy-400`); icons/placeholders use `navy-400` (was `navy-500`). `navy-500` is no longer used for readable text on dark
- LoginPage shifted to `bg-navy-950` with cream heading and lifted helper-text contrast
- DESIGN_GUIDE.md rewritten with the brand-voice section, three-tier hierarchy callout, muted-text contrast rule, Badge/Chip/Button role split, orange budget rule, and display-tier guardrails
- CLAUDE.md gained an "Authoring components" section (prop-naming contract, token-first authoring, light+dark policy)

## [0.2.1] - 2026-01-07

### Changed
- Improved release automation workflow

## [0.2.0] - 2026-01-06

### Added
- Modal dialog component using Radix UI
- Content layout options for flexible page layouts

### Changed
- Updated semantic color scheme with refined palette
- Badge component now uses glow-effect styling
- Improved icon handling in Button component

## [0.1.6] - 2025-12-19

### Added
- Tooltip component using Radix UI

### Changed
- Removed dead/unused code

## [0.1.5] - 2025-12-19

### Added
- Sidebar component with multiple variants
- StatGrid component for dashboard layouts
- Dropdown component using Radix UI
- Input components (text inputs, labels, form elements)

### Changed
- LayoutContainer maxWidth now uses semantic sizing names (sm, md, lg, xl, full)

## [0.1.4] - 2025-12-18

### Changed
- LoginPage: Set max width and ensure centered in large containers
- Updated usage instructions in README

## [0.1.3] - 2025-12-17

### Added
- LoginPage component for authentication UI
- Playground mini app for component development and demos
- Claude Code GitHub workflow

## [0.1.2] - 2025-12-14

### Fixed
- Fixed `files` field to include source files (src, tsconfig.json, vite.config.ts) needed for git installs
- Fixed `prepare` script to properly build package when installed from GitHub

## [0.1.1] - 2025-12-14

### Added
- `prepare` script to automatically build package when installed from git
- DESIGN_GUIDE.md with design system guidelines
- .gitignore file

### Changed
- Updated README with standalone development instructions (removed monorepo references)
- Removed application-specific default title from Layout component
- Removed application-specific skeleton components (HomeSkeleton, EmailHistorySkeleton, DebugSkeleton)
- Updated skeleton exports to only include base components

### Fixed
- Fixed duplicate bash code fences in README
- Fixed external reference to CLAUDE.md in README

## [0.1.0] - 2025-12-12

### Added
- Initial extraction from gp-breadcrumb monorepo
- Layout component with LayoutContainer
- Badge component with variants (success, warning, error, info, neutral)
- Button component with variants (primary, secondary, destructive)
- Card and StatCard components
- Alert component
- Skeleton loading components (HomeSkeleton, EmailHistorySkeleton, DebugSkeleton)
- Theme CSS with GP brand colors (navy, orange)
- Tailwind CSS 4 integration
- TypeScript support with generated declarations
