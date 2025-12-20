import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "../../utils";

// Provider with default delay of 0ms for instant tooltips
const TooltipProvider: React.FC<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>> = ({
  delayDuration = 0,
  ...props
}) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
);

// Re-export Root directly - no styling needed
const TooltipRoot = TooltipPrimitive.Root;

// Re-export Trigger directly - supports asChild for composition
const TooltipTrigger = TooltipPrimitive.Trigger;

// Styled Content with animations and default arrow
// Note: Portal is handled internally - do not wrap in Tooltip.Portal
const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 4, showArrow = true, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-navy-900 px-3 py-1.5 text-sm text-white shadow-md",
        "data-[state=delayed-open]:animate-tooltip-in data-[state=closed]:animate-tooltip-out",
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <TooltipPrimitive.Arrow className="fill-navy-900" />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "Tooltip.Content";

// Re-export Arrow for optional use
const TooltipArrow = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("fill-navy-900", className)}
    {...props}
  />
));
TooltipArrow.displayName = "Tooltip.Arrow";

/**
 * Tooltip component for displaying contextual information on hover.
 * Built on Radix UI primitives with compound component pattern.
 * Default delay is 0ms for instant tooltips. Arrow is shown by default.
 *
 * ACCESSIBILITY BEST PRACTICES:
 * - Keep tooltip text concise (1-2 short sentences max)
 * - Avoid interactive content (links, buttons) - use Popover instead
 * - Don't repeat visible label text - provide supplementary information only
 * - Tooltips disappear on hover out, so critical info should be always visible
 * - For keyboard users, tooltips show on focus and hide on blur/escape
 * - Screen readers will announce tooltip content automatically
 *
 * @example
 * ```tsx
 * // Basic tooltip (shows instantly with arrow)
 * <Tooltip.Provider>
 *   <Tooltip>
 *     <Tooltip.Trigger asChild>
 *       <Button>Hover me</Button>
 *     </Tooltip.Trigger>
 *     <Tooltip.Content>
 *       Helpful tooltip text
 *     </Tooltip.Content>
 *   </Tooltip>
 * </Tooltip.Provider>
 * ```
 *
 * @example
 * ```tsx
 * // Without arrow
 * <Tooltip.Provider>
 *   <Tooltip>
 *     <Tooltip.Trigger asChild>
 *       <button>Info</button>
 *     </Tooltip.Trigger>
 *     <Tooltip.Content showArrow={false}>
 *       More information here
 *     </Tooltip.Content>
 *   </Tooltip>
 * </Tooltip.Provider>
 * ```
 *
 * @example
 * ```tsx
 * // With custom delay (optional)
 * <Tooltip.Provider delayDuration={500}>
 *   <Tooltip>
 *     <Tooltip.Trigger>Delayed tooltip</Tooltip.Trigger>
 *     <Tooltip.Content>Shows after 500ms</Tooltip.Content>
 *   </Tooltip>
 * </Tooltip.Provider>
 * ```
 */
// Compound component export
// Note: Portal is not exported as Content handles portaling internally
export const Tooltip = Object.assign(TooltipRoot, {
  Provider: TooltipProvider,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
  Arrow: TooltipArrow,
});

// Type exports for consumers
export type TooltipProviderProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>;
export type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root>;
export type TooltipTriggerProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>;
export type TooltipContentProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  showArrow?: boolean;
};
export type TooltipArrowProps = React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>;
