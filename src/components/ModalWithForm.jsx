import PropTypes from "prop-types";

export default function ModalWithForm({
  isOpen,
  onClose,
  title,
  onSubmit,
  submitText,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onClose} />
      <div className="modal__content" role="dialog" aria-modal="true" aria-label={title}>
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close" />
        <form onSubmit={onSubmit}>
          {title ? <h2 className="modal__title">{title}</h2> : null}
          <div className="modal__body">{children}</div>
          {submitText ? (
            <button className="modal__submit" type="submit">
              {submitText}
            </button>
          ) : null}
          <button className="modal__cancel" type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  submitText: PropTypes.string,
  children: PropTypes.node,
};
