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
