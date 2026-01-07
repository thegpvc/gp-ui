# Content Primitives Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create composable Content primitives (ContentArea, ContentTabs, ContentSidebar, ContentPane) for filling Layout's content area with common patterns.

**Architecture:** Components share state via ContentContext. ContentArea wraps children and provides context. ContentSidebar registers itself so ContentTabs can auto-render the mobile trigger. ContentPane handles max-width or full-width modes.

**Tech Stack:** React, TypeScript, Tailwind CSS, Radix (for drawer portal)

---

### Task 1: Create ContentContext

**Files:**
- Create: `src/components/Content/ContentContext.tsx`

**Step 1: Create the context file**

```tsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export interface ContentContextValue {
  hasSidebar: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  registerSidebar: () => () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function useContentContext() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContentContext must be used within ContentProvider");
  }
  return context;
}

export function useContentSidebar() {
  const { sidebarOpen, toggleSidebar, closeSidebar } = useContentContext();
  return {
    open: sidebarOpen,
    toggle: toggleSidebar,
    close: closeSidebar,
  };
}

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCount, setSidebarCount] = useState(0);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const registerSidebar = useCallback(() => {
    setSidebarCount((c) => c + 1);
    return () => setSidebarCount((c) => c - 1);
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({
      hasSidebar: sidebarCount > 0,
      sidebarOpen,
      toggleSidebar,
      closeSidebar,
      registerSidebar,
    }),
    [sidebarCount, sidebarOpen, toggleSidebar, closeSidebar, registerSidebar]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
```

**Step 2: Verify file created**

Run: `cat src/components/Content/ContentContext.tsx | head -20`
Expected: Shows the imports and interface definition

**Step 3: Commit**

```bash
git add src/components/Content/ContentContext.tsx
git commit -m "feat(Content): add ContentContext for shared state"
```

---

### Task 2: Create ContentArea

**Files:**
- Create: `src/components/Content/ContentArea.tsx`

**Step 1: Create the ContentArea component**

```tsx
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { ContentProvider } from "./ContentContext";

export interface ContentAreaProps {
  children: ReactNode;
  className?: string;
}

export function ContentArea({ children, className }: ContentAreaProps) {
  return (
    <ContentProvider>
      <div className={cn("flex-1 flex flex-col min-h-0", className)}>
        {children}
      </div>
    </ContentProvider>
  );
}
```

**Step 2: Verify file created**

Run: `cat src/components/Content/ContentArea.tsx`
Expected: Shows the complete component

**Step 3: Commit**

```bash
git add src/components/Content/ContentArea.tsx
git commit -m "feat(Content): add ContentArea component"
```

---

### Task 3: Create ContentPane

**Files:**
- Create: `src/components/Content/ContentPane.tsx`

**Step 1: Create the ContentPane component**

```tsx
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type ContentPaneMaxWidth = "narrow" | "medium" | "wide";

const MAX_WIDTH_CLASSES: Record<ContentPaneMaxWidth, string> = {
  narrow: "max-w-lg",
  medium: "max-w-3xl",
  wide: "max-w-5xl",
};

export interface ContentPaneProps {
  children: ReactNode;
  /** Center content with a max-width constraint */
  maxWidth?: ContentPaneMaxWidth;
  /** Remove max-width for dashboards/canvases */
  fullWidth?: boolean;
  /** Add padding (default: true) */
  padding?: boolean;
  className?: string;
}

export function ContentPane({
  children,
  maxWidth,
  fullWidth = false,
  padding = true,
  className,
}: ContentPaneProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto bg-orange-50",
        padding && "p-4 lg:p-6",
        className
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto w-full",
            MAX_WIDTH_CLASSES[maxWidth ?? "medium"]
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Verify file created**

Run: `cat src/components/Content/ContentPane.tsx`
Expected: Shows the complete component with MAX_WIDTH_CLASSES

**Step 3: Commit**

```bash
git add src/components/Content/ContentPane.tsx
git commit -m "feat(Content): add ContentPane component"
```

---

### Task 4: Create ContentSidebarTrigger

**Files:**
- Create: `src/components/Content/ContentSidebarTrigger.tsx`

**Step 1: Create the trigger component**

```tsx
import { Menu } from "lucide-react";
import { cn } from "../../utils/cn";
import { useContentContext } from "./ContentContext";

