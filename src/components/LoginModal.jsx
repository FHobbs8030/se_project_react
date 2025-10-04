import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ModalWithForm from "./ModalWithForm.jsx";
import { signin } from "../utils/authApi.js";

export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
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
      const user = await signin({ email, password }); // returns getMe() user
      if (user) onLogin(user);
      onClose();
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      onSubmit={handleSubmit}
      submitText={submitting ? "Logging in..." : "Log in"}
      disabled={submitting}
    >
      {error && <p className="form__error" role="alert">{error}</p>}

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
          autoComplete="current-password"
          required
        />
      </label>
    </ModalWithForm>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};
