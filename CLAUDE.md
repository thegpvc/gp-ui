# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is `@gp/ui`, TheGP's shared design system library. It provides React components, Tailwind theme configuration, and utilities for internal applications.

## Commands

```bash
npm run build      # TypeScript compile + Vite build
npm run dev        # Watch mode (rebuilds on changes)
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking only
```

## Architecture

**Library structure:**
- `src/index.ts` - Main entry point, exports all components/icons/utilities
- `src/components/` - React components (Button, Badge, Card, StatCard, Alert, Skeleton, Layout, Modal)
- `src/icons/` - Re-exports from lucide-react
- `src/utils/cn.ts` - Class name merge utility (clsx + tailwind-merge)
- `src/styles/theme.css` - Tailwind theme with custom colors and component classes

**Build output:**
- ES module library (`dist/index.js`) — JavaScript only, no CSS bundled
- TypeScript declarations (`dist/index.d.ts`)

**Consumer integration (Tailwind v4):**
- Consumers import theme: `@import "@gp/ui/theme";`
- Consumers scan dist for classes: `@source "../node_modules/@gp/ui/dist";`
- The app's Tailwind processes all CSS — no duplicate base styles

**Key design patterns:**
- Components use compound pattern where appropriate (e.g., Card.Header, Card.Body)
- All components accept className prop and merge with `cn()` utility
- CSS lives in theme.css with Tailwind v4 `@theme` directive for custom tokens

## Design System Conventions

See [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) for colors, typography, spacing, and component patterns.

## Peer Dependencies

Consuming apps must provide: react, react-dom, lucide-react, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-tooltip, @radix-ui/react-label

## Development Guidelines

- **No application-specific logic:** Components must be generic and reusable. No hardcoded strings, API calls, business logic, or app-specific behavior. Pass everything via props.
- **Avoid duplication:** Before creating a new component, check if an existing one can be extended or composed. Prefer adding variants to existing components over creating similar new ones.
- **Consistent patterns:** Follow established patterns in the codebase—use `cn()` for class merging, compound components for complex UI, and the existing prop naming conventions (e.g., `variant`, `size`).
- **Minimal API surface:** Export only what consumers need. Keep internal helpers private. Prefer composition over configuration—fewer props with sensible defaults.
- **Style via theme.css:** New component styles should use Tailwind classes and extend theme.css when new tokens are needed. Avoid inline styles or component-specific CSS files.
