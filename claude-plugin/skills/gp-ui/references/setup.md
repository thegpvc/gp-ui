# @gp/ui Setup Guide

Installation, integration, and migration instructions.

## Table of Contents

- [Installation](#installation)
- [Tailwind v4 Integration](#tailwind-v4-integration)
- [Peer Dependencies](#peer-dependencies)
- [Basic Usage](#basic-usage)
- [Migration Guide](#migration-guide)

---

## Installation

```bash
npm install @gp/ui
```

---

## Tailwind v4 Integration

### 1. Import the Theme

In your app's main CSS file:

```css
/* app/styles/global.css */
@import "tailwindcss";
@import "@gp/ui/theme";
```

**Order matters**: Tailwind base must load before @gp/ui theme.

### 2. Configure Content Scanning

Update your Tailwind config to scan @gp/ui's dist folder:

```javascript
// tailwind.config.js
export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@gp/ui/dist/**/*.js",  // Scan @gp/ui
  ],
};
```

### How It Works

- @gp/ui ships JavaScript only (no bundled CSS)
- The consuming app's Tailwind processes all CSS at build time
- This prevents duplicate base styles
- Theme tokens (colors, fonts, animations) are injected via `@import "@gp/ui/theme"`

---

## Peer Dependencies

Consuming apps must provide these packages:

| Package | Min Version | Purpose |
|---------|-------------|---------|
| `react` | 18.0.0 | React library |
| `react-dom` | 18.0.0 | DOM rendering |
| `lucide-react` | 0.400.0 | Icon library |
| `@radix-ui/react-dropdown-menu` | 2.0.0 | Dropdown component |
| `@radix-ui/react-tooltip` | 1.0.0 | Tooltip component |
| `@radix-ui/react-label` | 2.0.0 | Form labels |

Install all peer dependencies:

```bash
npm install react react-dom lucide-react @radix-ui/react-dropdown-menu @radix-ui/react-tooltip @radix-ui/react-label
```

---

## Basic Usage

### Component Imports

```tsx
import { Button, Card, Badge, Layout, LayoutContainer } from '@gp/ui';
```

### Icon Imports

```tsx
import { SearchIcon, UserIcon, DeleteIcon } from '@gp/ui';
```

### Utility Imports

```tsx
import { cn } from '@gp/ui';
```

### Example App

```tsx
// app.tsx
import { Layout, LayoutContainer, Button, Card, Badge } from '@gp/ui';

function App() {
  return (
    <Layout
      title="My App"
      user={{ name: 'User', email: 'user@example.com' }}
      onLogout={() => console.log('logout')}
    >
      <LayoutContainer maxWidth="medium">
        <Card>
          <Card.Header>
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <Badge variant="success">Active</Badge>
          </Card.Header>
          <Card.Body>
            <p className="text-gray-600">Welcome to the dashboard.</p>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">Get Started</Button>
          </Card.Footer>
        </Card>
      </LayoutContainer>
    </Layout>
  );
}
```

---

## Migration Guide

### From Custom Components to @gp/ui

#### Buttons

Before:
```tsx
<button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
  Submit
</button>
```

After:
```tsx
import { Button } from '@gp/ui';
<Button variant="primary">Submit</Button>
```

#### Cards

Before:
```tsx
<div className="bg-white rounded-lg shadow-sm p-4">
  <div className="border-b pb-3 mb-3">Header</div>
  <div>Content</div>
</div>
```

After:
```tsx
import { Card } from '@gp/ui';
<Card>
  <Card.Header>Header</Card.Header>
  <Card.Body>Content</Card.Body>
</Card>
```

#### Inputs

Before:
```tsx
<label className="block text-sm font-medium">Email</label>
<input
  type="email"
  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-orange-500"
/>
```

After:
```tsx
import { Input } from '@gp/ui';
<Input label="Email" type="email" />
```

### From Tailwind v3 to v4

1. Update imports in CSS:
```css
/* Before (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After (v4) */
@import "tailwindcss";
```

2. Add theme import after Tailwind:
```css
@import "tailwindcss";
@import "@gp/ui/theme";
```

3. Update content paths in config for @source directive if using CSS-first config.

### Adding Sidebar to Existing Layout

Before:
```tsx
<Layout title="App">{children}</Layout>
```

After:
```tsx
<Layout
  title="App"
  sidebar={{
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, href: '/' },
      { id: 'settings', label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
    ],
    variant: 'responsive',
  }}
>
  {children}
</Layout>
```

### Replacing Custom Dropdowns

Before:
```tsx
<div className="relative">
  <button onClick={() => setOpen(!open)}>Menu</button>
  {open && (
    <div className="absolute top-full mt-1 bg-white shadow-md rounded">
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete} className="text-red-500">Delete</button>
    </div>
  )}
</div>
```

After:
```tsx
import { Dropdown, Button } from '@gp/ui';

<Dropdown>
  <Dropdown.Trigger asChild>
    <Button variant="secondary">Menu</Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
    <Dropdown.Item variant="danger" onClick={handleDelete}>Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

---

## Troubleshooting

### Styles Not Applying

1. Verify theme import order (Tailwind first, then @gp/ui theme)
2. Check content paths include @gp/ui dist folder
3. Ensure peer dependencies are installed

### TypeScript Errors

Ensure `@types/react` matches your React version and that `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "esModuleInterop": true
  }
}
```

### Missing Icons

Icons are re-exported from lucide-react. Ensure `lucide-react` is installed:

```bash
npm install lucide-react
```
