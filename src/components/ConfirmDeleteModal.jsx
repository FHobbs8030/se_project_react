import React from "react";
import "../blocks/ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__box">
        <button
          className="confirm-modal__close"
          aria-label="Close modal"
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
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button className="confirm-modal__cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
