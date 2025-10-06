import { useState } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => { e.preventDefault(); onSubmit({ email, password }); };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Log In"
    >
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

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