export interface ContentSidebarTriggerProps {
  className?: string;
}

export function ContentSidebarTrigger({
  className,
}: ContentSidebarTriggerProps) {
  const { toggleSidebar } = useContentContext();

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
  );
}
```

**Step 2: Verify file created**

Run: `cat src/components/Content/ContentSidebarTrigger.tsx`
Expected: Shows the complete component

**Step 3: Commit**

```bash
git add src/components/Content/ContentSidebarTrigger.tsx
git commit -m "feat(Content): add ContentSidebarTrigger component"
```

---

### Task 5: Create ContentTabs

**Files:**
- Create: `src/components/Content/ContentTabs.tsx`

**Step 1: Create the ContentTabs component**

```tsx
import { cn } from "../../utils/cn";
import { TabBar, type TabBarItem } from "../TabBar";
import { useContentContext } from "./ContentContext";
import { ContentSidebarTrigger } from "./ContentSidebarTrigger";

export interface ContentTabsProps {
  tabs: TabBarItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** Make tabs sticky (default: true) */
  sticky?: boolean;
  className?: string;
}

export function ContentTabs({
  tabs,
  activeId,
  onChange,
  sticky = true,
  className,
}: ContentTabsProps) {
  const { hasSidebar } = useContentContext();

  return (
    <div
      className={cn(
        "bg-orange-50 border-b border-gray-200 px-4 lg:px-6 flex items-center",
        sticky && "sticky top-0 z-10",
        className
      )}
    >
      {hasSidebar && <ContentSidebarTrigger className="mr-2 md:hidden" />}
      <TabBar items={tabs} activeId={activeId} onChange={onChange} />
    </div>
  );
}
```

**Step 2: Verify file created**

Run: `cat src/components/Content/ContentTabs.tsx`
Expected: Shows the complete component with hasSidebar check

**Step 3: Commit**

```bash
git add src/components/Content/ContentTabs.tsx
git commit -m "feat(Content): add ContentTabs component"
```

---

### Task 6: Create ContentSidebarDrawer (internal)

**Files:**
- Create: `src/components/Content/ContentSidebarDrawer.tsx`

**Step 1: Create the drawer component**

```tsx
import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";

interface ContentSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  position: "left" | "right";
  children: React.ReactNode;
}

export function ContentSidebarDrawer({
  open,
  onClose,
  position,
  children,
}: ContentSidebarDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        className={cn(
          "fixed top-0 z-40 h-[100dvh] w-64 bg-white flex flex-col md:hidden",
          "transition-transform duration-200",
          position === "left" ? "left-0 border-r" : "right-0 border-l",
          position === "left"
            ? open
              ? "translate-x-0"
              : "-translate-x-full"
            : open
              ? "translate-x-0"
              : "translate-x-full",
          "border-gray-200"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-3 p-1 text-navy-400 hover:text-navy-600 transition-colors",
            position === "left" ? "right-3" : "left-3"
          )}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pt-12">{children}</div>
      </aside>
    </>
  );
}
```

**Step 2: Verify file created**

Run: `cat src/components/Content/ContentSidebarDrawer.tsx`
Expected: Shows the complete drawer component

**Step 3: Commit**

```bash
git add src/components/Content/ContentSidebarDrawer.tsx
git commit -m "feat(Content): add ContentSidebarDrawer (internal)"
```

---

### Task 7: Create ContentSidebar

**Files:**
- Create: `src/components/Content/ContentSidebar.tsx`

**Step 1: Create the ContentSidebar component**

```tsx
import { useEffect } from "react";
import { cn } from "../../utils/cn";
import { useContentContext } from "./ContentContext";
import { ContentSidebarDrawer } from "./ContentSidebarDrawer";

export type ContentSidebarWidth = "narrow" | "medium" | "wide";

const WIDTH_CLASSES: Record<ContentSidebarWidth, string> = {
  narrow: "w-[200px]",
  medium: "w-[256px]",
  wide: "w-[320px]",
};

export interface ContentSidebarProps {
  children: React.ReactNode;
  /** Sidebar width (default: medium) */
  width?: ContentSidebarWidth;
  /** Position relative to ContentPane (default: left) */
  position?: "left" | "right";
  className?: string;
}

