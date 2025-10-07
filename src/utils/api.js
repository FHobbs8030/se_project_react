const base = import.meta.env.VITE_API_BASE_URL;

const authz = (token) => token ? { Authorization: `Bearer ${token}` } : {};

export async function getItems(token) {
  const res = await fetch(`${base}/items`, { headers: { ...authz(token) } });
  if (!res.ok) throw new Error("Failed to get items");
  return res.json();
}

export async function addItem(data, token) {
  const res = await fetch(`${base}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authz(token) },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add item");
  return res.json();
}

export async function deleteItem(id, token) {
  const res = await fetch(`${base}/items/${id}`, {
    method: "DELETE",
    headers: { ...authz(token) },
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}
