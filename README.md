# TheGP Design System — @gp/ui

Shared UI components for TheGP internal applications.

**[View Playground →](https://thegpvc.github.io/gp-ui/)**

## Quick Start

### 1. Install the package

```bash
npm install @gp/ui
```

### 2. Configure your CSS

Add these lines to your app's main CSS file (e.g., `src/index.css`):

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";
@import "@gp/ui/theme";
@source "../node_modules/@gp/ui/dist";
```

**Why each line matters:**
- `@import "tailwindcss"` — Base Tailwind utilities (your app provides this)
- `@import "@gp/ui/theme"` — GP design tokens (colors, fonts, component classes)
- `@source "..."` — Tells Tailwind to scan our components so utility classes aren't purged

### 3. Use components

```tsx
import { Button, Badge, Card } from '@gp/ui'

function App() {
  return (
    <Card>
      <Card.Header>Welcome</Card.Header>
      <Card.Body>
        <Button variant="primary">Get Started</Button>
      </Card.Body>
    </Card>
  )
}
```

## Vite Setup

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
  - Includes: Skeleton, SkeletonText, SkeletonStatCard, SkeletonListItem

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

### Developing gp-ui Itself

To work on the design system components:

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development (rebuilds on file changes)
npm run dev
```

### Running the Playground

The playground provides an interactive environment to view and test all components:

```bash
npm run playground
```

This starts a local dev server at http://localhost:5174 with hot reloading. To build the playground for deployment:

```bash
npm run build:playground
```

### Using gp-ui in Your Project

For production use, install via your package manager (see Installation above). For local development with a linked version:

#### Using npm link

In the gp-ui directory:
```bash
npm link
```

In your project directory:
```bash
npm link @gp/ui
```

To unlink:
```bash
# In your project
npm unlink @gp/ui

# In gp-ui (optional cleanup)
npm unlink
```

### Making Changes While Developing Another Project

Recommended workflow:

1. **Terminal 1** (gp-ui): Run `npm run dev` to watch for changes
2. **Terminal 2** (your project): Use `npm link @gp/ui` dependency
3. Make changes to components in gp-ui
4. Watch mode automatically rebuilds
5. Your project's dev server (Vite HMR) picks up the changes

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

See [DESIGN_GUIDE.md](./DESIGN_GUIDE.md) for:
- Color usage guidelines
- Typography scale
- Spacing system
- Component design patterns

## Claude Code Integration

This library includes a [Claude Code](https://claude.ai/code) plugin that provides AI assistance when building UIs with @gp/ui components.

### Enable the Plugin

In Claude Code, run:

```
/plugin add github:thegpvc/gp-ui/claude-plugin
```

### What It Provides

The plugin gives Claude knowledge of:
- All available components and their props
- Design system colors, typography, and spacing
- Icon exports and naming conventions
- Setup and migration guidance

When building UIs, Claude will automatically use the correct components, variants, and patterns from @gp/ui.
