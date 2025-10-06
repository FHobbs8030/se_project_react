import PropTypes from "prop-types";
import "../blocks/Modal.css";

export default function ModalWithForm({
  isOpen,
  title,
  onClose,
  onSubmit,
  submitText = "Submit",   // <-- default parameter instead of defaultProps
  children,
}) {
  if (!isOpen) return null;

  const handleOverlay = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  return (
    <div className="modal" onMouseDown={handleOverlay}>
      <div
        className="modal__container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="modal__close"
          type="button"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 id="modal-title" className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          <button className="modal__submit" type="submit">{submitText}</button>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,     
  children: PropTypes.node,
};
