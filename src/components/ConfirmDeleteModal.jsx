import { useEffect, useRef, useMemo } from "react";
import "../blocks/ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({ isOpen = true, onConfirm, onCancel, onClose, loading = false }) {
  const modalRef = useRef(null);
  const handleClose = useMemo(() => onCancel || onClose || (() => {}), [onCancel, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
  };

  return (
    <div className="confirm-modal" onClick={handleBackdropClick}>
      <div
        className="confirm-modal__box"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
      >
        <button
          type="button"
          className="confirm-modal__close-button"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="confirm-modal__content">
          <p id="confirm-title" className="confirm-modal__title">Are you sure you want to delete this item?</p>
          <p id="confirm-desc" className="confirm-modal__text">This action is irreversible.</p>

          <button
            className="confirm-modal__delete-button"
            type="button"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting…" : "Yes, delete item"}
          </button>

          <button
            className="confirm-modal__cancel-button"
            type="button"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
