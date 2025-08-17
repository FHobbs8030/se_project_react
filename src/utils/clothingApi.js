const localHosts = ['localhost', '127.0.0.1', '::1'];
const isLocal = localHosts.includes(window.location.hostname);

const BASE_URL = isLocal
  ? 'http://127.0.0.1:3001'
  : 'https://<YOUR_REAL_BACKEND_DOMAIN>';

function parseJSONSafe(res) {
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return Promise.resolve(null);
}

async function checkResponse(res) {
  if (res.ok) return parseJSONSafe(res);
  let data = null;
  try { data = await parseJSONSafe(res); } catch {}
  const message = data && data.message ? data.message : `Server error: ${res.status}`;
  throw new Error(message);
}

function request(path, options = {}) {
  const token = localStorage.getItem('jwt');
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  }).then(checkResponse);
}

export const getClothingItems = () => request('/items');

export const addClothingItem = (item) =>
  request('/items', {
    method: 'POST',
    body: JSON.stringify(item),
  });

export const deleteClothingItem = (id) =>
  request(`/items/${id}`, { method: 'DELETE' });
