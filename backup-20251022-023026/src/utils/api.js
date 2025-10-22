const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function json(res) {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function authHeaders(extra = {}) {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extra,
  };
}

export const api = {
  register({ name, avatar, email, password }) {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name, avatar, email, password }),
    }).then(json);
  },
  login({ email, password }) {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ email, password }),
    }).then(json);
  },
  getMe() {
    return fetch(`${BASE_URL}/users/me`, {
      headers: authHeaders(),
    }).then(json);
  },
  getItems() {
    return fetch(`${BASE_URL}/items`, {
      headers: authHeaders(),
    }).then(json);
  },
  addItem({ name, weather, imageUrl }) {
    return fetch(`${BASE_URL}/items`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name, weather, imageUrl }),
    }).then(json);
  },
  deleteItem(id) {
    return fetch(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then(json);
  },
  toggleLike(id, isLiked) {
    return fetch(`${BASE_URL}/items/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: authHeaders(),
    }).then(json);
  },
};
