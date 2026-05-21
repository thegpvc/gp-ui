# TheGP Design System Style Guide

Brand tone: professional, tool-like, minimal — but unmistakably TheGP. The brand reads dark navy first, with warm off-white text and orange used as an accent. Light mode is the variant.

## Brand voice in components

Five moves carry the brand:

1. **Deep navy is the primary surface.** `bg-navy-950` for the page on dark, `bg-navy-900` for raised cards, `bg-cream` (or `bg-orange-50`) on light.
2. **Cream / off-white is the foreground on dark.** Use `text-cream` for headings and important body text on dark surfaces. Reserve pure `text-white` for inversions and emphasis.
3. **Orange is an accent.** Eyebrow dots, the *one* primary CTA per view, active states, focus rings. Never large fills.
4. **Pill geometry.** CTAs, nav tabs, filter chips, badges — all `rounded-full`. Cards use a larger radius (`rounded-card` / 16px).
5. **Eyebrow + headline pattern.** Tiny tracked uppercase label (often with a leading orange dot) above an oversized headline. Use `EyebrowLabel` and the `display-*` type sizes.

## Colors

| Purpose                                | Token                         | Hex      |
| -------------------------------------- | ----------------------------- | -------- |
| Page background (dark / brand surface) | `bg-navy-950`                 | #050d1a  |
| Raised surface on dark (cards, modals) | `bg-navy-900`                 | #06143b  |
| Header / chrome navy                   | `bg-navy-850`                 | #0a1a35  |
| Page background (light)                | `bg-cream` / `bg-orange-50`   | #fff9f2  |
| Primary accent (CTAs, focus, dots)     | `bg-orange-500`, `ring-orange-500` | #ff6a00 |
| Foreground on dark                     | `text-cream`                  | #f4ead9  |
| Foreground muted on dark               | `text-navy-300` / `-400`      | —        |
| Foreground on light                    | `text-navy-900`               | #06143b  |
| Borders (light)                        | `border-gray-200`             | #e5e5e5  |
| Borders (dark)                         | `border-navy-700` / `-800`    | —        |

**Note:** `--color-navy-900` is the deep brand navy (`#06143b`). `--color-navy-850` (`#0a1a35`) is the slightly lighter chrome shade — useful for the Layout header sitting above a `navy-950` page. The old `navy-900` value moved to `-850` to make room for the deeper brand navy.

### Three-tier dark surface hierarchy

On dark, every surface picks one of three roles. Mixing roles produces the "too saturated next to too saturated" effect that makes the UI feel off.

| Tier             | Token         | Use for                                                |
| ---------------- | ------------- | ------------------------------------------------------ |
| **Page**         | `bg-navy-950` | Document background — the deepest, darkest tier        |
| **Chrome**       | `bg-navy-850` | Layout header, Sidebar, search bar — quiet, recessed   |
| **Raised brand** | `bg-navy-900` | Cards, modals, hero blocks — saturated brand navy pops |

Rule of thumb: **chrome should feel like it sits *on* the page; content should feel like it sits *above* chrome.** Don't put the saturated brand navy on a navy chrome surface — it will read as visual noise.

### Orange budget

Orange is the brand accent. Use it deliberately:

- **At most one** orange-filled element per view (usually the primary CTA, or the active pill in a top nav).
- Accents (eyebrow dots, focus rings, active states, an inline orange phrase) are unlimited but should be small.
- If you see two solid-orange buttons, demote one to `variant="outline"` or another shape.
- No large orange backgrounds. Banner bars are the only exception.

## Typography

Font: DM Sans (`font-sans`), JetBrains Mono for numerics (`font-mono`).

### Application scale (default)

| Element | Size    | Weight   | Tailwind                  |
| ------- | ------- | -------- | ------------------------- |
| H1      | 26px    | Bold     | `text-2xl font-bold`      |
| H2      | 20px    | Semibold | `text-xl font-semibold`   |
| H3      | 16px    | Semibold | `text-base font-semibold` |
| Body    | 14–15px | Regular  | `text-sm` or `text-base`  |
| Labels  | 12–13px | Medium   | `text-xs font-medium`     |

### Display tier (Hero, empty states, login)

| Element     | Size      | Weight | Tracking | Tailwind                                |
| ----------- | --------- | ------ | -------- | --------------------------------------- |
| Display XL  | 56–72px   | 800    | -0.02em  | `text-display-xl font-extrabold`        |
| Display LG  | 40–48px   | 800    | -0.02em  | `text-display-lg font-extrabold`        |
| Eyebrow     | 11–12px   | 600    | 0.15em   | `text-xs font-semibold uppercase tracking-eyebrow` |
| Caption     | 11–12px   | 500    | 0.12em   | `text-xs font-medium uppercase tracking-wider`     |

Use the display tier sparingly — heroes, empty states, login. Keep dashboards on the application scale.

**Don't use display tier for:**

