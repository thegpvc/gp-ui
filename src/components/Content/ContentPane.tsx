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

/**
 * Main content container with optional max-width centering.
 * Use inside ContentArea or ContentBody for the primary content area.
 *
 * @example
 * ```tsx
 * // Centered content with max-width
 * <ContentPane maxWidth="medium">
 *   <Card>Your content here</Card>
 * </ContentPane>
 * ```
 *
 * @example
 * ```tsx
 * // Full-width dashboard canvas
 * <ContentPane fullWidth padding={false}>
 *   <DashboardGrid />
 * </ContentPane>
 * ```
 */
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
        "flex-1 overflow-y-auto bg-gray-50 dark:bg-navy-950",
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
