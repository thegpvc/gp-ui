import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { ContentProvider } from "./ContentContext";

export interface ContentAreaProps {
  children: ReactNode;
  className?: string;
}

/**
 * Container for content layouts with optional tabs and sidebars.
 * Must wrap all Content.* components. Provides context for responsive sidebar behavior.
 *
 * @example
 * ```tsx
 * // Tabs with centered content
 * <ContentArea>
 *   <ContentTabs tabs={tabs} activeId={id} onChange={setId} />
 *   <ContentPane maxWidth="medium">
 *     <YourContent />
 *   </ContentPane>
 * </ContentArea>
 * ```
 *
 * @example
 * ```tsx
 * // Sidebar with content
 * <ContentArea>
 *   <ContentBody>
 *     <ContentSidebar width="narrow">
 *       <Navigation />
 *     </ContentSidebar>
 *     <ContentPane>
 *       <YourContent />
 *     </ContentPane>
 *   </ContentBody>
 * </ContentArea>
 * ```
 */
export function ContentArea({ children, className }: ContentAreaProps) {
  return (
    <ContentProvider>
      <div className={cn("flex-1 flex flex-col min-h-0 h-full", className)}>
        {children}
      </div>
    </ContentProvider>
  );
}
