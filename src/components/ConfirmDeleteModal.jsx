import React from "react";
import "../blocks/ConfirmDeleteModal.css";

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="confirm-modal">
      <div className="confirm-modal__box">
        <button
          className="confirm-modal__close"
          aria-label="Close delete modal"
          onClick={onCancel}
        >
          &times;
        </button>
        <div className="confirm-modal__message-box">
          <p className="confirm-modal__question">Are you sure you want to delete this item?</p>
          <p className="confirm-modal__note">This action is irreversible.</p>
        </div>
        <div className="confirm-modal__actions">
          <button className="confirm-modal__delete-button" onClick={onConfirm}>
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
