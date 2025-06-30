const isLocal = window.location.hostname === "localhost";
const BASE_URL = isLocal
  ? "http://localhost:3001/clothingItems"
  : "https://your-production-api.com/clothingItems"; // Optional fallback

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
  return request(BASE_URL);
};

export const addClothingItem = (item) => {
  return request(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
};

export const deleteClothingItem = (itemId) => {
  console.log("🔍 Deleting item with ID:", itemId);
  return request(`${BASE_URL}/${itemId}`, {
    method: "DELETE",
  });
};
