import { useState, useRef, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { cn } from "../../utils/cn";
import { useSidebar } from "./SidebarContext";
import { COLLAPSE_DURATION_MS } from "./constants";

export interface SidebarSearchProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  className?: string;
}

export function SidebarSearch({
  placeholder = "Search...",
  onSubmit,
  className,
}: SidebarSearchProps) {
  const { isCollapsed, setOpen } = useSidebar();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim()) {
      onSubmit?.(value.trim());
    }
  };

  const handleCollapsedClick = () => {
    // Expand sidebar and focus input
    setOpen(true);
    // Focus after sidebar expands
    setTimeout(() => inputRef.current?.focus(), COLLAPSE_DURATION_MS + 50);
  };

  // Collapsed mode - show clickable icon button
  if (isCollapsed) {
    return (
      <div className={cn("p-2", className)}>
        <button
          onClick={handleCollapsedClick}
          className="w-full h-9 flex items-center justify-center rounded-md border border-gray-200 dark:border-navy-700 text-navy-400 dark:text-navy-500 hover:text-navy-600 dark:hover:text-navy-300 hover:border-gray-300 dark:hover:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          title={placeholder}
          aria-label={placeholder}
        >
          <Search className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  // Expanded mode - show input field with icon inside
  return (
    <div className={cn("p-3", className)} role="search">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-400 dark:text-navy-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label={placeholder}
          className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 dark:border-navy-700 rounded-md bg-white dark:bg-navy-800 placeholder:text-navy-400 dark:placeholder:text-navy-500 text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
