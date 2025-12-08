import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
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

  // reset when modal closes
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
            value={email}
            onChange={e => setEmail(e.target.value)}
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
            required
          />
        </label>

        <label className="register__label">
          Name*
          <input
            name="name"
            className="register__input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>

        <label className="register__label">
          Avatar URL*
          <input
            name="avatarUrl"
            className="register__input"
            type="text"
            value={avatarUrl}
            onChange={e => setAvatarUrl(e.target.value)}
            required
            placeholder="https://example.com/me.png or /images/me.png"
            pattern="https?://.*|/images/.*|.*\.(png|jpg|jpeg|gif|svg)"
          />
        </label>

        <label className="register__label">
          City
          <input
            name="city"
            className="register__input"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </label>

        <div className="register__actions">
          <button
            className="register__submit"
            disabled={!isValid || isSubmitting}
          >
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
