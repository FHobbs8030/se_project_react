export const apiBase = import.meta.env.VITE_API_BASE_URL;

export function authHeaders() {
  const token = localStorage.getItem('jwt');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function api(path, opts = {}) {
  const res = await fetch(`${apiBase}${path}`, {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(opts.headers || {}),
    },
  });
  if (res.status === 401) throw new Error('unauthorized');
  if (!res.ok) throw new Error(`${res.status}`);
  return res.status === 204 ? null : res.json();
}
