const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

async function req(path, opts = {}) {
  const { method = 'GET', headers = {}, body, credentials = 'include' } = opts;
  const init = {
    method,
    headers: { Accept: 'application/json', ...headers },
    credentials,
  };
  if (body !== undefined) {
    if (typeof body === 'object' && !(body instanceof FormData)) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(body);
    } else {
      init.body = body;
    }
  }
  const res = await fetch(`${API_BASE}${path}`, init);
  if (res.status === 204) return null;
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `HTTP ${res.status}`;
    const err = new Error(msg);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

const toId = x => encodeURIComponent(String(x));

export const getItems = () => req('/items');
export const addItem = body => req('/items', { method: 'POST', body });
export const deleteItem = id => req(`/items/${toId(id)}`, { method: 'DELETE' });
export const likeItem = id =>
  req(`/items/${toId(id)}/likes`, { method: 'PUT' });
export const unlikeItem = id =>
  req(`/items/${toId(id)}/likes`, { method: 'DELETE' });
