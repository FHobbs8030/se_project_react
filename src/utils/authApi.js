const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw Object.assign(new Error(data?.message || "Request failed"), {
      status: res.status,
      data,
    });
  }
  return data;
}

// POST /signup
export function signUp({ name, avatar, email, password }) {
  return request("/signup", {
    method: "POST",
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

// POST /signin
export function signIn({ email, password }) {
  return request("/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// GET /users/me (with Bearer token)
export function getMe(token) {
  return request("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
