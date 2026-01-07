import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { type ContentSidebarWidth, SIDEBAR_WIDTH_CLASSES } from "./types";

interface ContentSidebarDrawerProps {
  open: boolean;
  onClose: () => void;
  position: "left" | "right";
  width: ContentSidebarWidth;
  children: ReactNode;
}

export function ContentSidebarDrawer({
  open,
  onClose,
  position,
  width,
  children,
}: ContentSidebarDrawerProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Drawer panel */}
      <aside
        className={cn(
          "fixed top-0 z-40 h-[100dvh] bg-white flex flex-col md:hidden",
          "transition-transform duration-200",
          SIDEBAR_WIDTH_CLASSES[width],
          position === "left" ? "left-0 border-r" : "right-0 border-l",
          position === "left"
            ? open
              ? "translate-x-0"
              : "-translate-x-full"
            : open
              ? "translate-x-0"
              : "translate-x-full",
          "border-gray-200"
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={cn(
            "absolute top-3 p-1 text-navy-400 hover:text-navy-600 transition-colors",
            position === "left" ? "right-3" : "left-3"
          )}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pt-12">{children}</div>
      </aside>
    </>
  );
}
