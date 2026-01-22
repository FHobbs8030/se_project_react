import { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm.jsx';
import '../blocks/RegisterModal.css';
import { normalizeImage } from '../utils/normalizeImage.js';

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onAltClick,
  isSubmitting,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setAvatarUrl('');
    }
  }, [isOpen]);

  const isValid =
    email.trim() && password.trim() && name.trim() && avatarUrl.trim();

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({
      email,
      password,
      name,
      avatarUrl: normalizeImage(avatarUrl),
    });
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      submitText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isValid || isSubmitting}
      footer={
        <button type="button" className="register__alt" onClick={onAltClick}>
          or Log In
        </button>
      }
    >
      <label className="register__label">
        Email*
        <input
          type="email"
          className="register__input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>

      <label className="register__label">
        Password*
        <input
          type="password"
          className="register__input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>

      <label className="register__label">
        Name*
        <input
          type="text"
          className="register__input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </label>

      <label className="register__label">
        Avatar URL*
        <input
          type="text"
          className="register__input"
          value={avatarUrl}
          onChange={e => setAvatarUrl(e.target.value)}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}
