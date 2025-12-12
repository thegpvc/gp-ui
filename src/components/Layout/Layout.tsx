import type { ReactNode } from "react";
import { ArrowLeft, Menu, LogOut, ExternalLink } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const MAX_WIDTH_CLASSES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
} as const;

const GPLogo = () => (
  <svg
    width="24"
    height="12"
    viewBox="0 0 91 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-orange-500"
  >
    <path
      d="M76.6917 0.0014681L22.5792 0C10.024 0 0 9.85013 0 22C0 34.1499 10.024 44 22.5792 44H44.4738V16.5H19.3532V27.5H33.5258V33C33.5258 33 22.5792 33 22.5777 33C16.0148 33 11.1611 28.0749 11.1611 22C11.1611 15.9251 16.0148 11 22.5777 11C22.5792 11 76.9559 11 76.9588 11C78.6696 11 79.8666 12.1601 79.8666 13.75C79.8666 15.3384 78.6681 16.5 76.9588 16.5C76.9559 16.5 49.9464 16.5 49.9464 16.5L49.9478 44H60.8944V27.5H76.6814C84.818 27.5 91 21.3444 91 13.75C91 6.16 84.818 0.0014681 76.6917 0.0014681Z"
      fill="currentColor"
    />
  </svg>
);

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

export interface LayoutProps {
  children: ReactNode;
  user?: LayoutUser;
  title?: string;
  showBackButton?: boolean;
  headerRight?: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  banner?: LayoutBanner;
  searchBar?: ReactNode;
  isHomePage?: boolean;
  onNavigateHome?: () => void;
  menuItems?: LayoutMenuItem[];
  onLogout?: () => void;
}

export function Layout({
  children,
  user,
  title = "Breadcrumb",
  showBackButton = false,
  headerRight,
  maxWidth = "lg",
  banner,
  searchBar,
  isHomePage = false,
  onNavigateHome,
  menuItems = [],
  onLogout,
}: LayoutProps) {
  const hasMenu = user && (menuItems.length > 0 || onLogout);

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Header */}
      <header className="bg-navy-900 h-12 flex items-center px-4 lg:px-8 shadow-md">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center">
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
              <GPLogo />
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
                    className="min-w-[160px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50"
                    align="end"
                    sideOffset={8}
                  >
                    {/* User info header */}
                    {user && (
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-navy-900 truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-navy-500 truncate">
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
                            ? "text-red-600 hover:bg-red-50"
                            : "text-navy-700 hover:bg-gray-50"
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
                          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
                        )}
                        <DropdownMenu.Item
                          className="flex items-center gap-2 px-3 py-2 text-sm text-navy-700 hover:bg-gray-50 cursor-pointer outline-none"
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

      {/* Search bar */}
      {searchBar && (
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
          <div className={`${MAX_WIDTH_CLASSES[maxWidth]} mx-auto`}>
            {searchBar}
          </div>
        </div>
      )}

      <main>
        {children}
      </main>
    </div>
  );
}

export interface LayoutContainerProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function LayoutContainer({
  children,
  maxWidth = "lg",
}: LayoutContainerProps) {
  return (
    <div className={`${MAX_WIDTH_CLASSES[maxWidth]} mx-auto px-4 py-4`}>
      {children}
    </div>
  );
}
