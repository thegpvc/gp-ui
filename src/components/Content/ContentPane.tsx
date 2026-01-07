import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type ContentPaneMaxWidth = "narrow" | "medium" | "wide";

const MAX_WIDTH_CLASSES: Record<ContentPaneMaxWidth, string> = {
  narrow: "max-w-lg",
  medium: "max-w-3xl",
  wide: "max-w-5xl",
};

export interface ContentPaneProps {
  children: ReactNode;
  /** Center content with a max-width constraint */
  maxWidth?: ContentPaneMaxWidth;
  /** Remove max-width for dashboards/canvases */
  fullWidth?: boolean;
  /** Add padding (default: true) */
  padding?: boolean;
  className?: string;
}

export function ContentPane({
  children,
  maxWidth,
  fullWidth = false,
  padding = true,
  className,
}: ContentPaneProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto bg-gray-50",
        padding && "p-4 lg:p-6",
        className
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto w-full",
            MAX_WIDTH_CLASSES[maxWidth ?? "medium"]
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
