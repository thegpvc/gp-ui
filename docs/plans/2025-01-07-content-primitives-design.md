# Content Primitives Design

Composable components for filling the Layout content area with common patterns: tabs, secondary sidebars, max-width content, and full-width canvases.

## Goals

- Provide opinionated defaults for common layout patterns
- Stay flexible enough for apps to integrate with any routing library
- Support responsive behavior (drawer sidebars on mobile)
- Compose cleanly with existing Layout and TabBar components

## Components

### ContentArea

Base container that fills the Layout's content region. Establishes flex context for child components.

```tsx
interface ContentAreaProps {
  children: ReactNode
  className?: string
}
```

**Behavior:**
- `flex-1` fills available space from Layout
- `flex flex-col` stacks children vertically
- `min-h-0` enables proper overflow handling in nested flex containers

**Implementation:**
```tsx
function ContentArea({ children, className }: ContentAreaProps) {
  return (
    <ContentProvider>
      <div className={cn("flex-1 flex flex-col min-h-0", className)}>
        {children}
      </div>
    </ContentProvider>
  )
}
```

### ContentTabs

Tab bar wrapper with cream background, sticky positioning. Wraps the existing `TabBar` component.

```tsx
interface ContentTabsProps {
  tabs: TabBarItem[]
  activeId: string
  onChange: (id: string) => void
  sticky?: boolean  // defaults to true
  className?: string
}
```

**Behavior:**
- Cream background (`bg-orange-50`)
- Sticky by default so tabs stay visible while scrolling
- Reuses existing `TabBar` internally
- On mobile, renders `ContentSidebarTrigger` when a sibling `ContentSidebar` exists (detected via context)

**Implementation:**
```tsx
function ContentTabs({ tabs, activeId, onChange, sticky = true, className }: ContentTabsProps) {
  const { hasSidebar } = useContentContext()

  return (
    <div className={cn(
      "bg-orange-50 border-b border-gray-200 px-4 lg:px-6 flex items-center",
      sticky && "sticky top-0 z-10",
      className
    )}>
      {hasSidebar && <ContentSidebarTrigger className="mr-2 md:hidden" />}
      <TabBar items={tabs} activeId={activeId} onChange={onChange} />
    </div>
  )
}
```

### ContentSidebar

Secondary sidebar inside the content area. Static on desktop, drawer on mobile (no collapsed icon strip).

```tsx
interface ContentSidebarProps {
  children: ReactNode
  width?: 'narrow' | 'medium' | 'wide'  // 200px, 256px, 320px
  position?: 'left' | 'right'           // defaults to 'left'
  className?: string
}
```

**Width values:**
- `narrow`: 200px
- `medium`: 256px (default)
- `wide`: 320px

**Behavior:**
- Hidden on mobile (`hidden md:block`), shows as drawer when triggered
- Static on desktop, positioned left or right
- White background to differentiate from cream content area
- Scrolls independently from main content
- No collapsed icon strip (unlike primary Sidebar)
- Registers with ContentContext so ContentTabs can show trigger

**Implementation sketch:**
```tsx
function ContentSidebar({ children, width = 'medium', position = 'left', className }: ContentSidebarProps) {
  const { sidebarOpen, closeSidebar } = useContentContext()

  // Register sidebar existence on mount
  useRegisterContentSidebar()

  return (
    <>
      {/* Desktop: static sidebar */}
      <aside className={cn(
        "hidden md:block border-gray-200 bg-white overflow-y-auto shrink-0",
        position === 'left' ? 'border-r' : 'border-l order-last',
        WIDTH_CLASSES[width],
        className
      )}>
        {children}
      </aside>

      {/* Mobile: drawer overlay */}
      <ContentSidebarDrawer
        open={sidebarOpen}
        onClose={closeSidebar}
        position={position}
      >
        {children}
      </ContentSidebarDrawer>
    </>
  )
}
```

### ContentSidebarTrigger

Standalone trigger button for opening the mobile drawer. Used internally by ContentTabs, but can be placed manually if needed.

```tsx
interface ContentSidebarTriggerProps {
  className?: string
}
```

**Implementation:**
```tsx
function ContentSidebarTrigger({ className }: ContentSidebarTriggerProps) {
  const { toggleSidebar } = useContentContext()

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "p-1.5 text-navy-600 hover:text-navy-900 hover:bg-white/50 rounded transition-colors",
        className
      )}
      aria-label="Toggle sidebar"
    >
      <Menu className="w-5 h-5" />
    </button>
  )
}
```

### ContentPane

The main content region. Handles max-width vs full-width and scrolling.

```tsx
interface ContentPaneProps {
  children: ReactNode
  maxWidth?: 'narrow' | 'medium' | 'wide'  // centered with max-width
  fullWidth?: boolean                       // no max-width, fills space
  padding?: boolean                         // defaults to true
  className?: string
}
```

**Max-width values** (same as existing LayoutContainer):
- `narrow`: max-w-lg (512px)
- `medium`: max-w-3xl (768px)
- `wide`: max-w-5xl (1024px)

**Behavior:**
- Scrolls independently (important when sidebar is present)
- `maxWidth` centers content (default: `medium`)
- `fullWidth` removes max-width for dashboards/canvases
- `padding={false}` for edge-to-edge content

