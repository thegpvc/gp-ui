import { useEffect, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useContentContext } from "./ContentContext";
import { ContentSidebarDrawer } from "./ContentSidebarDrawer";
import { type ContentSidebarWidth, SIDEBAR_WIDTH_CLASSES } from "./types";

export type { ContentSidebarWidth };

export interface ContentSidebarProps {
  children: ReactNode;
  /** Sidebar width (default: medium) */
  width?: ContentSidebarWidth;
  /** Position relative to ContentPane (default: left) */
  position?: "left" | "right";
  className?: string;
}

/**
 * Secondary sidebar for content navigation or filters.
 * Renders as a static sidebar on desktop (md+) and a slide-out drawer on mobile.
 * Must be used inside ContentBody alongside ContentPane.
 *
 * @example
 * ```tsx
 * <ContentArea>
 *   <ContentBody>
 *     <ContentSidebar width="narrow" position="left">
 *       <nav className="p-3">
 *         <NavItem>Overview</NavItem>
 *         <NavItem>Settings</NavItem>
 *       </nav>
 *     </ContentSidebar>
 *     <ContentPane>
 *       <YourContent />
 *     </ContentPane>
 *   </ContentBody>
 * </ContentArea>
 * ```
 */
export function ContentSidebar({
  children,
  width = "medium",
  position = "left",
  className,
}: ContentSidebarProps) {
  const { sidebarOpen, closeSidebar, registerSidebar } = useContentContext();

  useEffect(() => {
    return registerSidebar();
  }, [registerSidebar]);

  return (
    <>
      {/* Desktop: static sidebar */}
      <aside
        className={cn(
          "hidden md:flex md:flex-col border-gray-200 dark:border-navy-700 bg-white dark:bg-navy-900 overflow-y-auto shrink-0",
          position === "left" ? "border-r" : "border-l order-last",
          SIDEBAR_WIDTH_CLASSES[width],
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
        width={width}
      >
        {children}
      </ContentSidebarDrawer>
    </>
  );
}
