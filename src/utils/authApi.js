const BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
).replace(/\/+$/, '');

async function request(path, opts = {}) {
  const { method = 'GET', body, headers = {}, allow401 = false } = opts;
  const url = `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const hasBody = body !== undefined;

  const res = await fetch(url, {
    method,
    headers: hasBody
      ? { 'Content-Type': 'application/json', ...headers }
      : headers,
    credentials: 'include',
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json')
    ? await res.json().catch(() => ({}))
    : await res.text().catch(() => '');

  if (res.status === 401 && allow401) return null;

  if (!res.ok) {
    const err =
      typeof data === 'object' && data !== null
        ? data
        : { message: String(data || `HTTP ${res.status}`) };
    throw err;
  }

  return data;
}

export function login({ email, password }) {
  return request('/signin', {
    method: 'POST',
    body: { email, password },
  });
}

export function register({ name, email, password, avatarUrl, city }) {
  return request('/signup', {
    method: 'POST',
    body: { name, email, password, avatarUrl, city },
  });
}

export function logout() {
  return request('/signout', { method: 'POST' });
}

export function getUser() {
  return request('/users/me', { allow401: true });
}
