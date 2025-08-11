import React, { useEffect, useRef } from "react";
import "../blocks/ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onConfirm, onCancel, onClose }) {
  const modalRef = useRef(null);
  const handleClose = onCancel || onClose || (() => {});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  return (
    <div className="confirm-modal" onClick={handleBackdropClick}>
      <div className="confirm-modal__box" ref={modalRef} role="dialog" aria-modal="true">
        <button
          type="button"
          className="confirm-modal__close-button"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="confirm-modal__content">
          <p className="confirm-modal__title">Are you sure you want to delete this item?</p>
          <p className="confirm-modal__text">This action is irreversible.</p>
          <button className="confirm-modal__delete-button" type="button" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="confirm-modal__cancel-button" type="button" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
