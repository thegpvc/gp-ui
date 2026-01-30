import { useEffect } from "react";

/**
 * Hook to handle Escape key press events.
 * Only calls the handler when the condition is true.
 *
 * @param handler - Callback to invoke when Escape is pressed
 * @param enabled - Whether the listener should be active (default: true)
 *
 * @example
 * ```tsx
 * useEscapeKey(() => setOpen(false), isOpen);
 * ```
 */
export function useEscapeKey(handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handler();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [handler, enabled]);
}
