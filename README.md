# @gp/ui - GP Design System

Shared UI components for TheGP applications.

## Installation

```bash
npm install @gp/ui
```

## Usage

### For Apps Using TailwindCSS (Recommended)

If your app uses TailwindCSS, import the theme file which provides custom colors, tokens, and component classes:

```css
/* your-app/src/index.css */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";
@import "@gp/ui/theme";
```

Then use components in your JSX:

```tsx
import { Button, Badge, Card, StatCard } from '@gp/ui'

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Button variant="primary">Click me</Button>
    </div>
  )
}
```

**Important**: Your app must have TailwindCSS installed and configured (`@tailwindcss/vite` plugin for Vite projects).

### Vite Configuration

Ensure your `vite.config.ts` includes the TailwindCSS plugin:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Components

- **Button** - Primary action buttons with variants (primary, secondary, ghost, destructive)
  - Sizes: sm, md, lg
  - Features: loading state, icon support
- **Badge** - Status indicators with variants (success, warning, error, info, neutral)
- **Card** - Content containers with compound pattern (Card.Header, Card.Body, Card.Footer)
- **StatCard** - Metric displays with trend indicators (up/down)
- **Alert** - Contextual messages with variants (info, warning, error, success)
  - Features: dismissible, title support
- **Skeleton** - Loading states and skeleton screens
  - Includes: HomeSkeleton, EmailHistorySkeleton, DebugSkeleton

## Icons

Common icons are re-exported from lucide-react for convenience:

```tsx
import { Search, User, Mail, Calendar, Loader2, TrendingUp } from '@gp/ui'
```

**Note**: Your app must have `lucide-react` installed as a peer dependency.

## Utilities

### `cn()` - ClassName Utility

Merge Tailwind classes with proper precedence:

```tsx
import { cn } from '@gp/ui'

<Button className={cn('extra-class', isActive && 'active-class')} />
```

## Development

### In a Workspace

If you're developing within the monorepo:

```bash
# Build design system
make design-system

# Watch mode for development
make design-system-dev
```

### Peer Dependencies

This package requires the following peer dependencies to be installed in your app:

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "lucide-react": ">=0.400.0"
}
```

## Design Guidelines

See [CLAUDE.md](../../CLAUDE.md) for:
- Color usage guidelines
- Typography scale
- Spacing system
- Component design patterns
