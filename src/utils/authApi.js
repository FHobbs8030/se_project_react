const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const jsonHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const handle = async (res) => {
  const text = await res.text().catch(() => '');
  if (!res.ok) throw new Error(text || `HTTP ${res.status}`);
  return text ? JSON.parse(text) : {};
};

export async function signUp({ name, email, password }) {
  return fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ name, email, password }),
  }).then(handle);
}

export async function signIn({ email, password }) {
  const { token } = await fetch(`${API_BASE}/signin`, {
    method: 'POST',
    headers: jsonHeaders(),
    body: JSON.stringify({ email, password }),
  }).then(handle);
  localStorage.setItem('jwt', token);
  return token;
}

export async function getMe() {
  const token = localStorage.getItem('jwt');
  return fetch(`${API_BASE}/users/me`, {
    headers: jsonHeaders(token),
  }).then(handle);
}

export function signOut() {
  localStorage.removeItem('jwt');
}
