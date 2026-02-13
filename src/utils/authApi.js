const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
).replace(/\/+$/, '');

async function request(path, options = {}) {
  const token = localStorage.getItem('jwt');

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw err;
  }

  return res.json();
}

export const login = ({ email, password }) =>
  request('/signin', {
    method: 'POST',
    body: { email, password },
  });

export const register = ({ name, email, password, avatar }) =>
  request('/signup', {
    method: 'POST',
    body: { name, email, password, avatar },
  });

export const logout = () =>
  request('/signout', {
    method: 'POST',
  });

export const getUser = () => request('/users/me');
