import { cn } from "../../utils/cn";
import { COLLAPSE_DURATION } from "./constants";
import { SidebarItemComponent } from "./SidebarItem";
import type { SidebarGroup } from "./types";

interface SidebarGroupComponentProps {
  group: SidebarGroup;
  collapsed: boolean;
  onItemClick?: () => void;
}

export function SidebarGroupComponent({
  group,
  collapsed,
  onItemClick,
}: SidebarGroupComponentProps) {
  return (
    <div className="mb-6">
      {group.label && (
        <div
          className={cn(
            "px-3 text-xs font-semibold text-navy-400 uppercase tracking-wider whitespace-nowrap transition-[opacity,margin]",
            COLLAPSE_DURATION,
            collapsed ? "opacity-0 mb-0" : "opacity-100 mb-2"
          )}
        >
          {group.label}
        </div>
      )}
      <div className="space-y-1 px-2">
        {group.items.map((item) => (
          <SidebarItemComponent
            key={item.id}
            item={item}
            collapsed={collapsed}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}
