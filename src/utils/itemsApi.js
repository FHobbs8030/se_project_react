// src/utils/itemsApi.js
const BASE =
  (import.meta.env.VITE_ITEMS_BASE_URL || import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
const PATH = import.meta.env.VITE_ITEMS_PATH || "/items";
const tokenKey = "jwt";

const authHeaders = () => {
  const t = localStorage.getItem(tokenKey);
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const json = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
};

export async function getItems() {
  const res = await fetch(`${BASE}${PATH}`, { headers: authHeaders() });
  return json(res);
}

export async function createItem({ name, weather, imageUrl }) {
  const res = await fetch(`${BASE}${PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name, weather, imageUrl }),
  });
  return json(res);
}

export async function deleteItem(itemId) {
  const res = await fetch(`${BASE}${PATH}/${itemId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (res.status === 204) return true;
  return json(res);
}

export async function likeItem(itemId) {
  const res = await fetch(`${BASE}${PATH}/${itemId}/likes`, {
    method: "PUT",
    headers: authHeaders(),
  });
  return json(res);
}

export async function unlikeItem(itemId) {
  const res = await fetch(`${BASE}${PATH}/${itemId}/likes`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  return json(res);
}
