import { useState, useEffect } from 'react';
import ModalWithForm from './ModalWithForm.jsx';
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

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setName('');
      setAvatar('');
    }
  }, [isOpen]);

  const isFormValid = email && password && name && avatar;

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ email, password, name, avatar });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="signup"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign Up"
      isDisabled={isSubmitting || !isFormValid}
      footer={
        <button type="button" className="modal__alt" onClick={onAltClick}>
          or Log In
        </button>
      }
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>

      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={e => setName(e.target.value)}
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          placeholder="https://example.com/images/avatar.jpg"
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
