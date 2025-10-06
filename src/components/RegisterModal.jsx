import { useState } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";

export default function RegisterModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ name, email, password }); };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign Up"
    >
      <label className="modal__label">
        Name
        <input className="modal__input" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="modal__label">
        Email
        <input className="modal__input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label className="modal__label">
        Password
        <input className="modal__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
