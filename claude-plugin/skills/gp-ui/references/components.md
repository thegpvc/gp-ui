# @gp/ui Component Reference

Complete API documentation for all components.

## Table of Contents

- [Button](#button)
- [Badge](#badge)
- [Card](#card)
- [StatCard](#statcard)
- [StatGrid](#statgrid)
- [Alert](#alert)
- [Input](#input)
- [TextArea](#textarea)
- [Dropdown](#dropdown)
- [Tooltip](#tooltip)
- [TabBar](#tabbar)
- [Layout](#layout)
- [Sidebar](#sidebar)
- [Skeleton](#skeleton)
- [LoginPage](#loginpage)
- [GPLogo](#gplogo)

---

## Button

Primary action component with loading states and icon support.

```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}
```

### Variants
- `primary` - Orange background, white text (main CTA)
- `secondary` - Navy outline, white background
- `ghost` - Transparent with hover effect
- `destructive` - Red background for dangerous actions

### Sizes
- `sm` - `px-3 py-1.5 text-xs`
- `md` - `px-4 py-2 text-sm` (default)
- `lg` - `px-5 py-2.5 text-base`

### Examples
```tsx
<Button variant="primary" onClick={handleSubmit}>Submit</Button>
<Button variant="secondary" loading={isLoading}>Save Draft</Button>
<Button variant="destructive" icon={<DeleteIcon />}>Delete</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

---

## Badge

Status indicator with semantic variants.

```typescript
interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}
```

### Variants
- `success` - Emerald (active, synced, completed)
- `warning` - Amber (pending, in-progress)
- `error` - Red (failed, error states)
- `info` - Navy (informational)
- `neutral` - Gray (default, draft)

### Examples
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="warning" icon={<TimeIcon />}>Pending</Badge>
<Badge variant="error">Failed</Badge>
```

---

## Card

Container with compound sub-components.

```typescript
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean; // Adds hover effect and cursor pointer
}
```

### Sub-components
- `Card.Header` - Top section with bottom border
- `Card.Body` - Main content area
- `Card.Footer` - Bottom section with top border

### Example
```tsx
<Card interactive>
  <Card.Header>
    <h2 className="text-lg font-semibold">Card Title</h2>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

---

## StatCard

Metric display with optional icon and trend.

```typescript
interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    direction: 'up' | 'down';
    value: string;
    label?: string;
  };
  variant?: 'default' | 'compact' | 'inline' | 'centered';
  color?: 'default' | 'accent';
  className?: string;
}
```

### Variants
- `default` - Standard layout
- `compact` - Tighter spacing
- `inline` - Label on top, left-aligned
- `centered` - Label on top, centered

### Examples
```tsx
<StatCard label="Total Users" value={1234} />
<StatCard
  label="Revenue"
  value="$12,345"
  icon={<TrendUpIcon />}
  trend={{ direction: 'up', value: '+12%' }}
/>
<StatCard label="Status" value="Active" variant="centered" color="accent" />
```

---

## StatGrid

Key-value grid with formatting and copy support.

```typescript
interface StatGridItem {
  label: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
  status?: 'success' | 'warning' | 'error' | 'info' | 'default';
  copyable?: boolean;
  copyValue?: string;
  onClick?: () => void;
  format?: 'number' | 'currency' | 'date' | 'datetime' | 'bytes';
}

interface StatGridProps {
  items: StatGridItem[];
  asCard?: boolean; // Wraps in Card with minimal padding
  className?: string;
}
```

### Format Types
- `number` - Locale-formatted integer
- `currency` - USD formatting
- `date` - Date only
- `datetime` - Date and time
- `bytes` - Human-readable file size (B, KB, MB, GB, TB)

### Example
```tsx
<StatGrid
  asCard
  items={[
    { label: 'Status', value: 'Active', status: 'success', icon: <CheckIcon /> },
    { label: 'User ID', value: 'usr_abc123', copyable: true },
    { label: 'Created', value: Date.now(), format: 'date' },
    { label: 'File Size', value: 1024000, format: 'bytes' },
  ]}
/>
```

---

## Alert

Notification banners with semantic variants.

```typescript
interface AlertProps {
  variant: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
```

### Example
```tsx
<Alert variant="error" title="Error" dismissible onDismiss={() => setShowAlert(false)}>
  Something went wrong. Please try again.
</Alert>

<Alert variant="success">Changes saved successfully!</Alert>
```

---

## Input

Text input with label, icons, and validation.

```typescript
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  labelVariant?: 'above' | 'before' | 'after';
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  helperText?: string;
  wrapperClassName?: string;
}
```

### Label Variants
- `above` - Label stacked above input (default)
- `before` - Label inline before input
- `after` - Label inline after input (for checkboxes)

### Examples
```tsx
<Input label="Email" type="email" placeholder="you@example.com" />
<Input label="Search" prefixIcon={<SearchIcon />} />
<Input
  label="Password"
  type="password"
  variant="error"
  helperText="Password must be at least 8 characters"
  required
/>
```

---

## TextArea

Multi-line text input with auto-resize.

```typescript
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  labelVariant?: 'above';
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  helperText?: string;
  autoResize?: boolean;
  wrapperClassName?: string;
}
```

### Example
```tsx
<TextArea label="Description" placeholder="Enter description..." autoResize />
```

---

## Modal

Dialog overlays built on Radix UI Dialog primitives. Supports trigger-based or controlled state, with multiple sizes and optional overlay dismiss.

### Sub-components
| Component | Purpose |
|-----------|---------|
| `Modal` | Root container (accepts `open` and `onOpenChange` for controlled state) |
| `Modal.Trigger` | Opens modal (use `asChild` prop) |
| `Modal.Content` | Modal content with overlay |
| `Modal.Header` | Header section |
| `Modal.Title` | Accessible title (required for a11y) |
| `Modal.Description` | Accessible description |
| `Modal.Body` | Content area |
| `Modal.Footer` | Footer section (typically for actions) |
| `Modal.Close` | Close button (use `asChild` prop) |

### Modal.Content Props
```typescript
interface ModalContentProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; // Default: 'md'
  showClose?: boolean; // Show X button, default: true
  dismissOnOverlayClick?: boolean; // Allow overlay/ESC dismiss, default: true
}
```

### Examples

**Basic modal with trigger:**
```tsx
<Modal>
  <Modal.Trigger asChild>
    <Button>Open Modal</Button>
  </Modal.Trigger>
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>Modal Title</Modal.Title>
      <Modal.Description>Modal description</Modal.Description>
    </Modal.Header>
    <Modal.Body>
      <p>Modal content goes here.</p>
    </Modal.Body>
    <Modal.Footer>
      <Modal.Close asChild>
        <Button variant="secondary">Cancel</Button>
      </Modal.Close>
      <Button>Confirm</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

**Controlled modal:**
```tsx
const [open, setOpen] = useState(false);

<Modal open={open} onOpenChange={setOpen}>
  <Modal.Content size="lg">
    <Modal.Header>
      <Modal.Title>Large Modal</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Content here</p>
    </Modal.Body>
  </Modal.Content>
</Modal>
```

**Modal without overlay dismiss (force user choice):**
```tsx
<Modal>
  <Modal.Trigger asChild>
    <Button>Open</Button>
  </Modal.Trigger>
  <Modal.Content dismissOnOverlayClick={false}>
    <Modal.Header>
      <Modal.Title>Important Decision</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>You must make a choice.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={() => handleChoice('no')}>No</Button>
      <Button onClick={() => handleChoice('yes')}>Yes</Button>
    </Modal.Footer>
  </Modal.Content>
</Modal>
```

---

## Dropdown

Menu system built on Radix UI with compound components.

### Sub-components
| Component | Purpose |
|-----------|---------|
| `Dropdown` | Root container |
| `Dropdown.Trigger` | Opens menu (use `asChild` prop) |
| `Dropdown.Content` | Menu container |
| `Dropdown.Item` | Menu item (`variant?: 'default' \| 'danger'`) |
| `Dropdown.CheckboxItem` | Checkbox item |
| `Dropdown.RadioGroup` | Radio group container |
| `Dropdown.RadioItem` | Radio item |
| `Dropdown.Sub` | Sub-menu container |
| `Dropdown.SubTrigger` | Sub-menu trigger |
| `Dropdown.SubContent` | Sub-menu content |
| `Dropdown.Label` | Section label |
| `Dropdown.Separator` | Visual divider |
| `Dropdown.Shortcut` | Keyboard hint |

### Example
```tsx
<Dropdown>
  <Dropdown.Trigger asChild>
    <Button variant="secondary">Options</Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Label>Actions</Dropdown.Label>
    <Dropdown.Item>Edit<Dropdown.Shortcut>⌘E</Dropdown.Shortcut></Dropdown.Item>
    <Dropdown.Item>Duplicate</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Sub>
      <Dropdown.SubTrigger>More</Dropdown.SubTrigger>
      <Dropdown.SubContent>
        <Dropdown.Item>Archive</Dropdown.Item>
        <Dropdown.Item>Move</Dropdown.Item>
      </Dropdown.SubContent>
    </Dropdown.Sub>
    <Dropdown.Separator />
    <Dropdown.Item variant="danger">Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>
```

---

## Tooltip

Hover hints built on Radix UI.

### Sub-components
- `Tooltip.Provider` - Setup (wrap app or section)
- `Tooltip` - Container
- `Tooltip.Trigger` - Trigger element
- `Tooltip.Content` - Tooltip content

```typescript
interface TooltipContentProps {
  showArrow?: boolean; // Default: true
  sideOffset?: number; // Default: 4
  side?: 'top' | 'right' | 'bottom' | 'left';
}
```

### Example
```tsx
<Tooltip.Provider>
  <Tooltip>
    <Tooltip.Trigger asChild>
      <Button variant="ghost"><InfoIcon /></Button>
    </Tooltip.Trigger>
    <Tooltip.Content>Helpful information here</Tooltip.Content>
  </Tooltip>
</Tooltip.Provider>
```

---

## TabBar

Horizontal tab navigation.

```typescript
interface TabBarItem {
  id: string;
  label: string;
}

interface TabBarProps {
  items: TabBarItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}
```

### Example
```tsx
const [activeTab, setActiveTab] = useState('overview');

<div className="border-b border-gray-200">
  <TabBar
    items={[
      { id: 'overview', label: 'Overview' },
      { id: 'details', label: 'Details' },
      { id: 'settings', label: 'Settings' },
    ]}
    activeId={activeTab}
    onChange={setActiveTab}
  />
</div>
```

---

## Layout

App shell with header, optional sidebar, and user menu.

```typescript
interface LayoutProps {
  children: ReactNode;
  user?: { name?: string; email?: string };
  title?: string;
  showBackButton?: boolean;
  headerRight?: ReactNode;
  maxWidth?: 'narrow' | 'medium' | 'wide';
  banner?: { message: string; link?: { text: string; url: string } };
  searchBar?: ReactNode;
  isHomePage?: boolean;
  onNavigateHome?: () => void;
  menuItems?: Array<{
    label: string;
    icon?: ReactNode;
    onClick: () => void;
    variant?: 'default' | 'danger';
  }>;
  onLogout?: () => void;
  sidebar?: {
    items: SidebarItem[] | SidebarGroup[];
    header?: ReactNode;
    footer?: ReactNode;
    defaultCollapsed?: boolean;
    variant?: 'responsive' | 'inline';
  };
}
```

### LayoutContainer
Utility for consistent content width:
```tsx
<LayoutContainer maxWidth="medium">{children}</LayoutContainer>
```
- `narrow` - max-w-lg
- `medium` - max-w-3xl
- `wide` - max-w-5xl

### Example
```tsx
<Layout
  title="Dashboard"
  user={{ name: 'John', email: 'john@example.com' }}
  menuItems={[{ label: 'Settings', onClick: handleSettings }]}
  onLogout={handleLogout}
  sidebar={{
    items: [
      { id: 'home', label: 'Home', icon: <HomeIcon />, href: '/' },
      { id: 'users', label: 'Users', icon: <UserIcon />, href: '/users' },
    ],
    variant: 'responsive',
  }}
>
  <LayoutContainer maxWidth="medium">
    <h1>Page Content</h1>
  </LayoutContainer>
</Layout>
```

---

## Sidebar

Collapsible navigation with responsive behavior.

```typescript
interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  badge?: string | number;
}

interface SidebarGroup {
  label?: string;
  items: SidebarItem[];
}

interface SidebarProps {
  items?: SidebarItem[] | SidebarGroup[];
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  variant?: 'responsive' | 'inline';
  className?: string;
}
```

### useSidebar Hook
```typescript
const { isOpen, toggle, isMobile, isCollapsed, toggleCollapsed } = useSidebar();
```

### Example
```tsx
<SidebarProvider defaultCollapsed={false}>
  <Sidebar
    items={[
      {
        label: 'Navigation',
        items: [
          { id: 'home', label: 'Home', icon: <HomeIcon />, href: '/', isActive: true },
          { id: 'users', label: 'Users', icon: <UserIcon />, href: '/users', badge: 5 },
        ],
      },
    ]}
    header={<div className="p-4">Logo</div>}
  />
</SidebarProvider>
```

---

## Skeleton

Loading placeholder components.

```typescript
// Base skeleton
<Skeleton className="h-12 w-32" />

// Multi-line text
<SkeletonText lines={3} />

// Stat card placeholder
<SkeletonStatCard />

// List item placeholder
<SkeletonListItem />
```

---

## LoginPage

Full-screen login page with branding.

```typescript
interface LoginPageProps {
  title: string;
  subtitle?: string;
  onLogin: () => void;
  loginButtonIcon?: ReactNode;
  loginButtonText?: string;
  className?: string;
  loading?: boolean;
  banner?: { message: string; link?: { text: string; url: string } };
  helperText?: string;
  children?: ReactNode;
}
```

### Example
```tsx
<LoginPage
  title="Sign In"
  subtitle="Enter your credentials"
  onLogin={handleGoogleLogin}
  loading={isLoading}
  loginButtonText="Sign in with Google"
  loginButtonIcon={<GoogleIcon />}
/>
```

---

## GPLogo

TheGP logo SVG component.

```typescript
interface GPLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

Sizes: sm (24x12), md (45x22), lg (91x44)

```tsx
<GPLogo size="md" className="text-orange-500" />
```
