import PropTypes from 'prop-types';
import Modal from './Modal.jsx';

export default function ModalWithForm({
  name,
  title,
  submitText,
  isOpen,
  onClose,
  onSubmit,
  isDisabled,
  children,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form
        className={`modal__form modal__form--${name}`}
        name={name}
        onSubmit={onSubmit}
        noValidate
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        />

        <h2 className="modal__title">{title}</h2>

        {children}

        <button type="submit" className="modal__submit" disabled={isDisabled}>
          {submitText}
        </button>
      </form>
    </Modal>
  );
}

ModalWithForm.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
