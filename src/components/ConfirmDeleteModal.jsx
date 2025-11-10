import PropTypes from "prop-types";

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="modal confirm">
      <button
        className="modal__close"
        type="button"
        onClick={onClose}
        aria-label="Close"
      />
      <h2>Are you sure you want to delete this item?</h2>
      <p>This action is irreversible.</p>
      <button className="confirm__danger" type="button" onClick={onConfirm}>
        Yes, delete item
      </button>
      <button className="confirm__cancel" type="button" onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
