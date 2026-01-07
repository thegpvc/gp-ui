import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ContentBodyProps {
  children: ReactNode;
  className?: string;
}

export function ContentBody({ children, className }: ContentBodyProps) {
  return (
    <div className={cn("flex-1 flex min-h-0", className)}>{children}</div>
  );
}
