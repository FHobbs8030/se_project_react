const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
).replace(/\/+$/, '');

async function request(path, options = {}) {
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    throw new Error(msg || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null;

  const ct = res.headers.get('content-type') || '';
  return ct.includes('application/json') ? res.json() : res.text();
}

export function login({ email, password }) {
  return request('/signin', { method: 'POST', body: { email, password } });
}

export function register({ name, email, password }) {
  return request('/signup', {
    method: 'POST',
    body: { name, email, password },
  });
}

export function logout() {
  return request('/signout', { method: 'POST' });
}

export function getUser() {
  return request('/users/me');
}
