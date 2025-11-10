import { useEffect, useMemo, useState } from 'react';
import '../blocks/AuthModal.css';

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  onSwitchToLogin,
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nameErr = useMemo(() => {
    const v = name.trim();
    if (!v) return 'Name is required';
    if (v.length < 2) return 'Min 2 characters';
    if (v.length > 30) return 'Max 30 characters';
    return '';
  }, [name]);

  const emailErr = useMemo(() => {
    const v = email.trim();
    if (!v) return 'Email is required';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Invalid email';
  }, [email]);

  const passwordErr = useMemo(() => {
    if (!password) return 'Password is required';
    return password.length >= 8 ? '' : 'Min 8 characters';
  }, [password]);

  const isValid = !nameErr && !emailErr && !passwordErr;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    onSubmit({ name: name.trim(), email: email.trim(), password });
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="authmodal__overlay"
      onMouseDown={e => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="authmodal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
      >
        <div className="authmodal__header">
          <h2 id="register-title" className="authmodal__title">
            Sign up
          </h2>
          <button
            type="button"
            className="authmodal__close"
            aria-label="Close"
            onClick={() => onClose?.()}
          >
            ×
          </button>
        </div>

        <form className="authmodal__form" onSubmit={handleSubmit} noValidate>
          <label className="authmodal__field">
            <span className="authmodal__label">Name</span>
            <input
              className={`authmodal__input ${
                nameErr ? 'authmodal__input--invalid' : ''
              }`}
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              minLength={2}
              maxLength={30}
              placeholder="Your name"
              required
            />
            {nameErr && <span className="authmodal__error">{nameErr}</span>}
          </label>

          <label className="authmodal__field">
            <span className="authmodal__label">Email</span>
            <input
              className={`authmodal__input ${
                emailErr ? 'authmodal__input--invalid' : ''
              }`}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              required
            />
            {emailErr && <span className="authmodal__error">{emailErr}</span>}
          </label>

          <label className="authmodal__field">
            <span className="authmodal__label">Password</span>
            <input
              className={`authmodal__input ${
                passwordErr ? 'authmodal__input--invalid' : ''
              }`}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              placeholder="••••••••"
              required
            />
            {passwordErr && (
              <span className="authmodal__error">{passwordErr}</span>
            )}
          </label>

          <button
            type="submit"
            className="authmodal__submit"
            disabled={!isValid || isSubmitting}
            aria-disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Signing up…' : 'Sign up'}
          </button>
        </form>

        <div className="authmodal__footer">
          <span className="authmodal__hint">Already have an account?</span>
          <button
            type="button"
            className="authmodal__link"
            onClick={() => onSwitchToLogin?.()}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
