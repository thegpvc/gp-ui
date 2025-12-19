/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { SidebarContextValue } from "./types";

const MOBILE_BREAKPOINT = 768;

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  variant?: "responsive" | "inline";
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  variant = "responsive",
}: SidebarProviderProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [uncontrolledCollapsed, setUncontrolledCollapsed] =
    useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);
  const previousIsMobileRef = useRef(isMobile);

  const isCollapsed = controlledCollapsed ?? uncontrolledCollapsed;

  useEffect(() => {
    // Skip mobile detection for inline variant
    if (variant === "inline") {
      setIsMobile(false);
      return;
    }

    const checkMobile = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const wasLeavingMobile = previousIsMobileRef.current && !newIsMobile;
      previousIsMobileRef.current = newIsMobile;

      setIsMobile(newIsMobile);

      // Close mobile menu when transitioning to desktop
      if (wasLeavingMobile) {
        setMobileOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [variant]);

  const isOpen = isMobile ? mobileOpen : !isCollapsed;

  const toggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen((prev) => !prev);
    } else {
      const newCollapsed = !isCollapsed;
      setUncontrolledCollapsed(newCollapsed);
      onCollapsedChange?.(newCollapsed);
    }
  }, [isMobile, isCollapsed, onCollapsedChange]);

  const setOpen = useCallback(
    (open: boolean) => {
      if (isMobile) {
        setMobileOpen(open);
      } else {
        const newCollapsed = !open;
        setUncontrolledCollapsed(newCollapsed);
        onCollapsedChange?.(newCollapsed);
      }
    },
    [isMobile, onCollapsedChange]
  );

  const toggleCollapsed = useCallback(() => {
    if (!isMobile) {
      const newCollapsed = !isCollapsed;
      setUncontrolledCollapsed(newCollapsed);
      onCollapsedChange?.(newCollapsed);
    }
  }, [isMobile, isCollapsed, onCollapsedChange]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggle,
        setOpen,
        isMobile,
        isCollapsed: !isMobile && isCollapsed,
        toggleCollapsed,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
