import React from 'react';
import useEscapeKey from '../hooks/useEscapeKey';
import '../blocks/ModalWithForm.css';

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  isOpen,
  children,
  isSubmitDisabled,
  errors = {},
}) {
  useEscapeKey(onClose);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal')) onClose();
  };

  return (
    <div
      className={`modal ${isOpen ? 'modal_opened' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <button className="modal__close" type="button" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
          {React.Children.map(children, (child) => {
            if (
              child &&
              child.props &&
              child.props.name &&
              Object.prototype.hasOwnProperty.call(errors, child.props.name)
            ) {
              return (
                <div className="modal__input-group">
                  {child}
                  <p
                    className={`modal__error ${
                      errors[child.props.name] ? '' : 'modal__error_hidden'
                    }`}
                  >
                    {errors[child.props.name] || ''}
                  </p>
                </div>
              );
            }
            return child;
          })}

          <button
            type="submit"
            className={`modal__submit-button ${
              isSubmitDisabled ? 'modal__submit-button_disabled' : ''
            }`}
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
