const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message || `${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function getToken() {
  return localStorage.getItem('jwt');
}

export function setToken(token) {
  if (token) localStorage.setItem('jwt', token);
}

export function signOut() {
  localStorage.removeItem('jwt');
}

export async function signUp(name, avatar, email, password) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, avatar })
  });
  return handle(res);
}

export async function signIn(email, password) {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await handle(res);
  if (data?.token) setToken(data.token);
  return data;
}

export async function getMe() {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handle(res);
}

export default { signUp, signIn, signOut, getMe, getToken, setToken };