export function ContentSidebar({
  children,
  width = "medium",
  position = "left",
  className,
}: ContentSidebarProps) {
  const { sidebarOpen, closeSidebar, registerSidebar } = useContentContext();

  // Register this sidebar with the context
  useEffect(() => {
    return registerSidebar();
  }, [registerSidebar]);

  return (
    <>
      {/* Desktop: static sidebar */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col border-gray-200 bg-white overflow-y-auto shrink-0",
          position === "left" ? "border-r" : "border-l order-last",
          WIDTH_CLASSES[width],
          className
        )}
      >
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
  );
}
```

**Step 2: Verify file created**

Run: `cat src/components/Content/ContentSidebar.tsx`
Expected: Shows the complete component with registerSidebar effect

**Step 3: Commit**

```bash
git add src/components/Content/ContentSidebar.tsx
git commit -m "feat(Content): add ContentSidebar component"
```

---

### Task 8: Create Content index and wire up exports

**Files:**
- Create: `src/components/Content/index.ts`
- Modify: `src/components/index.ts`

**Step 1: Create Content index file**

```tsx
export { ContentArea } from "./ContentArea";
export type { ContentAreaProps } from "./ContentArea";

export { ContentTabs } from "./ContentTabs";
export type { ContentTabsProps } from "./ContentTabs";

export { ContentSidebar } from "./ContentSidebar";
export type { ContentSidebarProps, ContentSidebarWidth } from "./ContentSidebar";

export { ContentSidebarTrigger } from "./ContentSidebarTrigger";
export type { ContentSidebarTriggerProps } from "./ContentSidebarTrigger";

export { ContentPane } from "./ContentPane";
export type { ContentPaneProps, ContentPaneMaxWidth } from "./ContentPane";

export { useContentSidebar } from "./ContentContext";
```

**Step 2: Add Content to components index**

Add this line to `src/components/index.ts`:

```tsx
export * from './Content'
```

**Step 3: Verify exports**

Run: `cat src/components/index.ts`
Expected: Shows Content export alongside other components

**Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: No type errors

**Step 5: Commit**

```bash
git add src/components/Content/index.ts src/components/index.ts
git commit -m "feat(Content): export all Content components"
```

---

### Task 9: Create ContentBody wrapper for sidebar layout

**Files:**
- Create: `src/components/Content/ContentBody.tsx`
- Modify: `src/components/Content/index.ts`

**Step 1: Create ContentBody component**

This component wraps ContentSidebar + ContentPane to provide the horizontal flex layout.

```tsx
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ContentBodyProps {
  children: ReactNode;
  className?: string;
}

export function ContentBody({ children, className }: ContentBodyProps) {
  return (
    <div className={cn("flex-1 flex min-h-0", className)}>{children}</div>
  );
}
```

**Step 2: Add export to index**

Add to `src/components/Content/index.ts`:

```tsx
export { ContentBody } from "./ContentBody";
export type { ContentBodyProps } from "./ContentBody";
```

**Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: No type errors

**Step 4: Commit**

```bash
git add src/components/Content/ContentBody.tsx src/components/Content/index.ts
git commit -m "feat(Content): add ContentBody wrapper for sidebar layouts"
```

---

### Task 10: Build and verify

**Step 1: Run full build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Run lint**

Run: `npm run lint`
Expected: No lint errors (or only pre-existing ones)

**Step 3: Commit if any fixes needed**

```bash
git add -A
git commit -m "fix: lint and build fixes for Content components"
```

---

### Task 11: Create ContentLayoutsDemo playground page

**Files:**
- Create: `playground/src/components/ContentLayoutsDemo.tsx`

**Step 1: Create the demo component**

```tsx
import { useState } from "react";
import {
  ContentArea,
  ContentTabs,
  ContentSidebar,
  ContentPane,
  ContentBody,
  Card,
  Button,
  Alert,
} from "@gp/ui";
import { FileText, Settings, Users, Home, BarChart3 } from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "analytics", label: "Analytics" },
  { id: "settings", label: "Settings" },
];

const sidebarItems = [
  { id: "intro", label: "Introduction", icon: <Home className="w-4 h-4" /> },
  { id: "guide", label: "User Guide", icon: <FileText className="w-4 h-4" /> },
  { id: "api", label: "API Reference", icon: <Settings className="w-4 h-4" /> },
  { id: "team", label: "Team", icon: <Users className="w-4 h-4" /> },
];

