# TheGP Design System Style Guide

Brand tone: professional, tool-like, minimal—but recognizable as TheGP.

## Colors (Tailwind classes)

| Purpose                                     | Color              | Tailwind                           |
| ------------------------------------------- | ------------------ | ---------------------------------- |
| Structural backgrounds, headers             | Navy #06143b       | `bg-navy-900`                      |
| Primary actions only (buttons, focus rings) | Orange #ff6c1b     | `bg-orange-500`, `ring-orange-500` |
| Page backgrounds                            | Off-white #fff9f2  | `bg-orange-50` or custom           |
| Borders, dividers                           | Light gray #e5e5e5 | `border-gray-200`                  |
| Tags, badges                                | White with glow    | `bg-white` + colored border/shadow |

Use orange sparingly—primary actions only, never large color blocks.

## Typography

| Element | Size    | Weight   | Tailwind                  |
| ------- | ------- | -------- | ------------------------- |
| H1      | 26px    | Bold     | `text-2xl font-bold`      |
| H2      | 20px    | Semibold | `text-xl font-semibold`   |
| H3      | 16px    | Semibold | `text-base font-semibold` |
| Body    | 14-15px | Regular  | `text-sm` or `text-base`  |
| Labels  | 12-13px | Medium   | `text-xs font-medium`     |

Font: DM Sans (`font-sans`), JetBrains Mono for numbers (`font-mono`).

## Spacing Scale

Use consistent spacing: `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-6` (24px).

## Components

### Cards

```
bg-white rounded-lg p-4 shadow-sm
```

White background, 8px radius (`rounded-lg`), 16px padding, light shadow.

### Buttons

- Primary: `bg-orange-500 hover:bg-orange-600 text-white`
- Secondary: `border border-navy-700 text-navy-700 hover:bg-navy-50`
- Destructive: `bg-red-500 hover:bg-red-600 text-white`

### Inputs

```
bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500
```

White background, 1px border, 6px radius, orange focus ring.

### Badges

Badges use a glow-effect pattern with white backgrounds and colored borders/shadows:

- **Success**: `bg-white text-emerald-600 border-emerald-200/50` + emerald glow
- **Warning**: `bg-white text-orange-600 border-orange-200/50` + orange glow
- **Error**: `bg-white text-red-600 border-red-200/50` + red glow
- **Info**: `bg-white text-navy-700 border-navy-200/50` + navy glow
- **Neutral**: `bg-white text-gray-700 border-gray-200/50` + gray glow

Typography: `text-xs font-medium`, rounded-full, subtle box-shadow for glow effect.

### Lists/Tables

Borderless with subtle dividers (`divide-y divide-gray-200`), 14px body text.

### Icons

Lucide React, thin-line monochrome style. Size 16-20px typically.

## Layout

- **Mobile-first**: Design for narrow screens first, then scale up gracefully
- Use responsive classes (`sm:`, `md:`, `lg:`) to expand layouts on larger screens
- Max content width: `max-w-md` base, `sm:max-w-lg`, `lg:max-w-2xl` as needed
- Compact header: 56-64px height
- Compact spacing throughout

## Interactions

- Minimal animations—keep fast and functional
- Subtle hover states (slight darkening)
- No heavy marketing animations
- Maintain WCAG AA contrast for all text
