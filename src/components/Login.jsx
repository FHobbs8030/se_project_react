import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, getMe } from '../utils/authApi';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr]           = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      const { token } = await signIn(email, password);
      localStorage.setItem('jwt', token);
      await getMe(); 
      navigate('/profile');
    } catch (e) {
      setErr(e.message || 'Login failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>Sign in</h2>
      {err && <p className="auth-form__error">{err}</p>}
      <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Sign in</button>
    </form>
  );
}
