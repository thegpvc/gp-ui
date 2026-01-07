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
