import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ name: name.trim(), email: email.trim(), password });
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign Up"
      submitText="Sign Up"
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={30}
          autoComplete="name"
          required
        />
      </label>

      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          autoComplete="new-password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};
