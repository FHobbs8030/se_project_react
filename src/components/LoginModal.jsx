import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await onSubmit({ email, password });
    },
    [email, password, onSubmit]
  );

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      submitText="Log in"
      onSubmit={handleSubmit}
    >
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
          autoComplete="current-password"
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
