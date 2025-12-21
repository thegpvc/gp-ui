import * as React from "react";
import { Modal, ModalProps } from "./Modal";
import { Button } from "../Button";

export interface AlertModalProps extends Omit<ModalProps, "children"> {
  /**
   * Modal title
   */
  title: string;

  /**
   * Description content - can be a string or custom React node
   */
  description: React.ReactNode;

  /**
   * Text for the OK button (default: "OK")
   */
  okText?: string;

  /**
   * Callback when OK button is clicked
   */
  onOk?: () => void;

  /**
   * Modal size (default: "md")
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";

  /**
   * Whether to show the close X button (default: true)
   */
  showClose?: boolean;

  /**
   * Whether clicking the overlay dismisses the modal (default: true)
   */
  dismissOnOverlayClick?: boolean;

  /**
   * Optional trigger element. Use with asChild prop.
   */
  trigger?: React.ReactNode;
}

/**
 * AlertModal is a simple modal for showing alerts with a title, description, and OK button.
 *
 * @example
 * ```tsx
 * // Controlled modal
 * const [open, setOpen] = useState(false);
 *
 * <AlertModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Success!"
 *   description="Your changes have been saved."
 *   onOk={() => {
 *     console.log('OK clicked');
 *     setOpen(false);
 *   }}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With trigger
 * <AlertModal
 *   title="Information"
 *   description="This is an important message."
 *   trigger={<Button>Show Alert</Button>}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With custom description content
 * <AlertModal
 *   title="Welcome"
 *   description={
 *     <div>
 *       <p>Welcome to the app!</p>
 *       <ul>
 *         <li>Feature 1</li>
 *         <li>Feature 2</li>
 *       </ul>
 *     </div>
 *   }
 *   okText="Get Started"
 *   onOk={handleStart}
 * />
 * ```
 */
export function AlertModal({
  title,
  description,
  okText = "OK",
  onOk,
  size = "md",
  showClose = true,
  dismissOnOverlayClick = true,
  trigger,
  ...props
}: AlertModalProps) {
  return (
    <Modal {...props}>
      {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}
      <Modal.Content
        size={size}
        showClose={showClose}
        dismissOnOverlayClick={dismissOnOverlayClick}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {typeof description === "string" ? (
            <Modal.Description>{description}</Modal.Description>
          ) : (
            <div className="text-sm text-navy-600">{description}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button variant="primary" onClick={onOk}>
              {okText}
            </Button>
          </Modal.Close>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
