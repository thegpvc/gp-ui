# @gp/ui Design Guide

Brand tone: professional, tool-like, minimal—but recognizable as TheGP.

## Table of Contents

- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Shadows](#shadows)
- [Animations](#animations)
- [Component Patterns](#component-patterns)
- [Accessibility](#accessibility)

---

## Colors

### Custom Theme Tokens

After importing `@gp/ui/theme`, these Tailwind colors are available:

**Orange Palette** (brand color, anchored on `#ff6a00`)
- `orange-50` through `orange-900`
- Primary CTA: `orange-500` (#ff6a00)

**Navy Palette** (structural/text color, anchored on `#0a1a35`)
- `navy-50` through `navy-950`
- Headers/dark backgrounds: `navy-900`

**Cream**
- `cream` (#fff9f2) - Off-white page backgrounds

### Color Usage Guidelines

| Purpose | Color | Tailwind Class |
|---------|-------|----------------|
| Structural backgrounds, headers | Navy #06143b | `bg-navy-900` |
| Primary actions only | Orange #ff6c1b | `bg-orange-500`, `ring-orange-500` |
| Page backgrounds | Off-white #fff9f2 | `bg-cream` or `bg-orange-50` |
| Borders, dividers | Light gray #e5e5e5 | `border-gray-200` |
| Tags, badges | Subtle navy | `bg-navy-100 text-navy-700` |

**Use orange sparingly**—primary actions only, never large color blocks.

### Semantic Status Colors

| Status | Background | Text |
|--------|------------|------|
| Success | `bg-emerald-50` | `text-emerald-700` |
| Warning | `bg-amber-50` | `text-amber-700` |
| Error | `bg-red-50` | `text-red-700` |
| Info | `bg-navy-50` | `text-navy-700` |

---

## Typography

### Font Families

```css
--font-sans: 'DM Sans', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

Use `font-sans` for all UI text. Use `font-mono` for:
- Numbers/metrics in StatCard
- Code/IDs
- Keyboard shortcuts

### Type Scale

| Element | Size | Weight | Tailwind |
|---------|------|--------|----------|
| H1 | 26px | Bold | `text-2xl font-bold` |
| H2 | 20px | Semibold | `text-xl font-semibold` |
| H3 | 16px | Semibold | `text-base font-semibold` |
| Body | 14-15px | Regular | `text-sm` or `text-base` |
| Labels | 12-13px | Medium | `text-xs font-medium` |

---

## Spacing

### Semantic Tokens

```css
--spacing-card: 1rem;        /* Main content areas */
--spacing-section: 0.75rem;  /* Section dividers */
--spacing-list-item: 0.625rem; /* List item padding */
```

### Standard Scale

Use consistent spacing:
- `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-6` (24px)

---

## Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
```

- Cards: `shadow-sm`
- Dropdowns/tooltips: `shadow-md`
- Modals: `shadow-lg`

---

## Animations

### Available Animations

| Name | Purpose | Usage |
|------|---------|-------|
| `fade-up` | Fade in upward | Page transitions |
| `pulse-glow` | Pulsing shadow | Loading/syncing states |
| `skeleton-shimmer` | Skeleton loading | Skeleton components |
| `page-enter` | Page transition | Route changes |
| `dropdown-in/out` | Dropdown scale | Dropdown.Content |
| `tooltip-in/out` | Tooltip scale | Tooltip.Content |
| `arrow-slide-in` | Arrow expand | Back navigation |

### Motion Preferences

All animations respect `prefers-reduced-motion`. No additional work needed.

### Interaction Guidelines

- Minimal animations—keep fast and functional
- Subtle hover states (slight darkening)
- No heavy marketing animations

---

## Component Patterns

### Cards

```
bg-white rounded-lg p-4 shadow-sm
```
- White background
- 8px radius (`rounded-lg`)
- 16px padding
- Light shadow

### Buttons

| Variant | Classes |
|---------|---------|
| Primary | `bg-orange-500 hover:bg-orange-600 text-white` |
| Secondary | `border border-navy-700 text-navy-700 hover:bg-navy-50` |
| Destructive | `bg-red-500 hover:bg-red-600 text-white` |

### Inputs

```
bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500
```
- White background
- 1px gray border
- 6px radius
- Orange focus ring

### Lists/Tables

- Borderless with subtle dividers: `divide-y divide-gray-200`
- 14px body text

### Icons

- Lucide React, thin-line monochrome style
- Size 16-20px typically
- Use semantic imports from @gp/ui

---

## Accessibility

### Contrast

Maintain WCAG AA contrast (4.5:1) for all text.

### Component Support

- Buttons: `aria-busy`, `aria-disabled`
- Alerts: `role="alert"`, `aria-live="polite"`
- Forms: `aria-invalid`, `aria-describedby`
- Tabs: `role="tablist"`, `role="tab"`, `aria-selected`
- Tooltips: Screen reader support, keyboard triggers
- Icons: `aria-hidden="true"` for decorative icons

### Keyboard Navigation

- All interactive elements focusable
- Escape key closes overlays (dropdowns, tooltips, mobile sidebar)
- Tab order follows visual order

---

## Layout Guidelines

- **Mobile-first**: Design for narrow screens, scale up
- Use responsive classes: `sm:`, `md:`, `lg:`
- Max content widths:
  - `narrow`: max-w-lg
  - `medium`: max-w-3xl
  - `wide`: max-w-5xl
- Compact header: 48-64px height
- Compact spacing throughout
