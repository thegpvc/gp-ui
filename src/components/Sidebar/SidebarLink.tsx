import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useSidebar } from "./SidebarContext";
import { COLLAPSE_DURATION } from "./constants";

export interface SidebarLinkProps {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  badge?: string | number;
  className?: string;
}

export function SidebarLink({
  label,
  icon,
  href,
  onClick,
  isActive,
  badge,
  className,
}: SidebarLinkProps) {
  const { isCollapsed, isMobile, setOpen } = useSidebar();

  const handleClick = () => {
    onClick?.();
    // Close mobile sidebar when clicked
    if (isMobile) {
      setOpen(false);
    }
  };

  const baseClasses = cn(
    "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors w-full",
    "text-navy-600 hover:text-navy-900 hover:bg-gray-100",
    isActive && "bg-gray-100 text-navy-900",
    className
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0 w-5 h-5">{icon}</span>}
      <span
        className={cn(
          "flex-1 truncate text-left whitespace-nowrap transition-opacity",
          COLLAPSE_DURATION,
          isCollapsed ? "opacity-0" : "opacity-100"
        )}
      >
        {label}
      </span>
      {badge !== undefined && (
        <span
          className={cn(
            "flex-shrink-0 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center transition-opacity",
            COLLAPSE_DURATION,
            isCollapsed ? "opacity-0" : "opacity-100"
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
        title={isCollapsed ? label : undefined}
        onClick={() => isMobile && setOpen(false)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={baseClasses}
      title={isCollapsed ? label : undefined}
    >
      {content}
    </button>
  );
}