- Page H1s inside a regular dashboard layout (use the application H1 instead)
- Section headings — that's what H2/H3 are for
- Any text that competes with another large element on the same screen
- Long strings — display sizes look broken past ~6–8 words per line

If you're reaching for display tier and not building a Hero or empty-state, ask whether the screen actually needs a hero moment.

## Spacing scale

Use consistent spacing: `p-1` (4px), `p-2` (8px), `p-3` (12px), `p-4` (16px), `p-6` (24px).

## Radii

| Token              | Value | Use                                            |
| ------------------ | ----- | ---------------------------------------------- |
| `rounded-md`       | 6px   | Inputs, dropdowns                              |
| `rounded-lg`       | 8px   | Small/inline cards                             |
| `rounded-card`     | 16px  | Default Card radius — the portfolio-tile look  |
| `rounded-full`     | 9999px| Buttons (pill shape), Chips, Badges, pill tabs |

## Components

### Cards

```
gp-card  →  bg-white rounded-card shadow-sm p-4
           dark:bg-navy-800 dark:border dark:border-navy-700
```

On dark, drop shadow and use a 1px border. The Card component accepts `radius="md" | "lg" | "card"` if you need a tighter corner.

### Buttons

```tsx
<Button variant="primary" />              // Orange fill, one per view
<Button variant="secondary" />            // Navy outline, light bg
<Button variant="outline" />              // Cream-outline on dark (hero CTAs)
<Button variant="ghost" />                // Transparent
<Button variant="destructive" />          // Rose
<Button shape="pill" />                   // rounded-full geometry
```

- **Primary:** `bg-orange-500 hover:bg-orange-600 text-white`
- **Secondary:** `border border-navy-700 text-navy-700 hover:bg-navy-50`
- **Outline (new):** `border border-cream/40 text-cream hover:bg-cream/10` — for cream-on-navy CTAs in the hero pattern.
- **Destructive:** `bg-rose-700 hover:bg-rose-800 text-white`

### Inputs

```
bg-white border border-gray-200 rounded-md px-3 py-2
focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500
```

### Status / category / action — three pill-shaped components, three roles

If your "thing" is pill-shaped, it's one of these three. Pick by purpose, not by appearance:

| Component  | Role                            | Example                          |
| ---------- | ------------------------------- | -------------------------------- |
| **Badge**  | *Status indicator*              | "Synced", "Failed", "Pending"    |
| **Chip**   | *Filter or category selector*   | "Engineering", "ETH", "Capital"  |
| **Button** | *Action (verb)*                 | "Save", "Delete", "Sign out"     |

If you can't answer "is this a status, a category, or an action?", you've picked wrong.

### Badges (status)

White / dark-navy bg with colored border + subtle glow. Used for status (success / warning / error / info / neutral). **Not** for filters or categories — those use `Chip`.

### Chips (new — filters and categories)

Pill-shaped, navy bg, faint border. Used for filter selectors and category tags. Distinct from Badge (status) and Button (action).

```tsx
<Chip>Engineering</Chip>
<Chip active>ETH</Chip>
<Chip onRemove={() => …}>Capital</Chip>
```

- Default: `bg-navy-800/50 border border-navy-700 text-navy-200 rounded-full`
- Active: orange border + orange-tinted text
- On light: `bg-white border-gray-200 text-navy-700`

### EyebrowLabel (new)

Tiny uppercase tracked label, with optional leading orange dot. Pair with display headlines and big numerals.

```tsx
<EyebrowLabel>A new model for founders</EyebrowLabel>
<EyebrowLabel dot color="orange">Case studies</EyebrowLabel>
<EyebrowLabel color="cream">Filter by services</EyebrowLabel>
```

### Hero (new)

Eyebrow + display headline + optional lede + actions slot + optional stats row. Used for login, empty states, marketing-flavored app pages.

```tsx
<Hero
  eyebrow="A new model for founders"
  title="Where you build your best company."
  lede="We're the only VC structurally built to trade in two currencies: capital + work."
  actions={
    <>
      <Button variant="outline" shape="pill">The Model</Button>
      <Button variant="outline" shape="pill">The Team</Button>
    </>
  }
  stats={[
    { value: 99, label: 'Founders partnered with' },
    { value: 500, label: 'Key hires placed' },
    { value: '80%', label: 'Founders who use our services' },
  ]}
/>
```

### StatCard (extended)

`variant="display"` renders a huge cream numeral above a tiny uppercase caption — for hero-style stats. No card chrome.

```tsx
<StatCard variant="display" value={99} label="Founders partnered with" />
```

The existing `default | compact | inline | centered` variants are unchanged.

### TabBar (extended)

`variant="pill"` renders rounded-full tabs with an orange-filled active state — matches the top nav in the portfolio view. The default `variant="underline"` is unchanged.

```tsx
<TabBar variant="pill" items={[…]} activeId={tab} onChange={setTab} />
```

### Lists / Tables

Borderless with subtle dividers (`divide-y divide-gray-200`), 14px body text.

