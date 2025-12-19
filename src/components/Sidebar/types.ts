import type { ReactNode } from "react";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  badge?: string | number;
}

export interface SidebarGroup {
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  items?: SidebarItem[] | SidebarGroup[];
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  defaultCollapsed?: boolean;
  className?: string;
}

export interface SidebarContextValue {
  isOpen: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}
