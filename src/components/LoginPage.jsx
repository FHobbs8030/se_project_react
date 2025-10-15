import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { SIGNIN, USERS_ME } from "../api";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setCurrentUser } = useOutletContext() || {};
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(SIGNIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Login failed");
      const { token } = await res.json();
      localStorage.setItem("jwt", token);

      const meRes = await fetch(USERS_ME, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!meRes.ok) throw new Error("Failed to load profile");
      const me = await meRes.json();
      setCurrentUser?.(me);

      navigate("/profile", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "…" : "Log In"}
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </main>
  );
}
