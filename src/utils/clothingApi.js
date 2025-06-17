const isLocal = window.location.hostname === "localhost";
const BASE_URL = isLocal ? "http://localhost:3001/clothingItems" : null;

const mockItems = [
  {
    id: "1",
    name: "Sneakers",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    weather: "cold"
  },
  {
    id: "2",
    name: "Coat",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/892/892662.png",
    weather: "cold"
  },
  {
    id: "3",
    name: "Jacket",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/892/892689.png",
    weather: "cold"
  }
];

// ✅ GET
export const getClothingItems = () => {
  if (!BASE_URL) return Promise.resolve(mockItems);

  return fetch(BASE_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    })
    .catch((err) => {
      console.warn("Fetch failed, using mock items:", err);
      return mockItems;
    });
};

// ✅ POST
export const addClothingItem = async (item) => {
  if (!BASE_URL) {
    return Promise.resolve({ ...item, id: Date.now().toString() });
  }

  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });

  if (!response.ok) {
    throw new Error("Failed to add clothing item");
  }

  return response.json();
};

// ✅ DELETE
export const deleteClothingItem = (id) => {
  if (!BASE_URL) {
    return Promise.resolve(); // No-op in fallback mode
  }

  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
};
