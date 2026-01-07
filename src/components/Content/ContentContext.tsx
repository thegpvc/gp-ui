import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export interface ContentContextValue {
  hasSidebar: boolean;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  registerSidebar: () => () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function useContentContext() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useContentContext must be used within ContentProvider");
  }
  return context;
}

export function useContentSidebar() {
  const { sidebarOpen, toggleSidebar, closeSidebar } = useContentContext();
  return {
    open: sidebarOpen,
    toggle: toggleSidebar,
    close: closeSidebar,
  };
}

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCount, setSidebarCount] = useState(0);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const registerSidebar = useCallback(() => {
    setSidebarCount((c) => c + 1);
    return () => setSidebarCount((c) => c - 1);
  }, []);

  const value = useMemo<ContentContextValue>(
    () => ({
      hasSidebar: sidebarCount > 0,
      sidebarOpen,
      toggleSidebar,
      closeSidebar,
      registerSidebar,
    }),
    [sidebarCount, sidebarOpen, toggleSidebar, closeSidebar, registerSidebar]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}
