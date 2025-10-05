import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email: email.trim(), password };
    if (name) payload.name = name;
    if (avatar) payload.avatar = avatar.trim();
    onSubmit(payload);
  };

  return (
    <div className="modal">
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Avatar URL" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="modal__actions">
          <button type="submit">Sign up</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
