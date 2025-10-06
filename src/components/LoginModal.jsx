import { useState } from "react";
import ModalWithForm from "./ModalWithForm.jsx";

export default function LoginModal({ isOpen, onClose, onSubmit, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log in"
      onSubmit={handleSubmit}
      submitText="Log in"
    >
      {error ? <div className="modal__error">{error}</div> : null}
      <label className="modal__field">
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="modal__field">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
    </ModalWithForm>
  );
}
