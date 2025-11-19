import Modal from './Modal.jsx';
import '../blocks/LoginModal.css';

export default function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onAltClick,
  isSubmitting,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    onSubmit({ email, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="login__header">
        <h2 className="login__title">Log In</h2>
        <button className="login__close" onClick={onClose}>
          ×
        </button>
      </div>

      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">
          Email
          <input name="email" type="email" className="login__input" required />
        </label>

        <label className="login__label">
          Password
          <input
            name="password"
            type="password"
            className="login__input"
            required
          />
        </label>

        <div className="login__actions">
          <button className="login__submit" disabled={isSubmitting}>
            Log In
          </button>

          <button type="button" className="login__alt" onClick={onAltClick}>
            or Sign Up
          </button>
        </div>
      </form>
    </Modal>
  );
}
