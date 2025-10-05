// src/utils/itemsApi.js
import { checkResponse } from "./apiUtils.js";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function getClothingItems(token) {
  return fetch(`${API_BASE}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}

export function addItem(data, token) {
  return fetch(`${API_BASE}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
}

export function deleteItem(id, token) {
  return fetch(`${API_BASE}/items/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}
