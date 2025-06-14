import React from 'react';
import '../blocks/ConfirmDeleteModal.css';

function ConfirmDeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="confirm-modal" onClick={onCancel}>
      <div className="confirm-modal__box" onClick={(e) => e.stopPropagation()}>
        <button className="confirm-modal__close" onClick={onCancel}>
          &times;
        </button>
        <p className="confirm-modal__message">
          Are you sure you want to delete this item?<br />
          <span className="confirm-modal__subtext">This action is irreversible.</span>
        </p>
        <div className="confirm-modal__actions">
          <button className="confirm-modal__confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="confirm-modal__cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
