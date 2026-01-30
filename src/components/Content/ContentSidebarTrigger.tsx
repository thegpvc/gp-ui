import { Menu } from "lucide-react";
import { cn } from "../../utils/cn";
import { useContentContext } from "./ContentContext";

export interface ContentSidebarTriggerProps {
  className?: string;
}

/**
 * Button to toggle the mobile sidebar drawer.
 * Automatically included in ContentTabs when a sidebar is present.
 * Can also be used standalone for custom header layouts.
 *
 * @example
 * ```tsx
 * // Custom header with sidebar trigger
 * <header className="flex items-center p-4">
 *   <ContentSidebarTrigger className="md:hidden" />
 *   <h1>Page Title</h1>
 * </header>
 * ```
 */
export function ContentSidebarTrigger({
  className,
}: ContentSidebarTriggerProps) {
  const { toggleSidebar } = useContentContext();

  return (
    <button
      onClick={toggleSidebar}
      className={cn(
        "p-1.5 text-navy-600 hover:text-navy-900 hover:bg-white/50 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
        className
      )}
      aria-label="Toggle sidebar"
    >
      <Menu className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
