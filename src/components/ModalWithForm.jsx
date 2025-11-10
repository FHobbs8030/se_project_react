import { useEffect } from "react";
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
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__container" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" aria-label="Close" onClick={onClose} />
        <div className="modal__card modal__card--form">
          <h2 className="modal__title">{title}</h2>
          <form className="modal__form" onSubmit={onSubmit} noValidate>
            {children}
            <button className="modal__submit" type="submit" disabled={submitDisabled}>
              {submitText}
            </button>
          </form>
        </div>
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
