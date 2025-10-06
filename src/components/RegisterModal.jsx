import { useState } from "react";
import ModalWithForm from "./ModalWithForm.jsx";

export default function RegisterModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      onSubmit={handleSubmit}
      submitText="Sign up"
    >
      <label className="modal__field">
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label className="modal__field">
        Avatar URL
        <input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </label>
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
