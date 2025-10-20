const base = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

const authz = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

const eatJson = async (res) => {
  if (res.status === 204) return true;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
};

export async function getItems(token) {
  const res = await fetch(`${base}/items`, { headers: { ...authz(token) } });
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
