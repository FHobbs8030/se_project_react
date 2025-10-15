import { useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { SIGNUP, SIGNIN, USERS_ME } from "../api";
import { normalizeUser } from "../utils/normalizeUser";


export default function RegisterModal() {
  const { setCurrentUser } = useOutletContext() || {};
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onClose = () => {
    if (location.state?.background) navigate(-1);
    else navigate("/");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const regRes = await fetch(SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
      });
      if (!regRes.ok) throw new Error(await regRes.text());

      const loginRes = await fetch(SIGNIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      if (!loginRes.ok) throw new Error(await loginRes.text());

      const { token } = await loginRes.json();
      localStorage.setItem("jwt", token);

      const meRes = await fetch(USERS_ME, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!meRes.ok) throw new Error(await meRes.text());
      const raw = await meRes.json();
      const user = normalizeUser(raw);
      if (user._id && setCurrentUser) setCurrentUser(user);

      navigate(from, { replace: true });
    } catch {
      setError("Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="modal__title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="modal__label">
            Name
            <input
              className="modal__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </label>
          <label className="modal__label">
            Email
            <input
              className="modal__input"
              type="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </label>
          {error && <div className="modal__error">{error}</div>}
          <button className="modal__submit" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
