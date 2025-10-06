import { getToken } from "./token";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data?.message || "Request failed";
    throw new Error(message);
  }
  return data;
}

function withAuth(headers = {}) {
  const token = getToken();
  if (token) return { ...headers, Authorization: `Bearer ${token}` };
  return headers;
}

export function signup({ name, email, password }) {
  return request("/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
}

export function signin({ email, password }) {
  return request("/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
}

export function getMe() {
  return request("/users/me", {
    headers: withAuth({ "Content-Type": "application/json" }),
  });
}

export function getItems() {
  return request("/items", {
    headers: withAuth({ "Content-Type": "application/json" }),
  });
}

export function addItem({ name, imageUrl, weather }) {
  return request("/items", {
    method: "POST",
    headers: withAuth({ "Content-Type": "application/json" }),
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

export function deleteItem(id) {
  return request(`/items/${id}`, {
    method: "DELETE",
    headers: withAuth({ "Content-Type": "application/json" }),
  });
}

export default { signup, signin, getMe, getItems, addItem, deleteItem };
