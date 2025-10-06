import { apiBase } from "./utils.js";

export const getItems = async () => {
  const res = await fetch(`${apiBase}/items`);
  if (!res.ok) throw new Error("Failed to load items");
  return res.json();
};

export const addItem = async (data, token) => {
  const res = await fetch(`${apiBase}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Failed to add item");
  }
  return res.json();
};

export const deleteItem = async (id, token) => {
  const res = await fetch(`${apiBase}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
};
