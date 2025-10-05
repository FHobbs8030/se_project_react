import { checkResponse } from "./apiUtils";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getClothingItems = (token) =>
  fetch(`${API_BASE}/items`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
