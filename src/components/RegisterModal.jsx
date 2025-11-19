import Modal from './Modal.jsx';
import '../blocks/RegisterModal.css';

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onAltClick,
  isSubmitting,
}) {
  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const avatarUrl = e.target.avatarUrl.value;
    const city = e.target.city.value;
    onSubmit({ name, email, password, avatarUrl, city });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="register__header">
        <h2 className="register__title">Sign Up</h2>
        <button className="register__close" onClick={onClose}>
          ×
        </button>
      </div>

      <form className="register__form" onSubmit={handleSubmit}>
        <label className="register__label">
          Email*
          <input
            name="email"
            type="email"
            className="register__input"
            required
          />
        </label>

        <label className="register__label">
          Password*
          <input
            name="password"
            type="password"
            className="register__input"
            required
          />
        </label>

        <label className="register__label">
          Name*
          <input name="name" className="register__input" required />
        </label>

        <label className="register__label">
          Avatar URL*
          <input
            name="avatarUrl"
            className="register__input"
            type="url"
            required
          />
        </label>

        <label className="register__label">
          City
          <input name="city" className="register__input" />
        </label>

        <div className="register__actions">
          <button className="register__submit" disabled={isSubmitting}>
            Sign Up
          </button>
          <button type="button" className="register__alt" onClick={onAltClick}>
            or Log In
          </button>
        </div>
      </form>
    </Modal>
  );
}
