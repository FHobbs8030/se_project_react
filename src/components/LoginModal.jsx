import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import '../blocks/LoginModal.css';

export default function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onAltClick,
  isSubmitting,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email.trim() !== '' && password.trim() !== '';

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
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
          <input
            name="email"
            type="email"
            className="login__input"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="login__label">
          Password
          <input
            name="password"
            type="password"
            className="login__input"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>

        <div className="login__actions">
          <button
            type="submit"
            className="login__submit"
            disabled={!isValid || isSubmitting}
          >
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
