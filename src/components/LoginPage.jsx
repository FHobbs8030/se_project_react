import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dest = location.state?.from?.pathname || "/profile";

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await onLogin({ email, password });
      navigate(dest, { replace: true });
    } catch (e2) {
      setErr(e2.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="content">
      <h1>Log In</h1>
      <form className="form" onSubmit={submit}>
        <label className="form__row">
          <span>Email</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="form__row">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {err && <div className="form__error">{err}</div>}
        <button type="submit" disabled={busy}>{busy ? "Signing in..." : "Log In"}</button>
      </form>
    </main>
  );
}
