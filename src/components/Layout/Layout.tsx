import type { ReactNode } from "react";
import { ArrowLeft, Menu, LogOut, ExternalLink } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { GPLogo } from "../Logo";
import { Sidebar } from "../Sidebar/Sidebar";
import { SidebarProvider, useSidebar } from "../Sidebar/SidebarContext";
import type { SidebarItem, SidebarGroup } from "../Sidebar/types";
import { cn } from "../../utils/cn";

export type MaxWidthSize = "narrow" | "medium" | "wide";

const MAX_WIDTH_CLASSES: Record<MaxWidthSize, string> = {
  narrow: "max-w-lg",
  medium: "max-w-3xl",
  wide: "max-w-5xl",
};

export interface LayoutUser {
  name?: string;
  email?: string;
}

export interface LayoutBanner {
  message: string;
  link?: {
    text: string;
    url: string;
  };
}

export interface LayoutMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: "default" | "danger";
}

export interface LayoutSidebar {
  items: SidebarItem[] | SidebarGroup[];
  header?: ReactNode;
  footer?: ReactNode;
  defaultCollapsed?: boolean;
  variant?: "responsive" | "inline";
}

export interface LayoutProps {
  children: ReactNode;
  user?: LayoutUser;
  title?: string;
  showBackButton?: boolean;
  headerRight?: ReactNode;
  maxWidth?: MaxWidthSize;
  banner?: LayoutBanner;
  searchBar?: ReactNode;
  isHomePage?: boolean;
  onNavigateHome?: () => void;
  menuItems?: LayoutMenuItem[];
  onLogout?: () => void;
  sidebar?: LayoutSidebar;
}

// Mobile sidebar toggle button - uses sidebar context
function SidebarMobileToggle() {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="md:hidden p-1.5 text-navy-300 hover:text-white hover:bg-navy-800 rounded transition-colors mr-2"
      aria-label="Toggle navigation"
    >
      <Menu className="w-5 h-5" />
    </button>
  );
}

// Header component extracted for reuse
interface HeaderProps {
  title?: string;
  showBackButton: boolean;
  isHomePage: boolean;
  onNavigateHome?: () => void;
  headerRight?: ReactNode;
  user?: LayoutUser;
  menuItems: LayoutMenuItem[];
  onLogout?: () => void;
  hasSidebar: boolean;
}

