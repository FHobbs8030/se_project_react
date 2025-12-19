import PropTypes from 'prop-types';
import Modal from './Modal.jsx';
import '../blocks/ConfirmDeleteModal.css';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="confirm-modal">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close"
        />

        <h2 className="confirm-modal__title">
          Are you sure you want to delete this item?
        </h2>

        <p className="confirm-modal__text">This action is irreversible.</p>

        <button
          className="confirm-modal__danger"
          type="button"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>

        <button
          className="confirm-modal__cancel"
          type="button"
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