**Implementation:**
```tsx
function ContentPane({
  children,
  maxWidth,
  fullWidth = false,
  padding = true,
  className
}: ContentPaneProps) {
  return (
    <div className={cn(
      "flex-1 overflow-y-auto bg-orange-50",
      padding && "p-4 lg:p-6",
      className
    )}>
      {fullWidth ? (
        children
      ) : (
        <div className={cn(
          "mx-auto w-full",
          MAX_WIDTH_CLASSES[maxWidth ?? 'medium']
        )}>
          {children}
        </div>
      )}
    </div>
  )
}
```

## Context

`ContentProvider` manages shared state for the Content primitives.

```tsx
interface ContentContextValue {
  hasSidebar: boolean
  sidebarOpen: boolean
  toggleSidebar: () => void
  closeSidebar: () => void
  registerSidebar: () => () => void  // returns unregister function
}
```

**Hook:** `useContentSidebar()` exposes `{ open, toggle, close }` for apps that need programmatic control.

## Layout Integration

The flex container structure when sidebar is present:

```tsx
<ContentArea>              {/* flex-1 flex flex-col */}
  <ContentTabs ... />      {/* sticky header */}
  <div className="flex-1 flex min-h-0">  {/* horizontal flex for sidebar + pane */}
    <ContentSidebar />     {/* shrink-0, fixed width */}
    <ContentPane />        {/* flex-1, scrolls */}
  </div>
</ContentArea>
```

This requires ContentArea to detect when ContentSidebar is present and wrap siblings appropriately, OR we introduce a `ContentBody` wrapper:

```tsx
<ContentArea>
  <ContentTabs ... />
  <ContentBody>           {/* flex-1 flex min-h-0 */}
    <ContentSidebar />
    <ContentPane />
  </ContentBody>
</ContentArea>
```

**Recommendation:** Use implicit detection in ContentArea to avoid the extra wrapper. ContentSidebar and ContentPane register with context; ContentArea renders the appropriate flex structure.

## Usage Examples

### Tabs with centered content (settings page)

```tsx
<Layout sidebar={mainNav}>
  <ContentArea>
    <ContentTabs
      tabs={[
        { id: 'profile', label: 'Profile' },
        { id: 'billing', label: 'Billing' },
        { id: 'team', label: 'Team' },
      ]}
      activeId={activeTab}
      onChange={setActiveTab}
    />
    <ContentPane maxWidth="medium">
      <Outlet />
    </ContentPane>
  </ContentArea>
</Layout>
```

### Secondary sidebar with content (docs viewer)

```tsx
<Layout sidebar={mainNav}>
  <ContentArea>
    <ContentSidebar width="narrow">
      <TableOfContents sections={doc.sections} />
    </ContentSidebar>
    <ContentPane maxWidth="wide">
      <Article content={doc.content} />
    </ContentPane>
  </ContentArea>
</Layout>
```

### Tabs + sidebar (complex settings)

```tsx
<Layout sidebar={mainNav}>
  <ContentArea>
    <ContentTabs tabs={settingsTabs} activeId={tab} onChange={setTab} />
    <ContentSidebar>
      <SettingsNav section={tab} />
    </ContentSidebar>
    <ContentPane>
      <Outlet />
    </ContentPane>
  </ContentArea>
</Layout>
```

### Full-width canvas (dashboard)

```tsx
<Layout sidebar={mainNav}>
  <ContentArea>
    <ContentPane fullWidth padding={false}>
      <DashboardGrid widgets={widgets} />
    </ContentPane>
  </ContentArea>
</Layout>
```

### Router integration

```tsx
// Route at ContentArea level - different layouts per section
<Layout sidebar={mainNav}>
  <Routes>
    <Route path="/dashboard" element={
      <ContentArea>
        <ContentPane fullWidth padding={false}>
          <Dashboard />
        </ContentPane>
      </ContentArea>
    } />
    <Route path="/settings/*" element={
      <ContentArea>
        <ContentTabs tabs={settingsTabs} activeId={...} onChange={...} />
        <ContentPane>
          <Outlet />
        </ContentPane>
      </ContentArea>
    }>
      <Route path="profile" element={<ProfileSettings />} />
      <Route path="billing" element={<BillingSettings />} />
    </Route>
  </Routes>
</Layout>
```

## File Structure

```
src/components/Content/
  index.ts
  ContentArea.tsx
  ContentTabs.tsx
  ContentSidebar.tsx
  ContentSidebarTrigger.tsx
  ContentPane.tsx
  ContentContext.tsx
  ContentSidebarDrawer.tsx  (internal)
```

## Exports

Add to `src/index.ts`:

```tsx
export {
  ContentArea,
  ContentTabs,
  ContentSidebar,
  ContentSidebarTrigger,
  ContentPane,
  useContentSidebar
} from './components/Content'
export type {
  ContentAreaProps,
  ContentTabsProps,
  ContentSidebarProps,
  ContentSidebarTriggerProps,
  ContentPaneProps
} from './components/Content'
```

## Playground Updates

Add a new "Content Layouts" demo page showing:

1. Tabs + centered content
2. Secondary sidebar + content
3. Tabs + sidebar combined
4. Full-width canvas
5. Router integration example (simulated with state)

## Migration

- `LayoutContainer` remains for simple cases without the full Content system
- Apps can adopt Content primitives incrementally
- No breaking changes to existing Layout API
