# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is `@thegpvc/ui`, TheGP's shared design system library. It provides React components, Tailwind theme configuration, and utilities for internal applications.

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
- `src/components/` - React components (see Components section below)
- `src/icons/` - Re-exports from lucide-react
- `src/utils/cn.ts` - Class name merge utility (clsx + tailwind-merge)
- `src/styles/theme.css` - Tailwind theme with custom colors and component classes

**Components:**
- **Core:** Button, Badge, Chip, Card, StatCard, StatGrid, Alert, Skeleton
- **Form:** Input, TextArea, InputWrapper, Dropdown
- **Overlay:** Modal, Tooltip
- **Layout:** Layout, LayoutContainer, Sidebar (with SidebarLink, SidebarSection, SidebarSearch, SidebarUser), TabBar
- **Content:** ContentArea, ContentBody, ContentPane, ContentTabs, ContentSidebar
- **Brand voice:** Hero, EyebrowLabel, StatCard `variant="display"` — use for login, empty states, and hero-style app pages.
- **Utility:** ToggleDarkMode, LoginPage, GPLogo

**Build output:**
- ES module library (`dist/index.js`) — JavaScript only, no CSS bundled
- TypeScript declarations (`dist/index.d.ts`)

**Consumer integration (Tailwind v4):**
- Consumers import theme: `@import "@thegpvc/ui/theme";`
- Consumers scan dist for classes: `@source "../node_modules/@thegpvc/ui/dist";`
- The app's Tailwind processes all CSS — no duplicate base styles

**Key design patterns:**
- Components use compound pattern where appropriate (e.g., Card.Header, Card.Body)
- All components accept className prop and merge with `cn()` utility
- CSS lives in theme.css with Tailwind v4 `@theme` directive for custom tokens
- Dark navy is the brand-primary surface; light mode is the variant. See DESIGN_GUIDE.md for the navy/cream/orange role split.
- Distinguish **Badge** (status: success/warning/error/info/neutral) from **Chip** (filter / category selector) from **Button** (action). Don't collapse them.

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

## Authoring components

When adding or extending a component, hold these rules:

**Prop-naming contract** — each axis gets its own prop. Don't overload.

| Prop      | Axis                          | Example values                                       |
| --------- | ----------------------------- | ---------------------------------------------------- |
| `variant` | Visual style / semantic role  | `primary`, `secondary`, `outline`, `ghost`           |
| `shape`   | Geometry                      | `rounded`, `pill`                                    |
| `size`    | Scale                         | `sm`, `md`, `lg`                                     |
| `mode`    | *Forced* color context        | `light`, `dark` — only when the surface overrides theme |
| `color`   | Tone / palette intent         | `muted`, `orange`, `cream`, `navy`                   |

If a prop wants to control two axes (e.g., "size and style"), split it. Look at Button (`variant` + `shape` + `size` + `mode`) and EyebrowLabel (`color` + `dot`) as canonical references.

**Token-first authoring.** If a value (color, radius, spacing, type size) will be used twice, put it in `theme.css` under `@theme`. Inline arbitrary classes like `bg-[#06143b]` are a review smell — they bypass the token system.

**Light + dark in one component.** The standard pattern is `class dark:class`. Don't ship two parallel components. The `mode="dark"` escape hatch exists *only* for elements on fixed-dark surfaces inside a light app (e.g., a Button inside a navy Hero on a light page).

**Three-tier dark hierarchy.** When picking `dark:bg-*`, choose by role: chrome = `navy-850`, page = `navy-950`, raised content = `navy-900`. See DESIGN_GUIDE.md.

**Muted text contrast.** On dark: body = `navy-200`, secondary = `navy-300`, icons/placeholders = `navy-400`. Never use `navy-500` for readable text on dark.

**Test the contract, not the rendering.** Look at `src/components/Button/Button.test.tsx` — it tests behavior (variants apply correct classes, loading disables click, icons render in correct slot), not snapshots of full className strings. Aim for that style. Components don't need exhaustive tests, but new behavior should be locked down.

**Update the playground.** Every new component or variant gets a demo page (or a section added to an existing demo) in `playground/src/components/`. The playground is the visual contract.
