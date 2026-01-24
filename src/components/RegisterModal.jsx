import { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm';
import '../blocks/RegisterModal.css';

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
  const [avatar, setAvatar] = useState('');

  const isValid =
    email.trim() !== '' &&
    password.trim() !== '' &&
    name.trim() !== '' &&
    avatar.trim() !== '';

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setAvatar('');
    }
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({ email, password, name, avatar });
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
          name="email"
          type="email"
          className="register__input"
          autoComplete="email"
          placeholder="Email"
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
          autoComplete="new-password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>

      <label className="register__label">
        Name*
        <input
          name="name"
          type="text"
          className="register__input"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>

      <label className="register__label">
        Avatar URL*
        <input
          name="avatar"
          type="url"
          className="register__input"
          placeholder="Avatar URL"
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
