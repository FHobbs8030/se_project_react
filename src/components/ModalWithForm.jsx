import PropTypes from "prop-types";
import Modal from "./Modal.jsx";
import "../blocks/ModalWithForm.css";

export default function ModalWithForm({
  isOpen,
  onClose,
  title,
  submitText,
  onSubmit,
  children,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h3 className="modal__title">{title}</h3>
      <form className="modal__form" onSubmit={onSubmit}>
        <div className="modal__fields">{children}</div>
        <div className="modal__buttons">
          <button className="modal__submit" type="submit">
            {submitText}
          </button>
          <button className="modal__cancel" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

ModalWithForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node,
};