### Icons

Lucide React, thin-line monochrome. 16–20px typical.

## Layout

- **Mobile-first.** Design narrow first, scale up.
- Responsive: `sm:`, `md:`, `lg:` to expand layouts.
- Max content width: `max-w-md` base, `sm:max-w-lg`, `lg:max-w-2xl`.
- Compact header: 48–56px.
- Compact spacing throughout.

## Z-index scale

| Layer    | z-index | Usage                       |
| -------- | ------- | --------------------------- |
| Base     | `z-0`   | Default content             |
| Sticky   | `z-10`  | Sticky headers, tabs        |
| Header   | `z-20`  | Layout header               |
| Backdrop | `z-30`  | Drawer/modal backdrops      |
| Drawer   | `z-40`  | Slide-out drawers, sidebars |
| Overlay  | `z-50`  | Modals, tooltips, dropdowns |

## Dark mode

Supported via Tailwind's `dark:` variant. With the new tokens, dark mode is the *primary* visual — light mode is the variant.

### Enabling

**Recommended:**

```tsx
import { ToggleDarkMode } from '@gp/ui'

<ToggleDarkMode showLabel />
<ToggleDarkMode mode="dark" showLabel />   // inside a navy header
```

The component persists to localStorage, respects system preference on first load, and toggles the `dark` class on the document.

**Manual:**

```tsx
<html className={isDarkMode ? 'dark' : ''}>
```

**Tailwind v4 setup (consumer apps):**

```css
@custom-variant dark (&:where(.dark, .dark *));
```

### Manual override (Button only)

```tsx
<Button mode="dark" variant="secondary">Settings</Button>
<Button variant="primary">Submit</Button>   // follows page theme
```

### Dark-mode palette

| Purpose            | Light Mode         | Dark Mode             |
| ------------------ | ------------------ | --------------------- |
| Page background    | `bg-gray-50`       | `bg-navy-950`         |
| Chrome             | `bg-navy-850`      | `bg-navy-850`         |
| Raised surface     | `bg-white`         | `bg-navy-900`         |
| Borders            | `border-gray-200`  | `border-navy-700`     |
| Heading text       | `text-navy-900`    | `text-cream`          |
| Body text          | `text-navy-700`    | `text-navy-200`       |
| Secondary text     | `text-navy-500`    | `text-navy-300`       |
| Icon / placeholder | `text-navy-400`    | `text-navy-400`       |
| Input background   | `bg-white`         | `bg-navy-800`         |
| Input border       | `border-gray-200`  | `border-navy-700`     |

### Muted text contrast rule

The deeper navy palette means some old "muted" colors no longer meet AA on dark. Stick to this:

| Text role               | Dark token         | Contrast on `navy-950` | Use for                                |
| ----------------------- | ------------------ | ---------------------- | -------------------------------------- |
| Body / readable         | `text-navy-200`    | ~10:1                  | Default text on dark cards             |
| Secondary / caption     | `text-navy-300`    | ~7:1                   | Labels, helper text, captions, leads   |
| Icon / placeholder      | `text-navy-400`    | ~3.5:1                 | Inactive icons, input placeholders     |
| **Don't use for text**  | `text-navy-500`    | ~2:1                   | Decorative only                        |

Rule: **`dark:text-navy-500` is decoration, never readable content.** If you need a text shade lighter than `navy-300`, lift to `navy-200` or use `text-cream`.

### Dark-mode coverage

All components adapt automatically: Card, Alert, Badge, Chip, StatCard, StatGrid, Input, TextArea, InputWrapper, Modal, Dropdown, Tooltip, Sidebar (all sub-components), Layout, Content*, TabBar, Skeleton, Hero, EyebrowLabel.

```tsx
<ToggleDarkMode />                    // Icon only
<ToggleDarkMode showLabel />          // With label
<ToggleDarkMode mode="dark" />        // For dark backgrounds
<ToggleDarkMode onChange={(isDark) => {}} />
```

The Layout header is `bg-navy-850` in both modes by design.

## Interactions

- Minimal animations — fast and functional.
- Subtle hover states (slight darkening).
- No heavy marketing animations.
- Maintain WCAG AA contrast for all text. Cream-on-navy passes AA at body size; verify any custom pairings.

## When to reach for what

| Use case                                      | Component                       |
| --------------------------------------------- | ------------------------------- |
| Section label above a heading                 | `EyebrowLabel`                  |
| Filter / category selector                    | `Chip`                          |
| Status indicator (synced, failed, pending)    | `Badge`                         |
| Primary action button                         | `Button variant="primary"`      |
| Cream-on-navy CTA in hero                     | `Button variant="outline" shape="pill"` |
| Login / empty-state hero block                | `Hero`                          |
| Big marketing-style number with caption       | `StatCard variant="display"`    |
| Top-nav style tab row with active pill        | `TabBar variant="pill"`         |
| In-page section tabs                          | `TabBar variant="underline"`    |
