// src/utils/authApi.js
const API_BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

async function eat(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text).catch(() => ({})) : {};
  if (!res.ok) throw new Error(data?.message || res.statusText || "Request failed");
  return data;
}

export async function register({ name, avatar, email, password }) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password })
  });
  return eat(res);
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return eat(res);
}

export async function getUser() {
  const token = localStorage.getItem("jwt");
  if (!token) throw new Error("No token");
  const res = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return eat(res);
}

export default { register, login, getUser };
