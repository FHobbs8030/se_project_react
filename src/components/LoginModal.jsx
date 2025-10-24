import PropTypes from 'prop-types';
import ModalWithForm from './ModalWithForm.jsx';
import { useState } from 'react';

const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handle = e => {
    e.preventDefault();
    console.log('Submitting', { email, password }); // should appear
    onSubmit({ email, password });
  };

  const isValid = isEmail(email) && password.length >= 8;

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      onClose={onClose}
      onSubmit={handle}
      submitText="Log In"
      submitDisabled={!isValid}
    >
      <label className="modal__label">
        <span className="modal__label-text">Email</span>
        <input
          className="modal__input modal__input--underline"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Password</span>
        <input
          className="modal__input modal__input--underline"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          minLength={8}
          required
        />
      </label>
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
