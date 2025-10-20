import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";
import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handle = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Create account"
      onClose={onClose}
      onSubmit={handle}
      submitText="Create account"
    >
      <label className="modal__label">
        <span className="modal__label-text">Name</span>
        <input className="modal__input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Avatar URL</span>
        <input className="modal__input" type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Email</span>
        <input className="modal__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Password</span>
        <input className="modal__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
      </label>
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
