import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../utils/authApi';

export default function Register() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [err, setErr]           = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      await signUp({ email, password, name });
      const { token } = await signIn(email, password);
      localStorage.setItem('jwt', token);
      navigate('/profile');
    } catch (e) {
      setErr(e.message || 'Registration failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>Create account</h2>
      {err && <p className="auth-form__error">{err}</p>}
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Create account</button>
    </form>
  );
}
