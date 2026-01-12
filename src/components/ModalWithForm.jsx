import PropTypes from 'prop-types';

export default function ModalWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  onSubmit,
  submitText,
  isDisabled,
}) {
  if (!isOpen) return null;

  return (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close"
        />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={`modal__submit ${
              isDisabled ? 'modal__submit_disabled' : ''
            }`}
            disabled={isDisabled}
          >
            {submitText}
          </button>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};
