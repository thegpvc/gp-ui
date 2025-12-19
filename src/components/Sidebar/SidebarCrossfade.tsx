import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useSidebar } from "./SidebarContext";
import { COLLAPSE_DURATION } from "./constants";

/**
 * Content that crossfades between expanded and collapsed states.
 * Both children are rendered in a CSS grid so they overlap.
 * The visible one controls the container size.
 */
export function SidebarCrossfade({
  expanded,
  collapsed,
  className,
}: {
  expanded: ReactNode;
  collapsed: ReactNode;
  className?: string;
}) {
  const { isCollapsed } = useSidebar();
  return (
    <div className={cn("grid overflow-hidden", className)}>
      {/* Both children occupy the same grid cell */}
      <div
        className={cn(
          "col-start-1 row-start-1 transition-opacity",
          COLLAPSE_DURATION,
          isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        {expanded}
      </div>
      <div
        className={cn(
          "col-start-1 row-start-1 transition-opacity",
          COLLAPSE_DURATION,
          isCollapsed ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {collapsed}
      </div>
    </div>
  );
}
