import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { ContentProvider } from "./ContentContext";

export interface ContentAreaProps {
  children: ReactNode;
  className?: string;
}

export function ContentArea({ children, className }: ContentAreaProps) {
  return (
    <ContentProvider>
      <div className={cn("flex-1 flex flex-col min-h-0 h-full", className)}>
        {children}
      </div>
    </ContentProvider>
  );
}
