import { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm';
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
    <ModalWithForm
      name="login"
      title="Log In"
      submitText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || isSubmitting}
      footer={
        <button type="button" className="login__alt" onClick={onAltClick}>
          or Sign Up
        </button>
      }
    >
      <label className="login__label">
        Email
        <input
          name="email"
          type="email"
          className="login__input"
          autoComplete="email"
          placeholder="Email"
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
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
