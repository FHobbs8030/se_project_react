const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
const ITEMS_BASE = import.meta.env.VITE_ITEMS_BASE_URL || API_BASE;
const ITEMS_PATH = import.meta.env.VITE_ITEMS_PATH || "/items";

function authHeaders() {
  const jwt = localStorage.getItem("jwt");
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
}

async function http(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${text}`);
  }
  return res.json();
}

export function getItems() {
  return http(`${ITEMS_BASE}${ITEMS_PATH}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
}

export function addItem({ name, imageUrl, weather }) {
  return http(`${ITEMS_BASE}${ITEMS_PATH}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ name, imageUrl, weather })
  });
}

export function deleteItem(id) {
  return http(`${ITEMS_BASE}${ITEMS_PATH}/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders() }
  });
}

export function likeItem(id) {
  return http(`${ITEMS_BASE}${ITEMS_PATH}/${id}/likes`, {
    method: "PUT",
    headers: { ...authHeaders() }
  });
}

export function unlikeItem(id) {
  return http(`${ITEMS_BASE}${ITEMS_PATH}/${id}/likes`, {
    method: "DELETE",
    headers: { ...authHeaders() }
  });
}
