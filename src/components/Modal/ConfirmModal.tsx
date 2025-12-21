import * as React from "react";
import { Modal, ModalProps } from "./Modal";
import { Button } from "../Button";

export interface ConfirmModalProps extends Omit<ModalProps, "children"> {
  /**
   * Modal title
   */
  title: string;

  /**
   * Description content - can be a string or custom React node
   */
  description: React.ReactNode;

  /**
   * Text for the confirm button (default: "Confirm")
   */
  confirmText?: string;

  /**
   * Text for the cancel button (default: "Cancel")
   */
  cancelText?: string;

  /**
   * Callback when confirm button is clicked
   */
  onConfirm?: () => void;

  /**
   * Callback when cancel button is clicked
   */
  onCancel?: () => void;

  /**
   * Button variant for confirm button (default: "primary")
   * Use "destructive" for delete/remove actions
   */
  confirmVariant?: "primary" | "secondary" | "destructive";

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
   * Whether the confirm action is loading (shows spinner, disables buttons)
   */
  loading?: boolean;

  /**
   * Optional trigger element. Use with asChild prop.
   */
  trigger?: React.ReactNode;
}

/**
 * ConfirmModal is a modal for confirmations with a title, description, and confirm/cancel buttons.
 * Commonly used for delete confirmations and other destructive actions.
 *
 * @example
 * ```tsx
 * // Delete confirmation
 * const [open, setOpen] = useState(false);
 *
 * <ConfirmModal
 *   open={open}
 *   onOpenChange={setOpen}
 *   title="Delete Item"
 *   description="Are you sure you want to delete this item? This action cannot be undone."
 *   confirmText="Delete"
 *   confirmVariant="destructive"
 *   onConfirm={() => {
 *     handleDelete();
 *     setOpen(false);
 *   }}
 *   onCancel={() => setOpen(false)}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With trigger
 * <ConfirmModal
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 *   trigger={<Button>Proceed</Button>}
 *   onConfirm={handleConfirm}
 * />
 * ```
 *
 * @example
 * ```tsx
 * // With loading state
 * const [loading, setLoading] = useState(false);
 *
 * <ConfirmModal
 *   title="Save Changes"
 *   description="Do you want to save your changes?"
 *   confirmText="Save"
 *   loading={loading}
 *   onConfirm={async () => {
 *     setLoading(true);
 *     await saveChanges();
 *     setLoading(false);
 *     setOpen(false);
 *   }}
 * />
 * ```
 */
export function ConfirmModal({
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmVariant = "primary",
  size = "md",
  showClose = true,
  dismissOnOverlayClick = true,
  loading = false,
  trigger,
  ...props
}: ConfirmModalProps) {
  return (
    <Modal {...props}>
      {trigger && <Modal.Trigger asChild>{trigger}</Modal.Trigger>}
      <Modal.Content
        size={size}
        showClose={showClose}
        dismissOnOverlayClick={dismissOnOverlayClick && !loading}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {typeof description === "string" ? (
            <Modal.Description>{description}</Modal.Description>
          ) : (
            <div className="text-sm text-gray-600">{description}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Modal.Close asChild>
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelText}
            </Button>
          </Modal.Close>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
