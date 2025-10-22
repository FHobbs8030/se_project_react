import { useEffect } from "react";
import PropTypes from "prop-types";
import "../blocks/Modal.css";

export default function ModalWithForm({
  isOpen,
  title,
  onClose,
  onSubmit,
  submitText,
  submitDisabled = false,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div className="modal" onClick={onClose} role="dialog" aria-modal="true">
      <form className="modal__card" onClick={stop} onSubmit={onSubmit}>
        <div className="modal__head">
          <h2 className="modal__title">{title}</h2>
          <button type="button" className="modal__close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__foot">
          <button className="modal__submit" type="submit" disabled={submitDisabled}>{submitText}</button>
        </div>
      </form>
    </div>
  );
}

ModalWithForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  submitDisabled: PropTypes.bool,
  children: PropTypes.node,
};
