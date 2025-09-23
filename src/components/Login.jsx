import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../utils/authApi';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form form--auth">
      <h1>Sign in</h1>
      {error && <div role="alert">{error}</div>}
      <label>
        Email
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      </label>
      <label>
        Password
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
      </label>
      <button disabled={submitting} type="submit">{submitting ? 'Signing in...' : 'Sign in'}</button>
    </form>
  );
}
