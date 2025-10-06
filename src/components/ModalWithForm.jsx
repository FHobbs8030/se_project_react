import "../blocks/Modal.css";

export default function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitText = "Submit",
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
        {title ? <h2 className="modal__title">{title}</h2> : null}
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}
