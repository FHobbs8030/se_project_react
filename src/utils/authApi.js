const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || res.statusText || "Request failed";
    throw new Error(message);
  }

  return data;
}

export function login({ email, password }) {
  return request("/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register({ name, avatar, email, password }) {
  return request("/signup", {
    method: "POST",
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

export function getUser() {
  const token = localStorage.getItem("jwt") || "";
  return request("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
