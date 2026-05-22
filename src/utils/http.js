const API_BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, '');

export const getToken = () => localStorage.getItem('jwt');

async function request(path, { method = 'GET', headers = {}, body } = {}) {
  const token = getToken();

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${path}`, options);

  let data = null;

  try {
    data = await res.json();
  } catch (err) {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || `Error: ${res.status}`);
  }

  return data;
}

export { request };

export const api = {
  get: path => request(path),

  post: (path, body) =>
    request(path, {
      method: 'POST',
      body,
    }),

  put: (path, body) =>
    request(path, {
      method: 'PUT',
      body,
    }),

  patch: (path, body) =>
    request(path, {
      method: 'PATCH',
      body,
    }),

  del: path =>
    request(path, {
      method: 'DELETE',
    }),
};

export const http = api;
