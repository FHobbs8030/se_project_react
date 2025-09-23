import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp, signIn, getMe } from "../utils/authApi.js";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await signUp({ name, avatar, email, password });
      const { token } = await signIn({ email, password });
      localStorage.setItem("jwt", token);
      const me = await getMe(token);
      window.dispatchEvent(new CustomEvent("auth:changed", { detail: me }));
      navigate("/profile");
    } catch (err) {
      setError(err?.data?.message || err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form form--auth">
      <h1>Create account</h1>
      {error && <div role="alert">{error}</div>}
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Avatar URL
        <input
          type="url"
          placeholder="https://…"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </label>
      <button disabled={submitting} type="submit">
        {submitting ? "Creating…" : "Create account"}
      </button>
    </form>
  );
}
