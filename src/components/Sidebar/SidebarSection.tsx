import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useSidebar } from "./SidebarContext";
import { COLLAPSE_DURATION } from "./constants";

export interface SidebarSectionProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export function SidebarSection({
  label,
  children,
  className,
}: SidebarSectionProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className={cn("mb-6", className)}>
      {label && (
        <div
          className={cn(
            "px-3 text-xs font-semibold text-navy-400 dark:text-navy-500 uppercase tracking-wider whitespace-nowrap transition-[opacity,margin]",
            COLLAPSE_DURATION,
            isCollapsed ? "opacity-0 mb-0" : "opacity-100 mb-2"
          )}
        >
          {label}
        </div>
      )}
      <div className="space-y-1 px-2">
        {children}
      </div>
    </div>
  );
}