function Header({
  title,
  showBackButton,
  isHomePage,
  onNavigateHome,
  headerRight,
  user,
  menuItems,
  onLogout,
  hasSidebar,
}: HeaderProps) {
  const hasMenu = user && (menuItems.length > 0 || onLogout);

  return (
    <header className="bg-navy-900 h-12 flex items-center px-4 lg:px-8 shadow-md sticky top-0 z-20">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          {hasSidebar && <SidebarMobileToggle />}
          {showBackButton && onNavigateHome && (
            <button
              onClick={onNavigateHome}
              className="text-navy-300 hover:text-white transition-colors p-1 mr-1 animate-arrow-in"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div
            className={`flex items-center gap-1.5 ${!showBackButton && isHomePage ? "" : "cursor-pointer"}`}
            onClick={() => !isHomePage && onNavigateHome?.()}
          >
            <GPLogo size="sm" />
            <span className="text-white font-semibold text-sm tracking-tight">
              {title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
          {hasMenu && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-1.5 text-navy-300 hover:text-white hover:bg-navy-800 rounded transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[160px] bg-white dark:bg-navy-800 rounded-md shadow-lg border border-gray-200 dark:border-navy-700 py-1 z-50"
                  align="end"
                  sideOffset={8}
                >
                  {/* User info header */}
                  {user && (
                    <div className="px-3 py-2 border-b border-gray-100 dark:border-navy-700">
                      <p className="text-sm font-medium text-navy-900 dark:text-navy-100 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-navy-500 dark:text-navy-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  )}

                  {/* Custom menu items */}
                  {menuItems.map((item, index) => (
                    <DropdownMenu.Item
                      key={index}
                      className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer outline-none ${
                        item.variant === "danger"
                          ? "text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                          : "text-navy-700 dark:text-navy-200 hover:bg-gray-50 dark:hover:bg-navy-700"
                      }`}
                      onSelect={item.onClick}
                    >
                      {item.icon}
                      {item.label}
                    </DropdownMenu.Item>
                  ))}

                  {/* Sign out */}
                  {onLogout && (
                    <>
                      {menuItems.length > 0 && (
                        <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-navy-700 my-1" />
                      )}
                      <DropdownMenu.Item
                        className="flex items-center gap-2 px-3 py-2 text-sm text-navy-700 dark:text-navy-200 hover:bg-gray-50 dark:hover:bg-navy-700 cursor-pointer outline-none"
                        onSelect={onLogout}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </DropdownMenu.Item>
                    </>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          )}
        </div>
      </div>
    </header>
  );
}

// Layout content - the actual page structure
interface LayoutContentProps {
  children: ReactNode;
  title?: string;
  showBackButton: boolean;
  isHomePage: boolean;
  onNavigateHome?: () => void;
  headerRight?: ReactNode;
  user?: LayoutUser;
  menuItems: LayoutMenuItem[];
  onLogout?: () => void;
  maxWidth: MaxWidthSize;
  banner?: LayoutBanner;
  searchBar?: ReactNode;
  sidebar?: LayoutSidebar;
}

function LayoutContent({
  children,
  title,
  showBackButton,
  isHomePage,
  onNavigateHome,
  headerRight,
  user,
  menuItems,
  onLogout,
  maxWidth,
  banner,
  searchBar,
  sidebar,
}: LayoutContentProps) {
  const hasSidebar = !!sidebar;

  if (hasSidebar) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-950 flex flex-col">
        {/* Banner */}
        {banner && (
          <div className="bg-orange-500 text-white text-center py-1.5 text-xs font-medium flex items-center justify-center gap-2">
            <span>{banner.message}</span>
            {banner.link && (
              <a
                href={banner.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 underline hover:text-orange-100 transition-colors"
              >
                {banner.link.text}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        <Header
          title={title}
          showBackButton={showBackButton}
          isHomePage={isHomePage}
          onNavigateHome={onNavigateHome}
          headerRight={headerRight}
          user={user}
          menuItems={menuItems}
          onLogout={onLogout}
          hasSidebar={hasSidebar}
        />

        {/* Content area with sidebar */}
        <div className="flex-1 flex">
          <Sidebar
            items={sidebar.items}
            header={sidebar.header}
            footer={sidebar.footer}
            variant={sidebar.variant}
          />
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Search bar */}
            {searchBar && (
              <div className="sticky top-0 z-10 bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-800 px-4 py-3">
                <div className={cn(MAX_WIDTH_CLASSES[maxWidth], "mx-auto")}>
                  {searchBar}
                </div>
              </div>
            )}

            <main className="flex-1 flex flex-col min-h-0">{children}</main>
          </div>
        </div>
      </div>
    );
  }

  // Original layout without sidebar
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-950">
      {/* Banner */}
      {banner && (
        <div className="bg-orange-500 text-white text-center py-1.5 text-xs font-medium flex items-center justify-center gap-2">
          <span>{banner.message}</span>
          {banner.link && (
            <a
              href={banner.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 underline hover:text-orange-100 transition-colors"
            >
              {banner.link.text}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      <Header
        title={title}
        showBackButton={showBackButton}
        isHomePage={isHomePage}
        onNavigateHome={onNavigateHome}
        headerRight={headerRight}
        user={user}
        menuItems={menuItems}
        onLogout={onLogout}
        hasSidebar={false}
      />

      {/* Search bar */}
      {searchBar && (
        <div className="sticky top-0 z-10 bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-800 px-4 py-3">
          <div className={cn(MAX_WIDTH_CLASSES[maxWidth], "mx-auto")}>
            {searchBar}
          </div>
        </div>
      )}

      <main>{children}</main>
    </div>
  );
}

export function Layout({
  children,
  user,
  title,
  showBackButton = false,
  headerRight,
  maxWidth = "narrow",
  banner,
  searchBar,
  isHomePage = false,
  onNavigateHome,
  menuItems = [],
  onLogout,
  sidebar,
}: LayoutProps) {
  // If sidebar is provided, wrap everything in SidebarProvider
  if (sidebar) {
    return (
      <SidebarProvider
        defaultCollapsed={sidebar.defaultCollapsed}
        variant={sidebar.variant}
      >
        <LayoutContent
          title={title}
          showBackButton={showBackButton}
          isHomePage={isHomePage}
          onNavigateHome={onNavigateHome}
          headerRight={headerRight}
          user={user}
          menuItems={menuItems}
          onLogout={onLogout}
          maxWidth={maxWidth}
          banner={banner}
          searchBar={searchBar}
          sidebar={sidebar}
        >
          {children}
        </LayoutContent>
      </SidebarProvider>
    );
  }

  return (
    <LayoutContent
      title={title}
      showBackButton={showBackButton}
      isHomePage={isHomePage}
      onNavigateHome={onNavigateHome}
      headerRight={headerRight}
      user={user}
      menuItems={menuItems}
      onLogout={onLogout}
      maxWidth={maxWidth}
      banner={banner}
      searchBar={searchBar}
    >
      {children}
    </LayoutContent>
  );
}

export interface LayoutContainerProps {
  children: ReactNode;
  maxWidth?: MaxWidthSize;
}

export function LayoutContainer({
  children,
  maxWidth = "narrow",
}: LayoutContainerProps) {
  return (
    <div className={cn(MAX_WIDTH_CLASSES[maxWidth], "mx-auto px-4 py-4")}>
      {children}
    </div>
  );
}
