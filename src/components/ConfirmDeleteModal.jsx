import React, { useEffect, useRef } from "react";
import "../blocks/ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onCancel();
    }
  };

  return (
    <div className="confirm-modal" onClick={handleBackdropClick}>
      <div className="confirm-modal__box" ref={modalRef}>
        <button
          type="button"
          className="confirm-modal__close-button"
          onClick={onCancel}
        >
          &times;
        </button>
        <h3 className="confirm-modal__title">
          Are you sure you want to delete this item?
        </h3>
        <p className="confirm-modal__text">This action is irreversible.</p>
        <div className="confirm-modal__buttons">
          <button
            className="confirm-modal__delete-button"
            type="button"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            className="confirm-modal__cancel-btn"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
