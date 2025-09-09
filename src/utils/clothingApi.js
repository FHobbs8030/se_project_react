const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const handleJSON = async (res) => {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg =
      (data && (data.message || data.error)) ||
      `${res.status} ${res.statusText}`;
    throw new Error(msg);
  }
  return data;
};

const authHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const token = localStorage.getItem('jwt');
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

export async function getClothingItems() {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'GET',
    headers: authHeaders(),
    credentials: 'include',
  });
  return handleJSON(res);
}

export async function addClothingItem({ name, weather, imageUrl, link, image }) {
  const body = {
    name,
    weather,
    imageUrl: imageUrl ?? link ?? image ?? '',
  };
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(body),
    credentials: 'include',
  });
  return handleJSON(res);
}

export async function deleteClothingItem(id) {
  const res = await fetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
    credentials: 'include',
  });
  return handleJSON(res);
}

export default {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
};
