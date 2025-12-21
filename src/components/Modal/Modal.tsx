import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../utils";

// Re-export Root directly
const ModalRoot = DialogPrimitive.Root;

// Re-export Trigger directly - supports asChild
const ModalTrigger = DialogPrimitive.Trigger;

// Re-export Portal directly
const ModalPortal = DialogPrimitive.Portal;

// Re-export Close directly
const ModalClose = DialogPrimitive.Close;

// Styled Overlay
const ModalOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
      "data-[state=open]:animate-modal-overlay-in data-[state=closed]:animate-modal-overlay-out",
      className
    )}
    {...props}
  />
));
ModalOverlay.displayName = "Modal.Overlay";

// Styled Content
const ModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: "sm" | "md" | "lg" | "xl" | "full";
    showClose?: boolean;
    dismissOnOverlayClick?: boolean;
  }
>(
  (
    {
      className,
      children,
      size = "md",
      showClose = true,
      dismissOnOverlayClick = true,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-7xl w-[calc(100vw-4rem)] h-[calc(100vh-4rem)]",
    };

    return (
      <ModalPortal>
        <ModalOverlay />
        <DialogPrimitive.Content
          ref={ref}
          onPointerDownOutside={(e) => {
            if (!dismissOnOverlayClick) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (!dismissOnOverlayClick) {
              e.preventDefault();
            }
          }}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2",
            "bg-white rounded-lg shadow-lg overflow-hidden",
            "data-[state=open]:animate-modal-content-in data-[state=closed]:animate-modal-content-out",
            size === "full" ? "p-0" : "p-6",
            sizeClasses[size],
            className
          )}
          {...props}
        >
          {children}
          {showClose && (
            <DialogPrimitive.Close className={cn(
              "absolute right-4 top-4 rounded-sm transition-opacity hover:opacity-100",
              "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2",
              "disabled:pointer-events-none",
              size === "full"
                ? "bg-white/10 backdrop-blur-sm p-1.5 text-white opacity-90 hover:bg-white/20"
                : "opacity-70 ring-offset-white"
            )}>
              <X className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </ModalPortal>
    );
  }
);
ModalContent.displayName = "Modal.Content";

// Styled Header
const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
ModalHeader.displayName = "Modal.Header";

// Styled Footer
const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
ModalFooter.displayName = "Modal.Footer";

// Styled Title
const ModalTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-xl font-semibold text-navy-900", className)}
    {...props}
  />
));
ModalTitle.displayName = "Modal.Title";

// Styled Description
const ModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
));
ModalDescription.displayName = "Modal.Description";

// Styled Body (custom component for content area)
const ModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("py-4", className)} {...props} />
);
ModalBody.displayName = "Modal.Body";

/**
 * Modal component built on Radix UI Dialog primitives with compound component pattern.
 * Supports trigger-based or controlled state, with optional overlay dismiss and multiple sizes.
 *
 * @example
 * ```tsx
 * // Basic modal with trigger
 * <Modal>
 *   <Modal.Trigger asChild>
 *     <Button>Open Modal</Button>
 *   </Modal.Trigger>
 *   <Modal.Content>
 *     <Modal.Header>
 *       <Modal.Title>Modal Title</Modal.Title>
 *       <Modal.Description>Modal description</Modal.Description>
 *     </Modal.Header>
 *     <Modal.Body>
 *       <p>Modal content goes here.</p>
 *     </Modal.Body>
 *     <Modal.Footer>
 *       <Modal.Close asChild>
 *         <Button variant="secondary">Cancel</Button>
 *       </Modal.Close>
 *       <Button>Confirm</Button>
 *     </Modal.Footer>
 *   </Modal.Content>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Controlled modal
 * const [open, setOpen] = useState(false);
 *
 * <Modal open={open} onOpenChange={setOpen}>
 *   <Modal.Content size="lg">
 *     <Modal.Header>
 *       <Modal.Title>Large Modal</Modal.Title>
 *     </Modal.Header>
 *     <Modal.Body>
 *       <p>Content here</p>
 *     </Modal.Body>
 *   </Modal.Content>
 * </Modal>
 * ```
 *
 * @example
 * ```tsx
 * // Modal without overlay dismiss
 * <Modal>
 *   <Modal.Trigger asChild>
 *     <Button>Open</Button>
 *   </Modal.Trigger>
 *   <Modal.Content dismissOnOverlayClick={false}>
 *     <Modal.Header>
 *       <Modal.Title>Important</Modal.Title>
 *     </Modal.Header>
 *     <Modal.Body>
 *       <p>You must make a choice.</p>
 *     </Modal.Body>
 *   </Modal.Content>
 * </Modal>
 * ```
 */
export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Portal: ModalPortal,
  Overlay: ModalOverlay,
  Content: ModalContent,
  Header: ModalHeader,
  Footer: ModalFooter,
  Title: ModalTitle,
  Description: ModalDescription,
  Body: ModalBody,
  Close: ModalClose,
});

// Type exports for consumers
export type ModalProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;
export type ModalTriggerProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>;
export type ModalContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showClose?: boolean;
  dismissOnOverlayClick?: boolean;
};
export type ModalHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type ModalFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type ModalTitleProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;
export type ModalDescriptionProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;
export type ModalBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type ModalCloseProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>;
