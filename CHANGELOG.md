# Changelog

All notable changes to @gp/ui will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
