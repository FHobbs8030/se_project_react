import { useEffect } from 'react';
import Modal from './Modal.jsx';
import '../blocks/ConfirmDeleteModal.css';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="confirm">
      <button
        type="button"
        className="confirm-delete__close"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="confirm-delete">
        <h2 className="confirm-delete__title">
          Are you sure you want to delete this item?
        </h2>

        <p className="confirm-delete__subtitle">This action is irreversible.</p>

        <button
          type="button"
          className="confirm-delete__confirm"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          type="button"
          className="confirm-delete__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
