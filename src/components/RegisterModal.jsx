import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";

export default function RegisterModal({ isOpen, onClose, onSubmit }) {
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

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await onSubmit({ name, email, password });
    },
    [name, email, password, onSubmit]
  );

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      submitText="Create account"
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
          required
          minLength={2}
          maxLength={30}
          autoComplete="name"
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
          required
          autoComplete="email"
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
          required
          minLength={8}
          autoComplete="new-password"
        />
      </label>
    </ModalWithForm>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
