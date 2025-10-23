import PropTypes from 'prop-types';
import ModalWithForm from './ModalWithForm.jsx';
import { useState } from 'react';

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handle = e => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log in"
      onClose={onClose}
      onSubmit={handle}
      submitText="Log in"
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
          placeholder="••••••••"
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
