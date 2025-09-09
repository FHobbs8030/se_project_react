import { Modal } from "./Modal";
import "../blocks/ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  onClose,
  onSubmit,
  isOpen,
  children,
  isSubmitDisabled,
}) {
  if (!isOpen) return null;

  return (
    <Modal name={name} onClose={onClose}>
      <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
        <h3 className="modal__title">{title}</h3>
        {children}
        <button
          type="submit"
          className={`modal__submit-button ${
            isSubmitDisabled ? "modal__submit-button_disabled" : ""
          }`}
          disabled={isSubmitDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;


