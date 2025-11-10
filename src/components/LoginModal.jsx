import { useEffect, useMemo, useState } from 'react';
import '../blocks/AuthModal.css';

export default function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailErr = useMemo(() => {
    const v = email.trim();
    if (!v) return 'Email is required';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Invalid email';
  }, [email]);

  const passwordErr = useMemo(() => {
    if (!password) return 'Password is required';
    return password.length >= 8 ? '' : 'Min 8 characters';
  }, [password]);

  const isValid = !emailErr && !passwordErr;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || isSubmitting) return;
    onSubmit({ email: email.trim(), password });
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
        aria-labelledby="login-title"
      >
        <div className="authmodal__header">
          <h2 id="login-title" className="authmodal__title">
            Log in
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
              autoComplete="current-password"
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
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <div className="authmodal__footer">
          <span className="authmodal__hint">No account?</span>
          <button
            type="button"
            className="authmodal__link"
            onClick={() => onSwitchToRegister?.()}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
