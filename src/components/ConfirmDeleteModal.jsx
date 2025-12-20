import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import '../blocks/ConfirmDeleteModal.css';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="confirm-modal">
        <button
          type="button"
          className="modal__close"
          aria-label="Close"
          onClick={onClose}
        />

        <h2 className="confirm-modal__title">
          Are you sure you want to delete this item?
        </h2>

        <p className="confirm-modal__text">This action is irreversible.</p>

        <button
          type="button"
          className="confirm-modal__danger"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          type="button"
          className="confirm-modal__cancel"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

ConfirmDeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