export function ContentLayoutsDemo() {
  const [activeTab, setActiveTab] = useState("overview");
  const [activeSidebarItem, setActiveSidebarItem] = useState("intro");
  const [demoType, setDemoType] = useState<
    "tabs" | "sidebar" | "tabs-sidebar" | "fullwidth"
  >("tabs");

  return (
    <div className="space-y-8">
      <Alert variant="info">
        The Content primitives fill the Layout content area with common
        patterns. Select a demo below to see each pattern.
      </Alert>

      {/* Demo selector */}
      <section className="demo-section">
        <h2 className="demo-section-title">Select Pattern</h2>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={demoType === "tabs" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("tabs")}
          >
            Tabs + Content
          </Button>
          <Button
            variant={demoType === "sidebar" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("sidebar")}
          >
            Secondary Sidebar
          </Button>
          <Button
            variant={demoType === "tabs-sidebar" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("tabs-sidebar")}
          >
            Tabs + Sidebar
          </Button>
          <Button
            variant={demoType === "fullwidth" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setDemoType("fullwidth")}
          >
            Full-Width Canvas
          </Button>
        </div>
      </section>

      {/* Demo container */}
      <section className="demo-section">
        <h2 className="demo-section-title">
          {demoType === "tabs" && "Tabs + Centered Content"}
          {demoType === "sidebar" && "Secondary Sidebar + Content"}
          {demoType === "tabs-sidebar" && "Tabs + Sidebar Combined"}
          {demoType === "fullwidth" && "Full-Width Canvas"}
        </h2>

        <div className="border border-gray-200 rounded-lg overflow-hidden h-[400px]">
          {demoType === "tabs" && (
            <ContentArea>
              <ContentTabs
                tabs={tabs}
                activeId={activeTab}
                onChange={setActiveTab}
              />
              <ContentPane maxWidth="medium">
                <Card>
                  <h3 className="font-semibold text-navy-900 mb-2">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-navy-600 text-sm">
                    This is the {activeTab} tab content. The tabs are sticky and
                    the content is centered with a max-width constraint.
                  </p>
                </Card>
              </ContentPane>
            </ContentArea>
          )}

          {demoType === "sidebar" && (
            <ContentArea>
              <ContentBody>
                <ContentSidebar width="narrow">
                  <nav className="p-3 space-y-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSidebarItem(item.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          activeSidebarItem === item.id
                            ? "bg-orange-100 text-orange-700"
                            : "text-navy-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </ContentSidebar>
                <ContentPane maxWidth="wide">
                  <Card>
                    <h3 className="font-semibold text-navy-900 mb-2">
                      {sidebarItems.find((i) => i.id === activeSidebarItem)?.label}
                    </h3>
                    <p className="text-navy-600 text-sm">
                      Secondary sidebar content. On mobile, tap the menu icon in
                      the header to open the sidebar as a drawer.
                    </p>
                  </Card>
                </ContentPane>
              </ContentBody>
            </ContentArea>
          )}

          {demoType === "tabs-sidebar" && (
            <ContentArea>
              <ContentTabs
                tabs={tabs}
                activeId={activeTab}
                onChange={setActiveTab}
              />
              <ContentBody>
                <ContentSidebar width="narrow">
                  <nav className="p-3 space-y-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSidebarItem(item.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          activeSidebarItem === item.id
                            ? "bg-orange-100 text-orange-700"
                            : "text-navy-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </ContentSidebar>
                <ContentPane>
                  <Card>
                    <h3 className="font-semibold text-navy-900 mb-2">
                      {tabs.find((t) => t.id === activeTab)?.label} /{" "}
                      {sidebarItems.find((i) => i.id === activeSidebarItem)?.label}
                    </h3>
                    <p className="text-navy-600 text-sm">
                      Combined tabs and sidebar. The sidebar trigger appears in
                      the tab bar on mobile.
                    </p>
                  </Card>
                </ContentPane>
              </ContentBody>
            </ContentArea>
          )}

          {demoType === "fullwidth" && (
            <ContentArea>
              <ContentPane fullWidth padding={false}>
                <div className="h-full bg-gradient-to-br from-navy-100 to-orange-100 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-navy-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-navy-900 mb-1">
                      Dashboard Canvas
                    </h3>
                    <p className="text-navy-600 text-sm">
                      Full-width, edge-to-edge content area
                    </p>
                  </div>
                </div>
              </ContentPane>
            </ContentArea>
          )}
        </div>
      </section>

      {/* Usage code */}
      <section className="demo-section">
        <h2 className="demo-section-title">Usage</h2>
        <pre className="code-block">
          {demoType === "tabs" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentTabs
      tabs={[
        { id: 'overview', label: 'Overview' },
        { id: 'settings', label: 'Settings' },
      ]}
      activeId={activeTab}
      onChange={setActiveTab}
    />
    <ContentPane maxWidth="medium">
      <Outlet />
    </ContentPane>
  </ContentArea>
</Layout>`}
          {demoType === "sidebar" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentBody>
      <ContentSidebar width="narrow">
        <TableOfContents />
      </ContentSidebar>
      <ContentPane maxWidth="wide">
        <Article />
      </ContentPane>
    </ContentBody>
  </ContentArea>
</Layout>`}
          {demoType === "tabs-sidebar" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentTabs tabs={tabs} activeId={id} onChange={setId} />
    <ContentBody>
      <ContentSidebar>
        <SettingsNav />
      </ContentSidebar>
      <ContentPane>
        <Outlet />
      </ContentPane>
    </ContentBody>
  </ContentArea>
</Layout>`}
          {demoType === "fullwidth" &&
            `<Layout sidebar={...}>
  <ContentArea>
    <ContentPane fullWidth padding={false}>
      <DashboardGrid />
    </ContentPane>
  </ContentArea>
</Layout>`}
        </pre>
      </section>
    </div>
  );
}
```

**Step 2: Verify file created**

Run: `wc -l playground/src/components/ContentLayoutsDemo.tsx`
Expected: ~220 lines

**Step 3: Commit**

```bash
git add playground/src/components/ContentLayoutsDemo.tsx
git commit -m "feat(playground): add ContentLayoutsDemo page"
```

---

### Task 12: Wire up ContentLayoutsDemo in playground App

**Files:**
- Modify: `playground/src/App.tsx`

**Step 1: Add import**

Add to the imports section of `playground/src/App.tsx`:

```tsx
import { ContentLayoutsDemo } from './components/ContentLayoutsDemo'
```

**Step 2: Add to sectionDescriptions**

Add to the `sectionDescriptions` object:

```tsx
contentlayouts: 'Content area primitives for tabs, sidebars, and canvases',
```

**Step 3: Add icon import**

Add `Layers` to the lucide-react import:

```tsx
import {
  // ... existing imports
  Layers,
} from 'lucide-react'
```

**Step 4: Add to sidebar groups**

Add to the "Layouts" group in `sidebarGroups`:

```tsx
{
  id: 'contentlayouts',
  label: 'Content Layouts',
  icon: <Layers className="w-5 h-5" />,
  onClick: () => setActiveSection('contentlayouts'),
  isActive: activeSection === 'contentlayouts',
},
```

**Step 5: Add to renderSection switch**

Add case to `renderSection`:

```tsx
case 'contentlayouts':
  return <ContentLayoutsDemo />
```

**Step 6: Run dev server and verify**

Run: `cd playground && npm run dev`
Expected: Playground loads, "Content Layouts" appears in Layouts section, demo works

**Step 7: Commit**

```bash
git add playground/src/App.tsx
git commit -m "feat(playground): wire up ContentLayoutsDemo in sidebar"
```

---

### Task 13: Final build and verification

**Step 1: Build library**

Run: `npm run build`
Expected: Build succeeds

**Step 2: Build playground**

Run: `cd playground && npm run build`
Expected: Build succeeds

**Step 3: Run lint on everything**

Run: `npm run lint`
Expected: No errors

**Step 4: Final commit if needed**

```bash
git add -A
git commit -m "chore: final cleanup for Content primitives"
```

---

## Summary

After completing all tasks, the library exports:

- `ContentArea` - Flex container with ContentProvider
- `ContentTabs` - Cream background tab bar wrapping TabBar
- `ContentSidebar` - Secondary sidebar, drawer on mobile
- `ContentSidebarTrigger` - Manual trigger placement
- `ContentPane` - Main content with maxWidth/fullWidth modes
- `ContentBody` - Horizontal flex wrapper for sidebar layouts
- `useContentSidebar` - Hook for programmatic control

The playground demos all four patterns with interactive examples.
