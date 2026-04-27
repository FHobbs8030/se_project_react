const API_BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');

export const getToken = () => localStorage.getItem('jwt');
export const setToken = t => localStorage.setItem('jwt', t);
export const removeToken = () => localStorage.removeItem('jwt');

export async function request(
  path,
  { method = 'GET', headers = {}, body } = {}
) {
  console.log('API CALL:', path);

  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const msg = (data && data.message) || res.statusText || 'Request failed';
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }

  return data;
}

export const api = {
  get: (path, opts = {}) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts = {}) =>
    request(path, { ...opts, method: 'POST', body }),
  put: (path, body, opts = {}) =>
    request(path, { ...opts, method: 'PUT', body }),
  del: (path, opts = {}) => request(path, { ...opts, method: 'DELETE' }),
};
