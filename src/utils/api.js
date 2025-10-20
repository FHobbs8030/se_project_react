const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

const authz = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

const eatJson = async (res) => {
  if (res.status === 204) return true;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
};

export async function getItems(token) {
  const res = await fetch(`${base}/items?ts=${Date.now()}`, {
    headers: { ...authz(token) },
  });
  return eatJson(res);
}

export async function addItem(data, token) {
  const res = await fetch(`${base}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authz(token) },
    body: JSON.stringify(data),
  });
  return eatJson(res);
}

export async function deleteItem(id, token) {
  const res = await fetch(`${base}/items/${id}`, {
    method: "DELETE",
    headers: { ...authz(token) },
  });
  return eatJson(res);
}

export async function getMe(token) {
  const res = await fetch(`${base}/users/me`, {
    headers: { ...authz(token) },
  });
  return eatJson(res);
}

export async function signin({ email, password }) {
  const res = await fetch(`${base}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return eatJson(res);
}

export async function signup({ name, avatar, email, password }) {
  const res = await fetch(`${base}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  });
  return eatJson(res);
}
