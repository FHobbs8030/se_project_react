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

const normalizeItem = (i) => ({
  _id: i._id || i.id,
  name: i.name || i.title || 'Untitled',
  imageUrl: i.imageUrl || i.image || i.link || '',
  weather: i.weather || i.season || null,
  owner: i.owner,
});

export async function getClothingItems() {
  const token = localStorage.getItem('jwt');
  const data = await fetch(`${API_BASE}/items`, {
    headers: jsonHeaders(token),
  }).then(handle);
  const arr = Array.isArray(data) ? data : data?.data || [];
  return arr.map(normalizeItem);
}

export function addClothingItem(payload) {
  const token = localStorage.getItem('jwt');
  return fetch(`${API_BASE}/items`, {
    method: 'POST',
    headers: jsonHeaders(token),
    body: JSON.stringify(payload),
  }).then(handle);
}

export function deleteClothingItem(id) {
  const token = localStorage.getItem('jwt');
  return fetch(`${API_BASE}/items/${id}`, {
    method: 'DELETE',
    headers: jsonHeaders(token),
  }).then(handle);
}
