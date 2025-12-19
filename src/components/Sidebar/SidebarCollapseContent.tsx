import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useSidebar } from "./SidebarContext";
import { COLLAPSE_DURATION } from "./constants";

/**
 * Content that fades out and gets clipped when sidebar collapses.
 * Use for text labels, descriptions, etc. that should disappear smoothly.
 */
export function SidebarCollapseContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { isCollapsed } = useSidebar();
  return (
    <span
      className={cn(
        "whitespace-nowrap transition-opacity",
        COLLAPSE_DURATION,
        isCollapsed ? "opacity-0" : "opacity-100",
        className
      )}
    >
      {children}
    </span>
  );
}
