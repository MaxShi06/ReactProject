import './style.css';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  isLoading = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  // Modal actions.
  const handleCancelClick = () => {
    onCancel();
  };

  const handleConfirmClick = () => {
    onConfirm();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
      <div className="confirm-modal__backdrop" onClick={handleCancelClick} />
      <div className="confirm-modal__content">
        <h3 id="confirm-modal-title" className="confirm-modal__title">
          {title}
        </h3>
        <p className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__actions">
          <button type="button" className="confirm-modal__button confirm-modal__button--secondary" onClick={handleCancelClick}>
            Cancel
          </button>
          <button type="button" className="confirm-modal__button confirm-modal__button--danger" onClick={handleConfirmClick} disabled={isLoading}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
