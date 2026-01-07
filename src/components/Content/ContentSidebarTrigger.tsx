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
