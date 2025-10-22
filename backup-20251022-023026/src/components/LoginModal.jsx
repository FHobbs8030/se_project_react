import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal modal_open">
      <div className="modal__content">
        <h2 className="modal__title">Log in</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit({ email, password });
          }}
          className="form"
        >
          <label className="form__field">
            <span className="form__label">Email</span>
            <input
              className="form__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="form__field">
            <span className="form__label">Password</span>
            <input
              className="form__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <div className="modal__actions">
            <button type="submit" className="button button_primary">Log in</button>
            <button type="button" className="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
