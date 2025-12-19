import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useSidebar } from "./SidebarContext";
import { COLLAPSE_DURATION } from "./constants";
import { SidebarGroupComponent } from "./SidebarGroup";
import type { SidebarItem, SidebarGroup, SidebarProps } from "./types";

// Helper to check if items are grouped
function isGrouped(
  items: SidebarItem[] | SidebarGroup[]
): items is SidebarGroup[] {
  return items.length > 0 && "items" in items[0];
}

// Helper to normalize items to groups
function normalizeToGroups(
  items: SidebarItem[] | SidebarGroup[]
): SidebarGroup[] {
  if (items.length === 0) return [];
  if (isGrouped(items)) {
    return items;
  }
  return [{ items: items as SidebarItem[] }];
}

export function Sidebar({ items, children, header, footer, className }: SidebarProps) {
  const { isOpen, isMobile, isCollapsed, toggle, setOpen } = useSidebar();

  const groups = items ? normalizeToGroups(items) : [];

  const handleItemClick = () => {
    // Close mobile sidebar when an item is clicked
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "flex flex-col bg-white border-r border-gray-200 overflow-hidden",
          // Desktop styles - sticky below header (48px), fills remaining viewport height
          "md:sticky md:top-12 md:h-[calc(100vh-48px)] md:transition-[width] md:shrink-0",
          `md:${COLLAPSE_DURATION}`,
          isCollapsed ? "md:w-[53px]" : "md:w-64",
          // Mobile styles - full height overlay (needs to cover header too)
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:w-64 max-md:transition-transform max-md:duration-200",
          isMobile && !isOpen && "max-md:-translate-x-full",
          className
        )}
      >
        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 p-1 text-navy-400 hover:text-navy-600 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header slot */}
        {header && (
          <div className="border-b border-gray-200">
            {header}
          </div>
        )}

        {/* Navigation content */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto pb-4 transition-[padding]",
            COLLAPSE_DURATION,
            isCollapsed ? "pt-0" : "pt-6"
          )}
        >
          {children ?? groups.map((group, idx) => (
            <SidebarGroupComponent
              key={group.label || idx}
              group={group}
              collapsed={isCollapsed}
              onItemClick={handleItemClick}
            />
          ))}
        </nav>

        {/* Footer slot */}
        {footer && (
          <div className="border-t border-gray-200">
            {footer}
          </div>
        )}

        {/* Desktop collapse toggle */}
        {!isMobile && (
          <button
            onClick={toggle}
            className="flex items-center justify-center h-10 border-t border-gray-200 text-navy-400 hover:text-navy-600 hover:bg-gray-50 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
      </aside>
    </>
  );
}
