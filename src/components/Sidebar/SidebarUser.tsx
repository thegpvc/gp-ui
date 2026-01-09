import { cn } from "../../utils/cn";
import { useSidebar } from "./SidebarContext";

export interface SidebarUserProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  onClick?: () => void;
  className?: string;
}

function getInitials(name: string): string {
  if (!name || !name.trim()) return "?";

  return name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function SidebarUser({
  name,
  email,
  avatarUrl,
  onClick,
  className,
}: SidebarUserProps) {
  const { isCollapsed } = useSidebar();
  const initials = getInitials(name);

  const avatar = avatarUrl ? (
    <img
      src={avatarUrl}
      alt={name}
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    <span className="text-navy-600 dark:text-navy-300 font-medium">{initials}</span>
  );

  // Same pattern as SidebarItemComponent - consistent padding, text fades out
  const content = (
    <div className="flex items-center gap-3 pl-2.5 pr-2 py-3">
      <div className="w-8 h-8 rounded-full bg-navy-100 dark:bg-navy-700 flex items-center justify-center text-sm flex-shrink-0 overflow-hidden">
        {avatar}
      </div>
      <div
        className={cn(
          "flex-1 min-w-0 text-left transition-opacity duration-300",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="text-sm font-medium text-navy-900 dark:text-navy-100 truncate whitespace-nowrap">
          {name}
        </div>
        {email && (
          <div className="text-xs text-navy-500 dark:text-navy-400 truncate whitespace-nowrap">
            {email}
          </div>
        )}
      </div>
    </div>
  );

  const wrapperClasses = cn(
    "w-full transition-colors",
    onClick && "cursor-pointer hover:bg-gray-100 dark:hover:bg-navy-800",
    className
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={wrapperClasses}
        title={isCollapsed ? name : undefined}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={wrapperClasses} title={isCollapsed ? name : undefined}>
      {content}
    </div>
  );
}
