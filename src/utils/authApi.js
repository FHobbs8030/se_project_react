import { api } from './http';

const TOKEN_KEY = 'jwt';

export const signIn = async (email, password) => {
  const data = await api('/signin', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
    window.dispatchEvent(new Event('auth-changed'));
  }
  return data;
};

export const signUp = async (payload) => {
  const data = await api('/signup', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
    window.dispatchEvent(new Event('auth-changed'));
  }
  return data;
};

export const getMe = () => api('/users/me');  // <-- add this

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event('auth-changed'));
};
