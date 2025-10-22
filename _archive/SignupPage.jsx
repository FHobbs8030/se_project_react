import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SIGNUP, SIGNIN, USERS_ME } from "../api";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useOutletContext() || {};

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cleanEmail = email.replace(/^mailto:/i, "").trim();
      const res = await fetch(SIGNUP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: cleanEmail, password }),
      });
      if (!res.ok) throw new Error(await res.text());

      const loginRes = await fetch(SIGNIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      });
      if (!loginRes.ok) throw new Error(await loginRes.text());

      const { token } = await loginRes.json();
      localStorage.setItem("jwt", token);

      const meRes = await fetch(USERS_ME, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (!(meRes.ok || meRes.status === 304)) throw new Error(await meRes.text());
      const me = await meRes.json();
      if (setCurrentUser) setCurrentUser(me);

      navigate("/profile", { replace: true });
    } catch {
      setError("Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth auth_signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value.replace(/^mailto:/i, "").trimStart())
            }
            autoComplete="email"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />
        </label>
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating…" : "Sign Up"}
        </button>
      </form>
    </main>
  );
}
