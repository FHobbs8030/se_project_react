const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const handleJSON = async (res) => {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
};

const authHeaders = () => {
  const t = localStorage.getItem('jwt');
  return t
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` }
    : { 'Content-Type': 'application/json' };
};

export async function getClothingItems() {
  const res = await fetch(`${BASE_URL}/items`, { headers: authHeaders() });
  return handleJSON(res);
}

export async function addClothingItem(body) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body)
  });
  return handleJSON(res);
}

export async function deleteClothingItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: authHeaders()
  });
  return handleJSON(res);
}

export default { getClothingItems, addClothingItem, deleteClothingItem };
