import { cn } from "../../utils/cn";
import { TabBar, type TabBarItem } from "../TabBar";
import { useContentContext } from "./ContentContext";
import { ContentSidebarTrigger } from "./ContentSidebarTrigger";

export interface ContentTabsProps {
  tabs: TabBarItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** Make tabs sticky (default: true) */
  sticky?: boolean;
  className?: string;
}

/**
 * Tab bar for content area navigation. Renders sticky by default.
 * When a ContentSidebar is present, automatically shows a mobile menu trigger.
 *
 * @example
 * ```tsx
 * <ContentArea>
 *   <ContentTabs
 *     tabs={[
 *       { id: 'overview', label: 'Overview' },
 *       { id: 'settings', label: 'Settings' },
 *     ]}
 *     activeId={activeTab}
 *     onChange={setActiveTab}
 *   />
 *   <ContentPane>
 *     <YourContent />
 *   </ContentPane>
 * </ContentArea>
 * ```
 */
export function ContentTabs({
  tabs,
  activeId,
  onChange,
  sticky = true,
  className,
}: ContentTabsProps) {
  const { hasSidebar } = useContentContext();

  return (
    <div
      className={cn(
        "bg-orange-50 border-b border-gray-200 px-4 lg:px-6 flex items-center",
        sticky && "sticky top-0 z-10",
        className
      )}
    >
      {hasSidebar && <ContentSidebarTrigger className="mr-2 md:hidden" />}
      <TabBar items={tabs} activeId={activeId} onChange={onChange} />
    </div>
  );
}
