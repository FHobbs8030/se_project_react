const isLocal = window.location.hostname === "localhost";
const BASE_URL = isLocal ? "http://localhost:3001/clothingItems" : null;

export const getClothingItems = () => {
  return fetch(BASE_URL).then((res) => {
    if (!res.ok) {
      throw new Error(`Error fetching clothing items: ${res.status}`);
    }
    return res.json();
  });
};

export const addClothingItem = (item) => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error adding item: ${res.status}`);
    }
    return res.json();
  });
};

export const deleteClothingItem = (itemId) => {
  return fetch(`${BASE_URL}/${itemId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error deleting item: ${res.status}`);
    }
    return res.json();
  });
};
