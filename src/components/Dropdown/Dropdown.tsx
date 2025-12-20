import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Check, Circle } from "lucide-react";
import { cn } from "../../utils";

// Re-export Root directly - no styling needed
const DropdownRoot = DropdownMenuPrimitive.Root;

// Re-export Trigger directly - supports asChild for composition with Tooltip
const DropdownTrigger = DropdownMenuPrimitive.Trigger;

// Re-export Portal directly
const DropdownPortal = DropdownMenuPrimitive.Portal;

// Re-export Group directly
const DropdownGroup = DropdownMenuPrimitive.Group;

// Re-export Sub directly
const DropdownSub = DropdownMenuPrimitive.Sub;

// Re-export RadioGroup directly
const DropdownRadioGroup = DropdownMenuPrimitive.RadioGroup;

// Styled Content with animations
const DropdownContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md",
        "data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
DropdownContent.displayName = "Dropdown.Content";

// Styled SubContent
const DropdownSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md",
      "data-[state=open]:animate-dropdown-in data-[state=closed]:animate-dropdown-out",
      className
    )}
    {...props}
  />
));
DropdownSubContent.displayName = "Dropdown.SubContent";

// Styled SubTrigger
const DropdownSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "focus:bg-gray-100 data-[state=open]:bg-gray-100",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" aria-hidden="true" />
  </DropdownMenuPrimitive.SubTrigger>
));
DropdownSubTrigger.displayName = "Dropdown.SubTrigger";

// Styled Item
const DropdownItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "danger";
  }
>(({ className, inset, variant = "default", ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
      "focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      variant === "danger" && "text-red-600 focus:bg-red-50 focus:text-red-600",
      variant === "default" && "text-navy-700",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownItem.displayName = "Dropdown.Item";

// Styled CheckboxItem
const DropdownCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-navy-700 outline-none transition-colors",
      "focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" aria-hidden="true" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
DropdownCheckboxItem.displayName = "Dropdown.CheckboxItem";

// Styled RadioItem
const DropdownRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-navy-700 outline-none transition-colors",
      "focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
DropdownRadioItem.displayName = "Dropdown.RadioItem";

// Styled Label
const DropdownLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-navy-900",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
DropdownLabel.displayName = "Dropdown.Label";

// Styled Separator
const DropdownSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
    {...props}
  />
));
DropdownSeparator.displayName = "Dropdown.Separator";

// Shortcut helper component (not from Radix, but commonly used)
const DropdownShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-gray-400", className)}
      {...props}
    />
  );
};
DropdownShortcut.displayName = "Dropdown.Shortcut";

/**
 * Dropdown menu component with support for sub-menus, checkbox items, and radio items.
 * Built on Radix UI primitives with compound component pattern.
 *
 * @example
 * ```tsx
 * // Basic dropdown
 * <Dropdown>
 *   <Dropdown.Trigger asChild>
 *     <Button>Open Menu</Button>
 *   </Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Item>Profile</Dropdown.Item>
 *     <Dropdown.Item>Settings</Dropdown.Item>
 *     <Dropdown.Separator />
 *     <Dropdown.Item variant="danger">Logout</Dropdown.Item>
 *   </Dropdown.Content>
 * </Dropdown>
 * ```
 *
 * @example
 * ```tsx
 * // With sub-menu
 * <Dropdown>
 *   <Dropdown.Trigger>More Options</Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Sub>
 *       <Dropdown.SubTrigger>Labels</Dropdown.SubTrigger>
 *       <Dropdown.SubContent>
 *         <Dropdown.Item>Bug</Dropdown.Item>
 *         <Dropdown.Item>Feature</Dropdown.Item>
 *       </Dropdown.SubContent>
 *     </Dropdown.Sub>
 *   </Dropdown.Content>
 * </Dropdown>
 * ```
 *
 * @example
 * ```tsx
 * // With checkbox and radio items
 * <Dropdown>
 *   <Dropdown.Trigger>Preferences</Dropdown.Trigger>
 *   <Dropdown.Content>
 *     <Dropdown.Label>View Options</Dropdown.Label>
 *     <Dropdown.CheckboxItem checked={showGrid}>
 *       Show Grid
 *     </Dropdown.CheckboxItem>
 *     <Dropdown.Separator />
 *     <Dropdown.Label>Theme</Dropdown.Label>
 *     <Dropdown.RadioGroup value={theme}>
 *       <Dropdown.RadioItem value="light">Light</Dropdown.RadioItem>
 *       <Dropdown.RadioItem value="dark">Dark</Dropdown.RadioItem>
 *     </Dropdown.RadioGroup>
 *   </Dropdown.Content>
 * </Dropdown>
 * ```
 */
// Compound component export
export const Dropdown = Object.assign(DropdownRoot, {
  Trigger: DropdownTrigger,
  Portal: DropdownPortal,
  Content: DropdownContent,
  Group: DropdownGroup,
  Item: DropdownItem,
  CheckboxItem: DropdownCheckboxItem,
  RadioItem: DropdownRadioItem,
  RadioGroup: DropdownRadioGroup,
  Label: DropdownLabel,
  Separator: DropdownSeparator,
  Shortcut: DropdownShortcut,
  Sub: DropdownSub,
  SubTrigger: DropdownSubTrigger,
  SubContent: DropdownSubContent,
});

// Type exports for consumers
export type DropdownProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root>;
export type DropdownTriggerProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>;
export type DropdownContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>;
export type DropdownItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "danger";
};
export type DropdownCheckboxItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>;
export type DropdownRadioItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>;
export type DropdownLabelProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
};
export type DropdownSeparatorProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>;
export type DropdownSubTriggerProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
};
export type DropdownSubContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>;
