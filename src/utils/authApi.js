const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const check = async (res) => {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message || `${res.status} ${res.statusText}`);
  }
  return res.json();
};

const token = () => localStorage.getItem('jwt');

export async function signIn(email, password) {
  const data = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(check);
  if (data?.token) localStorage.setItem('jwt', data.token);
  return data;
}

export async function signUp(name, avatar, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, avatar, email, password })
  }).then(check);
}

export async function getMe() {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token()}` }
  }).then(check);
}

export function signOut() {
  localStorage.removeItem('jwt');
}
