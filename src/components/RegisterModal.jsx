import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";
import { signup, signin } from "../utils/authApi.js";

export default function RegisterModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setEmail("");
      setPassword("");
      setError("");
      setSubmitting(false);
    }
  }, [isOpen]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signup({ name, email, password }); // may return token or not
      const user = await signin({ email, password }); // ensure logged in
      if (user) onRegister(user);
      onClose();
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      onSubmit={handleSubmit}
      submitText={submitting ? "Creating..." : "Create account"}
      disabled={submitting}
    >
      {error && <p className="form__error" role="alert">{error}</p>}

      <label className="form__label">
        Name
        <input
          className="form__input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={30}
          required
        />
      </label>

      <label className="form__label">
        Email
        <input
          className="form__input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />
      </label>

      <label className="form__label">
        Password
        <input
          className="form__input"
          type="password"
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
