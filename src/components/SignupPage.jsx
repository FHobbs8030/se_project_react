import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage({ onSignup }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await onSignup({ name, avatar, email, password });
      navigate("/profile", { replace: true });
    } catch (e2) {
      setErr(e2.message || "Signup failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="content">
      <h1>Sign Up</h1>
      <form className="form" onSubmit={submit}>
        <label className="form__row">
          <span>Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="form__row">
          <span>Avatar URL</span>
          <input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
        </label>
        <label className="form__row">
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="form__row">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {err && <div className="form__error">{err}</div>}
        <button type="submit" disabled={busy}>{busy ? "Creating..." : "Create Account"}</button>
      </form>
    </main>
  );
}
