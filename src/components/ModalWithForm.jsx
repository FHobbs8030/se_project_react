import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import "../blocks/Modal.css";

export default function ModalWithForm({
  title,
  isOpen,
  onClose,
  onSubmit,
  submitText,
  submitDisabled,
  children,
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal modal_opened" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" aria-label="Close" onClick={onClose} />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit} noValidate>
          {children}
          <button className="modal__submit" type="submit" disabled={submitDisabled}>
            {submitText}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

ModalWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  submitDisabled: PropTypes.bool,
  children: PropTypes.node,
};
