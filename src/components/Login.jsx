import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, getMe } from '../utils/authApi.js';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signIn({ email, password });
      window.dispatchEvent(new Event('auth-changed'));
      await getMe();
      navigate('/', { replace: true });
    } catch (err) {
      setError(err?.message || 'Sign-in failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <h2>Sign in</h2>
      {error && <p style={{ color: 'crimson', marginBottom: 8 }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input name="email" type="email" placeholder="email" required />
        <input name="password" type="password" placeholder="password" required />
        <button type="submit" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </main>
  );
}
