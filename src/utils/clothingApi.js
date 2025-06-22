import { defaultClothingItems } from "./defaultClothingItems";

const isLocal = window.location.hostname === "localhost";
const BASE_URL = isLocal ? "http://localhost:3001/clothingItems" : null;

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }
  return res.json();
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export const getClothingItems = () => {
  if (!BASE_URL) {
    // Use fallback for GitHub Pages
    return Promise.resolve(defaultClothingItems);
  }
  return request(BASE_URL);
};

export const addClothingItem = (item) => {
  if (!BASE_URL) {
    return Promise.reject("Cannot add items in production");
  }
  return request(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};

export const deleteClothingItem = (itemId) => {
  if (!BASE_URL) {
    return Promise.reject("Cannot delete items in production");
  }
  return request(`${BASE_URL}/${itemId}`, {
    method: "DELETE",
  });
};
