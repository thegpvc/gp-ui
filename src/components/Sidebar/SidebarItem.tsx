import { cn } from "../../utils/cn";
import { COLLAPSE_DURATION } from "./constants";
import type { SidebarItem } from "./types";

interface SidebarItemComponentProps {
  item: SidebarItem;
  collapsed: boolean;
  onItemClick?: () => void;
}

export function SidebarItemComponent({
  item,
  collapsed,
  onItemClick,
}: SidebarItemComponentProps) {
  const { label, icon, href, onClick, isActive, badge } = item;

  const handleClick = () => {
    onClick?.();
    onItemClick?.();
  };

  // Keep consistent padding so icon stays in same X position
  const baseClasses = cn(
    "flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-colors w-full",
    "text-navy-300 hover:text-white hover:bg-navy-700",
    isActive && "bg-orange-500/[0.14] text-orange-300 hover:text-orange-300"
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0 w-5 h-5">{icon}</span>}
      <span
        className={cn(
          "flex-1 truncate text-left whitespace-nowrap transition-opacity",
          COLLAPSE_DURATION,
          collapsed ? "opacity-0" : "opacity-100"
        )}
      >
        {label}
      </span>
      {badge !== undefined && (
        <span
          className={cn(
            "flex-shrink-0 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center transition-opacity",
            COLLAPSE_DURATION,
            collapsed ? "opacity-0" : "opacity-100"
          )}
        >
          {badge}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        title={collapsed ? label : undefined}
        onClick={onItemClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={baseClasses}
      title={collapsed ? label : undefined}
    >
      {content}
    </button>
  );
}
