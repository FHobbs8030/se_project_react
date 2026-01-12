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
  const [city, setCity] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setAvatarUrl('');
      setCity('');
    }
  }, [isOpen]);

  const isValid =
    email.trim() !== '' &&
    password.trim() !== '' &&
    name.trim() !== '' &&
    avatarUrl.trim() !== '';

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;

    onSubmit({
      email,
      password,
      name,
      avatarUrl: normalizeImage(avatarUrl),
      city,
    });
  };

  return (
    <ModalWithForm
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign Up"
      submitText="Sign Up"
      isDisabled={!isValid || isSubmitting}
    >
      <label className="register__label">
        Email*
        <input
          name="email"
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
          name="password"
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
          name="name"
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
          name="avatarUrl"
          type="text"
          className="register__input"
          value={avatarUrl}
          onChange={e => setAvatarUrl(e.target.value)}
          placeholder="https://example.com/me.png or /images/me.png"
          pattern="https?://.*|/images/.*|.*\.(png|jpg|jpeg|gif|svg)"
          required
        />
      </label>

      <label className="register__label">
        City
        <input
          name="city"
          type="text"
          className="register__input"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
        />
      </label>

      <button type="button" className="register__alt" onClick={onAltClick}>
        or Log In
      </button>
    </ModalWithForm>
  );
}
