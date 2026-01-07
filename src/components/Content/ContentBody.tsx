import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ContentBodyProps {
  children: ReactNode;
  className?: string;
}

/**
 * Flex container for sidebar + content pane layouts.
 * Use inside ContentArea when you need a sidebar alongside the main content.
 *
 * @example
 * ```tsx
 * <ContentArea>
 *   <ContentBody>
 *     <ContentSidebar>
 *       <Navigation />
 *     </ContentSidebar>
 *     <ContentPane>
 *       <YourContent />
 *     </ContentPane>
 *   </ContentBody>
 * </ContentArea>
 * ```
 */
export function ContentBody({ children, className }: ContentBodyProps) {
  return (
    <div className={cn("flex-1 flex min-h-0", className)}>{children}</div>
  );
}
